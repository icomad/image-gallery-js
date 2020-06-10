var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var Yogurt = /** @class */ (function () {
    function Yogurt(options) {
        var _this = this;
        this.enabled = false;
        this.dynamicAttributes = ['checked', 'selected', 'value'];
        this.attached = [];
        this.elem = options.selector;
        this._data = new Proxy(options.data, this.proxyHandler());
        this.template = options.template;
        this.debounce = 0;
        if (options.attachTo) {
            var _attachTo = this.trueTypeOf(options.attachTo) === 'array'
                ? options.attachTo
                : [options.attachTo];
            _attachTo.forEach(function (yogurt) { return ('attach' in yogurt ? yogurt.attach(_this) : false); });
        }
    }
    Object.defineProperty(Yogurt.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (newData) {
            this._data = new Proxy(newData, this.proxyHandler());
            this.debounceRender();
        },
        enumerable: false,
        configurable: true
    });
    Yogurt.prototype.attach = function (attachment) {
        if (this.trueTypeOf(attachment) === 'array')
            this.attached.concat(attachment);
        else
            this.attached.push(attachment);
    };
    Yogurt.prototype.detach = function (attachment) {
        var isArray = this.trueTypeOf(attachment) === 'array';
        this.attached = this.attached.filter(function (attachedComponent) {
            if (isArray)
                return attachment.indexOf(attachedComponent) === -1;
            else
                return attachedComponent !== attachment;
        });
    };
    Yogurt.prototype.debounceRender = function () {
        var _this = this;
        if (this.debounce) {
            window.cancelAnimationFrame(this.debounce);
        }
        this.debounce = window.requestAnimationFrame(function () { return _this.render(); });
    };
    Yogurt.prototype.trueTypeOf = function (obj) {
        if (obj === undefined)
            return 'undefined';
        if (obj === null)
            return 'null';
        return obj.toString().slice(8, -1).toLowerCase();
    };
    Yogurt.prototype.proxyHandler = function () {
        var _this = this;
        return {
            get: function (obj, prop) {
                if (['object', 'array'].indexOf(_this.trueTypeOf(obj[prop])) > -1) {
                    return new Proxy(obj[prop], _this.proxyHandler());
                }
                return obj[prop];
            },
            set: function (obj, prop, value) {
                if (obj[prop] === value)
                    return true;
                obj[prop] = value;
                _this.debounceRender();
                return true;
            },
            deleteProperty: function (obj, prop) {
                delete obj[prop];
                _this.debounceRender();
                return true;
            },
        };
    };
    Yogurt.prototype.stringToHTML = function (template) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(template, 'text/html');
        return doc.body;
    };
    Yogurt.prototype.getNodeType = function (node) {
        if (node.nodeType === 3)
            return 'text';
        if (node.nodeType === 8)
            return 'comment';
        return node.tagName.toLowerCase();
    };
    Yogurt.prototype.getNodeContent = function (node) {
        if (node.childNodes && node.childNodes.length > 0)
            return null;
        return node.textContent;
    };
    Yogurt.prototype.getStyleMap = function (styles) {
        return styles.split(';').reduce(function (arr, style) {
            var col = style.indexOf(':');
            if (col) {
                arr.push({
                    name: style.slice(0, col).trim(),
                    value: style.slice(col + 1).trim(),
                });
            }
            return arr;
        }, []);
    };
    Yogurt.prototype.removeStyles = function (elem, styles) {
        //@ts-ignore
        styles.forEach(function (style) { return (elem.style[style] = ''); });
    };
    Yogurt.prototype.changeStyles = function (elem, styles) {
        //@ts-ignore
        styles.forEach(function (style) { return (elem.style[style.name] = style.value); });
    };
    Yogurt.prototype.diffStyles = function (elem, styles) {
        var styleMap = this.getStyleMap(styles);
        var remove = __spread(elem.style).filter(function (style) {
            //@ts-ignore
            return styleMap.find(function (newStyle) { return newStyle.name === style && newStyle.value === elem.style[style]; }) === undefined;
        });
        this.removeStyles(elem, remove);
        this.changeStyles(elem, styleMap);
    };
    Yogurt.prototype.addAttributes = function (elem, atts) {
        var _this = this;
        atts.forEach(function (attribute) {
            if (attribute.att === 'class') {
                elem.className = attribute.value;
            }
            else if (attribute.att === 'style') {
                _this.diffStyles(elem, attribute.value);
            }
            else {
                if (attribute.att in elem) {
                    try {
                        //@ts-ignore
                        elem[attribute.att] = attribute.value;
                        //@ts-ignore
                        if (!elem[attribute.att] && elem[attribute.att] !== 0) {
                            //@ts-ignore
                            elem[attribute.att] = true;
                        }
                    }
                    catch (e) { }
                }
                try {
                    elem.setAttribute(attribute.att, attribute.value);
                }
                catch (e) { }
            }
        });
    };
    Yogurt.prototype.removeAttributes = function (elem, atts) {
        var _this = this;
        atts.forEach(function (attribute) {
            if (attribute.att === 'class') {
                elem.className = '';
            }
            else if (attribute.att === 'style') {
                _this.removeStyles(elem, __spread(elem.style).slice());
            }
            else {
                if (attribute.att in elem) {
                    try {
                        //@ts-ignore
                        elem[attribute.att] = '';
                    }
                    catch (e) { }
                }
                try {
                    elem.removeAttribute(attribute.att);
                }
                catch (e) { }
            }
        });
    };
    Yogurt.prototype.getDynamicAttributes = function (node, atts, isTemplate) {
        var _this = this;
        this.dynamicAttributes.forEach(function (prop) {
            if (
            //@ts-ignore
            (!node[prop] && node[prop] !== 0) ||
                (isTemplate && node.tagName.toLowerCase() === 'option' && prop === 'selected') ||
                (isTemplate && node.tagName.toLowerCase() === 'select' && prop === 'value'))
                return;
            //@ts-ignore
            atts.push(_this.getAttribute(prop, node[prop]));
        });
    };
    Yogurt.prototype.getBaseAttributes = function (node, isTemplate) {
        var _this = this;
        return __spread(node.attributes).reduce(function (arr, attribute) {
            if ((_this.dynamicAttributes.indexOf(attribute.name) < 0 || (isTemplate && attribute.name === 'selected')) &&
                (attribute.name.length > 7 ? attribute.name.slice(0, 7) !== 'default' : true)) {
                arr.push(_this.getAttribute(attribute.name, attribute.value));
            }
            return arr;
        }, []);
    };
    Yogurt.prototype.getAttribute = function (name, value) {
        return {
            att: name,
            value: value,
        };
    };
    Yogurt.prototype.getAttributes = function (node, isTemplate) {
        if (node.nodeType !== 1)
            return [];
        var atts = this.getBaseAttributes(node, isTemplate);
        this.getDynamicAttributes(node, atts, isTemplate);
        return atts;
    };
    Yogurt.prototype.diffAtts = function (template, elem) {
        var _this = this;
        var templateAtts = this.getAttributes(template, true);
        var elemAtts = this.getAttributes(elem, false);
        var remove = elemAtts.filter(function (att) {
            if (_this.dynamicAttributes.indexOf(att.att) > -1)
                return false;
            var getAtt = templateAtts.find(function (newAtt) { return att.att === newAtt.att; });
            return getAtt === undefined;
        });
        var change = templateAtts.filter(function (att) {
            var getAtt = elemAtts.find(function (elemAtt) { return att.att === elemAtt.att; });
            return getAtt === undefined || getAtt.value !== att.value;
        });
        this.addAttributes(elem, change);
        this.removeAttributes(elem, remove);
    };
    Yogurt.prototype.addDefaultAtts = function (node) {
        var _this = this;
        if (node.nodeType !== 1)
            return;
        __spread(node.attributes).forEach(function (attribute) {
            if (attribute.name.length < 8 || attribute.name.slice(0, 7) !== 'default')
                return;
            _this.addAttributes(node, [_this.getAttribute(attribute.name.slice(7).toLowerCase(), attribute.value)]);
            _this.removeAttributes(node, [_this.getAttribute(attribute.name, attribute.value)]);
        });
        if (node.childNodes) {
            __spread(node.childNodes).forEach(function (childNode) { return _this.addDefaultAtts(childNode); });
        }
    };
    Yogurt.prototype.diffingDOM = function (template, elem, attachments) {
        var _this = this;
        var domNodes = __spread(elem.childNodes).slice();
        var templateNodes = __spread(template.childNodes).slice();
        var count = domNodes.length - templateNodes.length;
        if (count > 0) {
            for (; count > 0; count--) {
                domNodes[domNodes.length - count].parentNode.removeChild(domNodes[domNodes.length - count]);
            }
        }
        templateNodes.forEach(function (node, index) {
            if (!domNodes[index]) {
                _this.addDefaultAtts(node);
                elem.appendChild(node.cloneNode(true));
                return;
            }
            if (_this.getNodeType(node) !== _this.getNodeType(domNodes[index])) {
                domNodes[index].parentNode.replaceChild(node.cloneNode(true), domNodes[index]);
                return;
            }
            _this.diffAtts(node, domNodes[index]);
            var isAttachment = attachments.filter(function (attachment) { return node.nodeType !== 3 && node.matches(attachment); });
            if (isAttachment.length > 0)
                return;
            var templateContent = _this.getNodeContent(node);
            if (templateContent && templateContent !== _this.getNodeContent(domNodes[index])) {
                domNodes[index].textContent = templateContent;
            }
            if (domNodes[index].childNodes.length > 0 && node.childNodes.length < 1) {
                domNodes[index].innerHTML = '';
                return;
            }
            if (domNodes[index].childNodes.length < 1 && node.childNodes.length > 0) {
                var fragment = document.createDocumentFragment();
                _this.diffingDOM(node, fragment, attachments);
                domNodes[index].appendChild(fragment);
                return;
            }
            if (node.childNodes.length > 0) {
                _this.diffingDOM(node, domNodes[index], attachments);
            }
        });
    };
    Yogurt.prototype.renderAttachments = function (attachments) {
        if (!attachments)
            return;
        attachments.forEach(function (yogurt) {
            if ('render' in yogurt)
                yogurt.render();
        });
    };
    Yogurt.prototype.render = function () {
        var node = document.querySelector(this.elem);
        var templateHTML = this.stringToHTML(this.template(this._data));
        var attachments = this.attached.map(function (attachment) { return attachment.elem; });
        this.diffingDOM(templateHTML, node, attachments);
        node.dispatchEvent(new CustomEvent('render', { bubbles: true, detail: this._data }));
        this.renderAttachments(this.attached);
    };
    return Yogurt;
}());
export default Yogurt;

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
        /* Component children of this component */
        this.children = [];
        this.elem = options.selector;
        this._state = new Proxy(options.state, this.proxyHandler());
        this.template = options.template;
        this.efficiency = 0;
        if (options.childOf) {
            var _attachTo = this.typeOf(options.childOf) === 'array'
                ? options.childOf
                : [options.childOf];
            _attachTo.forEach(function (yogurt) { return ('attach' in yogurt ? yogurt.attach(_this) : false); });
        }
    }
    Object.defineProperty(Yogurt.prototype, "state", {
        /* Get internal state */
        get: function () {
            return this._state;
        },
        /* If state gets replaced create new proxy  */
        set: function (newState) {
            this._state = new Proxy(newState, this.proxyHandler());
            this.efficientRender();
        },
        enumerable: false,
        configurable: true
    });
    /* Dynamically attach child component to this component */
    Yogurt.prototype.attach = function (child) {
        if (this.typeOf(child) === 'array')
            this.children.concat(child);
        else
            this.children.push(child);
    };
    /* Dynamically detach child component of this component  */
    Yogurt.prototype.detach = function (child) {
        var isArray = this.typeOf(child) === 'array';
        this.children = this.children.filter(function (attachedComponent) {
            if (isArray)
                return child.indexOf(attachedComponent) === -1;
            else
                return attachedComponent !== child;
        });
    };
    /* Check if component has already a render request */
    Yogurt.prototype.efficientRender = function () {
        var _this = this;
        if (this.efficiency) {
            window.cancelAnimationFrame(this.efficiency);
        }
        this.efficiency = window.requestAnimationFrame(function () { return _this.render(); });
    };
    /* Utility function to get user friendly obj type */
    Yogurt.prototype.typeOf = function (obj) {
        if (obj === undefined)
            return 'undefined';
        if (obj === null)
            return 'null';
        return obj.toString().slice(8, -1).toLowerCase();
    };
    /* ProxyHandler to request a rerender on prop update */
    Yogurt.prototype.proxyHandler = function () {
        var _this = this;
        return {
            get: function (obj, prop) {
                if (['object', 'array'].indexOf(_this.typeOf(obj[prop])) > -1) {
                    return new Proxy(obj[prop], _this.proxyHandler());
                }
                return obj[prop];
            },
            set: function (obj, prop, value) {
                if (obj[prop] === value)
                    return true;
                obj[prop] = value;
                _this.efficientRender();
                return true;
            },
            deleteProperty: function (obj, prop) {
                delete obj[prop];
                _this.efficientRender();
                return true;
            },
        };
    };
    /* Generate DOM elements bases on string */
    Yogurt.prototype.stringComponent = function (template) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(template, 'text/html');
        return doc.body;
    };
    /* Utility function to get user friendly html5 node type */
    Yogurt.prototype.getNodeType = function (node) {
        if (node.nodeType === 3)
            return 'text';
        if (node.nodeType === 8)
            return 'comment';
        return node.tagName.toLowerCase();
    };
    /* Utility function to get user friendly html5 node content */
    Yogurt.prototype.getNodeContent = function (node) {
        if (node.childNodes && node.childNodes.length > 0)
            return null;
        return node.textContent;
    };
    /* Utility function to get a map of all the inline styles applied to html5 node */
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
    /* Utility function to remove specific inline styles applied to html5 node */
    Yogurt.prototype.removeStyles = function (elem, styles) {
        //@ts-ignore
        styles.forEach(function (style) { return (elem.style[style] = ''); });
    };
    /* Utility function to update specific inline styles value */
    Yogurt.prototype.changeStyles = function (elem, styles) {
        //@ts-ignore
        styles.forEach(function (style) { return (elem.style[style.name] = style.value); });
    };
    /* Utility function to compare old and new style property and update accordingly */
    Yogurt.prototype.diffStyles = function (elem, styles) {
        var styleMap = this.getStyleMap(styles);
        var remove = __spread(elem.style).filter(function (style) {
            //@ts-ignore
            return styleMap.find(function (newStyle) { return newStyle.name === style && newStyle.value === elem.style[style]; }) === undefined;
        });
        this.removeStyles(elem, remove);
        this.changeStyles(elem, styleMap);
    };
    /* Utility function to add attributes to html5 node */
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
    /* Utility function to remove attributes from html5 node */
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
    /* Utility function to check if attribute is one of 'checked' or 'value' and get it */
    Yogurt.prototype.getDynamicAttributes = function (node, atts, isTemplate) {
        var _this = this;
        ['checked', 'value'].forEach(function (prop) {
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
    /* Utility function to get attributes of html5 node except for 'value' and 'checked' */
    Yogurt.prototype.getBaseAttributes = function (node, isTemplate) {
        var _this = this;
        return __spread(node.attributes).reduce(function (arr, attribute) {
            if ((['checked', 'value'].indexOf(attribute.name) < 0 || (isTemplate && attribute.name === 'selected')) &&
                (attribute.name.length > 7 ? attribute.name.slice(0, 7) !== 'default' : true)) {
                arr.push(_this.getAttribute(attribute.name, attribute.value));
            }
            return arr;
        }, []);
    };
    /* Utility function to create custom obj with name and value of an attribute of a html5 node */
    Yogurt.prototype.getAttribute = function (name, value) {
        return {
            att: name,
            value: value,
        };
    };
    /* Utility function to return all attributes of a html5 node */
    Yogurt.prototype.getAttributes = function (node, isTemplate) {
        if (node.nodeType !== 1)
            return [];
        var atts = this.getBaseAttributes(node, isTemplate);
        this.getDynamicAttributes(node, atts, isTemplate);
        return atts;
    };
    /* Utility function to compare old and new attributes properties and update accordingly */
    Yogurt.prototype.diffAtts = function (template, elem) {
        var templateAtts = this.getAttributes(template, true);
        var elemAtts = this.getAttributes(elem, false);
        var remove = elemAtts.filter(function (att) {
            if (['checked', 'value'].indexOf(att.att) > -1)
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
    /* Utility function to update only elements of DOM tree that have changed their attributes or content */
    Yogurt.prototype.diffingDOM = function (template, elem, children) {
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
                elem.appendChild(node.cloneNode(true));
                return;
            }
            if (_this.getNodeType(node) !== _this.getNodeType(domNodes[index])) {
                domNodes[index].parentNode.replaceChild(node.cloneNode(true), domNodes[index]);
                return;
            }
            _this.diffAtts(node, domNodes[index]);
            var isChild = children.filter(function (cihld) { return node.nodeType !== 3 && node.matches(cihld); });
            if (isChild.length > 0)
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
                _this.diffingDOM(node, fragment, children);
                domNodes[index].appendChild(fragment);
                return;
            }
            if (node.childNodes.length > 0) {
                _this.diffingDOM(node, domNodes[index], children);
            }
        });
    };
    /* Call the render method on all children attached to this component  */
    Yogurt.prototype.renderChildren = function (children) {
        if (!children)
            return;
        children.forEach(function (yogurt) {
            if ('render' in yogurt)
                yogurt.render();
        });
    };
    /* Render the component using DOM diffing and emit a 'render' event at the end */
    Yogurt.prototype.render = function () {
        var node = document.querySelector(this.elem);
        var templateHTML = this.stringComponent(this.template(this._state));
        var childrenElem = this.children.map(function (child) { return child.elem; });
        this.diffingDOM(templateHTML, node, childrenElem);
        node.dispatchEvent(new CustomEvent('render', { bubbles: true, detail: this._state }));
        this.renderChildren(this.children);
    };
    return Yogurt;
}());
export default Yogurt;

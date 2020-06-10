(function () {
    'use strict';

    var __read = (undefined && undefined.__read) || function (o, n) {
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
    var __spread = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    function isLogged() {
        if (sessionStorage.getItem('user') !== null)
            return true;
        if (localStorage.getItem('user') !== null) {
            var userWithExpiration = JSON.parse(localStorage.getItem('user'));
            var now = new Date();
            if (now.getTime() < userWithExpiration.expiry)
                return true;
            else
                localStorage.removeItem('user');
        }
        return false;
    }
    var contextPath = '/image-gallery-js';
    function reorderElements(els) {
        var maxOrder = els.length;
        // @ts-ignore
        __spread(els).forEach(function (element, i) { return (element.dataset.order = maxOrder - i); });
    }
    function sortableGrid(grid, onUpdate) {
        var draggedElement;
        var nextElement;
        var leftEdgeOffset;
        var rightEdgeOffset;
        var topEdgeOffset;
        var bottomEdgeOffset;
        var startingX;
        grid.addEventListener('dragstart', function (e) {
            draggedElement = e.target;
            nextElement = draggedElement.nextElementSibling;
            startingX = e.clientX;
            leftEdgeOffset = e.clientX - draggedElement.getBoundingClientRect().x;
            rightEdgeOffset = draggedElement.getBoundingClientRect().right - e.clientX;
            topEdgeOffset = e.clientY - draggedElement.getBoundingClientRect().top;
            bottomEdgeOffset = draggedElement.getBoundingClientRect().bottom - e.clientY;
            // @ts-ignore
            __spread(grid.children).forEach(function (child) { return child.classList.remove('hover:bg-blue-200'); });
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', draggedElement.innerHTML);
            grid.addEventListener('dragover', _onDragOver);
            grid.addEventListener('dragend', _onDragEnd);
            setTimeout(function () {
                draggedElement.classList.add('opacity-25', 'border', 'border-dashed');
            }, 0);
        });
        function _onDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            var target = e.target;
            if (target && target !== draggedElement && target.nodeName == 'DIV') {
                var targetPos = target.getBoundingClientRect();
                var targetCenter = targetPos.right - targetPos.width / 2;
                var shouldSwitch = e.clientX < startingX &&
                    (e.clientX - leftEdgeOffset < targetCenter || e.clientY - topEdgeOffset < targetCenter);
                var switchTarget = shouldSwitch ? target : target.nextSibling;
                grid.insertBefore(draggedElement, switchTarget);
            }
        }
        function _onDragEnd(e) {
            e.preventDefault();
            draggedElement.classList.remove('opacity-25', 'border', 'border-dashed');
            grid.removeEventListener('dragover', _onDragOver);
            grid.removeEventListener('dragend', _onDragEnd);
            reorderElements(grid.children);
            nextElement !== draggedElement.nextSibling ? onUpdate(draggedElement) : false;
            // @ts-ignore
            __spread(grid.children).forEach(function (child) { return child.classList.add('hover:bg-blue-200'); });
        }
    }

    var __read$1 = (undefined && undefined.__read) || function (o, n) {
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
    var __spread$1 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$1(arguments[i]));
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
            var remove = __spread$1(elem.style).filter(function (style) {
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
                    _this.removeStyles(elem, __spread$1(elem.style).slice());
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
            return __spread$1(node.attributes).reduce(function (arr, attribute) {
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
            __spread$1(node.attributes).forEach(function (attribute) {
                if (attribute.name.length < 8 || attribute.name.slice(0, 7) !== 'default')
                    return;
                _this.addAttributes(node, [_this.getAttribute(attribute.name.slice(7).toLowerCase(), attribute.value)]);
                _this.removeAttributes(node, [_this.getAttribute(attribute.name, attribute.value)]);
            });
            if (node.childNodes) {
                __spread$1(node.childNodes).forEach(function (childNode) { return _this.addDefaultAtts(childNode); });
            }
        };
        Yogurt.prototype.diffingDOM = function (template, elem, attachments) {
            var _this = this;
            var domNodes = __spread$1(elem.childNodes).slice();
            var templateNodes = __spread$1(template.childNodes).slice();
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

    var data = {
        showError: false,
        showSuccess: false,
        showDashboard: true,
        showAlbum: false,
        showImage: false,
        currentAlbum: null,
        currentImage: null,
    };
    var template = function (props) { return "\n\t<div id='loading-modal'></div>\n\t<header id=\"app-navbar\" class='header'></header>\n\t<main class=\"bg-gray-100 flex-grow\">\n\t\t<div class=\"container mx-auto p-4\">\n\t\t\t<section id='error-alert' class='mt-5 flex w-full justify-center items-center " + (props.showError ? '' : 'hidden') + "'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center " + (props.showSuccess ? '' : 'hidden') + "'></section>\n\t\t\t<section id='dashboard-section' class=\"" + (props.showDashboard ? '' : 'hidden') + "\"></section>\n\t\t\t<section id='album-detail-section' class=\"" + (props.showAlbum ? '' : 'hidden') + "\"></section>\n\t\t\t<section id='image-detail-section' class=\"" + (props.showImage ? '' : 'hidden') + "\"></section>\n\t\t</div>\n\t</main>\n"; };
    var App = new Yogurt({
        selector: '#app',
        data: data,
        template: template
    });

    var data$1 = {};
    var template$1 = function (props) { return "\n\t<div class=\"mt-6 w-full flex justify-center\">\n\t\t<div id='add-album-section' class=\"rounded p-2 shadow-xl flex flex-col justify-start bg-blue-600\"></div>\n\t</div>\n\n\t<div class=\"my-6 w-full flex flex-wrap justify-center\" >\n\t\t<div class=\"w-full mb-2 text-lg font-bold text-blue-500 border-b border-blue-500\">Albums</div>\n\t\t<div class=\"w-full text-sm mb-4 text-gray-800\">Drag and drop an album to sort it differently.</div>\n\t\t<section id=\"album-grid\" class=\"w-full album-grid\"></section>\n\t</div>\n"; };
    var Dashboard = new Yogurt({
        selector: '#dashboard-section',
        data: data$1,
        template: template$1,
        attachTo: App
    });

    var data$2 = {
        isLogged: false
    };
    var template$2 = function (props) { return "\n\t<nav>\n\t\t<div class=\"container mx-auto\">\n\t\t\t<div class=\"w-full flex justify-between items-center\">\n\t\t\t\t<a id=\"home-btn\" href=\"" + contextPath + "\" class=\"brand-logo\">Image Gallery</a>\n\t\t\t\t<div class=\"flex-grow ml-6\">\n\t\t\t\t\t<a id=\"dashboard-nav\" href=\"#\" class=\"btn btn-blue\">Dashboard</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t<a id=\"signout-btn\" href=\"#\" class=\"btn btn-blue\">Sign Out</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n"; };
    var AppNavbar = new Yogurt({
        selector: '#app-navbar',
        data: data$2,
        template: template$2,
        attachTo: App
    });

    var data$3 = {
        albumTitle: '',
        albumTitleError: '',
        genericError: false
    };
    var template$3 = function (props) { return "\n\t<div class=\"text-xl border-b-2 border-gray-200 mb-4 p-1 text-gray-200\">Add New Album</div>\n\t<form id=\"add-album-form\" action=\"#\" class=\"flex justify-between items-center\">\n\t\t<input id=\"add-album-title\" type=\"text\" maxlength=\"45\" name=\"title\" placeholder=\"Album Title\" class=\"rounded p-2 flex-grow mr-4 " + (props.albumTitleError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Add\" />\n\t</form>\n"; };
    var AddAlbumForm = new Yogurt({
        selector: '#add-album-section',
        data: data$3,
        template: template$3,
        attachTo: Dashboard
    });

    var data$4 = {
        albums: [],
        attempted: false
    };
    var template$4 = function (props) { return !props.albums.length ?
        "<div class=\"rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center\" draggable=\"false\">There are no albums to show. Add one using the form above.</div>" :
        props.albums.sort(function (a, b) { return b.order - a.order; }).map(function (album) { return "\n\t\t<div id=\"album-" + album.id + "\" data-id=\"" + album.id + "\" data-order=\"" + album.order + "\" class=\"album cursor-pointer shadow-lg flex flex-col p-2 rounded items-stretch bg-white text-gray-800 transition-default hover:bg-blue-200\" draggable=\"true\">\n\t\t\t<div class=\"pointer-events-none border-b border-gray-800 p-2\"><span class=\"font-bold\">Album Title:</span> <span>" + album.title + "</span></div>\n\t\t\t<div class=\"pointer-events-none border-b border-gray-800 p-2\"><span class=\"font-bold\">Created:</span> <span>" + album.createdAt + "</span></div>\n\t\t</div>\n\t"; }).join(''); };
    var AlbumGrid = new Yogurt({
        selector: '#album-grid',
        data: data$4,
        template: template$4,
        attachTo: Dashboard
    });

    var data$5 = {
        message: ''
    };
    var template$5 = function (props) { return "\n\t<div class=\"w-full md:w-1/2\" role=\"alert\" >\n\t\t<div class=\"bg-red-500 text-white font-bold rounded-t px-4 py-2 flex justify-between\">\n\t\t\t<span class=\"flex-grow font-bold\">ERROR!</span>\n\t\t\t<button id='error-alert-delete' class=\"alert-delete transition-default hover:text-red-800\"><i class=\"fas fa-times pointer-events-none\"></i></button>\n\t\t</div>\n\t\t<div class=\"border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700\">\n\t\t\t<p id=\"error-body\">" + props.message + "</p>\n\t\t</div>\n\t</div>\n"; };
    var ErrorAlert = new Yogurt({
        selector: '#error-alert',
        data: data$5,
        template: template$5,
    });

    var data$6 = {
        showSuccess: false,
        showError: false
    };
    var template$6 = function (props) { return "\n\t<header id=\"index-navbar\" class='header'></header>\n\t<main class=\"bg-gray-100 flex-grow\">\n\t\t<div class=\"container mx-auto p-4\">\n\t\t\t<section id='error-alert' class='mt-5 flex w-full justify-center items-center " + (props.showError ? '' : 'hidden') + "'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center " + (props.showSuccess ? '' : 'hidden') + "'></section>\n\t\t\t<section id='signin-section'></section>\n\t\t\t<section id='signup-section'></section>\n\t\t</div>\n\t</main>\n"; };
    var Index = new Yogurt({
        selector: '#app',
        data: data$6,
        template: template$6
    });

    var data$7 = {
        isLogged: false,
    };
    var template$7 = function (props) { return "\n\t<nav>\n\t\t<div class=\"container mx-auto\">\n\t\t\t<div class=\"w-full flex justify-between items-center\">\n\t\t\t\t<a id=\"home-btn\" href=\"" + contextPath + "\" class=\"brand-logo\">Image Gallery</a>\n\t\t\t\t<div class=\"flex-grow ml-6\">\n\t\t\t\t\t<a id=\"dashboard-btn\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? '' : 'hidden') + "\">Dashboard</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t<a id=\"signout-btn\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? '' : 'hidden') + "\">Sign Out</a>\n\t\t\t\t\t<a id=\"signin-nav\" href=\"#\" class=\"btn btn-blue mr-3 " + (props.isLogged ? 'hidden' : '') + "\">Sign In</a>\n\t\t\t\t\t<a id=\"signup-nav\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? 'hidden' : '') + "\">Sign Up</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n"; };
    var IndexNavbar = new Yogurt({
        selector: '#index-navbar',
        data: data$7,
        template: template$7,
        attachTo: Index
    });

    var data$8 = {
        message: ''
    };
    var template$8 = function (props) { return "\n\t<div class=\"w-full md:w-1/2\" role=\"alert\" >\n\t\t<div class=\"bg-green-500 text-white font-bold rounded-t px-4 py-2 flex justify-between\">\n\t\t\t<span class=\"flex-grow font-bold\">SUCCESS!</span>\n\t\t\t<button id='error-alert-delete' class=\"alert-delete transition-default hover:text-green-800\"><i class=\"fas fa-times pointer-events-none\"></i></button>\n\t\t</div>\n\t\t<div class=\"border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700\">\n\t\t\t<p id=\"success-body\">" + props.message + "</p>\n\t\t</div>\n\t</div>\n"; };
    var SuccessAlert = new Yogurt({
        selector: '#success-alert',
        data: data$8,
        template: template$8,
    });

    var data$9 = {
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        usernameError: '',
        passwordError: '',
        emailError: '',
        passwordConfirmError: '',
        genericError: false
    };
    var template$9 = function (props) { return "\n\t<div class=\"w-full flex justify-center\">\n\t\t<div class=\"w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600\">\n\t\t\t<div class=\"text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200\">Sign Up</div>\n\t\t\t<form id=\"signup-form\" action=\"#\">\n\t\t\t\t<input id=\"username-signup\" type=\"text\" maxlength=\"45\" name=\"username\" placeholder=\"Username\" class=\"w-full rounded p-2 mb-2 " + (props.usernameError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"username-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.usernameError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.usernameError + "</div>\n\n\t\t\t\t<input id=\"email-signup\" type=\"email\" name=\"email\" placeholder=\"Email\" class=\"w-full rounded p-2 mb-2 " + (props.emailError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"email-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.emailError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.emailError + "</div>\n\n\t\t\t\t<input id=\"password-signup\" type=\"password\" maxlength=\"45\" name=\"password\" placeholder=\"Password\" class=\"w-full rounded p-2 mb-2 " + (props.passwordError || props.passwordConfirmError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"password-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.passwordError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.passwordError + "</div>\n\n\t\t\t\t<input id=\"confirm-password-signup\" type=\"password\" maxlength=\"45\" name=\"passwordCheck\" placeholder=\"Confirm Password\" class=\"flex w-full rounded p-2 mb-2 " + (props.passwordConfirmError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"confirm-password-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.passwordConfirmError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.passwordConfirmError + "</div>\n\n\t\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Sign Up\" />\n\t\t\t</form>\n\t\t</div>\n\t</div>\n"; };
    var SignUp = new Yogurt({
        selector: '#signup-section',
        data: data$9,
        template: template$9,
    });

    var data$a = {
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
        genericError: false,
        remember: false,
    };
    var template$a = function (props) { return "\n\t<div class=\"w-full flex justify-center\">\n\t<div class=\"w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600\">\n\t\t<div class=\"text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200\">Sign In</div>\n\t\t<form id=\"signin-form\" action=\"#\">\n\t\t\t<input id=\"username-signin\" type=\"text\" name=\"username\" placeholder=\"Username\" class=\"w-full rounded p-2 mb-2 " + (props.usernameError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t<div id=\"username-signin-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold " + (props.usernameError ? '' : 'hidden') + "\">" + props.usernameError + "</div>\n\n\t\t\t<input id=\"password-signin\" type=\"password\" name=\"password\" placeholder=\"Password\" class=\"w-full rounded p-2 mb-2 " + (props.passwordError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t<div id=\"password-signin-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold " + (props.passwordError ? '' : 'hidden') + "\">" + props.passwordError + "</div>\n\t\t\t<div class=\"w-full mb-2 p-2\">\n\t\t\t\t<label class=\"text-gray-200\">\n\t\t\t\t\t<input class='mr-4' type=\"checkbox\" name=\"remember\" id=\"remember-signin\" " + (props.remember ? 'checked' : '') + " />\n\t\t\t\t\tRemember me?\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Sign In\" />\n\t\t</form>\n\t</div>\n\t</div>\n"; };
    var SignIn = new Yogurt({
        selector: '#signin-section',
        data: data$a,
        template: template$a,
    });

    function makeAddImageFormComponent(albumId, component) {
        var data = {
            albumId: albumId,
            file: null,
            description: '',
            title: ''
        };
        var template = function (props) { return "\n\t\t<div class=\"rounded p-2 shadow-xl flex flex-col bg-blue-600\">\n\t\t\t<div class=\"text-xl border-b-2 border-gray-200 mb-4 py-1 px-8 text-gray-200\">Add Image</div>\n\t\t\t<form id=\"add-image-form\" action=\"#\" class=\"flex flex-col\">\n\t\t\t\t\t<input id=\"add-image-file\" type=\"file\" name=\"imageFile\" placeholder=\"Image File\" class=\"cursor-pointer rounded p-2 mb-2 text-gray-800 bg-white\" required />\n\t\t\t\t\t<input id=\"add-image-title\" type=\"text\" maxlength=\"45\" name=\"title\" placeholder=\"Image Title\" class=\"rounded p-2 mb-2\" required />\n\t\t\t\t\t<textarea style=\"resize: none\" id=\"add-image-description\" type=\"text\" rows=\"4\" maxlength=\"255\" name=\"description\" placeholder=\"Image Description\" class=\"rounded p-2 mb-2\" required></textarea>\n\t\t\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Add\" />\n\t\t\t</form>\n\t\t</div>\n\t"; };
        var AddImageForm = new Yogurt({
            selector: '#add-image-section',
            data: data,
            template: template,
            attachTo: component
        });
        AddImageForm.render();
        return AddImageForm;
    }

    function makeImageGridComponent(images, component) {
        var data = {
            images: images,
            page: 1
        };
        var template = function (props) { return !props.images.length ?
            "\n\t\t<div class=\"w-full rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center\">No images to show! Add one using the form above.</div>\n\t"
            :
                "\n\t\t<div class=\"mr-4 " + (props.page > 1 ? '' : 'hidden') + "\">\n\t\t\t<a id=\"prev-page-btn\" href=\"#\" class=\"text-gray-800 transition-default hover:text-blue-500 text-4xl\">\n\t\t\t\t<i class=\"fas fa-chevron-circle-left pointer-events-none\"></i>\n\t\t\t</a>\n\t\t</div>\n\t\t<div class='flex-grow image-grid'>\n\t\t\t" + props.images.sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); }).map(function (image, index) { return "\n\t\t\t\t<div id=\"image-" + image.id + "\" data-id=\"" + image.id + "\" class=\"image cursor-pointer shadow-lg flex flex-col p-2 rounded items-center bg-white text-gray-800 transition-default hover:bg-blue-200 " + ((index < 5 * props.page) && (index >= (5 * props.page) - 5) ? '' : 'hidden') + "\">\n\t\t\t\t\t<div class=\"pointer-events-none rounded-full flex w-24 h-24 overflow-hidden\">\n\t\t\t\t\t\t<img src=\"/resources/images/thumbnail_" + image.path + "\" alt=\"" + image.title + "\" style=\"object-fit: cover\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"pointer-events-none border-b border-gray-800 text-gray-800 self-stretch text-center mt-2\">\n\t\t\t\t\t\t<span class=\"font-bold\">Title:</span> <span>" + image.title + "</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"; }).join('') + "\n\t\t</div>\n\t\t<div class=\"ml-4 " + (props.page < images.length / 5 ? '' : 'hidden') + "\">\n\t\t\t<a id=\"next-page-btn\" href=\"#\" class=\"text-gray-800 transition-default hover:text-blue-500 text-4xl\">\n\t\t\t\t<i class=\"fas fa-chevron-circle-right pointer-events-none\"></i>\n\t\t\t</a>\n\t\t</div>\n\t"; };
        var ImageGrid = new Yogurt({
            selector: '#image-grid',
            data: data,
            template: template,
            attachTo: component
        });
        ImageGrid.render();
        return ImageGrid;
    }

    function makeAlbumDetailComponent(album, images) {
        var data = {
            album: album,
            images: images,
            imageForm: null,
            imageGrid: null,
        };
        var template = function (props) { return "\n\t\t<div id=\"album-section-title\" class=\"mt-2 w-full flex justify-center items-center text-3xl font-semibold text-blue-800\">" + album.title + "</div>\n\t\t<div id='add-image-section' class=\"mt-6 w-full flex justify-center\"></div>\n\t\t<div class=\"my-6 w-full flex flex-wrap justify-between items-center\">\n\t\t\t\t<div class=\"w-full mb-4 text-lg font-bold text-blue-500 border-b border-blue-500\">Images</div>\n\t\t\t\t<div id='image-grid' class='w-full flex justify-between items-center'></div>\n\t\t</div>\n\t"; };
        var AlbumDetail = new Yogurt({
            selector: '#album-detail-section',
            data: data,
            template: template,
            attachTo: App
        });
        AlbumDetail.render();
        var AddImageForm = makeAddImageFormComponent(AlbumDetail.data.album.id, AlbumDetail);
        AlbumDetail.data.imageForm = AddImageForm;
        var ImageGrid = makeImageGridComponent(AlbumDetail.data.images, AlbumDetail);
        AlbumDetail.data.imageGrid = ImageGrid;
        return AlbumDetail;
    }

    var data$b = {
        showModal: false,
        text: ''
    };
    var template$b = function (props) { return props.showModal ? "\n\t<div class='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>\n\t\t<div class='flex justify-center items-center flex-col h-full w-full'>\n\t\t\t<div class='text-red-800 font-bold text-xl mb-5'>" + props.text + "</div>\n\t\t\t<span class=\"text-red-800 text-5xl\">\n\t\t\t\t\t<i class=\"fas fa-circle-notch fa-spin\"></i>\n\t\t\t\t</span>\n\t\t</div>\n\t</div>\n" : ""; };
    var LoadingModal = new Yogurt({
        selector: '#loading-modal',
        data: data$b,
        template: template$b,
        attachTo: App
    });

    function makeImageDetailComponent(image, comments) {
        var data = {
            image: image,
            comments: comments,
            commentBody: '',
            commentBodyError: false
        };
        var template = function (props) { return "\n\t\t<div id='image-detail-modal' class='w-full h-full flex justify-center items-center fixed block top-0 left-0 z-50' style=\"background: rgba(0, 0, 0, .45)\">\n\t\t\t<div class='p-8 rounded w-11/12 flex flex-col md:flex-row justify-between text-gray-800 bg-gray-100' style=\"max-height: 90vh;\">\n\t\t\t\t<div class=\"w-full md:w-2/3 flex flex-col justify-between\">\n\t\t\t\t\t<div class=\"rounded p-2 shadow-lg bg-white flex flex-col justify-start mb-5\">\n\t\t\t\t\t\t<div class=\"border-b border-gray-500 p-1 flex justify-start items-center\">\n\t\t\t\t\t\t\t<span class=\"font-bold\">Title:</span>&nbsp;\n\t\t\t\t\t\t\t<span>" + props.image.title + "</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"border-b border-gray-500 p-1 flex justify-start items-center\">\n\t\t\t\t\t\t\t<span class=\"font-bold\">Description:</span>&nbsp;\n\t\t\t\t\t\t\t<span>" + props.image.description + "</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"border-b border-gray-500 p-1 flex justify-start items-center\">\n\t\t\t\t\t\t\t<span class=\"font-bold\">Created:</span>&nbsp;\n\t\t\t\t\t\t\t<span>" + props.image.createdAt + "</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"flex-grow rounded overflow-hidden shadow-lg flex justify-center items-center\">\n\t\t\t\t\t\t<img class='w-full h-full' src=\"/resources/images/" + props.image.path + "\" alt=\"" + props.image.title + "\" style=\"object-fit: contain;\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"mt-5 md:mt-0 md:ml-5 w-full md:w-1/3 flex flex-col justify-between items-stretch rounded shadow-lg bg-white\">\n\t\t\t\t\t<div class=\"relative flex-grow flex flex-col justify-start border-b border-black-800 overflow-auto\">\n\t\t\t\t\t\t<div class=\"rounded bg-white sticky top-0 z-40 flex justify-start items-center border-b border-black-800 p-4 font-bold mb-2\">Comments</div>\n\t\t\t\t\t\t<div class=\"flex-grow overflow-y-auto overflow-x-hidden absolute mt-12 w-11/12 p-4\">\n\t\t\t\t\t\t\t" + props.comments.map(function (comment) { return "\n\t\t\t\t\t\t\t\t<div class=\"rounded py-1 px-2 w-full flex flex-col bg-blue-200 mb-1\">\n\t\t\t\t\t\t\t\t\t<div style=\"word-break: break-word;overflow-wrap:break-word\">" + comment.comment.body + "</div>\n\t\t\t\t\t\t\t\t\t<div class=\"text-sm italic font-semibold\">\n\t\t\t\t\t\t\t\t\t\t- " + comment.username + " (" + new Date(comment.comment.createdAt).toLocaleString() + ")\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t"; }).join('') + "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"flex p-4\">\n\t\t\t\t\t\t<form id='add-comment-form' class=\"w-full flex justify-between\" action=\"#\">\n\t\t\t\t\t\t\t<input id='add-comment-body' type=\"text\" name=\"add-comment-body\" placeholder=\"Write here...\" class=\"flex-grow rounded p-2 bg-gray-200 " + (props.commentBodyError ? 'border-2 border-red-600 outline-none text-red-600' : '') + "\" required />\n\t\t\t\t\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-800 cursor-pointer outline-none btn btn-blue ml-2\" value=\"Send\" required />\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t"; };
        var ImageDetail = new Yogurt({
            selector: '#image-detail-section',
            data: data,
            template: template,
            attachTo: App
        });
        ImageDetail.render();
        return ImageDetail;
    }

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __read$2 = (undefined && undefined.__read) || function (o, n) {
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
    var __spread$2 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$2(arguments[i]));
        return ar;
    };
    var __values = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    /**
     *
     * APP NAVBAR ACTIONS
     *
     */
    function appSignOut(e) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('#signout-btn'))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(contextPath + "/signout")];
                    case 2:
                        response = _a.sent();
                        if (response.status === 200) {
                            sessionStorage.removeItem('user');
                            localStorage.removeItem('user');
                            SuccessAlert.data.message = 'You successfully signed out!';
                            App.data.showSuccess = true;
                            App.attach(SuccessAlert);
                            window.location.href = contextPath;
                        }
                        else {
                            ErrorAlert.data.message = 'Something went wrong!';
                            App.data.showError = true;
                            App.attach(ErrorAlert);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        console.error(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function appGoToDashboard(e) {
        var elem = e.target;
        if (!elem.matches('#dashboard-nav'))
            return;
        App.data.showDashboard = true;
        App.data.showAlbum = false;
        App.data.currentAlbum = null;
    }
    /**
     *
     * ERROR ALERT ACTIONS
     *
     */
    function deleteErrorAlert(e) {
        var elem = e.target;
        if (!elem.matches('#error-alert-delete'))
            return;
        if (!IndexNavbar.data.isLogged && AppNavbar.data.isLogged) {
            App.data.showError = false;
            App.detach(ErrorAlert);
        }
        else {
            Index.data.showError = false;
            Index.detach(ErrorAlert);
        }
    }
    /**
     *
     * SUCCESS ALERT ACTIONS
     *
     */
    function deleteSuccessAlert(e) {
        var elem = e.target;
        if (!elem.matches('#success-alert-delete'))
            return;
        if (!IndexNavbar.data.isLogged && AppNavbar.data.isLogged) {
            App.data.showSuccess = false;
            App.detach(SuccessAlert);
        }
        else {
            Index.data.showSuccess = false;
            Index.detach(SuccessAlert);
        }
    }
    /**
     *
     * ALBUM GRID ACTIONS
     *
     */
    function retrieveAlbums(e) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, response, _a, albums, error, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('#album-grid') || AlbumGrid.data.attempted)
                            return [2 /*return*/];
                        AlbumGrid.data.attempted = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/albums")];
                    case 2:
                        response = _b.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        albums = _b.sent();
                        AlbumGrid.data.albums = __spread$2(albums);
                        sortableGrid(document.getElementById('album-grid'), function () { return updateOrder(); });
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _b.sent();
                        ErrorAlert.data.message = 'OPS! Something went wrong! ' + error.error;
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        return [2 /*return*/];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_5 = _b.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        console.error(error_5);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    function updateOrder() {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, _a, _b, album, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _loop_1 = function (album) {
                            var id, newOrder, body, alb, response, error, success, error_6;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        id = album.dataset.id;
                                        newOrder = album.dataset.order;
                                        body = new FormData();
                                        body.append('albumId', id);
                                        body.append('newOrder', newOrder);
                                        alb = AlbumGrid.data.albums.find(function (album) { return album.id === parseInt(id); });
                                        alb.order = parseInt(newOrder);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 6, , 7]);
                                        return [4 /*yield*/, fetch(contextPath + "/albums", { method: 'PUT', body: body })];
                                    case 2:
                                        response = _a.sent();
                                        if (!(response.status !== 200)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, response.json()];
                                    case 3:
                                        error = _a.sent();
                                        ErrorAlert.data.message = 'OPS! Something went wrong! ' + error.error;
                                        App.data.showError = true;
                                        App.attach(ErrorAlert);
                                        return [2 /*return*/, "continue"];
                                    case 4: return [4 /*yield*/, response.json()];
                                    case 5:
                                        success = _a.sent();
                                        return [3 /*break*/, 7];
                                    case 6:
                                        error_6 = _a.sent();
                                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                                        App.data.showError = true;
                                        App.attach(ErrorAlert);
                                        console.error(error_6);
                                        return [3 /*break*/, 7];
                                    case 7: return [2 /*return*/];
                                }
                            });
                        };
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(document.getElementById('album-grid').children), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        album = _b.value;
                        return [5 /*yield**/, _loop_1(album)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    function openAlbum(e) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, albumId, album, images, response, _a, albumDetailComponent, error, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('.album'))
                            return [2 /*return*/];
                        albumId = parseInt(elem.dataset.id);
                        album = AlbumGrid.data.albums.find(function (a) { return a.id === albumId; });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/images?albumId=" + albumId)];
                    case 2:
                        response = _b.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        images = _b.sent();
                        albumDetailComponent = makeAlbumDetailComponent(album, images);
                        App.data.currentAlbum = albumDetailComponent;
                        App.data.showDashboard = false;
                        App.data.showAlbum = true;
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _b.sent();
                        ErrorAlert.data.message = 'Something went wrong! ' + error.error;
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        return [2 /*return*/];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_7 = _b.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        console.error(error_7);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    /**
     *
     * ADD ALBUM FORM ACTIONS
     *
     */
    function handleAddAlbumTitle(e) {
        var elem = e.target;
        if (!elem.matches('#add-album-title'))
            return;
        AddAlbumForm.data.albumTitle = elem.value;
    }
    function addAlbum(e) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, body, response, _a, album, error, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('#add-album-form'))
                            return [2 /*return*/];
                        e.preventDefault();
                        body = new FormData();
                        body.append('title', AddAlbumForm.data.albumTitle);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/albums", { method: 'post', body: body })];
                    case 2:
                        response = _b.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        album = _b.sent();
                        AlbumGrid.data.albums.push(album);
                        AddAlbumForm.data.albumTitle = '';
                        AddAlbumForm.data.albumTitleError = '';
                        AddAlbumForm.data.genericError = false;
                        document.querySelector('#add-album-form').reset();
                        AlbumGrid.render();
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _b.sent();
                        AddAlbumForm.data.genericError = true;
                        ErrorAlert.data.message = error.error;
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        return [2 /*return*/];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_8 = _b.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        console.error(error_8);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    /**
     *
     * ADD IMAGE FORM ACTIONS
     *
     */
    function handleAddImageTitle(e) {
        var elem = e.target;
        if (!elem.matches('#add-image-title'))
            return;
        if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm)
            return;
        App.data.currentAlbum.data.imageForm.data.title = elem.value;
    }
    function handleAddImageDescription(e) {
        var elem = e.target;
        if (!elem.matches('#add-image-description'))
            return;
        if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm)
            return;
        App.data.currentAlbum.data.imageForm.data.description = elem.value;
    }
    function handleAddImageFile(e) {
        var elem = e.target;
        if (!elem.matches('#add-image-file'))
            return;
        if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm)
            return;
        if (elem.files === null)
            return;
        App.data.currentAlbum.data.imageForm.data.file = elem.files[0];
    }
    function addImage(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var elem, form, body, response, _b, image, error, error_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('#add-image-form'))
                            return [2 /*return*/];
                        e.preventDefault();
                        LoadingModal.data.showModal = true;
                        LoadingModal.data.text = 'Uploading image...';
                        document.querySelector('body').style.pointerEvents = 'none';
                        if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm)
                            return [2 /*return*/];
                        form = App.data.currentAlbum.data.imageForm;
                        body = new FormData();
                        body.append('albumId', form.data.albumId.toString());
                        body.append('title', form.data.title);
                        body.append('description', form.data.description);
                        body.append('imageFile', form.data.file, (_a = form.data.file) === null || _a === void 0 ? void 0 : _a.name);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/images", { method: 'post', body: body })];
                    case 2:
                        response = _c.sent();
                        _b = response.status;
                        switch (_b) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        image = _c.sent();
                        App.data.currentAlbum.data.images.push(image);
                        App.data.currentAlbum.render();
                        form.data.description = '';
                        form.data.title = '';
                        form.data.file = null;
                        document.querySelector('#add-image-form').reset();
                        LoadingModal.data.showModal = false;
                        document.querySelector('body').style.pointerEvents = 'auto';
                        App.data.currentAlbum.data.imageGrid.data.page = 1;
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _c.sent();
                        ErrorAlert.data.message = 'Something went wrong! ' + error.error;
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        LoadingModal.data.showModal = false;
                        document.querySelector('body').style.pointerEvents = 'auto';
                        return [2 /*return*/];
                    case 7: return [2 /*return*/];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_9 = _c.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        LoadingModal.data.showModal = false;
                        document.querySelector('body').style.pointerEvents = 'auto';
                        console.error(error_9);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    /**
     *
     * IMAGE GRID ACTIONS
     *
     */
    function nextPage(e) {
        var elem = e.target;
        if (!elem.matches('#next-page-btn'))
            return;
        if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageGrid)
            return;
        App.data.currentAlbum.data.imageGrid.data.page += 1;
    }
    function prevPage(e) {
        var elem = e.target;
        if (!elem.matches('#prev-page-btn'))
            return;
        if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageGrid)
            return;
        App.data.currentAlbum.data.imageGrid.data.page -= 1;
    }
    function openImage(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var elem, image, comments, response, _b, imageDetailComponent, error, error_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        elem = e.target;
                        if (!('matches' in elem) || !elem.matches('.image'))
                            return [2 /*return*/];
                        image = (_a = App.data.currentAlbum) === null || _a === void 0 ? void 0 : _a.data.images.find(function (img) { return img.id === parseInt(elem.dataset.id); });
                        if (image === undefined)
                            return [2 /*return*/];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/comments?imageId=" + image.id)];
                    case 2:
                        response = _c.sent();
                        _b = response.status;
                        switch (_b) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        comments = _c.sent();
                        imageDetailComponent = makeImageDetailComponent(image, comments);
                        App.data.currentImage = imageDetailComponent;
                        App.data.showImage = true;
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _c.sent();
                        ErrorAlert.data.message = 'Something went wrong! ' + error.error;
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        return [2 /*return*/];
                    case 7: return [2 /*return*/];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_10 = _c.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        console.error(error_10);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    /**
     *
     * IMAGE DETAIL ACTIONS
     *
     */
    function closeModal(e) {
        var elem = e.target;
        if (!elem.matches('#image-detail-modal'))
            return;
        App.data.showImage = false;
        App.data.currentImage = null;
    }
    function handleAddCommentBody(e) {
        var elem = e.target;
        if (!elem.matches('#add-comment-body'))
            return;
        if (!App.data.currentImage)
            return;
        App.data.currentImage.data.commentBody = elem.value;
    }
    function onCommentInputFocus(e) {
        var elem = e.target;
        if (!elem.matches('#add-comment-body'))
            return;
        if (!App.data.currentImage)
            return;
        if (!App.data.currentImage.data.commentBodyError)
            return;
        elem.value = '';
        App.data.currentImage.data.commentBodyError = false;
    }
    function addComment(e) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, imageDetail, input, body, response, _a, comment, error, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('#add-comment-form'))
                            return [2 /*return*/];
                        if (!App.data.currentImage)
                            return [2 /*return*/];
                        e.preventDefault();
                        imageDetail = App.data.currentImage;
                        if (imageDetail.data.commentBody.trim() === '') {
                            imageDetail.data.commentBodyError = true;
                            input = document.querySelector('#add-comment-body');
                            input.value = 'You cannot send empty message!';
                            return [2 /*return*/];
                        }
                        body = new FormData();
                        console.log(imageDetail.data.commentBody);
                        body.append('body', imageDetail.data.commentBody);
                        body.append('imageId', imageDetail.data.image.id.toString());
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/comments", { method: 'post', body: body })];
                    case 2:
                        response = _b.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        comment = _b.sent();
                        imageDetail.data.comments.push(comment);
                        imageDetail.render();
                        imageDetail.data.commentBody = '';
                        document.querySelector('#add-comment-form').reset();
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _b.sent();
                        ErrorAlert.data.message = 'Something went wrong! ' + error.error;
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        App.data.showImage = false;
                        App.data.currentImage = null;
                        return [2 /*return*/];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_11 = _b.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                        App.data.showImage = false;
                        App.data.currentImage = null;
                        console.error(error_11);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!isLogged()) {
            window.location.href = contextPath;
        }
        document.addEventListener('render', function (event) {
            retrieveAlbums(event);
        });
        document.addEventListener('click', function (event) {
            // ALERTS
            deleteSuccessAlert(event);
            deleteErrorAlert(event);
            // APP NAVBAR
            appSignOut(event);
            appGoToDashboard(event);
            // DASHBOARD
            openAlbum(event);
            // ALBUM DETAIL
            prevPage(event);
            nextPage(event);
            // IMAGE DETAIL
            closeModal(event);
        });
        document.addEventListener('submit', function (event) {
            addAlbum(event);
            addImage(event);
            addComment(event);
        });
        document.addEventListener('focusin', function (event) {
            onCommentInputFocus(event);
        });
        document.addEventListener('change', function (event) {
            // ADD ALBUM
            handleAddAlbumTitle(event);
            // ADD IMAGE
            handleAddImageFile(event);
            handleAddImageTitle(event);
            handleAddImageDescription(event);
            // ADD COMMENT
            handleAddCommentBody(event);
        });
        document.addEventListener('mouseover', function (event) {
            openImage(event);
        });
        AppNavbar.data.isLogged = true;
        App.render();
        LoadingModal.render();
        AppNavbar.render();
        Dashboard.render();
        AddAlbumForm.render();
        AlbumGrid.render();
    });

}());

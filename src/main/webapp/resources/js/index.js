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
    function validateEmail(mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    }
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
        showSuccess: false,
        showError: false
    };
    var template = function (props) { return "\n\t<header id=\"index-navbar\" class='header'></header>\n\t<main class=\"bg-gray-100 flex-grow\">\n\t\t<div class=\"container mx-auto p-4\">\n\t\t\t<section id='error-alert' class='mt-5 flex w-full justify-center items-center " + (props.showError ? '' : 'hidden') + "'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center " + (props.showSuccess ? '' : 'hidden') + "'></section>\n\t\t\t<section id='signin-section'></section>\n\t\t\t<section id='signup-section'></section>\n\t\t</div>\n\t</main>\n"; };
    var Index = new Yogurt({
        selector: '#app',
        data: data,
        template: template
    });

    var data$1 = {
        isLogged: false,
    };
    var template$1 = function (props) { return "\n\t<nav>\n\t\t<div class=\"container mx-auto\">\n\t\t\t<div class=\"w-full flex justify-between items-center\">\n\t\t\t\t<a id=\"home-btn\" href=\"" + contextPath + "\" class=\"brand-logo\">Image Gallery</a>\n\t\t\t\t<div class=\"flex-grow ml-6\">\n\t\t\t\t\t<a id=\"dashboard-btn\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? '' : 'hidden') + "\">Dashboard</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t<a id=\"signout-btn\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? '' : 'hidden') + "\">Sign Out</a>\n\t\t\t\t\t<a id=\"signin-nav\" href=\"#\" class=\"btn btn-blue mr-3 " + (props.isLogged ? 'hidden' : '') + "\">Sign In</a>\n\t\t\t\t\t<a id=\"signup-nav\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? 'hidden' : '') + "\">Sign Up</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n"; };
    var IndexNavbar = new Yogurt({
        selector: '#index-navbar',
        data: data$1,
        template: template$1,
        attachTo: Index
    });

    var data$2 = {
        showError: false,
        showSuccess: false,
        showDashboard: true,
        showAlbum: false,
        showImage: false,
        currentAlbum: null,
        currentImage: null,
    };
    var template$2 = function (props) { return "\n\t<div id='loading-modal'></div>\n\t<header id=\"app-navbar\" class='header'></header>\n\t<main class=\"bg-gray-100 flex-grow\">\n\t\t<div class=\"container mx-auto p-4\">\n\t\t\t<section id='error-alert' class='mt-5 flex w-full justify-center items-center " + (props.showError ? '' : 'hidden') + "'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center " + (props.showSuccess ? '' : 'hidden') + "'></section>\n\t\t\t<section id='dashboard-section' class=\"" + (props.showDashboard ? '' : 'hidden') + "\"></section>\n\t\t\t<section id='album-detail-section' class=\"" + (props.showAlbum ? '' : 'hidden') + "\"></section>\n\t\t\t<section id='image-detail-section' class=\"" + (props.showImage ? '' : 'hidden') + "\"></section>\n\t\t</div>\n\t</main>\n"; };
    var App = new Yogurt({
        selector: '#app',
        data: data$2,
        template: template$2
    });

    var data$3 = {};
    var template$3 = function (props) { return "\n\t<div class=\"mt-6 w-full flex justify-center\">\n\t\t<div id='add-album-section' class=\"rounded p-2 shadow-xl flex flex-col justify-start bg-blue-600\"></div>\n\t</div>\n\n\t<div class=\"my-6 w-full flex flex-wrap justify-center\" >\n\t\t<div class=\"w-full mb-2 text-lg font-bold text-blue-500 border-b border-blue-500\">Albums</div>\n\t\t<div class=\"w-full text-sm mb-4 text-gray-800\">Drag and drop an album to sort it differently.</div>\n\t\t<section id=\"album-grid\" class=\"w-full album-grid\"></section>\n\t</div>\n"; };
    var Dashboard = new Yogurt({
        selector: '#dashboard-section',
        data: data$3,
        template: template$3,
        attachTo: App
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
        message: ''
    };
    var template$6 = function (props) { return "\n\t<div class=\"w-full md:w-1/2\" role=\"alert\" >\n\t\t<div class=\"bg-green-500 text-white font-bold rounded-t px-4 py-2 flex justify-between\">\n\t\t\t<span class=\"flex-grow font-bold\">SUCCESS!</span>\n\t\t\t<button id='error-alert-delete' class=\"alert-delete transition-default hover:text-green-800\"><i class=\"fas fa-times pointer-events-none\"></i></button>\n\t\t</div>\n\t\t<div class=\"border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700\">\n\t\t\t<p id=\"success-body\">" + props.message + "</p>\n\t\t</div>\n\t</div>\n"; };
    var SuccessAlert = new Yogurt({
        selector: '#success-alert',
        data: data$6,
        template: template$6,
    });

    var data$7 = {
        isLogged: false
    };
    var template$7 = function (props) { return "\n\t<nav>\n\t\t<div class=\"container mx-auto\">\n\t\t\t<div class=\"w-full flex justify-between items-center\">\n\t\t\t\t<a id=\"home-btn\" href=\"" + contextPath + "\" class=\"brand-logo\">Image Gallery</a>\n\t\t\t\t<div class=\"flex-grow ml-6\">\n\t\t\t\t\t<a id=\"dashboard-nav\" href=\"#\" class=\"btn btn-blue\">Dashboard</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t<a id=\"signout-btn\" href=\"#\" class=\"btn btn-blue\">Sign Out</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n"; };
    var AppNavbar = new Yogurt({
        selector: '#app-navbar',
        data: data$7,
        template: template$7,
        attachTo: App
    });

    var data$8 = {
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
    var template$8 = function (props) { return "\n\t<div class=\"w-full flex justify-center\">\n\t\t<div class=\"w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600\">\n\t\t\t<div class=\"text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200\">Sign Up</div>\n\t\t\t<form id=\"signup-form\" action=\"#\">\n\t\t\t\t<input id=\"username-signup\" type=\"text\" maxlength=\"45\" name=\"username\" placeholder=\"Username\" class=\"w-full rounded p-2 mb-2 " + (props.usernameError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"username-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.usernameError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.usernameError + "</div>\n\n\t\t\t\t<input id=\"email-signup\" type=\"email\" name=\"email\" placeholder=\"Email\" class=\"w-full rounded p-2 mb-2 " + (props.emailError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"email-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.emailError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.emailError + "</div>\n\n\t\t\t\t<input id=\"password-signup\" type=\"password\" maxlength=\"45\" name=\"password\" placeholder=\"Password\" class=\"w-full rounded p-2 mb-2 " + (props.passwordError || props.passwordConfirmError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"password-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.passwordError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.passwordError + "</div>\n\n\t\t\t\t<input id=\"confirm-password-signup\" type=\"password\" maxlength=\"45\" name=\"passwordCheck\" placeholder=\"Confirm Password\" class=\"flex w-full rounded p-2 mb-2 " + (props.passwordConfirmError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"confirm-password-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.passwordConfirmError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.passwordConfirmError + "</div>\n\n\t\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Sign Up\" />\n\t\t\t</form>\n\t\t</div>\n\t</div>\n"; };
    var SignUp = new Yogurt({
        selector: '#signup-section',
        data: data$8,
        template: template$8,
    });

    var data$9 = {
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
        genericError: false,
        remember: false,
    };
    var template$9 = function (props) { return "\n\t<div class=\"w-full flex justify-center\">\n\t<div class=\"w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600\">\n\t\t<div class=\"text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200\">Sign In</div>\n\t\t<form id=\"signin-form\" action=\"#\">\n\t\t\t<input id=\"username-signin\" type=\"text\" name=\"username\" placeholder=\"Username\" class=\"w-full rounded p-2 mb-2 " + (props.usernameError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t<div id=\"username-signin-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold " + (props.usernameError ? '' : 'hidden') + "\">" + props.usernameError + "</div>\n\n\t\t\t<input id=\"password-signin\" type=\"password\" name=\"password\" placeholder=\"Password\" class=\"w-full rounded p-2 mb-2 " + (props.passwordError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t<div id=\"password-signin-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold " + (props.passwordError ? '' : 'hidden') + "\">" + props.passwordError + "</div>\n\t\t\t<div class=\"w-full mb-2 p-2\">\n\t\t\t\t<label class=\"text-gray-200\">\n\t\t\t\t\t<input class='mr-4' type=\"checkbox\" name=\"remember\" id=\"remember-signin\" " + (props.remember ? 'checked' : '') + " />\n\t\t\t\t\tRemember me?\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Sign In\" />\n\t\t</form>\n\t</div>\n\t</div>\n"; };
    var SignIn = new Yogurt({
        selector: '#signin-section',
        data: data$9,
        template: template$9,
    });

    var data$a = {
        albumTitle: '',
        albumTitleError: '',
        genericError: false
    };
    var template$a = function (props) { return "\n\t<div class=\"text-xl border-b-2 border-gray-200 mb-4 p-1 text-gray-200\">Add New Album</div>\n\t<form id=\"add-album-form\" action=\"#\" class=\"flex justify-between items-center\">\n\t\t<input id=\"add-album-title\" type=\"text\" maxlength=\"45\" name=\"title\" placeholder=\"Album Title\" class=\"rounded p-2 flex-grow mr-4 " + (props.albumTitleError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Add\" />\n\t</form>\n"; };
    var AddAlbumForm = new Yogurt({
        selector: '#add-album-section',
        data: data$a,
        template: template$a,
        attachTo: Dashboard
    });

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
     * SIGNUP ACTIONS
     *
     */
    function handleSignUpUsername(e) {
        var elem = e.target;
        if (!elem.matches('#username-signup'))
            return;
        SignUp.data.username = elem.value;
    }
    function handleSignUpEmail(e) {
        var elem = e.target;
        if (!elem.matches('#email-signup'))
            return;
        SignUp.data.email = elem.value;
        if (!validateEmail(SignUp.data.email))
            SignUp.data.emailError = 'Enter a valid email address!';
        else
            SignUp.data.emailError = '';
    }
    function handleSignUpPassword(e) {
        var elem = e.target;
        if (!elem.matches('#password-signup'))
            return;
        SignUp.data.password = elem.value;
        if (SignUp.data.password !== SignUp.data.passwordConfirm) {
            SignUp.data.passwordConfirmError = 'Passwords do not match';
            SignUp.data.passwordError = 'Passwords do not match';
        }
        else {
            SignUp.data.passwordConfirmError = '';
            SignUp.data.passwordError = '';
        }
    }
    function handleSignUpPasswordConfirm(e) {
        var elem = e.target;
        if (!elem.matches('#confirm-password-signup'))
            return;
        SignUp.data.passwordConfirm = elem.value;
        if (SignUp.data.password !== SignUp.data.passwordConfirm) {
            SignUp.data.passwordConfirmError = 'Passwords do not match';
            SignUp.data.passwordError = 'Passwords do not match';
        }
        else {
            SignUp.data.passwordConfirmError = '';
            SignUp.data.passwordError = '';
        }
    }
    function handleSignUpSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, body, response, _a, user, error, err, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('#signup-form'))
                            return [2 /*return*/];
                        e.preventDefault();
                        if (IndexNavbar.data.isLogged)
                            return [2 /*return*/];
                        body = new FormData();
                        body.append('username', SignUp.data.username);
                        body.append('password', SignUp.data.password);
                        body.append('email', SignUp.data.email);
                        body.append('passwordCheck', SignUp.data.passwordConfirm);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, fetch(contextPath + "/signup", { method: 'POST', body: body })];
                    case 2:
                        response = _b.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 401: return [3 /*break*/, 7];
                            case 500: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        user = _b.sent();
                        sessionStorage.setItem('user', JSON.stringify(user));
                        SignUp.data.username = '';
                        SignUp.data.email = '';
                        SignUp.data.password = '';
                        SignUp.data.passwordConfirm = '';
                        SignUp.data.usernameError = '';
                        SignUp.data.emailError = '';
                        SignUp.data.passwordError = '';
                        SignUp.data.passwordConfirmError = '';
                        SignUp.data.genericError = false;
                        document.querySelector('#signup-form').reset();
                        window.location.href = contextPath + "/app.html";
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _b.sent();
                        SignUp.data.genericError = false;
                        if (error.field === 'username')
                            SignUp.data.usernameError = error.error;
                        else if (error.field === 'password')
                            SignUp.data.passwordError = error.error;
                        else if (error.field === 'email')
                            SignUp.data.emailError = error.error;
                        else if (error.field === 'confirmPassword')
                            SignUp.data.passwordConfirmError = error.error;
                        return [2 /*return*/];
                    case 7: return [4 /*yield*/, response.json()];
                    case 8:
                        err = _b.sent();
                        SignUp.data.passwordError = '';
                        SignUp.data.usernameError = '';
                        SignUp.data.genericError = true;
                        ErrorAlert.data.message = err.error;
                        Index.data.showError = true;
                        Index.attach(ErrorAlert);
                        return [2 /*return*/];
                    case 9: return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _b.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        Index.data.showError = true;
                        Index.attach(ErrorAlert);
                        console.error(error_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
    /**
     *
     * SIGNIN ACTIONS
     *
     */
    function handleSignInUsername(e) {
        var elem = e.target;
        if (!elem.matches('#username-signin'))
            return;
        SignIn.data.username = elem.value;
    }
    function handleSignInPassword(e) {
        var elem = e.target;
        if (!elem.matches('#password-signin'))
            return;
        SignIn.data.password = elem.value;
    }
    function handleSignInRemember(e) {
        var elem = e.target;
        if (!elem.matches('#remember-signin'))
            return;
        SignIn.data.remember = elem.checked;
    }
    function handleSignInSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, body, response, _a, user, userWithExpiration, error, err, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('#signin-form'))
                            return [2 /*return*/];
                        e.preventDefault();
                        if (IndexNavbar.data.isLogged)
                            return [2 /*return*/];
                        body = new FormData();
                        body.append('username', SignIn.data.username);
                        body.append('password', SignIn.data.password);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, fetch(contextPath + "/signin", { method: 'POST', body: body })];
                    case 2:
                        response = _b.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 401: return [3 /*break*/, 7];
                            case 500: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        user = _b.sent();
                        sessionStorage.setItem('user', JSON.stringify(user));
                        if (SignIn.data.remember) {
                            userWithExpiration = {
                                user: user,
                                expiry: new Date().getTime() + 1000 * 60 * 60 * 12,
                            };
                            localStorage.setItem('user', JSON.stringify(userWithExpiration));
                        }
                        IndexNavbar.data.isLogged = true;
                        SignIn.data.username = '';
                        SignIn.data.password = '';
                        SignIn.data.usernameError = '';
                        SignIn.data.passwordError = '';
                        SignIn.data.genericError = false;
                        SignIn.data.remember = false;
                        document.querySelector('#signin-form').reset();
                        window.location.href = contextPath + "/app.html";
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _b.sent();
                        SignIn.data.genericError = false;
                        if (error.field === 'username') {
                            SignIn.data.usernameError = error.error;
                        }
                        else if (error.field === 'password') {
                            SignIn.data.passwordError = error.error;
                        }
                        return [2 /*return*/];
                    case 7: return [4 /*yield*/, response.json()];
                    case 8:
                        err = _b.sent();
                        SignIn.data.passwordError = '';
                        SignIn.data.usernameError = '';
                        SignIn.data.genericError = true;
                        ErrorAlert.data.message = err.error;
                        Index.data.showError = true;
                        Index.attach(ErrorAlert);
                        return [2 /*return*/];
                    case 9: return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        Index.data.showError = true;
                        Index.attach(ErrorAlert);
                        console.error(error_2);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
    /**
     *
     * INDEX NAVBAR ACTIONS
     *
     */
    function toggleSignIn(e) {
        var elem = e.target;
        if (!elem.matches('#signin-nav'))
            return;
        if (IndexNavbar.data.isLogged)
            return;
        Index.attach(SignIn);
        Index.detach(SignUp);
        Index.render();
    }
    function toggleSignUp(e) {
        var elem = e.target;
        if (!elem.matches('#signup-nav'))
            return;
        if (IndexNavbar.data.isLogged)
            return;
        Index.attach(SignUp);
        Index.detach(SignIn);
        Index.render();
    }
    function indexSignOut(e) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elem = e.target;
                        if (!elem.matches('#signout-btn'))
                            return [2 /*return*/];
                        if (!IndexNavbar.data.isLogged)
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
                            Index.data.showSuccess = true;
                            Index.attach(SuccessAlert);
                            window.location.href = contextPath;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                        Index.data.showError = true;
                        Index.attach(ErrorAlert);
                        console.error(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function indexGoToDashboard(e) {
        var elem = e.target;
        if (!elem.matches('#dashboard-btn'))
            return;
        if (!IndexNavbar.data.isLogged)
            return;
        window.location.href = contextPath + "/app.html";
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

    document.addEventListener('DOMContentLoaded', function () {
        if (isLogged()) {
            IndexNavbar.data.isLogged = true;
        }
        document.addEventListener('click', function (event) {
            // ALERTS
            deleteSuccessAlert(event);
            deleteErrorAlert(event);
            // INDEX NAVBAR
            toggleSignIn(event);
            toggleSignUp(event);
            indexSignOut(event);
            indexGoToDashboard(event);
        });
        document.addEventListener('keyup', function (event) {
            // SIGNUP
            handleSignUpUsername(event);
            handleSignUpEmail(event);
            handleSignUpPassword(event);
            handleSignUpPasswordConfirm(event);
            // SIGNIN
            handleSignInUsername(event);
            handleSignInPassword(event);
        });
        document.addEventListener('submit', function (event) {
            handleSignUpSubmit(event);
            handleSignInSubmit(event);
        });
        document.addEventListener('change', function (event) {
            handleSignInRemember(event);
        });
        Index.render();
        IndexNavbar.render();
    });

}());

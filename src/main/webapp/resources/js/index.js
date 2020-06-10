!function(){"use strict";var l="/image-gallery-js",r=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,a,s=r.call(t),o=[];try{for(;(void 0===e||0<e--)&&!(n=s.next()).done;)o.push(n.value)}catch(t){a={error:t}}finally{try{n&&!n.done&&(r=s.return)&&r.call(s)}finally{if(a)throw a.error}}return o},d=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(r(arguments[e]));return t},t=(Object.defineProperty(e.prototype,"data",{get:function(){return this._data},set:function(t){this._data=new Proxy(t,this.proxyHandler()),this.debounceRender()},enumerable:!1,configurable:!0}),e.prototype.attach=function(t){"array"===this.trueTypeOf(t)?this.attached.concat(t):this.attached.push(t)},e.prototype.detach=function(e){var r="array"===this.trueTypeOf(e);this.attached=this.attached.filter(function(t){return r?-1===e.indexOf(t):t!==e})},e.prototype.debounceRender=function(){var t=this;this.debounce&&window.cancelAnimationFrame(this.debounce),this.debounce=window.requestAnimationFrame(function(){return t.render()})},e.prototype.trueTypeOf=function(t){return void 0===t?"undefined":null===t?"null":t.toString().slice(8,-1).toLowerCase()},e.prototype.proxyHandler=function(){var n=this;return{get:function(t,e){return-1<["object","array"].indexOf(n.trueTypeOf(t[e]))?new Proxy(t[e],n.proxyHandler()):t[e]},set:function(t,e,r){return t[e]===r||(t[e]=r,n.debounceRender()),!0},deleteProperty:function(t,e){return delete t[e],n.debounceRender(),!0}}},e.prototype.stringToHTML=function(t){return(new DOMParser).parseFromString(t,"text/html").body},e.prototype.getNodeType=function(t){return 3===t.nodeType?"text":8===t.nodeType?"comment":t.tagName.toLowerCase()},e.prototype.getNodeContent=function(t){return t.childNodes&&0<t.childNodes.length?null:t.textContent},e.prototype.getStyleMap=function(t){return t.split(";").reduce(function(t,e){var r=e.indexOf(":");return r&&t.push({name:e.slice(0,r).trim(),value:e.slice(r+1).trim()}),t},[])},e.prototype.removeStyles=function(e,t){t.forEach(function(t){return e.style[t]=""})},e.prototype.changeStyles=function(e,t){t.forEach(function(t){return e.style[t.name]=t.value})},e.prototype.diffStyles=function(r,t){var n=this.getStyleMap(t),e=d(r.style).filter(function(e){return void 0===n.find(function(t){return t.name===e&&t.value===r.style[e]})});this.removeStyles(r,e),this.changeStyles(r,n)},e.prototype.addAttributes=function(e,t){var r=this;t.forEach(function(t){if("class"===t.att)e.className=t.value;else if("style"===t.att)r.diffStyles(e,t.value);else{if(t.att in e)try{e[t.att]=t.value,e[t.att]||0===e[t.att]||(e[t.att]=!0)}catch(t){}try{e.setAttribute(t.att,t.value)}catch(t){}}})},e.prototype.removeAttributes=function(e,t){var r=this;t.forEach(function(t){if("class"===t.att)e.className="";else if("style"===t.att)r.removeStyles(e,d(e.style).slice());else{if(t.att in e)try{e[t.att]=""}catch(t){}try{e.removeAttribute(t.att)}catch(t){}}})},e.prototype.getDynamicAttributes=function(e,r,n){var a=this;this.dynamicAttributes.forEach(function(t){!e[t]&&0!==e[t]||n&&"option"===e.tagName.toLowerCase()&&"selected"===t||n&&"select"===e.tagName.toLowerCase()&&"value"===t||r.push(a.getAttribute(t,e[t]))})},e.prototype.getBaseAttributes=function(t,r){var n=this;return d(t.attributes).reduce(function(t,e){return!(n.dynamicAttributes.indexOf(e.name)<0||r&&"selected"===e.name)||7<e.name.length&&"default"===e.name.slice(0,7)||t.push(n.getAttribute(e.name,e.value)),t},[])},e.prototype.getAttribute=function(t,e){return{att:t,value:e}},e.prototype.getAttributes=function(t,e){if(1!==t.nodeType)return[];var r=this.getBaseAttributes(t,e);return this.getDynamicAttributes(t,r,e),r},e.prototype.diffAtts=function(t,e){var r=this,n=this.getAttributes(t,!0),a=this.getAttributes(e,!1),s=a.filter(function(e){return!(-1<r.dynamicAttributes.indexOf(e.att))&&void 0===n.find(function(t){return e.att===t.att})}),o=n.filter(function(e){var t=a.find(function(t){return e.att===t.att});return void 0===t||t.value!==e.value});this.addAttributes(e,o),this.removeAttributes(e,s)},e.prototype.addDefaultAtts=function(e){var r=this;1===e.nodeType&&(d(e.attributes).forEach(function(t){t.name.length<8||"default"!==t.name.slice(0,7)||(r.addAttributes(e,[r.getAttribute(t.name.slice(7).toLowerCase(),t.value)]),r.removeAttributes(e,[r.getAttribute(t.name,t.value)]))}),e.childNodes&&d(e.childNodes).forEach(function(t){return r.addDefaultAtts(t)}))},e.prototype.diffingDOM=function(t,a,s){var o=this,i=d(a.childNodes).slice(),e=d(t.childNodes).slice(),r=i.length-e.length;if(0<r)for(;0<r;r--)i[i.length-r].parentNode.removeChild(i[i.length-r]);e.forEach(function(e,t){if(!i[t])return o.addDefaultAtts(e),void a.appendChild(e.cloneNode(!0));if(o.getNodeType(e)===o.getNodeType(i[t])){if(o.diffAtts(e,i[t]),!(0<s.filter(function(t){return 3!==e.nodeType&&e.matches(t)}).length)){var r=o.getNodeContent(e);if(r&&r!==o.getNodeContent(i[t])&&(i[t].textContent=r),0<i[t].childNodes.length&&e.childNodes.length<1)i[t].innerHTML="";else{if(i[t].childNodes.length<1&&0<e.childNodes.length){var n=document.createDocumentFragment();return o.diffingDOM(e,n,s),void i[t].appendChild(n)}0<e.childNodes.length&&o.diffingDOM(e,i[t],s)}}}else i[t].parentNode.replaceChild(e.cloneNode(!0),i[t])})},e.prototype.renderAttachments=function(t){t&&t.forEach(function(t){"render"in t&&t.render()})},e.prototype.render=function(){var t=document.querySelector(this.elem),e=this.stringToHTML(this.template(this._data)),r=this.attached.map(function(t){return t.elem});this.diffingDOM(e,t,r),t.dispatchEvent(new CustomEvent("render",{bubbles:!0,detail:this._data})),this.renderAttachments(this.attached)},e);function e(t){var e=this;this.enabled=!1,this.dynamicAttributes=["checked","selected","value"],this.attached=[],this.elem=t.selector,this._data=new Proxy(t.data,this.proxyHandler()),this.template=t.template,this.debounce=0,t.attachTo&&("array"===this.trueTypeOf(t.attachTo)?t.attachTo:[t.attachTo]).forEach(function(t){return"attach"in t&&t.attach(e)})}var u=new t({selector:"#app",data:{showSuccess:!1,showError:!1},template:function(t){return'\n\t<header id="index-navbar" class=\'header\'></header>\n\t<main class="bg-gray-100 flex-grow">\n\t\t<div class="container mx-auto p-4">\n\t\t\t<section id=\'error-alert\' class=\'mt-5 flex w-full justify-center items-center '+(t.showError?"":"hidden")+"'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center "+(t.showSuccess?"":"hidden")+"'></section>\n\t\t\t<section id='signin-section'></section>\n\t\t\t<section id='signup-section'></section>\n\t\t</div>\n\t</main>\n"}}),c=new t({selector:"#index-navbar",data:{isLogged:!1},template:function(t){return'\n\t<nav>\n\t\t<div class="container mx-auto">\n\t\t\t<div class="w-full flex justify-between items-center">\n\t\t\t\t<a id="home-btn" href="'+l+'" class="brand-logo">Image Gallery</a>\n\t\t\t\t<div class="flex-grow ml-6">\n\t\t\t\t\t<a id="dashboard-btn" href="#" class="btn btn-blue '+(t.isLogged?"":"hidden")+'">Dashboard</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="flex">\n\t\t\t\t\t<a id="signout-btn" href="#" class="btn btn-blue '+(t.isLogged?"":"hidden")+'">Sign Out</a>\n\t\t\t\t\t<a id="signin-nav" href="#" class="btn btn-blue mr-3 '+(t.isLogged?"hidden":"")+'">Sign In</a>\n\t\t\t\t\t<a id="signup-nav" href="#" class="btn btn-blue '+(t.isLogged?"hidden":"")+'">Sign Up</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n'},attachTo:u}),n=new t({selector:"#app",data:{showError:!1,showSuccess:!1,showDashboard:!0,showAlbum:!1,showImage:!1,currentAlbum:null,currentImage:null},template:function(t){return"\n\t<div id='loading-modal'></div>\n\t<header id=\"app-navbar\" class='header'></header>\n\t<main class=\"bg-gray-100 flex-grow\">\n\t\t<div class=\"container mx-auto p-4\">\n\t\t\t<section id='error-alert' class='mt-5 flex w-full justify-center items-center "+(t.showError?"":"hidden")+"'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center "+(t.showSuccess?"":"hidden")+"'></section>\n\t\t\t<section id='dashboard-section' class=\""+(t.showDashboard?"":"hidden")+"\"></section>\n\t\t\t<section id='album-detail-section' class=\""+(t.showAlbum?"":"hidden")+"\"></section>\n\t\t\t<section id='image-detail-section' class=\""+(t.showImage?"":"hidden")+'"></section>\n\t\t</div>\n\t</main>\n'}}),a=new t({selector:"#dashboard-section",data:{},template:function(t){return'\n\t<div class="mt-6 w-full flex justify-center">\n\t\t<div id=\'add-album-section\' class="rounded p-2 shadow-xl flex flex-col justify-start bg-blue-600"></div>\n\t</div>\n\n\t<div class="my-6 w-full flex flex-wrap justify-center" >\n\t\t<div class="w-full mb-2 text-lg font-bold text-blue-500 border-b border-blue-500">Albums</div>\n\t\t<div class="w-full text-sm mb-4 text-gray-800">Drag and drop an album to sort it differently.</div>\n\t\t<section id="album-grid" class="w-full album-grid"></section>\n\t</div>\n'},attachTo:n}),f=(new t({selector:"#album-grid",data:{albums:[],attempted:!1},template:function(t){return t.albums.length?t.albums.sort(function(t,e){return e.order-t.order}).map(function(t){return'\n\t\t<div id="album-'+t.id+'" data-id="'+t.id+'" data-order="'+t.order+'" class="album cursor-pointer shadow-lg flex flex-col p-2 rounded items-stretch bg-white text-gray-800 transition-default hover:bg-blue-200" draggable="true">\n\t\t\t<div class="pointer-events-none border-b border-gray-800 p-2"><span class="font-bold">Album Title:</span> <span>'+t.title+'</span></div>\n\t\t\t<div class="pointer-events-none border-b border-gray-800 p-2"><span class="font-bold">Created:</span> <span>'+t.createdAt+"</span></div>\n\t\t</div>\n\t"}).join(""):'<div class="rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center" draggable="false">There are no albums to show. Add one using the form above.</div>'},attachTo:a}),new t({selector:"#error-alert",data:{message:""},template:function(t){return'\n\t<div class="w-full md:w-1/2" role="alert" >\n\t\t<div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 flex justify-between">\n\t\t\t<span class="flex-grow font-bold">ERROR!</span>\n\t\t\t<button id=\'error-alert-delete\' class="alert-delete transition-default hover:text-red-800"><i class="fas fa-times pointer-events-none"></i></button>\n\t\t</div>\n\t\t<div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">\n\t\t\t<p id="error-body">'+t.message+"</p>\n\t\t</div>\n\t</div>\n"}})),s=new t({selector:"#success-alert",data:{message:""},template:function(t){return'\n\t<div class="w-full md:w-1/2" role="alert" >\n\t\t<div class="bg-green-500 text-white font-bold rounded-t px-4 py-2 flex justify-between">\n\t\t\t<span class="flex-grow font-bold">SUCCESS!</span>\n\t\t\t<button id=\'error-alert-delete\' class="alert-delete transition-default hover:text-green-800"><i class="fas fa-times pointer-events-none"></i></button>\n\t\t</div>\n\t\t<div class="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">\n\t\t\t<p id="success-body">'+t.message+"</p>\n\t\t</div>\n\t</div>\n"}}),o=new t({selector:"#app-navbar",data:{isLogged:!1},template:function(t){return'\n\t<nav>\n\t\t<div class="container mx-auto">\n\t\t\t<div class="w-full flex justify-between items-center">\n\t\t\t\t<a id="home-btn" href="'+l+'" class="brand-logo">Image Gallery</a>\n\t\t\t\t<div class="flex-grow ml-6">\n\t\t\t\t\t<a id="dashboard-nav" href="#" class="btn btn-blue">Dashboard</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="flex">\n\t\t\t\t\t<a id="signout-btn" href="#" class="btn btn-blue">Sign Out</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n'},attachTo:n}),m=new t({selector:"#signup-section",data:{username:"",password:"",passwordConfirm:"",email:"",usernameError:"",passwordError:"",emailError:"",passwordConfirmError:"",genericError:!1},template:function(t){return'\n\t<div class="w-full flex justify-center">\n\t\t<div class="w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600">\n\t\t\t<div class="text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200">Sign Up</div>\n\t\t\t<form id="signup-form" action="#">\n\t\t\t\t<input id="username-signup" type="text" maxlength="45" name="username" placeholder="Username" class="w-full rounded p-2 mb-2 '+(t.usernameError||t.genericError?"border-2 border-red-600 outline-none":"")+'" required />\n\t\t\t\t<div id="username-signup-error" class="w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold '+(t.usernameError?"":"hidden")+'" style="background: rgba(255, 255, 255, .5)">'+t.usernameError+'</div>\n\n\t\t\t\t<input id="email-signup" type="email" name="email" placeholder="Email" class="w-full rounded p-2 mb-2 '+(t.emailError||t.genericError?"border-2 border-red-600 outline-none":"")+'" required />\n\t\t\t\t<div id="email-signup-error" class="w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold '+(t.emailError?"":"hidden")+'" style="background: rgba(255, 255, 255, .5)">'+t.emailError+'</div>\n\n\t\t\t\t<input id="password-signup" type="password" maxlength="45" name="password" placeholder="Password" class="w-full rounded p-2 mb-2 '+(t.passwordError||t.passwordConfirmError||t.genericError?"border-2 border-red-600 outline-none":"")+'" required />\n\t\t\t\t<div id="password-signup-error" class="w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold '+(t.passwordError?"":"hidden")+'" style="background: rgba(255, 255, 255, .5)">'+t.passwordError+'</div>\n\n\t\t\t\t<input id="confirm-password-signup" type="password" maxlength="45" name="passwordCheck" placeholder="Confirm Password" class="flex w-full rounded p-2 mb-2 '+(t.passwordConfirmError||t.genericError?"border-2 border-red-600 outline-none":"")+'" required />\n\t\t\t\t<div id="confirm-password-error" class="w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold '+(t.passwordConfirmError?"":"hidden")+'" style="background: rgba(255, 255, 255, .5)">'+t.passwordConfirmError+'</div>\n\n\t\t\t\t<input type="submit" class="bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue" value="Sign Up" />\n\t\t\t</form>\n\t\t</div>\n\t</div>\n'}}),p=new t({selector:"#signin-section",data:{username:"",password:"",usernameError:"",passwordError:"",genericError:!1,remember:!1},template:function(t){return'\n\t<div class="w-full flex justify-center">\n\t<div class="w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600">\n\t\t<div class="text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200">Sign In</div>\n\t\t<form id="signin-form" action="#">\n\t\t\t<input id="username-signin" type="text" name="username" placeholder="Username" class="w-full rounded p-2 mb-2 '+(t.usernameError||t.genericError?"border-2 border-red-600 outline-none":"")+'" required />\n\t\t\t<div id="username-signin-error" class="w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold '+(t.usernameError?"":"hidden")+'">'+t.usernameError+'</div>\n\n\t\t\t<input id="password-signin" type="password" name="password" placeholder="Password" class="w-full rounded p-2 mb-2 '+(t.passwordError||t.genericError?"border-2 border-red-600 outline-none":"")+'" required />\n\t\t\t<div id="password-signin-error" class="w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold '+(t.passwordError?"":"hidden")+'">'+t.passwordError+'</div>\n\t\t\t<div class="w-full mb-2 p-2">\n\t\t\t\t<label class="text-gray-200">\n\t\t\t\t\t<input class=\'mr-4\' type="checkbox" name="remember" id="remember-signin" '+(t.remember?"checked":"")+' />\n\t\t\t\t\tRemember me?\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t\t<input type="submit" class="bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue" value="Sign In" />\n\t\t</form>\n\t</div>\n\t</div>\n'}}),h=(new t({selector:"#add-album-section",data:{albumTitle:"",albumTitleError:"",genericError:!1},template:function(t){return'\n\t<div class="text-xl border-b-2 border-gray-200 mb-4 p-1 text-gray-200">Add New Album</div>\n\t<form id="add-album-form" action="#" class="flex justify-between items-center">\n\t\t<input id="add-album-title" type="text" maxlength="45" name="title" placeholder="Album Title" class="rounded p-2 flex-grow mr-4 '+(t.albumTitleError||t.genericError?"border-2 border-red-600 outline-none":"")+'" required />\n\t\t<input type="submit" class="bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue" value="Add" />\n\t</form>\n'},attachTo:a}),new t({selector:"#loading-modal",data:{showModal:!1,text:""},template:function(t){return t.showModal?"\n\t<div class='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>\n\t\t<div class='flex justify-center items-center flex-col h-full w-full'>\n\t\t\t<div class='text-red-800 font-bold text-xl mb-5'>"+t.text+'</div>\n\t\t\t<span class="text-red-800 text-5xl">\n\t\t\t\t\t<i class="fas fa-circle-notch fa-spin"></i>\n\t\t\t\t</span>\n\t\t</div>\n\t</div>\n':""},attachTo:n}),function(t,o,i,d){return new(i=i||Promise)(function(r,e){function n(t){try{s(d.next(t))}catch(t){e(t)}}function a(t){try{s(d.throw(t))}catch(t){e(t)}}function s(t){var e;t.done?r(t.value):((e=t.value)instanceof i?e:new i(function(t){t(e)})).then(n,a)}s((d=d.apply(t,o||[])).next())})}),g=function(r,n){var a,s,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},t={next:e(0),throw:e(1),return:e(2)};return"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(a)throw new TypeError("Generator is already executing.");for(;i;)try{if(a=1,s&&(o=2&e[0]?s.return:e[0]?s.throw||((o=s.return)&&o.call(s),0):s.next)&&!(o=o.call(s,e[1])).done)return o;switch(s=0,o&&(e=[2&e[0],o.value]),e[0]){case 0:case 1:o=e;break;case 4:return i.label++,{value:e[1],done:!1};case 5:i.label++,s=e[1],e=[0];continue;case 7:e=i.ops.pop(),i.trys.pop();continue;default:if(!(o=0<(o=i.trys).length&&o[o.length-1])&&(6===e[0]||2===e[0])){i=0;continue}if(3===e[0]&&(!o||e[1]>o[0]&&e[1]<o[3])){i.label=e[1];break}if(6===e[0]&&i.label<o[1]){i.label=o[1],o=e;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(e);break}o[2]&&i.ops.pop(),i.trys.pop();continue}e=n.call(r,i)}catch(t){e=[6,t],s=0}finally{a=o=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}};document.addEventListener("DOMContentLoaded",function(){!function(){if(null!==sessionStorage.getItem("user"))return 1;if(null!==localStorage.getItem("user")){var t=JSON.parse(localStorage.getItem("user"));if((new Date).getTime()<t.expiry)return 1;localStorage.removeItem("user")}}()||(c.data.isLogged=!0),document.addEventListener("click",function(t){t.target.matches("#success-alert-delete")&&(!c.data.isLogged&&o.data.isLogged?(n.data.showSuccess=!1,n.detach(s)):(u.data.showSuccess=!1,u.detach(s))),t.target.matches("#error-alert-delete")&&(!c.data.isLogged&&o.data.isLogged?(n.data.showError=!1,n.detach(f)):(u.data.showError=!1,u.detach(f))),t.target.matches("#signin-nav")&&(c.data.isLogged||(u.attach(p),u.detach(m),u.render())),t.target.matches("#signup-nav")&&(c.data.isLogged||(u.attach(m),u.detach(p),u.render())),function(r){h(this,void 0,void 0,function(){var e;return g(this,function(t){switch(t.label){case 0:if(!r.target.matches("#signout-btn"))return[2];if(!c.data.isLogged)return[2];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,fetch(l+"/signout")];case 2:return 200===t.sent().status&&(sessionStorage.removeItem("user"),localStorage.removeItem("user"),s.data.message="You successfully signed out!",u.data.showSuccess=!0,u.attach(s),window.location.href=l),[3,4];case 3:return e=t.sent(),f.data.message="Something went wrong! Possible network error!",u.data.showError=!0,u.attach(f),console.error(e),[3,4];case 4:return[2]}})})}(t),t.target.matches("#dashboard-btn")&&c.data.isLogged&&(window.location.href=l+"/app.html")}),document.addEventListener("keyup",function(t){var e,r,n,a,s,o,i;(e=t.target).matches("#username-signup")&&(m.data.username=e.value),(n=t.target).matches("#email-signup")&&(m.data.email=n.value,r=m.data.email,/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(r)?m.data.emailError="":m.data.emailError="Enter a valid email address!"),(a=t.target).matches("#password-signup")&&(m.data.password=a.value,m.data.password!==m.data.passwordConfirm?(m.data.passwordConfirmError="Passwords do not match",m.data.passwordError="Passwords do not match"):(m.data.passwordConfirmError="",m.data.passwordError="")),(s=t.target).matches("#confirm-password-signup")&&(m.data.passwordConfirm=s.value,m.data.password!==m.data.passwordConfirm?(m.data.passwordConfirmError="Passwords do not match",m.data.passwordError="Passwords do not match"):(m.data.passwordConfirmError="",m.data.passwordError="")),(o=t.target).matches("#username-signin")&&(p.data.username=o.value),(i=t.target).matches("#password-signin")&&(p.data.password=i.value)}),document.addEventListener("submit",function(t){!function(i){h(this,void 0,void 0,function(){var e,r,n,a,s,o;return g(this,function(t){switch(t.label){case 0:if(!i.target.matches("#signup-form"))return[2];if(i.preventDefault(),c.data.isLogged)return[2];(e=new FormData).append("username",m.data.username),e.append("password",m.data.password),e.append("email",m.data.email),e.append("passwordCheck",m.data.passwordConfirm),t.label=1;case 1:return t.trys.push([1,11,,12]),[4,fetch(l+"/signup",{method:"POST",body:e})];case 2:switch(r=t.sent(),r.status){case 200:return[3,3];case 400:return[3,5];case 401:case 500:return[3,7]}return[3,9];case 3:return[4,r.json()];case 4:return n=t.sent(),sessionStorage.setItem("user",JSON.stringify(n)),m.data.username="",m.data.email="",m.data.password="",m.data.passwordConfirm="",m.data.usernameError="",m.data.emailError="",m.data.passwordError="",m.data.passwordConfirmError="",m.data.genericError=!1,document.querySelector("#signup-form").reset(),window.location.href=l+"/app.html",[2];case 5:return[4,r.json()];case 6:return a=t.sent(),m.data.genericError=!1,"username"===a.field?m.data.usernameError=a.error:"password"===a.field?m.data.passwordError=a.error:"email"===a.field?m.data.emailError=a.error:"confirmPassword"===a.field&&(m.data.passwordConfirmError=a.error),[2];case 7:return[4,r.json()];case 8:return s=t.sent(),m.data.passwordError="",m.data.usernameError="",m.data.genericError=!0,f.data.message=s.error,u.data.showError=!0,u.attach(f),[2];case 9:return[3,10];case 10:return[3,12];case 11:return o=t.sent(),f.data.message="Something went wrong! Possible network error!",u.data.showError=!0,u.attach(f),console.error(o),[3,12];case 12:return[2]}})})}(t),function(d){h(this,void 0,void 0,function(){var e,r,n,a,s,o,i;return g(this,function(t){switch(t.label){case 0:if(!d.target.matches("#signin-form"))return[2];if(d.preventDefault(),c.data.isLogged)return[2];(e=new FormData).append("username",p.data.username),e.append("password",p.data.password),t.label=1;case 1:return t.trys.push([1,11,,12]),[4,fetch(l+"/signin",{method:"POST",body:e})];case 2:switch(r=t.sent(),r.status){case 200:return[3,3];case 400:return[3,5];case 401:case 500:return[3,7]}return[3,9];case 3:return[4,r.json()];case 4:return n=t.sent(),sessionStorage.setItem("user",JSON.stringify(n)),p.data.remember&&(a={user:n,expiry:(new Date).getTime()+432e5},localStorage.setItem("user",JSON.stringify(a))),c.data.isLogged=!0,p.data.username="",p.data.password="",p.data.usernameError="",p.data.passwordError="",p.data.genericError=!1,p.data.remember=!1,document.querySelector("#signin-form").reset(),window.location.href=l+"/app.html",[2];case 5:return[4,r.json()];case 6:return s=t.sent(),p.data.genericError=!1,"username"===s.field?p.data.usernameError=s.error:"password"===s.field&&(p.data.passwordError=s.error),[2];case 7:return[4,r.json()];case 8:return o=t.sent(),p.data.passwordError="",p.data.usernameError="",p.data.genericError=!0,f.data.message=o.error,u.data.showError=!0,u.attach(f),[2];case 9:return[3,10];case 10:return[3,12];case 11:return i=t.sent(),f.data.message="Something went wrong! Possible network error!",u.data.showError=!0,u.attach(f),console.error(i),[3,12];case 12:return[2]}})})}(t)}),document.addEventListener("change",function(t){var e;(e=t.target).matches("#remember-signin")&&(p.data.remember=e.checked)}),u.render(),c.render()})}();

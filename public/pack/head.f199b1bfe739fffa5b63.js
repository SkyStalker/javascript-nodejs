var head = function(t) {
function e(n) {
if (o[n]) return o[n].exports;
var i = o[n] = {
exports: {},
id: n,
loaded: !1
};
return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
}
var n = window.webpackJsonp_name_;
window.webpackJsonp_name_ = function(r, c) {
for (var s, a, u = 0, l = []; u < r.length; u++) a = r[u], i[a] && l.push.apply(l, i[a]), 
i[a] = 0;
for (s in c) t[s] = c[s];
for (n && n(r, c); l.length; ) l.shift().call(null, e);
if (c[0]) return o[0] = 0, e(0);
};
var o = {}, i = {
14: 0
};
return e.e = function(t, n) {
if (0 === i[t]) return n.call(null, e);
if (void 0 !== i[t]) i[t].push(n); else {
i[t] = [ n ];
var o = document.getElementsByTagName("head")[0], r = document.createElement("script");
r.type = "text/javascript", r.charset = "utf-8", r.async = !0, r.src = e.p + "" + ({
"0": "search",
"1": "coursesCourse",
"2": "authClient",
"3": "footer",
"4": "angular",
"5": "tutorial",
"6": "ebookExtras",
"7": "coursesSignup",
"8": "ebook",
"10": "profile",
"11": "coursesParticipantDetails",
"12": "about",
"13": "quiz",
"16": "coursesMaterials",
"17": "auth",
"18": "coursesFrontpage",
"19": "coursesFeedbackEdit",
"20": "coursesFeedbackList",
"21": "coursesFeedbackShow",
"22": "profileGuestAboutMe",
"24": "donate",
"25": "newsletterAdmin",
"27": "qa",
"28": "screencast",
"29": "styles",
"30": "markup"
}[t] || t) + "-" + t + ".f199b1bfe739fffa5b63.js", o.appendChild(r);
}
}, e.m = t, e.c = o, e.p = "/pack/", e(0);
}({
0: function(t, e, n) {
"use strict";
n(411);
try {
window.localStorage.testProperty = 1, delete window.localStorage.testProperty;
} catch (o) {
try {
window.localStorage = {};
} catch (o) {}
}
e.Modal = n(377), e.fontTest = n(418), e.resizeOnload = n(419), n(424), n(425), 
n(426), n(427), n(429), n(430), n(371).init(), e.showTopNotification = function() {
var t = document.querySelector(".notification_top"), e = t.id;
if (t.querySelector("button").onclick = function() {
localStorage.topNotificationHidden = e, t.style.display = "none";
}, !e) throw Error("Top notification must have an id");
var n = localStorage.topNotificationHidden;
n != e && (delete localStorage.topNotificationHidden, t.style.display = "");
};
},
371: function(t, e, n) {
"use strict";
function o(t, e) {
if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return !e || "object" != typeof e && "function" != typeof e ? t : e;
}
function i(t, e) {
if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
t.prototype = Object.create(e && e.prototype, {
constructor: {
value: t,
enumerable: !1,
writable: !0,
configurable: !0
}
}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
Object.defineProperty(e, "__esModule", {
value: !0
});
var c, s = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var o = e[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(t, o.key, o);
}
}
return function(e, n, o) {
return n && t(e.prototype, n), o && t(e, o), e;
};
}(), a = n(372), u = function() {
function t() {
var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
r(this, t), this.notifications = [], this.verticalSpace = e.verticalSpace || 8;
}
return s(t, [ {
key: "register",
value: function(t) {
var e = this;
this.notifications.unshift(t), setTimeout(function() {
return e.recalculate();
}, 20);
}
}, {
key: "unregister",
value: function(t) {
var e = this.notifications.indexOf(t);
this.notifications.splice(e, 1), this.recalculate();
}
}, {
key: "recalculate",
value: function() {
var t = this, e = this.verticalSpace;
this.notifications.forEach(function(n) {
n.top = e, e += n.height + t.verticalSpace;
});
}
} ]), t;
}();
e.init = function(t) {
c = new u(t);
};
var l = function() {
function t(e, n, o) {
r(this, t);
var i = '<div class="notification notification_popup notification_' + n + '">\n    <div class="notification__content">' + e + '</div>\n    <button title="Закрыть" class="notification__close"></button></div>';
switch (document.body.insertAdjacentHTML("beforeEnd", i), this.elem = document.body.lastElementChild, 
o) {
case void 0:
this.timeout = this.TIMEOUT_DEFAULT;
break;

case "slow":
this.timeout = this.TIMEOUT_SLOW;
break;

case "fast":
this.timeout = this.TIMEOUT_FAST;
break;

default:
this.timeout = o;
}
c.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
return s(t, [ {
key: "close",
value: function() {
this.elem.parentNode && (this.elem.remove(), c.unregister(this));
}
}, {
key: "setupCloseHandler",
value: function() {
var t = this;
this.delegate(".notification__close", "click", function() {
return t.close();
});
}
}, {
key: "setupCloseTimeout",
value: function() {
var t = this;
this.timeout && setTimeout(function() {
return t.close();
}, this.timeout);
}
}, {
key: "TIMEOUT_DEFAULT",
get: function() {
return 2500;
}
}, {
key: "TIMEOUT_SLOW",
get: function() {
return 5e3;
}
}, {
key: "TIMEOUT_FAST",
get: function() {
return 1500;
}
}, {
key: "height",
get: function() {
return this.elem.offsetHeight;
}
}, {
key: "top",
set: function(t) {
this.elem.style.transform = "translateY(" + t + "px)";
}
} ]), t;
}();
a.delegateMixin(l.prototype);
var d = function(t) {
function e(t, n) {
return r(this, e), o(this, Object.getPrototypeOf(e).call(this, t, "info", n));
}
return i(e, t), e;
}(l);
e.Info = d;
var f = function(t) {
function e(t, n) {
return r(this, e), o(this, Object.getPrototypeOf(e).call(this, t, "warning", n));
}
return i(e, t), e;
}(l);
e.Warning = f;
var m = function(t) {
function e(t, n) {
return r(this, e), o(this, Object.getPrototypeOf(e).call(this, t, "success", n));
}
return i(e, t), e;
}(l);
e.Success = m;
var h = e.Error = function(t) {
function e(t, n) {
return r(this, e), o(this, Object.getPrototypeOf(e).call(this, t, "error", n));
}
return i(e, t), s(e, [ {
key: "TIMEOUT_DEFAULT",
get: function() {
return 5e3;
}
} ]), e;
}(l);
e.Error = h;
},
372: function(t, e) {
"use strict";
function n(t, e) {
for (var n = t.target; n; ) {
if (n.matches(e)) return n;
if (n == t.currentTarget) break;
n = n.parentElement;
}
return null;
}
function o(t, e, o, i, r) {
t.addEventListener(o, function(t) {
var o = n(t, e);
t.delegateTarget = o, o && i.call(r || this, t);
});
}
o.delegateMixin = function(t) {
t.delegate = function(t, e, n) {
o(this.elem, t, e, n, this);
};
}, t.exports = o;
},
377: function(t, e) {
"use strict";
function n(t) {
t = t || {}, this.render(), this.setHasClose(void 0 === t.hasClose || t.hasClose), 
this.onClick = this.onClick.bind(this), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), 
this.elem.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onDocumentKeyDown);
}
n.prototype.setHasClose = function(t) {
this._hasClose = t, this._hasClose ? this.elem.classList.add("modal__has-close") : this.elem.classList.remove("modal__has-close");
}, n.prototype.render = function() {
document.body.insertAdjacentHTML("beforeEnd", '<div class="modal"><div class="modal__dialog"><button class="close-button modal__close" title="закрыть"></button><div class="modal__content"></div></div></div>'), 
document.body.classList.add("paranja-open"), this.elem = document.body.lastChild, 
this.contentElem = this.elem.querySelector(".modal__content");
}, n.prototype.onClick = function(t) {
t.target.classList.contains("modal__close") && (this.remove(), t.preventDefault());
}, n.prototype.onDocumentKeyDown = function(t) {
27 == t.keyCode && (t.preventDefault(), this.remove());
}, n.prototype.showOverlay = function() {
this.contentElem.classList.add("modal-overlay_light");
}, n.prototype.hideOverlay = function() {
this.contentElem.classList.remove("modal-overlay_light");
}, n.prototype.setContent = function(t) {
"string" == typeof t ? this.contentElem.innerHTML = t : (this.contentElem.innerHTML = "", 
this.contentElem.appendChild(t));
var e = this.contentElem.querySelector("[data-modal-autofocus],[autofocus]");
e && e.focus();
}, n.prototype.remove = function() {
document.body.classList.remove("paranja-open"), document.body.removeChild(this.elem), 
document.removeEventListener("keydown", this.onDocumentKeyDown), this.elem.dispatchEvent(new CustomEvent("modal-remove"));
}, t.exports = n;
},
411: function(t, e, n) {
"use strict";
n(412), n(417);
},
412: function(t, e, n) {
"use strict";
function o(t) {
if (t.length) {
if (1 === t.length) return "string" == typeof t[0] ? document.createTextNode(t[0]) : t[0];
for (var e, n = document.createDocumentFragment(), o = t.length, i = -1; ++i < o; ) e = t[i], 
n.appendChild("string" == typeof e ? document.createTextNode(e) : e);
return n;
}
throw Error("DOM Exception 8");
}
var i = {
matches: Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector,
replace: function() {
this.parentNode && this.parentNode.replaceChild(o(arguments), this);
},
prepend: function() {
this.insertBefore(o(arguments), this.firstChild);
},
append: function() {
this.appendChild(o(arguments));
},
remove: function() {
var t = this.parentNode;
if (t) return t.removeChild(this);
},
before: function() {
this.parentNode && this.parentNode.insertBefore(o(arguments), this);
},
after: function() {
this.parentNode && this.parentNode.insertBefore(o(arguments), this.nextSibling);
},
closest: function(t) {
for (var e = this; e; ) {
if (e.matches && e.matches(t)) return e;
e = e.parentElement;
}
return null;
}
};
for (var r in i) Element.prototype[r] || (Element.prototype[r] = i[r]);
n(413), n(414), n(415), n(416);
},
413: function(t, e) {
"use strict";
try {
new CustomEvent("IE has CustomEvent, but doesn't support constructor");
} catch (n) {
window.CustomEvent = function(t, e) {
var n;
return e = e || {
bubbles: !1,
cancelable: !1,
detail: void 0
}, n = document.createEvent("CustomEvent"), n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), 
n;
}, CustomEvent.prototype = Object.create(window.Event.prototype);
}
},
414: function(t, e) {
"use strict";
if (!(document.documentElement.dataset || Object.getOwnPropertyDescriptor(Element.prototype, "dataset") && Object.getOwnPropertyDescriptor(Element.prototype, "dataset").get)) {
var n = {
enumerable: !0,
get: function() {
var t, e, n, o, i, r, c = this, s = this.attributes, a = s.length, u = function(t) {
return t.charAt(1).toUpperCase();
}, l = function() {
return this;
}, d = function(t, e) {
return void 0 !== e ? this.setAttribute(t, e) : this.removeAttribute(t);
};
try {
({}).__defineGetter__("test", function() {}), e = {};
} catch (f) {
e = document.createElement("div");
}
for (t = 0; t < a; t++) if (r = s[t], r && r.name && /^data-\w[\w\-]*$/.test(r.name)) {
n = r.value, o = r.name, i = o.substr(5).replace(/-./g, u);
try {
Object.defineProperty(e, i, {
enumerable: this.enumerable,
get: l.bind(n || ""),
set: d.bind(c, o)
});
} catch (m) {
e[i] = n;
}
}
return e;
}
};
try {
Object.defineProperty(Element.prototype, "dataset", n);
} catch (o) {
n.enumerable = !1, Object.defineProperty(Element.prototype, "dataset", n);
}
}
},
415: function(t, e) {
"use strict";
void 0 === document.documentElement.hidden && (document.head.insertAdjacentHTML("beforeEnd", "<style> [hidden] { display: none } </style>"), 
Object.defineProperty(Element.prototype, "hidden", {
set: function(t) {
this.setAttribute("hidden", t);
},
get: function() {
return this.getAttribute("hidden");
}
}));
},
416: function(t, e) {
"use strict";
!function() {
var t = 0;
window.requestAnimationFrame || (window.requestAnimationFrame = function(e, n) {
var o = new Date().getTime(), i = Math.max(0, 16 - (o - t)), r = window.setTimeout(function() {
e(o + i);
}, i);
return t = o + i, r;
}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
clearTimeout(t);
});
}();
},
417: function(t, e) {
"use strict";
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
};
String.prototype.startsWith || (String.prototype.startsWith = function(t) {
var e = arguments.length < 2 ? 0 : arguments[1];
return 0 === this.slice(e).indexOf(t);
}), String.prototype.endsWith || (String.prototype.endsWith = function(t) {
var e = arguments.length < 2 ? this.length : arguments[1], n = this.lastIndexOf(t);
return n !== -1 && n === e - t.length;
}), String.prototype.includes || (String.prototype.includes = function(t, e) {
if ("object" === (void 0 === t ? "undefined" : n(t)) && t instanceof RegExp) throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
return this.indexOf(t, e) !== -1;
});
},
418: function(t, e) {
"use strict";
t.exports = function() {
function t() {
n != e.offsetWidth ? document.body.classList.remove("no-icons") : setTimeout(t, 100);
}
var e = document.createElement("span");
document.body.appendChild(e), e.className = "font-test", e.style.fontFamily = "serif";
var n = e.offsetWidth;
e.style.fontFamily = "", t();
};
},
419: function(t, e, n) {
"use strict";
var o = n(420), i = n(423), r = [];
e.iframe = function(t) {
function e() {
o.async(t, function(e, n) {
n && (t.style.height = n + "px");
});
}
e();
}, e.codeTabs = function(t) {
function e() {
var e = t.closest(".code-tabs"), n = (t.closest("[data-code-tabs-content]"), e.querySelector("[data-code-tabs-switches]")), o = n.firstElementChild;
o.offsetWidth > n.offsetWidth ? e.classList.add("code-tabs_scroll") : e.classList.remove("code-tabs_scroll");
}
e(), r.push(e);
}, window.addEventListener("resize", i(function() {
r.forEach(function(t) {
t();
});
}, 200));
},
420: function(t, e, n) {
"use strict";
function o(t, e) {
function n(t, n) {
clearTimeout(o), e(t, n);
}
var o = setTimeout(function() {
e(Error("timeout"));
}, 500);
try {
(t.contentDocument || t.contentWindow.document).body;
} catch (c) {
i(t, n);
}
if (!t.offsetWidth) {
var s = t.cloneNode(!0);
return s.name = "", s.style.height = "50px", s.style.position = "absolute", s.style.display = "block", 
s.style.top = "10000px", s.onload = function() {
var e = r(this.contentDocument);
t.style.display = "block", s.remove(), n(null, e);
}, void document.body.appendChild(s);
}
t.style.display = "block", t.style.height = "1px";
var a = r(t.contentDocument);
t.style.height = "", n(null, a);
}
function i(t, e) {
throw Error("Not implemented yet");
}
var r = n(421);
o.async = function(t, e) {
setTimeout(function() {
o(t, e);
}, 0);
}, t.exports = o;
},
421: function(t, e, n) {
"use strict";
function o(t) {
t = t || document;
var e = Math.max(t.body.scrollHeight, t.documentElement.scrollHeight, t.body.offsetHeight, t.documentElement.offsetHeight, t.body.clientHeight, t.documentElement.clientHeight);
return t.documentElement.scrollWidth > t.documentElement.clientWidth && (i || (i = r()), 
e += i), e;
}
var i, r = n(422);
t.exports = o;
},
422: function(t, e) {
"use strict";
function n() {
var t = document.createElement("div");
if (t.style.cssText = "visibility:hidden;height:100px", !document.body) throw Error("getScrollbarHeight called to early: no document.body");
document.body.appendChild(t);
var e = t.offsetWidth;
t.style.overflow = "scroll";
var n = document.createElement("div");
n.style.width = "100%", t.appendChild(n);
var o = n.offsetWidth;
return t.parentNode.removeChild(t), e - o;
}
t.exports = n;
},
423: function(t, e) {
"use strict";
function n(t, e) {
function n() {
return r ? (o = arguments, void (i = this)) : (t.apply(this, arguments), r = !0, 
void setTimeout(function() {
r = !1, o && (n.apply(i, o), o = i = null);
}, e));
}
var o, i, r = !1;
return n;
}
t.exports = n;
},
424: function(t, e) {
"use strict";
function n() {}
function o() {
n("compactifySidebar");
var t = document.querySelector(".sidebar"), e = t.querySelector(".sidebar__content"), o = t.querySelector(".sidebar__inner"), i = t.classList.contains("sidebar_sticky-footer"), r = t.classList.contains("sidebar_compact");
if (r) {
var c;
c = i ? e.lastElementChild.getBoundingClientRect().top - e.lastElementChild.previousElementSibling.getBoundingClientRect().bottom : e.getBoundingClientRect().bottom - e.lastElementChild.getBoundingClientRect().bottom, 
n("decompact?", c), c > 150 && t.classList.remove("sidebar_compact");
} else n(o.scrollHeight, o.clientHeight), o.scrollHeight > o.clientHeight && (n("compact!"), 
t.classList.add("sidebar_compact"));
}
function i() {
var t = "ru" === document.documentElement.lang ? ".sitetoolbar" : ".sitetoolbar-light", e = document.querySelector(t);
if (!e) return void n("no sitetoolbar");
var i = document.querySelector(".sidebar");
i && (i.style.top = Math.max(e.getBoundingClientRect().bottom, 0) + "px", o()), 
r();
}
function r() {
var t = document.documentElement.clientWidth <= s, e = document.querySelector('meta[name="viewport"]').content;
e = e.replace(/user-scalable=\w+/, "user-scalable=" + (t ? "yes" : "no")), document.querySelector('meta[name="viewport"]').content = e;
}
var c, s = 840;
!function() {
function t() {
n("onWindowScrollAndResizeThrottled", c), c || (c = window.requestAnimationFrame(function() {
i(), c = null;
}));
}
window.addEventListener("scroll", t), window.addEventListener("resize", t), document.addEventListener("DOMContentLoaded", t);
}();
},
425: function(t, e) {
"use strict";
function n(t) {
if (t.target.closest) {
var e = t.target.closest("[data-dropdown-toggler]");
e && (e.nextElementSibling.style.display = e.nextElementSibling.offsetWidth ? "none" : "block");
}
}
function o(t) {
if (t.target.closest) {
var e = t.target.closest(a + "__search-toggle");
e && (c || i(), r());
}
}
function i() {
var t, e = document.querySelector(a), n = e.querySelector(a + "__search-input input"), o = e.querySelector(a + "__find");
o.onmousedown = function(e) {
t = !0;
}, n.onkeydown = function(t) {
27 == t.keyCode && (this.value = "", r());
}, n.onblur = function(e) {
!t && r();
}, c = !0;
}
function r() {
var t, e = document.querySelector(a);
e.classList.toggle(s + "_search_open");
var n = e.querySelector(a + "__search-input input");
e.classList.contains(s + "_search_open") ? (n.focus(), t = document.createElement("div"), 
t.className = "search-paranja", t.style.top = e.offsetHeight + "px", document.body.appendChild(t), 
document.body.classList.add("paranja-open")) : (t = document.querySelector(".search-paranja"), 
t.parentNode.removeChild(t), document.body.classList.remove("paranja-open"));
}
document.addEventListener("click", o), document.addEventListener("click", n);
var c = !1, s = "ru" === document.documentElement.lang ? "sitetoolbar" : "sitetoolbar-light", a = "." + s;
},
426: function(t, e) {
"use strict";
function n() {
var t = document.querySelector(".page-wrapper");
document.querySelector(".page").classList.toggle("page_sidebar_on"), t && t.classList.toggle("page-wrapper_sidebar_on"), 
document.querySelector(".page").classList.contains("page_sidebar_on") ? delete localStorage.noSidebar : localStorage.noSidebar = 1;
}
function o(t) {
t.target.hasAttribute("data-sidebar-toggle") && n();
}
function i(t) {
if (!(document.activeElement && ~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName) || t.keyCode != "S".charCodeAt(0))) {
if (~navigator.userAgent.toLowerCase().indexOf("mac os x")) {
if (!t.metaKey || !t.altKey) return;
} else if (!t.altKey) return;
n(), t.preventDefault();
}
}
document.addEventListener("click", o), document.addEventListener("keydown", i);
},
427: function(t, e, n) {
"use strict";
function o(t) {
if ((!document.activeElement || !~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName)) && t[c + "Key"]) {
var e = null;
switch (t.keyCode) {
case 37:
e = "prev";
break;

case 39:
e = "next";
break;

default:
return;
}
var n = document.querySelector('link[rel="' + e + '"]');
n && (document.location = n.href, t.preventDefault());
}
}
function i() {
var t, e = c[0].toUpperCase() + c.slice(1), n = document.querySelector('link[rel="next"]');
n && (t = document.querySelector('a[href="' + n.getAttribute("href") + '"] .page__nav-text-shortcut'), 
t.innerHTML = e + ' + <span class="page__nav-text-arr">→</span>');
var o = document.querySelector('link[rel="prev"]');
o && (t = document.querySelector('a[href="' + o.getAttribute("href") + '"] .page__nav-text-shortcut'), 
t.innerHTML = e + ' + <span class="page__nav-text-arr">←</span>');
}
var r = n(428), c = ~navigator.userAgent.toLowerCase().indexOf("mac os x") ? "ctrl" : "alt";
r(document, {
onRight: function() {
var t = document.querySelector('link[rel="prev"]');
t && (document.location = t.href);
},
onLeft: function() {
var t = document.querySelector('link[rel="next"]');
t && (document.location = t.href);
}
}), document.addEventListener("keydown", o), document.addEventListener("DOMContentLoaded", i);
},
428: function(t, e) {
"use strict";
function n(t, e) {
e = e || {};
var n, o, i, r, c, s = e.onRight || function() {}, a = e.onLeft || function() {}, u = e.tolerance || 50, l = e.threshold || 150, d = e.allowedTime || 500;
t.addEventListener("touchstart", function(t) {
var e = t.changedTouches[0];
i = 0, n = e.pageX, o = e.pageY, c = Date.now();
}), t.addEventListener("touchend", function(t) {
var e = t.changedTouches[0];
if (i = e.pageX - n, r = Date.now() - c, !(Math.abs(e.pageY - o) > u || r > d)) {
for (var f = !1, m = t.target; m != document.body; ) {
if (m.scrollWidth > m.clientWidth) {
f = !0;
break;
}
m = m.parentElement;
}
f || (i > l && s(t), i < -l && a(t));
}
});
}
t.exports = n;
},
429: function(t, e) {
"use strict";
var n;
document.addEventListener("mouseover", function(t) {
var e = t.target.closest("[data-add-class-on-hover]") || t.target.closest(".button");
e && (n = e, e.classList.add("hover"));
}), document.addEventListener("touchend", function(t) {
setTimeout(function() {
n && (n.classList.remove("hover"), n = null);
}, 500);
}), document.addEventListener("mouseout", function(t) {
n && (n.contains(t.relatedTarget) || (n.classList.remove("hover"), n = null));
}), navigator.userAgent.match(/(iPad|iPhone|iPod)/g) || document.documentElement.classList.add("working-hover");
},
430: function(t, e) {
"use strict";
var n = window.location.host;
document.addEventListener("click", function(t) {
function e() {
document.location = i;
}
if (1 == t.which && !t.defaultPrevented) {
var o = t.target.closest && t.target.closest("a");
if (o && (n != o.host || o.hasAttribute("data-track-outbound")) && ~[ "_self", "_top", "_parent" ].indexOf(o.target) && !(t.shiftKey || t.ctrlKey || t.altKey)) {
t.preventDefault();
var i = o.href;
window.ga("send", "event", "outbound", "click", i, {
hitCallback: e
}), setTimeout(e, 500);
}
}
});
}
});
//# sourceMappingURL=head.f199b1bfe739fffa5b63.js.map
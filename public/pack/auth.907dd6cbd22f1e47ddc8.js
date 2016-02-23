var auth = webpackJsonp_name_([ 17, 2 ], {
0: function(t, e, n) {
"use strict";
function r() {
var t = new i(window.authOptions);
document.getElementById("auth-form").appendChild(t.getElem());
}
e.AuthModal = n(152);
var i = n(154);
r();
},
116: function(t, e) {},
150: function(t, e) {
"use strict";
function n(t) {
if (t = t || {}, this.elem = t.elem, this.size = t.size || "medium", this.class = t.class ? " " + t.class : "", 
this.elemClass = t.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
var t = this.elem.querySelector(".spinner");
t && (t.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, t.exports = n;
},
152: function(t, e, n) {
"use strict";
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
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
var o = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
return function(e, n, r) {
return n && t(e.prototype, n), r && t(e, r), e;
};
}(), s = function(t, e, n) {
for (var r = !0; r; ) {
var i = t, o = e, s = n;
r = !1, null === i && (i = Function.prototype);
var a = Object.getOwnPropertyDescriptor(i, o);
if (void 0 !== a) {
if ("value" in a) return a.value;
var c = a.get;
if (void 0 === c) return;
return c.call(s);
}
var l = Object.getPrototypeOf(i);
if (null === l) return;
t = l, e = o, n = s, r = !0, a = l = void 0;
}
}, a = n(153), c = n(154), l = function(t) {
function e(t) {
r(this, e), s(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), 
this.options = t || {}, this.options.inModal = !0;
var n = new c(this.options);
this.setContent(n.getElem());
}
return i(e, t), o(e, [ {
key: "render",
value: function() {
s(Object.getPrototypeOf(e.prototype), "render", this).call(this), this.elem.classList.add("login-form-modal");
}
} ]), e;
}(a);
t.exports = l;
},
154: function(t, e, n) {
"use strict";
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
return function(e, n, r) {
return n && t(e.prototype, n), r && t(e, r), e;
};
}(), o = n(155), s = n(148), a = n(150), c = n(157), l = n(159), u = n(160), f = n(161), p = function() {
function t(e) {
r(this, t), this.options = e, e.successRedirect || (e.successRedirect = window.location.href);
}
return i(t, [ {
key: "render",
value: function() {
this.elem = document.createElement("div"), this.elem.innerHTML = f(c, this.options), 
this.options.message && this.showFormMessage(this.options.message), this.initEventHandlers();
}
}, {
key: "getElem",
value: function() {
return this.elem || this.render(), this.elem;
}
}, {
key: "successRedirect",
value: function() {
window.location.href == this.options.successRedirect ? window.location.reload() : window.location.href = this.options.successRedirect;
}
}, {
key: "clearFormMessages",
value: function() {
[].forEach.call(this.elem.querySelectorAll(".text-input_invalid"), function(t) {
t.classList.remove("text-input_invalid");
}), [].forEach.call(this.elem.querySelectorAll(".text-input__err"), function(t) {
t.remove();
}), this.elem.querySelector("[data-notification]").innerHTML = "";
}
}, {
key: "request",
value: function e(t) {
var e = o(t);
return e.addEventListener("loadstart", function() {
var t = this.startRequestIndication();
e.addEventListener("loadend", t);
}.bind(this)), e;
}
}, {
key: "startRequestIndication",
value: function() {
this.elem.classList.add("modal-overlay_light");
var t = this, e = this.elem.querySelector('[type="submit"]');
if (e) {
var n = new a({
elem: e,
size: "small",
"class": "",
elemClass: "button_loading"
});
n.start();
}
return function() {
t.elem.classList.remove("modal-overlay_light"), n && n.stop();
};
}
}, {
key: "initEventHandlers",
value: function() {
this.delegate('[data-switch="register-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = f(l, this.options);
}), this.delegate('[data-switch="login-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = f(c, this.options);
}), this.delegate('[data-switch="forgot-form"]', "click", function(t) {
t.preventDefault();
var e = this.elem.querySelector('[type="email"]');
this.elem.innerHTML = f(u, this.options);
var n = this.elem.querySelector('[type="email"]');
n.value = e.value;
}), this.delegate('[data-form="login"]', "submit", function(t) {
t.preventDefault(), this.submitLoginForm(t.target);
}), this.delegate('[data-form="register"]', "submit", function(t) {
t.preventDefault(), this.submitRegisterForm(t.target);
}), this.delegate('[data-form="forgot"]', "submit", function(t) {
t.preventDefault(), this.submitForgotForm(t.target);
}), this.delegate("[data-provider]", "click", function(t) {
t.preventDefault(), this.openAuthPopup("/auth/login/" + t.delegateTarget.dataset.provider);
}), this.delegate("[data-action-verify-email]", "click", function(t) {
t.preventDefault();
var e = new FormData(), n = t.delegateTarget.dataset.actionVerifyEmail;
e.append("email", n);
var r = this.request({
method: "POST",
url: "/auth/reverify",
body: e
}), i = this;
r.addEventListener("success", function(t) {
200 == this.status ? i.showFormMessage({
html: "\n            <p>Письмо-подтверждение отправлено ещё раз.</p>\n            <p><a href='#' data-action-verify-email='" + n + "'>перезапросить подтверждение.</a></p>\n            ",
type: "success"
}) : i.showFormMessage({
type: "error",
html: t.result
});
});
});
}
}, {
key: "submitRegisterForm",
value: function(t) {
this.clearFormMessages();
var e = !1;
if (t.elements.email.value || (e = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
t.elements.displayName.value || (e = !0, this.showInputError(t.elements.displayName, "Введите, пожалуста, имя пользователя.")), 
t.elements.password.value || (e = !0, this.showInputError(t.elements.password, "Введите, пожалуста, пароль.")), 
!e) {
var n = new FormData(t);
n.append("successRedirect", this.options.successRedirect);
var r = this.request({
method: "POST",
url: "/auth/register",
normalStatuses: [ 201, 400 ],
body: n
}), i = this;
r.addEventListener("success", function(e) {
if (201 == this.status) return i.elem.innerHTML = f(c, i.options), void i.showFormMessage({
html: "<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p><p><a href='#' data-action-verify-email='" + t.elements.email.value + "'>перезапросить подтверждение.</a></p>",
type: "success"
});
if (400 != this.status) i.showFormMessage({
html: "Неизвестный статус ответа сервера",
type: "error"
}); else for (var n in e.result.errors) i.showInputError(t.elements[n], e.result.errors[n]);
});
}
}
}, {
key: "submitForgotForm",
value: function(t) {
this.clearFormMessages();
var e = !1;
if (t.elements.email.value || (e = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
!e) {
var n = new FormData(t);
n.append("successRedirect", this.options.successRedirect);
var r = this.request({
method: "POST",
url: "/auth/forgot",
normalStatuses: [ 200, 404, 403 ],
body: n
}), i = this;
r.addEventListener("success", function(t) {
200 == this.status ? (i.elem.innerHTML = f(c, i.options), i.showFormMessage({
html: t.result,
type: "success"
})) : 404 == this.status ? i.showFormMessage({
html: t.result,
type: "error"
}) : 403 == this.status && i.showFormMessage({
html: t.result.message || "Действие запрещено.",
type: "error"
});
});
}
}
}, {
key: "showInputError",
value: function(t, e) {
t.parentNode.classList.add("text-input_invalid");
var n = document.createElement("span");
n.className = "text-input__err", n.innerHTML = e, t.parentNode.appendChild(n);
}
}, {
key: "showFormMessage",
value: function(t) {
var e = t.html;
0 !== e.indexOf("<p>") && (e = "<p>" + e + "</p>");
var n = t.type;
if (-1 == [ "info", "error", "warning", "success" ].indexOf(n)) throw Error("Unsupported type: " + n);
var r = document.createElement("div");
r.className = "login-form__" + n, r.innerHTML = e, this.elem.querySelector("[data-notification]").innerHTML = "", 
this.elem.querySelector("[data-notification]").appendChild(r);
}
}, {
key: "submitLoginForm",
value: function(t) {
var e = this;
this.clearFormMessages();
var n = !1;
if (t.elements.email.value || (n = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
t.elements.password.value || (n = !0, this.showInputError(t.elements.password, "Введите, пожалуста, пароль.")), 
!n) {
var r = o({
method: "POST",
url: "/auth/login/local",
noDocumentEvents: !0,
normalStatuses: [ 200, 401 ],
body: new FormData(t)
}), i = this.startRequestIndication();
r.addEventListener("success", function(t) {
return 401 == r.status ? (i(), void e.onAuthFailure(t.result.message)) : void (e.options.callback ? (i(), 
e.onAuthSuccess(t.result.user)) : e.onAuthSuccess(t.result.user));
}), r.addEventListener("fail", function(t) {
i(), e.onAuthFailure(t.reason);
});
}
}
}, {
key: "openAuthPopup",
value: function(t) {
this.authPopup && !this.authPopup.closed && this.authPopup.close();
var e = 800, n = 600, r = (window.outerHeight - n) / 2, i = (window.outerWidth - e) / 2;
window.authForm = this, this.authPopup = window.open(t, "authForm", "width=" + e + ",height=" + n + ",scrollbars=0,top=" + r + ",left=" + i);
}
}, {
key: "onAuthSuccess",
value: function(t) {
window.currentUser = t, this.options.callback ? this.options.callback() : this.successRedirect();
}
}, {
key: "onAuthFailure",
value: function(t) {
this.showFormMessage({
html: t || "Отказ в авторизации.",
type: "error"
});
}
} ]), t;
}();
s.delegateMixin(p.prototype), t.exports = p;
},
155: function(t, e, n) {
"use strict";
function r(t) {
function e(t, e) {
var n = new CustomEvent(t);
return n.originalEvent = e, n;
}
function n(t, n) {
var r = e("fail", n);
r.reason = t, i.dispatchEvent(r);
}
function r(t, n) {
var r = e("success", n);
r.result = t, i.dispatchEvent(r);
}
var i = new XMLHttpRequest(), s = t.method || "GET", a = t.body, c = t.url;
i.open(s, c, !t.sync), i.method = s;
var l = o();
l && !t.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", l), "[object Object]" == {}.toString.call(a) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
a = JSON.stringify(a)), t.noDocumentEvents || (i.addEventListener("loadstart", function(t) {
i.timeStart = Date.now();
var n = e("xhrstart", t);
document.dispatchEvent(n);
}), i.addEventListener("loadend", function(t) {
var n = e("xhrend", t);
document.dispatchEvent(n);
}), i.addEventListener("success", function(t) {
var n = e("xhrsuccess", t);
n.result = t.result, document.dispatchEvent(n);
}), i.addEventListener("fail", function(t) {
var n = e("xhrfail", t);
n.reason = t.reason, document.dispatchEvent(n);
})), t.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = t.normalStatuses || [ 200 ];
return i.addEventListener("error", function(t) {
n("Ошибка связи с сервером.", t);
}), i.addEventListener("timeout", function(t) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), i.addEventListener("abort", function(t) {
n("Запрос был прерван.", t);
}), i.addEventListener("load", function(e) {
if (!i.status) return void n("Не получен ответ от сервера.", e);
if (-1 == u.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", e);
var o = i.responseText, s = i.getResponseHeader("Content-Type");
if (s.match(/^application\/json/) || t.json) try {
o = JSON.parse(o);
} catch (e) {
return void n("Некорректный формат ответа от сервера.", e);
}
r(o, e);
}), setTimeout(function() {
i.send(a);
}, 0), i;
}
var i = n(147), o = n(156);
document.addEventListener("xhrfail", function(t) {
new i.Error(t.reason);
}), t.exports = r;
},
156: function(t, e) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
157: function(t, e, n) {
var r = n(158);
t.exports = function(t) {
var e, n = [], i = {}, o = t || {};
return function(t, o, s) {
n.push(""), o || (o = []), i.b = e = function(e, r, i) {
this && this.block, this && this.attributes || {};
t.call(this, n, o, e, r, i);
}, i.e = e = function(t) {
var e = this && this.block, n = this && this.attributes || {};
i.b.call({
block: function() {
e && e();
},
attributes: r.merge([ n ])
}, t, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
s ? i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Вход в сайт");
},
attributes: {
"class": "title"
}
}, "h4"), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("регистрация");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button");
},
attributes: {
"class": "header-aside"
}
});
},
attributes: {
"class": "line __header"
}
}) : (n.push("<p>Если у вас еще нет аккаунта, вы можете&nbsp;"), i.e.call({
block: function() {
n.push("зарегистрироваться");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button"), n.push("</p>")), i.e.call({
block: function() {
i.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Email:");
},
attributes: {
"for": "auth-email",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
attributes: {
id: "auth-email",
name: "email",
type: "email",
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Пароль:");
},
attributes: {
"for": "auth-password",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
attributes: {
id: "auth-password",
type: "password",
name: "password",
"class": "control"
}
}, "input"), i.e.call({
block: function() {
n.push("Забыли?");
},
attributes: {
type: "button",
"data-switch": "forgot-form",
"class": "aside __forgot __button-link"
}
}, "button");
},
attributes: {
"class": "text-input _with-aside __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
block: function() {
n.push("Войти");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action"
}
}, "button"), s && i.e.call({
block: function() {
n.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
"class": "body"
}
});
},
attributes: {
action: "#",
"class": "form"
}
}, "form");
},
attributes: {
"data-form": "login",
"class": (e = [ !0 ], r.joinClasses([ [ "login-form", s ? "_modal" : "_inline" ] ].map(r.joinClasses).map(function(t, n) {
return e[n] ? r.escape(t) : t;
})))
}
});
}.call(this, "bem" in o ? o.bem : "undefined" != typeof bem ? bem : void 0, "bem_chain" in o ? o.bem_chain : "undefined" != typeof bem_chain ? bem_chain : void 0, "inModal" in o ? o.inModal : "undefined" != typeof inModal ? inModal : void 0), 
n.join("");
};
},
158: function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function i(t) {
return (Array.isArray(t) ? t.map(i) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
function o(t) {
return a[t] || t;
}
function s(t) {
var e = (t + "").replace(c, o);
return e === "" + t ? t : e;
}
e.merge = function l(t, e) {
if (1 === arguments.length) {
for (var n = t[0], i = 1; i < t.length; i++) n = l(n, t[i]);
return n;
}
var o = t.class, s = e.class;
(o || s) && (o = o || [], s = s || [], Array.isArray(o) || (o = [ o ]), Array.isArray(s) || (s = [ s ]), 
t.class = o.concat(s).filter(r));
for (var a in e) "class" != a && (t[a] = e[a]);
return t;
}, e.joinClasses = i, e.cls = function(t, n) {
for (var r = [], o = 0; o < t.length; o++) n && n[o] ? r.push(e.escape(i([ t[o] ]))) : r.push(i(t[o]));
var s = i(r);
return s.length ? ' class="' + s + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, r, i) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var r = [], o = Object.keys(t);
if (o.length) for (var s = 0; s < o.length; ++s) {
var a = o[s], c = t[a];
"class" == a ? (c = i(c)) && r.push(" " + a + '="' + c + '"') : r.push(e.attr(a, c, !1, n));
}
return r.join("");
};
var a = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, c = /[&<>"]/g;
e.escape = s, e.rethrow = function u(t, e, r, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + r, 
t;
try {
i = i || n(116).readFileSync(e, "utf8");
} catch (o) {
u(t, null, r);
}
var s = 3, a = i.split("\n"), c = Math.max(r - s, 0), l = Math.min(a.length, r + s), s = a.slice(c, l).map(function(t, e) {
var n = e + c + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + s + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
159: function(t, e, n) {
var r = n(158);
t.exports = function(t) {
var e, n = [], i = {}, o = t || {};
return function(t, o, s) {
n.push(""), o || (o = []), i.b = e = function(e, r, i) {
this && this.block, this && this.attributes || {};
t.call(this, n, o, e, r, i);
}, i.e = e = function(t) {
var e = this && this.block, n = this && this.attributes || {};
i.b.call({
block: function() {
e && e();
},
attributes: r.merge([ n ])
}, t, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
s ? i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Регистрация");
},
attributes: {
"class": "title"
}
}, "h4"), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button");
},
attributes: {
"class": "header-aside"
}
});
},
attributes: {
"class": "line __header"
}
}) : (n.push("<p>Если у вас уже есть аккаунт, вы можете&nbsp;"), i.e.call({
block: function() {
n.push("войти");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), n.push("</p>")), i.e.call({
block: function() {
i.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Email:");
},
attributes: {
"for": "register-email",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
attributes: {
id: "register-email",
name: "email",
type: "email",
required: !0,
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Имя пользователя:");
},
attributes: {
"for": "register-displayName",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
attributes: {
id: "register-displayName",
name: "displayName",
required: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Пароль:");
},
attributes: {
"for": "register-password",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
attributes: {
id: "register-password",
type: "password",
name: "password",
required: !0,
minlength: "4",
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
block: function() {
n.push("Зарегистрироваться");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action submit"
}
}, "button"), s && i.e.call({
block: function() {
n.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), i.e.call({
block: function() {
n.push("Регистрируясь, вы принимаете" + r.escape(null == (e = " ") ? "" : e) + '<a href="/agreement">пользовательское соглашение</a>.');
},
attributes: {
"class": "line __agreement"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
"class": "body"
}
});
},
attributes: {
action: "#",
"data-form": "register",
"class": "form"
}
}, "form");
},
attributes: {
"class": (e = [ !0 ], r.joinClasses([ [ "login-form", s ? "_modal" : "_inline" ] ].map(r.joinClasses).map(function(t, n) {
return e[n] ? r.escape(t) : t;
})))
}
});
}.call(this, "bem" in o ? o.bem : "undefined" != typeof bem ? bem : void 0, "bem_chain" in o ? o.bem_chain : "undefined" != typeof bem_chain ? bem_chain : void 0, "inModal" in o ? o.inModal : "undefined" != typeof inModal ? inModal : void 0), 
n.join("");
};
},
160: function(t, e, n) {
var r = n(158);
t.exports = function(t) {
var e, n = [], i = {}, o = t || {};
return function(t, o, s) {
n.push(""), o || (o = []), i.b = e = function(e, r, i) {
this && this.block, this && this.attributes || {};
t.call(this, n, o, e, r, i);
}, i.e = e = function(t) {
var e = this && this.block, n = this && this.attributes || {};
i.b.call({
block: function() {
e && e();
},
attributes: r.merge([ n ])
}, t, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
s ? i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Восстановление пароля");
},
attributes: {
"class": "title"
}
}, "h4");
},
attributes: {
"class": "line __header"
}
}) : (n.push("<p>Если у вас еще нет аккаунта, вы можете&nbsp;"), i.e.call({
block: function() {
n.push("зарегистрироваться");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button"), n.push("</p>")), i.e.call({
block: function() {
i.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Email:");
},
attributes: {
"for": "forgot-email",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
attributes: {
id: "forgot-email",
name: "email",
type: "email",
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
block: function() {
n.push("Восстановить пароль");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action __submit"
}
}, "button");
},
attributes: {
"class": "line"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.e.call({
block: function() {
n.push("/");
},
attributes: {
"class": "separator"
}
}, "span"), n.push(r.escape(null == (e = " ") ? "" : e)), i.e.call({
block: function() {
n.push("Регистрация");
},
attributes: {
"data-switch": "register-form",
"class": "button-link"
}
}, "button"), s && i.e.call({
block: function() {
n.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), n.push(r.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
n.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
"class": "body"
}
});
},
attributes: {
action: "#",
"data-form": "forgot",
"class": "form"
}
}, "form");
},
attributes: {
"class": (e = [ !0 ], r.joinClasses([ [ "login-form", s ? "_modal" : "_inline" ] ].map(r.joinClasses).map(function(t, n) {
return e[n] ? r.escape(t) : t;
})))
}
});
}.call(this, "bem" in o ? o.bem : "undefined" != typeof bem ? bem : void 0, "bem_chain" in o ? o.bem_chain : "undefined" != typeof bem_chain ? bem_chain : void 0, "inModal" in o ? o.inModal : "undefined" != typeof inModal ? inModal : void 0), 
n.join("");
};
},
161: function(t, e, n) {
"use strict";
function r(t) {
t.bem = i, t.t = a, t.thumb = o, t.lang = s;
}
var i = n(162)(), o = n(163).thumb, s = n(247).lang, a = n(248);
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
},
162: function(t, e, n) {
"use strict";
var r = n(158);
t.exports = function(t) {
function e(t, e, n, i, o) {
var s = o || "div";
switch (s) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
t.push("<" + s + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(s) && t.push("</" + s + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, i, o) {
var s = this.block, a = this.attributes || {};
if (!a.class && i && !o) throw Error("Block without class: " + i);
if (a.class) {
var c = a.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var l;
try {
l = c[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + c[0]);
}
o ? c[0] = r[r.length - 1] + t.element + c[0] : r[r.length] = l;
var f = (o ? r[r.length - 1] + t.element : "") + l;
-1 === c.indexOf(f) && (c[c.length] = f);
for (var p = 0; p < c.length; p++) {
var h = c[p];
h.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? c[p] = f + h : h.match(RegExp("^" + t.element)) && (r[r.length - 2] ? c[p] = r[r.length - 2] + h : c[p] = r[r.length - 1] + h), 
c[p].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (c[p] = t.prefix + c[p]);
}
a.class = c.sort().join(" ");
}
e(n, s, a, r, i), o || r.pop();
};
};
},
163: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var i = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + i + t.slice(t.lastIndexOf("."));
};
},
247: function(t, e, n) {
"use strict";
t.exports = {
lang: "en"
};
},
248: function(t, e, n) {
"use strict";
function r() {
for (var t = [ s ], e = 0; e < arguments.length; e++) t.push(arguments[e]);
return o.t.apply(o, t);
}
var i = n(249), o = new i("en"), s = n(247).lang, a = {};
r.i18n = o, r.requirePhrase = function(t, e) {
a[t] && -1 != a[t].indexOf(e) || (a[t] || (a[t] = []), a[t].push(e), o.addPhrase(s, t, e));
}, t.exports = r;
},
249: function(t, e, n) {
"use strict";
t.exports = n(250);
},
250: function(t, e, n) {
"use strict";
function r(t) {
return Object.prototype.toString.call(t);
}
function i(t) {
return "[object String]" === r(t);
}
function o(t) {
return !isNaN(t) && isFinite(t);
}
function s(t) {
return t === !0 || t === !1;
}
function a(t) {
return "[object Function]" === r(t);
}
function c(t) {
return "[object Object]" === r(t);
}
function l(t, e, n) {
if (null !== t) if (_ && t.forEach === _) t.forEach(e, n); else if (t.length === +t.length) for (var r = 0, i = t.length; i > r; r += 1) e.call(n, t[r], r, t); else for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && e.call(n, t[o], o, t);
}
function u(t) {
var e = 1, n = arguments, r = n.length, i = (t + "").replace(k, function(t) {
if ("%%" === t) return "%";
if (e >= r) return t;
switch (t) {
case "%s":
return n[e++] + "";

case "%d":
return +n[e++];

case "%j":
return JSON.stringify(n[e++]);

default:
return t;
}
});
return i;
}
function f(t) {
var e = {};
return l(t || {}, function(t, n) {
return t && "object" == typeof t ? void l(f(t), function(t, r) {
e[n + "." + r] = t;
}) : void (e[n] = t);
}), e;
}
function p(t, e) {
return t + F + e;
}
function h(t, e, n) {
var r = p(e, n), i = t._storage;
if (i.hasOwnProperty(r)) return r;
if (e === t._defaultLocale) return null;
var o = t._fallbacks_cache;
if (o.hasOwnProperty(r)) return o[r];
for (var s, a = t._fallbacks[e] || [ t._defaultLocale ], c = 0, l = a.length; l > c; c++) if (s = p(a[c], n), 
i.hasOwnProperty(s)) return o[r] = s, o[r];
return o[r] = null, null;
}
function d(t, e, n) {
var r = g.indexOf(t, e);
return -1 === r ? u('[pluralizer for "%s" locale not found]', t) : void 0 === n[r] ? u('[plural form %d ("%s") not found in translation]', r, g.forms(t)[r]) : n[r];
}
function b(t) {
return this instanceof b ? (this._defaultLocale = t ? t + "" : w, this._fallbacks = {}, 
this._fallbacks_cache = {}, this._storage = {}, void (this._plurals_cache = {})) : new b(t);
}
function m(t, e, n) {
var r, i, o, s, a, c;
return x.test(e) ? (r = v.parse(e), 1 === r.length && "literal" === r[0].type ? r[0].text : (t._plurals_cache[n] || (t._plurals_cache[n] = new b(n)), 
c = t._plurals_cache[n], i = [], i.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
i.push("params = flatten(params);"), l(r, function(t) {
if ("literal" === t.type) return void i.push(u("str += %j;", t.text));
if ("variable" === t.type) return o = t.anchor, void i.push(u('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', o, o, o));
if ("plural" !== t.type) throw Error("Unknown node type");
o = t.anchor, s = {}, l(t.strict, function(e, r) {
var i = v.parse(e);
return 1 === i.length && "literal" === i[0].type ? (s[r] = !1, void (t.strict[r] = i[0].text)) : (s[r] = !0, 
void (c.hasPhrase(n, e, !0) || c.addPhrase(n, e, e)));
}), a = {}, l(t.forms, function(e, r) {
var i, o = v.parse(e);
return 1 === o.length && "literal" === o[0].type ? (i = o[0].text, t.forms[r] = i, 
void (a[i] = !1)) : (a[e] = !0, void (c.hasPhrase(n, e, !0) || c.addPhrase(n, e, e)));
}), i.push(u("loc = %j;", n)), i.push(u("loc_plzr = %j;", n.split(/[-_]/)[0])), 
i.push(u("anchor = params[%j];", o)), i.push(u("cache = this._plurals_cache[loc];")), 
i.push(u("strict = %j;", t.strict)), i.push(u("strict_exec = %j;", s)), i.push(u("forms = %j;", t.forms)), 
i.push(u("forms_exec = %j;", a)), i.push("if (+(anchor) != anchor) {"), i.push(u('  str += "[invalid plurals amount: %s(" + anchor + ")]";', o)), 
i.push("} else {"), i.push("  if (strict[anchor] !== undefined) {"), i.push("    plrl = strict[anchor];"), 
i.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), i.push("  } else {"), 
i.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), i.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
i.push("  }"), i.push("}");
}), i.push("return str;"), Function("params", "flatten", "pluralizer", i.join("\n")))) : e;
}
var v = n(251), g = n(252), y = Array.isArray || function(t) {
return "[object Array]" === r(t);
}, _ = Array.prototype.forEach, k = /%[sdj%]/g, w = "en", F = "#@$";
b.prototype.addPhrase = function(t, e, n, r) {
var a, u = this;
if (s(r)) a = r ? 1 / 0 : 0; else if (o(r)) {
if (a = Math.floor(r), 0 > a) throw new TypeError("Invalid flatten level (should be >= 0).");
} else a = 1 / 0;
if (c(n) && a > 0) return l(n, function(n, r) {
u.addPhrase(t, (e ? e + "." : "") + r, n, a - 1);
}), this;
if (i(n)) this._storage[p(t, e)] = {
translation: n,
locale: t,
raw: !1
}; else {
if (!(y(n) || o(n) || s(n) || 0 === a && c(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[p(t, e)] = {
translation: n,
locale: t,
raw: !0
};
}
return u._fallbacks_cache = {}, this;
}, b.prototype.setFallback = function(t, e) {
var n = this._defaultLocale;
if (n === t) throw Error("Default locale can't have fallbacks");
var r = y(e) ? e.slice() : [ e ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[t] = r, this._fallbacks_cache = {}, 
this;
};
var x = /#\{|\(\(|\\\\/;
b.prototype.translate = function(t, e, n) {
var r, s = h(this, t, e);
return s ? (r = this._storage[s], r.raw ? r.translation : (r.hasOwnProperty("compiled") || (r.compiled = m(this, r.translation, r.locale)), 
a(r.compiled) ? ((o(n) || i(n)) && (n = {
count: n,
value: n
}), r.compiled.call(this, n, f, d)) : r.compiled)) : t + ": No translation for [" + e + "]";
}, b.prototype.hasPhrase = function(t, e, n) {
return n ? this._storage.hasOwnProperty(p(t, e)) : !!h(this, t, e);
}, b.prototype.getLocale = function(t, e, n) {
if (n) return this._storage.hasOwnProperty(p(t, e)) ? t : null;
var r = h(this, t, e);
return r ? r.split(F, 2)[0] : null;
}, b.prototype.t = b.prototype.translate, b.prototype.stringify = function(t) {
var e = this, n = {};
l(this._storage, function(t, e) {
n[e.split(F)[1]] = !0;
});
var r = {};
l(n, function(n, i) {
var o = h(e, t, i);
if (o) {
var s = e._storage[o].locale;
r[s] || (r[s] = {}), r[s][i] = e._storage[o].translation;
}
});
var i = {
fallback: {},
locales: r
}, o = (e._fallbacks[t] || []).slice(0, -1);
return o.length && (i.fallback[t] = o), JSON.stringify(i);
}, b.prototype.load = function(t) {
var e = this;
return i(t) && (t = JSON.parse(t)), l(t.locales, function(t, n) {
l(t, function(t, r) {
e.addPhrase(n, r, t, 0);
});
}), l(t.fallback, function(t, n) {
e.setFallback(n, t);
}), this;
}, t.exports = b;
},
251: function(t, e) {
"use strict";
t.exports = function() {
function t(t, e) {
function n() {
this.constructor = t;
}
n.prototype = e.prototype, t.prototype = new n();
}
function e(t, e, n, r, i, o) {
this.message = t, this.expected = e, this.found = n, this.offset = r, this.line = i, 
this.column = o, this.name = "SyntaxError";
}
function n(t) {
function n() {
return t.substring(vt, mt);
}
function r(e) {
function n(e, n, r) {
var i, o;
for (i = n; r > i; i++) o = t.charAt(i), "\n" === o ? (e.seenCR || e.line++, e.column = 1, 
e.seenCR = !1) : "\r" === o || "\u2028" === o || "\u2029" === o ? (e.line++, e.column = 1, 
e.seenCR = !0) : (e.column++, e.seenCR = !1);
}
return gt !== e && (gt > e && (gt = 0, yt = {
line: 1,
column: 1,
seenCR: !1
}), n(yt, gt, e), gt = e), yt;
}
function i(t) {
_t > mt || (mt > _t && (_t = mt, kt = []), kt.push(t));
}
function o(n, i, o) {
function s(t) {
var e = 1;
for (t.sort(function(t, e) {
return t.description < e.description ? -1 : t.description > e.description ? 1 : 0;
}); e < t.length; ) t[e - 1] === t[e] ? t.splice(e, 1) : e++;
}
function a(t, e) {
function n(t) {
function e(t) {
return t.charCodeAt(0).toString(16).toUpperCase();
}
return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(t) {
return "\\x0" + e(t);
}).replace(/[\x10-\x1F\x80-\xFF]/g, function(t) {
return "\\x" + e(t);
}).replace(/[\u0180-\u0FFF]/g, function(t) {
return "\\u0" + e(t);
}).replace(/[\u1080-\uFFFF]/g, function(t) {
return "\\u" + e(t);
});
}
var r, i, o, s = Array(t.length);
for (o = 0; o < t.length; o++) s[o] = t[o].description;
return r = t.length > 1 ? s.slice(0, -1).join(", ") + " or " + s[t.length - 1] : s[0], 
i = e ? '"' + n(e) + '"' : "end of input", "Expected " + r + " but " + i + " found.";
}
var c = r(o), l = o < t.length ? t.charAt(o) : null;
return null !== i && s(i), new e(null !== n ? n : a(i, l), i, l, o, c.line, c.column);
}
function s() {
var t, e;
for (t = [], e = b(), e === k && (e = a(), e === k && (e = p())); e !== k; ) t.push(e), 
e = b(), e === k && (e = a(), e === k && (e = p()));
return t;
}
function a() {
var e, n, r, o, s;
return e = mt, t.substr(mt, 2) === E ? (n = E, mt += 2) : (n = k, 0 === wt && i(j)), 
n !== k ? (r = c(), r !== k ? (t.substr(mt, 2) === O ? (o = O, mt += 2) : (o = k, 
0 === wt && i(A)), o !== k ? (s = f(), s === k && (s = M), s !== k ? (vt = e, n = L(r, s), 
e = n) : (mt = e, e = x)) : (mt = e, e = x)) : (mt = e, e = x)) : (mt = e, e = x), 
e;
}
function c() {
var e, n, r, o;
return e = mt, n = l(), n !== k ? (124 === t.charCodeAt(mt) ? (r = S, mt++) : (r = k, 
0 === wt && i(C)), r !== k ? (o = c(), o !== k ? (vt = e, n = R(n, o), e = n) : (mt = e, 
e = x)) : (mt = e, e = x)) : (mt = e, e = x), e === k && (e = mt, n = l(), n !== k && (vt = e, 
n = P(n)), e = n), e;
}
function l() {
var e, n, r, o, s, a;
if (e = mt, 61 === t.charCodeAt(mt) ? (n = q, mt++) : (n = k, 0 === wt && i(T)), 
n !== k) {
if (r = [], z.test(t.charAt(mt)) ? (o = t.charAt(mt), mt++) : (o = k, 0 === wt && i(H)), 
o !== k) for (;o !== k; ) r.push(o), z.test(t.charAt(mt)) ? (o = t.charAt(mt), mt++) : (o = k, 
0 === wt && i(H)); else r = x;
if (r !== k) if (32 === t.charCodeAt(mt) ? (o = N, mt++) : (o = k, 0 === wt && i(I)), 
o === k && (o = M), o !== k) {
if (s = [], a = u(), a !== k) for (;a !== k; ) s.push(a), a = u(); else s = x;
s !== k ? (vt = e, n = D(r, s), e = n) : (mt = e, e = x);
} else mt = e, e = x; else mt = e, e = x;
} else mt = e, e = x;
if (e === k) {
if (e = mt, n = [], r = u(), r !== k) for (;r !== k; ) n.push(r), r = u(); else n = x;
n !== k && (vt = e, n = $()), e = n;
}
return e;
}
function u() {
var e, n, r;
return e = mt, 92 === t.charCodeAt(mt) ? (n = J, mt++) : (n = k, 0 === wt && i(G)), 
n !== k ? (U.test(t.charAt(mt)) ? (r = t.charAt(mt), mt++) : (r = k, 0 === wt && i(X)), 
r !== k ? (vt = e, n = Z(r), e = n) : (mt = e, e = x)) : (mt = e, e = x), e === k && (e = mt, 
n = mt, wt++, 124 === t.charCodeAt(mt) ? (r = S, mt++) : (r = k, 0 === wt && i(C)), 
r === k && (t.substr(mt, 2) === O ? (r = O, mt += 2) : (r = k, 0 === wt && i(A))), 
wt--, r === k ? n = B : (mt = n, n = x), n !== k ? (t.length > mt ? (r = t.charAt(mt), 
mt++) : (r = k, 0 === wt && i(K)), r !== k ? (vt = e, n = W(), e = n) : (mt = e, 
e = x)) : (mt = e, e = x)), e;
}
function f() {
var e, n, r;
return e = mt, 58 === t.charCodeAt(mt) ? (n = V, mt++) : (n = k, 0 === wt && i(Y)), 
n !== k ? (r = h(), r !== k ? (vt = e, n = Q(r), e = n) : (mt = e, e = x)) : (mt = e, 
e = x), e;
}
function p() {
var e, n, r, o;
return e = mt, t.substr(mt, 2) === tt ? (n = tt, mt += 2) : (n = k, 0 === wt && i(et)), 
n !== k ? (r = h(), r !== k ? (125 === t.charCodeAt(mt) ? (o = nt, mt++) : (o = k, 
0 === wt && i(rt)), o !== k ? (vt = e, n = it(r), e = n) : (mt = e, e = x)) : (mt = e, 
e = x)) : (mt = e, e = x), e;
}
function h() {
var e, n, r, o, s;
if (e = mt, n = d(), n !== k) if (46 === t.charCodeAt(mt) ? (r = ot, mt++) : (r = k, 
0 === wt && i(st)), r !== k) {
if (o = [], s = h(), s !== k) for (;s !== k; ) o.push(s), s = h(); else o = x;
o !== k ? (vt = e, n = at(), e = n) : (mt = e, e = x);
} else mt = e, e = x; else mt = e, e = x;
return e === k && (e = d()), e;
}
function d() {
var e, n, r, o;
if (e = mt, ct.test(t.charAt(mt)) ? (n = t.charAt(mt), mt++) : (n = k, 0 === wt && i(lt)), 
n !== k) {
for (r = [], ut.test(t.charAt(mt)) ? (o = t.charAt(mt), mt++) : (o = k, 0 === wt && i(ft)); o !== k; ) r.push(o), 
ut.test(t.charAt(mt)) ? (o = t.charAt(mt), mt++) : (o = k, 0 === wt && i(ft));
r !== k ? (vt = e, n = W(), e = n) : (mt = e, e = x);
} else mt = e, e = x;
return e;
}
function b() {
var t, e, n, r, i;
if (t = mt, e = [], n = mt, r = mt, wt++, i = a(), i === k && (i = p()), wt--, i === k ? r = B : (mt = r, 
r = x), r !== k ? (i = m(), i !== k ? (vt = n, r = pt(i), n = r) : (mt = n, n = x)) : (mt = n, 
n = x), n !== k) for (;n !== k; ) e.push(n), n = mt, r = mt, wt++, i = a(), i === k && (i = p()), 
wt--, i === k ? r = B : (mt = r, r = x), r !== k ? (i = m(), i !== k ? (vt = n, 
r = pt(i), n = r) : (mt = n, n = x)) : (mt = n, n = x); else e = x;
return e !== k && (vt = t, e = ht(e)), t = e;
}
function m() {
var e, n, r;
return e = mt, 92 === t.charCodeAt(mt) ? (n = J, mt++) : (n = k, 0 === wt && i(G)), 
n !== k ? (dt.test(t.charAt(mt)) ? (r = t.charAt(mt), mt++) : (r = k, 0 === wt && i(bt)), 
r !== k ? (vt = e, n = Z(r), e = n) : (mt = e, e = x)) : (mt = e, e = x), e === k && (t.length > mt ? (e = t.charAt(mt), 
mt++) : (e = k, 0 === wt && i(K))), e;
}
function v(t) {
for (var e = [], n = 0; n < t.length; n++) void 0 === t[n].strict && e.push(t[n].text);
return e;
}
function g(t) {
for (var e = {}, n = 0; n < t.length; n++) void 0 !== t[n].strict && (e[t[n].strict] = t[n].text);
return e;
}
var y, _ = arguments.length > 1 ? arguments[1] : {}, k = {}, w = {
start: s
}, F = s, x = k, E = "((", j = {
type: "literal",
value: "((",
description: '"(("'
}, O = "))", A = {
type: "literal",
value: "))",
description: '"))"'
}, M = null, L = function(t, e) {
return {
type: "plural",
forms: v(t),
strict: g(t),
anchor: e || "count"
};
}, S = "|", C = {
type: "literal",
value: "|",
description: '"|"'
}, R = function(t, e) {
return [ t ].concat(e);
}, P = function(t) {
return [ t ];
}, q = "=", T = {
type: "literal",
value: "=",
description: '"="'
}, z = /^[0-9]/, H = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, N = " ", I = {
type: "literal",
value: " ",
description: '" "'
}, D = function(t, e) {
return {
strict: t.join(""),
text: e.join("")
};
}, $ = function() {
return {
text: n()
};
}, J = "\\", G = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, U = /^[\\|)(]/, X = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, Z = function(t) {
return t;
}, B = void 0, K = {
type: "any",
description: "any character"
}, W = function() {
return n();
}, V = ":", Y = {
type: "literal",
value: ":",
description: '":"'
}, Q = function(t) {
return t;
}, tt = "#{", et = {
type: "literal",
value: "#{",
description: '"#{"'
}, nt = "}", rt = {
type: "literal",
value: "}",
description: '"}"'
}, it = function(t) {
return {
type: "variable",
anchor: t
};
}, ot = ".", st = {
type: "literal",
value: ".",
description: '"."'
}, at = function() {
return n();
}, ct = /^[a-zA-Z_$]/, lt = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, ut = /^[a-zA-Z0-9_$]/, ft = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, pt = function(t) {
return t;
}, ht = function(t) {
return {
type: "literal",
text: t.join("")
};
}, dt = /^[\\#()|]/, bt = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, mt = 0, vt = 0, gt = 0, yt = {
line: 1,
column: 1,
seenCR: !1
}, _t = 0, kt = [], wt = 0;
if ("startRule" in _) {
if (!(_.startRule in w)) throw Error("Can't start parsing from rule \"" + _.startRule + '".');
F = w[_.startRule];
}
if (y = F(), y !== k && mt === t.length) return y;
throw y !== k && mt < t.length && i({
type: "end",
description: "end of input"
}), o(null, kt, _t);
}
return t(e, Error), {
SyntaxError: e,
parse: n
};
}();
},
252: function(t, e) {
"use strict";
function n(t) {
var e;
return h[t] ? t : (e = t.toLowerCase().replace("_", "-"), h[e] ? e : (e = e.split("-")[0], 
h[e] ? e : null));
}
function r(t) {
var e = n(t);
return h[e] ? h[e].c : null;
}
function i(t, e) {
var r = n(t);
if (!r) return -1;
if (!h[r].cFn) return 0;
var i = e + "", o = i.indexOf(".") < 0 ? "" : i.split(".")[1], s = o.length, a = +e, c = +i.split(".")[0], l = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return h[r].cFn(a, c, s, +o, l);
}
function o(t, e) {
var r = n(t);
return r ? h[r].c[i(r, e)] : null;
}
function s(t) {
var e = n(t);
return h[e] ? h[e].o : null;
}
function a(t, e) {
var r = n(t);
if (!r) return -1;
if (!h[r].oFn) return 0;
var i = e + "", o = i.indexOf(".") < 0 ? "" : i.split(".")[1], s = o.length, a = +e, c = +i.split(".")[0], l = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return h[r].oFn(a, c, s, +o, l);
}
function c(t, e) {
var r = n(t);
return h[r] ? h[r].o[a(r, e)] : null;
}
function l(t) {
return d[t];
}
function u(t, e) {
var n;
for (e.c = e.c ? e.c.map(l) : [ "other" ], e.o = e.o ? e.o.map(l) : [ "other" ], 
n = 0; n < t.length; n++) h[t[n]] = e;
}
function f(t, e, n) {
return n >= t && e >= n && n % 1 === 0;
}
function p(t, e) {
return t.indexOf(e) >= 0;
}
var h = {};
t.exports = o, t.exports.indexOf = i, t.exports.forms = r, t.exports.ordinal = c, 
t.exports.ordinal.indexOf = a, t.exports.ordinal.forms = s;
var d = [ "zero", "one", "two", "few", "many", "other" ];
u([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
}
}), u([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(t) {
return f(0, 1, t) ? 0 : 1;
}
}), u([ "am", "fa", "kn", "zu" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
}
}), u([ "ar" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
var e = t % 100;
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : f(3, 10, e) ? 3 : f(11, 99, e) ? 4 : 5;
}
}), u([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return p([ 1, 5, 7, 8, 9, 10 ], t) ? 0 : p([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), u([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
}
}), u([ "az" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(t, e) {
var n = e % 10, r = e % 100, i = e % 1e3;
return p([ 1, 2, 5, 7, 8 ], n) || p([ 20, 50, 70, 80 ], r) ? 0 : p([ 3, 4 ], n) || p([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i) ? 1 : 0 === e || 6 === n || p([ 40, 60, 90 ], r) ? 2 : 3;
}
}), u([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === e && 11 !== n ? 0 : f(2, 4, e) && !f(12, 14, n) ? 1 : 0 === e || f(5, 9, e) || f(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return p([ 2, 3 ], e) && !p([ 12, 13 ], n) ? 0 : 1;
}
}), u([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "zh" ], {}), 
u([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
var e = t % 10, n = t % 100, r = t % 1e6;
return 1 !== e || p([ 11, 71, 91 ], n) ? 2 !== e || p([ 12, 72, 92 ], n) ? !f(3, 4, e) && 9 !== e || f(10, 19, n) || f(70, 79, n) || f(90, 99, n) ? 0 !== t && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), u([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e, n, r) {
var i = e % 10, o = e % 100, s = r % 10, a = r % 100;
return 0 === n && 1 === i && 11 !== o || 1 === s && 11 !== a ? 0 : 0 === n && f(2, 4, i) && !f(12, 14, o) || f(2, 4, s) && !f(12, 14, a) ? 1 : 2;
}
}), u([ "ca" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return p([ 1, 3 ], t) ? 0 : 2 === t ? 1 : 4 === t ? 2 : 3;
}
}), u([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : f(2, 4, e) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), u([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : 3 === t ? 3 : 6 === t ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(t) {
return p([ 0, 7, 8, 9 ], t) ? 0 : 1 === t ? 1 : 2 === t ? 2 : p([ 3, 4 ], t) ? 3 : p([ 5, 6 ], t) ? 4 : 5;
}
}), u([ "da" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r, i) {
return 1 === t || 0 !== i && p([ 0, 1 ], e) ? 0 : 1;
}
}), u([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, e, n, r) {
var i = e % 100, o = r % 100;
return 0 === n && 1 === i || 1 === o ? 0 : 0 === n && 2 === i || 2 === o ? 1 : 0 === n && f(3, 4, i) || f(3, 4, o) ? 2 : 3;
}
}), u([ "en" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === e && 11 !== n ? 0 : 2 === e && 12 !== n ? 1 : 3 === e && 13 !== n ? 2 : 3;
}
}), u([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return p([ 0, 1 ], e) ? 0 : 1;
}
}), u([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
var i = e % 10, o = r % 10;
return 0 === n && p([ 1, 2, 3 ], e) || 0 === n && !p([ 4, 6, 9 ], i) || 0 !== n && !p([ 4, 6, 9 ], o) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), u([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return p([ 0, 1 ], e) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), u([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 2 === t ? 1 : f(3, 6, t) ? 2 : f(7, 10, t) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), u([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t) {
return p([ 1, 11 ], t) ? 0 : p([ 2, 12 ], t) ? 1 : f(3, 10, t) || f(13, 19, t) ? 2 : 3;
}
}), u([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return 1 === t ? 0 : p([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), u([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && p([ 0, 20, 40, 60, 80 ], i) ? 2 : 0 !== n ? 3 : 4;
}
}), u([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(t, e, n) {
var r = t % 10;
return 1 === e && 0 === n ? 0 : 2 === e && 0 === n ? 1 : 0 !== n || f(0, 10, t) || 0 !== r ? 3 : 2;
}
}), u([ "hu" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return p([ 1, 5 ], t) ? 0 : 1;
}
}), u([ "is" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r, i) {
var o = e % 10, s = e % 100;
return 0 === i && 1 === o && 11 !== s || 0 !== i ? 0 : 1;
}
}), u([ "it" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
return p([ 11, 8, 80, 800 ], t) ? 0 : 1;
}
}), u([ "iu", "kw", "naq", "se", "sma", "smi", "smj", "smn", "sms" ], {
c: [ 1, 2, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 2 === t ? 1 : 2;
}
}), u([ "ka" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(t, e) {
var n = e % 100;
return 1 === e ? 0 : 0 === e || f(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
}
}), u([ "kk" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
var e = t % 10;
return 6 === e || 9 === e || 0 === e && 0 !== t ? 0 : 1;
}
}), u([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2;
}
}), u([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(t, e) {
return 0 === t ? 0 : p([ 0, 1 ], e) && 0 !== t ? 1 : 2;
}
}), u([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), u([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n, r) {
var i = t % 10, o = t % 100;
return 1 !== i || f(11, 19, o) ? f(2, 9, i) && !f(11, 19, o) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), u([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(t, e, n, r) {
var i = t % 10, o = t % 100, s = r % 100, a = r % 10;
return 0 === i || f(11, 19, o) || 2 === n && f(11, 19, s) ? 0 : 1 === i && 11 !== o || 2 === n && 1 === a && 11 !== s || 2 !== n && 1 === a ? 1 : 2;
}
}), u([ "mk" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
var i = e % 10, o = r % 10;
return 0 === n && 1 === i || 1 === o ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(t, e) {
var n = e % 10, r = e % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : p([ 7, 8 ], n) && !p([ 17, 18 ], r) ? 2 : 3;
}
}), u([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e, n) {
var r = t % 100;
return 1 === e && 0 === n ? 0 : 0 !== n || 0 === t || 1 !== t && f(1, 19, r) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), u([ "mr" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return 1 === t ? 0 : p([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 3;
}
}), u([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var e = t % 100;
return 1 === t ? 0 : 0 === t || f(2, 10, e) ? 1 : f(11, 19, e) ? 2 : 3;
}
}), u([ "ne" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return f(1, 4, t) ? 0 : 1;
}
}), u([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 1 === e && 0 === n ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, i) ? 1 : 0 === n && 1 !== e && f(0, 1, r) || 0 === n && f(5, 9, r) || 0 === n && f(12, 14, i) ? 2 : 3;
}
}), u([ "pt" ], {
c: [ 1, 5 ],
cFn: function(t) {
return f(0, 2, t) && 2 !== t ? 0 : 1;
}
}), u([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), u([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && f(5, 9, r) || 0 === n && f(11, 14, i) ? 2 : 3;
}
}), u([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : f(2, 10, t) ? 1 : 2;
}
}), u([ "si" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
return p([ 0, 1 ], t) || 0 === e && 1 === r ? 0 : 1;
}
}), u([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, e, n) {
var r = e % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && f(3, 4, r) || 0 !== n ? 2 : 3;
}
}), u([ "sq" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === t ? 0 : 4 === e && 14 !== n ? 1 : 2;
}
}), u([ "sv" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return p([ 1, 2 ], e) && !p([ 11, 12 ], n) ? 0 : 1;
}
}), u([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(t) {
return f(0, 1, t) || f(11, 99, t) ? 0 : 1;
}
}), u([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && f(5, 9, r) || 0 === n && f(11, 14, i) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return 3 === e && 13 !== n ? 0 : 1;
}
});
}
});
//# sourceMappingURL=auth.907dd6cbd22f1e47ddc8.js.map
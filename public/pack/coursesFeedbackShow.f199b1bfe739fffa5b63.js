var coursesFeedbackShow = webpackJsonp_name_([ 21 ], {
0: function(t, e, n) {
"use strict";
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function o() {
new h();
}
var c = function() {
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
}(), i = n(379), a = n(374), s = n(372), u = n(371), l = n(382), f = n(174), h = function() {
function t() {
var e = this;
r(this, t), this.elem = document, this.delegate("[data-action-coursefeedback-comment-add]", "click", function(t) {
t.preventDefault(), e.getItem(t.target).addComment();
}), this.delegate("[data-action-coursefeedback-comment-edit]", "click", function(t) {
t.preventDefault(), e.getItem(t.target).editComment();
});
}
return c(t, [ {
key: "getItem",
value: function(t) {
return t = t.closest(".course-feedback"), t.feedbackItem || (t.feedbackItem = new p(t)), 
t.feedbackItem;
}
} ]), t;
}();
s.delegateMixin(h.prototype);
var p = function() {
function t(e) {
var n = this;
r(this, t), this.elem = e, this.number = +e.getAttribute("data-coursefeedback-number");
var o = this.elem.querySelector("[data-coursefeedback-comment-raw]");
this.teacherCommentRaw = o ? o.innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/, "&") : "", 
this.delegate(".course-feedback-comment-form", "submit", function(t) {
t.preventDefault(), n.onSubmitComment();
}), this.delegate("[data-action-comment-cancel]", "click", function(t) {
t.preventDefault(), n.onCancelComment();
});
}
return c(t, [ {
key: "addComment",
value: function() {
this.renderCommentForm();
}
}, {
key: "editComment",
value: function() {
this.renderCommentForm();
}
}, {
key: "renderCommentForm",
value: function() {
var t = this.elem.querySelector(".course-feedback__teacher-comment");
t ? this.teacherComment = t.firstChild.innerHTML : (this.teacherComment = "", t = document.createElement("div"), 
t.className = "course-feedback__teacher-comment", this.elem.querySelector(".course-feedback__teacher").appendChild(t)), 
t.innerHTML = l(f, {
teacherCommentRaw: this.teacherCommentRaw
}), t.querySelector("textarea").focus();
}
}, {
key: "onCancelComment",
value: function() {
this.renderComment();
}
}, {
key: "onSubmitComment",
value: function() {
var t = this, e = this.elem.querySelector("form"), n = e.elements.teacherComment.value.trim(), r = i({
method: "PATCH",
url: "/courses/feedback/comment",
body: {
number: this.number,
teacherComment: n
}
}), o = e.querySelector('[type="submit"]'), c = new a({
elem: o,
size: "small",
elemClass: "button_loading"
});
c.start(), o.disabled = !0, r.addEventListener("loadend", function(t) {
c.stop(), o.disabled = !1;
}), r.addEventListener("success", function(e) {
200 == r.status ? (new u.Success("Комментарий сохранён"), t.teacherCommentRaw = n, 
t.teacherComment = e.result.teacherComment, t.renderComment()) : new u.Error("Не получилось сохранить комментарий");
});
}
}, {
key: "renderComment",
value: function() {
var t = this.elem.querySelector(".course-feedback__teacher-comment");
return this.teacherComment ? (this.elem.querySelector("[data-action-coursefeedback-comment-add]").style.display = "none", 
t.innerHTML = "<div></div>\n          <a class=\"course-feedback__edit\" href='#' data-action-coursefeedback-comment-edit>редактировать</a>\n          ", 
void (t.firstChild.innerHTML = this.teacherComment)) : (t && t.remove(), void (this.elem.querySelector("[data-action-coursefeedback-comment-add]").style.display = ""));
}
} ]), t;
}();
s.delegateMixin(p.prototype), o();
},
116: function(t, e) {},
174: function(t, e, n) {
var r = n(381);
t.exports = function(t) {
var e, n = [], o = {}, c = t || {};
return function(t, c, i) {
n.push(""), c || (c = []), o.b = e = function(e, r, o) {
this && this.block, this && this.attributes || {};
t.call(this, n, c, e, r, o);
}, o.e = e = function(t) {
var e = this && this.block, n = this && this.attributes || {};
o.b.call({
block: function() {
e && e();
},
attributes: r.merge([ n ])
}, t, !0);
}, o.b.call({
block: function() {
o.b.call({
block: function() {
n.push(r.escape(null == (e = i) ? "" : e));
},
attributes: {
name: "teacherComment",
"class": "textarea-input"
}
}, "textarea"), o.e.call({
block: function() {
o.b.call({
block: function() {
o.e.call({
block: function() {
n.push("Опубликовать");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action __item-save"
}
}, "button"), o.e.call({
block: function() {
n.push("Отмена");
},
attributes: {
type: "button",
"data-action-comment-cancel": !0,
"class": "item-cancel"
}
}, "button");
},
attributes: {
"class": "ok-cancel"
}
});
},
attributes: {
"class": "course-feedback-comment-form"
}
}, "form");
}.call(this, "bem" in c ? c.bem : "undefined" != typeof bem ? bem : void 0, "bem_chain" in c ? c.bem_chain : "undefined" != typeof bem_chain ? bem_chain : void 0, "teacherCommentRaw" in c ? c.teacherCommentRaw : "undefined" != typeof teacherCommentRaw ? teacherCommentRaw : void 0), 
n.join("");
};
},
374: function(t, e) {
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
379: function(t, e, n) {
"use strict";
function r(t) {
function e(t, e) {
var n = new CustomEvent(t);
return n.originalEvent = e, n;
}
function n(t, n) {
var r = e("fail", n);
r.reason = t, o.dispatchEvent(r);
}
function r(t, n) {
var r = e("success", n);
r.result = t, o.dispatchEvent(r);
}
var o = new XMLHttpRequest(), i = t.method || "GET", a = t.body, s = t.url;
o.open(i, s, !t.sync), o.method = i;
var u = c();
u && !t.skipCsrf && o.setRequestHeader("X-XSRF-TOKEN", u), "[object Object]" == {}.toString.call(a) && (o.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
a = JSON.stringify(a)), t.noDocumentEvents || (o.addEventListener("loadstart", function(t) {
o.timeStart = Date.now();
var n = e("xhrstart", t);
document.dispatchEvent(n);
}), o.addEventListener("loadend", function(t) {
var n = e("xhrend", t);
document.dispatchEvent(n);
}), o.addEventListener("success", function(t) {
var n = e("xhrsuccess", t);
n.result = t.result, document.dispatchEvent(n);
}), o.addEventListener("fail", function(t) {
var n = e("xhrfail", t);
n.reason = t.reason, document.dispatchEvent(n);
})), t.raw || o.setRequestHeader("Accept", "application/json"), o.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var l = t.normalStatuses || [ 200 ];
return o.addEventListener("error", function(t) {
n("Ошибка связи с сервером.", t);
}), o.addEventListener("timeout", function(t) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), o.addEventListener("abort", function(t) {
n("Запрос был прерван.", t);
}), o.addEventListener("load", function(e) {
if (!o.status) return void n("Не получен ответ от сервера.", e);
if (l.indexOf(o.status) == -1) return void n("Ошибка на стороне сервера (код " + o.status + "), попытайтесь позднее.", e);
var c = o.responseText, i = o.getResponseHeader("Content-Type");
if (i.match(/^application\/json/) || t.json) try {
c = JSON.parse(c);
} catch (e) {
return void n("Некорректный формат ответа от сервера.", e);
}
r(c, e);
}), setTimeout(function() {
o.send(a);
}, 0), o;
}
var o = n(371), c = n(380);
document.addEventListener("xhrfail", function(t) {
new o.Error(t.reason);
}), t.exports = r;
},
380: function(t, e) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
381: function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function o(t) {
return (Array.isArray(t) ? t.map(o) : t && "object" === (void 0 === t ? "undefined" : a(t)) ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
function c(t) {
return s[t] || t;
}
function i(t) {
var e = (t + "").replace(u, c);
return e === "" + t ? t : e;
}
var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
};
e.merge = function l(t, e) {
if (1 === arguments.length) {
for (var n = t[0], o = 1; o < t.length; o++) n = l(n, t[o]);
return n;
}
var c = t.class, i = e.class;
(c || i) && (c = c || [], i = i || [], Array.isArray(c) || (c = [ c ]), Array.isArray(i) || (i = [ i ]), 
t.class = c.concat(i).filter(r));
for (var a in e) "class" != a && (t[a] = e[a]);
return t;
}, e.joinClasses = o, e.cls = function(t, n) {
for (var r = [], c = 0; c < t.length; c++) n && n[c] ? r.push(e.escape(o([ t[c] ]))) : r.push(o(t[c]));
var i = o(r);
return i.length ? ' class="' + i + '"' : "";
}, e.style = function(t) {
return t && "object" === (void 0 === t ? "undefined" : a(t)) ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, r, o) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (o ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (JSON.stringify(n).indexOf("&") !== -1, 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var r = [], c = Object.keys(t);
if (c.length) for (var i = 0; i < c.length; ++i) {
var a = c[i], s = t[a];
"class" == a ? (s = o(s)) && r.push(" " + a + '="' + s + '"') : r.push(e.attr(a, s, !1, n));
}
return r.join("");
};
var s = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, u = /[&<>"]/g;
e.escape = i, e.rethrow = function f(t, e, r, o) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || o)) throw t.message += " on line " + r, 
t;
try {
o = o || n(116).readFileSync(e, "utf8");
} catch (c) {
f(t, null, r);
}
var i = 3, a = o.split("\n"), s = Math.max(r - i, 0), u = Math.min(a.length, r + i), i = a.slice(s, u).map(function(t, e) {
var n = e + s + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + i + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
382: function(t, e, n) {
"use strict";
function r(t) {
t.bem = o, t.t = a, t.thumb = c, t.lang = i;
}
var o = n(383)(), c = n(384).thumb, i = n(385).lang, a = n(386);
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
},
383: function(t, e, n) {
"use strict";
var r = n(381);
t.exports = function(t) {
function e(t, e, n, o, c) {
var i = c || "div";
switch (i) {
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
t.push("<" + i + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(i) == -1 && t.push("</" + i + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, o, c) {
var i = this.block, a = this.attributes || {};
if (!a.class && o && !c) throw Error("Block without class: " + o);
if (a.class) {
var s = a.class;
s instanceof Array && (s = s.join(" ")), s = s.split(" ");
var u;
try {
u = s[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + s[0]);
}
c ? s[0] = r[r.length - 1] + t.element + s[0] : r[r.length] = u;
var f = (c ? r[r.length - 1] + t.element : "") + u;
s.indexOf(f) === -1 && (s[s.length] = f);
for (var h = 0; h < s.length; h++) {
var p = s[h];
p.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? s[h] = f + p : p.match(RegExp("^" + t.element)) && (r[r.length - 2] ? s[h] = r[r.length - 2] + p : s[h] = r[r.length - 1] + p), 
s[h].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (s[h] = t.prefix + s[h]);
}
a.class = s.sort().join(" ");
}
e(n, i, a, r, o), c || r.pop();
};
};
},
384: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var o = e <= 160 && n <= 160 ? "t" : e <= 320 && n <= 320 ? "m" : e <= 640 && n <= 640 ? "i" : e <= 1024 && n <= 1024 ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + o + t.slice(t.lastIndexOf("."));
};
},
385: function(t, e, n) {
"use strict";
t.exports = {
lang: "en"
};
},
386: function(t, e, n) {
"use strict";
function r() {
for (var t = [ i ], e = 0; e < arguments.length; e++) t.push(arguments[e]);
return c.t.apply(c, t);
}
var o = n(387), c = new o("en"), i = n(385).lang, a = {};
r.i18n = c, r.requirePhrase = function(t, e) {
a[t] && a[t].indexOf(e) != -1 || (a[t] || (a[t] = []), a[t].push(e), c.addPhrase(i, t, e));
}, t.exports = r;
},
387: function(t, e, n) {
"use strict";
t.exports = n(388);
},
388: function(t, e, n) {
"use strict";
function r(t) {
return Object.prototype.toString.call(t);
}
function o(t) {
return "[object String]" === r(t);
}
function c(t) {
return !isNaN(t) && isFinite(t);
}
function i(t) {
return t === !0 || t === !1;
}
function a(t) {
return "[object Function]" === r(t);
}
function s(t) {
return "[object Object]" === r(t);
}
function u(t, e, n) {
if (null !== t) if (k && t.forEach === k) t.forEach(e, n); else if (t.length === +t.length) for (var r = 0, o = t.length; r < o; r += 1) e.call(n, t[r], r, t); else for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && e.call(n, t[c], c, t);
}
function l(t) {
var e = 1, n = arguments, r = n.length, o = (t + "").replace(_, function(t) {
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
return o;
}
function f(t) {
var e = {};
return u(t || {}, function(t, n) {
return t && "object" === (void 0 === t ? "undefined" : y(t)) ? void u(f(t), function(t, r) {
e[n + "." + r] = t;
}) : void (e[n] = t);
}), e;
}
function h(t, e) {
return t + w + e;
}
function p(t, e, n) {
var r = h(e, n), o = t._storage;
if (o.hasOwnProperty(r)) return r;
if (e === t._defaultLocale) return null;
var c = t._fallbacks_cache;
if (c.hasOwnProperty(r)) return c[r];
for (var i, a = t._fallbacks[e] || [ t._defaultLocale ], s = 0, u = a.length; s < u; s++) if (i = h(a[s], n), 
o.hasOwnProperty(i)) return c[r] = i, c[r];
return c[r] = null, null;
}
function m(t, e, n) {
var r = g.indexOf(t, e);
return r === -1 ? l('[pluralizer for "%s" locale not found]', t) : void 0 === n[r] ? l('[plural form %d ("%s") not found in translation]', r, g.forms(t)[r]) : n[r];
}
function d(t) {
return this instanceof d ? (this._defaultLocale = t ? t + "" : x, this._fallbacks = {}, 
this._fallbacks_cache = {}, this._storage = {}, void (this._plurals_cache = {})) : new d(t);
}
function v(t, e, n) {
var r, o, c, i, a, s;
return C.test(e) ? (r = b.parse(e), 1 === r.length && "literal" === r[0].type ? r[0].text : (t._plurals_cache[n] || (t._plurals_cache[n] = new d(n)), 
s = t._plurals_cache[n], o = [], o.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
o.push("params = flatten(params);"), u(r, function(t) {
if ("literal" === t.type) return void o.push(l("str += %j;", t.text));
if ("variable" === t.type) return c = t.anchor, void o.push(l('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', c, c, c));
if ("plural" !== t.type) throw Error("Unknown node type");
c = t.anchor, i = {}, u(t.strict, function(e, r) {
var o = b.parse(e);
return 1 === o.length && "literal" === o[0].type ? (i[r] = !1, void (t.strict[r] = o[0].text)) : (i[r] = !0, 
void (s.hasPhrase(n, e, !0) || s.addPhrase(n, e, e)));
}), a = {}, u(t.forms, function(e, r) {
var o, c = b.parse(e);
return 1 === c.length && "literal" === c[0].type ? (o = c[0].text, t.forms[r] = o, 
void (a[o] = !1)) : (a[e] = !0, void (s.hasPhrase(n, e, !0) || s.addPhrase(n, e, e)));
}), o.push(l("loc = %j;", n)), o.push(l("loc_plzr = %j;", n.split(/[-_]/)[0])), 
o.push(l("anchor = params[%j];", c)), o.push(l("cache = this._plurals_cache[loc];")), 
o.push(l("strict = %j;", t.strict)), o.push(l("strict_exec = %j;", i)), o.push(l("forms = %j;", t.forms)), 
o.push(l("forms_exec = %j;", a)), o.push("if (+(anchor) != anchor) {"), o.push(l('  str += "[invalid plurals amount: %s(" + anchor + ")]";', c)), 
o.push("} else {"), o.push("  if (strict[anchor] !== undefined) {"), o.push("    plrl = strict[anchor];"), 
o.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), o.push("  } else {"), 
o.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), o.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
o.push("  }"), o.push("}");
}), o.push("return str;"), Function("params", "flatten", "pluralizer", o.join("\n")))) : e;
}
var y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
}, b = n(389), g = n(390), F = Array.isArray || function(t) {
return "[object Array]" === r(t);
}, k = Array.prototype.forEach, _ = /%[sdj%]/g, x = "en", w = "#@$";
d.prototype.addPhrase = function(t, e, n, r) {
var a, l = this;
if (i(r)) a = r ? 1 / 0 : 0; else if (c(r)) {
if (a = Math.floor(r), a < 0) throw new TypeError("Invalid flatten level (should be >= 0).");
} else a = 1 / 0;
if (s(n) && a > 0) return u(n, function(n, r) {
l.addPhrase(t, (e ? e + "." : "") + r, n, a - 1);
}), this;
if (o(n)) this._storage[h(t, e)] = {
translation: n,
locale: t,
raw: !1
}; else {
if (!(F(n) || c(n) || i(n) || 0 === a && s(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[h(t, e)] = {
translation: n,
locale: t,
raw: !0
};
}
return l._fallbacks_cache = {}, this;
}, d.prototype.setFallback = function(t, e) {
var n = this._defaultLocale;
if (n === t) throw Error("Default locale can't have fallbacks");
var r = F(e) ? e.slice() : [ e ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[t] = r, this._fallbacks_cache = {}, 
this;
};
var C = /#\{|\(\(|\\\\/;
d.prototype.translate = function(t, e, n) {
var r, i = p(this, t, e);
return i ? (r = this._storage[i], r.raw ? r.translation : (r.hasOwnProperty("compiled") || (r.compiled = v(this, r.translation, r.locale)), 
a(r.compiled) ? ((c(n) || o(n)) && (n = {
count: n,
value: n
}), r.compiled.call(this, n, f, m)) : r.compiled)) : t + ": No translation for [" + e + "]";
}, d.prototype.hasPhrase = function(t, e, n) {
return n ? this._storage.hasOwnProperty(h(t, e)) : !!p(this, t, e);
}, d.prototype.getLocale = function(t, e, n) {
if (n) return this._storage.hasOwnProperty(h(t, e)) ? t : null;
var r = p(this, t, e);
return r ? r.split(w, 2)[0] : null;
}, d.prototype.t = d.prototype.translate, d.prototype.stringify = function(t) {
var e = this, n = {};
u(this._storage, function(t, e) {
n[e.split(w)[1]] = !0;
});
var r = {};
u(n, function(n, o) {
var c = p(e, t, o);
if (c) {
var i = e._storage[c].locale;
r[i] || (r[i] = {}), r[i][o] = e._storage[c].translation;
}
});
var o = {
fallback: {},
locales: r
}, c = (e._fallbacks[t] || []).slice(0, -1);
return c.length && (o.fallback[t] = c), JSON.stringify(o);
}, d.prototype.load = function(t) {
var e = this;
return o(t) && (t = JSON.parse(t)), u(t.locales, function(t, n) {
u(t, function(t, r) {
e.addPhrase(n, r, t, 0);
});
}), u(t.fallback, function(t, n) {
e.setFallback(n, t);
}), this;
}, t.exports = d;
},
389: function(t, e) {
"use strict";
t.exports = function() {
function t(t, e) {
function n() {
this.constructor = t;
}
n.prototype = e.prototype, t.prototype = new n();
}
function e(t, e, n, r, o, c) {
this.message = t, this.expected = e, this.found = n, this.offset = r, this.line = o, 
this.column = c, this.name = "SyntaxError";
}
function n(t) {
function n() {
return t.substring(yt, vt);
}
function r(e) {
function n(e, n, r) {
var o, c;
for (o = n; o < r; o++) c = t.charAt(o), "\n" === c ? (e.seenCR || e.line++, e.column = 1, 
e.seenCR = !1) : "\r" === c || "\u2028" === c || "\u2029" === c ? (e.line++, e.column = 1, 
e.seenCR = !0) : (e.column++, e.seenCR = !1);
}
return bt !== e && (bt > e && (bt = 0, gt = {
line: 1,
column: 1,
seenCR: !1
}), n(gt, bt, e), bt = e), gt;
}
function o(t) {
vt < Ft || (vt > Ft && (Ft = vt, kt = []), kt.push(t));
}
function c(n, o, c) {
function i(t) {
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
var r, o, c, i = Array(t.length);
for (c = 0; c < t.length; c++) i[c] = t[c].description;
return r = t.length > 1 ? i.slice(0, -1).join(", ") + " or " + i[t.length - 1] : i[0], 
o = e ? '"' + n(e) + '"' : "end of input", "Expected " + r + " but " + o + " found.";
}
var s = r(c), u = c < t.length ? t.charAt(c) : null;
return null !== o && i(o), new e(null !== n ? n : a(o, u), o, u, c, s.line, s.column);
}
function i() {
var t, e;
for (t = [], e = d(), e === k && (e = a(), e === k && (e = h())); e !== k; ) t.push(e), 
e = d(), e === k && (e = a(), e === k && (e = h()));
return t;
}
function a() {
var e, n, r, c, i;
return e = vt, t.substr(vt, 2) === C ? (n = C, vt += 2) : (n = k, 0 === _t && o(j)), 
n !== k ? (r = s(), r !== k ? (t.substr(vt, 2) === A ? (c = A, vt += 2) : (c = k, 
0 === _t && o(E)), c !== k ? (i = f(), i === k && (i = S), i !== k ? (yt = e, n = O(r, i), 
e = n) : (vt = e, e = w)) : (vt = e, e = w)) : (vt = e, e = w)) : (vt = e, e = w), 
e;
}
function s() {
var e, n, r, c;
return e = vt, n = u(), n !== k ? (124 === t.charCodeAt(vt) ? (r = R, vt++) : (r = k, 
0 === _t && o(z)), r !== k ? (c = s(), c !== k ? (yt = e, n = L(n, c), e = n) : (vt = e, 
e = w)) : (vt = e, e = w)) : (vt = e, e = w), e === k && (e = vt, n = u(), n !== k && (yt = e, 
n = q(n)), e = n), e;
}
function u() {
var e, n, r, c, i, a;
if (e = vt, 61 === t.charCodeAt(vt) ? (n = P, vt++) : (n = k, 0 === _t && o(T)), 
n !== k) {
if (r = [], H.test(t.charAt(vt)) ? (c = t.charAt(vt), vt++) : (c = k, 0 === _t && o(I)), 
c !== k) for (;c !== k; ) r.push(c), H.test(t.charAt(vt)) ? (c = t.charAt(vt), vt++) : (c = k, 
0 === _t && o(I)); else r = w;
if (r !== k) if (32 === t.charCodeAt(vt) ? (c = M, vt++) : (c = k, 0 === _t && o(N)), 
c === k && (c = S), c !== k) {
if (i = [], a = l(), a !== k) for (;a !== k; ) i.push(a), a = l(); else i = w;
i !== k ? (yt = e, n = $(r, i), e = n) : (vt = e, e = w);
} else vt = e, e = w; else vt = e, e = w;
} else vt = e, e = w;
if (e === k) {
if (e = vt, n = [], r = l(), r !== k) for (;r !== k; ) n.push(r), r = l(); else n = w;
n !== k && (yt = e, n = D()), e = n;
}
return e;
}
function l() {
var e, n, r;
return e = vt, 92 === t.charCodeAt(vt) ? (n = J, vt++) : (n = k, 0 === _t && o(X)), 
n !== k ? (Z.test(t.charAt(vt)) ? (r = t.charAt(vt), vt++) : (r = k, 0 === _t && o(U)), 
r !== k ? (yt = e, n = B(r), e = n) : (vt = e, e = w)) : (vt = e, e = w), e === k && (e = vt, 
n = vt, _t++, 124 === t.charCodeAt(vt) ? (r = R, vt++) : (r = k, 0 === _t && o(z)), 
r === k && (t.substr(vt, 2) === A ? (r = A, vt += 2) : (r = k, 0 === _t && o(E))), 
_t--, r === k ? n = K : (vt = n, n = w), n !== k ? (t.length > vt ? (r = t.charAt(vt), 
vt++) : (r = k, 0 === _t && o(G)), r !== k ? (yt = e, n = W(), e = n) : (vt = e, 
e = w)) : (vt = e, e = w)), e;
}
function f() {
var e, n, r;
return e = vt, 58 === t.charCodeAt(vt) ? (n = Y, vt++) : (n = k, 0 === _t && o(Q)), 
n !== k ? (r = p(), r !== k ? (yt = e, n = V(r), e = n) : (vt = e, e = w)) : (vt = e, 
e = w), e;
}
function h() {
var e, n, r, c;
return e = vt, t.substr(vt, 2) === tt ? (n = tt, vt += 2) : (n = k, 0 === _t && o(et)), 
n !== k ? (r = p(), r !== k ? (125 === t.charCodeAt(vt) ? (c = nt, vt++) : (c = k, 
0 === _t && o(rt)), c !== k ? (yt = e, n = ot(r), e = n) : (vt = e, e = w)) : (vt = e, 
e = w)) : (vt = e, e = w), e;
}
function p() {
var e, n, r, c, i;
if (e = vt, n = m(), n !== k) if (46 === t.charCodeAt(vt) ? (r = ct, vt++) : (r = k, 
0 === _t && o(it)), r !== k) {
if (c = [], i = p(), i !== k) for (;i !== k; ) c.push(i), i = p(); else c = w;
c !== k ? (yt = e, n = at(), e = n) : (vt = e, e = w);
} else vt = e, e = w; else vt = e, e = w;
return e === k && (e = m()), e;
}
function m() {
var e, n, r, c;
if (e = vt, st.test(t.charAt(vt)) ? (n = t.charAt(vt), vt++) : (n = k, 0 === _t && o(ut)), 
n !== k) {
for (r = [], lt.test(t.charAt(vt)) ? (c = t.charAt(vt), vt++) : (c = k, 0 === _t && o(ft)); c !== k; ) r.push(c), 
lt.test(t.charAt(vt)) ? (c = t.charAt(vt), vt++) : (c = k, 0 === _t && o(ft));
r !== k ? (yt = e, n = W(), e = n) : (vt = e, e = w);
} else vt = e, e = w;
return e;
}
function d() {
var t, e, n, r, o;
if (t = vt, e = [], n = vt, r = vt, _t++, o = a(), o === k && (o = h()), _t--, o === k ? r = K : (vt = r, 
r = w), r !== k ? (o = v(), o !== k ? (yt = n, r = ht(o), n = r) : (vt = n, n = w)) : (vt = n, 
n = w), n !== k) for (;n !== k; ) e.push(n), n = vt, r = vt, _t++, o = a(), o === k && (o = h()), 
_t--, o === k ? r = K : (vt = r, r = w), r !== k ? (o = v(), o !== k ? (yt = n, 
r = ht(o), n = r) : (vt = n, n = w)) : (vt = n, n = w); else e = w;
return e !== k && (yt = t, e = pt(e)), t = e;
}
function v() {
var e, n, r;
return e = vt, 92 === t.charCodeAt(vt) ? (n = J, vt++) : (n = k, 0 === _t && o(X)), 
n !== k ? (mt.test(t.charAt(vt)) ? (r = t.charAt(vt), vt++) : (r = k, 0 === _t && o(dt)), 
r !== k ? (yt = e, n = B(r), e = n) : (vt = e, e = w)) : (vt = e, e = w), e === k && (t.length > vt ? (e = t.charAt(vt), 
vt++) : (e = k, 0 === _t && o(G))), e;
}
function y(t) {
for (var e = [], n = 0; n < t.length; n++) void 0 === t[n].strict && e.push(t[n].text);
return e;
}
function b(t) {
for (var e = {}, n = 0; n < t.length; n++) void 0 !== t[n].strict && (e[t[n].strict] = t[n].text);
return e;
}
var g, F = arguments.length > 1 ? arguments[1] : {}, k = {}, _ = {
start: i
}, x = i, w = k, C = "((", j = {
type: "literal",
value: "((",
description: '"(("'
}, A = "))", E = {
type: "literal",
value: "))",
description: '"))"'
}, S = null, O = function(t, e) {
return {
type: "plural",
forms: y(t),
strict: b(t),
anchor: e || "count"
};
}, R = "|", z = {
type: "literal",
value: "|",
description: '"|"'
}, L = function(t, e) {
return [ t ].concat(e);
}, q = function(t) {
return [ t ];
}, P = "=", T = {
type: "literal",
value: "=",
description: '"="'
}, H = /^[0-9]/, I = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, M = " ", N = {
type: "literal",
value: " ",
description: '" "'
}, $ = function(t, e) {
return {
strict: t.join(""),
text: e.join("")
};
}, D = function() {
return {
text: n()
};
}, J = "\\", X = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, Z = /^[\\|)(]/, U = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, B = function(t) {
return t;
}, K = void 0, G = {
type: "any",
description: "any character"
}, W = function() {
return n();
}, Y = ":", Q = {
type: "literal",
value: ":",
description: '":"'
}, V = function(t) {
return t;
}, tt = "#{", et = {
type: "literal",
value: "#{",
description: '"#{"'
}, nt = "}", rt = {
type: "literal",
value: "}",
description: '"}"'
}, ot = function(t) {
return {
type: "variable",
anchor: t
};
}, ct = ".", it = {
type: "literal",
value: ".",
description: '"."'
}, at = function() {
return n();
}, st = /^[a-zA-Z_$]/, ut = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, lt = /^[a-zA-Z0-9_$]/, ft = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, ht = function(t) {
return t;
}, pt = function(t) {
return {
type: "literal",
text: t.join("")
};
}, mt = /^[\\#()|]/, dt = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, vt = 0, yt = 0, bt = 0, gt = {
line: 1,
column: 1,
seenCR: !1
}, Ft = 0, kt = [], _t = 0;
if ("startRule" in F) {
if (!(F.startRule in _)) throw Error("Can't start parsing from rule \"" + F.startRule + '".');
x = _[F.startRule];
}
if (g = x(), g !== k && vt === t.length) return g;
throw g !== k && vt < t.length && o({
type: "end",
description: "end of input"
}), c(null, kt, Ft);
}
return t(e, Error), {
SyntaxError: e,
parse: n
};
}();
},
390: function(t, e) {
"use strict";
function n(t) {
var e;
return p[t] ? t : (e = t.toLowerCase().replace("_", "-"), p[e] ? e : (e = e.split("-")[0], 
p[e] ? e : null));
}
function r(t) {
var e = n(t);
return p[e] ? p[e].c : null;
}
function o(t, e) {
var r = n(t);
if (!r) return -1;
if (!p[r].cFn) return 0;
var o = e + "", c = o.indexOf(".") < 0 ? "" : o.split(".")[1], i = c.length, a = +e, s = +o.split(".")[0], u = 0 === c.length ? 0 : +c.replace(/0+$/, "");
return p[r].cFn(a, s, i, +c, u);
}
function c(t, e) {
var r = n(t);
return r ? p[r].c[o(r, e)] : null;
}
function i(t) {
var e = n(t);
return p[e] ? p[e].o : null;
}
function a(t, e) {
var r = n(t);
if (!r) return -1;
if (!p[r].oFn) return 0;
var o = e + "", c = o.indexOf(".") < 0 ? "" : o.split(".")[1], i = c.length, a = +e, s = +o.split(".")[0], u = 0 === c.length ? 0 : +c.replace(/0+$/, "");
return p[r].oFn(a, s, i, +c, u);
}
function s(t, e) {
var r = n(t);
return p[r] ? p[r].o[a(r, e)] : null;
}
function u(t) {
return m[t];
}
function l(t, e) {
var n;
for (e.c = e.c ? e.c.map(u) : [ "other" ], e.o = e.o ? e.o.map(u) : [ "other" ], 
n = 0; n < t.length; n++) p[t[n]] = e;
}
function f(t, e, n) {
return t <= n && n <= e && n % 1 === 0;
}
function h(t, e) {
return t.indexOf(e) >= 0;
}
var p = {};
t.exports = c, t.exports.indexOf = o, t.exports.forms = r, t.exports.ordinal = s, 
t.exports.ordinal.indexOf = a, t.exports.ordinal.forms = i;
var m = [ "zero", "one", "two", "few", "many", "other" ];
l([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(t) {
return f(0, 1, t) ? 0 : 1;
}
}), l([ "am", "fa", "kn", "zu" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
}
}), l([ "ar" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
var e = t % 100;
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : f(3, 10, e) ? 3 : f(11, 99, e) ? 4 : 5;
}
}), l([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return h([ 1, 5, 7, 8, 9, 10 ], t) ? 0 : h([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), l([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
}
}), l([ "az" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(t, e) {
var n = e % 10, r = e % 100, o = e % 1e3;
return h([ 1, 2, 5, 7, 8 ], n) || h([ 20, 50, 70, 80 ], r) ? 0 : h([ 3, 4 ], n) || h([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], o) ? 1 : 0 === e || 6 === n || h([ 40, 60, 90 ], r) ? 2 : 3;
}
}), l([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === e && 11 !== n ? 0 : f(2, 4, e) && !f(12, 14, n) ? 1 : 0 === e || f(5, 9, e) || f(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return h([ 2, 3 ], e) && !h([ 12, 13 ], n) ? 0 : 1;
}
}), l([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "zh" ], {}), 
l([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
var e = t % 10, n = t % 100, r = t % 1e6;
return 1 !== e || h([ 11, 71, 91 ], n) ? 2 !== e || h([ 12, 72, 92 ], n) ? !f(3, 4, e) && 9 !== e || f(10, 19, n) || f(70, 79, n) || f(90, 99, n) ? 0 !== t && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), l([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e, n, r) {
var o = e % 10, c = e % 100, i = r % 10, a = r % 100;
return 0 === n && 1 === o && 11 !== c || 1 === i && 11 !== a ? 0 : 0 === n && f(2, 4, o) && !f(12, 14, c) || f(2, 4, i) && !f(12, 14, a) ? 1 : 2;
}
}), l([ "ca" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return h([ 1, 3 ], t) ? 0 : 2 === t ? 1 : 4 === t ? 2 : 3;
}
}), l([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : f(2, 4, e) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), l([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : 3 === t ? 3 : 6 === t ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(t) {
return h([ 0, 7, 8, 9 ], t) ? 0 : 1 === t ? 1 : 2 === t ? 2 : h([ 3, 4 ], t) ? 3 : h([ 5, 6 ], t) ? 4 : 5;
}
}), l([ "da" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r, o) {
return 1 === t || 0 !== o && h([ 0, 1 ], e) ? 0 : 1;
}
}), l([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, e, n, r) {
var o = e % 100, c = r % 100;
return 0 === n && 1 === o || 1 === c ? 0 : 0 === n && 2 === o || 2 === c ? 1 : 0 === n && f(3, 4, o) || f(3, 4, c) ? 2 : 3;
}
}), l([ "en" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === e && 11 !== n ? 0 : 2 === e && 12 !== n ? 1 : 3 === e && 13 !== n ? 2 : 3;
}
}), l([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return h([ 0, 1 ], e) ? 0 : 1;
}
}), l([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
var o = e % 10, c = r % 10;
return 0 === n && h([ 1, 2, 3 ], e) || 0 === n && !h([ 4, 6, 9 ], o) || 0 !== n && !h([ 4, 6, 9 ], c) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return h([ 0, 1 ], e) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 2 === t ? 1 : f(3, 6, t) ? 2 : f(7, 10, t) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t) {
return h([ 1, 11 ], t) ? 0 : h([ 2, 12 ], t) ? 1 : f(3, 10, t) || f(13, 19, t) ? 2 : 3;
}
}), l([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return 1 === t ? 0 : h([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), l([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, o = e % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && h([ 0, 20, 40, 60, 80 ], o) ? 2 : 0 !== n ? 3 : 4;
}
}), l([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(t, e, n) {
var r = t % 10;
return 1 === e && 0 === n ? 0 : 2 === e && 0 === n ? 1 : 0 !== n || f(0, 10, t) || 0 !== r ? 3 : 2;
}
}), l([ "hu" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return h([ 1, 5 ], t) ? 0 : 1;
}
}), l([ "is" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r, o) {
var c = e % 10, i = e % 100;
return 0 === o && 1 === c && 11 !== i || 0 !== o ? 0 : 1;
}
}), l([ "it" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
return h([ 11, 8, 80, 800 ], t) ? 0 : 1;
}
}), l([ "iu", "kw", "naq", "se", "sma", "smi", "smj", "smn", "sms" ], {
c: [ 1, 2, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 2 === t ? 1 : 2;
}
}), l([ "ka" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(t, e) {
var n = e % 100;
return 1 === e ? 0 : 0 === e || f(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
}
}), l([ "kk" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
var e = t % 10;
return 6 === e || 9 === e || 0 === e && 0 !== t ? 0 : 1;
}
}), l([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2;
}
}), l([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(t, e) {
return 0 === t ? 0 : h([ 0, 1 ], e) && 0 !== t ? 1 : 2;
}
}), l([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n, r) {
var o = t % 10, c = t % 100;
return 1 !== o || f(11, 19, c) ? f(2, 9, o) && !f(11, 19, c) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), l([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(t, e, n, r) {
var o = t % 10, c = t % 100, i = r % 100, a = r % 10;
return 0 === o || f(11, 19, c) || 2 === n && f(11, 19, i) ? 0 : 1 === o && 11 !== c || 2 === n && 1 === a && 11 !== i || 2 !== n && 1 === a ? 1 : 2;
}
}), l([ "mk" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
var o = e % 10, c = r % 10;
return 0 === n && 1 === o || 1 === c ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(t, e) {
var n = e % 10, r = e % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : h([ 7, 8 ], n) && !h([ 17, 18 ], r) ? 2 : 3;
}
}), l([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e, n) {
var r = t % 100;
return 1 === e && 0 === n ? 0 : 0 !== n || 0 === t || 1 !== t && f(1, 19, r) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "mr" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return 1 === t ? 0 : h([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 3;
}
}), l([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var e = t % 100;
return 1 === t ? 0 : 0 === t || f(2, 10, e) ? 1 : f(11, 19, e) ? 2 : 3;
}
}), l([ "ne" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return f(1, 4, t) ? 0 : 1;
}
}), l([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, o = e % 100;
return 1 === e && 0 === n ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, o) ? 1 : 0 === n && 1 !== e && f(0, 1, r) || 0 === n && f(5, 9, r) || 0 === n && f(12, 14, o) ? 2 : 3;
}
}), l([ "pt" ], {
c: [ 1, 5 ],
cFn: function(t) {
return f(0, 2, t) && 2 !== t ? 0 : 1;
}
}), l([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), l([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, o = e % 100;
return 0 === n && 1 === r && 11 !== o ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, o) ? 1 : 0 === n && 0 === r || 0 === n && f(5, 9, r) || 0 === n && f(11, 14, o) ? 2 : 3;
}
}), l([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : f(2, 10, t) ? 1 : 2;
}
}), l([ "si" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
return h([ 0, 1 ], t) || 0 === e && 1 === r ? 0 : 1;
}
}), l([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, e, n) {
var r = e % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && f(3, 4, r) || 0 !== n ? 2 : 3;
}
}), l([ "sq" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === t ? 0 : 4 === e && 14 !== n ? 1 : 2;
}
}), l([ "sv" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return h([ 1, 2 ], e) && !h([ 11, 12 ], n) ? 0 : 1;
}
}), l([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(t) {
return f(0, 1, t) || f(11, 99, t) ? 0 : 1;
}
}), l([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, o = e % 100;
return 0 === n && 1 === r && 11 !== o ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, o) ? 1 : 0 === n && 0 === r || 0 === n && f(5, 9, r) || 0 === n && f(11, 14, o) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return 3 === e && 13 !== n ? 0 : 1;
}
});
}
});
//# sourceMappingURL=coursesFeedbackShow.f199b1bfe739fffa5b63.js.map
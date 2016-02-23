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
}(), a = n(155), i = n(150), u = n(148), s = n(147), l = n(161), f = n(174), h = function() {
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
u.delegateMixin(h.prototype);
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
var t = this, e = this.elem.querySelector("form"), n = e.elements.teacherComment.value.trim(), r = a({
method: "PATCH",
url: "/courses/feedback/comment",
body: {
number: this.number,
teacherComment: n
}
}), o = e.querySelector('[type="submit"]'), c = new i({
elem: o,
size: "small",
elemClass: "button_loading"
});
c.start(), o.disabled = !0, r.addEventListener("loadend", function(t) {
c.stop(), o.disabled = !1;
}), r.addEventListener("success", function(e) {
200 == r.status ? (new s.Success("Комментарий сохранён"), t.teacherCommentRaw = n, 
t.teacherComment = e.result.teacherComment, t.renderComment()) : new s.Error("Не получилось сохранить комментарий");
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
u.delegateMixin(p.prototype), o();
},
116: function(t, e) {},
155: function(t, e, n) {
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
var o = new XMLHttpRequest(), a = t.method || "GET", i = t.body, u = t.url;
o.open(a, u, t.sync ? !1 : !0), o.method = a;
var s = c();
s && !t.skipCsrf && o.setRequestHeader("X-XSRF-TOKEN", s), "[object Object]" == {}.toString.call(i) && (o.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
i = JSON.stringify(i)), t.noDocumentEvents || (o.addEventListener("loadstart", function(t) {
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
if (-1 == l.indexOf(o.status)) return void n("Ошибка на стороне сервера (код " + o.status + "), попытайтесь позднее.", e);
var c = o.responseText, a = o.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || t.json) try {
c = JSON.parse(c);
} catch (e) {
return void n("Некорректный формат ответа от сервера.", e);
}
r(c, e);
}), setTimeout(function() {
o.send(i);
}, 0), o;
}
var o = n(147), c = n(156);
document.addEventListener("xhrfail", function(t) {
new o.Error(t.reason);
}), t.exports = r;
},
156: function(t, e) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
158: function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function o(t) {
return (Array.isArray(t) ? t.map(o) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
function c(t) {
return i[t] || t;
}
function a(t) {
var e = (t + "").replace(u, c);
return e === "" + t ? t : e;
}
e.merge = function s(t, e) {
if (1 === arguments.length) {
for (var n = t[0], o = 1; o < t.length; o++) n = s(n, t[o]);
return n;
}
var c = t.class, a = e.class;
(c || a) && (c = c || [], a = a || [], Array.isArray(c) || (c = [ c ]), Array.isArray(a) || (a = [ a ]), 
t.class = c.concat(a).filter(r));
for (var i in e) "class" != i && (t[i] = e[i]);
return t;
}, e.joinClasses = o, e.cls = function(t, n) {
for (var r = [], c = 0; c < t.length; c++) n && n[c] ? r.push(e.escape(o([ t[c] ]))) : r.push(o(t[c]));
var a = o(r);
return a.length ? ' class="' + a + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, r, o) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (o ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var r = [], c = Object.keys(t);
if (c.length) for (var a = 0; a < c.length; ++a) {
var i = c[a], u = t[i];
"class" == i ? (u = o(u)) && r.push(" " + i + '="' + u + '"') : r.push(e.attr(i, u, !1, n));
}
return r.join("");
};
var i = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, u = /[&<>"]/g;
e.escape = a, e.rethrow = function l(t, e, r, o) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || o)) throw t.message += " on line " + r, 
t;
try {
o = o || n(116).readFileSync(e, "utf8");
} catch (c) {
l(t, null, r);
}
var a = 3, i = o.split("\n"), u = Math.max(r - a, 0), s = Math.min(i.length, r + a), a = i.slice(u, s).map(function(t, e) {
var n = e + u + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + a + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
161: function(t, e, n) {
"use strict";
function r(t) {
t.bem = o, t.t = i, t.thumb = c, t.lang = a;
}
var o = n(162)(), c = n(163).thumb, a = n(252).lang, i = n(326);
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
},
162: function(t, e, n) {
"use strict";
var r = n(158);
t.exports = function(t) {
function e(t, e, n, o, c) {
var a = c || "div";
switch (a) {
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
t.push("<" + a + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(a) && t.push("</" + a + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, o, c) {
var a = this.block, i = this.attributes || {};
if (!i.class && o && !c) throw Error("Block without class: " + o);
if (i.class) {
var u = i.class;
u instanceof Array && (u = u.join(" ")), u = u.split(" ");
var s;
try {
s = u[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + u[0]);
}
c ? u[0] = r[r.length - 1] + t.element + u[0] : r[r.length] = s;
var f = (c ? r[r.length - 1] + t.element : "") + s;
-1 === u.indexOf(f) && (u[u.length] = f);
for (var h = 0; h < u.length; h++) {
var p = u[h];
p.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? u[h] = f + p : p.match(RegExp("^" + t.element)) && (r[r.length - 2] ? u[h] = r[r.length - 2] + p : u[h] = r[r.length - 1] + p), 
u[h].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (u[h] = t.prefix + u[h]);
}
i.class = u.sort().join(" ");
}
e(n, a, i, r, o), c || r.pop();
};
};
},
163: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var o = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + o + t.slice(t.lastIndexOf("."));
};
},
174: function(t, e, n) {
var r = n(158);
t.exports = function(t) {
var e, n = [], o = {}, c = t || {};
return function(t, c, a) {
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
n.push(r.escape(null == (e = a) ? "" : e));
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
252: function(t, e, n) {
"use strict";
t.exports = {
lang: "ru"
};
},
326: function(t, e, n) {
"use strict";
function r() {
for (var t = [ a ], e = 0; e < arguments.length; e++) t.push(arguments[e]);
return c.t.apply(c, t);
}
var o = n(327), c = new o("en"), a = n(252).lang, i = {};
r.i18n = c, r.requirePhrase = function(t, e) {
i[t] && -1 != i[t].indexOf(e) || (i[t] || (i[t] = []), i[t].push(e), c.addPhrase(a, t, e));
}, t.exports = r;
},
327: function(t, e, n) {
"use strict";
t.exports = n(328);
},
328: function(t, e, n) {
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
function a(t) {
return t === !0 || t === !1;
}
function i(t) {
return "[object Function]" === r(t);
}
function u(t) {
return "[object Object]" === r(t);
}
function s(t, e, n) {
if (null !== t) if (F && t.forEach === F) t.forEach(e, n); else if (t.length === +t.length) for (var r = 0, o = t.length; o > r; r += 1) e.call(n, t[r], r, t); else for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && e.call(n, t[c], c, t);
}
function l(t) {
var e = 1, n = arguments, r = n.length, o = (t + "").replace(k, function(t) {
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
return s(t || {}, function(t, n) {
return t && "object" == typeof t ? void s(f(t), function(t, r) {
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
for (var a, i = t._fallbacks[e] || [ t._defaultLocale ], u = 0, s = i.length; s > u; u++) if (a = h(i[u], n), 
o.hasOwnProperty(a)) return c[r] = a, c[r];
return c[r] = null, null;
}
function m(t, e, n) {
var r = g.indexOf(t, e);
return -1 === r ? l('[pluralizer for "%s" locale not found]', t) : void 0 === n[r] ? l('[plural form %d ("%s") not found in translation]', r, g.forms(t)[r]) : n[r];
}
function d(t) {
return this instanceof d ? (this._defaultLocale = t ? t + "" : x, this._fallbacks = {}, 
this._fallbacks_cache = {}, this._storage = {}, void (this._plurals_cache = {})) : new d(t);
}
function v(t, e, n) {
var r, o, c, a, i, u;
return _.test(e) ? (r = b.parse(e), 1 === r.length && "literal" === r[0].type ? r[0].text : (t._plurals_cache[n] || (t._plurals_cache[n] = new d(n)), 
u = t._plurals_cache[n], o = [], o.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
o.push("params = flatten(params);"), s(r, function(t) {
if ("literal" === t.type) return void o.push(l("str += %j;", t.text));
if ("variable" === t.type) return c = t.anchor, void o.push(l('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', c, c, c));
if ("plural" !== t.type) throw Error("Unknown node type");
c = t.anchor, a = {}, s(t.strict, function(e, r) {
var o = b.parse(e);
return 1 === o.length && "literal" === o[0].type ? (a[r] = !1, void (t.strict[r] = o[0].text)) : (a[r] = !0, 
void (u.hasPhrase(n, e, !0) || u.addPhrase(n, e, e)));
}), i = {}, s(t.forms, function(e, r) {
var o, c = b.parse(e);
return 1 === c.length && "literal" === c[0].type ? (o = c[0].text, t.forms[r] = o, 
void (i[o] = !1)) : (i[e] = !0, void (u.hasPhrase(n, e, !0) || u.addPhrase(n, e, e)));
}), o.push(l("loc = %j;", n)), o.push(l("loc_plzr = %j;", n.split(/[-_]/)[0])), 
o.push(l("anchor = params[%j];", c)), o.push(l("cache = this._plurals_cache[loc];")), 
o.push(l("strict = %j;", t.strict)), o.push(l("strict_exec = %j;", a)), o.push(l("forms = %j;", t.forms)), 
o.push(l("forms_exec = %j;", i)), o.push("if (+(anchor) != anchor) {"), o.push(l('  str += "[invalid plurals amount: %s(" + anchor + ")]";', c)), 
o.push("} else {"), o.push("  if (strict[anchor] !== undefined) {"), o.push("    plrl = strict[anchor];"), 
o.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), o.push("  } else {"), 
o.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), o.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
o.push("  }"), o.push("}");
}), o.push("return str;"), Function("params", "flatten", "pluralizer", o.join("\n")))) : e;
}
var b = n(329), g = n(330), y = Array.isArray || function(t) {
return "[object Array]" === r(t);
}, F = Array.prototype.forEach, k = /%[sdj%]/g, x = "en", w = "#@$";
d.prototype.addPhrase = function(t, e, n, r) {
var i, l = this;
if (a(r)) i = r ? 1 / 0 : 0; else if (c(r)) {
if (i = Math.floor(r), 0 > i) throw new TypeError("Invalid flatten level (should be >= 0).");
} else i = 1 / 0;
if (u(n) && i > 0) return s(n, function(n, r) {
l.addPhrase(t, (e ? e + "." : "") + r, n, i - 1);
}), this;
if (o(n)) this._storage[h(t, e)] = {
translation: n,
locale: t,
raw: !1
}; else {
if (!(y(n) || c(n) || a(n) || 0 === i && u(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
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
var r = y(e) ? e.slice() : [ e ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[t] = r, this._fallbacks_cache = {}, 
this;
};
var _ = /#\{|\(\(|\\\\/;
d.prototype.translate = function(t, e, n) {
var r, a = p(this, t, e);
return a ? (r = this._storage[a], r.raw ? r.translation : (r.hasOwnProperty("compiled") || (r.compiled = v(this, r.translation, r.locale)), 
i(r.compiled) ? ((c(n) || o(n)) && (n = {
count: n,
value: n
}), r.compiled.call(this, n, f, m)) : r.compiled)) : t + ": No translation for [" + e + "]";
}, d.prototype.hasPhrase = function(t, e, n) {
return n ? this._storage.hasOwnProperty(h(t, e)) : p(this, t, e) ? !0 : !1;
}, d.prototype.getLocale = function(t, e, n) {
if (n) return this._storage.hasOwnProperty(h(t, e)) ? t : null;
var r = p(this, t, e);
return r ? r.split(w, 2)[0] : null;
}, d.prototype.t = d.prototype.translate, d.prototype.stringify = function(t) {
var e = this, n = {};
s(this._storage, function(t, e) {
n[e.split(w)[1]] = !0;
});
var r = {};
s(n, function(n, o) {
var c = p(e, t, o);
if (c) {
var a = e._storage[c].locale;
r[a] || (r[a] = {}), r[a][o] = e._storage[c].translation;
}
});
var o = {
fallback: {},
locales: r
}, c = (e._fallbacks[t] || []).slice(0, -1);
return c.length && (o.fallback[t] = c), JSON.stringify(o);
}, d.prototype.load = function(t) {
var e = this;
return o(t) && (t = JSON.parse(t)), s(t.locales, function(t, n) {
s(t, function(t, r) {
e.addPhrase(n, r, t, 0);
});
}), s(t.fallback, function(t, n) {
e.setFallback(n, t);
}), this;
}, t.exports = d;
},
329: function(t, e) {
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
return t.substring(bt, vt);
}
function r(e) {
function n(e, n, r) {
var o, c;
for (o = n; r > o; o++) c = t.charAt(o), "\n" === c ? (e.seenCR || e.line++, e.column = 1, 
e.seenCR = !1) : "\r" === c || "\u2028" === c || "\u2029" === c ? (e.line++, e.column = 1, 
e.seenCR = !0) : (e.column++, e.seenCR = !1);
}
return gt !== e && (gt > e && (gt = 0, yt = {
line: 1,
column: 1,
seenCR: !1
}), n(yt, gt, e), gt = e), yt;
}
function o(t) {
Ft > vt || (vt > Ft && (Ft = vt, kt = []), kt.push(t));
}
function c(n, o, c) {
function a(t) {
var e = 1;
for (t.sort(function(t, e) {
return t.description < e.description ? -1 : t.description > e.description ? 1 : 0;
}); e < t.length; ) t[e - 1] === t[e] ? t.splice(e, 1) : e++;
}
function i(t, e) {
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
var r, o, c, a = Array(t.length);
for (c = 0; c < t.length; c++) a[c] = t[c].description;
return r = t.length > 1 ? a.slice(0, -1).join(", ") + " or " + a[t.length - 1] : a[0], 
o = e ? '"' + n(e) + '"' : "end of input", "Expected " + r + " but " + o + " found.";
}
var u = r(c), s = c < t.length ? t.charAt(c) : null;
return null !== o && a(o), new e(null !== n ? n : i(o, s), o, s, c, u.line, u.column);
}
function a() {
var t, e;
for (t = [], e = d(), e === k && (e = i(), e === k && (e = h())); e !== k; ) t.push(e), 
e = d(), e === k && (e = i(), e === k && (e = h()));
return t;
}
function i() {
var e, n, r, c, a;
return e = vt, t.substr(vt, 2) === C ? (n = C, vt += 2) : (n = k, 0 === xt && o(j)), 
n !== k ? (r = u(), r !== k ? (t.substr(vt, 2) === A ? (c = A, vt += 2) : (c = k, 
0 === xt && o(E)), c !== k ? (a = f(), a === k && (a = O), a !== k ? (bt = e, n = S(r, a), 
e = n) : (vt = e, e = _)) : (vt = e, e = _)) : (vt = e, e = _)) : (vt = e, e = _), 
e;
}
function u() {
var e, n, r, c;
return e = vt, n = s(), n !== k ? (124 === t.charCodeAt(vt) ? (r = R, vt++) : (r = k, 
0 === xt && o(L)), r !== k ? (c = u(), c !== k ? (bt = e, n = q(n, c), e = n) : (vt = e, 
e = _)) : (vt = e, e = _)) : (vt = e, e = _), e === k && (e = vt, n = s(), n !== k && (bt = e, 
n = z(n)), e = n), e;
}
function s() {
var e, n, r, c, a, i;
if (e = vt, 61 === t.charCodeAt(vt) ? (n = P, vt++) : (n = k, 0 === xt && o(T)), 
n !== k) {
if (r = [], I.test(t.charAt(vt)) ? (c = t.charAt(vt), vt++) : (c = k, 0 === xt && o(H)), 
c !== k) for (;c !== k; ) r.push(c), I.test(t.charAt(vt)) ? (c = t.charAt(vt), vt++) : (c = k, 
0 === xt && o(H)); else r = _;
if (r !== k) if (32 === t.charCodeAt(vt) ? (c = N, vt++) : (c = k, 0 === xt && o(M)), 
c === k && (c = O), c !== k) {
if (a = [], i = l(), i !== k) for (;i !== k; ) a.push(i), i = l(); else a = _;
a !== k ? (bt = e, n = $(r, a), e = n) : (vt = e, e = _);
} else vt = e, e = _; else vt = e, e = _;
} else vt = e, e = _;
if (e === k) {
if (e = vt, n = [], r = l(), r !== k) for (;r !== k; ) n.push(r), r = l(); else n = _;
n !== k && (bt = e, n = D()), e = n;
}
return e;
}
function l() {
var e, n, r;
return e = vt, 92 === t.charCodeAt(vt) ? (n = J, vt++) : (n = k, 0 === xt && o(X)), 
n !== k ? (Z.test(t.charAt(vt)) ? (r = t.charAt(vt), vt++) : (r = k, 0 === xt && o(B)), 
r !== k ? (bt = e, n = U(r), e = n) : (vt = e, e = _)) : (vt = e, e = _), e === k && (e = vt, 
n = vt, xt++, 124 === t.charCodeAt(vt) ? (r = R, vt++) : (r = k, 0 === xt && o(L)), 
r === k && (t.substr(vt, 2) === A ? (r = A, vt += 2) : (r = k, 0 === xt && o(E))), 
xt--, r === k ? n = K : (vt = n, n = _), n !== k ? (t.length > vt ? (r = t.charAt(vt), 
vt++) : (r = k, 0 === xt && o(G)), r !== k ? (bt = e, n = W(), e = n) : (vt = e, 
e = _)) : (vt = e, e = _)), e;
}
function f() {
var e, n, r;
return e = vt, 58 === t.charCodeAt(vt) ? (n = Y, vt++) : (n = k, 0 === xt && o(Q)), 
n !== k ? (r = p(), r !== k ? (bt = e, n = V(r), e = n) : (vt = e, e = _)) : (vt = e, 
e = _), e;
}
function h() {
var e, n, r, c;
return e = vt, t.substr(vt, 2) === tt ? (n = tt, vt += 2) : (n = k, 0 === xt && o(et)), 
n !== k ? (r = p(), r !== k ? (125 === t.charCodeAt(vt) ? (c = nt, vt++) : (c = k, 
0 === xt && o(rt)), c !== k ? (bt = e, n = ot(r), e = n) : (vt = e, e = _)) : (vt = e, 
e = _)) : (vt = e, e = _), e;
}
function p() {
var e, n, r, c, a;
if (e = vt, n = m(), n !== k) if (46 === t.charCodeAt(vt) ? (r = ct, vt++) : (r = k, 
0 === xt && o(at)), r !== k) {
if (c = [], a = p(), a !== k) for (;a !== k; ) c.push(a), a = p(); else c = _;
c !== k ? (bt = e, n = it(), e = n) : (vt = e, e = _);
} else vt = e, e = _; else vt = e, e = _;
return e === k && (e = m()), e;
}
function m() {
var e, n, r, c;
if (e = vt, ut.test(t.charAt(vt)) ? (n = t.charAt(vt), vt++) : (n = k, 0 === xt && o(st)), 
n !== k) {
for (r = [], lt.test(t.charAt(vt)) ? (c = t.charAt(vt), vt++) : (c = k, 0 === xt && o(ft)); c !== k; ) r.push(c), 
lt.test(t.charAt(vt)) ? (c = t.charAt(vt), vt++) : (c = k, 0 === xt && o(ft));
r !== k ? (bt = e, n = W(), e = n) : (vt = e, e = _);
} else vt = e, e = _;
return e;
}
function d() {
var t, e, n, r, o;
if (t = vt, e = [], n = vt, r = vt, xt++, o = i(), o === k && (o = h()), xt--, o === k ? r = K : (vt = r, 
r = _), r !== k ? (o = v(), o !== k ? (bt = n, r = ht(o), n = r) : (vt = n, n = _)) : (vt = n, 
n = _), n !== k) for (;n !== k; ) e.push(n), n = vt, r = vt, xt++, o = i(), o === k && (o = h()), 
xt--, o === k ? r = K : (vt = r, r = _), r !== k ? (o = v(), o !== k ? (bt = n, 
r = ht(o), n = r) : (vt = n, n = _)) : (vt = n, n = _); else e = _;
return e !== k && (bt = t, e = pt(e)), t = e;
}
function v() {
var e, n, r;
return e = vt, 92 === t.charCodeAt(vt) ? (n = J, vt++) : (n = k, 0 === xt && o(X)), 
n !== k ? (mt.test(t.charAt(vt)) ? (r = t.charAt(vt), vt++) : (r = k, 0 === xt && o(dt)), 
r !== k ? (bt = e, n = U(r), e = n) : (vt = e, e = _)) : (vt = e, e = _), e === k && (t.length > vt ? (e = t.charAt(vt), 
vt++) : (e = k, 0 === xt && o(G))), e;
}
function b(t) {
for (var e = [], n = 0; n < t.length; n++) void 0 === t[n].strict && e.push(t[n].text);
return e;
}
function g(t) {
for (var e = {}, n = 0; n < t.length; n++) void 0 !== t[n].strict && (e[t[n].strict] = t[n].text);
return e;
}
var y, F = arguments.length > 1 ? arguments[1] : {}, k = {}, x = {
start: a
}, w = a, _ = k, C = "((", j = {
type: "literal",
value: "((",
description: '"(("'
}, A = "))", E = {
type: "literal",
value: "))",
description: '"))"'
}, O = null, S = function(t, e) {
return {
type: "plural",
forms: b(t),
strict: g(t),
anchor: e || "count"
};
}, R = "|", L = {
type: "literal",
value: "|",
description: '"|"'
}, q = function(t, e) {
return [ t ].concat(e);
}, z = function(t) {
return [ t ];
}, P = "=", T = {
type: "literal",
value: "=",
description: '"="'
}, I = /^[0-9]/, H = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, N = " ", M = {
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
}, Z = /^[\\|)(]/, B = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, U = function(t) {
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
}, ct = ".", at = {
type: "literal",
value: ".",
description: '"."'
}, it = function() {
return n();
}, ut = /^[a-zA-Z_$]/, st = {
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
}, vt = 0, bt = 0, gt = 0, yt = {
line: 1,
column: 1,
seenCR: !1
}, Ft = 0, kt = [], xt = 0;
if ("startRule" in F) {
if (!(F.startRule in x)) throw Error("Can't start parsing from rule \"" + F.startRule + '".');
w = x[F.startRule];
}
if (y = w(), y !== k && vt === t.length) return y;
throw y !== k && vt < t.length && o({
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
330: function(t, e) {
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
var o = e + "", c = o.indexOf(".") < 0 ? "" : o.split(".")[1], a = c.length, i = +e, u = +o.split(".")[0], s = 0 === c.length ? 0 : +c.replace(/0+$/, "");
return p[r].cFn(i, u, a, +c, s);
}
function c(t, e) {
var r = n(t);
return r ? p[r].c[o(r, e)] : null;
}
function a(t) {
var e = n(t);
return p[e] ? p[e].o : null;
}
function i(t, e) {
var r = n(t);
if (!r) return -1;
if (!p[r].oFn) return 0;
var o = e + "", c = o.indexOf(".") < 0 ? "" : o.split(".")[1], a = c.length, i = +e, u = +o.split(".")[0], s = 0 === c.length ? 0 : +c.replace(/0+$/, "");
return p[r].oFn(i, u, a, +c, s);
}
function u(t, e) {
var r = n(t);
return p[r] ? p[r].o[i(r, e)] : null;
}
function s(t) {
return m[t];
}
function l(t, e) {
var n;
for (e.c = e.c ? e.c.map(s) : [ "other" ], e.o = e.o ? e.o.map(s) : [ "other" ], 
n = 0; n < t.length; n++) p[t[n]] = e;
}
function f(t, e, n) {
return n >= t && e >= n && n % 1 === 0;
}
function h(t, e) {
return t.indexOf(e) >= 0;
}
var p = {};
t.exports = c, t.exports.indexOf = o, t.exports.forms = r, t.exports.ordinal = u, 
t.exports.ordinal.indexOf = i, t.exports.ordinal.forms = a;
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
var o = e % 10, c = e % 100, a = r % 10, i = r % 100;
return 0 === n && 1 === o && 11 !== c || 1 === a && 11 !== i ? 0 : 0 === n && f(2, 4, o) && !f(12, 14, c) || f(2, 4, a) && !f(12, 14, i) ? 1 : 2;
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
var c = e % 10, a = e % 100;
return 0 === o && 1 === c && 11 !== a || 0 !== o ? 0 : 1;
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
var o = t % 10, c = t % 100, a = r % 100, i = r % 10;
return 0 === o || f(11, 19, c) || 2 === n && f(11, 19, a) ? 0 : 1 === o && 11 !== c || 2 === n && 1 === i && 11 !== a || 2 !== n && 1 === i ? 1 : 2;
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
//# sourceMappingURL=coursesFeedbackShow.7f4c7035b68ac2b6e24e.js.map
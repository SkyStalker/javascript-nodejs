var coursesParticipantDetails = webpackJsonp_name_([ 11 ], {
0: function(t, e, n) {
"use strict";
function r() {
i();
}
function i() {
var t = document.querySelector("[data-photo-load]");
t && new o({
elem: t,
onSuccess: function(e) {
t.querySelector("i").style.backgroundImage = "url('" + s(e.link, 64, 64) + "')", 
t.querySelector("input").value = e.imgurId;
},
onLoadStart: function() {
t.classList.add("modal-overlay_light");
},
onLoadEnd: function() {
t.classList.remove("modal-overlay_light");
}
});
}
var s = n(499).thumb, o = n(507);
r();
},
116: function(t, e) {},
124: function(t, e, n) {
var r;
!function(i) {
"use strict";
var s = i.HTMLCanvasElement && i.HTMLCanvasElement.prototype, o = i.Blob && function() {
try {
return !!new Blob();
} catch (t) {
return !1;
}
}(), a = o && i.Uint8Array && function() {
try {
return 100 === new Blob([ new Uint8Array(100) ]).size;
} catch (t) {
return !1;
}
}(), c = i.BlobBuilder || i.WebKitBlobBuilder || i.MozBlobBuilder || i.MSBlobBuilder, u = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, l = (o || c) && i.atob && i.ArrayBuffer && i.Uint8Array && function(t) {
var e, n, r, i, s, l, h, f, d;
if (e = t.match(u), !e) throw Error("invalid data URI");
for (n = e[2] ? e[1] : "text/plain" + (e[3] || ";charset=US-ASCII"), r = !!e[4], 
i = t.slice(e[0].length), s = r ? atob(i) : decodeURIComponent(i), l = new ArrayBuffer(s.length), 
h = new Uint8Array(l), f = 0; f < s.length; f += 1) h[f] = s.charCodeAt(f);
return o ? new Blob([ a ? h : l ], {
type: n
}) : (d = new c(), d.append(l), d.getBlob(n));
};
i.HTMLCanvasElement && !s.toBlob && (s.mozGetAsFile ? s.toBlob = function(t, e, n) {
t(n && s.toDataURL && l ? l(this.toDataURL(e, n)) : this.mozGetAsFile("blob", e));
} : s.toDataURL && l && (s.toBlob = function(t, e, n) {
t(l(this.toDataURL(e, n)));
})), r = function() {
return l;
}.call(e, n, e, t), !(void 0 !== r && (t.exports = r));
}(window);
},
169: function(t, e, n) {
var r = n(496);
t.exports = function(t) {
var e, n = [], i = {}, s = t || {};
return function(t, s) {
n.push(""), s || (s = []), i.b = e = function(e, r, i) {
this && this.block, this && this.attributes || {};
t.call(this, n, s, e, r, i);
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
n.push("Выберите миниатюру");
},
attributes: {
"class": "title"
}
}, "h1"), i.e.call({
block: function() {
i.e.call({
block: function() {
i.e.call({
block: function() {
i.e.call({
block: function() {
i.e.call({
attributes: {
tabindex: "-1",
"class": "canvas"
}
}, "canvas"), i.e.call({
attributes: {
type: "button",
"data-action": "rotate-right",
"class": "rotate"
}
}, "button");
},
attributes: {
"class": "canvas-wrapper"
}
});
},
attributes: {
"class": "main"
}
}), i.e.call({
block: function() {
i.e.call({
attributes: {
"class": "selection-canvas"
}
}, "canvas"), i.e.call({
attributes: {
"class": "selection-canvas _small"
}
}, "canvas");
},
attributes: {
"class": "result"
}
});
},
attributes: {
"class": "layout"
}
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
block: function() {
n.push("Сохранить");
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
}, "button"), i.e.call({
block: function() {
n.push("Отмена");
},
attributes: {
href: "#",
"class": "close-link modal__close"
}
}, "a");
},
attributes: {
"class": "submit"
}
});
},
attributes: {
"data-form": !0
}
}, "form");
},
attributes: {
"class": "photo-cut"
}
});
}.call(this, "bem" in s ? s.bem : "undefined" != typeof bem ? bem : void 0, "bem_chain" in s ? s.bem_chain : "undefined" != typeof bem_chain ? bem_chain : void 0), 
n.join("");
};
},
494: function(t, e, n) {
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
var i = new XMLHttpRequest(), o = t.method || "GET", a = t.body, c = t.url;
i.open(o, c, !t.sync), i.method = o;
var u = s();
u && !t.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", u), "[object Object]" == {}.toString.call(a) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
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
var l = t.normalStatuses || [ 200 ];
return i.addEventListener("error", function(t) {
n("Ошибка связи с сервером.", t);
}), i.addEventListener("timeout", function(t) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), i.addEventListener("abort", function(t) {
n("Запрос был прерван.", t);
}), i.addEventListener("load", function(e) {
if (!i.status) return void n("Не получен ответ от сервера.", e);
if (-1 == l.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", e);
var s = i.responseText, o = i.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
s = JSON.parse(s);
} catch (e) {
return void n("Некорректный формат ответа от сервера.", e);
}
r(s, e);
}), setTimeout(function() {
i.send(a);
}, 0), i;
}
var i = n(486), s = n(495);
document.addEventListener("xhrfail", function(t) {
new i.Error(t.reason);
}), t.exports = r;
},
495: function(t, e) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
496: function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function i(t) {
return (Array.isArray(t) ? t.map(i) : t && "object" === (void 0 === t ? "undefined" : a(t)) ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
function s(t) {
return c[t] || t;
}
function o(t) {
var e = (t + "").replace(u, s);
return e === "" + t ? t : e;
}
var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
};
e.merge = function l(t, e) {
if (1 === arguments.length) {
for (var n = t[0], i = 1; i < t.length; i++) n = l(n, t[i]);
return n;
}
var s = t.class, o = e.class;
(s || o) && (s = s || [], o = o || [], Array.isArray(s) || (s = [ s ]), Array.isArray(o) || (o = [ o ]), 
t.class = s.concat(o).filter(r));
for (var a in e) "class" != a && (t[a] = e[a]);
return t;
}, e.joinClasses = i, e.cls = function(t, n) {
for (var r = [], s = 0; s < t.length; s++) n && n[s] ? r.push(e.escape(i([ t[s] ]))) : r.push(i(t[s]));
var o = i(r);
return o.length ? ' class="' + o + '"' : "";
}, e.style = function(t) {
return t && "object" === (void 0 === t ? "undefined" : a(t)) ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, r, i) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var r = [], s = Object.keys(t);
if (s.length) for (var o = 0; o < s.length; ++o) {
var a = s[o], c = t[a];
"class" == a ? (c = i(c)) && r.push(" " + a + '="' + c + '"') : r.push(e.attr(a, c, !1, n));
}
return r.join("");
};
var c = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, u = /[&<>"]/g;
e.escape = o, e.rethrow = function h(t, e, r, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + r, 
t;
try {
i = i || n(116).readFileSync(e, "utf8");
} catch (s) {
h(t, null, r);
}
var o = 3, a = i.split("\n"), c = Math.max(r - o, 0), u = Math.min(a.length, r + o), o = a.slice(c, u).map(function(t, e) {
var n = e + c + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + o + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
497: function(t, e, n) {
"use strict";
function r(t) {
t.bem = i, t.t = a, t.thumb = s, t.lang = o;
}
var i = n(498)(), s = n(499).thumb, o = n(500).lang, a = n(501);
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
},
498: function(t, e, n) {
"use strict";
var r = n(496);
t.exports = function(t) {
function e(t, e, n, i, s) {
var o = s || "div";
switch (o) {
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
t.push("<" + o + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && t.push("</" + o + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, i, s) {
var o = this.block, a = this.attributes || {};
if (!a.class && i && !s) throw Error("Block without class: " + i);
if (a.class) {
var c = a.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var u;
try {
u = c[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + c[0]);
}
s ? c[0] = r[r.length - 1] + t.element + c[0] : r[r.length] = u;
var h = (s ? r[r.length - 1] + t.element : "") + u;
-1 === c.indexOf(h) && (c[c.length] = h);
for (var f = 0; f < c.length; f++) {
var d = c[f];
d.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? c[f] = h + d : d.match(RegExp("^" + t.element)) && (r[r.length - 2] ? c[f] = r[r.length - 2] + d : c[f] = r[r.length - 1] + d), 
c[f].match(RegExp("^" + h + "($|(?=" + t.element + "|" + t.modifier + "))")) && (c[f] = t.prefix + c[f]);
}
a.class = c.sort().join(" ");
}
e(n, o, a, r, i), s || r.pop();
};
};
},
499: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var i = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + i + t.slice(t.lastIndexOf("."));
};
},
500: function(t, e, n) {
"use strict";
t.exports = {
lang: "ru"
};
},
501: function(t, e, n) {
"use strict";
function r() {
for (var t = [ o ], e = 0; e < arguments.length; e++) t.push(arguments[e]);
return s.t.apply(s, t);
}
var i = n(502), s = new i("en"), o = n(500).lang, a = {};
r.i18n = s, r.requirePhrase = function(t, e) {
a[t] && -1 != a[t].indexOf(e) || (a[t] || (a[t] = []), a[t].push(e), s.addPhrase(o, t, e));
}, t.exports = r;
},
502: function(t, e, n) {
"use strict";
t.exports = n(503);
},
503: function(t, e, n) {
"use strict";
function r(t) {
return Object.prototype.toString.call(t);
}
function i(t) {
return "[object String]" === r(t);
}
function s(t) {
return !isNaN(t) && isFinite(t);
}
function o(t) {
return t === !0 || t === !1;
}
function a(t) {
return "[object Function]" === r(t);
}
function c(t) {
return "[object Object]" === r(t);
}
function u(t, e, n) {
if (null !== t) if (w && t.forEach === w) t.forEach(e, n); else if (t.length === +t.length) for (var r = 0, i = t.length; i > r; r += 1) e.call(n, t[r], r, t); else for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && e.call(n, t[s], s, t);
}
function l(t) {
var e = 1, n = arguments, r = n.length, i = (t + "").replace(S, function(t) {
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
function h(t) {
var e = {};
return u(t || {}, function(t, n) {
return t && "object" === (void 0 === t ? "undefined" : y(t)) ? void u(h(t), function(t, r) {
e[n + "." + r] = t;
}) : void (e[n] = t);
}), e;
}
function f(t, e) {
return t + k + e;
}
function d(t, e, n) {
var r = f(e, n), i = t._storage;
if (i.hasOwnProperty(r)) return r;
if (e === t._defaultLocale) return null;
var s = t._fallbacks_cache;
if (s.hasOwnProperty(r)) return s[r];
for (var o, a = t._fallbacks[e] || [ t._defaultLocale ], c = 0, u = a.length; u > c; c++) if (o = f(a[c], n), 
i.hasOwnProperty(o)) return s[r] = o, s[r];
return s[r] = null, null;
}
function p(t, e, n) {
var r = b.indexOf(t, e);
return -1 === r ? l('[pluralizer for "%s" locale not found]', t) : void 0 === n[r] ? l('[plural form %d ("%s") not found in translation]', r, b.forms(t)[r]) : n[r];
}
function v(t) {
return this instanceof v ? (this._defaultLocale = t ? t + "" : C, this._fallbacks = {}, 
this._fallbacks_cache = {}, this._storage = {}, void (this._plurals_cache = {})) : new v(t);
}
function m(t, e, n) {
var r, i, s, o, a, c;
return F.test(e) ? (r = g.parse(e), 1 === r.length && "literal" === r[0].type ? r[0].text : (t._plurals_cache[n] || (t._plurals_cache[n] = new v(n)), 
c = t._plurals_cache[n], i = [], i.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
i.push("params = flatten(params);"), u(r, function(t) {
if ("literal" === t.type) return void i.push(l("str += %j;", t.text));
if ("variable" === t.type) return s = t.anchor, void i.push(l('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', s, s, s));
if ("plural" !== t.type) throw Error("Unknown node type");
s = t.anchor, o = {}, u(t.strict, function(e, r) {
var i = g.parse(e);
return 1 === i.length && "literal" === i[0].type ? (o[r] = !1, void (t.strict[r] = i[0].text)) : (o[r] = !0, 
void (c.hasPhrase(n, e, !0) || c.addPhrase(n, e, e)));
}), a = {}, u(t.forms, function(e, r) {
var i, s = g.parse(e);
return 1 === s.length && "literal" === s[0].type ? (i = s[0].text, t.forms[r] = i, 
void (a[i] = !1)) : (a[e] = !0, void (c.hasPhrase(n, e, !0) || c.addPhrase(n, e, e)));
}), i.push(l("loc = %j;", n)), i.push(l("loc_plzr = %j;", n.split(/[-_]/)[0])), 
i.push(l("anchor = params[%j];", s)), i.push(l("cache = this._plurals_cache[loc];")), 
i.push(l("strict = %j;", t.strict)), i.push(l("strict_exec = %j;", o)), i.push(l("forms = %j;", t.forms)), 
i.push(l("forms_exec = %j;", a)), i.push("if (+(anchor) != anchor) {"), i.push(l('  str += "[invalid plurals amount: %s(" + anchor + ")]";', s)), 
i.push("} else {"), i.push("  if (strict[anchor] !== undefined) {"), i.push("    plrl = strict[anchor];"), 
i.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), i.push("  } else {"), 
i.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), i.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
i.push("  }"), i.push("}");
}), i.push("return str;"), Function("params", "flatten", "pluralizer", i.join("\n")))) : e;
}
var y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
}, g = n(504), b = n(505), x = Array.isArray || function(t) {
return "[object Array]" === r(t);
}, w = Array.prototype.forEach, S = /%[sdj%]/g, C = "en", k = "#@$";
v.prototype.addPhrase = function(t, e, n, r) {
var a, l = this;
if (o(r)) a = r ? 1 / 0 : 0; else if (s(r)) {
if (a = Math.floor(r), 0 > a) throw new TypeError("Invalid flatten level (should be >= 0).");
} else a = 1 / 0;
if (c(n) && a > 0) return u(n, function(n, r) {
l.addPhrase(t, (e ? e + "." : "") + r, n, a - 1);
}), this;
if (i(n)) this._storage[f(t, e)] = {
translation: n,
locale: t,
raw: !1
}; else {
if (!(x(n) || s(n) || o(n) || 0 === a && c(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[f(t, e)] = {
translation: n,
locale: t,
raw: !0
};
}
return l._fallbacks_cache = {}, this;
}, v.prototype.setFallback = function(t, e) {
var n = this._defaultLocale;
if (n === t) throw Error("Default locale can't have fallbacks");
var r = x(e) ? e.slice() : [ e ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[t] = r, this._fallbacks_cache = {}, 
this;
};
var F = /#\{|\(\(|\\\\/;
v.prototype.translate = function(t, e, n) {
var r, o = d(this, t, e);
return o ? (r = this._storage[o], r.raw ? r.translation : (r.hasOwnProperty("compiled") || (r.compiled = m(this, r.translation, r.locale)), 
a(r.compiled) ? ((s(n) || i(n)) && (n = {
count: n,
value: n
}), r.compiled.call(this, n, h, p)) : r.compiled)) : t + ": No translation for [" + e + "]";
}, v.prototype.hasPhrase = function(t, e, n) {
return n ? this._storage.hasOwnProperty(f(t, e)) : !!d(this, t, e);
}, v.prototype.getLocale = function(t, e, n) {
if (n) return this._storage.hasOwnProperty(f(t, e)) ? t : null;
var r = d(this, t, e);
return r ? r.split(k, 2)[0] : null;
}, v.prototype.t = v.prototype.translate, v.prototype.stringify = function(t) {
var e = this, n = {};
u(this._storage, function(t, e) {
n[e.split(k)[1]] = !0;
});
var r = {};
u(n, function(n, i) {
var s = d(e, t, i);
if (s) {
var o = e._storage[s].locale;
r[o] || (r[o] = {}), r[o][i] = e._storage[s].translation;
}
});
var i = {
fallback: {},
locales: r
}, s = (e._fallbacks[t] || []).slice(0, -1);
return s.length && (i.fallback[t] = s), JSON.stringify(i);
}, v.prototype.load = function(t) {
var e = this;
return i(t) && (t = JSON.parse(t)), u(t.locales, function(t, n) {
u(t, function(t, r) {
e.addPhrase(n, r, t, 0);
});
}), u(t.fallback, function(t, n) {
e.setFallback(n, t);
}), this;
}, t.exports = v;
},
504: function(t, e) {
"use strict";
t.exports = function() {
function t(t, e) {
function n() {
this.constructor = t;
}
n.prototype = e.prototype, t.prototype = new n();
}
function e(t, e, n, r, i, s) {
this.message = t, this.expected = e, this.found = n, this.offset = r, this.line = i, 
this.column = s, this.name = "SyntaxError";
}
function n(t) {
function n() {
return t.substring(yt, mt);
}
function r(e) {
function n(e, n, r) {
var i, s;
for (i = n; r > i; i++) s = t.charAt(i), "\n" === s ? (e.seenCR || e.line++, e.column = 1, 
e.seenCR = !1) : "\r" === s || "\u2028" === s || "\u2029" === s ? (e.line++, e.column = 1, 
e.seenCR = !0) : (e.column++, e.seenCR = !1);
}
return gt !== e && (gt > e && (gt = 0, bt = {
line: 1,
column: 1,
seenCR: !1
}), n(bt, gt, e), gt = e), bt;
}
function i(t) {
xt > mt || (mt > xt && (xt = mt, wt = []), wt.push(t));
}
function s(n, i, s) {
function o(t) {
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
var r, i, s, o = Array(t.length);
for (s = 0; s < t.length; s++) o[s] = t[s].description;
return r = t.length > 1 ? o.slice(0, -1).join(", ") + " or " + o[t.length - 1] : o[0], 
i = e ? '"' + n(e) + '"' : "end of input", "Expected " + r + " but " + i + " found.";
}
var c = r(s), u = s < t.length ? t.charAt(s) : null;
return null !== i && o(i), new e(null !== n ? n : a(i, u), i, u, s, c.line, c.column);
}
function o() {
var t, e;
for (t = [], e = v(), e === w && (e = a(), e === w && (e = f())); e !== w; ) t.push(e), 
e = v(), e === w && (e = a(), e === w && (e = f()));
return t;
}
function a() {
var e, n, r, s, o;
return e = mt, t.substr(mt, 2) === F ? (n = F, mt += 2) : (n = w, 0 === St && i(z)), 
n !== w ? (r = c(), r !== w ? (t.substr(mt, 2) === E ? (s = E, mt += 2) : (s = w, 
0 === St && i(_)), s !== w ? (o = h(), o === w && (o = A), o !== w ? (yt = e, n = j(r, o), 
e = n) : (mt = e, e = k)) : (mt = e, e = k)) : (mt = e, e = k)) : (mt = e, e = k), 
e;
}
function c() {
var e, n, r, s;
return e = mt, n = u(), n !== w ? (124 === t.charCodeAt(mt) ? (r = I, mt++) : (r = w, 
0 === St && i(R)), r !== w ? (s = c(), s !== w ? (yt = e, n = O(n, s), e = n) : (mt = e, 
e = k)) : (mt = e, e = k)) : (mt = e, e = k), e === w && (e = mt, n = u(), n !== w && (yt = e, 
n = M(n)), e = n), e;
}
function u() {
var e, n, r, s, o, a;
if (e = mt, 61 === t.charCodeAt(mt) ? (n = L, mt++) : (n = w, 0 === St && i(D)), 
n !== w) {
if (r = [], P.test(t.charAt(mt)) ? (s = t.charAt(mt), mt++) : (s = w, 0 === St && i(B)), 
s !== w) for (;s !== w; ) r.push(s), P.test(t.charAt(mt)) ? (s = t.charAt(mt), mt++) : (s = w, 
0 === St && i(B)); else r = k;
if (r !== w) if (32 === t.charCodeAt(mt) ? (s = q, mt++) : (s = w, 0 === St && i(T)), 
s === w && (s = A), s !== w) {
if (o = [], a = l(), a !== w) for (;a !== w; ) o.push(a), a = l(); else o = k;
o !== w ? (yt = e, n = U(r, o), e = n) : (mt = e, e = k);
} else mt = e, e = k; else mt = e, e = k;
} else mt = e, e = k;
if (e === w) {
if (e = mt, n = [], r = l(), r !== w) for (;r !== w; ) n.push(r), r = l(); else n = k;
n !== w && (yt = e, n = N()), e = n;
}
return e;
}
function l() {
var e, n, r;
return e = mt, 92 === t.charCodeAt(mt) ? (n = H, mt++) : (n = w, 0 === St && i($)), 
n !== w ? (J.test(t.charAt(mt)) ? (r = t.charAt(mt), mt++) : (r = w, 0 === St && i(X)), 
r !== w ? (yt = e, n = Z(r), e = n) : (mt = e, e = k)) : (mt = e, e = k), e === w && (e = mt, 
n = mt, St++, 124 === t.charCodeAt(mt) ? (r = I, mt++) : (r = w, 0 === St && i(R)), 
r === w && (t.substr(mt, 2) === E ? (r = E, mt += 2) : (r = w, 0 === St && i(_))), 
St--, r === w ? n = K : (mt = n, n = k), n !== w ? (t.length > mt ? (r = t.charAt(mt), 
mt++) : (r = w, 0 === St && i(W)), r !== w ? (yt = e, n = G(), e = n) : (mt = e, 
e = k)) : (mt = e, e = k)), e;
}
function h() {
var e, n, r;
return e = mt, 58 === t.charCodeAt(mt) ? (n = Y, mt++) : (n = w, 0 === St && i(Q)), 
n !== w ? (r = d(), r !== w ? (yt = e, n = V(r), e = n) : (mt = e, e = k)) : (mt = e, 
e = k), e;
}
function f() {
var e, n, r, s;
return e = mt, t.substr(mt, 2) === tt ? (n = tt, mt += 2) : (n = w, 0 === St && i(et)), 
n !== w ? (r = d(), r !== w ? (125 === t.charCodeAt(mt) ? (s = nt, mt++) : (s = w, 
0 === St && i(rt)), s !== w ? (yt = e, n = it(r), e = n) : (mt = e, e = k)) : (mt = e, 
e = k)) : (mt = e, e = k), e;
}
function d() {
var e, n, r, s, o;
if (e = mt, n = p(), n !== w) if (46 === t.charCodeAt(mt) ? (r = st, mt++) : (r = w, 
0 === St && i(ot)), r !== w) {
if (s = [], o = d(), o !== w) for (;o !== w; ) s.push(o), o = d(); else s = k;
s !== w ? (yt = e, n = at(), e = n) : (mt = e, e = k);
} else mt = e, e = k; else mt = e, e = k;
return e === w && (e = p()), e;
}
function p() {
var e, n, r, s;
if (e = mt, ct.test(t.charAt(mt)) ? (n = t.charAt(mt), mt++) : (n = w, 0 === St && i(ut)), 
n !== w) {
for (r = [], lt.test(t.charAt(mt)) ? (s = t.charAt(mt), mt++) : (s = w, 0 === St && i(ht)); s !== w; ) r.push(s), 
lt.test(t.charAt(mt)) ? (s = t.charAt(mt), mt++) : (s = w, 0 === St && i(ht));
r !== w ? (yt = e, n = G(), e = n) : (mt = e, e = k);
} else mt = e, e = k;
return e;
}
function v() {
var t, e, n, r, i;
if (t = mt, e = [], n = mt, r = mt, St++, i = a(), i === w && (i = f()), St--, i === w ? r = K : (mt = r, 
r = k), r !== w ? (i = m(), i !== w ? (yt = n, r = ft(i), n = r) : (mt = n, n = k)) : (mt = n, 
n = k), n !== w) for (;n !== w; ) e.push(n), n = mt, r = mt, St++, i = a(), i === w && (i = f()), 
St--, i === w ? r = K : (mt = r, r = k), r !== w ? (i = m(), i !== w ? (yt = n, 
r = ft(i), n = r) : (mt = n, n = k)) : (mt = n, n = k); else e = k;
return e !== w && (yt = t, e = dt(e)), t = e;
}
function m() {
var e, n, r;
return e = mt, 92 === t.charCodeAt(mt) ? (n = H, mt++) : (n = w, 0 === St && i($)), 
n !== w ? (pt.test(t.charAt(mt)) ? (r = t.charAt(mt), mt++) : (r = w, 0 === St && i(vt)), 
r !== w ? (yt = e, n = Z(r), e = n) : (mt = e, e = k)) : (mt = e, e = k), e === w && (t.length > mt ? (e = t.charAt(mt), 
mt++) : (e = w, 0 === St && i(W))), e;
}
function y(t) {
for (var e = [], n = 0; n < t.length; n++) void 0 === t[n].strict && e.push(t[n].text);
return e;
}
function g(t) {
for (var e = {}, n = 0; n < t.length; n++) void 0 !== t[n].strict && (e[t[n].strict] = t[n].text);
return e;
}
var b, x = arguments.length > 1 ? arguments[1] : {}, w = {}, S = {
start: o
}, C = o, k = w, F = "((", z = {
type: "literal",
value: "((",
description: '"(("'
}, E = "))", _ = {
type: "literal",
value: "))",
description: '"))"'
}, A = null, j = function(t, e) {
return {
type: "plural",
forms: y(t),
strict: g(t),
anchor: e || "count"
};
}, I = "|", R = {
type: "literal",
value: "|",
description: '"|"'
}, O = function(t, e) {
return [ t ].concat(e);
}, M = function(t) {
return [ t ];
}, L = "=", D = {
type: "literal",
value: "=",
description: '"="'
}, P = /^[0-9]/, B = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, q = " ", T = {
type: "literal",
value: " ",
description: '" "'
}, U = function(t, e) {
return {
strict: t.join(""),
text: e.join("")
};
}, N = function() {
return {
text: n()
};
}, H = "\\", $ = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, J = /^[\\|)(]/, X = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, Z = function(t) {
return t;
}, K = void 0, W = {
type: "any",
description: "any character"
}, G = function() {
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
}, it = function(t) {
return {
type: "variable",
anchor: t
};
}, st = ".", ot = {
type: "literal",
value: ".",
description: '"."'
}, at = function() {
return n();
}, ct = /^[a-zA-Z_$]/, ut = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, lt = /^[a-zA-Z0-9_$]/, ht = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, ft = function(t) {
return t;
}, dt = function(t) {
return {
type: "literal",
text: t.join("")
};
}, pt = /^[\\#()|]/, vt = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, mt = 0, yt = 0, gt = 0, bt = {
line: 1,
column: 1,
seenCR: !1
}, xt = 0, wt = [], St = 0;
if ("startRule" in x) {
if (!(x.startRule in S)) throw Error("Can't start parsing from rule \"" + x.startRule + '".');
C = S[x.startRule];
}
if (b = C(), b !== w && mt === t.length) return b;
throw b !== w && mt < t.length && i({
type: "end",
description: "end of input"
}), s(null, wt, xt);
}
return t(e, Error), {
SyntaxError: e,
parse: n
};
}();
},
505: function(t, e) {
"use strict";
function n(t) {
var e;
return d[t] ? t : (e = t.toLowerCase().replace("_", "-"), d[e] ? e : (e = e.split("-")[0], 
d[e] ? e : null));
}
function r(t) {
var e = n(t);
return d[e] ? d[e].c : null;
}
function i(t, e) {
var r = n(t);
if (!r) return -1;
if (!d[r].cFn) return 0;
var i = e + "", s = i.indexOf(".") < 0 ? "" : i.split(".")[1], o = s.length, a = +e, c = +i.split(".")[0], u = 0 === s.length ? 0 : +s.replace(/0+$/, "");
return d[r].cFn(a, c, o, +s, u);
}
function s(t, e) {
var r = n(t);
return r ? d[r].c[i(r, e)] : null;
}
function o(t) {
var e = n(t);
return d[e] ? d[e].o : null;
}
function a(t, e) {
var r = n(t);
if (!r) return -1;
if (!d[r].oFn) return 0;
var i = e + "", s = i.indexOf(".") < 0 ? "" : i.split(".")[1], o = s.length, a = +e, c = +i.split(".")[0], u = 0 === s.length ? 0 : +s.replace(/0+$/, "");
return d[r].oFn(a, c, o, +s, u);
}
function c(t, e) {
var r = n(t);
return d[r] ? d[r].o[a(r, e)] : null;
}
function u(t) {
return p[t];
}
function l(t, e) {
var n;
for (e.c = e.c ? e.c.map(u) : [ "other" ], e.o = e.o ? e.o.map(u) : [ "other" ], 
n = 0; n < t.length; n++) d[t[n]] = e;
}
function h(t, e, n) {
return n >= t && e >= n && n % 1 === 0;
}
function f(t, e) {
return t.indexOf(e) >= 0;
}
var d = {};
t.exports = s, t.exports.indexOf = i, t.exports.forms = r, t.exports.ordinal = c, 
t.exports.ordinal.indexOf = a, t.exports.ordinal.forms = o;
var p = [ "zero", "one", "two", "few", "many", "other" ];
l([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(t) {
return h(0, 1, t) ? 0 : 1;
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
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : h(3, 10, e) ? 3 : h(11, 99, e) ? 4 : 5;
}
}), l([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return f([ 1, 5, 7, 8, 9, 10 ], t) ? 0 : f([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
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
var n = e % 10, r = e % 100, i = e % 1e3;
return f([ 1, 2, 5, 7, 8 ], n) || f([ 20, 50, 70, 80 ], r) ? 0 : f([ 3, 4 ], n) || f([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i) ? 1 : 0 === e || 6 === n || f([ 40, 60, 90 ], r) ? 2 : 3;
}
}), l([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var e = t % 10, n = t % 100;
return 1 === e && 11 !== n ? 0 : h(2, 4, e) && !h(12, 14, n) ? 1 : 0 === e || h(5, 9, e) || h(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return f([ 2, 3 ], e) && !f([ 12, 13 ], n) ? 0 : 1;
}
}), l([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "zh" ], {}), 
l([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
var e = t % 10, n = t % 100, r = t % 1e6;
return 1 !== e || f([ 11, 71, 91 ], n) ? 2 !== e || f([ 12, 72, 92 ], n) ? !h(3, 4, e) && 9 !== e || h(10, 19, n) || h(70, 79, n) || h(90, 99, n) ? 0 !== t && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), l([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e, n, r) {
var i = e % 10, s = e % 100, o = r % 10, a = r % 100;
return 0 === n && 1 === i && 11 !== s || 1 === o && 11 !== a ? 0 : 0 === n && h(2, 4, i) && !h(12, 14, s) || h(2, 4, o) && !h(12, 14, a) ? 1 : 2;
}
}), l([ "ca" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return f([ 1, 3 ], t) ? 0 : 2 === t ? 1 : 4 === t ? 2 : 3;
}
}), l([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : h(2, 4, e) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), l([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : 3 === t ? 3 : 6 === t ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(t) {
return f([ 0, 7, 8, 9 ], t) ? 0 : 1 === t ? 1 : 2 === t ? 2 : f([ 3, 4 ], t) ? 3 : f([ 5, 6 ], t) ? 4 : 5;
}
}), l([ "da" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r, i) {
return 1 === t || 0 !== i && f([ 0, 1 ], e) ? 0 : 1;
}
}), l([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, e, n, r) {
var i = e % 100, s = r % 100;
return 0 === n && 1 === i || 1 === s ? 0 : 0 === n && 2 === i || 2 === s ? 1 : 0 === n && h(3, 4, i) || h(3, 4, s) ? 2 : 3;
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
return f([ 0, 1 ], e) ? 0 : 1;
}
}), l([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
var i = e % 10, s = r % 10;
return 0 === n && f([ 1, 2, 3 ], e) || 0 === n && !f([ 4, 6, 9 ], i) || 0 !== n && !f([ 4, 6, 9 ], s) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return f([ 0, 1 ], e) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 2 === t ? 1 : h(3, 6, t) ? 2 : h(7, 10, t) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t) {
return f([ 1, 11 ], t) ? 0 : f([ 2, 12 ], t) ? 1 : h(3, 10, t) || h(13, 19, t) ? 2 : 3;
}
}), l([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return 1 === t ? 0 : f([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), l([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && f([ 0, 20, 40, 60, 80 ], i) ? 2 : 0 !== n ? 3 : 4;
}
}), l([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(t, e, n) {
var r = t % 10;
return 1 === e && 0 === n ? 0 : 2 === e && 0 === n ? 1 : 0 !== n || h(0, 10, t) || 0 !== r ? 3 : 2;
}
}), l([ "hu" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return f([ 1, 5 ], t) ? 0 : 1;
}
}), l([ "is" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r, i) {
var s = e % 10, o = e % 100;
return 0 === i && 1 === s && 11 !== o || 0 !== i ? 0 : 1;
}
}), l([ "it" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === e && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
return f([ 11, 8, 80, 800 ], t) ? 0 : 1;
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
return 1 === e ? 0 : 0 === e || h(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
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
return 0 === t ? 0 : f([ 0, 1 ], e) && 0 !== t ? 1 : 2;
}
}), l([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n, r) {
var i = t % 10, s = t % 100;
return 1 !== i || h(11, 19, s) ? h(2, 9, i) && !h(11, 19, s) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), l([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(t, e, n, r) {
var i = t % 10, s = t % 100, o = r % 100, a = r % 10;
return 0 === i || h(11, 19, s) || 2 === n && h(11, 19, o) ? 0 : 1 === i && 11 !== s || 2 === n && 1 === a && 11 !== o || 2 !== n && 1 === a ? 1 : 2;
}
}), l([ "mk" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
var i = e % 10, s = r % 10;
return 0 === n && 1 === i || 1 === s ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(t, e) {
var n = e % 10, r = e % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : f([ 7, 8 ], n) && !f([ 17, 18 ], r) ? 2 : 3;
}
}), l([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e, n) {
var r = t % 100;
return 1 === e && 0 === n ? 0 : 0 !== n || 0 === t || 1 !== t && h(1, 19, r) ? 1 : 2;
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
return 1 === t ? 0 : f([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 3;
}
}), l([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var e = t % 100;
return 1 === t ? 0 : 0 === t || h(2, 10, e) ? 1 : h(11, 19, e) ? 2 : 3;
}
}), l([ "ne" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return h(1, 4, t) ? 0 : 1;
}
}), l([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 1 === e && 0 === n ? 0 : 0 === n && h(2, 4, r) && !h(12, 14, i) ? 1 : 0 === n && 1 !== e && h(0, 1, r) || 0 === n && h(5, 9, r) || 0 === n && h(12, 14, i) ? 2 : 3;
}
}), l([ "pt" ], {
c: [ 1, 5 ],
cFn: function(t) {
return h(0, 2, t) && 2 !== t ? 0 : 1;
}
}), l([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(t, e, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), l([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && h(2, 4, r) && !h(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && h(5, 9, r) || 0 === n && h(11, 14, i) ? 2 : 3;
}
}), l([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(t, e) {
return 0 === e || 1 === t ? 0 : h(2, 10, t) ? 1 : 2;
}
}), l([ "si" ], {
c: [ 1, 5 ],
cFn: function(t, e, n, r) {
return f([ 0, 1 ], t) || 0 === e && 1 === r ? 0 : 1;
}
}), l([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, e, n) {
var r = e % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && h(3, 4, r) || 0 !== n ? 2 : 3;
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
return f([ 1, 2 ], e) && !f([ 11, 12 ], n) ? 0 : 1;
}
}), l([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(t) {
return h(0, 1, t) || h(11, 99, t) ? 0 : 1;
}
}), l([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, e, n) {
var r = e % 10, i = e % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && h(2, 4, r) && !h(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && h(5, 9, r) || 0 === n && h(11, 14, i) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var e = t % 10, n = t % 100;
return 3 === e && 13 !== n ? 0 : 1;
}
});
},
507: function(t, e, n) {
"use strict";
function r(t) {
function e(t) {
var e = new FormData();
e.append("photo", t);
var n = o({
method: "POST",
url: "/imgur/upload",
body: e,
noDocumentEvents: !0,
normalStatuses: [ 200, 400 ]
});
n.addEventListener("loadstart", function() {
f.start(), c();
}), n.addEventListener("loadend", function() {
f.stop(), u();
}), n.addEventListener("success", function(t) {
400 == n.status ? new s.Error("Неверный тип файла или изображение повреждено.") : r(t.result);
});
}
var n = t.elem, r = t.onSuccess, c = t.onLoadStart, u = t.onLoadEnd, l = n.querySelector("a"), h = n.querySelector("i");
n.querySelector("input");
l.onclick = function(t) {
t.preventDefault(), i({
minSize: 160,
onSuccess: e
});
};
var f = new a({
elem: h,
size: "small"
});
}
var i = n(508), s = n(486), o = n(494), a = n(489);
t.exports = r;
},
508: function(t, e, n) {
"use strict";
var r = n(486), i = n(509);
t.exports = function(t) {
var e = t.minSize, n = t.onSuccess, s = document.createElement("input");
s.type = "file", s.accept = "image/*", s.onchange = function() {
s.remove();
var t = new FileReader(), o = s.files[0];
t.onload = function(t) {
var s = new Image();
s.onload = function() {
s.height < e || s.width < e ? new r.Error("Изображение должно иметь размер " + e + "x" + e + " или больше") : i(s, function(t) {
n(t);
});
}, s.onerror = function() {
new r.Error("Ошибка при загрузке или изображдение повреждено.");
}, s.src = t.target.result;
}, t.readAsDataURL(o);
}, s.hidden = !0, document.body.appendChild(s), s.click();
};
},
509: function(t, e, n) {
"use strict";
var r = n(492), i = n(169), s = n(497), o = n(510);
n(124), t.exports = function(t, e) {
function n() {
var n = h.getCanvasSelection();
if (n) {
var r = document.createElement("canvas");
r.width = n.size, r.height = n.size;
var i = r.getContext("2d");
i.drawImage(n.source, n.x, n.y, n.size, n.size, 0, 0, n.size, n.size), i.globalCompositeOperation = "destination-over", 
i.fillStyle = "rgb(255,255,255)", i.fillRect(0, 0, r.width, r.height), a.remove(), 
r.toBlob(function(t) {
e(t);
}, t.src.startsWith("data:image/png") ? "image/png" : "image/jpeg");
}
}
var a = new r();
a.setContent(s(i));
var c = a.elem.querySelector(".photo-cut__canvas");
c.focus();
for (var u = a.elem.querySelectorAll(".photo-cut__selection-canvas"), l = 0; l < u.length; l++) u[l].width = u[l].offsetWidth, 
u[l].height = u[l].offsetHeight;
var h = new o(c, {
maxImageSize: 300
});
h.setImage(t), c.addEventListener("selection", function(t) {
for (var e = h.getCanvasSelection(), n = 0; n < u.length; n++) {
var r = u[n];
r.getContext("2d").clearRect(0, 0, r.width, r.height), e && r.getContext("2d").drawImage(e.source, e.x, e.y, e.size, e.size, 0, 0, r.width, r.height);
}
}), h.setSelection({
x: .1 * c.width,
size: .8 * Math.min(h.width, h.height),
y: .1 * c.height
}), a.elem.querySelector('[data-action="rotate-right"]').addEventListener("click", function() {
return h.rotate(1);
}), a.elem.querySelector("[data-form]").addEventListener("submit", function(t) {
t.preventDefault(), n();
}), c.addEventListener("submit", function(t) {
n();
});
};
},
510: function(t, e, n) {
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
}(), s = n(511), o = function() {
function t(e) {
var n = this, i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], s = i.maxImageSize;
r(this, t), this.maxImageSize = s || 200, this.canvas = e, this.canvas.onmousedown = function(t) {
return n.onMouseDown(t);
}, this.canvas.onkeydown = function(t) {
return n.onKeyDown(t);
}, document.addEventListener("mouseup", function(t) {
return n.onMouseUp(t);
}), document.addEventListener("mousemove", function(t) {
return n.onMouseMove(t);
}), this.ctx = e.getContext("2d"), this.state = !1, this.mouseDownShift = null, 
this.selectionStartCoords = null, this.rotation = 0, this.selection = null, this.cornerSize = 5;
}
return i(t, [ {
key: "setImage",
value: function(t) {
this.img = t, this.scale = Math.min(this.maxImageSize / t.width, this.maxImageSize / t.height), 
this.fullImageCanvas = document.createElement("canvas"), this.fullImageCtx = this.fullImageCanvas.getContext("2d"), 
this.renderFullImageRotated(), this.render();
}
}, {
key: "getEventCoordsRelativeCanvasImage",
value: function(t) {
var e = {
x: t.clientX - this.canvas.getBoundingClientRect().left - this.cornerSize,
y: t.clientY - this.canvas.getBoundingClientRect().top - this.cornerSize
};
return e.x <= .5 && (e.x = 0), e.x >= this.width - .5 && (e.x = this.width), e.y <= .5 && (e.y = 0), 
e.y >= this.height - .5 && (e.y = this.height), e;
}
}, {
key: "onKeyDown",
value: function(t) {
this.selection && (13 == t.keyCode && this.canvas.dispatchEvent(new CustomEvent("submit")), 
40 == t.keyCode && (this.selection.bottom < this.height && this.setSelection({
y: this.selection.y + 1
}), t.preventDefault()), 38 == t.keyCode && (this.selection.y > 0 && this.setSelection({
y: this.selection.y - 1
}), t.preventDefault()), 37 == t.keyCode && (this.selection.x > 0 && this.setSelection({
x: this.selection.x - 1
}), t.preventDefault()), 39 == t.keyCode && (this.selection.right < this.width && this.setSelection({
x: this.selection.x + 1
}), t.preventDefault()));
}
}, {
key: "onMouseDown",
value: function(t) {
t.preventDefault();
var e = this.getEventCoordsRelativeCanvasImage(t), n = this.findCoordsInSelection(e);
switch (n) {
case "inside":
this.state = "moving", this.mouseDownShift = {
x: e.x - this.selection.x,
y: e.y - this.selection.y
};
break;

case "outside":
this.setSelection(null), this.state = "selecting", this.selectionStartCoords = e;
break;

case "nw":
case "ne":
case "sw":
case "se":
this.state = "modifying";
break;

default:
throw Error("Must never reach here");
}
}
}, {
key: "findCoordsInSelection",
value: function(t) {
return this.selection ? Math.abs(t.x - this.selection.x) < this.cornerSize && Math.abs(t.y - this.selection.y) < this.cornerSize ? "nw" : Math.abs(t.x - this.selection.x) < this.cornerSize && Math.abs(t.y - this.selection.bottom) < this.cornerSize ? "sw" : Math.abs(t.x - this.selection.right) < this.cornerSize && Math.abs(t.y - this.selection.bottom) < this.cornerSize ? "se" : Math.abs(t.x - this.selection.right) < this.cornerSize && Math.abs(t.y - this.selection.y) < this.cornerSize ? "ne" : t.x >= this.selection.x && t.x <= this.selection.right && t.y >= this.selection.y && t.y <= this.selection.bottom ? "inside" : "outside" : "outside";
}
}, {
key: "onMouseMove",
value: function(t) {
var e = this.getEventCoordsRelativeCanvasImage(t);
switch (this.state) {
case !1:
this.showCursorAtCoords(e);
break;

case "moving":
this.moveSelection(e);
break;

case "selecting":
this.createSelection(e);
break;

case "modifying":
this.modifySelection(e);
break;

default:
throw Error("Must never reach here");
}
}
}, {
key: "showCursorAtCoords",
value: function(t) {
var e = this.findCoordsInSelection(t);
"outside" == e ? this.canvas.style.cursor = "crosshair" : "inside" == e ? this.canvas.style.cursor = "move" : this.canvas.style.cursor = e + "-resize";
}
}, {
key: "modifySelection",
value: function(t) {
var e = this.selection.center, n = t.x < e.x && t.y < e.y ? "nw" : t.x < e.x && t.y >= e.y ? "sw" : t.x > e.x && t.y < e.y ? "ne" : "se";
switch (n) {
case "nw":
this.selectionStartCoords = {
x: this.selection.right,
y: this.selection.bottom
};
break;

case "ne":
this.selectionStartCoords = {
x: this.selection.x,
y: this.selection.bottom
};
break;

case "sw":
this.selectionStartCoords = {
x: this.selection.right,
y: this.selection.y
};
break;

case "se":
this.selectionStartCoords = {
x: this.selection.x,
y: this.selection.y
};
}
this.createSelection(t);
}
}, {
key: "moveSelection",
value: function(t) {
var e = Math.min(t.x - this.mouseDownShift.x, this.width - this.selection.size), n = Math.min(t.y - this.mouseDownShift.y, this.height - this.selection.size);
0 > e && (e = 0), 0 > n && (n = 0), this.setSelection({
x: e,
y: n,
size: this.selection.size
}), this.canvas.style.cursor = "move";
}
}, {
key: "setSelection",
value: function(t) {
t ? (t = Object.create(t), this.selection && (void 0 === t.x && (t.x = this.selection.x), 
void 0 === t.y && (t.y = this.selection.y), void 0 === t.size && (t.size = this.selection.size)), 
this.selection = new s(t)) : this.selection = null, this.render(), this.canvas.dispatchEvent(new CustomEvent("selection", {
bubbles: !0
}));
}
}, {
key: "createSelection",
value: function(t) {
var e = Math.max(Math.abs(this.selectionStartCoords.x - t.x), Math.abs(this.selectionStartCoords.y - t.y)), n = {};
t.x >= this.selectionStartCoords.x ? t.y >= this.selectionStartCoords.y ? (this.canvas.style.cursor = "se-resize", 
n.size = Math.min(e, this.height - this.selectionStartCoords.y, this.width - this.selectionStartCoords.x), 
n.x = this.selectionStartCoords.x, n.y = this.selectionStartCoords.y) : (this.canvas.style.cursor = "ne-resize", 
n.size = Math.min(e, this.selectionStartCoords.y, this.width - this.selectionStartCoords.x), 
n.x = this.selectionStartCoords.x, n.y = this.selectionStartCoords.y - n.size) : t.y >= this.selectionStartCoords.y ? (this.canvas.style.cursor = "sw-resize", 
n.size = Math.min(e, this.selectionStartCoords.x, this.height - this.selectionStartCoords.y), 
n.x = this.selectionStartCoords.x - n.size, n.y = this.selectionStartCoords.y) : (this.canvas.style.cursor = "nw-resize", 
n.size = Math.min(e, this.selectionStartCoords.x, this.selectionStartCoords.y), 
n.x = this.selectionStartCoords.x - n.size, n.y = this.selectionStartCoords.y - n.size), 
this.setSelection(n);
}
}, {
key: "onMouseUp",
value: function(t) {
this.state && (this.state = !1, this.selection && this.selection.size < 2 * this.cornerSize + 2 && this.setSelection(null), 
this.render());
}
}, {
key: "renderFullImageRotated",
value: function() {
this.rotation % 2 === 0 ? (this.fullImageCanvas.width = this.img.width, this.fullImageCanvas.height = this.img.height) : (this.fullImageCanvas.height = this.img.width, 
this.fullImageCanvas.width = this.img.height), this.fullImageCtx.translate(this.fullImageCanvas.width / 2, this.fullImageCanvas.height / 2), 
this.fullImageCtx.rotate(this.rotation * Math.PI / 2), this.fullImageCtx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2, this.img.width, this.img.height), 
this.fullImageCtx.rotate(-this.rotation * Math.PI / 2), this.fullImageCtx.translate(-this.fullImageCanvas.width / 2, -this.fullImageCanvas.heigh / 2);
}
}, {
key: "rotate",
value: function() {
this.rotation++, this.state = !1, this.renderFullImageRotated(), this.render(), 
this.selection && this.setSelection({
x: this.width - this.selection.bottom,
y: this.selection.x
}), this.canvas.focus();
}
}, {
key: "render",
value: function() {
if (this.width = this.fullImageCanvas.width * this.scale, this.height = this.fullImageCanvas.height * this.scale, 
this.canvas.width = this.width + 2 * this.cornerSize, this.canvas.height = this.height + 2 * this.cornerSize, 
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.translate(this.cornerSize, this.cornerSize), 
this.ctx.drawImage(this.fullImageCanvas, 0, 0, this.width, this.height), this.selection && this.selection.size) {
var t = Math.floor(this.selection.x), e = Math.floor(this.selection.y), n = Math.ceil(this.selection.size);
this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)", this.ctx.fillRect(0, 0, this.width, e), 
this.ctx.fillRect(0, e, t, this.height - e), this.ctx.fillRect(t + n, e, this.width - (t + n), n), 
this.ctx.fillRect(t, e + n, this.width - t, this.height - (e + n)), this.renderCorner("nw"), 
this.renderCorner("ne"), this.renderCorner("sw"), this.renderCorner("se");
}
this.ctx.translate(-this.cornerSize, -this.cornerSize);
}
}, {
key: "renderCorner",
value: function(t) {
var e;
switch (t) {
case "nw":
e = {
x: this.selection.x - this.cornerSize,
y: this.selection.y - this.cornerSize
};
break;

case "ne":
e = {
x: this.selection.right - this.cornerSize,
y: this.selection.y - this.cornerSize
};
break;

case "sw":
e = {
x: this.selection.x - this.cornerSize,
y: this.selection.bottom - this.cornerSize
};
break;

case "se":
e = {
x: this.selection.right - this.cornerSize,
y: this.selection.bottom - this.cornerSize
};
}
e.width = 2 * this.cornerSize, e.height = 2 * this.cornerSize, this.state ? ("modifying" == this.state || "selecting" == this.state) && this.selectionStartCoords.x >= e.x && this.selectionStartCoords.y >= e.y && this.selectionStartCoords.x <= e.x + e.width && this.selectionStartCoords.y <= e.y + e.height ? this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)" : this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)" : this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)", 
this.ctx.fillRect(e.x, e.y, e.width, e.height);
}
}, {
key: "getCanvasSelection",
value: function() {
return this.selection ? {
source: this.fullImageCanvas,
x: this.selection.x / this.scale,
y: this.selection.y / this.scale,
size: this.selection.size / this.scale
} : null;
}
} ]), t;
}();
t.exports = o;
},
511: function(t, e) {
"use strict";
function n(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var r = function() {
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
}(), i = function() {
function t(e) {
var r = e.x, i = e.y, s = e.size;
n(this, t), this.x = r, this.y = i, this.size = s;
}
return r(t, [ {
key: "bottom",
get: function() {
return this.y + this.size;
}
}, {
key: "right",
get: function() {
return this.x + this.size;
}
}, {
key: "center",
get: function() {
return {
x: this.x + this.size / 2,
y: this.y + this.size / 2
};
}
} ]), t;
}();
t.exports = i;
}
});
//# sourceMappingURL=coursesParticipantDetails.095c9014a0ff31888218.js.map
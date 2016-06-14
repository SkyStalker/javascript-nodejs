var screencast = webpackJsonp_name_([ 27 ], {
0: function(t, n, e) {
"use strict";
function r() {
i(), o();
}
function o() {
var t = document.querySelector("[data-newsletter-subscribe-form]");
t && (t.onsubmit = function(n) {
n.preventDefault(), l.submitSubscribeForm(t);
});
}
function i() {
for (var t = document.querySelectorAll("li[data-mnemo]"), n = 0; n < t.length; n++) {
var e = t[n], r = e.getAttribute("data-mnemo");
e.insertAdjacentHTML("beforeEnd", '<div class="lessons-list__download"><div class="lessons-list__popup"><ul class="lessons-list__popup-list"><li class="lessons-list__popup-item"><a data-track-outbound href="/screencast/' + window.SCREENCAST_SLUG + "/mp4-low/" + r + '.mp4">Компактный размер</a></li><li class="lessons-list__popup-item"><a data-track-outbound href="/screencast/' + window.SCREENCAST_SLUG + "/mp4/" + r + '.mp4">Высокое качество</a></li></ul></div></div>');
}
for (var o = document.querySelectorAll("a[data-video-id]"), n = 0; n < o.length; n++) {
var i = o[n];
i.href = "//www.youtube.com/watch?v=" + i.getAttribute("data-video-id"), i.onclick = function(t) {
t.preventDefault();
var n = this.getAttribute("data-video-id");
window.ga("send", "event", window.SCREENCAST_SLUG, "open", n), c(n);
};
}
}
function c(t) {
for (var n = [ {
width: 0,
height: 0
}, {
width: 640,
height: 360
}, {
width: 853,
height: 480
}, {
width: 1280,
height: 720
} ], e = 0; e < n.length && !(document.documentElement.clientHeight < n[e].height || document.documentElement.clientWidth < n[e].width); e++) ;
e--;
var r = n[e].width, o = n[e].height;
if (0 === e) window.location.href = "//www.youtube.com/watch?v=" + t; else {
var i = new s();
if (i.setContent('<div id="player"></div>'), i.elem.addEventListener("modal-remove", function() {
u && (u.destroy(), u = null);
}), window.YT) a(t, r, o); else {
var c = document.createElement("script");
c.src = "https://www.youtube.com/iframe_api", document.head.appendChild(c), window.onYouTubeIframeAPIReady = function() {
a(t, r, o), delete window.onYouTubeIframeAPIReady;
};
}
}
}
function a(t, n, e) {
u && u.destroy(), u = new window.YT.Player("player", {
height: e,
width: n,
videoId: t,
events: {
onReady: function() {
u.playVideo();
},
onStateChange: function(r) {
document.querySelectorAll("[data-video-id]");
if (1 == r.data && (u.videoId = t), 0 == r.data) for (var o = document.querySelectorAll("[data-video-id]"), i = 0; i < o.length; i++) {
var c = o[i];
if (c.getAttribute("data-video-id") == u.videoId) {
var s = o[i + 1] && o[i + 1].getAttribute("data-video-id");
s && a(s, n, e);
break;
}
}
}
}
});
}
e(349);
var u, s = e(636), l = (e(641), e(650));
e(761);
r();
},
116: function(t, n) {},
349: function(t, n) {},
638: function(t, n, e) {
"use strict";
function r(t) {
function n(t, n) {
var e = new CustomEvent(t);
return e.originalEvent = n, e;
}
function e(t, e) {
var r = n("fail", e);
r.reason = t, o.dispatchEvent(r);
}
function r(t, e) {
var r = n("success", e);
r.result = t, o.dispatchEvent(r);
}
var o = new XMLHttpRequest(), c = t.method || "GET", a = t.body, u = t.url;
o.open(c, u, !t.sync), o.method = c;
var s = i();
s && !t.skipCsrf && o.setRequestHeader("X-XSRF-TOKEN", s), "[object Object]" == {}.toString.call(a) && (o.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
a = JSON.stringify(a)), t.noDocumentEvents || (o.addEventListener("loadstart", function(t) {
o.timeStart = Date.now();
var e = n("xhrstart", t);
document.dispatchEvent(e);
}), o.addEventListener("loadend", function(t) {
var e = n("xhrend", t);
document.dispatchEvent(e);
}), o.addEventListener("success", function(t) {
var e = n("xhrsuccess", t);
e.result = t.result, document.dispatchEvent(e);
}), o.addEventListener("fail", function(t) {
var e = n("xhrfail", t);
e.reason = t.reason, document.dispatchEvent(e);
})), t.raw || o.setRequestHeader("Accept", "application/json"), o.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var l = t.normalStatuses || [ 200 ];
return o.addEventListener("error", function(t) {
e("Ошибка связи с сервером.", t);
}), o.addEventListener("timeout", function(t) {
e("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), o.addEventListener("abort", function(t) {
e("Запрос был прерван.", t);
}), o.addEventListener("load", function(n) {
if (!o.status) return void e("Не получен ответ от сервера.", n);
if (-1 == l.indexOf(o.status)) return void e("Ошибка на стороне сервера (код " + o.status + "), попытайтесь позднее.", n);
var i = o.responseText, c = o.getResponseHeader("Content-Type");
if (c.match(/^application\/json/) || t.json) try {
i = JSON.parse(i);
} catch (n) {
return void e("Некорректный формат ответа от сервера.", n);
}
r(i, n);
}), setTimeout(function() {
o.send(a);
}, 0), o;
}
var o = e(630), i = e(639);
document.addEventListener("xhrfail", function(t) {
new o.Error(t.reason);
}), t.exports = r;
},
639: function(t, n) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
640: function(t, n, e) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function o(t) {
return (Array.isArray(t) ? t.map(o) : t && "object" === (void 0 === t ? "undefined" : a(t)) ? Object.keys(t).filter(function(n) {
return t[n];
}) : [ t ]).filter(r).join(" ");
}
function i(t) {
return u[t] || t;
}
function c(t) {
var n = (t + "").replace(s, i);
return n === "" + t ? t : n;
}
var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
};
n.merge = function l(t, n) {
if (1 === arguments.length) {
for (var e = t[0], o = 1; o < t.length; o++) e = l(e, t[o]);
return e;
}
var i = t.class, c = n.class;
(i || c) && (i = i || [], c = c || [], Array.isArray(i) || (i = [ i ]), Array.isArray(c) || (c = [ c ]), 
t.class = i.concat(c).filter(r));
for (var a in n) "class" != a && (t[a] = n[a]);
return t;
}, n.joinClasses = o, n.cls = function(t, e) {
for (var r = [], i = 0; i < t.length; i++) e && e[i] ? r.push(n.escape(o([ t[i] ]))) : r.push(o(t[i]));
var c = o(r);
return c.length ? ' class="' + c + '"' : "";
}, n.style = function(t) {
return t && "object" === (void 0 === t ? "undefined" : a(t)) ? Object.keys(t).map(function(n) {
return n + ":" + t[n];
}).join(";") : t;
}, n.attr = function(t, e, r, o) {
return "style" === t && (e = n.style(e)), "boolean" == typeof e || null == e ? e ? " " + (o ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof e ? (-1 !== JSON.stringify(e).indexOf("&"), 
e && "function" == typeof e.toISOString, " " + t + "='" + JSON.stringify(e).replace(/'/g, "&apos;") + "'") : r ? (e && "function" == typeof e.toISOString, 
" " + t + '="' + n.escape(e) + '"') : (e && "function" == typeof e.toISOString, 
" " + t + '="' + e + '"');
}, n.attrs = function(t, e) {
var r = [], i = Object.keys(t);
if (i.length) for (var c = 0; c < i.length; ++c) {
var a = i[c], u = t[a];
"class" == a ? (u = o(u)) && r.push(" " + a + '="' + u + '"') : r.push(n.attr(a, u, !1, e));
}
return r.join("");
};
var u = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, s = /[&<>"]/g;
n.escape = c, n.rethrow = function f(t, n, r, o) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && n || o)) throw t.message += " on line " + r, 
t;
try {
o = o || e(116).readFileSync(n, "utf8");
} catch (i) {
f(t, null, r);
}
var c = 3, a = o.split("\n"), u = Math.max(r - c, 0), s = Math.min(a.length, r + c), c = a.slice(u, s).map(function(t, n) {
var e = n + u + 1;
return (e == r ? "  > " : "    ") + e + "| " + t;
}).join("\n");
throw t.path = n, t.message = (n || "Jade") + ":" + r + "\n" + c + "\n\n" + t.message, 
t;
}, n.DebugItem = function(t, n) {
this.lineno = t, this.filename = n;
};
},
641: function(t, n, e) {
"use strict";
function r(t) {
t.bem = o, t.t = a, t.thumb = i, t.lang = c;
}
var o = e(642)(), i = e(643).thumb, c = e(644).lang, a = e(645);
t.exports = function(t, n) {
return n = n ? Object.create(n) : {}, r(n), t(n);
};
},
642: function(t, n, e) {
"use strict";
var r = e(640);
t.exports = function(t) {
function n(t, n, e, o, i) {
var c = i || "div";
switch (c) {
case "img":
e.alt && !e.title && (e.title = ""), e.title && !e.alt && (e.alt = e.title), e.alt || (e.alt = "");
break;

case "input":
e.type || (e.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
e.href || (e.href = "#");
}
t.push("<" + c + r.attrs(r.merge([ e ]), !0) + ">"), n && n(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(c) && t.push("</" + c + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(e, r, o, i) {
var c = this.block, a = this.attributes || {};
if (!a.class && o && !i) throw Error("Block without class: " + o);
if (a.class) {
var u = a.class;
u instanceof Array && (u = u.join(" ")), u = u.split(" ");
var s;
try {
s = u[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + u[0]);
}
i ? u[0] = r[r.length - 1] + t.element + u[0] : r[r.length] = s;
var f = (i ? r[r.length - 1] + t.element : "") + s;
-1 === u.indexOf(f) && (u[u.length] = f);
for (var p = 0; p < u.length; p++) {
var h = u[p];
h.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? u[p] = f + h : h.match(RegExp("^" + t.element)) && (r[r.length - 2] ? u[p] = r[r.length - 2] + h : u[p] = r[r.length - 1] + h), 
u[p].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (u[p] = t.prefix + u[p]);
}
a.class = u.sort().join(" ");
}
n(e, c, a, r, o), i || r.pop();
};
};
},
643: function(t, n) {
"use strict";
n.thumb = function(t, n, e) {
if (!t) return t;
var r = window.devicePixelRatio;
n *= r, e *= r;
var o = 160 >= n && 160 >= e ? "t" : 320 >= n && 320 >= e ? "m" : 640 >= n && 640 >= e ? "i" : 1024 >= n && 1024 >= e ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + o + t.slice(t.lastIndexOf("."));
};
},
644: function(t, n, e) {
"use strict";
t.exports = {
lang: "ru"
};
},
645: function(t, n, e) {
"use strict";
function r() {
for (var t = [ c ], n = 0; n < arguments.length; n++) t.push(arguments[n]);
return i.t.apply(i, t);
}
var o = e(646), i = new o("en"), c = e(644).lang, a = {};
r.i18n = i, r.requirePhrase = function(t, n) {
a[t] && -1 != a[t].indexOf(n) || (a[t] || (a[t] = []), a[t].push(n), i.addPhrase(c, t, n));
}, t.exports = r;
},
646: function(t, n, e) {
"use strict";
t.exports = e(647);
},
647: function(t, n, e) {
"use strict";
function r(t) {
return Object.prototype.toString.call(t);
}
function o(t) {
return "[object String]" === r(t);
}
function i(t) {
return !isNaN(t) && isFinite(t);
}
function c(t) {
return t === !0 || t === !1;
}
function a(t) {
return "[object Function]" === r(t);
}
function u(t) {
return "[object Object]" === r(t);
}
function s(t, n, e) {
if (null !== t) if (F && t.forEach === F) t.forEach(n, e); else if (t.length === +t.length) for (var r = 0, o = t.length; o > r; r += 1) n.call(e, t[r], r, t); else for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && n.call(e, t[i], i, t);
}
function l(t) {
var n = 1, e = arguments, r = e.length, o = (t + "").replace(x, function(t) {
if ("%%" === t) return "%";
if (n >= r) return t;
switch (t) {
case "%s":
return e[n++] + "";

case "%d":
return +e[n++];

case "%j":
return JSON.stringify(e[n++]);

default:
return t;
}
});
return o;
}
function f(t) {
var n = {};
return s(t || {}, function(t, e) {
return t && "object" === (void 0 === t ? "undefined" : g(t)) ? void s(f(t), function(t, r) {
n[e + "." + r] = t;
}) : void (n[e] = t);
}), n;
}
function p(t, n) {
return t + A + n;
}
function h(t, n, e) {
var r = p(n, e), o = t._storage;
if (o.hasOwnProperty(r)) return r;
if (n === t._defaultLocale) return null;
var i = t._fallbacks_cache;
if (i.hasOwnProperty(r)) return i[r];
for (var c, a = t._fallbacks[n] || [ t._defaultLocale ], u = 0, s = a.length; s > u; u++) if (c = p(a[u], e), 
o.hasOwnProperty(c)) return i[r] = c, i[r];
return i[r] = null, null;
}
function d(t, n, e) {
var r = b.indexOf(t, n);
return -1 === r ? l('[pluralizer for "%s" locale not found]', t) : void 0 === e[r] ? l('[plural form %d ("%s") not found in translation]', r, b.forms(t)[r]) : e[r];
}
function v(t) {
return this instanceof v ? (this._defaultLocale = t ? t + "" : _, this._fallbacks = {}, 
this._fallbacks_cache = {}, this._storage = {}, void (this._plurals_cache = {})) : new v(t);
}
function m(t, n, e) {
var r, o, i, c, a, u;
return E.test(n) ? (r = y.parse(n), 1 === r.length && "literal" === r[0].type ? r[0].text : (t._plurals_cache[e] || (t._plurals_cache[e] = new v(e)), 
u = t._plurals_cache[e], o = [], o.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
o.push("params = flatten(params);"), s(r, function(t) {
if ("literal" === t.type) return void o.push(l("str += %j;", t.text));
if ("variable" === t.type) return i = t.anchor, void o.push(l('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', i, i, i));
if ("plural" !== t.type) throw Error("Unknown node type");
i = t.anchor, c = {}, s(t.strict, function(n, r) {
var o = y.parse(n);
return 1 === o.length && "literal" === o[0].type ? (c[r] = !1, void (t.strict[r] = o[0].text)) : (c[r] = !0, 
void (u.hasPhrase(e, n, !0) || u.addPhrase(e, n, n)));
}), a = {}, s(t.forms, function(n, r) {
var o, i = y.parse(n);
return 1 === i.length && "literal" === i[0].type ? (o = i[0].text, t.forms[r] = o, 
void (a[o] = !1)) : (a[n] = !0, void (u.hasPhrase(e, n, !0) || u.addPhrase(e, n, n)));
}), o.push(l("loc = %j;", e)), o.push(l("loc_plzr = %j;", e.split(/[-_]/)[0])), 
o.push(l("anchor = params[%j];", i)), o.push(l("cache = this._plurals_cache[loc];")), 
o.push(l("strict = %j;", t.strict)), o.push(l("strict_exec = %j;", c)), o.push(l("forms = %j;", t.forms)), 
o.push(l("forms_exec = %j;", a)), o.push("if (+(anchor) != anchor) {"), o.push(l('  str += "[invalid plurals amount: %s(" + anchor + ")]";', i)), 
o.push("} else {"), o.push("  if (strict[anchor] !== undefined) {"), o.push("    plrl = strict[anchor];"), 
o.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), o.push("  } else {"), 
o.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), o.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
o.push("  }"), o.push("}");
}), o.push("return str;"), Function("params", "flatten", "pluralizer", o.join("\n")))) : n;
}
var g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
}, y = e(648), b = e(649), w = Array.isArray || function(t) {
return "[object Array]" === r(t);
}, F = Array.prototype.forEach, x = /%[sdj%]/g, _ = "en", A = "#@$";
v.prototype.addPhrase = function(t, n, e, r) {
var a, l = this;
if (c(r)) a = r ? 1 / 0 : 0; else if (i(r)) {
if (a = Math.floor(r), 0 > a) throw new TypeError("Invalid flatten level (should be >= 0).");
} else a = 1 / 0;
if (u(e) && a > 0) return s(e, function(e, r) {
l.addPhrase(t, (n ? n + "." : "") + r, e, a - 1);
}), this;
if (o(e)) this._storage[p(t, n)] = {
translation: e,
locale: t,
raw: !1
}; else {
if (!(w(e) || i(e) || c(e) || 0 === a && u(e))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[p(t, n)] = {
translation: e,
locale: t,
raw: !0
};
}
return l._fallbacks_cache = {}, this;
}, v.prototype.setFallback = function(t, n) {
var e = this._defaultLocale;
if (e === t) throw Error("Default locale can't have fallbacks");
var r = w(n) ? n.slice() : [ n ];
return r[r.length - 1] !== e && r.push(e), this._fallbacks[t] = r, this._fallbacks_cache = {}, 
this;
};
var E = /#\{|\(\(|\\\\/;
v.prototype.translate = function(t, n, e) {
var r, c = h(this, t, n);
return c ? (r = this._storage[c], r.raw ? r.translation : (r.hasOwnProperty("compiled") || (r.compiled = m(this, r.translation, r.locale)), 
a(r.compiled) ? ((i(e) || o(e)) && (e = {
count: e,
value: e
}), r.compiled.call(this, e, f, d)) : r.compiled)) : t + ": No translation for [" + n + "]";
}, v.prototype.hasPhrase = function(t, n, e) {
return e ? this._storage.hasOwnProperty(p(t, n)) : !!h(this, t, n);
}, v.prototype.getLocale = function(t, n, e) {
if (e) return this._storage.hasOwnProperty(p(t, n)) ? t : null;
var r = h(this, t, n);
return r ? r.split(A, 2)[0] : null;
}, v.prototype.t = v.prototype.translate, v.prototype.stringify = function(t) {
var n = this, e = {};
s(this._storage, function(t, n) {
e[n.split(A)[1]] = !0;
});
var r = {};
s(e, function(e, o) {
var i = h(n, t, o);
if (i) {
var c = n._storage[i].locale;
r[c] || (r[c] = {}), r[c][o] = n._storage[i].translation;
}
});
var o = {
fallback: {},
locales: r
}, i = (n._fallbacks[t] || []).slice(0, -1);
return i.length && (o.fallback[t] = i), JSON.stringify(o);
}, v.prototype.load = function(t) {
var n = this;
return o(t) && (t = JSON.parse(t)), s(t.locales, function(t, e) {
s(t, function(t, r) {
n.addPhrase(e, r, t, 0);
});
}), s(t.fallback, function(t, e) {
n.setFallback(e, t);
}), this;
}, t.exports = v;
},
648: function(t, n) {
"use strict";
t.exports = function() {
function t(t, n) {
function e() {
this.constructor = t;
}
e.prototype = n.prototype, t.prototype = new e();
}
function n(t, n, e, r, o, i) {
this.message = t, this.expected = n, this.found = e, this.offset = r, this.line = o, 
this.column = i, this.name = "SyntaxError";
}
function e(t) {
function e() {
return t.substring(gt, mt);
}
function r(n) {
function e(n, e, r) {
var o, i;
for (o = e; r > o; o++) i = t.charAt(o), "\n" === i ? (n.seenCR || n.line++, n.column = 1, 
n.seenCR = !1) : "\r" === i || "\u2028" === i || "\u2029" === i ? (n.line++, n.column = 1, 
n.seenCR = !0) : (n.column++, n.seenCR = !1);
}
return yt !== n && (yt > n && (yt = 0, bt = {
line: 1,
column: 1,
seenCR: !1
}), e(bt, yt, n), yt = n), bt;
}
function o(t) {
wt > mt || (mt > wt && (wt = mt, Ft = []), Ft.push(t));
}
function i(e, o, i) {
function c(t) {
var n = 1;
for (t.sort(function(t, n) {
return t.description < n.description ? -1 : t.description > n.description ? 1 : 0;
}); n < t.length; ) t[n - 1] === t[n] ? t.splice(n, 1) : n++;
}
function a(t, n) {
function e(t) {
function n(t) {
return t.charCodeAt(0).toString(16).toUpperCase();
}
return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(t) {
return "\\x0" + n(t);
}).replace(/[\x10-\x1F\x80-\xFF]/g, function(t) {
return "\\x" + n(t);
}).replace(/[\u0180-\u0FFF]/g, function(t) {
return "\\u0" + n(t);
}).replace(/[\u1080-\uFFFF]/g, function(t) {
return "\\u" + n(t);
});
}
var r, o, i, c = Array(t.length);
for (i = 0; i < t.length; i++) c[i] = t[i].description;
return r = t.length > 1 ? c.slice(0, -1).join(", ") + " or " + c[t.length - 1] : c[0], 
o = n ? '"' + e(n) + '"' : "end of input", "Expected " + r + " but " + o + " found.";
}
var u = r(i), s = i < t.length ? t.charAt(i) : null;
return null !== o && c(o), new n(null !== e ? e : a(o, s), o, s, i, u.line, u.column);
}
function c() {
var t, n;
for (t = [], n = v(), n === F && (n = a(), n === F && (n = p())); n !== F; ) t.push(n), 
n = v(), n === F && (n = a(), n === F && (n = p()));
return t;
}
function a() {
var n, e, r, i, c;
return n = mt, t.substr(mt, 2) === E ? (e = E, mt += 2) : (e = F, 0 === xt && o(k)), 
e !== F ? (r = u(), r !== F ? (t.substr(mt, 2) === S ? (i = S, mt += 2) : (i = F, 
0 === xt && o(j)), i !== F ? (c = f(), c === F && (c = O), c !== F ? (gt = n, e = C(r, c), 
n = e) : (mt = n, n = A)) : (mt = n, n = A)) : (mt = n, n = A)) : (mt = n, n = A), 
n;
}
function u() {
var n, e, r, i;
return n = mt, e = s(), e !== F ? (124 === t.charCodeAt(mt) ? (r = R, mt++) : (r = F, 
0 === xt && o(L)), r !== F ? (i = u(), i !== F ? (gt = n, e = T(e, i), n = e) : (mt = n, 
n = A)) : (mt = n, n = A)) : (mt = n, n = A), n === F && (n = mt, e = s(), e !== F && (gt = n, 
e = P(e)), n = e), n;
}
function s() {
var n, e, r, i, c, a;
if (n = mt, 61 === t.charCodeAt(mt) ? (e = z, mt++) : (e = F, 0 === xt && o(I)), 
e !== F) {
if (r = [], q.test(t.charAt(mt)) ? (i = t.charAt(mt), mt++) : (i = F, 0 === xt && o(N)), 
i !== F) for (;i !== F; ) r.push(i), q.test(t.charAt(mt)) ? (i = t.charAt(mt), mt++) : (i = F, 
0 === xt && o(N)); else r = A;
if (r !== F) if (32 === t.charCodeAt(mt) ? (i = H, mt++) : (i = F, 0 === xt && o($)), 
i === F && (i = O), i !== F) {
if (c = [], a = l(), a !== F) for (;a !== F; ) c.push(a), a = l(); else c = A;
c !== F ? (gt = n, e = J(r, c), n = e) : (mt = n, n = A);
} else mt = n, n = A; else mt = n, n = A;
} else mt = n, n = A;
if (n === F) {
if (n = mt, e = [], r = l(), r !== F) for (;r !== F; ) e.push(r), r = l(); else e = A;
e !== F && (gt = n, e = U()), n = e;
}
return n;
}
function l() {
var n, e, r;
return n = mt, 92 === t.charCodeAt(mt) ? (e = B, mt++) : (e = F, 0 === xt && o(D)), 
e !== F ? (M.test(t.charAt(mt)) ? (r = t.charAt(mt), mt++) : (r = F, 0 === xt && o(G)), 
r !== F ? (gt = n, e = X(r), n = e) : (mt = n, n = A)) : (mt = n, n = A), n === F && (n = mt, 
e = mt, xt++, 124 === t.charCodeAt(mt) ? (r = R, mt++) : (r = F, 0 === xt && o(L)), 
r === F && (t.substr(mt, 2) === S ? (r = S, mt += 2) : (r = F, 0 === xt && o(j))), 
xt--, r === F ? e = Z : (mt = e, e = A), e !== F ? (t.length > mt ? (r = t.charAt(mt), 
mt++) : (r = F, 0 === xt && o(Y)), r !== F ? (gt = n, e = W(), n = e) : (mt = n, 
n = A)) : (mt = n, n = A)), n;
}
function f() {
var n, e, r;
return n = mt, 58 === t.charCodeAt(mt) ? (e = K, mt++) : (e = F, 0 === xt && o(V)), 
e !== F ? (r = h(), r !== F ? (gt = n, e = Q(r), n = e) : (mt = n, n = A)) : (mt = n, 
n = A), n;
}
function p() {
var n, e, r, i;
return n = mt, t.substr(mt, 2) === tt ? (e = tt, mt += 2) : (e = F, 0 === xt && o(nt)), 
e !== F ? (r = h(), r !== F ? (125 === t.charCodeAt(mt) ? (i = et, mt++) : (i = F, 
0 === xt && o(rt)), i !== F ? (gt = n, e = ot(r), n = e) : (mt = n, n = A)) : (mt = n, 
n = A)) : (mt = n, n = A), n;
}
function h() {
var n, e, r, i, c;
if (n = mt, e = d(), e !== F) if (46 === t.charCodeAt(mt) ? (r = it, mt++) : (r = F, 
0 === xt && o(ct)), r !== F) {
if (i = [], c = h(), c !== F) for (;c !== F; ) i.push(c), c = h(); else i = A;
i !== F ? (gt = n, e = at(), n = e) : (mt = n, n = A);
} else mt = n, n = A; else mt = n, n = A;
return n === F && (n = d()), n;
}
function d() {
var n, e, r, i;
if (n = mt, ut.test(t.charAt(mt)) ? (e = t.charAt(mt), mt++) : (e = F, 0 === xt && o(st)), 
e !== F) {
for (r = [], lt.test(t.charAt(mt)) ? (i = t.charAt(mt), mt++) : (i = F, 0 === xt && o(ft)); i !== F; ) r.push(i), 
lt.test(t.charAt(mt)) ? (i = t.charAt(mt), mt++) : (i = F, 0 === xt && o(ft));
r !== F ? (gt = n, e = W(), n = e) : (mt = n, n = A);
} else mt = n, n = A;
return n;
}
function v() {
var t, n, e, r, o;
if (t = mt, n = [], e = mt, r = mt, xt++, o = a(), o === F && (o = p()), xt--, o === F ? r = Z : (mt = r, 
r = A), r !== F ? (o = m(), o !== F ? (gt = e, r = pt(o), e = r) : (mt = e, e = A)) : (mt = e, 
e = A), e !== F) for (;e !== F; ) n.push(e), e = mt, r = mt, xt++, o = a(), o === F && (o = p()), 
xt--, o === F ? r = Z : (mt = r, r = A), r !== F ? (o = m(), o !== F ? (gt = e, 
r = pt(o), e = r) : (mt = e, e = A)) : (mt = e, e = A); else n = A;
return n !== F && (gt = t, n = ht(n)), t = n;
}
function m() {
var n, e, r;
return n = mt, 92 === t.charCodeAt(mt) ? (e = B, mt++) : (e = F, 0 === xt && o(D)), 
e !== F ? (dt.test(t.charAt(mt)) ? (r = t.charAt(mt), mt++) : (r = F, 0 === xt && o(vt)), 
r !== F ? (gt = n, e = X(r), n = e) : (mt = n, n = A)) : (mt = n, n = A), n === F && (t.length > mt ? (n = t.charAt(mt), 
mt++) : (n = F, 0 === xt && o(Y))), n;
}
function g(t) {
for (var n = [], e = 0; e < t.length; e++) void 0 === t[e].strict && n.push(t[e].text);
return n;
}
function y(t) {
for (var n = {}, e = 0; e < t.length; e++) void 0 !== t[e].strict && (n[t[e].strict] = t[e].text);
return n;
}
var b, w = arguments.length > 1 ? arguments[1] : {}, F = {}, x = {
start: c
}, _ = c, A = F, E = "((", k = {
type: "literal",
value: "((",
description: '"(("'
}, S = "))", j = {
type: "literal",
value: "))",
description: '"))"'
}, O = null, C = function(t, n) {
return {
type: "plural",
forms: g(t),
strict: y(t),
anchor: n || "count"
};
}, R = "|", L = {
type: "literal",
value: "|",
description: '"|"'
}, T = function(t, n) {
return [ t ].concat(n);
}, P = function(t) {
return [ t ];
}, z = "=", I = {
type: "literal",
value: "=",
description: '"="'
}, q = /^[0-9]/, N = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, H = " ", $ = {
type: "literal",
value: " ",
description: '" "'
}, J = function(t, n) {
return {
strict: t.join(""),
text: n.join("")
};
}, U = function() {
return {
text: e()
};
}, B = "\\", D = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, M = /^[\\|)(]/, G = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, X = function(t) {
return t;
}, Z = void 0, Y = {
type: "any",
description: "any character"
}, W = function() {
return e();
}, K = ":", V = {
type: "literal",
value: ":",
description: '":"'
}, Q = function(t) {
return t;
}, tt = "#{", nt = {
type: "literal",
value: "#{",
description: '"#{"'
}, et = "}", rt = {
type: "literal",
value: "}",
description: '"}"'
}, ot = function(t) {
return {
type: "variable",
anchor: t
};
}, it = ".", ct = {
type: "literal",
value: ".",
description: '"."'
}, at = function() {
return e();
}, ut = /^[a-zA-Z_$]/, st = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, lt = /^[a-zA-Z0-9_$]/, ft = {
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
}, dt = /^[\\#()|]/, vt = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, mt = 0, gt = 0, yt = 0, bt = {
line: 1,
column: 1,
seenCR: !1
}, wt = 0, Ft = [], xt = 0;
if ("startRule" in w) {
if (!(w.startRule in x)) throw Error("Can't start parsing from rule \"" + w.startRule + '".');
_ = x[w.startRule];
}
if (b = _(), b !== F && mt === t.length) return b;
throw b !== F && mt < t.length && o({
type: "end",
description: "end of input"
}), i(null, Ft, wt);
}
return t(n, Error), {
SyntaxError: n,
parse: e
};
}();
},
649: function(t, n) {
"use strict";
function e(t) {
var n;
return h[t] ? t : (n = t.toLowerCase().replace("_", "-"), h[n] ? n : (n = n.split("-")[0], 
h[n] ? n : null));
}
function r(t) {
var n = e(t);
return h[n] ? h[n].c : null;
}
function o(t, n) {
var r = e(t);
if (!r) return -1;
if (!h[r].cFn) return 0;
var o = n + "", i = o.indexOf(".") < 0 ? "" : o.split(".")[1], c = i.length, a = +n, u = +o.split(".")[0], s = 0 === i.length ? 0 : +i.replace(/0+$/, "");
return h[r].cFn(a, u, c, +i, s);
}
function i(t, n) {
var r = e(t);
return r ? h[r].c[o(r, n)] : null;
}
function c(t) {
var n = e(t);
return h[n] ? h[n].o : null;
}
function a(t, n) {
var r = e(t);
if (!r) return -1;
if (!h[r].oFn) return 0;
var o = n + "", i = o.indexOf(".") < 0 ? "" : o.split(".")[1], c = i.length, a = +n, u = +o.split(".")[0], s = 0 === i.length ? 0 : +i.replace(/0+$/, "");
return h[r].oFn(a, u, c, +i, s);
}
function u(t, n) {
var r = e(t);
return h[r] ? h[r].o[a(r, n)] : null;
}
function s(t) {
return d[t];
}
function l(t, n) {
var e;
for (n.c = n.c ? n.c.map(s) : [ "other" ], n.o = n.o ? n.o.map(s) : [ "other" ], 
e = 0; e < t.length; e++) h[t[e]] = n;
}
function f(t, n, e) {
return e >= t && n >= e && e % 1 === 0;
}
function p(t, n) {
return t.indexOf(n) >= 0;
}
var h = {};
t.exports = i, t.exports.indexOf = o, t.exports.forms = r, t.exports.ordinal = u, 
t.exports.ordinal.indexOf = a, t.exports.ordinal.forms = c;
var d = [ "zero", "one", "two", "few", "many", "other" ];
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
cFn: function(t, n) {
return 0 === n || 1 === t ? 0 : 1;
}
}), l([ "ar" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
var n = t % 100;
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : f(3, 10, n) ? 3 : f(11, 99, n) ? 4 : 5;
}
}), l([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(t, n) {
return 0 === n || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return p([ 1, 5, 7, 8, 9, 10 ], t) ? 0 : p([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), l([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(t, n, e) {
return 1 === n && 0 === e ? 0 : 1;
}
}), l([ "az" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(t, n) {
var e = n % 10, r = n % 100, o = n % 1e3;
return p([ 1, 2, 5, 7, 8 ], e) || p([ 20, 50, 70, 80 ], r) ? 0 : p([ 3, 4 ], e) || p([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], o) ? 1 : 0 === n || 6 === e || p([ 40, 60, 90 ], r) ? 2 : 3;
}
}), l([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var n = t % 10, e = t % 100;
return 1 === n && 11 !== e ? 0 : f(2, 4, n) && !f(12, 14, e) ? 1 : 0 === n || f(5, 9, n) || f(11, 14, e) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var n = t % 10, e = t % 100;
return p([ 2, 3 ], n) && !p([ 12, 13 ], e) ? 0 : 1;
}
}), l([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "zh" ], {}), 
l([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t) {
var n = t % 10, e = t % 100, r = t % 1e6;
return 1 !== n || p([ 11, 71, 91 ], e) ? 2 !== n || p([ 12, 72, 92 ], e) ? !f(3, 4, n) && 9 !== n || f(10, 19, e) || f(70, 79, e) || f(90, 99, e) ? 0 !== t && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), l([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(t, n, e, r) {
var o = n % 10, i = n % 100, c = r % 10, a = r % 100;
return 0 === e && 1 === o && 11 !== i || 1 === c && 11 !== a ? 0 : 0 === e && f(2, 4, o) && !f(12, 14, i) || f(2, 4, c) && !f(12, 14, a) ? 1 : 2;
}
}), l([ "ca" ], {
c: [ 1, 5 ],
cFn: function(t, n, e) {
return 1 === n && 0 === e ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return p([ 1, 3 ], t) ? 0 : 2 === t ? 1 : 4 === t ? 2 : 3;
}
}), l([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, n, e) {
return 1 === n && 0 === e ? 0 : f(2, 4, n) && 0 === e ? 1 : 0 !== e ? 2 : 3;
}
}), l([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2 === t ? 2 : 3 === t ? 3 : 6 === t ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(t) {
return p([ 0, 7, 8, 9 ], t) ? 0 : 1 === t ? 1 : 2 === t ? 2 : p([ 3, 4 ], t) ? 3 : p([ 5, 6 ], t) ? 4 : 5;
}
}), l([ "da" ], {
c: [ 1, 5 ],
cFn: function(t, n, e, r, o) {
return 1 === t || 0 !== o && p([ 0, 1 ], n) ? 0 : 1;
}
}), l([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, n, e, r) {
var o = n % 100, i = r % 100;
return 0 === e && 1 === o || 1 === i ? 0 : 0 === e && 2 === o || 2 === i ? 1 : 0 === e && f(3, 4, o) || f(3, 4, i) ? 2 : 3;
}
}), l([ "en" ], {
c: [ 1, 5 ],
cFn: function(t, n, e) {
return 1 === n && 0 === e ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
var n = t % 10, e = t % 100;
return 1 === n && 11 !== e ? 0 : 2 === n && 12 !== e ? 1 : 3 === n && 13 !== e ? 2 : 3;
}
}), l([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(t, n) {
return p([ 0, 1 ], n) ? 0 : 1;
}
}), l([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(t, n, e, r) {
var o = n % 10, i = r % 10;
return 0 === e && p([ 1, 2, 3 ], n) || 0 === e && !p([ 4, 6, 9 ], o) || 0 !== e && !p([ 4, 6, 9 ], i) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(t, n) {
return p([ 0, 1 ], n) ? 0 : 1;
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
return p([ 1, 11 ], t) ? 0 : p([ 2, 12 ], t) ? 1 : f(3, 10, t) || f(13, 19, t) ? 2 : 3;
}
}), l([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(t, n) {
return 0 === n || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(t) {
return 1 === t ? 0 : p([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 6 === t ? 3 : 4;
}
}), l([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(t, n, e) {
var r = n % 10, o = n % 100;
return 0 === e && 1 === r ? 0 : 0 === e && 2 === r ? 1 : 0 === e && p([ 0, 20, 40, 60, 80 ], o) ? 2 : 0 !== e ? 3 : 4;
}
}), l([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(t, n, e) {
var r = t % 10;
return 1 === n && 0 === e ? 0 : 2 === n && 0 === e ? 1 : 0 !== e || f(0, 10, t) || 0 !== r ? 3 : 2;
}
}), l([ "hu" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
return p([ 1, 5 ], t) ? 0 : 1;
}
}), l([ "is" ], {
c: [ 1, 5 ],
cFn: function(t, n, e, r, o) {
var i = n % 10, c = n % 100;
return 0 === o && 1 === i && 11 !== c || 0 !== o ? 0 : 1;
}
}), l([ "it" ], {
c: [ 1, 5 ],
cFn: function(t, n, e) {
return 1 === n && 0 === e ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
return p([ 11, 8, 80, 800 ], t) ? 0 : 1;
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
oFn: function(t, n) {
var e = n % 100;
return 1 === n ? 0 : 0 === n || f(2, 20, e) || 40 === e || 60 === e || 80 === e ? 1 : 2;
}
}), l([ "kk" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(t) {
var n = t % 10;
return 6 === n || 9 === n || 0 === n && 0 !== t ? 0 : 1;
}
}), l([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : 2;
}
}), l([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(t, n) {
return 0 === t ? 0 : p([ 0, 1 ], n) && 0 !== t ? 1 : 2;
}
}), l([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, n, e, r) {
var o = t % 10, i = t % 100;
return 1 !== o || f(11, 19, i) ? f(2, 9, o) && !f(11, 19, i) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), l([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(t, n, e, r) {
var o = t % 10, i = t % 100, c = r % 100, a = r % 10;
return 0 === o || f(11, 19, i) || 2 === e && f(11, 19, c) ? 0 : 1 === o && 11 !== i || 2 === e && 1 === a && 11 !== c || 2 !== e && 1 === a ? 1 : 2;
}
}), l([ "mk" ], {
c: [ 1, 5 ],
cFn: function(t, n, e, r) {
var o = n % 10, i = r % 10;
return 0 === e && 1 === o || 1 === i ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(t, n) {
var e = n % 10, r = n % 100;
return 1 === e && 11 !== r ? 0 : 2 === e && 12 !== r ? 1 : p([ 7, 8 ], e) && !p([ 17, 18 ], r) ? 2 : 3;
}
}), l([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(t, n, e) {
var r = t % 100;
return 1 === n && 0 === e ? 0 : 0 !== e || 0 === t || 1 !== t && f(1, 19, r) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(t) {
return 1 === t ? 0 : 1;
}
}), l([ "mr" ], {
c: [ 1, 5 ],
cFn: function(t, n) {
return 0 === n || 1 === t ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(t) {
return 1 === t ? 0 : p([ 2, 3 ], t) ? 1 : 4 === t ? 2 : 3;
}
}), l([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t) {
var n = t % 100;
return 1 === t ? 0 : 0 === t || f(2, 10, n) ? 1 : f(11, 19, n) ? 2 : 3;
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
cFn: function(t, n, e) {
var r = n % 10, o = n % 100;
return 1 === n && 0 === e ? 0 : 0 === e && f(2, 4, r) && !f(12, 14, o) ? 1 : 0 === e && 1 !== n && f(0, 1, r) || 0 === e && f(5, 9, r) || 0 === e && f(12, 14, o) ? 2 : 3;
}
}), l([ "pt" ], {
c: [ 1, 5 ],
cFn: function(t) {
return f(0, 2, t) && 2 !== t ? 0 : 1;
}
}), l([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(t, n, e) {
return 1 === t && 0 === e ? 0 : 1;
}
}), l([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, n, e) {
var r = n % 10, o = n % 100;
return 0 === e && 1 === r && 11 !== o ? 0 : 0 === e && f(2, 4, r) && !f(12, 14, o) ? 1 : 0 === e && 0 === r || 0 === e && f(5, 9, r) || 0 === e && f(11, 14, o) ? 2 : 3;
}
}), l([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(t, n) {
return 0 === n || 1 === t ? 0 : f(2, 10, t) ? 1 : 2;
}
}), l([ "si" ], {
c: [ 1, 5 ],
cFn: function(t, n, e, r) {
return p([ 0, 1 ], t) || 0 === n && 1 === r ? 0 : 1;
}
}), l([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(t, n, e) {
var r = n % 100;
return 0 === e && 1 === r ? 0 : 0 === e && 2 === r ? 1 : 0 === e && f(3, 4, r) || 0 !== e ? 2 : 3;
}
}), l([ "sq" ], {
c: [ 1, 5 ],
cFn: function(t) {
return 1 === t ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(t) {
var n = t % 10, e = t % 100;
return 1 === t ? 0 : 4 === n && 14 !== e ? 1 : 2;
}
}), l([ "sv" ], {
c: [ 1, 5 ],
cFn: function(t, n, e) {
return 1 === n && 0 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(t) {
var n = t % 10, e = t % 100;
return p([ 1, 2 ], n) && !p([ 11, 12 ], e) ? 0 : 1;
}
}), l([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(t) {
return f(0, 1, t) || f(11, 99, t) ? 0 : 1;
}
}), l([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(t, n, e) {
var r = n % 10, o = n % 100;
return 0 === e && 1 === r && 11 !== o ? 0 : 0 === e && f(2, 4, r) && !f(12, 14, o) ? 1 : 0 === e && 0 === r || 0 === e && f(5, 9, r) || 0 === e && f(11, 14, o) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(t) {
var n = t % 10, e = t % 100;
return 3 === n && 13 !== e ? 0 : 1;
}
});
},
650: function(t, n, e) {
"use strict";
function r(t, n) {
if (t.elements.email.value) {
var e = t.elements.slug, r = [];
if (e.length) for (var a = 0; a < e.length; a++) {
var u = e[a];
u.checked && r.push(u.value);
} else r.push(e.value);
if (!r.length) return void new c.Info("Выберите рассылки из списка.");
var s = {
email: t.elements.email.value,
slug: r
}, l = i({
method: "POST",
url: t.action,
body: s
}), f = t.querySelector('[type="submit"]'), p = new o({
elem: f,
size: "small",
elemClass: "button_loading"
});
p.start(), f.disabled = !0, l.addEventListener("loadend", function() {
p.stop(), f.disabled = !1;
});
var h = t.getAttribute("data-newsletter-subscribe-form");
l.addEventListener("success", function(e) {
200 == this.status ? (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE", {
form: h
}), window.ga("send", "event", "newsletter", "subscribe", h), new c.Success(e.result.message, "slow"), 
t.elements.email.value = "", n && n()) : (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE-FAIL", {
form: h
}), window.ga("send", "event", "newsletter", "subscribe-fail", h), new c.Error(e.result.message));
});
}
}
var o = e(633), i = e(638), c = e(630);
n.submitSubscribeForm = r;
},
761: function(t, n) {
"use strict";
t.exports = function(t) {
function n() {
n.wasCalled || (n.wasCalled = !0, t());
}
return setTimeout(n, 500), n;
};
}
});
//# sourceMappingURL=screencast.2bbb4a22788f40e00521.js.map
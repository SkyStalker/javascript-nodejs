var mdeditor = webpackJsonp_name_([ 29 ], {
0: function(e, t, n) {
"use strict";
function r() {
for (var e = document.querySelectorAll(".mdeditor"), t = 0; t < e.length; t++) {
var n = e[t];
new i({
elem: n
});
}
}
n(358);
var i = n(359);
r();
},
116: function(e, t) {},
158: function(e, t, n) {
"use strict";
function r(e) {
return null != e && "" !== e;
}
function i(e) {
return (Array.isArray(e) ? e.map(i) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(r).join(" ");
}
function o(e) {
return a[e] || e;
}
function l(e) {
var t = (e + "").replace(s, o);
return t === "" + e ? e : t;
}
t.merge = function c(e, t) {
if (1 === arguments.length) {
for (var n = e[0], i = 1; i < e.length; i++) n = c(n, e[i]);
return n;
}
var o = e.class, l = t.class;
(o || l) && (o = o || [], l = l || [], Array.isArray(o) || (o = [ o ]), Array.isArray(l) || (l = [ l ]), 
e.class = o.concat(l).filter(r));
for (var a in t) "class" != a && (e[a] = t[a]);
return e;
}, t.joinClasses = i, t.cls = function(e, n) {
for (var r = [], o = 0; o < e.length; o++) n && n[o] ? r.push(t.escape(i([ e[o] ]))) : r.push(i(e[o]));
var l = i(r);
return l.length ? ' class="' + l + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, n, r, i) {
return "style" === e && (n = t.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + e + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + e + '="' + t.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + e + '="' + n + '"');
}, t.attrs = function(e, n) {
var r = [], o = Object.keys(e);
if (o.length) for (var l = 0; l < o.length; ++l) {
var a = o[l], s = e[a];
"class" == a ? (s = i(s)) && r.push(" " + a + '="' + s + '"') : r.push(t.attr(a, s, !1, n));
}
return r.join("");
};
var a = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, s = /[&<>"]/g;
t.escape = l, t.rethrow = function u(e, t, r, i) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || i)) throw e.message += " on line " + r, 
e;
try {
i = i || n(116).readFileSync(t, "utf8");
} catch (o) {
u(e, null, r);
}
var l = 3, a = i.split("\n"), s = Math.max(r - l, 0), c = Math.min(a.length, r + l), l = a.slice(s, c).map(function(e, t) {
var n = t + s + 1;
return (n == r ? "  > " : "    ") + n + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + r + "\n" + l + "\n\n" + e.message, 
e;
}, t.DebugItem = function(e, t) {
this.lineno = e, this.filename = t;
};
},
161: function(e, t, n) {
"use strict";
function r(e) {
e.bem = i, e.thumb = o;
}
var i = n(162)(), o = n(163).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, r(t), e(t);
};
},
162: function(e, t, n) {
"use strict";
var r = n(158);
e.exports = function(e) {
function t(e, t, n, i, o) {
var l = o || "div";
switch (l) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
e.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
e.push("<" + l + r.attrs(r.merge([ n ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(l) && e.push("</" + l + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(n, r, i, o) {
var l = this.block, a = this.attributes || {};
if (!a.class && i && !o) throw Error("Block without class: " + i);
if (a.class) {
var s = a.class;
s instanceof Array && (s = s.join(" ")), s = s.split(" ");
var c;
try {
c = s[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + s[0]);
}
o ? s[0] = r[r.length - 1] + e.element + s[0] : r[r.length] = c;
var f = (o ? r[r.length - 1] + e.element : "") + c;
-1 === s.indexOf(f) && (s[s.length] = f);
for (var h = 0; h < s.length; h++) {
var d = s[h];
d.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? s[h] = f + d : d.match(RegExp("^" + e.element)) && (r[r.length - 2] ? s[h] = r[r.length - 2] + d : s[h] = r[r.length - 1] + d), 
s[h].match(RegExp("^" + f + "($|(?=" + e.element + "|" + e.modifier + "))")) && (s[h] = e.prefix + s[h]);
}
a.class = s.sort().join(" ");
}
t(n, l, a, r, i), o || r.pop();
};
};
},
163: function(e, t) {
"use strict";
t.thumb = function(e, t, n) {
if (!e) return e;
var r = window.devicePixelRatio;
t *= r, n *= r;
var i = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + i + e.slice(e.lastIndexOf("."));
};
},
252: function(e, t, n) {
"use strict";
e.exports = {
lang: "ru"
};
},
326: function(e, t, n) {
"use strict";
function r() {
for (var e = [ l ], t = 0; t < arguments.length; t++) e.push(arguments[t]);
return o.t.apply(o, e);
}
var i = n(327), o = new i("en"), l = n(252).lang, a = {};
r.i18n = o, r.requirePhrase = function(e, t) {
a[e] && -1 != a[e].indexOf(t) || (a[e] || (a[e] = []), a[e].push(t), o.addPhrase(l, e, t));
}, e.exports = r;
},
327: function(e, t, n) {
"use strict";
e.exports = n(328);
},
328: function(e, t, n) {
"use strict";
function r(e) {
return Object.prototype.toString.call(e);
}
function i(e) {
return "[object String]" === r(e);
}
function o(e) {
return !isNaN(e) && isFinite(e);
}
function l(e) {
return e === !0 || e === !1;
}
function a(e) {
return "[object Function]" === r(e);
}
function s(e) {
return "[object Object]" === r(e);
}
function c(e, t, n) {
if (null !== e) if (b && e.forEach === b) e.forEach(t, n); else if (e.length === +e.length) for (var r = 0, i = e.length; i > r; r += 1) t.call(n, e[r], r, e); else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(n, e[o], o, e);
}
function u(e) {
var t = 1, n = arguments, r = n.length, i = (e + "").replace(w, function(e) {
if ("%%" === e) return "%";
if (t >= r) return e;
switch (e) {
case "%s":
return n[t++] + "";

case "%d":
return +n[t++];

case "%j":
return JSON.stringify(n[t++]);

default:
return e;
}
});
return i;
}
function f(e) {
var t = {};
return c(e || {}, function(e, n) {
return e && "object" == typeof e ? void c(f(e), function(e, r) {
t[n + "." + r] = e;
}) : void (t[n] = e);
}), t;
}
function h(e, t) {
return e + k + t;
}
function d(e, t, n) {
var r = h(t, n), i = e._storage;
if (i.hasOwnProperty(r)) return r;
if (t === e._defaultLocale) return null;
var o = e._fallbacks_cache;
if (o.hasOwnProperty(r)) return o[r];
for (var l, a = e._fallbacks[t] || [ e._defaultLocale ], s = 0, c = a.length; c > s; s++) if (l = h(a[s], n), 
i.hasOwnProperty(l)) return o[r] = l, o[r];
return o[r] = null, null;
}
function p(e, t, n) {
var r = x.indexOf(e, t);
return -1 === r ? u('[pluralizer for "%s" locale not found]', e) : void 0 === n[r] ? u('[plural form %d ("%s") not found in translation]', r, x.forms(e)[r]) : n[r];
}
function m(e) {
return this instanceof m ? (this._defaultLocale = e ? e + "" : C, this._fallbacks = {}, 
this._fallbacks_cache = {}, this._storage = {}, void (this._plurals_cache = {})) : new m(e);
}
function g(e, t, n) {
var r, i, o, l, a, s;
return S.test(t) ? (r = v.parse(t), 1 === r.length && "literal" === r[0].type ? r[0].text : (e._plurals_cache[n] || (e._plurals_cache[n] = new m(n)), 
s = e._plurals_cache[n], i = [], i.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
i.push("params = flatten(params);"), c(r, function(e) {
if ("literal" === e.type) return void i.push(u("str += %j;", e.text));
if ("variable" === e.type) return o = e.anchor, void i.push(u('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', o, o, o));
if ("plural" !== e.type) throw Error("Unknown node type");
o = e.anchor, l = {}, c(e.strict, function(t, r) {
var i = v.parse(t);
return 1 === i.length && "literal" === i[0].type ? (l[r] = !1, void (e.strict[r] = i[0].text)) : (l[r] = !0, 
void (s.hasPhrase(n, t, !0) || s.addPhrase(n, t, t)));
}), a = {}, c(e.forms, function(t, r) {
var i, o = v.parse(t);
return 1 === o.length && "literal" === o[0].type ? (i = o[0].text, e.forms[r] = i, 
void (a[i] = !1)) : (a[t] = !0, void (s.hasPhrase(n, t, !0) || s.addPhrase(n, t, t)));
}), i.push(u("loc = %j;", n)), i.push(u("loc_plzr = %j;", n.split(/[-_]/)[0])), 
i.push(u("anchor = params[%j];", o)), i.push(u("cache = this._plurals_cache[loc];")), 
i.push(u("strict = %j;", e.strict)), i.push(u("strict_exec = %j;", l)), i.push(u("forms = %j;", e.forms)), 
i.push(u("forms_exec = %j;", a)), i.push("if (+(anchor) != anchor) {"), i.push(u('  str += "[invalid plurals amount: %s(" + anchor + ")]";', o)), 
i.push("} else {"), i.push("  if (strict[anchor] !== undefined) {"), i.push("    plrl = strict[anchor];"), 
i.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), i.push("  } else {"), 
i.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), i.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
i.push("  }"), i.push("}");
}), i.push("return str;"), Function("params", "flatten", "pluralizer", i.join("\n")))) : t;
}
var v = n(329), x = n(330), y = Array.isArray || function(e) {
return "[object Array]" === r(e);
}, b = Array.prototype.forEach, w = /%[sdj%]/g, C = "en", k = "#@$";
m.prototype.addPhrase = function(e, t, n, r) {
var a, u = this;
if (l(r)) a = r ? 1 / 0 : 0; else if (o(r)) {
if (a = Math.floor(r), 0 > a) throw new TypeError("Invalid flatten level (should be >= 0).");
} else a = 1 / 0;
if (s(n) && a > 0) return c(n, function(n, r) {
u.addPhrase(e, (t ? t + "." : "") + r, n, a - 1);
}), this;
if (i(n)) this._storage[h(e, t)] = {
translation: n,
locale: e,
raw: !1
}; else {
if (!(y(n) || o(n) || l(n) || 0 === a && s(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[h(e, t)] = {
translation: n,
locale: e,
raw: !0
};
}
return u._fallbacks_cache = {}, this;
}, m.prototype.setFallback = function(e, t) {
var n = this._defaultLocale;
if (n === e) throw Error("Default locale can't have fallbacks");
var r = y(t) ? t.slice() : [ t ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[e] = r, this._fallbacks_cache = {}, 
this;
};
var S = /#\{|\(\(|\\\\/;
m.prototype.translate = function(e, t, n) {
var r, l = d(this, e, t);
return l ? (r = this._storage[l], r.raw ? r.translation : (r.hasOwnProperty("compiled") || (r.compiled = g(this, r.translation, r.locale)), 
a(r.compiled) ? ((o(n) || i(n)) && (n = {
count: n,
value: n
}), r.compiled.call(this, n, f, p)) : r.compiled)) : e + ": No translation for [" + t + "]";
}, m.prototype.hasPhrase = function(e, t, n) {
return n ? this._storage.hasOwnProperty(h(e, t)) : d(this, e, t) ? !0 : !1;
}, m.prototype.getLocale = function(e, t, n) {
if (n) return this._storage.hasOwnProperty(h(e, t)) ? e : null;
var r = d(this, e, t);
return r ? r.split(k, 2)[0] : null;
}, m.prototype.t = m.prototype.translate, m.prototype.stringify = function(e) {
var t = this, n = {};
c(this._storage, function(e, t) {
n[t.split(k)[1]] = !0;
});
var r = {};
c(n, function(n, i) {
var o = d(t, e, i);
if (o) {
var l = t._storage[o].locale;
r[l] || (r[l] = {}), r[l][i] = t._storage[o].translation;
}
});
var i = {
fallback: {},
locales: r
}, o = (t._fallbacks[e] || []).slice(0, -1);
return o.length && (i.fallback[e] = o), JSON.stringify(i);
}, m.prototype.load = function(e) {
var t = this;
return i(e) && (e = JSON.parse(e)), c(e.locales, function(e, n) {
c(e, function(e, r) {
t.addPhrase(n, r, e, 0);
});
}), c(e.fallback, function(e, n) {
t.setFallback(n, e);
}), this;
}, e.exports = m;
},
329: function(e, t) {
"use strict";
e.exports = function() {
function e(e, t) {
function n() {
this.constructor = e;
}
n.prototype = t.prototype, e.prototype = new n();
}
function t(e, t, n, r, i, o) {
this.message = e, this.expected = t, this.found = n, this.offset = r, this.line = i, 
this.column = o, this.name = "SyntaxError";
}
function n(e) {
function n() {
return e.substring(ve, ge);
}
function r(t) {
function n(t, n, r) {
var i, o;
for (i = n; r > i; i++) o = e.charAt(i), "\n" === o ? (t.seenCR || t.line++, t.column = 1, 
t.seenCR = !1) : "\r" === o || "\u2028" === o || "\u2029" === o ? (t.line++, t.column = 1, 
t.seenCR = !0) : (t.column++, t.seenCR = !1);
}
return xe !== t && (xe > t && (xe = 0, ye = {
line: 1,
column: 1,
seenCR: !1
}), n(ye, xe, t), xe = t), ye;
}
function i(e) {
be > ge || (ge > be && (be = ge, we = []), we.push(e));
}
function o(n, i, o) {
function l(e) {
var t = 1;
for (e.sort(function(e, t) {
return e.description < t.description ? -1 : e.description > t.description ? 1 : 0;
}); t < e.length; ) e[t - 1] === e[t] ? e.splice(t, 1) : t++;
}
function a(e, t) {
function n(e) {
function t(e) {
return e.charCodeAt(0).toString(16).toUpperCase();
}
return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(e) {
return "\\x0" + t(e);
}).replace(/[\x10-\x1F\x80-\xFF]/g, function(e) {
return "\\x" + t(e);
}).replace(/[\u0180-\u0FFF]/g, function(e) {
return "\\u0" + t(e);
}).replace(/[\u1080-\uFFFF]/g, function(e) {
return "\\u" + t(e);
});
}
var r, i, o, l = Array(e.length);
for (o = 0; o < e.length; o++) l[o] = e[o].description;
return r = e.length > 1 ? l.slice(0, -1).join(", ") + " or " + l[e.length - 1] : l[0], 
i = t ? '"' + n(t) + '"' : "end of input", "Expected " + r + " but " + i + " found.";
}
var s = r(o), c = o < e.length ? e.charAt(o) : null;
return null !== i && l(i), new t(null !== n ? n : a(i, c), i, c, o, s.line, s.column);
}
function l() {
var e, t;
for (e = [], t = m(), t === w && (t = a(), t === w && (t = h())); t !== w; ) e.push(t), 
t = m(), t === w && (t = a(), t === w && (t = h()));
return e;
}
function a() {
var t, n, r, o, l;
return t = ge, e.substr(ge, 2) === L ? (n = L, ge += 2) : (n = w, 0 === Ce && i(T)), 
n !== w ? (r = s(), r !== w ? (e.substr(ge, 2) === M ? (o = M, ge += 2) : (o = w, 
0 === Ce && i(A)), o !== w ? (l = f(), l === w && (l = O), l !== w ? (ve = t, n = N(r, l), 
t = n) : (ge = t, t = S)) : (ge = t, t = S)) : (ge = t, t = S)) : (ge = t, t = S), 
t;
}
function s() {
var t, n, r, o;
return t = ge, n = c(), n !== w ? (124 === e.charCodeAt(ge) ? (r = F, ge++) : (r = w, 
0 === Ce && i(W)), r !== w ? (o = s(), o !== w ? (ve = t, n = D(n, o), t = n) : (ge = t, 
t = S)) : (ge = t, t = S)) : (ge = t, t = S), t === w && (t = ge, n = c(), n !== w && (ve = t, 
n = H(n)), t = n), t;
}
function c() {
var t, n, r, o, l, a;
if (t = ge, 61 === e.charCodeAt(ge) ? (n = P, ge++) : (n = w, 0 === Ce && i(z)), 
n !== w) {
if (r = [], E.test(e.charAt(ge)) ? (o = e.charAt(ge), ge++) : (o = w, 0 === Ce && i(I)), 
o !== w) for (;o !== w; ) r.push(o), E.test(e.charAt(ge)) ? (o = e.charAt(ge), ge++) : (o = w, 
0 === Ce && i(I)); else r = S;
if (r !== w) if (32 === e.charCodeAt(ge) ? (o = j, ge++) : (o = w, 0 === Ce && i(R)), 
o === w && (o = O), o !== w) {
if (l = [], a = u(), a !== w) for (;a !== w; ) l.push(a), a = u(); else l = S;
l !== w ? (ve = t, n = B(r, l), t = n) : (ge = t, t = S);
} else ge = t, t = S; else ge = t, t = S;
} else ge = t, t = S;
if (t === w) {
if (t = ge, n = [], r = u(), r !== w) for (;r !== w; ) n.push(r), r = u(); else n = S;
n !== w && (ve = t, n = _()), t = n;
}
return t;
}
function u() {
var t, n, r;
return t = ge, 92 === e.charCodeAt(ge) ? (n = q, ge++) : (n = w, 0 === Ce && i(G)), 
n !== w ? (U.test(e.charAt(ge)) ? (r = e.charAt(ge), ge++) : (r = w, 0 === Ce && i(V)), 
r !== w ? (ve = t, n = K(r), t = n) : (ge = t, t = S)) : (ge = t, t = S), t === w && (t = ge, 
n = ge, Ce++, 124 === e.charCodeAt(ge) ? (r = F, ge++) : (r = w, 0 === Ce && i(W)), 
r === w && (e.substr(ge, 2) === M ? (r = M, ge += 2) : (r = w, 0 === Ce && i(A))), 
Ce--, r === w ? n = $ : (ge = n, n = S), n !== w ? (e.length > ge ? (r = e.charAt(ge), 
ge++) : (r = w, 0 === Ce && i(X)), r !== w ? (ve = t, n = Y(), t = n) : (ge = t, 
t = S)) : (ge = t, t = S)), t;
}
function f() {
var t, n, r;
return t = ge, 58 === e.charCodeAt(ge) ? (n = Z, ge++) : (n = w, 0 === Ce && i(J)), 
n !== w ? (r = d(), r !== w ? (ve = t, n = Q(r), t = n) : (ge = t, t = S)) : (ge = t, 
t = S), t;
}
function h() {
var t, n, r, o;
return t = ge, e.substr(ge, 2) === ee ? (n = ee, ge += 2) : (n = w, 0 === Ce && i(te)), 
n !== w ? (r = d(), r !== w ? (125 === e.charCodeAt(ge) ? (o = ne, ge++) : (o = w, 
0 === Ce && i(re)), o !== w ? (ve = t, n = ie(r), t = n) : (ge = t, t = S)) : (ge = t, 
t = S)) : (ge = t, t = S), t;
}
function d() {
var t, n, r, o, l;
if (t = ge, n = p(), n !== w) if (46 === e.charCodeAt(ge) ? (r = oe, ge++) : (r = w, 
0 === Ce && i(le)), r !== w) {
if (o = [], l = d(), l !== w) for (;l !== w; ) o.push(l), l = d(); else o = S;
o !== w ? (ve = t, n = ae(), t = n) : (ge = t, t = S);
} else ge = t, t = S; else ge = t, t = S;
return t === w && (t = p()), t;
}
function p() {
var t, n, r, o;
if (t = ge, se.test(e.charAt(ge)) ? (n = e.charAt(ge), ge++) : (n = w, 0 === Ce && i(ce)), 
n !== w) {
for (r = [], ue.test(e.charAt(ge)) ? (o = e.charAt(ge), ge++) : (o = w, 0 === Ce && i(fe)); o !== w; ) r.push(o), 
ue.test(e.charAt(ge)) ? (o = e.charAt(ge), ge++) : (o = w, 0 === Ce && i(fe));
r !== w ? (ve = t, n = Y(), t = n) : (ge = t, t = S);
} else ge = t, t = S;
return t;
}
function m() {
var e, t, n, r, i;
if (e = ge, t = [], n = ge, r = ge, Ce++, i = a(), i === w && (i = h()), Ce--, i === w ? r = $ : (ge = r, 
r = S), r !== w ? (i = g(), i !== w ? (ve = n, r = he(i), n = r) : (ge = n, n = S)) : (ge = n, 
n = S), n !== w) for (;n !== w; ) t.push(n), n = ge, r = ge, Ce++, i = a(), i === w && (i = h()), 
Ce--, i === w ? r = $ : (ge = r, r = S), r !== w ? (i = g(), i !== w ? (ve = n, 
r = he(i), n = r) : (ge = n, n = S)) : (ge = n, n = S); else t = S;
return t !== w && (ve = e, t = de(t)), e = t;
}
function g() {
var t, n, r;
return t = ge, 92 === e.charCodeAt(ge) ? (n = q, ge++) : (n = w, 0 === Ce && i(G)), 
n !== w ? (pe.test(e.charAt(ge)) ? (r = e.charAt(ge), ge++) : (r = w, 0 === Ce && i(me)), 
r !== w ? (ve = t, n = K(r), t = n) : (ge = t, t = S)) : (ge = t, t = S), t === w && (e.length > ge ? (t = e.charAt(ge), 
ge++) : (t = w, 0 === Ce && i(X))), t;
}
function v(e) {
for (var t = [], n = 0; n < e.length; n++) void 0 === e[n].strict && t.push(e[n].text);
return t;
}
function x(e) {
for (var t = {}, n = 0; n < e.length; n++) void 0 !== e[n].strict && (t[e[n].strict] = e[n].text);
return t;
}
var y, b = arguments.length > 1 ? arguments[1] : {}, w = {}, C = {
start: l
}, k = l, S = w, L = "((", T = {
type: "literal",
value: "((",
description: '"(("'
}, M = "))", A = {
type: "literal",
value: "))",
description: '"))"'
}, O = null, N = function(e, t) {
return {
type: "plural",
forms: v(e),
strict: x(e),
anchor: t || "count"
};
}, F = "|", W = {
type: "literal",
value: "|",
description: '"|"'
}, D = function(e, t) {
return [ e ].concat(t);
}, H = function(e) {
return [ e ];
}, P = "=", z = {
type: "literal",
value: "=",
description: '"="'
}, E = /^[0-9]/, I = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, j = " ", R = {
type: "literal",
value: " ",
description: '" "'
}, B = function(e, t) {
return {
strict: e.join(""),
text: t.join("")
};
}, _ = function() {
return {
text: n()
};
}, q = "\\", G = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, U = /^[\\|)(]/, V = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, K = function(e) {
return e;
}, $ = void 0, X = {
type: "any",
description: "any character"
}, Y = function() {
return n();
}, Z = ":", J = {
type: "literal",
value: ":",
description: '":"'
}, Q = function(e) {
return e;
}, ee = "#{", te = {
type: "literal",
value: "#{",
description: '"#{"'
}, ne = "}", re = {
type: "literal",
value: "}",
description: '"}"'
}, ie = function(e) {
return {
type: "variable",
anchor: e
};
}, oe = ".", le = {
type: "literal",
value: ".",
description: '"."'
}, ae = function() {
return n();
}, se = /^[a-zA-Z_$]/, ce = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, ue = /^[a-zA-Z0-9_$]/, fe = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, he = function(e) {
return e;
}, de = function(e) {
return {
type: "literal",
text: e.join("")
};
}, pe = /^[\\#()|]/, me = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, ge = 0, ve = 0, xe = 0, ye = {
line: 1,
column: 1,
seenCR: !1
}, be = 0, we = [], Ce = 0;
if ("startRule" in b) {
if (!(b.startRule in C)) throw Error("Can't start parsing from rule \"" + b.startRule + '".');
k = C[b.startRule];
}
if (y = k(), y !== w && ge === e.length) return y;
throw y !== w && ge < e.length && i({
type: "end",
description: "end of input"
}), o(null, we, be);
}
return e(t, Error), {
SyntaxError: t,
parse: n
};
}();
},
330: function(e, t) {
"use strict";
function n(e) {
var t;
return d[e] ? e : (t = e.toLowerCase().replace("_", "-"), d[t] ? t : (t = t.split("-")[0], 
d[t] ? t : null));
}
function r(e) {
var t = n(e);
return d[t] ? d[t].c : null;
}
function i(e, t) {
var r = n(e);
if (!r) return -1;
if (!d[r].cFn) return 0;
var i = t + "", o = i.indexOf(".") < 0 ? "" : i.split(".")[1], l = o.length, a = +t, s = +i.split(".")[0], c = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return d[r].cFn(a, s, l, +o, c);
}
function o(e, t) {
var r = n(e);
return r ? d[r].c[i(r, t)] : null;
}
function l(e) {
var t = n(e);
return d[t] ? d[t].o : null;
}
function a(e, t) {
var r = n(e);
if (!r) return -1;
if (!d[r].oFn) return 0;
var i = t + "", o = i.indexOf(".") < 0 ? "" : i.split(".")[1], l = o.length, a = +t, s = +i.split(".")[0], c = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return d[r].oFn(a, s, l, +o, c);
}
function s(e, t) {
var r = n(e);
return d[r] ? d[r].o[a(r, t)] : null;
}
function c(e) {
return p[e];
}
function u(e, t) {
var n;
for (t.c = t.c ? t.c.map(c) : [ "other" ], t.o = t.o ? t.o.map(c) : [ "other" ], 
n = 0; n < e.length; n++) d[e[n]] = t;
}
function f(e, t, n) {
return n >= e && t >= n && n % 1 === 0;
}
function h(e, t) {
return e.indexOf(t) >= 0;
}
var d = {};
e.exports = o, e.exports.indexOf = i, e.exports.forms = r, e.exports.ordinal = s, 
e.exports.ordinal.indexOf = a, e.exports.ordinal.forms = l;
var p = [ "zero", "one", "two", "few", "many", "other" ];
u([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(e) {
return f(0, 1, e) ? 0 : 1;
}
}), u([ "am", "fa", "kn", "zu" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
}
}), u([ "ar" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : f(3, 10, t) ? 3 : f(11, 99, t) ? 4 : 5;
}
}), u([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return h([ 1, 5, 7, 8, 9, 10 ], e) ? 0 : h([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), u([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), u([ "az" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100, i = t % 1e3;
return h([ 1, 2, 5, 7, 8 ], n) || h([ 20, 50, 70, 80 ], r) ? 0 : h([ 3, 4 ], n) || h([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i) ? 1 : 0 === t || 6 === n || h([ 40, 60, 90 ], r) ? 2 : 3;
}
}), u([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : f(2, 4, t) && !f(12, 14, n) ? 1 : 0 === t || f(5, 9, t) || f(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return h([ 2, 3 ], t) && !h([ 12, 13 ], n) ? 0 : 1;
}
}), u([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "zh" ], {}), 
u([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100, r = e % 1e6;
return 1 !== t || h([ 11, 71, 91 ], n) ? 2 !== t || h([ 12, 72, 92 ], n) ? !f(3, 4, t) && 9 !== t || f(10, 19, n) || f(70, 79, n) || f(90, 99, n) ? 0 !== e && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), u([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n, r) {
var i = t % 10, o = t % 100, l = r % 10, a = r % 100;
return 0 === n && 1 === i && 11 !== o || 1 === l && 11 !== a ? 0 : 0 === n && f(2, 4, i) && !f(12, 14, o) || f(2, 4, l) && !f(12, 14, a) ? 1 : 2;
}
}), u([ "ca" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return h([ 1, 3 ], e) ? 0 : 2 === e ? 1 : 4 === e ? 2 : 3;
}
}), u([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : f(2, 4, t) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), u([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 === e ? 3 : 6 === e ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(e) {
return h([ 0, 7, 8, 9 ], e) ? 0 : 1 === e ? 1 : 2 === e ? 2 : h([ 3, 4 ], e) ? 3 : h([ 5, 6 ], e) ? 4 : 5;
}
}), u([ "da" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, i) {
return 1 === e || 0 !== i && h([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n, r) {
var i = t % 100, o = r % 100;
return 0 === n && 1 === i || 1 === o ? 0 : 0 === n && 2 === i || 2 === o ? 1 : 0 === n && f(3, 4, i) || f(3, 4, o) ? 2 : 3;
}
}), u([ "en" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : 2 === t && 12 !== n ? 1 : 3 === t && 13 !== n ? 2 : 3;
}
}), u([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return h([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
var i = t % 10, o = r % 10;
return 0 === n && h([ 1, 2, 3 ], t) || 0 === n && !h([ 4, 6, 9 ], i) || 0 !== n && !h([ 4, 6, 9 ], o) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return h([ 0, 1 ], t) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : f(3, 6, e) ? 2 : f(7, 10, e) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e) {
return h([ 1, 11 ], e) ? 0 : h([ 2, 12 ], e) ? 1 : f(3, 10, e) || f(13, 19, e) ? 2 : 3;
}
}), u([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : h([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), u([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, i = t % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && h([ 0, 20, 40, 60, 80 ], i) ? 2 : 0 !== n ? 3 : 4;
}
}), u([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(e, t, n) {
var r = e % 10;
return 1 === t && 0 === n ? 0 : 2 === t && 0 === n ? 1 : 0 !== n || f(0, 10, e) || 0 !== r ? 3 : 2;
}
}), u([ "hu" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return h([ 1, 5 ], e) ? 0 : 1;
}
}), u([ "is" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, i) {
var o = t % 10, l = t % 100;
return 0 === i && 1 === o && 11 !== l || 0 !== i ? 0 : 1;
}
}), u([ "it" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
return h([ 11, 8, 80, 800 ], e) ? 0 : 1;
}
}), u([ "iu", "kw", "naq", "se", "sma", "smi", "smj", "smn", "sms" ], {
c: [ 1, 2, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : 2;
}
}), u([ "ka" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e, t) {
var n = t % 100;
return 1 === t ? 0 : 0 === t || f(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
}
}), u([ "kk" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
var t = e % 10;
return 6 === t || 9 === t || 0 === t && 0 !== e ? 0 : 1;
}
}), u([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2;
}
}), u([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t) {
return 0 === e ? 0 : h([ 0, 1 ], t) && 0 !== e ? 1 : 2;
}
}), u([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n, r) {
var i = e % 10, o = e % 100;
return 1 !== i || f(11, 19, o) ? f(2, 9, i) && !f(11, 19, o) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), u([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t, n, r) {
var i = e % 10, o = e % 100, l = r % 100, a = r % 10;
return 0 === i || f(11, 19, o) || 2 === n && f(11, 19, l) ? 0 : 1 === i && 11 !== o || 2 === n && 1 === a && 11 !== l || 2 !== n && 1 === a ? 1 : 2;
}
}), u([ "mk" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
var i = t % 10, o = r % 10;
return 0 === n && 1 === i || 1 === o ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : h([ 7, 8 ], n) && !h([ 17, 18 ], r) ? 2 : 3;
}
}), u([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n) {
var r = e % 100;
return 1 === t && 0 === n ? 0 : 0 !== n || 0 === e || 1 !== e && f(1, 19, r) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "mr" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return 1 === e ? 0 : h([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 3;
}
}), u([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 1 === e ? 0 : 0 === e || f(2, 10, t) ? 1 : f(11, 19, t) ? 2 : 3;
}
}), u([ "ne" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return f(1, 4, e) ? 0 : 1;
}
}), u([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, i = t % 100;
return 1 === t && 0 === n ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, i) ? 1 : 0 === n && 1 !== t && f(0, 1, r) || 0 === n && f(5, 9, r) || 0 === n && f(12, 14, i) ? 2 : 3;
}
}), u([ "pt" ], {
c: [ 1, 5 ],
cFn: function(e) {
return f(0, 2, e) && 2 !== e ? 0 : 1;
}
}), u([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === e && 0 === n ? 0 : 1;
}
}), u([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, i = t % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && f(5, 9, r) || 0 === n && f(11, 14, i) ? 2 : 3;
}
}), u([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : f(2, 10, e) ? 1 : 2;
}
}), u([ "si" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return h([ 0, 1 ], e) || 0 === t && 1 === r ? 0 : 1;
}
}), u([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n) {
var r = t % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && f(3, 4, r) || 0 !== n ? 2 : 3;
}
}), u([ "sq" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === e ? 0 : 4 === t && 14 !== n ? 1 : 2;
}
}), u([ "sv" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return h([ 1, 2 ], t) && !h([ 11, 12 ], n) ? 0 : 1;
}
}), u([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(e) {
return f(0, 1, e) || f(11, 99, e) ? 0 : 1;
}
}), u([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, i = t % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && f(2, 4, r) && !f(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && f(5, 9, r) || 0 === n && f(11, 14, i) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return 3 === t && 13 !== n ? 0 : 1;
}
});
},
358: function(e, t) {},
359: function(e, t, n) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}();
n(360);
n(361);
var o = n(366), l = n(161), a = n(148), s = n(326), c = n(252).lang;
s.requirePhrase("mdedit", n(367)("./" + c + ".yml"));
var u = function() {
function e(t) {
r(this, e), this.options = Object.create(t), t.buttonSet || (this.options.buttonSet = "standard"), 
this.render(t.elem), this.value = this.elem.value, this.delegate("[data-action]", function(e) {
var t = "action" + this.delegateTarget.getAtribute("data-action");
this[t] && (e.preventDefault(), this[t]());
});
}
return i(e, [ {
key: "actionBold",
value: function() {
this.replaceSelection("**", "**", 2, s("bold"));
}
}, {
key: "actionItalic",
value: function() {
this.replaceSelection("*", "*", 1, s("italic"));
}
}, {
key: "actionCode",
value: function() {
this.replaceSelection("`", "`", 0, s("code"));
}
}, {
key: "actionRedo",
value: function() {
this.codemirror.redo();
}
}, {
key: "actionUndo",
value: function() {
this.codemirror.undo();
}
}, {
key: "actionFencedCode",
value: function() {
this.replaceSelection("\n```js\n", "\n```\n", 0, s("code_multiline"));
}
}, {
key: "actionLink",
value: function() {
var e = this.codemirror.getSelection(), t = "", n = "http://";
e.match(/^https?:\/\//) ? n = e : t = e, n && (t = "link text"), this.codemirror.replaceSelection("[" + t + "](" + n + ")");
var r = this.codemirror.getCursor();
this.codemirror.setCursor(r.line, r.ch - (3 + n.length));
}
}, {
key: "actionOl",
value: function() {
this.replaceSelection("1. ", "\n", 0, s("ol_item"));
}
}, {
key: "actionUl",
value: function() {
this.replaceSelection("- ", "\n", 0, s("ul_item"));
}
}, {
key: "actionHeading",
value: function() {
this.replaceSelection("# ", "\n", 0, s("heading"));
}
}, {
key: "actionImage",
value: function() {
var e = this.codemirror.getSelection(), t = s("alt");
e || (e = "http://my.jpg"), this.codemirror.replaceSelection("![" + t + "](" + e + ")");
var n = this.codemirror.getCursor();
this.codemirror.setCursor(n.line, n.ch - (1 + e.length));
}
}, {
key: "replaceSelection",
value: function(e, t, n, r) {
var i = this.codemirror.getSelection();
i || (i = r), this.codemirror.replaceSelection(e + i + t);
var o = this.codemirror.getCursor();
this.codemirror.setCursor(o.line, o.ch - n);
}
}, {
key: "render",
value: function(e) {
function t(e) {
for (var t = [], n = 0; n < e.length; n++) t.push({
action: e[n],
title: r[e[n]]
});
return t;
}
var n, r = {
Bold: "bold [Ctrl-B]",
Italic: "italic [Ctrl-I]",
Code: "inline code",
Undo: "undo [Ctrl-Z]",
Redo: "redo [Ctrl-Y]",
FencedCode: "multiline code",
Link: "link",
Ul: "itemized list",
Ol: "ordered list",
Heading: "heading",
Image: "insert image"
};
switch (this.options.buttonSet) {
default:
n = t("Bold Italic Code Undo Redo FencedCode Link Ul Ol Heading Image".split(" "));
}
e.insertAdjacentHTML("afterEnd", l(o, {
buttons: n
})), this.elem = e.nextElementSibling;
var i = this.elem.querySelector("textarea");
i.replace(e), e.classList.remove("mdeditor");
for (var a = 0; a < i.classList.length; a++) {
var s = i.classList[a];
e.classList.add(s);
}
}
} ]), e;
}();
a.delegateMixin(u.prototype), e.exports = u;
},
360: function(e, t, n) {
!function(t) {
e.exports = t();
}(function() {
"use strict";
function e(n, r) {
if (!(this instanceof e)) return new e(n, r);
this.options = r = r ? Ei(r) : {}, Ei(Qo, r, !1), d(r);
var i = r.value;
"string" == typeof i && (i = new kl(i, r.mode, null, r.lineSeparator)), this.doc = i;
var o = new e.inputStyles[r.inputStyle](this), l = this.display = new t(n, i, o);
l.wrapper.CodeMirror = this, c(this), a(this), r.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), 
r.autofocus && !Oo && l.input.focus(), v(this), this.state = {
keyMaps: [],
overlays: [],
modeGen: 0,
overwrite: !1,
delayingBlurEvent: !1,
focused: !1,
suppressEdits: !1,
pasteIncoming: !1,
cutIncoming: !1,
selectingText: !1,
draggingText: !1,
highlight: new Ni(),
keySeq: null,
specialChars: null
};
var s = this;
yo && 11 > bo && setTimeout(function() {
s.display.input.reset(!0);
}, 20), _t(this), Xi(), bt(this), this.curOp.forceUpdate = !0, Yr(this, i), r.autofocus && !Oo || s.hasFocus() ? setTimeout(Ii(vn, this), 20) : xn(this);
for (var u in el) el.hasOwnProperty(u) && el[u](this, r[u], tl);
C(this), r.finishInit && r.finishInit(this);
for (var f = 0; f < ol.length; ++f) ol[f](this);
Ct(this), wo && r.lineWrapping && "optimizelegibility" == getComputedStyle(l.lineDiv).textRendering && (l.lineDiv.style.textRendering = "auto");
}
function t(e, t, n) {
var r = this;
this.input = n, r.scrollbarFiller = _i("div", null, "CodeMirror-scrollbar-filler"), 
r.scrollbarFiller.setAttribute("cm-not-content", "true"), r.gutterFiller = _i("div", null, "CodeMirror-gutter-filler"), 
r.gutterFiller.setAttribute("cm-not-content", "true"), r.lineDiv = _i("div", null, "CodeMirror-code"), 
r.selectionDiv = _i("div", null, null, "position: relative; z-index: 1"), r.cursorDiv = _i("div", null, "CodeMirror-cursors"), 
r.measure = _i("div", null, "CodeMirror-measure"), r.lineMeasure = _i("div", null, "CodeMirror-measure"), 
r.lineSpace = _i("div", [ r.measure, r.lineMeasure, r.selectionDiv, r.cursorDiv, r.lineDiv ], null, "position: relative; outline: none"), 
r.mover = _i("div", [ _i("div", [ r.lineSpace ], "CodeMirror-lines") ], null, "position: relative"), 
r.sizer = _i("div", [ r.mover ], "CodeMirror-sizer"), r.sizerWidth = null, r.heightForcer = _i("div", null, null, "position: absolute; height: " + Hl + "px; width: 1px;"), 
r.gutters = _i("div", null, "CodeMirror-gutters"), r.lineGutter = null, r.scroller = _i("div", [ r.sizer, r.heightForcer, r.gutters ], "CodeMirror-scroll"), 
r.scroller.setAttribute("tabIndex", "-1"), r.wrapper = _i("div", [ r.scrollbarFiller, r.gutterFiller, r.scroller ], "CodeMirror"), 
yo && 8 > bo && (r.gutters.style.zIndex = -1, r.scroller.style.paddingRight = 0), 
wo || go && Oo || (r.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(r.wrapper) : e(r.wrapper)), 
r.viewFrom = r.viewTo = t.first, r.reportedViewFrom = r.reportedViewTo = t.first, 
r.view = [], r.renderedView = null, r.externalMeasured = null, r.viewOffset = 0, 
r.lastWrapHeight = r.lastWrapWidth = 0, r.updateLineNumbers = null, r.nativeBarWidth = r.barHeight = r.barWidth = 0, 
r.scrollbarsClipped = !1, r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null, 
r.alignWidgets = !1, r.cachedCharWidth = r.cachedTextHeight = r.cachedPaddingH = null, 
r.maxLine = null, r.maxLineLength = 0, r.maxLineChanged = !1, r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null, 
r.shift = !1, r.selForContextMenu = null, r.activeTouch = null, n.init(r);
}
function n(t) {
t.doc.mode = e.getMode(t.options, t.doc.modeOption), r(t);
}
function r(e) {
e.doc.iter(function(e) {
e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
}), e.doc.frontier = e.doc.first, je(e, 100), e.state.modeGen++, e.curOp && Pt(e);
}
function i(e) {
e.options.lineWrapping ? (Zl(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", 
e.display.sizerWidth = null) : (Yl(e.display.wrapper, "CodeMirror-wrap"), h(e)), 
l(e), Pt(e), at(e), setTimeout(function() {
x(e);
}, 100);
}
function o(e) {
var t = xt(e.display), n = e.options.lineWrapping, r = n && Math.max(5, e.display.scroller.clientWidth / yt(e.display) - 3);
return function(i) {
if (Cr(e.doc, i)) return 0;
var o = 0;
if (i.widgets) for (var l = 0; l < i.widgets.length; l++) i.widgets[l].height && (o += i.widgets[l].height);
return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t;
};
}
function l(e) {
var t = e.doc, n = o(e);
t.iter(function(e) {
var t = n(e);
t != e.height && ei(e, t);
});
}
function a(e) {
e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), 
at(e);
}
function s(e) {
c(e), Pt(e), setTimeout(function() {
w(e);
}, 20);
}
function c(e) {
var t = e.display.gutters, n = e.options.gutters;
qi(t);
for (var r = 0; r < n.length; ++r) {
var i = n[r], o = t.appendChild(_i("div", null, "CodeMirror-gutter " + i));
"CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px");
}
t.style.display = r ? "" : "none", u(e);
}
function u(e) {
var t = e.display.gutters.offsetWidth;
e.display.sizer.style.marginLeft = t + "px";
}
function f(e) {
if (0 == e.height) return 0;
for (var t, n = e.text.length, r = e; t = mr(r); ) {
var i = t.find(0, !0);
r = i.from.line, n += i.from.ch - i.to.ch;
}
for (r = e; t = gr(r); ) {
var i = t.find(0, !0);
n -= r.text.length - i.from.ch, r = i.to.line, n += r.text.length - i.to.ch;
}
return n;
}
function h(e) {
var t = e.display, n = e.doc;
t.maxLine = Zr(n, n.first), t.maxLineLength = f(t.maxLine), t.maxLineChanged = !0, 
n.iter(function(e) {
var n = f(e);
n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e);
});
}
function d(e) {
var t = Di(e.gutters, "CodeMirror-linenumbers");
-1 == t && e.lineNumbers ? e.gutters = e.gutters.concat([ "CodeMirror-linenumbers" ]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), 
e.gutters.splice(t, 1));
}
function p(e) {
var t = e.display, n = t.gutters.offsetWidth, r = Math.round(e.doc.height + Ge(e.display));
return {
clientHeight: t.scroller.clientHeight,
viewHeight: t.wrapper.clientHeight,
scrollWidth: t.scroller.scrollWidth,
clientWidth: t.scroller.clientWidth,
viewWidth: t.wrapper.clientWidth,
barLeft: e.options.fixedGutter ? n : 0,
docHeight: r,
scrollHeight: r + Ve(e) + t.barHeight,
nativeBarWidth: t.nativeBarWidth,
gutterWidth: n
};
}
function m(e, t, n) {
this.cm = n;
var r = this.vert = _i("div", [ _i("div", null, null, "min-width: 1px") ], "CodeMirror-vscrollbar"), i = this.horiz = _i("div", [ _i("div", null, null, "height: 100%; min-height: 1px") ], "CodeMirror-hscrollbar");
e(r), e(i), Ol(r, "scroll", function() {
r.clientHeight && t(r.scrollTop, "vertical");
}), Ol(i, "scroll", function() {
i.clientWidth && t(i.scrollLeft, "horizontal");
}), this.checkedZeroWidth = !1, yo && 8 > bo && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
}
function g() {}
function v(t) {
t.display.scrollbars && (t.display.scrollbars.clear(), t.display.scrollbars.addClass && Yl(t.display.wrapper, t.display.scrollbars.addClass)), 
t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](function(e) {
t.display.wrapper.insertBefore(e, t.display.scrollbarFiller), Ol(e, "mousedown", function() {
t.state.focused && setTimeout(function() {
t.display.input.focus();
}, 0);
}), e.setAttribute("cm-not-content", "true");
}, function(e, n) {
"horizontal" == n ? on(t, e) : rn(t, e);
}, t), t.display.scrollbars.addClass && Zl(t.display.wrapper, t.display.scrollbars.addClass);
}
function x(e, t) {
t || (t = p(e));
var n = e.display.barWidth, r = e.display.barHeight;
y(e, t);
for (var i = 0; 4 > i && n != e.display.barWidth || r != e.display.barHeight; i++) n != e.display.barWidth && e.options.lineWrapping && F(e), 
y(e, p(e)), n = e.display.barWidth, r = e.display.barHeight;
}
function y(e, t) {
var n = e.display, r = n.scrollbars.update(t);
n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", 
r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", 
n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", 
r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", 
n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = "";
}
function b(e, t, n) {
var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
r = Math.floor(r - qe(e));
var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight, o = ni(t, r), l = ni(t, i);
if (n && n.ensure) {
var a = n.ensure.from.line, s = n.ensure.to.line;
o > a ? (o = a, l = ni(t, ri(Zr(t, a)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= l && (o = ni(t, ri(Zr(t, s)) - e.wrapper.clientHeight), 
l = s);
}
return {
from: o,
to: Math.max(l, o + 1)
};
}
function w(e) {
var t = e.display, n = t.view;
if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
for (var r = S(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", l = 0; l < n.length; l++) if (!n[l].hidden) {
e.options.fixedGutter && n[l].gutter && (n[l].gutter.style.left = o);
var a = n[l].alignable;
if (a) for (var s = 0; s < a.length; s++) a[s].style.left = o;
}
e.options.fixedGutter && (t.gutters.style.left = r + i + "px");
}
}
function C(e) {
if (!e.options.lineNumbers) return !1;
var t = e.doc, n = k(e.options, t.first + t.size - 1), r = e.display;
if (n.length != r.lineNumChars) {
var i = r.measure.appendChild(_i("div", [ _i("div", n) ], "CodeMirror-linenumber CodeMirror-gutter-elt")), o = i.firstChild.offsetWidth, l = i.offsetWidth - o;
return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - l) + 1, 
r.lineNumWidth = r.lineNumInnerWidth + l, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, 
r.lineGutter.style.width = r.lineNumWidth + "px", u(e), !0;
}
return !1;
}
function k(e, t) {
return e.lineNumberFormatter(t + e.firstLineNumber) + "";
}
function S(e) {
return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
}
function L(e, t, n) {
var r = e.display;
this.viewport = t, this.visible = b(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, 
this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, 
this.oldDisplayWidth = Ke(e), this.force = n, this.dims = D(e), this.events = [];
}
function T(e) {
var t = e.display;
!t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, 
t.heightForcer.style.height = Ve(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", 
t.sizer.style.borderRightWidth = Ve(e) + "px", t.scrollbarsClipped = !0);
}
function M(e, t) {
var n = e.display, r = e.doc;
if (t.editorIsHidden) return Et(e), !1;
if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == Bt(e)) return !1;
C(e) && (Et(e), t.dims = D(e));
var i = r.first + r.size, o = Math.max(t.visible.from - e.options.viewportMargin, r.first), l = Math.min(i, t.visible.to + e.options.viewportMargin);
n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > l && n.viewTo - l < 20 && (l = Math.min(i, n.viewTo)), 
zo && (o = br(e.doc, o), l = wr(e.doc, l));
var a = o != n.viewFrom || l != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
Rt(e, o, l), n.viewOffset = ri(Zr(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
var s = Bt(e);
if (!a && 0 == s && !t.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)) return !1;
var c = Ui();
return s > 4 && (n.lineDiv.style.display = "none"), H(e, n.updateLineNumbers, t.dims), 
s > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, c && Ui() != c && c.offsetHeight && c.focus(), 
qi(n.cursorDiv), qi(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, 
a && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, je(e, 400)), 
n.updateLineNumbers = null, !0;
}
function A(e, t) {
for (var n = t.viewport, r = !0; (r && e.options.lineWrapping && t.oldDisplayWidth != Ke(e) || (n && null != n.top && (n = {
top: Math.min(e.doc.height + Ge(e.display) - $e(e), n.top)
}), t.visible = b(e.display, e.doc, n), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && M(e, t); r = !1) {
F(e);
var i = p(e);
He(e), N(e, i), x(e, i);
}
t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), 
e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
}
function O(e, t) {
var n = new L(e, t);
if (M(e, n)) {
F(e), A(e, n);
var r = p(e);
He(e), N(e, r), x(e, r), n.finish();
}
}
function N(e, t) {
e.display.sizer.style.minHeight = t.docHeight + "px";
var n = t.docHeight + e.display.barHeight;
e.display.heightForcer.style.top = n + "px", e.display.gutters.style.height = Math.max(n + Ve(e), t.clientHeight) + "px";
}
function F(e) {
for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
var i, o = t.view[r];
if (!o.hidden) {
if (yo && 8 > bo) {
var l = o.node.offsetTop + o.node.offsetHeight;
i = l - n, n = l;
} else {
var a = o.node.getBoundingClientRect();
i = a.bottom - a.top;
}
var s = o.line.height - i;
if (2 > i && (i = xt(t)), (s > .001 || -.001 > s) && (ei(o.line, i), W(o.line), 
o.rest)) for (var c = 0; c < o.rest.length; c++) W(o.rest[c]);
}
}
}
function W(e) {
if (e.widgets) for (var t = 0; t < e.widgets.length; ++t) e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight;
}
function D(e) {
for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, 
++l) n[e.options.gutters[l]] = o.offsetLeft + o.clientLeft + i, r[e.options.gutters[l]] = o.clientWidth;
return {
fixedPos: S(t),
gutterTotalWidth: t.gutters.offsetWidth,
gutterLeft: n,
gutterWidth: r,
wrapperWidth: t.wrapper.clientWidth
};
}
function H(e, t, n) {
function r(t) {
var n = t.nextSibling;
return wo && No && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), 
n;
}
for (var i = e.display, o = e.options.lineNumbers, l = i.lineDiv, a = l.firstChild, s = i.view, c = i.viewFrom, u = 0; u < s.length; u++) {
var f = s[u];
if (f.hidden) ; else if (f.node && f.node.parentNode == l) {
for (;a != f.node; ) a = r(a);
var h = o && null != t && c >= t && f.lineNumber;
f.changes && (Di(f.changes, "gutter") > -1 && (h = !1), P(e, f, c, n)), h && (qi(f.lineNumber), 
f.lineNumber.appendChild(document.createTextNode(k(e.options, c)))), a = f.node.nextSibling;
} else {
var d = q(e, f, c, n);
l.insertBefore(d, a);
}
c += f.size;
}
for (;a; ) a = r(a);
}
function P(e, t, n, r) {
for (var i = 0; i < t.changes.length; i++) {
var o = t.changes[i];
"text" == o ? j(e, t) : "gutter" == o ? B(e, t, n, r) : "class" == o ? R(t) : "widget" == o && _(e, t, r);
}
t.changes = null;
}
function z(e) {
return e.node == e.text && (e.node = _i("div", null, null, "position: relative"), 
e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), 
yo && 8 > bo && (e.node.style.zIndex = 2)), e.node;
}
function E(e) {
var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
if (t && (t += " CodeMirror-linebackground"), e.background) t ? e.background.className = t : (e.background.parentNode.removeChild(e.background), 
e.background = null); else if (t) {
var n = z(e);
e.background = n.insertBefore(_i("div", null, t), n.firstChild);
}
}
function I(e, t) {
var n = e.display.externalMeasured;
return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, 
n.built) : Ir(e, t);
}
function j(e, t) {
var n = t.text.className, r = I(e, t);
t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), 
t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, 
t.textClass = r.textClass, R(t)) : n && (t.text.className = n);
}
function R(e) {
E(e), e.line.wrapClass ? z(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");
var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
e.text.className = t || "";
}
function B(e, t, n, r) {
if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), 
t.gutterBackground = null), t.line.gutterClass) {
var i = z(t);
t.gutterBackground = _i("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"), 
i.insertBefore(t.gutterBackground, t.text);
}
var o = t.line.gutterMarkers;
if (e.options.lineNumbers || o) {
var i = z(t), l = t.gutter = _i("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
if (e.display.input.setUneditable(l), i.insertBefore(l, t.text), t.line.gutterClass && (l.className += " " + t.line.gutterClass), 
!e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = l.appendChild(_i("div", k(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), 
o) for (var a = 0; a < e.options.gutters.length; ++a) {
var s = e.options.gutters[a], c = o.hasOwnProperty(s) && o[s];
c && l.appendChild(_i("div", [ c ], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[s] + "px; width: " + r.gutterWidth[s] + "px"));
}
}
}
function _(e, t, n) {
t.alignable && (t.alignable = null);
for (var r, i = t.node.firstChild; i; i = r) {
var r = i.nextSibling;
"CodeMirror-linewidget" == i.className && t.node.removeChild(i);
}
G(e, t, n);
}
function q(e, t, n, r) {
var i = I(e, t);
return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), 
R(t), B(e, t, n, r), G(e, t, r), t.node;
}
function G(e, t, n) {
if (U(e, t.line, t, n, !0), t.rest) for (var r = 0; r < t.rest.length; r++) U(e, t.rest[r], t, n, !1);
}
function U(e, t, n, r, i) {
if (t.widgets) for (var o = z(n), l = 0, a = t.widgets; l < a.length; ++l) {
var s = a[l], c = _i("div", [ s.node ], "CodeMirror-linewidget");
s.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), V(s, c, n, r), 
e.display.input.setUneditable(c), i && s.above ? o.insertBefore(c, n.gutter || n.text) : o.appendChild(c), 
Si(s, "redraw");
}
}
function V(e, t, n, r) {
if (e.noHScroll) {
(n.alignable || (n.alignable = [])).push(t);
var i = r.wrapperWidth;
t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), 
t.style.width = i + "px";
}
e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
}
function K(e) {
return Eo(e.line, e.ch);
}
function $(e, t) {
return Io(e, t) < 0 ? t : e;
}
function X(e, t) {
return Io(e, t) < 0 ? e : t;
}
function Y(e) {
e.state.focused || (e.display.input.focus(), vn(e));
}
function Z(e, t, n, r, i) {
var o = e.doc;
e.display.shift = !1, r || (r = o.sel);
var l = e.state.pasteIncoming || "paste" == i, a = o.splitLines(t), s = null;
if (l && r.ranges.length > 1) if (jo && jo.join("\n") == t) {
if (r.ranges.length % jo.length == 0) {
s = [];
for (var c = 0; c < jo.length; c++) s.push(o.splitLines(jo[c]));
}
} else a.length == r.ranges.length && (s = Hi(a, function(e) {
return [ e ];
}));
for (var c = r.ranges.length - 1; c >= 0; c--) {
var u = r.ranges[c], f = u.from(), h = u.to();
u.empty() && (n && n > 0 ? f = Eo(f.line, f.ch - n) : e.state.overwrite && !l && (h = Eo(h.line, Math.min(Zr(o, h.line).text.length, h.ch + Wi(a).length))));
var d = e.curOp.updateInput, p = {
from: f,
to: h,
text: s ? s[c % s.length] : a,
origin: i || (l ? "paste" : e.state.cutIncoming ? "cut" : "+input")
};
Tn(e.doc, p), Si(e, "inputRead", e, p);
}
t && !l && Q(e, t), In(e), e.curOp.updateInput = d, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1;
}
function J(e, t) {
var n = e.clipboardData && e.clipboardData.getData("text/plain");
return n ? (e.preventDefault(), t.isReadOnly() || t.options.disableInput || Ot(t, function() {
Z(t, n, 0, null, "paste");
}), !0) : void 0;
}
function Q(e, t) {
if (e.options.electricChars && e.options.smartIndent) for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
var i = n.ranges[r];
if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
var o = e.getModeAt(i.head), l = !1;
if (o.electricChars) {
for (var a = 0; a < o.electricChars.length; a++) if (t.indexOf(o.electricChars.charAt(a)) > -1) {
l = Rn(e, i.head.line, "smart");
break;
}
} else o.electricInput && o.electricInput.test(Zr(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = Rn(e, i.head.line, "smart"));
l && Si(e, "electricInput", e, i.head.line);
}
}
}
function ee(e) {
for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
var i = e.doc.sel.ranges[r].head.line, o = {
anchor: Eo(i, 0),
head: Eo(i + 1, 0)
};
n.push(o), t.push(e.getRange(o.anchor, o.head));
}
return {
text: t,
ranges: n
};
}
function te(e) {
e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", "false");
}
function ne(e) {
this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Ni(), 
this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null;
}
function re() {
var e = _i("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"), t = _i("div", [ e ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
return wo ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), Ao && (e.style.border = "1px solid black"), 
te(e), t;
}
function ie(e) {
this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, 
this.polling = new Ni(), this.gracePeriod = !1;
}
function oe(e, t) {
var n = Qe(e, t.line);
if (!n || n.hidden) return null;
var r = Zr(e.doc, t.line), i = Ye(n, r, t.line), o = ii(r), l = "left";
if (o) {
var a = co(o, t.ch);
l = a % 2 ? "right" : "left";
}
var s = nt(i.map, t.ch, l);
return s.offset = "right" == s.collapse ? s.end : s.start, s;
}
function le(e, t) {
return t && (e.bad = !0), e;
}
function ae(e, t, n) {
var r;
if (t == e.display.lineDiv) {
if (r = e.display.lineDiv.childNodes[n], !r) return le(e.clipPos(Eo(e.display.viewTo - 1)), !0);
t = null, n = 0;
} else for (r = t; ;r = r.parentNode) {
if (!r || r == e.display.lineDiv) return null;
if (r.parentNode && r.parentNode == e.display.lineDiv) break;
}
for (var i = 0; i < e.display.view.length; i++) {
var o = e.display.view[i];
if (o.node == r) return se(o, t, n);
}
}
function se(e, t, n) {
function r(t, n, r) {
for (var i = -1; i < (u ? u.length : 0); i++) for (var o = 0 > i ? c.map : u[i], l = 0; l < o.length; l += 3) {
var a = o[l + 2];
if (a == t || a == n) {
var s = ti(0 > i ? e.line : e.rest[i]), f = o[l] + r;
return (0 > r || a != t) && (f = o[l + (r ? 1 : 0)]), Eo(s, f);
}
}
}
var i = e.text.firstChild, o = !1;
if (!t || !Kl(i, t)) return le(Eo(ti(e.line), 0), !0);
if (t == i && (o = !0, t = i.childNodes[n], n = 0, !t)) {
var l = e.rest ? Wi(e.rest) : e.line;
return le(Eo(ti(l), l.text.length), o);
}
var a = 3 == t.nodeType ? t : null, s = t;
for (a || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (a = t.firstChild, 
n && (n = a.nodeValue.length)); s.parentNode != i; ) s = s.parentNode;
var c = e.measure, u = c.maps, f = r(a, s, n);
if (f) return le(f, o);
for (var h = s.nextSibling, d = a ? a.nodeValue.length - n : 0; h; h = h.nextSibling) {
if (f = r(h, h.firstChild, 0)) return le(Eo(f.line, f.ch - d), o);
d += h.textContent.length;
}
for (var p = s.previousSibling, d = n; p; p = p.previousSibling) {
if (f = r(p, p.firstChild, -1)) return le(Eo(f.line, f.ch + d), o);
d += h.textContent.length;
}
}
function ce(e, t, n, r, i) {
function o(e) {
return function(t) {
return t.id == e;
};
}
function l(t) {
if (1 == t.nodeType) {
var n = t.getAttribute("cm-text");
if (null != n) return "" == n && (n = t.textContent.replace(/\u200b/g, "")), void (a += n);
var u, f = t.getAttribute("cm-marker");
if (f) {
var h = e.findMarks(Eo(r, 0), Eo(i + 1, 0), o(+f));
return void (h.length && (u = h[0].find()) && (a += Jr(e.doc, u.from, u.to).join(c)));
}
if ("false" == t.getAttribute("contenteditable")) return;
for (var d = 0; d < t.childNodes.length; d++) l(t.childNodes[d]);
/^(pre|div|p)$/i.test(t.nodeName) && (s = !0);
} else if (3 == t.nodeType) {
var p = t.nodeValue;
if (!p) return;
s && (a += c, s = !1), a += p;
}
}
for (var a = "", s = !1, c = e.doc.lineSeparator(); l(t), t != n; ) t = t.nextSibling;
return a;
}
function ue(e, t) {
this.ranges = e, this.primIndex = t;
}
function fe(e, t) {
this.anchor = e, this.head = t;
}
function he(e, t) {
var n = e[t];
e.sort(function(e, t) {
return Io(e.from(), t.from());
}), t = Di(e, n);
for (var r = 1; r < e.length; r++) {
var i = e[r], o = e[r - 1];
if (Io(o.to(), i.from()) >= 0) {
var l = X(o.from(), i.from()), a = $(o.to(), i.to()), s = o.empty() ? i.from() == i.head : o.from() == o.head;
t >= r && --t, e.splice(--r, 2, new fe(s ? a : l, s ? l : a));
}
}
return new ue(e, t);
}
function de(e, t) {
return new ue([ new fe(e, t || e) ], 0);
}
function pe(e, t) {
return Math.max(e.first, Math.min(t, e.first + e.size - 1));
}
function me(e, t) {
if (t.line < e.first) return Eo(e.first, 0);
var n = e.first + e.size - 1;
return t.line > n ? Eo(n, Zr(e, n).text.length) : ge(t, Zr(e, t.line).text.length);
}
function ge(e, t) {
var n = e.ch;
return null == n || n > t ? Eo(e.line, t) : 0 > n ? Eo(e.line, 0) : e;
}
function ve(e, t) {
return t >= e.first && t < e.first + e.size;
}
function xe(e, t) {
for (var n = [], r = 0; r < t.length; r++) n[r] = me(e, t[r]);
return n;
}
function ye(e, t, n, r) {
if (e.cm && e.cm.display.shift || e.extend) {
var i = t.anchor;
if (r) {
var o = Io(n, i) < 0;
o != Io(r, i) < 0 ? (i = n, n = r) : o != Io(n, r) < 0 && (n = r);
}
return new fe(i, n);
}
return new fe(r || n, n);
}
function be(e, t, n, r) {
Te(e, new ue([ ye(e, e.sel.primary(), t, n) ], 0), r);
}
function we(e, t, n) {
for (var r = [], i = 0; i < e.sel.ranges.length; i++) r[i] = ye(e, e.sel.ranges[i], t[i], null);
var o = he(r, e.sel.primIndex);
Te(e, o, n);
}
function Ce(e, t, n, r) {
var i = e.sel.ranges.slice(0);
i[t] = n, Te(e, he(i, e.sel.primIndex), r);
}
function ke(e, t, n, r) {
Te(e, de(t, n), r);
}
function Se(e, t, n) {
var r = {
ranges: t.ranges,
update: function(t) {
this.ranges = [];
for (var n = 0; n < t.length; n++) this.ranges[n] = new fe(me(e, t[n].anchor), me(e, t[n].head));
},
origin: n && n.origin
};
return Wl(e, "beforeSelectionChange", e, r), e.cm && Wl(e.cm, "beforeSelectionChange", e.cm, r), 
r.ranges != t.ranges ? he(r.ranges, r.ranges.length - 1) : t;
}
function Le(e, t, n) {
var r = e.history.done, i = Wi(r);
i && i.ranges ? (r[r.length - 1] = t, Me(e, t, n)) : Te(e, t, n);
}
function Te(e, t, n) {
Me(e, t, n), fi(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
}
function Me(e, t, n) {
(Ai(e, "beforeSelectionChange") || e.cm && Ai(e.cm, "beforeSelectionChange")) && (t = Se(e, t, n));
var r = n && n.bias || (Io(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
Ae(e, Ne(e, t, r, !0)), n && n.scroll === !1 || !e.cm || In(e.cm);
}
function Ae(e, t) {
t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, 
Mi(e.cm)), Si(e, "cursorActivity", e));
}
function Oe(e) {
Ae(e, Ne(e, e.sel, null, !1), zl);
}
function Ne(e, t, n, r) {
for (var i, o = 0; o < t.ranges.length; o++) {
var l = t.ranges[o], a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o], s = We(e, l.anchor, a && a.anchor, n, r), c = We(e, l.head, a && a.head, n, r);
(i || s != l.anchor || c != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new fe(s, c));
}
return i ? he(i, t.primIndex) : t;
}
function Fe(e, t, n, r, i) {
var o = Zr(e, t.line);
if (o.markedSpans) for (var l = 0; l < o.markedSpans.length; ++l) {
var a = o.markedSpans[l], s = a.marker;
if ((null == a.from || (s.inclusiveLeft ? a.from <= t.ch : a.from < t.ch)) && (null == a.to || (s.inclusiveRight ? a.to >= t.ch : a.to > t.ch))) {
if (i && (Wl(s, "beforeCursorEnter"), s.explicitlyCleared)) {
if (o.markedSpans) {
--l;
continue;
}
break;
}
if (!s.atomic) continue;
if (n) {
var c, u = s.find(0 > r ? 1 : -1);
if ((0 > r ? s.inclusiveRight : s.inclusiveLeft) && (u = De(e, u, -r, o)), u && u.line == t.line && (c = Io(u, n)) && (0 > r ? 0 > c : c > 0)) return Fe(e, u, t, r, i);
}
var f = s.find(0 > r ? -1 : 1);
return (0 > r ? s.inclusiveLeft : s.inclusiveRight) && (f = De(e, f, r, o)), f ? Fe(e, f, t, r, i) : null;
}
}
return t;
}
function We(e, t, n, r, i) {
var o = r || 1, l = Fe(e, t, n, o, i) || !i && Fe(e, t, n, o, !0) || Fe(e, t, n, -o, i) || !i && Fe(e, t, n, -o, !0);
return l ? l : (e.cantEdit = !0, Eo(e.first, 0));
}
function De(e, t, n, r) {
return 0 > n && 0 == t.ch ? t.line > e.first ? me(e, Eo(t.line - 1)) : null : n > 0 && t.ch == (r || Zr(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? Eo(t.line + 1, 0) : null : new Eo(t.line, t.ch + n);
}
function He(e) {
e.display.input.showSelection(e.display.input.prepareSelection());
}
function Pe(e, t) {
for (var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), l = 0; l < n.sel.ranges.length; l++) if (t !== !1 || l != n.sel.primIndex) {
var a = n.sel.ranges[l], s = a.empty();
(s || e.options.showCursorWhenSelecting) && ze(e, a.head, i), s || Ee(e, a, o);
}
return r;
}
function ze(e, t, n) {
var r = dt(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), i = n.appendChild(_i("div", " ", "CodeMirror-cursor"));
if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", 
r.other) {
var o = n.appendChild(_i("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
o.style.display = "", o.style.left = r.other.left + "px", o.style.top = r.other.top + "px", 
o.style.height = .85 * (r.other.bottom - r.other.top) + "px";
}
}
function Ee(e, t, n) {
function r(e, t, n, r) {
0 > t && (t = 0), t = Math.round(t), r = Math.round(r), a.appendChild(_i("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == n ? u - e : n) + "px; height: " + (r - t) + "px"));
}
function i(t, n, i) {
function o(n, r) {
return ht(e, Eo(t, n), "div", f, r);
}
var a, s, f = Zr(l, t), h = f.text.length;
return eo(ii(f), n || 0, null == i ? h : i, function(e, t, l) {
var f, d, p, m = o(e, "left");
if (e == t) f = m, d = p = m.left; else {
if (f = o(t - 1, "right"), "rtl" == l) {
var g = m;
m = f, f = g;
}
d = m.left, p = f.right;
}
null == n && 0 == e && (d = c), f.top - m.top > 3 && (r(d, m.top, null, m.bottom), 
d = c, m.bottom < f.top && r(d, m.bottom, null, f.top)), null == i && t == h && (p = u), 
(!a || m.top < a.top || m.top == a.top && m.left < a.left) && (a = m), (!s || f.bottom > s.bottom || f.bottom == s.bottom && f.right > s.right) && (s = f), 
c + 1 > d && (d = c), r(d, f.top, p - d, f.bottom);
}), {
start: a,
end: s
};
}
var o = e.display, l = e.doc, a = document.createDocumentFragment(), s = Ue(e.display), c = s.left, u = Math.max(o.sizerWidth, Ke(e) - o.sizer.offsetLeft) - s.right, f = t.from(), h = t.to();
if (f.line == h.line) i(f.line, f.ch, h.ch); else {
var d = Zr(l, f.line), p = Zr(l, h.line), m = xr(d) == xr(p), g = i(f.line, f.ch, m ? d.text.length + 1 : null).end, v = i(h.line, m ? 0 : null, h.ch).start;
m && (g.top < v.top - 2 ? (r(g.right, g.top, null, g.bottom), r(c, v.top, v.left, v.bottom)) : r(g.right, g.top, v.left - g.right, g.bottom)), 
g.bottom < v.top && r(c, g.bottom, null, v.top);
}
n.appendChild(a);
}
function Ie(e) {
if (e.state.focused) {
var t = e.display;
clearInterval(t.blinker);
var n = !0;
t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden";
}, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
}
}
function je(e, t) {
e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, Ii(Re, e));
}
function Re(e) {
var t = e.doc;
if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
var n = +new Date() + e.options.workTime, r = al(t.mode, _e(e, t.frontier)), i = [];
t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
if (t.frontier >= e.display.viewFrom) {
var l = o.styles, a = o.text.length > e.options.maxHighlightLength, s = Hr(e, o, a ? al(t.mode, r) : r, !0);
o.styles = s.styles;
var c = o.styleClasses, u = s.classes;
u ? o.styleClasses = u : c && (o.styleClasses = null);
for (var f = !l || l.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), h = 0; !f && h < l.length; ++h) f = l[h] != o.styles[h];
f && i.push(t.frontier), o.stateAfter = a ? r : al(t.mode, r);
} else o.text.length <= e.options.maxHighlightLength && zr(e, o.text, r), o.stateAfter = t.frontier % 5 == 0 ? al(t.mode, r) : null;
return ++t.frontier, +new Date() > n ? (je(e, e.options.workDelay), !0) : void 0;
}), i.length && Ot(e, function() {
for (var t = 0; t < i.length; t++) zt(e, i[t], "text");
});
}
}
function Be(e, t, n) {
for (var r, i, o = e.doc, l = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > l; --a) {
if (a <= o.first) return o.first;
var s = Zr(o, a - 1);
if (s.stateAfter && (!n || a <= o.frontier)) return a;
var c = jl(s.text, null, e.options.tabSize);
(null == i || r > c) && (i = a - 1, r = c);
}
return i;
}
function _e(e, t, n) {
var r = e.doc, i = e.display;
if (!r.mode.startState) return !0;
var o = Be(e, t, n), l = o > r.first && Zr(r, o - 1).stateAfter;
return l = l ? al(r.mode, l) : sl(r.mode), r.iter(o, t, function(n) {
zr(e, n.text, l);
var a = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;
n.stateAfter = a ? al(r.mode, l) : null, ++o;
}), n && (r.frontier = o), l;
}
function qe(e) {
return e.lineSpace.offsetTop;
}
function Ge(e) {
return e.mover.offsetHeight - e.lineSpace.offsetHeight;
}
function Ue(e) {
if (e.cachedPaddingH) return e.cachedPaddingH;
var t = Gi(e.measure, _i("pre", "x")), n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, r = {
left: parseInt(n.paddingLeft),
right: parseInt(n.paddingRight)
};
return isNaN(r.left) || isNaN(r.right) || (e.cachedPaddingH = r), r;
}
function Ve(e) {
return Hl - e.display.nativeBarWidth;
}
function Ke(e) {
return e.display.scroller.clientWidth - Ve(e) - e.display.barWidth;
}
function $e(e) {
return e.display.scroller.clientHeight - Ve(e) - e.display.barHeight;
}
function Xe(e, t, n) {
var r = e.options.lineWrapping, i = r && Ke(e);
if (!t.measure.heights || r && t.measure.width != i) {
var o = t.measure.heights = [];
if (r) {
t.measure.width = i;
for (var l = t.text.firstChild.getClientRects(), a = 0; a < l.length - 1; a++) {
var s = l[a], c = l[a + 1];
Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - n.top);
}
}
o.push(n.bottom - n.top);
}
}
function Ye(e, t, n) {
if (e.line == t) return {
map: e.measure.map,
cache: e.measure.cache
};
for (var r = 0; r < e.rest.length; r++) if (e.rest[r] == t) return {
map: e.measure.maps[r],
cache: e.measure.caches[r]
};
for (var r = 0; r < e.rest.length; r++) if (ti(e.rest[r]) > n) return {
map: e.measure.maps[r],
cache: e.measure.caches[r],
before: !0
};
}
function Ze(e, t) {
t = xr(t);
var n = ti(t), r = e.display.externalMeasured = new Dt(e.doc, t, n);
r.lineN = n;
var i = r.built = Ir(e, r);
return r.text = i.pre, Gi(e.display.lineMeasure, i.pre), r;
}
function Je(e, t, n, r) {
return tt(e, et(e, t), n, r);
}
function Qe(e, t) {
if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[It(e, t)];
var n = e.display.externalMeasured;
return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0;
}
function et(e, t) {
var n = ti(t), r = Qe(e, n);
r && !r.text ? r = null : r && r.changes && (P(e, r, n, D(e)), e.curOp.forceUpdate = !0), 
r || (r = Ze(e, t));
var i = Ye(r, t, n);
return {
line: t,
view: r,
rect: null,
map: i.map,
cache: i.cache,
before: i.before,
hasHeights: !1
};
}
function tt(e, t, n, r, i) {
t.before && (n = -1);
var o, l = n + (r || "");
return t.cache.hasOwnProperty(l) ? o = t.cache[l] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), 
t.hasHeights || (Xe(e, t.view, t.rect), t.hasHeights = !0), o = rt(e, t, n, r), 
o.bogus || (t.cache[l] = o)), {
left: o.left,
right: o.right,
top: i ? o.rtop : o.top,
bottom: i ? o.rbottom : o.bottom
};
}
function nt(e, t, n) {
for (var r, i, o, l, a = 0; a < e.length; a += 3) {
var s = e[a], c = e[a + 1];
if (s > t ? (i = 0, o = 1, l = "left") : c > t ? (i = t - s, o = i + 1) : (a == e.length - 3 || t == c && e[a + 3] > t) && (o = c - s, 
i = o - 1, t >= c && (l = "right")), null != i) {
if (r = e[a + 2], s == c && n == (r.insertLeft ? "left" : "right") && (l = n), "left" == n && 0 == i) for (;a && e[a - 2] == e[a - 3] && e[a - 1].insertLeft; ) r = e[(a -= 3) + 2], 
l = "left";
if ("right" == n && i == c - s) for (;a < e.length - 3 && e[a + 3] == e[a + 4] && !e[a + 5].insertLeft; ) r = e[(a += 3) + 2], 
l = "right";
break;
}
}
return {
node: r,
start: i,
end: o,
collapse: l,
coverStart: s,
coverEnd: c
};
}
function rt(e, t, n, r) {
var i, o = nt(t.map, n, r), l = o.node, a = o.start, s = o.end, c = o.collapse;
if (3 == l.nodeType) {
for (var u = 0; 4 > u; u++) {
for (;a && Bi(t.line.text.charAt(o.coverStart + a)); ) --a;
for (;o.coverStart + s < o.coverEnd && Bi(t.line.text.charAt(o.coverStart + s)); ) ++s;
if (yo && 9 > bo && 0 == a && s == o.coverEnd - o.coverStart) i = l.parentNode.getBoundingClientRect(); else if (yo && e.options.lineWrapping) {
var f = ql(l, a, s).getClientRects();
i = f.length ? f["right" == r ? f.length - 1 : 0] : qo;
} else i = ql(l, a, s).getBoundingClientRect() || qo;
if (i.left || i.right || 0 == a) break;
s = a, a -= 1, c = "right";
}
yo && 11 > bo && (i = it(e.display.measure, i));
} else {
a > 0 && (c = r = "right");
var f;
i = e.options.lineWrapping && (f = l.getClientRects()).length > 1 ? f["right" == r ? f.length - 1 : 0] : l.getBoundingClientRect();
}
if (yo && 9 > bo && !a && (!i || !i.left && !i.right)) {
var h = l.parentNode.getClientRects()[0];
i = h ? {
left: h.left,
right: h.left + yt(e.display),
top: h.top,
bottom: h.bottom
} : qo;
}
for (var d = i.top - t.rect.top, p = i.bottom - t.rect.top, m = (d + p) / 2, g = t.view.measure.heights, u = 0; u < g.length - 1 && !(m < g[u]); u++) ;
var v = u ? g[u - 1] : 0, x = g[u], y = {
left: ("right" == c ? i.right : i.left) - t.rect.left,
right: ("left" == c ? i.left : i.right) - t.rect.left,
top: v,
bottom: x
};
return i.left || i.right || (y.bogus = !0), e.options.singleCursorHeightPerLine || (y.rtop = d, 
y.rbottom = p), y;
}
function it(e, t) {
if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Qi(e)) return t;
var n = screen.logicalXDPI / screen.deviceXDPI, r = screen.logicalYDPI / screen.deviceYDPI;
return {
left: t.left * n,
right: t.right * n,
top: t.top * r,
bottom: t.bottom * r
};
}
function ot(e) {
if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest)) for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {};
}
function lt(e) {
e.display.externalMeasure = null, qi(e.display.lineMeasure);
for (var t = 0; t < e.display.view.length; t++) ot(e.display.view[t]);
}
function at(e) {
lt(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, 
e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
}
function st() {
return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
}
function ct() {
return window.pageYOffset || (document.documentElement || document.body).scrollTop;
}
function ut(e, t, n, r) {
if (t.widgets) for (var i = 0; i < t.widgets.length; ++i) if (t.widgets[i].above) {
var o = Lr(t.widgets[i]);
n.top += o, n.bottom += o;
}
if ("line" == r) return n;
r || (r = "local");
var l = ri(t);
if ("local" == r ? l += qe(e.display) : l -= e.display.viewOffset, "page" == r || "window" == r) {
var a = e.display.lineSpace.getBoundingClientRect();
l += a.top + ("window" == r ? 0 : ct());
var s = a.left + ("window" == r ? 0 : st());
n.left += s, n.right += s;
}
return n.top += l, n.bottom += l, n;
}
function ft(e, t, n) {
if ("div" == n) return t;
var r = t.left, i = t.top;
if ("page" == n) r -= st(), i -= ct(); else if ("local" == n || !n) {
var o = e.display.sizer.getBoundingClientRect();
r += o.left, i += o.top;
}
var l = e.display.lineSpace.getBoundingClientRect();
return {
left: r - l.left,
top: i - l.top
};
}
function ht(e, t, n, r, i) {
return r || (r = Zr(e.doc, t.line)), ut(e, r, Je(e, r, t.ch, i), n);
}
function dt(e, t, n, r, i, o) {
function l(t, l) {
var a = tt(e, i, t, l ? "right" : "left", o);
return l ? a.left = a.right : a.right = a.left, ut(e, r, a, n);
}
function a(e, t) {
var n = s[t], r = n.level % 2;
return e == to(n) && t && n.level < s[t - 1].level ? (n = s[--t], e = no(n) - (n.level % 2 ? 0 : 1), 
r = !0) : e == no(n) && t < s.length - 1 && n.level < s[t + 1].level && (n = s[++t], 
e = to(n) - n.level % 2, r = !1), r && e == n.to && e > n.from ? l(e - 1) : l(e, r);
}
r = r || Zr(e.doc, t.line), i || (i = et(e, r));
var s = ii(r), c = t.ch;
if (!s) return l(c);
var u = co(s, c), f = a(c, u);
return null != oa && (f.other = a(c, oa)), f;
}
function pt(e, t) {
var n = 0, t = me(e.doc, t);
e.options.lineWrapping || (n = yt(e.display) * t.ch);
var r = Zr(e.doc, t.line), i = ri(r) + qe(e.display);
return {
left: n,
right: n,
top: i,
bottom: i + r.height
};
}
function mt(e, t, n, r) {
var i = Eo(e, t);
return i.xRel = r, n && (i.outside = !0), i;
}
function gt(e, t, n) {
var r = e.doc;
if (n += e.display.viewOffset, 0 > n) return mt(r.first, 0, !0, -1);
var i = ni(r, n), o = r.first + r.size - 1;
if (i > o) return mt(r.first + r.size - 1, Zr(r, o).text.length, !0, 1);
0 > t && (t = 0);
for (var l = Zr(r, i); ;) {
var a = vt(e, l, i, t, n), s = gr(l), c = s && s.find(0, !0);
if (!s || !(a.ch > c.from.ch || a.ch == c.from.ch && a.xRel > 0)) return a;
i = ti(l = c.to.line);
}
}
function vt(e, t, n, r, i) {
function o(r) {
var i = dt(e, Eo(n, r), "line", t, c);
return a = !0, l > i.bottom ? i.left - s : l < i.top ? i.left + s : (a = !1, i.left);
}
var l = i - ri(t), a = !1, s = 2 * e.display.wrapper.clientWidth, c = et(e, t), u = ii(t), f = t.text.length, h = ro(t), d = io(t), p = o(h), m = a, g = o(d), v = a;
if (r > g) return mt(n, d, v, 1);
for (;;) {
if (u ? d == h || d == fo(t, h, 1) : 1 >= d - h) {
for (var x = p > r || g - r >= r - p ? h : d, y = r - (x == h ? p : g); Bi(t.text.charAt(x)); ) ++x;
var b = mt(n, x, x == h ? m : v, -1 > y ? -1 : y > 1 ? 1 : 0);
return b;
}
var w = Math.ceil(f / 2), C = h + w;
if (u) {
C = h;
for (var k = 0; w > k; ++k) C = fo(t, C, 1);
}
var S = o(C);
S > r ? (d = C, g = S, (v = a) && (g += 1e3), f = w) : (h = C, p = S, m = a, f -= w);
}
}
function xt(e) {
if (null != e.cachedTextHeight) return e.cachedTextHeight;
if (null == Ro) {
Ro = _i("pre");
for (var t = 0; 49 > t; ++t) Ro.appendChild(document.createTextNode("x")), Ro.appendChild(_i("br"));
Ro.appendChild(document.createTextNode("x"));
}
Gi(e.measure, Ro);
var n = Ro.offsetHeight / 50;
return n > 3 && (e.cachedTextHeight = n), qi(e.measure), n || 1;
}
function yt(e) {
if (null != e.cachedCharWidth) return e.cachedCharWidth;
var t = _i("span", "xxxxxxxxxx"), n = _i("pre", [ t ]);
Gi(e.measure, n);
var r = t.getBoundingClientRect(), i = (r.right - r.left) / 10;
return i > 2 && (e.cachedCharWidth = i), i || 10;
}
function bt(e) {
e.curOp = {
cm: e,
viewChanged: !1,
startHeight: e.doc.height,
forceUpdate: !1,
updateInput: null,
typing: !1,
changeObjs: null,
cursorActivityHandlers: null,
cursorActivityCalled: 0,
selectionChanged: !1,
updateMaxLine: !1,
scrollLeft: null,
scrollTop: null,
scrollToPos: null,
focus: !1,
id: ++Uo
}, Go ? Go.ops.push(e.curOp) : e.curOp.ownsGroup = Go = {
ops: [ e.curOp ],
delayedCallbacks: []
};
}
function wt(e) {
var t = e.delayedCallbacks, n = 0;
do {
for (;n < t.length; n++) t[n].call(null);
for (var r = 0; r < e.ops.length; r++) {
var i = e.ops[r];
if (i.cursorActivityHandlers) for (;i.cursorActivityCalled < i.cursorActivityHandlers.length; ) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
}
} while (n < t.length);
}
function Ct(e) {
var t = e.curOp, n = t.ownsGroup;
if (n) try {
wt(n);
} finally {
Go = null;
for (var r = 0; r < n.ops.length; r++) n.ops[r].cm.curOp = null;
kt(n);
}
}
function kt(e) {
for (var t = e.ops, n = 0; n < t.length; n++) St(t[n]);
for (var n = 0; n < t.length; n++) Lt(t[n]);
for (var n = 0; n < t.length; n++) Tt(t[n]);
for (var n = 0; n < t.length; n++) Mt(t[n]);
for (var n = 0; n < t.length; n++) At(t[n]);
}
function St(e) {
var t = e.cm, n = t.display;
T(t), e.updateMaxLine && h(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, 
e.update = e.mustUpdate && new L(t, e.mustUpdate && {
top: e.scrollTop,
ensure: e.scrollToPos
}, e.forceUpdate);
}
function Lt(e) {
e.updatedDisplay = e.mustUpdate && M(e.cm, e.update);
}
function Tt(e) {
var t = e.cm, n = t.display;
e.updatedDisplay && F(t), e.barMeasure = p(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Je(t, n.maxLine, n.maxLine.text.length).left + 3, 
t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Ve(t) + t.display.barWidth), 
e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Ke(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection());
}
function Mt(e) {
var t = e.cm;
null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", 
e.maxScrollLeft < t.doc.scrollLeft && on(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), 
t.display.maxLineChanged = !1), e.preparedSelection && t.display.input.showSelection(e.preparedSelection), 
e.updatedDisplay && N(t, e.barMeasure), (e.updatedDisplay || e.startHeight != t.doc.height) && x(t, e.barMeasure), 
e.selectionChanged && Ie(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), 
!e.focus || e.focus != Ui() || document.hasFocus && !document.hasFocus() || Y(e.cm);
}
function At(e) {
var t = e.cm, n = t.display, r = t.doc;
if (e.updatedDisplay && A(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null), 
null == e.scrollTop || n.scroller.scrollTop == e.scrollTop && !e.forceScroll || (r.scrollTop = Math.max(0, Math.min(n.scroller.scrollHeight - n.scroller.clientHeight, e.scrollTop)), 
n.scrollbars.setScrollTop(r.scrollTop), n.scroller.scrollTop = r.scrollTop), null == e.scrollLeft || n.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (r.scrollLeft = Math.max(0, Math.min(n.scroller.scrollWidth - Ke(t), e.scrollLeft)), 
n.scrollbars.setScrollLeft(r.scrollLeft), n.scroller.scrollLeft = r.scrollLeft, 
w(t)), e.scrollToPos) {
var i = Hn(t, me(r, e.scrollToPos.from), me(r, e.scrollToPos.to), e.scrollToPos.margin);
e.scrollToPos.isCursor && t.state.focused && Dn(t, i);
}
var o = e.maybeHiddenMarkers, l = e.maybeUnhiddenMarkers;
if (o) for (var a = 0; a < o.length; ++a) o[a].lines.length || Wl(o[a], "hide");
if (l) for (var a = 0; a < l.length; ++a) l[a].lines.length && Wl(l[a], "unhide");
n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Wl(t, "changes", t, e.changeObjs), 
e.update && e.update.finish();
}
function Ot(e, t) {
if (e.curOp) return t();
bt(e);
try {
return t();
} finally {
Ct(e);
}
}
function Nt(e, t) {
return function() {
if (e.curOp) return t.apply(e, arguments);
bt(e);
try {
return t.apply(e, arguments);
} finally {
Ct(e);
}
};
}
function Ft(e) {
return function() {
if (this.curOp) return e.apply(this, arguments);
bt(this);
try {
return e.apply(this, arguments);
} finally {
Ct(this);
}
};
}
function Wt(e) {
return function() {
var t = this.cm;
if (!t || t.curOp) return e.apply(this, arguments);
bt(t);
try {
return e.apply(this, arguments);
} finally {
Ct(t);
}
};
}
function Dt(e, t, n) {
this.line = t, this.rest = yr(t), this.size = this.rest ? ti(Wi(this.rest)) - n + 1 : 1, 
this.node = this.text = null, this.hidden = Cr(e, t);
}
function Ht(e, t, n) {
for (var r, i = [], o = t; n > o; o = r) {
var l = new Dt(e.doc, Zr(e.doc, o), o);
r = o + l.size, i.push(l);
}
return i;
}
function Pt(e, t, n, r) {
null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);
var i = e.display;
if (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), 
e.curOp.viewChanged = !0, t >= i.viewTo) zo && br(e.doc, t) < i.viewTo && Et(e); else if (n <= i.viewFrom) zo && wr(e.doc, n + r) > i.viewFrom ? Et(e) : (i.viewFrom += r, 
i.viewTo += r); else if (t <= i.viewFrom && n >= i.viewTo) Et(e); else if (t <= i.viewFrom) {
var o = jt(e, n, n + r, 1);
o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : Et(e);
} else if (n >= i.viewTo) {
var o = jt(e, t, t, -1);
o ? (i.view = i.view.slice(0, o.index), i.viewTo = o.lineN) : Et(e);
} else {
var l = jt(e, t, t, -1), a = jt(e, n, n + r, 1);
l && a ? (i.view = i.view.slice(0, l.index).concat(Ht(e, l.lineN, a.lineN)).concat(i.view.slice(a.index)), 
i.viewTo += r) : Et(e);
}
var s = i.externalMeasured;
s && (n < s.lineN ? s.lineN += r : t < s.lineN + s.size && (i.externalMeasured = null));
}
function zt(e, t, n) {
e.curOp.viewChanged = !0;
var r = e.display, i = e.display.externalMeasured;
if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
var o = r.view[It(e, t)];
if (null != o.node) {
var l = o.changes || (o.changes = []);
-1 == Di(l, n) && l.push(n);
}
}
}
function Et(e) {
e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
}
function It(e, t) {
if (t >= e.display.viewTo) return null;
if (t -= e.display.viewFrom, 0 > t) return null;
for (var n = e.display.view, r = 0; r < n.length; r++) if (t -= n[r].size, 0 > t) return r;
}
function jt(e, t, n, r) {
var i, o = It(e, t), l = e.display.view;
if (!zo || n == e.doc.first + e.doc.size) return {
index: o,
lineN: n
};
for (var a = 0, s = e.display.viewFrom; o > a; a++) s += l[a].size;
if (s != t) {
if (r > 0) {
if (o == l.length - 1) return null;
i = s + l[o].size - t, o++;
} else i = s - t;
t += i, n += i;
}
for (;br(e.doc, n) != n; ) {
if (o == (0 > r ? 0 : l.length - 1)) return null;
n += r * l[o - (0 > r ? 1 : 0)].size, o += r;
}
return {
index: o,
lineN: n
};
}
function Rt(e, t, n) {
var r = e.display, i = r.view;
0 == i.length || t >= r.viewTo || n <= r.viewFrom ? (r.view = Ht(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = Ht(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(It(e, t))), 
r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(Ht(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, It(e, n)))), 
r.viewTo = n;
}
function Bt(e) {
for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
var i = t[r];
i.hidden || i.node && !i.changes || ++n;
}
return n;
}
function _t(e) {
function t() {
i.activeTouch && (o = setTimeout(function() {
i.activeTouch = null;
}, 1e3), l = i.activeTouch, l.end = +new Date());
}
function n(e) {
if (1 != e.touches.length) return !1;
var t = e.touches[0];
return t.radiusX <= 1 && t.radiusY <= 1;
}
function r(e, t) {
if (null == t.left) return !0;
var n = t.left - e.left, r = t.top - e.top;
return n * n + r * r > 400;
}
var i = e.display;
Ol(i.scroller, "mousedown", Nt(e, Kt)), yo && 11 > bo ? Ol(i.scroller, "dblclick", Nt(e, function(t) {
if (!Ti(e, t)) {
var n = Vt(e, t);
if (n && !Jt(e, t) && !Ut(e.display, t)) {
Tl(t);
var r = e.findWordAt(n);
be(e.doc, r.anchor, r.head);
}
}
})) : Ol(i.scroller, "dblclick", function(t) {
Ti(e, t) || Tl(t);
}), Ho || Ol(i.scroller, "contextmenu", function(t) {
yn(e, t);
});
var o, l = {
end: 0
};
Ol(i.scroller, "touchstart", function(t) {
if (!Ti(e, t) && !n(t)) {
clearTimeout(o);
var r = +new Date();
i.activeTouch = {
start: r,
moved: !1,
prev: r - l.end <= 300 ? l : null
}, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY);
}
}), Ol(i.scroller, "touchmove", function() {
i.activeTouch && (i.activeTouch.moved = !0);
}), Ol(i.scroller, "touchend", function(n) {
var o = i.activeTouch;
if (o && !Ut(i, n) && null != o.left && !o.moved && new Date() - o.start < 300) {
var l, a = e.coordsChar(i.activeTouch, "page");
l = !o.prev || r(o, o.prev) ? new fe(a, a) : !o.prev.prev || r(o, o.prev.prev) ? e.findWordAt(a) : new fe(Eo(a.line, 0), me(e.doc, Eo(a.line + 1, 0))), 
e.setSelection(l.anchor, l.head), e.focus(), Tl(n);
}
t();
}), Ol(i.scroller, "touchcancel", t), Ol(i.scroller, "scroll", function() {
i.scroller.clientHeight && (rn(e, i.scroller.scrollTop), on(e, i.scroller.scrollLeft, !0), 
Wl(e, "scroll", e));
}), Ol(i.scroller, "mousewheel", function(t) {
ln(e, t);
}), Ol(i.scroller, "DOMMouseScroll", function(t) {
ln(e, t);
}), Ol(i.wrapper, "scroll", function() {
i.wrapper.scrollTop = i.wrapper.scrollLeft = 0;
}), i.dragFunctions = {
enter: function(t) {
Ti(e, t) || Al(t);
},
over: function(t) {
Ti(e, t) || (tn(e, t), Al(t));
},
start: function(t) {
en(e, t);
},
drop: Nt(e, Qt),
leave: function() {
nn(e);
}
};
var a = i.input.getField();
Ol(a, "keyup", function(t) {
pn.call(e, t);
}), Ol(a, "keydown", Nt(e, hn)), Ol(a, "keypress", Nt(e, mn)), Ol(a, "focus", Ii(vn, e)), 
Ol(a, "blur", Ii(xn, e));
}
function qt(t, n, r) {
var i = r && r != e.Init;
if (!n != !i) {
var o = t.display.dragFunctions, l = n ? Ol : Fl;
l(t.display.scroller, "dragstart", o.start), l(t.display.scroller, "dragenter", o.enter), 
l(t.display.scroller, "dragover", o.over), l(t.display.scroller, "dragleave", o.leave), 
l(t.display.scroller, "drop", o.drop);
}
}
function Gt(e) {
var t = e.display;
(t.lastWrapHeight != t.wrapper.clientHeight || t.lastWrapWidth != t.wrapper.clientWidth) && (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, 
t.scrollbarsClipped = !1, e.setSize());
}
function Ut(e, t) {
for (var n = wi(t); n != e.wrapper; n = n.parentNode) if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return !0;
}
function Vt(e, t, n, r) {
var i = e.display;
if (!n && "true" == wi(t).getAttribute("cm-not-content")) return null;
var o, l, a = i.lineSpace.getBoundingClientRect();
try {
o = t.clientX - a.left, l = t.clientY - a.top;
} catch (t) {
return null;
}
var s, c = gt(e, o, l);
if (r && 1 == c.xRel && (s = Zr(e.doc, c.line).text).length == c.ch) {
var u = jl(s, s.length, e.options.tabSize) - s.length;
c = Eo(c.line, Math.max(0, Math.round((o - Ue(e.display).left) / yt(e.display)) - u));
}
return c;
}
function Kt(e) {
var t = this, n = t.display;
if (!(Ti(t, e) || n.activeTouch && n.input.supportsTouch())) {
if (n.shift = e.shiftKey, Ut(n, e)) return void (wo || (n.scroller.draggable = !1, 
setTimeout(function() {
n.scroller.draggable = !0;
}, 100)));
if (!Jt(t, e)) {
var r = Vt(t, e);
switch (window.focus(), Ci(e)) {
case 1:
t.state.selectingText ? t.state.selectingText(e) : r ? $t(t, e, r) : wi(e) == n.scroller && Tl(e);
break;

case 2:
wo && (t.state.lastMiddleDown = +new Date()), r && be(t.doc, r), setTimeout(function() {
n.input.focus();
}, 20), Tl(e);
break;

case 3:
Ho ? yn(t, e) : gn(t);
}
}
}
}
function $t(e, t, n) {
yo ? setTimeout(Ii(Y, e), 0) : e.curOp.focus = Ui();
var r, i = +new Date();
_o && _o.time > i - 400 && 0 == Io(_o.pos, n) ? r = "triple" : Bo && Bo.time > i - 400 && 0 == Io(Bo.pos, n) ? (r = "double", 
_o = {
time: i,
pos: n
}) : (r = "single", Bo = {
time: i,
pos: n
});
var o, l = e.doc.sel, a = No ? t.metaKey : t.ctrlKey;
e.options.dragDrop && Ql && !e.isReadOnly() && "single" == r && (o = l.contains(n)) > -1 && (Io((o = l.ranges[o]).from(), n) < 0 || n.xRel > 0) && (Io(o.to(), n) > 0 || n.xRel < 0) ? Xt(e, t, n, a) : Yt(e, t, n, r, a);
}
function Xt(e, t, n, r) {
var i = e.display, o = +new Date(), l = Nt(e, function(a) {
wo && (i.scroller.draggable = !1), e.state.draggingText = !1, Fl(document, "mouseup", l), 
Fl(i.scroller, "drop", l), Math.abs(t.clientX - a.clientX) + Math.abs(t.clientY - a.clientY) < 10 && (Tl(a), 
!r && +new Date() - 200 < o && be(e.doc, n), wo || yo && 9 == bo ? setTimeout(function() {
document.body.focus(), i.input.focus();
}, 20) : i.input.focus());
});
wo && (i.scroller.draggable = !0), e.state.draggingText = l, i.scroller.dragDrop && i.scroller.dragDrop(), 
Ol(document, "mouseup", l), Ol(i.scroller, "drop", l);
}
function Yt(e, t, n, r, i) {
function o(t) {
if (0 != Io(g, t)) if (g = t, "rect" == r) {
for (var i = [], o = e.options.tabSize, l = jl(Zr(c, n.line).text, n.ch, o), a = jl(Zr(c, t.line).text, t.ch, o), s = Math.min(l, a), d = Math.max(l, a), p = Math.min(n.line, t.line), m = Math.min(e.lastLine(), Math.max(n.line, t.line)); m >= p; p++) {
var v = Zr(c, p).text, x = Rl(v, s, o);
s == d ? i.push(new fe(Eo(p, x), Eo(p, x))) : v.length > x && i.push(new fe(Eo(p, x), Eo(p, Rl(v, d, o))));
}
i.length || i.push(new fe(n, n)), Te(c, he(h.ranges.slice(0, f).concat(i), f), {
origin: "*mouse",
scroll: !1
}), e.scrollIntoView(t);
} else {
var y = u, b = y.anchor, w = t;
if ("single" != r) {
if ("double" == r) var C = e.findWordAt(t); else var C = new fe(Eo(t.line, 0), me(c, Eo(t.line + 1, 0)));
Io(C.anchor, b) > 0 ? (w = C.head, b = X(y.from(), C.anchor)) : (w = C.anchor, b = $(y.to(), C.head));
}
var i = h.ranges.slice(0);
i[f] = new fe(me(c, b), w), Te(c, he(i, f), El);
}
}
function l(t) {
var n = ++x, i = Vt(e, t, !0, "rect" == r);
if (i) if (0 != Io(i, g)) {
e.curOp.focus = Ui(), o(i);
var a = b(s, c);
(i.line >= a.to || i.line < a.from) && setTimeout(Nt(e, function() {
x == n && l(t);
}), 150);
} else {
var u = t.clientY < v.top ? -20 : t.clientY > v.bottom ? 20 : 0;
u && setTimeout(Nt(e, function() {
x == n && (s.scroller.scrollTop += u, l(t));
}), 50);
}
}
function a(t) {
e.state.selectingText = !1, x = 1 / 0, Tl(t), s.input.focus(), Fl(document, "mousemove", y), 
Fl(document, "mouseup", w), c.history.lastSelOrigin = null;
}
var s = e.display, c = e.doc;
Tl(t);
var u, f, h = c.sel, d = h.ranges;
if (i && !t.shiftKey ? (f = c.sel.contains(n), u = f > -1 ? d[f] : new fe(n, n)) : (u = c.sel.primary(), 
f = c.sel.primIndex), t.altKey) r = "rect", i || (u = new fe(n, n)), n = Vt(e, t, !0, !0), 
f = -1; else if ("double" == r) {
var p = e.findWordAt(n);
u = e.display.shift || c.extend ? ye(c, u, p.anchor, p.head) : p;
} else if ("triple" == r) {
var m = new fe(Eo(n.line, 0), me(c, Eo(n.line + 1, 0)));
u = e.display.shift || c.extend ? ye(c, u, m.anchor, m.head) : m;
} else u = ye(c, u, n);
i ? -1 == f ? (f = d.length, Te(c, he(d.concat([ u ]), f), {
scroll: !1,
origin: "*mouse"
})) : d.length > 1 && d[f].empty() && "single" == r && !t.shiftKey ? (Te(c, he(d.slice(0, f).concat(d.slice(f + 1)), 0), {
scroll: !1,
origin: "*mouse"
}), h = c.sel) : Ce(c, f, u, El) : (f = 0, Te(c, new ue([ u ], 0), El), h = c.sel);
var g = n, v = s.wrapper.getBoundingClientRect(), x = 0, y = Nt(e, function(e) {
Ci(e) ? l(e) : a(e);
}), w = Nt(e, a);
e.state.selectingText = w, Ol(document, "mousemove", y), Ol(document, "mouseup", w);
}
function Zt(e, t, n, r) {
try {
var i = t.clientX, o = t.clientY;
} catch (t) {
return !1;
}
if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
r && Tl(t);
var l = e.display, a = l.lineDiv.getBoundingClientRect();
if (o > a.bottom || !Ai(e, n)) return bi(t);
o -= a.top - l.viewOffset;
for (var s = 0; s < e.options.gutters.length; ++s) {
var c = l.gutters.childNodes[s];
if (c && c.getBoundingClientRect().right >= i) {
var u = ni(e.doc, o), f = e.options.gutters[s];
return Wl(e, n, e, u, f, t), bi(t);
}
}
}
function Jt(e, t) {
return Zt(e, t, "gutterClick", !0);
}
function Qt(e) {
var t = this;
if (nn(t), !Ti(t, e) && !Ut(t.display, e)) {
Tl(e), yo && (Vo = +new Date());
var n = Vt(t, e, !0), r = e.dataTransfer.files;
if (n && !t.isReadOnly()) if (r && r.length && window.FileReader && window.File) for (var i = r.length, o = Array(i), l = 0, a = function(e, r) {
if (!t.options.allowDropFileTypes || -1 != Di(t.options.allowDropFileTypes, e.type)) {
var a = new FileReader();
a.onload = Nt(t, function() {
var e = a.result;
if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[r] = e, ++l == i) {
n = me(t.doc, n);
var s = {
from: n,
to: n,
text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
origin: "paste"
};
Tn(t.doc, s), Le(t.doc, de(n, Jo(s)));
}
}), a.readAsText(e);
}
}, s = 0; i > s; ++s) a(r[s], s); else {
if (t.state.draggingText && t.doc.sel.contains(n) > -1) return t.state.draggingText(e), 
void setTimeout(function() {
t.display.input.focus();
}, 20);
try {
var o = e.dataTransfer.getData("Text");
if (o) {
if (t.state.draggingText && !(No ? e.altKey : e.ctrlKey)) var c = t.listSelections();
if (Me(t.doc, de(n, n)), c) for (var s = 0; s < c.length; ++s) Wn(t.doc, "", c[s].anchor, c[s].head, "drag");
t.replaceSelection(o, "around", "paste"), t.display.input.focus();
}
} catch (e) {}
}
}
}
function en(e, t) {
if (yo && (!e.state.draggingText || +new Date() - Vo < 100)) return void Al(t);
if (!Ti(e, t) && !Ut(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), 
t.dataTransfer.setDragImage && !Lo)) {
var n = _i("img", null, null, "position: fixed; left: 0; top: 0;");
n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 
So && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), 
t.dataTransfer.setDragImage(n, 0, 0), So && n.parentNode.removeChild(n);
}
}
function tn(e, t) {
var n = Vt(e, t);
if (n) {
var r = document.createDocumentFragment();
ze(e, n, r), e.display.dragCursor || (e.display.dragCursor = _i("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), 
e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), Gi(e.display.dragCursor, r);
}
}
function nn(e) {
e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), 
e.display.dragCursor = null);
}
function rn(e, t) {
Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, go || O(e, {
top: t
}), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbars.setScrollTop(t), 
go && O(e), je(e, 100));
}
function on(e, t, n) {
(n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), 
e.doc.scrollLeft = t, w(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), 
e.display.scrollbars.setScrollLeft(t));
}
function ln(e, t) {
var n = Xo(t), r = n.x, i = n.y, o = e.display, l = o.scroller, a = l.scrollWidth > l.clientWidth, s = l.scrollHeight > l.clientHeight;
if (r && a || i && s) {
if (i && No && wo) e: for (var c = t.target, u = o.view; c != l; c = c.parentNode) for (var f = 0; f < u.length; f++) if (u[f].node == c) {
e.display.currentWheelTarget = c;
break e;
}
if (r && !go && !So && null != $o) return i && s && rn(e, Math.max(0, Math.min(l.scrollTop + i * $o, l.scrollHeight - l.clientHeight))), 
on(e, Math.max(0, Math.min(l.scrollLeft + r * $o, l.scrollWidth - l.clientWidth))), 
(!i || i && s) && Tl(t), void (o.wheelStartX = null);
if (i && null != $o) {
var h = i * $o, d = e.doc.scrollTop, p = d + o.wrapper.clientHeight;
0 > h ? d = Math.max(0, d + h - 50) : p = Math.min(e.doc.height, p + h + 50), O(e, {
top: d,
bottom: p
});
}
20 > Ko && (null == o.wheelStartX ? (o.wheelStartX = l.scrollLeft, o.wheelStartY = l.scrollTop, 
o.wheelDX = r, o.wheelDY = i, setTimeout(function() {
if (null != o.wheelStartX) {
var e = l.scrollLeft - o.wheelStartX, t = l.scrollTop - o.wheelStartY, n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
o.wheelStartX = o.wheelStartY = null, n && ($o = ($o * Ko + n) / (Ko + 1), ++Ko);
}
}, 200)) : (o.wheelDX += r, o.wheelDY += i));
}
}
function an(e, t, n) {
if ("string" == typeof t && (t = cl[t], !t)) return !1;
e.display.input.ensurePolled();
var r = e.display.shift, i = !1;
try {
e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != Pl;
} finally {
e.display.shift = r, e.state.suppressEdits = !1;
}
return i;
}
function sn(e, t, n) {
for (var r = 0; r < e.state.keyMaps.length; r++) {
var i = fl(t, e.state.keyMaps[r], n, e);
if (i) return i;
}
return e.options.extraKeys && fl(t, e.options.extraKeys, n, e) || fl(t, e.options.keyMap, n, e);
}
function cn(e, t, n, r) {
var i = e.state.keySeq;
if (i) {
if (hl(t)) return "handled";
Yo.set(50, function() {
e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
}), t = i + " " + t;
}
var o = sn(e, t, r);
return "multi" == o && (e.state.keySeq = t), "handled" == o && Si(e, "keyHandled", e, t, n), 
("handled" == o || "multi" == o) && (Tl(n), Ie(e)), i && !o && /\'$/.test(t) ? (Tl(n), 
!0) : !!o;
}
function un(e, t) {
var n = dl(t, !0);
return n ? t.shiftKey && !e.state.keySeq ? cn(e, "Shift-" + n, t, function(t) {
return an(e, t, !0);
}) || cn(e, n, t, function(t) {
return ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) ? an(e, t) : void 0;
}) : cn(e, n, t, function(t) {
return an(e, t);
}) : !1;
}
function fn(e, t, n) {
return cn(e, "'" + n + "'", t, function(t) {
return an(e, t, !0);
});
}
function hn(e) {
var t = this;
if (t.curOp.focus = Ui(), !Ti(t, e)) {
yo && 11 > bo && 27 == e.keyCode && (e.returnValue = !1);
var n = e.keyCode;
t.display.shift = 16 == n || e.shiftKey;
var r = un(t, e);
So && (Zo = r ? n : null, !r && 88 == n && !na && (No ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 
18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || dn(t);
}
}
function dn(e) {
function t(e) {
18 != e.keyCode && e.altKey || (Yl(n, "CodeMirror-crosshair"), Fl(document, "keyup", t), 
Fl(document, "mouseover", t));
}
var n = e.display.lineDiv;
Zl(n, "CodeMirror-crosshair"), Ol(document, "keyup", t), Ol(document, "mouseover", t);
}
function pn(e) {
16 == e.keyCode && (this.doc.sel.shift = !1), Ti(this, e);
}
function mn(e) {
var t = this;
if (!(Ut(t.display, e) || Ti(t, e) || e.ctrlKey && !e.altKey || No && e.metaKey)) {
var n = e.keyCode, r = e.charCode;
if (So && n == Zo) return Zo = null, void Tl(e);
if (!So || e.which && !(e.which < 10) || !un(t, e)) {
var i = String.fromCharCode(null == r ? n : r);
fn(t, e, i) || t.display.input.onKeyPress(e);
}
}
}
function gn(e) {
e.state.delayingBlurEvent = !0, setTimeout(function() {
e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, xn(e));
}, 100);
}
function vn(e) {
e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Wl(e, "focus", e), 
e.state.focused = !0, Zl(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), 
wo && setTimeout(function() {
e.display.input.reset(!0);
}, 20)), e.display.input.receivedFocus()), Ie(e));
}
function xn(e) {
e.state.delayingBlurEvent || (e.state.focused && (Wl(e, "blur", e), e.state.focused = !1, 
Yl(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), 
setTimeout(function() {
e.state.focused || (e.display.shift = !1);
}, 150));
}
function yn(e, t) {
Ut(e.display, t) || bn(e, t) || Ti(e, t, "contextmenu") || e.display.input.onContextMenu(t);
}
function bn(e, t) {
return Ai(e, "gutterContextMenu") ? Zt(e, t, "gutterContextMenu", !1) : !1;
}
function wn(e, t) {
if (Io(e, t.from) < 0) return e;
if (Io(e, t.to) <= 0) return Jo(t);
var n = e.line + t.text.length - (t.to.line - t.from.line) - 1, r = e.ch;
return e.line == t.to.line && (r += Jo(t).ch - t.to.ch), Eo(n, r);
}
function Cn(e, t) {
for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
var i = e.sel.ranges[r];
n.push(new fe(wn(i.anchor, t), wn(i.head, t)));
}
return he(n, e.sel.primIndex);
}
function kn(e, t, n) {
return e.line == t.line ? Eo(n.line, e.ch - t.ch + n.ch) : Eo(n.line + (e.line - t.line), e.ch);
}
function Sn(e, t, n) {
for (var r = [], i = Eo(e.first, 0), o = i, l = 0; l < t.length; l++) {
var a = t[l], s = kn(a.from, i, o), c = kn(Jo(a), i, o);
if (i = a.to, o = c, "around" == n) {
var u = e.sel.ranges[l], f = Io(u.head, u.anchor) < 0;
r[l] = new fe(f ? c : s, f ? s : c);
} else r[l] = new fe(s, s);
}
return new ue(r, e.sel.primIndex);
}
function Ln(e, t, n) {
var r = {
canceled: !1,
from: t.from,
to: t.to,
text: t.text,
origin: t.origin,
cancel: function() {
this.canceled = !0;
}
};
return n && (r.update = function(t, n, r, i) {
t && (this.from = me(e, t)), n && (this.to = me(e, n)), r && (this.text = r), void 0 !== i && (this.origin = i);
}), Wl(e, "beforeChange", e, r), e.cm && Wl(e.cm, "beforeChange", e.cm, r), r.canceled ? null : {
from: r.from,
to: r.to,
text: r.text,
origin: r.origin
};
}
function Tn(e, t, n) {
if (e.cm) {
if (!e.cm.curOp) return Nt(e.cm, Tn)(e, t, n);
if (e.cm.state.suppressEdits) return;
}
if (!(Ai(e, "beforeChange") || e.cm && Ai(e.cm, "beforeChange")) || (t = Ln(e, t, !0))) {
var r = Po && !n && sr(e, t.from, t.to);
if (r) for (var i = r.length - 1; i >= 0; --i) Mn(e, {
from: r[i].from,
to: r[i].to,
text: i ? [ "" ] : t.text
}); else Mn(e, t);
}
}
function Mn(e, t) {
if (1 != t.text.length || "" != t.text[0] || 0 != Io(t.from, t.to)) {
var n = Cn(e, t);
ci(e, t, n, e.cm ? e.cm.curOp.id : NaN), Nn(e, t, n, or(e, t));
var r = [];
Xr(e, function(e, n) {
n || -1 != Di(r, e.history) || (yi(e.history, t), r.push(e.history)), Nn(e, t, null, or(e, t));
});
}
}
function An(e, t, n) {
if (!e.cm || !e.cm.state.suppressEdits) {
for (var r, i = e.history, o = e.sel, l = "undo" == t ? i.done : i.undone, a = "undo" == t ? i.undone : i.done, s = 0; s < l.length && (r = l[s], 
n ? !r.ranges || r.equals(e.sel) : r.ranges); s++) ;
if (s != l.length) {
for (i.lastOrigin = i.lastSelOrigin = null; r = l.pop(), r.ranges; ) {
if (hi(r, a), n && !r.equals(e.sel)) return void Te(e, r, {
clearRedo: !1
});
o = r;
}
var c = [];
hi(o, a), a.push({
changes: c,
generation: i.generation
}), i.generation = r.generation || ++i.maxGeneration;
for (var u = Ai(e, "beforeChange") || e.cm && Ai(e.cm, "beforeChange"), s = r.changes.length - 1; s >= 0; --s) {
var f = r.changes[s];
if (f.origin = t, u && !Ln(e, f, !1)) return void (l.length = 0);
c.push(li(e, f));
var h = s ? Cn(e, f) : Wi(l);
Nn(e, f, h, ar(e, f)), !s && e.cm && e.cm.scrollIntoView({
from: f.from,
to: Jo(f)
});
var d = [];
Xr(e, function(e, t) {
t || -1 != Di(d, e.history) || (yi(e.history, f), d.push(e.history)), Nn(e, f, null, ar(e, f));
});
}
}
}
}
function On(e, t) {
if (0 != t && (e.first += t, e.sel = new ue(Hi(e.sel.ranges, function(e) {
return new fe(Eo(e.anchor.line + t, e.anchor.ch), Eo(e.head.line + t, e.head.ch));
}), e.sel.primIndex), e.cm)) {
Pt(e.cm, e.first, e.first - t, t);
for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) zt(e.cm, r, "gutter");
}
}
function Nn(e, t, n, r) {
if (e.cm && !e.cm.curOp) return Nt(e.cm, Nn)(e, t, n, r);
if (t.to.line < e.first) return void On(e, t.text.length - 1 - (t.to.line - t.from.line));
if (!(t.from.line > e.lastLine())) {
if (t.from.line < e.first) {
var i = t.text.length - 1 - (e.first - t.from.line);
On(e, i), t = {
from: Eo(e.first, 0),
to: Eo(t.to.line + i, t.to.ch),
text: [ Wi(t.text) ],
origin: t.origin
};
}
var o = e.lastLine();
t.to.line > o && (t = {
from: t.from,
to: Eo(o, Zr(e, o).text.length),
text: [ t.text[0] ],
origin: t.origin
}), t.removed = Jr(e, t.from, t.to), n || (n = Cn(e, t)), e.cm ? Fn(e.cm, t, r) : Vr(e, t, r), 
Me(e, n, zl);
}
}
function Fn(e, t, n) {
var r = e.doc, i = e.display, l = t.from, a = t.to, s = !1, c = l.line;
e.options.lineWrapping || (c = ti(xr(Zr(r, l.line))), r.iter(c, a.line + 1, function(e) {
return e == i.maxLine ? (s = !0, !0) : void 0;
})), r.sel.contains(t.from, t.to) > -1 && Mi(e), Vr(r, t, n, o(e)), e.options.lineWrapping || (r.iter(c, l.line + t.text.length, function(e) {
var t = f(e);
t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, 
s = !1);
}), s && (e.curOp.updateMaxLine = !0)), r.frontier = Math.min(r.frontier, l.line), 
je(e, 400);
var u = t.text.length - (a.line - l.line) - 1;
t.full ? Pt(e) : l.line != a.line || 1 != t.text.length || Ur(e.doc, t) ? Pt(e, l.line, a.line + 1, u) : zt(e, l.line, "text");
var h = Ai(e, "changes"), d = Ai(e, "change");
if (d || h) {
var p = {
from: l,
to: a,
text: t.text,
removed: t.removed,
origin: t.origin
};
d && Si(e, "change", e, p), h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(p);
}
e.display.selForContextMenu = null;
}
function Wn(e, t, n, r, i) {
if (r || (r = n), Io(r, n) < 0) {
var o = r;
r = n, n = o;
}
"string" == typeof t && (t = e.splitLines(t)), Tn(e, {
from: n,
to: r,
text: t,
origin: i
});
}
function Dn(e, t) {
if (!Ti(e, "scrollCursorIntoView")) {
var n = e.display, r = n.sizer.getBoundingClientRect(), i = null;
if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), 
null != i && !Mo) {
var o = _i("div", "​", null, "position: absolute; top: " + (t.top - n.viewOffset - qe(e.display)) + "px; height: " + (t.bottom - t.top + Ve(e) + n.barHeight) + "px; left: " + t.left + "px; width: 2px;");
e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o);
}
}
}
function Hn(e, t, n, r) {
null == r && (r = 0);
for (var i = 0; 5 > i; i++) {
var o = !1, l = dt(e, t), a = n && n != t ? dt(e, n) : l, s = zn(e, Math.min(l.left, a.left), Math.min(l.top, a.top) - r, Math.max(l.left, a.left), Math.max(l.bottom, a.bottom) + r), c = e.doc.scrollTop, u = e.doc.scrollLeft;
if (null != s.scrollTop && (rn(e, s.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (o = !0)), 
null != s.scrollLeft && (on(e, s.scrollLeft), Math.abs(e.doc.scrollLeft - u) > 1 && (o = !0)), 
!o) break;
}
return l;
}
function Pn(e, t, n, r, i) {
var o = zn(e, t, n, r, i);
null != o.scrollTop && rn(e, o.scrollTop), null != o.scrollLeft && on(e, o.scrollLeft);
}
function zn(e, t, n, r, i) {
var o = e.display, l = xt(e.display);
0 > n && (n = 0);
var a = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop, s = $e(e), c = {};
i - n > s && (i = n + s);
var u = e.doc.height + Ge(o), f = l > n, h = i > u - l;
if (a > n) c.scrollTop = f ? 0 : n; else if (i > a + s) {
var d = Math.min(n, (h ? u : i) - s);
d != a && (c.scrollTop = d);
}
var p = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft, m = Ke(e) - (e.options.fixedGutter ? o.gutters.offsetWidth : 0), g = r - t > m;
return g && (r = t + m), 10 > t ? c.scrollLeft = 0 : p > t ? c.scrollLeft = Math.max(0, t - (g ? 0 : 10)) : r > m + p - 3 && (c.scrollLeft = r + (g ? 0 : 10) - m), 
c;
}
function En(e, t, n) {
(null != t || null != n) && jn(e), null != t && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + t), 
null != n && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + n);
}
function In(e) {
jn(e);
var t = e.getCursor(), n = t, r = t;
e.options.lineWrapping || (n = t.ch ? Eo(t.line, t.ch - 1) : t, r = Eo(t.line, t.ch + 1)), 
e.curOp.scrollToPos = {
from: n,
to: r,
margin: e.options.cursorScrollMargin,
isCursor: !0
};
}
function jn(e) {
var t = e.curOp.scrollToPos;
if (t) {
e.curOp.scrollToPos = null;
var n = pt(e, t.from), r = pt(e, t.to), i = zn(e, Math.min(n.left, r.left), Math.min(n.top, r.top) - t.margin, Math.max(n.right, r.right), Math.max(n.bottom, r.bottom) + t.margin);
e.scrollTo(i.scrollLeft, i.scrollTop);
}
}
function Rn(e, t, n, r) {
var i, o = e.doc;
null == n && (n = "add"), "smart" == n && (o.mode.indent ? i = _e(e, t) : n = "prev");
var l = e.options.tabSize, a = Zr(o, t), s = jl(a.text, null, l);
a.stateAfter && (a.stateAfter = null);
var c, u = a.text.match(/^\s*/)[0];
if (r || /\S/.test(a.text)) {
if ("smart" == n && (c = o.mode.indent(i, a.text.slice(u.length), a.text), c == Pl || c > 150)) {
if (!r) return;
n = "prev";
}
} else c = 0, n = "not";
"prev" == n ? c = t > o.first ? jl(Zr(o, t - 1).text, null, l) : 0 : "add" == n ? c = s + e.options.indentUnit : "subtract" == n ? c = s - e.options.indentUnit : "number" == typeof n && (c = s + n), 
c = Math.max(0, c);
var f = "", h = 0;
if (e.options.indentWithTabs) for (var d = Math.floor(c / l); d; --d) h += l, f += "	";
if (c > h && (f += Fi(c - h)), f != u) return Wn(o, f, Eo(t, 0), Eo(t, u.length), "+input"), 
a.stateAfter = null, !0;
for (var d = 0; d < o.sel.ranges.length; d++) {
var p = o.sel.ranges[d];
if (p.head.line == t && p.head.ch < u.length) {
var h = Eo(t, u.length);
Ce(o, d, new fe(h, h));
break;
}
}
}
function Bn(e, t, n, r) {
var i = t, o = t;
return "number" == typeof t ? o = Zr(e, pe(e, t)) : i = ti(t), null == i ? null : (r(o, i) && e.cm && zt(e.cm, i, n), 
o);
}
function _n(e, t) {
for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
for (var o = t(n[i]); r.length && Io(o.from, Wi(r).to) <= 0; ) {
var l = r.pop();
if (Io(l.from, o.from) < 0) {
o.from = l.from;
break;
}
}
r.push(o);
}
Ot(e, function() {
for (var t = r.length - 1; t >= 0; t--) Wn(e.doc, "", r[t].from, r[t].to, "+delete");
In(e);
});
}
function qn(e, t, n, r, i) {
function o() {
var t = a + n;
return t < e.first || t >= e.first + e.size ? !1 : (a = t, u = Zr(e, t));
}
function l(e) {
var t = (i ? fo : ho)(u, s, n, !0);
if (null == t) {
if (e || !o()) return !1;
s = i ? (0 > n ? io : ro)(u) : 0 > n ? u.text.length : 0;
} else s = t;
return !0;
}
var a = t.line, s = t.ch, c = n, u = Zr(e, a);
if ("char" == r) l(); else if ("column" == r) l(!0); else if ("word" == r || "group" == r) for (var f = null, h = "group" == r, d = e.cm && e.cm.getHelper(t, "wordChars"), p = !0; !(0 > n) || l(!p); p = !1) {
var m = u.text.charAt(s) || "\n", g = ji(m, d) ? "w" : h && "\n" == m ? "n" : !h || /\s/.test(m) ? null : "p";
if (!h || p || g || (g = "s"), f && f != g) {
0 > n && (n = 1, l());
break;
}
if (g && (f = g), n > 0 && !l(!p)) break;
}
var v = We(e, Eo(a, s), t, c, !0);
return Io(t, v) || (v.hitSide = !0), v;
}
function Gn(e, t, n, r) {
var i, o = e.doc, l = t.left;
if ("page" == r) {
var a = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
i = t.top + n * (a - (0 > n ? 1.5 : .5) * xt(e.display));
} else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
for (;;) {
var s = gt(e, l, i);
if (!s.outside) break;
if (0 > n ? 0 >= i : i >= o.height) {
s.hitSide = !0;
break;
}
i += 5 * n;
}
return s;
}
function Un(t, n, r, i) {
e.defaults[t] = n, r && (el[t] = i ? function(e, t, n) {
n != tl && r(e, t, n);
} : r);
}
function Vn(e) {
for (var t, n, r, i, o = e.split(/-(?!$)/), e = o[o.length - 1], l = 0; l < o.length - 1; l++) {
var a = o[l];
if (/^(cmd|meta|m)$/i.test(a)) i = !0; else if (/^a(lt)?$/i.test(a)) t = !0; else if (/^(c|ctrl|control)$/i.test(a)) n = !0; else {
if (!/^s(hift)$/i.test(a)) throw Error("Unrecognized modifier name: " + a);
r = !0;
}
}
return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e), 
e;
}
function Kn(e) {
return "string" == typeof e ? ul[e] : e;
}
function $n(e, t, n, r, i) {
if (r && r.shared) return Xn(e, t, n, r, i);
if (e.cm && !e.cm.curOp) return Nt(e.cm, $n)(e, t, n, r, i);
var o = new gl(e, i), l = Io(t, n);
if (r && Ei(r, o, !1), l > 0 || 0 == l && o.clearWhenEmpty !== !1) return o;
if (o.replacedWith && (o.collapsed = !0, o.widgetNode = _i("span", [ o.replacedWith ], "CodeMirror-widget"), 
r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (o.widgetNode.insertLeft = !0)), 
o.collapsed) {
if (vr(e, t.line, t, n, o) || t.line != n.line && vr(e, n.line, t, n, o)) throw Error("Inserting collapsed marker partially overlapping an existing one");
zo = !0;
}
o.addToHistory && ci(e, {
from: t,
to: n,
origin: "markText"
}, e.sel, NaN);
var a, s = t.line, c = e.cm;
if (e.iter(s, n.line + 1, function(e) {
c && o.collapsed && !c.options.lineWrapping && xr(e) == c.display.maxLine && (a = !0), 
o.collapsed && s != t.line && ei(e, 0), nr(e, new Qn(o, s == t.line ? t.ch : null, s == n.line ? n.ch : null)), 
++s;
}), o.collapsed && e.iter(t.line, n.line + 1, function(t) {
Cr(e, t) && ei(t, 0);
}), o.clearOnEnter && Ol(o, "beforeCursorEnter", function() {
o.clear();
}), o.readOnly && (Po = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), 
o.collapsed && (o.id = ++ml, o.atomic = !0), c) {
if (a && (c.curOp.updateMaxLine = !0), o.collapsed) Pt(c, t.line, n.line + 1); else if (o.className || o.title || o.startStyle || o.endStyle || o.css) for (var u = t.line; u <= n.line; u++) zt(c, u, "text");
o.atomic && Oe(c.doc), Si(c, "markerAdded", c, o);
}
return o;
}
function Xn(e, t, n, r, i) {
r = Ei(r), r.shared = !1;
var o = [ $n(e, t, n, r, i) ], l = o[0], a = r.widgetNode;
return Xr(e, function(e) {
a && (r.widgetNode = a.cloneNode(!0)), o.push($n(e, me(e, t), me(e, n), r, i));
for (var s = 0; s < e.linked.length; ++s) if (e.linked[s].isParent) return;
l = Wi(o);
}), new vl(o, l);
}
function Yn(e) {
return e.findMarks(Eo(e.first, 0), e.clipPos(Eo(e.lastLine())), function(e) {
return e.parent;
});
}
function Zn(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n], i = r.find(), o = e.clipPos(i.from), l = e.clipPos(i.to);
if (Io(o, l)) {
var a = $n(e, o, l, r.primary, r.primary.type);
r.markers.push(a), a.parent = r;
}
}
}
function Jn(e) {
for (var t = 0; t < e.length; t++) {
var n = e[t], r = [ n.primary.doc ];
Xr(n.primary.doc, function(e) {
r.push(e);
});
for (var i = 0; i < n.markers.length; i++) {
var o = n.markers[i];
-1 == Di(r, o.doc) && (o.parent = null, n.markers.splice(i--, 1));
}
}
}
function Qn(e, t, n) {
this.marker = e, this.from = t, this.to = n;
}
function er(e, t) {
if (e) for (var n = 0; n < e.length; ++n) {
var r = e[n];
if (r.marker == t) return r;
}
}
function tr(e, t) {
for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r]);
return n;
}
function nr(e, t) {
e.markedSpans = e.markedSpans ? e.markedSpans.concat([ t ]) : [ t ], t.marker.attachLine(e);
}
function rr(e, t, n) {
if (e) for (var r, i = 0; i < e.length; ++i) {
var o = e[i], l = o.marker, a = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
if (a || o.from == t && "bookmark" == l.type && (!n || !o.marker.insertLeft)) {
var s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
(r || (r = [])).push(new Qn(l, o.from, s ? null : o.to));
}
}
return r;
}
function ir(e, t, n) {
if (e) for (var r, i = 0; i < e.length; ++i) {
var o = e[i], l = o.marker, a = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
if (a || o.from == t && "bookmark" == l.type && (!n || o.marker.insertLeft)) {
var s = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
(r || (r = [])).push(new Qn(l, s ? null : o.from - t, null == o.to ? null : o.to - t));
}
}
return r;
}
function or(e, t) {
if (t.full) return null;
var n = ve(e, t.from.line) && Zr(e, t.from.line).markedSpans, r = ve(e, t.to.line) && Zr(e, t.to.line).markedSpans;
if (!n && !r) return null;
var i = t.from.ch, o = t.to.ch, l = 0 == Io(t.from, t.to), a = rr(n, i, l), s = ir(r, o, l), c = 1 == t.text.length, u = Wi(t.text).length + (c ? i : 0);
if (a) for (var f = 0; f < a.length; ++f) {
var h = a[f];
if (null == h.to) {
var d = er(s, h.marker);
d ? c && (h.to = null == d.to ? null : d.to + u) : h.to = i;
}
}
if (s) for (var f = 0; f < s.length; ++f) {
var h = s[f];
if (null != h.to && (h.to += u), null == h.from) {
var d = er(a, h.marker);
d || (h.from = u, c && (a || (a = [])).push(h));
} else h.from += u, c && (a || (a = [])).push(h);
}
a && (a = lr(a)), s && s != a && (s = lr(s));
var p = [ a ];
if (!c) {
var m, g = t.text.length - 2;
if (g > 0 && a) for (var f = 0; f < a.length; ++f) null == a[f].to && (m || (m = [])).push(new Qn(a[f].marker, null, null));
for (var f = 0; g > f; ++f) p.push(m);
p.push(s);
}
return p;
}
function lr(e) {
for (var t = 0; t < e.length; ++t) {
var n = e[t];
null != n.from && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
}
return e.length ? e : null;
}
function ar(e, t) {
var n = mi(e, t), r = or(e, t);
if (!n) return r;
if (!r) return n;
for (var i = 0; i < n.length; ++i) {
var o = n[i], l = r[i];
if (o && l) e: for (var a = 0; a < l.length; ++a) {
for (var s = l[a], c = 0; c < o.length; ++c) if (o[c].marker == s.marker) continue e;
o.push(s);
} else l && (n[i] = l);
}
return n;
}
function sr(e, t, n) {
var r = null;
if (e.iter(t.line, n.line + 1, function(e) {
if (e.markedSpans) for (var t = 0; t < e.markedSpans.length; ++t) {
var n = e.markedSpans[t].marker;
!n.readOnly || r && -1 != Di(r, n) || (r || (r = [])).push(n);
}
}), !r) return null;
for (var i = [ {
from: t,
to: n
} ], o = 0; o < r.length; ++o) for (var l = r[o], a = l.find(0), s = 0; s < i.length; ++s) {
var c = i[s];
if (!(Io(c.to, a.from) < 0 || Io(c.from, a.to) > 0)) {
var u = [ s, 1 ], f = Io(c.from, a.from), h = Io(c.to, a.to);
(0 > f || !l.inclusiveLeft && !f) && u.push({
from: c.from,
to: a.from
}), (h > 0 || !l.inclusiveRight && !h) && u.push({
from: a.to,
to: c.to
}), i.splice.apply(i, u), s += u.length - 1;
}
}
return i;
}
function cr(e) {
var t = e.markedSpans;
if (t) {
for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
e.markedSpans = null;
}
}
function ur(e, t) {
if (t) {
for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
e.markedSpans = t;
}
}
function fr(e) {
return e.inclusiveLeft ? -1 : 0;
}
function hr(e) {
return e.inclusiveRight ? 1 : 0;
}
function dr(e, t) {
var n = e.lines.length - t.lines.length;
if (0 != n) return n;
var r = e.find(), i = t.find(), o = Io(r.from, i.from) || fr(e) - fr(t);
if (o) return -o;
var l = Io(r.to, i.to) || hr(e) - hr(t);
return l ? l : t.id - e.id;
}
function pr(e, t) {
var n, r = zo && e.markedSpans;
if (r) for (var i, o = 0; o < r.length; ++o) i = r[o], i.marker.collapsed && null == (t ? i.from : i.to) && (!n || dr(n, i.marker) < 0) && (n = i.marker);
return n;
}
function mr(e) {
return pr(e, !0);
}
function gr(e) {
return pr(e, !1);
}
function vr(e, t, n, r, i) {
var o = Zr(e, t), l = zo && o.markedSpans;
if (l) for (var a = 0; a < l.length; ++a) {
var s = l[a];
if (s.marker.collapsed) {
var c = s.marker.find(0), u = Io(c.from, n) || fr(s.marker) - fr(i), f = Io(c.to, r) || hr(s.marker) - hr(i);
if (!(u >= 0 && 0 >= f || 0 >= u && f >= 0) && (0 >= u && (Io(c.to, n) > 0 || s.marker.inclusiveRight && i.inclusiveLeft) || u >= 0 && (Io(c.from, r) < 0 || s.marker.inclusiveLeft && i.inclusiveRight))) return !0;
}
}
}
function xr(e) {
for (var t; t = mr(e); ) e = t.find(-1, !0).line;
return e;
}
function yr(e) {
for (var t, n; t = gr(e); ) e = t.find(1, !0).line, (n || (n = [])).push(e);
return n;
}
function br(e, t) {
var n = Zr(e, t), r = xr(n);
return n == r ? t : ti(r);
}
function wr(e, t) {
if (t > e.lastLine()) return t;
var n, r = Zr(e, t);
if (!Cr(e, r)) return t;
for (;n = gr(r); ) r = n.find(1, !0).line;
return ti(r) + 1;
}
function Cr(e, t) {
var n = zo && t.markedSpans;
if (n) for (var r, i = 0; i < n.length; ++i) if (r = n[i], r.marker.collapsed) {
if (null == r.from) return !0;
if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && kr(e, t, r)) return !0;
}
}
function kr(e, t, n) {
if (null == n.to) {
var r = n.marker.find(1, !0);
return kr(e, r.line, er(r.line.markedSpans, n.marker));
}
if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
for (var i, o = 0; o < t.markedSpans.length; ++o) if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && kr(e, t, i)) return !0;
}
function Sr(e, t, n) {
ri(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && En(e, null, n);
}
function Lr(e) {
if (null != e.height) return e.height;
var t = e.doc.cm;
if (!t) return 0;
if (!Kl(document.body, e.node)) {
var n = "position: relative;";
e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), 
e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), Gi(t.display.measure, _i("div", [ e.node ], null, n));
}
return e.height = e.node.parentNode.offsetHeight;
}
function Tr(e, t, n, r) {
var i = new xl(e, n, r), o = e.cm;
return o && i.noHScroll && (o.display.alignWidgets = !0), Bn(e, t, "widget", function(t) {
var n = t.widgets || (t.widgets = []);
if (null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i), 
i.line = t, o && !Cr(e, t)) {
var r = ri(t) < e.scrollTop;
ei(t, t.height + Lr(i)), r && En(o, null, i.height), o.curOp.forceUpdate = !0;
}
return !0;
}), i;
}
function Mr(e, t, n, r) {
e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), 
null != e.order && (e.order = null), cr(e), ur(e, n);
var i = r ? r(e) : 1;
i != e.height && ei(e, i);
}
function Ar(e) {
e.parent = null, cr(e);
}
function Or(e, t) {
if (e) for (;;) {
var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
if (!n) break;
e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
var r = n[1] ? "bgClass" : "textClass";
null == t[r] ? t[r] = n[2] : RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + n[2]);
}
return e;
}
function Nr(t, n) {
if (t.blankLine) return t.blankLine(n);
if (t.innerMode) {
var r = e.innerMode(t, n);
return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0;
}
}
function Fr(t, n, r, i) {
for (var o = 0; 10 > o; o++) {
i && (i[0] = e.innerMode(t, r).mode);
var l = t.token(n, r);
if (n.pos > n.start) return l;
}
throw Error("Mode " + t.name + " failed to advance stream.");
}
function Wr(e, t, n, r) {
function i(e) {
return {
start: f.start,
end: f.pos,
string: f.current(),
type: o || null,
state: e ? al(l.mode, u) : u
};
}
var o, l = e.doc, a = l.mode;
t = me(l, t);
var s, c = Zr(l, t.line), u = _e(e, t.line, n), f = new pl(c.text, e.options.tabSize);
for (r && (s = []); (r || f.pos < t.ch) && !f.eol(); ) f.start = f.pos, o = Fr(a, f, u), 
r && s.push(i(!0));
return r ? s : i();
}
function Dr(e, t, n, r, i, o, l) {
var a = n.flattenSpans;
null == a && (a = e.options.flattenSpans);
var s, c = 0, u = null, f = new pl(t, e.options.tabSize), h = e.options.addModeClass && [ null ];
for ("" == t && Or(Nr(n, r), o); !f.eol(); ) {
if (f.pos > e.options.maxHighlightLength ? (a = !1, l && zr(e, t, r, f.pos), f.pos = t.length, 
s = null) : s = Or(Fr(n, f, r, h), o), h) {
var d = h[0].name;
d && (s = "m-" + (s ? d + " " + s : d));
}
if (!a || u != s) {
for (;c < f.start; ) c = Math.min(f.start, c + 5e4), i(c, u);
u = s;
}
f.start = f.pos;
}
for (;c < f.pos; ) {
var p = Math.min(f.pos, c + 5e4);
i(p, u), c = p;
}
}
function Hr(e, t, n, r) {
var i = [ e.state.modeGen ], o = {};
Dr(e, t.text, e.doc.mode, n, function(e, t) {
i.push(e, t);
}, o, r);
for (var l = 0; l < e.state.overlays.length; ++l) {
var a = e.state.overlays[l], s = 1, c = 0;
Dr(e, t.text, a.mode, !0, function(e, t) {
for (var n = s; e > c; ) {
var r = i[s];
r > e && i.splice(s, 1, e, i[s + 1], r), s += 2, c = Math.min(e, r);
}
if (t) if (a.opaque) i.splice(n, s - n, e, "cm-overlay " + t), s = n + 2; else for (;s > n; n += 2) {
var o = i[n + 1];
i[n + 1] = (o ? o + " " : "") + "cm-overlay " + t;
}
}, o);
}
return {
styles: i,
classes: o.bgClass || o.textClass ? o : null
};
}
function Pr(e, t, n) {
if (!t.styles || t.styles[0] != e.state.modeGen) {
var r = _e(e, ti(t)), i = Hr(e, t, t.text.length > e.options.maxHighlightLength ? al(e.doc.mode, r) : r);
t.stateAfter = r, t.styles = i.styles, i.classes ? t.styleClasses = i.classes : t.styleClasses && (t.styleClasses = null), 
n === e.doc.frontier && e.doc.frontier++;
}
return t.styles;
}
function zr(e, t, n, r) {
var i = e.doc.mode, o = new pl(t, e.options.tabSize);
for (o.start = o.pos = r || 0, "" == t && Nr(i, n); !o.eol(); ) Fr(i, o, n), o.start = o.pos;
}
function Er(e, t) {
if (!e || /^\s*$/.test(e)) return null;
var n = t.addModeClass ? wl : bl;
return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
}
function Ir(e, t) {
var n = _i("span", null, null, wo ? "padding-right: .1px" : null), r = {
pre: _i("pre", [ n ], "CodeMirror-line"),
content: n,
col: 0,
pos: 0,
cm: e,
splitSpaces: (yo || wo) && e.getOption("lineWrapping")
};
t.measure = {};
for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
var o, l = i ? t.rest[i - 1] : t.line;
r.pos = 0, r.addToken = Rr, Ji(e.display.measure) && (o = ii(l)) && (r.addToken = _r(r.addToken, o)), 
r.map = [];
var a = t != e.display.externalMeasured && ti(l);
Gr(l, r, Pr(e, l, a)), l.styleClasses && (l.styleClasses.bgClass && (r.bgClass = Ki(l.styleClasses.bgClass, r.bgClass || "")), 
l.styleClasses.textClass && (r.textClass = Ki(l.styleClasses.textClass, r.textClass || ""))), 
0 == r.map.length && r.map.push(0, 0, r.content.appendChild(Zi(e.display.measure))), 
0 == i ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), 
(t.measure.caches || (t.measure.caches = [])).push({}));
}
return wo && /\bcm-tab\b/.test(r.content.lastChild.className) && (r.content.className = "cm-tab-wrap-hack"), 
Wl(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = Ki(r.pre.className, r.textClass || "")), 
r;
}
function jr(e) {
var t = _i("span", "•", "cm-invalidchar");
return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), 
t;
}
function Rr(e, t, n, r, i, o, l) {
if (t) {
var a = e.splitSpaces ? t.replace(/ {3,}/g, Br) : t, s = e.cm.state.specialChars, c = !1;
if (s.test(t)) for (var u = document.createDocumentFragment(), f = 0; ;) {
s.lastIndex = f;
var h = s.exec(t), d = h ? h.index - f : t.length - f;
if (d) {
var p = document.createTextNode(a.slice(f, f + d));
yo && 9 > bo ? u.appendChild(_i("span", [ p ])) : u.appendChild(p), e.map.push(e.pos, e.pos + d, p), 
e.col += d, e.pos += d;
}
if (!h) break;
if (f += d + 1, "	" == h[0]) {
var m = e.cm.options.tabSize, g = m - e.col % m, p = u.appendChild(_i("span", Fi(g), "cm-tab"));
p.setAttribute("role", "presentation"), p.setAttribute("cm-text", "	"), e.col += g;
} else if ("\r" == h[0] || "\n" == h[0]) {
var p = u.appendChild(_i("span", "\r" == h[0] ? "␍" : "␤", "cm-invalidchar"));
p.setAttribute("cm-text", h[0]), e.col += 1;
} else {
var p = e.cm.options.specialCharPlaceholder(h[0]);
p.setAttribute("cm-text", h[0]), yo && 9 > bo ? u.appendChild(_i("span", [ p ])) : u.appendChild(p), 
e.col += 1;
}
e.map.push(e.pos, e.pos + 1, p), e.pos++;
} else {
e.col += t.length;
var u = document.createTextNode(a);
e.map.push(e.pos, e.pos + t.length, u), yo && 9 > bo && (c = !0), e.pos += t.length;
}
if (n || r || i || c || l) {
var v = n || "";
r && (v += r), i && (v += i);
var x = _i("span", [ u ], v, l);
return o && (x.title = o), e.content.appendChild(x);
}
e.content.appendChild(u);
}
}
function Br(e) {
for (var t = " ", n = 0; n < e.length - 2; ++n) t += n % 2 ? " " : " ";
return t += " ";
}
function _r(e, t) {
return function(n, r, i, o, l, a, s) {
i = i ? i + " cm-force-border" : "cm-force-border";
for (var c = n.pos, u = c + r.length; ;) {
for (var f = 0; f < t.length; f++) {
var h = t[f];
if (h.to > c && h.from <= c) break;
}
if (h.to >= u) return e(n, r, i, o, l, a, s);
e(n, r.slice(0, h.to - c), i, o, null, a, s), o = null, r = r.slice(h.to - c), c = h.to;
}
};
}
function qr(e, t, n, r) {
var i = !r && n.widgetNode;
i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), 
i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), 
e.pos += t;
}
function Gr(e, t, n) {
var r = e.markedSpans, i = e.text, o = 0;
if (r) for (var l, a, s, c, u, f, h, d = i.length, p = 0, m = 1, g = "", v = 0; ;) {
if (v == p) {
s = c = u = f = a = "", h = null, v = 1 / 0;
for (var x, y = [], b = 0; b < r.length; ++b) {
var w = r[b], C = w.marker;
"bookmark" == C.type && w.from == p && C.widgetNode ? y.push(C) : w.from <= p && (null == w.to || w.to > p || C.collapsed && w.to == p && w.from == p) ? (null != w.to && w.to != p && v > w.to && (v = w.to, 
c = ""), C.className && (s += " " + C.className), C.css && (a = (a ? a + ";" : "") + C.css), 
C.startStyle && w.from == p && (u += " " + C.startStyle), C.endStyle && w.to == v && (x || (x = [])).push(C.endStyle, w.to), 
C.title && !f && (f = C.title), C.collapsed && (!h || dr(h.marker, C) < 0) && (h = w)) : w.from > p && v > w.from && (v = w.from);
}
if (x) for (var b = 0; b < x.length; b += 2) x[b + 1] == v && (c += " " + x[b]);
if (!h || h.from == p) for (var b = 0; b < y.length; ++b) qr(t, 0, y[b]);
if (h && (h.from || 0) == p) {
if (qr(t, (null == h.to ? d + 1 : h.to) - p, h.marker, null == h.from), null == h.to) return;
h.to == p && (h = !1);
}
}
if (p >= d) break;
for (var k = Math.min(d, v); ;) {
if (g) {
var S = p + g.length;
if (!h) {
var L = S > k ? g.slice(0, k - p) : g;
t.addToken(t, L, l ? l + s : s, u, p + L.length == v ? c : "", f, a);
}
if (S >= k) {
g = g.slice(k - p), p = k;
break;
}
p = S, u = "";
}
g = i.slice(o, o = n[m++]), l = Er(n[m++], t.cm.options);
}
} else for (var m = 1; m < n.length; m += 2) t.addToken(t, i.slice(o, o = n[m]), Er(n[m + 1], t.cm.options));
}
function Ur(e, t) {
return 0 == t.from.ch && 0 == t.to.ch && "" == Wi(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore);
}
function Vr(e, t, n, r) {
function i(e) {
return n ? n[e] : null;
}
function o(e, n, i) {
Mr(e, n, i, r), Si(e, "change", e, t);
}
function l(e, t) {
for (var n = e, o = []; t > n; ++n) o.push(new yl(c[n], i(n), r));
return o;
}
var a = t.from, s = t.to, c = t.text, u = Zr(e, a.line), f = Zr(e, s.line), h = Wi(c), d = i(c.length - 1), p = s.line - a.line;
if (t.full) e.insert(0, l(0, c.length)), e.remove(c.length, e.size - c.length); else if (Ur(e, t)) {
var m = l(0, c.length - 1);
o(f, f.text, d), p && e.remove(a.line, p), m.length && e.insert(a.line, m);
} else if (u == f) if (1 == c.length) o(u, u.text.slice(0, a.ch) + h + u.text.slice(s.ch), d); else {
var m = l(1, c.length - 1);
m.push(new yl(h + u.text.slice(s.ch), d, r)), o(u, u.text.slice(0, a.ch) + c[0], i(0)), 
e.insert(a.line + 1, m);
} else if (1 == c.length) o(u, u.text.slice(0, a.ch) + c[0] + f.text.slice(s.ch), i(0)), 
e.remove(a.line + 1, p); else {
o(u, u.text.slice(0, a.ch) + c[0], i(0)), o(f, h + f.text.slice(s.ch), d);
var m = l(1, c.length - 1);
p > 1 && e.remove(a.line + 1, p - 1), e.insert(a.line + 1, m);
}
Si(e, "change", e, t);
}
function Kr(e) {
this.lines = e, this.parent = null;
for (var t = 0, n = 0; t < e.length; ++t) e[t].parent = this, n += e[t].height;
this.height = n;
}
function $r(e) {
this.children = e;
for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
var i = e[r];
t += i.chunkSize(), n += i.height, i.parent = this;
}
this.size = t, this.height = n, this.parent = null;
}
function Xr(e, t, n) {
function r(e, i, o) {
if (e.linked) for (var l = 0; l < e.linked.length; ++l) {
var a = e.linked[l];
if (a.doc != i) {
var s = o && a.sharedHist;
(!n || s) && (t(a.doc, s), r(a.doc, e, s));
}
}
}
r(e, null, !0);
}
function Yr(e, t) {
if (t.cm) throw Error("This document is already in use.");
e.doc = t, t.cm = e, l(e), n(e), e.options.lineWrapping || h(e), e.options.mode = t.modeOption, 
Pt(e);
}
function Zr(e, t) {
if (t -= e.first, 0 > t || t >= e.size) throw Error("There is no line " + (t + e.first) + " in the document.");
for (var n = e; !n.lines; ) for (var r = 0; ;++r) {
var i = n.children[r], o = i.chunkSize();
if (o > t) {
n = i;
break;
}
t -= o;
}
return n.lines[t];
}
function Jr(e, t, n) {
var r = [], i = t.line;
return e.iter(t.line, n.line + 1, function(e) {
var o = e.text;
i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), 
++i;
}), r;
}
function Qr(e, t, n) {
var r = [];
return e.iter(t, n, function(e) {
r.push(e.text);
}), r;
}
function ei(e, t) {
var n = t - e.height;
if (n) for (var r = e; r; r = r.parent) r.height += n;
}
function ti(e) {
if (null == e.parent) return null;
for (var t = e.parent, n = Di(t.lines, e), r = t.parent; r; t = r, r = r.parent) for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
return n + t.first;
}
function ni(e, t) {
var n = e.first;
e: do {
for (var r = 0; r < e.children.length; ++r) {
var i = e.children[r], o = i.height;
if (o > t) {
e = i;
continue e;
}
t -= o, n += i.chunkSize();
}
return n;
} while (!e.lines);
for (var r = 0; r < e.lines.length; ++r) {
var l = e.lines[r], a = l.height;
if (a > t) break;
t -= a;
}
return n + r;
}
function ri(e) {
e = xr(e);
for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
var i = n.lines[r];
if (i == e) break;
t += i.height;
}
for (var o = n.parent; o; n = o, o = n.parent) for (var r = 0; r < o.children.length; ++r) {
var l = o.children[r];
if (l == n) break;
t += l.height;
}
return t;
}
function ii(e) {
var t = e.order;
return null == t && (t = e.order = la(e.text)), t;
}
function oi(e) {
this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, 
this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, 
this.generation = this.maxGeneration = e || 1;
}
function li(e, t) {
var n = {
from: K(t.from),
to: Jo(t),
text: Jr(e, t.from, t.to)
};
return di(e, n, t.from.line, t.to.line + 1), Xr(e, function(e) {
di(e, n, t.from.line, t.to.line + 1);
}, !0), n;
}
function ai(e) {
for (;e.length; ) {
var t = Wi(e);
if (!t.ranges) break;
e.pop();
}
}
function si(e, t) {
return t ? (ai(e.done), Wi(e.done)) : e.done.length && !Wi(e.done).ranges ? Wi(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), 
Wi(e.done)) : void 0;
}
function ci(e, t, n, r) {
var i = e.history;
i.undone.length = 0;
var o, l = +new Date();
if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > l - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = si(i, i.lastOp == r))) {
var a = Wi(o.changes);
0 == Io(t.from, t.to) && 0 == Io(t.from, a.to) ? a.to = Jo(t) : o.changes.push(li(e, t));
} else {
var s = Wi(i.done);
for (s && s.ranges || hi(e.sel, i.done), o = {
changes: [ li(e, t) ],
generation: i.generation
}, i.done.push(o); i.done.length > i.undoDepth; ) i.done.shift(), i.done[0].ranges || i.done.shift();
}
i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, 
i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, a || Wl(e, "historyAdded");
}
function ui(e, t, n, r) {
var i = t.charAt(0);
return "*" == i || "+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
}
function fi(e, t, n, r) {
var i = e.history, o = r && r.origin;
n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || ui(e, o, Wi(i.done), t)) ? i.done[i.done.length - 1] = t : hi(t, i.done), 
i.lastSelTime = +new Date(), i.lastSelOrigin = o, i.lastSelOp = n, r && r.clearRedo !== !1 && ai(i.undone);
}
function hi(e, t) {
var n = Wi(t);
n && n.ranges && n.equals(e) || t.push(e);
}
function di(e, t, n, r) {
var i = t["spans_" + e.id], o = 0;
e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(n) {
n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o;
});
}
function pi(e) {
if (!e) return null;
for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
return t ? t.length ? t : null : e;
}
function mi(e, t) {
var n = t["spans_" + e.id];
if (!n) return null;
for (var r = 0, i = []; r < t.text.length; ++r) i.push(pi(n[r]));
return i;
}
function gi(e, t, n) {
for (var r = 0, i = []; r < e.length; ++r) {
var o = e[r];
if (o.ranges) i.push(n ? ue.prototype.deepCopy.call(o) : o); else {
var l = o.changes, a = [];
i.push({
changes: a
});
for (var s = 0; s < l.length; ++s) {
var c, u = l[s];
if (a.push({
from: u.from,
to: u.to,
text: u.text
}), t) for (var f in u) (c = f.match(/^spans_(\d+)$/)) && Di(t, +c[1]) > -1 && (Wi(a)[f] = u[f], 
delete u[f]);
}
}
}
return i;
}
function vi(e, t, n, r) {
n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0);
}
function xi(e, t, n, r) {
for (var i = 0; i < e.length; ++i) {
var o = e[i], l = !0;
if (o.ranges) {
o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
for (var a = 0; a < o.ranges.length; a++) vi(o.ranges[a].anchor, t, n, r), vi(o.ranges[a].head, t, n, r);
} else {
for (var a = 0; a < o.changes.length; ++a) {
var s = o.changes[a];
if (n < s.from.line) s.from = Eo(s.from.line + r, s.from.ch), s.to = Eo(s.to.line + r, s.to.ch); else if (t <= s.to.line) {
l = !1;
break;
}
}
l || (e.splice(0, i + 1), i = 0);
}
}
}
function yi(e, t) {
var n = t.from.line, r = t.to.line, i = t.text.length - (r - n) - 1;
xi(e.done, n, r, i), xi(e.undone, n, r, i);
}
function bi(e) {
return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
}
function wi(e) {
return e.target || e.srcElement;
}
function Ci(e) {
var t = e.which;
return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), 
No && e.ctrlKey && 1 == t && (t = 3), t;
}
function ki(e, t, n) {
var r = e._handlers && e._handlers[t];
return n ? r && r.length > 0 ? r.slice() : Nl : r || Nl;
}
function Si(e, t) {
function n(e) {
return function() {
e.apply(null, o);
};
}
var r = ki(e, t, !1);
if (r.length) {
var i, o = Array.prototype.slice.call(arguments, 2);
Go ? i = Go.delayedCallbacks : Dl ? i = Dl : (i = Dl = [], setTimeout(Li, 0));
for (var l = 0; l < r.length; ++l) i.push(n(r[l]));
}
}
function Li() {
var e = Dl;
Dl = null;
for (var t = 0; t < e.length; ++t) e[t]();
}
function Ti(e, t, n) {
return "string" == typeof t && (t = {
type: t,
preventDefault: function() {
this.defaultPrevented = !0;
}
}), Wl(e, n || t.type, e, t), bi(t) || t.codemirrorIgnore;
}
function Mi(e) {
var t = e._handlers && e._handlers.cursorActivity;
if (t) for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) -1 == Di(n, t[r]) && n.push(t[r]);
}
function Ai(e, t) {
return ki(e, t).length > 0;
}
function Oi(e) {
e.prototype.on = function(e, t) {
Ol(this, e, t);
}, e.prototype.off = function(e, t) {
Fl(this, e, t);
};
}
function Ni() {
this.id = null;
}
function Fi(e) {
for (;Bl.length <= e; ) Bl.push(Wi(Bl) + " ");
return Bl[e];
}
function Wi(e) {
return e[e.length - 1];
}
function Di(e, t) {
for (var n = 0; n < e.length; ++n) if (e[n] == t) return n;
return -1;
}
function Hi(e, t) {
for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
return n;
}
function Pi() {}
function zi(e, t) {
var n;
return Object.create ? n = Object.create(e) : (Pi.prototype = e, n = new Pi()), 
t && Ei(t, n), n;
}
function Ei(e, t, n) {
t || (t = {});
for (var r in e) !e.hasOwnProperty(r) || n === !1 && t.hasOwnProperty(r) || (t[r] = e[r]);
return t;
}
function Ii(e) {
var t = Array.prototype.slice.call(arguments, 1);
return function() {
return e.apply(null, t);
};
}
function ji(e, t) {
return t ? t.source.indexOf("\\w") > -1 && Ul(e) ? !0 : t.test(e) : Ul(e);
}
function Ri(e) {
for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1;
return !0;
}
function Bi(e) {
return e.charCodeAt(0) >= 768 && Vl.test(e);
}
function _i(e, t, n, r) {
var i = document.createElement(e);
if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) i.appendChild(document.createTextNode(t)); else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
return i;
}
function qi(e) {
for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
return e;
}
function Gi(e, t) {
return qi(e).appendChild(t);
}
function Ui() {
for (var e = document.activeElement; e && e.root && e.root.activeElement; ) e = e.root.activeElement;
return e;
}
function Vi(e) {
return RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
}
function Ki(e, t) {
for (var n = e.split(" "), r = 0; r < n.length; r++) n[r] && !Vi(n[r]).test(t) && (t += " " + n[r]);
return t;
}
function $i(e) {
if (document.body.getElementsByClassName) for (var t = document.body.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
var r = t[n].CodeMirror;
r && e(r);
}
}
function Xi() {
Jl || (Yi(), Jl = !0);
}
function Yi() {
var e;
Ol(window, "resize", function() {
null == e && (e = setTimeout(function() {
e = null, $i(Gt);
}, 100));
}), Ol(window, "blur", function() {
$i(xn);
});
}
function Zi(e) {
if (null == $l) {
var t = _i("span", "​");
Gi(e, _i("span", [ t, document.createTextNode("x") ])), 0 != e.firstChild.offsetHeight && ($l = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(yo && 8 > bo));
}
var n = $l ? _i("span", "​") : _i("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
return n.setAttribute("cm-text", ""), n;
}
function Ji(e) {
if (null != Xl) return Xl;
var t = Gi(e, document.createTextNode("AخA")), n = ql(t, 0, 1).getBoundingClientRect();
if (!n || n.left == n.right) return !1;
var r = ql(t, 1, 2).getBoundingClientRect();
return Xl = r.right - n.right < 3;
}
function Qi(e) {
if (null != ra) return ra;
var t = Gi(e, _i("span", "x")), n = t.getBoundingClientRect(), r = ql(t, 0, 1).getBoundingClientRect();
return ra = Math.abs(n.left - r.left) > 1;
}
function eo(e, t, n, r) {
if (!e) return r(t, n, "ltr");
for (var i = !1, o = 0; o < e.length; ++o) {
var l = e[o];
(l.from < n && l.to > t || t == n && l.to == t) && (r(Math.max(l.from, t), Math.min(l.to, n), 1 == l.level ? "rtl" : "ltr"), 
i = !0);
}
i || r(t, n, "ltr");
}
function to(e) {
return e.level % 2 ? e.to : e.from;
}
function no(e) {
return e.level % 2 ? e.from : e.to;
}
function ro(e) {
var t = ii(e);
return t ? to(t[0]) : 0;
}
function io(e) {
var t = ii(e);
return t ? no(Wi(t)) : e.text.length;
}
function oo(e, t) {
var n = Zr(e.doc, t), r = xr(n);
r != n && (t = ti(r));
var i = ii(r), o = i ? i[0].level % 2 ? io(r) : ro(r) : 0;
return Eo(t, o);
}
function lo(e, t) {
for (var n, r = Zr(e.doc, t); n = gr(r); ) r = n.find(1, !0).line, t = null;
var i = ii(r), o = i ? i[0].level % 2 ? ro(r) : io(r) : r.text.length;
return Eo(null == t ? ti(r) : t, o);
}
function ao(e, t) {
var n = oo(e, t.line), r = Zr(e.doc, n.line), i = ii(r);
if (!i || 0 == i[0].level) {
var o = Math.max(0, r.text.search(/\S/)), l = t.line == n.line && t.ch <= o && t.ch;
return Eo(n.line, l ? 0 : o);
}
return n;
}
function so(e, t, n) {
var r = e[0].level;
return t == r ? !0 : n == r ? !1 : n > t;
}
function co(e, t) {
oa = null;
for (var n, r = 0; r < e.length; ++r) {
var i = e[r];
if (i.from < t && i.to > t) return r;
if (i.from == t || i.to == t) {
if (null != n) return so(e, i.level, e[n].level) ? (i.from != i.to && (oa = n), 
r) : (i.from != i.to && (oa = r), n);
n = r;
}
}
return n;
}
function uo(e, t, n, r) {
if (!r) return t + n;
do t += n; while (t > 0 && Bi(e.text.charAt(t)));
return t;
}
function fo(e, t, n, r) {
var i = ii(e);
if (!i) return ho(e, t, n, r);
for (var o = co(i, t), l = i[o], a = uo(e, t, l.level % 2 ? -n : n, r); ;) {
if (a > l.from && a < l.to) return a;
if (a == l.from || a == l.to) return co(i, a) == o ? a : (l = i[o += n], n > 0 == l.level % 2 ? l.to : l.from);
if (l = i[o += n], !l) return null;
a = n > 0 == l.level % 2 ? uo(e, l.to, -1, r) : uo(e, l.from, 1, r);
}
}
function ho(e, t, n, r) {
var i = t + n;
if (r) for (;i > 0 && Bi(e.text.charAt(i)); ) i += n;
return 0 > i || i > e.text.length ? null : i;
}
var po = navigator.userAgent, mo = navigator.platform, go = /gecko\/\d/i.test(po), vo = /MSIE \d/.test(po), xo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(po), yo = vo || xo, bo = yo && (vo ? document.documentMode || 6 : xo[1]), wo = /WebKit\//.test(po), Co = wo && /Qt\/\d+\.\d+/.test(po), ko = /Chrome\//.test(po), So = /Opera\//.test(po), Lo = /Apple Computer/.test(navigator.vendor), To = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(po), Mo = /PhantomJS/.test(po), Ao = /AppleWebKit/.test(po) && /Mobile\/\w+/.test(po), Oo = Ao || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(po), No = Ao || /Mac/.test(mo), Fo = /win/i.test(mo), Wo = So && po.match(/Version\/(\d*\.\d*)/);
Wo && (Wo = +Wo[1]), Wo && Wo >= 15 && (So = !1, wo = !0);
var Do = No && (Co || So && (null == Wo || 12.11 > Wo)), Ho = go || yo && bo >= 9, Po = !1, zo = !1;
m.prototype = Ei({
update: function(e) {
var t = e.scrollWidth > e.clientWidth + 1, n = e.scrollHeight > e.clientHeight + 1, r = e.nativeBarWidth;
if (n) {
this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
var i = e.viewHeight - (t ? r : 0);
this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
} else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
if (t) {
this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", 
this.horiz.style.left = e.barLeft + "px";
var o = e.viewWidth - e.barLeft - (n ? r : 0);
this.horiz.firstChild.style.width = e.scrollWidth - e.clientWidth + o + "px";
} else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == r && this.zeroWidthHack(), 
this.checkedZeroWidth = !0), {
right: n ? r : 0,
bottom: t ? r : 0
};
},
setScrollLeft: function(e) {
this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz);
},
setScrollTop: function(e) {
this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert);
},
zeroWidthHack: function() {
var e = No && !To ? "12px" : "18px";
this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", 
this.disableHoriz = new Ni(), this.disableVert = new Ni();
},
enableZeroWidthBar: function(e, t) {
function n() {
var r = e.getBoundingClientRect(), i = document.elementFromPoint(r.left + 1, r.bottom - 1);
i != e ? e.style.pointerEvents = "none" : t.set(1e3, n);
}
e.style.pointerEvents = "auto", t.set(1e3, n);
},
clear: function() {
var e = this.horiz.parentNode;
e.removeChild(this.horiz), e.removeChild(this.vert);
}
}, m.prototype), g.prototype = Ei({
update: function() {
return {
bottom: 0,
right: 0
};
},
setScrollLeft: function() {},
setScrollTop: function() {},
clear: function() {}
}, g.prototype), e.scrollbarModel = {
"native": m,
"null": g
}, L.prototype.signal = function(e, t) {
Ai(e, t) && this.events.push(arguments);
}, L.prototype.finish = function() {
for (var e = 0; e < this.events.length; e++) Wl.apply(null, this.events[e]);
};
var Eo = e.Pos = function(e, t) {
return this instanceof Eo ? (this.line = e, void (this.ch = t)) : new Eo(e, t);
}, Io = e.cmpPos = function(e, t) {
return e.line - t.line || e.ch - t.ch;
}, jo = null;
ne.prototype = Ei({
init: function(e) {
function t(e) {
if (!Ti(r, e)) {
if (r.somethingSelected()) jo = r.getSelections(), n.inaccurateSelection && (n.prevInput = "", 
n.inaccurateSelection = !1, o.value = jo.join("\n"), _l(o)); else {
if (!r.options.lineWiseCopyCut) return;
var t = ee(r);
jo = t.text, "cut" == e.type ? r.setSelections(t.ranges, null, zl) : (n.prevInput = "", 
o.value = t.text.join("\n"), _l(o));
}
"cut" == e.type && (r.state.cutIncoming = !0);
}
}
var n = this, r = this.cm, i = this.wrapper = re(), o = this.textarea = i.firstChild;
e.wrapper.insertBefore(i, e.wrapper.firstChild), Ao && (o.style.width = "0px"), 
Ol(o, "input", function() {
yo && bo >= 9 && n.hasSelection && (n.hasSelection = null), n.poll();
}), Ol(o, "paste", function(e) {
Ti(r, e) || J(e, r) || (r.state.pasteIncoming = !0, n.fastPoll());
}), Ol(o, "cut", t), Ol(o, "copy", t), Ol(e.scroller, "paste", function(t) {
Ut(e, t) || Ti(r, t) || (r.state.pasteIncoming = !0, n.focus());
}), Ol(e.lineSpace, "selectstart", function(t) {
Ut(e, t) || Tl(t);
}), Ol(o, "compositionstart", function() {
var e = r.getCursor("from");
n.composing && n.composing.range.clear(), n.composing = {
start: e,
range: r.markText(e, r.getCursor("to"), {
className: "CodeMirror-composing"
})
};
}), Ol(o, "compositionend", function() {
n.composing && (n.poll(), n.composing.range.clear(), n.composing = null);
});
},
prepareSelection: function() {
var e = this.cm, t = e.display, n = e.doc, r = Pe(e);
if (e.options.moveInputWithCursor) {
var i = dt(e, n.sel.primary().head, "div"), o = t.wrapper.getBoundingClientRect(), l = t.lineDiv.getBoundingClientRect();
r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)), 
r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left));
}
return r;
},
showSelection: function(e) {
var t = this.cm, n = t.display;
Gi(n.cursorDiv, e.cursors), Gi(n.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", 
this.wrapper.style.left = e.teLeft + "px");
},
reset: function(e) {
if (!this.contextMenuPending) {
var t, n, r = this.cm, i = r.doc;
if (r.somethingSelected()) {
this.prevInput = "";
var o = i.sel.primary();
t = na && (o.to().line - o.from().line > 100 || (n = r.getSelection()).length > 1e3);
var l = t ? "-" : n || r.getSelection();
this.textarea.value = l, r.state.focused && _l(this.textarea), yo && bo >= 9 && (this.hasSelection = l);
} else e || (this.prevInput = this.textarea.value = "", yo && bo >= 9 && (this.hasSelection = null));
this.inaccurateSelection = t;
}
},
getField: function() {
return this.textarea;
},
supportsTouch: function() {
return !1;
},
focus: function() {
if ("nocursor" != this.cm.options.readOnly && (!Oo || Ui() != this.textarea)) try {
this.textarea.focus();
} catch (e) {}
},
blur: function() {
this.textarea.blur();
},
resetPosition: function() {
this.wrapper.style.top = this.wrapper.style.left = 0;
},
receivedFocus: function() {
this.slowPoll();
},
slowPoll: function() {
var e = this;
e.pollingFast || e.polling.set(this.cm.options.pollInterval, function() {
e.poll(), e.cm.state.focused && e.slowPoll();
});
},
fastPoll: function() {
function e() {
var r = n.poll();
r || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e));
}
var t = !1, n = this;
n.pollingFast = !0, n.polling.set(20, e);
},
poll: function() {
var e = this.cm, t = this.textarea, n = this.prevInput;
if (this.contextMenuPending || !e.state.focused || ta(t) && !n && !this.composing || e.isReadOnly() || e.options.disableInput || e.state.keySeq) return !1;
var r = t.value;
if (r == n && !e.somethingSelected()) return !1;
if (yo && bo >= 9 && this.hasSelection === r || No && /[\uf700-\uf7ff]/.test(r)) return e.display.input.reset(), 
!1;
if (e.doc.sel == e.display.selForContextMenu) {
var i = r.charCodeAt(0);
if (8203 != i || n || (n = "​"), 8666 == i) return this.reset(), this.cm.execCommand("undo");
}
for (var o = 0, l = Math.min(n.length, r.length); l > o && n.charCodeAt(o) == r.charCodeAt(o); ) ++o;
var a = this;
return Ot(e, function() {
Z(e, r.slice(o), n.length - o, null, a.composing ? "*compose" : null), r.length > 1e3 || r.indexOf("\n") > -1 ? t.value = a.prevInput = "" : a.prevInput = r, 
a.composing && (a.composing.range.clear(), a.composing.range = e.markText(a.composing.start, e.getCursor("to"), {
className: "CodeMirror-composing"
}));
}), !0;
},
ensurePolled: function() {
this.pollingFast && this.poll() && (this.pollingFast = !1);
},
onKeyPress: function() {
yo && bo >= 9 && (this.hasSelection = null), this.fastPoll();
},
onContextMenu: function(e) {
function t() {
if (null != l.selectionStart) {
var e = i.somethingSelected(), t = "​" + (e ? l.value : "");
l.value = "⇚", l.value = t, r.prevInput = e ? "" : "​", l.selectionStart = 1, l.selectionEnd = t.length, 
o.selForContextMenu = i.doc.sel;
}
}
function n() {
if (r.contextMenuPending = !1, r.wrapper.style.position = "relative", l.style.cssText = u, 
yo && 9 > bo && o.scrollbars.setScrollTop(o.scroller.scrollTop = s), null != l.selectionStart) {
(!yo || yo && 9 > bo) && t();
var e = 0, n = function() {
o.selForContextMenu == i.doc.sel && 0 == l.selectionStart && l.selectionEnd > 0 && "​" == r.prevInput ? Nt(i, cl.selectAll)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(n, 500) : o.input.reset();
};
o.detectingSelectAll = setTimeout(n, 200);
}
}
var r = this, i = r.cm, o = i.display, l = r.textarea, a = Vt(i, e), s = o.scroller.scrollTop;
if (a && !So) {
var c = i.options.resetSelectionOnContextMenu;
c && -1 == i.doc.sel.contains(a) && Nt(i, Te)(i.doc, de(a), zl);
var u = l.style.cssText;
if (r.wrapper.style.position = "absolute", l.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: " + (yo ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", 
wo) var f = window.scrollY;
if (o.input.focus(), wo && window.scrollTo(null, f), o.input.reset(), i.somethingSelected() || (l.value = r.prevInput = " "), 
r.contextMenuPending = !0, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), 
yo && bo >= 9 && t(), Ho) {
Al(e);
var h = function() {
Fl(window, "mouseup", h), setTimeout(n, 20);
};
Ol(window, "mouseup", h);
} else setTimeout(n, 50);
}
},
readOnlyChanged: function(e) {
e || this.reset();
},
setUneditable: Pi,
needsContentAttribute: !1
}, ne.prototype), ie.prototype = Ei({
init: function(e) {
function t(e) {
if (!Ti(r, e)) {
if (r.somethingSelected()) jo = r.getSelections(), "cut" == e.type && r.replaceSelection("", null, "cut"); else {
if (!r.options.lineWiseCopyCut) return;
var t = ee(r);
jo = t.text, "cut" == e.type && r.operation(function() {
r.setSelections(t.ranges, 0, zl), r.replaceSelection("", null, "cut");
});
}
if (e.clipboardData && !Ao) e.preventDefault(), e.clipboardData.clearData(), e.clipboardData.setData("text/plain", jo.join("\n")); else {
var n = re(), i = n.firstChild;
r.display.lineSpace.insertBefore(n, r.display.lineSpace.firstChild), i.value = jo.join("\n");
var o = document.activeElement;
_l(i), setTimeout(function() {
r.display.lineSpace.removeChild(n), o.focus();
}, 50);
}
}
}
var n = this, r = n.cm, i = n.div = e.lineDiv;
te(i), Ol(i, "paste", function(e) {
Ti(r, e) || J(e, r);
}), Ol(i, "compositionstart", function(e) {
var t = e.data;
if (n.composing = {
sel: r.doc.sel,
data: t,
startData: t
}, t) {
var i = r.doc.sel.primary(), o = r.getLine(i.head.line), l = o.indexOf(t, Math.max(0, i.head.ch - t.length));
l > -1 && l <= i.head.ch && (n.composing.sel = de(Eo(i.head.line, l), Eo(i.head.line, l + t.length)));
}
}), Ol(i, "compositionupdate", function(e) {
n.composing.data = e.data;
}), Ol(i, "compositionend", function(e) {
var t = n.composing;
t && (e.data == t.startData || /\u200b/.test(e.data) || (t.data = e.data), setTimeout(function() {
t.handled || n.applyComposition(t), n.composing == t && (n.composing = null);
}, 50));
}), Ol(i, "touchstart", function() {
n.forceCompositionEnd();
}), Ol(i, "input", function() {
n.composing || (r.isReadOnly() || !n.pollContent()) && Ot(n.cm, function() {
Pt(r);
});
}), Ol(i, "copy", t), Ol(i, "cut", t);
},
prepareSelection: function() {
var e = Pe(this.cm, !1);
return e.focus = this.cm.state.focused, e;
},
showSelection: function(e) {
e && this.cm.display.view.length && (e.focus && this.showPrimarySelection(), this.showMultipleSelections(e));
},
showPrimarySelection: function() {
var e = window.getSelection(), t = this.cm.doc.sel.primary(), n = ae(this.cm, e.anchorNode, e.anchorOffset), r = ae(this.cm, e.focusNode, e.focusOffset);
if (!n || n.bad || !r || r.bad || 0 != Io(X(n, r), t.from()) || 0 != Io($(n, r), t.to())) {
var i = oe(this.cm, t.from()), o = oe(this.cm, t.to());
if (i || o) {
var l = this.cm.display.view, a = e.rangeCount && e.getRangeAt(0);
if (i) {
if (!o) {
var s = l[l.length - 1].measure, c = s.maps ? s.maps[s.maps.length - 1] : s.map;
o = {
node: c[c.length - 1],
offset: c[c.length - 2] - c[c.length - 3]
};
}
} else i = {
node: l[0].measure.map[2],
offset: 0
};
try {
var u = ql(i.node, i.offset, o.offset, o.node);
} catch (f) {}
u && (!go && this.cm.state.focused ? (e.collapse(i.node, i.offset), u.collapsed || e.addRange(u)) : (e.removeAllRanges(), 
e.addRange(u)), a && null == e.anchorNode ? e.addRange(a) : go && this.startGracePeriod()), 
this.rememberSelection();
}
}
},
startGracePeriod: function() {
var e = this;
clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
e.cm.curOp.selectionChanged = !0;
});
}, 20);
},
showMultipleSelections: function(e) {
Gi(this.cm.display.cursorDiv, e.cursors), Gi(this.cm.display.selectionDiv, e.selection);
},
rememberSelection: function() {
var e = window.getSelection();
this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, 
this.lastFocusOffset = e.focusOffset;
},
selectionInEditor: function() {
var e = window.getSelection();
if (!e.rangeCount) return !1;
var t = e.getRangeAt(0).commonAncestorContainer;
return Kl(this.div, t);
},
focus: function() {
"nocursor" != this.cm.options.readOnly && this.div.focus();
},
blur: function() {
this.div.blur();
},
getField: function() {
return this.div;
},
supportsTouch: function() {
return !0;
},
receivedFocus: function() {
function e() {
t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e));
}
var t = this;
this.selectionInEditor() ? this.pollSelection() : Ot(this.cm, function() {
t.cm.curOp.selectionChanged = !0;
}), this.polling.set(this.cm.options.pollInterval, e);
},
selectionChanged: function() {
var e = window.getSelection();
return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
},
pollSelection: function() {
if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
var e = window.getSelection(), t = this.cm;
this.rememberSelection();
var n = ae(t, e.anchorNode, e.anchorOffset), r = ae(t, e.focusNode, e.focusOffset);
n && r && Ot(t, function() {
Te(t.doc, de(n, r), zl), (n.bad || r.bad) && (t.curOp.selectionChanged = !0);
});
}
},
pollContent: function() {
var e = this.cm, t = e.display, n = e.doc.sel.primary(), r = n.from(), i = n.to();
if (r.line < t.viewFrom || i.line > t.viewTo - 1) return !1;
var o;
if (r.line == t.viewFrom || 0 == (o = It(e, r.line))) var l = ti(t.view[0].line), a = t.view[0].node; else var l = ti(t.view[o].line), a = t.view[o - 1].node.nextSibling;
var s = It(e, i.line);
if (s == t.view.length - 1) var c = t.viewTo - 1, u = t.lineDiv.lastChild; else var c = ti(t.view[s + 1].line) - 1, u = t.view[s + 1].node.previousSibling;
for (var f = e.doc.splitLines(ce(e, a, u, l, c)), h = Jr(e.doc, Eo(l, 0), Eo(c, Zr(e.doc, c).text.length)); f.length > 1 && h.length > 1; ) if (Wi(f) == Wi(h)) f.pop(), 
h.pop(), c--; else {
if (f[0] != h[0]) break;
f.shift(), h.shift(), l++;
}
for (var d = 0, p = 0, m = f[0], g = h[0], v = Math.min(m.length, g.length); v > d && m.charCodeAt(d) == g.charCodeAt(d); ) ++d;
for (var x = Wi(f), y = Wi(h), b = Math.min(x.length - (1 == f.length ? d : 0), y.length - (1 == h.length ? d : 0)); b > p && x.charCodeAt(x.length - p - 1) == y.charCodeAt(y.length - p - 1); ) ++p;
f[f.length - 1] = x.slice(0, x.length - p), f[0] = f[0].slice(d);
var w = Eo(l, d), C = Eo(c, h.length ? Wi(h).length - p : 0);
return f.length > 1 || f[0] || Io(w, C) ? (Wn(e.doc, f, w, C, "+input"), !0) : void 0;
},
ensurePolled: function() {
this.forceCompositionEnd();
},
reset: function() {
this.forceCompositionEnd();
},
forceCompositionEnd: function() {
this.composing && !this.composing.handled && (this.applyComposition(this.composing), 
this.composing.handled = !0, this.div.blur(), this.div.focus());
},
applyComposition: function(e) {
this.cm.isReadOnly() ? Nt(this.cm, Pt)(this.cm) : e.data && e.data != e.startData && Nt(this.cm, Z)(this.cm, e.data, 0, e.sel);
},
setUneditable: function(e) {
e.contentEditable = "false";
},
onKeyPress: function(e) {
e.preventDefault(), this.cm.isReadOnly() || Nt(this.cm, Z)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0);
},
readOnlyChanged: function(e) {
this.div.contentEditable = ("nocursor" != e) + "";
},
onContextMenu: Pi,
resetPosition: Pi,
needsContentAttribute: !0
}, ie.prototype), e.inputStyles = {
textarea: ne,
contenteditable: ie
}, ue.prototype = {
primary: function() {
return this.ranges[this.primIndex];
},
equals: function(e) {
if (e == this) return !0;
if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
for (var t = 0; t < this.ranges.length; t++) {
var n = this.ranges[t], r = e.ranges[t];
if (0 != Io(n.anchor, r.anchor) || 0 != Io(n.head, r.head)) return !1;
}
return !0;
},
deepCopy: function() {
for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new fe(K(this.ranges[t].anchor), K(this.ranges[t].head));
return new ue(e, this.primIndex);
},
somethingSelected: function() {
for (var e = 0; e < this.ranges.length; e++) if (!this.ranges[e].empty()) return !0;
return !1;
},
contains: function(e, t) {
t || (t = e);
for (var n = 0; n < this.ranges.length; n++) {
var r = this.ranges[n];
if (Io(t, r.from()) >= 0 && Io(e, r.to()) <= 0) return n;
}
return -1;
}
}, fe.prototype = {
from: function() {
return X(this.anchor, this.head);
},
to: function() {
return $(this.anchor, this.head);
},
empty: function() {
return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
}
};
var Ro, Bo, _o, qo = {
left: 0,
right: 0,
top: 0,
bottom: 0
}, Go = null, Uo = 0, Vo = 0, Ko = 0, $o = null;
yo ? $o = -.53 : go ? $o = 15 : ko ? $o = -.7 : Lo && ($o = -1 / 3);
var Xo = function(e) {
var t = e.wheelDeltaX, n = e.wheelDeltaY;
return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), 
{
x: t,
y: n
};
};
e.wheelEventPixels = function(e) {
var t = Xo(e);
return t.x *= $o, t.y *= $o, t;
};
var Yo = new Ni(), Zo = null, Jo = e.changeEnd = function(e) {
return e.text ? Eo(e.from.line + e.text.length - 1, Wi(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to;
};
e.prototype = {
constructor: e,
focus: function() {
window.focus(), this.display.input.focus();
},
setOption: function(e, t) {
var n = this.options, r = n[e];
(n[e] != t || "mode" == e) && (n[e] = t, el.hasOwnProperty(e) && Nt(this, el[e])(this, t, r));
},
getOption: function(e) {
return this.options[e];
},
getDoc: function() {
return this.doc;
},
addKeyMap: function(e, t) {
this.state.keyMaps[t ? "push" : "unshift"](Kn(e));
},
removeKeyMap: function(e) {
for (var t = this.state.keyMaps, n = 0; n < t.length; ++n) if (t[n] == e || t[n].name == e) return t.splice(n, 1), 
!0;
},
addOverlay: Ft(function(t, n) {
var r = t.token ? t : e.getMode(this.options, t);
if (r.startState) throw Error("Overlays may not be stateful.");
this.state.overlays.push({
mode: r,
modeSpec: t,
opaque: n && n.opaque
}), this.state.modeGen++, Pt(this);
}),
removeOverlay: Ft(function(e) {
for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
var r = t[n].modeSpec;
if (r == e || "string" == typeof e && r.name == e) return t.splice(n, 1), this.state.modeGen++, 
void Pt(this);
}
}),
indentLine: Ft(function(e, t, n) {
"string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), 
ve(this.doc, e) && Rn(this, e, t, n);
}),
indentSelection: Ft(function(e) {
for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
var i = t[r];
if (i.empty()) i.head.line > n && (Rn(this, i.head.line, e, !0), n = i.head.line, 
r == this.doc.sel.primIndex && In(this)); else {
var o = i.from(), l = i.to(), a = Math.max(n, o.line);
n = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
for (var s = a; n > s; ++s) Rn(this, s, e);
var c = this.doc.sel.ranges;
0 == o.ch && t.length == c.length && c[r].from().ch > 0 && Ce(this.doc, r, new fe(o, c[r].to()), zl);
}
}
}),
getTokenAt: function(e, t) {
return Wr(this, e, t);
},
getLineTokens: function(e, t) {
return Wr(this, Eo(e), t, !0);
},
getTokenTypeAt: function(e) {
e = me(this.doc, e);
var t, n = Pr(this, Zr(this.doc, e.line)), r = 0, i = (n.length - 1) / 2, o = e.ch;
if (0 == o) t = n[2]; else for (;;) {
var l = r + i >> 1;
if ((l ? n[2 * l - 1] : 0) >= o) i = l; else {
if (!(n[2 * l + 1] < o)) {
t = n[2 * l + 2];
break;
}
r = l + 1;
}
}
var a = t ? t.indexOf("cm-overlay ") : -1;
return 0 > a ? t : 0 == a ? null : t.slice(0, a - 1);
},
getModeAt: function(t) {
var n = this.doc.mode;
return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n;
},
getHelper: function(e, t) {
return this.getHelpers(e, t)[0];
},
getHelpers: function(e, t) {
var n = [];
if (!ll.hasOwnProperty(t)) return n;
var r = ll[t], i = this.getModeAt(e);
if ("string" == typeof i[t]) r[i[t]] && n.push(r[i[t]]); else if (i[t]) for (var o = 0; o < i[t].length; o++) {
var l = r[i[t][o]];
l && n.push(l);
} else i.helperType && r[i.helperType] ? n.push(r[i.helperType]) : r[i.name] && n.push(r[i.name]);
for (var o = 0; o < r._global.length; o++) {
var a = r._global[o];
a.pred(i, this) && -1 == Di(n, a.val) && n.push(a.val);
}
return n;
},
getStateAfter: function(e, t) {
var n = this.doc;
return e = pe(n, null == e ? n.first + n.size - 1 : e), _e(this, e + 1, t);
},
cursorCoords: function(e, t) {
var n, r = this.doc.sel.primary();
return n = null == e ? r.head : "object" == typeof e ? me(this.doc, e) : e ? r.from() : r.to(), 
dt(this, n, t || "page");
},
charCoords: function(e, t) {
return ht(this, me(this.doc, e), t || "page");
},
coordsChar: function(e, t) {
return e = ft(this, e, t || "page"), gt(this, e.left, e.top);
},
lineAtHeight: function(e, t) {
return e = ft(this, {
top: e,
left: 0
}, t || "page").top, ni(this.doc, e + this.display.viewOffset);
},
heightAtLine: function(e, t) {
var n, r = !1;
if ("number" == typeof e) {
var i = this.doc.first + this.doc.size - 1;
e < this.doc.first ? e = this.doc.first : e > i && (e = i, r = !0), n = Zr(this.doc, e);
} else n = e;
return ut(this, n, {
top: 0,
left: 0
}, t || "page").top + (r ? this.doc.height - ri(n) : 0);
},
defaultTextHeight: function() {
return xt(this.display);
},
defaultCharWidth: function() {
return yt(this.display);
},
setGutterMarker: Ft(function(e, t, n) {
return Bn(this.doc, e, "gutter", function(e) {
var r = e.gutterMarkers || (e.gutterMarkers = {});
return r[t] = n, !n && Ri(r) && (e.gutterMarkers = null), !0;
});
}),
clearGutter: Ft(function(e) {
var t = this, n = t.doc, r = n.first;
n.iter(function(n) {
n.gutterMarkers && n.gutterMarkers[e] && (n.gutterMarkers[e] = null, zt(t, r, "gutter"), 
Ri(n.gutterMarkers) && (n.gutterMarkers = null)), ++r;
});
}),
lineInfo: function(e) {
if ("number" == typeof e) {
if (!ve(this.doc, e)) return null;
var t = e;
if (e = Zr(this.doc, e), !e) return null;
} else {
var t = ti(e);
if (null == t) return null;
}
return {
line: t,
handle: e,
text: e.text,
gutterMarkers: e.gutterMarkers,
textClass: e.textClass,
bgClass: e.bgClass,
wrapClass: e.wrapClass,
widgets: e.widgets
};
},
getViewport: function() {
return {
from: this.display.viewFrom,
to: this.display.viewTo
};
},
addWidget: function(e, t, n, r, i) {
var o = this.display;
e = dt(this, me(this.doc, e));
var l = e.bottom, a = e.left;
if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), 
o.sizer.appendChild(t), "over" == r) l = e.top; else if ("above" == r || "near" == r) {
var s = Math.max(o.wrapper.clientHeight, this.doc.height), c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
("above" == r || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? l = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (l = e.bottom), 
a + t.offsetWidth > c && (a = c - t.offsetWidth);
}
t.style.top = l + "px", t.style.left = t.style.right = "", "right" == i ? (a = o.sizer.clientWidth - t.offsetWidth, 
t.style.right = "0px") : ("left" == i ? a = 0 : "middle" == i && (a = (o.sizer.clientWidth - t.offsetWidth) / 2), 
t.style.left = a + "px"), n && Pn(this, a, l, a + t.offsetWidth, l + t.offsetHeight);
},
triggerOnKeyDown: Ft(hn),
triggerOnKeyPress: Ft(mn),
triggerOnKeyUp: pn,
execCommand: function(e) {
return cl.hasOwnProperty(e) ? cl[e].call(null, this) : void 0;
},
triggerElectric: Ft(function(e) {
Q(this, e);
}),
findPosH: function(e, t, n, r) {
var i = 1;
0 > t && (i = -1, t = -t);
for (var o = 0, l = me(this.doc, e); t > o && (l = qn(this.doc, l, i, n, r), !l.hitSide); ++o) ;
return l;
},
moveH: Ft(function(e, t) {
var n = this;
n.extendSelectionsBy(function(r) {
return n.display.shift || n.doc.extend || r.empty() ? qn(n.doc, r.head, e, t, n.options.rtlMoveVisually) : 0 > e ? r.from() : r.to();
}, Il);
}),
deleteH: Ft(function(e, t) {
var n = this.doc.sel, r = this.doc;
n.somethingSelected() ? r.replaceSelection("", null, "+delete") : _n(this, function(n) {
var i = qn(r, n.head, e, t, !1);
return 0 > e ? {
from: i,
to: n.head
} : {
from: n.head,
to: i
};
});
}),
findPosV: function(e, t, n, r) {
var i = 1, o = r;
0 > t && (i = -1, t = -t);
for (var l = 0, a = me(this.doc, e); t > l; ++l) {
var s = dt(this, a, "div");
if (null == o ? o = s.left : s.left = o, a = Gn(this, s, i, n), a.hitSide) break;
}
return a;
},
moveV: Ft(function(e, t) {
var n = this, r = this.doc, i = [], o = !n.display.shift && !r.extend && r.sel.somethingSelected();
if (r.extendSelectionsBy(function(l) {
if (o) return 0 > e ? l.from() : l.to();
var a = dt(n, l.head, "div");
null != l.goalColumn && (a.left = l.goalColumn), i.push(a.left);
var s = Gn(n, a, e, t);
return "page" == t && l == r.sel.primary() && En(n, null, ht(n, s, "div").top - a.top), 
s;
}, Il), i.length) for (var l = 0; l < r.sel.ranges.length; l++) r.sel.ranges[l].goalColumn = i[l];
}),
findWordAt: function(e) {
var t = this.doc, n = Zr(t, e.line).text, r = e.ch, i = e.ch;
if (n) {
var o = this.getHelper(e, "wordChars");
(e.xRel < 0 || i == n.length) && r ? --r : ++i;
for (var l = n.charAt(r), a = ji(l, o) ? function(e) {
return ji(e, o);
} : /\s/.test(l) ? function(e) {
return /\s/.test(e);
} : function(e) {
return !/\s/.test(e) && !ji(e);
}; r > 0 && a(n.charAt(r - 1)); ) --r;
for (;i < n.length && a(n.charAt(i)); ) ++i;
}
return new fe(Eo(e.line, r), Eo(e.line, i));
},
toggleOverwrite: function(e) {
(null == e || e != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? Zl(this.display.cursorDiv, "CodeMirror-overwrite") : Yl(this.display.cursorDiv, "CodeMirror-overwrite"), 
Wl(this, "overwriteToggle", this, this.state.overwrite));
},
hasFocus: function() {
return this.display.input.getField() == Ui();
},
isReadOnly: function() {
return !(!this.options.readOnly && !this.doc.cantEdit);
},
scrollTo: Ft(function(e, t) {
(null != e || null != t) && jn(this), null != e && (this.curOp.scrollLeft = e), 
null != t && (this.curOp.scrollTop = t);
}),
getScrollInfo: function() {
var e = this.display.scroller;
return {
left: e.scrollLeft,
top: e.scrollTop,
height: e.scrollHeight - Ve(this) - this.display.barHeight,
width: e.scrollWidth - Ve(this) - this.display.barWidth,
clientHeight: $e(this),
clientWidth: Ke(this)
};
},
scrollIntoView: Ft(function(e, t) {
if (null == e ? (e = {
from: this.doc.sel.primary().head,
to: null
}, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
from: Eo(e, 0),
to: null
} : null == e.from && (e = {
from: e,
to: null
}), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line) jn(this), this.curOp.scrollToPos = e; else {
var n = zn(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
this.scrollTo(n.scrollLeft, n.scrollTop);
}
}),
setSize: Ft(function(e, t) {
function n(e) {
return "number" == typeof e || /^\d+$/.test(e + "") ? e + "px" : e;
}
var r = this;
null != e && (r.display.wrapper.style.width = n(e)), null != t && (r.display.wrapper.style.height = n(t)), 
r.options.lineWrapping && lt(this);
var i = r.display.viewFrom;
r.doc.iter(i, r.display.viewTo, function(e) {
if (e.widgets) for (var t = 0; t < e.widgets.length; t++) if (e.widgets[t].noHScroll) {
zt(r, i, "widget");
break;
}
++i;
}), r.curOp.forceUpdate = !0, Wl(r, "refresh", this);
}),
operation: function(e) {
return Ot(this, e);
},
refresh: Ft(function() {
var e = this.display.cachedTextHeight;
Pt(this), this.curOp.forceUpdate = !0, at(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), 
u(this), (null == e || Math.abs(e - xt(this.display)) > .5) && l(this), Wl(this, "refresh", this);
}),
swapDoc: Ft(function(e) {
var t = this.doc;
return t.cm = null, Yr(this, e), at(this), this.display.input.reset(), this.scrollTo(e.scrollLeft, e.scrollTop), 
this.curOp.forceScroll = !0, Si(this, "swapDoc", this, t), t;
}),
getInputField: function() {
return this.display.input.getField();
},
getWrapperElement: function() {
return this.display.wrapper;
},
getScrollerElement: function() {
return this.display.scroller;
},
getGutterElement: function() {
return this.display.gutters;
}
}, Oi(e);
var Qo = e.defaults = {}, el = e.optionHandlers = {}, tl = e.Init = {
toString: function() {
return "CodeMirror.Init";
}
};
Un("value", "", function(e, t) {
e.setValue(t);
}, !0), Un("mode", null, function(e, t) {
e.doc.modeOption = t, n(e);
}, !0), Un("indentUnit", 2, n, !0), Un("indentWithTabs", !1), Un("smartIndent", !0), 
Un("tabSize", 4, function(e) {
r(e), at(e), Pt(e);
}, !0), Un("lineSeparator", null, function(e, t) {
if (e.doc.lineSep = t, t) {
var n = [], r = e.doc.first;
e.doc.iter(function(e) {
for (var i = 0; ;) {
var o = e.text.indexOf(t, i);
if (-1 == o) break;
i = o + t.length, n.push(Eo(r, o));
}
r++;
});
for (var i = n.length - 1; i >= 0; i--) Wn(e.doc, t, n[i], Eo(n[i].line, n[i].ch + t.length));
}
}), Un("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(t, n, r) {
t.state.specialChars = RegExp(n.source + (n.test("	") ? "" : "|	"), "g"), r != e.Init && t.refresh();
}), Un("specialCharPlaceholder", jr, function(e) {
e.refresh();
}, !0), Un("electricChars", !0), Un("inputStyle", Oo ? "contenteditable" : "textarea", function() {
throw Error("inputStyle can not (yet) be changed in a running editor");
}, !0), Un("rtlMoveVisually", !Fo), Un("wholeLineUpdateBefore", !0), Un("theme", "default", function(e) {
a(e), s(e);
}, !0), Un("keyMap", "default", function(t, n, r) {
var i = Kn(n), o = r != e.Init && Kn(r);
o && o.detach && o.detach(t, i), i.attach && i.attach(t, o || null);
}), Un("extraKeys", null), Un("lineWrapping", !1, i, !0), Un("gutters", [], function(e) {
d(e.options), s(e);
}, !0), Un("fixedGutter", !0, function(e, t) {
e.display.gutters.style.left = t ? S(e.display) + "px" : "0", e.refresh();
}, !0), Un("coverGutterNextToScrollbar", !1, function(e) {
x(e);
}, !0), Un("scrollbarStyle", "native", function(e) {
v(e), x(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
}, !0), Un("lineNumbers", !1, function(e) {
d(e.options), s(e);
}, !0), Un("firstLineNumber", 1, s, !0), Un("lineNumberFormatter", function(e) {
return e;
}, s, !0), Un("showCursorWhenSelecting", !1, He, !0), Un("resetSelectionOnContextMenu", !0), 
Un("lineWiseCopyCut", !0), Un("readOnly", !1, function(e, t) {
"nocursor" == t ? (xn(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1, 
e.display.input.readOnlyChanged(t);
}), Un("disableInput", !1, function(e, t) {
t || e.display.input.reset();
}, !0), Un("dragDrop", !0, qt), Un("allowDropFileTypes", null), Un("cursorBlinkRate", 530), 
Un("cursorScrollMargin", 0), Un("cursorHeight", 1, He, !0), Un("singleCursorHeightPerLine", !0, He, !0), 
Un("workTime", 100), Un("workDelay", 100), Un("flattenSpans", !0, r, !0), Un("addModeClass", !1, r, !0), 
Un("pollInterval", 100), Un("undoDepth", 200, function(e, t) {
e.doc.history.undoDepth = t;
}), Un("historyEventDelay", 1250), Un("viewportMargin", 10, function(e) {
e.refresh();
}, !0), Un("maxHighlightLength", 1e4, r, !0), Un("moveInputWithCursor", !0, function(e, t) {
t || e.display.input.resetPosition();
}), Un("tabindex", null, function(e, t) {
e.display.input.getField().tabIndex = t || "";
}), Un("autofocus", null);
var nl = e.modes = {}, rl = e.mimeModes = {};
e.defineMode = function(t, n) {
e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2 && (n.dependencies = Array.prototype.slice.call(arguments, 2)), 
nl[t] = n;
}, e.defineMIME = function(e, t) {
rl[e] = t;
}, e.resolveMode = function(t) {
if ("string" == typeof t && rl.hasOwnProperty(t)) t = rl[t]; else if (t && "string" == typeof t.name && rl.hasOwnProperty(t.name)) {
var n = rl[t.name];
"string" == typeof n && (n = {
name: n
}), t = zi(n, t), t.name = n.name;
} else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
return "string" == typeof t ? {
name: t
} : t || {
name: "null"
};
}, e.getMode = function(t, n) {
var n = e.resolveMode(n), r = nl[n.name];
if (!r) return e.getMode(t, "text/plain");
var i = r(t, n);
if (il.hasOwnProperty(n.name)) {
var o = il[n.name];
for (var l in o) o.hasOwnProperty(l) && (i.hasOwnProperty(l) && (i["_" + l] = i[l]), 
i[l] = o[l]);
}
if (i.name = n.name, n.helperType && (i.helperType = n.helperType), n.modeProps) for (var l in n.modeProps) i[l] = n.modeProps[l];
return i;
}, e.defineMode("null", function() {
return {
token: function(e) {
e.skipToEnd();
}
};
}), e.defineMIME("text/plain", "null");
var il = e.modeExtensions = {};
e.extendMode = function(e, t) {
var n = il.hasOwnProperty(e) ? il[e] : il[e] = {};
Ei(t, n);
}, e.defineExtension = function(t, n) {
e.prototype[t] = n;
}, e.defineDocExtension = function(e, t) {
kl.prototype[e] = t;
}, e.defineOption = Un;
var ol = [];
e.defineInitHook = function(e) {
ol.push(e);
};
var ll = e.helpers = {};
e.registerHelper = function(t, n, r) {
ll.hasOwnProperty(t) || (ll[t] = e[t] = {
_global: []
}), ll[t][n] = r;
}, e.registerGlobalHelper = function(t, n, r, i) {
e.registerHelper(t, n, i), ll[t]._global.push({
pred: r,
val: i
});
};
var al = e.copyState = function(e, t) {
if (t === !0) return t;
if (e.copyState) return e.copyState(t);
var n = {};
for (var r in t) {
var i = t[r];
i instanceof Array && (i = i.concat([])), n[r] = i;
}
return n;
}, sl = e.startState = function(e, t, n) {
return e.startState ? e.startState(t, n) : !0;
};
e.innerMode = function(e, t) {
for (;e.innerMode; ) {
var n = e.innerMode(t);
if (!n || n.mode == e) break;
t = n.state, e = n.mode;
}
return n || {
mode: e,
state: t
};
};
var cl = e.commands = {
selectAll: function(e) {
e.setSelection(Eo(e.firstLine(), 0), Eo(e.lastLine()), zl);
},
singleSelection: function(e) {
e.setSelection(e.getCursor("anchor"), e.getCursor("head"), zl);
},
killLine: function(e) {
_n(e, function(t) {
if (t.empty()) {
var n = Zr(e.doc, t.head.line).text.length;
return t.head.ch == n && t.head.line < e.lastLine() ? {
from: t.head,
to: Eo(t.head.line + 1, 0)
} : {
from: t.head,
to: Eo(t.head.line, n)
};
}
return {
from: t.from(),
to: t.to()
};
});
},
deleteLine: function(e) {
_n(e, function(t) {
return {
from: Eo(t.from().line, 0),
to: me(e.doc, Eo(t.to().line + 1, 0))
};
});
},
delLineLeft: function(e) {
_n(e, function(e) {
return {
from: Eo(e.from().line, 0),
to: e.from()
};
});
},
delWrappedLineLeft: function(e) {
_n(e, function(t) {
var n = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({
left: 0,
top: n
}, "div");
return {
from: r,
to: t.from()
};
});
},
delWrappedLineRight: function(e) {
_n(e, function(t) {
var n = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({
left: e.display.lineDiv.offsetWidth + 100,
top: n
}, "div");
return {
from: t.from(),
to: r
};
});
},
undo: function(e) {
e.undo();
},
redo: function(e) {
e.redo();
},
undoSelection: function(e) {
e.undoSelection();
},
redoSelection: function(e) {
e.redoSelection();
},
goDocStart: function(e) {
e.extendSelection(Eo(e.firstLine(), 0));
},
goDocEnd: function(e) {
e.extendSelection(Eo(e.lastLine()));
},
goLineStart: function(e) {
e.extendSelectionsBy(function(t) {
return oo(e, t.head.line);
}, {
origin: "+move",
bias: 1
});
},
goLineStartSmart: function(e) {
e.extendSelectionsBy(function(t) {
return ao(e, t.head);
}, {
origin: "+move",
bias: 1
});
},
goLineEnd: function(e) {
e.extendSelectionsBy(function(t) {
return lo(e, t.head.line);
}, {
origin: "+move",
bias: -1
});
},
goLineRight: function(e) {
e.extendSelectionsBy(function(t) {
var n = e.charCoords(t.head, "div").top + 5;
return e.coordsChar({
left: e.display.lineDiv.offsetWidth + 100,
top: n
}, "div");
}, Il);
},
goLineLeft: function(e) {
e.extendSelectionsBy(function(t) {
var n = e.charCoords(t.head, "div").top + 5;
return e.coordsChar({
left: 0,
top: n
}, "div");
}, Il);
},
goLineLeftSmart: function(e) {
e.extendSelectionsBy(function(t) {
var n = e.charCoords(t.head, "div").top + 5, r = e.coordsChar({
left: 0,
top: n
}, "div");
return r.ch < e.getLine(r.line).search(/\S/) ? ao(e, t.head) : r;
}, Il);
},
goLineUp: function(e) {
e.moveV(-1, "line");
},
goLineDown: function(e) {
e.moveV(1, "line");
},
goPageUp: function(e) {
e.moveV(-1, "page");
},
goPageDown: function(e) {
e.moveV(1, "page");
},
goCharLeft: function(e) {
e.moveH(-1, "char");
},
goCharRight: function(e) {
e.moveH(1, "char");
},
goColumnLeft: function(e) {
e.moveH(-1, "column");
},
goColumnRight: function(e) {
e.moveH(1, "column");
},
goWordLeft: function(e) {
e.moveH(-1, "word");
},
goGroupRight: function(e) {
e.moveH(1, "group");
},
goGroupLeft: function(e) {
e.moveH(-1, "group");
},
goWordRight: function(e) {
e.moveH(1, "word");
},
delCharBefore: function(e) {
e.deleteH(-1, "char");
},
delCharAfter: function(e) {
e.deleteH(1, "char");
},
delWordBefore: function(e) {
e.deleteH(-1, "word");
},
delWordAfter: function(e) {
e.deleteH(1, "word");
},
delGroupBefore: function(e) {
e.deleteH(-1, "group");
},
delGroupAfter: function(e) {
e.deleteH(1, "group");
},
indentAuto: function(e) {
e.indentSelection("smart");
},
indentMore: function(e) {
e.indentSelection("add");
},
indentLess: function(e) {
e.indentSelection("subtract");
},
insertTab: function(e) {
e.replaceSelection("	");
},
insertSoftTab: function(e) {
for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
var o = n[i].from(), l = jl(e.getLine(o.line), o.ch, r);
t.push(Array(r - l % r + 1).join(" "));
}
e.replaceSelections(t);
},
defaultTab: function(e) {
e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
},
transposeChars: function(e) {
Ot(e, function() {
for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
var i = t[r].head, o = Zr(e.doc, i.line).text;
if (o) if (i.ch == o.length && (i = new Eo(i.line, i.ch - 1)), i.ch > 0) i = new Eo(i.line, i.ch + 1), 
e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), Eo(i.line, i.ch - 2), i, "+transpose"); else if (i.line > e.doc.first) {
var l = Zr(e.doc, i.line - 1).text;
l && e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1), Eo(i.line - 1, l.length - 1), Eo(i.line, 1), "+transpose");
}
n.push(new fe(i, i));
}
e.setSelections(n);
});
},
newlineAndIndent: function(e) {
Ot(e, function() {
for (var t = e.listSelections().length, n = 0; t > n; n++) {
var r = e.listSelections()[n];
e.replaceRange(e.doc.lineSeparator(), r.anchor, r.head, "+input"), e.indentLine(r.from().line + 1, null, !0);
}
In(e);
});
},
toggleOverwrite: function(e) {
e.toggleOverwrite();
}
}, ul = e.keyMap = {};
ul.basic = {
Left: "goCharLeft",
Right: "goCharRight",
Up: "goLineUp",
Down: "goLineDown",
End: "goLineEnd",
Home: "goLineStartSmart",
PageUp: "goPageUp",
PageDown: "goPageDown",
Delete: "delCharAfter",
Backspace: "delCharBefore",
"Shift-Backspace": "delCharBefore",
Tab: "defaultTab",
"Shift-Tab": "indentAuto",
Enter: "newlineAndIndent",
Insert: "toggleOverwrite",
Esc: "singleSelection"
}, ul.pcDefault = {
"Ctrl-A": "selectAll",
"Ctrl-D": "deleteLine",
"Ctrl-Z": "undo",
"Shift-Ctrl-Z": "redo",
"Ctrl-Y": "redo",
"Ctrl-Home": "goDocStart",
"Ctrl-End": "goDocEnd",
"Ctrl-Up": "goLineUp",
"Ctrl-Down": "goLineDown",
"Ctrl-Left": "goGroupLeft",
"Ctrl-Right": "goGroupRight",
"Alt-Left": "goLineStart",
"Alt-Right": "goLineEnd",
"Ctrl-Backspace": "delGroupBefore",
"Ctrl-Delete": "delGroupAfter",
"Ctrl-S": "save",
"Ctrl-F": "find",
"Ctrl-G": "findNext",
"Shift-Ctrl-G": "findPrev",
"Shift-Ctrl-F": "replace",
"Shift-Ctrl-R": "replaceAll",
"Ctrl-[": "indentLess",
"Ctrl-]": "indentMore",
"Ctrl-U": "undoSelection",
"Shift-Ctrl-U": "redoSelection",
"Alt-U": "redoSelection",
fallthrough: "basic"
}, ul.emacsy = {
"Ctrl-F": "goCharRight",
"Ctrl-B": "goCharLeft",
"Ctrl-P": "goLineUp",
"Ctrl-N": "goLineDown",
"Alt-F": "goWordRight",
"Alt-B": "goWordLeft",
"Ctrl-A": "goLineStart",
"Ctrl-E": "goLineEnd",
"Ctrl-V": "goPageDown",
"Shift-Ctrl-V": "goPageUp",
"Ctrl-D": "delCharAfter",
"Ctrl-H": "delCharBefore",
"Alt-D": "delWordAfter",
"Alt-Backspace": "delWordBefore",
"Ctrl-K": "killLine",
"Ctrl-T": "transposeChars"
}, ul.macDefault = {
"Cmd-A": "selectAll",
"Cmd-D": "deleteLine",
"Cmd-Z": "undo",
"Shift-Cmd-Z": "redo",
"Cmd-Y": "redo",
"Cmd-Home": "goDocStart",
"Cmd-Up": "goDocStart",
"Cmd-End": "goDocEnd",
"Cmd-Down": "goDocEnd",
"Alt-Left": "goGroupLeft",
"Alt-Right": "goGroupRight",
"Cmd-Left": "goLineLeft",
"Cmd-Right": "goLineRight",
"Alt-Backspace": "delGroupBefore",
"Ctrl-Alt-Backspace": "delGroupAfter",
"Alt-Delete": "delGroupAfter",
"Cmd-S": "save",
"Cmd-F": "find",
"Cmd-G": "findNext",
"Shift-Cmd-G": "findPrev",
"Cmd-Alt-F": "replace",
"Shift-Cmd-Alt-F": "replaceAll",
"Cmd-[": "indentLess",
"Cmd-]": "indentMore",
"Cmd-Backspace": "delWrappedLineLeft",
"Cmd-Delete": "delWrappedLineRight",
"Cmd-U": "undoSelection",
"Shift-Cmd-U": "redoSelection",
"Ctrl-Up": "goDocStart",
"Ctrl-Down": "goDocEnd",
fallthrough: [ "basic", "emacsy" ]
}, ul.default = No ? ul.macDefault : ul.pcDefault, e.normalizeKeyMap = function(e) {
var t = {};
for (var n in e) if (e.hasOwnProperty(n)) {
var r = e[n];
if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
if ("..." == r) {
delete e[n];
continue;
}
for (var i = Hi(n.split(" "), Vn), o = 0; o < i.length; o++) {
var l, a;
o == i.length - 1 ? (a = i.join(" "), l = r) : (a = i.slice(0, o + 1).join(" "), 
l = "...");
var s = t[a];
if (s) {
if (s != l) throw Error("Inconsistent bindings for " + a);
} else t[a] = l;
}
delete e[n];
}
for (var c in t) e[c] = t[c];
return e;
};
var fl = e.lookupKey = function(e, t, n, r) {
t = Kn(t);
var i = t.call ? t.call(e, r) : t[e];
if (i === !1) return "nothing";
if ("..." === i) return "multi";
if (null != i && n(i)) return "handled";
if (t.fallthrough) {
if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return fl(e, t.fallthrough, n, r);
for (var o = 0; o < t.fallthrough.length; o++) {
var l = fl(e, t.fallthrough[o], n, r);
if (l) return l;
}
}
}, hl = e.isModifierKey = function(e) {
var t = "string" == typeof e ? e : ia[e.keyCode];
return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
}, dl = e.keyName = function(e, t) {
if (So && 34 == e.keyCode && e.char) return !1;
var n = ia[e.keyCode], r = n;
return null == r || e.altGraphKey ? !1 : (e.altKey && "Alt" != n && (r = "Alt-" + r), 
(Do ? e.metaKey : e.ctrlKey) && "Ctrl" != n && (r = "Ctrl-" + r), (Do ? e.ctrlKey : e.metaKey) && "Cmd" != n && (r = "Cmd-" + r), 
!t && e.shiftKey && "Shift" != n && (r = "Shift-" + r), r);
};
e.fromTextArea = function(t, n) {
function r() {
t.value = c.getValue();
}
if (n = n ? Ei(n) : {}, n.value = t.value, !n.tabindex && t.tabIndex && (n.tabindex = t.tabIndex), 
!n.placeholder && t.placeholder && (n.placeholder = t.placeholder), null == n.autofocus) {
var i = Ui();
n.autofocus = i == t || null != t.getAttribute("autofocus") && i == document.body;
}
if (t.form && (Ol(t.form, "submit", r), !n.leaveSubmitMethodAlone)) {
var o = t.form, l = o.submit;
try {
var a = o.submit = function() {
r(), o.submit = l, o.submit(), o.submit = a;
};
} catch (s) {}
}
n.finishInit = function(e) {
e.save = r, e.getTextArea = function() {
return t;
}, e.toTextArea = function() {
e.toTextArea = isNaN, r(), t.parentNode.removeChild(e.getWrapperElement()), t.style.display = "", 
t.form && (Fl(t.form, "submit", r), "function" == typeof t.form.submit && (t.form.submit = l));
};
}, t.style.display = "none";
var c = e(function(e) {
t.parentNode.insertBefore(e, t.nextSibling);
}, n);
return c;
};
var pl = e.StringStream = function(e, t) {
this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, 
this.lineStart = 0;
};
pl.prototype = {
eol: function() {
return this.pos >= this.string.length;
},
sol: function() {
return this.pos == this.lineStart;
},
peek: function() {
return this.string.charAt(this.pos) || void 0;
},
next: function() {
return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0;
},
eat: function(e) {
var t = this.string.charAt(this.pos);
if ("string" == typeof e) var n = t == e; else var n = t && (e.test ? e.test(t) : e(t));
return n ? (++this.pos, t) : void 0;
},
eatWhile: function(e) {
for (var t = this.pos; this.eat(e); ) ;
return this.pos > t;
},
eatSpace: function() {
for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++this.pos;
return this.pos > e;
},
skipToEnd: function() {
this.pos = this.string.length;
},
skipTo: function(e) {
var t = this.string.indexOf(e, this.pos);
return t > -1 ? (this.pos = t, !0) : void 0;
},
backUp: function(e) {
this.pos -= e;
},
column: function() {
return this.lastColumnPos < this.start && (this.lastColumnValue = jl(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), 
this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? jl(this.string, this.lineStart, this.tabSize) : 0);
},
indentation: function() {
return jl(this.string, null, this.tabSize) - (this.lineStart ? jl(this.string, this.lineStart, this.tabSize) : 0);
},
match: function(e, t, n) {
if ("string" != typeof e) {
var r = this.string.slice(this.pos).match(e);
return r && r.index > 0 ? null : (r && t !== !1 && (this.pos += r[0].length), r);
}
var i = function(e) {
return n ? e.toLowerCase() : e;
}, o = this.string.substr(this.pos, e.length);
return i(o) == i(e) ? (t !== !1 && (this.pos += e.length), !0) : void 0;
},
current: function() {
return this.string.slice(this.start, this.pos);
},
hideFirstChars: function(e, t) {
this.lineStart += e;
try {
return t();
} finally {
this.lineStart -= e;
}
}
};
var ml = 0, gl = e.TextMarker = function(e, t) {
this.lines = [], this.type = t, this.doc = e, this.id = ++ml;
};
Oi(gl), gl.prototype.clear = function() {
if (!this.explicitlyCleared) {
var e = this.doc.cm, t = e && !e.curOp;
if (t && bt(e), Ai(this, "clear")) {
var n = this.find();
n && Si(this, "clear", n.from, n.to);
}
for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
var l = this.lines[o], a = er(l.markedSpans, this);
e && !this.collapsed ? zt(e, ti(l), "text") : e && (null != a.to && (i = ti(l)), 
null != a.from && (r = ti(l))), l.markedSpans = tr(l.markedSpans, a), null == a.from && this.collapsed && !Cr(this.doc, l) && e && ei(l, xt(e.display));
}
if (e && this.collapsed && !e.options.lineWrapping) for (var o = 0; o < this.lines.length; ++o) {
var s = xr(this.lines[o]), c = f(s);
c > e.display.maxLineLength && (e.display.maxLine = s, e.display.maxLineLength = c, 
e.display.maxLineChanged = !0);
}
null != r && e && this.collapsed && Pt(e, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, 
this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Oe(e.doc)), e && Si(e, "markerCleared", e, this), 
t && Ct(e), this.parent && this.parent.clear();
}
}, gl.prototype.find = function(e, t) {
null == e && "bookmark" == this.type && (e = 1);
for (var n, r, i = 0; i < this.lines.length; ++i) {
var o = this.lines[i], l = er(o.markedSpans, this);
if (null != l.from && (n = Eo(t ? o : ti(o), l.from), -1 == e)) return n;
if (null != l.to && (r = Eo(t ? o : ti(o), l.to), 1 == e)) return r;
}
return n && {
from: n,
to: r
};
}, gl.prototype.changed = function() {
var e = this.find(-1, !0), t = this, n = this.doc.cm;
e && n && Ot(n, function() {
var r = e.line, i = ti(e.line), o = Qe(n, i);
if (o && (ot(o), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, 
!Cr(t.doc, r) && null != t.height) {
var l = t.height;
t.height = null;
var a = Lr(t) - l;
a && ei(r, r.height + a);
}
});
}, gl.prototype.attachLine = function(e) {
if (!this.lines.length && this.doc.cm) {
var t = this.doc.cm.curOp;
t.maybeHiddenMarkers && -1 != Di(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
}
this.lines.push(e);
}, gl.prototype.detachLine = function(e) {
if (this.lines.splice(Di(this.lines, e), 1), !this.lines.length && this.doc.cm) {
var t = this.doc.cm.curOp;
(t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
}
};
var ml = 0, vl = e.SharedTextMarker = function(e, t) {
this.markers = e, this.primary = t;
for (var n = 0; n < e.length; ++n) e[n].parent = this;
};
Oi(vl), vl.prototype.clear = function() {
if (!this.explicitlyCleared) {
this.explicitlyCleared = !0;
for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
Si(this, "clear");
}
}, vl.prototype.find = function(e, t) {
return this.primary.find(e, t);
};
var xl = e.LineWidget = function(e, t, n) {
if (n) for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
this.doc = e, this.node = t;
};
Oi(xl), xl.prototype.clear = function() {
var e = this.doc.cm, t = this.line.widgets, n = this.line, r = ti(n);
if (null != r && t) {
for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
t.length || (n.widgets = null);
var o = Lr(this);
ei(n, Math.max(0, n.height - o)), e && Ot(e, function() {
Sr(e, n, -o), zt(e, r, "widget");
});
}
}, xl.prototype.changed = function() {
var e = this.height, t = this.doc.cm, n = this.line;
this.height = null;
var r = Lr(this) - e;
r && (ei(n, n.height + r), t && Ot(t, function() {
t.curOp.forceUpdate = !0, Sr(t, n, r);
}));
};
var yl = e.Line = function(e, t, n) {
this.text = e, ur(this, t), this.height = n ? n(this) : 1;
};
Oi(yl), yl.prototype.lineNo = function() {
return ti(this);
};
var bl = {}, wl = {};
Kr.prototype = {
chunkSize: function() {
return this.lines.length;
},
removeInner: function(e, t) {
for (var n = e, r = e + t; r > n; ++n) {
var i = this.lines[n];
this.height -= i.height, Ar(i), Si(i, "delete");
}
this.lines.splice(e, t);
},
collapse: function(e) {
e.push.apply(e, this.lines);
},
insertInner: function(e, t, n) {
this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
for (var r = 0; r < t.length; ++r) t[r].parent = this;
},
iterN: function(e, t, n) {
for (var r = e + t; r > e; ++e) if (n(this.lines[e])) return !0;
}
}, $r.prototype = {
chunkSize: function() {
return this.size;
},
removeInner: function(e, t) {
this.size -= t;
for (var n = 0; n < this.children.length; ++n) {
var r = this.children[n], i = r.chunkSize();
if (i > e) {
var o = Math.min(t, i - e), l = r.height;
if (r.removeInner(e, o), this.height -= l - r.height, i == o && (this.children.splice(n--, 1), 
r.parent = null), 0 == (t -= o)) break;
e = 0;
} else e -= i;
}
if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Kr))) {
var a = [];
this.collapse(a), this.children = [ new Kr(a) ], this.children[0].parent = this;
}
},
collapse: function(e) {
for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e);
},
insertInner: function(e, t, n) {
this.size += t.length, this.height += n;
for (var r = 0; r < this.children.length; ++r) {
var i = this.children[r], o = i.chunkSize();
if (o >= e) {
if (i.insertInner(e, t, n), i.lines && i.lines.length > 50) {
for (;i.lines.length > 50; ) {
var l = i.lines.splice(i.lines.length - 25, 25), a = new Kr(l);
i.height -= a.height, this.children.splice(r + 1, 0, a), a.parent = this;
}
this.maybeSpill();
}
break;
}
e -= o;
}
},
maybeSpill: function() {
if (!(this.children.length <= 10)) {
var e = this;
do {
var t = e.children.splice(e.children.length - 5, 5), n = new $r(t);
if (e.parent) {
e.size -= n.size, e.height -= n.height;
var r = Di(e.parent.children, e);
e.parent.children.splice(r + 1, 0, n);
} else {
var i = new $r(e.children);
i.parent = e, e.children = [ i, n ], e = i;
}
n.parent = e.parent;
} while (e.children.length > 10);
e.parent.maybeSpill();
}
},
iterN: function(e, t, n) {
for (var r = 0; r < this.children.length; ++r) {
var i = this.children[r], o = i.chunkSize();
if (o > e) {
var l = Math.min(t, o - e);
if (i.iterN(e, l, n)) return !0;
if (0 == (t -= l)) break;
e = 0;
} else e -= o;
}
}
};
var Cl = 0, kl = e.Doc = function(e, t, n, r) {
if (!(this instanceof kl)) return new kl(e, t, n, r);
null == n && (n = 0), $r.call(this, [ new Kr([ new yl("", null) ]) ]), this.first = n, 
this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, 
this.frontier = n;
var i = Eo(n, 0);
this.sel = de(i), this.history = new oi(null), this.id = ++Cl, this.modeOption = t, 
this.lineSep = r, this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), 
Vr(this, {
from: i,
to: i,
text: e
}), Te(this, de(i), zl);
};
kl.prototype = zi($r.prototype, {
constructor: kl,
iter: function(e, t, n) {
n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e);
},
insert: function(e, t) {
for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
this.insertInner(e - this.first, t, n);
},
remove: function(e, t) {
this.removeInner(e - this.first, t);
},
getValue: function(e) {
var t = Qr(this, this.first, this.first + this.size);
return e === !1 ? t : t.join(e || this.lineSeparator());
},
setValue: Wt(function(e) {
var t = Eo(this.first, 0), n = this.first + this.size - 1;
Tn(this, {
from: t,
to: Eo(n, Zr(this, n).text.length),
text: this.splitLines(e),
origin: "setValue",
full: !0
}, !0), Te(this, de(t));
}),
replaceRange: function(e, t, n, r) {
t = me(this, t), n = n ? me(this, n) : t, Wn(this, e, t, n, r);
},
getRange: function(e, t, n) {
var r = Jr(this, me(this, e), me(this, t));
return n === !1 ? r : r.join(n || this.lineSeparator());
},
getLine: function(e) {
var t = this.getLineHandle(e);
return t && t.text;
},
getLineHandle: function(e) {
return ve(this, e) ? Zr(this, e) : void 0;
},
getLineNumber: function(e) {
return ti(e);
},
getLineHandleVisualStart: function(e) {
return "number" == typeof e && (e = Zr(this, e)), xr(e);
},
lineCount: function() {
return this.size;
},
firstLine: function() {
return this.first;
},
lastLine: function() {
return this.first + this.size - 1;
},
clipPos: function(e) {
return me(this, e);
},
getCursor: function(e) {
var t, n = this.sel.primary();
return t = null == e || "head" == e ? n.head : "anchor" == e ? n.anchor : "end" == e || "to" == e || e === !1 ? n.to() : n.from();
},
listSelections: function() {
return this.sel.ranges;
},
somethingSelected: function() {
return this.sel.somethingSelected();
},
setCursor: Wt(function(e, t, n) {
ke(this, me(this, "number" == typeof e ? Eo(e, t || 0) : e), null, n);
}),
setSelection: Wt(function(e, t, n) {
ke(this, me(this, e), me(this, t || e), n);
}),
extendSelection: Wt(function(e, t, n) {
be(this, me(this, e), t && me(this, t), n);
}),
extendSelections: Wt(function(e, t) {
we(this, xe(this, e), t);
}),
extendSelectionsBy: Wt(function(e, t) {
var n = Hi(this.sel.ranges, e);
we(this, xe(this, n), t);
}),
setSelections: Wt(function(e, t, n) {
if (e.length) {
for (var r = 0, i = []; r < e.length; r++) i[r] = new fe(me(this, e[r].anchor), me(this, e[r].head));
null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Te(this, he(i, t), n);
}
}),
addSelection: Wt(function(e, t, n) {
var r = this.sel.ranges.slice(0);
r.push(new fe(me(this, e), me(this, t || e))), Te(this, he(r, r.length - 1), n);
}),
getSelection: function(e) {
for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
var i = Jr(this, n[r].from(), n[r].to());
t = t ? t.concat(i) : i;
}
return e === !1 ? t : t.join(e || this.lineSeparator());
},
getSelections: function(e) {
for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
var i = Jr(this, n[r].from(), n[r].to());
e !== !1 && (i = i.join(e || this.lineSeparator())), t[r] = i;
}
return t;
},
replaceSelection: function(e, t, n) {
for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
this.replaceSelections(r, t, n || "+input");
},
replaceSelections: Wt(function(e, t, n) {
for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
var l = i.ranges[o];
r[o] = {
from: l.from(),
to: l.to(),
text: this.splitLines(e[o]),
origin: n
};
}
for (var a = t && "end" != t && Sn(this, r, t), o = r.length - 1; o >= 0; o--) Tn(this, r[o]);
a ? Le(this, a) : this.cm && In(this.cm);
}),
undo: Wt(function() {
An(this, "undo");
}),
redo: Wt(function() {
An(this, "redo");
}),
undoSelection: Wt(function() {
An(this, "undo", !0);
}),
redoSelection: Wt(function() {
An(this, "redo", !0);
}),
setExtending: function(e) {
this.extend = e;
},
getExtending: function() {
return this.extend;
},
historySize: function() {
for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t;
for (var r = 0; r < e.undone.length; r++) e.undone[r].ranges || ++n;
return {
undo: t,
redo: n
};
},
clearHistory: function() {
this.history = new oi(this.history.maxGeneration);
},
markClean: function() {
this.cleanGeneration = this.changeGeneration(!0);
},
changeGeneration: function(e) {
return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), 
this.history.generation;
},
isClean: function(e) {
return this.history.generation == (e || this.cleanGeneration);
},
getHistory: function() {
return {
done: gi(this.history.done),
undone: gi(this.history.undone)
};
},
setHistory: function(e) {
var t = this.history = new oi(this.history.maxGeneration);
t.done = gi(e.done.slice(0), null, !0), t.undone = gi(e.undone.slice(0), null, !0);
},
addLineClass: Wt(function(e, t, n) {
return Bn(this, e, "gutter" == t ? "gutter" : "class", function(e) {
var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
if (e[r]) {
if (Vi(n).test(e[r])) return !1;
e[r] += " " + n;
} else e[r] = n;
return !0;
});
}),
removeLineClass: Wt(function(e, t, n) {
return Bn(this, e, "gutter" == t ? "gutter" : "class", function(e) {
var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass", i = e[r];
if (!i) return !1;
if (null == n) e[r] = null; else {
var o = i.match(Vi(n));
if (!o) return !1;
var l = o.index + o[0].length;
e[r] = i.slice(0, o.index) + (o.index && l != i.length ? " " : "") + i.slice(l) || null;
}
return !0;
});
}),
addLineWidget: Wt(function(e, t, n) {
return Tr(this, e, t, n);
}),
removeLineWidget: function(e) {
e.clear();
},
markText: function(e, t, n) {
return $n(this, me(this, e), me(this, t), n, n && n.type || "range");
},
setBookmark: function(e, t) {
var n = {
replacedWith: t && (null == t.nodeType ? t.widget : t),
insertLeft: t && t.insertLeft,
clearWhenEmpty: !1,
shared: t && t.shared,
handleMouseEvents: t && t.handleMouseEvents
};
return e = me(this, e), $n(this, e, e, n, "bookmark");
},
findMarksAt: function(e) {
e = me(this, e);
var t = [], n = Zr(this, e.line).markedSpans;
if (n) for (var r = 0; r < n.length; ++r) {
var i = n[r];
(null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
}
return t;
},
findMarks: function(e, t, n) {
e = me(this, e), t = me(this, t);
var r = [], i = e.line;
return this.iter(e.line, t.line + 1, function(o) {
var l = o.markedSpans;
if (l) for (var a = 0; a < l.length; a++) {
var s = l[a];
i == e.line && e.ch > s.to || null == s.from && i != e.line || i == t.line && s.from > t.ch || n && !n(s.marker) || r.push(s.marker.parent || s.marker);
}
++i;
}), r;
},
getAllMarks: function() {
var e = [];
return this.iter(function(t) {
var n = t.markedSpans;
if (n) for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker);
}), e;
},
posFromIndex: function(e) {
var t, n = this.first;
return this.iter(function(r) {
var i = r.text.length + 1;
return i > e ? (t = e, !0) : (e -= i, void ++n);
}), me(this, Eo(n, t));
},
indexFromPos: function(e) {
e = me(this, e);
var t = e.ch;
return e.line < this.first || e.ch < 0 ? 0 : (this.iter(this.first, e.line, function(e) {
t += e.text.length + 1;
}), t);
},
copy: function(e) {
var t = new kl(Qr(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);
return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, 
t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), 
t;
},
linkedDoc: function(e) {
e || (e = {});
var t = this.first, n = this.first + this.size;
null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
var r = new kl(Qr(this, t, n), e.mode || this.modeOption, t, this.lineSep);
return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
doc: r,
sharedHist: e.sharedHist
}), r.linked = [ {
doc: this,
isParent: !0,
sharedHist: e.sharedHist
} ], Zn(r, Yn(this)), r;
},
unlinkDoc: function(t) {
if (t instanceof e && (t = t.doc), this.linked) for (var n = 0; n < this.linked.length; ++n) {
var r = this.linked[n];
if (r.doc == t) {
this.linked.splice(n, 1), t.unlinkDoc(this), Jn(Yn(this));
break;
}
}
if (t.history == this.history) {
var i = [ t.id ];
Xr(t, function(e) {
i.push(e.id);
}, !0), t.history = new oi(null), t.history.done = gi(this.history.done, i), t.history.undone = gi(this.history.undone, i);
}
},
iterLinkedDocs: function(e) {
Xr(this, e);
},
getMode: function() {
return this.mode;
},
getEditor: function() {
return this.cm;
},
splitLines: function(e) {
return this.lineSep ? e.split(this.lineSep) : ea(e);
},
lineSeparator: function() {
return this.lineSep || "\n";
}
}), kl.prototype.eachLine = kl.prototype.iter;
var Sl = "iter insert remove copy getEditor constructor".split(" ");
for (var Ll in kl.prototype) kl.prototype.hasOwnProperty(Ll) && Di(Sl, Ll) < 0 && (e.prototype[Ll] = function(e) {
return function() {
return e.apply(this.doc, arguments);
};
}(kl.prototype[Ll]));
Oi(kl);
var Tl = e.e_preventDefault = function(e) {
e.preventDefault ? e.preventDefault() : e.returnValue = !1;
}, Ml = e.e_stopPropagation = function(e) {
e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
}, Al = e.e_stop = function(e) {
Tl(e), Ml(e);
}, Ol = e.on = function(e, t, n) {
if (e.addEventListener) e.addEventListener(t, n, !1); else if (e.attachEvent) e.attachEvent("on" + t, n); else {
var r = e._handlers || (e._handlers = {}), i = r[t] || (r[t] = []);
i.push(n);
}
}, Nl = [], Fl = e.off = function(e, t, n) {
if (e.removeEventListener) e.removeEventListener(t, n, !1); else if (e.detachEvent) e.detachEvent("on" + t, n); else for (var r = ki(e, t, !1), i = 0; i < r.length; ++i) if (r[i] == n) {
r.splice(i, 1);
break;
}
}, Wl = e.signal = function(e, t) {
var n = ki(e, t, !0);
if (n.length) for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r);
}, Dl = null, Hl = 30, Pl = e.Pass = {
toString: function() {
return "CodeMirror.Pass";
}
}, zl = {
scroll: !1
}, El = {
origin: "*mouse"
}, Il = {
origin: "+move"
};
Ni.prototype.set = function(e, t) {
clearTimeout(this.id), this.id = setTimeout(t, e);
};
var jl = e.countColumn = function(e, t, n, r, i) {
null == t && (t = e.search(/[^\s\u00a0]/), -1 == t && (t = e.length));
for (var o = r || 0, l = i || 0; ;) {
var a = e.indexOf("	", o);
if (0 > a || a >= t) return l + (t - o);
l += a - o, l += n - l % n, o = a + 1;
}
}, Rl = e.findColumn = function(e, t, n) {
for (var r = 0, i = 0; ;) {
var o = e.indexOf("	", r);
-1 == o && (o = e.length);
var l = o - r;
if (o == e.length || i + l >= t) return r + Math.min(l, t - i);
if (i += o - r, i += n - i % n, r = o + 1, i >= t) return r;
}
}, Bl = [ "" ], _l = function(e) {
e.select();
};
Ao ? _l = function(e) {
e.selectionStart = 0, e.selectionEnd = e.value.length;
} : yo && (_l = function(e) {
try {
e.select();
} catch (t) {}
});
var ql, Gl = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, Ul = e.isWordChar = function(e) {
return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Gl.test(e));
}, Vl = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
ql = document.createRange ? function(e, t, n, r) {
var i = document.createRange();
return i.setEnd(r || e, n), i.setStart(e, t), i;
} : function(e, t, n) {
var r = document.body.createTextRange();
try {
r.moveToElementText(e.parentNode);
} catch (i) {
return r;
}
return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r;
};
var Kl = e.contains = function(e, t) {
if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
do if (11 == t.nodeType && (t = t.host), t == e) return !0; while (t = t.parentNode);
};
yo && 11 > bo && (Ui = function() {
try {
return document.activeElement;
} catch (e) {
return document.body;
}
});
var $l, Xl, Yl = e.rmClass = function(e, t) {
var n = e.className, r = Vi(t).exec(n);
if (r) {
var i = n.slice(r.index + r[0].length);
e.className = n.slice(0, r.index) + (i ? r[1] + i : "");
}
}, Zl = e.addClass = function(e, t) {
var n = e.className;
Vi(t).test(n) || (e.className += (n ? " " : "") + t);
}, Jl = !1, Ql = function() {
if (yo && 9 > bo) return !1;
var e = _i("div");
return "draggable" in e || "dragDrop" in e;
}(), ea = e.splitLines = 3 != "\n\nb".split(/\n/).length ? function(e) {
for (var t = 0, n = [], r = e.length; r >= t; ) {
var i = e.indexOf("\n", t);
-1 == i && (i = e.length);
var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i), l = o.indexOf("\r");
-1 != l ? (n.push(o.slice(0, l)), t += l + 1) : (n.push(o), t = i + 1);
}
return n;
} : function(e) {
return e.split(/\r\n?|\n/);
}, ta = window.getSelection ? function(e) {
try {
return e.selectionStart != e.selectionEnd;
} catch (t) {
return !1;
}
} : function(e) {
try {
var t = e.ownerDocument.selection.createRange();
} catch (n) {}
return t && t.parentElement() == e ? 0 != t.compareEndPoints("StartToEnd", t) : !1;
}, na = function() {
var e = _i("div");
return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy);
}(), ra = null, ia = e.keyNames = {
3: "Enter",
8: "Backspace",
9: "Tab",
13: "Enter",
16: "Shift",
17: "Ctrl",
18: "Alt",
19: "Pause",
20: "CapsLock",
27: "Esc",
32: "Space",
33: "PageUp",
34: "PageDown",
35: "End",
36: "Home",
37: "Left",
38: "Up",
39: "Right",
40: "Down",
44: "PrintScrn",
45: "Insert",
46: "Delete",
59: ";",
61: "=",
91: "Mod",
92: "Mod",
93: "Mod",
106: "*",
107: "=",
109: "-",
110: ".",
111: "/",
127: "Delete",
173: "-",
186: ";",
187: "=",
188: ",",
189: "-",
190: ".",
191: "/",
192: "`",
219: "[",
220: "\\",
221: "]",
222: "'",
63232: "Up",
63233: "Down",
63234: "Left",
63235: "Right",
63272: "Delete",
63273: "Home",
63275: "End",
63276: "PageUp",
63277: "PageDown",
63302: "Insert"
};
!function() {
for (var e = 0; 10 > e; e++) ia[e + 48] = ia[e + 96] = e + "";
for (var e = 65; 90 >= e; e++) ia[e] = String.fromCharCode(e);
for (var e = 1; 12 >= e; e++) ia[e + 111] = ia[e + 63235] = "F" + e;
}();
var oa, la = function() {
function e(e) {
return 247 >= e ? n.charAt(e) : e >= 1424 && 1524 >= e ? "R" : e >= 1536 && 1773 >= e ? r.charAt(e - 1536) : e >= 1774 && 2220 >= e ? "r" : e >= 8192 && 8203 >= e ? "w" : 8204 == e ? "b" : "L";
}
function t(e, t, n) {
this.level = e, this.from = t, this.to = n;
}
var n = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", r = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm", i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, o = /[stwN]/, l = /[LRr]/, a = /[Lb1n]/, s = /[1n]/, c = "L";
return function(n) {
if (!i.test(n)) return !1;
for (var r, u = n.length, f = [], h = 0; u > h; ++h) f.push(r = e(n.charCodeAt(h)));
for (var h = 0, d = c; u > h; ++h) {
var r = f[h];
"m" == r ? f[h] = d : d = r;
}
for (var h = 0, p = c; u > h; ++h) {
var r = f[h];
"1" == r && "r" == p ? f[h] = "n" : l.test(r) && (p = r, "r" == r && (f[h] = "R"));
}
for (var h = 1, d = f[0]; u - 1 > h; ++h) {
var r = f[h];
"+" == r && "1" == d && "1" == f[h + 1] ? f[h] = "1" : "," != r || d != f[h + 1] || "1" != d && "n" != d || (f[h] = d), 
d = r;
}
for (var h = 0; u > h; ++h) {
var r = f[h];
if ("," == r) f[h] = "N"; else if ("%" == r) {
for (var m = h + 1; u > m && "%" == f[m]; ++m) ;
for (var g = h && "!" == f[h - 1] || u > m && "1" == f[m] ? "1" : "N", v = h; m > v; ++v) f[v] = g;
h = m - 1;
}
}
for (var h = 0, p = c; u > h; ++h) {
var r = f[h];
"L" == p && "1" == r ? f[h] = "L" : l.test(r) && (p = r);
}
for (var h = 0; u > h; ++h) if (o.test(f[h])) {
for (var m = h + 1; u > m && o.test(f[m]); ++m) ;
for (var x = "L" == (h ? f[h - 1] : c), y = "L" == (u > m ? f[m] : c), g = x || y ? "L" : "R", v = h; m > v; ++v) f[v] = g;
h = m - 1;
}
for (var b, w = [], h = 0; u > h; ) if (a.test(f[h])) {
var C = h;
for (++h; u > h && a.test(f[h]); ++h) ;
w.push(new t(0, C, h));
} else {
var k = h, S = w.length;
for (++h; u > h && "L" != f[h]; ++h) ;
for (var v = k; h > v; ) if (s.test(f[v])) {
v > k && w.splice(S, 0, new t(1, k, v));
var L = v;
for (++v; h > v && s.test(f[v]); ++v) ;
w.splice(S, 0, new t(2, L, v)), k = v;
} else ++v;
h > k && w.splice(S, 0, new t(1, k, h));
}
return 1 == w[0].level && (b = n.match(/^\s+/)) && (w[0].from = b[0].length, w.unshift(new t(0, 0, b[0].length))), 
1 == Wi(w).level && (b = n.match(/\s+$/)) && (Wi(w).to -= b[0].length, w.push(new t(0, u - b[0].length, u))), 
2 == w[0].level && w.unshift(new t(1, w[0].to, w[0].to)), w[0].level != Wi(w).level && w.push(new t(w[0].level, u, u)), 
w;
};
}();
return e.version = "5.11.0", e;
});
},
361: function(e, t, n) {
!function(e) {
e(n(360), n(362), n(365));
}(function(e) {
"use strict";
var t = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;
e.defineMode("gfm", function(n, r) {
function i(e) {
return e.code = !1, null;
}
var o = 0, l = {
startState: function() {
return {
code: !1,
codeBlock: !1,
ateSpace: !1
};
},
copyState: function(e) {
return {
code: e.code,
codeBlock: e.codeBlock,
ateSpace: e.ateSpace
};
},
token: function(e, n) {
if (n.combineTokens = null, n.codeBlock) return e.match(/^```+/) ? (n.codeBlock = !1, 
null) : (e.skipToEnd(), null);
if (e.sol() && (n.code = !1), e.sol() && e.match(/^```+/)) return e.skipToEnd(), 
n.codeBlock = !0, null;
if ("`" === e.peek()) {
e.next();
var i = e.pos;
e.eatWhile("`");
var l = 1 + e.pos - i;
return n.code ? l === o && (n.code = !1) : (o = l, n.code = !0), null;
}
if (n.code) return e.next(), null;
if (e.eatSpace()) return n.ateSpace = !0, null;
if ((e.sol() || n.ateSpace) && (n.ateSpace = !1, r.gitHubSpice !== !1)) {
if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)) return n.combineTokens = !0, 
"link";
if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return n.combineTokens = !0, 
"link";
}
return e.match(t) && "](" != e.string.slice(e.start - 2, e.start) && (0 == e.start || /\W/.test(e.string.charAt(e.start - 1))) ? (n.combineTokens = !0, 
"link") : (e.next(), null);
},
blankLine: i
}, a = {
underscoresBreakWords: !1,
taskLists: !0,
fencedCodeBlocks: "```",
strikethrough: !0
};
for (var s in r) a[s] = r[s];
return a.name = "markdown", e.overlayMode(e.getMode(n, a), l);
}, "markdown"), e.defineMIME("text/x-gfm", "gfm");
});
},
362: function(e, t, n) {
!function(e) {
e(n(360), n(363), n(364));
}(function(e) {
"use strict";
e.defineMode("markdown", function(t, n) {
function r(n) {
if (e.findModeByName) {
var r = e.findModeByName(n);
r && (n = r.mime || r.mimes[0]);
}
var i = e.getMode(t, n);
return "null" == i.name ? null : i;
}
function i(e, t, n) {
return t.f = t.inline = n, n(e, t);
}
function o(e, t, n) {
return t.f = t.block = n, n(e, t);
}
function l(e) {
return !e || !/\S/.test(e.string);
}
function a(e) {
return e.linkTitle = !1, e.em = !1, e.strong = !1, e.strikethrough = !1, e.quote = 0, 
e.indentedCode = !1, C || e.f != c || (e.f = p, e.block = s), e.trailingSpace = 0, 
e.trailingSpaceNewLine = !1, e.prevLine = e.thisLine, e.thisLine = null, null;
}
function s(e, t) {
var o = e.sol(), a = t.list !== !1, s = t.indentedCode;
t.indentedCode = !1, a && (t.indentationDiff >= 0 ? (t.indentationDiff < 4 && (t.indentation -= t.indentationDiff), 
t.list = null) : t.indentation > 0 ? (t.list = null, t.listDepth = Math.floor(t.indentation / 4)) : (t.list = !1, 
t.listDepth = 0));
var c = null;
if (t.indentationDiff >= 4) return e.skipToEnd(), s || l(t.prevLine) ? (t.indentation -= 4, 
t.indentedCode = !0, L.code) : null;
if (e.eatSpace()) return null;
if ((c = e.match(F)) && c[1].length <= 6) return t.header = c[1].length, n.highlightFormatting && (t.formatting = "header"), 
t.f = t.inline, h(t);
if (!(l(t.prevLine) || t.quote || a || s) && (c = e.match(W))) return t.header = "=" == c[0].charAt(0) ? 1 : 2, 
n.highlightFormatting && (t.formatting = "header"), t.f = t.inline, h(t);
if (e.eat(">")) return t.quote = o ? 1 : t.quote + 1, n.highlightFormatting && (t.formatting = "quote"), 
e.eatSpace(), h(t);
if ("[" === e.peek()) return i(e, t, x);
if (e.match(M, !0)) return t.hr = !0, L.hr;
if ((l(t.prevLine) || a) && (e.match(A, !1) || e.match(O, !1))) {
var f = null;
return e.match(A, !0) ? f = "ul" : (e.match(O, !0), f = "ol"), t.indentation = e.column() + e.current().length, 
t.list = !0, t.listDepth++, n.taskLists && e.match(N, !1) && (t.taskList = !0), 
t.f = t.inline, n.highlightFormatting && (t.formatting = [ "list", "list-" + f ]), 
h(t);
}
return n.fencedCodeBlocks && (c = e.match(H, !0)) ? (t.fencedChars = c[1], t.localMode = r(c[2]), 
t.localMode && (t.localState = t.localMode.startState()), t.f = t.block = u, n.highlightFormatting && (t.formatting = "code-block"), 
t.code = !0, h(t)) : i(e, t, t.inline);
}
function c(e, t) {
var n = k.token(e, t.htmlState);
return (C && null === t.htmlState.tagStart && !t.htmlState.context && t.htmlState.tokenize.isInText || t.md_inside && e.current().indexOf(">") > -1) && (t.f = p, 
t.block = s, t.htmlState = null), n;
}
function u(e, t) {
return t.fencedChars && e.match(t.fencedChars, !1) ? (t.localMode = t.localState = null, 
t.f = t.block = f, null) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), 
L.code);
}
function f(e, t) {
e.match(t.fencedChars), t.block = s, t.f = p, t.fencedChars = null, n.highlightFormatting && (t.formatting = "code-block"), 
t.code = !0;
var r = h(t);
return t.code = !1, r;
}
function h(e) {
var t = [];
if (e.formatting) {
t.push(L.formatting), "string" == typeof e.formatting && (e.formatting = [ e.formatting ]);
for (var r = 0; r < e.formatting.length; r++) t.push(L.formatting + "-" + e.formatting[r]), 
"header" === e.formatting[r] && t.push(L.formatting + "-" + e.formatting[r] + "-" + e.header), 
"quote" === e.formatting[r] && (!n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(L.formatting + "-" + e.formatting[r] + "-" + e.quote) : t.push("error"));
}
if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;
if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;
if (e.linkHref ? t.push(L.linkHref, "url") : (e.strong && t.push(L.strong), e.em && t.push(L.em), 
e.strikethrough && t.push(L.strikethrough), e.linkText && t.push(L.linkText), e.code && t.push(L.code)), 
e.header && t.push(L.header, L.header + "-" + e.header), e.quote && (t.push(L.quote), 
!n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(L.quote + "-" + e.quote) : t.push(L.quote + "-" + n.maxBlockquoteDepth)), 
e.list !== !1) {
var i = (e.listDepth - 1) % 3;
i ? 1 === i ? t.push(L.list2) : t.push(L.list3) : t.push(L.list1);
}
return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), 
t.length ? t.join(" ") : null;
}
function d(e, t) {
return e.match(D, !0) ? h(t) : void 0;
}
function p(t, r) {
var i = r.text(t, r);
if (void 0 !== i) return i;
if (r.list) return r.list = null, h(r);
if (r.taskList) {
var l = "x" !== t.match(N, !0)[1];
return l ? r.taskOpen = !0 : r.taskClosed = !0, n.highlightFormatting && (r.formatting = "task"), 
r.taskList = !1, h(r);
}
if (r.taskOpen = !1, r.taskClosed = !1, r.header && t.match(/^#+$/, !0)) return n.highlightFormatting && (r.formatting = "header"), 
h(r);
var a = t.sol(), s = t.next();
if ("\\" === s && (t.next(), n.highlightFormatting)) {
var u = h(r), f = L.formatting + "-escape";
return u ? u + " " + f : f;
}
if (r.linkTitle) {
r.linkTitle = !1;
var d = s;
"(" === s && (d = ")"), d = (d + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
var p = "^\\s*(?:[^" + d + "\\\\]+|\\\\\\\\|\\\\.)" + d;
if (t.match(RegExp(p), !0)) return L.linkHref;
}
if ("`" === s) {
var v = r.formatting;
n.highlightFormatting && (r.formatting = "code");
var x = h(r), y = t.pos;
t.eatWhile("`");
var b = 1 + t.pos - y;
return r.code ? b === S ? (r.code = !1, x) : (r.formatting = v, h(r)) : (S = b, 
r.code = !0, h(r));
}
if (r.code) return h(r);
if ("!" === s && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return t.match(/\[[^\]]*\]/), 
r.inline = r.f = g, L.image;
if ("[" === s && t.match(/.*\](\(.*\)| ?\[.*\])/, !1)) return r.linkText = !0, n.highlightFormatting && (r.formatting = "link"), 
h(r);
if ("]" === s && r.linkText && t.match(/\(.*\)| ?\[.*\]/, !1)) {
n.highlightFormatting && (r.formatting = "link");
var u = h(r);
return r.linkText = !1, r.inline = r.f = g, u;
}
if ("<" === s && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
r.f = r.inline = m, n.highlightFormatting && (r.formatting = "link");
var u = h(r);
return u ? u += " " : u = "", u + L.linkInline;
}
if ("<" === s && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
r.f = r.inline = m, n.highlightFormatting && (r.formatting = "link");
var u = h(r);
return u ? u += " " : u = "", u + L.linkEmail;
}
if ("<" === s && t.match(/^(!--|\w)/, !1)) {
var w = t.string.indexOf(">", t.pos);
if (-1 != w) {
var C = t.string.substring(t.start, w);
/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(C) && (r.md_inside = !0);
}
return t.backUp(1), r.htmlState = e.startState(k), o(t, r, c);
}
if ("<" === s && t.match(/^\/\w*?>/)) return r.md_inside = !1, "tag";
var T = !1;
if (!n.underscoresBreakWords && "_" === s && "_" !== t.peek() && t.match(/(\w)/, !1)) {
var M = t.pos - 2;
if (M >= 0) {
var A = t.string.charAt(M);
"_" !== A && A.match(/(\w)/, !1) && (T = !0);
}
}
if ("*" === s || "_" === s && !T) if (a && " " === t.peek()) ; else {
if (r.strong === s && t.eat(s)) {
n.highlightFormatting && (r.formatting = "strong");
var x = h(r);
return r.strong = !1, x;
}
if (!r.strong && t.eat(s)) return r.strong = s, n.highlightFormatting && (r.formatting = "strong"), 
h(r);
if (r.em === s) {
n.highlightFormatting && (r.formatting = "em");
var x = h(r);
return r.em = !1, x;
}
if (!r.em) return r.em = s, n.highlightFormatting && (r.formatting = "em"), h(r);
} else if (" " === s && (t.eat("*") || t.eat("_"))) {
if (" " === t.peek()) return h(r);
t.backUp(1);
}
if (n.strikethrough) if ("~" === s && t.eatWhile(s)) {
if (r.strikethrough) {
n.highlightFormatting && (r.formatting = "strikethrough");
var x = h(r);
return r.strikethrough = !1, x;
}
if (t.match(/^[^\s]/, !1)) return r.strikethrough = !0, n.highlightFormatting && (r.formatting = "strikethrough"), 
h(r);
} else if (" " === s && t.match(/^~~/, !0)) {
if (" " === t.peek()) return h(r);
t.backUp(2);
}
return " " === s && (t.match(/ +$/, !1) ? r.trailingSpace++ : r.trailingSpace && (r.trailingSpaceNewLine = !0)), 
h(r);
}
function m(e, t) {
var r = e.next();
if (">" === r) {
t.f = t.inline = p, n.highlightFormatting && (t.formatting = "link");
var i = h(t);
return i ? i += " " : i = "", i + L.linkInline;
}
return e.match(/^[^>]+/, !0), L.linkInline;
}
function g(e, t) {
if (e.eatSpace()) return null;
var r = e.next();
return "(" === r || "[" === r ? (t.f = t.inline = v("(" === r ? ")" : "]"), n.highlightFormatting && (t.formatting = "link-string"), 
t.linkHref = !0, h(t)) : "error";
}
function v(e) {
return function(t, r) {
var i = t.next();
if (i === e) {
r.f = r.inline = p, n.highlightFormatting && (r.formatting = "link-string");
var o = h(r);
return r.linkHref = !1, o;
}
return t.match(w(e), !0) && t.backUp(1), r.linkHref = !0, h(r);
};
}
function x(e, t) {
return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = y, e.next(), n.highlightFormatting && (t.formatting = "link"), 
t.linkText = !0, h(t)) : i(e, t, p);
}
function y(e, t) {
if (e.match(/^\]:/, !0)) {
t.f = t.inline = b, n.highlightFormatting && (t.formatting = "link");
var r = h(t);
return t.linkText = !1, r;
}
return e.match(/^([^\]\\]|\\.)+/, !0), L.linkText;
}
function b(e, t) {
return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), 
t.f = t.inline = p, L.linkHref + " url");
}
function w(e) {
return P[e] || (e = (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), P[e] = RegExp("^(?:[^\\\\]|\\\\.)*?(" + e + ")")), 
P[e];
}
var C = e.modes.hasOwnProperty("xml"), k = e.getMode(t, C ? {
name: "xml",
htmlMode: !0
} : "text/plain");
void 0 === n.highlightFormatting && (n.highlightFormatting = !1), void 0 === n.maxBlockquoteDepth && (n.maxBlockquoteDepth = 0), 
void 0 === n.underscoresBreakWords && (n.underscoresBreakWords = !0), void 0 === n.taskLists && (n.taskLists = !1), 
void 0 === n.strikethrough && (n.strikethrough = !1), void 0 === n.tokenTypeOverrides && (n.tokenTypeOverrides = {});
var S = 0, L = {
header: "header",
code: "comment",
quote: "quote",
list1: "variable-2",
list2: "variable-3",
list3: "keyword",
hr: "hr",
image: "tag",
formatting: "formatting",
linkInline: "link",
linkEmail: "link",
linkText: "link",
linkHref: "string",
em: "em",
strong: "strong",
strikethrough: "strikethrough"
};
for (var T in L) L.hasOwnProperty(T) && n.tokenTypeOverrides[T] && (L[T] = n.tokenTypeOverrides[T]);
var M = /^([*\-_])(?:\s*\1){2,}\s*$/, A = /^[*\-+]\s+/, O = /^[0-9]+([.)])\s+/, N = /^\[(x| )\](?=\s)/, F = n.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/, W = /^ *(?:\={1,}|-{1,})\s*$/, D = /^[^#!\[\]*_\\<>` "'(~]+/, H = RegExp("^(" + (n.fencedCodeBlocks === !0 ? "~~~+|```+" : n.fencedCodeBlocks) + ")[ \\t]*([\\w+#]*)"), P = [], z = {
startState: function() {
return {
f: s,
prevLine: null,
thisLine: null,
block: s,
htmlState: null,
indentation: 0,
inline: p,
text: d,
formatting: !1,
linkText: !1,
linkHref: !1,
linkTitle: !1,
em: !1,
strong: !1,
header: 0,
hr: !1,
taskList: !1,
list: !1,
listDepth: 0,
quote: 0,
trailingSpace: 0,
trailingSpaceNewLine: !1,
strikethrough: !1,
fencedChars: null
};
},
copyState: function(t) {
return {
f: t.f,
prevLine: t.prevLine,
thisLine: t.thisLine,
block: t.block,
htmlState: t.htmlState && e.copyState(k, t.htmlState),
indentation: t.indentation,
localMode: t.localMode,
localState: t.localMode ? e.copyState(t.localMode, t.localState) : null,
inline: t.inline,
text: t.text,
formatting: !1,
linkTitle: t.linkTitle,
code: t.code,
em: t.em,
strong: t.strong,
strikethrough: t.strikethrough,
header: t.header,
hr: t.hr,
taskList: t.taskList,
list: t.list,
listDepth: t.listDepth,
quote: t.quote,
indentedCode: t.indentedCode,
trailingSpace: t.trailingSpace,
trailingSpaceNewLine: t.trailingSpaceNewLine,
md_inside: t.md_inside,
fencedChars: t.fencedChars
};
},
token: function(e, t) {
if (t.formatting = !1, e != t.thisLine) {
var n = t.header || t.hr;
if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0) || n) {
if (a(t), !n) return null;
t.prevLine = null;
}
t.prevLine = t.thisLine, t.thisLine = e, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, 
t.f = t.block;
var r = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length, i = 4 * Math.floor((r - t.indentation) / 4);
i > 4 && (i = 4);
var o = t.indentation + i;
if (t.indentationDiff = o - t.indentation, t.indentation = o, r > 0) return null;
}
return t.f(e, t);
},
innerMode: function(e) {
return e.block == c ? {
state: e.htmlState,
mode: k
} : e.localState ? {
state: e.localState,
mode: e.localMode
} : {
state: e,
mode: z
};
},
blankLine: a,
getType: h,
fold: "markdown"
};
return z;
}, "xml"), e.defineMIME("text/x-markdown", "markdown");
});
},
363: function(e, t, n) {
!function(e) {
e(n(360));
}(function(e) {
"use strict";
var t = {
autoSelfClosers: {
area: !0,
base: !0,
br: !0,
col: !0,
command: !0,
embed: !0,
frame: !0,
hr: !0,
img: !0,
input: !0,
keygen: !0,
link: !0,
meta: !0,
param: !0,
source: !0,
track: !0,
wbr: !0,
menuitem: !0
},
implicitlyClosed: {
dd: !0,
li: !0,
optgroup: !0,
option: !0,
p: !0,
rp: !0,
rt: !0,
tbody: !0,
td: !0,
tfoot: !0,
th: !0,
tr: !0
},
contextGrabbers: {
dd: {
dd: !0,
dt: !0
},
dt: {
dd: !0,
dt: !0
},
li: {
li: !0
},
option: {
option: !0,
optgroup: !0
},
optgroup: {
optgroup: !0
},
p: {
address: !0,
article: !0,
aside: !0,
blockquote: !0,
dir: !0,
div: !0,
dl: !0,
fieldset: !0,
footer: !0,
form: !0,
h1: !0,
h2: !0,
h3: !0,
h4: !0,
h5: !0,
h6: !0,
header: !0,
hgroup: !0,
hr: !0,
menu: !0,
nav: !0,
ol: !0,
p: !0,
pre: !0,
section: !0,
table: !0,
ul: !0
},
rp: {
rp: !0,
rt: !0
},
rt: {
rp: !0,
rt: !0
},
tbody: {
tbody: !0,
tfoot: !0
},
td: {
td: !0,
th: !0
},
tfoot: {
tbody: !0
},
th: {
td: !0,
th: !0
},
thead: {
tbody: !0,
tfoot: !0
},
tr: {
tr: !0
}
},
doNotIndent: {
pre: !0
},
allowUnquoted: !0,
allowMissing: !0,
caseFold: !0
}, n = {
autoSelfClosers: {},
implicitlyClosed: {},
contextGrabbers: {},
doNotIndent: {},
allowUnquoted: !1,
allowMissing: !1,
caseFold: !1
};
e.defineMode("xml", function(r, i) {
function o(e, t) {
function n(n) {
return t.tokenize = n, n(e, t);
}
var r = e.next();
if ("<" == r) return e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? n(s("atom", "]]>")) : null : e.match("--") ? n(s("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), 
n(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = s("meta", "?>"), 
"meta") : (T = e.eat("/") ? "closeTag" : "openTag", t.tokenize = l, "tag bracket");
if ("&" == r) {
var i;
return i = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";"), 
i ? "atom" : "error";
}
return e.eatWhile(/[^&<]/), null;
}
function l(e, t) {
var n = e.next();
if (">" == n || "/" == n && e.eat(">")) return t.tokenize = o, T = ">" == n ? "endTag" : "selfcloseTag", 
"tag bracket";
if ("=" == n) return T = "equals", null;
if ("<" == n) {
t.tokenize = o, t.state = d, t.tagName = t.tagStart = null;
var r = t.tokenize(e, t);
return r ? r + " tag error" : "tag error";
}
return /[\'\"]/.test(n) ? (t.tokenize = a(n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), 
"word");
}
function a(e) {
var t = function(t, n) {
for (;!t.eol(); ) if (t.next() == e) {
n.tokenize = l;
break;
}
return "string";
};
return t.isInAttribute = !0, t;
}
function s(e, t) {
return function(n, r) {
for (;!n.eol(); ) {
if (n.match(t)) {
r.tokenize = o;
break;
}
n.next();
}
return e;
};
}
function c(e) {
return function(t, n) {
for (var r; null != (r = t.next()); ) {
if ("<" == r) return n.tokenize = c(e + 1), n.tokenize(t, n);
if (">" == r) {
if (1 == e) {
n.tokenize = o;
break;
}
return n.tokenize = c(e - 1), n.tokenize(t, n);
}
}
return "meta";
};
}
function u(e, t, n) {
this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = n, 
(k.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0);
}
function f(e) {
e.context && (e.context = e.context.prev);
}
function h(e, t) {
for (var n; ;) {
if (!e.context) return;
if (n = e.context.tagName, !k.contextGrabbers.hasOwnProperty(n) || !k.contextGrabbers[n].hasOwnProperty(t)) return;
f(e);
}
}
function d(e, t, n) {
return "openTag" == e ? (n.tagStart = t.column(), p) : "closeTag" == e ? m : d;
}
function p(e, t, n) {
return "word" == e ? (n.tagName = t.current(), M = "tag", x) : (M = "error", p);
}
function m(e, t, n) {
if ("word" == e) {
var r = t.current();
return n.context && n.context.tagName != r && k.implicitlyClosed.hasOwnProperty(n.context.tagName) && f(n), 
n.context && n.context.tagName == r ? (M = "tag", g) : (M = "tag error", v);
}
return M = "error", v;
}
function g(e, t, n) {
return "endTag" != e ? (M = "error", g) : (f(n), d);
}
function v(e, t, n) {
return M = "error", g(e, t, n);
}
function x(e, t, n) {
if ("word" == e) return M = "attribute", y;
if ("endTag" == e || "selfcloseTag" == e) {
var r = n.tagName, i = n.tagStart;
return n.tagName = n.tagStart = null, "selfcloseTag" == e || k.autoSelfClosers.hasOwnProperty(r) ? h(n, r) : (h(n, r), 
n.context = new u(n, r, i == n.indented)), d;
}
return M = "error", x;
}
function y(e, t, n) {
return "equals" == e ? b : (k.allowMissing || (M = "error"), x(e, t, n));
}
function b(e, t, n) {
return "string" == e ? w : "word" == e && k.allowUnquoted ? (M = "string", x) : (M = "error", 
x(e, t, n));
}
function w(e, t, n) {
return "string" == e ? w : x(e, t, n);
}
var C = r.indentUnit, k = {}, S = i.htmlMode ? t : n;
for (var L in S) k[L] = S[L];
for (var L in i) k[L] = i[L];
var T, M;
return o.isInText = !0, {
startState: function(e) {
var t = {
tokenize: o,
state: d,
indented: e || 0,
tagName: null,
tagStart: null,
context: null
};
return null != e && (t.baseIndent = e), t;
},
token: function(e, t) {
if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;
T = null;
var n = t.tokenize(e, t);
return (n || T) && "comment" != n && (M = null, t.state = t.state(T || n, e, t), 
M && (n = "error" == M ? n + " error" : M)), n;
},
indent: function(t, n, r) {
var i = t.context;
if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + C;
if (i && i.noIndent) return e.Pass;
if (t.tokenize != l && t.tokenize != o) return r ? r.match(/^(\s*)/)[0].length : 0;
if (t.tagName) return k.multilineTagIndentPastTag !== !1 ? t.tagStart + t.tagName.length + 2 : t.tagStart + C * (k.multilineTagIndentFactor || 1);
if (k.alignCDATA && /<!\[CDATA\[/.test(n)) return 0;
var a = n && /^<(\/)?([\w_:\.-]*)/.exec(n);
if (a && a[1]) for (;i; ) {
if (i.tagName == a[2]) {
i = i.prev;
break;
}
if (!k.implicitlyClosed.hasOwnProperty(i.tagName)) break;
i = i.prev;
} else if (a) for (;i; ) {
var s = k.contextGrabbers[i.tagName];
if (!s || !s.hasOwnProperty(a[2])) break;
i = i.prev;
}
for (;i && i.prev && !i.startOfLine; ) i = i.prev;
return i ? i.indent + C : t.baseIndent || 0;
},
electricInput: /<\/[\s\w:]+>$/,
blockCommentStart: "<!--",
blockCommentEnd: "-->",
configuration: k.htmlMode ? "html" : "xml",
helperType: k.htmlMode ? "html" : "xml",
skipAttribute: function(e) {
e.state == b && (e.state = x);
}
};
}), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
name: "xml",
htmlMode: !0
});
});
},
364: function(e, t, n) {
!function(e) {
e(n(360));
}(function(e) {
"use strict";
e.modeInfo = [ {
name: "APL",
mime: "text/apl",
mode: "apl",
ext: [ "dyalog", "apl" ]
}, {
name: "PGP",
mimes: [ "application/pgp", "application/pgp-keys", "application/pgp-signature" ],
mode: "asciiarmor",
ext: [ "pgp" ]
}, {
name: "ASN.1",
mime: "text/x-ttcn-asn",
mode: "asn.1",
ext: [ "asn", "asn1" ]
}, {
name: "Asterisk",
mime: "text/x-asterisk",
mode: "asterisk",
file: /^extensions\.conf$/i
}, {
name: "Brainfuck",
mime: "text/x-brainfuck",
mode: "brainfuck",
ext: [ "b", "bf" ]
}, {
name: "C",
mime: "text/x-csrc",
mode: "clike",
ext: [ "c", "h" ]
}, {
name: "C++",
mime: "text/x-c++src",
mode: "clike",
ext: [ "cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx" ],
alias: [ "cpp" ]
}, {
name: "Cobol",
mime: "text/x-cobol",
mode: "cobol",
ext: [ "cob", "cpy" ]
}, {
name: "C#",
mime: "text/x-csharp",
mode: "clike",
ext: [ "cs" ],
alias: [ "csharp" ]
}, {
name: "Clojure",
mime: "text/x-clojure",
mode: "clojure",
ext: [ "clj" ]
}, {
name: "ClojureScript",
mime: "text/x-clojurescript",
mode: "clojure",
ext: [ "cljs" ]
}, {
name: "Closure Stylesheets (GSS)",
mime: "text/x-gss",
mode: "css",
ext: [ "gss" ]
}, {
name: "CMake",
mime: "text/x-cmake",
mode: "cmake",
ext: [ "cmake", "cmake.in" ],
file: /^CMakeLists.txt$/
}, {
name: "CoffeeScript",
mime: "text/x-coffeescript",
mode: "coffeescript",
ext: [ "coffee" ],
alias: [ "coffee", "coffee-script" ]
}, {
name: "Common Lisp",
mime: "text/x-common-lisp",
mode: "commonlisp",
ext: [ "cl", "lisp", "el" ],
alias: [ "lisp" ]
}, {
name: "Cypher",
mime: "application/x-cypher-query",
mode: "cypher",
ext: [ "cyp", "cypher" ]
}, {
name: "Cython",
mime: "text/x-cython",
mode: "python",
ext: [ "pyx", "pxd", "pxi" ]
}, {
name: "Crystal",
mime: "text/x-crystal",
mode: "crystal",
ext: [ "cr" ]
}, {
name: "CSS",
mime: "text/css",
mode: "css",
ext: [ "css" ]
}, {
name: "CQL",
mime: "text/x-cassandra",
mode: "sql",
ext: [ "cql" ]
}, {
name: "D",
mime: "text/x-d",
mode: "d",
ext: [ "d" ]
}, {
name: "Dart",
mimes: [ "application/dart", "text/x-dart" ],
mode: "dart",
ext: [ "dart" ]
}, {
name: "diff",
mime: "text/x-diff",
mode: "diff",
ext: [ "diff", "patch" ]
}, {
name: "Django",
mime: "text/x-django",
mode: "django"
}, {
name: "Dockerfile",
mime: "text/x-dockerfile",
mode: "dockerfile",
file: /^Dockerfile$/
}, {
name: "DTD",
mime: "application/xml-dtd",
mode: "dtd",
ext: [ "dtd" ]
}, {
name: "Dylan",
mime: "text/x-dylan",
mode: "dylan",
ext: [ "dylan", "dyl", "intr" ]
}, {
name: "EBNF",
mime: "text/x-ebnf",
mode: "ebnf"
}, {
name: "ECL",
mime: "text/x-ecl",
mode: "ecl",
ext: [ "ecl" ]
}, {
name: "Eiffel",
mime: "text/x-eiffel",
mode: "eiffel",
ext: [ "e" ]
}, {
name: "Elm",
mime: "text/x-elm",
mode: "elm",
ext: [ "elm" ]
}, {
name: "Embedded Javascript",
mime: "application/x-ejs",
mode: "htmlembedded",
ext: [ "ejs" ]
}, {
name: "Embedded Ruby",
mime: "application/x-erb",
mode: "htmlembedded",
ext: [ "erb" ]
}, {
name: "Erlang",
mime: "text/x-erlang",
mode: "erlang",
ext: [ "erl" ]
}, {
name: "Factor",
mime: "text/x-factor",
mode: "factor",
ext: [ "factor" ]
}, {
name: "Forth",
mime: "text/x-forth",
mode: "forth",
ext: [ "forth", "fth", "4th" ]
}, {
name: "Fortran",
mime: "text/x-fortran",
mode: "fortran",
ext: [ "f", "for", "f77", "f90" ]
}, {
name: "F#",
mime: "text/x-fsharp",
mode: "mllike",
ext: [ "fs" ],
alias: [ "fsharp" ]
}, {
name: "Gas",
mime: "text/x-gas",
mode: "gas",
ext: [ "s" ]
}, {
name: "Gherkin",
mime: "text/x-feature",
mode: "gherkin",
ext: [ "feature" ]
}, {
name: "GitHub Flavored Markdown",
mime: "text/x-gfm",
mode: "gfm",
file: /^(readme|contributing|history).md$/i
}, {
name: "Go",
mime: "text/x-go",
mode: "go",
ext: [ "go" ]
}, {
name: "Groovy",
mime: "text/x-groovy",
mode: "groovy",
ext: [ "groovy" ]
}, {
name: "HAML",
mime: "text/x-haml",
mode: "haml",
ext: [ "haml" ]
}, {
name: "Haskell",
mime: "text/x-haskell",
mode: "haskell",
ext: [ "hs" ]
}, {
name: "Haskell (Literate)",
mime: "text/x-literate-haskell",
mode: "haskell-literate",
ext: [ "lhs" ]
}, {
name: "Haxe",
mime: "text/x-haxe",
mode: "haxe",
ext: [ "hx" ]
}, {
name: "HXML",
mime: "text/x-hxml",
mode: "haxe",
ext: [ "hxml" ]
}, {
name: "ASP.NET",
mime: "application/x-aspx",
mode: "htmlembedded",
ext: [ "aspx" ],
alias: [ "asp", "aspx" ]
}, {
name: "HTML",
mime: "text/html",
mode: "htmlmixed",
ext: [ "html", "htm" ],
alias: [ "xhtml" ]
}, {
name: "HTTP",
mime: "message/http",
mode: "http"
}, {
name: "IDL",
mime: "text/x-idl",
mode: "idl",
ext: [ "pro" ]
}, {
name: "Jade",
mime: "text/x-jade",
mode: "jade",
ext: [ "jade" ]
}, {
name: "Java",
mime: "text/x-java",
mode: "clike",
ext: [ "java" ]
}, {
name: "Java Server Pages",
mime: "application/x-jsp",
mode: "htmlembedded",
ext: [ "jsp" ],
alias: [ "jsp" ]
}, {
name: "JavaScript",
mimes: [ "text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript" ],
mode: "javascript",
ext: [ "js" ],
alias: [ "ecmascript", "js", "node" ]
}, {
name: "JSON",
mimes: [ "application/json", "application/x-json" ],
mode: "javascript",
ext: [ "json", "map" ],
alias: [ "json5" ]
}, {
name: "JSON-LD",
mime: "application/ld+json",
mode: "javascript",
ext: [ "jsonld" ],
alias: [ "jsonld" ]
}, {
name: "JSX",
mime: "text/jsx",
mode: "jsx",
ext: [ "jsx" ]
}, {
name: "Jinja2",
mime: "null",
mode: "jinja2"
}, {
name: "Julia",
mime: "text/x-julia",
mode: "julia",
ext: [ "jl" ]
}, {
name: "Kotlin",
mime: "text/x-kotlin",
mode: "clike",
ext: [ "kt" ]
}, {
name: "LESS",
mime: "text/x-less",
mode: "css",
ext: [ "less" ]
}, {
name: "LiveScript",
mime: "text/x-livescript",
mode: "livescript",
ext: [ "ls" ],
alias: [ "ls" ]
}, {
name: "Lua",
mime: "text/x-lua",
mode: "lua",
ext: [ "lua" ]
}, {
name: "Markdown",
mime: "text/x-markdown",
mode: "markdown",
ext: [ "markdown", "md", "mkd" ]
}, {
name: "mIRC",
mime: "text/mirc",
mode: "mirc"
}, {
name: "MariaDB SQL",
mime: "text/x-mariadb",
mode: "sql"
}, {
name: "Mathematica",
mime: "text/x-mathematica",
mode: "mathematica",
ext: [ "m", "nb" ]
}, {
name: "Modelica",
mime: "text/x-modelica",
mode: "modelica",
ext: [ "mo" ]
}, {
name: "MUMPS",
mime: "text/x-mumps",
mode: "mumps"
}, {
name: "MS SQL",
mime: "text/x-mssql",
mode: "sql"
}, {
name: "MySQL",
mime: "text/x-mysql",
mode: "sql"
}, {
name: "Nginx",
mime: "text/x-nginx-conf",
mode: "nginx",
file: /nginx.*\.conf$/i
}, {
name: "NSIS",
mime: "text/x-nsis",
mode: "nsis",
ext: [ "nsh", "nsi" ]
}, {
name: "NTriples",
mime: "text/n-triples",
mode: "ntriples",
ext: [ "nt" ]
}, {
name: "Objective C",
mime: "text/x-objectivec",
mode: "clike",
ext: [ "m", "mm" ]
}, {
name: "OCaml",
mime: "text/x-ocaml",
mode: "mllike",
ext: [ "ml", "mli", "mll", "mly" ]
}, {
name: "Octave",
mime: "text/x-octave",
mode: "octave",
ext: [ "m" ]
}, {
name: "Oz",
mime: "text/x-oz",
mode: "oz",
ext: [ "oz" ]
}, {
name: "Pascal",
mime: "text/x-pascal",
mode: "pascal",
ext: [ "p", "pas" ]
}, {
name: "PEG.js",
mime: "null",
mode: "pegjs",
ext: [ "jsonld" ]
}, {
name: "Perl",
mime: "text/x-perl",
mode: "perl",
ext: [ "pl", "pm" ]
}, {
name: "PHP",
mime: "application/x-httpd-php",
mode: "php",
ext: [ "php", "php3", "php4", "php5", "phtml" ]
}, {
name: "Pig",
mime: "text/x-pig",
mode: "pig",
ext: [ "pig" ]
}, {
name: "Plain Text",
mime: "text/plain",
mode: "null",
ext: [ "txt", "text", "conf", "def", "list", "log" ]
}, {
name: "PLSQL",
mime: "text/x-plsql",
mode: "sql",
ext: [ "pls" ]
}, {
name: "Properties files",
mime: "text/x-properties",
mode: "properties",
ext: [ "properties", "ini", "in" ],
alias: [ "ini", "properties" ]
}, {
name: "Python",
mime: "text/x-python",
mode: "python",
ext: [ "py", "pyw" ]
}, {
name: "Puppet",
mime: "text/x-puppet",
mode: "puppet",
ext: [ "pp" ]
}, {
name: "Q",
mime: "text/x-q",
mode: "q",
ext: [ "q" ]
}, {
name: "R",
mime: "text/x-rsrc",
mode: "r",
ext: [ "r" ],
alias: [ "rscript" ]
}, {
name: "reStructuredText",
mime: "text/x-rst",
mode: "rst",
ext: [ "rst" ],
alias: [ "rst" ]
}, {
name: "RPM Changes",
mime: "text/x-rpm-changes",
mode: "rpm"
}, {
name: "RPM Spec",
mime: "text/x-rpm-spec",
mode: "rpm",
ext: [ "spec" ]
}, {
name: "Ruby",
mime: "text/x-ruby",
mode: "ruby",
ext: [ "rb" ],
alias: [ "jruby", "macruby", "rake", "rb", "rbx" ]
}, {
name: "Rust",
mime: "text/x-rustsrc",
mode: "rust",
ext: [ "rs" ]
}, {
name: "Sass",
mime: "text/x-sass",
mode: "sass",
ext: [ "sass" ]
}, {
name: "Scala",
mime: "text/x-scala",
mode: "clike",
ext: [ "scala" ]
}, {
name: "Scheme",
mime: "text/x-scheme",
mode: "scheme",
ext: [ "scm", "ss" ]
}, {
name: "SCSS",
mime: "text/x-scss",
mode: "css",
ext: [ "scss" ]
}, {
name: "Shell",
mime: "text/x-sh",
mode: "shell",
ext: [ "sh", "ksh", "bash" ],
alias: [ "bash", "sh", "zsh" ],
file: /^PKGBUILD$/
}, {
name: "Sieve",
mime: "application/sieve",
mode: "sieve",
ext: [ "siv", "sieve" ]
}, {
name: "Slim",
mimes: [ "text/x-slim", "application/x-slim" ],
mode: "slim",
ext: [ "slim" ]
}, {
name: "Smalltalk",
mime: "text/x-stsrc",
mode: "smalltalk",
ext: [ "st" ]
}, {
name: "Smarty",
mime: "text/x-smarty",
mode: "smarty",
ext: [ "tpl" ]
}, {
name: "Solr",
mime: "text/x-solr",
mode: "solr"
}, {
name: "Soy",
mime: "text/x-soy",
mode: "soy",
ext: [ "soy" ],
alias: [ "closure template" ]
}, {
name: "SPARQL",
mime: "application/sparql-query",
mode: "sparql",
ext: [ "rq", "sparql" ],
alias: [ "sparul" ]
}, {
name: "Spreadsheet",
mime: "text/x-spreadsheet",
mode: "spreadsheet",
alias: [ "excel", "formula" ]
}, {
name: "SQL",
mime: "text/x-sql",
mode: "sql",
ext: [ "sql" ]
}, {
name: "Squirrel",
mime: "text/x-squirrel",
mode: "clike",
ext: [ "nut" ]
}, {
name: "Swift",
mime: "text/x-swift",
mode: "swift",
ext: [ "swift" ]
}, {
name: "MariaDB",
mime: "text/x-mariadb",
mode: "sql"
}, {
name: "sTeX",
mime: "text/x-stex",
mode: "stex"
}, {
name: "LaTeX",
mime: "text/x-latex",
mode: "stex",
ext: [ "text", "ltx" ],
alias: [ "tex" ]
}, {
name: "SystemVerilog",
mime: "text/x-systemverilog",
mode: "verilog",
ext: [ "v" ]
}, {
name: "Tcl",
mime: "text/x-tcl",
mode: "tcl",
ext: [ "tcl" ]
}, {
name: "Textile",
mime: "text/x-textile",
mode: "textile",
ext: [ "textile" ]
}, {
name: "TiddlyWiki ",
mime: "text/x-tiddlywiki",
mode: "tiddlywiki"
}, {
name: "Tiki wiki",
mime: "text/tiki",
mode: "tiki"
}, {
name: "TOML",
mime: "text/x-toml",
mode: "toml",
ext: [ "toml" ]
}, {
name: "Tornado",
mime: "text/x-tornado",
mode: "tornado"
}, {
name: "troff",
mime: "troff",
mode: "troff",
ext: [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ]
}, {
name: "TTCN",
mime: "text/x-ttcn",
mode: "ttcn",
ext: [ "ttcn", "ttcn3", "ttcnpp" ]
}, {
name: "TTCN_CFG",
mime: "text/x-ttcn-cfg",
mode: "ttcn-cfg",
ext: [ "cfg" ]
}, {
name: "Turtle",
mime: "text/turtle",
mode: "turtle",
ext: [ "ttl" ]
}, {
name: "TypeScript",
mime: "application/typescript",
mode: "javascript",
ext: [ "ts" ],
alias: [ "ts" ]
}, {
name: "Twig",
mime: "text/x-twig",
mode: "twig"
}, {
name: "VB.NET",
mime: "text/x-vb",
mode: "vb",
ext: [ "vb" ]
}, {
name: "VBScript",
mime: "text/vbscript",
mode: "vbscript",
ext: [ "vbs" ]
}, {
name: "Velocity",
mime: "text/velocity",
mode: "velocity",
ext: [ "vtl" ]
}, {
name: "Verilog",
mime: "text/x-verilog",
mode: "verilog",
ext: [ "v" ]
}, {
name: "VHDL",
mime: "text/x-vhdl",
mode: "vhdl",
ext: [ "vhd", "vhdl" ]
}, {
name: "XML",
mimes: [ "application/xml", "text/xml" ],
mode: "xml",
ext: [ "xml", "xsl", "xsd" ],
alias: [ "rss", "wsdl", "xsd" ]
}, {
name: "XQuery",
mime: "application/xquery",
mode: "xquery",
ext: [ "xy", "xquery" ]
}, {
name: "YAML",
mime: "text/x-yaml",
mode: "yaml",
ext: [ "yaml", "yml" ],
alias: [ "yml" ]
}, {
name: "Z80",
mime: "text/x-z80",
mode: "z80",
ext: [ "z80" ]
}, {
name: "mscgen",
mime: "text/x-mscgen",
mode: "mscgen",
ext: [ "mscgen", "mscin", "msc" ]
}, {
name: "xu",
mime: "text/x-xu",
mode: "mscgen",
ext: [ "xu" ]
}, {
name: "msgenny",
mime: "text/x-msgenny",
mode: "mscgen",
ext: [ "msgenny" ]
} ];
for (var t = 0; t < e.modeInfo.length; t++) {
var n = e.modeInfo[t];
n.mimes && (n.mime = n.mimes[0]);
}
e.findModeByMIME = function(t) {
t = t.toLowerCase();
for (var n = 0; n < e.modeInfo.length; n++) {
var r = e.modeInfo[n];
if (r.mime == t) return r;
if (r.mimes) for (var i = 0; i < r.mimes.length; i++) if (r.mimes[i] == t) return r;
}
}, e.findModeByExtension = function(t) {
for (var n = 0; n < e.modeInfo.length; n++) {
var r = e.modeInfo[n];
if (r.ext) for (var i = 0; i < r.ext.length; i++) if (r.ext[i] == t) return r;
}
}, e.findModeByFileName = function(t) {
for (var n = 0; n < e.modeInfo.length; n++) {
var r = e.modeInfo[n];
if (r.file && r.file.test(t)) return r;
}
var i = t.lastIndexOf("."), o = i > -1 && t.substring(i + 1, t.length);
return o ? e.findModeByExtension(o) : void 0;
}, e.findModeByName = function(t) {
t = t.toLowerCase();
for (var n = 0; n < e.modeInfo.length; n++) {
var r = e.modeInfo[n];
if (r.name.toLowerCase() == t) return r;
if (r.alias) for (var i = 0; i < r.alias.length; i++) if (r.alias[i].toLowerCase() == t) return r;
}
};
});
},
365: function(e, t, n) {
!function(e) {
e(n(360));
}(function(e) {
"use strict";
e.overlayMode = function(t, n, r) {
return {
startState: function() {
return {
base: e.startState(t),
overlay: e.startState(n),
basePos: 0,
baseCur: null,
overlayPos: 0,
overlayCur: null,
streamSeen: null
};
},
copyState: function(r) {
return {
base: e.copyState(t, r.base),
overlay: e.copyState(n, r.overlay),
basePos: r.basePos,
baseCur: null,
overlayPos: r.overlayPos,
overlayCur: null
};
},
token: function(e, i) {
return (e != i.streamSeen || Math.min(i.basePos, i.overlayPos) < e.start) && (i.streamSeen = e, 
i.basePos = i.overlayPos = e.start), e.start == i.basePos && (i.baseCur = t.token(e, i.base), 
i.basePos = e.pos), e.start == i.overlayPos && (e.pos = e.start, i.overlayCur = n.token(e, i.overlay), 
i.overlayPos = e.pos), e.pos = Math.min(i.basePos, i.overlayPos), null == i.overlayCur ? i.baseCur : null != i.baseCur && i.overlay.combineTokens || r && null == i.overlay.combineTokens ? i.baseCur + " " + i.overlayCur : i.overlayCur;
},
indent: t.indent && function(e, n) {
return t.indent(e.base, n);
},
electricChars: t.electricChars,
innerMode: function(e) {
return {
state: e.base,
mode: t
};
},
blankLine: function(e) {
t.blankLine && t.blankLine(e.base), n.blankLine && n.blankLine(e.overlay);
}
};
};
});
},
366: function(e, t, n) {
var r = n(158);
e.exports = function(e) {
var t, n = [], i = {}, o = e || {};
return function(e, o) {
n.push("");
var l = [];
i.b = t = function(t, r, i) {
this && this.block, this && this.attributes || {};
e.call(this, n, l, t, r, i);
}, i.e = t = function(e) {
var t = this && this.block, n = this && this.attributes || {};
i.b.call({
block: function() {
t && t();
},
attributes: r.merge([ n ])
}, e, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
i.e.call({
block: function() {
(function() {
var e = o;
if ("number" == typeof e.length) for (var n = 0, l = e.length; l > n; n++) {
var a = e[n];
i.e.call({
block: function() {
i.e.call({
attributes: {
"class": "button-icon"
}
}, "i");
},
attributes: {
"data-action": "string" == typeof (t = a.action) ? r.escape(t) : t,
title: r.escape(a.title),
"class": "button"
}
}, "li");
} else {
var l = 0;
for (var n in e) {
l++;
var a = e[n];
i.e.call({
block: function() {
i.e.call({
attributes: {
"class": "button-icon"
}
}, "i");
},
attributes: {
"data-action": "string" == typeof (t = a.action) ? r.escape(t) : t,
title: r.escape(a.title),
"class": "button"
}
}, "li");
}
}
}).call(this);
},
attributes: {
"class": "button-row"
}
}, "ul");
},
attributes: {
"class": "button-bar"
}
}), i.e.call({
attributes: {
"class": "input"
}
}, "textarea"), i.e.call({
block: function() {
i.e.call({
block: function() {
n.push("Предпросмотр");
}
}, "h2");
},
attributes: {
"class": "title-preview"
}
}), i.e.call({
attributes: {
"class": "preview"
}
});
},
attributes: {
"class": "mdeditor"
}
});
}.call(this, "bem" in o ? o.bem : "undefined" != typeof bem ? bem : void 0, "buttons" in o ? o.buttons : "undefined" != typeof buttons ? buttons : void 0), 
n.join("");
};
},
367: function(e, t, n) {
function r(e) {
return n(i(e));
}
function i(e) {
return o[e] || function() {
throw Error("Cannot find module '" + e + "'.");
}();
}
var o = {
"./en.yml": 368,
"./ru.yml": 369
};
r.keys = function() {
return Object.keys(o);
}, r.resolve = i, e.exports = r, r.id = 367;
},
368: function(e, t) {
e.exports = {
heading: "Heading",
bold: "bold text",
italic: "italic text",
code: "code",
code_multiline: "multiline code here",
ol_item: "List item",
ul_item: "List item",
alt: "Image desciption"
};
},
369: function(e, t) {
e.exports = {
heading: "Заголовок",
bold: "жирный текст",
italic: "текст курсивом",
code: "код",
code_multiline: "несколько строк кода",
ol_item: "Элемент списка",
ul_item: "Элемент списка",
alt: "Описание изображения"
};
}
});
//# sourceMappingURL=mdeditor.10a4b79a3818d8a82138.js.map
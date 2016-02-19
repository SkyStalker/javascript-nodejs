var mdeditor = webpackJsonp_name_([ 29 ], [ function(e, t, r) {
"use strict";
function n() {
for (var e = document.querySelectorAll(".mdeditor"), t = 0; t < e.length; t++) {
var r = e[t];
new i({
elem: r
});
}
}
r(358);
var i = r(359);
n();
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t) {
var r = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}, n = function() {
var e = /\blang(?:uage)?-(\w+)\b/i, t = 0, n = r.Prism = {
util: {
encode: function(e) {
return e instanceof i ? new i(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(e) {
return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
},
objId: function(e) {
return e.__id || Object.defineProperty(e, "__id", {
value: ++t
}), e.__id;
},
clone: function(e) {
var t = n.util.type(e);
switch (t) {
case "Object":
var r = {};
for (var i in e) e.hasOwnProperty(i) && (r[i] = n.util.clone(e[i]));
return r;

case "Array":
return e.map && e.map(function(e) {
return n.util.clone(e);
});
}
return e;
}
},
languages: {
extend: function(e, t) {
var r = n.util.clone(n.languages[e]);
for (var i in t) r[i] = t[i];
return r;
},
insertBefore: function(e, t, r, i) {
i = i || n.languages;
var o = i[e];
if (2 == arguments.length) {
r = arguments[1];
for (var a in r) r.hasOwnProperty(a) && (o[a] = r[a]);
return o;
}
var s = {};
for (var l in o) if (o.hasOwnProperty(l)) {
if (l == t) for (var a in r) r.hasOwnProperty(a) && (s[a] = r[a]);
s[l] = o[l];
}
return n.languages.DFS(n.languages, function(t, r) {
r === i[e] && t != e && (this[t] = s);
}), i[e] = s;
},
DFS: function(e, t, r, i) {
i = i || {};
for (var o in e) e.hasOwnProperty(o) && (t.call(e, o, e[o], r || o), "Object" !== n.util.type(e[o]) || i[n.util.objId(e[o])] ? "Array" !== n.util.type(e[o]) || i[n.util.objId(e[o])] || (i[n.util.objId(e[o])] = !0, 
n.languages.DFS(e[o], t, o, i)) : (i[n.util.objId(e[o])] = !0, n.languages.DFS(e[o], t, null, i)));
}
},
plugins: {},
highlightAll: function(e, t) {
for (var r, i = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), o = 0; r = i[o++]; ) n.highlightElement(r, e === !0, t);
},
highlightElement: function(t, i, o) {
for (var a, s, l = t; l && !e.test(l.className); ) l = l.parentNode;
l && (a = (l.className.match(e) || [ , "" ])[1], s = n.languages[a]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + a, 
l = t.parentNode, /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, "").replace(/\s+/g, " ") + " language-" + a);
var c = t.textContent, u = {
element: t,
language: a,
grammar: s,
code: c
};
if (!c || !s) return void n.hooks.run("complete", u);
if (n.hooks.run("before-highlight", u), i && r.Worker) {
var h = new Worker(n.filename);
h.onmessage = function(e) {
u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, 
o && o.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
}, h.postMessage(JSON.stringify({
language: u.language,
code: u.code,
immediateClose: !0
}));
} else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), 
u.element.innerHTML = u.highlightedCode, o && o.call(t), n.hooks.run("after-highlight", u), 
n.hooks.run("complete", u);
},
highlight: function(e, t, r) {
var o = n.tokenize(e, t);
return i.stringify(n.util.encode(o), r);
},
tokenize: function(e, t, r) {
var i = n.Token, o = [ e ], a = t.rest;
if (a) {
for (var s in a) t[s] = a[s];
delete t.rest;
}
e: for (var s in t) if (t.hasOwnProperty(s) && t[s]) {
var l = t[s];
l = "Array" === n.util.type(l) ? l : [ l ];
for (var c = 0; c < l.length; ++c) {
var u = l[c], h = u.inside, f = !!u.lookbehind, d = 0, p = u.alias;
u = u.pattern || u;
for (var m = 0; m < o.length; m++) {
var g = o[m];
if (o.length > e.length) break e;
if (!(g instanceof i)) {
u.lastIndex = 0;
var v = u.exec(g);
if (v) {
f && (d = v[1].length);
var b = v.index - 1 + d, v = v[0].slice(d), y = v.length, x = b + y, k = g.slice(0, b + 1), w = g.slice(x + 1), C = [ m, 1 ];
k && C.push(k);
var S = new i(s, h ? n.tokenize(v, h) : v, p);
C.push(S), w && C.push(w), Array.prototype.splice.apply(o, C);
}
}
}
}
}
return o;
},
hooks: {
all: {},
add: function(e, t) {
var r = n.hooks.all;
r[e] = r[e] || [], r[e].push(t);
},
run: function(e, t) {
var r = n.hooks.all[e];
if (r && r.length) for (var i, o = 0; i = r[o++]; ) i(t);
}
}
}, i = n.Token = function(e, t, r) {
this.type = e, this.content = t, this.alias = r;
};
if (i.stringify = function(e, t, r) {
if ("string" == typeof e) return e;
if ("Array" === n.util.type(e)) return e.map(function(r) {
return i.stringify(r, t, e);
}).join("");
var o = {
type: e.type,
content: i.stringify(e.content, t, r),
tag: "span",
classes: [ "token", e.type ],
attributes: {},
language: t,
parent: r
};
if ("comment" == o.type && (o.attributes.spellcheck = "true"), e.alias) {
var a = "Array" === n.util.type(e.alias) ? e.alias : [ e.alias ];
Array.prototype.push.apply(o.classes, a);
}
n.hooks.run("wrap", o);
var s = "";
for (var l in o.attributes) s += (s ? " " : "") + l + '="' + (o.attributes[l] || "") + '"';
return "<" + o.tag + ' class="' + o.classes.join(" ") + '" ' + s + ">" + o.content + "</" + o.tag + ">";
}, !r.document) return r.addEventListener ? (r.addEventListener("message", function(e) {
var t = JSON.parse(e.data), i = t.language, o = t.code, a = t.immediateClose;
r.postMessage(n.highlight(o, n.languages[i], i)), a && r.close();
}, !1), r.Prism) : r.Prism;
var o = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
return o && (n.filename = o.src, document.addEventListener && !o.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), 
r.Prism;
}();
void 0 !== e && e.exports && (e.exports = n), "undefined" != typeof global && (global.Prism = n);
}, function(e, t) {
Prism.languages.markup = {
comment: /<!--[\w\W]*?-->/,
prolog: /<\?[\w\W]+?\?>/,
doctype: /<!DOCTYPE[\w\W]+?>/,
cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
tag: {
pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
inside: {
tag: {
pattern: /^<\/?[^\s>\/]+/i,
inside: {
punctuation: /^<\/?/,
namespace: /^[^\s>\/:]+:/
}
},
"attr-value": {
pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
inside: {
punctuation: /[=>"']/
}
},
punctuation: /\/?>/,
"attr-name": {
pattern: /[^\s>\/]+/,
inside: {
namespace: /^[^\s>\/:]+:/
}
}
}
},
entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function(e) {
"entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, 
Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
}, function(e, t) {
Prism.languages.css = {
comment: /\/\*[\w\W]*?\*\//,
atrule: {
pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
inside: {
rule: /@[\w-]+/
}
},
url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
property: /(\b|\B)[\w-]+(?=\s*:)/i,
important: /\B!important\b/i,
"function": /[-a-z0-9]+(?=\()/i,
punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), 
Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
style: {
pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
lookbehind: !0,
inside: Prism.languages.css,
alias: "language-css"
}
}), Prism.languages.insertBefore("inside", "attr-value", {
"style-attr": {
pattern: /\s*style=("|').*?\1/i,
inside: {
"attr-name": {
pattern: /^\s*style/i,
inside: Prism.languages.markup.tag.inside
},
punctuation: /^\s*=\s*['"]|['"]\s*$/,
"attr-value": {
pattern: /.+/i,
inside: Prism.languages.css
}
},
alias: "language-css"
}
}, Prism.languages.markup.tag));
}, function(e, t) {
Prism.languages.css.selector = {
pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
inside: {
"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
"pseudo-class": /:[-\w]+(?:\(.*\))?/,
"class": /\.[-:\.\w]+/,
id: /#[-:\.\w]+/
}
}, Prism.languages.insertBefore("css", "function", {
hexcode: /#[\da-f]{3,6}/i,
entity: /\\[\da-f]{1,8}/i,
number: /[\d%\.]+/
});
}, function(e, t) {
Prism.languages.clike = {
comment: [ {
pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
lookbehind: !0
}, {
pattern: /(^|[^\\:])\/\/.*/,
lookbehind: !0
} ],
string: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
"class-name": {
pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
lookbehind: !0,
inside: {
punctuation: /(\.|\\)/
}
},
keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
"boolean": /\b(true|false)\b/,
"function": /[a-z0-9_]+(?=\()/i,
number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
punctuation: /[{}[\];(),.:]/
};
}, function(e, t) {
Prism.languages.javascript = Prism.languages.extend("clike", {
keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
"function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
}), Prism.languages.insertBefore("javascript", "keyword", {
regex: {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
lookbehind: !0
}
}), Prism.languages.insertBefore("javascript", "class-name", {
"template-string": {
pattern: /`(?:\\`|\\?[^`])*`/,
inside: {
interpolation: {
pattern: /\$\{[^}]+\}/,
inside: {
"interpolation-punctuation": {
pattern: /^\$\{|\}$/,
alias: "punctuation"
},
rest: Prism.languages.javascript
}
},
string: /[\s\S]+/
}
}
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
script: {
pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
lookbehind: !0,
inside: Prism.languages.javascript,
alias: "language-javascript"
}
}), Prism.languages.js = Prism.languages.javascript;
}, function(e, t) {
!function(e) {
var t = /#(?!\{).+/, r = {
pattern: /#\{[^}]+\}/,
alias: "variable"
};
e.languages.coffeescript = e.languages.extend("javascript", {
comment: t,
string: [ /'(?:\\?[^\\])*?'/, {
pattern: /"(?:\\?[^\\])*?"/,
inside: {
interpolation: r
}
} ],
keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
"class-member": {
pattern: /@(?!\d)\w+/,
alias: "variable"
}
}), e.languages.insertBefore("coffeescript", "comment", {
"multiline-comment": {
pattern: /###[\s\S]+?###/,
alias: "comment"
},
"block-regex": {
pattern: /\/{3}[\s\S]*?\/{3}/,
alias: "regex",
inside: {
comment: t,
interpolation: r
}
}
}), e.languages.insertBefore("coffeescript", "string", {
"inline-javascript": {
pattern: /`(?:\\?[\s\S])*?`/,
inside: {
delimiter: {
pattern: /^`|`$/,
alias: "punctuation"
},
rest: e.languages.javascript
}
},
"multiline-string": [ {
pattern: /'''[\s\S]*?'''/,
alias: "string"
}, {
pattern: /"""[\s\S]*?"""/,
alias: "string",
inside: {
interpolation: r
}
} ]
}), e.languages.insertBefore("coffeescript", "keyword", {
property: /(?!\d)\w+(?=\s*:(?!:))/
});
}(Prism);
}, function(e, t) {
Prism.languages.http = {
"request-line": {
pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
inside: {
property: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
"attr-name": /:\w+/
}
},
"response-status": {
pattern: /^HTTP\/1.[01] [0-9]+.*/m,
inside: {
property: {
pattern: /(^HTTP\/1.[01] )[0-9]+.*/i,
lookbehind: !0
}
}
},
"header-name": {
pattern: /^[\w-]+:(?=.)/m,
alias: "keyword"
}
};
var r = {
"application/json": Prism.languages.javascript,
"application/xml": Prism.languages.markup,
"text/xml": Prism.languages.markup,
"text/html": Prism.languages.markup
};
for (var n in r) if (r[n]) {
var i = {};
i[n] = {
pattern: RegExp("(content-type:\\s*" + n + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
lookbehind: !0,
inside: {
rest: r[n]
}
}, Prism.languages.insertBefore("http", "header-name", i);
}
}, function(e, t) {
Prism.languages.scss = Prism.languages.extend("css", {
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
lookbehind: !0
},
atrule: {
pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
inside: {
rule: /@[\w-]+/
}
},
url: /(?:[-a-z]+-)*url(?=\()/i,
selector: {
pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
inside: {
placeholder: /%[-_\w]+/
}
}
}), Prism.languages.insertBefore("scss", "atrule", {
keyword: [ /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
pattern: /( +)(?:from|through)(?= )/,
lookbehind: !0
} ]
}), Prism.languages.insertBefore("scss", "property", {
variable: /\$[-_\w]+|#\{\$[-_\w]+\}/
}), Prism.languages.insertBefore("scss", "function", {
placeholder: {
pattern: /%[-_\w]+/,
alias: "selector"
},
statement: /\B!(?:default|optional)\b/i,
"boolean": /\b(?:true|false)\b/,
"null": /\bnull\b/,
operator: {
pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
lookbehind: !0
}
}), Prism.languages.scss.atrule.inside.rest = Prism.util.clone(Prism.languages.scss);
}, function(e, t) {
Prism.languages.sql = {
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|(?:--|\/\/|#).*)/,
lookbehind: !0
},
string: {
pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,
lookbehind: !0
},
variable: /@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,
"function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
"boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
operator: /[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
punctuation: /[;[\]()`,.]/
};
}, function(e, t) {
Prism.languages.php = Prism.languages.extend("clike", {
keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
constant: /\b[A-Z0-9_]{2,}\b/,
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
lookbehind: !0
}
}), Prism.languages.insertBefore("php", "class-name", {
"shell-comment": {
pattern: /(^|[^\\])#.*/,
lookbehind: !0,
alias: "comment"
}
}), Prism.languages.insertBefore("php", "keyword", {
delimiter: /\?>|<\?(?:php)?/i,
variable: /\$\w+\b/i,
"package": {
pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
lookbehind: !0,
inside: {
punctuation: /\\/
}
}
}), Prism.languages.insertBefore("php", "operator", {
property: {
pattern: /(->)[\w]+/,
lookbehind: !0
}
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(e) {
"php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(t) {
return e.tokenStack.push(t), "{{{PHP" + e.tokenStack.length + "}}}";
}));
}), Prism.hooks.add("before-insert", function(e) {
"php" === e.language && (e.code = e.backupCode, delete e.backupCode);
}), Prism.hooks.add("after-highlight", function(e) {
if ("php" === e.language) {
for (var t, r = 0; t = e.tokenStack[r]; r++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (r + 1) + "}}}", Prism.highlight(t, e.grammar, "php").replace(/\$/g, "$$$$"));
e.element.innerHTML = e.highlightedCode;
}
}), Prism.hooks.add("wrap", function(e) {
"php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore("php", "comment", {
markup: {
pattern: /<[^?]\/?(.*?)>/,
inside: Prism.languages.markup
},
php: /\{\{\{PHP[0-9]+\}\}\}/
}));
}, function(e, t) {
Prism.languages.insertBefore("php", "variable", {
"this": /\$this\b/,
global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
scope: {
pattern: /\b[\w\\]+::/,
inside: {
keyword: /(static|self|parent)/,
punctuation: /(::|\\)/
}
}
});
}, function(e, t) {
Prism.languages.python = {
"triple-quoted-string": {
pattern: /"""[\s\S]+?"""|'''[\s\S]+?'''/,
alias: "string"
},
comment: {
pattern: /(^|[^\\])#.*/,
lookbehind: !0
},
string: /("|')(?:\\?.)*?\1/,
"function": {
pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
lookbehind: !0
},
"class-name": {
pattern: /(\bclass\s+)[a-z0-9_]+/i,
lookbehind: !0
},
keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
"boolean": /\b(?:True|False)\b/,
number: /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
punctuation: /[{}[\];(),.:]/
};
}, function(e, t) {
!function(e) {
e.languages.ruby = e.languages.extend("clike", {
comment: /#(?!\{[^\r\n]*?\}).*/,
keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
});
var t = {
pattern: /#\{[^}]+\}/,
inside: {
delimiter: {
pattern: /^#\{|\}$/,
alias: "tag"
},
rest: e.util.clone(e.languages.ruby)
}
};
e.languages.insertBefore("ruby", "keyword", {
regex: [ {
pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
lookbehind: !0
} ],
variable: /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
symbol: /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/
}), e.languages.insertBefore("ruby", "number", {
builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
constant: /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
}), e.languages.ruby.string = [ {
pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
inside: {
interpolation: t
}
}, {
pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
inside: {
interpolation: t
}
} ];
}(Prism);
}, function(e, t) {
Prism.languages.java = Prism.languages.extend("clike", {
keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
operator: {
pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
lookbehind: !0
}
});
}, , , , , , , , , , , , , , , function(e, t) {}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
"use strict";
function n(e) {
return null != e && "" !== e;
}
function i(e) {
return (Array.isArray(e) ? e.map(i) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(n).join(" ");
}
function o(e) {
return s[e] || e;
}
function a(e) {
var t = (e + "").replace(l, o);
return t === "" + e ? e : t;
}
t.merge = function c(e, t) {
if (1 === arguments.length) {
for (var r = e[0], i = 1; i < e.length; i++) r = c(r, e[i]);
return r;
}
var o = e.class, a = t.class;
(o || a) && (o = o || [], a = a || [], Array.isArray(o) || (o = [ o ]), Array.isArray(a) || (a = [ a ]), 
e.class = o.concat(a).filter(n));
for (var s in t) "class" != s && (e[s] = t[s]);
return e;
}, t.joinClasses = i, t.cls = function(e, r) {
for (var n = [], o = 0; o < e.length; o++) r && r[o] ? n.push(t.escape(i([ e[o] ]))) : n.push(i(e[o]));
var a = i(n);
return a.length ? ' class="' + a + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, r, n, i) {
return "style" === e && (r = t.style(r)), "boolean" == typeof r || null == r ? r ? " " + (i ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof r ? (-1 !== JSON.stringify(r).indexOf("&"), 
r && "function" == typeof r.toISOString, " " + e + "='" + JSON.stringify(r).replace(/'/g, "&apos;") + "'") : n ? (r && "function" == typeof r.toISOString, 
" " + e + '="' + t.escape(r) + '"') : (r && "function" == typeof r.toISOString, 
" " + e + '="' + r + '"');
}, t.attrs = function(e, r) {
var n = [], o = Object.keys(e);
if (o.length) for (var a = 0; a < o.length; ++a) {
var s = o[a], l = e[s];
"class" == s ? (l = i(l)) && n.push(" " + s + '="' + l + '"') : n.push(t.attr(s, l, !1, r));
}
return n.join("");
};
var s = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, l = /[&<>"]/g;
t.escape = a, t.rethrow = function u(e, t, n, i) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || i)) throw e.message += " on line " + n, 
e;
try {
i = i || r(116).readFileSync(t, "utf8");
} catch (o) {
u(e, null, n);
}
var a = 3, s = i.split("\n"), l = Math.max(n - a, 0), c = Math.min(s.length, n + a), a = s.slice(l, c).map(function(e, t) {
var r = t + l + 1;
return (r == n ? "  > " : "    ") + r + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + n + "\n" + a + "\n\n" + e.message, 
e;
}, t.DebugItem = function(e, t) {
this.lineno = e, this.filename = t;
};
}, , , function(e, t, r) {
"use strict";
function n(e) {
e.bem = i, e.t = a, e.thumb = o;
}
var i = r(162)(), o = r(163).thumb, a = r(326);
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, n(t), e(t);
};
}, function(e, t, r) {
"use strict";
var n = r(158);
e.exports = function(e) {
function t(e, t, r, i, o) {
var a = o || "div";
switch (a) {
case "img":
r.alt && !r.title && (r.title = ""), r.title && !r.alt && (r.alt = r.title), r.alt || (r.alt = "");
break;

case "input":
r.type || (r.type = "text");
break;

case "html":
e.push("<!DOCTYPE HTML>");
break;

case "a":
r.href || (r.href = "#");
}
e.push("<" + a + n.attrs(n.merge([ r ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(a) && e.push("</" + a + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(r, n, i, o) {
var a = this.block, s = this.attributes || {};
if (!s.class && i && !o) throw Error("Block without class: " + i);
if (s.class) {
var l = s.class;
l instanceof Array && (l = l.join(" ")), l = l.split(" ");
var c;
try {
c = l[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + l[0]);
}
o ? l[0] = n[n.length - 1] + e.element + l[0] : n[n.length] = c;
var h = (o ? n[n.length - 1] + e.element : "") + c;
-1 === l.indexOf(h) && (l[l.length] = h);
for (var f = 0; f < l.length; f++) {
var d = l[f];
d.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? l[f] = h + d : d.match(RegExp("^" + e.element)) && (n[n.length - 2] ? l[f] = n[n.length - 2] + d : l[f] = n[n.length - 1] + d), 
l[f].match(RegExp("^" + h + "($|(?=" + e.element + "|" + e.modifier + "))")) && (l[f] = e.prefix + l[f]);
}
s.class = l.sort().join(" ");
}
t(r, a, s, n, i), o || n.pop();
};
};
}, function(e, t) {
"use strict";
t.thumb = function(e, t, r) {
if (!e) return e;
var n = window.devicePixelRatio;
t *= n, r *= n;
var i = 160 >= t && 160 >= r ? "t" : 320 >= t && 320 >= r ? "m" : 640 >= t && 640 >= r ? "i" : 1024 >= t && 1024 >= r ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + i + e.slice(e.lastIndexOf("."));
};
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t) {
"use strict";
e.exports = function(e) {
return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], 
e.webpackPolyfill = 1), e;
};
}, , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
"use strict";
function n(e) {
for (var t = e.querySelectorAll(".code-example:not([data-prism-done])"), r = 0; r < t.length; r++) {
var n = t[r];
new a(n), n.setAttribute("data-prism-done", "1");
}
}
function i(e) {
for (var t = e.querySelectorAll("div.code-tabs:not([data-prism-done])"), r = 0; r < t.length; r++) new s(t[r]), 
t[r].setAttribute("data-prism-done", "1");
}
function o(e) {
n(e), i(e);
}
r(87), r(88), r(89), r(90), r(91), r(92), r(93), r(94), r(95), r(96), r(97), r(98), 
r(99), r(100), r(101), Prism.tokenTag = "code";
var a = r(238), s = r(241);
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
o(document);
});
}, t.highlight = o;
}, function(e, t, r) {
"use strict";
function n(e) {
function t() {
var e = x.contentWindow;
return "function" != typeof e.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void e.postMessage(m, "https://ru.lookatcode.com/showjs");
}
function r() {
var t;
if (k && e.hasAttribute("data-refresh") && (k.remove(), k = null), k || (k = e.querySelector(".code-result")), 
k) t = k.querySelector("iframe"); else {
if (k = document.createElement("div"), k.className = "code-result code-example__result", 
t = document.createElement("iframe"), t.name = "frame-" + Math.random(), t.className = "code-result__iframe", 
"0" === e.getAttribute("data-demo-height")) t.style.display = "none"; else if (e.hasAttribute("data-demo-height")) {
var r = +e.getAttribute("data-demo-height");
t.style.height = r + "px";
}
k.appendChild(t), e.appendChild(k);
}
if (b) {
var n = t.contentDocument || t.contentWindow.document;
n.open(), n.write(h(m)), n.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(n.querySelectorAll("script"), function(e) {
e.remove();
});
}, 2e3), e.hasAttribute("data-demo-height") || a.iframe(t), w && e.hasAttribute("data-autorun") || s(k) || k.scrollIntoView(!1);
} else {
var i = document.createElement("form");
i.style.display = "none", i.method = "POST", i.enctype = "multipart/form-data", 
i.action = "https://ru.lookatcode.com/showhtml", i.target = t.name;
var o = document.createElement("textarea");
o.name = "code", o.value = h(m), i.appendChild(o), t.parentNode.insertBefore(i, t.nextSibling), 
i.submit(), i.remove(), w && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || a.iframe(t), s(k) || k.scrollIntoView(!1);
});
}
}
function n(e) {
var t = document.createElement("script");
t.text = e, document.head.appendChild(t).parentNode.removeChild(t);
}
function c() {
if (b) {
if (e.hasAttribute("data-autorun")) return void n(m);
try {
window.eval.call(window, m);
} catch (r) {
alert("Error: " + r.message);
}
} else e.hasAttribute("data-refresh") && x && (x.remove(), x = null), x ? t() : (x = document.createElement("iframe"), 
x.className = "js-frame", x.src = "https://ru.lookatcode.com/showjs", x.style.width = 0, 
x.style.height = 0, x.style.border = "none", x.onload = function() {
t();
}, document.body.appendChild(x));
}
function u() {
var e;
if (v) e = h(m); else {
var t = m.replace(/^/gim, "    ");
e = "<!DOCTYPE html>\n<html>\n\n<body>\n  <script>\n" + t + "\n  </script>\n</body>\n\n</html>";
}
var r = document.createElement("form");
r.action = "http://plnkr.co/edit/?p=preview", r.method = "POST", r.target = "_blank", 
document.body.appendChild(r);
var n = document.createElement("textarea");
n.name = "files[index.html]", n.value = e, r.appendChild(n);
var i = document.createElement("input");
i.name = "description", i.value = "Fork from " + window.location, r.appendChild(i), 
r.submit(), r.remove();
}
function h() {
var e = m.toLowerCase(), t = e.match("<body>"), r = e.match("</body>"), n = e.match("<html>"), i = e.match("</html>"), o = e.match(/^\s*<!doctype/);
if (o) return m;
var a = m;
return n || (a = "<html>\n" + a), i || (a += "\n</html>"), t || (a = a.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
r || (a = a.replace("</html>", "\n</body>\n</html>")), a = "<!DOCTYPE HTML>\n" + a;
}
function f() {
g ? c() : r(), w = !1;
}
var d = e.querySelector("pre"), p = d.querySelector("code"), m = p.textContent;
Prism.highlightElement(p), l(d), i(d, e.getAttribute("data-highlight-block")), o(d, e.getAttribute("data-highlight-inline"));
var g = d.classList.contains("language-javascript"), v = d.classList.contains("language-markup"), b = +e.getAttribute("data-trusted"), y = +e.getAttribute("data-no-strict");
!y && g && (m = "'use strict';\n" + m);
var x, k, w = !0;
if (g || v) {
var C = e.querySelector('[data-action="run"]');
C && (C.onclick = function() {
return this.blur(), f(), !1;
});
var S = e.querySelector('[data-action="edit"]');
S && (S.onclick = function() {
return this.blur(), u(), !1;
}), e.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == e.getAttribute("data-autorun") ? e.querySelector("iframe").remove() : setTimeout(f, 100));
}
}
function i(e, t) {
if (t) for (var r, n = t.replace(/\s+/g, "").split(","), i = 0; r = n[i++]; ) {
r = r.split("-");
var o = +r[0], a = +r[1] || o, s = '<code class="block-highlight" data-start="' + o + '" data-end="' + a + '">' + Array(o + 1).join("\n") + '<code class="mask">' + Array(a - o + 2).join("\n") + "</code></code>";
e.insertAdjacentHTML("afterBegin", s);
}
}
function o(e, t) {
var r = e.querySelector('code[class*="language-"]');
t = t ? t.split(",") : [];
for (var n = 0; n < t.length; n++) {
var i = t[n].split(":"), o = +i[0], a = i[1].split("-"), s = +a[0], l = +a[1], c = '<code class="inline-highlight">' + Array(o + 1).join("\n") + Array(s + 1).join(" ") + '<code class="mask">' + Array(l - s + 1).join(" ") + "</code></code>";
r.insertAdjacentHTML("afterBegin", c);
}
}
var a = r(197), s = r(239), l = r(240);
e.exports = n;
}, function(e, t) {
"use strict";
function r(e) {
var t = e.getBoundingClientRect(), r = 0;
if (t.top < 0) r = t.bottom; else {
if (!(t.bottom > window.innerHeight)) return !0;
r = window.innerHeight - top;
}
return r > 10;
}
e.exports = r;
}, function(e, t) {
"use strict";
function r(e) {
var t, r = 1 + e.innerHTML.split("\n").length, n = Array(r);
n = n.join("<span></span>"), t = document.createElement("span"), t.className = "line-numbers-rows", 
t.innerHTML = n, e.hasAttribute("data-start") && (e.style.counterReset = "linenumber " + +e.dataset.start - 1), 
e.appendChild(t);
}
e.exports = r;
}, function(e, t, r) {
"use strict";
function n(e) {
window.ebookType || (this.elem = e, this.translateX = 0, this.switchesElem = e.querySelector("[data-code-tabs-switches]"), 
this.switchesElemItems = this.switchesElem.firstElementChild, this.arrowLeft = e.querySelector("[data-code-tabs-left]"), 
this.arrowRight = e.querySelector("[data-code-tabs-right]"), this.arrowLeft.onclick = function(e) {
e.preventDefault(), this.translateX = Math.max(0, this.translateX - this.switchesElem.offsetWidth), 
this.renderTranslate();
}.bind(this), this.arrowRight.onclick = function(e) {
e.preventDefault(), this.translateX = Math.min(this.translateX + this.switchesElem.offsetWidth, this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth), 
this.renderTranslate();
}.bind(this), this.delegate(".code-tabs__switch", "click", this.onSwitchClick));
}
var i = r(148), o = r(240);
n.prototype.onSwitchClick = function(e) {
e.preventDefault();
for (var t, r = e.delegateTarget.parentNode.children, n = this.elem.querySelector("[data-code-tabs-content]").children, i = 0; i < r.length; i++) {
var o = r[i], a = n[i];
o == e.delegateTarget ? (t = i, a.classList.add("code-tabs__section_current"), o.classList.add("code-tabs__switch_current")) : (a.classList.remove("code-tabs__section_current"), 
o.classList.remove("code-tabs__switch_current"));
}
0 === t ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(n[t]));
}, n.prototype.highlightTab = function(e) {
if (!e.highlighted) {
var t = e.querySelector("pre"), r = t.querySelector("code");
Prism.highlightElement(r), o(t), e.highlighted = !0;
}
}, n.prototype.renderTranslate = function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}, i.delegateMixin(n.prototype), e.exports = n;
}, , , , , , , , , , function(e, t, r) {
"use strict";
function n(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function e(e, t) {
for (var r = 0; r < t.length; r++) {
var n = t[r];
n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
Object.defineProperty(e, n.key, n);
}
}
return function(t, r, n) {
return r && e(t.prototype, r), n && e(t, n), t;
};
}(), o = r(252).lang, a = r(253), s = r(344), l = r(322), c = r(323), u = r(334), h = r(338), f = r(340), d = r(341), p = r(343), m = r(337);
e.exports = function() {
function e(t) {
n(this, e), t = t || {}, this.options = t, this.env = t.env || {}, this.md = a(Object.assign({
typographer: !0,
blockTags: m.allSupported,
linkHeaderTag: !1,
html: !1,
quotes: "ru" == o ? "«»„“" : "“”‘’"
}, t)), l(this.md), c(this.md), u(this.md), h(this.md), f(this.md), d(this.md), 
s(this.md), p(this.md);
}
return i(e, [ {
key: "parse",
value: function(e) {
return this.md.parse(e, this.env);
}
}, {
key: "parseInline",
value: function(e) {
return this.md.parseInline(e, this.env);
}
}, {
key: "render",
value: function(e) {
return this.md.renderer.render(this.parse(e), this.md.options, this.env);
}
}, {
key: "renderInline",
value: function(e) {
var t = this.parseInline(e), r = this.md.renderer.render(t, this.md.options, this.env);
return r;
}
}, {
key: "renderTokens",
value: function(e) {
return this.md.renderer.render(e, this.md.options, this.env);
}
} ]), e;
}();
}, function(e, t, r) {
"use strict";
e.exports = {
lang: "ru"
};
}, function(e, t, r) {
"use strict";
e.exports = r(254);
}, function(e, t, r) {
"use strict";
function n(e) {
var t = e.trim().toLowerCase();
return v.test(t) ? b.test(t) ? !0 : !1 : !0;
}
function i(e) {
var t = p.parse(e, !0);
if (t.hostname && (!t.protocol || y.indexOf(t.protocol) >= 0)) try {
t.hostname = m.toASCII(t.hostname);
} catch (r) {}
return p.encode(p.format(t));
}
function o(e) {
var t = p.parse(e, !0);
if (t.hostname && (!t.protocol || y.indexOf(t.protocol) >= 0)) try {
t.hostname = m.toUnicode(t.hostname);
} catch (r) {}
return p.decode(p.format(t));
}
function a(e, t) {
return this instanceof a ? (t || s.isString(e) || (t = e || {}, e = "default"), 
this.inline = new f(), this.block = new h(), this.core = new u(), this.renderer = new c(), 
this.linkify = new d(), this.validateLink = n, this.normalizeLink = i, this.normalizeLinkText = o, 
this.utils = s, this.helpers = l, this.options = {}, this.configure(e), void (t && this.set(t))) : new a(e, t);
}
var s = r(255), l = r(269), c = r(273), u = r(274), h = r(284), f = r(299), d = r(315), p = r(259), m = r(317), g = {
"default": r(318),
zero: r(319),
commonmark: r(320)
}, v = /^(vbscript|javascript|file|data):/, b = /^data:image\/(gif|png|jpeg|webp);/, y = [ "http:", "https:", "mailto:" ];
a.prototype.set = function(e) {
return s.assign(this.options, e), this;
}, a.prototype.configure = function(e) {
var t, r = this;
if (s.isString(e) && (t = e, e = g[t], !e)) throw Error('Wrong `markdown-it` preset "' + t + '", check name');
if (!e) throw Error("Wrong `markdown-it` preset, can't be empty");
return e.options && r.set(e.options), e.components && Object.keys(e.components).forEach(function(t) {
e.components[t].rules && r[t].ruler.enableOnly(e.components[t].rules), e.components[t].rules2 && r[t].ruler2.enableOnly(e.components[t].rules2);
}), this;
}, a.prototype.enable = function(e, t) {
var r = [];
Array.isArray(e) || (e = [ e ]), [ "core", "block", "inline" ].forEach(function(t) {
r = r.concat(this[t].ruler.enable(e, !0));
}, this), r = r.concat(this.inline.ruler2.enable(e, !0));
var n = e.filter(function(e) {
return r.indexOf(e) < 0;
});
if (n.length && !t) throw Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
return this;
}, a.prototype.disable = function(e, t) {
var r = [];
Array.isArray(e) || (e = [ e ]), [ "core", "block", "inline" ].forEach(function(t) {
r = r.concat(this[t].ruler.disable(e, !0));
}, this), r = r.concat(this.inline.ruler2.disable(e, !0));
var n = e.filter(function(e) {
return r.indexOf(e) < 0;
});
if (n.length && !t) throw Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
return this;
}, a.prototype.use = function(e) {
var t = [ this ].concat(Array.prototype.slice.call(arguments, 1));
return e.apply(e, t), this;
}, a.prototype.parse = function(e, t) {
var r = new this.core.State(e, this, t);
return this.core.process(r), r.tokens;
}, a.prototype.render = function(e, t) {
return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t);
}, a.prototype.parseInline = function(e, t) {
var r = new this.core.State(e, this, t);
return r.inlineMode = !0, this.core.process(r), r.tokens;
}, a.prototype.renderInline = function(e, t) {
return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t);
}, e.exports = a;
}, function(e, t, r) {
"use strict";
function n(e) {
return Object.prototype.toString.call(e);
}
function i(e) {
return "[object String]" === n(e);
}
function o(e, t) {
return k.call(e, t);
}
function a(e) {
var t = Array.prototype.slice.call(arguments, 1);
return t.forEach(function(t) {
if (t) {
if ("object" != typeof t) throw new TypeError(t + "must be object");
Object.keys(t).forEach(function(r) {
e[r] = t[r];
});
}
}), e;
}
function s(e, t, r) {
return [].concat(e.slice(0, t), r, e.slice(t + 1));
}
function l(e) {
return e >= 55296 && 57343 >= e ? !1 : e >= 64976 && 65007 >= e ? !1 : 65535 === (65535 & e) || 65534 === (65535 & e) ? !1 : e >= 0 && 8 >= e ? !1 : 11 === e ? !1 : e >= 14 && 31 >= e ? !1 : e >= 127 && 159 >= e ? !1 : e > 1114111 ? !1 : !0;
}
function c(e) {
if (e > 65535) {
e -= 65536;
var t = 55296 + (e >> 10), r = 56320 + (1023 & e);
return String.fromCharCode(t, r);
}
return String.fromCharCode(e);
}
function u(e, t) {
var r = 0;
return o(A, t) ? A[t] : 35 === t.charCodeAt(0) && _.test(t) && (r = "x" === t[1].toLowerCase() ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10), 
l(r)) ? c(r) : e;
}
function h(e) {
return e.indexOf("\\") < 0 ? e : e.replace(w, "$1");
}
function f(e) {
return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(S, function(e, t, r) {
return t ? t : u(e, r);
});
}
function d(e) {
return E[e];
}
function p(e) {
return L.test(e) ? e.replace(T, d) : e;
}
function m(e) {
return e.replace(M, "\\$&");
}
function g(e) {
switch (e) {
case 9:
case 32:
return !0;
}
return !1;
}
function v(e) {
if (e >= 8192 && 8202 >= e) return !0;
switch (e) {
case 9:
case 10:
case 11:
case 12:
case 13:
case 32:
case 160:
case 5760:
case 8239:
case 8287:
case 12288:
return !0;
}
return !1;
}
function b(e) {
return D.test(e);
}
function y(e) {
switch (e) {
case 33:
case 34:
case 35:
case 36:
case 37:
case 38:
case 39:
case 40:
case 41:
case 42:
case 43:
case 44:
case 45:
case 46:
case 47:
case 58:
case 59:
case 60:
case 61:
case 62:
case 63:
case 64:
case 91:
case 92:
case 93:
case 94:
case 95:
case 96:
case 123:
case 124:
case 125:
case 126:
return !0;

default:
return !1;
}
}
function x(e) {
return e.trim().replace(/\s+/g, " ").toUpperCase();
}
var k = Object.prototype.hasOwnProperty, w = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, C = /&([a-z#][a-z0-9]{1,31});/gi, S = RegExp(w.source + "|" + C.source, "gi"), _ = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, A = r(256), L = /[&<>"]/, T = /[&<>"]/g, E = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, M = /[.?*+^$[\]\\(){}|-]/g, D = r(258);
t.lib = {}, t.lib.mdurl = r(259), t.lib.ucmicro = r(264), t.assign = a, t.isString = i, 
t.has = o, t.unescapeMd = h, t.unescapeAll = f, t.isValidEntityCode = l, t.fromCodePoint = c, 
t.escapeHtml = p, t.arrayReplaceAt = s, t.isSpace = g, t.isWhiteSpace = v, t.isMdAsciiPunct = y, 
t.isPunctChar = b, t.escapeRE = m, t.normalizeReference = x;
}, function(e, t, r) {
"use strict";
e.exports = r(257);
}, function(e, t) {
e.exports = {
Aacute: "Á",
aacute: "á",
Abreve: "Ă",
abreve: "ă",
ac: "∾",
acd: "∿",
acE: "∾̳",
Acirc: "Â",
acirc: "â",
acute: "´",
Acy: "А",
acy: "а",
AElig: "Æ",
aelig: "æ",
af: "⁡",
Afr: "𝔄",
afr: "𝔞",
Agrave: "À",
agrave: "à",
alefsym: "ℵ",
aleph: "ℵ",
Alpha: "Α",
alpha: "α",
Amacr: "Ā",
amacr: "ā",
amalg: "⨿",
amp: "&",
AMP: "&",
andand: "⩕",
And: "⩓",
and: "∧",
andd: "⩜",
andslope: "⩘",
andv: "⩚",
ang: "∠",
ange: "⦤",
angle: "∠",
angmsdaa: "⦨",
angmsdab: "⦩",
angmsdac: "⦪",
angmsdad: "⦫",
angmsdae: "⦬",
angmsdaf: "⦭",
angmsdag: "⦮",
angmsdah: "⦯",
angmsd: "∡",
angrt: "∟",
angrtvb: "⊾",
angrtvbd: "⦝",
angsph: "∢",
angst: "Å",
angzarr: "⍼",
Aogon: "Ą",
aogon: "ą",
Aopf: "𝔸",
aopf: "𝕒",
apacir: "⩯",
ap: "≈",
apE: "⩰",
ape: "≊",
apid: "≋",
apos: "'",
ApplyFunction: "⁡",
approx: "≈",
approxeq: "≊",
Aring: "Å",
aring: "å",
Ascr: "𝒜",
ascr: "𝒶",
Assign: "≔",
ast: "*",
asymp: "≈",
asympeq: "≍",
Atilde: "Ã",
atilde: "ã",
Auml: "Ä",
auml: "ä",
awconint: "∳",
awint: "⨑",
backcong: "≌",
backepsilon: "϶",
backprime: "‵",
backsim: "∽",
backsimeq: "⋍",
Backslash: "∖",
Barv: "⫧",
barvee: "⊽",
barwed: "⌅",
Barwed: "⌆",
barwedge: "⌅",
bbrk: "⎵",
bbrktbrk: "⎶",
bcong: "≌",
Bcy: "Б",
bcy: "б",
bdquo: "„",
becaus: "∵",
because: "∵",
Because: "∵",
bemptyv: "⦰",
bepsi: "϶",
bernou: "ℬ",
Bernoullis: "ℬ",
Beta: "Β",
beta: "β",
beth: "ℶ",
between: "≬",
Bfr: "𝔅",
bfr: "𝔟",
bigcap: "⋂",
bigcirc: "◯",
bigcup: "⋃",
bigodot: "⨀",
bigoplus: "⨁",
bigotimes: "⨂",
bigsqcup: "⨆",
bigstar: "★",
bigtriangledown: "▽",
bigtriangleup: "△",
biguplus: "⨄",
bigvee: "⋁",
bigwedge: "⋀",
bkarow: "⤍",
blacklozenge: "⧫",
blacksquare: "▪",
blacktriangle: "▴",
blacktriangledown: "▾",
blacktriangleleft: "◂",
blacktriangleright: "▸",
blank: "␣",
blk12: "▒",
blk14: "░",
blk34: "▓",
block: "█",
bne: "=⃥",
bnequiv: "≡⃥",
bNot: "⫭",
bnot: "⌐",
Bopf: "𝔹",
bopf: "𝕓",
bot: "⊥",
bottom: "⊥",
bowtie: "⋈",
boxbox: "⧉",
boxdl: "┐",
boxdL: "╕",
boxDl: "╖",
boxDL: "╗",
boxdr: "┌",
boxdR: "╒",
boxDr: "╓",
boxDR: "╔",
boxh: "─",
boxH: "═",
boxhd: "┬",
boxHd: "╤",
boxhD: "╥",
boxHD: "╦",
boxhu: "┴",
boxHu: "╧",
boxhU: "╨",
boxHU: "╩",
boxminus: "⊟",
boxplus: "⊞",
boxtimes: "⊠",
boxul: "┘",
boxuL: "╛",
boxUl: "╜",
boxUL: "╝",
boxur: "└",
boxuR: "╘",
boxUr: "╙",
boxUR: "╚",
boxv: "│",
boxV: "║",
boxvh: "┼",
boxvH: "╪",
boxVh: "╫",
boxVH: "╬",
boxvl: "┤",
boxvL: "╡",
boxVl: "╢",
boxVL: "╣",
boxvr: "├",
boxvR: "╞",
boxVr: "╟",
boxVR: "╠",
bprime: "‵",
breve: "˘",
Breve: "˘",
brvbar: "¦",
bscr: "𝒷",
Bscr: "ℬ",
bsemi: "⁏",
bsim: "∽",
bsime: "⋍",
bsolb: "⧅",
bsol: "\\",
bsolhsub: "⟈",
bull: "•",
bullet: "•",
bump: "≎",
bumpE: "⪮",
bumpe: "≏",
Bumpeq: "≎",
bumpeq: "≏",
Cacute: "Ć",
cacute: "ć",
capand: "⩄",
capbrcup: "⩉",
capcap: "⩋",
cap: "∩",
Cap: "⋒",
capcup: "⩇",
capdot: "⩀",
CapitalDifferentialD: "ⅅ",
caps: "∩︀",
caret: "⁁",
caron: "ˇ",
Cayleys: "ℭ",
ccaps: "⩍",
Ccaron: "Č",
ccaron: "č",
Ccedil: "Ç",
ccedil: "ç",
Ccirc: "Ĉ",
ccirc: "ĉ",
Cconint: "∰",
ccups: "⩌",
ccupssm: "⩐",
Cdot: "Ċ",
cdot: "ċ",
cedil: "¸",
Cedilla: "¸",
cemptyv: "⦲",
cent: "¢",
centerdot: "·",
CenterDot: "·",
cfr: "𝔠",
Cfr: "ℭ",
CHcy: "Ч",
chcy: "ч",
check: "✓",
checkmark: "✓",
Chi: "Χ",
chi: "χ",
circ: "ˆ",
circeq: "≗",
circlearrowleft: "↺",
circlearrowright: "↻",
circledast: "⊛",
circledcirc: "⊚",
circleddash: "⊝",
CircleDot: "⊙",
circledR: "®",
circledS: "Ⓢ",
CircleMinus: "⊖",
CirclePlus: "⊕",
CircleTimes: "⊗",
cir: "○",
cirE: "⧃",
cire: "≗",
cirfnint: "⨐",
cirmid: "⫯",
cirscir: "⧂",
ClockwiseContourIntegral: "∲",
CloseCurlyDoubleQuote: "”",
CloseCurlyQuote: "’",
clubs: "♣",
clubsuit: "♣",
colon: ":",
Colon: "∷",
Colone: "⩴",
colone: "≔",
coloneq: "≔",
comma: ",",
commat: "@",
comp: "∁",
compfn: "∘",
complement: "∁",
complexes: "ℂ",
cong: "≅",
congdot: "⩭",
Congruent: "≡",
conint: "∮",
Conint: "∯",
ContourIntegral: "∮",
copf: "𝕔",
Copf: "ℂ",
coprod: "∐",
Coproduct: "∐",
copy: "©",
COPY: "©",
copysr: "℗",
CounterClockwiseContourIntegral: "∳",
crarr: "↵",
cross: "✗",
Cross: "⨯",
Cscr: "𝒞",
cscr: "𝒸",
csub: "⫏",
csube: "⫑",
csup: "⫐",
csupe: "⫒",
ctdot: "⋯",
cudarrl: "⤸",
cudarrr: "⤵",
cuepr: "⋞",
cuesc: "⋟",
cularr: "↶",
cularrp: "⤽",
cupbrcap: "⩈",
cupcap: "⩆",
CupCap: "≍",
cup: "∪",
Cup: "⋓",
cupcup: "⩊",
cupdot: "⊍",
cupor: "⩅",
cups: "∪︀",
curarr: "↷",
curarrm: "⤼",
curlyeqprec: "⋞",
curlyeqsucc: "⋟",
curlyvee: "⋎",
curlywedge: "⋏",
curren: "¤",
curvearrowleft: "↶",
curvearrowright: "↷",
cuvee: "⋎",
cuwed: "⋏",
cwconint: "∲",
cwint: "∱",
cylcty: "⌭",
dagger: "†",
Dagger: "‡",
daleth: "ℸ",
darr: "↓",
Darr: "↡",
dArr: "⇓",
dash: "‐",
Dashv: "⫤",
dashv: "⊣",
dbkarow: "⤏",
dblac: "˝",
Dcaron: "Ď",
dcaron: "ď",
Dcy: "Д",
dcy: "д",
ddagger: "‡",
ddarr: "⇊",
DD: "ⅅ",
dd: "ⅆ",
DDotrahd: "⤑",
ddotseq: "⩷",
deg: "°",
Del: "∇",
Delta: "Δ",
delta: "δ",
demptyv: "⦱",
dfisht: "⥿",
Dfr: "𝔇",
dfr: "𝔡",
dHar: "⥥",
dharl: "⇃",
dharr: "⇂",
DiacriticalAcute: "´",
DiacriticalDot: "˙",
DiacriticalDoubleAcute: "˝",
DiacriticalGrave: "`",
DiacriticalTilde: "˜",
diam: "⋄",
diamond: "⋄",
Diamond: "⋄",
diamondsuit: "♦",
diams: "♦",
die: "¨",
DifferentialD: "ⅆ",
digamma: "ϝ",
disin: "⋲",
div: "÷",
divide: "÷",
divideontimes: "⋇",
divonx: "⋇",
DJcy: "Ђ",
djcy: "ђ",
dlcorn: "⌞",
dlcrop: "⌍",
dollar: "$",
Dopf: "𝔻",
dopf: "𝕕",
Dot: "¨",
dot: "˙",
DotDot: "⃜",
doteq: "≐",
doteqdot: "≑",
DotEqual: "≐",
dotminus: "∸",
dotplus: "∔",
dotsquare: "⊡",
doublebarwedge: "⌆",
DoubleContourIntegral: "∯",
DoubleDot: "¨",
DoubleDownArrow: "⇓",
DoubleLeftArrow: "⇐",
DoubleLeftRightArrow: "⇔",
DoubleLeftTee: "⫤",
DoubleLongLeftArrow: "⟸",
DoubleLongLeftRightArrow: "⟺",
DoubleLongRightArrow: "⟹",
DoubleRightArrow: "⇒",
DoubleRightTee: "⊨",
DoubleUpArrow: "⇑",
DoubleUpDownArrow: "⇕",
DoubleVerticalBar: "∥",
DownArrowBar: "⤓",
downarrow: "↓",
DownArrow: "↓",
Downarrow: "⇓",
DownArrowUpArrow: "⇵",
DownBreve: "̑",
downdownarrows: "⇊",
downharpoonleft: "⇃",
downharpoonright: "⇂",
DownLeftRightVector: "⥐",
DownLeftTeeVector: "⥞",
DownLeftVectorBar: "⥖",
DownLeftVector: "↽",
DownRightTeeVector: "⥟",
DownRightVectorBar: "⥗",
DownRightVector: "⇁",
DownTeeArrow: "↧",
DownTee: "⊤",
drbkarow: "⤐",
drcorn: "⌟",
drcrop: "⌌",
Dscr: "𝒟",
dscr: "𝒹",
DScy: "Ѕ",
dscy: "ѕ",
dsol: "⧶",
Dstrok: "Đ",
dstrok: "đ",
dtdot: "⋱",
dtri: "▿",
dtrif: "▾",
duarr: "⇵",
duhar: "⥯",
dwangle: "⦦",
DZcy: "Џ",
dzcy: "џ",
dzigrarr: "⟿",
Eacute: "É",
eacute: "é",
easter: "⩮",
Ecaron: "Ě",
ecaron: "ě",
Ecirc: "Ê",
ecirc: "ê",
ecir: "≖",
ecolon: "≕",
Ecy: "Э",
ecy: "э",
eDDot: "⩷",
Edot: "Ė",
edot: "ė",
eDot: "≑",
ee: "ⅇ",
efDot: "≒",
Efr: "𝔈",
efr: "𝔢",
eg: "⪚",
Egrave: "È",
egrave: "è",
egs: "⪖",
egsdot: "⪘",
el: "⪙",
Element: "∈",
elinters: "⏧",
ell: "ℓ",
els: "⪕",
elsdot: "⪗",
Emacr: "Ē",
emacr: "ē",
empty: "∅",
emptyset: "∅",
EmptySmallSquare: "◻",
emptyv: "∅",
EmptyVerySmallSquare: "▫",
emsp13: " ",
emsp14: " ",
emsp: " ",
ENG: "Ŋ",
eng: "ŋ",
ensp: " ",
Eogon: "Ę",
eogon: "ę",
Eopf: "𝔼",
eopf: "𝕖",
epar: "⋕",
eparsl: "⧣",
eplus: "⩱",
epsi: "ε",
Epsilon: "Ε",
epsilon: "ε",
epsiv: "ϵ",
eqcirc: "≖",
eqcolon: "≕",
eqsim: "≂",
eqslantgtr: "⪖",
eqslantless: "⪕",
Equal: "⩵",
equals: "=",
EqualTilde: "≂",
equest: "≟",
Equilibrium: "⇌",
equiv: "≡",
equivDD: "⩸",
eqvparsl: "⧥",
erarr: "⥱",
erDot: "≓",
escr: "ℯ",
Escr: "ℰ",
esdot: "≐",
Esim: "⩳",
esim: "≂",
Eta: "Η",
eta: "η",
ETH: "Ð",
eth: "ð",
Euml: "Ë",
euml: "ë",
euro: "€",
excl: "!",
exist: "∃",
Exists: "∃",
expectation: "ℰ",
exponentiale: "ⅇ",
ExponentialE: "ⅇ",
fallingdotseq: "≒",
Fcy: "Ф",
fcy: "ф",
female: "♀",
ffilig: "ﬃ",
fflig: "ﬀ",
ffllig: "ﬄ",
Ffr: "𝔉",
ffr: "𝔣",
filig: "ﬁ",
FilledSmallSquare: "◼",
FilledVerySmallSquare: "▪",
fjlig: "fj",
flat: "♭",
fllig: "ﬂ",
fltns: "▱",
fnof: "ƒ",
Fopf: "𝔽",
fopf: "𝕗",
forall: "∀",
ForAll: "∀",
fork: "⋔",
forkv: "⫙",
Fouriertrf: "ℱ",
fpartint: "⨍",
frac12: "½",
frac13: "⅓",
frac14: "¼",
frac15: "⅕",
frac16: "⅙",
frac18: "⅛",
frac23: "⅔",
frac25: "⅖",
frac34: "¾",
frac35: "⅗",
frac38: "⅜",
frac45: "⅘",
frac56: "⅚",
frac58: "⅝",
frac78: "⅞",
frasl: "⁄",
frown: "⌢",
fscr: "𝒻",
Fscr: "ℱ",
gacute: "ǵ",
Gamma: "Γ",
gamma: "γ",
Gammad: "Ϝ",
gammad: "ϝ",
gap: "⪆",
Gbreve: "Ğ",
gbreve: "ğ",
Gcedil: "Ģ",
Gcirc: "Ĝ",
gcirc: "ĝ",
Gcy: "Г",
gcy: "г",
Gdot: "Ġ",
gdot: "ġ",
ge: "≥",
gE: "≧",
gEl: "⪌",
gel: "⋛",
geq: "≥",
geqq: "≧",
geqslant: "⩾",
gescc: "⪩",
ges: "⩾",
gesdot: "⪀",
gesdoto: "⪂",
gesdotol: "⪄",
gesl: "⋛︀",
gesles: "⪔",
Gfr: "𝔊",
gfr: "𝔤",
gg: "≫",
Gg: "⋙",
ggg: "⋙",
gimel: "ℷ",
GJcy: "Ѓ",
gjcy: "ѓ",
gla: "⪥",
gl: "≷",
glE: "⪒",
glj: "⪤",
gnap: "⪊",
gnapprox: "⪊",
gne: "⪈",
gnE: "≩",
gneq: "⪈",
gneqq: "≩",
gnsim: "⋧",
Gopf: "𝔾",
gopf: "𝕘",
grave: "`",
GreaterEqual: "≥",
GreaterEqualLess: "⋛",
GreaterFullEqual: "≧",
GreaterGreater: "⪢",
GreaterLess: "≷",
GreaterSlantEqual: "⩾",
GreaterTilde: "≳",
Gscr: "𝒢",
gscr: "ℊ",
gsim: "≳",
gsime: "⪎",
gsiml: "⪐",
gtcc: "⪧",
gtcir: "⩺",
gt: ">",
GT: ">",
Gt: "≫",
gtdot: "⋗",
gtlPar: "⦕",
gtquest: "⩼",
gtrapprox: "⪆",
gtrarr: "⥸",
gtrdot: "⋗",
gtreqless: "⋛",
gtreqqless: "⪌",
gtrless: "≷",
gtrsim: "≳",
gvertneqq: "≩︀",
gvnE: "≩︀",
Hacek: "ˇ",
hairsp: " ",
half: "½",
hamilt: "ℋ",
HARDcy: "Ъ",
hardcy: "ъ",
harrcir: "⥈",
harr: "↔",
hArr: "⇔",
harrw: "↭",
Hat: "^",
hbar: "ℏ",
Hcirc: "Ĥ",
hcirc: "ĥ",
hearts: "♥",
heartsuit: "♥",
hellip: "…",
hercon: "⊹",
hfr: "𝔥",
Hfr: "ℌ",
HilbertSpace: "ℋ",
hksearow: "⤥",
hkswarow: "⤦",
hoarr: "⇿",
homtht: "∻",
hookleftarrow: "↩",
hookrightarrow: "↪",
hopf: "𝕙",
Hopf: "ℍ",
horbar: "―",
HorizontalLine: "─",
hscr: "𝒽",
Hscr: "ℋ",
hslash: "ℏ",
Hstrok: "Ħ",
hstrok: "ħ",
HumpDownHump: "≎",
HumpEqual: "≏",
hybull: "⁃",
hyphen: "‐",
Iacute: "Í",
iacute: "í",
ic: "⁣",
Icirc: "Î",
icirc: "î",
Icy: "И",
icy: "и",
Idot: "İ",
IEcy: "Е",
iecy: "е",
iexcl: "¡",
iff: "⇔",
ifr: "𝔦",
Ifr: "ℑ",
Igrave: "Ì",
igrave: "ì",
ii: "ⅈ",
iiiint: "⨌",
iiint: "∭",
iinfin: "⧜",
iiota: "℩",
IJlig: "Ĳ",
ijlig: "ĳ",
Imacr: "Ī",
imacr: "ī",
image: "ℑ",
ImaginaryI: "ⅈ",
imagline: "ℐ",
imagpart: "ℑ",
imath: "ı",
Im: "ℑ",
imof: "⊷",
imped: "Ƶ",
Implies: "⇒",
incare: "℅",
"in": "∈",
infin: "∞",
infintie: "⧝",
inodot: "ı",
intcal: "⊺",
"int": "∫",
Int: "∬",
integers: "ℤ",
Integral: "∫",
intercal: "⊺",
Intersection: "⋂",
intlarhk: "⨗",
intprod: "⨼",
InvisibleComma: "⁣",
InvisibleTimes: "⁢",
IOcy: "Ё",
iocy: "ё",
Iogon: "Į",
iogon: "į",
Iopf: "𝕀",
iopf: "𝕚",
Iota: "Ι",
iota: "ι",
iprod: "⨼",
iquest: "¿",
iscr: "𝒾",
Iscr: "ℐ",
isin: "∈",
isindot: "⋵",
isinE: "⋹",
isins: "⋴",
isinsv: "⋳",
isinv: "∈",
it: "⁢",
Itilde: "Ĩ",
itilde: "ĩ",
Iukcy: "І",
iukcy: "і",
Iuml: "Ï",
iuml: "ï",
Jcirc: "Ĵ",
jcirc: "ĵ",
Jcy: "Й",
jcy: "й",
Jfr: "𝔍",
jfr: "𝔧",
jmath: "ȷ",
Jopf: "𝕁",
jopf: "𝕛",
Jscr: "𝒥",
jscr: "𝒿",
Jsercy: "Ј",
jsercy: "ј",
Jukcy: "Є",
jukcy: "є",
Kappa: "Κ",
kappa: "κ",
kappav: "ϰ",
Kcedil: "Ķ",
kcedil: "ķ",
Kcy: "К",
kcy: "к",
Kfr: "𝔎",
kfr: "𝔨",
kgreen: "ĸ",
KHcy: "Х",
khcy: "х",
KJcy: "Ќ",
kjcy: "ќ",
Kopf: "𝕂",
kopf: "𝕜",
Kscr: "𝒦",
kscr: "𝓀",
lAarr: "⇚",
Lacute: "Ĺ",
lacute: "ĺ",
laemptyv: "⦴",
lagran: "ℒ",
Lambda: "Λ",
lambda: "λ",
lang: "⟨",
Lang: "⟪",
langd: "⦑",
langle: "⟨",
lap: "⪅",
Laplacetrf: "ℒ",
laquo: "«",
larrb: "⇤",
larrbfs: "⤟",
larr: "←",
Larr: "↞",
lArr: "⇐",
larrfs: "⤝",
larrhk: "↩",
larrlp: "↫",
larrpl: "⤹",
larrsim: "⥳",
larrtl: "↢",
latail: "⤙",
lAtail: "⤛",
lat: "⪫",
late: "⪭",
lates: "⪭︀",
lbarr: "⤌",
lBarr: "⤎",
lbbrk: "❲",
lbrace: "{",
lbrack: "[",
lbrke: "⦋",
lbrksld: "⦏",
lbrkslu: "⦍",
Lcaron: "Ľ",
lcaron: "ľ",
Lcedil: "Ļ",
lcedil: "ļ",
lceil: "⌈",
lcub: "{",
Lcy: "Л",
lcy: "л",
ldca: "⤶",
ldquo: "“",
ldquor: "„",
ldrdhar: "⥧",
ldrushar: "⥋",
ldsh: "↲",
le: "≤",
lE: "≦",
LeftAngleBracket: "⟨",
LeftArrowBar: "⇤",
leftarrow: "←",
LeftArrow: "←",
Leftarrow: "⇐",
LeftArrowRightArrow: "⇆",
leftarrowtail: "↢",
LeftCeiling: "⌈",
LeftDoubleBracket: "⟦",
LeftDownTeeVector: "⥡",
LeftDownVectorBar: "⥙",
LeftDownVector: "⇃",
LeftFloor: "⌊",
leftharpoondown: "↽",
leftharpoonup: "↼",
leftleftarrows: "⇇",
leftrightarrow: "↔",
LeftRightArrow: "↔",
Leftrightarrow: "⇔",
leftrightarrows: "⇆",
leftrightharpoons: "⇋",
leftrightsquigarrow: "↭",
LeftRightVector: "⥎",
LeftTeeArrow: "↤",
LeftTee: "⊣",
LeftTeeVector: "⥚",
leftthreetimes: "⋋",
LeftTriangleBar: "⧏",
LeftTriangle: "⊲",
LeftTriangleEqual: "⊴",
LeftUpDownVector: "⥑",
LeftUpTeeVector: "⥠",
LeftUpVectorBar: "⥘",
LeftUpVector: "↿",
LeftVectorBar: "⥒",
LeftVector: "↼",
lEg: "⪋",
leg: "⋚",
leq: "≤",
leqq: "≦",
leqslant: "⩽",
lescc: "⪨",
les: "⩽",
lesdot: "⩿",
lesdoto: "⪁",
lesdotor: "⪃",
lesg: "⋚︀",
lesges: "⪓",
lessapprox: "⪅",
lessdot: "⋖",
lesseqgtr: "⋚",
lesseqqgtr: "⪋",
LessEqualGreater: "⋚",
LessFullEqual: "≦",
LessGreater: "≶",
lessgtr: "≶",
LessLess: "⪡",
lesssim: "≲",
LessSlantEqual: "⩽",
LessTilde: "≲",
lfisht: "⥼",
lfloor: "⌊",
Lfr: "𝔏",
lfr: "𝔩",
lg: "≶",
lgE: "⪑",
lHar: "⥢",
lhard: "↽",
lharu: "↼",
lharul: "⥪",
lhblk: "▄",
LJcy: "Љ",
ljcy: "љ",
llarr: "⇇",
ll: "≪",
Ll: "⋘",
llcorner: "⌞",
Lleftarrow: "⇚",
llhard: "⥫",
lltri: "◺",
Lmidot: "Ŀ",
lmidot: "ŀ",
lmoustache: "⎰",
lmoust: "⎰",
lnap: "⪉",
lnapprox: "⪉",
lne: "⪇",
lnE: "≨",
lneq: "⪇",
lneqq: "≨",
lnsim: "⋦",
loang: "⟬",
loarr: "⇽",
lobrk: "⟦",
longleftarrow: "⟵",
LongLeftArrow: "⟵",
Longleftarrow: "⟸",
longleftrightarrow: "⟷",
LongLeftRightArrow: "⟷",
Longleftrightarrow: "⟺",
longmapsto: "⟼",
longrightarrow: "⟶",
LongRightArrow: "⟶",
Longrightarrow: "⟹",
looparrowleft: "↫",
looparrowright: "↬",
lopar: "⦅",
Lopf: "𝕃",
lopf: "𝕝",
loplus: "⨭",
lotimes: "⨴",
lowast: "∗",
lowbar: "_",
LowerLeftArrow: "↙",
LowerRightArrow: "↘",
loz: "◊",
lozenge: "◊",
lozf: "⧫",
lpar: "(",
lparlt: "⦓",
lrarr: "⇆",
lrcorner: "⌟",
lrhar: "⇋",
lrhard: "⥭",
lrm: "‎",
lrtri: "⊿",
lsaquo: "‹",
lscr: "𝓁",
Lscr: "ℒ",
lsh: "↰",
Lsh: "↰",
lsim: "≲",
lsime: "⪍",
lsimg: "⪏",
lsqb: "[",
lsquo: "‘",
lsquor: "‚",
Lstrok: "Ł",
lstrok: "ł",
ltcc: "⪦",
ltcir: "⩹",
lt: "<",
LT: "<",
Lt: "≪",
ltdot: "⋖",
lthree: "⋋",
ltimes: "⋉",
ltlarr: "⥶",
ltquest: "⩻",
ltri: "◃",
ltrie: "⊴",
ltrif: "◂",
ltrPar: "⦖",
lurdshar: "⥊",
luruhar: "⥦",
lvertneqq: "≨︀",
lvnE: "≨︀",
macr: "¯",
male: "♂",
malt: "✠",
maltese: "✠",
Map: "⤅",
map: "↦",
mapsto: "↦",
mapstodown: "↧",
mapstoleft: "↤",
mapstoup: "↥",
marker: "▮",
mcomma: "⨩",
Mcy: "М",
mcy: "м",
mdash: "—",
mDDot: "∺",
measuredangle: "∡",
MediumSpace: " ",
Mellintrf: "ℳ",
Mfr: "𝔐",
mfr: "𝔪",
mho: "℧",
micro: "µ",
midast: "*",
midcir: "⫰",
mid: "∣",
middot: "·",
minusb: "⊟",
minus: "−",
minusd: "∸",
minusdu: "⨪",
MinusPlus: "∓",
mlcp: "⫛",
mldr: "…",
mnplus: "∓",
models: "⊧",
Mopf: "𝕄",
mopf: "𝕞",
mp: "∓",
mscr: "𝓂",
Mscr: "ℳ",
mstpos: "∾",
Mu: "Μ",
mu: "μ",
multimap: "⊸",
mumap: "⊸",
nabla: "∇",
Nacute: "Ń",
nacute: "ń",
nang: "∠⃒",
nap: "≉",
napE: "⩰̸",
napid: "≋̸",
napos: "ŉ",
napprox: "≉",
natural: "♮",
naturals: "ℕ",
natur: "♮",
nbsp: " ",
nbump: "≎̸",
nbumpe: "≏̸",
ncap: "⩃",
Ncaron: "Ň",
ncaron: "ň",
Ncedil: "Ņ",
ncedil: "ņ",
ncong: "≇",
ncongdot: "⩭̸",
ncup: "⩂",
Ncy: "Н",
ncy: "н",
ndash: "–",
nearhk: "⤤",
nearr: "↗",
neArr: "⇗",
nearrow: "↗",
ne: "≠",
nedot: "≐̸",
NegativeMediumSpace: "​",
NegativeThickSpace: "​",
NegativeThinSpace: "​",
NegativeVeryThinSpace: "​",
nequiv: "≢",
nesear: "⤨",
nesim: "≂̸",
NestedGreaterGreater: "≫",
NestedLessLess: "≪",
NewLine: "\n",
nexist: "∄",
nexists: "∄",
Nfr: "𝔑",
nfr: "𝔫",
ngE: "≧̸",
nge: "≱",
ngeq: "≱",
ngeqq: "≧̸",
ngeqslant: "⩾̸",
nges: "⩾̸",
nGg: "⋙̸",
ngsim: "≵",
nGt: "≫⃒",
ngt: "≯",
ngtr: "≯",
nGtv: "≫̸",
nharr: "↮",
nhArr: "⇎",
nhpar: "⫲",
ni: "∋",
nis: "⋼",
nisd: "⋺",
niv: "∋",
NJcy: "Њ",
njcy: "њ",
nlarr: "↚",
nlArr: "⇍",
nldr: "‥",
nlE: "≦̸",
nle: "≰",
nleftarrow: "↚",
nLeftarrow: "⇍",
nleftrightarrow: "↮",
nLeftrightarrow: "⇎",
nleq: "≰",
nleqq: "≦̸",
nleqslant: "⩽̸",
nles: "⩽̸",
nless: "≮",
nLl: "⋘̸",
nlsim: "≴",
nLt: "≪⃒",
nlt: "≮",
nltri: "⋪",
nltrie: "⋬",
nLtv: "≪̸",
nmid: "∤",
NoBreak: "⁠",
NonBreakingSpace: " ",
nopf: "𝕟",
Nopf: "ℕ",
Not: "⫬",
not: "¬",
NotCongruent: "≢",
NotCupCap: "≭",
NotDoubleVerticalBar: "∦",
NotElement: "∉",
NotEqual: "≠",
NotEqualTilde: "≂̸",
NotExists: "∄",
NotGreater: "≯",
NotGreaterEqual: "≱",
NotGreaterFullEqual: "≧̸",
NotGreaterGreater: "≫̸",
NotGreaterLess: "≹",
NotGreaterSlantEqual: "⩾̸",
NotGreaterTilde: "≵",
NotHumpDownHump: "≎̸",
NotHumpEqual: "≏̸",
notin: "∉",
notindot: "⋵̸",
notinE: "⋹̸",
notinva: "∉",
notinvb: "⋷",
notinvc: "⋶",
NotLeftTriangleBar: "⧏̸",
NotLeftTriangle: "⋪",
NotLeftTriangleEqual: "⋬",
NotLess: "≮",
NotLessEqual: "≰",
NotLessGreater: "≸",
NotLessLess: "≪̸",
NotLessSlantEqual: "⩽̸",
NotLessTilde: "≴",
NotNestedGreaterGreater: "⪢̸",
NotNestedLessLess: "⪡̸",
notni: "∌",
notniva: "∌",
notnivb: "⋾",
notnivc: "⋽",
NotPrecedes: "⊀",
NotPrecedesEqual: "⪯̸",
NotPrecedesSlantEqual: "⋠",
NotReverseElement: "∌",
NotRightTriangleBar: "⧐̸",
NotRightTriangle: "⋫",
NotRightTriangleEqual: "⋭",
NotSquareSubset: "⊏̸",
NotSquareSubsetEqual: "⋢",
NotSquareSuperset: "⊐̸",
NotSquareSupersetEqual: "⋣",
NotSubset: "⊂⃒",
NotSubsetEqual: "⊈",
NotSucceeds: "⊁",
NotSucceedsEqual: "⪰̸",
NotSucceedsSlantEqual: "⋡",
NotSucceedsTilde: "≿̸",
NotSuperset: "⊃⃒",
NotSupersetEqual: "⊉",
NotTilde: "≁",
NotTildeEqual: "≄",
NotTildeFullEqual: "≇",
NotTildeTilde: "≉",
NotVerticalBar: "∤",
nparallel: "∦",
npar: "∦",
nparsl: "⫽⃥",
npart: "∂̸",
npolint: "⨔",
npr: "⊀",
nprcue: "⋠",
nprec: "⊀",
npreceq: "⪯̸",
npre: "⪯̸",
nrarrc: "⤳̸",
nrarr: "↛",
nrArr: "⇏",
nrarrw: "↝̸",
nrightarrow: "↛",
nRightarrow: "⇏",
nrtri: "⋫",
nrtrie: "⋭",
nsc: "⊁",
nsccue: "⋡",
nsce: "⪰̸",
Nscr: "𝒩",
nscr: "𝓃",
nshortmid: "∤",
nshortparallel: "∦",
nsim: "≁",
nsime: "≄",
nsimeq: "≄",
nsmid: "∤",
nspar: "∦",
nsqsube: "⋢",
nsqsupe: "⋣",
nsub: "⊄",
nsubE: "⫅̸",
nsube: "⊈",
nsubset: "⊂⃒",
nsubseteq: "⊈",
nsubseteqq: "⫅̸",
nsucc: "⊁",
nsucceq: "⪰̸",
nsup: "⊅",
nsupE: "⫆̸",
nsupe: "⊉",
nsupset: "⊃⃒",
nsupseteq: "⊉",
nsupseteqq: "⫆̸",
ntgl: "≹",
Ntilde: "Ñ",
ntilde: "ñ",
ntlg: "≸",
ntriangleleft: "⋪",
ntrianglelefteq: "⋬",
ntriangleright: "⋫",
ntrianglerighteq: "⋭",
Nu: "Ν",
nu: "ν",
num: "#",
numero: "№",
numsp: " ",
nvap: "≍⃒",
nvdash: "⊬",
nvDash: "⊭",
nVdash: "⊮",
nVDash: "⊯",
nvge: "≥⃒",
nvgt: ">⃒",
nvHarr: "⤄",
nvinfin: "⧞",
nvlArr: "⤂",
nvle: "≤⃒",
nvlt: "<⃒",
nvltrie: "⊴⃒",
nvrArr: "⤃",
nvrtrie: "⊵⃒",
nvsim: "∼⃒",
nwarhk: "⤣",
nwarr: "↖",
nwArr: "⇖",
nwarrow: "↖",
nwnear: "⤧",
Oacute: "Ó",
oacute: "ó",
oast: "⊛",
Ocirc: "Ô",
ocirc: "ô",
ocir: "⊚",
Ocy: "О",
ocy: "о",
odash: "⊝",
Odblac: "Ő",
odblac: "ő",
odiv: "⨸",
odot: "⊙",
odsold: "⦼",
OElig: "Œ",
oelig: "œ",
ofcir: "⦿",
Ofr: "𝔒",
ofr: "𝔬",
ogon: "˛",
Ograve: "Ò",
ograve: "ò",
ogt: "⧁",
ohbar: "⦵",
ohm: "Ω",
oint: "∮",
olarr: "↺",
olcir: "⦾",
olcross: "⦻",
oline: "‾",
olt: "⧀",
Omacr: "Ō",
omacr: "ō",
Omega: "Ω",
omega: "ω",
Omicron: "Ο",
omicron: "ο",
omid: "⦶",
ominus: "⊖",
Oopf: "𝕆",
oopf: "𝕠",
opar: "⦷",
OpenCurlyDoubleQuote: "“",
OpenCurlyQuote: "‘",
operp: "⦹",
oplus: "⊕",
orarr: "↻",
Or: "⩔",
or: "∨",
ord: "⩝",
order: "ℴ",
orderof: "ℴ",
ordf: "ª",
ordm: "º",
origof: "⊶",
oror: "⩖",
orslope: "⩗",
orv: "⩛",
oS: "Ⓢ",
Oscr: "𝒪",
oscr: "ℴ",
Oslash: "Ø",
oslash: "ø",
osol: "⊘",
Otilde: "Õ",
otilde: "õ",
otimesas: "⨶",
Otimes: "⨷",
otimes: "⊗",
Ouml: "Ö",
ouml: "ö",
ovbar: "⌽",
OverBar: "‾",
OverBrace: "⏞",
OverBracket: "⎴",
OverParenthesis: "⏜",
para: "¶",
parallel: "∥",
par: "∥",
parsim: "⫳",
parsl: "⫽",
part: "∂",
PartialD: "∂",
Pcy: "П",
pcy: "п",
percnt: "%",
period: ".",
permil: "‰",
perp: "⊥",
pertenk: "‱",
Pfr: "𝔓",
pfr: "𝔭",
Phi: "Φ",
phi: "φ",
phiv: "ϕ",
phmmat: "ℳ",
phone: "☎",
Pi: "Π",
pi: "π",
pitchfork: "⋔",
piv: "ϖ",
planck: "ℏ",
planckh: "ℎ",
plankv: "ℏ",
plusacir: "⨣",
plusb: "⊞",
pluscir: "⨢",
plus: "+",
plusdo: "∔",
plusdu: "⨥",
pluse: "⩲",
PlusMinus: "±",
plusmn: "±",
plussim: "⨦",
plustwo: "⨧",
pm: "±",
Poincareplane: "ℌ",
pointint: "⨕",
popf: "𝕡",
Popf: "ℙ",
pound: "£",
prap: "⪷",
Pr: "⪻",
pr: "≺",
prcue: "≼",
precapprox: "⪷",
prec: "≺",
preccurlyeq: "≼",
Precedes: "≺",
PrecedesEqual: "⪯",
PrecedesSlantEqual: "≼",
PrecedesTilde: "≾",
preceq: "⪯",
precnapprox: "⪹",
precneqq: "⪵",
precnsim: "⋨",
pre: "⪯",
prE: "⪳",
precsim: "≾",
prime: "′",
Prime: "″",
primes: "ℙ",
prnap: "⪹",
prnE: "⪵",
prnsim: "⋨",
prod: "∏",
Product: "∏",
profalar: "⌮",
profline: "⌒",
profsurf: "⌓",
prop: "∝",
Proportional: "∝",
Proportion: "∷",
propto: "∝",
prsim: "≾",
prurel: "⊰",
Pscr: "𝒫",
pscr: "𝓅",
Psi: "Ψ",
psi: "ψ",
puncsp: " ",
Qfr: "𝔔",
qfr: "𝔮",
qint: "⨌",
qopf: "𝕢",
Qopf: "ℚ",
qprime: "⁗",
Qscr: "𝒬",
qscr: "𝓆",
quaternions: "ℍ",
quatint: "⨖",
quest: "?",
questeq: "≟",
quot: '"',
QUOT: '"',
rAarr: "⇛",
race: "∽̱",
Racute: "Ŕ",
racute: "ŕ",
radic: "√",
raemptyv: "⦳",
rang: "⟩",
Rang: "⟫",
rangd: "⦒",
range: "⦥",
rangle: "⟩",
raquo: "»",
rarrap: "⥵",
rarrb: "⇥",
rarrbfs: "⤠",
rarrc: "⤳",
rarr: "→",
Rarr: "↠",
rArr: "⇒",
rarrfs: "⤞",
rarrhk: "↪",
rarrlp: "↬",
rarrpl: "⥅",
rarrsim: "⥴",
Rarrtl: "⤖",
rarrtl: "↣",
rarrw: "↝",
ratail: "⤚",
rAtail: "⤜",
ratio: "∶",
rationals: "ℚ",
rbarr: "⤍",
rBarr: "⤏",
RBarr: "⤐",
rbbrk: "❳",
rbrace: "}",
rbrack: "]",
rbrke: "⦌",
rbrksld: "⦎",
rbrkslu: "⦐",
Rcaron: "Ř",
rcaron: "ř",
Rcedil: "Ŗ",
rcedil: "ŗ",
rceil: "⌉",
rcub: "}",
Rcy: "Р",
rcy: "р",
rdca: "⤷",
rdldhar: "⥩",
rdquo: "”",
rdquor: "”",
rdsh: "↳",
real: "ℜ",
realine: "ℛ",
realpart: "ℜ",
reals: "ℝ",
Re: "ℜ",
rect: "▭",
reg: "®",
REG: "®",
ReverseElement: "∋",
ReverseEquilibrium: "⇋",
ReverseUpEquilibrium: "⥯",
rfisht: "⥽",
rfloor: "⌋",
rfr: "𝔯",
Rfr: "ℜ",
rHar: "⥤",
rhard: "⇁",
rharu: "⇀",
rharul: "⥬",
Rho: "Ρ",
rho: "ρ",
rhov: "ϱ",
RightAngleBracket: "⟩",
RightArrowBar: "⇥",
rightarrow: "→",
RightArrow: "→",
Rightarrow: "⇒",
RightArrowLeftArrow: "⇄",
rightarrowtail: "↣",
RightCeiling: "⌉",
RightDoubleBracket: "⟧",
RightDownTeeVector: "⥝",
RightDownVectorBar: "⥕",
RightDownVector: "⇂",
RightFloor: "⌋",
rightharpoondown: "⇁",
rightharpoonup: "⇀",
rightleftarrows: "⇄",
rightleftharpoons: "⇌",
rightrightarrows: "⇉",
rightsquigarrow: "↝",
RightTeeArrow: "↦",
RightTee: "⊢",
RightTeeVector: "⥛",
rightthreetimes: "⋌",
RightTriangleBar: "⧐",
RightTriangle: "⊳",
RightTriangleEqual: "⊵",
RightUpDownVector: "⥏",
RightUpTeeVector: "⥜",
RightUpVectorBar: "⥔",
RightUpVector: "↾",
RightVectorBar: "⥓",
RightVector: "⇀",
ring: "˚",
risingdotseq: "≓",
rlarr: "⇄",
rlhar: "⇌",
rlm: "‏",
rmoustache: "⎱",
rmoust: "⎱",
rnmid: "⫮",
roang: "⟭",
roarr: "⇾",
robrk: "⟧",
ropar: "⦆",
ropf: "𝕣",
Ropf: "ℝ",
roplus: "⨮",
rotimes: "⨵",
RoundImplies: "⥰",
rpar: ")",
rpargt: "⦔",
rppolint: "⨒",
rrarr: "⇉",
Rrightarrow: "⇛",
rsaquo: "›",
rscr: "𝓇",
Rscr: "ℛ",
rsh: "↱",
Rsh: "↱",
rsqb: "]",
rsquo: "’",
rsquor: "’",
rthree: "⋌",
rtimes: "⋊",
rtri: "▹",
rtrie: "⊵",
rtrif: "▸",
rtriltri: "⧎",
RuleDelayed: "⧴",
ruluhar: "⥨",
rx: "℞",
Sacute: "Ś",
sacute: "ś",
sbquo: "‚",
scap: "⪸",
Scaron: "Š",
scaron: "š",
Sc: "⪼",
sc: "≻",
sccue: "≽",
sce: "⪰",
scE: "⪴",
Scedil: "Ş",
scedil: "ş",
Scirc: "Ŝ",
scirc: "ŝ",
scnap: "⪺",
scnE: "⪶",
scnsim: "⋩",
scpolint: "⨓",
scsim: "≿",
Scy: "С",
scy: "с",
sdotb: "⊡",
sdot: "⋅",
sdote: "⩦",
searhk: "⤥",
searr: "↘",
seArr: "⇘",
searrow: "↘",
sect: "§",
semi: ";",
seswar: "⤩",
setminus: "∖",
setmn: "∖",
sext: "✶",
Sfr: "𝔖",
sfr: "𝔰",
sfrown: "⌢",
sharp: "♯",
SHCHcy: "Щ",
shchcy: "щ",
SHcy: "Ш",
shcy: "ш",
ShortDownArrow: "↓",
ShortLeftArrow: "←",
shortmid: "∣",
shortparallel: "∥",
ShortRightArrow: "→",
ShortUpArrow: "↑",
shy: "­",
Sigma: "Σ",
sigma: "σ",
sigmaf: "ς",
sigmav: "ς",
sim: "∼",
simdot: "⩪",
sime: "≃",
simeq: "≃",
simg: "⪞",
simgE: "⪠",
siml: "⪝",
simlE: "⪟",
simne: "≆",
simplus: "⨤",
simrarr: "⥲",
slarr: "←",
SmallCircle: "∘",
smallsetminus: "∖",
smashp: "⨳",
smeparsl: "⧤",
smid: "∣",
smile: "⌣",
smt: "⪪",
smte: "⪬",
smtes: "⪬︀",
SOFTcy: "Ь",
softcy: "ь",
solbar: "⌿",
solb: "⧄",
sol: "/",
Sopf: "𝕊",
sopf: "𝕤",
spades: "♠",
spadesuit: "♠",
spar: "∥",
sqcap: "⊓",
sqcaps: "⊓︀",
sqcup: "⊔",
sqcups: "⊔︀",
Sqrt: "√",
sqsub: "⊏",
sqsube: "⊑",
sqsubset: "⊏",
sqsubseteq: "⊑",
sqsup: "⊐",
sqsupe: "⊒",
sqsupset: "⊐",
sqsupseteq: "⊒",
square: "□",
Square: "□",
SquareIntersection: "⊓",
SquareSubset: "⊏",
SquareSubsetEqual: "⊑",
SquareSuperset: "⊐",
SquareSupersetEqual: "⊒",
SquareUnion: "⊔",
squarf: "▪",
squ: "□",
squf: "▪",
srarr: "→",
Sscr: "𝒮",
sscr: "𝓈",
ssetmn: "∖",
ssmile: "⌣",
sstarf: "⋆",
Star: "⋆",
star: "☆",
starf: "★",
straightepsilon: "ϵ",
straightphi: "ϕ",
strns: "¯",
sub: "⊂",
Sub: "⋐",
subdot: "⪽",
subE: "⫅",
sube: "⊆",
subedot: "⫃",
submult: "⫁",
subnE: "⫋",
subne: "⊊",
subplus: "⪿",
subrarr: "⥹",
subset: "⊂",
Subset: "⋐",
subseteq: "⊆",
subseteqq: "⫅",
SubsetEqual: "⊆",
subsetneq: "⊊",
subsetneqq: "⫋",
subsim: "⫇",
subsub: "⫕",
subsup: "⫓",
succapprox: "⪸",
succ: "≻",
succcurlyeq: "≽",
Succeeds: "≻",
SucceedsEqual: "⪰",
SucceedsSlantEqual: "≽",
SucceedsTilde: "≿",
succeq: "⪰",
succnapprox: "⪺",
succneqq: "⪶",
succnsim: "⋩",
succsim: "≿",
SuchThat: "∋",
sum: "∑",
Sum: "∑",
sung: "♪",
sup1: "¹",
sup2: "²",
sup3: "³",
sup: "⊃",
Sup: "⋑",
supdot: "⪾",
supdsub: "⫘",
supE: "⫆",
supe: "⊇",
supedot: "⫄",
Superset: "⊃",
SupersetEqual: "⊇",
suphsol: "⟉",
suphsub: "⫗",
suplarr: "⥻",
supmult: "⫂",
supnE: "⫌",
supne: "⊋",
supplus: "⫀",
supset: "⊃",
Supset: "⋑",
supseteq: "⊇",
supseteqq: "⫆",
supsetneq: "⊋",
supsetneqq: "⫌",
supsim: "⫈",
supsub: "⫔",
supsup: "⫖",
swarhk: "⤦",
swarr: "↙",
swArr: "⇙",
swarrow: "↙",
swnwar: "⤪",
szlig: "ß",
Tab: "	",
target: "⌖",
Tau: "Τ",
tau: "τ",
tbrk: "⎴",
Tcaron: "Ť",
tcaron: "ť",
Tcedil: "Ţ",
tcedil: "ţ",
Tcy: "Т",
tcy: "т",
tdot: "⃛",
telrec: "⌕",
Tfr: "𝔗",
tfr: "𝔱",
there4: "∴",
therefore: "∴",
Therefore: "∴",
Theta: "Θ",
theta: "θ",
thetasym: "ϑ",
thetav: "ϑ",
thickapprox: "≈",
thicksim: "∼",
ThickSpace: "  ",
ThinSpace: " ",
thinsp: " ",
thkap: "≈",
thksim: "∼",
THORN: "Þ",
thorn: "þ",
tilde: "˜",
Tilde: "∼",
TildeEqual: "≃",
TildeFullEqual: "≅",
TildeTilde: "≈",
timesbar: "⨱",
timesb: "⊠",
times: "×",
timesd: "⨰",
tint: "∭",
toea: "⤨",
topbot: "⌶",
topcir: "⫱",
top: "⊤",
Topf: "𝕋",
topf: "𝕥",
topfork: "⫚",
tosa: "⤩",
tprime: "‴",
trade: "™",
TRADE: "™",
triangle: "▵",
triangledown: "▿",
triangleleft: "◃",
trianglelefteq: "⊴",
triangleq: "≜",
triangleright: "▹",
trianglerighteq: "⊵",
tridot: "◬",
trie: "≜",
triminus: "⨺",
TripleDot: "⃛",
triplus: "⨹",
trisb: "⧍",
tritime: "⨻",
trpezium: "⏢",
Tscr: "𝒯",
tscr: "𝓉",
TScy: "Ц",
tscy: "ц",
TSHcy: "Ћ",
tshcy: "ћ",
Tstrok: "Ŧ",
tstrok: "ŧ",
twixt: "≬",
twoheadleftarrow: "↞",
twoheadrightarrow: "↠",
Uacute: "Ú",
uacute: "ú",
uarr: "↑",
Uarr: "↟",
uArr: "⇑",
Uarrocir: "⥉",
Ubrcy: "Ў",
ubrcy: "ў",
Ubreve: "Ŭ",
ubreve: "ŭ",
Ucirc: "Û",
ucirc: "û",
Ucy: "У",
ucy: "у",
udarr: "⇅",
Udblac: "Ű",
udblac: "ű",
udhar: "⥮",
ufisht: "⥾",
Ufr: "𝔘",
ufr: "𝔲",
Ugrave: "Ù",
ugrave: "ù",
uHar: "⥣",
uharl: "↿",
uharr: "↾",
uhblk: "▀",
ulcorn: "⌜",
ulcorner: "⌜",
ulcrop: "⌏",
ultri: "◸",
Umacr: "Ū",
umacr: "ū",
uml: "¨",
UnderBar: "_",
UnderBrace: "⏟",
UnderBracket: "⎵",
UnderParenthesis: "⏝",
Union: "⋃",
UnionPlus: "⊎",
Uogon: "Ų",
uogon: "ų",
Uopf: "𝕌",
uopf: "𝕦",
UpArrowBar: "⤒",
uparrow: "↑",
UpArrow: "↑",
Uparrow: "⇑",
UpArrowDownArrow: "⇅",
updownarrow: "↕",
UpDownArrow: "↕",
Updownarrow: "⇕",
UpEquilibrium: "⥮",
upharpoonleft: "↿",
upharpoonright: "↾",
uplus: "⊎",
UpperLeftArrow: "↖",
UpperRightArrow: "↗",
upsi: "υ",
Upsi: "ϒ",
upsih: "ϒ",
Upsilon: "Υ",
upsilon: "υ",
UpTeeArrow: "↥",
UpTee: "⊥",
upuparrows: "⇈",
urcorn: "⌝",
urcorner: "⌝",
urcrop: "⌎",
Uring: "Ů",
uring: "ů",
urtri: "◹",
Uscr: "𝒰",
uscr: "𝓊",
utdot: "⋰",
Utilde: "Ũ",
utilde: "ũ",
utri: "▵",
utrif: "▴",
uuarr: "⇈",
Uuml: "Ü",
uuml: "ü",
uwangle: "⦧",
vangrt: "⦜",
varepsilon: "ϵ",
varkappa: "ϰ",
varnothing: "∅",
varphi: "ϕ",
varpi: "ϖ",
varpropto: "∝",
varr: "↕",
vArr: "⇕",
varrho: "ϱ",
varsigma: "ς",
varsubsetneq: "⊊︀",
varsubsetneqq: "⫋︀",
varsupsetneq: "⊋︀",
varsupsetneqq: "⫌︀",
vartheta: "ϑ",
vartriangleleft: "⊲",
vartriangleright: "⊳",
vBar: "⫨",
Vbar: "⫫",
vBarv: "⫩",
Vcy: "В",
vcy: "в",
vdash: "⊢",
vDash: "⊨",
Vdash: "⊩",
VDash: "⊫",
Vdashl: "⫦",
veebar: "⊻",
vee: "∨",
Vee: "⋁",
veeeq: "≚",
vellip: "⋮",
verbar: "|",
Verbar: "‖",
vert: "|",
Vert: "‖",
VerticalBar: "∣",
VerticalLine: "|",
VerticalSeparator: "❘",
VerticalTilde: "≀",
VeryThinSpace: " ",
Vfr: "𝔙",
vfr: "𝔳",
vltri: "⊲",
vnsub: "⊂⃒",
vnsup: "⊃⃒",
Vopf: "𝕍",
vopf: "𝕧",
vprop: "∝",
vrtri: "⊳",
Vscr: "𝒱",
vscr: "𝓋",
vsubnE: "⫋︀",
vsubne: "⊊︀",
vsupnE: "⫌︀",
vsupne: "⊋︀",
Vvdash: "⊪",
vzigzag: "⦚",
Wcirc: "Ŵ",
wcirc: "ŵ",
wedbar: "⩟",
wedge: "∧",
Wedge: "⋀",
wedgeq: "≙",
weierp: "℘",
Wfr: "𝔚",
wfr: "𝔴",
Wopf: "𝕎",
wopf: "𝕨",
wp: "℘",
wr: "≀",
wreath: "≀",
Wscr: "𝒲",
wscr: "𝓌",
xcap: "⋂",
xcirc: "◯",
xcup: "⋃",
xdtri: "▽",
Xfr: "𝔛",
xfr: "𝔵",
xharr: "⟷",
xhArr: "⟺",
Xi: "Ξ",
xi: "ξ",
xlarr: "⟵",
xlArr: "⟸",
xmap: "⟼",
xnis: "⋻",
xodot: "⨀",
Xopf: "𝕏",
xopf: "𝕩",
xoplus: "⨁",
xotime: "⨂",
xrarr: "⟶",
xrArr: "⟹",
Xscr: "𝒳",
xscr: "𝓍",
xsqcup: "⨆",
xuplus: "⨄",
xutri: "△",
xvee: "⋁",
xwedge: "⋀",
Yacute: "Ý",
yacute: "ý",
YAcy: "Я",
yacy: "я",
Ycirc: "Ŷ",
ycirc: "ŷ",
Ycy: "Ы",
ycy: "ы",
yen: "¥",
Yfr: "𝔜",
yfr: "𝔶",
YIcy: "Ї",
yicy: "ї",
Yopf: "𝕐",
yopf: "𝕪",
Yscr: "𝒴",
yscr: "𝓎",
YUcy: "Ю",
yucy: "ю",
yuml: "ÿ",
Yuml: "Ÿ",
Zacute: "Ź",
zacute: "ź",
Zcaron: "Ž",
zcaron: "ž",
Zcy: "З",
zcy: "з",
Zdot: "Ż",
zdot: "ż",
zeetrf: "ℨ",
ZeroWidthSpace: "​",
Zeta: "Ζ",
zeta: "ζ",
zfr: "𝔷",
Zfr: "ℨ",
ZHcy: "Ж",
zhcy: "ж",
zigrarr: "⇝",
zopf: "𝕫",
Zopf: "ℤ",
Zscr: "𝒵",
zscr: "𝓏",
zwj: "‍",
zwnj: "‌"
};
}, function(e, t) {
"use strict";
e.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDE38-\uDE3D]|\uD805[\uDCC6\uDDC1-\uDDC9\uDE41-\uDE43]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F/;
}, function(e, t, r) {
"use strict";
e.exports.encode = r(260), e.exports.decode = r(261), e.exports.format = r(262), 
e.exports.parse = r(263);
}, function(e, t) {
"use strict";
function r(e) {
var t, r, n = i[e];
if (n) return n;
for (n = i[e] = [], t = 0; 128 > t; t++) r = String.fromCharCode(t), /^[0-9a-z]$/i.test(r) ? n.push(r) : n.push("%" + ("0" + t.toString(16).toUpperCase()).slice(-2));
for (t = 0; t < e.length; t++) n[e.charCodeAt(t)] = e[t];
return n;
}
function n(e, t, i) {
var o, a, s, l, c, u = "";
for ("string" != typeof t && (i = t, t = n.defaultChars), void 0 === i && (i = !0), 
c = r(t), o = 0, a = e.length; a > o; o++) if (s = e.charCodeAt(o), i && 37 === s && a > o + 2 && /^[0-9a-f]{2}$/i.test(e.slice(o + 1, o + 3))) u += e.slice(o, o + 3), 
o += 2; else if (128 > s) u += c[s]; else if (s >= 55296 && 57343 >= s) {
if (s >= 55296 && 56319 >= s && a > o + 1 && (l = e.charCodeAt(o + 1), l >= 56320 && 57343 >= l)) {
u += encodeURIComponent(e[o] + e[o + 1]), o++;
continue;
}
u += "%EF%BF%BD";
} else u += encodeURIComponent(e[o]);
return u;
}
var i = {};
n.defaultChars = ";/?:@&=+$,-_.!~*'()#", n.componentChars = "-_.!~*'()", e.exports = n;
}, function(e, t) {
"use strict";
function r(e) {
var t, r, n = i[e];
if (n) return n;
for (n = i[e] = [], t = 0; 128 > t; t++) r = String.fromCharCode(t), n.push(r);
for (t = 0; t < e.length; t++) r = e.charCodeAt(t), n[r] = "%" + ("0" + r.toString(16).toUpperCase()).slice(-2);
return n;
}
function n(e, t) {
var i;
return "string" != typeof t && (t = n.defaultChars), i = r(t), e.replace(/(%[a-f0-9]{2})+/gi, function(e) {
var t, r, n, o, a, s, l, c = "";
for (t = 0, r = e.length; r > t; t += 3) n = parseInt(e.slice(t + 1, t + 3), 16), 
128 > n ? c += i[n] : 192 === (224 & n) && r > t + 3 && (o = parseInt(e.slice(t + 4, t + 6), 16), 
128 === (192 & o)) ? (l = n << 6 & 1984 | 63 & o, c += 128 > l ? "��" : String.fromCharCode(l), 
t += 3) : 224 === (240 & n) && r > t + 6 && (o = parseInt(e.slice(t + 4, t + 6), 16), 
a = parseInt(e.slice(t + 7, t + 9), 16), 128 === (192 & o) && 128 === (192 & a)) ? (l = n << 12 & 61440 | o << 6 & 4032 | 63 & a, 
c += 2048 > l || l >= 55296 && 57343 >= l ? "���" : String.fromCharCode(l), t += 6) : 240 === (248 & n) && r > t + 9 && (o = parseInt(e.slice(t + 4, t + 6), 16), 
a = parseInt(e.slice(t + 7, t + 9), 16), s = parseInt(e.slice(t + 10, t + 12), 16), 
128 === (192 & o) && 128 === (192 & a) && 128 === (192 & s)) ? (l = n << 18 & 1835008 | o << 12 & 258048 | a << 6 & 4032 | 63 & s, 
65536 > l || l > 1114111 ? c += "����" : (l -= 65536, c += String.fromCharCode(55296 + (l >> 10), 56320 + (1023 & l))), 
t += 9) : c += "�";
return c;
});
}
var i = {};
n.defaultChars = ";/?:@&=+$,#", n.componentChars = "", e.exports = n;
}, function(e, t) {
"use strict";
e.exports = function(e) {
var t = "";
return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", 
t += e.hostname && -1 !== e.hostname.indexOf(":") ? "[" + e.hostname + "]" : e.hostname || "", 
t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "";
};
}, function(e, t) {
"use strict";
function r() {
this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, 
this.hash = null, this.search = null, this.pathname = null;
}
function n(e, t) {
if (e && e instanceof r) return e;
var n = new r();
return n.parse(e, t), n;
}
var i = /^([a-z0-9.+-]+:)/i, o = /:[0-9]*$/, a = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, s = [ "<", ">", '"', "`", " ", "\r", "\n", "	" ], l = [ "{", "}", "|", "\\", "^", "`" ].concat(s), c = [ "'" ].concat(l), u = [ "%", "/", "?", ";", "#" ].concat(c), h = [ "/", "?", "#" ], f = 255, d = /^[+a-z0-9A-Z_-]{0,63}$/, p = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, m = {
javascript: !0,
"javascript:": !0
}, g = {
http: !0,
https: !0,
ftp: !0,
gopher: !0,
file: !0,
"http:": !0,
"https:": !0,
"ftp:": !0,
"gopher:": !0,
"file:": !0
};
r.prototype.parse = function(e, t) {
var r, n, o, s, l, c = e;
if (c = c.trim(), !t && 1 === e.split("#").length) {
var v = a.exec(c);
if (v) return this.pathname = v[1], v[2] && (this.search = v[2]), this;
}
var b = i.exec(c);
if (b && (b = b[0], o = b.toLowerCase(), this.protocol = b, c = c.substr(b.length)), 
(t || b || c.match(/^\/\/[^@\/]+@[^@\/]+/)) && (l = "//" === c.substr(0, 2), !l || b && m[b] || (c = c.substr(2), 
this.slashes = !0)), !m[b] && (l || b && !g[b])) {
var y = -1;
for (r = 0; r < h.length; r++) s = c.indexOf(h[r]), -1 !== s && (-1 === y || y > s) && (y = s);
var x, k;
for (k = -1 === y ? c.lastIndexOf("@") : c.lastIndexOf("@", y), -1 !== k && (x = c.slice(0, k), 
c = c.slice(k + 1), this.auth = x), y = -1, r = 0; r < u.length; r++) s = c.indexOf(u[r]), 
-1 !== s && (-1 === y || y > s) && (y = s);
-1 === y && (y = c.length), ":" === c[y - 1] && y--;
var w = c.slice(0, y);
c = c.slice(y), this.parseHost(w), this.hostname = this.hostname || "";
var C = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
if (!C) {
var S = this.hostname.split(/\./);
for (r = 0, n = S.length; n > r; r++) {
var _ = S[r];
if (_ && !_.match(d)) {
for (var A = "", L = 0, T = _.length; T > L; L++) A += _.charCodeAt(L) > 127 ? "x" : _[L];
if (!A.match(d)) {
var E = S.slice(0, r), M = S.slice(r + 1), D = _.match(p);
D && (E.push(D[1]), M.unshift(D[2])), M.length && (c = M.join(".") + c), this.hostname = E.join(".");
break;
}
}
}
}
this.hostname.length > f && (this.hostname = ""), C && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
}
var N = c.indexOf("#");
-1 !== N && (this.hash = c.substr(N), c = c.slice(0, N));
var O = c.indexOf("?");
return -1 !== O && (this.search = c.substr(O), c = c.slice(0, O)), c && (this.pathname = c), 
g[o] && this.hostname && !this.pathname && (this.pathname = ""), this;
}, r.prototype.parseHost = function(e) {
var t = o.exec(e);
t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), 
e && (this.hostname = e);
}, e.exports = n;
}, function(e, t, r) {
"use strict";
e.exports.Any = r(265), e.exports.Cc = r(266), e.exports.Cf = r(267), e.exports.P = r(258), 
e.exports.Z = r(268);
}, function(e, t) {
"use strict";
e.exports = /[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF]/;
}, function(e, t) {
"use strict";
e.exports = /[\0-\x1F\x7F-\x9F]/;
}, function(e, t) {
"use strict";
e.exports = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
}, function(e, t) {
"use strict";
e.exports = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
}, function(e, t, r) {
"use strict";
t.parseLinkLabel = r(270), t.parseLinkDestination = r(271), t.parseLinkTitle = r(272);
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
var n, i, o, a, s = -1, l = e.posMax, c = e.pos;
for (e.pos = t + 1, n = 1; e.pos < l; ) {
if (o = e.src.charCodeAt(e.pos), 93 === o && (n--, 0 === n)) {
i = !0;
break;
}
if (a = e.pos, e.md.inline.skipToken(e), 91 === o) if (a === e.pos - 1) n++; else if (r) return e.pos = c, 
-1;
}
return i && (s = e.pos), e.pos = c, s;
};
}, function(e, t, r) {
"use strict";
var n = r(255).isSpace, i = r(255).unescapeAll;
e.exports = function(e, t, r) {
var o, a, s = 0, l = t, c = {
ok: !1,
pos: 0,
lines: 0,
str: ""
};
if (60 === e.charCodeAt(t)) {
for (t++; r > t; ) {
if (o = e.charCodeAt(t), 10 === o || n(o)) return c;
if (62 === o) return c.pos = t + 1, c.str = i(e.slice(l + 1, t)), c.ok = !0, c;
92 === o && r > t + 1 ? t += 2 : t++;
}
return c;
}
for (a = 0; r > t && (o = e.charCodeAt(t), 32 !== o) && !(32 > o || 127 === o); ) if (92 === o && r > t + 1) t += 2; else {
if (40 === o && (a++, a > 1)) break;
if (41 === o && (a--, 0 > a)) break;
t++;
}
return l === t ? c : (c.str = i(e.slice(l, t)), c.lines = s, c.pos = t, c.ok = !0, 
c);
};
}, function(e, t, r) {
"use strict";
var n = r(255).unescapeAll;
e.exports = function(e, t, r) {
var i, o, a = 0, s = t, l = {
ok: !1,
pos: 0,
lines: 0,
str: ""
};
if (t >= r) return l;
if (o = e.charCodeAt(t), 34 !== o && 39 !== o && 40 !== o) return l;
for (t++, 40 === o && (o = 41); r > t; ) {
if (i = e.charCodeAt(t), i === o) return l.pos = t + 1, l.lines = a, l.str = n(e.slice(s + 1, t)), 
l.ok = !0, l;
10 === i ? a++ : 92 === i && r > t + 1 && (t++, 10 === e.charCodeAt(t) && a++), 
t++;
}
return l;
};
}, function(e, t, r) {
"use strict";
function n() {
this.rules = i({}, s);
}
var i = r(255).assign, o = r(255).unescapeAll, a = r(255).escapeHtml, s = {};
s.code_inline = function(e, t) {
return "<code>" + a(e[t].content) + "</code>";
}, s.code_block = function(e, t) {
return "<pre><code>" + a(e[t].content) + "</code></pre>\n";
}, s.fence = function(e, t, r, n, i) {
var s, l = e[t], c = l.info ? o(l.info).trim() : "", u = "";
return c && (u = c.split(/\s+/g)[0], l.attrJoin("class", r.langPrefix + u)), s = r.highlight ? r.highlight(l.content, u) || a(l.content) : a(l.content), 
0 === s.indexOf("<pre") ? s + "\n" : "<pre><code" + i.renderAttrs(l) + ">" + s + "</code></pre>\n";
}, s.image = function(e, t, r, n, i) {
var o = e[t];
return o.attrs[o.attrIndex("alt")][1] = i.renderInlineAsText(o.children, r, n), 
i.renderToken(e, t, r);
}, s.hardbreak = function(e, t, r) {
return r.xhtmlOut ? "<br />\n" : "<br>\n";
}, s.softbreak = function(e, t, r) {
return r.breaks ? r.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
}, s.text = function(e, t) {
return a(e[t].content);
}, s.html_block = function(e, t) {
return e[t].content;
}, s.html_inline = function(e, t) {
return e[t].content;
}, n.prototype.renderAttrs = function(e) {
var t, r, n;
if (!e.attrs) return "";
for (n = "", t = 0, r = e.attrs.length; r > t; t++) n += " " + a(e.attrs[t][0]) + '="' + a(e.attrs[t][1]) + '"';
return n;
}, n.prototype.renderToken = function(e, t, r) {
var n, i = "", o = !1, a = e[t];
return a.hidden ? "" : (a.block && -1 !== a.nesting && t && e[t - 1].hidden && (i += "\n"), 
i += (-1 === a.nesting ? "</" : "<") + a.tag, i += this.renderAttrs(a), 0 === a.nesting && r.xhtmlOut && (i += " /"), 
a.block && (o = !0, 1 === a.nesting && t + 1 < e.length && (n = e[t + 1], "inline" === n.type || n.hidden ? o = !1 : -1 === n.nesting && n.tag === a.tag && (o = !1))), 
i += o ? ">\n" : ">");
}, n.prototype.renderInline = function(e, t, r) {
for (var n, i = "", o = this.rules, a = 0, s = e.length; s > a; a++) n = e[a].type, 
i += void 0 !== o[n] ? o[n](e, a, t, r, this) : this.renderToken(e, a, t);
return i;
}, n.prototype.renderInlineAsText = function(e, t, r) {
for (var n = "", i = this.rules, o = 0, a = e.length; a > o; o++) "text" === e[o].type ? n += i.text(e, o, t, r, this) : "image" === e[o].type && (n += this.renderInlineAsText(e[o].children, t, r));
return n;
}, n.prototype.render = function(e, t, r) {
var n, i, o, a = "", s = this.rules;
for (n = 0, i = e.length; i > n; n++) o = e[n].type, a += "inline" === o ? this.renderInline(e[n].children, t, r) : void 0 !== s[o] ? s[e[n].type](e, n, t, r, this) : this.renderToken(e, n, t, r);
return a;
}, e.exports = n;
}, function(e, t, r) {
"use strict";
function n() {
this.ruler = new i();
for (var e = 0; e < o.length; e++) this.ruler.push(o[e][0], o[e][1]);
}
var i = r(275), o = [ [ "normalize", r(276) ], [ "block", r(277) ], [ "inline", r(278) ], [ "linkify", r(279) ], [ "replacements", r(280) ], [ "smartquotes", r(281) ] ];
n.prototype.process = function(e) {
var t, r, n;
for (n = this.ruler.getRules(""), t = 0, r = n.length; r > t; t++) n[t](e);
}, n.prototype.State = r(282), e.exports = n;
}, function(e, t) {
"use strict";
function r() {
this.__rules__ = [], this.__cache__ = null;
}
r.prototype.__find__ = function(e) {
for (var t = 0; t < this.__rules__.length; t++) if (this.__rules__[t].name === e) return t;
return -1;
}, r.prototype.__compile__ = function() {
var e = this, t = [ "" ];
e.__rules__.forEach(function(e) {
e.enabled && e.alt.forEach(function(e) {
t.indexOf(e) < 0 && t.push(e);
});
}), e.__cache__ = {}, t.forEach(function(t) {
e.__cache__[t] = [], e.__rules__.forEach(function(r) {
r.enabled && (t && r.alt.indexOf(t) < 0 || e.__cache__[t].push(r.fn));
});
});
}, r.prototype.at = function(e, t, r) {
var n = this.__find__(e), i = r || {};
if (-1 === n) throw Error("Parser rule not found: " + e);
this.__rules__[n].fn = t, this.__rules__[n].alt = i.alt || [], this.__cache__ = null;
}, r.prototype.before = function(e, t, r, n) {
var i = this.__find__(e), o = n || {};
if (-1 === i) throw Error("Parser rule not found: " + e);
this.__rules__.splice(i, 0, {
name: t,
enabled: !0,
fn: r,
alt: o.alt || []
}), this.__cache__ = null;
}, r.prototype.after = function(e, t, r, n) {
var i = this.__find__(e), o = n || {};
if (-1 === i) throw Error("Parser rule not found: " + e);
this.__rules__.splice(i + 1, 0, {
name: t,
enabled: !0,
fn: r,
alt: o.alt || []
}), this.__cache__ = null;
}, r.prototype.push = function(e, t, r) {
var n = r || {};
this.__rules__.push({
name: e,
enabled: !0,
fn: t,
alt: n.alt || []
}), this.__cache__ = null;
}, r.prototype.enable = function(e, t) {
Array.isArray(e) || (e = [ e ]);
var r = [];
return e.forEach(function(e) {
var n = this.__find__(e);
if (0 > n) {
if (t) return;
throw Error("Rules manager: invalid rule name " + e);
}
this.__rules__[n].enabled = !0, r.push(e);
}, this), this.__cache__ = null, r;
}, r.prototype.enableOnly = function(e, t) {
Array.isArray(e) || (e = [ e ]), this.__rules__.forEach(function(e) {
e.enabled = !1;
}), this.enable(e, t);
}, r.prototype.disable = function(e, t) {
Array.isArray(e) || (e = [ e ]);
var r = [];
return e.forEach(function(e) {
var n = this.__find__(e);
if (0 > n) {
if (t) return;
throw Error("Rules manager: invalid rule name " + e);
}
this.__rules__[n].enabled = !1, r.push(e);
}, this), this.__cache__ = null, r;
}, r.prototype.getRules = function(e) {
return null === this.__cache__ && this.__compile__(), this.__cache__[e] || [];
}, e.exports = r;
}, function(e, t) {
"use strict";
var r = /\r[\n\u0085]|[\u2424\u2028\u0085]/g, n = /\u0000/g;
e.exports = function(e) {
var t;
t = e.src.replace(r, "\n"), t = t.replace(n, "�"), e.src = t;
};
}, function(e, t) {
"use strict";
e.exports = function(e) {
var t;
e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [ 0, 1 ], 
t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
};
}, function(e, t) {
"use strict";
e.exports = function(e) {
var t, r, n, i = e.tokens;
for (r = 0, n = i.length; n > r; r++) t = i[r], "inline" === t.type && e.md.inline.parse(t.content, e.md, e.env, t.children);
};
}, function(e, t, r) {
"use strict";
function n(e) {
return /^<a[>\s]/i.test(e);
}
function i(e) {
return /^<\/a\s*>/i.test(e);
}
var o = r(255).arrayReplaceAt;
e.exports = function(e) {
var t, r, a, s, l, c, u, h, f, d, p, m, g, v, b, y, x, k = e.tokens;
if (e.md.options.linkify) for (r = 0, a = k.length; a > r; r++) if ("inline" === k[r].type && e.md.linkify.pretest(k[r].content)) for (s = k[r].children, 
g = 0, t = s.length - 1; t >= 0; t--) if (c = s[t], "link_close" !== c.type) {
if ("html_inline" === c.type && (n(c.content) && g > 0 && g--, i(c.content) && g++), 
!(g > 0) && "text" === c.type && e.md.linkify.test(c.content)) {
for (f = c.content, x = e.md.linkify.match(f), u = [], m = c.level, p = 0, h = 0; h < x.length; h++) v = x[h].url, 
b = e.md.normalizeLink(v), e.md.validateLink(b) && (y = x[h].text, y = x[h].schema ? "mailto:" !== x[h].schema || /^mailto:/i.test(y) ? e.md.normalizeLinkText(y) : e.md.normalizeLinkText("mailto:" + y).replace(/^mailto:/, "") : e.md.normalizeLinkText("http://" + y).replace(/^http:\/\//, ""), 
d = x[h].index, d > p && (l = new e.Token("text", "", 0), l.content = f.slice(p, d), 
l.level = m, u.push(l)), l = new e.Token("link_open", "a", 1), l.attrs = [ [ "href", b ] ], 
l.level = m++, l.markup = "linkify", l.info = "auto", u.push(l), l = new e.Token("text", "", 0), 
l.content = y, l.level = m, u.push(l), l = new e.Token("link_close", "a", -1), l.level = --m, 
l.markup = "linkify", l.info = "auto", u.push(l), p = x[h].lastIndex);
p < f.length && (l = new e.Token("text", "", 0), l.content = f.slice(p), l.level = m, 
u.push(l)), k[r].children = s = o(s, t, u);
}
} else for (t--; s[t].level !== c.level && "link_open" !== s[t].type; ) t--;
};
}, function(e, t) {
"use strict";
function r(e, t) {
return l[t.toLowerCase()];
}
function n(e) {
var t, n;
for (t = e.length - 1; t >= 0; t--) n = e[t], "text" === n.type && (n.content = n.content.replace(s, r));
}
function i(e) {
var t, r;
for (t = e.length - 1; t >= 0; t--) r = e[t], "text" === r.type && o.test(r.content) && (r.content = r.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1—$2").replace(/(^|\s)--(\s|$)/gm, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1–$2"));
}
var o = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, a = /\((c|tm|r|p)\)/i, s = /\((c|tm|r|p)\)/gi, l = {
c: "©",
r: "®",
p: "§",
tm: "™"
};
e.exports = function(e) {
var t;
if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && (a.test(e.tokens[t].content) && n(e.tokens[t].children), 
o.test(e.tokens[t].content) && i(e.tokens[t].children));
};
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
return e.substr(0, t) + r + e.substr(t + 1);
}
function i(e, t) {
var r, i, l, h, f, d, p, m, g, v, b, y, x, k, w, C, S, _, A, L, T;
for (A = [], r = 0; r < e.length; r++) {
for (i = e[r], p = e[r].level, S = A.length - 1; S >= 0 && !(A[S].level <= p); S--) ;
if (A.length = S + 1, "text" === i.type) {
l = i.content, f = 0, d = l.length;
e: for (;d > f && (c.lastIndex = f, h = c.exec(l)); ) {
if (w = C = !0, f = h.index + 1, _ = "'" === h[0], g = 32, h.index - 1 >= 0) g = l.charCodeAt(h.index - 1); else for (S = r - 1; S >= 0; S--) if ("text" === e[S].type) {
g = e[S].content.charCodeAt(e[S].content.length - 1);
break;
}
if (v = 32, d > f) v = l.charCodeAt(f); else for (S = r + 1; S < e.length; S++) if ("text" === e[S].type) {
v = e[S].content.charCodeAt(0);
break;
}
if (b = s(g) || a(String.fromCharCode(g)), y = s(v) || a(String.fromCharCode(v)), 
x = o(g), k = o(v), k ? w = !1 : y && (x || b || (w = !1)), x ? C = !1 : b && (k || y || (C = !1)), 
34 === v && '"' === h[0] && g >= 48 && 57 >= g && (C = w = !1), w && C && (w = !1, 
C = y), w || C) {
if (C) for (S = A.length - 1; S >= 0 && (m = A[S], !(A[S].level < p)); S--) if (m.single === _ && A[S].level === p) {
m = A[S], _ ? (L = t.md.options.quotes[2], T = t.md.options.quotes[3]) : (L = t.md.options.quotes[0], 
T = t.md.options.quotes[1]), i.content = n(i.content, h.index, T), e[m.token].content = n(e[m.token].content, m.pos, L), 
f += T.length - 1, m.token === r && (f += L.length - 1), l = i.content, d = l.length, 
A.length = S;
continue e;
}
w ? A.push({
token: r,
pos: h.index,
single: _,
level: p
}) : C && _ && (i.content = n(i.content, h.index, u));
} else _ && (i.content = n(i.content, h.index, u));
}
}
}
}
var o = r(255).isWhiteSpace, a = r(255).isPunctChar, s = r(255).isMdAsciiPunct, l = /['"]/, c = /['"]/g, u = "’";
e.exports = function(e) {
var t;
if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && l.test(e.tokens[t].content) && i(e.tokens[t].children, e);
};
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
this.src = e, this.env = r, this.tokens = [], this.inlineMode = !1, this.md = t;
}
var i = r(283);
n.prototype.Token = i, e.exports = n;
}, function(e, t) {
"use strict";
function r(e, t, r) {
this.type = e, this.tag = t, this.attrs = null, this.map = null, this.nesting = r, 
this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", 
this.meta = null, this.block = !1, this.hidden = !1;
}
r.prototype.attrIndex = function(e) {
var t, r, n;
if (!this.attrs) return -1;
for (t = this.attrs, r = 0, n = t.length; n > r; r++) if (t[r][0] === e) return r;
return -1;
}, r.prototype.attrPush = function(e) {
this.attrs ? this.attrs.push(e) : this.attrs = [ e ];
}, r.prototype.attrSet = function(e, t) {
var r = this.attrIndex(e), n = [ e, t ];
0 > r ? this.attrPush(n) : this.attrs[r] = n;
}, r.prototype.attrJoin = function(e, t) {
var r = this.attrIndex(e);
0 > r ? this.attrPush([ e, t ]) : this.attrs[r][1] = this.attrs[r][1] + " " + t;
}, e.exports = r;
}, function(e, t, r) {
"use strict";
function n() {
this.ruler = new i();
for (var e = 0; e < o.length; e++) this.ruler.push(o[e][0], o[e][1], {
alt: (o[e][2] || []).slice()
});
}
var i = r(275), o = [ [ "table", r(285), [ "paragraph", "reference" ] ], [ "code", r(286) ], [ "fence", r(287), [ "paragraph", "reference", "blockquote", "list" ] ], [ "blockquote", r(288), [ "paragraph", "reference", "list" ] ], [ "hr", r(289), [ "paragraph", "reference", "blockquote", "list" ] ], [ "list", r(290), [ "paragraph", "reference", "blockquote" ] ], [ "reference", r(291) ], [ "heading", r(292), [ "paragraph", "reference", "blockquote" ] ], [ "lheading", r(293) ], [ "html_block", r(294), [ "paragraph", "reference", "blockquote" ] ], [ "paragraph", r(297) ] ];
n.prototype.tokenize = function(e, t, r) {
for (var n, i, o = this.ruler.getRules(""), a = o.length, s = t, l = !1, c = e.md.options.maxNesting; r > s && (e.line = s = e.skipEmptyLines(s), 
!(s >= r)) && !(e.sCount[s] < e.blkIndent); ) {
if (e.level >= c) {
e.line = r;
break;
}
for (i = 0; a > i && !(n = o[i](e, s, r, !1)); i++) ;
if (e.tight = !l, e.isEmpty(e.line - 1) && (l = !0), s = e.line, r > s && e.isEmpty(s)) {
if (l = !0, s++, r > s && "list" === e.parentType && e.isEmpty(s)) break;
e.line = s;
}
}
}, n.prototype.parse = function(e, t, r, n) {
var i;
return e ? (i = new this.State(e, t, r, n), void this.tokenize(i, i.line, i.lineMax)) : [];
}, n.prototype.State = r(298), e.exports = n;
}, function(e, t) {
"use strict";
function r(e, t) {
var r = e.bMarks[t] + e.blkIndent, n = e.eMarks[t];
return e.src.substr(r, n - r);
}
function n(e) {
var t, r = [], n = 0, i = e.length, o = 0, a = 0, s = !1, l = 0;
for (t = e.charCodeAt(n); i > n; ) 96 === t && o % 2 === 0 ? (s = !s, l = n) : 124 !== t || o % 2 !== 0 || s ? 92 === t ? o++ : o = 0 : (r.push(e.substring(a, n)), 
a = n + 1), n++, n === i && s && (s = !1, n = l + 1), t = e.charCodeAt(n);
return r.push(e.substring(a)), r;
}
e.exports = function(e, t, i, o) {
var a, s, l, c, u, h, f, d, p, m, g, v;
if (t + 2 > i) return !1;
if (u = t + 1, e.sCount[u] < e.blkIndent) return !1;
if (l = e.bMarks[u] + e.tShift[u], l >= e.eMarks[u]) return !1;
if (a = e.src.charCodeAt(l), 124 !== a && 45 !== a && 58 !== a) return !1;
if (s = r(e, t + 1), !/^[-:| ]+$/.test(s)) return !1;
for (h = s.split("|"), p = [], c = 0; c < h.length; c++) {
if (m = h[c].trim(), !m) {
if (0 === c || c === h.length - 1) continue;
return !1;
}
if (!/^:?-+:?$/.test(m)) return !1;
58 === m.charCodeAt(m.length - 1) ? p.push(58 === m.charCodeAt(0) ? "center" : "right") : 58 === m.charCodeAt(0) ? p.push("left") : p.push("");
}
if (s = r(e, t).trim(), -1 === s.indexOf("|")) return !1;
if (h = n(s.replace(/^\||\|$/g, "")), f = h.length, f > p.length) return !1;
if (o) return !0;
for (d = e.push("table_open", "table", 1), d.map = g = [ t, 0 ], d = e.push("thead_open", "thead", 1), 
d.map = [ t, t + 1 ], d = e.push("tr_open", "tr", 1), d.map = [ t, t + 1 ], c = 0; c < h.length; c++) d = e.push("th_open", "th", 1), 
d.map = [ t, t + 1 ], p[c] && (d.attrs = [ [ "style", "text-align:" + p[c] ] ]), 
d = e.push("inline", "", 0), d.content = h[c].trim(), d.map = [ t, t + 1 ], d.children = [], 
d = e.push("th_close", "th", -1);
for (d = e.push("tr_close", "tr", -1), d = e.push("thead_close", "thead", -1), d = e.push("tbody_open", "tbody", 1), 
d.map = v = [ t + 2, 0 ], u = t + 2; i > u && !(e.sCount[u] < e.blkIndent) && (s = r(e, u).trim(), 
-1 !== s.indexOf("|")); u++) {
for (h = n(s.replace(/^\||\|$/g, "")), d = e.push("tr_open", "tr", 1), c = 0; f > c; c++) d = e.push("td_open", "td", 1), 
p[c] && (d.attrs = [ [ "style", "text-align:" + p[c] ] ]), d = e.push("inline", "", 0), 
d.content = h[c] ? h[c].trim() : "", d.children = [], d = e.push("td_close", "td", -1);
d = e.push("tr_close", "tr", -1);
}
return d = e.push("tbody_close", "tbody", -1), d = e.push("table_close", "table", -1), 
g[1] = v[1] = u, e.line = u, !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
var n, i, o, a = 0;
if (e.sCount[t] - e.blkIndent < 4) return !1;
for (i = n = t + 1; r > n; ) if (e.isEmpty(n)) {
if (a++, a >= 2 && "list" === e.parentType) break;
n++;
} else {
if (a = 0, !(e.sCount[n] - e.blkIndent >= 4)) break;
n++, i = n;
}
return e.line = i, o = e.push("code_block", "code", 0), o.content = e.getLines(t, i, 4 + e.blkIndent, !0), 
o.map = [ t, e.line ], !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r, n) {
var i, o, a, s, l, c, u, h = !1, f = e.bMarks[t] + e.tShift[t], d = e.eMarks[t];
if (f + 3 > d) return !1;
if (i = e.src.charCodeAt(f), 126 !== i && 96 !== i) return !1;
if (l = f, f = e.skipChars(f, i), o = f - l, 3 > o) return !1;
if (u = e.src.slice(l, f), a = e.src.slice(f, d), a.indexOf("`") >= 0) return !1;
if (n) return !0;
for (s = t; (s++, !(s >= r)) && (f = l = e.bMarks[s] + e.tShift[s], d = e.eMarks[s], 
!(d > f && e.sCount[s] < e.blkIndent)); ) if (e.src.charCodeAt(f) === i && !(e.sCount[s] - e.blkIndent >= 4 || (f = e.skipChars(f, i), 
o > f - l || (f = e.skipSpaces(f), d > f)))) {
h = !0;
break;
}
return o = e.sCount[t], e.line = s + (h ? 1 : 0), c = e.push("fence", "code", 0), 
c.info = a, c.content = e.getLines(t + 1, s, o, !0), c.markup = u, c.map = [ t, e.line ], 
!0;
};
}, function(e, t, r) {
"use strict";
var n = r(255).isSpace;
e.exports = function(e, t, r, i) {
var o, a, s, l, c, u, h, f, d, p, m, g, v, b, y, x, k = e.bMarks[t] + e.tShift[t], w = e.eMarks[t];
if (62 !== e.src.charCodeAt(k++)) return !1;
if (i) return !0;
for (32 === e.src.charCodeAt(k) && k++, u = e.blkIndent, e.blkIndent = 0, d = p = e.sCount[t] + k - (e.bMarks[t] + e.tShift[t]), 
c = [ e.bMarks[t] ], e.bMarks[t] = k; w > k && (m = e.src.charCodeAt(k), n(m)); ) 9 === m ? p += 4 - p % 4 : p++, 
k++;
for (a = k >= w, l = [ e.sCount[t] ], e.sCount[t] = p - d, s = [ e.tShift[t] ], 
e.tShift[t] = k - e.bMarks[t], g = e.md.block.ruler.getRules("blockquote"), o = t + 1; r > o && !(e.sCount[o] < u) && (k = e.bMarks[o] + e.tShift[o], 
w = e.eMarks[o], !(k >= w)); o++) if (62 !== e.src.charCodeAt(k++)) {
if (a) break;
for (x = !1, b = 0, y = g.length; y > b; b++) if (g[b](e, o, r, !0)) {
x = !0;
break;
}
if (x) break;
c.push(e.bMarks[o]), s.push(e.tShift[o]), l.push(e.sCount[o]), e.sCount[o] = -1;
} else {
for (32 === e.src.charCodeAt(k) && k++, d = p = e.sCount[o] + k - (e.bMarks[o] + e.tShift[o]), 
c.push(e.bMarks[o]), e.bMarks[o] = k; w > k && (m = e.src.charCodeAt(k), n(m)); ) 9 === m ? p += 4 - p % 4 : p++, 
k++;
a = k >= w, l.push(e.sCount[o]), e.sCount[o] = p - d, s.push(e.tShift[o]), e.tShift[o] = k - e.bMarks[o];
}
for (h = e.parentType, e.parentType = "blockquote", v = e.push("blockquote_open", "blockquote", 1), 
v.markup = ">", v.map = f = [ t, 0 ], e.md.block.tokenize(e, t, o), v = e.push("blockquote_close", "blockquote", -1), 
v.markup = ">", e.parentType = h, f[1] = e.line, b = 0; b < s.length; b++) e.bMarks[b + t] = c[b], 
e.tShift[b + t] = s[b], e.sCount[b + t] = l[b];
return e.blkIndent = u, !0;
};
}, function(e, t, r) {
"use strict";
var n = r(255).isSpace;
e.exports = function(e, t, r, i) {
var o, a, s, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (o = e.src.charCodeAt(c++), 42 !== o && 45 !== o && 95 !== o) return !1;
for (a = 1; u > c; ) {
if (s = e.src.charCodeAt(c++), s !== o && !n(s)) return !1;
s === o && a++;
}
return 3 > a ? !1 : i ? !0 : (e.line = t + 1, l = e.push("hr", "hr", 0), l.map = [ t, e.line ], 
l.markup = Array(a + 1).join(String.fromCharCode(o)), !0);
};
}, function(e, t, r) {
"use strict";
function n(e, t) {
var r, n, i, o;
return n = e.bMarks[t] + e.tShift[t], i = e.eMarks[t], r = e.src.charCodeAt(n++), 
42 !== r && 45 !== r && 43 !== r ? -1 : i > n && (o = e.src.charCodeAt(n), !a(o)) ? -1 : n;
}
function i(e, t) {
var r, n = e.bMarks[t] + e.tShift[t], i = n, o = e.eMarks[t];
if (i + 1 >= o) return -1;
if (r = e.src.charCodeAt(i++), 48 > r || r > 57) return -1;
for (;;) {
if (i >= o) return -1;
r = e.src.charCodeAt(i++);
{
if (!(r >= 48 && 57 >= r)) {
if (41 === r || 46 === r) break;
return -1;
}
if (i - n >= 10) return -1;
}
}
return o > i && (r = e.src.charCodeAt(i), !a(r)) ? -1 : i;
}
function o(e, t) {
var r, n, i = e.level + 2;
for (r = t + 2, n = e.tokens.length - 2; n > r; r++) e.tokens[r].level === i && "paragraph_open" === e.tokens[r].type && (e.tokens[r + 2].hidden = !0, 
e.tokens[r].hidden = !0, r += 2);
}
var a = r(255).isSpace;
e.exports = function(e, t, r, s) {
var l, c, u, h, f, d, p, m, g, v, b, y, x, k, w, C, S, _, A, L, T, E, M, D, N, O, I, F, P = !0;
if ((b = i(e, t)) >= 0) _ = !0; else {
if (!((b = n(e, t)) >= 0)) return !1;
_ = !1;
}
if (S = e.src.charCodeAt(b - 1), s) return !0;
for (L = e.tokens.length, _ ? (v = e.bMarks[t] + e.tShift[t], C = +e.src.substr(v, b - v - 1), 
N = e.push("ordered_list_open", "ol", 1), 1 !== C && (N.attrs = [ [ "start", C ] ])) : N = e.push("bullet_list_open", "ul", 1), 
N.map = E = [ t, 0 ], N.markup = String.fromCharCode(S), l = t, T = !1, D = e.md.block.ruler.getRules("list"); r > l; ) {
for (x = b, k = e.eMarks[l], c = u = e.sCount[l] + b - (e.bMarks[t] + e.tShift[t]); k > x && (y = e.src.charCodeAt(x), 
a(y)); ) 9 === y ? u += 4 - u % 4 : u++, x++;
if (A = x, w = A >= k ? 1 : u - c, w > 4 && (w = 1), h = c + w, N = e.push("list_item_open", "li", 1), 
N.markup = String.fromCharCode(S), N.map = M = [ t, 0 ], d = e.blkIndent, m = e.tight, 
f = e.tShift[t], p = e.sCount[t], g = e.parentType, e.blkIndent = h, e.tight = !0, 
e.parentType = "list", e.tShift[t] = A - e.bMarks[t], e.sCount[t] = u, A >= k && e.isEmpty(t + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, t, r, !0), 
(!e.tight || T) && (P = !1), T = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = d, 
e.tShift[t] = f, e.sCount[t] = p, e.tight = m, e.parentType = g, N = e.push("list_item_close", "li", -1), 
N.markup = String.fromCharCode(S), l = t = e.line, M[1] = l, A = e.bMarks[t], l >= r) break;
if (e.isEmpty(l)) break;
if (e.sCount[l] < e.blkIndent) break;
for (F = !1, O = 0, I = D.length; I > O; O++) if (D[O](e, l, r, !0)) {
F = !0;
break;
}
if (F) break;
if (_) {
if (b = i(e, l), 0 > b) break;
} else if (b = n(e, l), 0 > b) break;
if (S !== e.src.charCodeAt(b - 1)) break;
}
return N = _ ? e.push("ordered_list_close", "ol", -1) : e.push("bullet_list_close", "ul", -1), 
N.markup = String.fromCharCode(S), E[1] = l, e.line = l, P && o(e, L), !0;
};
}, function(e, t, r) {
"use strict";
var n = r(271), i = r(272), o = r(255).normalizeReference, a = r(255).isSpace;
e.exports = function(e, t, r, s) {
var l, c, u, h, f, d, p, m, g, v, b, y, x, k, w, C = 0, S = e.bMarks[t] + e.tShift[t], _ = e.eMarks[t], A = t + 1;
if (91 !== e.src.charCodeAt(S)) return !1;
for (;++S < _; ) if (93 === e.src.charCodeAt(S) && 92 !== e.src.charCodeAt(S - 1)) {
if (S + 1 === _) return !1;
if (58 !== e.src.charCodeAt(S + 1)) return !1;
break;
}
for (h = e.lineMax, k = e.md.block.ruler.getRules("reference"); h > A && !e.isEmpty(A); A++) if (!(e.sCount[A] - e.blkIndent > 3 || e.sCount[A] < 0)) {
for (x = !1, d = 0, p = k.length; p > d; d++) if (k[d](e, A, h, !0)) {
x = !0;
break;
}
if (x) break;
}
for (y = e.getLines(t, A, e.blkIndent, !1).trim(), _ = y.length, S = 1; _ > S; S++) {
if (l = y.charCodeAt(S), 91 === l) return !1;
if (93 === l) {
g = S;
break;
}
10 === l ? C++ : 92 === l && (S++, _ > S && 10 === y.charCodeAt(S) && C++);
}
if (0 > g || 58 !== y.charCodeAt(g + 1)) return !1;
for (S = g + 2; _ > S; S++) if (l = y.charCodeAt(S), 10 === l) C++; else if (!a(l)) break;
if (v = n(y, S, _), !v.ok) return !1;
if (f = e.md.normalizeLink(v.str), !e.md.validateLink(f)) return !1;
for (S = v.pos, C += v.lines, c = S, u = C, b = S; _ > S; S++) if (l = y.charCodeAt(S), 
10 === l) C++; else if (!a(l)) break;
for (v = i(y, S, _), _ > S && b !== S && v.ok ? (w = v.str, S = v.pos, C += v.lines) : (w = "", 
S = c, C = u); _ > S && (l = y.charCodeAt(S), a(l)); ) S++;
if (_ > S && 10 !== y.charCodeAt(S) && w) for (w = "", S = c, C = u; _ > S && (l = y.charCodeAt(S), 
a(l)); ) S++;
return _ > S && 10 !== y.charCodeAt(S) ? !1 : (m = o(y.slice(1, g))) ? s ? !0 : (void 0 === e.env.references && (e.env.references = {}), 
void 0 === e.env.references[m] && (e.env.references[m] = {
title: w,
href: f
}), e.line = t + C + 1, !0) : !1;
};
}, function(e, t, r) {
"use strict";
var n = r(255).isSpace;
e.exports = function(e, t, r, i) {
var o, a, s, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (o = e.src.charCodeAt(c), 35 !== o || c >= u) return !1;
for (a = 1, o = e.src.charCodeAt(++c); 35 === o && u > c && 6 >= a; ) a++, o = e.src.charCodeAt(++c);
return a > 6 || u > c && 32 !== o ? !1 : i ? !0 : (u = e.skipSpacesBack(u, c), s = e.skipCharsBack(u, 35, c), 
s > c && n(e.src.charCodeAt(s - 1)) && (u = s), e.line = t + 1, l = e.push("heading_open", "h" + (a + ""), 1), 
l.markup = "########".slice(0, a), l.map = [ t, e.line ], l = e.push("inline", "", 0), 
l.content = e.src.slice(c, u).trim(), l.map = [ t, e.line ], l.children = [], l = e.push("heading_close", "h" + (a + ""), -1), 
l.markup = "########".slice(0, a), !0);
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
for (var n, i, o, a, s, l, c, u, h, f = t + 1, d = e.md.block.ruler.getRules("paragraph"); r > f && !e.isEmpty(f); f++) if (!(e.sCount[f] - e.blkIndent > 3)) {
if (e.sCount[f] >= e.blkIndent && (l = e.bMarks[f] + e.tShift[f], c = e.eMarks[f], 
c > l && (h = e.src.charCodeAt(l), (45 === h || 61 === h) && (l = e.skipChars(l, h), 
l = e.skipSpaces(l), l >= c)))) {
u = 61 === h ? 1 : 2;
break;
}
if (!(e.sCount[f] < 0)) {
for (i = !1, o = 0, a = d.length; a > o; o++) if (d[o](e, f, r, !0)) {
i = !0;
break;
}
if (i) break;
}
}
return u ? (n = e.getLines(t, f, e.blkIndent, !1).trim(), e.line = f + 1, s = e.push("heading_open", "h" + (u + ""), 1), 
s.markup = String.fromCharCode(h), s.map = [ t, e.line ], s = e.push("inline", "", 0), 
s.content = n, s.map = [ t, e.line - 1 ], s.children = [], s = e.push("heading_close", "h" + (u + ""), -1), 
s.markup = String.fromCharCode(h), !0) : !1;
};
}, function(e, t, r) {
"use strict";
var n = r(295), i = r(296).HTML_OPEN_CLOSE_TAG_RE, o = [ [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, !0 ], [ /^<!--/, /-->/, !0 ], [ /^<\?/, /\?>/, !0 ], [ /^<![A-Z]/, />/, !0 ], [ /^<!\[CDATA\[/, /\]\]>/, !0 ], [ RegExp("^</?(" + n.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0 ], [ RegExp(i.source + "\\s*$"), /^$/, !1 ] ];
e.exports = function(e, t, r, n) {
var i, a, s, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (!e.md.options.html) return !1;
if (60 !== e.src.charCodeAt(c)) return !1;
for (l = e.src.slice(c, u), i = 0; i < o.length && !o[i][0].test(l); i++) ;
if (i === o.length) return !1;
if (n) return o[i][2];
if (a = t + 1, !o[i][1].test(l)) for (;r > a && !(e.sCount[a] < e.blkIndent); a++) if (c = e.bMarks[a] + e.tShift[a], 
u = e.eMarks[a], l = e.src.slice(c, u), o[i][1].test(l)) {
0 !== l.length && a++;
break;
}
return e.line = a, s = e.push("html_block", "", 0), s.map = [ t, a ], s.content = e.getLines(t, a, e.blkIndent, !0), 
!0;
};
}, function(e, t) {
"use strict";
e.exports = [ "address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "meta", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "pre", "section", "source", "title", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul" ];
}, function(e, t) {
"use strict";
var r = "[a-zA-Z_:][a-zA-Z0-9:._-]*", n = "[^\"'=<>`\\x00-\\x20]+", i = "'[^']*'", o = '"[^"]*"', a = "(?:" + n + "|" + i + "|" + o + ")", s = "(?:\\s+" + r + "(?:\\s*=\\s*" + a + ")?)", l = "<[A-Za-z][A-Za-z0-9\\-]*" + s + "*\\s*\\/?>", c = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", u = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", h = "<[?].*?[?]>", f = "<![A-Z]+\\s+[^>]*>", d = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", p = RegExp("^(?:" + l + "|" + c + "|" + u + "|" + h + "|" + f + "|" + d + ")"), m = RegExp("^(?:" + l + "|" + c + ")");
e.exports.HTML_TAG_RE = p, e.exports.HTML_OPEN_CLOSE_TAG_RE = m;
}, function(e, t) {
"use strict";
e.exports = function(e, t) {
for (var r, n, i, o, a, s = t + 1, l = e.md.block.ruler.getRules("paragraph"), c = e.lineMax; c > s && !e.isEmpty(s); s++) if (!(e.sCount[s] - e.blkIndent > 3 || e.sCount[s] < 0)) {
for (n = !1, i = 0, o = l.length; o > i; i++) if (l[i](e, s, c, !0)) {
n = !0;
break;
}
if (n) break;
}
return r = e.getLines(t, s, e.blkIndent, !1).trim(), e.line = s, a = e.push("paragraph_open", "p", 1), 
a.map = [ t, e.line ], a = e.push("inline", "", 0), a.content = r, a.map = [ t, e.line ], 
a.children = [], a = e.push("paragraph_close", "p", -1), !0;
};
}, function(e, t, r) {
"use strict";
function n(e, t, r, n) {
var i, a, s, l, c, u, h, f;
for (this.src = e, this.md = t, this.env = r, this.tokens = n, this.bMarks = [], 
this.eMarks = [], this.tShift = [], this.sCount = [], this.blkIndent = 0, this.line = 0, 
this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, 
this.level = 0, this.result = "", a = this.src, f = !1, s = l = u = h = 0, c = a.length; c > l; l++) {
if (i = a.charCodeAt(l), !f) {
if (o(i)) {
u++, 9 === i ? h += 4 - h % 4 : h++;
continue;
}
f = !0;
}
(10 === i || l === c - 1) && (10 !== i && l++, this.bMarks.push(s), this.eMarks.push(l), 
this.tShift.push(u), this.sCount.push(h), f = !1, u = 0, h = 0, s = l + 1);
}
this.bMarks.push(a.length), this.eMarks.push(a.length), this.tShift.push(0), this.sCount.push(0), 
this.lineMax = this.bMarks.length - 1;
}
var i = r(283), o = r(255).isSpace;
n.prototype.push = function(e, t, r) {
var n = new i(e, t, r);
return n.block = !0, 0 > r && this.level--, n.level = this.level, r > 0 && this.level++, 
this.tokens.push(n), n;
}, n.prototype.isEmpty = function(e) {
return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
}, n.prototype.skipEmptyLines = function(e) {
for (var t = this.lineMax; t > e && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++) ;
return e;
}, n.prototype.skipSpaces = function(e) {
for (var t, r = this.src.length; r > e && (t = this.src.charCodeAt(e), o(t)); e++) ;
return e;
}, n.prototype.skipSpacesBack = function(e, t) {
if (t >= e) return e;
for (;e > t; ) if (!o(this.src.charCodeAt(--e))) return e + 1;
return e;
}, n.prototype.skipChars = function(e, t) {
for (var r = this.src.length; r > e && this.src.charCodeAt(e) === t; e++) ;
return e;
}, n.prototype.skipCharsBack = function(e, t, r) {
if (r >= e) return e;
for (;e > r; ) if (t !== this.src.charCodeAt(--e)) return e + 1;
return e;
}, n.prototype.getLines = function(e, t, r, n) {
var i, a, s, l, c, u, h, f = e;
if (e >= t) return "";
for (u = Array(t - e), i = 0; t > f; f++, i++) {
for (a = 0, h = l = this.bMarks[f], c = t > f + 1 || n ? this.eMarks[f] + 1 : this.eMarks[f]; c > l && r > a; ) {
if (s = this.src.charCodeAt(l), o(s)) 9 === s ? a += 4 - a % 4 : a++; else {
if (!(l - h < this.tShift[f])) break;
a++;
}
l++;
}
u[i] = this.src.slice(l, c);
}
return u.join("");
}, n.prototype.Token = i, e.exports = n;
}, function(e, t, r) {
"use strict";
function n() {
var e;
for (this.ruler = new i(), e = 0; e < o.length; e++) this.ruler.push(o[e][0], o[e][1]);
for (this.ruler2 = new i(), e = 0; e < a.length; e++) this.ruler2.push(a[e][0], a[e][1]);
}
var i = r(275), o = [ [ "text", r(300) ], [ "newline", r(301) ], [ "escape", r(302) ], [ "backticks", r(303) ], [ "strikethrough", r(304).tokenize ], [ "emphasis", r(305).tokenize ], [ "link", r(306) ], [ "image", r(307) ], [ "autolink", r(308) ], [ "html_inline", r(310) ], [ "entity", r(311) ] ], a = [ [ "balance_pairs", r(312) ], [ "strikethrough", r(304).postProcess ], [ "emphasis", r(305).postProcess ], [ "text_collapse", r(313) ] ];
n.prototype.skipToken = function(e) {
var t, r, n = e.pos, i = this.ruler.getRules(""), o = i.length, a = e.md.options.maxNesting, s = e.cache;
if (void 0 !== s[n]) return void (e.pos = s[n]);
if (e.level < a) for (r = 0; o > r && (e.level++, t = i[r](e, !0), e.level--, !t); r++) ; else e.pos = e.posMax;
t || e.pos++, s[n] = e.pos;
}, n.prototype.tokenize = function(e) {
for (var t, r, n = this.ruler.getRules(""), i = n.length, o = e.posMax, a = e.md.options.maxNesting; e.pos < o; ) {
if (e.level < a) for (r = 0; i > r && !(t = n[r](e, !1)); r++) ;
if (t) {
if (e.pos >= o) break;
} else e.pending += e.src[e.pos++];
}
e.pending && e.pushPending();
}, n.prototype.parse = function(e, t, r, n) {
var i, o, a, s = new this.State(e, t, r, n);
for (this.tokenize(s), o = this.ruler2.getRules(""), a = o.length, i = 0; a > i; i++) o[i](s);
}, n.prototype.State = r(314), e.exports = n;
}, function(e, t) {
"use strict";
function r(e) {
switch (e) {
case 10:
case 33:
case 35:
case 36:
case 37:
case 38:
case 42:
case 43:
case 45:
case 58:
case 60:
case 61:
case 62:
case 64:
case 91:
case 92:
case 93:
case 94:
case 95:
case 96:
case 123:
case 125:
case 126:
return !0;

default:
return !1;
}
}
e.exports = function(e, t) {
for (var n = e.pos; n < e.posMax && !r(e.src.charCodeAt(n)); ) n++;
return n === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, n)), e.pos = n, 
!0);
};
}, function(e, t) {
"use strict";
e.exports = function(e, t) {
var r, n, i = e.pos;
if (10 !== e.src.charCodeAt(i)) return !1;
for (r = e.pending.length - 1, n = e.posMax, t || (r >= 0 && 32 === e.pending.charCodeAt(r) ? r >= 1 && 32 === e.pending.charCodeAt(r - 1) ? (e.pending = e.pending.replace(/ +$/, ""), 
e.push("hardbreak", "br", 0)) : (e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0)) : e.push("softbreak", "br", 0)), 
i++; n > i && 32 === e.src.charCodeAt(i); ) i++;
return e.pos = i, !0;
};
}, function(e, t, r) {
"use strict";
for (var n = r(255).isSpace, i = [], o = 0; 256 > o; o++) i.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
i[e.charCodeAt(0)] = 1;
}), e.exports = function(e, t) {
var r, o = e.pos, a = e.posMax;
if (92 !== e.src.charCodeAt(o)) return !1;
if (o++, a > o) {
if (r = e.src.charCodeAt(o), 256 > r && 0 !== i[r]) return t || (e.pending += e.src[o]), 
e.pos += 2, !0;
if (10 === r) {
for (t || e.push("hardbreak", "br", 0), o++; a > o && (r = e.src.charCodeAt(o), 
n(r)); ) o++;
return e.pos = o, !0;
}
}
return t || (e.pending += "\\"), e.pos++, !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e, t) {
var r, n, i, o, a, s, l = e.pos, c = e.src.charCodeAt(l);
if (96 !== c) return !1;
for (r = l, l++, n = e.posMax; n > l && 96 === e.src.charCodeAt(l); ) l++;
for (i = e.src.slice(r, l), o = a = l; -1 !== (o = e.src.indexOf("`", a)); ) {
for (a = o + 1; n > a && 96 === e.src.charCodeAt(a); ) a++;
if (a - o === i.length) return t || (s = e.push("code_inline", "code", 0), s.markup = i, 
s.content = e.src.slice(l, o).replace(/[ \n]+/g, " ").trim()), e.pos = a, !0;
}
return t || (e.pending += i), e.pos += i.length, !0;
};
}, function(e, t) {
"use strict";
e.exports.tokenize = function(e, t) {
var r, n, i, o, a, s = e.pos, l = e.src.charCodeAt(s);
if (t) return !1;
if (126 !== l) return !1;
if (n = e.scanDelims(e.pos, !0), o = n.length, a = String.fromCharCode(l), 2 > o) return !1;
for (o % 2 && (i = e.push("text", "", 0), i.content = a, o--), r = 0; o > r; r += 2) i = e.push("text", "", 0), 
i.content = a + a, e.delimiters.push({
marker: l,
jump: r,
token: e.tokens.length - 1,
level: e.level,
end: -1,
open: n.can_open,
close: n.can_close
});
return e.pos += n.length, !0;
}, e.exports.postProcess = function(e) {
var t, r, n, i, o, a = [], s = e.delimiters, l = e.delimiters.length;
for (t = 0; l > t; t++) n = s[t], 126 === n.marker && -1 !== n.end && (i = s[n.end], 
o = e.tokens[n.token], o.type = "s_open", o.tag = "s", o.nesting = 1, o.markup = "~~", 
o.content = "", o = e.tokens[i.token], o.type = "s_close", o.tag = "s", o.nesting = -1, 
o.markup = "~~", o.content = "", "text" === e.tokens[i.token - 1].type && "~" === e.tokens[i.token - 1].content && a.push(i.token - 1));
for (;a.length; ) {
for (t = a.pop(), r = t + 1; r < e.tokens.length && "s_close" === e.tokens[r].type; ) r++;
r--, t !== r && (o = e.tokens[r], e.tokens[r] = e.tokens[t], e.tokens[t] = o);
}
};
}, function(e, t) {
"use strict";
e.exports.tokenize = function(e, t) {
var r, n, i, o = e.pos, a = e.src.charCodeAt(o);
if (t) return !1;
if (95 !== a && 42 !== a) return !1;
for (n = e.scanDelims(e.pos, 42 === a), r = 0; r < n.length; r++) i = e.push("text", "", 0), 
i.content = String.fromCharCode(a), e.delimiters.push({
marker: a,
jump: r,
token: e.tokens.length - 1,
level: e.level,
end: -1,
open: n.can_open,
close: n.can_close
});
return e.pos += n.length, !0;
}, e.exports.postProcess = function(e) {
var t, r, n, i, o, a, s = e.delimiters, l = e.delimiters.length;
for (t = 0; l > t; t++) r = s[t], (95 === r.marker || 42 === r.marker) && -1 !== r.end && (n = s[r.end], 
a = l > t + 1 && s[t + 1].end === r.end - 1 && s[t + 1].token === r.token + 1 && s[r.end - 1].token === n.token - 1 && s[t + 1].marker === r.marker, 
o = String.fromCharCode(r.marker), i = e.tokens[r.token], i.type = a ? "strong_open" : "em_open", 
i.tag = a ? "strong" : "em", i.nesting = 1, i.markup = a ? o + o : o, i.content = "", 
i = e.tokens[n.token], i.type = a ? "strong_close" : "em_close", i.tag = a ? "strong" : "em", 
i.nesting = -1, i.markup = a ? o + o : o, i.content = "", a && (e.tokens[s[t + 1].token].content = "", 
e.tokens[s[r.end - 1].token].content = "", t++));
};
}, function(e, t, r) {
"use strict";
var n = r(270), i = r(271), o = r(272), a = r(255).normalizeReference, s = r(255).isSpace;
e.exports = function(e, t) {
var r, l, c, u, h, f, d, p, m, g, v = "", b = e.pos, y = e.posMax, x = e.pos;
if (91 !== e.src.charCodeAt(e.pos)) return !1;
if (h = e.pos + 1, u = n(e, e.pos, !0), 0 > u) return !1;
if (f = u + 1, y > f && 40 === e.src.charCodeAt(f)) {
for (f++; y > f && (l = e.src.charCodeAt(f), s(l) || 10 === l); f++) ;
if (f >= y) return !1;
for (x = f, d = i(e.src, f, e.posMax), d.ok && (v = e.md.normalizeLink(d.str), e.md.validateLink(v) ? f = d.pos : v = ""), 
x = f; y > f && (l = e.src.charCodeAt(f), s(l) || 10 === l); f++) ;
if (d = o(e.src, f, e.posMax), y > f && x !== f && d.ok) for (m = d.str, f = d.pos; y > f && (l = e.src.charCodeAt(f), 
s(l) || 10 === l); f++) ; else m = "";
if (f >= y || 41 !== e.src.charCodeAt(f)) return e.pos = b, !1;
f++;
} else {
if (void 0 === e.env.references) return !1;
if (y > f && 91 === e.src.charCodeAt(f) ? (x = f + 1, f = n(e, f), f >= 0 ? c = e.src.slice(x, f++) : f = u + 1) : f = u + 1, 
c || (c = e.src.slice(h, u)), p = e.env.references[a(c)], !p) return e.pos = b, 
!1;
v = p.href, m = p.title;
}
return t || (e.pos = h, e.posMax = u, g = e.push("link_open", "a", 1), g.attrs = r = [ [ "href", v ] ], 
m && r.push([ "title", m ]), e.md.inline.tokenize(e), g = e.push("link_close", "a", -1)), 
e.pos = f, e.posMax = y, !0;
};
}, function(e, t, r) {
"use strict";
var n = r(270), i = r(271), o = r(272), a = r(255).normalizeReference, s = r(255).isSpace;
e.exports = function(e, t) {
var r, l, c, u, h, f, d, p, m, g, v, b, y, x = "", k = e.pos, w = e.posMax;
if (33 !== e.src.charCodeAt(e.pos)) return !1;
if (91 !== e.src.charCodeAt(e.pos + 1)) return !1;
if (f = e.pos + 2, h = n(e, e.pos + 1, !1), 0 > h) return !1;
if (d = h + 1, w > d && 40 === e.src.charCodeAt(d)) {
for (d++; w > d && (l = e.src.charCodeAt(d), s(l) || 10 === l); d++) ;
if (d >= w) return !1;
for (y = d, m = i(e.src, d, e.posMax), m.ok && (x = e.md.normalizeLink(m.str), e.md.validateLink(x) ? d = m.pos : x = ""), 
y = d; w > d && (l = e.src.charCodeAt(d), s(l) || 10 === l); d++) ;
if (m = o(e.src, d, e.posMax), w > d && y !== d && m.ok) for (g = m.str, d = m.pos; w > d && (l = e.src.charCodeAt(d), 
s(l) || 10 === l); d++) ; else g = "";
if (d >= w || 41 !== e.src.charCodeAt(d)) return e.pos = k, !1;
d++;
} else {
if (void 0 === e.env.references) return !1;
if (w > d && 91 === e.src.charCodeAt(d) ? (y = d + 1, d = n(e, d), d >= 0 ? u = e.src.slice(y, d++) : d = h + 1) : d = h + 1, 
u || (u = e.src.slice(f, h)), p = e.env.references[a(u)], !p) return e.pos = k, 
!1;
x = p.href, g = p.title;
}
return t || (c = e.src.slice(f, h), e.md.inline.parse(c, e.md, e.env, b = []), v = e.push("image", "img", 0), 
v.attrs = r = [ [ "src", x ], [ "alt", "" ] ], v.children = b, v.content = c, g && r.push([ "title", g ])), 
e.pos = d, e.posMax = w, !0;
};
}, function(e, t) {
"use strict";
var r = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/, n = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;
e.exports = function(e, t) {
var i, o, a, s, l, c, u = e.pos;
return 60 !== e.src.charCodeAt(u) ? !1 : (i = e.src.slice(u), i.indexOf(">") < 0 ? !1 : n.test(i) ? (o = i.match(n), 
s = o[0].slice(1, -1), l = e.md.normalizeLink(s), e.md.validateLink(l) ? (t || (c = e.push("link_open", "a", 1), 
c.attrs = [ [ "href", l ] ], c.markup = "autolink", c.info = "auto", c = e.push("text", "", 0), 
c.content = e.md.normalizeLinkText(s), c = e.push("link_close", "a", -1), c.markup = "autolink", 
c.info = "auto"), e.pos += o[0].length, !0) : !1) : r.test(i) ? (a = i.match(r), 
s = a[0].slice(1, -1), l = e.md.normalizeLink("mailto:" + s), e.md.validateLink(l) ? (t || (c = e.push("link_open", "a", 1), 
c.attrs = [ [ "href", l ] ], c.markup = "autolink", c.info = "auto", c = e.push("text", "", 0), 
c.content = e.md.normalizeLinkText(s), c = e.push("link_close", "a", -1), c.markup = "autolink", 
c.info = "auto"), e.pos += a[0].length, !0) : !1) : !1);
};
}, , function(e, t, r) {
"use strict";
function n(e) {
var t = 32 | e;
return t >= 97 && 122 >= t;
}
var i = r(296).HTML_TAG_RE;
e.exports = function(e, t) {
var r, o, a, s, l = e.pos;
return e.md.options.html ? (a = e.posMax, 60 !== e.src.charCodeAt(l) || l + 2 >= a ? !1 : (r = e.src.charCodeAt(l + 1), 
(33 === r || 63 === r || 47 === r || n(r)) && (o = e.src.slice(l).match(i)) ? (t || (s = e.push("html_inline", "", 0), 
s.content = e.src.slice(l, l + o[0].length)), e.pos += o[0].length, !0) : !1)) : !1;
};
}, function(e, t, r) {
"use strict";
var n = r(256), i = r(255).has, o = r(255).isValidEntityCode, a = r(255).fromCodePoint, s = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i, l = /^&([a-z][a-z0-9]{1,31});/i;
e.exports = function(e, t) {
var r, c, u, h = e.pos, f = e.posMax;
if (38 !== e.src.charCodeAt(h)) return !1;
if (f > h + 1) if (r = e.src.charCodeAt(h + 1), 35 === r) {
if (u = e.src.slice(h).match(s)) return t || (c = "x" === u[1][0].toLowerCase() ? parseInt(u[1].slice(1), 16) : parseInt(u[1], 10), 
e.pending += a(o(c) ? c : 65533)), e.pos += u[0].length, !0;
} else if (u = e.src.slice(h).match(l), u && i(n, u[1])) return t || (e.pending += n[u[1]]), 
e.pos += u[0].length, !0;
return t || (e.pending += "&"), e.pos++, !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e) {
var t, r, n, i, o = e.delimiters, a = e.delimiters.length;
for (t = 0; a > t; t++) if (n = o[t], n.close) for (r = t - n.jump - 1; r >= 0; ) {
if (i = o[r], i.open && i.marker === n.marker && i.end < 0 && i.level === n.level) {
n.jump = t - r, n.open = !1, i.end = t, i.jump = 0;
break;
}
r -= i.jump + 1;
}
};
}, function(e, t) {
"use strict";
e.exports = function(e) {
var t, r, n = 0, i = e.tokens, o = e.tokens.length;
for (t = r = 0; o > t; t++) n += i[t].nesting, i[t].level = n, "text" === i[t].type && o > t + 1 && "text" === i[t + 1].type ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== r && (i[r] = i[t]), 
r++);
t !== r && (i.length = r);
};
}, function(e, t, r) {
"use strict";
function n(e, t, r, n) {
this.src = e, this.env = r, this.md = t, this.tokens = n, this.pos = 0, this.posMax = this.src.length, 
this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [];
}
var i = r(283), o = r(255).isWhiteSpace, a = r(255).isPunctChar, s = r(255).isMdAsciiPunct;
n.prototype.pushPending = function() {
var e = new i("text", "", 0);
return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), 
this.pending = "", e;
}, n.prototype.push = function(e, t, r) {
this.pending && this.pushPending();
var n = new i(e, t, r);
return 0 > r && this.level--, n.level = this.level, r > 0 && this.level++, this.pendingLevel = this.level, 
this.tokens.push(n), n;
}, n.prototype.scanDelims = function(e, t) {
var r, n, i, l, c, u, h, f, d, p = e, m = !0, g = !0, v = this.posMax, b = this.src.charCodeAt(e);
for (r = e > 0 ? this.src.charCodeAt(e - 1) : 32; v > p && this.src.charCodeAt(p) === b; ) p++;
return i = p - e, n = v > p ? this.src.charCodeAt(p) : 32, h = s(r) || a(String.fromCharCode(r)), 
d = s(n) || a(String.fromCharCode(n)), u = o(r), f = o(n), f ? m = !1 : d && (u || h || (m = !1)), 
u ? g = !1 : h && (f || d || (g = !1)), t ? (l = m, c = g) : (l = m && (!g || h), 
c = g && (!m || d)), {
can_open: l,
can_close: c,
length: i
};
}, n.prototype.Token = i, e.exports = n;
}, function(e, t, r) {
"use strict";
function n(e) {
var t = Array.prototype.slice.call(arguments, 1);
return t.forEach(function(t) {
t && Object.keys(t).forEach(function(r) {
e[r] = t[r];
});
}), e;
}
function i(e) {
return Object.prototype.toString.call(e);
}
function o(e) {
return "[object String]" === i(e);
}
function a(e) {
return "[object Object]" === i(e);
}
function s(e) {
return "[object RegExp]" === i(e);
}
function l(e) {
return "[object Function]" === i(e);
}
function c(e) {
return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
function u(e) {
return Object.keys(e || {}).reduce(function(e, t) {
return e || b.hasOwnProperty(t);
}, !1);
}
function h(e) {
e.__index__ = -1, e.__text_cache__ = "";
}
function f(e) {
return function(t, r) {
var n = t.slice(r);
return e.test(n) ? n.match(e)[0].length : 0;
};
}
function d() {
return function(e, t) {
t.normalize(e);
};
}
function p(e) {
function t(e) {
return e.replace("%TLDS%", u.src_tlds);
}
function i(e, t) {
throw Error('(LinkifyIt) Invalid schema "' + e + '": ' + t);
}
var u = e.re = n({}, r(316)), p = e.__tlds__.slice();
e.__tlds_replaced__ || p.push(x), p.push(u.src_xn), u.src_tlds = p.join("|"), u.email_fuzzy = RegExp(t(u.tpl_email_fuzzy), "i"), 
u.link_fuzzy = RegExp(t(u.tpl_link_fuzzy), "i"), u.link_no_ip_fuzzy = RegExp(t(u.tpl_link_no_ip_fuzzy), "i"), 
u.host_fuzzy_test = RegExp(t(u.tpl_host_fuzzy_test), "i");
var m = [];
e.__compiled__ = {}, Object.keys(e.__schemas__).forEach(function(t) {
var r = e.__schemas__[t];
if (null !== r) {
var n = {
validate: null,
link: null
};
return e.__compiled__[t] = n, a(r) ? (s(r.validate) ? n.validate = f(r.validate) : l(r.validate) ? n.validate = r.validate : i(t, r), 
void (l(r.normalize) ? n.normalize = r.normalize : r.normalize ? i(t, r) : n.normalize = d())) : o(r) ? void m.push(t) : void i(t, r);
}
}), m.forEach(function(t) {
e.__compiled__[e.__schemas__[t]] && (e.__compiled__[t].validate = e.__compiled__[e.__schemas__[t]].validate, 
e.__compiled__[t].normalize = e.__compiled__[e.__schemas__[t]].normalize);
}), e.__compiled__[""] = {
validate: null,
normalize: d()
};
var g = Object.keys(e.__compiled__).filter(function(t) {
return t.length > 0 && e.__compiled__[t];
}).map(c).join("|");
e.re.schema_test = RegExp("(^|(?!_)(?:>|" + u.src_ZPCc + "))(" + g + ")", "i"), 
e.re.schema_search = RegExp("(^|(?!_)(?:>|" + u.src_ZPCc + "))(" + g + ")", "ig"), 
e.re.pretest = RegExp("(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@", "i"), 
h(e);
}
function m(e, t) {
var r = e.__index__, n = e.__last_index__, i = e.__text_cache__.slice(r, n);
this.schema = e.__schema__.toLowerCase(), this.index = r + t, this.lastIndex = n + t, 
this.raw = i, this.text = i, this.url = i;
}
function g(e, t) {
var r = new m(e, t);
return e.__compiled__[r.schema].normalize(r, e), r;
}
function v(e, t) {
return this instanceof v ? (t || u(e) && (t = e, e = {}), this.__opts__ = n({}, b, t), 
this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", 
this.__schemas__ = n({}, y, e), this.__compiled__ = {}, this.__tlds__ = k, this.__tlds_replaced__ = !1, 
this.re = {}, void p(this)) : new v(e, t);
}
var b = {
fuzzyLink: !0,
fuzzyEmail: !0,
fuzzyIP: !1
}, y = {
"http:": {
validate: function(e, t, r) {
var n = e.slice(t);
return r.re.http || (r.re.http = RegExp("^\\/\\/" + r.re.src_auth + r.re.src_host_port_strict + r.re.src_path, "i")), 
r.re.http.test(n) ? n.match(r.re.http)[0].length : 0;
}
},
"https:": "http:",
"ftp:": "http:",
"//": {
validate: function(e, t, r) {
var n = e.slice(t);
return r.re.no_http || (r.re.no_http = RegExp("^" + r.re.src_auth + r.re.src_host_port_strict + r.re.src_path, "i")), 
r.re.no_http.test(n) ? t >= 3 && ":" === e[t - 3] ? 0 : n.match(r.re.no_http)[0].length : 0;
}
},
"mailto:": {
validate: function(e, t, r) {
var n = e.slice(t);
return r.re.mailto || (r.re.mailto = RegExp("^" + r.re.src_email_name + "@" + r.re.src_host_strict, "i")), 
r.re.mailto.test(n) ? n.match(r.re.mailto)[0].length : 0;
}
}
}, x = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", k = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
v.prototype.add = function(e, t) {
return this.__schemas__[e] = t, p(this), this;
}, v.prototype.set = function(e) {
return this.__opts__ = n(this.__opts__, e), this;
}, v.prototype.test = function(e) {
if (this.__text_cache__ = e, this.__index__ = -1, !e.length) return !1;
var t, r, n, i, o, a, s, l, c;
if (this.re.schema_test.test(e)) for (s = this.re.schema_search, s.lastIndex = 0; null !== (t = s.exec(e)); ) if (i = this.testSchemaAt(e, t[2], s.lastIndex)) {
this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + i;
break;
}
return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (l = e.search(this.re.host_fuzzy_test), 
l >= 0 && (this.__index__ < 0 || l < this.__index__) && null !== (r = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (o = r.index + r[1].length, 
(this.__index__ < 0 || o < this.__index__) && (this.__schema__ = "", this.__index__ = o, 
this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (c = e.indexOf("@"), 
c >= 0 && null !== (n = e.match(this.re.email_fuzzy)) && (o = n.index + n[1].length, 
a = n.index + n[0].length, (this.__index__ < 0 || o < this.__index__ || o === this.__index__ && a > this.__last_index__) && (this.__schema__ = "mailto:", 
this.__index__ = o, this.__last_index__ = a))), this.__index__ >= 0;
}, v.prototype.pretest = function(e) {
return this.re.pretest.test(e);
}, v.prototype.testSchemaAt = function(e, t, r) {
return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(e, r, this) : 0;
}, v.prototype.match = function(e) {
var t = 0, r = [];
this.__index__ >= 0 && this.__text_cache__ === e && (r.push(g(this, t)), t = this.__last_index__);
for (var n = t ? e.slice(t) : e; this.test(n); ) r.push(g(this, t)), n = n.slice(this.__last_index__), 
t += this.__last_index__;
return r.length ? r : null;
}, v.prototype.tlds = function(e, t) {
return e = Array.isArray(e) ? e : [ e ], t ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(e, t, r) {
return e !== r[t - 1];
}).reverse(), p(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, 
p(this), this);
}, v.prototype.normalize = function(e) {
e.schema || (e.url = "http://" + e.url), "mailto:" !== e.schema || /^mailto:/i.test(e.url) || (e.url = "mailto:" + e.url);
}, e.exports = v;
}, function(e, t, r) {
"use strict";
var n = t.src_Any = r(265).source, i = t.src_Cc = r(266).source, o = t.src_Z = r(268).source, a = t.src_P = r(258).source, s = t.src_ZPCc = [ o, a, i ].join("|"), l = t.src_ZCc = [ o, i ].join("|"), c = "(?:(?!" + s + ")" + n + ")", u = "(?:(?![0-9]|" + s + ")" + n + ")", h = t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
t.src_auth = "(?:(?:(?!" + l + ").)+@)?";
var f = t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", d = t.src_host_terminator = "(?=$|" + s + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + s + "))", p = t.src_path = "(?:[/?#](?:(?!" + l + "|[()[\\]{}.,\"'?!\\-]).|\\[(?:(?!" + l + "|\\]).)*\\]|\\((?:(?!" + l + "|[)]).)*\\)|\\{(?:(?!" + l + '|[}]).)*\\}|\\"(?:(?!' + l + '|["]).)+\\"|\\\'(?:(?!' + l + "|[']).)+\\'|\\'(?=" + c + ").|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!" + l + "|[.]).|\\-(?!--(?:[^-]|$))(?:-*)|\\,(?!" + l + ").|\\!(?!" + l + "|[!]).|\\?(?!" + l + "|[?]).)+|\\/)?", m = t.src_email_name = '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+', g = t.src_xn = "xn--[a-z0-9\\-]{1,59}", v = t.src_domain_root = "(?:" + g + "|" + u + "{1,63})", b = t.src_domain = "(?:" + g + "|(?:" + c + ")|(?:" + c + "(?:-(?!-)|" + c + "){0,61}" + c + "))", y = t.src_host = "(?:" + h + "|(?:(?:(?:" + b + ")\\.)*" + v + "))", x = t.tpl_host_fuzzy = "(?:" + h + "|(?:(?:(?:" + b + ")\\.)+(?:%TLDS%)))", k = t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + b + ")\\.)+(?:%TLDS%))";
t.src_host_strict = y + d;
var w = t.tpl_host_fuzzy_strict = x + d;
t.src_host_port_strict = y + f + d;
var C = t.tpl_host_port_fuzzy_strict = x + f + d, S = t.tpl_host_port_no_ip_fuzzy_strict = k + f + d;
t.tpl_host_fuzzy_test = "localhost|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + s + "|$))", 
t.tpl_email_fuzzy = "(^|>|" + l + ")(" + m + "@" + w + ")", t.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + s + "))((?![$+<=>^`|])" + C + p + ")", 
t.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + s + "))((?![$+<=>^`|])" + S + p + ")";
}, function(e, t, r) {
var n;
(function(e, i) {
/*! https://mths.be/punycode v1.4.0 by @mathias */
"use strict";
!function(o) {
function a(e) {
throw new RangeError(N[e]);
}
function s(e, t) {
for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
return n;
}
function l(e, t) {
var r = e.split("@"), n = "";
r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(D, ".");
var i = e.split("."), o = s(i, t).join(".");
return n + o;
}
function c(e) {
for (var t, r, n = [], i = 0, o = e.length; o > i; ) t = e.charCodeAt(i++), t >= 55296 && 56319 >= t && o > i ? (r = e.charCodeAt(i++), 
56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), 
i--)) : n.push(t);
return n;
}
function u(e) {
return s(e, function(e) {
var t = "";
return e > 65535 && (e -= 65536, t += F(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), 
t += F(e);
}).join("");
}
function h(e) {
return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : k;
}
function f(e, t) {
return e + 22 + 75 * (26 > e) - ((0 != t) << 5);
}
function d(e, t, r) {
var n = 0;
for (e = r ? I(e / _) : e >> 1, e += I(e / t); e > O * C >> 1; n += k) e = I(e / O);
return I(n + (O + 1) * e / (e + S));
}
function p(e) {
var t, r, n, i, o, s, l, c, f, p, m = [], g = e.length, v = 0, b = L, y = A;
for (r = e.lastIndexOf(T), 0 > r && (r = 0), n = 0; r > n; ++n) e.charCodeAt(n) >= 128 && a("not-basic"), 
m.push(e.charCodeAt(n));
for (i = r > 0 ? r + 1 : 0; g > i; ) {
for (o = v, s = 1, l = k; i >= g && a("invalid-input"), c = h(e.charCodeAt(i++)), 
(c >= k || c > I((x - v) / s)) && a("overflow"), v += c * s, f = y >= l ? w : l >= y + C ? C : l - y, 
!(f > c); l += k) p = k - f, s > I(x / p) && a("overflow"), s *= p;
t = m.length + 1, y = d(v - o, t, 0 == o), I(v / t) > x - b && a("overflow"), b += I(v / t), 
v %= t, m.splice(v++, 0, b);
}
return u(m);
}
function m(e) {
var t, r, n, i, o, s, l, u, h, p, m, g, v, b, y, S = [];
for (e = c(e), g = e.length, t = L, r = 0, o = A, s = 0; g > s; ++s) m = e[s], 128 > m && S.push(F(m));
for (n = i = S.length, i && S.push(T); g > n; ) {
for (l = x, s = 0; g > s; ++s) m = e[s], m >= t && l > m && (l = m);
for (v = n + 1, l - t > I((x - r) / v) && a("overflow"), r += (l - t) * v, t = l, 
s = 0; g > s; ++s) if (m = e[s], t > m && ++r > x && a("overflow"), m == t) {
for (u = r, h = k; p = o >= h ? w : h >= o + C ? C : h - o, !(p > u); h += k) y = u - p, 
b = k - p, S.push(F(f(p + y % b, 0))), u = I(y / b);
S.push(F(f(u, 0))), o = d(r, v, n == i), r = 0, ++n;
}
++r, ++t;
}
return S.join("");
}
function g(e) {
return l(e, function(e) {
return E.test(e) ? p(e.slice(4).toLowerCase()) : e;
});
}
function v(e) {
return l(e, function(e) {
return M.test(e) ? "xn--" + m(e) : e;
});
}
var b = ("object" == typeof t && t && !t.nodeType && t, "object" == typeof e && e && !e.nodeType && e, 
"object" == typeof i && i);
(b.global === b || b.window === b || b.self === b) && (o = b);
var y, x = 2147483647, k = 36, w = 1, C = 26, S = 38, _ = 700, A = 72, L = 128, T = "-", E = /^xn--/, M = /[^\x20-\x7E]/, D = /[\x2E\u3002\uFF0E\uFF61]/g, N = {
overflow: "Overflow: input needs wider integers to process",
"not-basic": "Illegal input >= 0x80 (not a basic code point)",
"invalid-input": "Invalid input"
}, O = k - w, I = Math.floor, F = String.fromCharCode;
y = {
version: "1.3.2",
ucs2: {
decode: c,
encode: u
},
decode: p,
encode: m,
toASCII: v,
toUnicode: g
}, n = function() {
return y;
}.call(t, r, t, e), !(void 0 !== n && (e.exports = n));
}(void 0);
}).call(t, r(211)(e), function() {
return this;
}());
}, function(e, t) {
"use strict";
e.exports = {
options: {
html: !1,
xhtmlOut: !1,
breaks: !1,
langPrefix: "language-",
linkify: !1,
typographer: !1,
quotes: "“”‘’",
highlight: null,
maxNesting: 100
},
components: {
core: {},
block: {},
inline: {}
}
};
}, function(e, t) {
"use strict";
e.exports = {
options: {
html: !1,
xhtmlOut: !1,
breaks: !1,
langPrefix: "language-",
linkify: !1,
typographer: !1,
quotes: "“”‘’",
highlight: null,
maxNesting: 20
},
components: {
core: {
rules: [ "normalize", "block", "inline" ]
},
block: {
rules: [ "paragraph" ]
},
inline: {
rules: [ "text" ],
rules2: [ "balance_pairs", "text_collapse" ]
}
}
};
}, function(e, t) {
"use strict";
e.exports = {
options: {
html: !0,
xhtmlOut: !0,
breaks: !1,
langPrefix: "language-",
linkify: !1,
typographer: !1,
quotes: "“”‘’",
highlight: null,
maxNesting: 20
},
components: {
core: {
rules: [ "normalize", "block", "inline" ]
},
block: {
rules: [ "blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph" ]
},
inline: {
rules: [ "autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text" ],
rules2: [ "balance_pairs", "emphasis", "text_collapse" ]
}
}
};
}, , function(e, t) {
"use strict";
e.exports = function(e) {
function t(t) {
var r = [];
if ("+" === t) return '<kbd class="shortcut">+</kbd>';
var n = Math.random();
t = t.replace(/\+\+/g, "+" + n), t = t.split("+");
for (var i = 0; i < t.length; i++) {
var o = t[i];
r.push(o == n ? "+" : e.utils.escapeHtml(o)), i < t.length - 1 && r.push('<span class="shortcut__plus">+</span>');
}
return '<kbd class="shortcut">' + r.join("") + "</kbd>";
}
e.renderer.rules.code_inline = function(r, n, i, o, a) {
var s = r[n], l = s.content.trim();
if (0 == l.indexOf("key:")) return t(l.slice(4));
for (var c = [ "pattern", "match", "subject" ], u = 0; u < c.length; u++) {
var h = c[u];
if (l.startsWith(h + ":")) return '<code class="' + h + '">' + e.utils.escapeHtml(l.slice(h.length + 1)) + "</code>";
}
return "<code>" + e.utils.escapeHtml(l) + "</code>";
};
};
}, function(e, t, r) {
"use strict";
var n = r(324), i = r(325), o = r(326), a = r(252).lang;
o.requirePhrase("markit.outlined", r(331)("./" + a + ".yml")), e.exports = function(e) {
[ "warn", "smart", "ponder" ].forEach(function(t) {
e.use(n, t, {
marker: "`",
render: function(r, n, a, s, l) {
if (1 === r[n].nesting) {
var c = i(r[n].info, !0), u = c.header;
return u = u ? e.renderInline(u) : o("markit.outlined." + t), '<div class="important important_' + t + '">\n            <div class="important__header"><span class="important__type">' + u + '</span></div>\n            <div class="important__content">';
}
return "</div></div>\n";
}
});
});
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
function n(e) {
return e.trim().split(" ", 2)[0] === t;
}
function i(e, r, n, i, o) {
return 1 === e[r].nesting && e[r].attrPush([ "class", t ]), o.renderToken(e, r, n, i, o);
}
function o(e, r, n, i) {
var o, h, f, d, p, m, g, v, b = !1, y = e.bMarks[r] + e.tShift[r], x = e.eMarks[r];
if (l !== e.src.charCodeAt(y)) return !1;
for (o = y + 1; x >= o && s[(o - y) % c] === e.src[o]; o++) ;
if (f = Math.floor((o - y) / c), a > f) return !1;
if (o -= (o - y) % c, d = e.src.slice(y, o), p = e.src.slice(o, x), !u(p)) return !1;
if (i) return !0;
for (h = r; (h++, !(h >= n)) && (y = e.bMarks[h] + e.tShift[h], x = e.eMarks[h], 
!(x > y && e.sCount[h] < e.blkIndent)); ) if (l === e.src.charCodeAt(y) && !(e.sCount[h] - e.blkIndent >= 4)) {
for (o = y + 1; x >= o && s[(o - y) % c] === e.src[o]; o++) ;
if (!(Math.floor((o - y) / c) < f || (o -= (o - y) % c, o = e.skipSpaces(o), x > o))) {
b = !0;
break;
}
}
return g = e.parentType, v = e.lineMax, e.parentType = "container", e.lineMax = h, 
m = e.push("container_" + t + "_open", "div", 1), m.markup = d, m.block = !0, m.info = p, 
m.map = [ r, h ], e.md.block.tokenize(e, r + 1, h), m = e.push("container_" + t + "_close", "div", -1), 
m.markup = e.src.slice(y, o), m.block = !0, e.parentType = g, e.lineMax = v, e.line = h + (b ? 1 : 0), 
!0;
}
r = r || {};
var a = 3, s = r.marker || ":", l = s.charCodeAt(0), c = s.length, u = r.validate || n, h = r.render || i;
e.block.ruler.before("fence", "container_" + t, o, {
alt: [ "paragraph", "reference", "blockquote", "list" ]
}), e.renderer.rules["container_" + t + "_open"] = h, e.renderer.rules["container_" + t + "_close"] = h;
};
}, function(e, t) {
"use strict";
var r = /([\w-]+)(?:=(?:'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)"|(\S+))|(?:\s|$))/g;
e.exports = function(e, t) {
var n = {};
if (!e) return n;
var i = void 0;
t && (i = e.match(/^\w+/), i = i && i[0], e = e.replace(/^\w+\s+/, ""));
for (var o = void 0, a = void 0, s = void 0; null !== (o = r.exec(e)); ) a = o[1], 
s = void 0 !== o[2] ? o[2].replace(/\\'/g, "'") : void 0 !== o[3] ? o[3].replace(/\\"/g, '"') : o[4], 
n[a.toLowerCase()] = void 0 === s ? !0 : s;
return i && (n.blockName = i), n;
};
}, function(e, t, r) {
"use strict";
function n() {
for (var e = [ a ], t = 0; t < arguments.length; t++) e.push(arguments[t]);
return o.t.apply(o, e);
}
var i = r(327), o = new i("en"), a = r(252).lang, s = {};
n.i18n = o, n.requirePhrase = function(e, t) {
s[e] && -1 != s[e].indexOf(t) || (s[e] || (s[e] = []), s[e].push(t), o.addPhrase(a, e, t));
}, e.exports = n;
}, function(e, t, r) {
"use strict";
e.exports = r(328);
}, function(e, t, r) {
"use strict";
function n(e) {
return Object.prototype.toString.call(e);
}
function i(e) {
return "[object String]" === n(e);
}
function o(e) {
return !isNaN(e) && isFinite(e);
}
function a(e) {
return e === !0 || e === !1;
}
function s(e) {
return "[object Function]" === n(e);
}
function l(e) {
return "[object Object]" === n(e);
}
function c(e, t, r) {
if (null !== e) if (x && e.forEach === x) e.forEach(t, r); else if (e.length === +e.length) for (var n = 0, i = e.length; i > n; n += 1) t.call(r, e[n], n, e); else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(r, e[o], o, e);
}
function u(e) {
var t = 1, r = arguments, n = r.length, i = (e + "").replace(k, function(e) {
if ("%%" === e) return "%";
if (t >= n) return e;
switch (e) {
case "%s":
return r[t++] + "";

case "%d":
return +r[t++];

case "%j":
return JSON.stringify(r[t++]);

default:
return e;
}
});
return i;
}
function h(e) {
var t = {};
return c(e || {}, function(e, r) {
return e && "object" == typeof e ? void c(h(e), function(e, n) {
t[r + "." + n] = e;
}) : void (t[r] = e);
}), t;
}
function f(e, t) {
return e + C + t;
}
function d(e, t, r) {
var n = f(t, r), i = e._storage;
if (i.hasOwnProperty(n)) return n;
if (t === e._defaultLocale) return null;
var o = e._fallbacks_cache;
if (o.hasOwnProperty(n)) return o[n];
for (var a, s = e._fallbacks[t] || [ e._defaultLocale ], l = 0, c = s.length; c > l; l++) if (a = f(s[l], r), 
i.hasOwnProperty(a)) return o[n] = a, o[n];
return o[n] = null, null;
}
function p(e, t, r) {
var n = b.indexOf(e, t);
return -1 === n ? u('[pluralizer for "%s" locale not found]', e) : void 0 === r[n] ? u('[plural form %d ("%s") not found in translation]', n, b.forms(e)[n]) : r[n];
}
function m(e) {
return this instanceof m ? (this._defaultLocale = e ? e + "" : w, this._fallbacks = {}, 
this._fallbacks_cache = {}, this._storage = {}, void (this._plurals_cache = {})) : new m(e);
}
function g(e, t, r) {
var n, i, o, a, s, l;
return S.test(t) ? (n = v.parse(t), 1 === n.length && "literal" === n[0].type ? n[0].text : (e._plurals_cache[r] || (e._plurals_cache[r] = new m(r)), 
l = e._plurals_cache[r], i = [], i.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
i.push("params = flatten(params);"), c(n, function(e) {
if ("literal" === e.type) return void i.push(u("str += %j;", e.text));
if ("variable" === e.type) return o = e.anchor, void i.push(u('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', o, o, o));
if ("plural" !== e.type) throw Error("Unknown node type");
o = e.anchor, a = {}, c(e.strict, function(t, n) {
var i = v.parse(t);
return 1 === i.length && "literal" === i[0].type ? (a[n] = !1, void (e.strict[n] = i[0].text)) : (a[n] = !0, 
void (l.hasPhrase(r, t, !0) || l.addPhrase(r, t, t)));
}), s = {}, c(e.forms, function(t, n) {
var i, o = v.parse(t);
return 1 === o.length && "literal" === o[0].type ? (i = o[0].text, e.forms[n] = i, 
void (s[i] = !1)) : (s[t] = !0, void (l.hasPhrase(r, t, !0) || l.addPhrase(r, t, t)));
}), i.push(u("loc = %j;", r)), i.push(u("loc_plzr = %j;", r.split(/[-_]/)[0])), 
i.push(u("anchor = params[%j];", o)), i.push(u("cache = this._plurals_cache[loc];")), 
i.push(u("strict = %j;", e.strict)), i.push(u("strict_exec = %j;", a)), i.push(u("forms = %j;", e.forms)), 
i.push(u("forms_exec = %j;", s)), i.push("if (+(anchor) != anchor) {"), i.push(u('  str += "[invalid plurals amount: %s(" + anchor + ")]";', o)), 
i.push("} else {"), i.push("  if (strict[anchor] !== undefined) {"), i.push("    plrl = strict[anchor];"), 
i.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), i.push("  } else {"), 
i.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), i.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
i.push("  }"), i.push("}");
}), i.push("return str;"), Function("params", "flatten", "pluralizer", i.join("\n")))) : t;
}
var v = r(329), b = r(330), y = Array.isArray || function(e) {
return "[object Array]" === n(e);
}, x = Array.prototype.forEach, k = /%[sdj%]/g, w = "en", C = "#@$";
m.prototype.addPhrase = function(e, t, r, n) {
var s, u = this;
if (a(n)) s = n ? 1 / 0 : 0; else if (o(n)) {
if (s = Math.floor(n), 0 > s) throw new TypeError("Invalid flatten level (should be >= 0).");
} else s = 1 / 0;
if (l(r) && s > 0) return c(r, function(r, n) {
u.addPhrase(e, (t ? t + "." : "") + n, r, s - 1);
}), this;
if (i(r)) this._storage[f(e, t)] = {
translation: r,
locale: e,
raw: !1
}; else {
if (!(y(r) || o(r) || a(r) || 0 === s && l(r))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[f(e, t)] = {
translation: r,
locale: e,
raw: !0
};
}
return u._fallbacks_cache = {}, this;
}, m.prototype.setFallback = function(e, t) {
var r = this._defaultLocale;
if (r === e) throw Error("Default locale can't have fallbacks");
var n = y(t) ? t.slice() : [ t ];
return n[n.length - 1] !== r && n.push(r), this._fallbacks[e] = n, this._fallbacks_cache = {}, 
this;
};
var S = /#\{|\(\(|\\\\/;
m.prototype.translate = function(e, t, r) {
var n, a = d(this, e, t);
return a ? (n = this._storage[a], n.raw ? n.translation : (n.hasOwnProperty("compiled") || (n.compiled = g(this, n.translation, n.locale)), 
s(n.compiled) ? ((o(r) || i(r)) && (r = {
count: r,
value: r
}), n.compiled.call(this, r, h, p)) : n.compiled)) : e + ": No translation for [" + t + "]";
}, m.prototype.hasPhrase = function(e, t, r) {
return r ? this._storage.hasOwnProperty(f(e, t)) : d(this, e, t) ? !0 : !1;
}, m.prototype.getLocale = function(e, t, r) {
if (r) return this._storage.hasOwnProperty(f(e, t)) ? e : null;
var n = d(this, e, t);
return n ? n.split(C, 2)[0] : null;
}, m.prototype.t = m.prototype.translate, m.prototype.stringify = function(e) {
var t = this, r = {};
c(this._storage, function(e, t) {
r[t.split(C)[1]] = !0;
});
var n = {};
c(r, function(r, i) {
var o = d(t, e, i);
if (o) {
var a = t._storage[o].locale;
n[a] || (n[a] = {}), n[a][i] = t._storage[o].translation;
}
});
var i = {
fallback: {},
locales: n
}, o = (t._fallbacks[e] || []).slice(0, -1);
return o.length && (i.fallback[e] = o), JSON.stringify(i);
}, m.prototype.load = function(e) {
var t = this;
return i(e) && (e = JSON.parse(e)), c(e.locales, function(e, r) {
c(e, function(e, n) {
t.addPhrase(r, n, e, 0);
});
}), c(e.fallback, function(e, r) {
t.setFallback(r, e);
}), this;
}, e.exports = m;
}, function(e, t) {
"use strict";
e.exports = function() {
function e(e, t) {
function r() {
this.constructor = e;
}
r.prototype = t.prototype, e.prototype = new r();
}
function t(e, t, r, n, i, o) {
this.message = e, this.expected = t, this.found = r, this.offset = n, this.line = i, 
this.column = o, this.name = "SyntaxError";
}
function r(e) {
function r() {
return e.substring(ve, ge);
}
function n(t) {
function r(t, r, n) {
var i, o;
for (i = r; n > i; i++) o = e.charAt(i), "\n" === o ? (t.seenCR || t.line++, t.column = 1, 
t.seenCR = !1) : "\r" === o || "\u2028" === o || "\u2029" === o ? (t.line++, t.column = 1, 
t.seenCR = !0) : (t.column++, t.seenCR = !1);
}
return be !== t && (be > t && (be = 0, ye = {
line: 1,
column: 1,
seenCR: !1
}), r(ye, be, t), be = t), ye;
}
function i(e) {
xe > ge || (ge > xe && (xe = ge, ke = []), ke.push(e));
}
function o(r, i, o) {
function a(e) {
var t = 1;
for (e.sort(function(e, t) {
return e.description < t.description ? -1 : e.description > t.description ? 1 : 0;
}); t < e.length; ) e[t - 1] === e[t] ? e.splice(t, 1) : t++;
}
function s(e, t) {
function r(e) {
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
var n, i, o, a = Array(e.length);
for (o = 0; o < e.length; o++) a[o] = e[o].description;
return n = e.length > 1 ? a.slice(0, -1).join(", ") + " or " + a[e.length - 1] : a[0], 
i = t ? '"' + r(t) + '"' : "end of input", "Expected " + n + " but " + i + " found.";
}
var l = n(o), c = o < e.length ? e.charAt(o) : null;
return null !== i && a(i), new t(null !== r ? r : s(i, c), i, c, o, l.line, l.column);
}
function a() {
var e, t;
for (e = [], t = m(), t === k && (t = s(), t === k && (t = f())); t !== k; ) e.push(t), 
t = m(), t === k && (t = s(), t === k && (t = f()));
return e;
}
function s() {
var t, r, n, o, a;
return t = ge, e.substr(ge, 2) === _ ? (r = _, ge += 2) : (r = k, 0 === we && i(A)), 
r !== k ? (n = l(), n !== k ? (e.substr(ge, 2) === L ? (o = L, ge += 2) : (o = k, 
0 === we && i(T)), o !== k ? (a = h(), a === k && (a = E), a !== k ? (ve = t, r = M(n, a), 
t = r) : (ge = t, t = S)) : (ge = t, t = S)) : (ge = t, t = S)) : (ge = t, t = S), 
t;
}
function l() {
var t, r, n, o;
return t = ge, r = c(), r !== k ? (124 === e.charCodeAt(ge) ? (n = D, ge++) : (n = k, 
0 === we && i(N)), n !== k ? (o = l(), o !== k ? (ve = t, r = O(r, o), t = r) : (ge = t, 
t = S)) : (ge = t, t = S)) : (ge = t, t = S), t === k && (t = ge, r = c(), r !== k && (ve = t, 
r = I(r)), t = r), t;
}
function c() {
var t, r, n, o, a, s;
if (t = ge, 61 === e.charCodeAt(ge) ? (r = F, ge++) : (r = k, 0 === we && i(P)), 
r !== k) {
if (n = [], R.test(e.charAt(ge)) ? (o = e.charAt(ge), ge++) : (o = k, 0 === we && i(z)), 
o !== k) for (;o !== k; ) n.push(o), R.test(e.charAt(ge)) ? (o = e.charAt(ge), ge++) : (o = k, 
0 === we && i(z)); else n = S;
if (n !== k) if (32 === e.charCodeAt(ge) ? (o = q, ge++) : (o = k, 0 === we && i(B)), 
o === k && (o = E), o !== k) {
if (a = [], s = u(), s !== k) for (;s !== k; ) a.push(s), s = u(); else a = S;
a !== k ? (ve = t, r = H(n, a), t = r) : (ge = t, t = S);
} else ge = t, t = S; else ge = t, t = S;
} else ge = t, t = S;
if (t === k) {
if (t = ge, r = [], n = u(), n !== k) for (;n !== k; ) r.push(n), n = u(); else r = S;
r !== k && (ve = t, r = W()), t = r;
}
return t;
}
function u() {
var t, r, n;
return t = ge, 92 === e.charCodeAt(ge) ? (r = j, ge++) : (r = k, 0 === we && i(U)), 
r !== k ? (G.test(e.charAt(ge)) ? (n = e.charAt(ge), ge++) : (n = k, 0 === we && i(V)), 
n !== k ? (ve = t, r = $(n), t = r) : (ge = t, t = S)) : (ge = t, t = S), t === k && (t = ge, 
r = ge, we++, 124 === e.charCodeAt(ge) ? (n = D, ge++) : (n = k, 0 === we && i(N)), 
n === k && (e.substr(ge, 2) === L ? (n = L, ge += 2) : (n = k, 0 === we && i(T))), 
we--, n === k ? r = Z : (ge = r, r = S), r !== k ? (e.length > ge ? (n = e.charAt(ge), 
ge++) : (n = k, 0 === we && i(Y)), n !== k ? (ve = t, r = K(), t = r) : (ge = t, 
t = S)) : (ge = t, t = S)), t;
}
function h() {
var t, r, n;
return t = ge, 58 === e.charCodeAt(ge) ? (r = X, ge++) : (r = k, 0 === we && i(J)), 
r !== k ? (n = d(), n !== k ? (ve = t, r = Q(n), t = r) : (ge = t, t = S)) : (ge = t, 
t = S), t;
}
function f() {
var t, r, n, o;
return t = ge, e.substr(ge, 2) === ee ? (r = ee, ge += 2) : (r = k, 0 === we && i(te)), 
r !== k ? (n = d(), n !== k ? (125 === e.charCodeAt(ge) ? (o = re, ge++) : (o = k, 
0 === we && i(ne)), o !== k ? (ve = t, r = ie(n), t = r) : (ge = t, t = S)) : (ge = t, 
t = S)) : (ge = t, t = S), t;
}
function d() {
var t, r, n, o, a;
if (t = ge, r = p(), r !== k) if (46 === e.charCodeAt(ge) ? (n = oe, ge++) : (n = k, 
0 === we && i(ae)), n !== k) {
if (o = [], a = d(), a !== k) for (;a !== k; ) o.push(a), a = d(); else o = S;
o !== k ? (ve = t, r = se(), t = r) : (ge = t, t = S);
} else ge = t, t = S; else ge = t, t = S;
return t === k && (t = p()), t;
}
function p() {
var t, r, n, o;
if (t = ge, le.test(e.charAt(ge)) ? (r = e.charAt(ge), ge++) : (r = k, 0 === we && i(ce)), 
r !== k) {
for (n = [], ue.test(e.charAt(ge)) ? (o = e.charAt(ge), ge++) : (o = k, 0 === we && i(he)); o !== k; ) n.push(o), 
ue.test(e.charAt(ge)) ? (o = e.charAt(ge), ge++) : (o = k, 0 === we && i(he));
n !== k ? (ve = t, r = K(), t = r) : (ge = t, t = S);
} else ge = t, t = S;
return t;
}
function m() {
var e, t, r, n, i;
if (e = ge, t = [], r = ge, n = ge, we++, i = s(), i === k && (i = f()), we--, i === k ? n = Z : (ge = n, 
n = S), n !== k ? (i = g(), i !== k ? (ve = r, n = fe(i), r = n) : (ge = r, r = S)) : (ge = r, 
r = S), r !== k) for (;r !== k; ) t.push(r), r = ge, n = ge, we++, i = s(), i === k && (i = f()), 
we--, i === k ? n = Z : (ge = n, n = S), n !== k ? (i = g(), i !== k ? (ve = r, 
n = fe(i), r = n) : (ge = r, r = S)) : (ge = r, r = S); else t = S;
return t !== k && (ve = e, t = de(t)), e = t;
}
function g() {
var t, r, n;
return t = ge, 92 === e.charCodeAt(ge) ? (r = j, ge++) : (r = k, 0 === we && i(U)), 
r !== k ? (pe.test(e.charAt(ge)) ? (n = e.charAt(ge), ge++) : (n = k, 0 === we && i(me)), 
n !== k ? (ve = t, r = $(n), t = r) : (ge = t, t = S)) : (ge = t, t = S), t === k && (e.length > ge ? (t = e.charAt(ge), 
ge++) : (t = k, 0 === we && i(Y))), t;
}
function v(e) {
for (var t = [], r = 0; r < e.length; r++) void 0 === e[r].strict && t.push(e[r].text);
return t;
}
function b(e) {
for (var t = {}, r = 0; r < e.length; r++) void 0 !== e[r].strict && (t[e[r].strict] = e[r].text);
return t;
}
var y, x = arguments.length > 1 ? arguments[1] : {}, k = {}, w = {
start: a
}, C = a, S = k, _ = "((", A = {
type: "literal",
value: "((",
description: '"(("'
}, L = "))", T = {
type: "literal",
value: "))",
description: '"))"'
}, E = null, M = function(e, t) {
return {
type: "plural",
forms: v(e),
strict: b(e),
anchor: t || "count"
};
}, D = "|", N = {
type: "literal",
value: "|",
description: '"|"'
}, O = function(e, t) {
return [ e ].concat(t);
}, I = function(e) {
return [ e ];
}, F = "=", P = {
type: "literal",
value: "=",
description: '"="'
}, R = /^[0-9]/, z = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, q = " ", B = {
type: "literal",
value: " ",
description: '" "'
}, H = function(e, t) {
return {
strict: e.join(""),
text: t.join("")
};
}, W = function() {
return {
text: r()
};
}, j = "\\", U = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, G = /^[\\|)(]/, V = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, $ = function(e) {
return e;
}, Z = void 0, Y = {
type: "any",
description: "any character"
}, K = function() {
return r();
}, X = ":", J = {
type: "literal",
value: ":",
description: '":"'
}, Q = function(e) {
return e;
}, ee = "#{", te = {
type: "literal",
value: "#{",
description: '"#{"'
}, re = "}", ne = {
type: "literal",
value: "}",
description: '"}"'
}, ie = function(e) {
return {
type: "variable",
anchor: e
};
}, oe = ".", ae = {
type: "literal",
value: ".",
description: '"."'
}, se = function() {
return r();
}, le = /^[a-zA-Z_$]/, ce = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, ue = /^[a-zA-Z0-9_$]/, he = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, fe = function(e) {
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
}, ge = 0, ve = 0, be = 0, ye = {
line: 1,
column: 1,
seenCR: !1
}, xe = 0, ke = [], we = 0;
if ("startRule" in x) {
if (!(x.startRule in w)) throw Error("Can't start parsing from rule \"" + x.startRule + '".');
C = w[x.startRule];
}
if (y = C(), y !== k && ge === e.length) return y;
throw y !== k && ge < e.length && i({
type: "end",
description: "end of input"
}), o(null, ke, xe);
}
return e(t, Error), {
SyntaxError: t,
parse: r
};
}();
}, function(e, t) {
"use strict";
function r(e) {
var t;
return d[e] ? e : (t = e.toLowerCase().replace("_", "-"), d[t] ? t : (t = t.split("-")[0], 
d[t] ? t : null));
}
function n(e) {
var t = r(e);
return d[t] ? d[t].c : null;
}
function i(e, t) {
var n = r(e);
if (!n) return -1;
if (!d[n].cFn) return 0;
var i = t + "", o = i.indexOf(".") < 0 ? "" : i.split(".")[1], a = o.length, s = +t, l = +i.split(".")[0], c = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return d[n].cFn(s, l, a, +o, c);
}
function o(e, t) {
var n = r(e);
return n ? d[n].c[i(n, t)] : null;
}
function a(e) {
var t = r(e);
return d[t] ? d[t].o : null;
}
function s(e, t) {
var n = r(e);
if (!n) return -1;
if (!d[n].oFn) return 0;
var i = t + "", o = i.indexOf(".") < 0 ? "" : i.split(".")[1], a = o.length, s = +t, l = +i.split(".")[0], c = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return d[n].oFn(s, l, a, +o, c);
}
function l(e, t) {
var n = r(e);
return d[n] ? d[n].o[s(n, t)] : null;
}
function c(e) {
return p[e];
}
function u(e, t) {
var r;
for (t.c = t.c ? t.c.map(c) : [ "other" ], t.o = t.o ? t.o.map(c) : [ "other" ], 
r = 0; r < e.length; r++) d[e[r]] = t;
}
function h(e, t, r) {
return r >= e && t >= r && r % 1 === 0;
}
function f(e, t) {
return e.indexOf(t) >= 0;
}
var d = {};
e.exports = o, e.exports.indexOf = i, e.exports.forms = n, e.exports.ordinal = l, 
e.exports.ordinal.indexOf = s, e.exports.ordinal.forms = a;
var p = [ "zero", "one", "two", "few", "many", "other" ];
u([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(e) {
return h(0, 1, e) ? 0 : 1;
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
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : h(3, 10, t) ? 3 : h(11, 99, t) ? 4 : 5;
}
}), u([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return f([ 1, 5, 7, 8, 9, 10 ], e) ? 0 : f([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), u([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : 1;
}
}), u([ "az" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(e, t) {
var r = t % 10, n = t % 100, i = t % 1e3;
return f([ 1, 2, 5, 7, 8 ], r) || f([ 20, 50, 70, 80 ], n) ? 0 : f([ 3, 4 ], r) || f([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i) ? 1 : 0 === t || 6 === r || f([ 40, 60, 90 ], n) ? 2 : 3;
}
}), u([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, r = e % 100;
return 1 === t && 11 !== r ? 0 : h(2, 4, t) && !h(12, 14, r) ? 1 : 0 === t || h(5, 9, t) || h(11, 14, r) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 10, r = e % 100;
return f([ 2, 3 ], t) && !f([ 12, 13 ], r) ? 0 : 1;
}
}), u([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "zh" ], {}), 
u([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, r = e % 100, n = e % 1e6;
return 1 !== t || f([ 11, 71, 91 ], r) ? 2 !== t || f([ 12, 72, 92 ], r) ? !h(3, 4, t) && 9 !== t || h(10, 19, r) || h(70, 79, r) || h(90, 99, r) ? 0 !== e && 0 === n ? 3 : 4 : 2 : 1 : 0;
}
}), u([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, r, n) {
var i = t % 10, o = t % 100, a = n % 10, s = n % 100;
return 0 === r && 1 === i && 11 !== o || 1 === a && 11 !== s ? 0 : 0 === r && h(2, 4, i) && !h(12, 14, o) || h(2, 4, a) && !h(12, 14, s) ? 1 : 2;
}
}), u([ "ca" ], {
c: [ 1, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return f([ 1, 3 ], e) ? 0 : 2 === e ? 1 : 4 === e ? 2 : 3;
}
}), u([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : h(2, 4, t) && 0 === r ? 1 : 0 !== r ? 2 : 3;
}
}), u([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 === e ? 3 : 6 === e ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(e) {
return f([ 0, 7, 8, 9 ], e) ? 0 : 1 === e ? 1 : 2 === e ? 2 : f([ 3, 4 ], e) ? 3 : f([ 5, 6 ], e) ? 4 : 5;
}
}), u([ "da" ], {
c: [ 1, 5 ],
cFn: function(e, t, r, n, i) {
return 1 === e || 0 !== i && f([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, r, n) {
var i = t % 100, o = n % 100;
return 0 === r && 1 === i || 1 === o ? 0 : 0 === r && 2 === i || 2 === o ? 1 : 0 === r && h(3, 4, i) || h(3, 4, o) ? 2 : 3;
}
}), u([ "en" ], {
c: [ 1, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
var t = e % 10, r = e % 100;
return 1 === t && 11 !== r ? 0 : 2 === t && 12 !== r ? 1 : 3 === t && 13 !== r ? 2 : 3;
}
}), u([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return f([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(e, t, r, n) {
var i = t % 10, o = n % 10;
return 0 === r && f([ 1, 2, 3 ], t) || 0 === r && !f([ 4, 6, 9 ], i) || 0 !== r && !f([ 4, 6, 9 ], o) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return f([ 0, 1 ], t) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : h(3, 6, e) ? 2 : h(7, 10, e) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e) {
return f([ 1, 11 ], e) ? 0 : f([ 2, 12 ], e) ? 1 : h(3, 10, e) || h(13, 19, e) ? 2 : 3;
}
}), u([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : f([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), u([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e, t, r) {
var n = t % 10, i = t % 100;
return 0 === r && 1 === n ? 0 : 0 === r && 2 === n ? 1 : 0 === r && f([ 0, 20, 40, 60, 80 ], i) ? 2 : 0 !== r ? 3 : 4;
}
}), u([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(e, t, r) {
var n = e % 10;
return 1 === t && 0 === r ? 0 : 2 === t && 0 === r ? 1 : 0 !== r || h(0, 10, e) || 0 !== n ? 3 : 2;
}
}), u([ "hu" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return f([ 1, 5 ], e) ? 0 : 1;
}
}), u([ "is" ], {
c: [ 1, 5 ],
cFn: function(e, t, r, n, i) {
var o = t % 10, a = t % 100;
return 0 === i && 1 === o && 11 !== a || 0 !== i ? 0 : 1;
}
}), u([ "it" ], {
c: [ 1, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
return f([ 11, 8, 80, 800 ], e) ? 0 : 1;
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
var r = t % 100;
return 1 === t ? 0 : 0 === t || h(2, 20, r) || 40 === r || 60 === r || 80 === r ? 1 : 2;
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
return 0 === e ? 0 : f([ 0, 1 ], t) && 0 !== e ? 1 : 2;
}
}), u([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, r, n) {
var i = e % 10, o = e % 100;
return 1 !== i || h(11, 19, o) ? h(2, 9, i) && !h(11, 19, o) ? 1 : 0 !== n ? 2 : 3 : 0;
}
}), u([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t, r, n) {
var i = e % 10, o = e % 100, a = n % 100, s = n % 10;
return 0 === i || h(11, 19, o) || 2 === r && h(11, 19, a) ? 0 : 1 === i && 11 !== o || 2 === r && 1 === s && 11 !== a || 2 !== r && 1 === s ? 1 : 2;
}
}), u([ "mk" ], {
c: [ 1, 5 ],
cFn: function(e, t, r, n) {
var i = t % 10, o = n % 10;
return 0 === r && 1 === i || 1 === o ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(e, t) {
var r = t % 10, n = t % 100;
return 1 === r && 11 !== n ? 0 : 2 === r && 12 !== n ? 1 : f([ 7, 8 ], r) && !f([ 17, 18 ], n) ? 2 : 3;
}
}), u([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, r) {
var n = e % 100;
return 1 === t && 0 === r ? 0 : 0 !== r || 0 === e || 1 !== e && h(1, 19, n) ? 1 : 2;
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
return 1 === e ? 0 : f([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 3;
}
}), u([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 1 === e ? 0 : 0 === e || h(2, 10, t) ? 1 : h(11, 19, t) ? 2 : 3;
}
}), u([ "ne" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return h(1, 4, e) ? 0 : 1;
}
}), u([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, r) {
var n = t % 10, i = t % 100;
return 1 === t && 0 === r ? 0 : 0 === r && h(2, 4, n) && !h(12, 14, i) ? 1 : 0 === r && 1 !== t && h(0, 1, n) || 0 === r && h(5, 9, n) || 0 === r && h(12, 14, i) ? 2 : 3;
}
}), u([ "pt" ], {
c: [ 1, 5 ],
cFn: function(e) {
return h(0, 2, e) && 2 !== e ? 0 : 1;
}
}), u([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(e, t, r) {
return 1 === e && 0 === r ? 0 : 1;
}
}), u([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, r) {
var n = t % 10, i = t % 100;
return 0 === r && 1 === n && 11 !== i ? 0 : 0 === r && h(2, 4, n) && !h(12, 14, i) ? 1 : 0 === r && 0 === n || 0 === r && h(5, 9, n) || 0 === r && h(11, 14, i) ? 2 : 3;
}
}), u([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : h(2, 10, e) ? 1 : 2;
}
}), u([ "si" ], {
c: [ 1, 5 ],
cFn: function(e, t, r, n) {
return f([ 0, 1 ], e) || 0 === t && 1 === n ? 0 : 1;
}
}), u([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, r) {
var n = t % 100;
return 0 === r && 1 === n ? 0 : 0 === r && 2 === n ? 1 : 0 === r && h(3, 4, n) || 0 !== r ? 2 : 3;
}
}), u([ "sq" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e) {
var t = e % 10, r = e % 100;
return 1 === e ? 0 : 4 === t && 14 !== r ? 1 : 2;
}
}), u([ "sv" ], {
c: [ 1, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
var t = e % 10, r = e % 100;
return f([ 1, 2 ], t) && !f([ 11, 12 ], r) ? 0 : 1;
}
}), u([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(e) {
return h(0, 1, e) || h(11, 99, e) ? 0 : 1;
}
}), u([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, r) {
var n = t % 10, i = t % 100;
return 0 === r && 1 === n && 11 !== i ? 0 : 0 === r && h(2, 4, n) && !h(12, 14, i) ? 1 : 0 === r && 0 === n || 0 === r && h(5, 9, n) || 0 === r && h(11, 14, i) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 10, r = e % 100;
return 3 === t && 13 !== r ? 0 : 1;
}
});
}, function(e, t, r) {
function n(e) {
return r(i(e));
}
function i(e) {
return o[e] || function() {
throw Error("Cannot find module '" + e + "'.");
}();
}
var o = {
"./en.yml": 332,
"./ru.yml": 333
};
n.keys = function() {
return Object.keys(o);
}, n.resolve = i, e.exports = n, n.id = 331;
}, function(e, t) {
e.exports = {
smart: "Please note:",
warn: "Important:",
ponder: "How do you think?"
};
}, function(e, t) {
e.exports = {
smart: "На заметку:",
warn: "Важно:",
ponder: "Как вы думаете?"
};
}, function(e, t, r) {
"use strict";
function n(e) {
for (var t = 0; t < e.tokens.length; t++) if ("fence" == e.tokens[t].type) {
var r = i(e.tokens[t].info, !0), n = r.blockName || "";
if (-1 == l.allSupported.indexOf(n)) continue;
e.tokens[t].type = "blocktag_source", e.tokens[t].blockTagAttrs = r;
}
}
var i = r(325), o = r(335), a = r(336), s = r(326), l = r(337), c = r(252).lang;
s.requirePhrase("markit.code", r(345)("./" + c + ".yml")), e.exports = function(e) {
e.core.ruler.push("rewrite_fence_to_source", n), e.renderer.rules.blocktag_source = function(t, r, n, i, c) {
var u = t[r], h = u.blockTagAttrs, f = h.blockName, d = l(f);
u.attrPush([ "data-trusted", n.html && !h.untrusted ? 1 : 0 ]), u.attrPush([ "class", "code-example" ]), 
h["no-strict"] && u.attrPush([ "data-no-strict", 1 ]);
var p = void 0;
+h.height && (p = +h.height, n.html || (p = Math.max(p, 800)), u.attrPush([ "data-demo-height", p ])), 
n.html && h.autorun && u.attrPush([ "data-autorun", h.autorun ]), h.refresh && u.attrPush([ "data-refresh", "1" ]), 
n.html && h.demo && u.attrPush([ "data-demo", "1" ]);
var m = o(u.content), g = a(m);
g.block && u.attrPush([ "data-highlight-block", g.block ]), g.inline && u.attrPush([ "data-highlight-inline", g.inline ]), 
m = g.text;
var v = "";
h.run && (v = '\n        <div class="toolbar codebox__toolbar">\n          <div class="toolbar__tool">\n            <a href="#" title="' + s("js" == f ? "markit.code.run" : "markit.code.show") + '" data-action="run" class="toolbar__button toolbar__button_run"></a>\n          </div>\n          <div class="toolbar__tool">\n            <a href="#" title="' + s("markit.code.open.sandbox") + '" target="_blank" data-action="edit" class="toolbar__button toolbar__button_edit"></a>\n          </div>\n        </div>');
var b = "";
return h.autorun && n.html && "html" == f && (b = '<div class="code-result code-example__result">\n        <iframe\n          class="code-result__iframe"\n          name="code-result-' + (1e9 * Math.random() ^ 0).toString(36) + '"\n          style="height:' + (p || 200) + 'px"\n          src="' + ("epub" == n.ebookType ? "/bookify/blank.html?" + Math.random() : "about:blank") + '"></iframe>\n      </div>'), 
"<div" + c.renderAttrs(u) + '>\n      <div class="codebox code-example__codebox">\n        ' + v + '\n        <div class="codebox__code" data-code="1">\n          <pre class="line-numbers language-' + d + '"><code class="language-' + d + '">' + e.utils.escapeHtml(m) + "</code></pre>\n        </div>\n      </div>\n      " + b + "\n      </div>";
};
};
}, function(e, t) {
"use strict";
function r(e) {
return e.replace(/^\n+/, "");
}
function n(e) {
return e.replace(/\s+$/, "");
}
function i(e) {
return e.replace(/[ \t]+$/gim, "");
}
function o(e) {
if (!e) return e;
var t = /^ *(?=\S+)/gm, r = e.match(t).reduce(function(e, t) {
return Math.min(e, t.length);
}, 1 / 0), n = RegExp("^ {" + r + "}", "gm");
return r > 0 ? e.replace(n, "") : e;
}
function a(e) {
if (!e) return e;
var t = /^\t*(?=\S+)/gm, r = e.match(t).reduce(function(e, t) {
return Math.min(e, t.length);
}, 1 / 0), n = RegExp("^	{" + r + "}", "gm");
return r > 0 ? e.replace(n, "") : e;
}
e.exports = function(e) {
return e = n(e), e = i(e), e = r(e), e = o(e), e = a(e);
};
}, function(e, t) {
"use strict";
function r(e) {
return e = e.replace(/\t(?=\t)/g, "  "), e = e.replace(/\t/g, "~A~B"), e = e.replace(/~B(.+?)~A/g, function(e, t) {
for (var r = t, n = 2 - r.length % 2, i = 0; n > i; i++) r += " ";
return r;
}), e = e.replace(/~A/g, "  "), e = e.replace(/~B/g, "");
}
e.exports = function(e) {
e = r(e), e += "\n";
var t = {
block: [],
inline: []
}, n = null, i = [];
return e.split("\n").forEach(function(e) {
if (/^\s*\*!\*\s*$/.test(e)) n ? i.push(e) : n = i.length; else if (/^\s*\*\/!\*\s*$/.test(e)) null !== n ? (t.block.push(n + "-" + (i.length - 1)), 
n = null) : i.push(e); else if (/\s*\*!\*\s*$/.test(e)) t.block.push(i.length + "-" + i.length), 
e = e.replace(/\s*\*!\*\s*$/g, ""), i.push(e); else {
i.push("");
for (var r = 0; ;) {
var o = e.indexOf("*!*"), a = e.indexOf("*/!*");
if (-1 == o || -1 == a) {
i[i.length - 1] += e;
break;
}
t.inline.push(i.length - 1 + ":" + (r + o) + "-" + (r + a - 3)), i[i.length - 1] += e.slice(0, a + 4).replace(/\*\/?!\*/g, ""), 
r += a - 3, e = e.slice(a + 4);
}
}
}), n && t.block.push(n + "-" + (i.length - 1)), {
block: t.block.join(","),
inline: t.inline.join(","),
text: i.join("\n").replace(/\s+$/, "")
};
};
}, function(e, t) {
"use strict";
function r(e) {
return e = n[e] || e, -1 == i.indexOf(e) && (e = "none"), e;
}
var n = {
html: "markup",
js: "javascript",
coffee: "coffeescript",
"": "none"
}, i = "none markup javascript css coffeescript php http java ruby scss sql".split(" "), o = Object.keys(n).concat(i);
r.languages = i, r.allSupported = o, e.exports = r;
}, function(e, t, r) {
"use strict";
function n(e) {
function t(t) {
if (t.children.length) {
var r = t.children[t.children.length - 1], n = r.content.split("|");
if (2 == n.length || (n = r.content.split(", "), 2 == n.length)) {
r.content = n[0];
var a = i(n[1]);
for (var s in a) (e.md.options.html || -1 != [ "height", "width" ].indexOf(s)) && o.attrReplace(t, s, a[s]);
}
}
}
for (var r = 0; r < e.tokens.length; r++) {
var n = e.tokens[r];
if ("inline" === n.type) for (var a = 0; a < n.children.length; a++) {
var s = n.children[a];
"image" == s.type && t(s);
}
}
}
var i = r(325), o = r(339);
e.exports = function(e) {
e.core.ruler.push("read_img_attrs", n);
};
}, function(e, t) {
"use strict";
function r(e, t, r) {
var n, i = e.attrs;
if (i) {
for (var o = 0; o < i.length; o++) i[o][0] === t && (n ? (i.splice(o, 1), o--) : (i[o][1] = r, 
n = !0));
n || i.push([ t, r ]);
} else e.attrs = [ [ t, r ] ];
}
function n(e, t) {
var n = i(e, "class");
n.match(RegExp("\b" + t + "\b")) || (n ? n += " " + t : n = t, r(e, "class", n));
}
function i(e, t) {
var r = e.attrIndex(t);
return -1 == r ? null : e.attrs[r][1];
}
function o(e, t) {
var r = e.attrIndex(t);
return -1 == r ? null : void e.attrs.splice(r, 1);
}
t.attrReplace = r, t.attrGet = i, t.attrDel = o, t.addClass = n;
}, function(e, t) {
"use strict";
e.exports = function(e) {
e.renderer.rules.markdown_error_block = function(t, r, n, i, o) {
return '<div class="markdown-error">' + e.utils.escapeHtml(t[r].content) + "</div>";
}, e.renderer.rules.markdown_error_inline = function(t, r, n, i, o) {
return '<span class="markdown-error">' + e.utils.escapeHtml(t[r].content) + "</span>";
};
};
}, function(e, t, r) {
"use strict";
function n(e) {
for (var t = 1; t < e.tokens.length - 1; t++) if ("paragraph_open" == e.tokens[t - 1].type && "paragraph_close" == e.tokens[t + 1].type && "inline" == e.tokens[t].type) {
var r = e.tokens[t].content.trim().match(/^\[(\w+\s*[^\]]*)\]$/);
if (!r) continue;
var n = i(r[1], !0), a = n.blockName;
if (!e.md.options.blockTags || -1 == e.md.options.blockTags.indexOf(a)) continue;
var s = -1 == o.allSupported.indexOf(a) ? "blocktag_" + a : "blocktag_source", l = new e.Token(s, a, e.tokens[t].nesting);
l.blockTagAttrs = n, l.map = e.tokens[t].map.slice(), l.block = !0, l.level = e.tokens[t].level, 
e.tokens.splice(t - 1, 3, l);
}
}
var i = r(325), o = r(337);
e.exports = function(e) {
e.core.ruler.push("rewrite_inline_to_block_tags", n);
};
}, , function(e, t) {
"use strict";
e.exports = function(e) {
function t(e, t) {
var r, n, i = e.bMarks[t] + e.tShift[t], o = e.eMarks[t];
return i >= o ? -1 : (n = e.src.charCodeAt(i++), 126 !== n && 58 !== n ? -1 : (r = e.skipSpaces(i), 
i === r ? -1 : r >= o ? -1 : i));
}
function r(e, t) {
var r, n, i = e.level + 2;
for (r = t + 2, n = e.tokens.length - 2; n > r; r++) e.tokens[r].level === i && "paragraph_open" === e.tokens[r].type && (e.tokens[r + 2].hidden = !0, 
e.tokens[r].hidden = !0, r += 2);
}
function n(e, n, o, a) {
var s, l, c, u, h, f, d, p, m, g, v, b, y, x, k, w, C, S, _, A;
if (a) return e.ddIndent < 0 ? !1 : t(e, n) >= 0;
if (m = n + 1, e.isEmpty(m) && ++m > o) return !1;
if (e.sCount[m] < e.blkIndent) return !1;
if (l = t(e, m), 0 > l) return !1;
d = e.tokens.length, A = e.push("dl_open", "dl", 1), A.map = f = [ n, 0 ], u = n, 
c = m;
e: for (;;) {
for (_ = !0, S = !1, A = e.push("dt_open", "dt", 1), A.map = [ u, u ], A = e.push("inline", "", 0), 
A.map = [ u, u ], A.content = e.getLines(u, u + 1, e.blkIndent, !1).trim(), A.children = [], 
A = e.push("dt_close", "dt", -1); ;) {
for (A = e.push("dd_open", "dd", 1), A.map = h = [ m, 0 ], C = l, p = e.eMarks[c], 
g = e.sCount[c] + l - (e.bMarks[c] + e.tShift[c]); p > C && (s = e.src.charCodeAt(C), 
i(s)); ) 9 === s ? g += 4 - g % 4 : g++, C++;
if (l = C, w = e.tight, v = e.ddIndent, b = e.blkIndent, k = e.tShift[c], x = e.sCount[c], 
y = e.parentType, e.blkIndent = e.ddIndent = e.sCount[c] + 2, e.tShift[c] = l - e.bMarks[c], 
e.sCount[c] = g, e.tight = !0, e.parentType = "deflist", e.md.block.tokenize(e, c, o, !0), 
(!e.tight || S) && (_ = !1), S = e.line - c > 1 && e.isEmpty(e.line - 1), e.tShift[c] = k, 
e.sCount[c] = x, e.tight = w, e.parentType = y, e.blkIndent = b, e.ddIndent = v, 
A = e.push("dd_close", "dd", -1), h[1] = m = e.line, m >= o) break e;
if (e.sCount[m] < e.blkIndent) break e;
if (l = t(e, m), 0 > l) break;
c = m;
}
if (m >= o) break;
if (u = m, e.isEmpty(u)) break;
if (e.sCount[u] < e.blkIndent) break;
if (c = u + 1, c >= o) break;
if (e.isEmpty(c) && c++, c >= o) break;
if (e.sCount[c] < e.blkIndent) break;
if (l = t(e, c), 0 > l) break;
}
return A = e.push("dl_close", "dl", -1), f[1] = m, e.line = m, _ && r(e, d), !0;
}
var i = e.utils.isSpace;
e.block.ruler.before("paragraph", "deflist", n, {
alt: [ "paragraph", "reference" ]
});
};
}, function(e, t) {
"use strict";
function r(e) {
for (var t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && n(e.tokens[t].children);
}
function n(e) {
var t, r;
for (t = 0; t < e.length; t++) r = e[t], "text" === r.type && (r.content = r.content.replace(/([^+])\+\-/gi, "$1±").replace(/\.\.\./gm, "…").replace(/\([сСcC]\)(?=[^\.\,\;\:])/gi, "©").replace(/\(r\)/gi, "<sup>®</sup>").replace(/\(tm\)/gi, "™").replace(/(\s|;)\-(\s)/gi, "$1–$2").replace(/<->/gi, "↔").replace(/<-/gi, "←").replace(/(\s)->/gi, "$1→").replace(/\s-(\w)/gim, "&#8209;$1"));
}
e.exports = function(e, t) {
e.core.ruler.before("replacements", "char_typography", r);
};
}, function(e, t, r) {
function n(e) {
return r(i(e));
}
function i(e) {
return o[e] || function() {
throw Error("Cannot find module '" + e + "'.");
}();
}
var o = {
"./en.yml": 346,
"./ru.yml": 347
};
n.keys = function() {
return Object.keys(o);
}, n.resolve = i, e.exports = n, n.id = 345;
}, function(e, t) {
e.exports = {
run: "run",
show: "show",
open: {
sandbox: "open in sandbox"
}
};
}, function(e, t) {
e.exports = {
run: "выполнить",
show: "показать",
open: {
sandbox: "открыть в песочнице"
}
};
}, , , , , , , , , , , function(e, t) {}, function(e, t, r) {
"use strict";
function n(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function e(e, t) {
for (var r = 0; r < t.length; r++) {
var n = t[r];
n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
Object.defineProperty(e, n.key, n);
}
}
return function(t, r, n) {
return r && e(t.prototype, r), n && e(t, n), t;
};
}(), o = r(251), a = r(360), s = r(237);
r(361);
var l = r(366), c = r(370), u = r(161), h = r(148), f = r(326), d = r(252).lang;
f.requirePhrase("mdeditor", r(367)("./" + d + ".yml"));
var p = {
standard: "bold italic | link ul ol | code fencedCode | undo redo".split(" ")
}, m = function() {
function e(t) {
var r = this;
n(this, e), this.options = Object.create(t), t.buttonSet || (this.options.buttonSet = "standard"), 
this.render(t.elem), this.value = this.elem.value, this.delegate("[data-action]", "click", function(e) {
var t = "action" + e.delegateTarget.getAttribute("data-action")[0].toUpperCase() + e.delegateTarget.getAttribute("data-action").slice(1);
this[t] && (e.preventDefault(), this[t](), this.codemirror.focus());
}), this.onResizeMouseDown = this.onResizeMouseDown.bind(this), this.onResizeMouseMove = this.onResizeMouseMove.bind(this), 
this.onResizeMouseUp = this.onResizeMouseUp.bind(this), this.renderPreviewThrottled = c(this.renderPreview.bind(this), 100), 
this.highlightInPreviewThrottled = c(this.highlightInPreview.bind(this), 500), this.delegate("[data-mdeditor-resize]", "mousedown", this.onResizeMouseDown), 
this.codemirror = a.fromTextArea(this.elem.querySelector("textarea"), {
tabSize: 2,
mode: "gfm"
}), this.codemirror.setOption("extraKeys", {
"Ctrl-B": function() {
return r.actionBold();
},
"Ctrl-I": function() {
return r.actionItalic();
},
"Cmd-B": function() {
return r.actionBold();
},
"Cmd-I": function() {
return r.actionItalic();
}
}), this.codemirror.on("change", this.renderPreviewThrottled);
}
return i(e, [ {
key: "actionBold",
value: function() {
this.replaceSelection("**", "**", f("mdeditor.text.bold"));
}
}, {
key: "actionItalic",
value: function() {
this.replaceSelection("*", "*", f("mdeditor.text.italic"));
}
}, {
key: "actionCode",
value: function() {
this.replaceSelection("`", "`", f("mdeditor.text.code"));
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
var e = this.codemirror.getSelection();
this.replaceSelection("\n```js\n", "\n```\n", f("mdeditor.text.fencedCode"));
var t = this.codemirror.getCursor(), r = t.line - 2;
this.codemirror.setCursor(r, 9999), e || this.codemirror.setSelection({
line: r,
ch: 0
}, {
line: r,
ch: 9999
});
}
}, {
key: "actionLink",
value: function() {
var e = void 0, t = void 0, r = this.codemirror.getSelection();
r && (r.match(/^https?:\/\//) ? t = r : e = r);
var n = "[" + (e || f("mdeditor.text.link")) + "](" + (t || "http://") + ")";
this.codemirror.replaceSelection(n);
var i = this.codemirror.getCursor();
e ? t || this.codemirror.setCursor(i.line, i.ch - 1) : (this.codemirror.setCursor(i.line, i.ch - n.length + 1 + f("mdeditor.text.link").length), 
this.codemirror.setSelection({
line: i.line,
ch: i.ch - n.length + 1
}, {
line: i.line,
ch: i.ch - n.length + 1 + f("mdeditor.text.link").length
}));
}
}, {
key: "actionOl",
value: function() {
var e = this.codemirror.getCursor();
this.codemirror.setSelection({
line: e.line,
ch: 0
}, {
line: e.line,
ch: 99999
}), this.replaceSelection("1. ", "\n", f("mdeditor.text.ol"));
}
}, {
key: "actionUl",
value: function() {
var e = this.codemirror.getCursor();
this.codemirror.setSelection({
line: e.line,
ch: 0
}, {
line: e.line,
ch: 99999
}), this.replaceSelection("- ", "\n", f("mdeditor.text.ol"));
}
}, {
key: "actionHeading",
value: function() {
var e = this.codemirror.getCursor();
this.codemirror.setSelection({
line: e.line,
ch: 0
}, {
line: e.line,
ch: 99999
}), this.replaceSelection("# ", "\n", f("mdeditor.text.heading"));
}
}, {
key: "actionImage",
value: function() {
var e = this.codemirror.getSelection(), t = f("mdeditor.text.alt");
e || (e = "http://my.jpg"), this.codemirror.replaceSelection("![" + t + "](" + e + ")");
var r = this.codemirror.getCursor();
this.codemirror.setCursor(r.line, r.ch - (1 + e.length));
}
}, {
key: "replaceSelection",
value: function(e, t, r) {
var n = this.codemirror.getSelection(), i = !n, o = i ? e + r + t : e + n + t;
this.codemirror.replaceSelection(o);
var a = this.codemirror.getCursor();
i && (this.codemirror.setCursor(a.line, a.ch - t.length), this.codemirror.setSelection({
line: a.line,
ch: a.ch - r.length - t.length
}, {
line: a.line,
ch: a.ch - t.length
}));
}
}, {
key: "render",
value: function(e) {
var t = p[this.options.buttonSet || "standard"];
e.insertAdjacentHTML("afterEnd", u(l, {
buttons: t
})), this.elem = e.nextElementSibling;
var r = this.elem.querySelector("textarea");
r.replace(e), e.classList.remove("mdeditor");
for (var n = 0; n < r.classList.length; n++) {
var i = r.classList[n];
e.classList.add(i);
}
}
}, {
key: "onResizeMouseDown",
value: function(e) {
this.elem.classList.add("mdeditor_resizing"), document.addEventListener("mousemove", this.onResizeMouseMove), 
document.addEventListener("mouseup", this.onResizeMouseUp), e.preventDefault();
}
}, {
key: "onResizeMouseMove",
value: function(e) {
var t = this.codemirror.getWrapperElement(), r = e.clientY - t.getBoundingClientRect().top;
30 > r && (r = 30), this.codemirror.setSize("100%", r);
}
}, {
key: "onResizeMouseUp",
value: function(e) {
this.elem.classList.remove("mdeditor_resizing"), document.removeEventListener("mousemove", this.onResizeMouseMove), 
document.removeEventListener("mouseup", this.onResizeMouseUp);
}
} ]), i(e, [ {
key: "highlightInPreview",
value: function() {
s.highlight(this.elem.querySelector("[data-editor-preview]"));
}
}, {
key: "renderPreview",
value: function() {
var e = this.codemirror.getValue(), t = new o().render(e);
this.elem.querySelector("[data-editor-preview]").innerHTML = t, this.highlightInPreviewThrottled();
}
} ]), e;
}();
h.delegateMixin(m.prototype), e.exports = m;
}, function(e, t, r) {
!function(t) {
e.exports = t();
}(function() {
"use strict";
function e(r, n) {
if (!(this instanceof e)) return new e(r, n);
this.options = n = n ? Ri(n) : {}, Ri(Qo, n, !1), d(n);
var i = n.value;
"string" == typeof i && (i = new Ca(i, n.mode, null, n.lineSeparator)), this.doc = i;
var o = new e.inputStyles[n.inputStyle](this), a = this.display = new t(r, i, o);
a.wrapper.CodeMirror = this, c(this), s(this), n.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), 
n.autofocus && !Eo && a.input.focus(), v(this), this.state = {
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
highlight: new Mi(),
keySeq: null,
specialChars: null
};
var l = this;
yo && 11 > xo && setTimeout(function() {
l.display.input.reset(!0);
}, 20), Wt(this), Yi(), xt(this), this.curOp.forceUpdate = !0, Kn(this, i), n.autofocus && !Eo || l.hasFocus() ? setTimeout(zi(gr, this), 20) : vr(this);
for (var u in ea) ea.hasOwnProperty(u) && ea[u](this, n[u], ta);
w(this), n.finishInit && n.finishInit(this);
for (var h = 0; h < oa.length; ++h) oa[h](this);
wt(this), ko && n.lineWrapping && "optimizelegibility" == getComputedStyle(a.lineDiv).textRendering && (a.lineDiv.style.textRendering = "auto");
}
function t(e, t, r) {
var n = this;
this.input = r, n.scrollbarFiller = Wi("div", null, "CodeMirror-scrollbar-filler"), 
n.scrollbarFiller.setAttribute("cm-not-content", "true"), n.gutterFiller = Wi("div", null, "CodeMirror-gutter-filler"), 
n.gutterFiller.setAttribute("cm-not-content", "true"), n.lineDiv = Wi("div", null, "CodeMirror-code"), 
n.selectionDiv = Wi("div", null, null, "position: relative; z-index: 1"), n.cursorDiv = Wi("div", null, "CodeMirror-cursors"), 
n.measure = Wi("div", null, "CodeMirror-measure"), n.lineMeasure = Wi("div", null, "CodeMirror-measure"), 
n.lineSpace = Wi("div", [ n.measure, n.lineMeasure, n.selectionDiv, n.cursorDiv, n.lineDiv ], null, "position: relative; outline: none"), 
n.mover = Wi("div", [ Wi("div", [ n.lineSpace ], "CodeMirror-lines") ], null, "position: relative"), 
n.sizer = Wi("div", [ n.mover ], "CodeMirror-sizer"), n.sizerWidth = null, n.heightForcer = Wi("div", null, null, "position: absolute; height: " + Ia + "px; width: 1px;"), 
n.gutters = Wi("div", null, "CodeMirror-gutters"), n.lineGutter = null, n.scroller = Wi("div", [ n.sizer, n.heightForcer, n.gutters ], "CodeMirror-scroll"), 
n.scroller.setAttribute("tabIndex", "-1"), n.wrapper = Wi("div", [ n.scrollbarFiller, n.gutterFiller, n.scroller ], "CodeMirror"), 
yo && 8 > xo && (n.gutters.style.zIndex = -1, n.scroller.style.paddingRight = 0), 
ko || go && Eo || (n.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(n.wrapper) : e(n.wrapper)), 
n.viewFrom = n.viewTo = t.first, n.reportedViewFrom = n.reportedViewTo = t.first, 
n.view = [], n.renderedView = null, n.externalMeasured = null, n.viewOffset = 0, 
n.lastWrapHeight = n.lastWrapWidth = 0, n.updateLineNumbers = null, n.nativeBarWidth = n.barHeight = n.barWidth = 0, 
n.scrollbarsClipped = !1, n.lineNumWidth = n.lineNumInnerWidth = n.lineNumChars = null, 
n.alignWidgets = !1, n.cachedCharWidth = n.cachedTextHeight = n.cachedPaddingH = null, 
n.maxLine = null, n.maxLineLength = 0, n.maxLineChanged = !1, n.wheelDX = n.wheelDY = n.wheelStartX = n.wheelStartY = null, 
n.shift = !1, n.selForContextMenu = null, n.activeTouch = null, r.init(n);
}
function r(t) {
t.doc.mode = e.getMode(t.options, t.doc.modeOption), n(t);
}
function n(e) {
e.doc.iter(function(e) {
e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
}), e.doc.frontier = e.doc.first, qe(e, 100), e.state.modeGen++, e.curOp && Ft(e);
}
function i(e) {
e.options.lineWrapping ? (Xa(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", 
e.display.sizerWidth = null) : (Ka(e.display.wrapper, "CodeMirror-wrap"), f(e)), 
a(e), Ft(e), st(e), setTimeout(function() {
b(e);
}, 100);
}
function o(e) {
var t = bt(e.display), r = e.options.lineWrapping, n = r && Math.max(5, e.display.scroller.clientWidth / yt(e.display) - 3);
return function(i) {
if (wn(e.doc, i)) return 0;
var o = 0;
if (i.widgets) for (var a = 0; a < i.widgets.length; a++) i.widgets[a].height && (o += i.widgets[a].height);
return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t;
};
}
function a(e) {
var t = e.doc, r = o(e);
t.iter(function(e) {
var t = r(e);
t != e.height && ei(e, t);
});
}
function s(e) {
e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), 
st(e);
}
function l(e) {
c(e), Ft(e), setTimeout(function() {
k(e);
}, 20);
}
function c(e) {
var t = e.display.gutters, r = e.options.gutters;
ji(t);
for (var n = 0; n < r.length; ++n) {
var i = r[n], o = t.appendChild(Wi("div", null, "CodeMirror-gutter " + i));
"CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px");
}
t.style.display = n ? "" : "none", u(e);
}
function u(e) {
var t = e.display.gutters.offsetWidth;
e.display.sizer.style.marginLeft = t + "px";
}
function h(e) {
if (0 == e.height) return 0;
for (var t, r = e.text.length, n = e; t = mn(n); ) {
var i = t.find(0, !0);
n = i.from.line, r += i.from.ch - i.to.ch;
}
for (n = e; t = gn(n); ) {
var i = t.find(0, !0);
r -= n.text.length - i.from.ch, n = i.to.line, r += n.text.length - i.to.ch;
}
return r;
}
function f(e) {
var t = e.display, r = e.doc;
t.maxLine = Xn(r, r.first), t.maxLineLength = h(t.maxLine), t.maxLineChanged = !0, 
r.iter(function(e) {
var r = h(e);
r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e);
});
}
function d(e) {
var t = Oi(e.gutters, "CodeMirror-linenumbers");
-1 == t && e.lineNumbers ? e.gutters = e.gutters.concat([ "CodeMirror-linenumbers" ]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), 
e.gutters.splice(t, 1));
}
function p(e) {
var t = e.display, r = t.gutters.offsetWidth, n = Math.round(e.doc.height + Ue(e.display));
return {
clientHeight: t.scroller.clientHeight,
viewHeight: t.wrapper.clientHeight,
scrollWidth: t.scroller.scrollWidth,
clientWidth: t.scroller.clientWidth,
viewWidth: t.wrapper.clientWidth,
barLeft: e.options.fixedGutter ? r : 0,
docHeight: n,
scrollHeight: n + Ve(e) + t.barHeight,
nativeBarWidth: t.nativeBarWidth,
gutterWidth: r
};
}
function m(e, t, r) {
this.cm = r;
var n = this.vert = Wi("div", [ Wi("div", null, null, "min-width: 1px") ], "CodeMirror-vscrollbar"), i = this.horiz = Wi("div", [ Wi("div", null, null, "height: 100%; min-height: 1px") ], "CodeMirror-hscrollbar");
e(n), e(i), Ea(n, "scroll", function() {
n.clientHeight && t(n.scrollTop, "vertical");
}), Ea(i, "scroll", function() {
i.clientWidth && t(i.scrollLeft, "horizontal");
}), this.checkedZeroWidth = !1, yo && 8 > xo && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
}
function g() {}
function v(t) {
t.display.scrollbars && (t.display.scrollbars.clear(), t.display.scrollbars.addClass && Ka(t.display.wrapper, t.display.scrollbars.addClass)), 
t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](function(e) {
t.display.wrapper.insertBefore(e, t.display.scrollbarFiller), Ea(e, "mousedown", function() {
t.state.focused && setTimeout(function() {
t.display.input.focus();
}, 0);
}), e.setAttribute("cm-not-content", "true");
}, function(e, r) {
"horizontal" == r ? ir(t, e) : nr(t, e);
}, t), t.display.scrollbars.addClass && Xa(t.display.wrapper, t.display.scrollbars.addClass);
}
function b(e, t) {
t || (t = p(e));
var r = e.display.barWidth, n = e.display.barHeight;
y(e, t);
for (var i = 0; 4 > i && r != e.display.barWidth || n != e.display.barHeight; i++) r != e.display.barWidth && e.options.lineWrapping && D(e), 
y(e, p(e)), r = e.display.barWidth, n = e.display.barHeight;
}
function y(e, t) {
var r = e.display, n = r.scrollbars.update(t);
r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", 
n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", 
r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", 
n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", 
r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = "";
}
function x(e, t, r) {
var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;
n = Math.floor(n - je(e));
var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight, o = ri(t, n), a = ri(t, i);
if (r && r.ensure) {
var s = r.ensure.from.line, l = r.ensure.to.line;
o > s ? (o = s, a = ri(t, ni(Xn(t, s)) + e.wrapper.clientHeight)) : Math.min(l, t.lastLine()) >= a && (o = ri(t, ni(Xn(t, l)) - e.wrapper.clientHeight), 
a = l);
}
return {
from: o,
to: Math.max(a, o + 1)
};
}
function k(e) {
var t = e.display, r = t.view;
if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
for (var n = S(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", a = 0; a < r.length; a++) if (!r[a].hidden) {
e.options.fixedGutter && r[a].gutter && (r[a].gutter.style.left = o);
var s = r[a].alignable;
if (s) for (var l = 0; l < s.length; l++) s[l].style.left = o;
}
e.options.fixedGutter && (t.gutters.style.left = n + i + "px");
}
}
function w(e) {
if (!e.options.lineNumbers) return !1;
var t = e.doc, r = C(e.options, t.first + t.size - 1), n = e.display;
if (r.length != n.lineNumChars) {
var i = n.measure.appendChild(Wi("div", [ Wi("div", r) ], "CodeMirror-linenumber CodeMirror-gutter-elt")), o = i.firstChild.offsetWidth, a = i.offsetWidth - o;
return n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - a) + 1, 
n.lineNumWidth = n.lineNumInnerWidth + a, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, 
n.lineGutter.style.width = n.lineNumWidth + "px", u(e), !0;
}
return !1;
}
function C(e, t) {
return e.lineNumberFormatter(t + e.firstLineNumber) + "";
}
function S(e) {
return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
}
function _(e, t, r) {
var n = e.display;
this.viewport = t, this.visible = x(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, 
this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, 
this.oldDisplayWidth = $e(e), this.force = r, this.dims = O(e), this.events = [];
}
function A(e) {
var t = e.display;
!t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, 
t.heightForcer.style.height = Ve(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", 
t.sizer.style.borderRightWidth = Ve(e) + "px", t.scrollbarsClipped = !0);
}
function L(e, t) {
var r = e.display, n = e.doc;
if (t.editorIsHidden) return Rt(e), !1;
if (!t.force && t.visible.from >= r.viewFrom && t.visible.to <= r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && 0 == Ht(e)) return !1;
w(e) && (Rt(e), t.dims = O(e));
var i = n.first + n.size, o = Math.max(t.visible.from - e.options.viewportMargin, n.first), a = Math.min(i, t.visible.to + e.options.viewportMargin);
r.viewFrom < o && o - r.viewFrom < 20 && (o = Math.max(n.first, r.viewFrom)), r.viewTo > a && r.viewTo - a < 20 && (a = Math.min(i, r.viewTo)), 
Po && (o = xn(e.doc, o), a = kn(e.doc, a));
var s = o != r.viewFrom || a != r.viewTo || r.lastWrapHeight != t.wrapperHeight || r.lastWrapWidth != t.wrapperWidth;
Bt(e, o, a), r.viewOffset = ni(Xn(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
var l = Ht(e);
if (!s && 0 == l && !t.force && r.renderedView == r.view && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)) return !1;
var c = Gi();
return l > 4 && (r.lineDiv.style.display = "none"), I(e, r.updateLineNumbers, t.dims), 
l > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view, c && Gi() != c && c.offsetHeight && c.focus(), 
ji(r.cursorDiv), ji(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, 
s && (r.lastWrapHeight = t.wrapperHeight, r.lastWrapWidth = t.wrapperWidth, qe(e, 400)), 
r.updateLineNumbers = null, !0;
}
function T(e, t) {
for (var r = t.viewport, n = !0; (n && e.options.lineWrapping && t.oldDisplayWidth != $e(e) || (r && null != r.top && (r = {
top: Math.min(e.doc.height + Ue(e.display) - Ze(e), r.top)
}), t.visible = x(e.display, e.doc, r), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && L(e, t); n = !1) {
D(e);
var i = p(e);
Ie(e), M(e, i), b(e, i);
}
t.signal(e, "update", e), (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), 
e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
}
function E(e, t) {
var r = new _(e, t);
if (L(e, r)) {
D(e), T(e, r);
var n = p(e);
Ie(e), M(e, n), b(e, n), r.finish();
}
}
function M(e, t) {
e.display.sizer.style.minHeight = t.docHeight + "px";
var r = t.docHeight + e.display.barHeight;
e.display.heightForcer.style.top = r + "px", e.display.gutters.style.height = Math.max(r + Ve(e), t.clientHeight) + "px";
}
function D(e) {
for (var t = e.display, r = t.lineDiv.offsetTop, n = 0; n < t.view.length; n++) {
var i, o = t.view[n];
if (!o.hidden) {
if (yo && 8 > xo) {
var a = o.node.offsetTop + o.node.offsetHeight;
i = a - r, r = a;
} else {
var s = o.node.getBoundingClientRect();
i = s.bottom - s.top;
}
var l = o.line.height - i;
if (2 > i && (i = bt(t)), (l > .001 || -.001 > l) && (ei(o.line, i), N(o.line), 
o.rest)) for (var c = 0; c < o.rest.length; c++) N(o.rest[c]);
}
}
}
function N(e) {
if (e.widgets) for (var t = 0; t < e.widgets.length; ++t) e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight;
}
function O(e) {
for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, 
++a) r[e.options.gutters[a]] = o.offsetLeft + o.clientLeft + i, n[e.options.gutters[a]] = o.clientWidth;
return {
fixedPos: S(t),
gutterTotalWidth: t.gutters.offsetWidth,
gutterLeft: r,
gutterWidth: n,
wrapperWidth: t.wrapper.clientWidth
};
}
function I(e, t, r) {
function n(t) {
var r = t.nextSibling;
return ko && Mo && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), 
r;
}
for (var i = e.display, o = e.options.lineNumbers, a = i.lineDiv, s = a.firstChild, l = i.view, c = i.viewFrom, u = 0; u < l.length; u++) {
var h = l[u];
if (h.hidden) ; else if (h.node && h.node.parentNode == a) {
for (;s != h.node; ) s = n(s);
var f = o && null != t && c >= t && h.lineNumber;
h.changes && (Oi(h.changes, "gutter") > -1 && (f = !1), F(e, h, c, r)), f && (ji(h.lineNumber), 
h.lineNumber.appendChild(document.createTextNode(C(e.options, c)))), s = h.node.nextSibling;
} else {
var d = j(e, h, c, r);
a.insertBefore(d, s);
}
c += h.size;
}
for (;s; ) s = n(s);
}
function F(e, t, r, n) {
for (var i = 0; i < t.changes.length; i++) {
var o = t.changes[i];
"text" == o ? q(e, t) : "gutter" == o ? H(e, t, r, n) : "class" == o ? B(t) : "widget" == o && W(e, t, n);
}
t.changes = null;
}
function P(e) {
return e.node == e.text && (e.node = Wi("div", null, null, "position: relative"), 
e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), 
yo && 8 > xo && (e.node.style.zIndex = 2)), e.node;
}
function R(e) {
var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
if (t && (t += " CodeMirror-linebackground"), e.background) t ? e.background.className = t : (e.background.parentNode.removeChild(e.background), 
e.background = null); else if (t) {
var r = P(e);
e.background = r.insertBefore(Wi("div", null, t), r.firstChild);
}
}
function z(e, t) {
var r = e.display.externalMeasured;
return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, 
r.built) : zn(e, t);
}
function q(e, t) {
var r = t.text.className, n = z(e, t);
t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), 
t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, 
t.textClass = n.textClass, B(t)) : r && (t.text.className = r);
}
function B(e) {
R(e), e.line.wrapClass ? P(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");
var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
e.text.className = t || "";
}
function H(e, t, r, n) {
if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), 
t.gutterBackground = null), t.line.gutterClass) {
var i = P(t);
t.gutterBackground = Wi("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px; width: " + n.gutterTotalWidth + "px"), 
i.insertBefore(t.gutterBackground, t.text);
}
var o = t.line.gutterMarkers;
if (e.options.lineNumbers || o) {
var i = P(t), a = t.gutter = Wi("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px");
if (e.display.input.setUneditable(a), i.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass), 
!e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = a.appendChild(Wi("div", C(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), 
o) for (var s = 0; s < e.options.gutters.length; ++s) {
var l = e.options.gutters[s], c = o.hasOwnProperty(l) && o[l];
c && a.appendChild(Wi("div", [ c ], "CodeMirror-gutter-elt", "left: " + n.gutterLeft[l] + "px; width: " + n.gutterWidth[l] + "px"));
}
}
}
function W(e, t, r) {
t.alignable && (t.alignable = null);
for (var n, i = t.node.firstChild; i; i = n) {
var n = i.nextSibling;
"CodeMirror-linewidget" == i.className && t.node.removeChild(i);
}
U(e, t, r);
}
function j(e, t, r, n) {
var i = z(e, t);
return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), 
B(t), H(e, t, r, n), U(e, t, n), t.node;
}
function U(e, t, r) {
if (G(e, t.line, t, r, !0), t.rest) for (var n = 0; n < t.rest.length; n++) G(e, t.rest[n], t, r, !1);
}
function G(e, t, r, n, i) {
if (t.widgets) for (var o = P(r), a = 0, s = t.widgets; a < s.length; ++a) {
var l = s[a], c = Wi("div", [ l.node ], "CodeMirror-linewidget");
l.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"), V(l, c, r, n), 
e.display.input.setUneditable(c), i && l.above ? o.insertBefore(c, r.gutter || r.text) : o.appendChild(c), 
Si(l, "redraw");
}
}
function V(e, t, r, n) {
if (e.noHScroll) {
(r.alignable || (r.alignable = [])).push(t);
var i = n.wrapperWidth;
t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), 
t.style.width = i + "px";
}
e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"));
}
function $(e) {
return Ro(e.line, e.ch);
}
function Z(e, t) {
return zo(e, t) < 0 ? t : e;
}
function Y(e, t) {
return zo(e, t) < 0 ? e : t;
}
function K(e) {
e.state.focused || (e.display.input.focus(), gr(e));
}
function X(e, t, r, n, i) {
var o = e.doc;
e.display.shift = !1, n || (n = o.sel);
var a = e.state.pasteIncoming || "paste" == i, s = o.splitLines(t), l = null;
if (a && n.ranges.length > 1) if (qo && qo.join("\n") == t) {
if (n.ranges.length % qo.length == 0) {
l = [];
for (var c = 0; c < qo.length; c++) l.push(o.splitLines(qo[c]));
}
} else s.length == n.ranges.length && (l = Ii(s, function(e) {
return [ e ];
}));
for (var c = n.ranges.length - 1; c >= 0; c--) {
var u = n.ranges[c], h = u.from(), f = u.to();
u.empty() && (r && r > 0 ? h = Ro(h.line, h.ch - r) : e.state.overwrite && !a && (f = Ro(f.line, Math.min(Xn(o, f.line).text.length, f.ch + Ni(s).length))));
var d = e.curOp.updateInput, p = {
from: h,
to: f,
text: l ? l[c % l.length] : s,
origin: i || (a ? "paste" : e.state.cutIncoming ? "cut" : "+input")
};
_r(e.doc, p), Si(e, "inputRead", e, p);
}
t && !a && Q(e, t), Rr(e), e.curOp.updateInput = d, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1;
}
function J(e, t) {
var r = e.clipboardData && e.clipboardData.getData("text/plain");
return r ? (e.preventDefault(), t.isReadOnly() || t.options.disableInput || Et(t, function() {
X(t, r, 0, null, "paste");
}), !0) : void 0;
}
function Q(e, t) {
if (e.options.electricChars && e.options.smartIndent) for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
var i = r.ranges[n];
if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
var o = e.getModeAt(i.head), a = !1;
if (o.electricChars) {
for (var s = 0; s < o.electricChars.length; s++) if (t.indexOf(o.electricChars.charAt(s)) > -1) {
a = qr(e, i.head.line, "smart");
break;
}
} else o.electricInput && o.electricInput.test(Xn(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = qr(e, i.head.line, "smart"));
a && Si(e, "electricInput", e, i.head.line);
}
}
}
function ee(e) {
for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
var i = e.doc.sel.ranges[n].head.line, o = {
anchor: Ro(i, 0),
head: Ro(i + 1, 0)
};
r.push(o), t.push(e.getRange(o.anchor, o.head));
}
return {
text: t,
ranges: r
};
}
function te(e) {
e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", "false");
}
function re(e) {
this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Mi(), 
this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null;
}
function ne() {
var e = Wi("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"), t = Wi("div", [ e ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
return ko ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), To && (e.style.border = "1px solid black"), 
te(e), t;
}
function ie(e) {
this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, 
this.polling = new Mi(), this.gracePeriod = !1;
}
function oe(e, t) {
var r = Qe(e, t.line);
if (!r || r.hidden) return null;
var n = Xn(e.doc, t.line), i = Ke(r, n, t.line), o = ii(n), a = "left";
if (o) {
var s = co(o, t.ch);
a = s % 2 ? "right" : "left";
}
var l = rt(i.map, t.ch, a);
return l.offset = "right" == l.collapse ? l.end : l.start, l;
}
function ae(e, t) {
return t && (e.bad = !0), e;
}
function se(e, t, r) {
var n;
if (t == e.display.lineDiv) {
if (n = e.display.lineDiv.childNodes[r], !n) return ae(e.clipPos(Ro(e.display.viewTo - 1)), !0);
t = null, r = 0;
} else for (n = t; ;n = n.parentNode) {
if (!n || n == e.display.lineDiv) return null;
if (n.parentNode && n.parentNode == e.display.lineDiv) break;
}
for (var i = 0; i < e.display.view.length; i++) {
var o = e.display.view[i];
if (o.node == n) return le(o, t, r);
}
}
function le(e, t, r) {
function n(t, r, n) {
for (var i = -1; i < (u ? u.length : 0); i++) for (var o = 0 > i ? c.map : u[i], a = 0; a < o.length; a += 3) {
var s = o[a + 2];
if (s == t || s == r) {
var l = ti(0 > i ? e.line : e.rest[i]), h = o[a] + n;
return (0 > n || s != t) && (h = o[a + (n ? 1 : 0)]), Ro(l, h);
}
}
}
var i = e.text.firstChild, o = !1;
if (!t || !$a(i, t)) return ae(Ro(ti(e.line), 0), !0);
if (t == i && (o = !0, t = i.childNodes[r], r = 0, !t)) {
var a = e.rest ? Ni(e.rest) : e.line;
return ae(Ro(ti(a), a.text.length), o);
}
var s = 3 == t.nodeType ? t : null, l = t;
for (s || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (s = t.firstChild, 
r && (r = s.nodeValue.length)); l.parentNode != i; ) l = l.parentNode;
var c = e.measure, u = c.maps, h = n(s, l, r);
if (h) return ae(h, o);
for (var f = l.nextSibling, d = s ? s.nodeValue.length - r : 0; f; f = f.nextSibling) {
if (h = n(f, f.firstChild, 0)) return ae(Ro(h.line, h.ch - d), o);
d += f.textContent.length;
}
for (var p = l.previousSibling, d = r; p; p = p.previousSibling) {
if (h = n(p, p.firstChild, -1)) return ae(Ro(h.line, h.ch + d), o);
d += f.textContent.length;
}
}
function ce(e, t, r, n, i) {
function o(e) {
return function(t) {
return t.id == e;
};
}
function a(t) {
if (1 == t.nodeType) {
var r = t.getAttribute("cm-text");
if (null != r) return "" == r && (r = t.textContent.replace(/\u200b/g, "")), void (s += r);
var u, h = t.getAttribute("cm-marker");
if (h) {
var f = e.findMarks(Ro(n, 0), Ro(i + 1, 0), o(+h));
return void (f.length && (u = f[0].find()) && (s += Jn(e.doc, u.from, u.to).join(c)));
}
if ("false" == t.getAttribute("contenteditable")) return;
for (var d = 0; d < t.childNodes.length; d++) a(t.childNodes[d]);
/^(pre|div|p)$/i.test(t.nodeName) && (l = !0);
} else if (3 == t.nodeType) {
var p = t.nodeValue;
if (!p) return;
l && (s += c, l = !1), s += p;
}
}
for (var s = "", l = !1, c = e.doc.lineSeparator(); a(t), t != r; ) t = t.nextSibling;
return s;
}
function ue(e, t) {
this.ranges = e, this.primIndex = t;
}
function he(e, t) {
this.anchor = e, this.head = t;
}
function fe(e, t) {
var r = e[t];
e.sort(function(e, t) {
return zo(e.from(), t.from());
}), t = Oi(e, r);
for (var n = 1; n < e.length; n++) {
var i = e[n], o = e[n - 1];
if (zo(o.to(), i.from()) >= 0) {
var a = Y(o.from(), i.from()), s = Z(o.to(), i.to()), l = o.empty() ? i.from() == i.head : o.from() == o.head;
t >= n && --t, e.splice(--n, 2, new he(l ? s : a, l ? a : s));
}
}
return new ue(e, t);
}
function de(e, t) {
return new ue([ new he(e, t || e) ], 0);
}
function pe(e, t) {
return Math.max(e.first, Math.min(t, e.first + e.size - 1));
}
function me(e, t) {
if (t.line < e.first) return Ro(e.first, 0);
var r = e.first + e.size - 1;
return t.line > r ? Ro(r, Xn(e, r).text.length) : ge(t, Xn(e, t.line).text.length);
}
function ge(e, t) {
var r = e.ch;
return null == r || r > t ? Ro(e.line, t) : 0 > r ? Ro(e.line, 0) : e;
}
function ve(e, t) {
return t >= e.first && t < e.first + e.size;
}
function be(e, t) {
for (var r = [], n = 0; n < t.length; n++) r[n] = me(e, t[n]);
return r;
}
function ye(e, t, r, n) {
if (e.cm && e.cm.display.shift || e.extend) {
var i = t.anchor;
if (n) {
var o = zo(r, i) < 0;
o != zo(n, i) < 0 ? (i = r, r = n) : o != zo(r, n) < 0 && (r = n);
}
return new he(i, r);
}
return new he(n || r, r);
}
function xe(e, t, r, n) {
Ae(e, new ue([ ye(e, e.sel.primary(), t, r) ], 0), n);
}
function ke(e, t, r) {
for (var n = [], i = 0; i < e.sel.ranges.length; i++) n[i] = ye(e, e.sel.ranges[i], t[i], null);
var o = fe(n, e.sel.primIndex);
Ae(e, o, r);
}
function we(e, t, r, n) {
var i = e.sel.ranges.slice(0);
i[t] = r, Ae(e, fe(i, e.sel.primIndex), n);
}
function Ce(e, t, r, n) {
Ae(e, de(t, r), n);
}
function Se(e, t, r) {
var n = {
ranges: t.ranges,
update: function(t) {
this.ranges = [];
for (var r = 0; r < t.length; r++) this.ranges[r] = new he(me(e, t[r].anchor), me(e, t[r].head));
},
origin: r && r.origin
};
return Na(e, "beforeSelectionChange", e, n), e.cm && Na(e.cm, "beforeSelectionChange", e.cm, n), 
n.ranges != t.ranges ? fe(n.ranges, n.ranges.length - 1) : t;
}
function _e(e, t, r) {
var n = e.history.done, i = Ni(n);
i && i.ranges ? (n[n.length - 1] = t, Le(e, t, r)) : Ae(e, t, r);
}
function Ae(e, t, r) {
Le(e, t, r), hi(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r);
}
function Le(e, t, r) {
(Ti(e, "beforeSelectionChange") || e.cm && Ti(e.cm, "beforeSelectionChange")) && (t = Se(e, t, r));
var n = r && r.bias || (zo(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
Te(e, Me(e, t, n, !0)), r && r.scroll === !1 || !e.cm || Rr(e.cm);
}
function Te(e, t) {
t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, 
Li(e.cm)), Si(e, "cursorActivity", e));
}
function Ee(e) {
Te(e, Me(e, e.sel, null, !1), Pa);
}
function Me(e, t, r, n) {
for (var i, o = 0; o < t.ranges.length; o++) {
var a = t.ranges[o], s = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o], l = Ne(e, a.anchor, s && s.anchor, r, n), c = Ne(e, a.head, s && s.head, r, n);
(i || l != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new he(l, c));
}
return i ? fe(i, t.primIndex) : t;
}
function De(e, t, r, n, i) {
var o = Xn(e, t.line);
if (o.markedSpans) for (var a = 0; a < o.markedSpans.length; ++a) {
var s = o.markedSpans[a], l = s.marker;
if ((null == s.from || (l.inclusiveLeft ? s.from <= t.ch : s.from < t.ch)) && (null == s.to || (l.inclusiveRight ? s.to >= t.ch : s.to > t.ch))) {
if (i && (Na(l, "beforeCursorEnter"), l.explicitlyCleared)) {
if (o.markedSpans) {
--a;
continue;
}
break;
}
if (!l.atomic) continue;
if (r) {
var c, u = l.find(0 > n ? 1 : -1);
if ((0 > n ? l.inclusiveRight : l.inclusiveLeft) && (u = Oe(e, u, -n, o)), u && u.line == t.line && (c = zo(u, r)) && (0 > n ? 0 > c : c > 0)) return De(e, u, t, n, i);
}
var h = l.find(0 > n ? -1 : 1);
return (0 > n ? l.inclusiveLeft : l.inclusiveRight) && (h = Oe(e, h, n, o)), h ? De(e, h, t, n, i) : null;
}
}
return t;
}
function Ne(e, t, r, n, i) {
var o = n || 1, a = De(e, t, r, o, i) || !i && De(e, t, r, o, !0) || De(e, t, r, -o, i) || !i && De(e, t, r, -o, !0);
return a ? a : (e.cantEdit = !0, Ro(e.first, 0));
}
function Oe(e, t, r, n) {
return 0 > r && 0 == t.ch ? t.line > e.first ? me(e, Ro(t.line - 1)) : null : r > 0 && t.ch == (n || Xn(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? Ro(t.line + 1, 0) : null : new Ro(t.line, t.ch + r);
}
function Ie(e) {
e.display.input.showSelection(e.display.input.prepareSelection());
}
function Fe(e, t) {
for (var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), a = 0; a < r.sel.ranges.length; a++) if (t !== !1 || a != r.sel.primIndex) {
var s = r.sel.ranges[a], l = s.empty();
(l || e.options.showCursorWhenSelecting) && Pe(e, s.head, i), l || Re(e, s, o);
}
return n;
}
function Pe(e, t, r) {
var n = dt(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), i = r.appendChild(Wi("div", " ", "CodeMirror-cursor"));
if (i.style.left = n.left + "px", i.style.top = n.top + "px", i.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", 
n.other) {
var o = r.appendChild(Wi("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
o.style.display = "", o.style.left = n.other.left + "px", o.style.top = n.other.top + "px", 
o.style.height = .85 * (n.other.bottom - n.other.top) + "px";
}
}
function Re(e, t, r) {
function n(e, t, r, n) {
0 > t && (t = 0), t = Math.round(t), n = Math.round(n), s.appendChild(Wi("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == r ? u - e : r) + "px; height: " + (n - t) + "px"));
}
function i(t, r, i) {
function o(r, n) {
return ft(e, Ro(t, r), "div", h, n);
}
var s, l, h = Xn(a, t), f = h.text.length;
return eo(ii(h), r || 0, null == i ? f : i, function(e, t, a) {
var h, d, p, m = o(e, "left");
if (e == t) h = m, d = p = m.left; else {
if (h = o(t - 1, "right"), "rtl" == a) {
var g = m;
m = h, h = g;
}
d = m.left, p = h.right;
}
null == r && 0 == e && (d = c), h.top - m.top > 3 && (n(d, m.top, null, m.bottom), 
d = c, m.bottom < h.top && n(d, m.bottom, null, h.top)), null == i && t == f && (p = u), 
(!s || m.top < s.top || m.top == s.top && m.left < s.left) && (s = m), (!l || h.bottom > l.bottom || h.bottom == l.bottom && h.right > l.right) && (l = h), 
c + 1 > d && (d = c), n(d, h.top, p - d, h.bottom);
}), {
start: s,
end: l
};
}
var o = e.display, a = e.doc, s = document.createDocumentFragment(), l = Ge(e.display), c = l.left, u = Math.max(o.sizerWidth, $e(e) - o.sizer.offsetLeft) - l.right, h = t.from(), f = t.to();
if (h.line == f.line) i(h.line, h.ch, f.ch); else {
var d = Xn(a, h.line), p = Xn(a, f.line), m = bn(d) == bn(p), g = i(h.line, h.ch, m ? d.text.length + 1 : null).end, v = i(f.line, m ? 0 : null, f.ch).start;
m && (g.top < v.top - 2 ? (n(g.right, g.top, null, g.bottom), n(c, v.top, v.left, v.bottom)) : n(g.right, g.top, v.left - g.right, g.bottom)), 
g.bottom < v.top && n(c, g.bottom, null, v.top);
}
r.appendChild(s);
}
function ze(e) {
if (e.state.focused) {
var t = e.display;
clearInterval(t.blinker);
var r = !0;
t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden";
}, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
}
}
function qe(e, t) {
e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, zi(Be, e));
}
function Be(e) {
var t = e.doc;
if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
var r = +new Date() + e.options.workTime, n = sa(t.mode, We(e, t.frontier)), i = [];
t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
if (t.frontier >= e.display.viewFrom) {
var a = o.styles, s = o.text.length > e.options.maxHighlightLength, l = In(e, o, s ? sa(t.mode, n) : n, !0);
o.styles = l.styles;
var c = o.styleClasses, u = l.classes;
u ? o.styleClasses = u : c && (o.styleClasses = null);
for (var h = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), f = 0; !h && f < a.length; ++f) h = a[f] != o.styles[f];
h && i.push(t.frontier), o.stateAfter = s ? n : sa(t.mode, n);
} else o.text.length <= e.options.maxHighlightLength && Pn(e, o.text, n), o.stateAfter = t.frontier % 5 == 0 ? sa(t.mode, n) : null;
return ++t.frontier, +new Date() > r ? (qe(e, e.options.workDelay), !0) : void 0;
}), i.length && Et(e, function() {
for (var t = 0; t < i.length; t++) Pt(e, i[t], "text");
});
}
}
function He(e, t, r) {
for (var n, i, o = e.doc, a = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), s = t; s > a; --s) {
if (s <= o.first) return o.first;
var l = Xn(o, s - 1);
if (l.stateAfter && (!r || s <= o.frontier)) return s;
var c = qa(l.text, null, e.options.tabSize);
(null == i || n > c) && (i = s - 1, n = c);
}
return i;
}
function We(e, t, r) {
var n = e.doc, i = e.display;
if (!n.mode.startState) return !0;
var o = He(e, t, r), a = o > n.first && Xn(n, o - 1).stateAfter;
return a = a ? sa(n.mode, a) : la(n.mode), n.iter(o, t, function(r) {
Pn(e, r.text, a);
var s = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;
r.stateAfter = s ? sa(n.mode, a) : null, ++o;
}), r && (n.frontier = o), a;
}
function je(e) {
return e.lineSpace.offsetTop;
}
function Ue(e) {
return e.mover.offsetHeight - e.lineSpace.offsetHeight;
}
function Ge(e) {
if (e.cachedPaddingH) return e.cachedPaddingH;
var t = Ui(e.measure, Wi("pre", "x")), r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, n = {
left: parseInt(r.paddingLeft),
right: parseInt(r.paddingRight)
};
return isNaN(n.left) || isNaN(n.right) || (e.cachedPaddingH = n), n;
}
function Ve(e) {
return Ia - e.display.nativeBarWidth;
}
function $e(e) {
return e.display.scroller.clientWidth - Ve(e) - e.display.barWidth;
}
function Ze(e) {
return e.display.scroller.clientHeight - Ve(e) - e.display.barHeight;
}
function Ye(e, t, r) {
var n = e.options.lineWrapping, i = n && $e(e);
if (!t.measure.heights || n && t.measure.width != i) {
var o = t.measure.heights = [];
if (n) {
t.measure.width = i;
for (var a = t.text.firstChild.getClientRects(), s = 0; s < a.length - 1; s++) {
var l = a[s], c = a[s + 1];
Math.abs(l.bottom - c.bottom) > 2 && o.push((l.bottom + c.top) / 2 - r.top);
}
}
o.push(r.bottom - r.top);
}
}
function Ke(e, t, r) {
if (e.line == t) return {
map: e.measure.map,
cache: e.measure.cache
};
for (var n = 0; n < e.rest.length; n++) if (e.rest[n] == t) return {
map: e.measure.maps[n],
cache: e.measure.caches[n]
};
for (var n = 0; n < e.rest.length; n++) if (ti(e.rest[n]) > r) return {
map: e.measure.maps[n],
cache: e.measure.caches[n],
before: !0
};
}
function Xe(e, t) {
t = bn(t);
var r = ti(t), n = e.display.externalMeasured = new Ot(e.doc, t, r);
n.lineN = r;
var i = n.built = zn(e, n);
return n.text = i.pre, Ui(e.display.lineMeasure, i.pre), n;
}
function Je(e, t, r, n) {
return tt(e, et(e, t), r, n);
}
function Qe(e, t) {
if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[zt(e, t)];
var r = e.display.externalMeasured;
return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0;
}
function et(e, t) {
var r = ti(t), n = Qe(e, r);
n && !n.text ? n = null : n && n.changes && (F(e, n, r, O(e)), e.curOp.forceUpdate = !0), 
n || (n = Xe(e, t));
var i = Ke(n, t, r);
return {
line: t,
view: n,
rect: null,
map: i.map,
cache: i.cache,
before: i.before,
hasHeights: !1
};
}
function tt(e, t, r, n, i) {
t.before && (r = -1);
var o, a = r + (n || "");
return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), 
t.hasHeights || (Ye(e, t.view, t.rect), t.hasHeights = !0), o = nt(e, t, r, n), 
o.bogus || (t.cache[a] = o)), {
left: o.left,
right: o.right,
top: i ? o.rtop : o.top,
bottom: i ? o.rbottom : o.bottom
};
}
function rt(e, t, r) {
for (var n, i, o, a, s = 0; s < e.length; s += 3) {
var l = e[s], c = e[s + 1];
if (l > t ? (i = 0, o = 1, a = "left") : c > t ? (i = t - l, o = i + 1) : (s == e.length - 3 || t == c && e[s + 3] > t) && (o = c - l, 
i = o - 1, t >= c && (a = "right")), null != i) {
if (n = e[s + 2], l == c && r == (n.insertLeft ? "left" : "right") && (a = r), "left" == r && 0 == i) for (;s && e[s - 2] == e[s - 3] && e[s - 1].insertLeft; ) n = e[(s -= 3) + 2], 
a = "left";
if ("right" == r && i == c - l) for (;s < e.length - 3 && e[s + 3] == e[s + 4] && !e[s + 5].insertLeft; ) n = e[(s += 3) + 2], 
a = "right";
break;
}
}
return {
node: n,
start: i,
end: o,
collapse: a,
coverStart: l,
coverEnd: c
};
}
function nt(e, t, r, n) {
var i, o = rt(t.map, r, n), a = o.node, s = o.start, l = o.end, c = o.collapse;
if (3 == a.nodeType) {
for (var u = 0; 4 > u; u++) {
for (;s && Hi(t.line.text.charAt(o.coverStart + s)); ) --s;
for (;o.coverStart + l < o.coverEnd && Hi(t.line.text.charAt(o.coverStart + l)); ) ++l;
if (yo && 9 > xo && 0 == s && l == o.coverEnd - o.coverStart) i = a.parentNode.getBoundingClientRect(); else if (yo && e.options.lineWrapping) {
var h = ja(a, s, l).getClientRects();
i = h.length ? h["right" == n ? h.length - 1 : 0] : jo;
} else i = ja(a, s, l).getBoundingClientRect() || jo;
if (i.left || i.right || 0 == s) break;
l = s, s -= 1, c = "right";
}
yo && 11 > xo && (i = it(e.display.measure, i));
} else {
s > 0 && (c = n = "right");
var h;
i = e.options.lineWrapping && (h = a.getClientRects()).length > 1 ? h["right" == n ? h.length - 1 : 0] : a.getBoundingClientRect();
}
if (yo && 9 > xo && !s && (!i || !i.left && !i.right)) {
var f = a.parentNode.getClientRects()[0];
i = f ? {
left: f.left,
right: f.left + yt(e.display),
top: f.top,
bottom: f.bottom
} : jo;
}
for (var d = i.top - t.rect.top, p = i.bottom - t.rect.top, m = (d + p) / 2, g = t.view.measure.heights, u = 0; u < g.length - 1 && !(m < g[u]); u++) ;
var v = u ? g[u - 1] : 0, b = g[u], y = {
left: ("right" == c ? i.right : i.left) - t.rect.left,
right: ("left" == c ? i.left : i.right) - t.rect.left,
top: v,
bottom: b
};
return i.left || i.right || (y.bogus = !0), e.options.singleCursorHeightPerLine || (y.rtop = d, 
y.rbottom = p), y;
}
function it(e, t) {
if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Qi(e)) return t;
var r = screen.logicalXDPI / screen.deviceXDPI, n = screen.logicalYDPI / screen.deviceYDPI;
return {
left: t.left * r,
right: t.right * r,
top: t.top * n,
bottom: t.bottom * n
};
}
function ot(e) {
if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest)) for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {};
}
function at(e) {
e.display.externalMeasure = null, ji(e.display.lineMeasure);
for (var t = 0; t < e.display.view.length; t++) ot(e.display.view[t]);
}
function st(e) {
at(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, 
e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
}
function lt() {
return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
}
function ct() {
return window.pageYOffset || (document.documentElement || document.body).scrollTop;
}
function ut(e, t, r, n) {
if (t.widgets) for (var i = 0; i < t.widgets.length; ++i) if (t.widgets[i].above) {
var o = _n(t.widgets[i]);
r.top += o, r.bottom += o;
}
if ("line" == n) return r;
n || (n = "local");
var a = ni(t);
if ("local" == n ? a += je(e.display) : a -= e.display.viewOffset, "page" == n || "window" == n) {
var s = e.display.lineSpace.getBoundingClientRect();
a += s.top + ("window" == n ? 0 : ct());
var l = s.left + ("window" == n ? 0 : lt());
r.left += l, r.right += l;
}
return r.top += a, r.bottom += a, r;
}
function ht(e, t, r) {
if ("div" == r) return t;
var n = t.left, i = t.top;
if ("page" == r) n -= lt(), i -= ct(); else if ("local" == r || !r) {
var o = e.display.sizer.getBoundingClientRect();
n += o.left, i += o.top;
}
var a = e.display.lineSpace.getBoundingClientRect();
return {
left: n - a.left,
top: i - a.top
};
}
function ft(e, t, r, n, i) {
return n || (n = Xn(e.doc, t.line)), ut(e, n, Je(e, n, t.ch, i), r);
}
function dt(e, t, r, n, i, o) {
function a(t, a) {
var s = tt(e, i, t, a ? "right" : "left", o);
return a ? s.left = s.right : s.right = s.left, ut(e, n, s, r);
}
function s(e, t) {
var r = l[t], n = r.level % 2;
return e == to(r) && t && r.level < l[t - 1].level ? (r = l[--t], e = ro(r) - (r.level % 2 ? 0 : 1), 
n = !0) : e == ro(r) && t < l.length - 1 && r.level < l[t + 1].level && (r = l[++t], 
e = to(r) - r.level % 2, n = !1), n && e == r.to && e > r.from ? a(e - 1) : a(e, n);
}
n = n || Xn(e.doc, t.line), i || (i = et(e, n));
var l = ii(n), c = t.ch;
if (!l) return a(c);
var u = co(l, c), h = s(c, u);
return null != os && (h.other = s(c, os)), h;
}
function pt(e, t) {
var r = 0, t = me(e.doc, t);
e.options.lineWrapping || (r = yt(e.display) * t.ch);
var n = Xn(e.doc, t.line), i = ni(n) + je(e.display);
return {
left: r,
right: r,
top: i,
bottom: i + n.height
};
}
function mt(e, t, r, n) {
var i = Ro(e, t);
return i.xRel = n, r && (i.outside = !0), i;
}
function gt(e, t, r) {
var n = e.doc;
if (r += e.display.viewOffset, 0 > r) return mt(n.first, 0, !0, -1);
var i = ri(n, r), o = n.first + n.size - 1;
if (i > o) return mt(n.first + n.size - 1, Xn(n, o).text.length, !0, 1);
0 > t && (t = 0);
for (var a = Xn(n, i); ;) {
var s = vt(e, a, i, t, r), l = gn(a), c = l && l.find(0, !0);
if (!l || !(s.ch > c.from.ch || s.ch == c.from.ch && s.xRel > 0)) return s;
i = ti(a = c.to.line);
}
}
function vt(e, t, r, n, i) {
function o(n) {
var i = dt(e, Ro(r, n), "line", t, c);
return s = !0, a > i.bottom ? i.left - l : a < i.top ? i.left + l : (s = !1, i.left);
}
var a = i - ni(t), s = !1, l = 2 * e.display.wrapper.clientWidth, c = et(e, t), u = ii(t), h = t.text.length, f = no(t), d = io(t), p = o(f), m = s, g = o(d), v = s;
if (n > g) return mt(r, d, v, 1);
for (;;) {
if (u ? d == f || d == ho(t, f, 1) : 1 >= d - f) {
for (var b = p > n || g - n >= n - p ? f : d, y = n - (b == f ? p : g); Hi(t.text.charAt(b)); ) ++b;
var x = mt(r, b, b == f ? m : v, -1 > y ? -1 : y > 1 ? 1 : 0);
return x;
}
var k = Math.ceil(h / 2), w = f + k;
if (u) {
w = f;
for (var C = 0; k > C; ++C) w = ho(t, w, 1);
}
var S = o(w);
S > n ? (d = w, g = S, (v = s) && (g += 1e3), h = k) : (f = w, p = S, m = s, h -= k);
}
}
function bt(e) {
if (null != e.cachedTextHeight) return e.cachedTextHeight;
if (null == Bo) {
Bo = Wi("pre");
for (var t = 0; 49 > t; ++t) Bo.appendChild(document.createTextNode("x")), Bo.appendChild(Wi("br"));
Bo.appendChild(document.createTextNode("x"));
}
Ui(e.measure, Bo);
var r = Bo.offsetHeight / 50;
return r > 3 && (e.cachedTextHeight = r), ji(e.measure), r || 1;
}
function yt(e) {
if (null != e.cachedCharWidth) return e.cachedCharWidth;
var t = Wi("span", "xxxxxxxxxx"), r = Wi("pre", [ t ]);
Ui(e.measure, r);
var n = t.getBoundingClientRect(), i = (n.right - n.left) / 10;
return i > 2 && (e.cachedCharWidth = i), i || 10;
}
function xt(e) {
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
id: ++Go
}, Uo ? Uo.ops.push(e.curOp) : e.curOp.ownsGroup = Uo = {
ops: [ e.curOp ],
delayedCallbacks: []
};
}
function kt(e) {
var t = e.delayedCallbacks, r = 0;
do {
for (;r < t.length; r++) t[r].call(null);
for (var n = 0; n < e.ops.length; n++) {
var i = e.ops[n];
if (i.cursorActivityHandlers) for (;i.cursorActivityCalled < i.cursorActivityHandlers.length; ) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
}
} while (r < t.length);
}
function wt(e) {
var t = e.curOp, r = t.ownsGroup;
if (r) try {
kt(r);
} finally {
Uo = null;
for (var n = 0; n < r.ops.length; n++) r.ops[n].cm.curOp = null;
Ct(r);
}
}
function Ct(e) {
for (var t = e.ops, r = 0; r < t.length; r++) St(t[r]);
for (var r = 0; r < t.length; r++) _t(t[r]);
for (var r = 0; r < t.length; r++) At(t[r]);
for (var r = 0; r < t.length; r++) Lt(t[r]);
for (var r = 0; r < t.length; r++) Tt(t[r]);
}
function St(e) {
var t = e.cm, r = t.display;
A(t), e.updateMaxLine && f(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < r.viewFrom || e.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && t.options.lineWrapping, 
e.update = e.mustUpdate && new _(t, e.mustUpdate && {
top: e.scrollTop,
ensure: e.scrollToPos
}, e.forceUpdate);
}
function _t(e) {
e.updatedDisplay = e.mustUpdate && L(e.cm, e.update);
}
function At(e) {
var t = e.cm, r = t.display;
e.updatedDisplay && D(t), e.barMeasure = p(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Je(t, r.maxLine, r.maxLine.text.length).left + 3, 
t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + Ve(t) + t.display.barWidth), 
e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - $e(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection());
}
function Lt(e) {
var t = e.cm;
null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", 
e.maxScrollLeft < t.doc.scrollLeft && ir(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), 
t.display.maxLineChanged = !1), e.preparedSelection && t.display.input.showSelection(e.preparedSelection), 
e.updatedDisplay && M(t, e.barMeasure), (e.updatedDisplay || e.startHeight != t.doc.height) && b(t, e.barMeasure), 
e.selectionChanged && ze(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), 
!e.focus || e.focus != Gi() || document.hasFocus && !document.hasFocus() || K(e.cm);
}
function Tt(e) {
var t = e.cm, r = t.display, n = t.doc;
if (e.updatedDisplay && T(t, e.update), null == r.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (r.wheelStartX = r.wheelStartY = null), 
null == e.scrollTop || r.scroller.scrollTop == e.scrollTop && !e.forceScroll || (n.scrollTop = Math.max(0, Math.min(r.scroller.scrollHeight - r.scroller.clientHeight, e.scrollTop)), 
r.scrollbars.setScrollTop(n.scrollTop), r.scroller.scrollTop = n.scrollTop), null == e.scrollLeft || r.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (n.scrollLeft = Math.max(0, Math.min(r.scroller.scrollWidth - $e(t), e.scrollLeft)), 
r.scrollbars.setScrollLeft(n.scrollLeft), r.scroller.scrollLeft = n.scrollLeft, 
k(t)), e.scrollToPos) {
var i = Or(t, me(n, e.scrollToPos.from), me(n, e.scrollToPos.to), e.scrollToPos.margin);
e.scrollToPos.isCursor && t.state.focused && Nr(t, i);
}
var o = e.maybeHiddenMarkers, a = e.maybeUnhiddenMarkers;
if (o) for (var s = 0; s < o.length; ++s) o[s].lines.length || Na(o[s], "hide");
if (a) for (var s = 0; s < a.length; ++s) a[s].lines.length && Na(a[s], "unhide");
r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Na(t, "changes", t, e.changeObjs), 
e.update && e.update.finish();
}
function Et(e, t) {
if (e.curOp) return t();
xt(e);
try {
return t();
} finally {
wt(e);
}
}
function Mt(e, t) {
return function() {
if (e.curOp) return t.apply(e, arguments);
xt(e);
try {
return t.apply(e, arguments);
} finally {
wt(e);
}
};
}
function Dt(e) {
return function() {
if (this.curOp) return e.apply(this, arguments);
xt(this);
try {
return e.apply(this, arguments);
} finally {
wt(this);
}
};
}
function Nt(e) {
return function() {
var t = this.cm;
if (!t || t.curOp) return e.apply(this, arguments);
xt(t);
try {
return e.apply(this, arguments);
} finally {
wt(t);
}
};
}
function Ot(e, t, r) {
this.line = t, this.rest = yn(t), this.size = this.rest ? ti(Ni(this.rest)) - r + 1 : 1, 
this.node = this.text = null, this.hidden = wn(e, t);
}
function It(e, t, r) {
for (var n, i = [], o = t; r > o; o = n) {
var a = new Ot(e.doc, Xn(e.doc, o), o);
n = o + a.size, i.push(a);
}
return i;
}
function Ft(e, t, r, n) {
null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), n || (n = 0);
var i = e.display;
if (n && r < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), 
e.curOp.viewChanged = !0, t >= i.viewTo) Po && xn(e.doc, t) < i.viewTo && Rt(e); else if (r <= i.viewFrom) Po && kn(e.doc, r + n) > i.viewFrom ? Rt(e) : (i.viewFrom += n, 
i.viewTo += n); else if (t <= i.viewFrom && r >= i.viewTo) Rt(e); else if (t <= i.viewFrom) {
var o = qt(e, r, r + n, 1);
o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : Rt(e);
} else if (r >= i.viewTo) {
var o = qt(e, t, t, -1);
o ? (i.view = i.view.slice(0, o.index), i.viewTo = o.lineN) : Rt(e);
} else {
var a = qt(e, t, t, -1), s = qt(e, r, r + n, 1);
a && s ? (i.view = i.view.slice(0, a.index).concat(It(e, a.lineN, s.lineN)).concat(i.view.slice(s.index)), 
i.viewTo += n) : Rt(e);
}
var l = i.externalMeasured;
l && (r < l.lineN ? l.lineN += n : t < l.lineN + l.size && (i.externalMeasured = null));
}
function Pt(e, t, r) {
e.curOp.viewChanged = !0;
var n = e.display, i = e.display.externalMeasured;
if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
var o = n.view[zt(e, t)];
if (null != o.node) {
var a = o.changes || (o.changes = []);
-1 == Oi(a, r) && a.push(r);
}
}
}
function Rt(e) {
e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
}
function zt(e, t) {
if (t >= e.display.viewTo) return null;
if (t -= e.display.viewFrom, 0 > t) return null;
for (var r = e.display.view, n = 0; n < r.length; n++) if (t -= r[n].size, 0 > t) return n;
}
function qt(e, t, r, n) {
var i, o = zt(e, t), a = e.display.view;
if (!Po || r == e.doc.first + e.doc.size) return {
index: o,
lineN: r
};
for (var s = 0, l = e.display.viewFrom; o > s; s++) l += a[s].size;
if (l != t) {
if (n > 0) {
if (o == a.length - 1) return null;
i = l + a[o].size - t, o++;
} else i = l - t;
t += i, r += i;
}
for (;xn(e.doc, r) != r; ) {
if (o == (0 > n ? 0 : a.length - 1)) return null;
r += n * a[o - (0 > n ? 1 : 0)].size, o += n;
}
return {
index: o,
lineN: r
};
}
function Bt(e, t, r) {
var n = e.display, i = n.view;
0 == i.length || t >= n.viewTo || r <= n.viewFrom ? (n.view = It(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = It(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(zt(e, t))), 
n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(It(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, zt(e, r)))), 
n.viewTo = r;
}
function Ht(e) {
for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
var i = t[n];
i.hidden || i.node && !i.changes || ++r;
}
return r;
}
function Wt(e) {
function t() {
i.activeTouch && (o = setTimeout(function() {
i.activeTouch = null;
}, 1e3), a = i.activeTouch, a.end = +new Date());
}
function r(e) {
if (1 != e.touches.length) return !1;
var t = e.touches[0];
return t.radiusX <= 1 && t.radiusY <= 1;
}
function n(e, t) {
if (null == t.left) return !0;
var r = t.left - e.left, n = t.top - e.top;
return r * r + n * n > 400;
}
var i = e.display;
Ea(i.scroller, "mousedown", Mt(e, $t)), yo && 11 > xo ? Ea(i.scroller, "dblclick", Mt(e, function(t) {
if (!Ai(e, t)) {
var r = Vt(e, t);
if (r && !Jt(e, t) && !Gt(e.display, t)) {
Aa(t);
var n = e.findWordAt(r);
xe(e.doc, n.anchor, n.head);
}
}
})) : Ea(i.scroller, "dblclick", function(t) {
Ai(e, t) || Aa(t);
}), Io || Ea(i.scroller, "contextmenu", function(t) {
br(e, t);
});
var o, a = {
end: 0
};
Ea(i.scroller, "touchstart", function(t) {
if (!Ai(e, t) && !r(t)) {
clearTimeout(o);
var n = +new Date();
i.activeTouch = {
start: n,
moved: !1,
prev: n - a.end <= 300 ? a : null
}, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY);
}
}), Ea(i.scroller, "touchmove", function() {
i.activeTouch && (i.activeTouch.moved = !0);
}), Ea(i.scroller, "touchend", function(r) {
var o = i.activeTouch;
if (o && !Gt(i, r) && null != o.left && !o.moved && new Date() - o.start < 300) {
var a, s = e.coordsChar(i.activeTouch, "page");
a = !o.prev || n(o, o.prev) ? new he(s, s) : !o.prev.prev || n(o, o.prev.prev) ? e.findWordAt(s) : new he(Ro(s.line, 0), me(e.doc, Ro(s.line + 1, 0))), 
e.setSelection(a.anchor, a.head), e.focus(), Aa(r);
}
t();
}), Ea(i.scroller, "touchcancel", t), Ea(i.scroller, "scroll", function() {
i.scroller.clientHeight && (nr(e, i.scroller.scrollTop), ir(e, i.scroller.scrollLeft, !0), 
Na(e, "scroll", e));
}), Ea(i.scroller, "mousewheel", function(t) {
or(e, t);
}), Ea(i.scroller, "DOMMouseScroll", function(t) {
or(e, t);
}), Ea(i.wrapper, "scroll", function() {
i.wrapper.scrollTop = i.wrapper.scrollLeft = 0;
}), i.dragFunctions = {
enter: function(t) {
Ai(e, t) || Ta(t);
},
over: function(t) {
Ai(e, t) || (tr(e, t), Ta(t));
},
start: function(t) {
er(e, t);
},
drop: Mt(e, Qt),
leave: function() {
rr(e);
}
};
var s = i.input.getField();
Ea(s, "keyup", function(t) {
dr.call(e, t);
}), Ea(s, "keydown", Mt(e, hr)), Ea(s, "keypress", Mt(e, pr)), Ea(s, "focus", zi(gr, e)), 
Ea(s, "blur", zi(vr, e));
}
function jt(t, r, n) {
var i = n && n != e.Init;
if (!r != !i) {
var o = t.display.dragFunctions, a = r ? Ea : Da;
a(t.display.scroller, "dragstart", o.start), a(t.display.scroller, "dragenter", o.enter), 
a(t.display.scroller, "dragover", o.over), a(t.display.scroller, "dragleave", o.leave), 
a(t.display.scroller, "drop", o.drop);
}
}
function Ut(e) {
var t = e.display;
(t.lastWrapHeight != t.wrapper.clientHeight || t.lastWrapWidth != t.wrapper.clientWidth) && (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, 
t.scrollbarsClipped = !1, e.setSize());
}
function Gt(e, t) {
for (var r = ki(t); r != e.wrapper; r = r.parentNode) if (!r || 1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events") || r.parentNode == e.sizer && r != e.mover) return !0;
}
function Vt(e, t, r, n) {
var i = e.display;
if (!r && "true" == ki(t).getAttribute("cm-not-content")) return null;
var o, a, s = i.lineSpace.getBoundingClientRect();
try {
o = t.clientX - s.left, a = t.clientY - s.top;
} catch (t) {
return null;
}
var l, c = gt(e, o, a);
if (n && 1 == c.xRel && (l = Xn(e.doc, c.line).text).length == c.ch) {
var u = qa(l, l.length, e.options.tabSize) - l.length;
c = Ro(c.line, Math.max(0, Math.round((o - Ge(e.display).left) / yt(e.display)) - u));
}
return c;
}
function $t(e) {
var t = this, r = t.display;
if (!(Ai(t, e) || r.activeTouch && r.input.supportsTouch())) {
if (r.shift = e.shiftKey, Gt(r, e)) return void (ko || (r.scroller.draggable = !1, 
setTimeout(function() {
r.scroller.draggable = !0;
}, 100)));
if (!Jt(t, e)) {
var n = Vt(t, e);
switch (window.focus(), wi(e)) {
case 1:
t.state.selectingText ? t.state.selectingText(e) : n ? Zt(t, e, n) : ki(e) == r.scroller && Aa(e);
break;

case 2:
ko && (t.state.lastMiddleDown = +new Date()), n && xe(t.doc, n), setTimeout(function() {
r.input.focus();
}, 20), Aa(e);
break;

case 3:
Io ? br(t, e) : mr(t);
}
}
}
}
function Zt(e, t, r) {
yo ? setTimeout(zi(K, e), 0) : e.curOp.focus = Gi();
var n, i = +new Date();
Wo && Wo.time > i - 400 && 0 == zo(Wo.pos, r) ? n = "triple" : Ho && Ho.time > i - 400 && 0 == zo(Ho.pos, r) ? (n = "double", 
Wo = {
time: i,
pos: r
}) : (n = "single", Ho = {
time: i,
pos: r
});
var o, a = e.doc.sel, s = Mo ? t.metaKey : t.ctrlKey;
e.options.dragDrop && Qa && !e.isReadOnly() && "single" == n && (o = a.contains(r)) > -1 && (zo((o = a.ranges[o]).from(), r) < 0 || r.xRel > 0) && (zo(o.to(), r) > 0 || r.xRel < 0) ? Yt(e, t, r, s) : Kt(e, t, r, n, s);
}
function Yt(e, t, r, n) {
var i = e.display, o = +new Date(), a = Mt(e, function(s) {
ko && (i.scroller.draggable = !1), e.state.draggingText = !1, Da(document, "mouseup", a), 
Da(i.scroller, "drop", a), Math.abs(t.clientX - s.clientX) + Math.abs(t.clientY - s.clientY) < 10 && (Aa(s), 
!n && +new Date() - 200 < o && xe(e.doc, r), ko || yo && 9 == xo ? setTimeout(function() {
document.body.focus(), i.input.focus();
}, 20) : i.input.focus());
});
ko && (i.scroller.draggable = !0), e.state.draggingText = a, i.scroller.dragDrop && i.scroller.dragDrop(), 
Ea(document, "mouseup", a), Ea(i.scroller, "drop", a);
}
function Kt(e, t, r, n, i) {
function o(t) {
if (0 != zo(g, t)) if (g = t, "rect" == n) {
for (var i = [], o = e.options.tabSize, a = qa(Xn(c, r.line).text, r.ch, o), s = qa(Xn(c, t.line).text, t.ch, o), l = Math.min(a, s), d = Math.max(a, s), p = Math.min(r.line, t.line), m = Math.min(e.lastLine(), Math.max(r.line, t.line)); m >= p; p++) {
var v = Xn(c, p).text, b = Ba(v, l, o);
l == d ? i.push(new he(Ro(p, b), Ro(p, b))) : v.length > b && i.push(new he(Ro(p, b), Ro(p, Ba(v, d, o))));
}
i.length || i.push(new he(r, r)), Ae(c, fe(f.ranges.slice(0, h).concat(i), h), {
origin: "*mouse",
scroll: !1
}), e.scrollIntoView(t);
} else {
var y = u, x = y.anchor, k = t;
if ("single" != n) {
if ("double" == n) var w = e.findWordAt(t); else var w = new he(Ro(t.line, 0), me(c, Ro(t.line + 1, 0)));
zo(w.anchor, x) > 0 ? (k = w.head, x = Y(y.from(), w.anchor)) : (k = w.anchor, x = Z(y.to(), w.head));
}
var i = f.ranges.slice(0);
i[h] = new he(me(c, x), k), Ae(c, fe(i, h), Ra);
}
}
function a(t) {
var r = ++b, i = Vt(e, t, !0, "rect" == n);
if (i) if (0 != zo(i, g)) {
e.curOp.focus = Gi(), o(i);
var s = x(l, c);
(i.line >= s.to || i.line < s.from) && setTimeout(Mt(e, function() {
b == r && a(t);
}), 150);
} else {
var u = t.clientY < v.top ? -20 : t.clientY > v.bottom ? 20 : 0;
u && setTimeout(Mt(e, function() {
b == r && (l.scroller.scrollTop += u, a(t));
}), 50);
}
}
function s(t) {
e.state.selectingText = !1, b = 1 / 0, Aa(t), l.input.focus(), Da(document, "mousemove", y), 
Da(document, "mouseup", k), c.history.lastSelOrigin = null;
}
var l = e.display, c = e.doc;
Aa(t);
var u, h, f = c.sel, d = f.ranges;
if (i && !t.shiftKey ? (h = c.sel.contains(r), u = h > -1 ? d[h] : new he(r, r)) : (u = c.sel.primary(), 
h = c.sel.primIndex), t.altKey) n = "rect", i || (u = new he(r, r)), r = Vt(e, t, !0, !0), 
h = -1; else if ("double" == n) {
var p = e.findWordAt(r);
u = e.display.shift || c.extend ? ye(c, u, p.anchor, p.head) : p;
} else if ("triple" == n) {
var m = new he(Ro(r.line, 0), me(c, Ro(r.line + 1, 0)));
u = e.display.shift || c.extend ? ye(c, u, m.anchor, m.head) : m;
} else u = ye(c, u, r);
i ? -1 == h ? (h = d.length, Ae(c, fe(d.concat([ u ]), h), {
scroll: !1,
origin: "*mouse"
})) : d.length > 1 && d[h].empty() && "single" == n && !t.shiftKey ? (Ae(c, fe(d.slice(0, h).concat(d.slice(h + 1)), 0), {
scroll: !1,
origin: "*mouse"
}), f = c.sel) : we(c, h, u, Ra) : (h = 0, Ae(c, new ue([ u ], 0), Ra), f = c.sel);
var g = r, v = l.wrapper.getBoundingClientRect(), b = 0, y = Mt(e, function(e) {
wi(e) ? a(e) : s(e);
}), k = Mt(e, s);
e.state.selectingText = k, Ea(document, "mousemove", y), Ea(document, "mouseup", k);
}
function Xt(e, t, r, n) {
try {
var i = t.clientX, o = t.clientY;
} catch (t) {
return !1;
}
if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
n && Aa(t);
var a = e.display, s = a.lineDiv.getBoundingClientRect();
if (o > s.bottom || !Ti(e, r)) return xi(t);
o -= s.top - a.viewOffset;
for (var l = 0; l < e.options.gutters.length; ++l) {
var c = a.gutters.childNodes[l];
if (c && c.getBoundingClientRect().right >= i) {
var u = ri(e.doc, o), h = e.options.gutters[l];
return Na(e, r, e, u, h, t), xi(t);
}
}
}
function Jt(e, t) {
return Xt(e, t, "gutterClick", !0);
}
function Qt(e) {
var t = this;
if (rr(t), !Ai(t, e) && !Gt(t.display, e)) {
Aa(e), yo && (Vo = +new Date());
var r = Vt(t, e, !0), n = e.dataTransfer.files;
if (r && !t.isReadOnly()) if (n && n.length && window.FileReader && window.File) for (var i = n.length, o = Array(i), a = 0, s = function(e, n) {
if (!t.options.allowDropFileTypes || -1 != Oi(t.options.allowDropFileTypes, e.type)) {
var s = new FileReader();
s.onload = Mt(t, function() {
var e = s.result;
if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[n] = e, ++a == i) {
r = me(t.doc, r);
var l = {
from: r,
to: r,
text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
origin: "paste"
};
_r(t.doc, l), _e(t.doc, de(r, Jo(l)));
}
}), s.readAsText(e);
}
}, l = 0; i > l; ++l) s(n[l], l); else {
if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), 
void setTimeout(function() {
t.display.input.focus();
}, 20);
try {
var o = e.dataTransfer.getData("Text");
if (o) {
if (t.state.draggingText && !(Mo ? e.altKey : e.ctrlKey)) var c = t.listSelections();
if (Le(t.doc, de(r, r)), c) for (var l = 0; l < c.length; ++l) Dr(t.doc, "", c[l].anchor, c[l].head, "drag");
t.replaceSelection(o, "around", "paste"), t.display.input.focus();
}
} catch (e) {}
}
}
}
function er(e, t) {
if (yo && (!e.state.draggingText || +new Date() - Vo < 100)) return void Ta(t);
if (!Ai(e, t) && !Gt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), 
t.dataTransfer.setDragImage && !_o)) {
var r = Wi("img", null, null, "position: fixed; left: 0; top: 0;");
r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 
So && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), 
t.dataTransfer.setDragImage(r, 0, 0), So && r.parentNode.removeChild(r);
}
}
function tr(e, t) {
var r = Vt(e, t);
if (r) {
var n = document.createDocumentFragment();
Pe(e, r, n), e.display.dragCursor || (e.display.dragCursor = Wi("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), 
e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), Ui(e.display.dragCursor, n);
}
}
function rr(e) {
e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), 
e.display.dragCursor = null);
}
function nr(e, t) {
Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, go || E(e, {
top: t
}), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbars.setScrollTop(t), 
go && E(e), qe(e, 100));
}
function ir(e, t, r) {
(r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), 
e.doc.scrollLeft = t, k(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), 
e.display.scrollbars.setScrollLeft(t));
}
function or(e, t) {
var r = Yo(t), n = r.x, i = r.y, o = e.display, a = o.scroller, s = a.scrollWidth > a.clientWidth, l = a.scrollHeight > a.clientHeight;
if (n && s || i && l) {
if (i && Mo && ko) e: for (var c = t.target, u = o.view; c != a; c = c.parentNode) for (var h = 0; h < u.length; h++) if (u[h].node == c) {
e.display.currentWheelTarget = c;
break e;
}
if (n && !go && !So && null != Zo) return i && l && nr(e, Math.max(0, Math.min(a.scrollTop + i * Zo, a.scrollHeight - a.clientHeight))), 
ir(e, Math.max(0, Math.min(a.scrollLeft + n * Zo, a.scrollWidth - a.clientWidth))), 
(!i || i && l) && Aa(t), void (o.wheelStartX = null);
if (i && null != Zo) {
var f = i * Zo, d = e.doc.scrollTop, p = d + o.wrapper.clientHeight;
0 > f ? d = Math.max(0, d + f - 50) : p = Math.min(e.doc.height, p + f + 50), E(e, {
top: d,
bottom: p
});
}
20 > $o && (null == o.wheelStartX ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, 
o.wheelDX = n, o.wheelDY = i, setTimeout(function() {
if (null != o.wheelStartX) {
var e = a.scrollLeft - o.wheelStartX, t = a.scrollTop - o.wheelStartY, r = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
o.wheelStartX = o.wheelStartY = null, r && (Zo = (Zo * $o + r) / ($o + 1), ++$o);
}
}, 200)) : (o.wheelDX += n, o.wheelDY += i));
}
}
function ar(e, t, r) {
if ("string" == typeof t && (t = ca[t], !t)) return !1;
e.display.input.ensurePolled();
var n = e.display.shift, i = !1;
try {
e.isReadOnly() && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != Fa;
} finally {
e.display.shift = n, e.state.suppressEdits = !1;
}
return i;
}
function sr(e, t, r) {
for (var n = 0; n < e.state.keyMaps.length; n++) {
var i = ha(t, e.state.keyMaps[n], r, e);
if (i) return i;
}
return e.options.extraKeys && ha(t, e.options.extraKeys, r, e) || ha(t, e.options.keyMap, r, e);
}
function lr(e, t, r, n) {
var i = e.state.keySeq;
if (i) {
if (fa(t)) return "handled";
Ko.set(50, function() {
e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
}), t = i + " " + t;
}
var o = sr(e, t, n);
return "multi" == o && (e.state.keySeq = t), "handled" == o && Si(e, "keyHandled", e, t, r), 
("handled" == o || "multi" == o) && (Aa(r), ze(e)), i && !o && /\'$/.test(t) ? (Aa(r), 
!0) : !!o;
}
function cr(e, t) {
var r = da(t, !0);
return r ? t.shiftKey && !e.state.keySeq ? lr(e, "Shift-" + r, t, function(t) {
return ar(e, t, !0);
}) || lr(e, r, t, function(t) {
return ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) ? ar(e, t) : void 0;
}) : lr(e, r, t, function(t) {
return ar(e, t);
}) : !1;
}
function ur(e, t, r) {
return lr(e, "'" + r + "'", t, function(t) {
return ar(e, t, !0);
});
}
function hr(e) {
var t = this;
if (t.curOp.focus = Gi(), !Ai(t, e)) {
yo && 11 > xo && 27 == e.keyCode && (e.returnValue = !1);
var r = e.keyCode;
t.display.shift = 16 == r || e.shiftKey;
var n = cr(t, e);
So && (Xo = n ? r : null, !n && 88 == r && !rs && (Mo ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 
18 != r || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || fr(t);
}
}
function fr(e) {
function t(e) {
18 != e.keyCode && e.altKey || (Ka(r, "CodeMirror-crosshair"), Da(document, "keyup", t), 
Da(document, "mouseover", t));
}
var r = e.display.lineDiv;
Xa(r, "CodeMirror-crosshair"), Ea(document, "keyup", t), Ea(document, "mouseover", t);
}
function dr(e) {
16 == e.keyCode && (this.doc.sel.shift = !1), Ai(this, e);
}
function pr(e) {
var t = this;
if (!(Gt(t.display, e) || Ai(t, e) || e.ctrlKey && !e.altKey || Mo && e.metaKey)) {
var r = e.keyCode, n = e.charCode;
if (So && r == Xo) return Xo = null, void Aa(e);
if (!So || e.which && !(e.which < 10) || !cr(t, e)) {
var i = String.fromCharCode(null == n ? r : n);
ur(t, e, i) || t.display.input.onKeyPress(e);
}
}
}
function mr(e) {
e.state.delayingBlurEvent = !0, setTimeout(function() {
e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, vr(e));
}, 100);
}
function gr(e) {
e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Na(e, "focus", e), 
e.state.focused = !0, Xa(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), 
ko && setTimeout(function() {
e.display.input.reset(!0);
}, 20)), e.display.input.receivedFocus()), ze(e));
}
function vr(e) {
e.state.delayingBlurEvent || (e.state.focused && (Na(e, "blur", e), e.state.focused = !1, 
Ka(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), 
setTimeout(function() {
e.state.focused || (e.display.shift = !1);
}, 150));
}
function br(e, t) {
Gt(e.display, t) || yr(e, t) || Ai(e, t, "contextmenu") || e.display.input.onContextMenu(t);
}
function yr(e, t) {
return Ti(e, "gutterContextMenu") ? Xt(e, t, "gutterContextMenu", !1) : !1;
}
function xr(e, t) {
if (zo(e, t.from) < 0) return e;
if (zo(e, t.to) <= 0) return Jo(t);
var r = e.line + t.text.length - (t.to.line - t.from.line) - 1, n = e.ch;
return e.line == t.to.line && (n += Jo(t).ch - t.to.ch), Ro(r, n);
}
function kr(e, t) {
for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
var i = e.sel.ranges[n];
r.push(new he(xr(i.anchor, t), xr(i.head, t)));
}
return fe(r, e.sel.primIndex);
}
function wr(e, t, r) {
return e.line == t.line ? Ro(r.line, e.ch - t.ch + r.ch) : Ro(r.line + (e.line - t.line), e.ch);
}
function Cr(e, t, r) {
for (var n = [], i = Ro(e.first, 0), o = i, a = 0; a < t.length; a++) {
var s = t[a], l = wr(s.from, i, o), c = wr(Jo(s), i, o);
if (i = s.to, o = c, "around" == r) {
var u = e.sel.ranges[a], h = zo(u.head, u.anchor) < 0;
n[a] = new he(h ? c : l, h ? l : c);
} else n[a] = new he(l, l);
}
return new ue(n, e.sel.primIndex);
}
function Sr(e, t, r) {
var n = {
canceled: !1,
from: t.from,
to: t.to,
text: t.text,
origin: t.origin,
cancel: function() {
this.canceled = !0;
}
};
return r && (n.update = function(t, r, n, i) {
t && (this.from = me(e, t)), r && (this.to = me(e, r)), n && (this.text = n), void 0 !== i && (this.origin = i);
}), Na(e, "beforeChange", e, n), e.cm && Na(e.cm, "beforeChange", e.cm, n), n.canceled ? null : {
from: n.from,
to: n.to,
text: n.text,
origin: n.origin
};
}
function _r(e, t, r) {
if (e.cm) {
if (!e.cm.curOp) return Mt(e.cm, _r)(e, t, r);
if (e.cm.state.suppressEdits) return;
}
if (!(Ti(e, "beforeChange") || e.cm && Ti(e.cm, "beforeChange")) || (t = Sr(e, t, !0))) {
var n = Fo && !r && ln(e, t.from, t.to);
if (n) for (var i = n.length - 1; i >= 0; --i) Ar(e, {
from: n[i].from,
to: n[i].to,
text: i ? [ "" ] : t.text
}); else Ar(e, t);
}
}
function Ar(e, t) {
if (1 != t.text.length || "" != t.text[0] || 0 != zo(t.from, t.to)) {
var r = kr(e, t);
ci(e, t, r, e.cm ? e.cm.curOp.id : NaN), Er(e, t, r, on(e, t));
var n = [];
Yn(e, function(e, r) {
r || -1 != Oi(n, e.history) || (yi(e.history, t), n.push(e.history)), Er(e, t, null, on(e, t));
});
}
}
function Lr(e, t, r) {
if (!e.cm || !e.cm.state.suppressEdits) {
for (var n, i = e.history, o = e.sel, a = "undo" == t ? i.done : i.undone, s = "undo" == t ? i.undone : i.done, l = 0; l < a.length && (n = a[l], 
r ? !n.ranges || n.equals(e.sel) : n.ranges); l++) ;
if (l != a.length) {
for (i.lastOrigin = i.lastSelOrigin = null; n = a.pop(), n.ranges; ) {
if (fi(n, s), r && !n.equals(e.sel)) return void Ae(e, n, {
clearRedo: !1
});
o = n;
}
var c = [];
fi(o, s), s.push({
changes: c,
generation: i.generation
}), i.generation = n.generation || ++i.maxGeneration;
for (var u = Ti(e, "beforeChange") || e.cm && Ti(e.cm, "beforeChange"), l = n.changes.length - 1; l >= 0; --l) {
var h = n.changes[l];
if (h.origin = t, u && !Sr(e, h, !1)) return void (a.length = 0);
c.push(ai(e, h));
var f = l ? kr(e, h) : Ni(a);
Er(e, h, f, sn(e, h)), !l && e.cm && e.cm.scrollIntoView({
from: h.from,
to: Jo(h)
});
var d = [];
Yn(e, function(e, t) {
t || -1 != Oi(d, e.history) || (yi(e.history, h), d.push(e.history)), Er(e, h, null, sn(e, h));
});
}
}
}
}
function Tr(e, t) {
if (0 != t && (e.first += t, e.sel = new ue(Ii(e.sel.ranges, function(e) {
return new he(Ro(e.anchor.line + t, e.anchor.ch), Ro(e.head.line + t, e.head.ch));
}), e.sel.primIndex), e.cm)) {
Ft(e.cm, e.first, e.first - t, t);
for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++) Pt(e.cm, n, "gutter");
}
}
function Er(e, t, r, n) {
if (e.cm && !e.cm.curOp) return Mt(e.cm, Er)(e, t, r, n);
if (t.to.line < e.first) return void Tr(e, t.text.length - 1 - (t.to.line - t.from.line));
if (!(t.from.line > e.lastLine())) {
if (t.from.line < e.first) {
var i = t.text.length - 1 - (e.first - t.from.line);
Tr(e, i), t = {
from: Ro(e.first, 0),
to: Ro(t.to.line + i, t.to.ch),
text: [ Ni(t.text) ],
origin: t.origin
};
}
var o = e.lastLine();
t.to.line > o && (t = {
from: t.from,
to: Ro(o, Xn(e, o).text.length),
text: [ t.text[0] ],
origin: t.origin
}), t.removed = Jn(e, t.from, t.to), r || (r = kr(e, t)), e.cm ? Mr(e.cm, t, n) : Vn(e, t, n), 
Le(e, r, Pa);
}
}
function Mr(e, t, r) {
var n = e.doc, i = e.display, a = t.from, s = t.to, l = !1, c = a.line;
e.options.lineWrapping || (c = ti(bn(Xn(n, a.line))), n.iter(c, s.line + 1, function(e) {
return e == i.maxLine ? (l = !0, !0) : void 0;
})), n.sel.contains(t.from, t.to) > -1 && Li(e), Vn(n, t, r, o(e)), e.options.lineWrapping || (n.iter(c, a.line + t.text.length, function(e) {
var t = h(e);
t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, 
l = !1);
}), l && (e.curOp.updateMaxLine = !0)), n.frontier = Math.min(n.frontier, a.line), 
qe(e, 400);
var u = t.text.length - (s.line - a.line) - 1;
t.full ? Ft(e) : a.line != s.line || 1 != t.text.length || Gn(e.doc, t) ? Ft(e, a.line, s.line + 1, u) : Pt(e, a.line, "text");
var f = Ti(e, "changes"), d = Ti(e, "change");
if (d || f) {
var p = {
from: a,
to: s,
text: t.text,
removed: t.removed,
origin: t.origin
};
d && Si(e, "change", e, p), f && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(p);
}
e.display.selForContextMenu = null;
}
function Dr(e, t, r, n, i) {
if (n || (n = r), zo(n, r) < 0) {
var o = n;
n = r, r = o;
}
"string" == typeof t && (t = e.splitLines(t)), _r(e, {
from: r,
to: n,
text: t,
origin: i
});
}
function Nr(e, t) {
if (!Ai(e, "scrollCursorIntoView")) {
var r = e.display, n = r.sizer.getBoundingClientRect(), i = null;
if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), 
null != i && !Lo) {
var o = Wi("div", "​", null, "position: absolute; top: " + (t.top - r.viewOffset - je(e.display)) + "px; height: " + (t.bottom - t.top + Ve(e) + r.barHeight) + "px; left: " + t.left + "px; width: 2px;");
e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o);
}
}
}
function Or(e, t, r, n) {
null == n && (n = 0);
for (var i = 0; 5 > i; i++) {
var o = !1, a = dt(e, t), s = r && r != t ? dt(e, r) : a, l = Fr(e, Math.min(a.left, s.left), Math.min(a.top, s.top) - n, Math.max(a.left, s.left), Math.max(a.bottom, s.bottom) + n), c = e.doc.scrollTop, u = e.doc.scrollLeft;
if (null != l.scrollTop && (nr(e, l.scrollTop), Math.abs(e.doc.scrollTop - c) > 1 && (o = !0)), 
null != l.scrollLeft && (ir(e, l.scrollLeft), Math.abs(e.doc.scrollLeft - u) > 1 && (o = !0)), 
!o) break;
}
return a;
}
function Ir(e, t, r, n, i) {
var o = Fr(e, t, r, n, i);
null != o.scrollTop && nr(e, o.scrollTop), null != o.scrollLeft && ir(e, o.scrollLeft);
}
function Fr(e, t, r, n, i) {
var o = e.display, a = bt(e.display);
0 > r && (r = 0);
var s = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop, l = Ze(e), c = {};
i - r > l && (i = r + l);
var u = e.doc.height + Ue(o), h = a > r, f = i > u - a;
if (s > r) c.scrollTop = h ? 0 : r; else if (i > s + l) {
var d = Math.min(r, (f ? u : i) - l);
d != s && (c.scrollTop = d);
}
var p = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft, m = $e(e) - (e.options.fixedGutter ? o.gutters.offsetWidth : 0), g = n - t > m;
return g && (n = t + m), 10 > t ? c.scrollLeft = 0 : p > t ? c.scrollLeft = Math.max(0, t - (g ? 0 : 10)) : n > m + p - 3 && (c.scrollLeft = n + (g ? 0 : 10) - m), 
c;
}
function Pr(e, t, r) {
(null != t || null != r) && zr(e), null != t && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + t), 
null != r && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + r);
}
function Rr(e) {
zr(e);
var t = e.getCursor(), r = t, n = t;
e.options.lineWrapping || (r = t.ch ? Ro(t.line, t.ch - 1) : t, n = Ro(t.line, t.ch + 1)), 
e.curOp.scrollToPos = {
from: r,
to: n,
margin: e.options.cursorScrollMargin,
isCursor: !0
};
}
function zr(e) {
var t = e.curOp.scrollToPos;
if (t) {
e.curOp.scrollToPos = null;
var r = pt(e, t.from), n = pt(e, t.to), i = Fr(e, Math.min(r.left, n.left), Math.min(r.top, n.top) - t.margin, Math.max(r.right, n.right), Math.max(r.bottom, n.bottom) + t.margin);
e.scrollTo(i.scrollLeft, i.scrollTop);
}
}
function qr(e, t, r, n) {
var i, o = e.doc;
null == r && (r = "add"), "smart" == r && (o.mode.indent ? i = We(e, t) : r = "prev");
var a = e.options.tabSize, s = Xn(o, t), l = qa(s.text, null, a);
s.stateAfter && (s.stateAfter = null);
var c, u = s.text.match(/^\s*/)[0];
if (n || /\S/.test(s.text)) {
if ("smart" == r && (c = o.mode.indent(i, s.text.slice(u.length), s.text), c == Fa || c > 150)) {
if (!n) return;
r = "prev";
}
} else c = 0, r = "not";
"prev" == r ? c = t > o.first ? qa(Xn(o, t - 1).text, null, a) : 0 : "add" == r ? c = l + e.options.indentUnit : "subtract" == r ? c = l - e.options.indentUnit : "number" == typeof r && (c = l + r), 
c = Math.max(0, c);
var h = "", f = 0;
if (e.options.indentWithTabs) for (var d = Math.floor(c / a); d; --d) f += a, h += "	";
if (c > f && (h += Di(c - f)), h != u) return Dr(o, h, Ro(t, 0), Ro(t, u.length), "+input"), 
s.stateAfter = null, !0;
for (var d = 0; d < o.sel.ranges.length; d++) {
var p = o.sel.ranges[d];
if (p.head.line == t && p.head.ch < u.length) {
var f = Ro(t, u.length);
we(o, d, new he(f, f));
break;
}
}
}
function Br(e, t, r, n) {
var i = t, o = t;
return "number" == typeof t ? o = Xn(e, pe(e, t)) : i = ti(t), null == i ? null : (n(o, i) && e.cm && Pt(e.cm, i, r), 
o);
}
function Hr(e, t) {
for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
for (var o = t(r[i]); n.length && zo(o.from, Ni(n).to) <= 0; ) {
var a = n.pop();
if (zo(a.from, o.from) < 0) {
o.from = a.from;
break;
}
}
n.push(o);
}
Et(e, function() {
for (var t = n.length - 1; t >= 0; t--) Dr(e.doc, "", n[t].from, n[t].to, "+delete");
Rr(e);
});
}
function Wr(e, t, r, n, i) {
function o() {
var t = s + r;
return t < e.first || t >= e.first + e.size ? !1 : (s = t, u = Xn(e, t));
}
function a(e) {
var t = (i ? ho : fo)(u, l, r, !0);
if (null == t) {
if (e || !o()) return !1;
l = i ? (0 > r ? io : no)(u) : 0 > r ? u.text.length : 0;
} else l = t;
return !0;
}
var s = t.line, l = t.ch, c = r, u = Xn(e, s);
if ("char" == n) a(); else if ("column" == n) a(!0); else if ("word" == n || "group" == n) for (var h = null, f = "group" == n, d = e.cm && e.cm.getHelper(t, "wordChars"), p = !0; !(0 > r) || a(!p); p = !1) {
var m = u.text.charAt(l) || "\n", g = qi(m, d) ? "w" : f && "\n" == m ? "n" : !f || /\s/.test(m) ? null : "p";
if (!f || p || g || (g = "s"), h && h != g) {
0 > r && (r = 1, a());
break;
}
if (g && (h = g), r > 0 && !a(!p)) break;
}
var v = Ne(e, Ro(s, l), t, c, !0);
return zo(t, v) || (v.hitSide = !0), v;
}
function jr(e, t, r, n) {
var i, o = e.doc, a = t.left;
if ("page" == n) {
var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
i = t.top + r * (s - (0 > r ? 1.5 : .5) * bt(e.display));
} else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
for (;;) {
var l = gt(e, a, i);
if (!l.outside) break;
if (0 > r ? 0 >= i : i >= o.height) {
l.hitSide = !0;
break;
}
i += 5 * r;
}
return l;
}
function Ur(t, r, n, i) {
e.defaults[t] = r, n && (ea[t] = i ? function(e, t, r) {
r != ta && n(e, t, r);
} : n);
}
function Gr(e) {
for (var t, r, n, i, o = e.split(/-(?!$)/), e = o[o.length - 1], a = 0; a < o.length - 1; a++) {
var s = o[a];
if (/^(cmd|meta|m)$/i.test(s)) i = !0; else if (/^a(lt)?$/i.test(s)) t = !0; else if (/^(c|ctrl|control)$/i.test(s)) r = !0; else {
if (!/^s(hift)$/i.test(s)) throw Error("Unrecognized modifier name: " + s);
n = !0;
}
}
return t && (e = "Alt-" + e), r && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), n && (e = "Shift-" + e), 
e;
}
function Vr(e) {
return "string" == typeof e ? ua[e] : e;
}
function $r(e, t, r, n, i) {
if (n && n.shared) return Zr(e, t, r, n, i);
if (e.cm && !e.cm.curOp) return Mt(e.cm, $r)(e, t, r, n, i);
var o = new ga(e, i), a = zo(t, r);
if (n && Ri(n, o, !1), a > 0 || 0 == a && o.clearWhenEmpty !== !1) return o;
if (o.replacedWith && (o.collapsed = !0, o.widgetNode = Wi("span", [ o.replacedWith ], "CodeMirror-widget"), 
n.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (o.widgetNode.insertLeft = !0)), 
o.collapsed) {
if (vn(e, t.line, t, r, o) || t.line != r.line && vn(e, r.line, t, r, o)) throw Error("Inserting collapsed marker partially overlapping an existing one");
Po = !0;
}
o.addToHistory && ci(e, {
from: t,
to: r,
origin: "markText"
}, e.sel, NaN);
var s, l = t.line, c = e.cm;
if (e.iter(l, r.line + 1, function(e) {
c && o.collapsed && !c.options.lineWrapping && bn(e) == c.display.maxLine && (s = !0), 
o.collapsed && l != t.line && ei(e, 0), tn(e, new Jr(o, l == t.line ? t.ch : null, l == r.line ? r.ch : null)), 
++l;
}), o.collapsed && e.iter(t.line, r.line + 1, function(t) {
wn(e, t) && ei(t, 0);
}), o.clearOnEnter && Ea(o, "beforeCursorEnter", function() {
o.clear();
}), o.readOnly && (Fo = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), 
o.collapsed && (o.id = ++ma, o.atomic = !0), c) {
if (s && (c.curOp.updateMaxLine = !0), o.collapsed) Ft(c, t.line, r.line + 1); else if (o.className || o.title || o.startStyle || o.endStyle || o.css) for (var u = t.line; u <= r.line; u++) Pt(c, u, "text");
o.atomic && Ee(c.doc), Si(c, "markerAdded", c, o);
}
return o;
}
function Zr(e, t, r, n, i) {
n = Ri(n), n.shared = !1;
var o = [ $r(e, t, r, n, i) ], a = o[0], s = n.widgetNode;
return Yn(e, function(e) {
s && (n.widgetNode = s.cloneNode(!0)), o.push($r(e, me(e, t), me(e, r), n, i));
for (var l = 0; l < e.linked.length; ++l) if (e.linked[l].isParent) return;
a = Ni(o);
}), new va(o, a);
}
function Yr(e) {
return e.findMarks(Ro(e.first, 0), e.clipPos(Ro(e.lastLine())), function(e) {
return e.parent;
});
}
function Kr(e, t) {
for (var r = 0; r < t.length; r++) {
var n = t[r], i = n.find(), o = e.clipPos(i.from), a = e.clipPos(i.to);
if (zo(o, a)) {
var s = $r(e, o, a, n.primary, n.primary.type);
n.markers.push(s), s.parent = n;
}
}
}
function Xr(e) {
for (var t = 0; t < e.length; t++) {
var r = e[t], n = [ r.primary.doc ];
Yn(r.primary.doc, function(e) {
n.push(e);
});
for (var i = 0; i < r.markers.length; i++) {
var o = r.markers[i];
-1 == Oi(n, o.doc) && (o.parent = null, r.markers.splice(i--, 1));
}
}
}
function Jr(e, t, r) {
this.marker = e, this.from = t, this.to = r;
}
function Qr(e, t) {
if (e) for (var r = 0; r < e.length; ++r) {
var n = e[r];
if (n.marker == t) return n;
}
}
function en(e, t) {
for (var r, n = 0; n < e.length; ++n) e[n] != t && (r || (r = [])).push(e[n]);
return r;
}
function tn(e, t) {
e.markedSpans = e.markedSpans ? e.markedSpans.concat([ t ]) : [ t ], t.marker.attachLine(e);
}
function rn(e, t, r) {
if (e) for (var n, i = 0; i < e.length; ++i) {
var o = e[i], a = o.marker, s = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
if (s || o.from == t && "bookmark" == a.type && (!r || !o.marker.insertLeft)) {
var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
(n || (n = [])).push(new Jr(a, o.from, l ? null : o.to));
}
}
return n;
}
function nn(e, t, r) {
if (e) for (var n, i = 0; i < e.length; ++i) {
var o = e[i], a = o.marker, s = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
if (s || o.from == t && "bookmark" == a.type && (!r || o.marker.insertLeft)) {
var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
(n || (n = [])).push(new Jr(a, l ? null : o.from - t, null == o.to ? null : o.to - t));
}
}
return n;
}
function on(e, t) {
if (t.full) return null;
var r = ve(e, t.from.line) && Xn(e, t.from.line).markedSpans, n = ve(e, t.to.line) && Xn(e, t.to.line).markedSpans;
if (!r && !n) return null;
var i = t.from.ch, o = t.to.ch, a = 0 == zo(t.from, t.to), s = rn(r, i, a), l = nn(n, o, a), c = 1 == t.text.length, u = Ni(t.text).length + (c ? i : 0);
if (s) for (var h = 0; h < s.length; ++h) {
var f = s[h];
if (null == f.to) {
var d = Qr(l, f.marker);
d ? c && (f.to = null == d.to ? null : d.to + u) : f.to = i;
}
}
if (l) for (var h = 0; h < l.length; ++h) {
var f = l[h];
if (null != f.to && (f.to += u), null == f.from) {
var d = Qr(s, f.marker);
d || (f.from = u, c && (s || (s = [])).push(f));
} else f.from += u, c && (s || (s = [])).push(f);
}
s && (s = an(s)), l && l != s && (l = an(l));
var p = [ s ];
if (!c) {
var m, g = t.text.length - 2;
if (g > 0 && s) for (var h = 0; h < s.length; ++h) null == s[h].to && (m || (m = [])).push(new Jr(s[h].marker, null, null));
for (var h = 0; g > h; ++h) p.push(m);
p.push(l);
}
return p;
}
function an(e) {
for (var t = 0; t < e.length; ++t) {
var r = e[t];
null != r.from && r.from == r.to && r.marker.clearWhenEmpty !== !1 && e.splice(t--, 1);
}
return e.length ? e : null;
}
function sn(e, t) {
var r = mi(e, t), n = on(e, t);
if (!r) return n;
if (!n) return r;
for (var i = 0; i < r.length; ++i) {
var o = r[i], a = n[i];
if (o && a) e: for (var s = 0; s < a.length; ++s) {
for (var l = a[s], c = 0; c < o.length; ++c) if (o[c].marker == l.marker) continue e;
o.push(l);
} else a && (r[i] = a);
}
return r;
}
function ln(e, t, r) {
var n = null;
if (e.iter(t.line, r.line + 1, function(e) {
if (e.markedSpans) for (var t = 0; t < e.markedSpans.length; ++t) {
var r = e.markedSpans[t].marker;
!r.readOnly || n && -1 != Oi(n, r) || (n || (n = [])).push(r);
}
}), !n) return null;
for (var i = [ {
from: t,
to: r
} ], o = 0; o < n.length; ++o) for (var a = n[o], s = a.find(0), l = 0; l < i.length; ++l) {
var c = i[l];
if (!(zo(c.to, s.from) < 0 || zo(c.from, s.to) > 0)) {
var u = [ l, 1 ], h = zo(c.from, s.from), f = zo(c.to, s.to);
(0 > h || !a.inclusiveLeft && !h) && u.push({
from: c.from,
to: s.from
}), (f > 0 || !a.inclusiveRight && !f) && u.push({
from: s.to,
to: c.to
}), i.splice.apply(i, u), l += u.length - 1;
}
}
return i;
}
function cn(e) {
var t = e.markedSpans;
if (t) {
for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
e.markedSpans = null;
}
}
function un(e, t) {
if (t) {
for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
e.markedSpans = t;
}
}
function hn(e) {
return e.inclusiveLeft ? -1 : 0;
}
function fn(e) {
return e.inclusiveRight ? 1 : 0;
}
function dn(e, t) {
var r = e.lines.length - t.lines.length;
if (0 != r) return r;
var n = e.find(), i = t.find(), o = zo(n.from, i.from) || hn(e) - hn(t);
if (o) return -o;
var a = zo(n.to, i.to) || fn(e) - fn(t);
return a ? a : t.id - e.id;
}
function pn(e, t) {
var r, n = Po && e.markedSpans;
if (n) for (var i, o = 0; o < n.length; ++o) i = n[o], i.marker.collapsed && null == (t ? i.from : i.to) && (!r || dn(r, i.marker) < 0) && (r = i.marker);
return r;
}
function mn(e) {
return pn(e, !0);
}
function gn(e) {
return pn(e, !1);
}
function vn(e, t, r, n, i) {
var o = Xn(e, t), a = Po && o.markedSpans;
if (a) for (var s = 0; s < a.length; ++s) {
var l = a[s];
if (l.marker.collapsed) {
var c = l.marker.find(0), u = zo(c.from, r) || hn(l.marker) - hn(i), h = zo(c.to, n) || fn(l.marker) - fn(i);
if (!(u >= 0 && 0 >= h || 0 >= u && h >= 0) && (0 >= u && (zo(c.to, r) > 0 || l.marker.inclusiveRight && i.inclusiveLeft) || u >= 0 && (zo(c.from, n) < 0 || l.marker.inclusiveLeft && i.inclusiveRight))) return !0;
}
}
}
function bn(e) {
for (var t; t = mn(e); ) e = t.find(-1, !0).line;
return e;
}
function yn(e) {
for (var t, r; t = gn(e); ) e = t.find(1, !0).line, (r || (r = [])).push(e);
return r;
}
function xn(e, t) {
var r = Xn(e, t), n = bn(r);
return r == n ? t : ti(n);
}
function kn(e, t) {
if (t > e.lastLine()) return t;
var r, n = Xn(e, t);
if (!wn(e, n)) return t;
for (;r = gn(n); ) n = r.find(1, !0).line;
return ti(n) + 1;
}
function wn(e, t) {
var r = Po && t.markedSpans;
if (r) for (var n, i = 0; i < r.length; ++i) if (n = r[i], n.marker.collapsed) {
if (null == n.from) return !0;
if (!n.marker.widgetNode && 0 == n.from && n.marker.inclusiveLeft && Cn(e, t, n)) return !0;
}
}
function Cn(e, t, r) {
if (null == r.to) {
var n = r.marker.find(1, !0);
return Cn(e, n.line, Qr(n.line.markedSpans, r.marker));
}
if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
for (var i, o = 0; o < t.markedSpans.length; ++o) if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == r.to && (null == i.to || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && Cn(e, t, i)) return !0;
}
function Sn(e, t, r) {
ni(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Pr(e, null, r);
}
function _n(e) {
if (null != e.height) return e.height;
var t = e.doc.cm;
if (!t) return 0;
if (!$a(document.body, e.node)) {
var r = "position: relative;";
e.coverGutter && (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), 
e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"), Ui(t.display.measure, Wi("div", [ e.node ], null, r));
}
return e.height = e.node.parentNode.offsetHeight;
}
function An(e, t, r, n) {
var i = new ba(e, r, n), o = e.cm;
return o && i.noHScroll && (o.display.alignWidgets = !0), Br(e, t, "widget", function(t) {
var r = t.widgets || (t.widgets = []);
if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i), 
i.line = t, o && !wn(e, t)) {
var n = ni(t) < e.scrollTop;
ei(t, t.height + _n(i)), n && Pr(o, null, i.height), o.curOp.forceUpdate = !0;
}
return !0;
}), i;
}
function Ln(e, t, r, n) {
e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), 
null != e.order && (e.order = null), cn(e), un(e, r);
var i = n ? n(e) : 1;
i != e.height && ei(e, i);
}
function Tn(e) {
e.parent = null, cn(e);
}
function En(e, t) {
if (e) for (;;) {
var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
if (!r) break;
e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
var n = r[1] ? "bgClass" : "textClass";
null == t[n] ? t[n] = r[2] : RegExp("(?:^|s)" + r[2] + "(?:$|s)").test(t[n]) || (t[n] += " " + r[2]);
}
return e;
}
function Mn(t, r) {
if (t.blankLine) return t.blankLine(r);
if (t.innerMode) {
var n = e.innerMode(t, r);
return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0;
}
}
function Dn(t, r, n, i) {
for (var o = 0; 10 > o; o++) {
i && (i[0] = e.innerMode(t, n).mode);
var a = t.token(r, n);
if (r.pos > r.start) return a;
}
throw Error("Mode " + t.name + " failed to advance stream.");
}
function Nn(e, t, r, n) {
function i(e) {
return {
start: h.start,
end: h.pos,
string: h.current(),
type: o || null,
state: e ? sa(a.mode, u) : u
};
}
var o, a = e.doc, s = a.mode;
t = me(a, t);
var l, c = Xn(a, t.line), u = We(e, t.line, r), h = new pa(c.text, e.options.tabSize);
for (n && (l = []); (n || h.pos < t.ch) && !h.eol(); ) h.start = h.pos, o = Dn(s, h, u), 
n && l.push(i(!0));
return n ? l : i();
}
function On(e, t, r, n, i, o, a) {
var s = r.flattenSpans;
null == s && (s = e.options.flattenSpans);
var l, c = 0, u = null, h = new pa(t, e.options.tabSize), f = e.options.addModeClass && [ null ];
for ("" == t && En(Mn(r, n), o); !h.eol(); ) {
if (h.pos > e.options.maxHighlightLength ? (s = !1, a && Pn(e, t, n, h.pos), h.pos = t.length, 
l = null) : l = En(Dn(r, h, n, f), o), f) {
var d = f[0].name;
d && (l = "m-" + (l ? d + " " + l : d));
}
if (!s || u != l) {
for (;c < h.start; ) c = Math.min(h.start, c + 5e4), i(c, u);
u = l;
}
h.start = h.pos;
}
for (;c < h.pos; ) {
var p = Math.min(h.pos, c + 5e4);
i(p, u), c = p;
}
}
function In(e, t, r, n) {
var i = [ e.state.modeGen ], o = {};
On(e, t.text, e.doc.mode, r, function(e, t) {
i.push(e, t);
}, o, n);
for (var a = 0; a < e.state.overlays.length; ++a) {
var s = e.state.overlays[a], l = 1, c = 0;
On(e, t.text, s.mode, !0, function(e, t) {
for (var r = l; e > c; ) {
var n = i[l];
n > e && i.splice(l, 1, e, i[l + 1], n), l += 2, c = Math.min(e, n);
}
if (t) if (s.opaque) i.splice(r, l - r, e, "cm-overlay " + t), l = r + 2; else for (;l > r; r += 2) {
var o = i[r + 1];
i[r + 1] = (o ? o + " " : "") + "cm-overlay " + t;
}
}, o);
}
return {
styles: i,
classes: o.bgClass || o.textClass ? o : null
};
}
function Fn(e, t, r) {
if (!t.styles || t.styles[0] != e.state.modeGen) {
var n = We(e, ti(t)), i = In(e, t, t.text.length > e.options.maxHighlightLength ? sa(e.doc.mode, n) : n);
t.stateAfter = n, t.styles = i.styles, i.classes ? t.styleClasses = i.classes : t.styleClasses && (t.styleClasses = null), 
r === e.doc.frontier && e.doc.frontier++;
}
return t.styles;
}
function Pn(e, t, r, n) {
var i = e.doc.mode, o = new pa(t, e.options.tabSize);
for (o.start = o.pos = n || 0, "" == t && Mn(i, r); !o.eol(); ) Dn(i, o, r), o.start = o.pos;
}
function Rn(e, t) {
if (!e || /^\s*$/.test(e)) return null;
var r = t.addModeClass ? ka : xa;
return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"));
}
function zn(e, t) {
var r = Wi("span", null, null, ko ? "padding-right: .1px" : null), n = {
pre: Wi("pre", [ r ], "CodeMirror-line"),
content: r,
col: 0,
pos: 0,
cm: e,
splitSpaces: (yo || ko) && e.getOption("lineWrapping")
};
t.measure = {};
for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
var o, a = i ? t.rest[i - 1] : t.line;
n.pos = 0, n.addToken = Bn, Ji(e.display.measure) && (o = ii(a)) && (n.addToken = Wn(n.addToken, o)), 
n.map = [];
var s = t != e.display.externalMeasured && ti(a);
Un(a, n, Fn(e, a, s)), a.styleClasses && (a.styleClasses.bgClass && (n.bgClass = $i(a.styleClasses.bgClass, n.bgClass || "")), 
a.styleClasses.textClass && (n.textClass = $i(a.styleClasses.textClass, n.textClass || ""))), 
0 == n.map.length && n.map.push(0, 0, n.content.appendChild(Xi(e.display.measure))), 
0 == i ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), 
(t.measure.caches || (t.measure.caches = [])).push({}));
}
return ko && /\bcm-tab\b/.test(n.content.lastChild.className) && (n.content.className = "cm-tab-wrap-hack"), 
Na(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = $i(n.pre.className, n.textClass || "")), 
n;
}
function qn(e) {
var t = Wi("span", "•", "cm-invalidchar");
return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), 
t;
}
function Bn(e, t, r, n, i, o, a) {
if (t) {
var s = e.splitSpaces ? t.replace(/ {3,}/g, Hn) : t, l = e.cm.state.specialChars, c = !1;
if (l.test(t)) for (var u = document.createDocumentFragment(), h = 0; ;) {
l.lastIndex = h;
var f = l.exec(t), d = f ? f.index - h : t.length - h;
if (d) {
var p = document.createTextNode(s.slice(h, h + d));
yo && 9 > xo ? u.appendChild(Wi("span", [ p ])) : u.appendChild(p), e.map.push(e.pos, e.pos + d, p), 
e.col += d, e.pos += d;
}
if (!f) break;
if (h += d + 1, "	" == f[0]) {
var m = e.cm.options.tabSize, g = m - e.col % m, p = u.appendChild(Wi("span", Di(g), "cm-tab"));
p.setAttribute("role", "presentation"), p.setAttribute("cm-text", "	"), e.col += g;
} else if ("\r" == f[0] || "\n" == f[0]) {
var p = u.appendChild(Wi("span", "\r" == f[0] ? "␍" : "␤", "cm-invalidchar"));
p.setAttribute("cm-text", f[0]), e.col += 1;
} else {
var p = e.cm.options.specialCharPlaceholder(f[0]);
p.setAttribute("cm-text", f[0]), yo && 9 > xo ? u.appendChild(Wi("span", [ p ])) : u.appendChild(p), 
e.col += 1;
}
e.map.push(e.pos, e.pos + 1, p), e.pos++;
} else {
e.col += t.length;
var u = document.createTextNode(s);
e.map.push(e.pos, e.pos + t.length, u), yo && 9 > xo && (c = !0), e.pos += t.length;
}
if (r || n || i || c || a) {
var v = r || "";
n && (v += n), i && (v += i);
var b = Wi("span", [ u ], v, a);
return o && (b.title = o), e.content.appendChild(b);
}
e.content.appendChild(u);
}
}
function Hn(e) {
for (var t = " ", r = 0; r < e.length - 2; ++r) t += r % 2 ? " " : " ";
return t += " ";
}
function Wn(e, t) {
return function(r, n, i, o, a, s, l) {
i = i ? i + " cm-force-border" : "cm-force-border";
for (var c = r.pos, u = c + n.length; ;) {
for (var h = 0; h < t.length; h++) {
var f = t[h];
if (f.to > c && f.from <= c) break;
}
if (f.to >= u) return e(r, n, i, o, a, s, l);
e(r, n.slice(0, f.to - c), i, o, null, s, l), o = null, n = n.slice(f.to - c), c = f.to;
}
};
}
function jn(e, t, r, n) {
var i = !n && r.widgetNode;
i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), 
i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), 
e.pos += t;
}
function Un(e, t, r) {
var n = e.markedSpans, i = e.text, o = 0;
if (n) for (var a, s, l, c, u, h, f, d = i.length, p = 0, m = 1, g = "", v = 0; ;) {
if (v == p) {
l = c = u = h = s = "", f = null, v = 1 / 0;
for (var b, y = [], x = 0; x < n.length; ++x) {
var k = n[x], w = k.marker;
"bookmark" == w.type && k.from == p && w.widgetNode ? y.push(w) : k.from <= p && (null == k.to || k.to > p || w.collapsed && k.to == p && k.from == p) ? (null != k.to && k.to != p && v > k.to && (v = k.to, 
c = ""), w.className && (l += " " + w.className), w.css && (s = (s ? s + ";" : "") + w.css), 
w.startStyle && k.from == p && (u += " " + w.startStyle), w.endStyle && k.to == v && (b || (b = [])).push(w.endStyle, k.to), 
w.title && !h && (h = w.title), w.collapsed && (!f || dn(f.marker, w) < 0) && (f = k)) : k.from > p && v > k.from && (v = k.from);
}
if (b) for (var x = 0; x < b.length; x += 2) b[x + 1] == v && (c += " " + b[x]);
if (!f || f.from == p) for (var x = 0; x < y.length; ++x) jn(t, 0, y[x]);
if (f && (f.from || 0) == p) {
if (jn(t, (null == f.to ? d + 1 : f.to) - p, f.marker, null == f.from), null == f.to) return;
f.to == p && (f = !1);
}
}
if (p >= d) break;
for (var C = Math.min(d, v); ;) {
if (g) {
var S = p + g.length;
if (!f) {
var _ = S > C ? g.slice(0, C - p) : g;
t.addToken(t, _, a ? a + l : l, u, p + _.length == v ? c : "", h, s);
}
if (S >= C) {
g = g.slice(C - p), p = C;
break;
}
p = S, u = "";
}
g = i.slice(o, o = r[m++]), a = Rn(r[m++], t.cm.options);
}
} else for (var m = 1; m < r.length; m += 2) t.addToken(t, i.slice(o, o = r[m]), Rn(r[m + 1], t.cm.options));
}
function Gn(e, t) {
return 0 == t.from.ch && 0 == t.to.ch && "" == Ni(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore);
}
function Vn(e, t, r, n) {
function i(e) {
return r ? r[e] : null;
}
function o(e, r, i) {
Ln(e, r, i, n), Si(e, "change", e, t);
}
function a(e, t) {
for (var r = e, o = []; t > r; ++r) o.push(new ya(c[r], i(r), n));
return o;
}
var s = t.from, l = t.to, c = t.text, u = Xn(e, s.line), h = Xn(e, l.line), f = Ni(c), d = i(c.length - 1), p = l.line - s.line;
if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length); else if (Gn(e, t)) {
var m = a(0, c.length - 1);
o(h, h.text, d), p && e.remove(s.line, p), m.length && e.insert(s.line, m);
} else if (u == h) if (1 == c.length) o(u, u.text.slice(0, s.ch) + f + u.text.slice(l.ch), d); else {
var m = a(1, c.length - 1);
m.push(new ya(f + u.text.slice(l.ch), d, n)), o(u, u.text.slice(0, s.ch) + c[0], i(0)), 
e.insert(s.line + 1, m);
} else if (1 == c.length) o(u, u.text.slice(0, s.ch) + c[0] + h.text.slice(l.ch), i(0)), 
e.remove(s.line + 1, p); else {
o(u, u.text.slice(0, s.ch) + c[0], i(0)), o(h, f + h.text.slice(l.ch), d);
var m = a(1, c.length - 1);
p > 1 && e.remove(s.line + 1, p - 1), e.insert(s.line + 1, m);
}
Si(e, "change", e, t);
}
function $n(e) {
this.lines = e, this.parent = null;
for (var t = 0, r = 0; t < e.length; ++t) e[t].parent = this, r += e[t].height;
this.height = r;
}
function Zn(e) {
this.children = e;
for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
var i = e[n];
t += i.chunkSize(), r += i.height, i.parent = this;
}
this.size = t, this.height = r, this.parent = null;
}
function Yn(e, t, r) {
function n(e, i, o) {
if (e.linked) for (var a = 0; a < e.linked.length; ++a) {
var s = e.linked[a];
if (s.doc != i) {
var l = o && s.sharedHist;
(!r || l) && (t(s.doc, l), n(s.doc, e, l));
}
}
}
n(e, null, !0);
}
function Kn(e, t) {
if (t.cm) throw Error("This document is already in use.");
e.doc = t, t.cm = e, a(e), r(e), e.options.lineWrapping || f(e), e.options.mode = t.modeOption, 
Ft(e);
}
function Xn(e, t) {
if (t -= e.first, 0 > t || t >= e.size) throw Error("There is no line " + (t + e.first) + " in the document.");
for (var r = e; !r.lines; ) for (var n = 0; ;++n) {
var i = r.children[n], o = i.chunkSize();
if (o > t) {
r = i;
break;
}
t -= o;
}
return r.lines[t];
}
function Jn(e, t, r) {
var n = [], i = t.line;
return e.iter(t.line, r.line + 1, function(e) {
var o = e.text;
i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), 
++i;
}), n;
}
function Qn(e, t, r) {
var n = [];
return e.iter(t, r, function(e) {
n.push(e.text);
}), n;
}
function ei(e, t) {
var r = t - e.height;
if (r) for (var n = e; n; n = n.parent) n.height += r;
}
function ti(e) {
if (null == e.parent) return null;
for (var t = e.parent, r = Oi(t.lines, e), n = t.parent; n; t = n, n = n.parent) for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
return r + t.first;
}
function ri(e, t) {
var r = e.first;
e: do {
for (var n = 0; n < e.children.length; ++n) {
var i = e.children[n], o = i.height;
if (o > t) {
e = i;
continue e;
}
t -= o, r += i.chunkSize();
}
return r;
} while (!e.lines);
for (var n = 0; n < e.lines.length; ++n) {
var a = e.lines[n], s = a.height;
if (s > t) break;
t -= s;
}
return r + n;
}
function ni(e) {
e = bn(e);
for (var t = 0, r = e.parent, n = 0; n < r.lines.length; ++n) {
var i = r.lines[n];
if (i == e) break;
t += i.height;
}
for (var o = r.parent; o; r = o, o = r.parent) for (var n = 0; n < o.children.length; ++n) {
var a = o.children[n];
if (a == r) break;
t += a.height;
}
return t;
}
function ii(e) {
var t = e.order;
return null == t && (t = e.order = as(e.text)), t;
}
function oi(e) {
this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, 
this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, 
this.generation = this.maxGeneration = e || 1;
}
function ai(e, t) {
var r = {
from: $(t.from),
to: Jo(t),
text: Jn(e, t.from, t.to)
};
return di(e, r, t.from.line, t.to.line + 1), Yn(e, function(e) {
di(e, r, t.from.line, t.to.line + 1);
}, !0), r;
}
function si(e) {
for (;e.length; ) {
var t = Ni(e);
if (!t.ranges) break;
e.pop();
}
}
function li(e, t) {
return t ? (si(e.done), Ni(e.done)) : e.done.length && !Ni(e.done).ranges ? Ni(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), 
Ni(e.done)) : void 0;
}
function ci(e, t, r, n) {
var i = e.history;
i.undone.length = 0;
var o, a = +new Date();
if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > a - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = li(i, i.lastOp == n))) {
var s = Ni(o.changes);
0 == zo(t.from, t.to) && 0 == zo(t.from, s.to) ? s.to = Jo(t) : o.changes.push(ai(e, t));
} else {
var l = Ni(i.done);
for (l && l.ranges || fi(e.sel, i.done), o = {
changes: [ ai(e, t) ],
generation: i.generation
}, i.done.push(o); i.done.length > i.undoDepth; ) i.done.shift(), i.done[0].ranges || i.done.shift();
}
i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = a, 
i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, s || Na(e, "historyAdded");
}
function ui(e, t, r, n) {
var i = t.charAt(0);
return "*" == i || "+" == i && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
}
function hi(e, t, r, n) {
var i = e.history, o = n && n.origin;
r == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || ui(e, o, Ni(i.done), t)) ? i.done[i.done.length - 1] = t : fi(t, i.done), 
i.lastSelTime = +new Date(), i.lastSelOrigin = o, i.lastSelOp = r, n && n.clearRedo !== !1 && si(i.undone);
}
function fi(e, t) {
var r = Ni(t);
r && r.ranges && r.equals(e) || t.push(e);
}
function di(e, t, r, n) {
var i = t["spans_" + e.id], o = 0;
e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function(r) {
r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o;
});
}
function pi(e) {
if (!e) return null;
for (var t, r = 0; r < e.length; ++r) e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
return t ? t.length ? t : null : e;
}
function mi(e, t) {
var r = t["spans_" + e.id];
if (!r) return null;
for (var n = 0, i = []; n < t.text.length; ++n) i.push(pi(r[n]));
return i;
}
function gi(e, t, r) {
for (var n = 0, i = []; n < e.length; ++n) {
var o = e[n];
if (o.ranges) i.push(r ? ue.prototype.deepCopy.call(o) : o); else {
var a = o.changes, s = [];
i.push({
changes: s
});
for (var l = 0; l < a.length; ++l) {
var c, u = a[l];
if (s.push({
from: u.from,
to: u.to,
text: u.text
}), t) for (var h in u) (c = h.match(/^spans_(\d+)$/)) && Oi(t, +c[1]) > -1 && (Ni(s)[h] = u[h], 
delete u[h]);
}
}
}
return i;
}
function vi(e, t, r, n) {
r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0);
}
function bi(e, t, r, n) {
for (var i = 0; i < e.length; ++i) {
var o = e[i], a = !0;
if (o.ranges) {
o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
for (var s = 0; s < o.ranges.length; s++) vi(o.ranges[s].anchor, t, r, n), vi(o.ranges[s].head, t, r, n);
} else {
for (var s = 0; s < o.changes.length; ++s) {
var l = o.changes[s];
if (r < l.from.line) l.from = Ro(l.from.line + n, l.from.ch), l.to = Ro(l.to.line + n, l.to.ch); else if (t <= l.to.line) {
a = !1;
break;
}
}
a || (e.splice(0, i + 1), i = 0);
}
}
}
function yi(e, t) {
var r = t.from.line, n = t.to.line, i = t.text.length - (n - r) - 1;
bi(e.done, r, n, i), bi(e.undone, r, n, i);
}
function xi(e) {
return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
}
function ki(e) {
return e.target || e.srcElement;
}
function wi(e) {
var t = e.which;
return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), 
Mo && e.ctrlKey && 1 == t && (t = 3), t;
}
function Ci(e, t, r) {
var n = e._handlers && e._handlers[t];
return r ? n && n.length > 0 ? n.slice() : Ma : n || Ma;
}
function Si(e, t) {
function r(e) {
return function() {
e.apply(null, o);
};
}
var n = Ci(e, t, !1);
if (n.length) {
var i, o = Array.prototype.slice.call(arguments, 2);
Uo ? i = Uo.delayedCallbacks : Oa ? i = Oa : (i = Oa = [], setTimeout(_i, 0));
for (var a = 0; a < n.length; ++a) i.push(r(n[a]));
}
}
function _i() {
var e = Oa;
Oa = null;
for (var t = 0; t < e.length; ++t) e[t]();
}
function Ai(e, t, r) {
return "string" == typeof t && (t = {
type: t,
preventDefault: function() {
this.defaultPrevented = !0;
}
}), Na(e, r || t.type, e, t), xi(t) || t.codemirrorIgnore;
}
function Li(e) {
var t = e._handlers && e._handlers.cursorActivity;
if (t) for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n) -1 == Oi(r, t[n]) && r.push(t[n]);
}
function Ti(e, t) {
return Ci(e, t).length > 0;
}
function Ei(e) {
e.prototype.on = function(e, t) {
Ea(this, e, t);
}, e.prototype.off = function(e, t) {
Da(this, e, t);
};
}
function Mi() {
this.id = null;
}
function Di(e) {
for (;Ha.length <= e; ) Ha.push(Ni(Ha) + " ");
return Ha[e];
}
function Ni(e) {
return e[e.length - 1];
}
function Oi(e, t) {
for (var r = 0; r < e.length; ++r) if (e[r] == t) return r;
return -1;
}
function Ii(e, t) {
for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
return r;
}
function Fi() {}
function Pi(e, t) {
var r;
return Object.create ? r = Object.create(e) : (Fi.prototype = e, r = new Fi()), 
t && Ri(t, r), r;
}
function Ri(e, t, r) {
t || (t = {});
for (var n in e) !e.hasOwnProperty(n) || r === !1 && t.hasOwnProperty(n) || (t[n] = e[n]);
return t;
}
function zi(e) {
var t = Array.prototype.slice.call(arguments, 1);
return function() {
return e.apply(null, t);
};
}
function qi(e, t) {
return t ? t.source.indexOf("\\w") > -1 && Ga(e) ? !0 : t.test(e) : Ga(e);
}
function Bi(e) {
for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1;
return !0;
}
function Hi(e) {
return e.charCodeAt(0) >= 768 && Va.test(e);
}
function Wi(e, t, r, n) {
var i = document.createElement(e);
if (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t) i.appendChild(document.createTextNode(t)); else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
return i;
}
function ji(e) {
for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
return e;
}
function Ui(e, t) {
return ji(e).appendChild(t);
}
function Gi() {
for (var e = document.activeElement; e && e.root && e.root.activeElement; ) e = e.root.activeElement;
return e;
}
function Vi(e) {
return RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
}
function $i(e, t) {
for (var r = e.split(" "), n = 0; n < r.length; n++) r[n] && !Vi(r[n]).test(t) && (t += " " + r[n]);
return t;
}
function Zi(e) {
if (document.body.getElementsByClassName) for (var t = document.body.getElementsByClassName("CodeMirror"), r = 0; r < t.length; r++) {
var n = t[r].CodeMirror;
n && e(n);
}
}
function Yi() {
Ja || (Ki(), Ja = !0);
}
function Ki() {
var e;
Ea(window, "resize", function() {
null == e && (e = setTimeout(function() {
e = null, Zi(Ut);
}, 100));
}), Ea(window, "blur", function() {
Zi(vr);
});
}
function Xi(e) {
if (null == Za) {
var t = Wi("span", "​");
Ui(e, Wi("span", [ t, document.createTextNode("x") ])), 0 != e.firstChild.offsetHeight && (Za = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(yo && 8 > xo));
}
var r = Za ? Wi("span", "​") : Wi("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
return r.setAttribute("cm-text", ""), r;
}
function Ji(e) {
if (null != Ya) return Ya;
var t = Ui(e, document.createTextNode("AخA")), r = ja(t, 0, 1).getBoundingClientRect();
if (!r || r.left == r.right) return !1;
var n = ja(t, 1, 2).getBoundingClientRect();
return Ya = n.right - r.right < 3;
}
function Qi(e) {
if (null != ns) return ns;
var t = Ui(e, Wi("span", "x")), r = t.getBoundingClientRect(), n = ja(t, 0, 1).getBoundingClientRect();
return ns = Math.abs(r.left - n.left) > 1;
}
function eo(e, t, r, n) {
if (!e) return n(t, r, "ltr");
for (var i = !1, o = 0; o < e.length; ++o) {
var a = e[o];
(a.from < r && a.to > t || t == r && a.to == t) && (n(Math.max(a.from, t), Math.min(a.to, r), 1 == a.level ? "rtl" : "ltr"), 
i = !0);
}
i || n(t, r, "ltr");
}
function to(e) {
return e.level % 2 ? e.to : e.from;
}
function ro(e) {
return e.level % 2 ? e.from : e.to;
}
function no(e) {
var t = ii(e);
return t ? to(t[0]) : 0;
}
function io(e) {
var t = ii(e);
return t ? ro(Ni(t)) : e.text.length;
}
function oo(e, t) {
var r = Xn(e.doc, t), n = bn(r);
n != r && (t = ti(n));
var i = ii(n), o = i ? i[0].level % 2 ? io(n) : no(n) : 0;
return Ro(t, o);
}
function ao(e, t) {
for (var r, n = Xn(e.doc, t); r = gn(n); ) n = r.find(1, !0).line, t = null;
var i = ii(n), o = i ? i[0].level % 2 ? no(n) : io(n) : n.text.length;
return Ro(null == t ? ti(n) : t, o);
}
function so(e, t) {
var r = oo(e, t.line), n = Xn(e.doc, r.line), i = ii(n);
if (!i || 0 == i[0].level) {
var o = Math.max(0, n.text.search(/\S/)), a = t.line == r.line && t.ch <= o && t.ch;
return Ro(r.line, a ? 0 : o);
}
return r;
}
function lo(e, t, r) {
var n = e[0].level;
return t == n ? !0 : r == n ? !1 : r > t;
}
function co(e, t) {
os = null;
for (var r, n = 0; n < e.length; ++n) {
var i = e[n];
if (i.from < t && i.to > t) return n;
if (i.from == t || i.to == t) {
if (null != r) return lo(e, i.level, e[r].level) ? (i.from != i.to && (os = r), 
n) : (i.from != i.to && (os = n), r);
r = n;
}
}
return r;
}
function uo(e, t, r, n) {
if (!n) return t + r;
do t += r; while (t > 0 && Hi(e.text.charAt(t)));
return t;
}
function ho(e, t, r, n) {
var i = ii(e);
if (!i) return fo(e, t, r, n);
for (var o = co(i, t), a = i[o], s = uo(e, t, a.level % 2 ? -r : r, n); ;) {
if (s > a.from && s < a.to) return s;
if (s == a.from || s == a.to) return co(i, s) == o ? s : (a = i[o += r], r > 0 == a.level % 2 ? a.to : a.from);
if (a = i[o += r], !a) return null;
s = r > 0 == a.level % 2 ? uo(e, a.to, -1, n) : uo(e, a.from, 1, n);
}
}
function fo(e, t, r, n) {
var i = t + r;
if (n) for (;i > 0 && Hi(e.text.charAt(i)); ) i += r;
return 0 > i || i > e.text.length ? null : i;
}
var po = navigator.userAgent, mo = navigator.platform, go = /gecko\/\d/i.test(po), vo = /MSIE \d/.test(po), bo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(po), yo = vo || bo, xo = yo && (vo ? document.documentMode || 6 : bo[1]), ko = /WebKit\//.test(po), wo = ko && /Qt\/\d+\.\d+/.test(po), Co = /Chrome\//.test(po), So = /Opera\//.test(po), _o = /Apple Computer/.test(navigator.vendor), Ao = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(po), Lo = /PhantomJS/.test(po), To = /AppleWebKit/.test(po) && /Mobile\/\w+/.test(po), Eo = To || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(po), Mo = To || /Mac/.test(mo), Do = /win/i.test(mo), No = So && po.match(/Version\/(\d*\.\d*)/);
No && (No = +No[1]), No && No >= 15 && (So = !1, ko = !0);
var Oo = Mo && (wo || So && (null == No || 12.11 > No)), Io = go || yo && xo >= 9, Fo = !1, Po = !1;
m.prototype = Ri({
update: function(e) {
var t = e.scrollWidth > e.clientWidth + 1, r = e.scrollHeight > e.clientHeight + 1, n = e.nativeBarWidth;
if (r) {
this.vert.style.display = "block", this.vert.style.bottom = t ? n + "px" : "0";
var i = e.viewHeight - (t ? n : 0);
this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
} else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
if (t) {
this.horiz.style.display = "block", this.horiz.style.right = r ? n + "px" : "0", 
this.horiz.style.left = e.barLeft + "px";
var o = e.viewWidth - e.barLeft - (r ? n : 0);
this.horiz.firstChild.style.width = e.scrollWidth - e.clientWidth + o + "px";
} else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == n && this.zeroWidthHack(), 
this.checkedZeroWidth = !0), {
right: r ? n : 0,
bottom: t ? n : 0
};
},
setScrollLeft: function(e) {
this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz);
},
setScrollTop: function(e) {
this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert);
},
zeroWidthHack: function() {
var e = Mo && !Ao ? "12px" : "18px";
this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", 
this.disableHoriz = new Mi(), this.disableVert = new Mi();
},
enableZeroWidthBar: function(e, t) {
function r() {
var n = e.getBoundingClientRect(), i = document.elementFromPoint(n.left + 1, n.bottom - 1);
i != e ? e.style.pointerEvents = "none" : t.set(1e3, r);
}
e.style.pointerEvents = "auto", t.set(1e3, r);
},
clear: function() {
var e = this.horiz.parentNode;
e.removeChild(this.horiz), e.removeChild(this.vert);
}
}, m.prototype), g.prototype = Ri({
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
}, _.prototype.signal = function(e, t) {
Ti(e, t) && this.events.push(arguments);
}, _.prototype.finish = function() {
for (var e = 0; e < this.events.length; e++) Na.apply(null, this.events[e]);
};
var Ro = e.Pos = function(e, t) {
return this instanceof Ro ? (this.line = e, void (this.ch = t)) : new Ro(e, t);
}, zo = e.cmpPos = function(e, t) {
return e.line - t.line || e.ch - t.ch;
}, qo = null;
re.prototype = Ri({
init: function(e) {
function t(e) {
if (!Ai(n, e)) {
if (n.somethingSelected()) qo = n.getSelections(), r.inaccurateSelection && (r.prevInput = "", 
r.inaccurateSelection = !1, o.value = qo.join("\n"), Wa(o)); else {
if (!n.options.lineWiseCopyCut) return;
var t = ee(n);
qo = t.text, "cut" == e.type ? n.setSelections(t.ranges, null, Pa) : (r.prevInput = "", 
o.value = t.text.join("\n"), Wa(o));
}
"cut" == e.type && (n.state.cutIncoming = !0);
}
}
var r = this, n = this.cm, i = this.wrapper = ne(), o = this.textarea = i.firstChild;
e.wrapper.insertBefore(i, e.wrapper.firstChild), To && (o.style.width = "0px"), 
Ea(o, "input", function() {
yo && xo >= 9 && r.hasSelection && (r.hasSelection = null), r.poll();
}), Ea(o, "paste", function(e) {
Ai(n, e) || J(e, n) || (n.state.pasteIncoming = !0, r.fastPoll());
}), Ea(o, "cut", t), Ea(o, "copy", t), Ea(e.scroller, "paste", function(t) {
Gt(e, t) || Ai(n, t) || (n.state.pasteIncoming = !0, r.focus());
}), Ea(e.lineSpace, "selectstart", function(t) {
Gt(e, t) || Aa(t);
}), Ea(o, "compositionstart", function() {
var e = n.getCursor("from");
r.composing && r.composing.range.clear(), r.composing = {
start: e,
range: n.markText(e, n.getCursor("to"), {
className: "CodeMirror-composing"
})
};
}), Ea(o, "compositionend", function() {
r.composing && (r.poll(), r.composing.range.clear(), r.composing = null);
});
},
prepareSelection: function() {
var e = this.cm, t = e.display, r = e.doc, n = Fe(e);
if (e.options.moveInputWithCursor) {
var i = dt(e, r.sel.primary().head, "div"), o = t.wrapper.getBoundingClientRect(), a = t.lineDiv.getBoundingClientRect();
n.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), 
n.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left));
}
return n;
},
showSelection: function(e) {
var t = this.cm, r = t.display;
Ui(r.cursorDiv, e.cursors), Ui(r.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", 
this.wrapper.style.left = e.teLeft + "px");
},
reset: function(e) {
if (!this.contextMenuPending) {
var t, r, n = this.cm, i = n.doc;
if (n.somethingSelected()) {
this.prevInput = "";
var o = i.sel.primary();
t = rs && (o.to().line - o.from().line > 100 || (r = n.getSelection()).length > 1e3);
var a = t ? "-" : r || n.getSelection();
this.textarea.value = a, n.state.focused && Wa(this.textarea), yo && xo >= 9 && (this.hasSelection = a);
} else e || (this.prevInput = this.textarea.value = "", yo && xo >= 9 && (this.hasSelection = null));
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
if ("nocursor" != this.cm.options.readOnly && (!Eo || Gi() != this.textarea)) try {
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
var n = r.poll();
n || t ? (r.pollingFast = !1, r.slowPoll()) : (t = !0, r.polling.set(60, e));
}
var t = !1, r = this;
r.pollingFast = !0, r.polling.set(20, e);
},
poll: function() {
var e = this.cm, t = this.textarea, r = this.prevInput;
if (this.contextMenuPending || !e.state.focused || ts(t) && !r && !this.composing || e.isReadOnly() || e.options.disableInput || e.state.keySeq) return !1;
var n = t.value;
if (n == r && !e.somethingSelected()) return !1;
if (yo && xo >= 9 && this.hasSelection === n || Mo && /[\uf700-\uf7ff]/.test(n)) return e.display.input.reset(), 
!1;
if (e.doc.sel == e.display.selForContextMenu) {
var i = n.charCodeAt(0);
if (8203 != i || r || (r = "​"), 8666 == i) return this.reset(), this.cm.execCommand("undo");
}
for (var o = 0, a = Math.min(r.length, n.length); a > o && r.charCodeAt(o) == n.charCodeAt(o); ) ++o;
var s = this;
return Et(e, function() {
X(e, n.slice(o), r.length - o, null, s.composing ? "*compose" : null), n.length > 1e3 || n.indexOf("\n") > -1 ? t.value = s.prevInput = "" : s.prevInput = n, 
s.composing && (s.composing.range.clear(), s.composing.range = e.markText(s.composing.start, e.getCursor("to"), {
className: "CodeMirror-composing"
}));
}), !0;
},
ensurePolled: function() {
this.pollingFast && this.poll() && (this.pollingFast = !1);
},
onKeyPress: function() {
yo && xo >= 9 && (this.hasSelection = null), this.fastPoll();
},
onContextMenu: function(e) {
function t() {
if (null != a.selectionStart) {
var e = i.somethingSelected(), t = "​" + (e ? a.value : "");
a.value = "⇚", a.value = t, n.prevInput = e ? "" : "​", a.selectionStart = 1, a.selectionEnd = t.length, 
o.selForContextMenu = i.doc.sel;
}
}
function r() {
if (n.contextMenuPending = !1, n.wrapper.style.position = "relative", a.style.cssText = u, 
yo && 9 > xo && o.scrollbars.setScrollTop(o.scroller.scrollTop = l), null != a.selectionStart) {
(!yo || yo && 9 > xo) && t();
var e = 0, r = function() {
o.selForContextMenu == i.doc.sel && 0 == a.selectionStart && a.selectionEnd > 0 && "​" == n.prevInput ? Mt(i, ca.selectAll)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(r, 500) : o.input.reset();
};
o.detectingSelectAll = setTimeout(r, 200);
}
}
var n = this, i = n.cm, o = i.display, a = n.textarea, s = Vt(i, e), l = o.scroller.scrollTop;
if (s && !So) {
var c = i.options.resetSelectionOnContextMenu;
c && -1 == i.doc.sel.contains(s) && Mt(i, Ae)(i.doc, de(s), Pa);
var u = a.style.cssText;
if (n.wrapper.style.position = "absolute", a.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: " + (yo ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", 
ko) var h = window.scrollY;
if (o.input.focus(), ko && window.scrollTo(null, h), o.input.reset(), i.somethingSelected() || (a.value = n.prevInput = " "), 
n.contextMenuPending = !0, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), 
yo && xo >= 9 && t(), Io) {
Ta(e);
var f = function() {
Da(window, "mouseup", f), setTimeout(r, 20);
};
Ea(window, "mouseup", f);
} else setTimeout(r, 50);
}
},
readOnlyChanged: function(e) {
e || this.reset();
},
setUneditable: Fi,
needsContentAttribute: !1
}, re.prototype), ie.prototype = Ri({
init: function(e) {
function t(e) {
if (!Ai(n, e)) {
if (n.somethingSelected()) qo = n.getSelections(), "cut" == e.type && n.replaceSelection("", null, "cut"); else {
if (!n.options.lineWiseCopyCut) return;
var t = ee(n);
qo = t.text, "cut" == e.type && n.operation(function() {
n.setSelections(t.ranges, 0, Pa), n.replaceSelection("", null, "cut");
});
}
if (e.clipboardData && !To) e.preventDefault(), e.clipboardData.clearData(), e.clipboardData.setData("text/plain", qo.join("\n")); else {
var r = ne(), i = r.firstChild;
n.display.lineSpace.insertBefore(r, n.display.lineSpace.firstChild), i.value = qo.join("\n");
var o = document.activeElement;
Wa(i), setTimeout(function() {
n.display.lineSpace.removeChild(r), o.focus();
}, 50);
}
}
}
var r = this, n = r.cm, i = r.div = e.lineDiv;
te(i), Ea(i, "paste", function(e) {
Ai(n, e) || J(e, n);
}), Ea(i, "compositionstart", function(e) {
var t = e.data;
if (r.composing = {
sel: n.doc.sel,
data: t,
startData: t
}, t) {
var i = n.doc.sel.primary(), o = n.getLine(i.head.line), a = o.indexOf(t, Math.max(0, i.head.ch - t.length));
a > -1 && a <= i.head.ch && (r.composing.sel = de(Ro(i.head.line, a), Ro(i.head.line, a + t.length)));
}
}), Ea(i, "compositionupdate", function(e) {
r.composing.data = e.data;
}), Ea(i, "compositionend", function(e) {
var t = r.composing;
t && (e.data == t.startData || /\u200b/.test(e.data) || (t.data = e.data), setTimeout(function() {
t.handled || r.applyComposition(t), r.composing == t && (r.composing = null);
}, 50));
}), Ea(i, "touchstart", function() {
r.forceCompositionEnd();
}), Ea(i, "input", function() {
r.composing || (n.isReadOnly() || !r.pollContent()) && Et(r.cm, function() {
Ft(n);
});
}), Ea(i, "copy", t), Ea(i, "cut", t);
},
prepareSelection: function() {
var e = Fe(this.cm, !1);
return e.focus = this.cm.state.focused, e;
},
showSelection: function(e) {
e && this.cm.display.view.length && (e.focus && this.showPrimarySelection(), this.showMultipleSelections(e));
},
showPrimarySelection: function() {
var e = window.getSelection(), t = this.cm.doc.sel.primary(), r = se(this.cm, e.anchorNode, e.anchorOffset), n = se(this.cm, e.focusNode, e.focusOffset);
if (!r || r.bad || !n || n.bad || 0 != zo(Y(r, n), t.from()) || 0 != zo(Z(r, n), t.to())) {
var i = oe(this.cm, t.from()), o = oe(this.cm, t.to());
if (i || o) {
var a = this.cm.display.view, s = e.rangeCount && e.getRangeAt(0);
if (i) {
if (!o) {
var l = a[a.length - 1].measure, c = l.maps ? l.maps[l.maps.length - 1] : l.map;
o = {
node: c[c.length - 1],
offset: c[c.length - 2] - c[c.length - 3]
};
}
} else i = {
node: a[0].measure.map[2],
offset: 0
};
try {
var u = ja(i.node, i.offset, o.offset, o.node);
} catch (h) {}
u && (!go && this.cm.state.focused ? (e.collapse(i.node, i.offset), u.collapsed || e.addRange(u)) : (e.removeAllRanges(), 
e.addRange(u)), s && null == e.anchorNode ? e.addRange(s) : go && this.startGracePeriod()), 
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
Ui(this.cm.display.cursorDiv, e.cursors), Ui(this.cm.display.selectionDiv, e.selection);
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
return $a(this.div, t);
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
this.selectionInEditor() ? this.pollSelection() : Et(this.cm, function() {
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
var r = se(t, e.anchorNode, e.anchorOffset), n = se(t, e.focusNode, e.focusOffset);
r && n && Et(t, function() {
Ae(t.doc, de(r, n), Pa), (r.bad || n.bad) && (t.curOp.selectionChanged = !0);
});
}
},
pollContent: function() {
var e = this.cm, t = e.display, r = e.doc.sel.primary(), n = r.from(), i = r.to();
if (n.line < t.viewFrom || i.line > t.viewTo - 1) return !1;
var o;
if (n.line == t.viewFrom || 0 == (o = zt(e, n.line))) var a = ti(t.view[0].line), s = t.view[0].node; else var a = ti(t.view[o].line), s = t.view[o - 1].node.nextSibling;
var l = zt(e, i.line);
if (l == t.view.length - 1) var c = t.viewTo - 1, u = t.lineDiv.lastChild; else var c = ti(t.view[l + 1].line) - 1, u = t.view[l + 1].node.previousSibling;
for (var h = e.doc.splitLines(ce(e, s, u, a, c)), f = Jn(e.doc, Ro(a, 0), Ro(c, Xn(e.doc, c).text.length)); h.length > 1 && f.length > 1; ) if (Ni(h) == Ni(f)) h.pop(), 
f.pop(), c--; else {
if (h[0] != f[0]) break;
h.shift(), f.shift(), a++;
}
for (var d = 0, p = 0, m = h[0], g = f[0], v = Math.min(m.length, g.length); v > d && m.charCodeAt(d) == g.charCodeAt(d); ) ++d;
for (var b = Ni(h), y = Ni(f), x = Math.min(b.length - (1 == h.length ? d : 0), y.length - (1 == f.length ? d : 0)); x > p && b.charCodeAt(b.length - p - 1) == y.charCodeAt(y.length - p - 1); ) ++p;
h[h.length - 1] = b.slice(0, b.length - p), h[0] = h[0].slice(d);
var k = Ro(a, d), w = Ro(c, f.length ? Ni(f).length - p : 0);
return h.length > 1 || h[0] || zo(k, w) ? (Dr(e.doc, h, k, w, "+input"), !0) : void 0;
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
this.cm.isReadOnly() ? Mt(this.cm, Ft)(this.cm) : e.data && e.data != e.startData && Mt(this.cm, X)(this.cm, e.data, 0, e.sel);
},
setUneditable: function(e) {
e.contentEditable = "false";
},
onKeyPress: function(e) {
e.preventDefault(), this.cm.isReadOnly() || Mt(this.cm, X)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0);
},
readOnlyChanged: function(e) {
this.div.contentEditable = ("nocursor" != e) + "";
},
onContextMenu: Fi,
resetPosition: Fi,
needsContentAttribute: !0
}, ie.prototype), e.inputStyles = {
textarea: re,
contenteditable: ie
}, ue.prototype = {
primary: function() {
return this.ranges[this.primIndex];
},
equals: function(e) {
if (e == this) return !0;
if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
for (var t = 0; t < this.ranges.length; t++) {
var r = this.ranges[t], n = e.ranges[t];
if (0 != zo(r.anchor, n.anchor) || 0 != zo(r.head, n.head)) return !1;
}
return !0;
},
deepCopy: function() {
for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new he($(this.ranges[t].anchor), $(this.ranges[t].head));
return new ue(e, this.primIndex);
},
somethingSelected: function() {
for (var e = 0; e < this.ranges.length; e++) if (!this.ranges[e].empty()) return !0;
return !1;
},
contains: function(e, t) {
t || (t = e);
for (var r = 0; r < this.ranges.length; r++) {
var n = this.ranges[r];
if (zo(t, n.from()) >= 0 && zo(e, n.to()) <= 0) return r;
}
return -1;
}
}, he.prototype = {
from: function() {
return Y(this.anchor, this.head);
},
to: function() {
return Z(this.anchor, this.head);
},
empty: function() {
return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
}
};
var Bo, Ho, Wo, jo = {
left: 0,
right: 0,
top: 0,
bottom: 0
}, Uo = null, Go = 0, Vo = 0, $o = 0, Zo = null;
yo ? Zo = -.53 : go ? Zo = 15 : Co ? Zo = -.7 : _o && (Zo = -1 / 3);
var Yo = function(e) {
var t = e.wheelDeltaX, r = e.wheelDeltaY;
return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == r && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : null == r && (r = e.wheelDelta), 
{
x: t,
y: r
};
};
e.wheelEventPixels = function(e) {
var t = Yo(e);
return t.x *= Zo, t.y *= Zo, t;
};
var Ko = new Mi(), Xo = null, Jo = e.changeEnd = function(e) {
return e.text ? Ro(e.from.line + e.text.length - 1, Ni(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to;
};
e.prototype = {
constructor: e,
focus: function() {
window.focus(), this.display.input.focus();
},
setOption: function(e, t) {
var r = this.options, n = r[e];
(r[e] != t || "mode" == e) && (r[e] = t, ea.hasOwnProperty(e) && Mt(this, ea[e])(this, t, n));
},
getOption: function(e) {
return this.options[e];
},
getDoc: function() {
return this.doc;
},
addKeyMap: function(e, t) {
this.state.keyMaps[t ? "push" : "unshift"](Vr(e));
},
removeKeyMap: function(e) {
for (var t = this.state.keyMaps, r = 0; r < t.length; ++r) if (t[r] == e || t[r].name == e) return t.splice(r, 1), 
!0;
},
addOverlay: Dt(function(t, r) {
var n = t.token ? t : e.getMode(this.options, t);
if (n.startState) throw Error("Overlays may not be stateful.");
this.state.overlays.push({
mode: n,
modeSpec: t,
opaque: r && r.opaque
}), this.state.modeGen++, Ft(this);
}),
removeOverlay: Dt(function(e) {
for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
var n = t[r].modeSpec;
if (n == e || "string" == typeof e && n.name == e) return t.splice(r, 1), this.state.modeGen++, 
void Ft(this);
}
}),
indentLine: Dt(function(e, t, r) {
"string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), 
ve(this.doc, e) && qr(this, e, t, r);
}),
indentSelection: Dt(function(e) {
for (var t = this.doc.sel.ranges, r = -1, n = 0; n < t.length; n++) {
var i = t[n];
if (i.empty()) i.head.line > r && (qr(this, i.head.line, e, !0), r = i.head.line, 
n == this.doc.sel.primIndex && Rr(this)); else {
var o = i.from(), a = i.to(), s = Math.max(r, o.line);
r = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
for (var l = s; r > l; ++l) qr(this, l, e);
var c = this.doc.sel.ranges;
0 == o.ch && t.length == c.length && c[n].from().ch > 0 && we(this.doc, n, new he(o, c[n].to()), Pa);
}
}
}),
getTokenAt: function(e, t) {
return Nn(this, e, t);
},
getLineTokens: function(e, t) {
return Nn(this, Ro(e), t, !0);
},
getTokenTypeAt: function(e) {
e = me(this.doc, e);
var t, r = Fn(this, Xn(this.doc, e.line)), n = 0, i = (r.length - 1) / 2, o = e.ch;
if (0 == o) t = r[2]; else for (;;) {
var a = n + i >> 1;
if ((a ? r[2 * a - 1] : 0) >= o) i = a; else {
if (!(r[2 * a + 1] < o)) {
t = r[2 * a + 2];
break;
}
n = a + 1;
}
}
var s = t ? t.indexOf("cm-overlay ") : -1;
return 0 > s ? t : 0 == s ? null : t.slice(0, s - 1);
},
getModeAt: function(t) {
var r = this.doc.mode;
return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r;
},
getHelper: function(e, t) {
return this.getHelpers(e, t)[0];
},
getHelpers: function(e, t) {
var r = [];
if (!aa.hasOwnProperty(t)) return r;
var n = aa[t], i = this.getModeAt(e);
if ("string" == typeof i[t]) n[i[t]] && r.push(n[i[t]]); else if (i[t]) for (var o = 0; o < i[t].length; o++) {
var a = n[i[t][o]];
a && r.push(a);
} else i.helperType && n[i.helperType] ? r.push(n[i.helperType]) : n[i.name] && r.push(n[i.name]);
for (var o = 0; o < n._global.length; o++) {
var s = n._global[o];
s.pred(i, this) && -1 == Oi(r, s.val) && r.push(s.val);
}
return r;
},
getStateAfter: function(e, t) {
var r = this.doc;
return e = pe(r, null == e ? r.first + r.size - 1 : e), We(this, e + 1, t);
},
cursorCoords: function(e, t) {
var r, n = this.doc.sel.primary();
return r = null == e ? n.head : "object" == typeof e ? me(this.doc, e) : e ? n.from() : n.to(), 
dt(this, r, t || "page");
},
charCoords: function(e, t) {
return ft(this, me(this.doc, e), t || "page");
},
coordsChar: function(e, t) {
return e = ht(this, e, t || "page"), gt(this, e.left, e.top);
},
lineAtHeight: function(e, t) {
return e = ht(this, {
top: e,
left: 0
}, t || "page").top, ri(this.doc, e + this.display.viewOffset);
},
heightAtLine: function(e, t) {
var r, n = !1;
if ("number" == typeof e) {
var i = this.doc.first + this.doc.size - 1;
e < this.doc.first ? e = this.doc.first : e > i && (e = i, n = !0), r = Xn(this.doc, e);
} else r = e;
return ut(this, r, {
top: 0,
left: 0
}, t || "page").top + (n ? this.doc.height - ni(r) : 0);
},
defaultTextHeight: function() {
return bt(this.display);
},
defaultCharWidth: function() {
return yt(this.display);
},
setGutterMarker: Dt(function(e, t, r) {
return Br(this.doc, e, "gutter", function(e) {
var n = e.gutterMarkers || (e.gutterMarkers = {});
return n[t] = r, !r && Bi(n) && (e.gutterMarkers = null), !0;
});
}),
clearGutter: Dt(function(e) {
var t = this, r = t.doc, n = r.first;
r.iter(function(r) {
r.gutterMarkers && r.gutterMarkers[e] && (r.gutterMarkers[e] = null, Pt(t, n, "gutter"), 
Bi(r.gutterMarkers) && (r.gutterMarkers = null)), ++n;
});
}),
lineInfo: function(e) {
if ("number" == typeof e) {
if (!ve(this.doc, e)) return null;
var t = e;
if (e = Xn(this.doc, e), !e) return null;
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
addWidget: function(e, t, r, n, i) {
var o = this.display;
e = dt(this, me(this.doc, e));
var a = e.bottom, s = e.left;
if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), 
o.sizer.appendChild(t), "over" == n) a = e.top; else if ("above" == n || "near" == n) {
var l = Math.max(o.wrapper.clientHeight, this.doc.height), c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
("above" == n || e.bottom + t.offsetHeight > l) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= l && (a = e.bottom), 
s + t.offsetWidth > c && (s = c - t.offsetWidth);
}
t.style.top = a + "px", t.style.left = t.style.right = "", "right" == i ? (s = o.sizer.clientWidth - t.offsetWidth, 
t.style.right = "0px") : ("left" == i ? s = 0 : "middle" == i && (s = (o.sizer.clientWidth - t.offsetWidth) / 2), 
t.style.left = s + "px"), r && Ir(this, s, a, s + t.offsetWidth, a + t.offsetHeight);
},
triggerOnKeyDown: Dt(hr),
triggerOnKeyPress: Dt(pr),
triggerOnKeyUp: dr,
execCommand: function(e) {
return ca.hasOwnProperty(e) ? ca[e].call(null, this) : void 0;
},
triggerElectric: Dt(function(e) {
Q(this, e);
}),
findPosH: function(e, t, r, n) {
var i = 1;
0 > t && (i = -1, t = -t);
for (var o = 0, a = me(this.doc, e); t > o && (a = Wr(this.doc, a, i, r, n), !a.hitSide); ++o) ;
return a;
},
moveH: Dt(function(e, t) {
var r = this;
r.extendSelectionsBy(function(n) {
return r.display.shift || r.doc.extend || n.empty() ? Wr(r.doc, n.head, e, t, r.options.rtlMoveVisually) : 0 > e ? n.from() : n.to();
}, za);
}),
deleteH: Dt(function(e, t) {
var r = this.doc.sel, n = this.doc;
r.somethingSelected() ? n.replaceSelection("", null, "+delete") : Hr(this, function(r) {
var i = Wr(n, r.head, e, t, !1);
return 0 > e ? {
from: i,
to: r.head
} : {
from: r.head,
to: i
};
});
}),
findPosV: function(e, t, r, n) {
var i = 1, o = n;
0 > t && (i = -1, t = -t);
for (var a = 0, s = me(this.doc, e); t > a; ++a) {
var l = dt(this, s, "div");
if (null == o ? o = l.left : l.left = o, s = jr(this, l, i, r), s.hitSide) break;
}
return s;
},
moveV: Dt(function(e, t) {
var r = this, n = this.doc, i = [], o = !r.display.shift && !n.extend && n.sel.somethingSelected();
if (n.extendSelectionsBy(function(a) {
if (o) return 0 > e ? a.from() : a.to();
var s = dt(r, a.head, "div");
null != a.goalColumn && (s.left = a.goalColumn), i.push(s.left);
var l = jr(r, s, e, t);
return "page" == t && a == n.sel.primary() && Pr(r, null, ft(r, l, "div").top - s.top), 
l;
}, za), i.length) for (var a = 0; a < n.sel.ranges.length; a++) n.sel.ranges[a].goalColumn = i[a];
}),
findWordAt: function(e) {
var t = this.doc, r = Xn(t, e.line).text, n = e.ch, i = e.ch;
if (r) {
var o = this.getHelper(e, "wordChars");
(e.xRel < 0 || i == r.length) && n ? --n : ++i;
for (var a = r.charAt(n), s = qi(a, o) ? function(e) {
return qi(e, o);
} : /\s/.test(a) ? function(e) {
return /\s/.test(e);
} : function(e) {
return !/\s/.test(e) && !qi(e);
}; n > 0 && s(r.charAt(n - 1)); ) --n;
for (;i < r.length && s(r.charAt(i)); ) ++i;
}
return new he(Ro(e.line, n), Ro(e.line, i));
},
toggleOverwrite: function(e) {
(null == e || e != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? Xa(this.display.cursorDiv, "CodeMirror-overwrite") : Ka(this.display.cursorDiv, "CodeMirror-overwrite"), 
Na(this, "overwriteToggle", this, this.state.overwrite));
},
hasFocus: function() {
return this.display.input.getField() == Gi();
},
isReadOnly: function() {
return !(!this.options.readOnly && !this.doc.cantEdit);
},
scrollTo: Dt(function(e, t) {
(null != e || null != t) && zr(this), null != e && (this.curOp.scrollLeft = e), 
null != t && (this.curOp.scrollTop = t);
}),
getScrollInfo: function() {
var e = this.display.scroller;
return {
left: e.scrollLeft,
top: e.scrollTop,
height: e.scrollHeight - Ve(this) - this.display.barHeight,
width: e.scrollWidth - Ve(this) - this.display.barWidth,
clientHeight: Ze(this),
clientWidth: $e(this)
};
},
scrollIntoView: Dt(function(e, t) {
if (null == e ? (e = {
from: this.doc.sel.primary().head,
to: null
}, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
from: Ro(e, 0),
to: null
} : null == e.from && (e = {
from: e,
to: null
}), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line) zr(this), this.curOp.scrollToPos = e; else {
var r = Fr(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
this.scrollTo(r.scrollLeft, r.scrollTop);
}
}),
setSize: Dt(function(e, t) {
function r(e) {
return "number" == typeof e || /^\d+$/.test(e + "") ? e + "px" : e;
}
var n = this;
null != e && (n.display.wrapper.style.width = r(e)), null != t && (n.display.wrapper.style.height = r(t)), 
n.options.lineWrapping && at(this);
var i = n.display.viewFrom;
n.doc.iter(i, n.display.viewTo, function(e) {
if (e.widgets) for (var t = 0; t < e.widgets.length; t++) if (e.widgets[t].noHScroll) {
Pt(n, i, "widget");
break;
}
++i;
}), n.curOp.forceUpdate = !0, Na(n, "refresh", this);
}),
operation: function(e) {
return Et(this, e);
},
refresh: Dt(function() {
var e = this.display.cachedTextHeight;
Ft(this), this.curOp.forceUpdate = !0, st(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), 
u(this), (null == e || Math.abs(e - bt(this.display)) > .5) && a(this), Na(this, "refresh", this);
}),
swapDoc: Dt(function(e) {
var t = this.doc;
return t.cm = null, Kn(this, e), st(this), this.display.input.reset(), this.scrollTo(e.scrollLeft, e.scrollTop), 
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
}, Ei(e);
var Qo = e.defaults = {}, ea = e.optionHandlers = {}, ta = e.Init = {
toString: function() {
return "CodeMirror.Init";
}
};
Ur("value", "", function(e, t) {
e.setValue(t);
}, !0), Ur("mode", null, function(e, t) {
e.doc.modeOption = t, r(e);
}, !0), Ur("indentUnit", 2, r, !0), Ur("indentWithTabs", !1), Ur("smartIndent", !0), 
Ur("tabSize", 4, function(e) {
n(e), st(e), Ft(e);
}, !0), Ur("lineSeparator", null, function(e, t) {
if (e.doc.lineSep = t, t) {
var r = [], n = e.doc.first;
e.doc.iter(function(e) {
for (var i = 0; ;) {
var o = e.text.indexOf(t, i);
if (-1 == o) break;
i = o + t.length, r.push(Ro(n, o));
}
n++;
});
for (var i = r.length - 1; i >= 0; i--) Dr(e.doc, t, r[i], Ro(r[i].line, r[i].ch + t.length));
}
}), Ur("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(t, r, n) {
t.state.specialChars = RegExp(r.source + (r.test("	") ? "" : "|	"), "g"), n != e.Init && t.refresh();
}), Ur("specialCharPlaceholder", qn, function(e) {
e.refresh();
}, !0), Ur("electricChars", !0), Ur("inputStyle", Eo ? "contenteditable" : "textarea", function() {
throw Error("inputStyle can not (yet) be changed in a running editor");
}, !0), Ur("rtlMoveVisually", !Do), Ur("wholeLineUpdateBefore", !0), Ur("theme", "default", function(e) {
s(e), l(e);
}, !0), Ur("keyMap", "default", function(t, r, n) {
var i = Vr(r), o = n != e.Init && Vr(n);
o && o.detach && o.detach(t, i), i.attach && i.attach(t, o || null);
}), Ur("extraKeys", null), Ur("lineWrapping", !1, i, !0), Ur("gutters", [], function(e) {
d(e.options), l(e);
}, !0), Ur("fixedGutter", !0, function(e, t) {
e.display.gutters.style.left = t ? S(e.display) + "px" : "0", e.refresh();
}, !0), Ur("coverGutterNextToScrollbar", !1, function(e) {
b(e);
}, !0), Ur("scrollbarStyle", "native", function(e) {
v(e), b(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
}, !0), Ur("lineNumbers", !1, function(e) {
d(e.options), l(e);
}, !0), Ur("firstLineNumber", 1, l, !0), Ur("lineNumberFormatter", function(e) {
return e;
}, l, !0), Ur("showCursorWhenSelecting", !1, Ie, !0), Ur("resetSelectionOnContextMenu", !0), 
Ur("lineWiseCopyCut", !0), Ur("readOnly", !1, function(e, t) {
"nocursor" == t ? (vr(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1, 
e.display.input.readOnlyChanged(t);
}), Ur("disableInput", !1, function(e, t) {
t || e.display.input.reset();
}, !0), Ur("dragDrop", !0, jt), Ur("allowDropFileTypes", null), Ur("cursorBlinkRate", 530), 
Ur("cursorScrollMargin", 0), Ur("cursorHeight", 1, Ie, !0), Ur("singleCursorHeightPerLine", !0, Ie, !0), 
Ur("workTime", 100), Ur("workDelay", 100), Ur("flattenSpans", !0, n, !0), Ur("addModeClass", !1, n, !0), 
Ur("pollInterval", 100), Ur("undoDepth", 200, function(e, t) {
e.doc.history.undoDepth = t;
}), Ur("historyEventDelay", 1250), Ur("viewportMargin", 10, function(e) {
e.refresh();
}, !0), Ur("maxHighlightLength", 1e4, n, !0), Ur("moveInputWithCursor", !0, function(e, t) {
t || e.display.input.resetPosition();
}), Ur("tabindex", null, function(e, t) {
e.display.input.getField().tabIndex = t || "";
}), Ur("autofocus", null);
var ra = e.modes = {}, na = e.mimeModes = {};
e.defineMode = function(t, r) {
e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2 && (r.dependencies = Array.prototype.slice.call(arguments, 2)), 
ra[t] = r;
}, e.defineMIME = function(e, t) {
na[e] = t;
}, e.resolveMode = function(t) {
if ("string" == typeof t && na.hasOwnProperty(t)) t = na[t]; else if (t && "string" == typeof t.name && na.hasOwnProperty(t.name)) {
var r = na[t.name];
"string" == typeof r && (r = {
name: r
}), t = Pi(r, t), t.name = r.name;
} else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
return "string" == typeof t ? {
name: t
} : t || {
name: "null"
};
}, e.getMode = function(t, r) {
var r = e.resolveMode(r), n = ra[r.name];
if (!n) return e.getMode(t, "text/plain");
var i = n(t, r);
if (ia.hasOwnProperty(r.name)) {
var o = ia[r.name];
for (var a in o) o.hasOwnProperty(a) && (i.hasOwnProperty(a) && (i["_" + a] = i[a]), 
i[a] = o[a]);
}
if (i.name = r.name, r.helperType && (i.helperType = r.helperType), r.modeProps) for (var a in r.modeProps) i[a] = r.modeProps[a];
return i;
}, e.defineMode("null", function() {
return {
token: function(e) {
e.skipToEnd();
}
};
}), e.defineMIME("text/plain", "null");
var ia = e.modeExtensions = {};
e.extendMode = function(e, t) {
var r = ia.hasOwnProperty(e) ? ia[e] : ia[e] = {};
Ri(t, r);
}, e.defineExtension = function(t, r) {
e.prototype[t] = r;
}, e.defineDocExtension = function(e, t) {
Ca.prototype[e] = t;
}, e.defineOption = Ur;
var oa = [];
e.defineInitHook = function(e) {
oa.push(e);
};
var aa = e.helpers = {};
e.registerHelper = function(t, r, n) {
aa.hasOwnProperty(t) || (aa[t] = e[t] = {
_global: []
}), aa[t][r] = n;
}, e.registerGlobalHelper = function(t, r, n, i) {
e.registerHelper(t, r, i), aa[t]._global.push({
pred: n,
val: i
});
};
var sa = e.copyState = function(e, t) {
if (t === !0) return t;
if (e.copyState) return e.copyState(t);
var r = {};
for (var n in t) {
var i = t[n];
i instanceof Array && (i = i.concat([])), r[n] = i;
}
return r;
}, la = e.startState = function(e, t, r) {
return e.startState ? e.startState(t, r) : !0;
};
e.innerMode = function(e, t) {
for (;e.innerMode; ) {
var r = e.innerMode(t);
if (!r || r.mode == e) break;
t = r.state, e = r.mode;
}
return r || {
mode: e,
state: t
};
};
var ca = e.commands = {
selectAll: function(e) {
e.setSelection(Ro(e.firstLine(), 0), Ro(e.lastLine()), Pa);
},
singleSelection: function(e) {
e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Pa);
},
killLine: function(e) {
Hr(e, function(t) {
if (t.empty()) {
var r = Xn(e.doc, t.head.line).text.length;
return t.head.ch == r && t.head.line < e.lastLine() ? {
from: t.head,
to: Ro(t.head.line + 1, 0)
} : {
from: t.head,
to: Ro(t.head.line, r)
};
}
return {
from: t.from(),
to: t.to()
};
});
},
deleteLine: function(e) {
Hr(e, function(t) {
return {
from: Ro(t.from().line, 0),
to: me(e.doc, Ro(t.to().line + 1, 0))
};
});
},
delLineLeft: function(e) {
Hr(e, function(e) {
return {
from: Ro(e.from().line, 0),
to: e.from()
};
});
},
delWrappedLineLeft: function(e) {
Hr(e, function(t) {
var r = e.charCoords(t.head, "div").top + 5, n = e.coordsChar({
left: 0,
top: r
}, "div");
return {
from: n,
to: t.from()
};
});
},
delWrappedLineRight: function(e) {
Hr(e, function(t) {
var r = e.charCoords(t.head, "div").top + 5, n = e.coordsChar({
left: e.display.lineDiv.offsetWidth + 100,
top: r
}, "div");
return {
from: t.from(),
to: n
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
e.extendSelection(Ro(e.firstLine(), 0));
},
goDocEnd: function(e) {
e.extendSelection(Ro(e.lastLine()));
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
return so(e, t.head);
}, {
origin: "+move",
bias: 1
});
},
goLineEnd: function(e) {
e.extendSelectionsBy(function(t) {
return ao(e, t.head.line);
}, {
origin: "+move",
bias: -1
});
},
goLineRight: function(e) {
e.extendSelectionsBy(function(t) {
var r = e.charCoords(t.head, "div").top + 5;
return e.coordsChar({
left: e.display.lineDiv.offsetWidth + 100,
top: r
}, "div");
}, za);
},
goLineLeft: function(e) {
e.extendSelectionsBy(function(t) {
var r = e.charCoords(t.head, "div").top + 5;
return e.coordsChar({
left: 0,
top: r
}, "div");
}, za);
},
goLineLeftSmart: function(e) {
e.extendSelectionsBy(function(t) {
var r = e.charCoords(t.head, "div").top + 5, n = e.coordsChar({
left: 0,
top: r
}, "div");
return n.ch < e.getLine(n.line).search(/\S/) ? so(e, t.head) : n;
}, za);
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
for (var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0; i < r.length; i++) {
var o = r[i].from(), a = qa(e.getLine(o.line), o.ch, n);
t.push(Array(n - a % n + 1).join(" "));
}
e.replaceSelections(t);
},
defaultTab: function(e) {
e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
},
transposeChars: function(e) {
Et(e, function() {
for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++) {
var i = t[n].head, o = Xn(e.doc, i.line).text;
if (o) if (i.ch == o.length && (i = new Ro(i.line, i.ch - 1)), i.ch > 0) i = new Ro(i.line, i.ch + 1), 
e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), Ro(i.line, i.ch - 2), i, "+transpose"); else if (i.line > e.doc.first) {
var a = Xn(e.doc, i.line - 1).text;
a && e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), Ro(i.line - 1, a.length - 1), Ro(i.line, 1), "+transpose");
}
r.push(new he(i, i));
}
e.setSelections(r);
});
},
newlineAndIndent: function(e) {
Et(e, function() {
for (var t = e.listSelections().length, r = 0; t > r; r++) {
var n = e.listSelections()[r];
e.replaceRange(e.doc.lineSeparator(), n.anchor, n.head, "+input"), e.indentLine(n.from().line + 1, null, !0);
}
Rr(e);
});
},
toggleOverwrite: function(e) {
e.toggleOverwrite();
}
}, ua = e.keyMap = {};
ua.basic = {
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
}, ua.pcDefault = {
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
}, ua.emacsy = {
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
}, ua.macDefault = {
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
}, ua.default = Mo ? ua.macDefault : ua.pcDefault, e.normalizeKeyMap = function(e) {
var t = {};
for (var r in e) if (e.hasOwnProperty(r)) {
var n = e[r];
if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;
if ("..." == n) {
delete e[r];
continue;
}
for (var i = Ii(r.split(" "), Gr), o = 0; o < i.length; o++) {
var a, s;
o == i.length - 1 ? (s = i.join(" "), a = n) : (s = i.slice(0, o + 1).join(" "), 
a = "...");
var l = t[s];
if (l) {
if (l != a) throw Error("Inconsistent bindings for " + s);
} else t[s] = a;
}
delete e[r];
}
for (var c in t) e[c] = t[c];
return e;
};
var ha = e.lookupKey = function(e, t, r, n) {
t = Vr(t);
var i = t.call ? t.call(e, n) : t[e];
if (i === !1) return "nothing";
if ("..." === i) return "multi";
if (null != i && r(i)) return "handled";
if (t.fallthrough) {
if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return ha(e, t.fallthrough, r, n);
for (var o = 0; o < t.fallthrough.length; o++) {
var a = ha(e, t.fallthrough[o], r, n);
if (a) return a;
}
}
}, fa = e.isModifierKey = function(e) {
var t = "string" == typeof e ? e : is[e.keyCode];
return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
}, da = e.keyName = function(e, t) {
if (So && 34 == e.keyCode && e.char) return !1;
var r = is[e.keyCode], n = r;
return null == n || e.altGraphKey ? !1 : (e.altKey && "Alt" != r && (n = "Alt-" + n), 
(Oo ? e.metaKey : e.ctrlKey) && "Ctrl" != r && (n = "Ctrl-" + n), (Oo ? e.ctrlKey : e.metaKey) && "Cmd" != r && (n = "Cmd-" + n), 
!t && e.shiftKey && "Shift" != r && (n = "Shift-" + n), n);
};
e.fromTextArea = function(t, r) {
function n() {
t.value = c.getValue();
}
if (r = r ? Ri(r) : {}, r.value = t.value, !r.tabindex && t.tabIndex && (r.tabindex = t.tabIndex), 
!r.placeholder && t.placeholder && (r.placeholder = t.placeholder), null == r.autofocus) {
var i = Gi();
r.autofocus = i == t || null != t.getAttribute("autofocus") && i == document.body;
}
if (t.form && (Ea(t.form, "submit", n), !r.leaveSubmitMethodAlone)) {
var o = t.form, a = o.submit;
try {
var s = o.submit = function() {
n(), o.submit = a, o.submit(), o.submit = s;
};
} catch (l) {}
}
r.finishInit = function(e) {
e.save = n, e.getTextArea = function() {
return t;
}, e.toTextArea = function() {
e.toTextArea = isNaN, n(), t.parentNode.removeChild(e.getWrapperElement()), t.style.display = "", 
t.form && (Da(t.form, "submit", n), "function" == typeof t.form.submit && (t.form.submit = a));
};
}, t.style.display = "none";
var c = e(function(e) {
t.parentNode.insertBefore(e, t.nextSibling);
}, r);
return c;
};
var pa = e.StringStream = function(e, t) {
this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, 
this.lineStart = 0;
};
pa.prototype = {
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
if ("string" == typeof e) var r = t == e; else var r = t && (e.test ? e.test(t) : e(t));
return r ? (++this.pos, t) : void 0;
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
return this.lastColumnPos < this.start && (this.lastColumnValue = qa(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), 
this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? qa(this.string, this.lineStart, this.tabSize) : 0);
},
indentation: function() {
return qa(this.string, null, this.tabSize) - (this.lineStart ? qa(this.string, this.lineStart, this.tabSize) : 0);
},
match: function(e, t, r) {
if ("string" != typeof e) {
var n = this.string.slice(this.pos).match(e);
return n && n.index > 0 ? null : (n && t !== !1 && (this.pos += n[0].length), n);
}
var i = function(e) {
return r ? e.toLowerCase() : e;
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
var ma = 0, ga = e.TextMarker = function(e, t) {
this.lines = [], this.type = t, this.doc = e, this.id = ++ma;
};
Ei(ga), ga.prototype.clear = function() {
if (!this.explicitlyCleared) {
var e = this.doc.cm, t = e && !e.curOp;
if (t && xt(e), Ti(this, "clear")) {
var r = this.find();
r && Si(this, "clear", r.from, r.to);
}
for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
var a = this.lines[o], s = Qr(a.markedSpans, this);
e && !this.collapsed ? Pt(e, ti(a), "text") : e && (null != s.to && (i = ti(a)), 
null != s.from && (n = ti(a))), a.markedSpans = en(a.markedSpans, s), null == s.from && this.collapsed && !wn(this.doc, a) && e && ei(a, bt(e.display));
}
if (e && this.collapsed && !e.options.lineWrapping) for (var o = 0; o < this.lines.length; ++o) {
var l = bn(this.lines[o]), c = h(l);
c > e.display.maxLineLength && (e.display.maxLine = l, e.display.maxLineLength = c, 
e.display.maxLineChanged = !0);
}
null != n && e && this.collapsed && Ft(e, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, 
this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Ee(e.doc)), e && Si(e, "markerCleared", e, this), 
t && wt(e), this.parent && this.parent.clear();
}
}, ga.prototype.find = function(e, t) {
null == e && "bookmark" == this.type && (e = 1);
for (var r, n, i = 0; i < this.lines.length; ++i) {
var o = this.lines[i], a = Qr(o.markedSpans, this);
if (null != a.from && (r = Ro(t ? o : ti(o), a.from), -1 == e)) return r;
if (null != a.to && (n = Ro(t ? o : ti(o), a.to), 1 == e)) return n;
}
return r && {
from: r,
to: n
};
}, ga.prototype.changed = function() {
var e = this.find(-1, !0), t = this, r = this.doc.cm;
e && r && Et(r, function() {
var n = e.line, i = ti(e.line), o = Qe(r, i);
if (o && (ot(o), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, 
!wn(t.doc, n) && null != t.height) {
var a = t.height;
t.height = null;
var s = _n(t) - a;
s && ei(n, n.height + s);
}
});
}, ga.prototype.attachLine = function(e) {
if (!this.lines.length && this.doc.cm) {
var t = this.doc.cm.curOp;
t.maybeHiddenMarkers && -1 != Oi(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
}
this.lines.push(e);
}, ga.prototype.detachLine = function(e) {
if (this.lines.splice(Oi(this.lines, e), 1), !this.lines.length && this.doc.cm) {
var t = this.doc.cm.curOp;
(t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
}
};
var ma = 0, va = e.SharedTextMarker = function(e, t) {
this.markers = e, this.primary = t;
for (var r = 0; r < e.length; ++r) e[r].parent = this;
};
Ei(va), va.prototype.clear = function() {
if (!this.explicitlyCleared) {
this.explicitlyCleared = !0;
for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
Si(this, "clear");
}
}, va.prototype.find = function(e, t) {
return this.primary.find(e, t);
};
var ba = e.LineWidget = function(e, t, r) {
if (r) for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
this.doc = e, this.node = t;
};
Ei(ba), ba.prototype.clear = function() {
var e = this.doc.cm, t = this.line.widgets, r = this.line, n = ti(r);
if (null != n && t) {
for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
t.length || (r.widgets = null);
var o = _n(this);
ei(r, Math.max(0, r.height - o)), e && Et(e, function() {
Sn(e, r, -o), Pt(e, n, "widget");
});
}
}, ba.prototype.changed = function() {
var e = this.height, t = this.doc.cm, r = this.line;
this.height = null;
var n = _n(this) - e;
n && (ei(r, r.height + n), t && Et(t, function() {
t.curOp.forceUpdate = !0, Sn(t, r, n);
}));
};
var ya = e.Line = function(e, t, r) {
this.text = e, un(this, t), this.height = r ? r(this) : 1;
};
Ei(ya), ya.prototype.lineNo = function() {
return ti(this);
};
var xa = {}, ka = {};
$n.prototype = {
chunkSize: function() {
return this.lines.length;
},
removeInner: function(e, t) {
for (var r = e, n = e + t; n > r; ++r) {
var i = this.lines[r];
this.height -= i.height, Tn(i), Si(i, "delete");
}
this.lines.splice(e, t);
},
collapse: function(e) {
e.push.apply(e, this.lines);
},
insertInner: function(e, t, r) {
this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
for (var n = 0; n < t.length; ++n) t[n].parent = this;
},
iterN: function(e, t, r) {
for (var n = e + t; n > e; ++e) if (r(this.lines[e])) return !0;
}
}, Zn.prototype = {
chunkSize: function() {
return this.size;
},
removeInner: function(e, t) {
this.size -= t;
for (var r = 0; r < this.children.length; ++r) {
var n = this.children[r], i = n.chunkSize();
if (i > e) {
var o = Math.min(t, i - e), a = n.height;
if (n.removeInner(e, o), this.height -= a - n.height, i == o && (this.children.splice(r--, 1), 
n.parent = null), 0 == (t -= o)) break;
e = 0;
} else e -= i;
}
if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof $n))) {
var s = [];
this.collapse(s), this.children = [ new $n(s) ], this.children[0].parent = this;
}
},
collapse: function(e) {
for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e);
},
insertInner: function(e, t, r) {
this.size += t.length, this.height += r;
for (var n = 0; n < this.children.length; ++n) {
var i = this.children[n], o = i.chunkSize();
if (o >= e) {
if (i.insertInner(e, t, r), i.lines && i.lines.length > 50) {
for (;i.lines.length > 50; ) {
var a = i.lines.splice(i.lines.length - 25, 25), s = new $n(a);
i.height -= s.height, this.children.splice(n + 1, 0, s), s.parent = this;
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
var t = e.children.splice(e.children.length - 5, 5), r = new Zn(t);
if (e.parent) {
e.size -= r.size, e.height -= r.height;
var n = Oi(e.parent.children, e);
e.parent.children.splice(n + 1, 0, r);
} else {
var i = new Zn(e.children);
i.parent = e, e.children = [ i, r ], e = i;
}
r.parent = e.parent;
} while (e.children.length > 10);
e.parent.maybeSpill();
}
},
iterN: function(e, t, r) {
for (var n = 0; n < this.children.length; ++n) {
var i = this.children[n], o = i.chunkSize();
if (o > e) {
var a = Math.min(t, o - e);
if (i.iterN(e, a, r)) return !0;
if (0 == (t -= a)) break;
e = 0;
} else e -= o;
}
}
};
var wa = 0, Ca = e.Doc = function(e, t, r, n) {
if (!(this instanceof Ca)) return new Ca(e, t, r, n);
null == r && (r = 0), Zn.call(this, [ new $n([ new ya("", null) ]) ]), this.first = r, 
this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, 
this.frontier = r;
var i = Ro(r, 0);
this.sel = de(i), this.history = new oi(null), this.id = ++wa, this.modeOption = t, 
this.lineSep = n, this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), 
Vn(this, {
from: i,
to: i,
text: e
}), Ae(this, de(i), Pa);
};
Ca.prototype = Pi(Zn.prototype, {
constructor: Ca,
iter: function(e, t, r) {
r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e);
},
insert: function(e, t) {
for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
this.insertInner(e - this.first, t, r);
},
remove: function(e, t) {
this.removeInner(e - this.first, t);
},
getValue: function(e) {
var t = Qn(this, this.first, this.first + this.size);
return e === !1 ? t : t.join(e || this.lineSeparator());
},
setValue: Nt(function(e) {
var t = Ro(this.first, 0), r = this.first + this.size - 1;
_r(this, {
from: t,
to: Ro(r, Xn(this, r).text.length),
text: this.splitLines(e),
origin: "setValue",
full: !0
}, !0), Ae(this, de(t));
}),
replaceRange: function(e, t, r, n) {
t = me(this, t), r = r ? me(this, r) : t, Dr(this, e, t, r, n);
},
getRange: function(e, t, r) {
var n = Jn(this, me(this, e), me(this, t));
return r === !1 ? n : n.join(r || this.lineSeparator());
},
getLine: function(e) {
var t = this.getLineHandle(e);
return t && t.text;
},
getLineHandle: function(e) {
return ve(this, e) ? Xn(this, e) : void 0;
},
getLineNumber: function(e) {
return ti(e);
},
getLineHandleVisualStart: function(e) {
return "number" == typeof e && (e = Xn(this, e)), bn(e);
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
var t, r = this.sel.primary();
return t = null == e || "head" == e ? r.head : "anchor" == e ? r.anchor : "end" == e || "to" == e || e === !1 ? r.to() : r.from();
},
listSelections: function() {
return this.sel.ranges;
},
somethingSelected: function() {
return this.sel.somethingSelected();
},
setCursor: Nt(function(e, t, r) {
Ce(this, me(this, "number" == typeof e ? Ro(e, t || 0) : e), null, r);
}),
setSelection: Nt(function(e, t, r) {
Ce(this, me(this, e), me(this, t || e), r);
}),
extendSelection: Nt(function(e, t, r) {
xe(this, me(this, e), t && me(this, t), r);
}),
extendSelections: Nt(function(e, t) {
ke(this, be(this, e), t);
}),
extendSelectionsBy: Nt(function(e, t) {
var r = Ii(this.sel.ranges, e);
ke(this, be(this, r), t);
}),
setSelections: Nt(function(e, t, r) {
if (e.length) {
for (var n = 0, i = []; n < e.length; n++) i[n] = new he(me(this, e[n].anchor), me(this, e[n].head));
null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Ae(this, fe(i, t), r);
}
}),
addSelection: Nt(function(e, t, r) {
var n = this.sel.ranges.slice(0);
n.push(new he(me(this, e), me(this, t || e))), Ae(this, fe(n, n.length - 1), r);
}),
getSelection: function(e) {
for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
var i = Jn(this, r[n].from(), r[n].to());
t = t ? t.concat(i) : i;
}
return e === !1 ? t : t.join(e || this.lineSeparator());
},
getSelections: function(e) {
for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
var i = Jn(this, r[n].from(), r[n].to());
e !== !1 && (i = i.join(e || this.lineSeparator())), t[n] = i;
}
return t;
},
replaceSelection: function(e, t, r) {
for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
this.replaceSelections(n, t, r || "+input");
},
replaceSelections: Nt(function(e, t, r) {
for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
var a = i.ranges[o];
n[o] = {
from: a.from(),
to: a.to(),
text: this.splitLines(e[o]),
origin: r
};
}
for (var s = t && "end" != t && Cr(this, n, t), o = n.length - 1; o >= 0; o--) _r(this, n[o]);
s ? _e(this, s) : this.cm && Rr(this.cm);
}),
undo: Nt(function() {
Lr(this, "undo");
}),
redo: Nt(function() {
Lr(this, "redo");
}),
undoSelection: Nt(function() {
Lr(this, "undo", !0);
}),
redoSelection: Nt(function() {
Lr(this, "redo", !0);
}),
setExtending: function(e) {
this.extend = e;
},
getExtending: function() {
return this.extend;
},
historySize: function() {
for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++) e.done[n].ranges || ++t;
for (var n = 0; n < e.undone.length; n++) e.undone[n].ranges || ++r;
return {
undo: t,
redo: r
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
addLineClass: Nt(function(e, t, r) {
return Br(this, e, "gutter" == t ? "gutter" : "class", function(e) {
var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
if (e[n]) {
if (Vi(r).test(e[n])) return !1;
e[n] += " " + r;
} else e[n] = r;
return !0;
});
}),
removeLineClass: Nt(function(e, t, r) {
return Br(this, e, "gutter" == t ? "gutter" : "class", function(e) {
var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass", i = e[n];
if (!i) return !1;
if (null == r) e[n] = null; else {
var o = i.match(Vi(r));
if (!o) return !1;
var a = o.index + o[0].length;
e[n] = i.slice(0, o.index) + (o.index && a != i.length ? " " : "") + i.slice(a) || null;
}
return !0;
});
}),
addLineWidget: Nt(function(e, t, r) {
return An(this, e, t, r);
}),
removeLineWidget: function(e) {
e.clear();
},
markText: function(e, t, r) {
return $r(this, me(this, e), me(this, t), r, r && r.type || "range");
},
setBookmark: function(e, t) {
var r = {
replacedWith: t && (null == t.nodeType ? t.widget : t),
insertLeft: t && t.insertLeft,
clearWhenEmpty: !1,
shared: t && t.shared,
handleMouseEvents: t && t.handleMouseEvents
};
return e = me(this, e), $r(this, e, e, r, "bookmark");
},
findMarksAt: function(e) {
e = me(this, e);
var t = [], r = Xn(this, e.line).markedSpans;
if (r) for (var n = 0; n < r.length; ++n) {
var i = r[n];
(null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
}
return t;
},
findMarks: function(e, t, r) {
e = me(this, e), t = me(this, t);
var n = [], i = e.line;
return this.iter(e.line, t.line + 1, function(o) {
var a = o.markedSpans;
if (a) for (var s = 0; s < a.length; s++) {
var l = a[s];
i == e.line && e.ch > l.to || null == l.from && i != e.line || i == t.line && l.from > t.ch || r && !r(l.marker) || n.push(l.marker.parent || l.marker);
}
++i;
}), n;
},
getAllMarks: function() {
var e = [];
return this.iter(function(t) {
var r = t.markedSpans;
if (r) for (var n = 0; n < r.length; ++n) null != r[n].from && e.push(r[n].marker);
}), e;
},
posFromIndex: function(e) {
var t, r = this.first;
return this.iter(function(n) {
var i = n.text.length + 1;
return i > e ? (t = e, !0) : (e -= i, void ++r);
}), me(this, Ro(r, t));
},
indexFromPos: function(e) {
e = me(this, e);
var t = e.ch;
return e.line < this.first || e.ch < 0 ? 0 : (this.iter(this.first, e.line, function(e) {
t += e.text.length + 1;
}), t);
},
copy: function(e) {
var t = new Ca(Qn(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);
return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, 
t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), 
t;
},
linkedDoc: function(e) {
e || (e = {});
var t = this.first, r = this.first + this.size;
null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);
var n = new Ca(Qn(this, t, r), e.mode || this.modeOption, t, this.lineSep);
return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({
doc: n,
sharedHist: e.sharedHist
}), n.linked = [ {
doc: this,
isParent: !0,
sharedHist: e.sharedHist
} ], Kr(n, Yr(this)), n;
},
unlinkDoc: function(t) {
if (t instanceof e && (t = t.doc), this.linked) for (var r = 0; r < this.linked.length; ++r) {
var n = this.linked[r];
if (n.doc == t) {
this.linked.splice(r, 1), t.unlinkDoc(this), Xr(Yr(this));
break;
}
}
if (t.history == this.history) {
var i = [ t.id ];
Yn(t, function(e) {
i.push(e.id);
}, !0), t.history = new oi(null), t.history.done = gi(this.history.done, i), t.history.undone = gi(this.history.undone, i);
}
},
iterLinkedDocs: function(e) {
Yn(this, e);
},
getMode: function() {
return this.mode;
},
getEditor: function() {
return this.cm;
},
splitLines: function(e) {
return this.lineSep ? e.split(this.lineSep) : es(e);
},
lineSeparator: function() {
return this.lineSep || "\n";
}
}), Ca.prototype.eachLine = Ca.prototype.iter;
var Sa = "iter insert remove copy getEditor constructor".split(" ");
for (var _a in Ca.prototype) Ca.prototype.hasOwnProperty(_a) && Oi(Sa, _a) < 0 && (e.prototype[_a] = function(e) {
return function() {
return e.apply(this.doc, arguments);
};
}(Ca.prototype[_a]));
Ei(Ca);
var Aa = e.e_preventDefault = function(e) {
e.preventDefault ? e.preventDefault() : e.returnValue = !1;
}, La = e.e_stopPropagation = function(e) {
e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
}, Ta = e.e_stop = function(e) {
Aa(e), La(e);
}, Ea = e.on = function(e, t, r) {
if (e.addEventListener) e.addEventListener(t, r, !1); else if (e.attachEvent) e.attachEvent("on" + t, r); else {
var n = e._handlers || (e._handlers = {}), i = n[t] || (n[t] = []);
i.push(r);
}
}, Ma = [], Da = e.off = function(e, t, r) {
if (e.removeEventListener) e.removeEventListener(t, r, !1); else if (e.detachEvent) e.detachEvent("on" + t, r); else for (var n = Ci(e, t, !1), i = 0; i < n.length; ++i) if (n[i] == r) {
n.splice(i, 1);
break;
}
}, Na = e.signal = function(e, t) {
var r = Ci(e, t, !0);
if (r.length) for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) r[i].apply(null, n);
}, Oa = null, Ia = 30, Fa = e.Pass = {
toString: function() {
return "CodeMirror.Pass";
}
}, Pa = {
scroll: !1
}, Ra = {
origin: "*mouse"
}, za = {
origin: "+move"
};
Mi.prototype.set = function(e, t) {
clearTimeout(this.id), this.id = setTimeout(t, e);
};
var qa = e.countColumn = function(e, t, r, n, i) {
null == t && (t = e.search(/[^\s\u00a0]/), -1 == t && (t = e.length));
for (var o = n || 0, a = i || 0; ;) {
var s = e.indexOf("	", o);
if (0 > s || s >= t) return a + (t - o);
a += s - o, a += r - a % r, o = s + 1;
}
}, Ba = e.findColumn = function(e, t, r) {
for (var n = 0, i = 0; ;) {
var o = e.indexOf("	", n);
-1 == o && (o = e.length);
var a = o - n;
if (o == e.length || i + a >= t) return n + Math.min(a, t - i);
if (i += o - n, i += r - i % r, n = o + 1, i >= t) return n;
}
}, Ha = [ "" ], Wa = function(e) {
e.select();
};
To ? Wa = function(e) {
e.selectionStart = 0, e.selectionEnd = e.value.length;
} : yo && (Wa = function(e) {
try {
e.select();
} catch (t) {}
});
var ja, Ua = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, Ga = e.isWordChar = function(e) {
return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Ua.test(e));
}, Va = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
ja = document.createRange ? function(e, t, r, n) {
var i = document.createRange();
return i.setEnd(n || e, r), i.setStart(e, t), i;
} : function(e, t, r) {
var n = document.body.createTextRange();
try {
n.moveToElementText(e.parentNode);
} catch (i) {
return n;
}
return n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n;
};
var $a = e.contains = function(e, t) {
if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
do if (11 == t.nodeType && (t = t.host), t == e) return !0; while (t = t.parentNode);
};
yo && 11 > xo && (Gi = function() {
try {
return document.activeElement;
} catch (e) {
return document.body;
}
});
var Za, Ya, Ka = e.rmClass = function(e, t) {
var r = e.className, n = Vi(t).exec(r);
if (n) {
var i = r.slice(n.index + n[0].length);
e.className = r.slice(0, n.index) + (i ? n[1] + i : "");
}
}, Xa = e.addClass = function(e, t) {
var r = e.className;
Vi(t).test(r) || (e.className += (r ? " " : "") + t);
}, Ja = !1, Qa = function() {
if (yo && 9 > xo) return !1;
var e = Wi("div");
return "draggable" in e || "dragDrop" in e;
}(), es = e.splitLines = 3 != "\n\nb".split(/\n/).length ? function(e) {
for (var t = 0, r = [], n = e.length; n >= t; ) {
var i = e.indexOf("\n", t);
-1 == i && (i = e.length);
var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i), a = o.indexOf("\r");
-1 != a ? (r.push(o.slice(0, a)), t += a + 1) : (r.push(o), t = i + 1);
}
return r;
} : function(e) {
return e.split(/\r\n?|\n/);
}, ts = window.getSelection ? function(e) {
try {
return e.selectionStart != e.selectionEnd;
} catch (t) {
return !1;
}
} : function(e) {
try {
var t = e.ownerDocument.selection.createRange();
} catch (r) {}
return t && t.parentElement() == e ? 0 != t.compareEndPoints("StartToEnd", t) : !1;
}, rs = function() {
var e = Wi("div");
return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy);
}(), ns = null, is = e.keyNames = {
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
for (var e = 0; 10 > e; e++) is[e + 48] = is[e + 96] = e + "";
for (var e = 65; 90 >= e; e++) is[e] = String.fromCharCode(e);
for (var e = 1; 12 >= e; e++) is[e + 111] = is[e + 63235] = "F" + e;
}();
var os, as = function() {
function e(e) {
return 247 >= e ? r.charAt(e) : e >= 1424 && 1524 >= e ? "R" : e >= 1536 && 1773 >= e ? n.charAt(e - 1536) : e >= 1774 && 2220 >= e ? "r" : e >= 8192 && 8203 >= e ? "w" : 8204 == e ? "b" : "L";
}
function t(e, t, r) {
this.level = e, this.from = t, this.to = r;
}
var r = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", n = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm", i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, o = /[stwN]/, a = /[LRr]/, s = /[Lb1n]/, l = /[1n]/, c = "L";
return function(r) {
if (!i.test(r)) return !1;
for (var n, u = r.length, h = [], f = 0; u > f; ++f) h.push(n = e(r.charCodeAt(f)));
for (var f = 0, d = c; u > f; ++f) {
var n = h[f];
"m" == n ? h[f] = d : d = n;
}
for (var f = 0, p = c; u > f; ++f) {
var n = h[f];
"1" == n && "r" == p ? h[f] = "n" : a.test(n) && (p = n, "r" == n && (h[f] = "R"));
}
for (var f = 1, d = h[0]; u - 1 > f; ++f) {
var n = h[f];
"+" == n && "1" == d && "1" == h[f + 1] ? h[f] = "1" : "," != n || d != h[f + 1] || "1" != d && "n" != d || (h[f] = d), 
d = n;
}
for (var f = 0; u > f; ++f) {
var n = h[f];
if ("," == n) h[f] = "N"; else if ("%" == n) {
for (var m = f + 1; u > m && "%" == h[m]; ++m) ;
for (var g = f && "!" == h[f - 1] || u > m && "1" == h[m] ? "1" : "N", v = f; m > v; ++v) h[v] = g;
f = m - 1;
}
}
for (var f = 0, p = c; u > f; ++f) {
var n = h[f];
"L" == p && "1" == n ? h[f] = "L" : a.test(n) && (p = n);
}
for (var f = 0; u > f; ++f) if (o.test(h[f])) {
for (var m = f + 1; u > m && o.test(h[m]); ++m) ;
for (var b = "L" == (f ? h[f - 1] : c), y = "L" == (u > m ? h[m] : c), g = b || y ? "L" : "R", v = f; m > v; ++v) h[v] = g;
f = m - 1;
}
for (var x, k = [], f = 0; u > f; ) if (s.test(h[f])) {
var w = f;
for (++f; u > f && s.test(h[f]); ++f) ;
k.push(new t(0, w, f));
} else {
var C = f, S = k.length;
for (++f; u > f && "L" != h[f]; ++f) ;
for (var v = C; f > v; ) if (l.test(h[v])) {
v > C && k.splice(S, 0, new t(1, C, v));
var _ = v;
for (++v; f > v && l.test(h[v]); ++v) ;
k.splice(S, 0, new t(2, _, v)), C = v;
} else ++v;
f > C && k.splice(S, 0, new t(1, C, f));
}
return 1 == k[0].level && (x = r.match(/^\s+/)) && (k[0].from = x[0].length, k.unshift(new t(0, 0, x[0].length))), 
1 == Ni(k).level && (x = r.match(/\s+$/)) && (Ni(k).to -= x[0].length, k.push(new t(0, u - x[0].length, u))), 
2 == k[0].level && k.unshift(new t(1, k[0].to, k[0].to)), k[0].level != Ni(k).level && k.push(new t(k[0].level, u, u)), 
k;
};
}();
return e.version = "5.11.0", e;
});
}, function(e, t, r) {
!function(e) {
e(r(360), r(362), r(365));
}(function(e) {
"use strict";
var t = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;
e.defineMode("gfm", function(r, n) {
function i(e) {
return e.code = !1, null;
}
var o = 0, a = {
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
token: function(e, r) {
if (r.combineTokens = null, r.codeBlock) return e.match(/^```+/) ? (r.codeBlock = !1, 
null) : (e.skipToEnd(), null);
if (e.sol() && (r.code = !1), e.sol() && e.match(/^```+/)) return e.skipToEnd(), 
r.codeBlock = !0, null;
if ("`" === e.peek()) {
e.next();
var i = e.pos;
e.eatWhile("`");
var a = 1 + e.pos - i;
return r.code ? a === o && (r.code = !1) : (o = a, r.code = !0), null;
}
if (r.code) return e.next(), null;
if (e.eatSpace()) return r.ateSpace = !0, null;
if ((e.sol() || r.ateSpace) && (r.ateSpace = !1, n.gitHubSpice !== !1)) {
if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)) return r.combineTokens = !0, 
"link";
if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return r.combineTokens = !0, 
"link";
}
return e.match(t) && "](" != e.string.slice(e.start - 2, e.start) && (0 == e.start || /\W/.test(e.string.charAt(e.start - 1))) ? (r.combineTokens = !0, 
"link") : (e.next(), null);
},
blankLine: i
}, s = {
underscoresBreakWords: !1,
taskLists: !0,
fencedCodeBlocks: "```",
strikethrough: !0
};
for (var l in n) s[l] = n[l];
return s.name = "markdown", e.overlayMode(e.getMode(r, s), a);
}, "markdown"), e.defineMIME("text/x-gfm", "gfm");
});
}, function(e, t, r) {
!function(e) {
e(r(360), r(363), r(364));
}(function(e) {
"use strict";
e.defineMode("markdown", function(t, r) {
function n(r) {
if (e.findModeByName) {
var n = e.findModeByName(r);
n && (r = n.mime || n.mimes[0]);
}
var i = e.getMode(t, r);
return "null" == i.name ? null : i;
}
function i(e, t, r) {
return t.f = t.inline = r, r(e, t);
}
function o(e, t, r) {
return t.f = t.block = r, r(e, t);
}
function a(e) {
return !e || !/\S/.test(e.string);
}
function s(e) {
return e.linkTitle = !1, e.em = !1, e.strong = !1, e.strikethrough = !1, e.quote = 0, 
e.indentedCode = !1, w || e.f != c || (e.f = p, e.block = l), e.trailingSpace = 0, 
e.trailingSpaceNewLine = !1, e.prevLine = e.thisLine, e.thisLine = null, null;
}
function l(e, t) {
var o = e.sol(), s = t.list !== !1, l = t.indentedCode;
t.indentedCode = !1, s && (t.indentationDiff >= 0 ? (t.indentationDiff < 4 && (t.indentation -= t.indentationDiff), 
t.list = null) : t.indentation > 0 ? (t.list = null, t.listDepth = Math.floor(t.indentation / 4)) : (t.list = !1, 
t.listDepth = 0));
var c = null;
if (t.indentationDiff >= 4) return e.skipToEnd(), l || a(t.prevLine) ? (t.indentation -= 4, 
t.indentedCode = !0, _.code) : null;
if (e.eatSpace()) return null;
if ((c = e.match(D)) && c[1].length <= 6) return t.header = c[1].length, r.highlightFormatting && (t.formatting = "header"), 
t.f = t.inline, f(t);
if (!(a(t.prevLine) || t.quote || s || l) && (c = e.match(N))) return t.header = "=" == c[0].charAt(0) ? 1 : 2, 
r.highlightFormatting && (t.formatting = "header"), t.f = t.inline, f(t);
if (e.eat(">")) return t.quote = o ? 1 : t.quote + 1, r.highlightFormatting && (t.formatting = "quote"), 
e.eatSpace(), f(t);
if ("[" === e.peek()) return i(e, t, b);
if (e.match(L, !0)) return t.hr = !0, _.hr;
if ((a(t.prevLine) || s) && (e.match(T, !1) || e.match(E, !1))) {
var h = null;
return e.match(T, !0) ? h = "ul" : (e.match(E, !0), h = "ol"), t.indentation = e.column() + e.current().length, 
t.list = !0, t.listDepth++, r.taskLists && e.match(M, !1) && (t.taskList = !0), 
t.f = t.inline, r.highlightFormatting && (t.formatting = [ "list", "list-" + h ]), 
f(t);
}
return r.fencedCodeBlocks && (c = e.match(I, !0)) ? (t.fencedChars = c[1], t.localMode = n(c[2]), 
t.localMode && (t.localState = t.localMode.startState()), t.f = t.block = u, r.highlightFormatting && (t.formatting = "code-block"), 
t.code = !0, f(t)) : i(e, t, t.inline);
}
function c(e, t) {
var r = C.token(e, t.htmlState);
return (w && null === t.htmlState.tagStart && !t.htmlState.context && t.htmlState.tokenize.isInText || t.md_inside && e.current().indexOf(">") > -1) && (t.f = p, 
t.block = l, t.htmlState = null), r;
}
function u(e, t) {
return t.fencedChars && e.match(t.fencedChars, !1) ? (t.localMode = t.localState = null, 
t.f = t.block = h, null) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), 
_.code);
}
function h(e, t) {
e.match(t.fencedChars), t.block = l, t.f = p, t.fencedChars = null, r.highlightFormatting && (t.formatting = "code-block"), 
t.code = !0;
var n = f(t);
return t.code = !1, n;
}
function f(e) {
var t = [];
if (e.formatting) {
t.push(_.formatting), "string" == typeof e.formatting && (e.formatting = [ e.formatting ]);
for (var n = 0; n < e.formatting.length; n++) t.push(_.formatting + "-" + e.formatting[n]), 
"header" === e.formatting[n] && t.push(_.formatting + "-" + e.formatting[n] + "-" + e.header), 
"quote" === e.formatting[n] && (!r.maxBlockquoteDepth || r.maxBlockquoteDepth >= e.quote ? t.push(_.formatting + "-" + e.formatting[n] + "-" + e.quote) : t.push("error"));
}
if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;
if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;
if (e.linkHref ? t.push(_.linkHref, "url") : (e.strong && t.push(_.strong), e.em && t.push(_.em), 
e.strikethrough && t.push(_.strikethrough), e.linkText && t.push(_.linkText), e.code && t.push(_.code)), 
e.header && t.push(_.header, _.header + "-" + e.header), e.quote && (t.push(_.quote), 
!r.maxBlockquoteDepth || r.maxBlockquoteDepth >= e.quote ? t.push(_.quote + "-" + e.quote) : t.push(_.quote + "-" + r.maxBlockquoteDepth)), 
e.list !== !1) {
var i = (e.listDepth - 1) % 3;
i ? 1 === i ? t.push(_.list2) : t.push(_.list3) : t.push(_.list1);
}
return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), 
t.length ? t.join(" ") : null;
}
function d(e, t) {
return e.match(O, !0) ? f(t) : void 0;
}
function p(t, n) {
var i = n.text(t, n);
if (void 0 !== i) return i;
if (n.list) return n.list = null, f(n);
if (n.taskList) {
var a = "x" !== t.match(M, !0)[1];
return a ? n.taskOpen = !0 : n.taskClosed = !0, r.highlightFormatting && (n.formatting = "task"), 
n.taskList = !1, f(n);
}
if (n.taskOpen = !1, n.taskClosed = !1, n.header && t.match(/^#+$/, !0)) return r.highlightFormatting && (n.formatting = "header"), 
f(n);
var s = t.sol(), l = t.next();
if ("\\" === l && (t.next(), r.highlightFormatting)) {
var u = f(n), h = _.formatting + "-escape";
return u ? u + " " + h : h;
}
if (n.linkTitle) {
n.linkTitle = !1;
var d = l;
"(" === l && (d = ")"), d = (d + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
var p = "^\\s*(?:[^" + d + "\\\\]+|\\\\\\\\|\\\\.)" + d;
if (t.match(RegExp(p), !0)) return _.linkHref;
}
if ("`" === l) {
var v = n.formatting;
r.highlightFormatting && (n.formatting = "code");
var b = f(n), y = t.pos;
t.eatWhile("`");
var x = 1 + t.pos - y;
return n.code ? x === S ? (n.code = !1, b) : (n.formatting = v, f(n)) : (S = x, 
n.code = !0, f(n));
}
if (n.code) return f(n);
if ("!" === l && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return t.match(/\[[^\]]*\]/), 
n.inline = n.f = g, _.image;
if ("[" === l && t.match(/.*\](\(.*\)| ?\[.*\])/, !1)) return n.linkText = !0, r.highlightFormatting && (n.formatting = "link"), 
f(n);
if ("]" === l && n.linkText && t.match(/\(.*\)| ?\[.*\]/, !1)) {
r.highlightFormatting && (n.formatting = "link");
var u = f(n);
return n.linkText = !1, n.inline = n.f = g, u;
}
if ("<" === l && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
n.f = n.inline = m, r.highlightFormatting && (n.formatting = "link");
var u = f(n);
return u ? u += " " : u = "", u + _.linkInline;
}
if ("<" === l && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
n.f = n.inline = m, r.highlightFormatting && (n.formatting = "link");
var u = f(n);
return u ? u += " " : u = "", u + _.linkEmail;
}
if ("<" === l && t.match(/^(!--|\w)/, !1)) {
var k = t.string.indexOf(">", t.pos);
if (-1 != k) {
var w = t.string.substring(t.start, k);
/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(w) && (n.md_inside = !0);
}
return t.backUp(1), n.htmlState = e.startState(C), o(t, n, c);
}
if ("<" === l && t.match(/^\/\w*?>/)) return n.md_inside = !1, "tag";
var A = !1;
if (!r.underscoresBreakWords && "_" === l && "_" !== t.peek() && t.match(/(\w)/, !1)) {
var L = t.pos - 2;
if (L >= 0) {
var T = t.string.charAt(L);
"_" !== T && T.match(/(\w)/, !1) && (A = !0);
}
}
if ("*" === l || "_" === l && !A) if (s && " " === t.peek()) ; else {
if (n.strong === l && t.eat(l)) {
r.highlightFormatting && (n.formatting = "strong");
var b = f(n);
return n.strong = !1, b;
}
if (!n.strong && t.eat(l)) return n.strong = l, r.highlightFormatting && (n.formatting = "strong"), 
f(n);
if (n.em === l) {
r.highlightFormatting && (n.formatting = "em");
var b = f(n);
return n.em = !1, b;
}
if (!n.em) return n.em = l, r.highlightFormatting && (n.formatting = "em"), f(n);
} else if (" " === l && (t.eat("*") || t.eat("_"))) {
if (" " === t.peek()) return f(n);
t.backUp(1);
}
if (r.strikethrough) if ("~" === l && t.eatWhile(l)) {
if (n.strikethrough) {
r.highlightFormatting && (n.formatting = "strikethrough");
var b = f(n);
return n.strikethrough = !1, b;
}
if (t.match(/^[^\s]/, !1)) return n.strikethrough = !0, r.highlightFormatting && (n.formatting = "strikethrough"), 
f(n);
} else if (" " === l && t.match(/^~~/, !0)) {
if (" " === t.peek()) return f(n);
t.backUp(2);
}
return " " === l && (t.match(/ +$/, !1) ? n.trailingSpace++ : n.trailingSpace && (n.trailingSpaceNewLine = !0)), 
f(n);
}
function m(e, t) {
var n = e.next();
if (">" === n) {
t.f = t.inline = p, r.highlightFormatting && (t.formatting = "link");
var i = f(t);
return i ? i += " " : i = "", i + _.linkInline;
}
return e.match(/^[^>]+/, !0), _.linkInline;
}
function g(e, t) {
if (e.eatSpace()) return null;
var n = e.next();
return "(" === n || "[" === n ? (t.f = t.inline = v("(" === n ? ")" : "]"), r.highlightFormatting && (t.formatting = "link-string"), 
t.linkHref = !0, f(t)) : "error";
}
function v(e) {
return function(t, n) {
var i = t.next();
if (i === e) {
n.f = n.inline = p, r.highlightFormatting && (n.formatting = "link-string");
var o = f(n);
return n.linkHref = !1, o;
}
return t.match(k(e), !0) && t.backUp(1), n.linkHref = !0, f(n);
};
}
function b(e, t) {
return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = y, e.next(), r.highlightFormatting && (t.formatting = "link"), 
t.linkText = !0, f(t)) : i(e, t, p);
}
function y(e, t) {
if (e.match(/^\]:/, !0)) {
t.f = t.inline = x, r.highlightFormatting && (t.formatting = "link");
var n = f(t);
return t.linkText = !1, n;
}
return e.match(/^([^\]\\]|\\.)+/, !0), _.linkText;
}
function x(e, t) {
return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), 
t.f = t.inline = p, _.linkHref + " url");
}
function k(e) {
return F[e] || (e = (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), F[e] = RegExp("^(?:[^\\\\]|\\\\.)*?(" + e + ")")), 
F[e];
}
var w = e.modes.hasOwnProperty("xml"), C = e.getMode(t, w ? {
name: "xml",
htmlMode: !0
} : "text/plain");
void 0 === r.highlightFormatting && (r.highlightFormatting = !1), void 0 === r.maxBlockquoteDepth && (r.maxBlockquoteDepth = 0), 
void 0 === r.underscoresBreakWords && (r.underscoresBreakWords = !0), void 0 === r.taskLists && (r.taskLists = !1), 
void 0 === r.strikethrough && (r.strikethrough = !1), void 0 === r.tokenTypeOverrides && (r.tokenTypeOverrides = {});
var S = 0, _ = {
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
for (var A in _) _.hasOwnProperty(A) && r.tokenTypeOverrides[A] && (_[A] = r.tokenTypeOverrides[A]);
var L = /^([*\-_])(?:\s*\1){2,}\s*$/, T = /^[*\-+]\s+/, E = /^[0-9]+([.)])\s+/, M = /^\[(x| )\](?=\s)/, D = r.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/, N = /^ *(?:\={1,}|-{1,})\s*$/, O = /^[^#!\[\]*_\\<>` "'(~]+/, I = RegExp("^(" + (r.fencedCodeBlocks === !0 ? "~~~+|```+" : r.fencedCodeBlocks) + ")[ \\t]*([\\w+#]*)"), F = [], P = {
startState: function() {
return {
f: l,
prevLine: null,
thisLine: null,
block: l,
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
htmlState: t.htmlState && e.copyState(C, t.htmlState),
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
var r = t.header || t.hr;
if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0) || r) {
if (s(t), !r) return null;
t.prevLine = null;
}
t.prevLine = t.thisLine, t.thisLine = e, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, 
t.f = t.block;
var n = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length, i = 4 * Math.floor((n - t.indentation) / 4);
i > 4 && (i = 4);
var o = t.indentation + i;
if (t.indentationDiff = o - t.indentation, t.indentation = o, n > 0) return null;
}
return t.f(e, t);
},
innerMode: function(e) {
return e.block == c ? {
state: e.htmlState,
mode: C
} : e.localState ? {
state: e.localState,
mode: e.localMode
} : {
state: e,
mode: P
};
},
blankLine: s,
getType: f,
fold: "markdown"
};
return P;
}, "xml"), e.defineMIME("text/x-markdown", "markdown");
});
}, function(e, t, r) {
!function(e) {
e(r(360));
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
}, r = {
autoSelfClosers: {},
implicitlyClosed: {},
contextGrabbers: {},
doNotIndent: {},
allowUnquoted: !1,
allowMissing: !1,
caseFold: !1
};
e.defineMode("xml", function(n, i) {
function o(e, t) {
function r(r) {
return t.tokenize = r, r(e, t);
}
var n = e.next();
if ("<" == n) return e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? r(l("atom", "]]>")) : null : e.match("--") ? r(l("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), 
r(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = l("meta", "?>"), 
"meta") : (A = e.eat("/") ? "closeTag" : "openTag", t.tokenize = a, "tag bracket");
if ("&" == n) {
var i;
return i = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";"), 
i ? "atom" : "error";
}
return e.eatWhile(/[^&<]/), null;
}
function a(e, t) {
var r = e.next();
if (">" == r || "/" == r && e.eat(">")) return t.tokenize = o, A = ">" == r ? "endTag" : "selfcloseTag", 
"tag bracket";
if ("=" == r) return A = "equals", null;
if ("<" == r) {
t.tokenize = o, t.state = d, t.tagName = t.tagStart = null;
var n = t.tokenize(e, t);
return n ? n + " tag error" : "tag error";
}
return /[\'\"]/.test(r) ? (t.tokenize = s(r), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), 
"word");
}
function s(e) {
var t = function(t, r) {
for (;!t.eol(); ) if (t.next() == e) {
r.tokenize = a;
break;
}
return "string";
};
return t.isInAttribute = !0, t;
}
function l(e, t) {
return function(r, n) {
for (;!r.eol(); ) {
if (r.match(t)) {
n.tokenize = o;
break;
}
r.next();
}
return e;
};
}
function c(e) {
return function(t, r) {
for (var n; null != (n = t.next()); ) {
if ("<" == n) return r.tokenize = c(e + 1), r.tokenize(t, r);
if (">" == n) {
if (1 == e) {
r.tokenize = o;
break;
}
return r.tokenize = c(e - 1), r.tokenize(t, r);
}
}
return "meta";
};
}
function u(e, t, r) {
this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = r, 
(C.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0);
}
function h(e) {
e.context && (e.context = e.context.prev);
}
function f(e, t) {
for (var r; ;) {
if (!e.context) return;
if (r = e.context.tagName, !C.contextGrabbers.hasOwnProperty(r) || !C.contextGrabbers[r].hasOwnProperty(t)) return;
h(e);
}
}
function d(e, t, r) {
return "openTag" == e ? (r.tagStart = t.column(), p) : "closeTag" == e ? m : d;
}
function p(e, t, r) {
return "word" == e ? (r.tagName = t.current(), L = "tag", b) : (L = "error", p);
}
function m(e, t, r) {
if ("word" == e) {
var n = t.current();
return r.context && r.context.tagName != n && C.implicitlyClosed.hasOwnProperty(r.context.tagName) && h(r), 
r.context && r.context.tagName == n ? (L = "tag", g) : (L = "tag error", v);
}
return L = "error", v;
}
function g(e, t, r) {
return "endTag" != e ? (L = "error", g) : (h(r), d);
}
function v(e, t, r) {
return L = "error", g(e, t, r);
}
function b(e, t, r) {
if ("word" == e) return L = "attribute", y;
if ("endTag" == e || "selfcloseTag" == e) {
var n = r.tagName, i = r.tagStart;
return r.tagName = r.tagStart = null, "selfcloseTag" == e || C.autoSelfClosers.hasOwnProperty(n) ? f(r, n) : (f(r, n), 
r.context = new u(r, n, i == r.indented)), d;
}
return L = "error", b;
}
function y(e, t, r) {
return "equals" == e ? x : (C.allowMissing || (L = "error"), b(e, t, r));
}
function x(e, t, r) {
return "string" == e ? k : "word" == e && C.allowUnquoted ? (L = "string", b) : (L = "error", 
b(e, t, r));
}
function k(e, t, r) {
return "string" == e ? k : b(e, t, r);
}
var w = n.indentUnit, C = {}, S = i.htmlMode ? t : r;
for (var _ in S) C[_] = S[_];
for (var _ in i) C[_] = i[_];
var A, L;
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
A = null;
var r = t.tokenize(e, t);
return (r || A) && "comment" != r && (L = null, t.state = t.state(A || r, e, t), 
L && (r = "error" == L ? r + " error" : L)), r;
},
indent: function(t, r, n) {
var i = t.context;
if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + w;
if (i && i.noIndent) return e.Pass;
if (t.tokenize != a && t.tokenize != o) return n ? n.match(/^(\s*)/)[0].length : 0;
if (t.tagName) return C.multilineTagIndentPastTag !== !1 ? t.tagStart + t.tagName.length + 2 : t.tagStart + w * (C.multilineTagIndentFactor || 1);
if (C.alignCDATA && /<!\[CDATA\[/.test(r)) return 0;
var s = r && /^<(\/)?([\w_:\.-]*)/.exec(r);
if (s && s[1]) for (;i; ) {
if (i.tagName == s[2]) {
i = i.prev;
break;
}
if (!C.implicitlyClosed.hasOwnProperty(i.tagName)) break;
i = i.prev;
} else if (s) for (;i; ) {
var l = C.contextGrabbers[i.tagName];
if (!l || !l.hasOwnProperty(s[2])) break;
i = i.prev;
}
for (;i && i.prev && !i.startOfLine; ) i = i.prev;
return i ? i.indent + w : t.baseIndent || 0;
},
electricInput: /<\/[\s\w:]+>$/,
blockCommentStart: "<!--",
blockCommentEnd: "-->",
configuration: C.htmlMode ? "html" : "xml",
helperType: C.htmlMode ? "html" : "xml",
skipAttribute: function(e) {
e.state == x && (e.state = b);
}
};
}), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
name: "xml",
htmlMode: !0
});
});
}, function(e, t, r) {
!function(e) {
e(r(360));
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
var r = e.modeInfo[t];
r.mimes && (r.mime = r.mimes[0]);
}
e.findModeByMIME = function(t) {
t = t.toLowerCase();
for (var r = 0; r < e.modeInfo.length; r++) {
var n = e.modeInfo[r];
if (n.mime == t) return n;
if (n.mimes) for (var i = 0; i < n.mimes.length; i++) if (n.mimes[i] == t) return n;
}
}, e.findModeByExtension = function(t) {
for (var r = 0; r < e.modeInfo.length; r++) {
var n = e.modeInfo[r];
if (n.ext) for (var i = 0; i < n.ext.length; i++) if (n.ext[i] == t) return n;
}
}, e.findModeByFileName = function(t) {
for (var r = 0; r < e.modeInfo.length; r++) {
var n = e.modeInfo[r];
if (n.file && n.file.test(t)) return n;
}
var i = t.lastIndexOf("."), o = i > -1 && t.substring(i + 1, t.length);
return o ? e.findModeByExtension(o) : void 0;
}, e.findModeByName = function(t) {
t = t.toLowerCase();
for (var r = 0; r < e.modeInfo.length; r++) {
var n = e.modeInfo[r];
if (n.name.toLowerCase() == t) return n;
if (n.alias) for (var i = 0; i < n.alias.length; i++) if (n.alias[i].toLowerCase() == t) return n;
}
};
});
}, function(e, t, r) {
!function(e) {
e(r(360));
}(function(e) {
"use strict";
e.overlayMode = function(t, r, n) {
return {
startState: function() {
return {
base: e.startState(t),
overlay: e.startState(r),
basePos: 0,
baseCur: null,
overlayPos: 0,
overlayCur: null,
streamSeen: null
};
},
copyState: function(n) {
return {
base: e.copyState(t, n.base),
overlay: e.copyState(r, n.overlay),
basePos: n.basePos,
baseCur: null,
overlayPos: n.overlayPos,
overlayCur: null
};
},
token: function(e, i) {
return (e != i.streamSeen || Math.min(i.basePos, i.overlayPos) < e.start) && (i.streamSeen = e, 
i.basePos = i.overlayPos = e.start), e.start == i.basePos && (i.baseCur = t.token(e, i.base), 
i.basePos = e.pos), e.start == i.overlayPos && (e.pos = e.start, i.overlayCur = r.token(e, i.overlay), 
i.overlayPos = e.pos), e.pos = Math.min(i.basePos, i.overlayPos), null == i.overlayCur ? i.baseCur : null != i.baseCur && i.overlay.combineTokens || n && null == i.overlay.combineTokens ? i.baseCur + " " + i.overlayCur : i.overlayCur;
},
indent: t.indent && function(e, r) {
return t.indent(e.base, r);
},
electricChars: t.electricChars,
innerMode: function(e) {
return {
state: e.base,
mode: t
};
},
blankLine: function(e) {
t.blankLine && t.blankLine(e.base), r.blankLine && r.blankLine(e.overlay);
}
};
};
});
}, function(e, r, n) {
var i = n(158);
e.exports = function(e) {
var r, n = [], o = {}, a = e || {};
return function(e, t, a, s) {
n.push("");
var l = [];
o.b = r = function(t, r, i) {
this && this.block, this && this.attributes || {};
e.call(this, n, l, t, r, i);
}, o.e = r = function(e) {
var t = this && this.block, r = this && this.attributes || {};
o.b.call({
block: function() {
t && t();
},
attributes: i.merge([ r ])
}, e, !0);
}, o.b.call({
block: function() {
o.e.call({
block: function() {
o.e.call({
block: function() {
(function() {
var e = t;
if ("number" == typeof e.length) for (var n = 0, l = e.length; l > n; n++) {
var c = e[n];
if ("|" == c) o.e.call({
attributes: {
"class": "button-separator"
}
}); else {
var u = s("mdeditor.buttons." + c);
-1 != a.userAgent.indexOf("Mac OS X") && (u = u.replace("Ctrl", "Cmd")), o.e.call({
attributes: {
"data-action": "string" == typeof (r = c) ? i.escape(r) : r,
"data-tooltip": "string" == typeof (r = u) ? i.escape(r) : r,
"class": "button"
}
}, "button");
}
} else {
var l = 0;
for (var n in e) {
l++;
var c = e[n];
if ("|" == c) o.e.call({
attributes: {
"class": "button-separator"
}
}); else {
var u = s("mdeditor.buttons." + c);
-1 != a.userAgent.indexOf("Mac OS X") && (u = u.replace("Ctrl", "Cmd")), o.e.call({
attributes: {
"data-action": "string" == typeof (r = c) ? i.escape(r) : r,
"data-tooltip": "string" == typeof (r = u) ? i.escape(r) : r,
"class": "button"
}
}, "button");
}
}
}
}).call(this);
},
attributes: {
"class": "button-bar"
}
}), o.e.call({
attributes: {
"class": "input"
}
}, "textarea"), o.e.call({
block: function() {
o.e.call({
attributes: {
"data-mdeditor-resize": !0,
"class": "resize-handle"
}
});
},
attributes: {
"class": "footer"
}
});
},
attributes: {
"class": "editor"
}
}), o.e.call({
block: function() {
o.e.call({
block: function() {
n.push("Предпросмотр");
}
}, "h2");
},
attributes: {
"class": "title-preview"
}
}), o.e.call({
attributes: {
"data-editor-preview": !0,
"class": "preview"
}
});
},
attributes: {
"class": "mdeditor"
}
});
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0, "buttons" in a ? a.buttons : "undefined" != typeof buttons ? buttons : void 0, "navigator" in a ? a.navigator : "undefined" != typeof navigator ? navigator : void 0, "t" in a ? a.t : "undefined" != typeof t ? t : void 0), 
n.join("");
};
}, function(e, t, r) {
function n(e) {
return r(i(e));
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
n.keys = function() {
return Object.keys(o);
}, n.resolve = i, e.exports = n, n.id = 367;
}, function(e, t) {
e.exports = {
text: {
bold: "bold text",
italic: "italic text",
code: "code",
heading: "Heading",
fencedCode: "enter multiline code here",
ol: "List item",
ul: "List item",
alt: "Image desciption",
link: "link text"
},
buttons: {
bold: "bold [Ctrl-B]",
italic: "italic [Ctrl-I]",
code: "inline code",
undo: "undo [Ctrl-Z]",
redo: "redo [Ctrl-Y]",
fencedCode: "multiline code",
link: "insert link",
ul: "itemized list",
ol: "ordered list",
heading: "heading",
image: "insert image"
}
};
}, function(e, t) {
e.exports = {
text: {
bold: "жирный текст",
italic: "текст курсивом",
code: "code",
heading: "Заголовок",
fencedCode: "enter multiline code here",
link: "текст ссылки",
ol: "Элемент списка",
ul: "Элемент списка",
alt: "описание изображения"
},
buttons: {
bold: "жирный текст [Ctrl-B]",
italic: "текст курсивом [Ctrl-I]",
code: "строка кода",
undo: "отмена [Ctrl-Z]",
redo: "отменить отмену [Ctrl-Y]",
fencedCode: "несколько строк кода",
link: "ссылка",
ul: "список",
ol: "нумерованый список",
heading: "заголовок",
image: "вставить картинку"
}
};
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
var n = !0, s = !0;
if ("function" != typeof e) throw new TypeError(a);
return o(r) && (n = "leading" in r ? !!r.leading : n, s = "trailing" in r ? !!r.trailing : s), 
i(e, t, {
leading: n,
maxWait: t,
trailing: s
});
}
var i = r(371), o = r(372), a = "Expected a function";
e.exports = n;
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
function n() {
y && clearTimeout(y), m && clearTimeout(m), k = 0, p = m = b = y = x = void 0;
}
function c(t, r) {
r && clearTimeout(r), m = y = x = void 0, t && (k = o(), g = e.apply(b, p), y || m || (p = b = void 0));
}
function u() {
var e = t - (o() - v);
0 >= e || e > t ? c(x, m) : y = setTimeout(u, e);
}
function h() {
return (y && x || m && S) && (g = e.apply(b, p)), n(), g;
}
function f() {
c(S, y);
}
function d() {
if (p = arguments, v = o(), b = this, x = S && (y || !w), C === !1) var r = w && !y; else {
k || m || w || (k = v);
var n = C - (v - k), i = (0 >= n || n > C) && (w || m);
i ? (m && (m = clearTimeout(m)), k = v, g = e.apply(b, p)) : m || (m = setTimeout(f, n));
}
return i && y ? y = clearTimeout(y) : y || t === C || (y = setTimeout(u, t)), r && (i = !0, 
g = e.apply(b, p)), !i || y || m || (p = b = void 0), g;
}
var p, m, g, v, b, y, x, k = 0, w = !1, C = !1, S = !0;
if ("function" != typeof e) throw new TypeError(s);
return t = a(t) || 0, i(r) && (w = !!r.leading, C = "maxWait" in r && l(a(r.maxWait) || 0, t), 
S = "trailing" in r ? !!r.trailing : S), d.cancel = n, d.flush = h, d;
}
var i = r(372), o = r(373), a = r(374), s = "Expected a function", l = Math.max;
e.exports = n;
}, function(e, t) {
"use strict";
function r(e) {
var t = typeof e;
return !!e && ("object" == t || "function" == t);
}
e.exports = r;
}, function(e, t) {
"use strict";
var r = Date.now;
e.exports = r;
}, function(e, t, r) {
"use strict";
function n(e) {
if (o(e)) {
var t = i(e.valueOf) ? e.valueOf() : e;
e = o(t) ? t + "" : t;
}
if ("string" != typeof e) return 0 === e ? e : +e;
e = e.replace(s, "");
var r = c.test(e);
return r || u.test(e) ? h(e.slice(2), r ? 2 : 8) : l.test(e) ? a : +e;
}
var i = r(375), o = r(372), a = NaN, s = /^\s+|\s+$/g, l = /^[-+]0x[0-9a-f]+$/i, c = /^0b[01]+$/i, u = /^0o[0-7]+$/i, h = parseInt;
e.exports = n;
}, function(e, t, r) {
"use strict";
function n(e) {
var t = i(e) ? l.call(e) : "";
return t == o || t == a;
}
var i = r(372), o = "[object Function]", a = "[object GeneratorFunction]", s = Object.prototype, l = s.toString;
e.exports = n;
} ]);
//# sourceMappingURL=mdeditor.ea05a139cece7c8d9554.js.map
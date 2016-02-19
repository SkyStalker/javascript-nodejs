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
for (var s in r) r.hasOwnProperty(s) && (o[s] = r[s]);
return o;
}
var a = {};
for (var c in o) if (o.hasOwnProperty(c)) {
if (c == t) for (var s in r) r.hasOwnProperty(s) && (a[s] = r[s]);
a[c] = o[c];
}
return n.languages.DFS(n.languages, function(t, r) {
r === i[e] && t != e && (this[t] = a);
}), i[e] = a;
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
for (var s, a, c = t; c && !e.test(c.className); ) c = c.parentNode;
c && (s = (c.className.match(e) || [ , "" ])[1], a = n.languages[s]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s, 
c = t.parentNode, /pre/i.test(c.nodeName) && (c.className = c.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s);
var l = t.textContent, u = {
element: t,
language: s,
grammar: a,
code: l
};
if (!l || !a) return void n.hooks.run("complete", u);
if (n.hooks.run("before-highlight", u), i && r.Worker) {
var p = new Worker(n.filename);
p.onmessage = function(e) {
u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, 
o && o.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
}, p.postMessage(JSON.stringify({
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
var i = n.Token, o = [ e ], s = t.rest;
if (s) {
for (var a in s) t[a] = s[a];
delete t.rest;
}
e: for (var a in t) if (t.hasOwnProperty(a) && t[a]) {
var c = t[a];
c = "Array" === n.util.type(c) ? c : [ c ];
for (var l = 0; l < c.length; ++l) {
var u = c[l], p = u.inside, h = !!u.lookbehind, f = 0, d = u.alias;
u = u.pattern || u;
for (var g = 0; g < o.length; g++) {
var m = o[g];
if (o.length > e.length) break e;
if (!(m instanceof i)) {
u.lastIndex = 0;
var b = u.exec(m);
if (b) {
h && (f = b[1].length);
var v = b.index - 1 + f, b = b[0].slice(f), k = b.length, _ = v + k, y = m.slice(0, v + 1), A = m.slice(_ + 1), x = [ g, 1 ];
y && x.push(y);
var E = new i(a, p ? n.tokenize(b, p) : b, d);
x.push(E), A && x.push(A), Array.prototype.splice.apply(o, x);
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
var s = "Array" === n.util.type(e.alias) ? e.alias : [ e.alias ];
Array.prototype.push.apply(o.classes, s);
}
n.hooks.run("wrap", o);
var a = "";
for (var c in o.attributes) a += (a ? " " : "") + c + '="' + (o.attributes[c] || "") + '"';
return "<" + o.tag + ' class="' + o.classes.join(" ") + '" ' + a + ">" + o.content + "</" + o.tag + ">";
}, !r.document) return r.addEventListener ? (r.addEventListener("message", function(e) {
var t = JSON.parse(e.data), i = t.language, o = t.code, s = t.immediateClose;
r.postMessage(n.highlight(o, n.languages[i], i)), s && r.close();
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
return a[e] || e;
}
function s(e) {
var t = (e + "").replace(c, o);
return t === "" + e ? e : t;
}
t.merge = function l(e, t) {
if (1 === arguments.length) {
for (var r = e[0], i = 1; i < e.length; i++) r = l(r, e[i]);
return r;
}
var o = e.class, s = t.class;
(o || s) && (o = o || [], s = s || [], Array.isArray(o) || (o = [ o ]), Array.isArray(s) || (s = [ s ]), 
e.class = o.concat(s).filter(n));
for (var a in t) "class" != a && (e[a] = t[a]);
return e;
}, t.joinClasses = i, t.cls = function(e, r) {
for (var n = [], o = 0; o < e.length; o++) r && r[o] ? n.push(t.escape(i([ e[o] ]))) : n.push(i(e[o]));
var s = i(n);
return s.length ? ' class="' + s + '"' : "";
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
if (o.length) for (var s = 0; s < o.length; ++s) {
var a = o[s], c = e[a];
"class" == a ? (c = i(c)) && n.push(" " + a + '="' + c + '"') : n.push(t.attr(a, c, !1, r));
}
return n.join("");
};
var a = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, c = /[&<>"]/g;
t.escape = s, t.rethrow = function u(e, t, n, i) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || i)) throw e.message += " on line " + n, 
e;
try {
i = i || r(116).readFileSync(t, "utf8");
} catch (o) {
u(e, null, n);
}
var s = 3, a = i.split("\n"), c = Math.max(n - s, 0), l = Math.min(a.length, n + s), s = a.slice(c, l).map(function(e, t) {
var r = t + c + 1;
return (r == n ? "  > " : "    ") + r + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + n + "\n" + s + "\n\n" + e.message, 
e;
}, t.DebugItem = function(e, t) {
this.lineno = e, this.filename = t;
};
}, , , function(e, t, r) {
"use strict";
function n(e) {
e.bem = i, e.t = s, e.thumb = o;
}
var i = r(162)(), o = r(163).thumb, s = r(326);
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, n(t), e(t);
};
}, function(e, t, r) {
"use strict";
var n = r(158);
e.exports = function(e) {
function t(e, t, r, i, o) {
var s = o || "div";
switch (s) {
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
e.push("<" + s + n.attrs(n.merge([ r ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(s) && e.push("</" + s + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(r, n, i, o) {
var s = this.block, a = this.attributes || {};
if (!a.class && i && !o) throw Error("Block without class: " + i);
if (a.class) {
var c = a.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var l;
try {
l = c[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + c[0]);
}
o ? c[0] = n[n.length - 1] + e.element + c[0] : n[n.length] = l;
var p = (o ? n[n.length - 1] + e.element : "") + l;
-1 === c.indexOf(p) && (c[c.length] = p);
for (var h = 0; h < c.length; h++) {
var f = c[h];
f.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? c[h] = p + f : f.match(RegExp("^" + e.element)) && (n[n.length - 2] ? c[h] = n[n.length - 2] + f : c[h] = n[n.length - 1] + f), 
c[h].match(RegExp("^" + p + "($|(?=" + e.element + "|" + e.modifier + "))")) && (c[h] = e.prefix + c[h]);
}
a.class = c.sort().join(" ");
}
t(r, s, a, n, i), o || n.pop();
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
new s(n), n.setAttribute("data-prism-done", "1");
}
}
function i(e) {
for (var t = e.querySelectorAll("div.code-tabs:not([data-prism-done])"), r = 0; r < t.length; r++) new a(t[r]), 
t[r].setAttribute("data-prism-done", "1");
}
function o(e) {
n(e), i(e);
}
r(87), r(88), r(89), r(90), r(91), r(92), r(93), r(94), r(95), r(96), r(97), r(98), 
r(99), r(100), r(101), Prism.tokenTag = "code";
var s = r(238), a = r(241);
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
o(document);
});
}, t.highlight = o;
}, function(e, t, r) {
"use strict";
function n(e) {
function t() {
var e = _.contentWindow;
return "function" != typeof e.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void e.postMessage(g, "https://ru.lookatcode.com/showjs");
}
function r() {
var t;
if (y && e.hasAttribute("data-refresh") && (y.remove(), y = null), y || (y = e.querySelector(".code-result")), 
y) t = y.querySelector("iframe"); else {
if (y = document.createElement("div"), y.className = "code-result code-example__result", 
t = document.createElement("iframe"), t.name = "frame-" + Math.random(), t.className = "code-result__iframe", 
"0" === e.getAttribute("data-demo-height")) t.style.display = "none"; else if (e.hasAttribute("data-demo-height")) {
var r = +e.getAttribute("data-demo-height");
t.style.height = r + "px";
}
y.appendChild(t), e.appendChild(y);
}
if (v) {
var n = t.contentDocument || t.contentWindow.document;
n.open(), n.write(p(g)), n.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(n.querySelectorAll("script"), function(e) {
e.remove();
});
}, 2e3), e.hasAttribute("data-demo-height") || s.iframe(t), A && e.hasAttribute("data-autorun") || a(y) || y.scrollIntoView(!1);
} else {
var i = document.createElement("form");
i.style.display = "none", i.method = "POST", i.enctype = "multipart/form-data", 
i.action = "https://ru.lookatcode.com/showhtml", i.target = t.name;
var o = document.createElement("textarea");
o.name = "code", o.value = p(g), i.appendChild(o), t.parentNode.insertBefore(i, t.nextSibling), 
i.submit(), i.remove(), A && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || s.iframe(t), a(y) || y.scrollIntoView(!1);
});
}
}
function n(e) {
var t = document.createElement("script");
t.text = e, document.head.appendChild(t).parentNode.removeChild(t);
}
function l() {
if (v) {
if (e.hasAttribute("data-autorun")) return void n(g);
try {
window.eval.call(window, g);
} catch (r) {
alert("Error: " + r.message);
}
} else e.hasAttribute("data-refresh") && _ && (_.remove(), _ = null), _ ? t() : (_ = document.createElement("iframe"), 
_.className = "js-frame", _.src = "https://ru.lookatcode.com/showjs", _.style.width = 0, 
_.style.height = 0, _.style.border = "none", _.onload = function() {
t();
}, document.body.appendChild(_));
}
function u() {
var e;
if (b) e = p(g); else {
var t = g.replace(/^/gim, "    ");
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
function p() {
var e = g.toLowerCase(), t = e.match("<body>"), r = e.match("</body>"), n = e.match("<html>"), i = e.match("</html>"), o = e.match(/^\s*<!doctype/);
if (o) return g;
var s = g;
return n || (s = "<html>\n" + s), i || (s += "\n</html>"), t || (s = s.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
r || (s = s.replace("</html>", "\n</body>\n</html>")), s = "<!DOCTYPE HTML>\n" + s;
}
function h() {
m ? l() : r(), A = !1;
}
var f = e.querySelector("pre"), d = f.querySelector("code"), g = d.textContent;
Prism.highlightElement(d), c(f), i(f, e.getAttribute("data-highlight-block")), o(f, e.getAttribute("data-highlight-inline"));
var m = f.classList.contains("language-javascript"), b = f.classList.contains("language-markup"), v = +e.getAttribute("data-trusted"), k = +e.getAttribute("data-no-strict");
!k && m && (g = "'use strict';\n" + g);
var _, y, A = !0;
if (m || b) {
var x = e.querySelector('[data-action="run"]');
x && (x.onclick = function() {
return this.blur(), h(), !1;
});
var E = e.querySelector('[data-action="edit"]');
E && (E.onclick = function() {
return this.blur(), u(), !1;
}), e.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == e.getAttribute("data-autorun") ? e.querySelector("iframe").remove() : setTimeout(h, 100));
}
}
function i(e, t) {
if (t) for (var r, n = t.replace(/\s+/g, "").split(","), i = 0; r = n[i++]; ) {
r = r.split("-");
var o = +r[0], s = +r[1] || o, a = '<code class="block-highlight" data-start="' + o + '" data-end="' + s + '">' + Array(o + 1).join("\n") + '<code class="mask">' + Array(s - o + 2).join("\n") + "</code></code>";
e.insertAdjacentHTML("afterBegin", a);
}
}
function o(e, t) {
var r = e.querySelector('code[class*="language-"]');
t = t ? t.split(",") : [];
for (var n = 0; n < t.length; n++) {
var i = t[n].split(":"), o = +i[0], s = i[1].split("-"), a = +s[0], c = +s[1], l = '<code class="inline-highlight">' + Array(o + 1).join("\n") + Array(a + 1).join(" ") + '<code class="mask">' + Array(c - a + 1).join(" ") + "</code></code>";
r.insertAdjacentHTML("afterBegin", l);
}
}
var s = r(197), a = r(239), c = r(240);
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
var o = r[i], s = n[i];
o == e.delegateTarget ? (t = i, s.classList.add("code-tabs__section_current"), o.classList.add("code-tabs__switch_current")) : (s.classList.remove("code-tabs__section_current"), 
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
}(), o = r(252).lang, s = r(253), a = r(344), c = r(322), l = r(323), u = r(334), p = r(338), h = r(340), f = r(341), d = r(343), g = r(337);
e.exports = function() {
function e(t) {
n(this, e), t = t || {}, this.options = t, this.env = t.env || {}, this.md = s(Object.assign({
typographer: !0,
blockTags: g.allSupported,
linkHeaderTag: !1,
html: !1,
quotes: "ru" == o ? "«»„“" : "“”‘’"
}, t)), c(this.md), l(this.md), u(this.md), p(this.md), h(this.md), f(this.md), 
a(this.md), d(this.md);
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
return b.test(t) ? v.test(t) ? !0 : !1 : !0;
}
function i(e) {
var t = d.parse(e, !0);
if (t.hostname && (!t.protocol || k.indexOf(t.protocol) >= 0)) try {
t.hostname = g.toASCII(t.hostname);
} catch (r) {}
return d.encode(d.format(t));
}
function o(e) {
var t = d.parse(e, !0);
if (t.hostname && (!t.protocol || k.indexOf(t.protocol) >= 0)) try {
t.hostname = g.toUnicode(t.hostname);
} catch (r) {}
return d.decode(d.format(t));
}
function s(e, t) {
return this instanceof s ? (t || a.isString(e) || (t = e || {}, e = "default"), 
this.inline = new h(), this.block = new p(), this.core = new u(), this.renderer = new l(), 
this.linkify = new f(), this.validateLink = n, this.normalizeLink = i, this.normalizeLinkText = o, 
this.utils = a, this.helpers = c, this.options = {}, this.configure(e), void (t && this.set(t))) : new s(e, t);
}
var a = r(255), c = r(269), l = r(273), u = r(274), p = r(284), h = r(299), f = r(315), d = r(259), g = r(317), m = {
"default": r(318),
zero: r(319),
commonmark: r(320)
}, b = /^(vbscript|javascript|file|data):/, v = /^data:image\/(gif|png|jpeg|webp);/, k = [ "http:", "https:", "mailto:" ];
s.prototype.set = function(e) {
return a.assign(this.options, e), this;
}, s.prototype.configure = function(e) {
var t, r = this;
if (a.isString(e) && (t = e, e = m[t], !e)) throw Error('Wrong `markdown-it` preset "' + t + '", check name');
if (!e) throw Error("Wrong `markdown-it` preset, can't be empty");
return e.options && r.set(e.options), e.components && Object.keys(e.components).forEach(function(t) {
e.components[t].rules && r[t].ruler.enableOnly(e.components[t].rules), e.components[t].rules2 && r[t].ruler2.enableOnly(e.components[t].rules2);
}), this;
}, s.prototype.enable = function(e, t) {
var r = [];
Array.isArray(e) || (e = [ e ]), [ "core", "block", "inline" ].forEach(function(t) {
r = r.concat(this[t].ruler.enable(e, !0));
}, this), r = r.concat(this.inline.ruler2.enable(e, !0));
var n = e.filter(function(e) {
return r.indexOf(e) < 0;
});
if (n.length && !t) throw Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
return this;
}, s.prototype.disable = function(e, t) {
var r = [];
Array.isArray(e) || (e = [ e ]), [ "core", "block", "inline" ].forEach(function(t) {
r = r.concat(this[t].ruler.disable(e, !0));
}, this), r = r.concat(this.inline.ruler2.disable(e, !0));
var n = e.filter(function(e) {
return r.indexOf(e) < 0;
});
if (n.length && !t) throw Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
return this;
}, s.prototype.use = function(e) {
var t = [ this ].concat(Array.prototype.slice.call(arguments, 1));
return e.apply(e, t), this;
}, s.prototype.parse = function(e, t) {
var r = new this.core.State(e, this, t);
return this.core.process(r), r.tokens;
}, s.prototype.render = function(e, t) {
return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t);
}, s.prototype.parseInline = function(e, t) {
var r = new this.core.State(e, this, t);
return r.inlineMode = !0, this.core.process(r), r.tokens;
}, s.prototype.renderInline = function(e, t) {
return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t);
}, e.exports = s;
}, function(e, t, r) {
"use strict";
function n(e) {
return Object.prototype.toString.call(e);
}
function i(e) {
return "[object String]" === n(e);
}
function o(e, t) {
return y.call(e, t);
}
function s(e) {
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
function a(e, t, r) {
return [].concat(e.slice(0, t), r, e.slice(t + 1));
}
function c(e) {
return e >= 55296 && 57343 >= e ? !1 : e >= 64976 && 65007 >= e ? !1 : 65535 === (65535 & e) || 65534 === (65535 & e) ? !1 : e >= 0 && 8 >= e ? !1 : 11 === e ? !1 : e >= 14 && 31 >= e ? !1 : e >= 127 && 159 >= e ? !1 : e > 1114111 ? !1 : !0;
}
function l(e) {
if (e > 65535) {
e -= 65536;
var t = 55296 + (e >> 10), r = 56320 + (1023 & e);
return String.fromCharCode(t, r);
}
return String.fromCharCode(e);
}
function u(e, t) {
var r = 0;
return o(C, t) ? C[t] : 35 === t.charCodeAt(0) && w.test(t) && (r = "x" === t[1].toLowerCase() ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10), 
c(r)) ? l(r) : e;
}
function p(e) {
return e.indexOf("\\") < 0 ? e : e.replace(A, "$1");
}
function h(e) {
return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(E, function(e, t, r) {
return t ? t : u(e, r);
});
}
function f(e) {
return D[e];
}
function d(e) {
return S.test(e) ? e.replace(T, f) : e;
}
function g(e) {
return e.replace(L, "\\$&");
}
function m(e) {
switch (e) {
case 9:
case 32:
return !0;
}
return !1;
}
function b(e) {
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
function v(e) {
return F.test(e);
}
function k(e) {
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
function _(e) {
return e.trim().replace(/\s+/g, " ").toUpperCase();
}
var y = Object.prototype.hasOwnProperty, A = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, x = /&([a-z#][a-z0-9]{1,31});/gi, E = RegExp(A.source + "|" + x.source, "gi"), w = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, C = r(256), S = /[&<>"]/, T = /[&<>"]/g, D = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, L = /[.?*+^$[\]\\(){}|-]/g, F = r(258);
t.lib = {}, t.lib.mdurl = r(259), t.lib.ucmicro = r(264), t.assign = s, t.isString = i, 
t.has = o, t.unescapeMd = p, t.unescapeAll = h, t.isValidEntityCode = c, t.fromCodePoint = l, 
t.escapeHtml = d, t.arrayReplaceAt = a, t.isSpace = m, t.isWhiteSpace = b, t.isMdAsciiPunct = k, 
t.isPunctChar = v, t.escapeRE = g, t.normalizeReference = _;
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
var o, s, a, c, l, u = "";
for ("string" != typeof t && (i = t, t = n.defaultChars), void 0 === i && (i = !0), 
l = r(t), o = 0, s = e.length; s > o; o++) if (a = e.charCodeAt(o), i && 37 === a && s > o + 2 && /^[0-9a-f]{2}$/i.test(e.slice(o + 1, o + 3))) u += e.slice(o, o + 3), 
o += 2; else if (128 > a) u += l[a]; else if (a >= 55296 && 57343 >= a) {
if (a >= 55296 && 56319 >= a && s > o + 1 && (c = e.charCodeAt(o + 1), c >= 56320 && 57343 >= c)) {
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
var t, r, n, o, s, a, c, l = "";
for (t = 0, r = e.length; r > t; t += 3) n = parseInt(e.slice(t + 1, t + 3), 16), 
128 > n ? l += i[n] : 192 === (224 & n) && r > t + 3 && (o = parseInt(e.slice(t + 4, t + 6), 16), 
128 === (192 & o)) ? (c = n << 6 & 1984 | 63 & o, l += 128 > c ? "��" : String.fromCharCode(c), 
t += 3) : 224 === (240 & n) && r > t + 6 && (o = parseInt(e.slice(t + 4, t + 6), 16), 
s = parseInt(e.slice(t + 7, t + 9), 16), 128 === (192 & o) && 128 === (192 & s)) ? (c = n << 12 & 61440 | o << 6 & 4032 | 63 & s, 
l += 2048 > c || c >= 55296 && 57343 >= c ? "���" : String.fromCharCode(c), t += 6) : 240 === (248 & n) && r > t + 9 && (o = parseInt(e.slice(t + 4, t + 6), 16), 
s = parseInt(e.slice(t + 7, t + 9), 16), a = parseInt(e.slice(t + 10, t + 12), 16), 
128 === (192 & o) && 128 === (192 & s) && 128 === (192 & a)) ? (c = n << 18 & 1835008 | o << 12 & 258048 | s << 6 & 4032 | 63 & a, 
65536 > c || c > 1114111 ? l += "����" : (c -= 65536, l += String.fromCharCode(55296 + (c >> 10), 56320 + (1023 & c))), 
t += 9) : l += "�";
return l;
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
var i = /^([a-z0-9.+-]+:)/i, o = /:[0-9]*$/, s = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, a = [ "<", ">", '"', "`", " ", "\r", "\n", "	" ], c = [ "{", "}", "|", "\\", "^", "`" ].concat(a), l = [ "'" ].concat(c), u = [ "%", "/", "?", ";", "#" ].concat(l), p = [ "/", "?", "#" ], h = 255, f = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, g = {
javascript: !0,
"javascript:": !0
}, m = {
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
var r, n, o, a, c, l = e;
if (l = l.trim(), !t && 1 === e.split("#").length) {
var b = s.exec(l);
if (b) return this.pathname = b[1], b[2] && (this.search = b[2]), this;
}
var v = i.exec(l);
if (v && (v = v[0], o = v.toLowerCase(), this.protocol = v, l = l.substr(v.length)), 
(t || v || l.match(/^\/\/[^@\/]+@[^@\/]+/)) && (c = "//" === l.substr(0, 2), !c || v && g[v] || (l = l.substr(2), 
this.slashes = !0)), !g[v] && (c || v && !m[v])) {
var k = -1;
for (r = 0; r < p.length; r++) a = l.indexOf(p[r]), -1 !== a && (-1 === k || k > a) && (k = a);
var _, y;
for (y = -1 === k ? l.lastIndexOf("@") : l.lastIndexOf("@", k), -1 !== y && (_ = l.slice(0, y), 
l = l.slice(y + 1), this.auth = _), k = -1, r = 0; r < u.length; r++) a = l.indexOf(u[r]), 
-1 !== a && (-1 === k || k > a) && (k = a);
-1 === k && (k = l.length), ":" === l[k - 1] && k--;
var A = l.slice(0, k);
l = l.slice(k), this.parseHost(A), this.hostname = this.hostname || "";
var x = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
if (!x) {
var E = this.hostname.split(/\./);
for (r = 0, n = E.length; n > r; r++) {
var w = E[r];
if (w && !w.match(f)) {
for (var C = "", S = 0, T = w.length; T > S; S++) C += w.charCodeAt(S) > 127 ? "x" : w[S];
if (!C.match(f)) {
var D = E.slice(0, r), L = E.slice(r + 1), F = w.match(d);
F && (D.push(F[1]), L.unshift(F[2])), L.length && (l = L.join(".") + l), this.hostname = D.join(".");
break;
}
}
}
}
this.hostname.length > h && (this.hostname = ""), x && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
}
var I = l.indexOf("#");
-1 !== I && (this.hash = l.substr(I), l = l.slice(0, I));
var R = l.indexOf("?");
return -1 !== R && (this.search = l.substr(R), l = l.slice(0, R)), l && (this.pathname = l), 
m[o] && this.hostname && !this.pathname && (this.pathname = ""), this;
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
var n, i, o, s, a = -1, c = e.posMax, l = e.pos;
for (e.pos = t + 1, n = 1; e.pos < c; ) {
if (o = e.src.charCodeAt(e.pos), 93 === o && (n--, 0 === n)) {
i = !0;
break;
}
if (s = e.pos, e.md.inline.skipToken(e), 91 === o) if (s === e.pos - 1) n++; else if (r) return e.pos = l, 
-1;
}
return i && (a = e.pos), e.pos = l, a;
};
}, function(e, t, r) {
"use strict";
var n = r(255).isSpace, i = r(255).unescapeAll;
e.exports = function(e, t, r) {
var o, s, a = 0, c = t, l = {
ok: !1,
pos: 0,
lines: 0,
str: ""
};
if (60 === e.charCodeAt(t)) {
for (t++; r > t; ) {
if (o = e.charCodeAt(t), 10 === o || n(o)) return l;
if (62 === o) return l.pos = t + 1, l.str = i(e.slice(c + 1, t)), l.ok = !0, l;
92 === o && r > t + 1 ? t += 2 : t++;
}
return l;
}
for (s = 0; r > t && (o = e.charCodeAt(t), 32 !== o) && !(32 > o || 127 === o); ) if (92 === o && r > t + 1) t += 2; else {
if (40 === o && (s++, s > 1)) break;
if (41 === o && (s--, 0 > s)) break;
t++;
}
return c === t ? l : (l.str = i(e.slice(c, t)), l.lines = a, l.pos = t, l.ok = !0, 
l);
};
}, function(e, t, r) {
"use strict";
var n = r(255).unescapeAll;
e.exports = function(e, t, r) {
var i, o, s = 0, a = t, c = {
ok: !1,
pos: 0,
lines: 0,
str: ""
};
if (t >= r) return c;
if (o = e.charCodeAt(t), 34 !== o && 39 !== o && 40 !== o) return c;
for (t++, 40 === o && (o = 41); r > t; ) {
if (i = e.charCodeAt(t), i === o) return c.pos = t + 1, c.lines = s, c.str = n(e.slice(a + 1, t)), 
c.ok = !0, c;
10 === i ? s++ : 92 === i && r > t + 1 && (t++, 10 === e.charCodeAt(t) && s++), 
t++;
}
return c;
};
}, function(e, t, r) {
"use strict";
function n() {
this.rules = i({}, a);
}
var i = r(255).assign, o = r(255).unescapeAll, s = r(255).escapeHtml, a = {};
a.code_inline = function(e, t) {
return "<code>" + s(e[t].content) + "</code>";
}, a.code_block = function(e, t) {
return "<pre><code>" + s(e[t].content) + "</code></pre>\n";
}, a.fence = function(e, t, r, n, i) {
var a, c = e[t], l = c.info ? o(c.info).trim() : "", u = "";
return l && (u = l.split(/\s+/g)[0], c.attrJoin("class", r.langPrefix + u)), a = r.highlight ? r.highlight(c.content, u) || s(c.content) : s(c.content), 
0 === a.indexOf("<pre") ? a + "\n" : "<pre><code" + i.renderAttrs(c) + ">" + a + "</code></pre>\n";
}, a.image = function(e, t, r, n, i) {
var o = e[t];
return o.attrs[o.attrIndex("alt")][1] = i.renderInlineAsText(o.children, r, n), 
i.renderToken(e, t, r);
}, a.hardbreak = function(e, t, r) {
return r.xhtmlOut ? "<br />\n" : "<br>\n";
}, a.softbreak = function(e, t, r) {
return r.breaks ? r.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
}, a.text = function(e, t) {
return s(e[t].content);
}, a.html_block = function(e, t) {
return e[t].content;
}, a.html_inline = function(e, t) {
return e[t].content;
}, n.prototype.renderAttrs = function(e) {
var t, r, n;
if (!e.attrs) return "";
for (n = "", t = 0, r = e.attrs.length; r > t; t++) n += " " + s(e.attrs[t][0]) + '="' + s(e.attrs[t][1]) + '"';
return n;
}, n.prototype.renderToken = function(e, t, r) {
var n, i = "", o = !1, s = e[t];
return s.hidden ? "" : (s.block && -1 !== s.nesting && t && e[t - 1].hidden && (i += "\n"), 
i += (-1 === s.nesting ? "</" : "<") + s.tag, i += this.renderAttrs(s), 0 === s.nesting && r.xhtmlOut && (i += " /"), 
s.block && (o = !0, 1 === s.nesting && t + 1 < e.length && (n = e[t + 1], "inline" === n.type || n.hidden ? o = !1 : -1 === n.nesting && n.tag === s.tag && (o = !1))), 
i += o ? ">\n" : ">");
}, n.prototype.renderInline = function(e, t, r) {
for (var n, i = "", o = this.rules, s = 0, a = e.length; a > s; s++) n = e[s].type, 
i += void 0 !== o[n] ? o[n](e, s, t, r, this) : this.renderToken(e, s, t);
return i;
}, n.prototype.renderInlineAsText = function(e, t, r) {
for (var n = "", i = this.rules, o = 0, s = e.length; s > o; o++) "text" === e[o].type ? n += i.text(e, o, t, r, this) : "image" === e[o].type && (n += this.renderInlineAsText(e[o].children, t, r));
return n;
}, n.prototype.render = function(e, t, r) {
var n, i, o, s = "", a = this.rules;
for (n = 0, i = e.length; i > n; n++) o = e[n].type, s += "inline" === o ? this.renderInline(e[n].children, t, r) : void 0 !== a[o] ? a[e[n].type](e, n, t, r, this) : this.renderToken(e, n, t, r);
return s;
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
var t, r, s, a, c, l, u, p, h, f, d, g, m, b, v, k, _, y = e.tokens;
if (e.md.options.linkify) for (r = 0, s = y.length; s > r; r++) if ("inline" === y[r].type && e.md.linkify.pretest(y[r].content)) for (a = y[r].children, 
m = 0, t = a.length - 1; t >= 0; t--) if (l = a[t], "link_close" !== l.type) {
if ("html_inline" === l.type && (n(l.content) && m > 0 && m--, i(l.content) && m++), 
!(m > 0) && "text" === l.type && e.md.linkify.test(l.content)) {
for (h = l.content, _ = e.md.linkify.match(h), u = [], g = l.level, d = 0, p = 0; p < _.length; p++) b = _[p].url, 
v = e.md.normalizeLink(b), e.md.validateLink(v) && (k = _[p].text, k = _[p].schema ? "mailto:" !== _[p].schema || /^mailto:/i.test(k) ? e.md.normalizeLinkText(k) : e.md.normalizeLinkText("mailto:" + k).replace(/^mailto:/, "") : e.md.normalizeLinkText("http://" + k).replace(/^http:\/\//, ""), 
f = _[p].index, f > d && (c = new e.Token("text", "", 0), c.content = h.slice(d, f), 
c.level = g, u.push(c)), c = new e.Token("link_open", "a", 1), c.attrs = [ [ "href", v ] ], 
c.level = g++, c.markup = "linkify", c.info = "auto", u.push(c), c = new e.Token("text", "", 0), 
c.content = k, c.level = g, u.push(c), c = new e.Token("link_close", "a", -1), c.level = --g, 
c.markup = "linkify", c.info = "auto", u.push(c), d = _[p].lastIndex);
d < h.length && (c = new e.Token("text", "", 0), c.content = h.slice(d), c.level = g, 
u.push(c)), y[r].children = a = o(a, t, u);
}
} else for (t--; a[t].level !== l.level && "link_open" !== a[t].type; ) t--;
};
}, function(e, t) {
"use strict";
function r(e, t) {
return c[t.toLowerCase()];
}
function n(e) {
var t, n;
for (t = e.length - 1; t >= 0; t--) n = e[t], "text" === n.type && (n.content = n.content.replace(a, r));
}
function i(e) {
var t, r;
for (t = e.length - 1; t >= 0; t--) r = e[t], "text" === r.type && o.test(r.content) && (r.content = r.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1—$2").replace(/(^|\s)--(\s|$)/gm, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1–$2"));
}
var o = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, s = /\((c|tm|r|p)\)/i, a = /\((c|tm|r|p)\)/gi, c = {
c: "©",
r: "®",
p: "§",
tm: "™"
};
e.exports = function(e) {
var t;
if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && (s.test(e.tokens[t].content) && n(e.tokens[t].children), 
o.test(e.tokens[t].content) && i(e.tokens[t].children));
};
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
return e.substr(0, t) + r + e.substr(t + 1);
}
function i(e, t) {
var r, i, c, p, h, f, d, g, m, b, v, k, _, y, A, x, E, w, C, S, T;
for (C = [], r = 0; r < e.length; r++) {
for (i = e[r], d = e[r].level, E = C.length - 1; E >= 0 && !(C[E].level <= d); E--) ;
if (C.length = E + 1, "text" === i.type) {
c = i.content, h = 0, f = c.length;
e: for (;f > h && (l.lastIndex = h, p = l.exec(c)); ) {
if (A = x = !0, h = p.index + 1, w = "'" === p[0], m = 32, p.index - 1 >= 0) m = c.charCodeAt(p.index - 1); else for (E = r - 1; E >= 0; E--) if ("text" === e[E].type) {
m = e[E].content.charCodeAt(e[E].content.length - 1);
break;
}
if (b = 32, f > h) b = c.charCodeAt(h); else for (E = r + 1; E < e.length; E++) if ("text" === e[E].type) {
b = e[E].content.charCodeAt(0);
break;
}
if (v = a(m) || s(String.fromCharCode(m)), k = a(b) || s(String.fromCharCode(b)), 
_ = o(m), y = o(b), y ? A = !1 : k && (_ || v || (A = !1)), _ ? x = !1 : v && (y || k || (x = !1)), 
34 === b && '"' === p[0] && m >= 48 && 57 >= m && (x = A = !1), A && x && (A = !1, 
x = k), A || x) {
if (x) for (E = C.length - 1; E >= 0 && (g = C[E], !(C[E].level < d)); E--) if (g.single === w && C[E].level === d) {
g = C[E], w ? (S = t.md.options.quotes[2], T = t.md.options.quotes[3]) : (S = t.md.options.quotes[0], 
T = t.md.options.quotes[1]), i.content = n(i.content, p.index, T), e[g.token].content = n(e[g.token].content, g.pos, S), 
h += T.length - 1, g.token === r && (h += S.length - 1), c = i.content, f = c.length, 
C.length = E;
continue e;
}
A ? C.push({
token: r,
pos: p.index,
single: w,
level: d
}) : x && w && (i.content = n(i.content, p.index, u));
} else w && (i.content = n(i.content, p.index, u));
}
}
}
}
var o = r(255).isWhiteSpace, s = r(255).isPunctChar, a = r(255).isMdAsciiPunct, c = /['"]/, l = /['"]/g, u = "’";
e.exports = function(e) {
var t;
if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && c.test(e.tokens[t].content) && i(e.tokens[t].children, e);
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
for (var n, i, o = this.ruler.getRules(""), s = o.length, a = t, c = !1, l = e.md.options.maxNesting; r > a && (e.line = a = e.skipEmptyLines(a), 
!(a >= r)) && !(e.sCount[a] < e.blkIndent); ) {
if (e.level >= l) {
e.line = r;
break;
}
for (i = 0; s > i && !(n = o[i](e, a, r, !1)); i++) ;
if (e.tight = !c, e.isEmpty(e.line - 1) && (c = !0), a = e.line, r > a && e.isEmpty(a)) {
if (c = !0, a++, r > a && "list" === e.parentType && e.isEmpty(a)) break;
e.line = a;
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
var t, r = [], n = 0, i = e.length, o = 0, s = 0, a = !1, c = 0;
for (t = e.charCodeAt(n); i > n; ) 96 === t && o % 2 === 0 ? (a = !a, c = n) : 124 !== t || o % 2 !== 0 || a ? 92 === t ? o++ : o = 0 : (r.push(e.substring(s, n)), 
s = n + 1), n++, n === i && a && (a = !1, n = c + 1), t = e.charCodeAt(n);
return r.push(e.substring(s)), r;
}
e.exports = function(e, t, i, o) {
var s, a, c, l, u, p, h, f, d, g, m, b;
if (t + 2 > i) return !1;
if (u = t + 1, e.sCount[u] < e.blkIndent) return !1;
if (c = e.bMarks[u] + e.tShift[u], c >= e.eMarks[u]) return !1;
if (s = e.src.charCodeAt(c), 124 !== s && 45 !== s && 58 !== s) return !1;
if (a = r(e, t + 1), !/^[-:| ]+$/.test(a)) return !1;
for (p = a.split("|"), d = [], l = 0; l < p.length; l++) {
if (g = p[l].trim(), !g) {
if (0 === l || l === p.length - 1) continue;
return !1;
}
if (!/^:?-+:?$/.test(g)) return !1;
58 === g.charCodeAt(g.length - 1) ? d.push(58 === g.charCodeAt(0) ? "center" : "right") : 58 === g.charCodeAt(0) ? d.push("left") : d.push("");
}
if (a = r(e, t).trim(), -1 === a.indexOf("|")) return !1;
if (p = n(a.replace(/^\||\|$/g, "")), h = p.length, h > d.length) return !1;
if (o) return !0;
for (f = e.push("table_open", "table", 1), f.map = m = [ t, 0 ], f = e.push("thead_open", "thead", 1), 
f.map = [ t, t + 1 ], f = e.push("tr_open", "tr", 1), f.map = [ t, t + 1 ], l = 0; l < p.length; l++) f = e.push("th_open", "th", 1), 
f.map = [ t, t + 1 ], d[l] && (f.attrs = [ [ "style", "text-align:" + d[l] ] ]), 
f = e.push("inline", "", 0), f.content = p[l].trim(), f.map = [ t, t + 1 ], f.children = [], 
f = e.push("th_close", "th", -1);
for (f = e.push("tr_close", "tr", -1), f = e.push("thead_close", "thead", -1), f = e.push("tbody_open", "tbody", 1), 
f.map = b = [ t + 2, 0 ], u = t + 2; i > u && !(e.sCount[u] < e.blkIndent) && (a = r(e, u).trim(), 
-1 !== a.indexOf("|")); u++) {
for (p = n(a.replace(/^\||\|$/g, "")), f = e.push("tr_open", "tr", 1), l = 0; h > l; l++) f = e.push("td_open", "td", 1), 
d[l] && (f.attrs = [ [ "style", "text-align:" + d[l] ] ]), f = e.push("inline", "", 0), 
f.content = p[l] ? p[l].trim() : "", f.children = [], f = e.push("td_close", "td", -1);
f = e.push("tr_close", "tr", -1);
}
return f = e.push("tbody_close", "tbody", -1), f = e.push("table_close", "table", -1), 
m[1] = b[1] = u, e.line = u, !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
var n, i, o, s = 0;
if (e.sCount[t] - e.blkIndent < 4) return !1;
for (i = n = t + 1; r > n; ) if (e.isEmpty(n)) {
if (s++, s >= 2 && "list" === e.parentType) break;
n++;
} else {
if (s = 0, !(e.sCount[n] - e.blkIndent >= 4)) break;
n++, i = n;
}
return e.line = i, o = e.push("code_block", "code", 0), o.content = e.getLines(t, i, 4 + e.blkIndent, !0), 
o.map = [ t, e.line ], !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r, n) {
var i, o, s, a, c, l, u, p = !1, h = e.bMarks[t] + e.tShift[t], f = e.eMarks[t];
if (h + 3 > f) return !1;
if (i = e.src.charCodeAt(h), 126 !== i && 96 !== i) return !1;
if (c = h, h = e.skipChars(h, i), o = h - c, 3 > o) return !1;
if (u = e.src.slice(c, h), s = e.src.slice(h, f), s.indexOf("`") >= 0) return !1;
if (n) return !0;
for (a = t; (a++, !(a >= r)) && (h = c = e.bMarks[a] + e.tShift[a], f = e.eMarks[a], 
!(f > h && e.sCount[a] < e.blkIndent)); ) if (e.src.charCodeAt(h) === i && !(e.sCount[a] - e.blkIndent >= 4 || (h = e.skipChars(h, i), 
o > h - c || (h = e.skipSpaces(h), f > h)))) {
p = !0;
break;
}
return o = e.sCount[t], e.line = a + (p ? 1 : 0), l = e.push("fence", "code", 0), 
l.info = s, l.content = e.getLines(t + 1, a, o, !0), l.markup = u, l.map = [ t, e.line ], 
!0;
};
}, function(e, t, r) {
"use strict";
var n = r(255).isSpace;
e.exports = function(e, t, r, i) {
var o, s, a, c, l, u, p, h, f, d, g, m, b, v, k, _, y = e.bMarks[t] + e.tShift[t], A = e.eMarks[t];
if (62 !== e.src.charCodeAt(y++)) return !1;
if (i) return !0;
for (32 === e.src.charCodeAt(y) && y++, u = e.blkIndent, e.blkIndent = 0, f = d = e.sCount[t] + y - (e.bMarks[t] + e.tShift[t]), 
l = [ e.bMarks[t] ], e.bMarks[t] = y; A > y && (g = e.src.charCodeAt(y), n(g)); ) 9 === g ? d += 4 - d % 4 : d++, 
y++;
for (s = y >= A, c = [ e.sCount[t] ], e.sCount[t] = d - f, a = [ e.tShift[t] ], 
e.tShift[t] = y - e.bMarks[t], m = e.md.block.ruler.getRules("blockquote"), o = t + 1; r > o && !(e.sCount[o] < u) && (y = e.bMarks[o] + e.tShift[o], 
A = e.eMarks[o], !(y >= A)); o++) if (62 !== e.src.charCodeAt(y++)) {
if (s) break;
for (_ = !1, v = 0, k = m.length; k > v; v++) if (m[v](e, o, r, !0)) {
_ = !0;
break;
}
if (_) break;
l.push(e.bMarks[o]), a.push(e.tShift[o]), c.push(e.sCount[o]), e.sCount[o] = -1;
} else {
for (32 === e.src.charCodeAt(y) && y++, f = d = e.sCount[o] + y - (e.bMarks[o] + e.tShift[o]), 
l.push(e.bMarks[o]), e.bMarks[o] = y; A > y && (g = e.src.charCodeAt(y), n(g)); ) 9 === g ? d += 4 - d % 4 : d++, 
y++;
s = y >= A, c.push(e.sCount[o]), e.sCount[o] = d - f, a.push(e.tShift[o]), e.tShift[o] = y - e.bMarks[o];
}
for (p = e.parentType, e.parentType = "blockquote", b = e.push("blockquote_open", "blockquote", 1), 
b.markup = ">", b.map = h = [ t, 0 ], e.md.block.tokenize(e, t, o), b = e.push("blockquote_close", "blockquote", -1), 
b.markup = ">", e.parentType = p, h[1] = e.line, v = 0; v < a.length; v++) e.bMarks[v + t] = l[v], 
e.tShift[v + t] = a[v], e.sCount[v + t] = c[v];
return e.blkIndent = u, !0;
};
}, function(e, t, r) {
"use strict";
var n = r(255).isSpace;
e.exports = function(e, t, r, i) {
var o, s, a, c, l = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (o = e.src.charCodeAt(l++), 42 !== o && 45 !== o && 95 !== o) return !1;
for (s = 1; u > l; ) {
if (a = e.src.charCodeAt(l++), a !== o && !n(a)) return !1;
a === o && s++;
}
return 3 > s ? !1 : i ? !0 : (e.line = t + 1, c = e.push("hr", "hr", 0), c.map = [ t, e.line ], 
c.markup = Array(s + 1).join(String.fromCharCode(o)), !0);
};
}, function(e, t, r) {
"use strict";
function n(e, t) {
var r, n, i, o;
return n = e.bMarks[t] + e.tShift[t], i = e.eMarks[t], r = e.src.charCodeAt(n++), 
42 !== r && 45 !== r && 43 !== r ? -1 : i > n && (o = e.src.charCodeAt(n), !s(o)) ? -1 : n;
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
return o > i && (r = e.src.charCodeAt(i), !s(r)) ? -1 : i;
}
function o(e, t) {
var r, n, i = e.level + 2;
for (r = t + 2, n = e.tokens.length - 2; n > r; r++) e.tokens[r].level === i && "paragraph_open" === e.tokens[r].type && (e.tokens[r + 2].hidden = !0, 
e.tokens[r].hidden = !0, r += 2);
}
var s = r(255).isSpace;
e.exports = function(e, t, r, a) {
var c, l, u, p, h, f, d, g, m, b, v, k, _, y, A, x, E, w, C, S, T, D, L, F, I, R, O, q, N = !0;
if ((v = i(e, t)) >= 0) w = !0; else {
if (!((v = n(e, t)) >= 0)) return !1;
w = !1;
}
if (E = e.src.charCodeAt(v - 1), a) return !0;
for (S = e.tokens.length, w ? (b = e.bMarks[t] + e.tShift[t], x = +e.src.substr(b, v - b - 1), 
I = e.push("ordered_list_open", "ol", 1), 1 !== x && (I.attrs = [ [ "start", x ] ])) : I = e.push("bullet_list_open", "ul", 1), 
I.map = D = [ t, 0 ], I.markup = String.fromCharCode(E), c = t, T = !1, F = e.md.block.ruler.getRules("list"); r > c; ) {
for (_ = v, y = e.eMarks[c], l = u = e.sCount[c] + v - (e.bMarks[t] + e.tShift[t]); y > _ && (k = e.src.charCodeAt(_), 
s(k)); ) 9 === k ? u += 4 - u % 4 : u++, _++;
if (C = _, A = C >= y ? 1 : u - l, A > 4 && (A = 1), p = l + A, I = e.push("list_item_open", "li", 1), 
I.markup = String.fromCharCode(E), I.map = L = [ t, 0 ], f = e.blkIndent, g = e.tight, 
h = e.tShift[t], d = e.sCount[t], m = e.parentType, e.blkIndent = p, e.tight = !0, 
e.parentType = "list", e.tShift[t] = C - e.bMarks[t], e.sCount[t] = u, C >= y && e.isEmpty(t + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, t, r, !0), 
(!e.tight || T) && (N = !1), T = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = f, 
e.tShift[t] = h, e.sCount[t] = d, e.tight = g, e.parentType = m, I = e.push("list_item_close", "li", -1), 
I.markup = String.fromCharCode(E), c = t = e.line, L[1] = c, C = e.bMarks[t], c >= r) break;
if (e.isEmpty(c)) break;
if (e.sCount[c] < e.blkIndent) break;
for (q = !1, R = 0, O = F.length; O > R; R++) if (F[R](e, c, r, !0)) {
q = !0;
break;
}
if (q) break;
if (w) {
if (v = i(e, c), 0 > v) break;
} else if (v = n(e, c), 0 > v) break;
if (E !== e.src.charCodeAt(v - 1)) break;
}
return I = w ? e.push("ordered_list_close", "ol", -1) : e.push("bullet_list_close", "ul", -1), 
I.markup = String.fromCharCode(E), D[1] = c, e.line = c, N && o(e, S), !0;
};
}, function(e, t, r) {
"use strict";
var n = r(271), i = r(272), o = r(255).normalizeReference, s = r(255).isSpace;
e.exports = function(e, t, r, a) {
var c, l, u, p, h, f, d, g, m, b, v, k, _, y, A, x = 0, E = e.bMarks[t] + e.tShift[t], w = e.eMarks[t], C = t + 1;
if (91 !== e.src.charCodeAt(E)) return !1;
for (;++E < w; ) if (93 === e.src.charCodeAt(E) && 92 !== e.src.charCodeAt(E - 1)) {
if (E + 1 === w) return !1;
if (58 !== e.src.charCodeAt(E + 1)) return !1;
break;
}
for (p = e.lineMax, y = e.md.block.ruler.getRules("reference"); p > C && !e.isEmpty(C); C++) if (!(e.sCount[C] - e.blkIndent > 3 || e.sCount[C] < 0)) {
for (_ = !1, f = 0, d = y.length; d > f; f++) if (y[f](e, C, p, !0)) {
_ = !0;
break;
}
if (_) break;
}
for (k = e.getLines(t, C, e.blkIndent, !1).trim(), w = k.length, E = 1; w > E; E++) {
if (c = k.charCodeAt(E), 91 === c) return !1;
if (93 === c) {
m = E;
break;
}
10 === c ? x++ : 92 === c && (E++, w > E && 10 === k.charCodeAt(E) && x++);
}
if (0 > m || 58 !== k.charCodeAt(m + 1)) return !1;
for (E = m + 2; w > E; E++) if (c = k.charCodeAt(E), 10 === c) x++; else if (!s(c)) break;
if (b = n(k, E, w), !b.ok) return !1;
if (h = e.md.normalizeLink(b.str), !e.md.validateLink(h)) return !1;
for (E = b.pos, x += b.lines, l = E, u = x, v = E; w > E; E++) if (c = k.charCodeAt(E), 
10 === c) x++; else if (!s(c)) break;
for (b = i(k, E, w), w > E && v !== E && b.ok ? (A = b.str, E = b.pos, x += b.lines) : (A = "", 
E = l, x = u); w > E && (c = k.charCodeAt(E), s(c)); ) E++;
if (w > E && 10 !== k.charCodeAt(E) && A) for (A = "", E = l, x = u; w > E && (c = k.charCodeAt(E), 
s(c)); ) E++;
return w > E && 10 !== k.charCodeAt(E) ? !1 : (g = o(k.slice(1, m))) ? a ? !0 : (void 0 === e.env.references && (e.env.references = {}), 
void 0 === e.env.references[g] && (e.env.references[g] = {
title: A,
href: h
}), e.line = t + x + 1, !0) : !1;
};
}, function(e, t, r) {
"use strict";
var n = r(255).isSpace;
e.exports = function(e, t, r, i) {
var o, s, a, c, l = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (o = e.src.charCodeAt(l), 35 !== o || l >= u) return !1;
for (s = 1, o = e.src.charCodeAt(++l); 35 === o && u > l && 6 >= s; ) s++, o = e.src.charCodeAt(++l);
return s > 6 || u > l && 32 !== o ? !1 : i ? !0 : (u = e.skipSpacesBack(u, l), a = e.skipCharsBack(u, 35, l), 
a > l && n(e.src.charCodeAt(a - 1)) && (u = a), e.line = t + 1, c = e.push("heading_open", "h" + (s + ""), 1), 
c.markup = "########".slice(0, s), c.map = [ t, e.line ], c = e.push("inline", "", 0), 
c.content = e.src.slice(l, u).trim(), c.map = [ t, e.line ], c.children = [], c = e.push("heading_close", "h" + (s + ""), -1), 
c.markup = "########".slice(0, s), !0);
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
for (var n, i, o, s, a, c, l, u, p, h = t + 1, f = e.md.block.ruler.getRules("paragraph"); r > h && !e.isEmpty(h); h++) if (!(e.sCount[h] - e.blkIndent > 3)) {
if (e.sCount[h] >= e.blkIndent && (c = e.bMarks[h] + e.tShift[h], l = e.eMarks[h], 
l > c && (p = e.src.charCodeAt(c), (45 === p || 61 === p) && (c = e.skipChars(c, p), 
c = e.skipSpaces(c), c >= l)))) {
u = 61 === p ? 1 : 2;
break;
}
if (!(e.sCount[h] < 0)) {
for (i = !1, o = 0, s = f.length; s > o; o++) if (f[o](e, h, r, !0)) {
i = !0;
break;
}
if (i) break;
}
}
return u ? (n = e.getLines(t, h, e.blkIndent, !1).trim(), e.line = h + 1, a = e.push("heading_open", "h" + (u + ""), 1), 
a.markup = String.fromCharCode(p), a.map = [ t, e.line ], a = e.push("inline", "", 0), 
a.content = n, a.map = [ t, e.line - 1 ], a.children = [], a = e.push("heading_close", "h" + (u + ""), -1), 
a.markup = String.fromCharCode(p), !0) : !1;
};
}, function(e, t, r) {
"use strict";
var n = r(295), i = r(296).HTML_OPEN_CLOSE_TAG_RE, o = [ [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, !0 ], [ /^<!--/, /-->/, !0 ], [ /^<\?/, /\?>/, !0 ], [ /^<![A-Z]/, />/, !0 ], [ /^<!\[CDATA\[/, /\]\]>/, !0 ], [ RegExp("^</?(" + n.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0 ], [ RegExp(i.source + "\\s*$"), /^$/, !1 ] ];
e.exports = function(e, t, r, n) {
var i, s, a, c, l = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (!e.md.options.html) return !1;
if (60 !== e.src.charCodeAt(l)) return !1;
for (c = e.src.slice(l, u), i = 0; i < o.length && !o[i][0].test(c); i++) ;
if (i === o.length) return !1;
if (n) return o[i][2];
if (s = t + 1, !o[i][1].test(c)) for (;r > s && !(e.sCount[s] < e.blkIndent); s++) if (l = e.bMarks[s] + e.tShift[s], 
u = e.eMarks[s], c = e.src.slice(l, u), o[i][1].test(c)) {
0 !== c.length && s++;
break;
}
return e.line = s, a = e.push("html_block", "", 0), a.map = [ t, s ], a.content = e.getLines(t, s, e.blkIndent, !0), 
!0;
};
}, function(e, t) {
"use strict";
e.exports = [ "address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "meta", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "pre", "section", "source", "title", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul" ];
}, function(e, t) {
"use strict";
var r = "[a-zA-Z_:][a-zA-Z0-9:._-]*", n = "[^\"'=<>`\\x00-\\x20]+", i = "'[^']*'", o = '"[^"]*"', s = "(?:" + n + "|" + i + "|" + o + ")", a = "(?:\\s+" + r + "(?:\\s*=\\s*" + s + ")?)", c = "<[A-Za-z][A-Za-z0-9\\-]*" + a + "*\\s*\\/?>", l = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", u = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", p = "<[?].*?[?]>", h = "<![A-Z]+\\s+[^>]*>", f = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", d = RegExp("^(?:" + c + "|" + l + "|" + u + "|" + p + "|" + h + "|" + f + ")"), g = RegExp("^(?:" + c + "|" + l + ")");
e.exports.HTML_TAG_RE = d, e.exports.HTML_OPEN_CLOSE_TAG_RE = g;
}, function(e, t) {
"use strict";
e.exports = function(e, t) {
for (var r, n, i, o, s, a = t + 1, c = e.md.block.ruler.getRules("paragraph"), l = e.lineMax; l > a && !e.isEmpty(a); a++) if (!(e.sCount[a] - e.blkIndent > 3 || e.sCount[a] < 0)) {
for (n = !1, i = 0, o = c.length; o > i; i++) if (c[i](e, a, l, !0)) {
n = !0;
break;
}
if (n) break;
}
return r = e.getLines(t, a, e.blkIndent, !1).trim(), e.line = a, s = e.push("paragraph_open", "p", 1), 
s.map = [ t, e.line ], s = e.push("inline", "", 0), s.content = r, s.map = [ t, e.line ], 
s.children = [], s = e.push("paragraph_close", "p", -1), !0;
};
}, function(e, t, r) {
"use strict";
function n(e, t, r, n) {
var i, s, a, c, l, u, p, h;
for (this.src = e, this.md = t, this.env = r, this.tokens = n, this.bMarks = [], 
this.eMarks = [], this.tShift = [], this.sCount = [], this.blkIndent = 0, this.line = 0, 
this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, 
this.level = 0, this.result = "", s = this.src, h = !1, a = c = u = p = 0, l = s.length; l > c; c++) {
if (i = s.charCodeAt(c), !h) {
if (o(i)) {
u++, 9 === i ? p += 4 - p % 4 : p++;
continue;
}
h = !0;
}
(10 === i || c === l - 1) && (10 !== i && c++, this.bMarks.push(a), this.eMarks.push(c), 
this.tShift.push(u), this.sCount.push(p), h = !1, u = 0, p = 0, a = c + 1);
}
this.bMarks.push(s.length), this.eMarks.push(s.length), this.tShift.push(0), this.sCount.push(0), 
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
var i, s, a, c, l, u, p, h = e;
if (e >= t) return "";
for (u = Array(t - e), i = 0; t > h; h++, i++) {
for (s = 0, p = c = this.bMarks[h], l = t > h + 1 || n ? this.eMarks[h] + 1 : this.eMarks[h]; l > c && r > s; ) {
if (a = this.src.charCodeAt(c), o(a)) 9 === a ? s += 4 - s % 4 : s++; else {
if (!(c - p < this.tShift[h])) break;
s++;
}
c++;
}
u[i] = this.src.slice(c, l);
}
return u.join("");
}, n.prototype.Token = i, e.exports = n;
}, function(e, t, r) {
"use strict";
function n() {
var e;
for (this.ruler = new i(), e = 0; e < o.length; e++) this.ruler.push(o[e][0], o[e][1]);
for (this.ruler2 = new i(), e = 0; e < s.length; e++) this.ruler2.push(s[e][0], s[e][1]);
}
var i = r(275), o = [ [ "text", r(300) ], [ "newline", r(301) ], [ "escape", r(302) ], [ "backticks", r(303) ], [ "strikethrough", r(304).tokenize ], [ "emphasis", r(305).tokenize ], [ "link", r(306) ], [ "image", r(307) ], [ "autolink", r(308) ], [ "html_inline", r(310) ], [ "entity", r(311) ] ], s = [ [ "balance_pairs", r(312) ], [ "strikethrough", r(304).postProcess ], [ "emphasis", r(305).postProcess ], [ "text_collapse", r(313) ] ];
n.prototype.skipToken = function(e) {
var t, r, n = e.pos, i = this.ruler.getRules(""), o = i.length, s = e.md.options.maxNesting, a = e.cache;
if (void 0 !== a[n]) return void (e.pos = a[n]);
if (e.level < s) for (r = 0; o > r && (e.level++, t = i[r](e, !0), e.level--, !t); r++) ; else e.pos = e.posMax;
t || e.pos++, a[n] = e.pos;
}, n.prototype.tokenize = function(e) {
for (var t, r, n = this.ruler.getRules(""), i = n.length, o = e.posMax, s = e.md.options.maxNesting; e.pos < o; ) {
if (e.level < s) for (r = 0; i > r && !(t = n[r](e, !1)); r++) ;
if (t) {
if (e.pos >= o) break;
} else e.pending += e.src[e.pos++];
}
e.pending && e.pushPending();
}, n.prototype.parse = function(e, t, r, n) {
var i, o, s, a = new this.State(e, t, r, n);
for (this.tokenize(a), o = this.ruler2.getRules(""), s = o.length, i = 0; s > i; i++) o[i](a);
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
var r, o = e.pos, s = e.posMax;
if (92 !== e.src.charCodeAt(o)) return !1;
if (o++, s > o) {
if (r = e.src.charCodeAt(o), 256 > r && 0 !== i[r]) return t || (e.pending += e.src[o]), 
e.pos += 2, !0;
if (10 === r) {
for (t || e.push("hardbreak", "br", 0), o++; s > o && (r = e.src.charCodeAt(o), 
n(r)); ) o++;
return e.pos = o, !0;
}
}
return t || (e.pending += "\\"), e.pos++, !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e, t) {
var r, n, i, o, s, a, c = e.pos, l = e.src.charCodeAt(c);
if (96 !== l) return !1;
for (r = c, c++, n = e.posMax; n > c && 96 === e.src.charCodeAt(c); ) c++;
for (i = e.src.slice(r, c), o = s = c; -1 !== (o = e.src.indexOf("`", s)); ) {
for (s = o + 1; n > s && 96 === e.src.charCodeAt(s); ) s++;
if (s - o === i.length) return t || (a = e.push("code_inline", "code", 0), a.markup = i, 
a.content = e.src.slice(c, o).replace(/[ \n]+/g, " ").trim()), e.pos = s, !0;
}
return t || (e.pending += i), e.pos += i.length, !0;
};
}, function(e, t) {
"use strict";
e.exports.tokenize = function(e, t) {
var r, n, i, o, s, a = e.pos, c = e.src.charCodeAt(a);
if (t) return !1;
if (126 !== c) return !1;
if (n = e.scanDelims(e.pos, !0), o = n.length, s = String.fromCharCode(c), 2 > o) return !1;
for (o % 2 && (i = e.push("text", "", 0), i.content = s, o--), r = 0; o > r; r += 2) i = e.push("text", "", 0), 
i.content = s + s, e.delimiters.push({
marker: c,
jump: r,
token: e.tokens.length - 1,
level: e.level,
end: -1,
open: n.can_open,
close: n.can_close
});
return e.pos += n.length, !0;
}, e.exports.postProcess = function(e) {
var t, r, n, i, o, s = [], a = e.delimiters, c = e.delimiters.length;
for (t = 0; c > t; t++) n = a[t], 126 === n.marker && -1 !== n.end && (i = a[n.end], 
o = e.tokens[n.token], o.type = "s_open", o.tag = "s", o.nesting = 1, o.markup = "~~", 
o.content = "", o = e.tokens[i.token], o.type = "s_close", o.tag = "s", o.nesting = -1, 
o.markup = "~~", o.content = "", "text" === e.tokens[i.token - 1].type && "~" === e.tokens[i.token - 1].content && s.push(i.token - 1));
for (;s.length; ) {
for (t = s.pop(), r = t + 1; r < e.tokens.length && "s_close" === e.tokens[r].type; ) r++;
r--, t !== r && (o = e.tokens[r], e.tokens[r] = e.tokens[t], e.tokens[t] = o);
}
};
}, function(e, t) {
"use strict";
e.exports.tokenize = function(e, t) {
var r, n, i, o = e.pos, s = e.src.charCodeAt(o);
if (t) return !1;
if (95 !== s && 42 !== s) return !1;
for (n = e.scanDelims(e.pos, 42 === s), r = 0; r < n.length; r++) i = e.push("text", "", 0), 
i.content = String.fromCharCode(s), e.delimiters.push({
marker: s,
jump: r,
token: e.tokens.length - 1,
level: e.level,
end: -1,
open: n.can_open,
close: n.can_close
});
return e.pos += n.length, !0;
}, e.exports.postProcess = function(e) {
var t, r, n, i, o, s, a = e.delimiters, c = e.delimiters.length;
for (t = 0; c > t; t++) r = a[t], (95 === r.marker || 42 === r.marker) && -1 !== r.end && (n = a[r.end], 
s = c > t + 1 && a[t + 1].end === r.end - 1 && a[t + 1].token === r.token + 1 && a[r.end - 1].token === n.token - 1 && a[t + 1].marker === r.marker, 
o = String.fromCharCode(r.marker), i = e.tokens[r.token], i.type = s ? "strong_open" : "em_open", 
i.tag = s ? "strong" : "em", i.nesting = 1, i.markup = s ? o + o : o, i.content = "", 
i = e.tokens[n.token], i.type = s ? "strong_close" : "em_close", i.tag = s ? "strong" : "em", 
i.nesting = -1, i.markup = s ? o + o : o, i.content = "", s && (e.tokens[a[t + 1].token].content = "", 
e.tokens[a[r.end - 1].token].content = "", t++));
};
}, function(e, t, r) {
"use strict";
var n = r(270), i = r(271), o = r(272), s = r(255).normalizeReference, a = r(255).isSpace;
e.exports = function(e, t) {
var r, c, l, u, p, h, f, d, g, m, b = "", v = e.pos, k = e.posMax, _ = e.pos;
if (91 !== e.src.charCodeAt(e.pos)) return !1;
if (p = e.pos + 1, u = n(e, e.pos, !0), 0 > u) return !1;
if (h = u + 1, k > h && 40 === e.src.charCodeAt(h)) {
for (h++; k > h && (c = e.src.charCodeAt(h), a(c) || 10 === c); h++) ;
if (h >= k) return !1;
for (_ = h, f = i(e.src, h, e.posMax), f.ok && (b = e.md.normalizeLink(f.str), e.md.validateLink(b) ? h = f.pos : b = ""), 
_ = h; k > h && (c = e.src.charCodeAt(h), a(c) || 10 === c); h++) ;
if (f = o(e.src, h, e.posMax), k > h && _ !== h && f.ok) for (g = f.str, h = f.pos; k > h && (c = e.src.charCodeAt(h), 
a(c) || 10 === c); h++) ; else g = "";
if (h >= k || 41 !== e.src.charCodeAt(h)) return e.pos = v, !1;
h++;
} else {
if (void 0 === e.env.references) return !1;
if (k > h && 91 === e.src.charCodeAt(h) ? (_ = h + 1, h = n(e, h), h >= 0 ? l = e.src.slice(_, h++) : h = u + 1) : h = u + 1, 
l || (l = e.src.slice(p, u)), d = e.env.references[s(l)], !d) return e.pos = v, 
!1;
b = d.href, g = d.title;
}
return t || (e.pos = p, e.posMax = u, m = e.push("link_open", "a", 1), m.attrs = r = [ [ "href", b ] ], 
g && r.push([ "title", g ]), e.md.inline.tokenize(e), m = e.push("link_close", "a", -1)), 
e.pos = h, e.posMax = k, !0;
};
}, function(e, t, r) {
"use strict";
var n = r(270), i = r(271), o = r(272), s = r(255).normalizeReference, a = r(255).isSpace;
e.exports = function(e, t) {
var r, c, l, u, p, h, f, d, g, m, b, v, k, _ = "", y = e.pos, A = e.posMax;
if (33 !== e.src.charCodeAt(e.pos)) return !1;
if (91 !== e.src.charCodeAt(e.pos + 1)) return !1;
if (h = e.pos + 2, p = n(e, e.pos + 1, !1), 0 > p) return !1;
if (f = p + 1, A > f && 40 === e.src.charCodeAt(f)) {
for (f++; A > f && (c = e.src.charCodeAt(f), a(c) || 10 === c); f++) ;
if (f >= A) return !1;
for (k = f, g = i(e.src, f, e.posMax), g.ok && (_ = e.md.normalizeLink(g.str), e.md.validateLink(_) ? f = g.pos : _ = ""), 
k = f; A > f && (c = e.src.charCodeAt(f), a(c) || 10 === c); f++) ;
if (g = o(e.src, f, e.posMax), A > f && k !== f && g.ok) for (m = g.str, f = g.pos; A > f && (c = e.src.charCodeAt(f), 
a(c) || 10 === c); f++) ; else m = "";
if (f >= A || 41 !== e.src.charCodeAt(f)) return e.pos = y, !1;
f++;
} else {
if (void 0 === e.env.references) return !1;
if (A > f && 91 === e.src.charCodeAt(f) ? (k = f + 1, f = n(e, f), f >= 0 ? u = e.src.slice(k, f++) : f = p + 1) : f = p + 1, 
u || (u = e.src.slice(h, p)), d = e.env.references[s(u)], !d) return e.pos = y, 
!1;
_ = d.href, m = d.title;
}
return t || (l = e.src.slice(h, p), e.md.inline.parse(l, e.md, e.env, v = []), b = e.push("image", "img", 0), 
b.attrs = r = [ [ "src", _ ], [ "alt", "" ] ], b.children = v, b.content = l, m && r.push([ "title", m ])), 
e.pos = f, e.posMax = A, !0;
};
}, function(e, t) {
"use strict";
var r = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/, n = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;
e.exports = function(e, t) {
var i, o, s, a, c, l, u = e.pos;
return 60 !== e.src.charCodeAt(u) ? !1 : (i = e.src.slice(u), i.indexOf(">") < 0 ? !1 : n.test(i) ? (o = i.match(n), 
a = o[0].slice(1, -1), c = e.md.normalizeLink(a), e.md.validateLink(c) ? (t || (l = e.push("link_open", "a", 1), 
l.attrs = [ [ "href", c ] ], l.markup = "autolink", l.info = "auto", l = e.push("text", "", 0), 
l.content = e.md.normalizeLinkText(a), l = e.push("link_close", "a", -1), l.markup = "autolink", 
l.info = "auto"), e.pos += o[0].length, !0) : !1) : r.test(i) ? (s = i.match(r), 
a = s[0].slice(1, -1), c = e.md.normalizeLink("mailto:" + a), e.md.validateLink(c) ? (t || (l = e.push("link_open", "a", 1), 
l.attrs = [ [ "href", c ] ], l.markup = "autolink", l.info = "auto", l = e.push("text", "", 0), 
l.content = e.md.normalizeLinkText(a), l = e.push("link_close", "a", -1), l.markup = "autolink", 
l.info = "auto"), e.pos += s[0].length, !0) : !1) : !1);
};
}, , function(e, t, r) {
"use strict";
function n(e) {
var t = 32 | e;
return t >= 97 && 122 >= t;
}
var i = r(296).HTML_TAG_RE;
e.exports = function(e, t) {
var r, o, s, a, c = e.pos;
return e.md.options.html ? (s = e.posMax, 60 !== e.src.charCodeAt(c) || c + 2 >= s ? !1 : (r = e.src.charCodeAt(c + 1), 
(33 === r || 63 === r || 47 === r || n(r)) && (o = e.src.slice(c).match(i)) ? (t || (a = e.push("html_inline", "", 0), 
a.content = e.src.slice(c, c + o[0].length)), e.pos += o[0].length, !0) : !1)) : !1;
};
}, function(e, t, r) {
"use strict";
var n = r(256), i = r(255).has, o = r(255).isValidEntityCode, s = r(255).fromCodePoint, a = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i, c = /^&([a-z][a-z0-9]{1,31});/i;
e.exports = function(e, t) {
var r, l, u, p = e.pos, h = e.posMax;
if (38 !== e.src.charCodeAt(p)) return !1;
if (h > p + 1) if (r = e.src.charCodeAt(p + 1), 35 === r) {
if (u = e.src.slice(p).match(a)) return t || (l = "x" === u[1][0].toLowerCase() ? parseInt(u[1].slice(1), 16) : parseInt(u[1], 10), 
e.pending += s(o(l) ? l : 65533)), e.pos += u[0].length, !0;
} else if (u = e.src.slice(p).match(c), u && i(n, u[1])) return t || (e.pending += n[u[1]]), 
e.pos += u[0].length, !0;
return t || (e.pending += "&"), e.pos++, !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e) {
var t, r, n, i, o = e.delimiters, s = e.delimiters.length;
for (t = 0; s > t; t++) if (n = o[t], n.close) for (r = t - n.jump - 1; r >= 0; ) {
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
var i = r(283), o = r(255).isWhiteSpace, s = r(255).isPunctChar, a = r(255).isMdAsciiPunct;
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
var r, n, i, c, l, u, p, h, f, d = e, g = !0, m = !0, b = this.posMax, v = this.src.charCodeAt(e);
for (r = e > 0 ? this.src.charCodeAt(e - 1) : 32; b > d && this.src.charCodeAt(d) === v; ) d++;
return i = d - e, n = b > d ? this.src.charCodeAt(d) : 32, p = a(r) || s(String.fromCharCode(r)), 
f = a(n) || s(String.fromCharCode(n)), u = o(r), h = o(n), h ? g = !1 : f && (u || p || (g = !1)), 
u ? m = !1 : p && (h || f || (m = !1)), t ? (c = g, l = m) : (c = g && (!m || p), 
l = m && (!g || f)), {
can_open: c,
can_close: l,
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
function s(e) {
return "[object Object]" === i(e);
}
function a(e) {
return "[object RegExp]" === i(e);
}
function c(e) {
return "[object Function]" === i(e);
}
function l(e) {
return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
function u(e) {
return Object.keys(e || {}).reduce(function(e, t) {
return e || v.hasOwnProperty(t);
}, !1);
}
function p(e) {
e.__index__ = -1, e.__text_cache__ = "";
}
function h(e) {
return function(t, r) {
var n = t.slice(r);
return e.test(n) ? n.match(e)[0].length : 0;
};
}
function f() {
return function(e, t) {
t.normalize(e);
};
}
function d(e) {
function t(e) {
return e.replace("%TLDS%", u.src_tlds);
}
function i(e, t) {
throw Error('(LinkifyIt) Invalid schema "' + e + '": ' + t);
}
var u = e.re = n({}, r(316)), d = e.__tlds__.slice();
e.__tlds_replaced__ || d.push(_), d.push(u.src_xn), u.src_tlds = d.join("|"), u.email_fuzzy = RegExp(t(u.tpl_email_fuzzy), "i"), 
u.link_fuzzy = RegExp(t(u.tpl_link_fuzzy), "i"), u.link_no_ip_fuzzy = RegExp(t(u.tpl_link_no_ip_fuzzy), "i"), 
u.host_fuzzy_test = RegExp(t(u.tpl_host_fuzzy_test), "i");
var g = [];
e.__compiled__ = {}, Object.keys(e.__schemas__).forEach(function(t) {
var r = e.__schemas__[t];
if (null !== r) {
var n = {
validate: null,
link: null
};
return e.__compiled__[t] = n, s(r) ? (a(r.validate) ? n.validate = h(r.validate) : c(r.validate) ? n.validate = r.validate : i(t, r), 
void (c(r.normalize) ? n.normalize = r.normalize : r.normalize ? i(t, r) : n.normalize = f())) : o(r) ? void g.push(t) : void i(t, r);
}
}), g.forEach(function(t) {
e.__compiled__[e.__schemas__[t]] && (e.__compiled__[t].validate = e.__compiled__[e.__schemas__[t]].validate, 
e.__compiled__[t].normalize = e.__compiled__[e.__schemas__[t]].normalize);
}), e.__compiled__[""] = {
validate: null,
normalize: f()
};
var m = Object.keys(e.__compiled__).filter(function(t) {
return t.length > 0 && e.__compiled__[t];
}).map(l).join("|");
e.re.schema_test = RegExp("(^|(?!_)(?:>|" + u.src_ZPCc + "))(" + m + ")", "i"), 
e.re.schema_search = RegExp("(^|(?!_)(?:>|" + u.src_ZPCc + "))(" + m + ")", "ig"), 
e.re.pretest = RegExp("(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@", "i"), 
p(e);
}
function g(e, t) {
var r = e.__index__, n = e.__last_index__, i = e.__text_cache__.slice(r, n);
this.schema = e.__schema__.toLowerCase(), this.index = r + t, this.lastIndex = n + t, 
this.raw = i, this.text = i, this.url = i;
}
function m(e, t) {
var r = new g(e, t);
return e.__compiled__[r.schema].normalize(r, e), r;
}
function b(e, t) {
return this instanceof b ? (t || u(e) && (t = e, e = {}), this.__opts__ = n({}, v, t), 
this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", 
this.__schemas__ = n({}, k, e), this.__compiled__ = {}, this.__tlds__ = y, this.__tlds_replaced__ = !1, 
this.re = {}, void d(this)) : new b(e, t);
}
var v = {
fuzzyLink: !0,
fuzzyEmail: !0,
fuzzyIP: !1
}, k = {
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
}, _ = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", y = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
b.prototype.add = function(e, t) {
return this.__schemas__[e] = t, d(this), this;
}, b.prototype.set = function(e) {
return this.__opts__ = n(this.__opts__, e), this;
}, b.prototype.test = function(e) {
if (this.__text_cache__ = e, this.__index__ = -1, !e.length) return !1;
var t, r, n, i, o, s, a, c, l;
if (this.re.schema_test.test(e)) for (a = this.re.schema_search, a.lastIndex = 0; null !== (t = a.exec(e)); ) if (i = this.testSchemaAt(e, t[2], a.lastIndex)) {
this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + i;
break;
}
return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = e.search(this.re.host_fuzzy_test), 
c >= 0 && (this.__index__ < 0 || c < this.__index__) && null !== (r = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (o = r.index + r[1].length, 
(this.__index__ < 0 || o < this.__index__) && (this.__schema__ = "", this.__index__ = o, 
this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (l = e.indexOf("@"), 
l >= 0 && null !== (n = e.match(this.re.email_fuzzy)) && (o = n.index + n[1].length, 
s = n.index + n[0].length, (this.__index__ < 0 || o < this.__index__ || o === this.__index__ && s > this.__last_index__) && (this.__schema__ = "mailto:", 
this.__index__ = o, this.__last_index__ = s))), this.__index__ >= 0;
}, b.prototype.pretest = function(e) {
return this.re.pretest.test(e);
}, b.prototype.testSchemaAt = function(e, t, r) {
return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(e, r, this) : 0;
}, b.prototype.match = function(e) {
var t = 0, r = [];
this.__index__ >= 0 && this.__text_cache__ === e && (r.push(m(this, t)), t = this.__last_index__);
for (var n = t ? e.slice(t) : e; this.test(n); ) r.push(m(this, t)), n = n.slice(this.__last_index__), 
t += this.__last_index__;
return r.length ? r : null;
}, b.prototype.tlds = function(e, t) {
return e = Array.isArray(e) ? e : [ e ], t ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(e, t, r) {
return e !== r[t - 1];
}).reverse(), d(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, 
d(this), this);
}, b.prototype.normalize = function(e) {
e.schema || (e.url = "http://" + e.url), "mailto:" !== e.schema || /^mailto:/i.test(e.url) || (e.url = "mailto:" + e.url);
}, e.exports = b;
}, function(e, t, r) {
"use strict";
var n = t.src_Any = r(265).source, i = t.src_Cc = r(266).source, o = t.src_Z = r(268).source, s = t.src_P = r(258).source, a = t.src_ZPCc = [ o, s, i ].join("|"), c = t.src_ZCc = [ o, i ].join("|"), l = "(?:(?!" + a + ")" + n + ")", u = "(?:(?![0-9]|" + a + ")" + n + ")", p = t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
t.src_auth = "(?:(?:(?!" + c + ").)+@)?";
var h = t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", f = t.src_host_terminator = "(?=$|" + a + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + a + "))", d = t.src_path = "(?:[/?#](?:(?!" + c + "|[()[\\]{}.,\"'?!\\-]).|\\[(?:(?!" + c + "|\\]).)*\\]|\\((?:(?!" + c + "|[)]).)*\\)|\\{(?:(?!" + c + '|[}]).)*\\}|\\"(?:(?!' + c + '|["]).)+\\"|\\\'(?:(?!' + c + "|[']).)+\\'|\\'(?=" + l + ").|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!" + c + "|[.]).|\\-(?!--(?:[^-]|$))(?:-*)|\\,(?!" + c + ").|\\!(?!" + c + "|[!]).|\\?(?!" + c + "|[?]).)+|\\/)?", g = t.src_email_name = '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+', m = t.src_xn = "xn--[a-z0-9\\-]{1,59}", b = t.src_domain_root = "(?:" + m + "|" + u + "{1,63})", v = t.src_domain = "(?:" + m + "|(?:" + l + ")|(?:" + l + "(?:-(?!-)|" + l + "){0,61}" + l + "))", k = t.src_host = "(?:" + p + "|(?:(?:(?:" + v + ")\\.)*" + b + "))", _ = t.tpl_host_fuzzy = "(?:" + p + "|(?:(?:(?:" + v + ")\\.)+(?:%TLDS%)))", y = t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + v + ")\\.)+(?:%TLDS%))";
t.src_host_strict = k + f;
var A = t.tpl_host_fuzzy_strict = _ + f;
t.src_host_port_strict = k + h + f;
var x = t.tpl_host_port_fuzzy_strict = _ + h + f, E = t.tpl_host_port_no_ip_fuzzy_strict = y + h + f;
t.tpl_host_fuzzy_test = "localhost|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + a + "|$))", 
t.tpl_email_fuzzy = "(^|>|" + c + ")(" + g + "@" + A + ")", t.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + a + "))((?![$+<=>^`|])" + x + d + ")", 
t.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + a + "))((?![$+<=>^`|])" + E + d + ")";
}, function(e, t, r) {
var n;
(function(e, i) {
/*! https://mths.be/punycode v1.4.0 by @mathias */
"use strict";
!function(o) {
function s(e) {
throw new RangeError(I[e]);
}
function a(e, t) {
for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
return n;
}
function c(e, t) {
var r = e.split("@"), n = "";
r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(F, ".");
var i = e.split("."), o = a(i, t).join(".");
return n + o;
}
function l(e) {
for (var t, r, n = [], i = 0, o = e.length; o > i; ) t = e.charCodeAt(i++), t >= 55296 && 56319 >= t && o > i ? (r = e.charCodeAt(i++), 
56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), 
i--)) : n.push(t);
return n;
}
function u(e) {
return a(e, function(e) {
var t = "";
return e > 65535 && (e -= 65536, t += q(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), 
t += q(e);
}).join("");
}
function p(e) {
return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : y;
}
function h(e, t) {
return e + 22 + 75 * (26 > e) - ((0 != t) << 5);
}
function f(e, t, r) {
var n = 0;
for (e = r ? O(e / w) : e >> 1, e += O(e / t); e > R * x >> 1; n += y) e = O(e / R);
return O(n + (R + 1) * e / (e + E));
}
function d(e) {
var t, r, n, i, o, a, c, l, h, d, g = [], m = e.length, b = 0, v = S, k = C;
for (r = e.lastIndexOf(T), 0 > r && (r = 0), n = 0; r > n; ++n) e.charCodeAt(n) >= 128 && s("not-basic"), 
g.push(e.charCodeAt(n));
for (i = r > 0 ? r + 1 : 0; m > i; ) {
for (o = b, a = 1, c = y; i >= m && s("invalid-input"), l = p(e.charCodeAt(i++)), 
(l >= y || l > O((_ - b) / a)) && s("overflow"), b += l * a, h = k >= c ? A : c >= k + x ? x : c - k, 
!(h > l); c += y) d = y - h, a > O(_ / d) && s("overflow"), a *= d;
t = g.length + 1, k = f(b - o, t, 0 == o), O(b / t) > _ - v && s("overflow"), v += O(b / t), 
b %= t, g.splice(b++, 0, v);
}
return u(g);
}
function g(e) {
var t, r, n, i, o, a, c, u, p, d, g, m, b, v, k, E = [];
for (e = l(e), m = e.length, t = S, r = 0, o = C, a = 0; m > a; ++a) g = e[a], 128 > g && E.push(q(g));
for (n = i = E.length, i && E.push(T); m > n; ) {
for (c = _, a = 0; m > a; ++a) g = e[a], g >= t && c > g && (c = g);
for (b = n + 1, c - t > O((_ - r) / b) && s("overflow"), r += (c - t) * b, t = c, 
a = 0; m > a; ++a) if (g = e[a], t > g && ++r > _ && s("overflow"), g == t) {
for (u = r, p = y; d = o >= p ? A : p >= o + x ? x : p - o, !(d > u); p += y) k = u - d, 
v = y - d, E.push(q(h(d + k % v, 0))), u = O(k / v);
E.push(q(h(u, 0))), o = f(r, b, n == i), r = 0, ++n;
}
++r, ++t;
}
return E.join("");
}
function m(e) {
return c(e, function(e) {
return D.test(e) ? d(e.slice(4).toLowerCase()) : e;
});
}
function b(e) {
return c(e, function(e) {
return L.test(e) ? "xn--" + g(e) : e;
});
}
var v = ("object" == typeof t && t && !t.nodeType && t, "object" == typeof e && e && !e.nodeType && e, 
"object" == typeof i && i);
(v.global === v || v.window === v || v.self === v) && (o = v);
var k, _ = 2147483647, y = 36, A = 1, x = 26, E = 38, w = 700, C = 72, S = 128, T = "-", D = /^xn--/, L = /[^\x20-\x7E]/, F = /[\x2E\u3002\uFF0E\uFF61]/g, I = {
overflow: "Overflow: input needs wider integers to process",
"not-basic": "Illegal input >= 0x80 (not a basic code point)",
"invalid-input": "Invalid input"
}, R = y - A, O = Math.floor, q = String.fromCharCode;
k = {
version: "1.3.2",
ucs2: {
decode: l,
encode: u
},
decode: d,
encode: g,
toASCII: b,
toUnicode: m
}, n = function() {
return k;
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
e.renderer.rules.code_inline = function(r, n, i, o, s) {
var a = r[n], c = a.content.trim();
if (0 == c.indexOf("key:")) return t(c.slice(4));
for (var l = [ "pattern", "match", "subject" ], u = 0; u < l.length; u++) {
var p = l[u];
if (c.startsWith(p + ":")) return '<code class="' + p + '">' + e.utils.escapeHtml(c.slice(p.length + 1)) + "</code>";
}
return "<code>" + e.utils.escapeHtml(c) + "</code>";
};
};
}, function(e, t, r) {
"use strict";
var n = r(324), i = r(325), o = r(326), s = r(252).lang;
o.requirePhrase("markit.outlined", r(331)("./" + s + ".yml")), e.exports = function(e) {
[ "warn", "smart", "ponder" ].forEach(function(t) {
e.use(n, t, {
marker: "`",
render: function(r, n, s, a, c) {
if (1 === r[n].nesting) {
var l = i(r[n].info, !0), u = l.header;
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
var o, p, h, f, d, g, m, b, v = !1, k = e.bMarks[r] + e.tShift[r], _ = e.eMarks[r];
if (c !== e.src.charCodeAt(k)) return !1;
for (o = k + 1; _ >= o && a[(o - k) % l] === e.src[o]; o++) ;
if (h = Math.floor((o - k) / l), s > h) return !1;
if (o -= (o - k) % l, f = e.src.slice(k, o), d = e.src.slice(o, _), !u(d)) return !1;
if (i) return !0;
for (p = r; (p++, !(p >= n)) && (k = e.bMarks[p] + e.tShift[p], _ = e.eMarks[p], 
!(_ > k && e.sCount[p] < e.blkIndent)); ) if (c === e.src.charCodeAt(k) && !(e.sCount[p] - e.blkIndent >= 4)) {
for (o = k + 1; _ >= o && a[(o - k) % l] === e.src[o]; o++) ;
if (!(Math.floor((o - k) / l) < h || (o -= (o - k) % l, o = e.skipSpaces(o), _ > o))) {
v = !0;
break;
}
}
return m = e.parentType, b = e.lineMax, e.parentType = "container", e.lineMax = p, 
g = e.push("container_" + t + "_open", "div", 1), g.markup = f, g.block = !0, g.info = d, 
g.map = [ r, p ], e.md.block.tokenize(e, r + 1, p), g = e.push("container_" + t + "_close", "div", -1), 
g.markup = e.src.slice(k, o), g.block = !0, e.parentType = m, e.lineMax = b, e.line = p + (v ? 1 : 0), 
!0;
}
r = r || {};
var s = 3, a = r.marker || ":", c = a.charCodeAt(0), l = a.length, u = r.validate || n, p = r.render || i;
e.block.ruler.before("fence", "container_" + t, o, {
alt: [ "paragraph", "reference", "blockquote", "list" ]
}), e.renderer.rules["container_" + t + "_open"] = p, e.renderer.rules["container_" + t + "_close"] = p;
};
}, function(e, t) {
"use strict";
var r = /([\w-]+)(?:=(?:'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)"|(\S+))|(?:\s|$))/g;
e.exports = function(e, t) {
var n = {};
if (!e) return n;
var i = void 0;
t && (i = e.match(/^\w+/), i = i && i[0], e = e.replace(/^\w+\s+/, ""));
for (var o = void 0, s = void 0, a = void 0; null !== (o = r.exec(e)); ) s = o[1], 
a = void 0 !== o[2] ? o[2].replace(/\\'/g, "'") : void 0 !== o[3] ? o[3].replace(/\\"/g, '"') : o[4], 
n[s.toLowerCase()] = void 0 === a ? !0 : a;
return i && (n.blockName = i), n;
};
}, function(e, t, r) {
"use strict";
function n() {
for (var e = [ s ], t = 0; t < arguments.length; t++) e.push(arguments[t]);
return o.t.apply(o, e);
}
var i = r(327), o = new i("en"), s = r(252).lang, a = {};
n.i18n = o, n.requirePhrase = function(e, t) {
a[e] && -1 != a[e].indexOf(t) || (a[e] || (a[e] = []), a[e].push(t), o.addPhrase(s, e, t));
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
function s(e) {
return e === !0 || e === !1;
}
function a(e) {
return "[object Function]" === n(e);
}
function c(e) {
return "[object Object]" === n(e);
}
function l(e, t, r) {
if (null !== e) if (_ && e.forEach === _) e.forEach(t, r); else if (e.length === +e.length) for (var n = 0, i = e.length; i > n; n += 1) t.call(r, e[n], n, e); else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(r, e[o], o, e);
}
function u(e) {
var t = 1, r = arguments, n = r.length, i = (e + "").replace(y, function(e) {
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
function p(e) {
var t = {};
return l(e || {}, function(e, r) {
return e && "object" == typeof e ? void l(p(e), function(e, n) {
t[r + "." + n] = e;
}) : void (t[r] = e);
}), t;
}
function h(e, t) {
return e + x + t;
}
function f(e, t, r) {
var n = h(t, r), i = e._storage;
if (i.hasOwnProperty(n)) return n;
if (t === e._defaultLocale) return null;
var o = e._fallbacks_cache;
if (o.hasOwnProperty(n)) return o[n];
for (var s, a = e._fallbacks[t] || [ e._defaultLocale ], c = 0, l = a.length; l > c; c++) if (s = h(a[c], r), 
i.hasOwnProperty(s)) return o[n] = s, o[n];
return o[n] = null, null;
}
function d(e, t, r) {
var n = v.indexOf(e, t);
return -1 === n ? u('[pluralizer for "%s" locale not found]', e) : void 0 === r[n] ? u('[plural form %d ("%s") not found in translation]', n, v.forms(e)[n]) : r[n];
}
function g(e) {
return this instanceof g ? (this._defaultLocale = e ? e + "" : A, this._fallbacks = {}, 
this._fallbacks_cache = {}, this._storage = {}, void (this._plurals_cache = {})) : new g(e);
}
function m(e, t, r) {
var n, i, o, s, a, c;
return E.test(t) ? (n = b.parse(t), 1 === n.length && "literal" === n[0].type ? n[0].text : (e._plurals_cache[r] || (e._plurals_cache[r] = new g(r)), 
c = e._plurals_cache[r], i = [], i.push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
i.push("params = flatten(params);"), l(n, function(e) {
if ("literal" === e.type) return void i.push(u("str += %j;", e.text));
if ("variable" === e.type) return o = e.anchor, void i.push(u('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', o, o, o));
if ("plural" !== e.type) throw Error("Unknown node type");
o = e.anchor, s = {}, l(e.strict, function(t, n) {
var i = b.parse(t);
return 1 === i.length && "literal" === i[0].type ? (s[n] = !1, void (e.strict[n] = i[0].text)) : (s[n] = !0, 
void (c.hasPhrase(r, t, !0) || c.addPhrase(r, t, t)));
}), a = {}, l(e.forms, function(t, n) {
var i, o = b.parse(t);
return 1 === o.length && "literal" === o[0].type ? (i = o[0].text, e.forms[n] = i, 
void (a[i] = !1)) : (a[t] = !0, void (c.hasPhrase(r, t, !0) || c.addPhrase(r, t, t)));
}), i.push(u("loc = %j;", r)), i.push(u("loc_plzr = %j;", r.split(/[-_]/)[0])), 
i.push(u("anchor = params[%j];", o)), i.push(u("cache = this._plurals_cache[loc];")), 
i.push(u("strict = %j;", e.strict)), i.push(u("strict_exec = %j;", s)), i.push(u("forms = %j;", e.forms)), 
i.push(u("forms_exec = %j;", a)), i.push("if (+(anchor) != anchor) {"), i.push(u('  str += "[invalid plurals amount: %s(" + anchor + ")]";', o)), 
i.push("} else {"), i.push("  if (strict[anchor] !== undefined) {"), i.push("    plrl = strict[anchor];"), 
i.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), i.push("  } else {"), 
i.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), i.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
i.push("  }"), i.push("}");
}), i.push("return str;"), Function("params", "flatten", "pluralizer", i.join("\n")))) : t;
}
var b = r(329), v = r(330), k = Array.isArray || function(e) {
return "[object Array]" === n(e);
}, _ = Array.prototype.forEach, y = /%[sdj%]/g, A = "en", x = "#@$";
g.prototype.addPhrase = function(e, t, r, n) {
var a, u = this;
if (s(n)) a = n ? 1 / 0 : 0; else if (o(n)) {
if (a = Math.floor(n), 0 > a) throw new TypeError("Invalid flatten level (should be >= 0).");
} else a = 1 / 0;
if (c(r) && a > 0) return l(r, function(r, n) {
u.addPhrase(e, (t ? t + "." : "") + n, r, a - 1);
}), this;
if (i(r)) this._storage[h(e, t)] = {
translation: r,
locale: e,
raw: !1
}; else {
if (!(k(r) || o(r) || s(r) || 0 === a && c(r))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[h(e, t)] = {
translation: r,
locale: e,
raw: !0
};
}
return u._fallbacks_cache = {}, this;
}, g.prototype.setFallback = function(e, t) {
var r = this._defaultLocale;
if (r === e) throw Error("Default locale can't have fallbacks");
var n = k(t) ? t.slice() : [ t ];
return n[n.length - 1] !== r && n.push(r), this._fallbacks[e] = n, this._fallbacks_cache = {}, 
this;
};
var E = /#\{|\(\(|\\\\/;
g.prototype.translate = function(e, t, r) {
var n, s = f(this, e, t);
return s ? (n = this._storage[s], n.raw ? n.translation : (n.hasOwnProperty("compiled") || (n.compiled = m(this, n.translation, n.locale)), 
a(n.compiled) ? ((o(r) || i(r)) && (r = {
count: r,
value: r
}), n.compiled.call(this, r, p, d)) : n.compiled)) : e + ": No translation for [" + t + "]";
}, g.prototype.hasPhrase = function(e, t, r) {
return r ? this._storage.hasOwnProperty(h(e, t)) : f(this, e, t) ? !0 : !1;
}, g.prototype.getLocale = function(e, t, r) {
if (r) return this._storage.hasOwnProperty(h(e, t)) ? e : null;
var n = f(this, e, t);
return n ? n.split(x, 2)[0] : null;
}, g.prototype.t = g.prototype.translate, g.prototype.stringify = function(e) {
var t = this, r = {};
l(this._storage, function(e, t) {
r[t.split(x)[1]] = !0;
});
var n = {};
l(r, function(r, i) {
var o = f(t, e, i);
if (o) {
var s = t._storage[o].locale;
n[s] || (n[s] = {}), n[s][i] = t._storage[o].translation;
}
});
var i = {
fallback: {},
locales: n
}, o = (t._fallbacks[e] || []).slice(0, -1);
return o.length && (i.fallback[e] = o), JSON.stringify(i);
}, g.prototype.load = function(e) {
var t = this;
return i(e) && (e = JSON.parse(e)), l(e.locales, function(e, r) {
l(e, function(e, n) {
t.addPhrase(r, n, e, 0);
});
}), l(e.fallback, function(e, r) {
t.setFallback(r, e);
}), this;
}, e.exports = g;
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
return e.substring(be, me);
}
function n(t) {
function r(t, r, n) {
var i, o;
for (i = r; n > i; i++) o = e.charAt(i), "\n" === o ? (t.seenCR || t.line++, t.column = 1, 
t.seenCR = !1) : "\r" === o || "\u2028" === o || "\u2029" === o ? (t.line++, t.column = 1, 
t.seenCR = !0) : (t.column++, t.seenCR = !1);
}
return ve !== t && (ve > t && (ve = 0, ke = {
line: 1,
column: 1,
seenCR: !1
}), r(ke, ve, t), ve = t), ke;
}
function i(e) {
_e > me || (me > _e && (_e = me, ye = []), ye.push(e));
}
function o(r, i, o) {
function s(e) {
var t = 1;
for (e.sort(function(e, t) {
return e.description < t.description ? -1 : e.description > t.description ? 1 : 0;
}); t < e.length; ) e[t - 1] === e[t] ? e.splice(t, 1) : t++;
}
function a(e, t) {
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
var n, i, o, s = Array(e.length);
for (o = 0; o < e.length; o++) s[o] = e[o].description;
return n = e.length > 1 ? s.slice(0, -1).join(", ") + " or " + s[e.length - 1] : s[0], 
i = t ? '"' + r(t) + '"' : "end of input", "Expected " + n + " but " + i + " found.";
}
var c = n(o), l = o < e.length ? e.charAt(o) : null;
return null !== i && s(i), new t(null !== r ? r : a(i, l), i, l, o, c.line, c.column);
}
function s() {
var e, t;
for (e = [], t = g(), t === y && (t = a(), t === y && (t = h())); t !== y; ) e.push(t), 
t = g(), t === y && (t = a(), t === y && (t = h()));
return e;
}
function a() {
var t, r, n, o, s;
return t = me, e.substr(me, 2) === w ? (r = w, me += 2) : (r = y, 0 === Ae && i(C)), 
r !== y ? (n = c(), n !== y ? (e.substr(me, 2) === S ? (o = S, me += 2) : (o = y, 
0 === Ae && i(T)), o !== y ? (s = p(), s === y && (s = D), s !== y ? (be = t, r = L(n, s), 
t = r) : (me = t, t = E)) : (me = t, t = E)) : (me = t, t = E)) : (me = t, t = E), 
t;
}
function c() {
var t, r, n, o;
return t = me, r = l(), r !== y ? (124 === e.charCodeAt(me) ? (n = F, me++) : (n = y, 
0 === Ae && i(I)), n !== y ? (o = c(), o !== y ? (be = t, r = R(r, o), t = r) : (me = t, 
t = E)) : (me = t, t = E)) : (me = t, t = E), t === y && (t = me, r = l(), r !== y && (be = t, 
r = O(r)), t = r), t;
}
function l() {
var t, r, n, o, s, a;
if (t = me, 61 === e.charCodeAt(me) ? (r = q, me++) : (r = y, 0 === Ae && i(N)), 
r !== y) {
if (n = [], P.test(e.charAt(me)) ? (o = e.charAt(me), me++) : (o = y, 0 === Ae && i(M)), 
o !== y) for (;o !== y; ) n.push(o), P.test(e.charAt(me)) ? (o = e.charAt(me), me++) : (o = y, 
0 === Ae && i(M)); else n = E;
if (n !== y) if (32 === e.charCodeAt(me) ? (o = z, me++) : (o = y, 0 === Ae && i(B)), 
o === y && (o = D), o !== y) {
if (s = [], a = u(), a !== y) for (;a !== y; ) s.push(a), a = u(); else s = E;
s !== y ? (be = t, r = j(n, s), t = r) : (me = t, t = E);
} else me = t, t = E; else me = t, t = E;
} else me = t, t = E;
if (t === y) {
if (t = me, r = [], n = u(), n !== y) for (;n !== y; ) r.push(n), n = u(); else r = E;
r !== y && (be = t, r = U()), t = r;
}
return t;
}
function u() {
var t, r, n;
return t = me, 92 === e.charCodeAt(me) ? (r = H, me++) : (r = y, 0 === Ae && i($)), 
r !== y ? (G.test(e.charAt(me)) ? (n = e.charAt(me), me++) : (n = y, 0 === Ae && i(V)), 
n !== y ? (be = t, r = W(n), t = r) : (me = t, t = E)) : (me = t, t = E), t === y && (t = me, 
r = me, Ae++, 124 === e.charCodeAt(me) ? (n = F, me++) : (n = y, 0 === Ae && i(I)), 
n === y && (e.substr(me, 2) === S ? (n = S, me += 2) : (n = y, 0 === Ae && i(T))), 
Ae--, n === y ? r = Z : (me = r, r = E), r !== y ? (e.length > me ? (n = e.charAt(me), 
me++) : (n = y, 0 === Ae && i(Y)), n !== y ? (be = t, r = X(), t = r) : (me = t, 
t = E)) : (me = t, t = E)), t;
}
function p() {
var t, r, n;
return t = me, 58 === e.charCodeAt(me) ? (r = K, me++) : (r = y, 0 === Ae && i(J)), 
r !== y ? (n = f(), n !== y ? (be = t, r = Q(n), t = r) : (me = t, t = E)) : (me = t, 
t = E), t;
}
function h() {
var t, r, n, o;
return t = me, e.substr(me, 2) === ee ? (r = ee, me += 2) : (r = y, 0 === Ae && i(te)), 
r !== y ? (n = f(), n !== y ? (125 === e.charCodeAt(me) ? (o = re, me++) : (o = y, 
0 === Ae && i(ne)), o !== y ? (be = t, r = ie(n), t = r) : (me = t, t = E)) : (me = t, 
t = E)) : (me = t, t = E), t;
}
function f() {
var t, r, n, o, s;
if (t = me, r = d(), r !== y) if (46 === e.charCodeAt(me) ? (n = oe, me++) : (n = y, 
0 === Ae && i(se)), n !== y) {
if (o = [], s = f(), s !== y) for (;s !== y; ) o.push(s), s = f(); else o = E;
o !== y ? (be = t, r = ae(), t = r) : (me = t, t = E);
} else me = t, t = E; else me = t, t = E;
return t === y && (t = d()), t;
}
function d() {
var t, r, n, o;
if (t = me, ce.test(e.charAt(me)) ? (r = e.charAt(me), me++) : (r = y, 0 === Ae && i(le)), 
r !== y) {
for (n = [], ue.test(e.charAt(me)) ? (o = e.charAt(me), me++) : (o = y, 0 === Ae && i(pe)); o !== y; ) n.push(o), 
ue.test(e.charAt(me)) ? (o = e.charAt(me), me++) : (o = y, 0 === Ae && i(pe));
n !== y ? (be = t, r = X(), t = r) : (me = t, t = E);
} else me = t, t = E;
return t;
}
function g() {
var e, t, r, n, i;
if (e = me, t = [], r = me, n = me, Ae++, i = a(), i === y && (i = h()), Ae--, i === y ? n = Z : (me = n, 
n = E), n !== y ? (i = m(), i !== y ? (be = r, n = he(i), r = n) : (me = r, r = E)) : (me = r, 
r = E), r !== y) for (;r !== y; ) t.push(r), r = me, n = me, Ae++, i = a(), i === y && (i = h()), 
Ae--, i === y ? n = Z : (me = n, n = E), n !== y ? (i = m(), i !== y ? (be = r, 
n = he(i), r = n) : (me = r, r = E)) : (me = r, r = E); else t = E;
return t !== y && (be = e, t = fe(t)), e = t;
}
function m() {
var t, r, n;
return t = me, 92 === e.charCodeAt(me) ? (r = H, me++) : (r = y, 0 === Ae && i($)), 
r !== y ? (de.test(e.charAt(me)) ? (n = e.charAt(me), me++) : (n = y, 0 === Ae && i(ge)), 
n !== y ? (be = t, r = W(n), t = r) : (me = t, t = E)) : (me = t, t = E), t === y && (e.length > me ? (t = e.charAt(me), 
me++) : (t = y, 0 === Ae && i(Y))), t;
}
function b(e) {
for (var t = [], r = 0; r < e.length; r++) void 0 === e[r].strict && t.push(e[r].text);
return t;
}
function v(e) {
for (var t = {}, r = 0; r < e.length; r++) void 0 !== e[r].strict && (t[e[r].strict] = e[r].text);
return t;
}
var k, _ = arguments.length > 1 ? arguments[1] : {}, y = {}, A = {
start: s
}, x = s, E = y, w = "((", C = {
type: "literal",
value: "((",
description: '"(("'
}, S = "))", T = {
type: "literal",
value: "))",
description: '"))"'
}, D = null, L = function(e, t) {
return {
type: "plural",
forms: b(e),
strict: v(e),
anchor: t || "count"
};
}, F = "|", I = {
type: "literal",
value: "|",
description: '"|"'
}, R = function(e, t) {
return [ e ].concat(t);
}, O = function(e) {
return [ e ];
}, q = "=", N = {
type: "literal",
value: "=",
description: '"="'
}, P = /^[0-9]/, M = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, z = " ", B = {
type: "literal",
value: " ",
description: '" "'
}, j = function(e, t) {
return {
strict: e.join(""),
text: t.join("")
};
}, U = function() {
return {
text: r()
};
}, H = "\\", $ = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, G = /^[\\|)(]/, V = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, W = function(e) {
return e;
}, Z = void 0, Y = {
type: "any",
description: "any character"
}, X = function() {
return r();
}, K = ":", J = {
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
}, oe = ".", se = {
type: "literal",
value: ".",
description: '"."'
}, ae = function() {
return r();
}, ce = /^[a-zA-Z_$]/, le = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, ue = /^[a-zA-Z0-9_$]/, pe = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, he = function(e) {
return e;
}, fe = function(e) {
return {
type: "literal",
text: e.join("")
};
}, de = /^[\\#()|]/, ge = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, me = 0, be = 0, ve = 0, ke = {
line: 1,
column: 1,
seenCR: !1
}, _e = 0, ye = [], Ae = 0;
if ("startRule" in _) {
if (!(_.startRule in A)) throw Error("Can't start parsing from rule \"" + _.startRule + '".');
x = A[_.startRule];
}
if (k = x(), k !== y && me === e.length) return k;
throw k !== y && me < e.length && i({
type: "end",
description: "end of input"
}), o(null, ye, _e);
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
return f[e] ? e : (t = e.toLowerCase().replace("_", "-"), f[t] ? t : (t = t.split("-")[0], 
f[t] ? t : null));
}
function n(e) {
var t = r(e);
return f[t] ? f[t].c : null;
}
function i(e, t) {
var n = r(e);
if (!n) return -1;
if (!f[n].cFn) return 0;
var i = t + "", o = i.indexOf(".") < 0 ? "" : i.split(".")[1], s = o.length, a = +t, c = +i.split(".")[0], l = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return f[n].cFn(a, c, s, +o, l);
}
function o(e, t) {
var n = r(e);
return n ? f[n].c[i(n, t)] : null;
}
function s(e) {
var t = r(e);
return f[t] ? f[t].o : null;
}
function a(e, t) {
var n = r(e);
if (!n) return -1;
if (!f[n].oFn) return 0;
var i = t + "", o = i.indexOf(".") < 0 ? "" : i.split(".")[1], s = o.length, a = +t, c = +i.split(".")[0], l = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return f[n].oFn(a, c, s, +o, l);
}
function c(e, t) {
var n = r(e);
return f[n] ? f[n].o[a(n, t)] : null;
}
function l(e) {
return d[e];
}
function u(e, t) {
var r;
for (t.c = t.c ? t.c.map(l) : [ "other" ], t.o = t.o ? t.o.map(l) : [ "other" ], 
r = 0; r < e.length; r++) f[e[r]] = t;
}
function p(e, t, r) {
return r >= e && t >= r && r % 1 === 0;
}
function h(e, t) {
return e.indexOf(t) >= 0;
}
var f = {};
e.exports = o, e.exports.indexOf = i, e.exports.forms = n, e.exports.ordinal = c, 
e.exports.ordinal.indexOf = a, e.exports.ordinal.forms = s;
var d = [ "zero", "one", "two", "few", "many", "other" ];
u([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(e) {
return p(0, 1, e) ? 0 : 1;
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
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : p(3, 10, t) ? 3 : p(11, 99, t) ? 4 : 5;
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
return h([ 1, 2, 5, 7, 8 ], r) || h([ 20, 50, 70, 80 ], n) ? 0 : h([ 3, 4 ], r) || h([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i) ? 1 : 0 === t || 6 === r || h([ 40, 60, 90 ], n) ? 2 : 3;
}
}), u([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, r = e % 100;
return 1 === t && 11 !== r ? 0 : p(2, 4, t) && !p(12, 14, r) ? 1 : 0 === t || p(5, 9, t) || p(11, 14, r) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 10, r = e % 100;
return h([ 2, 3 ], t) && !h([ 12, 13 ], r) ? 0 : 1;
}
}), u([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "zh" ], {}), 
u([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, r = e % 100, n = e % 1e6;
return 1 !== t || h([ 11, 71, 91 ], r) ? 2 !== t || h([ 12, 72, 92 ], r) ? !p(3, 4, t) && 9 !== t || p(10, 19, r) || p(70, 79, r) || p(90, 99, r) ? 0 !== e && 0 === n ? 3 : 4 : 2 : 1 : 0;
}
}), u([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, r, n) {
var i = t % 10, o = t % 100, s = n % 10, a = n % 100;
return 0 === r && 1 === i && 11 !== o || 1 === s && 11 !== a ? 0 : 0 === r && p(2, 4, i) && !p(12, 14, o) || p(2, 4, s) && !p(12, 14, a) ? 1 : 2;
}
}), u([ "ca" ], {
c: [ 1, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return h([ 1, 3 ], e) ? 0 : 2 === e ? 1 : 4 === e ? 2 : 3;
}
}), u([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : p(2, 4, t) && 0 === r ? 1 : 0 !== r ? 2 : 3;
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
cFn: function(e, t, r, n, i) {
return 1 === e || 0 !== i && h([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, r, n) {
var i = t % 100, o = n % 100;
return 0 === r && 1 === i || 1 === o ? 0 : 0 === r && 2 === i || 2 === o ? 1 : 0 === r && p(3, 4, i) || p(3, 4, o) ? 2 : 3;
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
return h([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(e, t, r, n) {
var i = t % 10, o = n % 10;
return 0 === r && h([ 1, 2, 3 ], t) || 0 === r && !h([ 4, 6, 9 ], i) || 0 !== r && !h([ 4, 6, 9 ], o) ? 0 : 1;
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
return 1 === e ? 0 : 2 === e ? 1 : p(3, 6, e) ? 2 : p(7, 10, e) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e) {
return h([ 1, 11 ], e) ? 0 : h([ 2, 12 ], e) ? 1 : p(3, 10, e) || p(13, 19, e) ? 2 : 3;
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
cFn: function(e, t, r) {
var n = t % 10, i = t % 100;
return 0 === r && 1 === n ? 0 : 0 === r && 2 === n ? 1 : 0 === r && h([ 0, 20, 40, 60, 80 ], i) ? 2 : 0 !== r ? 3 : 4;
}
}), u([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(e, t, r) {
var n = e % 10;
return 1 === t && 0 === r ? 0 : 2 === t && 0 === r ? 1 : 0 !== r || p(0, 10, e) || 0 !== n ? 3 : 2;
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
cFn: function(e, t, r, n, i) {
var o = t % 10, s = t % 100;
return 0 === i && 1 === o && 11 !== s || 0 !== i ? 0 : 1;
}
}), u([ "it" ], {
c: [ 1, 5 ],
cFn: function(e, t, r) {
return 1 === t && 0 === r ? 0 : 1;
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
var r = t % 100;
return 1 === t ? 0 : 0 === t || p(2, 20, r) || 40 === r || 60 === r || 80 === r ? 1 : 2;
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
cFn: function(e, t, r, n) {
var i = e % 10, o = e % 100;
return 1 !== i || p(11, 19, o) ? p(2, 9, i) && !p(11, 19, o) ? 1 : 0 !== n ? 2 : 3 : 0;
}
}), u([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t, r, n) {
var i = e % 10, o = e % 100, s = n % 100, a = n % 10;
return 0 === i || p(11, 19, o) || 2 === r && p(11, 19, s) ? 0 : 1 === i && 11 !== o || 2 === r && 1 === a && 11 !== s || 2 !== r && 1 === a ? 1 : 2;
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
return 1 === r && 11 !== n ? 0 : 2 === r && 12 !== n ? 1 : h([ 7, 8 ], r) && !h([ 17, 18 ], n) ? 2 : 3;
}
}), u([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, r) {
var n = e % 100;
return 1 === t && 0 === r ? 0 : 0 !== r || 0 === e || 1 !== e && p(1, 19, n) ? 1 : 2;
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
return 1 === e ? 0 : 0 === e || p(2, 10, t) ? 1 : p(11, 19, t) ? 2 : 3;
}
}), u([ "ne" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return p(1, 4, e) ? 0 : 1;
}
}), u([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, r) {
var n = t % 10, i = t % 100;
return 1 === t && 0 === r ? 0 : 0 === r && p(2, 4, n) && !p(12, 14, i) ? 1 : 0 === r && 1 !== t && p(0, 1, n) || 0 === r && p(5, 9, n) || 0 === r && p(12, 14, i) ? 2 : 3;
}
}), u([ "pt" ], {
c: [ 1, 5 ],
cFn: function(e) {
return p(0, 2, e) && 2 !== e ? 0 : 1;
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
return 0 === r && 1 === n && 11 !== i ? 0 : 0 === r && p(2, 4, n) && !p(12, 14, i) ? 1 : 0 === r && 0 === n || 0 === r && p(5, 9, n) || 0 === r && p(11, 14, i) ? 2 : 3;
}
}), u([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : p(2, 10, e) ? 1 : 2;
}
}), u([ "si" ], {
c: [ 1, 5 ],
cFn: function(e, t, r, n) {
return h([ 0, 1 ], e) || 0 === t && 1 === n ? 0 : 1;
}
}), u([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, r) {
var n = t % 100;
return 0 === r && 1 === n ? 0 : 0 === r && 2 === n ? 1 : 0 === r && p(3, 4, n) || 0 !== r ? 2 : 3;
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
return h([ 1, 2 ], t) && !h([ 11, 12 ], r) ? 0 : 1;
}
}), u([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(e) {
return p(0, 1, e) || p(11, 99, e) ? 0 : 1;
}
}), u([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, r) {
var n = t % 10, i = t % 100;
return 0 === r && 1 === n && 11 !== i ? 0 : 0 === r && p(2, 4, n) && !p(12, 14, i) ? 1 : 0 === r && 0 === n || 0 === r && p(5, 9, n) || 0 === r && p(11, 14, i) ? 2 : 3;
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
if (-1 == c.allSupported.indexOf(n)) continue;
e.tokens[t].type = "blocktag_source", e.tokens[t].blockTagAttrs = r;
}
}
var i = r(325), o = r(335), s = r(336), a = r(326), c = r(337), l = r(252).lang;
a.requirePhrase("markit.code", r(345)("./" + l + ".yml")), e.exports = function(e) {
e.core.ruler.push("rewrite_fence_to_source", n), e.renderer.rules.blocktag_source = function(t, r, n, i, l) {
var u = t[r], p = u.blockTagAttrs, h = p.blockName, f = c(h);
u.attrPush([ "data-trusted", n.html && !p.untrusted ? 1 : 0 ]), u.attrPush([ "class", "code-example" ]), 
p["no-strict"] && u.attrPush([ "data-no-strict", 1 ]);
var d = void 0;
+p.height && (d = +p.height, n.html || (d = Math.max(d, 800)), u.attrPush([ "data-demo-height", d ])), 
n.html && p.autorun && u.attrPush([ "data-autorun", p.autorun ]), p.refresh && u.attrPush([ "data-refresh", "1" ]), 
n.html && p.demo && u.attrPush([ "data-demo", "1" ]);
var g = o(u.content), m = s(g);
m.block && u.attrPush([ "data-highlight-block", m.block ]), m.inline && u.attrPush([ "data-highlight-inline", m.inline ]), 
g = m.text;
var b = "";
p.run && (b = '\n        <div class="toolbar codebox__toolbar">\n          <div class="toolbar__tool">\n            <a href="#" title="' + a("js" == h ? "markit.code.run" : "markit.code.show") + '" data-action="run" class="toolbar__button toolbar__button_run"></a>\n          </div>\n          <div class="toolbar__tool">\n            <a href="#" title="' + a("markit.code.open.sandbox") + '" target="_blank" data-action="edit" class="toolbar__button toolbar__button_edit"></a>\n          </div>\n        </div>');
var v = "";
return p.autorun && n.html && "html" == h && (v = '<div class="code-result code-example__result">\n        <iframe\n          class="code-result__iframe"\n          name="code-result-' + (1e9 * Math.random() ^ 0).toString(36) + '"\n          style="height:' + (d || 200) + 'px"\n          src="' + ("epub" == n.ebookType ? "/bookify/blank.html?" + Math.random() : "about:blank") + '"></iframe>\n      </div>'), 
"<div" + l.renderAttrs(u) + '>\n      <div class="codebox code-example__codebox">\n        ' + b + '\n        <div class="codebox__code" data-code="1">\n          <pre class="line-numbers language-' + f + '"><code class="language-' + f + '">' + e.utils.escapeHtml(g) + "</code></pre>\n        </div>\n      </div>\n      " + v + "\n      </div>";
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
function s(e) {
if (!e) return e;
var t = /^\t*(?=\S+)/gm, r = e.match(t).reduce(function(e, t) {
return Math.min(e, t.length);
}, 1 / 0), n = RegExp("^	{" + r + "}", "gm");
return r > 0 ? e.replace(n, "") : e;
}
e.exports = function(e) {
return e = n(e), e = i(e), e = r(e), e = o(e), e = s(e);
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
var o = e.indexOf("*!*"), s = e.indexOf("*/!*");
if (-1 == o || -1 == s) {
i[i.length - 1] += e;
break;
}
t.inline.push(i.length - 1 + ":" + (r + o) + "-" + (r + s - 3)), i[i.length - 1] += e.slice(0, s + 4).replace(/\*\/?!\*/g, ""), 
r += s - 3, e = e.slice(s + 4);
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
var s = i(n[1]);
for (var a in s) (e.md.options.html || -1 != [ "height", "width" ].indexOf(a)) && o.attrReplace(t, a, s[a]);
}
}
}
for (var r = 0; r < e.tokens.length; r++) {
var n = e.tokens[r];
if ("inline" === n.type) for (var s = 0; s < n.children.length; s++) {
var a = n.children[s];
"image" == a.type && t(a);
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
var n = i(r[1], !0), s = n.blockName;
if (!e.md.options.blockTags || -1 == e.md.options.blockTags.indexOf(s)) continue;
var a = -1 == o.allSupported.indexOf(s) ? "blocktag_" + s : "blocktag_source", c = new e.Token(a, s, e.tokens[t].nesting);
c.blockTagAttrs = n, c.map = e.tokens[t].map.slice(), c.block = !0, c.level = e.tokens[t].level, 
e.tokens.splice(t - 1, 3, c);
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
function n(e, n, o, s) {
var a, c, l, u, p, h, f, d, g, m, b, v, k, _, y, A, x, E, w, C;
if (s) return e.ddIndent < 0 ? !1 : t(e, n) >= 0;
if (g = n + 1, e.isEmpty(g) && ++g > o) return !1;
if (e.sCount[g] < e.blkIndent) return !1;
if (c = t(e, g), 0 > c) return !1;
f = e.tokens.length, C = e.push("dl_open", "dl", 1), C.map = h = [ n, 0 ], u = n, 
l = g;
e: for (;;) {
for (w = !0, E = !1, C = e.push("dt_open", "dt", 1), C.map = [ u, u ], C = e.push("inline", "", 0), 
C.map = [ u, u ], C.content = e.getLines(u, u + 1, e.blkIndent, !1).trim(), C.children = [], 
C = e.push("dt_close", "dt", -1); ;) {
for (C = e.push("dd_open", "dd", 1), C.map = p = [ g, 0 ], x = c, d = e.eMarks[l], 
m = e.sCount[l] + c - (e.bMarks[l] + e.tShift[l]); d > x && (a = e.src.charCodeAt(x), 
i(a)); ) 9 === a ? m += 4 - m % 4 : m++, x++;
if (c = x, A = e.tight, b = e.ddIndent, v = e.blkIndent, y = e.tShift[l], _ = e.sCount[l], 
k = e.parentType, e.blkIndent = e.ddIndent = e.sCount[l] + 2, e.tShift[l] = c - e.bMarks[l], 
e.sCount[l] = m, e.tight = !0, e.parentType = "deflist", e.md.block.tokenize(e, l, o, !0), 
(!e.tight || E) && (w = !1), E = e.line - l > 1 && e.isEmpty(e.line - 1), e.tShift[l] = y, 
e.sCount[l] = _, e.tight = A, e.parentType = k, e.blkIndent = v, e.ddIndent = b, 
C = e.push("dd_close", "dd", -1), p[1] = g = e.line, g >= o) break e;
if (e.sCount[g] < e.blkIndent) break e;
if (c = t(e, g), 0 > c) break;
l = g;
}
if (g >= o) break;
if (u = g, e.isEmpty(u)) break;
if (e.sCount[u] < e.blkIndent) break;
if (l = u + 1, l >= o) break;
if (e.isEmpty(l) && l++, l >= o) break;
if (e.sCount[l] < e.blkIndent) break;
if (c = t(e, l), 0 > c) break;
}
return C = e.push("dl_close", "dl", -1), h[1] = g, e.line = g, w && r(e, f), !0;
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
}(), o = r(251), s = r(237), a = r(366), c = r(370), l = r(161), u = r(148), p = r(326), h = r(252).lang;
p.requirePhrase("mdeditor", r(367)("./" + h + ".yml"));
var f = {
standard: "bold italic | link ul ol | code fencedCode".split(" ")
}, d = function() {
function e(t) {
n(this, e), this.options = Object.create(t), t.buttonSet || (this.options.buttonSet = "standard"), 
this.renderPreviewThrottled = c(this.renderPreview.bind(this), 100), this.render(t.elem), 
this.renderPreviewThrottled(), this.delegate("[data-action]", "click", function(e) {
var t = "action" + e.delegateTarget.getAttribute("data-action")[0].toUpperCase() + e.delegateTarget.getAttribute("data-action").slice(1);
this[t] && (e.preventDefault(), this[t](), this.textArea.focus());
}), this.onResizeMouseDown = this.onResizeMouseDown.bind(this), this.onResizeMouseMove = this.onResizeMouseMove.bind(this), 
this.onResizeMouseUp = this.onResizeMouseUp.bind(this), this.delegate("[data-mdeditor-resize]", "mousedown", this.onResizeMouseDown), 
this.textArea.addEventListener("input", this.renderPreviewThrottled);
}
return i(e, [ {
key: "actionBold",
value: function() {
this.replaceSelection("**", "**", p("mdeditor.text.bold"));
}
}, {
key: "actionItalic",
value: function() {
this.replaceSelection("*", "*", p("mdeditor.text.italic"));
}
}, {
key: "actionCode",
value: function() {
this.replaceSelection("`", "`", p("mdeditor.text.code"));
}
}, {
key: "actionFencedCode",
value: function() {
this.replaceSelection("\n```js\n", "\n```\n", p("mdeditor.text.fencedCode"));
}
}, {
key: "actionLink",
value: function() {
var e = void 0, t = void 0, r = this.textArea.value, n = this.textArea.selectionStart != this.textArea.selectionEnd, i = n ? r.slice(this.textArea.selectionStart, this.textArea.selectionEnd) : "";
i && (i.match(/^https?:\/\//) ? t = i : e = i);
var o = e || p("mdeditor.text.link"), s = "[" + o + "](" + (t || "http://") + ")", a = r.slice(0, this.textArea.selectionStart), c = r.slice(this.textArea.selectionEnd);
this.textArea.value = a + s + c, e ? t || (this.textArea.selectionEnd = a.length + s.length - 1, 
this.textArea.selectionStart = this.textArea.selectionEnd) : (this.textArea.selectionStart = a.length + 1, 
this.textArea.selectionEnd = a.length + 1 + o.length);
}
}, {
key: "actionOl",
value: function() {
this.replaceSelection("\n\n1. ", "\n", p("mdeditor.text.ol"));
}
}, {
key: "actionUl",
value: function() {
this.replaceSelection("\n\n- ", "\n", p("mdeditor.text.ol"));
}
}, {
key: "actionHeading",
value: function() {
this.replaceSelection("\n\n# ", "\n", p("mdeditor.text.heading"));
}
}, {
key: "actionImage",
value: function() {}
}, {
key: "replaceSelection",
value: function(e, t, r) {
var n = this.textArea.value, i = this.textArea.selectionStart != this.textArea.selectionEnd, o = i ? n.slice(this.textArea.selectionStart, this.textArea.selectionEnd) : "", s = i ? e + o + t : e + r + t, a = n.slice(0, this.textArea.selectionStart), c = n.slice(this.textArea.selectionEnd);
this.textArea.value = a + s + c, i || (this.textArea.selectionStart = a.length + e.length, 
this.textArea.selectionEnd = a.length + e.length + r.length), this.renderPreviewThrottled();
}
}, {
key: "render",
value: function(e) {
var t = f[this.options.buttonSet || "standard"];
e.insertAdjacentHTML("afterEnd", l(a, {
buttons: t
})), this.elem = e.nextElementSibling;
var r = this.elem.querySelector("textarea");
r.replace(e), this.textArea = e, e.classList.remove("mdeditor");
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
var t = e.clientY - this.textArea.getBoundingClientRect().top;
30 > t && (t = 30), this.textArea.style.height = t + "px";
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
var e = this.textArea.value, t = new o().render(e);
this.elem.querySelector("[data-editor-preview]").innerHTML = t, this.highlightInPreview();
}
} ]), e;
}();
u.delegateMixin(d.prototype), e.exports = d;
}, , , , , , , function(e, r, n) {
var i = n(158);
e.exports = function(e) {
var r, n = [], o = {}, s = e || {};
return function(e, t, s, a) {
n.push("");
var c = [];
o.b = r = function(t, r, i) {
this && this.block, this && this.attributes || {};
e.call(this, n, c, t, r, i);
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
if ("number" == typeof e.length) for (var n = 0, c = e.length; c > n; n++) {
var l = e[n];
if ("|" == l) o.e.call({
attributes: {
"class": "button-separator"
}
}); else {
var u = a("mdeditor.buttons." + l);
-1 != s.userAgent.indexOf("Mac OS X") && (u = u.replace("Ctrl", "Cmd")), o.e.call({
attributes: {
"data-action": "string" == typeof (r = l) ? i.escape(r) : r,
"data-tooltip": "string" == typeof (r = u) ? i.escape(r) : r,
"class": "button"
}
}, "button");
}
} else {
var c = 0;
for (var n in e) {
c++;
var l = e[n];
if ("|" == l) o.e.call({
attributes: {
"class": "button-separator"
}
}); else {
var u = a("mdeditor.buttons." + l);
-1 != s.userAgent.indexOf("Mac OS X") && (u = u.replace("Ctrl", "Cmd")), o.e.call({
attributes: {
"data-action": "string" == typeof (r = l) ? i.escape(r) : r,
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
}.call(this, "bem" in s ? s.bem : "undefined" != typeof bem ? bem : void 0, "buttons" in s ? s.buttons : "undefined" != typeof buttons ? buttons : void 0, "navigator" in s ? s.navigator : "undefined" != typeof navigator ? navigator : void 0, "t" in s ? s.t : "undefined" != typeof t ? t : void 0), 
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
var n = !0, a = !0;
if ("function" != typeof e) throw new TypeError(s);
return o(r) && (n = "leading" in r ? !!r.leading : n, a = "trailing" in r ? !!r.trailing : a), 
i(e, t, {
leading: n,
maxWait: t,
trailing: a
});
}
var i = r(371), o = r(372), s = "Expected a function";
e.exports = n;
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
function n() {
k && clearTimeout(k), g && clearTimeout(g), y = 0, d = g = v = k = _ = void 0;
}
function l(t, r) {
r && clearTimeout(r), g = k = _ = void 0, t && (y = o(), m = e.apply(v, d), k || g || (d = v = void 0));
}
function u() {
var e = t - (o() - b);
0 >= e || e > t ? l(_, g) : k = setTimeout(u, e);
}
function p() {
return (k && _ || g && E) && (m = e.apply(v, d)), n(), m;
}
function h() {
l(E, k);
}
function f() {
if (d = arguments, b = o(), v = this, _ = E && (k || !A), x === !1) var r = A && !k; else {
y || g || A || (y = b);
var n = x - (b - y), i = (0 >= n || n > x) && (A || g);
i ? (g && (g = clearTimeout(g)), y = b, m = e.apply(v, d)) : g || (g = setTimeout(h, n));
}
return i && k ? k = clearTimeout(k) : k || t === x || (k = setTimeout(u, t)), r && (i = !0, 
m = e.apply(v, d)), !i || k || g || (d = v = void 0), m;
}
var d, g, m, b, v, k, _, y = 0, A = !1, x = !1, E = !0;
if ("function" != typeof e) throw new TypeError(a);
return t = s(t) || 0, i(r) && (A = !!r.leading, x = "maxWait" in r && c(s(r.maxWait) || 0, t), 
E = "trailing" in r ? !!r.trailing : E), f.cancel = n, f.flush = p, f;
}
var i = r(372), o = r(373), s = r(374), a = "Expected a function", c = Math.max;
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
e = e.replace(a, "");
var r = l.test(e);
return r || u.test(e) ? p(e.slice(2), r ? 2 : 8) : c.test(e) ? s : +e;
}
var i = r(375), o = r(372), s = NaN, a = /^\s+|\s+$/g, c = /^[-+]0x[0-9a-f]+$/i, l = /^0b[01]+$/i, u = /^0o[0-7]+$/i, p = parseInt;
e.exports = n;
}, function(e, t, r) {
"use strict";
function n(e) {
var t = i(e) ? c.call(e) : "";
return t == o || t == s;
}
var i = r(372), o = "[object Function]", s = "[object GeneratorFunction]", a = Object.prototype, c = a.toString;
e.exports = n;
} ]);
//# sourceMappingURL=mdeditor.53daaf29060772044b39.js.map
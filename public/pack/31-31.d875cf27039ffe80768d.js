webpackJsonp_name_([ 31 ], Array(87).concat([ function(e, t) {
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
var s = i[e];
if (2 == arguments.length) {
r = arguments[1];
for (var o in r) r.hasOwnProperty(o) && (s[o] = r[o]);
return s;
}
var a = {};
for (var c in s) if (s.hasOwnProperty(c)) {
if (c == t) for (var o in r) r.hasOwnProperty(o) && (a[o] = r[o]);
a[c] = s[c];
}
return n.languages.DFS(n.languages, function(t, r) {
r === i[e] && t != e && (this[t] = a);
}), i[e] = a;
},
DFS: function(e, t, r, i) {
i = i || {};
for (var s in e) e.hasOwnProperty(s) && (t.call(e, s, e[s], r || s), "Object" !== n.util.type(e[s]) || i[n.util.objId(e[s])] ? "Array" !== n.util.type(e[s]) || i[n.util.objId(e[s])] || (i[n.util.objId(e[s])] = !0, 
n.languages.DFS(e[s], t, s, i)) : (i[n.util.objId(e[s])] = !0, n.languages.DFS(e[s], t, null, i)));
}
},
plugins: {},
highlightAll: function(e, t) {
for (var r, i = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), s = 0; r = i[s++]; ) n.highlightElement(r, e === !0, t);
},
highlightElement: function(t, i, s) {
for (var o, a, c = t; c && !e.test(c.className); ) c = c.parentNode;
c && (o = (c.className.match(e) || [ , "" ])[1], a = n.languages[o]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o, 
c = t.parentNode, /pre/i.test(c.nodeName) && (c.className = c.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o);
var l = t.textContent, u = {
element: t,
language: o,
grammar: a,
code: l
};
if (!l || !a) return void n.hooks.run("complete", u);
if (n.hooks.run("before-highlight", u), i && r.Worker) {
var p = new Worker(n.filename);
p.onmessage = function(e) {
u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, 
s && s.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
}, p.postMessage(JSON.stringify({
language: u.language,
code: u.code,
immediateClose: !0
}));
} else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), 
u.element.innerHTML = u.highlightedCode, s && s.call(t), n.hooks.run("after-highlight", u), 
n.hooks.run("complete", u);
},
highlight: function(e, t, r) {
var s = n.tokenize(e, t);
return i.stringify(n.util.encode(s), r);
},
tokenize: function(e, t, r) {
var i = n.Token, s = [ e ], o = t.rest;
if (o) {
for (var a in o) t[a] = o[a];
delete t.rest;
}
e: for (var a in t) if (t.hasOwnProperty(a) && t[a]) {
var c = t[a];
c = "Array" === n.util.type(c) ? c : [ c ];
for (var l = 0; l < c.length; ++l) {
var u = c[l], p = u.inside, h = !!u.lookbehind, f = 0, d = u.alias;
u = u.pattern || u;
for (var g = 0; g < s.length; g++) {
var m = s[g];
if (s.length > e.length) break e;
if (!(m instanceof i)) {
u.lastIndex = 0;
var b = u.exec(m);
if (b) {
h && (f = b[1].length);
var k = b.index - 1 + f, b = b[0].slice(f), _ = b.length, v = k + _, y = m.slice(0, k + 1), E = m.slice(v + 1), A = [ g, 1 ];
y && A.push(y);
var x = new i(a, p ? n.tokenize(b, p) : b, d);
A.push(x), E && A.push(E), Array.prototype.splice.apply(s, A);
}
}
}
}
}
return s;
},
hooks: {
all: {},
add: function(e, t) {
var r = n.hooks.all;
r[e] = r[e] || [], r[e].push(t);
},
run: function(e, t) {
var r = n.hooks.all[e];
if (r && r.length) for (var i, s = 0; i = r[s++]; ) i(t);
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
var s = {
type: e.type,
content: i.stringify(e.content, t, r),
tag: "span",
classes: [ "token", e.type ],
attributes: {},
language: t,
parent: r
};
if ("comment" == s.type && (s.attributes.spellcheck = "true"), e.alias) {
var o = "Array" === n.util.type(e.alias) ? e.alias : [ e.alias ];
Array.prototype.push.apply(s.classes, o);
}
n.hooks.run("wrap", s);
var a = "";
for (var c in s.attributes) a += (a ? " " : "") + c + '="' + (s.attributes[c] || "") + '"';
return "<" + s.tag + ' class="' + s.classes.join(" ") + '" ' + a + ">" + s.content + "</" + s.tag + ">";
}, !r.document) return r.addEventListener ? (r.addEventListener("message", function(e) {
var t = JSON.parse(e.data), i = t.language, s = t.code, o = t.immediateClose;
r.postMessage(n.highlight(s, n.languages[i], i)), o && r.close();
}, !1), r.Prism) : r.Prism;
var s = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
return s && (n.filename = s.src, document.addEventListener && !s.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), 
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
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t) {
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
new o(n), n.setAttribute("data-prism-done", "1");
}
}
function i(e) {
for (var t = e.querySelectorAll("div.code-tabs:not([data-prism-done])"), r = 0; r < t.length; r++) new a(t[r]), 
t[r].setAttribute("data-prism-done", "1");
}
function s(e) {
n(e), i(e);
}
r(87), r(88), r(89), r(90), r(91), r(92), r(93), r(94), r(95), r(96), r(97), r(98), 
r(99), r(100), r(101), Prism.tokenTag = "code";
var o = r(238), a = r(241);
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
s(document);
});
}, t.highlight = s;
}, function(e, t, r) {
"use strict";
function n(e) {
function t() {
var e = v.contentWindow;
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
if (k) {
var n = t.contentDocument || t.contentWindow.document;
n.open(), n.write(p(g)), n.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(n.querySelectorAll("script"), function(e) {
e.remove();
});
}, 2e3), e.hasAttribute("data-demo-height") || o.iframe(t), E && e.hasAttribute("data-autorun") || a(y) || y.scrollIntoView(!1);
} else {
var i = document.createElement("form");
i.style.display = "none", i.method = "POST", i.enctype = "multipart/form-data", 
i.action = "https://ru.lookatcode.com/showhtml", i.target = t.name;
var s = document.createElement("textarea");
s.name = "code", s.value = p(g), i.appendChild(s), t.parentNode.insertBefore(i, t.nextSibling), 
i.submit(), i.remove(), E && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || o.iframe(t), a(y) || y.scrollIntoView(!1);
});
}
}
function n(e) {
var t = document.createElement("script");
t.text = e, document.head.appendChild(t).parentNode.removeChild(t);
}
function l() {
if (k) {
if (e.hasAttribute("data-autorun")) return void n(g);
try {
window.eval.call(window, g);
} catch (r) {
alert("Error: " + r.message);
}
} else e.hasAttribute("data-refresh") && v && (v.remove(), v = null), v ? t() : (v = document.createElement("iframe"), 
v.className = "js-frame", v.src = "https://ru.lookatcode.com/showjs", v.style.width = 0, 
v.style.height = 0, v.style.border = "none", v.onload = function() {
t();
}, document.body.appendChild(v));
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
var e = g.toLowerCase(), t = e.match("<body>"), r = e.match("</body>"), n = e.match("<html>"), i = e.match("</html>"), s = e.match(/^\s*<!doctype/);
if (s) return g;
var o = g;
return n || (o = "<html>\n" + o), i || (o += "\n</html>"), t || (o = o.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
r || (o = o.replace("</html>", "\n</body>\n</html>")), o = "<!DOCTYPE HTML>\n" + o;
}
function h() {
m ? l() : r(), E = !1;
}
var f = e.querySelector("pre"), d = f.querySelector("code"), g = d.textContent;
Prism.highlightElement(d), c(f), i(f, e.getAttribute("data-highlight-block")), s(f, e.getAttribute("data-highlight-inline"));
var m = f.classList.contains("language-javascript"), b = f.classList.contains("language-markup"), k = +e.getAttribute("data-trusted"), _ = +e.getAttribute("data-no-strict");
!_ && m && (g = "'use strict';\n" + g);
var v, y, E = !0;
if (m || b) {
var A = e.querySelector('[data-action="run"]');
A && (A.onclick = function() {
return this.blur(), h(), !1;
});
var x = e.querySelector('[data-action="edit"]');
x && (x.onclick = function() {
return this.blur(), u(), !1;
}), e.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == e.getAttribute("data-autorun") ? e.querySelector("iframe").remove() : setTimeout(h, 100));
}
}
function i(e, t) {
if (t) for (var r, n = t.replace(/\s+/g, "").split(","), i = 0; r = n[i++]; ) {
r = r.split("-");
var s = +r[0], o = +r[1] || s, a = '<code class="block-highlight" data-start="' + s + '" data-end="' + o + '">' + Array(s + 1).join("\n") + '<code class="mask">' + Array(o - s + 2).join("\n") + "</code></code>";
e.insertAdjacentHTML("afterBegin", a);
}
}
function s(e, t) {
var r = e.querySelector('code[class*="language-"]');
t = t ? t.split(",") : [];
for (var n = 0; n < t.length; n++) {
var i = t[n].split(":"), s = +i[0], o = i[1].split("-"), a = +o[0], c = +o[1], l = '<code class="inline-highlight">' + Array(s + 1).join("\n") + Array(a + 1).join(" ") + '<code class="mask">' + Array(c - a + 1).join(" ") + "</code></code>";
r.insertAdjacentHTML("afterBegin", l);
}
}
var o = r(197), a = r(239), c = r(240);
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
var i = r(148), s = r(240);
n.prototype.onSwitchClick = function(e) {
e.preventDefault();
for (var t, r = e.delegateTarget.parentNode.children, n = this.elem.querySelector("[data-code-tabs-content]").children, i = 0; i < r.length; i++) {
var s = r[i], o = n[i];
s == e.delegateTarget ? (t = i, o.classList.add("code-tabs__section_current"), s.classList.add("code-tabs__switch_current")) : (o.classList.remove("code-tabs__section_current"), 
s.classList.remove("code-tabs__switch_current"));
}
0 === t ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(n[t]));
}, n.prototype.highlightTab = function(e) {
if (!e.highlighted) {
var t = e.querySelector("pre"), r = t.querySelector("code");
Prism.highlightElement(r), s(t), e.highlighted = !0;
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
}(), s = r(252).lang, o = r(378), a = r(344), c = r(322), l = r(323), u = r(334), p = r(338), h = r(340), f = r(341), d = r(431), g = r(337);
e.exports = function() {
function e(t) {
n(this, e), t = t || {}, this.options = t, this.env = t.env || {}, this.md = o(Object.assign({
typographer: !0,
blockTags: g.allSupported,
linkHeaderTag: !1,
html: !1,
quotes: "ru" == s ? "«»„“" : "“”‘’"
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
}, , , , , , function(e, t) {
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
var s, o, a, c, l, u = "";
for ("string" != typeof t && (i = t, t = n.defaultChars), void 0 === i && (i = !0), 
l = r(t), s = 0, o = e.length; o > s; s++) if (a = e.charCodeAt(s), i && 37 === a && o > s + 2 && /^[0-9a-f]{2}$/i.test(e.slice(s + 1, s + 3))) u += e.slice(s, s + 3), 
s += 2; else if (128 > a) u += l[a]; else if (a >= 55296 && 57343 >= a) {
if (a >= 55296 && 56319 >= a && o > s + 1 && (c = e.charCodeAt(s + 1), c >= 56320 && 57343 >= c)) {
u += encodeURIComponent(e[s] + e[s + 1]), s++;
continue;
}
u += "%EF%BF%BD";
} else u += encodeURIComponent(e[s]);
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
var t, r, n, s, o, a, c, l = "";
for (t = 0, r = e.length; r > t; t += 3) n = parseInt(e.slice(t + 1, t + 3), 16), 
128 > n ? l += i[n] : 192 === (224 & n) && r > t + 3 && (s = parseInt(e.slice(t + 4, t + 6), 16), 
128 === (192 & s)) ? (c = n << 6 & 1984 | 63 & s, l += 128 > c ? "��" : String.fromCharCode(c), 
t += 3) : 224 === (240 & n) && r > t + 6 && (s = parseInt(e.slice(t + 4, t + 6), 16), 
o = parseInt(e.slice(t + 7, t + 9), 16), 128 === (192 & s) && 128 === (192 & o)) ? (c = n << 12 & 61440 | s << 6 & 4032 | 63 & o, 
l += 2048 > c || c >= 55296 && 57343 >= c ? "���" : String.fromCharCode(c), t += 6) : 240 === (248 & n) && r > t + 9 && (s = parseInt(e.slice(t + 4, t + 6), 16), 
o = parseInt(e.slice(t + 7, t + 9), 16), a = parseInt(e.slice(t + 10, t + 12), 16), 
128 === (192 & s) && 128 === (192 & o) && 128 === (192 & a)) ? (c = n << 18 & 1835008 | s << 12 & 258048 | o << 6 & 4032 | 63 & a, 
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
var i = /^([a-z0-9.+-]+:)/i, s = /:[0-9]*$/, o = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, a = [ "<", ">", '"', "`", " ", "\r", "\n", "	" ], c = [ "{", "}", "|", "\\", "^", "`" ].concat(a), l = [ "'" ].concat(c), u = [ "%", "/", "?", ";", "#" ].concat(l), p = [ "/", "?", "#" ], h = 255, f = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, g = {
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
var r, n, s, a, c, l = e;
if (l = l.trim(), !t && 1 === e.split("#").length) {
var b = o.exec(l);
if (b) return this.pathname = b[1], b[2] && (this.search = b[2]), this;
}
var k = i.exec(l);
if (k && (k = k[0], s = k.toLowerCase(), this.protocol = k, l = l.substr(k.length)), 
(t || k || l.match(/^\/\/[^@\/]+@[^@\/]+/)) && (c = "//" === l.substr(0, 2), !c || k && g[k] || (l = l.substr(2), 
this.slashes = !0)), !g[k] && (c || k && !m[k])) {
var _ = -1;
for (r = 0; r < p.length; r++) a = l.indexOf(p[r]), -1 !== a && (-1 === _ || _ > a) && (_ = a);
var v, y;
for (y = -1 === _ ? l.lastIndexOf("@") : l.lastIndexOf("@", _), -1 !== y && (v = l.slice(0, y), 
l = l.slice(y + 1), this.auth = v), _ = -1, r = 0; r < u.length; r++) a = l.indexOf(u[r]), 
-1 !== a && (-1 === _ || _ > a) && (_ = a);
-1 === _ && (_ = l.length), ":" === l[_ - 1] && _--;
var E = l.slice(0, _);
l = l.slice(_), this.parseHost(E), this.hostname = this.hostname || "";
var A = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
if (!A) {
var x = this.hostname.split(/\./);
for (r = 0, n = x.length; n > r; r++) {
var C = x[r];
if (C && !C.match(f)) {
for (var w = "", S = 0, T = C.length; T > S; S++) w += C.charCodeAt(S) > 127 ? "x" : C[S];
if (!w.match(f)) {
var D = x.slice(0, r), L = x.slice(r + 1), I = C.match(d);
I && (D.push(I[1]), L.unshift(I[2])), L.length && (l = L.join(".") + l), this.hostname = D.join(".");
break;
}
}
}
}
this.hostname.length > h && (this.hostname = ""), A && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
}
var R = l.indexOf("#");
-1 !== R && (this.hash = l.substr(R), l = l.slice(0, R));
var q = l.indexOf("?");
return -1 !== q && (this.search = l.substr(q), l = l.slice(0, q)), l && (this.pathname = l), 
m[s] && this.hostname && !this.pathname && (this.pathname = ""), this;
}, r.prototype.parseHost = function(e) {
var t = s.exec(e);
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
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
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
function s(e) {
return "[object String]" === i(e);
}
function o(e) {
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
return e || k.hasOwnProperty(t);
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
e.__tlds_replaced__ || d.push(v), d.push(u.src_xn), u.src_tlds = d.join("|"), u.email_fuzzy = RegExp(t(u.tpl_email_fuzzy), "i"), 
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
return e.__compiled__[t] = n, o(r) ? (a(r.validate) ? n.validate = h(r.validate) : c(r.validate) ? n.validate = r.validate : i(t, r), 
void (c(r.normalize) ? n.normalize = r.normalize : r.normalize ? i(t, r) : n.normalize = f())) : s(r) ? void g.push(t) : void i(t, r);
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
return this instanceof b ? (t || u(e) && (t = e, e = {}), this.__opts__ = n({}, k, t), 
this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", 
this.__schemas__ = n({}, _, e), this.__compiled__ = {}, this.__tlds__ = y, this.__tlds_replaced__ = !1, 
this.re = {}, void d(this)) : new b(e, t);
}
var k = {
fuzzyLink: !0,
fuzzyEmail: !0,
fuzzyIP: !1
}, _ = {
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
}, v = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", y = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
b.prototype.add = function(e, t) {
return this.__schemas__[e] = t, d(this), this;
}, b.prototype.set = function(e) {
return this.__opts__ = n(this.__opts__, e), this;
}, b.prototype.test = function(e) {
if (this.__text_cache__ = e, this.__index__ = -1, !e.length) return !1;
var t, r, n, i, s, o, a, c, l;
if (this.re.schema_test.test(e)) for (a = this.re.schema_search, a.lastIndex = 0; null !== (t = a.exec(e)); ) if (i = this.testSchemaAt(e, t[2], a.lastIndex)) {
this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + i;
break;
}
return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = e.search(this.re.host_fuzzy_test), 
c >= 0 && (this.__index__ < 0 || c < this.__index__) && null !== (r = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (s = r.index + r[1].length, 
(this.__index__ < 0 || s < this.__index__) && (this.__schema__ = "", this.__index__ = s, 
this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (l = e.indexOf("@"), 
l >= 0 && null !== (n = e.match(this.re.email_fuzzy)) && (s = n.index + n[1].length, 
o = n.index + n[0].length, (this.__index__ < 0 || s < this.__index__ || s === this.__index__ && o > this.__last_index__) && (this.__schema__ = "mailto:", 
this.__index__ = s, this.__last_index__ = o))), this.__index__ >= 0;
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
var n = t.src_Any = r(265).source, i = t.src_Cc = r(266).source, s = t.src_Z = r(268).source, o = t.src_P = r(258).source, a = t.src_ZPCc = [ s, o, i ].join("|"), c = t.src_ZCc = [ s, i ].join("|"), l = "(?:(?!" + a + ")" + n + ")", u = "(?:(?![0-9]|" + a + ")" + n + ")", p = t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
t.src_auth = "(?:(?:(?!" + c + ").)+@)?";
var h = t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", f = t.src_host_terminator = "(?=$|" + a + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + a + "))", d = t.src_path = "(?:[/?#](?:(?!" + c + "|[()[\\]{}.,\"'?!\\-]).|\\[(?:(?!" + c + "|\\]).)*\\]|\\((?:(?!" + c + "|[)]).)*\\)|\\{(?:(?!" + c + '|[}]).)*\\}|\\"(?:(?!' + c + '|["]).)+\\"|\\\'(?:(?!' + c + "|[']).)+\\'|\\'(?=" + l + ").|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!" + c + "|[.]).|\\-(?!--(?:[^-]|$))(?:-*)|\\,(?!" + c + ").|\\!(?!" + c + "|[!]).|\\?(?!" + c + "|[?]).)+|\\/)?", g = t.src_email_name = '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+', m = t.src_xn = "xn--[a-z0-9\\-]{1,59}", b = t.src_domain_root = "(?:" + m + "|" + u + "{1,63})", k = t.src_domain = "(?:" + m + "|(?:" + l + ")|(?:" + l + "(?:-(?!-)|" + l + "){0,61}" + l + "))", _ = t.src_host = "(?:" + p + "|(?:(?:(?:" + k + ")\\.)*" + b + "))", v = t.tpl_host_fuzzy = "(?:" + p + "|(?:(?:(?:" + k + ")\\.)+(?:%TLDS%)))", y = t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + k + ")\\.)+(?:%TLDS%))";
t.src_host_strict = _ + f;
var E = t.tpl_host_fuzzy_strict = v + f;
t.src_host_port_strict = _ + h + f;
var A = t.tpl_host_port_fuzzy_strict = v + h + f, x = t.tpl_host_port_no_ip_fuzzy_strict = y + h + f;
t.tpl_host_fuzzy_test = "localhost|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + a + "|$))", 
t.tpl_email_fuzzy = "(^|>|" + c + ")(" + g + "@" + E + ")", t.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + a + "))((?![$+<=>^`|])" + A + d + ")", 
t.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + a + "))((?![$+<=>^`|])" + x + d + ")";
}, function(e, t, r) {
var n;
(function(e, i) {
/*! https://mths.be/punycode v1.4.0 by @mathias */
"use strict";
!function(s) {
function o(e) {
throw new RangeError(R[e]);
}
function a(e, t) {
for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
return n;
}
function c(e, t) {
var r = e.split("@"), n = "";
r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(I, ".");
var i = e.split("."), s = a(i, t).join(".");
return n + s;
}
function l(e) {
for (var t, r, n = [], i = 0, s = e.length; s > i; ) t = e.charCodeAt(i++), t >= 55296 && 56319 >= t && s > i ? (r = e.charCodeAt(i++), 
56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), 
i--)) : n.push(t);
return n;
}
function u(e) {
return a(e, function(e) {
var t = "";
return e > 65535 && (e -= 65536, t += O(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), 
t += O(e);
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
for (e = r ? N(e / C) : e >> 1, e += N(e / t); e > q * A >> 1; n += y) e = N(e / q);
return N(n + (q + 1) * e / (e + x));
}
function d(e) {
var t, r, n, i, s, a, c, l, h, d, g = [], m = e.length, b = 0, k = S, _ = w;
for (r = e.lastIndexOf(T), 0 > r && (r = 0), n = 0; r > n; ++n) e.charCodeAt(n) >= 128 && o("not-basic"), 
g.push(e.charCodeAt(n));
for (i = r > 0 ? r + 1 : 0; m > i; ) {
for (s = b, a = 1, c = y; i >= m && o("invalid-input"), l = p(e.charCodeAt(i++)), 
(l >= y || l > N((v - b) / a)) && o("overflow"), b += l * a, h = _ >= c ? E : c >= _ + A ? A : c - _, 
!(h > l); c += y) d = y - h, a > N(v / d) && o("overflow"), a *= d;
t = g.length + 1, _ = f(b - s, t, 0 == s), N(b / t) > v - k && o("overflow"), k += N(b / t), 
b %= t, g.splice(b++, 0, k);
}
return u(g);
}
function g(e) {
var t, r, n, i, s, a, c, u, p, d, g, m, b, k, _, x = [];
for (e = l(e), m = e.length, t = S, r = 0, s = w, a = 0; m > a; ++a) g = e[a], 128 > g && x.push(O(g));
for (n = i = x.length, i && x.push(T); m > n; ) {
for (c = v, a = 0; m > a; ++a) g = e[a], g >= t && c > g && (c = g);
for (b = n + 1, c - t > N((v - r) / b) && o("overflow"), r += (c - t) * b, t = c, 
a = 0; m > a; ++a) if (g = e[a], t > g && ++r > v && o("overflow"), g == t) {
for (u = r, p = y; d = s >= p ? E : p >= s + A ? A : p - s, !(d > u); p += y) _ = u - d, 
k = y - d, x.push(O(h(d + _ % k, 0))), u = N(_ / k);
x.push(O(h(u, 0))), s = f(r, b, n == i), r = 0, ++n;
}
++r, ++t;
}
return x.join("");
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
var k = ("object" == typeof t && t && !t.nodeType && t, "object" == typeof e && e && !e.nodeType && e, 
"object" == typeof i && i);
(k.global === k || k.window === k || k.self === k) && (s = k);
var _, v = 2147483647, y = 36, E = 1, A = 26, x = 38, C = 700, w = 72, S = 128, T = "-", D = /^xn--/, L = /[^\x20-\x7E]/, I = /[\x2E\u3002\uFF0E\uFF61]/g, R = {
overflow: "Overflow: input needs wider integers to process",
"not-basic": "Illegal input >= 0x80 (not a basic code point)",
"invalid-input": "Invalid input"
}, q = y - E, N = Math.floor, O = String.fromCharCode;
_ = {
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
return _;
}.call(t, r, t, e), !(void 0 !== n && (e.exports = n));
}(void 0);
}).call(t, r(211)(e), function() {
return this;
}());
}, , , , , function(e, t) {
"use strict";
e.exports = function(e) {
function t(t) {
var r = [];
if ("+" === t) return '<kbd class="shortcut">+</kbd>';
var n = Math.random();
t = t.replace(/\+\+/g, "+" + n), t = t.split("+");
for (var i = 0; i < t.length; i++) {
var s = t[i];
r.push(s == n ? "+" : e.utils.escapeHtml(s)), i < t.length - 1 && r.push('<span class="shortcut__plus">+</span>');
}
return '<kbd class="shortcut">' + r.join("") + "</kbd>";
}
e.renderer.rules.code_inline = function(r, n, i, s, o) {
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
var n = r(430), i = r(325), s = r(326), o = r(252).lang;
s.requirePhrase("markit.outlined", r(331)("./" + o + ".yml")), e.exports = function(e) {
[ "warn", "smart", "ponder" ].forEach(function(t) {
e.use(n, t, {
marker: "`",
render: function(r, n, o, a, c) {
if (1 === r[n].nesting) {
var l = i(r[n].info, !0), u = l.header;
return u = u ? e.renderInline(u) : s("markit.outlined." + t), '<div class="important important_' + t + '">\n            <div class="important__header"><span class="important__type">' + u + '</span></div>\n            <div class="important__content">';
}
return "</div></div>\n";
}
});
});
};
}, , function(e, t) {
"use strict";
var r = /([\w-]+)(?:=(?:'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)"|(\S+))|(?:\s|$))/g;
e.exports = function(e, t) {
var n = {};
if (!e) return n;
var i = void 0;
t && (i = e.match(/^\w+/), i = i && i[0], e = e.replace(/^\w+\s+/, ""));
for (var s = void 0, o = void 0, a = void 0; null !== (s = r.exec(e)); ) o = s[1], 
a = void 0 !== s[2] ? s[2].replace(/\\'/g, "'") : void 0 !== s[3] ? s[3].replace(/\\"/g, '"') : s[4], 
n[o.toLowerCase()] = void 0 === a ? !0 : a;
return i && (n.blockName = i), n;
};
}, , , , , , function(e, t, r) {
function n(e) {
return r(i(e));
}
function i(e) {
return s[e] || function() {
throw Error("Cannot find module '" + e + "'.");
}();
}
var s = {
"./en.yml": 332,
"./ru.yml": 333
};
n.keys = function() {
return Object.keys(s);
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
var i = r(325), s = r(335), o = r(336), a = r(326), c = r(337), l = r(252).lang;
a.requirePhrase("markit.code", r(345)("./" + l + ".yml")), e.exports = function(e) {
e.core.ruler.push("rewrite_fence_to_source", n), e.renderer.rules.blocktag_source = function(t, r, n, i, l) {
var u = t[r], p = u.blockTagAttrs, h = p.blockName, f = c(h);
u.attrPush([ "data-trusted", n.html && !p.untrusted ? 1 : 0 ]), u.attrPush([ "class", "code-example" ]), 
p["no-strict"] && u.attrPush([ "data-no-strict", 1 ]);
var d = void 0;
+p.height && (d = +p.height, n.html || (d = Math.max(d, 800)), u.attrPush([ "data-demo-height", d ])), 
n.html && p.autorun && u.attrPush([ "data-autorun", p.autorun ]), p.refresh && u.attrPush([ "data-refresh", "1" ]), 
n.html && p.demo && u.attrPush([ "data-demo", "1" ]);
var g = s(u.content), m = o(g);
m.block && u.attrPush([ "data-highlight-block", m.block ]), m.inline && u.attrPush([ "data-highlight-inline", m.inline ]), 
g = m.text;
var b = "";
p.run && (b = '\n        <div class="toolbar codebox__toolbar">\n          <div class="toolbar__tool">\n            <a href="#" title="' + a("js" == h ? "markit.code.run" : "markit.code.show") + '" data-action="run" class="toolbar__button toolbar__button_run"></a>\n          </div>\n          <div class="toolbar__tool">\n            <a href="#" title="' + a("markit.code.open.sandbox") + '" target="_blank" data-action="edit" class="toolbar__button toolbar__button_edit"></a>\n          </div>\n        </div>');
var k = "";
return p.autorun && n.html && "html" == h && (k = '<div class="code-result code-example__result">\n        <iframe\n          class="code-result__iframe"\n          name="code-result-' + (1e9 * Math.random() ^ 0).toString(36) + '"\n          style="height:' + (d || 200) + 'px"\n          src="' + ("epub" == n.ebookType ? "/bookify/blank.html?" + Math.random() : "about:blank") + '"></iframe>\n      </div>'), 
"<div" + l.renderAttrs(u) + '>\n      <div class="codebox code-example__codebox">\n        ' + b + '\n        <div class="codebox__code" data-code="1">\n          <pre class="line-numbers language-' + f + '"><code class="language-' + f + '">' + e.utils.escapeHtml(g) + "</code></pre>\n        </div>\n      </div>\n      " + k + "\n      </div>";
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
function s(e) {
if (!e) return e;
var t = /^ *(?=\S+)/gm, r = e.match(t).reduce(function(e, t) {
return Math.min(e, t.length);
}, 1 / 0), n = RegExp("^ {" + r + "}", "gm");
return r > 0 ? e.replace(n, "") : e;
}
function o(e) {
if (!e) return e;
var t = /^\t*(?=\S+)/gm, r = e.match(t).reduce(function(e, t) {
return Math.min(e, t.length);
}, 1 / 0), n = RegExp("^	{" + r + "}", "gm");
return r > 0 ? e.replace(n, "") : e;
}
e.exports = function(e) {
return e = n(e), e = i(e), e = r(e), e = s(e), e = o(e);
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
var s = e.indexOf("*!*"), o = e.indexOf("*/!*");
if (-1 == s || -1 == o) {
i[i.length - 1] += e;
break;
}
t.inline.push(i.length - 1 + ":" + (r + s) + "-" + (r + o - 3)), i[i.length - 1] += e.slice(0, o + 4).replace(/\*\/?!\*/g, ""), 
r += o - 3, e = e.slice(o + 4);
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
}, i = "none markup javascript css coffeescript php http java ruby scss sql".split(" "), s = Object.keys(n).concat(i);
r.languages = i, r.allSupported = s, e.exports = r;
}, function(e, t, r) {
"use strict";
function n(e) {
function t(t) {
if (t.children.length) {
var r = t.children[t.children.length - 1], n = r.content.split("|");
if (2 == n.length || (n = r.content.split(", "), 2 == n.length)) {
r.content = n[0];
var o = i(n[1]);
for (var a in o) (e.md.options.html || -1 != [ "height", "width" ].indexOf(a)) && s.attrReplace(t, a, o[a]);
}
}
}
for (var r = 0; r < e.tokens.length; r++) {
var n = e.tokens[r];
if ("inline" === n.type) for (var o = 0; o < n.children.length; o++) {
var a = n.children[o];
"image" == a.type && t(a);
}
}
}
var i = r(325), s = r(339);
e.exports = function(e) {
e.core.ruler.push("read_img_attrs", n);
};
}, function(e, t) {
"use strict";
function r(e, t, r) {
var n, i = e.attrs;
if (i) {
for (var s = 0; s < i.length; s++) i[s][0] === t && (n ? (i.splice(s, 1), s--) : (i[s][1] = r, 
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
function s(e, t) {
var r = e.attrIndex(t);
return -1 == r ? null : void e.attrs.splice(r, 1);
}
t.attrReplace = r, t.attrGet = i, t.attrDel = s, t.addClass = n;
}, function(e, t) {
"use strict";
e.exports = function(e) {
e.renderer.rules.markdown_error_block = function(t, r, n, i, s) {
return '<div class="markdown-error">' + e.utils.escapeHtml(t[r].content) + "</div>";
}, e.renderer.rules.markdown_error_inline = function(t, r, n, i, s) {
return '<span class="markdown-error">' + e.utils.escapeHtml(t[r].content) + "</span>";
};
};
}, function(e, t, r) {
"use strict";
function n(e) {
for (var t = 1; t < e.tokens.length - 1; t++) if ("paragraph_open" == e.tokens[t - 1].type && "paragraph_close" == e.tokens[t + 1].type && "inline" == e.tokens[t].type) {
var r = e.tokens[t].content.trim().match(/^\[(\w+\s*[^\]]*)\]$/);
if (!r) continue;
var n = i(r[1], !0), o = n.blockName;
if (!e.md.options.blockTags || -1 == e.md.options.blockTags.indexOf(o)) continue;
var a = -1 == s.allSupported.indexOf(o) ? "blocktag_" + o : "blocktag_source", c = new e.Token(a, o, e.tokens[t].nesting);
c.blockTagAttrs = n, c.map = e.tokens[t].map.slice(), c.block = !0, c.level = e.tokens[t].level, 
e.tokens.splice(t - 1, 3, c);
}
}
var i = r(325), s = r(337);
e.exports = function(e) {
e.core.ruler.push("rewrite_inline_to_block_tags", n);
};
}, , , function(e, t) {
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
return s[e] || function() {
throw Error("Cannot find module '" + e + "'.");
}();
}
var s = {
"./en.yml": 346,
"./ru.yml": 347
};
n.keys = function() {
return Object.keys(s);
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
}, , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
"use strict";
function n(e, t, r) {
var n = !0, a = !0;
if ("function" != typeof e) throw new TypeError(o);
return s(r) && (n = "leading" in r ? !!r.leading : n, a = "trailing" in r ? !!r.trailing : a), 
i(e, t, {
leading: n,
maxWait: t,
trailing: a
});
}
var i = r(371), s = r(372), o = "Expected a function";
e.exports = n;
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
function n() {
_ && clearTimeout(_), g && clearTimeout(g), y = 0, d = g = k = _ = v = void 0;
}
function l(t, r) {
r && clearTimeout(r), g = _ = v = void 0, t && (y = s(), m = e.apply(k, d), _ || g || (d = k = void 0));
}
function u() {
var e = t - (s() - b);
0 >= e || e > t ? l(v, g) : _ = setTimeout(u, e);
}
function p() {
return (_ && v || g && x) && (m = e.apply(k, d)), n(), m;
}
function h() {
l(x, _);
}
function f() {
if (d = arguments, b = s(), k = this, v = x && (_ || !E), A === !1) var r = E && !_; else {
y || g || E || (y = b);
var n = A - (b - y), i = (0 >= n || n > A) && (E || g);
i ? (g && (g = clearTimeout(g)), y = b, m = e.apply(k, d)) : g || (g = setTimeout(h, n));
}
return i && _ ? _ = clearTimeout(_) : _ || t === A || (_ = setTimeout(u, t)), r && (i = !0, 
m = e.apply(k, d)), !i || _ || g || (d = k = void 0), m;
}
var d, g, m, b, k, _, v, y = 0, E = !1, A = !1, x = !0;
if ("function" != typeof e) throw new TypeError(a);
return t = o(t) || 0, i(r) && (E = !!r.leading, A = "maxWait" in r && c(o(r.maxWait) || 0, t), 
x = "trailing" in r ? !!r.trailing : x), f.cancel = n, f.flush = p, f;
}
var i = r(372), s = r(373), o = r(374), a = "Expected a function", c = Math.max;
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
if (s(e)) {
var t = i(e.valueOf) ? e.valueOf() : e;
e = s(t) ? t + "" : t;
}
if ("string" != typeof e) return 0 === e ? e : +e;
e = e.replace(a, "");
var r = l.test(e);
return r || u.test(e) ? p(e.slice(2), r ? 2 : 8) : c.test(e) ? o : +e;
}
var i = r(375), s = r(372), o = NaN, a = /^\s+|\s+$/g, c = /^[-+]0x[0-9a-f]+$/i, l = /^0b[01]+$/i, u = /^0o[0-7]+$/i, p = parseInt;
e.exports = n;
}, function(e, t, r) {
"use strict";
function n(e) {
var t = i(e) ? c.call(e) : "";
return t == s || t == o;
}
var i = r(372), s = "[object Function]", o = "[object GeneratorFunction]", a = Object.prototype, c = a.toString;
e.exports = n;
}, , , function(e, t, r) {
"use strict";
e.exports = r(379);
}, function(e, t, r) {
"use strict";
function n(e) {
var t = e.trim().toLowerCase();
return b.test(t) ? k.test(t) ? !0 : !1 : !0;
}
function i(e) {
var t = d.parse(e, !0);
if (t.hostname && (!t.protocol || _.indexOf(t.protocol) >= 0)) try {
t.hostname = g.toASCII(t.hostname);
} catch (r) {}
return d.encode(d.format(t));
}
function s(e) {
var t = d.parse(e, !0);
if (t.hostname && (!t.protocol || _.indexOf(t.protocol) >= 0)) try {
t.hostname = g.toUnicode(t.hostname);
} catch (r) {}
return d.decode(d.format(t));
}
function o(e, t) {
return this instanceof o ? (t || a.isString(e) || (t = e || {}, e = "default"), 
this.inline = new h(), this.block = new p(), this.core = new u(), this.renderer = new l(), 
this.linkify = new f(), this.validateLink = n, this.normalizeLink = i, this.normalizeLinkText = s, 
this.utils = a, this.helpers = c, this.options = {}, this.configure(e), void (t && this.set(t))) : new o(e, t);
}
var a = r(380), c = r(382), l = r(386), u = r(387), p = r(397), h = r(412), f = r(315), d = r(259), g = r(317), m = {
"default": r(427),
zero: r(428),
commonmark: r(429)
}, b = /^(vbscript|javascript|file|data):/, k = /^data:image\/(gif|png|jpeg|webp);/, _ = [ "http:", "https:", "mailto:" ];
o.prototype.set = function(e) {
return a.assign(this.options, e), this;
}, o.prototype.configure = function(e) {
var t, r = this;
if (a.isString(e) && (t = e, e = m[t], !e)) throw Error('Wrong `markdown-it` preset "' + t + '", check name');
if (!e) throw Error("Wrong `markdown-it` preset, can't be empty");
return e.options && r.set(e.options), e.components && Object.keys(e.components).forEach(function(t) {
e.components[t].rules && r[t].ruler.enableOnly(e.components[t].rules), e.components[t].rules2 && r[t].ruler2.enableOnly(e.components[t].rules2);
}), this;
}, o.prototype.enable = function(e, t) {
var r = [];
Array.isArray(e) || (e = [ e ]), [ "core", "block", "inline" ].forEach(function(t) {
r = r.concat(this[t].ruler.enable(e, !0));
}, this), r = r.concat(this.inline.ruler2.enable(e, !0));
var n = e.filter(function(e) {
return r.indexOf(e) < 0;
});
if (n.length && !t) throw Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
return this;
}, o.prototype.disable = function(e, t) {
var r = [];
Array.isArray(e) || (e = [ e ]), [ "core", "block", "inline" ].forEach(function(t) {
r = r.concat(this[t].ruler.disable(e, !0));
}, this), r = r.concat(this.inline.ruler2.disable(e, !0));
var n = e.filter(function(e) {
return r.indexOf(e) < 0;
});
if (n.length && !t) throw Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
return this;
}, o.prototype.use = function(e) {
var t = [ this ].concat(Array.prototype.slice.call(arguments, 1));
return e.apply(e, t), this;
}, o.prototype.parse = function(e, t) {
var r = new this.core.State(e, this, t);
return this.core.process(r), r.tokens;
}, o.prototype.render = function(e, t) {
return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t);
}, o.prototype.parseInline = function(e, t) {
var r = new this.core.State(e, this, t);
return r.inlineMode = !0, this.core.process(r), r.tokens;
}, o.prototype.renderInline = function(e, t) {
return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t);
}, e.exports = o;
}, function(e, t, r) {
"use strict";
function n(e) {
return Object.prototype.toString.call(e);
}
function i(e) {
return "[object String]" === n(e);
}
function s(e, t) {
return y.call(e, t);
}
function o(e) {
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
return s(w, t) ? w[t] : 35 === t.charCodeAt(0) && C.test(t) && (r = "x" === t[1].toLowerCase() ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10), 
c(r)) ? l(r) : e;
}
function p(e) {
return e.indexOf("\\") < 0 ? e : e.replace(E, "$1");
}
function h(e) {
return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(x, function(e, t, r) {
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
function k(e) {
return I.test(e);
}
function _(e) {
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
function v(e) {
return e.trim().replace(/\s+/g, " ").toUpperCase();
}
var y = Object.prototype.hasOwnProperty, E = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, A = /&([a-z#][a-z0-9]{1,31});/gi, x = RegExp(E.source + "|" + A.source, "gi"), C = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, w = r(381), S = /[&<>"]/, T = /[&<>"]/g, D = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, L = /[.?*+^$[\]\\(){}|-]/g, I = r(258);
t.lib = {}, t.lib.mdurl = r(259), t.lib.ucmicro = r(264), t.assign = o, t.isString = i, 
t.has = s, t.unescapeMd = p, t.unescapeAll = h, t.isValidEntityCode = c, t.fromCodePoint = l, 
t.escapeHtml = d, t.arrayReplaceAt = a, t.isSpace = m, t.isWhiteSpace = b, t.isMdAsciiPunct = _, 
t.isPunctChar = k, t.escapeRE = g, t.normalizeReference = v;
}, function(e, t, r) {
"use strict";
e.exports = r(257);
}, function(e, t, r) {
"use strict";
t.parseLinkLabel = r(383), t.parseLinkDestination = r(384), t.parseLinkTitle = r(385);
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
var n, i, s, o, a = -1, c = e.posMax, l = e.pos;
for (e.pos = t + 1, n = 1; e.pos < c; ) {
if (s = e.src.charCodeAt(e.pos), 93 === s && (n--, 0 === n)) {
i = !0;
break;
}
if (o = e.pos, e.md.inline.skipToken(e), 91 === s) if (o === e.pos - 1) n++; else if (r) return e.pos = l, 
-1;
}
return i && (a = e.pos), e.pos = l, a;
};
}, function(e, t, r) {
"use strict";
var n = r(380).isSpace, i = r(380).unescapeAll;
e.exports = function(e, t, r) {
var s, o, a = 0, c = t, l = {
ok: !1,
pos: 0,
lines: 0,
str: ""
};
if (60 === e.charCodeAt(t)) {
for (t++; r > t; ) {
if (s = e.charCodeAt(t), 10 === s || n(s)) return l;
if (62 === s) return l.pos = t + 1, l.str = i(e.slice(c + 1, t)), l.ok = !0, l;
92 === s && r > t + 1 ? t += 2 : t++;
}
return l;
}
for (o = 0; r > t && (s = e.charCodeAt(t), 32 !== s) && !(32 > s || 127 === s); ) if (92 === s && r > t + 1) t += 2; else {
if (40 === s && (o++, o > 1)) break;
if (41 === s && (o--, 0 > o)) break;
t++;
}
return c === t ? l : (l.str = i(e.slice(c, t)), l.lines = a, l.pos = t, l.ok = !0, 
l);
};
}, function(e, t, r) {
"use strict";
var n = r(380).unescapeAll;
e.exports = function(e, t, r) {
var i, s, o = 0, a = t, c = {
ok: !1,
pos: 0,
lines: 0,
str: ""
};
if (t >= r) return c;
if (s = e.charCodeAt(t), 34 !== s && 39 !== s && 40 !== s) return c;
for (t++, 40 === s && (s = 41); r > t; ) {
if (i = e.charCodeAt(t), i === s) return c.pos = t + 1, c.lines = o, c.str = n(e.slice(a + 1, t)), 
c.ok = !0, c;
10 === i ? o++ : 92 === i && r > t + 1 && (t++, 10 === e.charCodeAt(t) && o++), 
t++;
}
return c;
};
}, function(e, t, r) {
"use strict";
function n() {
this.rules = i({}, a);
}
var i = r(380).assign, s = r(380).unescapeAll, o = r(380).escapeHtml, a = {};
a.code_inline = function(e, t) {
return "<code>" + o(e[t].content) + "</code>";
}, a.code_block = function(e, t) {
return "<pre><code>" + o(e[t].content) + "</code></pre>\n";
}, a.fence = function(e, t, r, n, i) {
var a, c = e[t], l = c.info ? s(c.info).trim() : "", u = "";
return l && (u = l.split(/\s+/g)[0], c.attrJoin("class", r.langPrefix + u)), a = r.highlight ? r.highlight(c.content, u) || o(c.content) : o(c.content), 
0 === a.indexOf("<pre") ? a + "\n" : "<pre><code" + i.renderAttrs(c) + ">" + a + "</code></pre>\n";
}, a.image = function(e, t, r, n, i) {
var s = e[t];
return s.attrs[s.attrIndex("alt")][1] = i.renderInlineAsText(s.children, r, n), 
i.renderToken(e, t, r);
}, a.hardbreak = function(e, t, r) {
return r.xhtmlOut ? "<br />\n" : "<br>\n";
}, a.softbreak = function(e, t, r) {
return r.breaks ? r.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
}, a.text = function(e, t) {
return o(e[t].content);
}, a.html_block = function(e, t) {
return e[t].content;
}, a.html_inline = function(e, t) {
return e[t].content;
}, n.prototype.renderAttrs = function(e) {
var t, r, n;
if (!e.attrs) return "";
for (n = "", t = 0, r = e.attrs.length; r > t; t++) n += " " + o(e.attrs[t][0]) + '="' + o(e.attrs[t][1]) + '"';
return n;
}, n.prototype.renderToken = function(e, t, r) {
var n, i = "", s = !1, o = e[t];
return o.hidden ? "" : (o.block && -1 !== o.nesting && t && e[t - 1].hidden && (i += "\n"), 
i += (-1 === o.nesting ? "</" : "<") + o.tag, i += this.renderAttrs(o), 0 === o.nesting && r.xhtmlOut && (i += " /"), 
o.block && (s = !0, 1 === o.nesting && t + 1 < e.length && (n = e[t + 1], "inline" === n.type || n.hidden ? s = !1 : -1 === n.nesting && n.tag === o.tag && (s = !1))), 
i += s ? ">\n" : ">");
}, n.prototype.renderInline = function(e, t, r) {
for (var n, i = "", s = this.rules, o = 0, a = e.length; a > o; o++) n = e[o].type, 
i += void 0 !== s[n] ? s[n](e, o, t, r, this) : this.renderToken(e, o, t);
return i;
}, n.prototype.renderInlineAsText = function(e, t, r) {
for (var n = "", i = this.rules, s = 0, o = e.length; o > s; s++) "text" === e[s].type ? n += i.text(e, s, t, r, this) : "image" === e[s].type && (n += this.renderInlineAsText(e[s].children, t, r));
return n;
}, n.prototype.render = function(e, t, r) {
var n, i, s, o = "", a = this.rules;
for (n = 0, i = e.length; i > n; n++) s = e[n].type, o += "inline" === s ? this.renderInline(e[n].children, t, r) : void 0 !== a[s] ? a[e[n].type](e, n, t, r, this) : this.renderToken(e, n, t, r);
return o;
}, e.exports = n;
}, function(e, t, r) {
"use strict";
function n() {
this.ruler = new i();
for (var e = 0; e < s.length; e++) this.ruler.push(s[e][0], s[e][1]);
}
var i = r(388), s = [ [ "normalize", r(389) ], [ "block", r(390) ], [ "inline", r(391) ], [ "linkify", r(392) ], [ "replacements", r(393) ], [ "smartquotes", r(394) ] ];
n.prototype.process = function(e) {
var t, r, n;
for (n = this.ruler.getRules(""), t = 0, r = n.length; r > t; t++) n[t](e);
}, n.prototype.State = r(395), e.exports = n;
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
var i = this.__find__(e), s = n || {};
if (-1 === i) throw Error("Parser rule not found: " + e);
this.__rules__.splice(i, 0, {
name: t,
enabled: !0,
fn: r,
alt: s.alt || []
}), this.__cache__ = null;
}, r.prototype.after = function(e, t, r, n) {
var i = this.__find__(e), s = n || {};
if (-1 === i) throw Error("Parser rule not found: " + e);
this.__rules__.splice(i + 1, 0, {
name: t,
enabled: !0,
fn: r,
alt: s.alt || []
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
var s = r(380).arrayReplaceAt;
e.exports = function(e) {
var t, r, o, a, c, l, u, p, h, f, d, g, m, b, k, _, v, y = e.tokens;
if (e.md.options.linkify) for (r = 0, o = y.length; o > r; r++) if ("inline" === y[r].type && e.md.linkify.pretest(y[r].content)) for (a = y[r].children, 
m = 0, t = a.length - 1; t >= 0; t--) if (l = a[t], "link_close" !== l.type) {
if ("html_inline" === l.type && (n(l.content) && m > 0 && m--, i(l.content) && m++), 
!(m > 0) && "text" === l.type && e.md.linkify.test(l.content)) {
for (h = l.content, v = e.md.linkify.match(h), u = [], g = l.level, d = 0, p = 0; p < v.length; p++) b = v[p].url, 
k = e.md.normalizeLink(b), e.md.validateLink(k) && (_ = v[p].text, _ = v[p].schema ? "mailto:" !== v[p].schema || /^mailto:/i.test(_) ? e.md.normalizeLinkText(_) : e.md.normalizeLinkText("mailto:" + _).replace(/^mailto:/, "") : e.md.normalizeLinkText("http://" + _).replace(/^http:\/\//, ""), 
f = v[p].index, f > d && (c = new e.Token("text", "", 0), c.content = h.slice(d, f), 
c.level = g, u.push(c)), c = new e.Token("link_open", "a", 1), c.attrs = [ [ "href", k ] ], 
c.level = g++, c.markup = "linkify", c.info = "auto", u.push(c), c = new e.Token("text", "", 0), 
c.content = _, c.level = g, u.push(c), c = new e.Token("link_close", "a", -1), c.level = --g, 
c.markup = "linkify", c.info = "auto", u.push(c), d = v[p].lastIndex);
d < h.length && (c = new e.Token("text", "", 0), c.content = h.slice(d), c.level = g, 
u.push(c)), y[r].children = a = s(a, t, u);
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
for (t = e.length - 1; t >= 0; t--) r = e[t], "text" === r.type && s.test(r.content) && (r.content = r.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1—$2").replace(/(^|\s)--(\s|$)/gm, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1–$2"));
}
var s = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, o = /\((c|tm|r|p)\)/i, a = /\((c|tm|r|p)\)/gi, c = {
c: "©",
r: "®",
p: "§",
tm: "™"
};
e.exports = function(e) {
var t;
if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && (o.test(e.tokens[t].content) && n(e.tokens[t].children), 
s.test(e.tokens[t].content) && i(e.tokens[t].children));
};
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
return e.substr(0, t) + r + e.substr(t + 1);
}
function i(e, t) {
var r, i, c, p, h, f, d, g, m, b, k, _, v, y, E, A, x, C, w, S, T;
for (w = [], r = 0; r < e.length; r++) {
for (i = e[r], d = e[r].level, x = w.length - 1; x >= 0 && !(w[x].level <= d); x--) ;
if (w.length = x + 1, "text" === i.type) {
c = i.content, h = 0, f = c.length;
e: for (;f > h && (l.lastIndex = h, p = l.exec(c)); ) {
if (E = A = !0, h = p.index + 1, C = "'" === p[0], m = 32, p.index - 1 >= 0) m = c.charCodeAt(p.index - 1); else for (x = r - 1; x >= 0; x--) if ("text" === e[x].type) {
m = e[x].content.charCodeAt(e[x].content.length - 1);
break;
}
if (b = 32, f > h) b = c.charCodeAt(h); else for (x = r + 1; x < e.length; x++) if ("text" === e[x].type) {
b = e[x].content.charCodeAt(0);
break;
}
if (k = a(m) || o(String.fromCharCode(m)), _ = a(b) || o(String.fromCharCode(b)), 
v = s(m), y = s(b), y ? E = !1 : _ && (v || k || (E = !1)), v ? A = !1 : k && (y || _ || (A = !1)), 
34 === b && '"' === p[0] && m >= 48 && 57 >= m && (A = E = !1), E && A && (E = !1, 
A = _), E || A) {
if (A) for (x = w.length - 1; x >= 0 && (g = w[x], !(w[x].level < d)); x--) if (g.single === C && w[x].level === d) {
g = w[x], C ? (S = t.md.options.quotes[2], T = t.md.options.quotes[3]) : (S = t.md.options.quotes[0], 
T = t.md.options.quotes[1]), i.content = n(i.content, p.index, T), e[g.token].content = n(e[g.token].content, g.pos, S), 
h += T.length - 1, g.token === r && (h += S.length - 1), c = i.content, f = c.length, 
w.length = x;
continue e;
}
E ? w.push({
token: r,
pos: p.index,
single: C,
level: d
}) : A && C && (i.content = n(i.content, p.index, u));
} else C && (i.content = n(i.content, p.index, u));
}
}
}
}
var s = r(380).isWhiteSpace, o = r(380).isPunctChar, a = r(380).isMdAsciiPunct, c = /['"]/, l = /['"]/g, u = "’";
e.exports = function(e) {
var t;
if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && c.test(e.tokens[t].content) && i(e.tokens[t].children, e);
};
}, function(e, t, r) {
"use strict";
function n(e, t, r) {
this.src = e, this.env = r, this.tokens = [], this.inlineMode = !1, this.md = t;
}
var i = r(396);
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
for (var e = 0; e < s.length; e++) this.ruler.push(s[e][0], s[e][1], {
alt: (s[e][2] || []).slice()
});
}
var i = r(388), s = [ [ "table", r(398), [ "paragraph", "reference" ] ], [ "code", r(399) ], [ "fence", r(400), [ "paragraph", "reference", "blockquote", "list" ] ], [ "blockquote", r(401), [ "paragraph", "reference", "list" ] ], [ "hr", r(402), [ "paragraph", "reference", "blockquote", "list" ] ], [ "list", r(403), [ "paragraph", "reference", "blockquote" ] ], [ "reference", r(404) ], [ "heading", r(405), [ "paragraph", "reference", "blockquote" ] ], [ "lheading", r(406) ], [ "html_block", r(407), [ "paragraph", "reference", "blockquote" ] ], [ "paragraph", r(410) ] ];
n.prototype.tokenize = function(e, t, r) {
for (var n, i, s = this.ruler.getRules(""), o = s.length, a = t, c = !1, l = e.md.options.maxNesting; r > a && (e.line = a = e.skipEmptyLines(a), 
!(a >= r)) && !(e.sCount[a] < e.blkIndent); ) {
if (e.level >= l) {
e.line = r;
break;
}
for (i = 0; o > i && !(n = s[i](e, a, r, !1)); i++) ;
if (e.tight = !c, e.isEmpty(e.line - 1) && (c = !0), a = e.line, r > a && e.isEmpty(a)) {
if (c = !0, a++, r > a && "list" === e.parentType && e.isEmpty(a)) break;
e.line = a;
}
}
}, n.prototype.parse = function(e, t, r, n) {
var i;
return e ? (i = new this.State(e, t, r, n), void this.tokenize(i, i.line, i.lineMax)) : [];
}, n.prototype.State = r(411), e.exports = n;
}, function(e, t) {
"use strict";
function r(e, t) {
var r = e.bMarks[t] + e.blkIndent, n = e.eMarks[t];
return e.src.substr(r, n - r);
}
function n(e) {
var t, r = [], n = 0, i = e.length, s = 0, o = 0, a = !1, c = 0;
for (t = e.charCodeAt(n); i > n; ) 96 === t && s % 2 === 0 ? (a = !a, c = n) : 124 !== t || s % 2 !== 0 || a ? 92 === t ? s++ : s = 0 : (r.push(e.substring(o, n)), 
o = n + 1), n++, n === i && a && (a = !1, n = c + 1), t = e.charCodeAt(n);
return r.push(e.substring(o)), r;
}
e.exports = function(e, t, i, s) {
var o, a, c, l, u, p, h, f, d, g, m, b;
if (t + 2 > i) return !1;
if (u = t + 1, e.sCount[u] < e.blkIndent) return !1;
if (c = e.bMarks[u] + e.tShift[u], c >= e.eMarks[u]) return !1;
if (o = e.src.charCodeAt(c), 124 !== o && 45 !== o && 58 !== o) return !1;
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
if (s) return !0;
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
var n, i, s, o = 0;
if (e.sCount[t] - e.blkIndent < 4) return !1;
for (i = n = t + 1; r > n; ) if (e.isEmpty(n)) {
if (o++, o >= 2 && "list" === e.parentType) break;
n++;
} else {
if (o = 0, !(e.sCount[n] - e.blkIndent >= 4)) break;
n++, i = n;
}
return e.line = i, s = e.push("code_block", "code", 0), s.content = e.getLines(t, i, 4 + e.blkIndent, !0), 
s.map = [ t, e.line ], !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r, n) {
var i, s, o, a, c, l, u, p = !1, h = e.bMarks[t] + e.tShift[t], f = e.eMarks[t];
if (h + 3 > f) return !1;
if (i = e.src.charCodeAt(h), 126 !== i && 96 !== i) return !1;
if (c = h, h = e.skipChars(h, i), s = h - c, 3 > s) return !1;
if (u = e.src.slice(c, h), o = e.src.slice(h, f), o.indexOf("`") >= 0) return !1;
if (n) return !0;
for (a = t; (a++, !(a >= r)) && (h = c = e.bMarks[a] + e.tShift[a], f = e.eMarks[a], 
!(f > h && e.sCount[a] < e.blkIndent)); ) if (e.src.charCodeAt(h) === i && !(e.sCount[a] - e.blkIndent >= 4 || (h = e.skipChars(h, i), 
s > h - c || (h = e.skipSpaces(h), f > h)))) {
p = !0;
break;
}
return s = e.sCount[t], e.line = a + (p ? 1 : 0), l = e.push("fence", "code", 0), 
l.info = o, l.content = e.getLines(t + 1, a, s, !0), l.markup = u, l.map = [ t, e.line ], 
!0;
};
}, function(e, t, r) {
"use strict";
var n = r(380).isSpace;
e.exports = function(e, t, r, i) {
var s, o, a, c, l, u, p, h, f, d, g, m, b, k, _, v, y = e.bMarks[t] + e.tShift[t], E = e.eMarks[t];
if (62 !== e.src.charCodeAt(y++)) return !1;
if (i) return !0;
for (32 === e.src.charCodeAt(y) && y++, u = e.blkIndent, e.blkIndent = 0, f = d = e.sCount[t] + y - (e.bMarks[t] + e.tShift[t]), 
l = [ e.bMarks[t] ], e.bMarks[t] = y; E > y && (g = e.src.charCodeAt(y), n(g)); ) 9 === g ? d += 4 - d % 4 : d++, 
y++;
for (o = y >= E, c = [ e.sCount[t] ], e.sCount[t] = d - f, a = [ e.tShift[t] ], 
e.tShift[t] = y - e.bMarks[t], m = e.md.block.ruler.getRules("blockquote"), s = t + 1; r > s && !(e.sCount[s] < u) && (y = e.bMarks[s] + e.tShift[s], 
E = e.eMarks[s], !(y >= E)); s++) if (62 !== e.src.charCodeAt(y++)) {
if (o) break;
for (v = !1, k = 0, _ = m.length; _ > k; k++) if (m[k](e, s, r, !0)) {
v = !0;
break;
}
if (v) break;
l.push(e.bMarks[s]), a.push(e.tShift[s]), c.push(e.sCount[s]), e.sCount[s] = -1;
} else {
for (32 === e.src.charCodeAt(y) && y++, f = d = e.sCount[s] + y - (e.bMarks[s] + e.tShift[s]), 
l.push(e.bMarks[s]), e.bMarks[s] = y; E > y && (g = e.src.charCodeAt(y), n(g)); ) 9 === g ? d += 4 - d % 4 : d++, 
y++;
o = y >= E, c.push(e.sCount[s]), e.sCount[s] = d - f, a.push(e.tShift[s]), e.tShift[s] = y - e.bMarks[s];
}
for (p = e.parentType, e.parentType = "blockquote", b = e.push("blockquote_open", "blockquote", 1), 
b.markup = ">", b.map = h = [ t, 0 ], e.md.block.tokenize(e, t, s), b = e.push("blockquote_close", "blockquote", -1), 
b.markup = ">", e.parentType = p, h[1] = e.line, k = 0; k < a.length; k++) e.bMarks[k + t] = l[k], 
e.tShift[k + t] = a[k], e.sCount[k + t] = c[k];
return e.blkIndent = u, !0;
};
}, function(e, t, r) {
"use strict";
var n = r(380).isSpace;
e.exports = function(e, t, r, i) {
var s, o, a, c, l = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (s = e.src.charCodeAt(l++), 42 !== s && 45 !== s && 95 !== s) return !1;
for (o = 1; u > l; ) {
if (a = e.src.charCodeAt(l++), a !== s && !n(a)) return !1;
a === s && o++;
}
return 3 > o ? !1 : i ? !0 : (e.line = t + 1, c = e.push("hr", "hr", 0), c.map = [ t, e.line ], 
c.markup = Array(o + 1).join(String.fromCharCode(s)), !0);
};
}, function(e, t, r) {
"use strict";
function n(e, t) {
var r, n, i, s;
return n = e.bMarks[t] + e.tShift[t], i = e.eMarks[t], r = e.src.charCodeAt(n++), 
42 !== r && 45 !== r && 43 !== r ? -1 : i > n && (s = e.src.charCodeAt(n), !o(s)) ? -1 : n;
}
function i(e, t) {
var r, n = e.bMarks[t] + e.tShift[t], i = n, s = e.eMarks[t];
if (i + 1 >= s) return -1;
if (r = e.src.charCodeAt(i++), 48 > r || r > 57) return -1;
for (;;) {
if (i >= s) return -1;
r = e.src.charCodeAt(i++);
{
if (!(r >= 48 && 57 >= r)) {
if (41 === r || 46 === r) break;
return -1;
}
if (i - n >= 10) return -1;
}
}
return s > i && (r = e.src.charCodeAt(i), !o(r)) ? -1 : i;
}
function s(e, t) {
var r, n, i = e.level + 2;
for (r = t + 2, n = e.tokens.length - 2; n > r; r++) e.tokens[r].level === i && "paragraph_open" === e.tokens[r].type && (e.tokens[r + 2].hidden = !0, 
e.tokens[r].hidden = !0, r += 2);
}
var o = r(380).isSpace;
e.exports = function(e, t, r, a) {
var c, l, u, p, h, f, d, g, m, b, k, _, v, y, E, A, x, C, w, S, T, D, L, I, R, q, N, O, P = !0;
if ((k = i(e, t)) >= 0) C = !0; else {
if (!((k = n(e, t)) >= 0)) return !1;
C = !1;
}
if (x = e.src.charCodeAt(k - 1), a) return !0;
for (S = e.tokens.length, C ? (b = e.bMarks[t] + e.tShift[t], A = +e.src.substr(b, k - b - 1), 
R = e.push("ordered_list_open", "ol", 1), 1 !== A && (R.attrs = [ [ "start", A ] ])) : R = e.push("bullet_list_open", "ul", 1), 
R.map = D = [ t, 0 ], R.markup = String.fromCharCode(x), c = t, T = !1, I = e.md.block.ruler.getRules("list"); r > c; ) {
for (v = k, y = e.eMarks[c], l = u = e.sCount[c] + k - (e.bMarks[t] + e.tShift[t]); y > v && (_ = e.src.charCodeAt(v), 
o(_)); ) 9 === _ ? u += 4 - u % 4 : u++, v++;
if (w = v, E = w >= y ? 1 : u - l, E > 4 && (E = 1), p = l + E, R = e.push("list_item_open", "li", 1), 
R.markup = String.fromCharCode(x), R.map = L = [ t, 0 ], f = e.blkIndent, g = e.tight, 
h = e.tShift[t], d = e.sCount[t], m = e.parentType, e.blkIndent = p, e.tight = !0, 
e.parentType = "list", e.tShift[t] = w - e.bMarks[t], e.sCount[t] = u, w >= y && e.isEmpty(t + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, t, r, !0), 
(!e.tight || T) && (P = !1), T = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = f, 
e.tShift[t] = h, e.sCount[t] = d, e.tight = g, e.parentType = m, R = e.push("list_item_close", "li", -1), 
R.markup = String.fromCharCode(x), c = t = e.line, L[1] = c, w = e.bMarks[t], c >= r) break;
if (e.isEmpty(c)) break;
if (e.sCount[c] < e.blkIndent) break;
for (O = !1, q = 0, N = I.length; N > q; q++) if (I[q](e, c, r, !0)) {
O = !0;
break;
}
if (O) break;
if (C) {
if (k = i(e, c), 0 > k) break;
} else if (k = n(e, c), 0 > k) break;
if (x !== e.src.charCodeAt(k - 1)) break;
}
return R = C ? e.push("ordered_list_close", "ol", -1) : e.push("bullet_list_close", "ul", -1), 
R.markup = String.fromCharCode(x), D[1] = c, e.line = c, P && s(e, S), !0;
};
}, function(e, t, r) {
"use strict";
var n = r(384), i = r(385), s = r(380).normalizeReference, o = r(380).isSpace;
e.exports = function(e, t, r, a) {
var c, l, u, p, h, f, d, g, m, b, k, _, v, y, E, A = 0, x = e.bMarks[t] + e.tShift[t], C = e.eMarks[t], w = t + 1;
if (91 !== e.src.charCodeAt(x)) return !1;
for (;++x < C; ) if (93 === e.src.charCodeAt(x) && 92 !== e.src.charCodeAt(x - 1)) {
if (x + 1 === C) return !1;
if (58 !== e.src.charCodeAt(x + 1)) return !1;
break;
}
for (p = e.lineMax, y = e.md.block.ruler.getRules("reference"); p > w && !e.isEmpty(w); w++) if (!(e.sCount[w] - e.blkIndent > 3 || e.sCount[w] < 0)) {
for (v = !1, f = 0, d = y.length; d > f; f++) if (y[f](e, w, p, !0)) {
v = !0;
break;
}
if (v) break;
}
for (_ = e.getLines(t, w, e.blkIndent, !1).trim(), C = _.length, x = 1; C > x; x++) {
if (c = _.charCodeAt(x), 91 === c) return !1;
if (93 === c) {
m = x;
break;
}
10 === c ? A++ : 92 === c && (x++, C > x && 10 === _.charCodeAt(x) && A++);
}
if (0 > m || 58 !== _.charCodeAt(m + 1)) return !1;
for (x = m + 2; C > x; x++) if (c = _.charCodeAt(x), 10 === c) A++; else if (!o(c)) break;
if (b = n(_, x, C), !b.ok) return !1;
if (h = e.md.normalizeLink(b.str), !e.md.validateLink(h)) return !1;
for (x = b.pos, A += b.lines, l = x, u = A, k = x; C > x; x++) if (c = _.charCodeAt(x), 
10 === c) A++; else if (!o(c)) break;
for (b = i(_, x, C), C > x && k !== x && b.ok ? (E = b.str, x = b.pos, A += b.lines) : (E = "", 
x = l, A = u); C > x && (c = _.charCodeAt(x), o(c)); ) x++;
if (C > x && 10 !== _.charCodeAt(x) && E) for (E = "", x = l, A = u; C > x && (c = _.charCodeAt(x), 
o(c)); ) x++;
return C > x && 10 !== _.charCodeAt(x) ? !1 : (g = s(_.slice(1, m))) ? a ? !0 : (void 0 === e.env.references && (e.env.references = {}), 
void 0 === e.env.references[g] && (e.env.references[g] = {
title: E,
href: h
}), e.line = t + A + 1, !0) : !1;
};
}, function(e, t, r) {
"use strict";
var n = r(380).isSpace;
e.exports = function(e, t, r, i) {
var s, o, a, c, l = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (s = e.src.charCodeAt(l), 35 !== s || l >= u) return !1;
for (o = 1, s = e.src.charCodeAt(++l); 35 === s && u > l && 6 >= o; ) o++, s = e.src.charCodeAt(++l);
return o > 6 || u > l && 32 !== s ? !1 : i ? !0 : (u = e.skipSpacesBack(u, l), a = e.skipCharsBack(u, 35, l), 
a > l && n(e.src.charCodeAt(a - 1)) && (u = a), e.line = t + 1, c = e.push("heading_open", "h" + (o + ""), 1), 
c.markup = "########".slice(0, o), c.map = [ t, e.line ], c = e.push("inline", "", 0), 
c.content = e.src.slice(l, u).trim(), c.map = [ t, e.line ], c.children = [], c = e.push("heading_close", "h" + (o + ""), -1), 
c.markup = "########".slice(0, o), !0);
};
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
for (var n, i, s, o, a, c, l, u, p, h = t + 1, f = e.md.block.ruler.getRules("paragraph"); r > h && !e.isEmpty(h); h++) if (!(e.sCount[h] - e.blkIndent > 3)) {
if (e.sCount[h] >= e.blkIndent && (c = e.bMarks[h] + e.tShift[h], l = e.eMarks[h], 
l > c && (p = e.src.charCodeAt(c), (45 === p || 61 === p) && (c = e.skipChars(c, p), 
c = e.skipSpaces(c), c >= l)))) {
u = 61 === p ? 1 : 2;
break;
}
if (!(e.sCount[h] < 0)) {
for (i = !1, s = 0, o = f.length; o > s; s++) if (f[s](e, h, r, !0)) {
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
var n = r(408), i = r(409).HTML_OPEN_CLOSE_TAG_RE, s = [ [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, !0 ], [ /^<!--/, /-->/, !0 ], [ /^<\?/, /\?>/, !0 ], [ /^<![A-Z]/, />/, !0 ], [ /^<!\[CDATA\[/, /\]\]>/, !0 ], [ RegExp("^</?(" + n.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0 ], [ RegExp(i.source + "\\s*$"), /^$/, !1 ] ];
e.exports = function(e, t, r, n) {
var i, o, a, c, l = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
if (!e.md.options.html) return !1;
if (60 !== e.src.charCodeAt(l)) return !1;
for (c = e.src.slice(l, u), i = 0; i < s.length && !s[i][0].test(c); i++) ;
if (i === s.length) return !1;
if (n) return s[i][2];
if (o = t + 1, !s[i][1].test(c)) for (;r > o && !(e.sCount[o] < e.blkIndent); o++) if (l = e.bMarks[o] + e.tShift[o], 
u = e.eMarks[o], c = e.src.slice(l, u), s[i][1].test(c)) {
0 !== c.length && o++;
break;
}
return e.line = o, a = e.push("html_block", "", 0), a.map = [ t, o ], a.content = e.getLines(t, o, e.blkIndent, !0), 
!0;
};
}, function(e, t) {
"use strict";
e.exports = [ "address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "meta", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "pre", "section", "source", "title", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul" ];
}, function(e, t) {
"use strict";
var r = "[a-zA-Z_:][a-zA-Z0-9:._-]*", n = "[^\"'=<>`\\x00-\\x20]+", i = "'[^']*'", s = '"[^"]*"', o = "(?:" + n + "|" + i + "|" + s + ")", a = "(?:\\s+" + r + "(?:\\s*=\\s*" + o + ")?)", c = "<[A-Za-z][A-Za-z0-9\\-]*" + a + "*\\s*\\/?>", l = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", u = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", p = "<[?].*?[?]>", h = "<![A-Z]+\\s+[^>]*>", f = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", d = RegExp("^(?:" + c + "|" + l + "|" + u + "|" + p + "|" + h + "|" + f + ")"), g = RegExp("^(?:" + c + "|" + l + ")");
e.exports.HTML_TAG_RE = d, e.exports.HTML_OPEN_CLOSE_TAG_RE = g;
}, function(e, t) {
"use strict";
e.exports = function(e, t) {
for (var r, n, i, s, o, a = t + 1, c = e.md.block.ruler.getRules("paragraph"), l = e.lineMax; l > a && !e.isEmpty(a); a++) if (!(e.sCount[a] - e.blkIndent > 3 || e.sCount[a] < 0)) {
for (n = !1, i = 0, s = c.length; s > i; i++) if (c[i](e, a, l, !0)) {
n = !0;
break;
}
if (n) break;
}
return r = e.getLines(t, a, e.blkIndent, !1).trim(), e.line = a, o = e.push("paragraph_open", "p", 1), 
o.map = [ t, e.line ], o = e.push("inline", "", 0), o.content = r, o.map = [ t, e.line ], 
o.children = [], o = e.push("paragraph_close", "p", -1), !0;
};
}, function(e, t, r) {
"use strict";
function n(e, t, r, n) {
var i, o, a, c, l, u, p, h;
for (this.src = e, this.md = t, this.env = r, this.tokens = n, this.bMarks = [], 
this.eMarks = [], this.tShift = [], this.sCount = [], this.blkIndent = 0, this.line = 0, 
this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, 
this.level = 0, this.result = "", o = this.src, h = !1, a = c = u = p = 0, l = o.length; l > c; c++) {
if (i = o.charCodeAt(c), !h) {
if (s(i)) {
u++, 9 === i ? p += 4 - p % 4 : p++;
continue;
}
h = !0;
}
(10 === i || c === l - 1) && (10 !== i && c++, this.bMarks.push(a), this.eMarks.push(c), 
this.tShift.push(u), this.sCount.push(p), h = !1, u = 0, p = 0, a = c + 1);
}
this.bMarks.push(o.length), this.eMarks.push(o.length), this.tShift.push(0), this.sCount.push(0), 
this.lineMax = this.bMarks.length - 1;
}
var i = r(396), s = r(380).isSpace;
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
for (var t, r = this.src.length; r > e && (t = this.src.charCodeAt(e), s(t)); e++) ;
return e;
}, n.prototype.skipSpacesBack = function(e, t) {
if (t >= e) return e;
for (;e > t; ) if (!s(this.src.charCodeAt(--e))) return e + 1;
return e;
}, n.prototype.skipChars = function(e, t) {
for (var r = this.src.length; r > e && this.src.charCodeAt(e) === t; e++) ;
return e;
}, n.prototype.skipCharsBack = function(e, t, r) {
if (r >= e) return e;
for (;e > r; ) if (t !== this.src.charCodeAt(--e)) return e + 1;
return e;
}, n.prototype.getLines = function(e, t, r, n) {
var i, o, a, c, l, u, p, h = e;
if (e >= t) return "";
for (u = Array(t - e), i = 0; t > h; h++, i++) {
for (o = 0, p = c = this.bMarks[h], l = t > h + 1 || n ? this.eMarks[h] + 1 : this.eMarks[h]; l > c && r > o; ) {
if (a = this.src.charCodeAt(c), s(a)) 9 === a ? o += 4 - o % 4 : o++; else {
if (!(c - p < this.tShift[h])) break;
o++;
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
for (this.ruler = new i(), e = 0; e < s.length; e++) this.ruler.push(s[e][0], s[e][1]);
for (this.ruler2 = new i(), e = 0; e < o.length; e++) this.ruler2.push(o[e][0], o[e][1]);
}
var i = r(388), s = [ [ "text", r(413) ], [ "newline", r(414) ], [ "escape", r(415) ], [ "backticks", r(416) ], [ "strikethrough", r(417).tokenize ], [ "emphasis", r(418).tokenize ], [ "link", r(419) ], [ "image", r(420) ], [ "autolink", r(421) ], [ "html_inline", r(422) ], [ "entity", r(423) ] ], o = [ [ "balance_pairs", r(424) ], [ "strikethrough", r(417).postProcess ], [ "emphasis", r(418).postProcess ], [ "text_collapse", r(425) ] ];
n.prototype.skipToken = function(e) {
var t, r, n = e.pos, i = this.ruler.getRules(""), s = i.length, o = e.md.options.maxNesting, a = e.cache;
if (void 0 !== a[n]) return void (e.pos = a[n]);
if (e.level < o) for (r = 0; s > r && (e.level++, t = i[r](e, !0), e.level--, !t); r++) ; else e.pos = e.posMax;
t || e.pos++, a[n] = e.pos;
}, n.prototype.tokenize = function(e) {
for (var t, r, n = this.ruler.getRules(""), i = n.length, s = e.posMax, o = e.md.options.maxNesting; e.pos < s; ) {
if (e.level < o) for (r = 0; i > r && !(t = n[r](e, !1)); r++) ;
if (t) {
if (e.pos >= s) break;
} else e.pending += e.src[e.pos++];
}
e.pending && e.pushPending();
}, n.prototype.parse = function(e, t, r, n) {
var i, s, o, a = new this.State(e, t, r, n);
for (this.tokenize(a), s = this.ruler2.getRules(""), o = s.length, i = 0; o > i; i++) s[i](a);
}, n.prototype.State = r(426), e.exports = n;
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
for (var n = r(380).isSpace, i = [], s = 0; 256 > s; s++) i.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
i[e.charCodeAt(0)] = 1;
}), e.exports = function(e, t) {
var r, s = e.pos, o = e.posMax;
if (92 !== e.src.charCodeAt(s)) return !1;
if (s++, o > s) {
if (r = e.src.charCodeAt(s), 256 > r && 0 !== i[r]) return t || (e.pending += e.src[s]), 
e.pos += 2, !0;
if (10 === r) {
for (t || e.push("hardbreak", "br", 0), s++; o > s && (r = e.src.charCodeAt(s), 
n(r)); ) s++;
return e.pos = s, !0;
}
}
return t || (e.pending += "\\"), e.pos++, !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e, t) {
var r, n, i, s, o, a, c = e.pos, l = e.src.charCodeAt(c);
if (96 !== l) return !1;
for (r = c, c++, n = e.posMax; n > c && 96 === e.src.charCodeAt(c); ) c++;
for (i = e.src.slice(r, c), s = o = c; -1 !== (s = e.src.indexOf("`", o)); ) {
for (o = s + 1; n > o && 96 === e.src.charCodeAt(o); ) o++;
if (o - s === i.length) return t || (a = e.push("code_inline", "code", 0), a.markup = i, 
a.content = e.src.slice(c, s).replace(/[ \n]+/g, " ").trim()), e.pos = o, !0;
}
return t || (e.pending += i), e.pos += i.length, !0;
};
}, function(e, t) {
"use strict";
e.exports.tokenize = function(e, t) {
var r, n, i, s, o, a = e.pos, c = e.src.charCodeAt(a);
if (t) return !1;
if (126 !== c) return !1;
if (n = e.scanDelims(e.pos, !0), s = n.length, o = String.fromCharCode(c), 2 > s) return !1;
for (s % 2 && (i = e.push("text", "", 0), i.content = o, s--), r = 0; s > r; r += 2) i = e.push("text", "", 0), 
i.content = o + o, e.delimiters.push({
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
var t, r, n, i, s, o = [], a = e.delimiters, c = e.delimiters.length;
for (t = 0; c > t; t++) n = a[t], 126 === n.marker && -1 !== n.end && (i = a[n.end], 
s = e.tokens[n.token], s.type = "s_open", s.tag = "s", s.nesting = 1, s.markup = "~~", 
s.content = "", s = e.tokens[i.token], s.type = "s_close", s.tag = "s", s.nesting = -1, 
s.markup = "~~", s.content = "", "text" === e.tokens[i.token - 1].type && "~" === e.tokens[i.token - 1].content && o.push(i.token - 1));
for (;o.length; ) {
for (t = o.pop(), r = t + 1; r < e.tokens.length && "s_close" === e.tokens[r].type; ) r++;
r--, t !== r && (s = e.tokens[r], e.tokens[r] = e.tokens[t], e.tokens[t] = s);
}
};
}, function(e, t) {
"use strict";
e.exports.tokenize = function(e, t) {
var r, n, i, s = e.pos, o = e.src.charCodeAt(s);
if (t) return !1;
if (95 !== o && 42 !== o) return !1;
for (n = e.scanDelims(e.pos, 42 === o), r = 0; r < n.length; r++) i = e.push("text", "", 0), 
i.content = String.fromCharCode(o), e.delimiters.push({
marker: o,
jump: r,
token: e.tokens.length - 1,
level: e.level,
end: -1,
open: n.can_open,
close: n.can_close
});
return e.pos += n.length, !0;
}, e.exports.postProcess = function(e) {
var t, r, n, i, s, o, a = e.delimiters, c = e.delimiters.length;
for (t = 0; c > t; t++) r = a[t], (95 === r.marker || 42 === r.marker) && -1 !== r.end && (n = a[r.end], 
o = c > t + 1 && a[t + 1].end === r.end - 1 && a[t + 1].token === r.token + 1 && a[r.end - 1].token === n.token - 1 && a[t + 1].marker === r.marker, 
s = String.fromCharCode(r.marker), i = e.tokens[r.token], i.type = o ? "strong_open" : "em_open", 
i.tag = o ? "strong" : "em", i.nesting = 1, i.markup = o ? s + s : s, i.content = "", 
i = e.tokens[n.token], i.type = o ? "strong_close" : "em_close", i.tag = o ? "strong" : "em", 
i.nesting = -1, i.markup = o ? s + s : s, i.content = "", o && (e.tokens[a[t + 1].token].content = "", 
e.tokens[a[r.end - 1].token].content = "", t++));
};
}, function(e, t, r) {
"use strict";
var n = r(383), i = r(384), s = r(385), o = r(380).normalizeReference, a = r(380).isSpace;
e.exports = function(e, t) {
var r, c, l, u, p, h, f, d, g, m, b = "", k = e.pos, _ = e.posMax, v = e.pos;
if (91 !== e.src.charCodeAt(e.pos)) return !1;
if (p = e.pos + 1, u = n(e, e.pos, !0), 0 > u) return !1;
if (h = u + 1, _ > h && 40 === e.src.charCodeAt(h)) {
for (h++; _ > h && (c = e.src.charCodeAt(h), a(c) || 10 === c); h++) ;
if (h >= _) return !1;
for (v = h, f = i(e.src, h, e.posMax), f.ok && (b = e.md.normalizeLink(f.str), e.md.validateLink(b) ? h = f.pos : b = ""), 
v = h; _ > h && (c = e.src.charCodeAt(h), a(c) || 10 === c); h++) ;
if (f = s(e.src, h, e.posMax), _ > h && v !== h && f.ok) for (g = f.str, h = f.pos; _ > h && (c = e.src.charCodeAt(h), 
a(c) || 10 === c); h++) ; else g = "";
if (h >= _ || 41 !== e.src.charCodeAt(h)) return e.pos = k, !1;
h++;
} else {
if (void 0 === e.env.references) return !1;
if (_ > h && 91 === e.src.charCodeAt(h) ? (v = h + 1, h = n(e, h), h >= 0 ? l = e.src.slice(v, h++) : h = u + 1) : h = u + 1, 
l || (l = e.src.slice(p, u)), d = e.env.references[o(l)], !d) return e.pos = k, 
!1;
b = d.href, g = d.title;
}
return t || (e.pos = p, e.posMax = u, m = e.push("link_open", "a", 1), m.attrs = r = [ [ "href", b ] ], 
g && r.push([ "title", g ]), e.md.inline.tokenize(e), m = e.push("link_close", "a", -1)), 
e.pos = h, e.posMax = _, !0;
};
}, function(e, t, r) {
"use strict";
var n = r(383), i = r(384), s = r(385), o = r(380).normalizeReference, a = r(380).isSpace;
e.exports = function(e, t) {
var r, c, l, u, p, h, f, d, g, m, b, k, _, v = "", y = e.pos, E = e.posMax;
if (33 !== e.src.charCodeAt(e.pos)) return !1;
if (91 !== e.src.charCodeAt(e.pos + 1)) return !1;
if (h = e.pos + 2, p = n(e, e.pos + 1, !1), 0 > p) return !1;
if (f = p + 1, E > f && 40 === e.src.charCodeAt(f)) {
for (f++; E > f && (c = e.src.charCodeAt(f), a(c) || 10 === c); f++) ;
if (f >= E) return !1;
for (_ = f, g = i(e.src, f, e.posMax), g.ok && (v = e.md.normalizeLink(g.str), e.md.validateLink(v) ? f = g.pos : v = ""), 
_ = f; E > f && (c = e.src.charCodeAt(f), a(c) || 10 === c); f++) ;
if (g = s(e.src, f, e.posMax), E > f && _ !== f && g.ok) for (m = g.str, f = g.pos; E > f && (c = e.src.charCodeAt(f), 
a(c) || 10 === c); f++) ; else m = "";
if (f >= E || 41 !== e.src.charCodeAt(f)) return e.pos = y, !1;
f++;
} else {
if (void 0 === e.env.references) return !1;
if (E > f && 91 === e.src.charCodeAt(f) ? (_ = f + 1, f = n(e, f), f >= 0 ? u = e.src.slice(_, f++) : f = p + 1) : f = p + 1, 
u || (u = e.src.slice(h, p)), d = e.env.references[o(u)], !d) return e.pos = y, 
!1;
v = d.href, m = d.title;
}
return t || (l = e.src.slice(h, p), e.md.inline.parse(l, e.md, e.env, k = []), b = e.push("image", "img", 0), 
b.attrs = r = [ [ "src", v ], [ "alt", "" ] ], b.children = k, b.content = l, m && r.push([ "title", m ])), 
e.pos = f, e.posMax = E, !0;
};
}, function(e, t) {
"use strict";
var r = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/, n = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;
e.exports = function(e, t) {
var i, s, o, a, c, l, u = e.pos;
return 60 !== e.src.charCodeAt(u) ? !1 : (i = e.src.slice(u), i.indexOf(">") < 0 ? !1 : n.test(i) ? (s = i.match(n), 
a = s[0].slice(1, -1), c = e.md.normalizeLink(a), e.md.validateLink(c) ? (t || (l = e.push("link_open", "a", 1), 
l.attrs = [ [ "href", c ] ], l.markup = "autolink", l.info = "auto", l = e.push("text", "", 0), 
l.content = e.md.normalizeLinkText(a), l = e.push("link_close", "a", -1), l.markup = "autolink", 
l.info = "auto"), e.pos += s[0].length, !0) : !1) : r.test(i) ? (o = i.match(r), 
a = o[0].slice(1, -1), c = e.md.normalizeLink("mailto:" + a), e.md.validateLink(c) ? (t || (l = e.push("link_open", "a", 1), 
l.attrs = [ [ "href", c ] ], l.markup = "autolink", l.info = "auto", l = e.push("text", "", 0), 
l.content = e.md.normalizeLinkText(a), l = e.push("link_close", "a", -1), l.markup = "autolink", 
l.info = "auto"), e.pos += o[0].length, !0) : !1) : !1);
};
}, function(e, t, r) {
"use strict";
function n(e) {
var t = 32 | e;
return t >= 97 && 122 >= t;
}
var i = r(409).HTML_TAG_RE;
e.exports = function(e, t) {
var r, s, o, a, c = e.pos;
return e.md.options.html ? (o = e.posMax, 60 !== e.src.charCodeAt(c) || c + 2 >= o ? !1 : (r = e.src.charCodeAt(c + 1), 
(33 === r || 63 === r || 47 === r || n(r)) && (s = e.src.slice(c).match(i)) ? (t || (a = e.push("html_inline", "", 0), 
a.content = e.src.slice(c, c + s[0].length)), e.pos += s[0].length, !0) : !1)) : !1;
};
}, function(e, t, r) {
"use strict";
var n = r(381), i = r(380).has, s = r(380).isValidEntityCode, o = r(380).fromCodePoint, a = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i, c = /^&([a-z][a-z0-9]{1,31});/i;
e.exports = function(e, t) {
var r, l, u, p = e.pos, h = e.posMax;
if (38 !== e.src.charCodeAt(p)) return !1;
if (h > p + 1) if (r = e.src.charCodeAt(p + 1), 35 === r) {
if (u = e.src.slice(p).match(a)) return t || (l = "x" === u[1][0].toLowerCase() ? parseInt(u[1].slice(1), 16) : parseInt(u[1], 10), 
e.pending += o(s(l) ? l : 65533)), e.pos += u[0].length, !0;
} else if (u = e.src.slice(p).match(c), u && i(n, u[1])) return t || (e.pending += n[u[1]]), 
e.pos += u[0].length, !0;
return t || (e.pending += "&"), e.pos++, !0;
};
}, function(e, t) {
"use strict";
e.exports = function(e) {
var t, r, n, i, s = e.delimiters, o = e.delimiters.length;
for (t = 0; o > t; t++) if (n = s[t], n.close) for (r = t - n.jump - 1; r >= 0; ) {
if (i = s[r], i.open && i.marker === n.marker && i.end < 0 && i.level === n.level) {
n.jump = t - r, n.open = !1, i.end = t, i.jump = 0;
break;
}
r -= i.jump + 1;
}
};
}, function(e, t) {
"use strict";
e.exports = function(e) {
var t, r, n = 0, i = e.tokens, s = e.tokens.length;
for (t = r = 0; s > t; t++) n += i[t].nesting, i[t].level = n, "text" === i[t].type && s > t + 1 && "text" === i[t + 1].type ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== r && (i[r] = i[t]), 
r++);
t !== r && (i.length = r);
};
}, function(e, t, r) {
"use strict";
function n(e, t, r, n) {
this.src = e, this.env = r, this.md = t, this.tokens = n, this.pos = 0, this.posMax = this.src.length, 
this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [];
}
var i = r(396), s = r(380).isWhiteSpace, o = r(380).isPunctChar, a = r(380).isMdAsciiPunct;
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
var r, n, i, c, l, u, p, h, f, d = e, g = !0, m = !0, b = this.posMax, k = this.src.charCodeAt(e);
for (r = e > 0 ? this.src.charCodeAt(e - 1) : 32; b > d && this.src.charCodeAt(d) === k; ) d++;
return i = d - e, n = b > d ? this.src.charCodeAt(d) : 32, p = a(r) || o(String.fromCharCode(r)), 
f = a(n) || o(String.fromCharCode(n)), u = s(r), h = s(n), h ? g = !1 : f && (u || p || (g = !1)), 
u ? m = !1 : p && (h || f || (m = !1)), t ? (c = g, l = m) : (c = g && (!m || p), 
l = m && (!g || f)), {
can_open: c,
can_close: l,
length: i
};
}, n.prototype.Token = i, e.exports = n;
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
}, function(e, t) {
"use strict";
e.exports = function(e, t, r) {
function n(e) {
return e.trim().split(" ", 2)[0] === t;
}
function i(e, r, n, i, s) {
return 1 === e[r].nesting && e[r].attrPush([ "class", t ]), s.renderToken(e, r, n, i, s);
}
function s(e, r, n, i) {
var s, p, h, f, d, g, m, b, k = !1, _ = e.bMarks[r] + e.tShift[r], v = e.eMarks[r];
if (c !== e.src.charCodeAt(_)) return !1;
for (s = _ + 1; v >= s && a[(s - _) % l] === e.src[s]; s++) ;
if (h = Math.floor((s - _) / l), o > h) return !1;
if (s -= (s - _) % l, f = e.src.slice(_, s), d = e.src.slice(s, v), !u(d)) return !1;
if (i) return !0;
for (p = r; (p++, !(p >= n)) && (_ = e.bMarks[p] + e.tShift[p], v = e.eMarks[p], 
!(v > _ && e.sCount[p] < e.blkIndent)); ) if (c === e.src.charCodeAt(_) && !(e.sCount[p] - e.blkIndent >= 4)) {
for (s = _ + 1; v >= s && a[(s - _) % l] === e.src[s]; s++) ;
if (!(Math.floor((s - _) / l) < h || (s -= (s - _) % l, s = e.skipSpaces(s), v > s))) {
k = !0;
break;
}
}
return m = e.parentType, b = e.lineMax, e.parentType = "container", e.lineMax = p, 
g = e.push("container_" + t + "_open", "div", 1), g.markup = f, g.block = !0, g.info = d, 
g.map = [ r, p ], e.md.block.tokenize(e, r + 1, p), g = e.push("container_" + t + "_close", "div", -1), 
g.markup = e.src.slice(_, s), g.block = !0, e.parentType = m, e.lineMax = b, e.line = p + (k ? 1 : 0), 
!0;
}
r = r || {};
var o = 3, a = r.marker || ":", c = a.charCodeAt(0), l = a.length, u = r.validate || n, p = r.render || i;
e.block.ruler.before("fence", "container_" + t, s, {
alt: [ "paragraph", "reference", "blockquote", "list" ]
}), e.renderer.rules["container_" + t + "_open"] = p, e.renderer.rules["container_" + t + "_close"] = p;
};
}, function(e, t) {
"use strict";
e.exports = function(e) {
function t(e, t) {
var r, n, i = e.bMarks[t] + e.tShift[t], s = e.eMarks[t];
return i >= s ? -1 : (n = e.src.charCodeAt(i++), 126 !== n && 58 !== n ? -1 : (r = e.skipSpaces(i), 
i === r ? -1 : r >= s ? -1 : i));
}
function r(e, t) {
var r, n, i = e.level + 2;
for (r = t + 2, n = e.tokens.length - 2; n > r; r++) e.tokens[r].level === i && "paragraph_open" === e.tokens[r].type && (e.tokens[r + 2].hidden = !0, 
e.tokens[r].hidden = !0, r += 2);
}
function n(e, n, s, o) {
var a, c, l, u, p, h, f, d, g, m, b, k, _, v, y, E, A, x, C, w;
if (o) return e.ddIndent < 0 ? !1 : t(e, n) >= 0;
if (g = n + 1, e.isEmpty(g) && ++g > s) return !1;
if (e.sCount[g] < e.blkIndent) return !1;
if (c = t(e, g), 0 > c) return !1;
f = e.tokens.length, w = e.push("dl_open", "dl", 1), w.map = h = [ n, 0 ], u = n, 
l = g;
e: for (;;) {
for (C = !0, x = !1, w = e.push("dt_open", "dt", 1), w.map = [ u, u ], w = e.push("inline", "", 0), 
w.map = [ u, u ], w.content = e.getLines(u, u + 1, e.blkIndent, !1).trim(), w.children = [], 
w = e.push("dt_close", "dt", -1); ;) {
for (w = e.push("dd_open", "dd", 1), w.map = p = [ g, 0 ], A = c, d = e.eMarks[l], 
m = e.sCount[l] + c - (e.bMarks[l] + e.tShift[l]); d > A && (a = e.src.charCodeAt(A), 
i(a)); ) 9 === a ? m += 4 - m % 4 : m++, A++;
if (c = A, E = e.tight, b = e.ddIndent, k = e.blkIndent, y = e.tShift[l], v = e.sCount[l], 
_ = e.parentType, e.blkIndent = e.ddIndent = e.sCount[l] + 2, e.tShift[l] = c - e.bMarks[l], 
e.sCount[l] = m, e.tight = !0, e.parentType = "deflist", e.md.block.tokenize(e, l, s, !0), 
(!e.tight || x) && (C = !1), x = e.line - l > 1 && e.isEmpty(e.line - 1), e.tShift[l] = y, 
e.sCount[l] = v, e.tight = E, e.parentType = _, e.blkIndent = k, e.ddIndent = b, 
w = e.push("dd_close", "dd", -1), p[1] = g = e.line, g >= s) break e;
if (e.sCount[g] < e.blkIndent) break e;
if (c = t(e, g), 0 > c) break;
l = g;
}
if (g >= s) break;
if (u = g, e.isEmpty(u)) break;
if (e.sCount[u] < e.blkIndent) break;
if (l = u + 1, l >= s) break;
if (e.isEmpty(l) && l++, l >= s) break;
if (e.sCount[l] < e.blkIndent) break;
if (c = t(e, l), 0 > c) break;
}
return w = e.push("dl_close", "dl", -1), h[1] = g, e.line = g, C && r(e, f), !0;
}
var i = e.utils.isSpace;
e.block.ruler.before("paragraph", "deflist", n, {
alt: [ "paragraph", "reference" ]
});
};
}, , function(e, t, r) {
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
}(), s = r(251), o = r(237), a = r(370), c = function() {
function e(t) {
var r = this;
n(this, e), this.editor = t.editor, this.elem = this.editor.getPreviewElem(), this.renderThrottled = a(this.render.bind(this), 100), 
this.editor.elem.addEventListener("mdeditor:change", function(e) {
r.renderThrottled();
}), this.renderThrottled();
}
return i(e, [ {
key: "highlight",
value: function() {
o.highlight(this.elem);
}
}, {
key: "render",
value: function() {
var e = this.editor.getValue(), t = new s().render(e);
this.elem.innerHTML = t, this.highlight();
}
} ]), e;
}();
e.exports = c;
} ]));
//# sourceMappingURL=31-31.d875cf27039ffe80768d.js.map
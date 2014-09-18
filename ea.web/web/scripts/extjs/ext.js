/*
 This file is part of Ext JS 4.2

 Copyright (c) 2011-2013 Sencha Inc

 Contact:  http://www.sencha.com/contact

 GNU General Public License Usage
 This file may be used under the terms of the GNU General Public License version 3.0 as
 published by the Free Software Foundation and appearing in the file LICENSE included in the
 packaging of this file.

 Please review the following information to ensure the GNU General Public License version 3.0
 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

 If you are unsure which license is appropriate for your use, please contact the sales department
 at http://www.sencha.com/contact.

 Build date: 2013-03-11 22:33:40 (aed16176e68b5e8aa1433452b12805c0ad913836)
 */
var Ext = Ext || {};
if (!Ext.Direct) {
    Ext.Direct = {}
}
if (!Ext.Toolbar) {
    Ext.Toolbar = {}
}
if (!Ext.app) {
    Ext.app = {}
}
if (!Ext.app.domain) {
    Ext.app.domain = {}
}
if (!Ext.button) {
    Ext.button = {}
}
if (!Ext.chart) {
    Ext.chart = {}
}
if (!Ext.chart.axis) {
    Ext.chart.axis = {}
}
if (!Ext.chart.series) {
    Ext.chart.series = {}
}
if (!Ext.chart.theme) {
    Ext.chart.theme = {}
}
if (!Ext.container) {
    Ext.container = {}
}
if (!Ext.core) {
    Ext.core = {}
}
if (!Ext.data) {
    Ext.data = {}
}
if (!Ext.data.association) {
    Ext.data.association = {}
}
if (!Ext.data.flash) {
    Ext.data.flash = {}
}
if (!Ext.data.proxy) {
    Ext.data.proxy = {}
}
if (!Ext.data.reader) {
    Ext.data.reader = {}
}
if (!Ext.data.writer) {
    Ext.data.writer = {}
}
if (!Ext.dd) {
    Ext.dd = {}
}
if (!Ext.direct) {
    Ext.direct = {}
}
if (!Ext.dom) {
    Ext.dom = {}
}
if (!Ext.draw) {
    Ext.draw = {}
}
if (!Ext.draw.engine) {
    Ext.draw.engine = {}
}
if (!Ext.flash) {
    Ext.flash = {}
}
if (!Ext.form) {
    Ext.form = {}
}
if (!Ext.form.Action) {
    Ext.form.Action = {}
}
if (!Ext.form.action) {
    Ext.form.action = {}
}
if (!Ext.form.field) {
    Ext.form.field = {}
}
if (!Ext.fx) {
    Ext.fx = {}
}
if (!Ext.fx.target) {
    Ext.fx.target = {}
}
if (!Ext.grid) {
    Ext.grid = {}
}
if (!Ext.grid.column) {
    Ext.grid.column = {}
}
if (!Ext.grid.feature) {
    Ext.grid.feature = {}
}
if (!Ext.grid.header) {
    Ext.grid.header = {}
}
if (!Ext.grid.locking) {
    Ext.grid.locking = {}
}
if (!Ext.grid.plugin) {
    Ext.grid.plugin = {}
}
if (!Ext.grid.property) {
    Ext.grid.property = {}
}
if (!Ext.layout) {
    Ext.layout = {}
}
if (!Ext.layout.boxOverflow) {
    Ext.layout.boxOverflow = {}
}
if (!Ext.layout.component) {
    Ext.layout.component = {}
}
if (!Ext.layout.component.field) {
    Ext.layout.component.field = {}
}
if (!Ext.layout.container) {
    Ext.layout.container = {}
}
if (!Ext.layout.container.boxOverflow) {
    Ext.layout.container.boxOverflow = {}
}
if (!Ext.list) {
    Ext.list = {}
}
if (!Ext.menu) {
    Ext.menu = {}
}
if (!Ext.panel) {
    Ext.panel = {}
}
if (!Ext.perf) {
    Ext.perf = {}
}
if (!Ext.picker) {
    Ext.picker = {}
}
if (!Ext.resizer) {
    Ext.resizer = {}
}
if (!Ext.rtl) {
    Ext.rtl = {}
}
if (!Ext.rtl.button) {
    Ext.rtl.button = {}
}
if (!Ext.rtl.dd) {
    Ext.rtl.dd = {}
}
if (!Ext.rtl.dom) {
    Ext.rtl.dom = {}
}
if (!Ext.rtl.form) {
    Ext.rtl.form = {}
}
if (!Ext.rtl.form.field) {
    Ext.rtl.form.field = {}
}
if (!Ext.rtl.grid) {
    Ext.rtl.grid = {}
}
if (!Ext.rtl.grid.column) {
    Ext.rtl.grid.column = {}
}
if (!Ext.rtl.grid.plugin) {
    Ext.rtl.grid.plugin = {}
}
if (!Ext.rtl.layout) {
    Ext.rtl.layout = {}
}
if (!Ext.rtl.layout.component) {
    Ext.rtl.layout.component = {}
}
if (!Ext.rtl.layout.component.field) {
    Ext.rtl.layout.component.field = {}
}
if (!Ext.rtl.layout.container) {
    Ext.rtl.layout.container = {}
}
if (!Ext.rtl.layout.container.boxOverflow) {
    Ext.rtl.layout.container.boxOverflow = {}
}
if (!Ext.rtl.panel) {
    Ext.rtl.panel = {}
}
if (!Ext.rtl.resizer) {
    Ext.rtl.resizer = {}
}
if (!Ext.rtl.slider) {
    Ext.rtl.slider = {}
}
if (!Ext.rtl.tab) {
    Ext.rtl.tab = {}
}
if (!Ext.rtl.tree) {
    Ext.rtl.tree = {}
}
if (!Ext.rtl.util) {
    Ext.rtl.util = {}
}
if (!Ext.rtl.view) {
    Ext.rtl.view = {}
}
if (!Ext.selection) {
    Ext.selection = {}
}
if (!Ext.slider) {
    Ext.slider = {}
}
if (!Ext.state) {
    Ext.state = {}
}
if (!Ext.tab) {
    Ext.tab = {}
}
if (!Ext.tip) {
    Ext.tip = {}
}
if (!Ext.toolbar) {
    Ext.toolbar = {}
}
if (!Ext.tree) {
    Ext.tree = {}
}
if (!Ext.tree.plugin) {
    Ext.tree.plugin = {}
}
if (!Ext.util) {
    Ext.util = {}
}
if (!Ext.ux) {
    Ext.ux = {}
}
if (!Ext.ux.form) {
    Ext.ux.form = {}
}
if (!Ext.view) {
    Ext.view = {}
}
if (!Ext.window) {
    Ext.window = {}
}
var Ext = Ext || {};
Ext._startTime = new Date().getTime();
(function () {
    var a = this, c = Object.prototype, b = c.toString, k = true, l = {toString: 1}, e = function () {
    }, j = function () {
        var i = j.caller.caller;
        return i.$owner.prototype[i.$name].apply(this, arguments)
    }, d, h = /\S/, g;
    Function.prototype.$extIsFunction = true;
    Ext.global = a;
    for (d in l) {
        k = null
    }
    if (k) {
        k = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"]
    }
    Ext.enumerables = k;
    Ext.apply = function (p, o, r) {
        if (r) {
            Ext.apply(p, r)
        }
        if (p && o && typeof o === "object") {
            var q, n, m;
            for (q in o) {
                p[q] = o[q]
            }
            if (k) {
                for (n = k.length; n--;) {
                    m = k[n];
                    if (o.hasOwnProperty(m)) {
                        p[m] = o[m]
                    }
                }
            }
        }
        return p
    };
    Ext.buildSettings = Ext.apply({baseCSSPrefix: "x-"}, Ext.buildSettings || {});
    Ext.apply(Ext, {name: Ext.sandboxName || "Ext", emptyFn: e, identityFn: function (i) {
        return i
    }, emptyString: new String(), baseCSSPrefix: Ext.buildSettings.baseCSSPrefix, applyIf: function (m, i) {
        var n;
        if (m) {
            for (n in i) {
                if (m[n] === undefined) {
                    m[n] = i[n]
                }
            }
        }
        return m
    }, iterate: function (i, n, m) {
        if (Ext.isEmpty(i)) {
            return
        }
        if (m === undefined) {
            m = i
        }
        if (Ext.isIterable(i)) {
            Ext.Array.each.call(Ext.Array, i, n, m)
        } else {
            Ext.Object.each.call(Ext.Object, i, n, m)
        }
    }});
    Ext.apply(Ext, {extend: (function () {
        var i = c.constructor, m = function (p) {
            for (var n in p) {
                if (!p.hasOwnProperty(n)) {
                    continue
                }
                this[n] = p[n]
            }
        };
        return function (n, s, q) {
            if (Ext.isObject(s)) {
                q = s;
                s = n;
                n = q.constructor !== i ? q.constructor : function () {
                    s.apply(this, arguments)
                }
            }
            var p = function () {
            }, o, r = s.prototype;
            p.prototype = r;
            o = n.prototype = new p();
            o.constructor = n;
            n.superclass = r;
            if (r.constructor === i) {
                r.constructor = s
            }
            n.override = function (t) {
                Ext.override(n, t)
            };
            o.override = m;
            o.proto = o;
            n.override(q);
            n.extend = function (t) {
                return Ext.extend(n, t)
            };
            return n
        }
    }()), override: function (o, p) {
        if (o.$isClass) {
            o.override(p)
        } else {
            if (typeof o == "function") {
                Ext.apply(o.prototype, p)
            } else {
                var i = o.self, m, n;
                if (i && i.$isClass) {
                    for (m in p) {
                        if (p.hasOwnProperty(m)) {
                            n = p[m];
                            if (typeof n == "function") {
                                n.$name = m;
                                n.$owner = i;
                                n.$previous = o.hasOwnProperty(m) ? o[m] : j
                            }
                            o[m] = n
                        }
                    }
                } else {
                    Ext.apply(o, p)
                }
            }
        }
        return o
    }});
    Ext.apply(Ext, {valueFrom: function (n, i, m) {
        return Ext.isEmpty(n, m) ? i : n
    }, typeOf: function (m) {
        var i, n;
        if (m === null) {
            return"null"
        }
        i = typeof m;
        if (i === "undefined" || i === "string" || i === "number" || i === "boolean") {
            return i
        }
        n = b.call(m);
        switch (n) {
            case"[object Array]":
                return"array";
            case"[object Date]":
                return"date";
            case"[object Boolean]":
                return"boolean";
            case"[object Number]":
                return"number";
            case"[object RegExp]":
                return"regexp"
        }
        if (i === "function") {
            return"function"
        }
        if (i === "object") {
            if (m.nodeType !== undefined) {
                if (m.nodeType === 3) {
                    return(h).test(m.nodeValue) ? "textnode" : "whitespace"
                } else {
                    return"element"
                }
            }
            return"object"
        }
    }, coerce: function (p, o) {
        var n = Ext.typeOf(p), m = Ext.typeOf(o), i = typeof p === "string";
        if (n !== m) {
            switch (m) {
                case"string":
                    return String(p);
                case"number":
                    return Number(p);
                case"boolean":
                    return i && (!p || p === "false") ? false : Boolean(p);
                case"null":
                    return i && (!p || p === "null") ? null : p;
                case"undefined":
                    return i && (!p || p === "undefined") ? undefined : p;
                case"date":
                    return i && isNaN(p) ? Ext.Date.parse(p, Ext.Date.defaultFormat) : Date(Number(p))
            }
        }
        return p
    }, isEmpty: function (i, m) {
        return(i === null) || (i === undefined) || (!m ? i === "" : false) || (Ext.isArray(i) && i.length === 0)
    }, isArray: ("isArray" in Array) ? Array.isArray : function (i) {
        return b.call(i) === "[object Array]"
    }, isDate: function (i) {
        return b.call(i) === "[object Date]"
    }, isObject: (b.call(null) === "[object Object]") ? function (i) {
        return i !== null && i !== undefined && b.call(i) === "[object Object]" && i.ownerDocument === undefined
    } : function (i) {
        return b.call(i) === "[object Object]"
    }, isSimpleObject: function (i) {
        return i instanceof Object && i.constructor === Object
    }, isPrimitive: function (m) {
        var i = typeof m;
        return i === "string" || i === "number" || i === "boolean"
    }, isFunction: function (i) {
        return !!(i && i.$extIsFunction)
    }, isNumber: function (i) {
        return typeof i === "number" && isFinite(i)
    }, isNumeric: function (i) {
        return !isNaN(parseFloat(i)) && isFinite(i)
    }, isString: function (i) {
        return typeof i === "string"
    }, isBoolean: function (i) {
        return typeof i === "boolean"
    }, isElement: function (i) {
        return i ? i.nodeType === 1 : false
    }, isTextNode: function (i) {
        return i ? i.nodeName === "#text" : false
    }, isDefined: function (i) {
        return typeof i !== "undefined"
    }, isIterable: function (m) {
        var i = typeof m, n = false;
        if (m && i != "string") {
            if (i == "function") {
                if (Ext.isSafari) {
                    n = m instanceof NodeList || m instanceof HTMLCollection
                }
            } else {
                n = true
            }
        }
        return n ? m.length !== undefined : false
    }});
    Ext.apply(Ext, {clone: function (r) {
        var q, p, n, m, s, o;
        if (r === null || r === undefined) {
            return r
        }
        if (r.nodeType && r.cloneNode) {
            return r.cloneNode(true)
        }
        q = b.call(r);
        if (q === "[object Date]") {
            return new Date(r.getTime())
        }
        if (q === "[object Array]") {
            p = r.length;
            s = [];
            while (p--) {
                s[p] = Ext.clone(r[p])
            }
        } else {
            if (q === "[object Object]" && r.constructor === Object) {
                s = {};
                for (o in r) {
                    s[o] = Ext.clone(r[o])
                }
                if (k) {
                    for (n = k.length; n--;) {
                        m = k[n];
                        s[m] = r[m]
                    }
                }
            }
        }
        return s || r
    }, getUniqueGlobalNamespace: function () {
        var n = this.uniqueGlobalNamespace, m;
        if (n === undefined) {
            m = 0;
            do {
                n = "ExtBox" + (++m)
            } while (Ext.global[n] !== undefined);
            Ext.global[n] = Ext;
            this.uniqueGlobalNamespace = n
        }
        return n
    }, functionFactoryCache: {}, cacheableFunctionFactory: function () {
        var q = this, n = Array.prototype.slice.call(arguments), m = q.functionFactoryCache, i, o, p;
        if (Ext.isSandboxed) {
            p = n.length;
            if (p > 0) {
                p--;
                n[p] = "var Ext=window." + Ext.name + ";" + n[p]
            }
        }
        i = n.join("");
        o = m[i];
        if (!o) {
            o = Function.prototype.constructor.apply(Function.prototype, n);
            m[i] = o
        }
        return o
    }, functionFactory: function () {
        var n = this, i = Array.prototype.slice.call(arguments), m;
        if (Ext.isSandboxed) {
            m = i.length;
            if (m > 0) {
                m--;
                i[m] = "var Ext=window." + Ext.name + ";" + i[m]
            }
        }
        return Function.prototype.constructor.apply(Function.prototype, i)
    }, Logger: {verbose: e, log: e, info: e, warn: e, error: function (i) {
        throw new Error(i)
    }, deprecate: e}});
    Ext.type = Ext.typeOf;
    g = Ext.app;
    if (!g) {
        g = Ext.app = {}
    }
    Ext.apply(g, {namespaces: {}, collectNamespaces: function (n) {
        var i = Ext.app.namespaces, m;
        for (m in n) {
            if (n.hasOwnProperty(m)) {
                i[m] = true
            }
        }
    }, addNamespaces: function (o) {
        var p = Ext.app.namespaces, n, m;
        if (!Ext.isArray(o)) {
            o = [o]
        }
        for (n = 0, m = o.length; n < m; n++) {
            p[o[n]] = true
        }
    }, clearNamespaces: function () {
        Ext.app.namespaces = {}
    }, getNamespace: function (m) {
        var o = Ext.app.namespaces, i = "", n;
        for (n in o) {
            if (o.hasOwnProperty(n) && n.length > i.length && (n + "." === m.substring(0, n.length + 1))) {
                i = n
            }
        }
        return i === "" ? undefined : i
    }})
}());
Ext.globalEval = Ext.global.execScript ? function (a) {
    execScript(a)
} : function ($$code) {
    (function () {
        var Ext = this.Ext;
        eval($$code)
    }())
};
(function () {
    var a = "4.2.0.663", b;
    Ext.Version = b = Ext.extend(Object, {constructor: function (c) {
        var e, d;
        if (c instanceof b) {
            return c
        }
        this.version = this.shortVersion = String(c).toLowerCase().replace(/_/g, ".").replace(/[\-+]/g, "");
        d = this.version.search(/([^\d\.])/);
        if (d !== -1) {
            this.release = this.version.substr(d, c.length);
            this.shortVersion = this.version.substr(0, d)
        }
        this.shortVersion = this.shortVersion.replace(/[^\d]/g, "");
        e = this.version.split(".");
        this.major = parseInt(e.shift() || 0, 10);
        this.minor = parseInt(e.shift() || 0, 10);
        this.patch = parseInt(e.shift() || 0, 10);
        this.build = parseInt(e.shift() || 0, 10);
        return this
    }, toString: function () {
        return this.version
    }, valueOf: function () {
        return this.version
    }, getMajor: function () {
        return this.major || 0
    }, getMinor: function () {
        return this.minor || 0
    }, getPatch: function () {
        return this.patch || 0
    }, getBuild: function () {
        return this.build || 0
    }, getRelease: function () {
        return this.release || ""
    }, isGreaterThan: function (c) {
        return b.compare(this.version, c) === 1
    }, isGreaterThanOrEqual: function (c) {
        return b.compare(this.version, c) >= 0
    }, isLessThan: function (c) {
        return b.compare(this.version, c) === -1
    }, isLessThanOrEqual: function (c) {
        return b.compare(this.version, c) <= 0
    }, equals: function (c) {
        return b.compare(this.version, c) === 0
    }, match: function (c) {
        c = String(c);
        return this.version.substr(0, c.length) === c
    }, toArray: function () {
        return[this.getMajor(), this.getMinor(), this.getPatch(), this.getBuild(), this.getRelease()]
    }, getShortVersion: function () {
        return this.shortVersion
    }, gt: function () {
        return this.isGreaterThan.apply(this, arguments)
    }, lt: function () {
        return this.isLessThan.apply(this, arguments)
    }, gtEq: function () {
        return this.isGreaterThanOrEqual.apply(this, arguments)
    }, ltEq: function () {
        return this.isLessThanOrEqual.apply(this, arguments)
    }});
    Ext.apply(b, {releaseValueMap: {dev: -6, alpha: -5, a: -5, beta: -4, b: -4, rc: -3, "#": -2, p: -1, pl: -1}, getComponentValue: function (c) {
        return !c ? 0 : (isNaN(c) ? this.releaseValueMap[c] || c : parseInt(c, 10))
    }, compare: function (h, g) {
        var d, e, c;
        h = new b(h).toArray();
        g = new b(g).toArray();
        for (c = 0; c < Math.max(h.length, g.length); c++) {
            d = this.getComponentValue(h[c]);
            e = this.getComponentValue(g[c]);
            if (d < e) {
                return -1
            } else {
                if (d > e) {
                    return 1
                }
            }
        }
        return 0
    }});
    Ext.apply(Ext, {versions: {}, lastRegisteredVersion: null, setVersion: function (d, c) {
        Ext.versions[d] = new b(c);
        Ext.lastRegisteredVersion = Ext.versions[d];
        return this
    }, getVersion: function (c) {
        if (c === undefined) {
            return Ext.lastRegisteredVersion
        }
        return Ext.versions[c]
    }, deprecate: function (c, e, g, d) {
        if (b.compare(Ext.getVersion(c), e) < 1) {
            g.call(d)
        }
    }});
    Ext.setVersion("core", a)
}());
Ext.String = (function () {
    var j = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g, n = /('|\\)/g, i = /\{(\d+)\}/g, b = /([-.*+?\^${}()|\[\]\/\\])/g, o = /^\s+|\s+$/g, k = /\s+/, m = /(^[^a-z]*|[^\w])/gi, e, a, h, d, g = function (q, p) {
        return e[p]
    }, l = function (q, p) {
        return(p in a) ? a[p] : String.fromCharCode(parseInt(p.substr(2), 10))
    }, c = function (q, p) {
        if (q === null || q === undefined || p === null || p === undefined) {
            return false
        }
        return p.length <= q.length
    };
    return{insert: function (r, t, q) {
        if (!r) {
            return t
        }
        if (!t) {
            return r
        }
        var p = r.length;
        if (!q && q !== 0) {
            q = p
        }
        if (q < 0) {
            q *= -1;
            if (q >= p) {
                q = 0
            } else {
                q = p - q
            }
        }
        if (q === 0) {
            r = t + r
        } else {
            if (q >= r.length) {
                r += t
            } else {
                r = r.substr(0, q) + t + r.substr(q)
            }
        }
        return r
    }, startsWith: function (r, t, q) {
        var p = c(r, t);
        if (p) {
            if (q) {
                r = r.toLowerCase();
                t = t.toLowerCase()
            }
            p = r.lastIndexOf(t, 0) === 0
        }
        return p
    }, endsWith: function (t, q, r) {
        var p = c(t, q);
        if (p) {
            if (r) {
                t = t.toLowerCase();
                q = q.toLowerCase()
            }
            p = t.indexOf(q, t.length - q.length) !== -1
        }
        return p
    }, createVarName: function (p) {
        return p.replace(m, "")
    }, htmlEncode: function (p) {
        return(!p) ? p : String(p).replace(h, g)
    }, htmlDecode: function (p) {
        return(!p) ? p : String(p).replace(d, l)
    }, addCharacterEntities: function (q) {
        var p = [], t = [], r, s;
        for (r in q) {
            s = q[r];
            a[r] = s;
            e[s] = r;
            p.push(s);
            t.push(r)
        }
        h = new RegExp("(" + p.join("|") + ")", "g");
        d = new RegExp("(" + t.join("|") + "|&#[0-9]{1,5};)", "g")
    }, resetCharacterEntities: function () {
        e = {};
        a = {};
        this.addCharacterEntities({"&amp;": "&", "&gt;": ">", "&lt;": "<", "&quot;": '"', "&#39;": "'"})
    }, urlAppend: function (q, p) {
        if (!Ext.isEmpty(p)) {
            return q + (q.indexOf("?") === -1 ? "?" : "&") + p
        }
        return q
    }, trim: function (p) {
        return p.replace(j, "")
    }, capitalize: function (p) {
        return p.charAt(0).toUpperCase() + p.substr(1)
    }, uncapitalize: function (p) {
        return p.charAt(0).toLowerCase() + p.substr(1)
    }, ellipsis: function (r, p, s) {
        if (r && r.length > p) {
            if (s) {
                var t = r.substr(0, p - 2), q = Math.max(t.lastIndexOf(" "), t.lastIndexOf("."), t.lastIndexOf("!"), t.lastIndexOf("?"));
                if (q !== -1 && q >= (p - 15)) {
                    return t.substr(0, q) + "..."
                }
            }
            return r.substr(0, p - 3) + "..."
        }
        return r
    }, escapeRegex: function (p) {
        return p.replace(b, "\\$1")
    }, escape: function (p) {
        return p.replace(n, "\\$1")
    }, toggle: function (q, r, p) {
        return q === r ? p : r
    }, leftPad: function (q, r, s) {
        var p = String(q);
        s = s || " ";
        while (p.length < r) {
            p = s + p
        }
        return p
    }, format: function (q) {
        var p = Ext.Array.toArray(arguments, 1);
        return q.replace(i, function (r, s) {
            return p[s]
        })
    }, repeat: function (t, s, q) {
        if (s < 1) {
            s = 0
        }
        for (var p = [], r = s; r--;) {
            p.push(t)
        }
        return p.join(q || "")
    }, splitWords: function (p) {
        if (p && typeof p == "string") {
            return p.replace(o, "").split(k)
        }
        return p || []
    }}
}());
Ext.String.resetCharacterEntities();
Ext.htmlEncode = Ext.String.htmlEncode;
Ext.htmlDecode = Ext.String.htmlDecode;
Ext.urlAppend = Ext.String.urlAppend;
Ext.Number = new function () {
    var b = this, c = (0.9).toFixed() !== "1", a = Math;
    Ext.apply(this, {constrain: function (h, g, e) {
        var d = parseFloat(h);
        return(d < g) ? g : ((d > e) ? e : d)
    }, snap: function (h, e, g, i) {
        var d;
        if (h === undefined || h < g) {
            return g || 0
        }
        if (e) {
            d = h % e;
            if (d !== 0) {
                h -= d;
                if (d * 2 >= e) {
                    h += e
                } else {
                    if (d * 2 < -e) {
                        h -= e
                    }
                }
            }
        }
        return b.constrain(h, g, i)
    }, snapInRange: function (h, d, g, i) {
        var e;
        g = (g || 0);
        if (h === undefined || h < g) {
            return g
        }
        if (d && (e = ((h - g) % d))) {
            h -= e;
            e *= 2;
            if (e >= d) {
                h += d
            }
        }
        if (i !== undefined) {
            if (h > (i = b.snapInRange(i, d, g))) {
                h = i
            }
        }
        return h
    }, toFixed: c ? function (g, d) {
        d = d || 0;
        var e = a.pow(10, d);
        return(a.round(g * e) / e).toFixed(d)
    } : function (e, d) {
        return e.toFixed(d)
    }, from: function (e, d) {
        if (isFinite(e)) {
            e = parseFloat(e)
        }
        return !isNaN(e) ? e : d
    }, randomInt: function (e, d) {
        return a.floor(a.random() * (d - e + 1) + e)
    }, correctFloat: function (d) {
        return parseFloat(d.toPrecision(14))
    }});
    Ext.num = function () {
        return b.from.apply(this, arguments)
    }
};
(function () {
    var g = Array.prototype, o = g.slice, q = (function () {
        var A = [], e, z = 20;
        if (!A.splice) {
            return false
        }
        while (z--) {
            A.push("A")
        }
        A.splice(15, 0, "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F");
        e = A.length;
        A.splice(13, 0, "XXX");
        if (e + 1 != A.length) {
            return false
        }
        return true
    }()), j = "forEach" in g, u = "map" in g, p = "indexOf" in g, y = "every" in g, c = "some" in g, d = "filter" in g, n = (function () {
        var e = [1, 2, 3, 4, 5].sort(function () {
            return 0
        });
        return e[0] === 1 && e[1] === 2 && e[2] === 3 && e[3] === 4 && e[4] === 5
    }()), k = true, a, w, t, v;
    try {
        if (typeof document !== "undefined") {
            o.call(document.getElementsByTagName("body"))
        }
    } catch (s) {
        k = false
    }
    function m(z, e) {
        return(e < 0) ? Math.max(0, z.length + e) : Math.min(z.length, e)
    }

    function x(G, F, z, J) {
        var K = J ? J.length : 0, B = G.length, H = m(G, F), E, I, A, e, C, D;
        if (H === B) {
            if (K) {
                G.push.apply(G, J)
            }
        } else {
            E = Math.min(z, B - H);
            I = H + E;
            A = I + K - E;
            e = B - I;
            C = B - E;
            if (A < I) {
                for (D = 0; D < e; ++D) {
                    G[A + D] = G[I + D]
                }
            } else {
                if (A > I) {
                    for (D = e; D--;) {
                        G[A + D] = G[I + D]
                    }
                }
            }
            if (K && H === C) {
                G.length = C;
                G.push.apply(G, J)
            } else {
                G.length = C + K;
                for (D = 0; D < K; ++D) {
                    G[H + D] = J[D]
                }
            }
        }
        return G
    }

    function i(B, e, A, z) {
        if (z && z.length) {
            if (e === 0 && !A) {
                B.unshift.apply(B, z)
            } else {
                if (e < B.length) {
                    B.splice.apply(B, [e, A].concat(z))
                } else {
                    B.push.apply(B, z)
                }
            }
        } else {
            B.splice(e, A)
        }
        return B
    }

    function b(A, e, z) {
        return x(A, e, z)
    }

    function r(A, e, z) {
        A.splice(e, z);
        return A
    }

    function l(C, e, A) {
        var B = m(C, e), z = C.slice(e, m(C, B + A));
        if (arguments.length < 4) {
            x(C, B, A)
        } else {
            x(C, B, A, o.call(arguments, 3))
        }
        return z
    }

    function h(e) {
        return e.splice.apply(e, o.call(arguments, 1))
    }

    w = q ? r : b;
    t = q ? i : x;
    v = q ? h : l;
    a = Ext.Array = {each: function (D, B, A, e) {
        D = a.from(D);
        var z, C = D.length;
        if (e !== true) {
            for (z = 0; z < C; z++) {
                if (B.call(A || D[z], D[z], z, D) === false) {
                    return z
                }
            }
        } else {
            for (z = C - 1; z > -1; z--) {
                if (B.call(A || D[z], D[z], z, D) === false) {
                    return z
                }
            }
        }
        return true
    }, forEach: j ? function (A, z, e) {
        A.forEach(z, e)
    } : function (C, A, z) {
        var e = 0, B = C.length;
        for (; e < B; e++) {
            A.call(z, C[e], e, C)
        }
    }, indexOf: p ? function (A, e, z) {
        return g.indexOf.call(A, e, z)
    } : function (C, A, B) {
        var e, z = C.length;
        for (e = (B < 0) ? Math.max(0, z + B) : B || 0; e < z; e++) {
            if (C[e] === A) {
                return e
            }
        }
        return -1
    }, contains: p ? function (z, e) {
        return g.indexOf.call(z, e) !== -1
    } : function (B, A) {
        var e, z;
        for (e = 0, z = B.length; e < z; e++) {
            if (B[e] === A) {
                return true
            }
        }
        return false
    }, toArray: function (A, C, e) {
        if (!A || !A.length) {
            return[]
        }
        if (typeof A === "string") {
            A = A.split("")
        }
        if (k) {
            return o.call(A, C || 0, e || A.length)
        }
        var B = [], z;
        C = C || 0;
        e = e ? ((e < 0) ? A.length + e : e) : A.length;
        for (z = C; z < e; z++) {
            B.push(A[z])
        }
        return B
    }, pluck: function (D, e) {
        var z = [], A, C, B;
        for (A = 0, C = D.length; A < C; A++) {
            B = D[A];
            z.push(B[e])
        }
        return z
    }, map: u ? function (A, z, e) {
        return A.map(z, e)
    } : function (D, C, B) {
        var A = [], z = 0, e = D.length;
        for (; z < e; z++) {
            A[z] = C.call(B, D[z], z, D)
        }
        return A
    }, every: y ? function (A, z, e) {
        return A.every(z, e)
    } : function (C, A, z) {
        var e = 0, B = C.length;
        for (; e < B; ++e) {
            if (!A.call(z, C[e], e, C)) {
                return false
            }
        }
        return true
    }, some: c ? function (A, z, e) {
        return A.some(z, e)
    } : function (C, A, z) {
        var e = 0, B = C.length;
        for (; e < B; ++e) {
            if (A.call(z, C[e], e, C)) {
                return true
            }
        }
        return false
    }, equals: function (C, B) {
        var z = C.length, e = B.length, A;
        if (C === B) {
            return true
        }
        if (z !== e) {
            return false
        }
        for (A = 0; A < z; ++A) {
            if (C[A] !== B[A]) {
                return false
            }
        }
        return true
    }, clean: function (C) {
        var z = [], e = 0, B = C.length, A;
        for (; e < B; e++) {
            A = C[e];
            if (!Ext.isEmpty(A)) {
                z.push(A)
            }
        }
        return z
    }, unique: function (C) {
        var B = [], e = 0, A = C.length, z;
        for (; e < A; e++) {
            z = C[e];
            if (a.indexOf(B, z) === -1) {
                B.push(z)
            }
        }
        return B
    }, filter: d ? function (A, z, e) {
        return A.filter(z, e)
    } : function (D, B, A) {
        var z = [], e = 0, C = D.length;
        for (; e < C; e++) {
            if (B.call(A, D[e], e, D)) {
                z.push(D[e])
            }
        }
        return z
    }, findBy: function (C, B, A) {
        var z = 0, e = C.length;
        for (; z < e; z++) {
            if (B.call(A || C, C[z], z)) {
                return C[z]
            }
        }
        return null
    }, from: function (A, z) {
        if (A === undefined || A === null) {
            return[]
        }
        if (Ext.isArray(A)) {
            return(z) ? o.call(A) : A
        }
        var e = typeof A;
        if (A && A.length !== undefined && e !== "string" && (e !== "function" || !A.apply)) {
            return a.toArray(A)
        }
        return[A]
    }, remove: function (A, z) {
        var e = a.indexOf(A, z);
        if (e !== -1) {
            w(A, e, 1)
        }
        return A
    }, include: function (z, e) {
        if (!a.contains(z, e)) {
            z.push(e)
        }
    }, clone: function (e) {
        return o.call(e)
    }, merge: function () {
        var e = o.call(arguments), B = [], z, A;
        for (z = 0, A = e.length; z < A; z++) {
            B = B.concat(e[z])
        }
        return a.unique(B)
    }, intersect: function () {
        var e = [], A = o.call(arguments), L, J, F, I, M, B, z, H, K, C, G, E, D;
        if (!A.length) {
            return e
        }
        L = A.length;
        for (G = M = 0; G < L; G++) {
            B = A[G];
            if (!I || B.length < I.length) {
                I = B;
                M = G
            }
        }
        I = a.unique(I);
        w(A, M, 1);
        z = I.length;
        L = A.length;
        for (G = 0; G < z; G++) {
            H = I[G];
            C = 0;
            for (E = 0; E < L; E++) {
                J = A[E];
                F = J.length;
                for (D = 0; D < F; D++) {
                    K = J[D];
                    if (H === K) {
                        C++;
                        break
                    }
                }
            }
            if (C === L) {
                e.push(H)
            }
        }
        return e
    }, difference: function (z, e) {
        var E = o.call(z), C = E.length, B, A, D;
        for (B = 0, D = e.length; B < D; B++) {
            for (A = 0; A < C; A++) {
                if (E[A] === e[B]) {
                    w(E, A, 1);
                    A--;
                    C--
                }
            }
        }
        return E
    }, slice: ([1, 2].slice(1, undefined).length ? function (A, z, e) {
        return o.call(A, z, e)
    } : function (A, z, e) {
        if (typeof z === "undefined") {
            return o.call(A)
        }
        if (typeof e === "undefined") {
            return o.call(A, z)
        }
        return o.call(A, z, e)
    }), sort: n ? function (z, e) {
        if (e) {
            return z.sort(e)
        } else {
            return z.sort()
        }
    } : function (F, E) {
        var C = F.length, B = 0, D, e, A, z;
        for (; B < C; B++) {
            A = B;
            for (e = B + 1; e < C; e++) {
                if (E) {
                    D = E(F[e], F[A]);
                    if (D < 0) {
                        A = e
                    }
                } else {
                    if (F[e] < F[A]) {
                        A = e
                    }
                }
            }
            if (A !== B) {
                z = F[B];
                F[B] = F[A];
                F[A] = z
            }
        }
        return F
    }, flatten: function (A) {
        var z = [];

        function e(B) {
            var D, E, C;
            for (D = 0, E = B.length; D < E; D++) {
                C = B[D];
                if (Ext.isArray(C)) {
                    e(C)
                } else {
                    z.push(C)
                }
            }
            return z
        }

        return e(A)
    }, min: function (D, C) {
        var z = D[0], e, B, A;
        for (e = 0, B = D.length; e < B; e++) {
            A = D[e];
            if (C) {
                if (C(z, A) === 1) {
                    z = A
                }
            } else {
                if (A < z) {
                    z = A
                }
            }
        }
        return z
    }, max: function (D, C) {
        var e = D[0], z, B, A;
        for (z = 0, B = D.length; z < B; z++) {
            A = D[z];
            if (C) {
                if (C(e, A) === -1) {
                    e = A
                }
            } else {
                if (A > e) {
                    e = A
                }
            }
        }
        return e
    }, mean: function (e) {
        return e.length > 0 ? a.sum(e) / e.length : undefined
    }, sum: function (C) {
        var z = 0, e, B, A;
        for (e = 0, B = C.length; e < B; e++) {
            A = C[e];
            z += A
        }
        return z
    }, toMap: function (C, e, A) {
        var B = {}, z = C.length;
        if (!e) {
            while (z--) {
                B[C[z]] = z + 1
            }
        } else {
            if (typeof e == "string") {
                while (z--) {
                    B[C[z][e]] = z + 1
                }
            } else {
                while (z--) {
                    B[e.call(A, C[z])] = z + 1
                }
            }
        }
        return B
    }, toValueMap: function (C, e, A) {
        var B = {}, z = C.length;
        if (!e) {
            while (z--) {
                B[C[z]] = C[z]
            }
        } else {
            if (typeof e == "string") {
                while (z--) {
                    B[C[z][e]] = C[z]
                }
            } else {
                while (z--) {
                    B[e.call(A, C[z])] = C[z]
                }
            }
        }
        return B
    }, erase: w, insert: function (A, z, e) {
        return t(A, z, 0, e)
    }, replace: t, splice: v, push: function (B) {
        var e = arguments.length, A = 1, z;
        if (B === undefined) {
            B = []
        } else {
            if (!Ext.isArray(B)) {
                B = [B]
            }
        }
        for (; A < e; A++) {
            z = arguments[A];
            Array.prototype.push[Ext.isIterable(z) ? "apply" : "call"](B, z)
        }
        return B
    }};
    Ext.each = a.each;
    a.union = a.merge;
    Ext.min = a.min;
    Ext.max = a.max;
    Ext.sum = a.sum;
    Ext.mean = a.mean;
    Ext.flatten = a.flatten;
    Ext.clean = a.clean;
    Ext.unique = a.unique;
    Ext.pluck = a.pluck;
    Ext.toArray = function () {
        return a.toArray.apply(a, arguments)
    }
}());
Ext.Function = {flexSetter: function (a) {
    return function (d, c) {
        var e, g;
        if (d === null) {
            return this
        }
        if (typeof d !== "string") {
            for (e in d) {
                if (d.hasOwnProperty(e)) {
                    a.call(this, e, d[e])
                }
            }
            if (Ext.enumerables) {
                for (g = Ext.enumerables.length; g--;) {
                    e = Ext.enumerables[g];
                    if (d.hasOwnProperty(e)) {
                        a.call(this, e, d[e])
                    }
                }
            }
        } else {
            a.call(this, d, c)
        }
        return this
    }
}, bind: function (d, c, b, a) {
    if (arguments.length === 2) {
        return function () {
            return d.apply(c, arguments)
        }
    }
    var g = d, e = Array.prototype.slice;
    return function () {
        var h = b || arguments;
        if (a === true) {
            h = e.call(arguments, 0);
            h = h.concat(b)
        } else {
            if (typeof a == "number") {
                h = e.call(arguments, 0);
                Ext.Array.insert(h, a, b)
            }
        }
        return g.apply(c || Ext.global, h)
    }
}, pass: function (c, a, b) {
    if (!Ext.isArray(a)) {
        if (Ext.isIterable(a)) {
            a = Ext.Array.clone(a)
        } else {
            a = a !== undefined ? [a] : []
        }
    }
    return function () {
        var d = [].concat(a);
        d.push.apply(d, arguments);
        return c.apply(b || this, d)
    }
}, alias: function (b, a) {
    return function () {
        return b[a].apply(b, arguments)
    }
}, clone: function (a) {
    return function () {
        return a.apply(this, arguments)
    }
}, createInterceptor: function (d, c, b, a) {
    var e = d;
    if (!Ext.isFunction(c)) {
        return d
    } else {
        a = Ext.isDefined(a) ? a : null;
        return function () {
            var h = this, g = arguments;
            c.target = h;
            c.method = d;
            return(c.apply(b || h || Ext.global, g) !== false) ? d.apply(h || Ext.global, g) : a
        }
    }
}, createDelayed: function (e, c, d, b, a) {
    if (d || b) {
        e = Ext.Function.bind(e, d, b, a)
    }
    return function () {
        var h = this, g = Array.prototype.slice.call(arguments);
        setTimeout(function () {
            e.apply(h, g)
        }, c)
    }
}, defer: function (e, c, d, b, a) {
    e = Ext.Function.bind(e, d, b, a);
    if (c > 0) {
        return setTimeout(Ext.supports.TimeoutActualLateness ? function () {
            e()
        } : e, c)
    }
    e();
    return 0
}, createSequence: function (b, c, a) {
    if (!c) {
        return b
    } else {
        return function () {
            var d = b.apply(this, arguments);
            c.apply(a || this, arguments);
            return d
        }
    }
}, createBuffered: function (e, b, d, c) {
    var a;
    return function () {
        var h = c || Array.prototype.slice.call(arguments, 0), g = d || this;
        if (a) {
            clearTimeout(a)
        }
        a = setTimeout(function () {
            e.apply(g, h)
        }, b)
    }
}, createThrottled: function (e, b, d) {
    var g, a, c, i, h = function () {
        e.apply(d || this, c);
        g = new Date().getTime()
    };
    return function () {
        a = new Date().getTime() - g;
        c = arguments;
        clearTimeout(i);
        if (!g || (a >= b)) {
            h()
        } else {
            i = setTimeout(h, b - a)
        }
    }
}, interceptBefore: function (b, a, d, c) {
    var e = b[a] || Ext.emptyFn;
    return(b[a] = function () {
        var g = d.apply(c || this, arguments);
        e.apply(this, arguments);
        return g
    })
}, interceptAfter: function (b, a, d, c) {
    var e = b[a] || Ext.emptyFn;
    return(b[a] = function () {
        e.apply(this, arguments);
        return d.apply(c || this, arguments)
    })
}};
Ext.defer = Ext.Function.alias(Ext.Function, "defer");
Ext.pass = Ext.Function.alias(Ext.Function, "pass");
Ext.bind = Ext.Function.alias(Ext.Function, "bind");
(function () {
    var a = function () {
    }, b = Ext.Object = {chain: Object.create || function (d) {
        a.prototype = d;
        var c = new a();
        a.prototype = null;
        return c
    }, toQueryObjects: function (e, k, d) {
        var c = b.toQueryObjects, j = [], g, h;
        if (Ext.isArray(k)) {
            for (g = 0, h = k.length; g < h; g++) {
                if (d) {
                    j = j.concat(c(e + "[" + g + "]", k[g], true))
                } else {
                    j.push({name: e, value: k[g]})
                }
            }
        } else {
            if (Ext.isObject(k)) {
                for (g in k) {
                    if (k.hasOwnProperty(g)) {
                        if (d) {
                            j = j.concat(c(e + "[" + g + "]", k[g], true))
                        } else {
                            j.push({name: e, value: k[g]})
                        }
                    }
                }
            } else {
                j.push({name: e, value: k})
            }
        }
        return j
    }, toQueryString: function (g, d) {
        var h = [], e = [], l, k, m, c, n;
        for (l in g) {
            if (g.hasOwnProperty(l)) {
                h = h.concat(b.toQueryObjects(l, g[l], d))
            }
        }
        for (k = 0, m = h.length; k < m; k++) {
            c = h[k];
            n = c.value;
            if (Ext.isEmpty(n)) {
                n = ""
            } else {
                if (Ext.isDate(n)) {
                    n = Ext.Date.toString(n)
                }
            }
            e.push(encodeURIComponent(c.name) + "=" + encodeURIComponent(String(n)))
        }
        return e.join("&")
    }, fromQueryString: function (d, r) {
        var m = d.replace(/^\?/, "").split("&"), u = {}, s, k, w, n, q, g, o, p, c, h, t, l, v, e;
        for (q = 0, g = m.length; q < g; q++) {
            o = m[q];
            if (o.length > 0) {
                k = o.split("=");
                w = decodeURIComponent(k[0]);
                n = (k[1] !== undefined) ? decodeURIComponent(k[1]) : "";
                if (!r) {
                    if (u.hasOwnProperty(w)) {
                        if (!Ext.isArray(u[w])) {
                            u[w] = [u[w]]
                        }
                        u[w].push(n)
                    } else {
                        u[w] = n
                    }
                } else {
                    h = w.match(/(\[):?([^\]]*)\]/g);
                    t = w.match(/^([^\[]+)/);
                    w = t[0];
                    l = [];
                    if (h === null) {
                        u[w] = n;
                        continue
                    }
                    for (p = 0, c = h.length; p < c; p++) {
                        v = h[p];
                        v = (v.length === 2) ? "" : v.substring(1, v.length - 1);
                        l.push(v)
                    }
                    l.unshift(w);
                    s = u;
                    for (p = 0, c = l.length; p < c; p++) {
                        v = l[p];
                        if (p === c - 1) {
                            if (Ext.isArray(s) && v === "") {
                                s.push(n)
                            } else {
                                s[v] = n
                            }
                        } else {
                            if (s[v] === undefined || typeof s[v] === "string") {
                                e = l[p + 1];
                                s[v] = (Ext.isNumeric(e) || e === "") ? [] : {}
                            }
                            s = s[v]
                        }
                    }
                }
            }
        }
        return u
    }, each: function (c, e, d) {
        for (var g in c) {
            if (c.hasOwnProperty(g)) {
                if (e.call(d || c, g, c[g], c) === false) {
                    return
                }
            }
        }
    }, merge: function (k) {
        var h = 1, j = arguments.length, c = b.merge, e = Ext.clone, g, m, l, d;
        for (; h < j; h++) {
            g = arguments[h];
            for (m in g) {
                l = g[m];
                if (l && l.constructor === Object) {
                    d = k[m];
                    if (d && d.constructor === Object) {
                        c(d, l)
                    } else {
                        k[m] = e(l)
                    }
                } else {
                    k[m] = l
                }
            }
        }
        return k
    }, mergeIf: function (c) {
        var h = 1, j = arguments.length, e = Ext.clone, d, g, k;
        for (; h < j; h++) {
            d = arguments[h];
            for (g in d) {
                if (!(g in c)) {
                    k = d[g];
                    if (k && k.constructor === Object) {
                        c[g] = e(k)
                    } else {
                        c[g] = k
                    }
                }
            }
        }
        return c
    }, getKey: function (c, e) {
        for (var d in c) {
            if (c.hasOwnProperty(d) && c[d] === e) {
                return d
            }
        }
        return null
    }, getValues: function (d) {
        var c = [], e;
        for (e in d) {
            if (d.hasOwnProperty(e)) {
                c.push(d[e])
            }
        }
        return c
    }, getKeys: (typeof Object.keys == "function") ? function (c) {
        if (!c) {
            return[]
        }
        return Object.keys(c)
    } : function (c) {
        var d = [], e;
        for (e in c) {
            if (c.hasOwnProperty(e)) {
                d.push(e)
            }
        }
        return d
    }, getSize: function (c) {
        var d = 0, e;
        for (e in c) {
            if (c.hasOwnProperty(e)) {
                d++
            }
        }
        return d
    }, isEmpty: function (c) {
        for (var d in c) {
            if (c.hasOwnProperty(d)) {
                return false
            }
        }
        return true
    }, equals: (function () {
        var c = function (g, e) {
            var d;
            for (d in g) {
                if (g.hasOwnProperty(d)) {
                    if (g[d] !== e[d]) {
                        return false
                    }
                }
            }
            return true
        };
        return function (e, d) {
            if (e === d) {
                return true
            }
            if (e && d) {
                return c(e, d) && c(d, e)
            } else {
                if (!e && !d) {
                    return e === d
                } else {
                    return false
                }
            }
        }
    })(), classify: function (g) {
        var e = g, i = [], d = {}, c = function () {
            var k = 0, l = i.length, m;
            for (; k < l; k++) {
                m = i[k];
                this[m] = new d[m]()
            }
        }, h, j;
        for (h in g) {
            if (g.hasOwnProperty(h)) {
                j = g[h];
                if (j && j.constructor === Object) {
                    i.push(h);
                    d[h] = b.classify(j)
                }
            }
        }
        c.prototype = e;
        return c
    }};
    Ext.merge = Ext.Object.merge;
    Ext.mergeIf = Ext.Object.mergeIf;
    Ext.urlEncode = function () {
        var c = Ext.Array.from(arguments), d = "";
        if ((typeof c[1] === "string")) {
            d = c[1] + "&";
            c[1] = false
        }
        return d + b.toQueryString.apply(b, c)
    };
    Ext.urlDecode = function () {
        return b.fromQueryString.apply(b, arguments)
    }
}());
Ext.Date = new function () {
    var d = this, j = /(\\.)/g, a = /([gGhHisucUOPZ]|MS)/, e = /([djzmnYycU]|MS)/, i = /\\/gi, c = /\{(\d+)\}/g, g = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/"), b = ["var me = this, dt, y, m, d, h, i, s, ms, o, O, z, zz, u, v, W, year, jan4, week1monday,", "def = me.defaults,", "from = Ext.Number.from,", "results = String(input).match(me.parseRegexes[{0}]);", "if(results){", "{1}", "if(u != null){", "v = new Date(u * 1000);", "}else{", "dt = me.clearTime(new Date);", "y = from(y, from(def.y, dt.getFullYear()));", "m = from(m, from(def.m - 1, dt.getMonth()));", "d = from(d, from(def.d, dt.getDate()));", "h  = from(h, from(def.h, dt.getHours()));", "i  = from(i, from(def.i, dt.getMinutes()));", "s  = from(s, from(def.s, dt.getSeconds()));", "ms = from(ms, from(def.ms, dt.getMilliseconds()));", "if(z >= 0 && y >= 0){", "v = me.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);", "v = !strict? v : (strict === true && (z <= 364 || (me.isLeapYear(v) && z <= 365))? me.add(v, me.DAY, z) : null);", "}else if(strict === true && !me.isValid(y, m + 1, d, h, i, s, ms)){", "v = null;", "}else{", "if (W) {", "year = y || (new Date()).getFullYear(),", "jan4 = new Date(year, 0, 4, 0, 0, 0),", "week1monday = new Date(jan4.getTime() - ((jan4.getDay() - 1) * 86400000));", "v = Ext.Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000)));", "} else {", "v = me.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);", "}", "}", "}", "}", "if(v){", "if(zz != null){", "v = me.add(v, me.SECOND, -v.getTimezoneOffset() * 60 - zz);", "}else if(o){", "v = me.add(v, me.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));", "}", "}", "return v;"].join("\n");

    function h(l) {
        var k = Array.prototype.slice.call(arguments, 1);
        return l.replace(c, function (n, o) {
            return k[o]
        })
    }

    Ext.apply(d, {now: Date.now || function () {
        return +new Date()
    }, toString: function (k) {
        var l = Ext.String.leftPad;
        return k.getFullYear() + "-" + l(k.getMonth() + 1, 2, "0") + "-" + l(k.getDate(), 2, "0") + "T" + l(k.getHours(), 2, "0") + ":" + l(k.getMinutes(), 2, "0") + ":" + l(k.getSeconds(), 2, "0")
    }, getElapsed: function (l, k) {
        return Math.abs(l - (k || new Date()))
    }, useStrict: false, formatCodeToRegex: function (l, k) {
        var m = d.parseCodes[l];
        if (m) {
            m = typeof m == "function" ? m() : m;
            d.parseCodes[l] = m
        }
        return m ? Ext.applyIf({c: m.c ? h(m.c, k || "{0}") : m.c}, m) : {g: 0, c: null, s: Ext.String.escapeRegex(l)}
    }, parseFunctions: {MS: function (l, k) {
        var m = (l || "").match(g);
        return m ? new Date(((m[1] || "") + m[2]) * 1) : null
    }, time: function (l, k) {
        var m = parseInt(l, 10);
        if (m || m === 0) {
            return new Date(m)
        }
        return null
    }, timestamp: function (l, k) {
        var m = parseInt(l, 10);
        if (m || m === 0) {
            return new Date(m * 1000)
        }
        return null
    }}, parseRegexes: [], formatFunctions: {MS: function () {
        return"\\/Date(" + this.getTime() + ")\\/"
    }, time: function () {
        return this.getTime().toString()
    }, timestamp: function () {
        return d.format(this, "U")
    }}, y2kYear: 50, MILLI: "ms", SECOND: "s", MINUTE: "mi", HOUR: "h", DAY: "d", MONTH: "mo", YEAR: "y", defaults: {}, dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNumbers: {January: 0, Jan: 0, February: 1, Feb: 1, March: 2, Mar: 2, April: 3, Apr: 3, May: 4, June: 5, Jun: 5, July: 6, Jul: 6, August: 7, Aug: 7, September: 8, Sep: 8, October: 9, Oct: 9, November: 10, Nov: 10, December: 11, Dec: 11}, defaultFormat: "m/d/Y", getShortMonthName: function (k) {
        return Ext.Date.monthNames[k].substring(0, 3)
    }, getShortDayName: function (k) {
        return Ext.Date.dayNames[k].substring(0, 3)
    }, getMonthNumber: function (k) {
        return Ext.Date.monthNumbers[k.substring(0, 1).toUpperCase() + k.substring(1, 3).toLowerCase()]
    }, formatContainsHourInfo: function (k) {
        return a.test(k.replace(j, ""))
    }, formatContainsDateInfo: function (k) {
        return e.test(k.replace(j, ""))
    }, unescapeFormat: function (k) {
        return k.replace(i, "")
    }, formatCodes: {d: "Ext.String.leftPad(this.getDate(), 2, '0')", D: "Ext.Date.getShortDayName(this.getDay())", j: "this.getDate()", l: "Ext.Date.dayNames[this.getDay()]", N: "(this.getDay() ? this.getDay() : 7)", S: "Ext.Date.getSuffix(this)", w: "this.getDay()", z: "Ext.Date.getDayOfYear(this)", W: "Ext.String.leftPad(Ext.Date.getWeekOfYear(this), 2, '0')", F: "Ext.Date.monthNames[this.getMonth()]", m: "Ext.String.leftPad(this.getMonth() + 1, 2, '0')", M: "Ext.Date.getShortMonthName(this.getMonth())", n: "(this.getMonth() + 1)", t: "Ext.Date.getDaysInMonth(this)", L: "(Ext.Date.isLeapYear(this) ? 1 : 0)", o: "(this.getFullYear() + (Ext.Date.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))", Y: "Ext.String.leftPad(this.getFullYear(), 4, '0')", y: "('' + this.getFullYear()).substring(2, 4)", a: "(this.getHours() < 12 ? 'am' : 'pm')", A: "(this.getHours() < 12 ? 'AM' : 'PM')", g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)", G: "this.getHours()", h: "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')", H: "Ext.String.leftPad(this.getHours(), 2, '0')", i: "Ext.String.leftPad(this.getMinutes(), 2, '0')", s: "Ext.String.leftPad(this.getSeconds(), 2, '0')", u: "Ext.String.leftPad(this.getMilliseconds(), 3, '0')", O: "Ext.Date.getGMTOffset(this)", P: "Ext.Date.getGMTOffset(this, true)", T: "Ext.Date.getTimezone(this)", Z: "(this.getTimezoneOffset() * -60)", c: function () {
        var p, n, m, k, o;
        for (p = "Y-m-dTH:i:sP", n = [], m = 0, k = p.length; m < k; ++m) {
            o = p.charAt(m);
            n.push(o == "T" ? "'T'" : d.getFormatCode(o))
        }
        return n.join(" + ")
    }, U: "Math.round(this.getTime() / 1000)"}, isValid: function (t, k, r, p, n, o, l) {
        p = p || 0;
        n = n || 0;
        o = o || 0;
        l = l || 0;
        var q = d.add(new Date(t < 100 ? 100 : t, k - 1, r, p, n, o, l), d.YEAR, t < 100 ? t - 100 : 0);
        return t == q.getFullYear() && k == q.getMonth() + 1 && r == q.getDate() && p == q.getHours() && n == q.getMinutes() && o == q.getSeconds() && l == q.getMilliseconds()
    }, parse: function (l, n, k) {
        var m = d.parseFunctions;
        if (m[n] == null) {
            d.createParser(n)
        }
        return m[n].call(d, l, Ext.isDefined(k) ? k : d.useStrict)
    }, parseDate: function (l, m, k) {
        return d.parse(l, m, k)
    }, getFormatCode: function (l) {
        var k = d.formatCodes[l];
        if (k) {
            k = typeof k == "function" ? k() : k;
            d.formatCodes[l] = k
        }
        return k || ("'" + Ext.String.escape(l) + "'")
    }, createFormat: function (o) {
        var n = [], k = false, m = "", l;
        for (l = 0; l < o.length; ++l) {
            m = o.charAt(l);
            if (!k && m == "\\") {
                k = true
            } else {
                if (k) {
                    k = false;
                    n.push("'" + Ext.String.escape(m) + "'")
                } else {
                    n.push(d.getFormatCode(m))
                }
            }
        }
        d.formatFunctions[o] = Ext.functionFactory("return " + n.join("+"))
    }, createParser: function (t) {
        var l = d.parseRegexes.length, u = 1, m = [], s = [], q = false, k = "", o = 0, p = t.length, r = [], n;
        for (; o < p; ++o) {
            k = t.charAt(o);
            if (!q && k == "\\") {
                q = true
            } else {
                if (q) {
                    q = false;
                    s.push(Ext.String.escape(k))
                } else {
                    n = d.formatCodeToRegex(k, u);
                    u += n.g;
                    s.push(n.s);
                    if (n.g && n.c) {
                        if (n.calcAtEnd) {
                            r.push(n.c)
                        } else {
                            m.push(n.c)
                        }
                    }
                }
            }
        }
        m = m.concat(r);
        d.parseRegexes[l] = new RegExp("^" + s.join("") + "$", "i");
        d.parseFunctions[t] = Ext.functionFactory("input", "strict", h(b, l, m.join("")))
    }, parseCodes: {d: {g: 1, c: "d = parseInt(results[{0}], 10);\n", s: "(3[0-1]|[1-2][0-9]|0[1-9])"}, j: {g: 1, c: "d = parseInt(results[{0}], 10);\n", s: "(3[0-1]|[1-2][0-9]|[1-9])"}, D: function () {
        for (var k = [], l = 0; l < 7; k.push(d.getShortDayName(l)), ++l) {
        }
        return{g: 0, c: null, s: "(?:" + k.join("|") + ")"}
    }, l: function () {
        return{g: 0, c: null, s: "(?:" + d.dayNames.join("|") + ")"}
    }, N: {g: 0, c: null, s: "[1-7]"}, S: {g: 0, c: null, s: "(?:st|nd|rd|th)"}, w: {g: 0, c: null, s: "[0-6]"}, z: {g: 1, c: "z = parseInt(results[{0}], 10);\n", s: "(\\d{1,3})"}, W: {g: 1, c: "W = parseInt(results[{0}], 10);\n", s: "(\\d{2})"}, F: function () {
        return{g: 1, c: "m = parseInt(me.getMonthNumber(results[{0}]), 10);\n", s: "(" + d.monthNames.join("|") + ")"}
    }, M: function () {
        for (var k = [], l = 0; l < 12; k.push(d.getShortMonthName(l)), ++l) {
        }
        return Ext.applyIf({s: "(" + k.join("|") + ")"}, d.formatCodeToRegex("F"))
    }, m: {g: 1, c: "m = parseInt(results[{0}], 10) - 1;\n", s: "(1[0-2]|0[1-9])"}, n: {g: 1, c: "m = parseInt(results[{0}], 10) - 1;\n", s: "(1[0-2]|[1-9])"}, t: {g: 0, c: null, s: "(?:\\d{2})"}, L: {g: 0, c: null, s: "(?:1|0)"}, o: {g: 1, c: "y = parseInt(results[{0}], 10);\n", s: "(\\d{4})"}, Y: {g: 1, c: "y = parseInt(results[{0}], 10);\n", s: "(\\d{4})"}, y: {g: 1, c: "var ty = parseInt(results[{0}], 10);\ny = ty > me.y2kYear ? 1900 + ty : 2000 + ty;\n", s: "(\\d{1,2})"}, a: {g: 1, c: "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}", s: "(am|pm|AM|PM)", calcAtEnd: true}, A: {g: 1, c: "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}", s: "(AM|PM|am|pm)", calcAtEnd: true}, g: {g: 1, c: "h = parseInt(results[{0}], 10);\n", s: "(1[0-2]|[0-9])"}, G: {g: 1, c: "h = parseInt(results[{0}], 10);\n", s: "(2[0-3]|1[0-9]|[0-9])"}, h: {g: 1, c: "h = parseInt(results[{0}], 10);\n", s: "(1[0-2]|0[1-9])"}, H: {g: 1, c: "h = parseInt(results[{0}], 10);\n", s: "(2[0-3]|[0-1][0-9])"}, i: {g: 1, c: "i = parseInt(results[{0}], 10);\n", s: "([0-5][0-9])"}, s: {g: 1, c: "s = parseInt(results[{0}], 10);\n", s: "([0-5][0-9])"}, u: {g: 1, c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n", s: "(\\d+)"}, O: {g: 1, c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", "mn = o.substring(3,5) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"].join("\n"), s: "([+-]\\d{4})"}, P: {g: 1, c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", "mn = o.substring(4,6) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"].join("\n"), s: "([+-]\\d{2}:\\d{2})"}, T: {g: 0, c: null, s: "[A-Z]{1,5}"}, Z: {g: 1, c: "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n", s: "([+-]?\\d{1,5})"}, c: function () {
        var n = [], k = [d.formatCodeToRegex("Y", 1), d.formatCodeToRegex("m", 2), d.formatCodeToRegex("d", 3), d.formatCodeToRegex("H", 4), d.formatCodeToRegex("i", 5), d.formatCodeToRegex("s", 6), {c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"}, {c: ["if(results[8]) {", "if(results[8] == 'Z'){", "zz = 0;", "}else if (results[8].indexOf(':') > -1){", d.formatCodeToRegex("P", 8).c, "}else{", d.formatCodeToRegex("O", 8).c, "}", "}"].join("\n")}], o, m;
        for (o = 0, m = k.length; o < m; ++o) {
            n.push(k[o].c)
        }
        return{g: 1, c: n.join(""), s: [k[0].s, "(?:", "-", k[1].s, "(?:", "-", k[2].s, "(?:", "(?:T| )?", k[3].s, ":", k[4].s, "(?::", k[5].s, ")?", "(?:(?:\\.|,)(\\d+))?", "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"].join("")}
    }, U: {g: 1, c: "u = parseInt(results[{0}], 10);\n", s: "(-?\\d+)"}}, dateFormat: function (k, l) {
        return d.format(k, l)
    }, isEqual: function (l, k) {
        if (l && k) {
            return(l.getTime() === k.getTime())
        }
        return !(l || k)
    }, format: function (l, m) {
        var k = d.formatFunctions;
        if (!Ext.isDate(l)) {
            return""
        }
        if (k[m] == null) {
            d.createFormat(m)
        }
        return k[m].call(l) + ""
    }, getTimezone: function (k) {
        return k.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,5})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "")
    }, getGMTOffset: function (k, l) {
        var m = k.getTimezoneOffset();
        return(m > 0 ? "-" : "+") + Ext.String.leftPad(Math.floor(Math.abs(m) / 60), 2, "0") + (l ? ":" : "") + Ext.String.leftPad(Math.abs(m % 60), 2, "0")
    }, getDayOfYear: function (n) {
        var l = 0, p = Ext.Date.clone(n), k = n.getMonth(), o;
        for (o = 0, p.setDate(1), p.setMonth(0); o < k; p.setMonth(++o)) {
            l += d.getDaysInMonth(p)
        }
        return l + n.getDate() - 1
    }, getWeekOfYear: (function () {
        var k = 86400000, l = 7 * k;
        return function (n) {
            var o = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() + 3) / k, m = Math.floor(o / 7), p = new Date(m * l).getUTCFullYear();
            return m - Math.floor(Date.UTC(p, 0, 7) / l) + 1
        }
    }()), isLeapYear: function (k) {
        var l = k.getFullYear();
        return !!((l & 3) == 0 && (l % 100 || (l % 400 == 0 && l)))
    }, getFirstDayOfMonth: function (l) {
        var k = (l.getDay() - (l.getDate() - 1)) % 7;
        return(k < 0) ? (k + 7) : k
    }, getLastDayOfMonth: function (k) {
        return d.getLastDateOfMonth(k).getDay()
    }, getFirstDateOfMonth: function (k) {
        return new Date(k.getFullYear(), k.getMonth(), 1)
    }, getLastDateOfMonth: function (k) {
        return new Date(k.getFullYear(), k.getMonth(), d.getDaysInMonth(k))
    }, getDaysInMonth: (function () {
        var k = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return function (n) {
            var l = n.getMonth();
            return l == 1 && d.isLeapYear(n) ? 29 : k[l]
        }
    }()), getSuffix: function (k) {
        switch (k.getDate()) {
            case 1:
            case 21:
            case 31:
                return"st";
            case 2:
            case 22:
                return"nd";
            case 3:
            case 23:
                return"rd";
            default:
                return"th"
        }
    }, clone: function (k) {
        return new Date(k.getTime())
    }, isDST: function (k) {
        return new Date(k.getFullYear(), 0, 1).getTimezoneOffset() != k.getTimezoneOffset()
    }, clearTime: function (k, o) {
        if (o) {
            return Ext.Date.clearTime(Ext.Date.clone(k))
        }
        var m = k.getDate(), l, n;
        k.setHours(0);
        k.setMinutes(0);
        k.setSeconds(0);
        k.setMilliseconds(0);
        if (k.getDate() != m) {
            for (l = 1, n = d.add(k, Ext.Date.HOUR, l); n.getDate() != m; l++, n = d.add(k, Ext.Date.HOUR, l)) {
            }
            k.setDate(m);
            k.setHours(n.getHours())
        }
        return k
    }, add: function (n, m, q) {
        var r = Ext.Date.clone(n), k = Ext.Date, l, p, o = 0;
        if (!m || q === 0) {
            return r
        }
        p = q - parseInt(q, 10);
        q = parseInt(q, 10);
        if (q) {
            switch (m.toLowerCase()) {
                case Ext.Date.MILLI:
                    r.setTime(r.getTime() + q);
                    break;
                case Ext.Date.SECOND:
                    r.setTime(r.getTime() + q * 1000);
                    break;
                case Ext.Date.MINUTE:
                    r.setTime(r.getTime() + q * 60 * 1000);
                    break;
                case Ext.Date.HOUR:
                    r.setTime(r.getTime() + q * 60 * 60 * 1000);
                    break;
                case Ext.Date.DAY:
                    r.setDate(r.getDate() + q);
                    break;
                case Ext.Date.MONTH:
                    l = n.getDate();
                    if (l > 28) {
                        l = Math.min(l, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(n), Ext.Date.MONTH, q)).getDate())
                    }
                    r.setDate(l);
                    r.setMonth(n.getMonth() + q);
                    break;
                case Ext.Date.YEAR:
                    l = n.getDate();
                    if (l > 28) {
                        l = Math.min(l, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(n), Ext.Date.YEAR, q)).getDate())
                    }
                    r.setDate(l);
                    r.setFullYear(n.getFullYear() + q);
                    break
            }
        }
        if (p) {
            switch (m.toLowerCase()) {
                case Ext.Date.MILLI:
                    o = 1;
                    break;
                case Ext.Date.SECOND:
                    o = 1000;
                    break;
                case Ext.Date.MINUTE:
                    o = 1000 * 60;
                    break;
                case Ext.Date.HOUR:
                    o = 1000 * 60 * 60;
                    break;
                case Ext.Date.DAY:
                    o = 1000 * 60 * 60 * 24;
                    break;
                case Ext.Date.MONTH:
                    l = d.getDaysInMonth(r);
                    o = 1000 * 60 * 60 * 24 * l;
                    break;
                case Ext.Date.YEAR:
                    l = (d.isLeapYear(r) ? 366 : 365);
                    o = 1000 * 60 * 60 * 24 * l;
                    break
            }
            if (o) {
                r.setTime(r.getTime() + o * p)
            }
        }
        return r
    }, subtract: function (l, k, m) {
        return d.add(l, k, -m)
    }, between: function (l, n, k) {
        var m = l.getTime();
        return n.getTime() <= m && m <= k.getTime()
    }, compat: function () {
        var l = window.Date, k, r = ["useStrict", "formatCodeToRegex", "parseFunctions", "parseRegexes", "formatFunctions", "y2kYear", "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "MONTH", "YEAR", "defaults", "dayNames", "monthNames", "monthNumbers", "getShortMonthName", "getShortDayName", "getMonthNumber", "formatCodes", "isValid", "parseDate", "getFormatCode", "createFormat", "createParser", "parseCodes"], o = ["dateFormat", "format", "getTimezone", "getGMTOffset", "getDayOfYear", "getWeekOfYear", "isLeapYear", "getFirstDayOfMonth", "getLastDayOfMonth", "getDaysInMonth", "getSuffix", "clone", "isDST", "clearTime", "add", "between"], q = r.length, m = o.length, n, t, u;
        for (u = 0; u < q; u++) {
            n = r[u];
            l[n] = d[n]
        }
        for (k = 0; k < m; k++) {
            t = o[k];
            l.prototype[t] = function () {
                var p = Array.prototype.slice.call(arguments);
                p.unshift(this);
                return d[t].apply(d, p)
            }
        }
    }})
};
(function (a) {
    var d = [], b = function () {
    }, c = function (j, g, i, h) {
        var e = function () {
            var k = this.callParent(arguments);
            j.apply(this, arguments);
            return k
        };
        e.$name = i;
        e.$owner = h;
        if (g) {
            e.$previous = g.$previous;
            g.$previous = e
        }
        return e
    };
    Ext.apply(b, {$className: "Ext.Base", $isClass: true, create: function () {
        return Ext.create.apply(Ext, [this].concat(Array.prototype.slice.call(arguments, 0)))
    }, extend: function (k) {
        var e = k.prototype, n, h, j, l, g, m;
        h = this.prototype = Ext.Object.chain(e);
        h.self = this;
        this.superclass = h.superclass = e;
        if (!k.$isClass) {
            n = Ext.Base.prototype;
            for (j in n) {
                if (j in h) {
                    h[j] = n[j]
                }
            }
        }
        m = e.$inheritableStatics;
        if (m) {
            for (j = 0, l = m.length; j < l; j++) {
                g = m[j];
                if (!this.hasOwnProperty(g)) {
                    this[g] = k[g]
                }
            }
        }
        if (k.$onExtended) {
            this.$onExtended = k.$onExtended.slice()
        }
        h.config = new h.configClass();
        h.initConfigList = h.initConfigList.slice();
        h.initConfigMap = Ext.clone(h.initConfigMap);
        h.configMap = Ext.Object.chain(h.configMap)
    }, $onExtended: [], triggerExtended: function () {
        var h = this.$onExtended, g = h.length, e, j;
        if (g > 0) {
            for (e = 0; e < g; e++) {
                j = h[e];
                j.fn.apply(j.scope || this, arguments)
            }
        }
    }, onExtended: function (g, e) {
        this.$onExtended.push({fn: g, scope: e});
        return this
    }, addConfig: function (i, m) {
        var o = this.prototype, n = Ext.Class.configNameCache, j = o.configMap, k = o.initConfigList, h = o.initConfigMap, l = o.config, e, g, p;
        for (g in i) {
            if (i.hasOwnProperty(g)) {
                if (!j[g]) {
                    j[g] = true
                }
                p = i[g];
                e = n[g].initialized;
                if (!h[g] && p !== null && !o[e]) {
                    h[g] = true;
                    k.push(g)
                }
            }
        }
        if (m) {
            Ext.merge(l, i)
        } else {
            Ext.mergeIf(l, i)
        }
        o.configClass = Ext.Object.classify(l)
    }, addStatics: function (e) {
        var h, g;
        for (g in e) {
            if (e.hasOwnProperty(g)) {
                h = e[g];
                if (typeof h == "function" && !h.$isClass && h !== Ext.emptyFn && h !== Ext.identityFn) {
                    h.$owner = this;
                    h.$name = g
                }
                this[g] = h
            }
        }
        return this
    }, addInheritableStatics: function (g) {
        var j, e, i = this.prototype, h, k;
        j = i.$inheritableStatics;
        e = i.$hasInheritableStatics;
        if (!j) {
            j = i.$inheritableStatics = [];
            e = i.$hasInheritableStatics = {}
        }
        for (h in g) {
            if (g.hasOwnProperty(h)) {
                k = g[h];
                this[h] = k;
                if (!e[h]) {
                    e[h] = true;
                    j.push(h)
                }
            }
        }
        return this
    }, addMembers: function (g) {
        var j = this.prototype, e = Ext.enumerables, m = [], k, l, h, n;
        for (h in g) {
            m.push(h)
        }
        if (e) {
            m.push.apply(m, e)
        }
        for (k = 0, l = m.length; k < l; k++) {
            h = m[k];
            if (g.hasOwnProperty(h)) {
                n = g[h];
                if (typeof n == "function" && !n.$isClass && n !== Ext.emptyFn && n !== Ext.identityFn) {
                    n.$owner = this;
                    n.$name = h
                }
                j[h] = n
            }
        }
        return this
    }, addMember: function (e, g) {
        if (typeof g == "function" && !g.$isClass && g !== Ext.emptyFn && g !== Ext.identityFn) {
            g.$owner = this;
            g.$name = e
        }
        this.prototype[e] = g;
        return this
    }, implement: function () {
        this.addMembers.apply(this, arguments)
    }, borrow: function (k, h) {
        var o = this.prototype, n = k.prototype, j, l, g, m, e;
        h = Ext.Array.from(h);
        for (j = 0, l = h.length; j < l; j++) {
            g = h[j];
            e = n[g];
            if (typeof e == "function") {
                m = Ext.Function.clone(e);
                m.$owner = this;
                m.$name = g;
                o[g] = m
            } else {
                o[g] = e
            }
        }
        return this
    }, override: function (g) {
        var n = this, p = Ext.enumerables, l = n.prototype, i = Ext.Function.clone, e, k, h, o, m, j;
        if (arguments.length === 2) {
            e = g;
            g = {};
            g[e] = arguments[1];
            p = null
        }
        do {
            m = [];
            o = null;
            for (e in g) {
                if (e == "statics") {
                    o = g[e]
                } else {
                    if (e == "inheritableStatics") {
                        n.addInheritableStatics(g[e])
                    } else {
                        if (e == "config") {
                            n.addConfig(g[e], true)
                        } else {
                            m.push(e)
                        }
                    }
                }
            }
            if (p) {
                m.push.apply(m, p)
            }
            for (k = m.length; k--;) {
                e = m[k];
                if (g.hasOwnProperty(e)) {
                    h = g[e];
                    if (typeof h == "function" && !h.$className && h !== Ext.emptyFn && h !== Ext.identityFn) {
                        if (typeof h.$owner != "undefined") {
                            h = i(h)
                        }
                        h.$owner = n;
                        h.$name = e;
                        j = l[e];
                        if (j) {
                            h.$previous = j
                        }
                    }
                    l[e] = h
                }
            }
            l = n;
            g = o
        } while (g);
        return this
    }, callParent: function (e) {
        var g;
        return(g = this.callParent.caller) && (g.$previous || ((g = g.$owner ? g : g.caller) && g.$owner.superclass.self[g.$name])).apply(this, e || d)
    }, callSuper: function (e) {
        var g;
        return(g = this.callSuper.caller) && ((g = g.$owner ? g : g.caller) && g.$owner.superclass.self[g.$name]).apply(this, e || d)
    }, mixin: function (g, h) {
        var l = this, s = h.prototype, n = l.prototype, r, m, j, k, q, p, o, e;
        if (typeof s.onClassMixedIn != "undefined") {
            s.onClassMixedIn.call(h, l)
        }
        if (!n.hasOwnProperty("mixins")) {
            if ("mixins" in n) {
                n.mixins = Ext.Object.chain(n.mixins)
            } else {
                n.mixins = {}
            }
        }
        for (r in s) {
            p = s[r];
            if (r === "mixins") {
                Ext.merge(n.mixins, p)
            } else {
                if (r === "xhooks") {
                    for (o in p) {
                        e = p[o];
                        e.$previous = Ext.emptyFn;
                        if (n.hasOwnProperty(o)) {
                            c(e, n[o], o, l)
                        } else {
                            n[o] = c(e, null, o, l)
                        }
                    }
                } else {
                    if (!(r === "mixinId" || r === "config") && (n[r] === undefined)) {
                        n[r] = p
                    }
                }
            }
        }
        m = s.$inheritableStatics;
        if (m) {
            for (j = 0, k = m.length; j < k; j++) {
                q = m[j];
                if (!l.hasOwnProperty(q)) {
                    l[q] = h[q]
                }
            }
        }
        if ("config" in s) {
            l.addConfig(s.config, false)
        }
        n.mixins[g] = s;
        return l
    }, getName: function () {
        return Ext.getClassName(this)
    }, createAlias: a(function (g, e) {
        this.override(g, function () {
            return this[e].apply(this, arguments)
        })
    }), addXtype: function (j) {
        var g = this.prototype, i = g.xtypesMap, h = g.xtypes, e = g.xtypesChain;
        if (!g.hasOwnProperty("xtypesMap")) {
            i = g.xtypesMap = Ext.merge({}, g.xtypesMap || {});
            h = g.xtypes = g.xtypes ? [].concat(g.xtypes) : [];
            e = g.xtypesChain = g.xtypesChain ? [].concat(g.xtypesChain) : [];
            g.xtype = j
        }
        if (!i[j]) {
            i[j] = true;
            h.push(j);
            e.push(j);
            Ext.ClassManager.setAlias(this, "widget." + j)
        }
        return this
    }});
    b.implement({isInstance: true, $className: "Ext.Base", configClass: Ext.emptyFn, initConfigList: [], configMap: {}, initConfigMap: {}, statics: function () {
        var g = this.statics.caller, e = this.self;
        if (!g) {
            return e
        }
        return g.$owner
    }, callParent: function (g) {
        var h, e = (h = this.callParent.caller) && (h.$previous || ((h = h.$owner ? h : h.caller) && h.$owner.superclass[h.$name]));
        return e.apply(this, g || d)
    }, callSuper: function (g) {
        var h, e = (h = this.callSuper.caller) && ((h = h.$owner ? h : h.caller) && h.$owner.superclass[h.$name]);
        return e.apply(this, g || d)
    }, self: b, constructor: function () {
        return this
    }, initConfig: function (h) {
        var n = h, m = Ext.Class.configNameCache, k = new this.configClass(), q = this.initConfigList, j = this.configMap, p, l, o, g, e;
        this.initConfig = Ext.emptyFn;
        this.initialConfig = n || {};
        this.config = h = (n) ? Ext.merge(k, h) : k;
        if (n) {
            q = q.slice();
            for (g in n) {
                if (j[g]) {
                    if (n[g] !== null) {
                        q.push(g);
                        this[m[g].initialized] = false
                    }
                }
            }
        }
        for (l = 0, o = q.length; l < o; l++) {
            g = q[l];
            p = m[g];
            e = p.initialized;
            if (!this[e]) {
                this[e] = true;
                this[p.set].call(this, h[g])
            }
        }
        return this
    }, hasConfig: function (e) {
        return Boolean(this.configMap[e])
    }, setConfig: function (i, m) {
        if (!i) {
            return this
        }
        var h = Ext.Class.configNameCache, e = this.config, l = this.configMap, k = this.initialConfig, g, j;
        m = Boolean(m);
        for (g in i) {
            if (m && k.hasOwnProperty(g)) {
                continue
            }
            j = i[g];
            e[g] = j;
            if (l[g]) {
                this[h[g].set](j)
            }
        }
        return this
    }, getConfig: function (g) {
        var e = Ext.Class.configNameCache;
        return this[e[g].get]()
    }, getInitialConfig: function (g) {
        var e = this.config;
        if (!g) {
            return e
        } else {
            return e[g]
        }
    }, onConfigUpdate: function (l, n, o) {
        var p = this.self, h, k, e, j, m, g;
        l = Ext.Array.from(l);
        o = o || this;
        for (h = 0, k = l.length; h < k; h++) {
            e = l[h];
            j = "update" + Ext.String.capitalize(e);
            m = this[j] || Ext.emptyFn;
            g = function () {
                m.apply(this, arguments);
                o[n].apply(o, arguments)
            };
            g.$name = j;
            g.$owner = p;
            this[j] = g
        }
    }, destroy: function () {
        this.destroy = Ext.emptyFn
    }});
    b.prototype.callOverridden = b.prototype.callParent;
    Ext.Base = b
}(Ext.Function.flexSetter));
(function () {
    var c, b = Ext.Base, g = [], e, d;
    for (e in b) {
        if (b.hasOwnProperty(e)) {
            g.push(e)
        }
    }
    d = g.length;
    function a(i) {
        function h() {
            return this.constructor.apply(this, arguments) || null
        }

        return h
    }

    Ext.Class = c = function (i, j, h) {
        if (typeof i != "function") {
            h = j;
            j = i;
            i = null
        }
        if (!j) {
            j = {}
        }
        i = c.create(i, j);
        c.process(i, j, h);
        return i
    };
    Ext.apply(c, {onBeforeCreated: function (i, j, h) {
        i.addMembers(j);
        h.onCreated.call(i, i)
    }, create: function (h, l) {
        var j, k;
        if (!h) {
            h = a()
        }
        for (k = 0; k < d; k++) {
            j = g[k];
            h[j] = b[j]
        }
        return h
    }, process: function (h, p, l) {
        var k = p.preprocessors || c.defaultPreprocessors, s = this.preprocessors, v = {onBeforeCreated: this.onBeforeCreated}, u = [], w, o, n, t, m, r, q;
        delete p.preprocessors;
        for (n = 0, t = k.length; n < t; n++) {
            w = k[n];
            if (typeof w == "string") {
                w = s[w];
                o = w.properties;
                if (o === true) {
                    u.push(w.fn)
                } else {
                    if (o) {
                        for (m = 0, r = o.length; m < r; m++) {
                            q = o[m];
                            if (p.hasOwnProperty(q)) {
                                u.push(w.fn);
                                break
                            }
                        }
                    }
                }
            } else {
                u.push(w)
            }
        }
        v.onCreated = l ? l : Ext.emptyFn;
        v.preprocessors = u;
        this.doProcess(h, p, v)
    }, doProcess: function (i, m, h) {
        var l = this, n = h.preprocessors, j = n.shift(), k = l.doProcess;
        for (; j; j = n.shift()) {
            if (j.call(l, i, m, h, k) === false) {
                return
            }
        }
        h.onBeforeCreated.apply(l, arguments)
    }, preprocessors: {}, registerPreprocessor: function (i, l, j, h, k) {
        if (!h) {
            h = "last"
        }
        if (!j) {
            j = [i]
        }
        this.preprocessors[i] = {name: i, properties: j || false, fn: l};
        this.setDefaultPreprocessorPosition(i, h, k);
        return this
    }, getPreprocessor: function (h) {
        return this.preprocessors[h]
    }, getPreprocessors: function () {
        return this.preprocessors
    }, defaultPreprocessors: [], getDefaultPreprocessors: function () {
        return this.defaultPreprocessors
    }, setDefaultPreprocessors: function (h) {
        this.defaultPreprocessors = Ext.Array.from(h);
        return this
    }, setDefaultPreprocessorPosition: function (j, l, k) {
        var h = this.defaultPreprocessors, i;
        if (typeof l == "string") {
            if (l === "first") {
                h.unshift(j);
                return this
            } else {
                if (l === "last") {
                    h.push(j);
                    return this
                }
            }
            l = (l === "after") ? 1 : -1
        }
        i = Ext.Array.indexOf(h, k);
        if (i !== -1) {
            Ext.Array.splice(h, Math.max(0, i + l), 0, j)
        }
        return this
    }, configNameCache: {}, getConfigNameMap: function (j) {
        var i = this.configNameCache, k = i[j], h;
        if (!k) {
            h = j.charAt(0).toUpperCase() + j.substr(1);
            k = i[j] = {internal: j, initialized: "_is" + h + "Initialized", apply: "apply" + h, update: "update" + h, set: "set" + h, get: "get" + h, doSet: "doSet" + h, changeEvent: j.toLowerCase() + "change"}
        }
        return k
    }});
    c.registerPreprocessor("extend", function (j, l, q) {
        var m = Ext.Base, n = m.prototype, o = l.extend, h, p, k;
        delete l.extend;
        if (o && o !== Object) {
            h = o
        } else {
            h = m
        }
        p = h.prototype;
        if (!h.$isClass) {
            for (k in n) {
                if (!p[k]) {
                    p[k] = n[k]
                }
            }
        }
        j.extend(h);
        j.triggerExtended.apply(j, arguments);
        if (l.onClassExtended) {
            j.onExtended(l.onClassExtended, j);
            delete l.onClassExtended
        }
    }, true);
    c.registerPreprocessor("statics", function (h, i) {
        h.addStatics(i.statics);
        delete i.statics
    });
    c.registerPreprocessor("inheritableStatics", function (h, i) {
        h.addInheritableStatics(i.inheritableStatics);
        delete i.inheritableStatics
    });
    c.registerPreprocessor("config", function (h, k) {
        var j = k.config, i = h.prototype;
        delete k.config;
        Ext.Object.each(j, function (n, w) {
            var u = c.getConfigNameMap(n), q = u.internal, l = u.initialized, v = u.apply, o = u.update, t = u.set, m = u.get, y = (t in i) || k.hasOwnProperty(t), p = (v in i) || k.hasOwnProperty(v), r = (o in i) || k.hasOwnProperty(o), x, s;
            if (w === null || (!y && !p && !r)) {
                i[q] = w;
                i[l] = true
            } else {
                i[l] = false
            }
            if (!y) {
                k[t] = function (B) {
                    var A = this[q], z = this[v], C = this[o];
                    if (!this[l]) {
                        this[l] = true
                    }
                    if (z) {
                        B = z.call(this, B, A)
                    }
                    if (typeof B != "undefined") {
                        this[q] = B;
                        if (C && B !== A) {
                            C.call(this, B, A)
                        }
                    }
                    return this
                }
            }
            if (!(m in i) || k.hasOwnProperty(m)) {
                s = k[m] || false;
                if (s) {
                    x = function () {
                        return s.apply(this, arguments)
                    }
                } else {
                    x = function () {
                        return this[q]
                    }
                }
                k[m] = function () {
                    var z;
                    if (!this[l]) {
                        this[l] = true;
                        this[t](this.config[n])
                    }
                    z = this[m];
                    if ("$previous" in z) {
                        z.$previous = x
                    } else {
                        this[m] = x
                    }
                    return x.apply(this, arguments)
                }
            }
        });
        h.addConfig(j, true)
    });
    c.registerPreprocessor("mixins", function (l, p, h) {
        var j = p.mixins, m, k, n, o;
        delete p.mixins;
        Ext.Function.interceptBefore(h, "onCreated", function () {
            if (j instanceof Array) {
                for (n = 0, o = j.length; n < o; n++) {
                    k = j[n];
                    m = k.prototype.mixinId || k.$className;
                    l.mixin(m, k)
                }
            } else {
                for (var i in j) {
                    if (j.hasOwnProperty(i)) {
                        l.mixin(i, j[i])
                    }
                }
            }
        })
    });
    Ext.extend = function (j, k, i) {
        if (arguments.length === 2 && Ext.isObject(k)) {
            i = k;
            k = j;
            j = null
        }
        var h;
        if (!k) {
            throw new Error("[Ext.extend] Attempting to extend from a class which has not been loaded on the page.")
        }
        i.extend = k;
        i.preprocessors = ["extend", "statics", "inheritableStatics", "mixins", "config"];
        if (j) {
            h = new c(j, i);
            h.prototype.constructor = j
        } else {
            h = new c(i)
        }
        h.prototype.override = function (n) {
            for (var l in n) {
                if (n.hasOwnProperty(l)) {
                    this[l] = n[l]
                }
            }
        };
        return h
    }
}());
(function (c, e, h, d, g) {
    function a() {
        function i() {
            return this.constructor.apply(this, arguments) || null
        }

        return i
    }

    var b = Ext.ClassManager = {classes: {}, existCache: {}, namespaceRewrites: [
        {from: "Ext.", to: Ext}
    ], maps: {alternateToName: {}, aliasToName: {}, nameToAliases: {}, nameToAlternates: {}}, enableNamespaceParseCache: true, namespaceParseCache: {}, instantiators: [], isCreated: function (n) {
        var m = this.existCache, l, o, k, j, p;
        if (this.classes[n] || m[n]) {
            return true
        }
        j = g;
        p = this.parseNamespace(n);
        for (l = 0, o = p.length; l < o; l++) {
            k = p[l];
            if (typeof k != "string") {
                j = k
            } else {
                if (!j || !j[k]) {
                    return false
                }
                j = j[k]
            }
        }
        m[n] = true;
        this.triggerCreated(n);
        return true
    }, createdListeners: [], nameCreatedListeners: {}, triggerCreated: function (s) {
        var u = this.createdListeners, m = this.nameCreatedListeners, n = this.maps.nameToAlternates[s], t = [s], p, r, o, q, l, k;
        for (p = 0, r = u.length; p < r; p++) {
            l = u[p];
            l.fn.call(l.scope, s)
        }
        if (n) {
            t.push.apply(t, n)
        }
        for (p = 0, r = t.length; p < r; p++) {
            k = t[p];
            u = m[k];
            if (u) {
                for (o = 0, q = u.length; o < q; o++) {
                    l = u[o];
                    l.fn.call(l.scope, k)
                }
                delete m[k]
            }
        }
    }, onCreated: function (m, l, k) {
        var j = this.createdListeners, i = this.nameCreatedListeners, n = {fn: m, scope: l};
        if (k) {
            if (this.isCreated(k)) {
                m.call(l, k);
                return
            }
            if (!i[k]) {
                i[k] = []
            }
            i[k].push(n)
        } else {
            j.push(n)
        }
    }, parseNamespace: function (l) {
        var j = this.namespaceParseCache, m, o, q, k, t, s, r, n, p;
        if (this.enableNamespaceParseCache) {
            if (j.hasOwnProperty(l)) {
                return j[l]
            }
        }
        m = [];
        o = this.namespaceRewrites;
        q = g;
        k = l;
        for (n = 0, p = o.length; n < p; n++) {
            t = o[n];
            s = t.from;
            r = t.to;
            if (k === s || k.substring(0, s.length) === s) {
                k = k.substring(s.length);
                if (typeof r != "string") {
                    q = r
                } else {
                    m = m.concat(r.split("."))
                }
                break
            }
        }
        m.push(q);
        m = m.concat(k.split("."));
        if (this.enableNamespaceParseCache) {
            j[l] = m
        }
        return m
    }, setNamespace: function (m, p) {
        var k = g, q = this.parseNamespace(m), o = q.length - 1, j = q[o], n, l;
        for (n = 0; n < o; n++) {
            l = q[n];
            if (typeof l != "string") {
                k = l
            } else {
                if (!k[l]) {
                    k[l] = {}
                }
                k = k[l]
            }
        }
        k[j] = p;
        return k[j]
    }, createNamespaces: function () {
        var k = g, p, m, n, l, o, q;
        for (n = 0, o = arguments.length; n < o; n++) {
            p = this.parseNamespace(arguments[n]);
            for (l = 0, q = p.length; l < q; l++) {
                m = p[l];
                if (typeof m != "string") {
                    k = m
                } else {
                    if (!k[m]) {
                        k[m] = {}
                    }
                    k = k[m]
                }
            }
        }
        return k
    }, set: function (i, m) {
        var l = this, o = l.maps, n = o.nameToAlternates, k = l.getName(m), j;
        l.classes[i] = l.setNamespace(i, m);
        if (k && k !== i) {
            o.alternateToName[i] = k;
            j = n[k] || (n[k] = []);
            j.push(i)
        }
        return this
    }, get: function (l) {
        var n = this.classes, j, p, k, m, o;
        if (n[l]) {
            return n[l]
        }
        j = g;
        p = this.parseNamespace(l);
        for (m = 0, o = p.length; m < o; m++) {
            k = p[m];
            if (typeof k != "string") {
                j = k
            } else {
                if (!j || !j[k]) {
                    return null
                }
                j = j[k]
            }
        }
        return j
    }, setAlias: function (i, j) {
        var l = this.maps.aliasToName, m = this.maps.nameToAliases, k;
        if (typeof i == "string") {
            k = i
        } else {
            k = this.getName(i)
        }
        if (j && l[j] !== k) {
            l[j] = k
        }
        if (!m[k]) {
            m[k] = []
        }
        if (j) {
            Ext.Array.include(m[k], j)
        }
        return this
    }, addNameAliasMappings: function (j) {
        var o = this.maps.aliasToName, p = this.maps.nameToAliases, m, n, l, k;
        for (m in j) {
            n = p[m] || (p[m] = []);
            for (k = 0; k < j[m].length; k++) {
                l = j[m][k];
                if (!o[l]) {
                    o[l] = m;
                    n.push(l)
                }
            }
        }
        return this
    }, addNameAlternateMappings: function (m) {
        var j = this.maps.alternateToName, p = this.maps.nameToAlternates, l, n, o, k;
        for (l in m) {
            n = p[l] || (p[l] = []);
            for (k = 0; k < m[l].length; k++) {
                o = m[l];
                if (!j[o]) {
                    j[o] = l;
                    n.push(o)
                }
            }
        }
        return this
    }, getByAlias: function (i) {
        return this.get(this.getNameByAlias(i))
    }, getNameByAlias: function (i) {
        return this.maps.aliasToName[i] || ""
    }, getNameByAlternate: function (i) {
        return this.maps.alternateToName[i] || ""
    }, getAliasesByName: function (i) {
        return this.maps.nameToAliases[i] || []
    }, getName: function (i) {
        return i && i.$className || ""
    }, getClass: function (i) {
        return i && i.self || null
    }, create: function (j, l, i) {
        var k = a();
        if (typeof l == "function") {
            l = l(k)
        }
        l.$className = j;
        return new c(k, l, function () {
            var m = l.postprocessors || b.defaultPostprocessors, t = b.postprocessors, u = [], s, o, r, n, q, p, v;
            delete l.postprocessors;
            for (o = 0, r = m.length; o < r; o++) {
                s = m[o];
                if (typeof s == "string") {
                    s = t[s];
                    p = s.properties;
                    if (p === true) {
                        u.push(s.fn)
                    } else {
                        if (p) {
                            for (n = 0, q = p.length; n < q; n++) {
                                v = p[n];
                                if (l.hasOwnProperty(v)) {
                                    u.push(s.fn);
                                    break
                                }
                            }
                        }
                    }
                } else {
                    u.push(s)
                }
            }
            l.postprocessors = u;
            l.createdFn = i;
            b.processCreate(j, this, l)
        })
    }, processCreate: function (l, j, n) {
        var m = this, i = n.postprocessors.shift(), k = n.createdFn;
        if (!i) {
            if (l) {
                m.set(l, j)
            }
            if (k) {
                k.call(j, j)
            }
            if (l) {
                m.triggerCreated(l)
            }
            return
        }
        if (i.call(m, l, j, n, m.processCreate) !== false) {
            m.processCreate(l, j, n)
        }
    }, createOverride: function (l, p, j) {
        var o = this, n = p.override, k = p.requires, i = p.uses, m = function () {
            var q, r;
            if (k) {
                r = k;
                k = null;
                Ext.Loader.require(r, m)
            } else {
                q = o.get(n);
                delete p.override;
                delete p.requires;
                delete p.uses;
                Ext.override(q, p);
                o.triggerCreated(l);
                if (i) {
                    Ext.Loader.addUsedClasses(i)
                }
                if (j) {
                    j.call(q)
                }
            }
        };
        o.existCache[l] = true;
        o.onCreated(m, o, n);
        return o
    }, instantiateByAlias: function () {
        var j = arguments[0], i = h.call(arguments), k = this.getNameByAlias(j);
        if (!k) {
            k = this.maps.aliasToName[j];
            Ext.syncRequire(k)
        }
        i[0] = k;
        return this.instantiate.apply(this, i)
    }, instantiate: function () {
        var k = arguments[0], m = typeof k, j = h.call(arguments, 1), l = k, n, i;
        if (m != "function") {
            if (m != "string" && j.length === 0) {
                j = [k];
                k = k.xclass
            }
            i = this.get(k)
        } else {
            i = k
        }
        if (!i) {
            n = this.getNameByAlias(k);
            if (n) {
                k = n;
                i = this.get(k)
            }
        }
        if (!i) {
            n = this.getNameByAlternate(k);
            if (n) {
                k = n;
                i = this.get(k)
            }
        }
        if (!i) {
            Ext.syncRequire(k);
            i = this.get(k)
        }
        return this.getInstantiator(j.length)(i, j)
    }, dynInstantiate: function (j, i) {
        i = d(i, true);
        i.unshift(j);
        return this.instantiate.apply(this, i)
    }, getInstantiator: function (m) {
        var l = this.instantiators, n, k, j;
        n = l[m];
        if (!n) {
            k = m;
            j = [];
            for (k = 0; k < m; k++) {
                j.push("a[" + k + "]")
            }
            n = l[m] = new Function("c", "a", "return new c(" + j.join(",") + ")")
        }
        return n
    }, postprocessors: {}, defaultPostprocessors: [], registerPostprocessor: function (j, m, k, i, l) {
        if (!i) {
            i = "last"
        }
        if (!k) {
            k = [j]
        }
        this.postprocessors[j] = {name: j, properties: k || false, fn: m};
        this.setDefaultPostprocessorPosition(j, i, l);
        return this
    }, setDefaultPostprocessors: function (i) {
        this.defaultPostprocessors = d(i);
        return this
    }, setDefaultPostprocessorPosition: function (j, m, l) {
        var k = this.defaultPostprocessors, i;
        if (typeof m == "string") {
            if (m === "first") {
                k.unshift(j);
                return this
            } else {
                if (m === "last") {
                    k.push(j);
                    return this
                }
            }
            m = (m === "after") ? 1 : -1
        }
        i = Ext.Array.indexOf(k, l);
        if (i !== -1) {
            Ext.Array.splice(k, Math.max(0, i + m), 0, j)
        }
        return this
    }, getNamesByExpression: function (q) {
        var o = this.maps.nameToAliases, r = [], j, n, l, k, s, m, p;
        if (q.indexOf("*") !== -1) {
            q = q.replace(/\*/g, "(.*?)");
            s = new RegExp("^" + q + "$");
            for (j in o) {
                if (o.hasOwnProperty(j)) {
                    l = o[j];
                    if (j.search(s) !== -1) {
                        r.push(j)
                    } else {
                        for (m = 0, p = l.length; m < p; m++) {
                            n = l[m];
                            if (n.search(s) !== -1) {
                                r.push(j);
                                break
                            }
                        }
                    }
                }
            }
        } else {
            k = this.getNameByAlias(q);
            if (k) {
                r.push(k)
            } else {
                k = this.getNameByAlternate(q);
                if (k) {
                    r.push(k)
                } else {
                    r.push(q)
                }
            }
        }
        return r
    }};
    b.registerPostprocessor("alias", function (l, k, o) {
        var j = o.alias, m, n;
        for (m = 0, n = j.length; m < n; m++) {
            e = j[m];
            this.setAlias(k, e)
        }
    }, ["xtype", "alias"]);
    b.registerPostprocessor("singleton", function (j, i, l, k) {
        if (l.singleton) {
            k.call(this, j, new i(), l)
        } else {
            return true
        }
        return false
    });
    b.registerPostprocessor("alternateClassName", function (k, j, o) {
        var m = o.alternateClassName, l, n, p;
        if (!(m instanceof Array)) {
            m = [m]
        }
        for (l = 0, n = m.length; l < n; l++) {
            p = m[l];
            this.set(p, j)
        }
    });
    Ext.apply(Ext, {create: e(b, "instantiate"), widget: function (k, j) {
        var o = k, l, m, i, n;
        if (typeof o != "string") {
            j = k;
            o = j.xtype
        } else {
            j = j || {}
        }
        if (j.isComponent) {
            return j
        }
        l = "widget." + o;
        m = b.getNameByAlias(l);
        if (!m) {
            n = true
        }
        i = b.get(m);
        if (n || !i) {
            return b.instantiateByAlias(l, j)
        }
        return new i(j)
    }, createByAlias: e(b, "instantiateByAlias"), define: function (j, k, i) {
        if (k.override) {
            return b.createOverride.apply(b, arguments)
        }
        return b.create.apply(b, arguments)
    }, getClassName: e(b, "getName"), getDisplayName: function (i) {
        if (i) {
            if (i.displayName) {
                return i.displayName
            }
            if (i.$name && i.$class) {
                return Ext.getClassName(i.$class) + "#" + i.$name
            }
            if (i.$className) {
                return i.$className
            }
        }
        return"Anonymous"
    }, getClass: e(b, "getClass"), namespace: e(b, "createNamespaces")});
    Ext.createWidget = Ext.widget;
    Ext.ns = Ext.namespace;
    c.registerPreprocessor("className", function (i, j) {
        if (j.$className) {
            i.$className = j.$className
        }
    }, true, "first");
    c.registerPreprocessor("alias", function (u, o) {
        var s = u.prototype, l = d(o.xtype), j = d(o.alias), v = "widget.", t = v.length, p = Array.prototype.slice.call(s.xtypesChain || []), m = Ext.merge({}, s.xtypesMap || {}), n, r, q, k;
        for (n = 0, r = j.length; n < r; n++) {
            q = j[n];
            if (q.substring(0, t) === v) {
                k = q.substring(t);
                Ext.Array.include(l, k)
            }
        }
        u.xtype = o.xtype = l[0];
        o.xtypes = l;
        for (n = 0, r = l.length; n < r; n++) {
            k = l[n];
            if (!m[k]) {
                m[k] = true;
                p.push(k)
            }
        }
        o.xtypesChain = p;
        o.xtypesMap = m;
        Ext.Function.interceptAfter(o, "onClassCreated", function () {
            var i = s.mixins, x, w;
            for (x in i) {
                if (i.hasOwnProperty(x)) {
                    w = i[x];
                    l = w.xtypes;
                    if (l) {
                        for (n = 0, r = l.length; n < r; n++) {
                            k = l[n];
                            if (!m[k]) {
                                m[k] = true;
                                p.push(k)
                            }
                        }
                    }
                }
            }
        });
        for (n = 0, r = l.length; n < r; n++) {
            k = l[n];
            Ext.Array.include(j, v + k)
        }
        o.alias = j
    }, ["xtype", "alias"])
}(Ext.Class, Ext.Function.alias, Array.prototype.slice, Ext.Array.from, Ext.global));
if (Ext._alternatesMetadata) {
    Ext.ClassManager.addNameAlternateMappings(Ext._alternatesMetadata);
    Ext._alternatesMetadata = null
}
if (Ext._aliasMetadata) {
    Ext.ClassManager.addNameAliasMappings(Ext._aliasMetadata);
    Ext._aliasMetadata = null
}
Ext.Loader = new function () {
    var k = this, b = Ext.ClassManager, t = Ext.Class, e = Ext.Function.flexSetter, o = Ext.Function.alias, a = Ext.Function.pass, d = Ext.Function.defer, h = Ext.Array.erase, n = ["extend", "mixins", "requires"], v = {}, m = [], c = /\/\.\//g, g = /\./g, j = 0;
    Ext.apply(k, {isInHistory: v, history: m, config: {enabled: false, scriptChainDelay: false, disableCaching: true, disableCachingParam: "_dc", garbageCollect: false, paths: {Ext: "."}, preserveScripts: true, scriptCharset: undefined}, setConfig: function (y, z) {
        if (Ext.isObject(y) && arguments.length === 1) {
            Ext.merge(k.config, y);
            if ("paths" in y) {
                Ext.app.collectNamespaces(y.paths)
            }
        } else {
            k.config[y] = (Ext.isObject(z)) ? Ext.merge(k.config[y], z) : z;
            if (y === "paths") {
                Ext.app.collectNamespaces(z)
            }
        }
        return k
    }, getConfig: function (y) {
        if (y) {
            return k.config[y]
        }
        return k.config
    }, setPath: e(function (y, z) {
        k.config.paths[y] = z;
        Ext.app.namespaces[y] = true;
        j++;
        return k
    }), addClassPathMappings: function (z) {
        var y;
        if (j == 0) {
            k.config.paths = z
        } else {
            for (y in z) {
                k.config.paths[y] = z[y]
            }
        }
        j++;
        return k
    }, getPath: function (y) {
        var A = "", B = k.config.paths, z = k.getPrefix(y);
        if (z.length > 0) {
            if (z === y) {
                return B[z]
            }
            A = B[z];
            y = y.substring(z.length + 1)
        }
        if (A.length > 0) {
            A += "/"
        }
        return A.replace(c, "/") + y.replace(g, "/") + ".js"
    }, getPrefix: function (z) {
        var B = k.config.paths, A, y = "";
        if (B.hasOwnProperty(z)) {
            return z
        }
        for (A in B) {
            if (B.hasOwnProperty(A) && A + "." === z.substring(0, A.length + 1)) {
                if (A.length > y.length) {
                    y = A
                }
            }
        }
        return y
    }, isAClassNameWithAKnownPrefix: function (y) {
        var z = k.getPrefix(y);
        return z !== "" && z !== y
    }, require: function (A, z, y, B) {
        if (z) {
            z.call(y)
        }
    }, syncRequire: function () {
    }, exclude: function (y) {
        return{require: function (B, A, z) {
            return k.require(B, A, z, y)
        }, syncRequire: function (B, A, z) {
            return k.syncRequire(B, A, z, y)
        }}
    }, onReady: function (B, A, C, y) {
        var z;
        if (C !== false && Ext.onDocumentReady) {
            z = B;
            B = function () {
                Ext.onDocumentReady(z, A, y)
            }
        }
        B.call(A)
    }});
    var q = [], r = {}, u = {}, s = {}, p = {}, w = [], x = [], i = {}, l = function (y, z) {
        return z.priority - y.priority
    };
    Ext.apply(k, {documentHead: typeof document != "undefined" && (document.head || document.getElementsByTagName("head")[0]), isLoading: false, queue: q, isClassFileLoaded: r, isFileLoaded: u, readyListeners: w, optionalRequires: x, requiresMap: i, numPendingFiles: 0, numLoadedFiles: 0, hasFileLoadError: false, classNameToFilePathMap: s, scriptsLoading: 0, syncModeEnabled: false, scriptElements: p, refreshQueue: function () {
        var C = q.length, z, B, y, A;
        if (!C && !k.scriptsLoading) {
            return k.triggerReady()
        }
        for (z = 0; z < C; z++) {
            B = q[z];
            if (B) {
                A = B.requires;
                if (A.length > k.numLoadedFiles) {
                    continue
                }
                for (y = 0; y < A.length;) {
                    if (b.isCreated(A[y])) {
                        h(A, y, 1)
                    } else {
                        y++
                    }
                }
                if (B.requires.length === 0) {
                    h(q, z, 1);
                    B.callback.call(B.scope);
                    k.refreshQueue();
                    break
                }
            }
        }
        return k
    }, injectScriptElement: function (y, F, C, H, A) {
        var G = document.createElement("script"), D = false, z = k.config, E = function () {
            if (!D) {
                D = true;
                G.onload = G.onreadystatechange = G.onerror = null;
                if (typeof z.scriptChainDelay == "number") {
                    d(F, z.scriptChainDelay, H)
                } else {
                    F.call(H)
                }
                k.cleanupScriptElement(G, z.preserveScripts === false, z.garbageCollect)
            }
        }, B = function (I) {
            d(C, 1, H);
            k.cleanupScriptElement(G, z.preserveScripts === false, z.garbageCollect)
        };
        G.type = "text/javascript";
        G.onerror = B;
        A = A || z.scriptCharset;
        if (A) {
            G.charset = A
        }
        if ("addEventListener" in G) {
            G.onload = E
        } else {
            if ("readyState" in G) {
                G.onreadystatechange = function () {
                    if (this.readyState == "loaded" || this.readyState == "complete") {
                        E()
                    }
                }
            } else {
                G.onload = E
            }
        }
        G.src = y;
        (k.documentHead || document.getElementsByTagName("head")[0]).appendChild(G);
        return G
    }, removeScriptElement: function (y) {
        if (p[y]) {
            k.cleanupScriptElement(p[y], true, !!k.getConfig("garbageCollect"));
            delete p[y]
        }
        return k
    }, cleanupScriptElement: function (A, z, B) {
        var C;
        A.onload = A.onreadystatechange = A.onerror = null;
        if (z) {
            Ext.removeNode(A);
            if (B) {
                for (C in A) {
                    try {
                        if (C != "src") {
                            A[C] = null
                        }
                        delete A[C]
                    } catch (y) {
                    }
                }
            }
        }
        return k
    }, loadScript: function (H) {
        var B = k.getConfig(), A = typeof H == "string", z = A ? H : H.url, D = !A && H.onError, E = !A && H.onLoad, G = !A && H.scope, F = function () {
            k.numPendingFiles--;
            k.scriptsLoading--;
            if (D) {
                D.call(G, "Failed loading '" + z + "', please verify that the file exists")
            }
            if (k.numPendingFiles + k.scriptsLoading === 0) {
                k.refreshQueue()
            }
        }, C = function () {
            k.numPendingFiles--;
            k.scriptsLoading--;
            if (E) {
                E.call(G)
            }
            if (k.numPendingFiles + k.scriptsLoading === 0) {
                k.refreshQueue()
            }
        }, y;
        k.isLoading = true;
        k.numPendingFiles++;
        k.scriptsLoading++;
        y = B.disableCaching ? (z + "?" + B.disableCachingParam + "=" + Ext.Date.now()) : z;
        p[z] = k.injectScriptElement(y, C, F)
    }, loadScriptFile: function (z, G, E, J, y) {
        if (u[z]) {
            return k
        }
        var B = k.getConfig(), K = z + (B.disableCaching ? ("?" + B.disableCachingParam + "=" + Ext.Date.now()) : ""), A = false, I, C, H, D = "";
        J = J || k;
        k.isLoading = true;
        if (!y) {
            H = function () {
            };
            p[z] = k.injectScriptElement(K, G, H, J)
        } else {
            if (typeof XMLHttpRequest != "undefined") {
                I = new XMLHttpRequest()
            } else {
                I = new ActiveXObject("Microsoft.XMLHTTP")
            }
            try {
                I.open("GET", K, false);
                I.send(null)
            } catch (F) {
                A = true
            }
            C = (I.status === 1223) ? 204 : (I.status === 0 && ((self.location || {}).protocol == "file:" || (self.location || {}).protocol == "ionp:")) ? 200 : I.status;
            A = A || (C === 0);
            if (A) {
            } else {
                if ((C >= 200 && C < 300) || (C === 304)) {
                    if (!Ext.isIE) {
                        D = "\n//@ sourceURL=" + z
                    }
                    Ext.globalEval(I.responseText + D);
                    G.call(J)
                } else {
                }
            }
            I = null
        }
    }, syncRequire: function () {
        var y = k.syncModeEnabled;
        if (!y) {
            k.syncModeEnabled = true
        }
        k.require.apply(k, arguments);
        if (!y) {
            k.syncModeEnabled = false
        }
        k.refreshQueue()
    }, require: function (Q, H, B, D) {
        var J = {}, A = {}, G = [], S = [], P = [], z = [], F, R, L, K, y, E, O, N, M, I, C;
        if (D) {
            D = (typeof D === "string") ? [D] : D;
            for (N = 0, I = D.length; N < I; N++) {
                y = D[N];
                if (typeof y == "string" && y.length > 0) {
                    G = b.getNamesByExpression(y);
                    for (M = 0, C = G.length; M < C; M++) {
                        J[G[M]] = true
                    }
                }
            }
        }
        Q = (typeof Q === "string") ? [Q] : (Q ? Q : []);
        if (H) {
            if (H.length > 0) {
                F = function () {
                    var U = [], T, V;
                    for (T = 0, V = z.length; T < V; T++) {
                        U.push(b.get(z[T]))
                    }
                    return H.apply(this, U)
                }
            } else {
                F = H
            }
        } else {
            F = Ext.emptyFn
        }
        B = B || Ext.global;
        for (N = 0, I = Q.length; N < I; N++) {
            K = Q[N];
            if (typeof K == "string" && K.length > 0) {
                S = b.getNamesByExpression(K);
                C = S.length;
                for (M = 0; M < C; M++) {
                    O = S[M];
                    if (J[O] !== true) {
                        z.push(O);
                        if (!b.isCreated(O) && !A[O]) {
                            A[O] = true;
                            P.push(O)
                        }
                    }
                }
            }
        }
        if (P.length > 0) {
            if (!k.config.enabled) {
                throw new Error("Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. Missing required class" + ((P.length > 1) ? "es" : "") + ": " + P.join(", "))
            }
        } else {
            F.call(B);
            return k
        }
        R = k.syncModeEnabled;
        if (!R) {
            q.push({requires: P.slice(), callback: F, scope: B})
        }
        I = P.length;
        for (N = 0; N < I; N++) {
            E = P[N];
            L = k.getPath(E);
            if (R && r.hasOwnProperty(E)) {
                if (!r[E]) {
                    k.numPendingFiles--;
                    k.removeScriptElement(L);
                    delete r[E]
                }
            }
            if (!r.hasOwnProperty(E)) {
                r[E] = false;
                s[E] = L;
                k.numPendingFiles++;
                k.loadScriptFile(L, a(k.onFileLoaded, [E, L], k), a(k.onFileLoadError, [E, L], k), k, R)
            }
        }
        if (R) {
            F.call(B);
            if (I === 1) {
                return b.get(E)
            }
        }
        return k
    }, onFileLoaded: function (A, z) {
        var y = r[A];
        k.numLoadedFiles++;
        r[A] = true;
        u[z] = true;
        if (!y) {
            k.numPendingFiles--
        }
        if (k.numPendingFiles === 0) {
            k.refreshQueue()
        }
    }, onFileLoadError: function (A, z, y, B) {
        k.numPendingFiles--;
        k.hasFileLoadError = true
    }, addUsedClasses: function (A) {
        var y, z, B;
        if (A) {
            A = (typeof A == "string") ? [A] : A;
            for (z = 0, B = A.length; z < B; z++) {
                y = A[z];
                if (typeof y == "string" && !Ext.Array.contains(x, y)) {
                    x.push(y)
                }
            }
        }
        return k
    }, triggerReady: function () {
        var y, z = x;
        if (k.isLoading) {
            k.isLoading = false;
            if (z.length !== 0) {
                z = z.slice();
                x.length = 0;
                k.require(z, k.triggerReady, k);
                return k
            }
        }
        Ext.Array.sort(w, l);
        while (w.length && !k.isLoading) {
            y = w.shift();
            y.fn.call(y.scope)
        }
        return k
    }, onReady: function (B, A, C, y) {
        var z;
        if (C !== false && Ext.onDocumentReady) {
            z = B;
            B = function () {
                Ext.onDocumentReady(z, A, y)
            }
        }
        if (!k.isLoading) {
            B.call(A)
        } else {
            w.push({fn: B, scope: A, priority: (y && y.priority) || 0})
        }
    }, historyPush: function (y) {
        if (y && r.hasOwnProperty(y) && !v[y]) {
            v[y] = true;
            m.push(y)
        }
        return k
    }});
    Ext.disableCacheBuster = function (z, A) {
        var y = new Date();
        y.setTime(y.getTime() + (z ? 10 * 365 : -1) * 24 * 60 * 60 * 1000);
        y = y.toGMTString();
        document.cookie = "ext-cache=1; expires=" + y + "; path=" + (A || "/")
    };
    Ext.require = o(k, "require");
    Ext.syncRequire = o(k, "syncRequire");
    Ext.exclude = o(k, "exclude");
    Ext.onReady = function (A, z, y) {
        k.onReady(A, z, true, y)
    };
    t.registerPreprocessor("loader", function (O, C, N, M) {
        var J = this, H = [], y, I = b.getName(O), B, A, G, F, L, E, z, K, D;
        for (B = 0, G = n.length; B < G; B++) {
            E = n[B];
            if (C.hasOwnProperty(E)) {
                z = C[E];
                if (typeof z == "string") {
                    H.push(z)
                } else {
                    if (z instanceof Array) {
                        for (A = 0, F = z.length; A < F; A++) {
                            L = z[A];
                            if (typeof L == "string") {
                                H.push(L)
                            }
                        }
                    } else {
                        if (typeof z != "function") {
                            for (A in z) {
                                if (z.hasOwnProperty(A)) {
                                    L = z[A];
                                    if (typeof L == "string") {
                                        H.push(L)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (H.length === 0) {
            return
        }
        k.require(H, function () {
            for (B = 0, G = n.length; B < G; B++) {
                E = n[B];
                if (C.hasOwnProperty(E)) {
                    z = C[E];
                    if (typeof z == "string") {
                        C[E] = b.get(z)
                    } else {
                        if (z instanceof Array) {
                            for (A = 0, F = z.length; A < F; A++) {
                                L = z[A];
                                if (typeof L == "string") {
                                    C[E][A] = b.get(L)
                                }
                            }
                        } else {
                            if (typeof z != "function") {
                                for (var P in z) {
                                    if (z.hasOwnProperty(P)) {
                                        L = z[P];
                                        if (typeof L == "string") {
                                            C[E][P] = b.get(L)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            M.call(J, O, C, N)
        });
        return false
    }, true, "after", "className");
    b.registerPostprocessor("uses", function (A, z, B) {
        var y = B.uses;
        if (y) {
            k.addUsedClasses(y)
        }
    });
    b.onCreated(k.historyPush)
};
if (Ext._classPathMetadata) {
    Ext.Loader.addClassPathMappings(Ext._classPathMetadata);
    Ext._classPathMetadata = null
}
(function () {
    var a = document.getElementsByTagName("script"), b = a[a.length - 1], d = b.src, c = d.substring(0, d.lastIndexOf("/") + 1), e = Ext.Loader;
    e.setConfig({enabled: true, disableCaching: true, paths: {Ext: c + "src"}})
})();
Ext._endTime = new Date().getTime();
if (Ext._beforereadyhandler) {
    Ext._beforereadyhandler()
}
Ext.Error = Ext.extend(Error, {statics: {ignore: false, raise: function (a) {
    a = a || {};
    if (Ext.isString(a)) {
        a = {msg: a}
    }
    var c = this.raise.caller, b;
    if (c) {
        if (c.$name) {
            a.sourceMethod = c.$name
        }
        if (c.$owner) {
            a.sourceClass = c.$owner.$className
        }
    }
    if (Ext.Error.handle(a) !== true) {
        b = Ext.Error.prototype.toString.call(a);
        Ext.log({msg: b, level: "error", dump: a, stack: true});
        throw new Ext.Error(a)
    }
}, handle: function () {
    return Ext.Error.ignore
}}, name: "Ext.Error", constructor: function (a) {
    if (Ext.isString(a)) {
        a = {msg: a}
    }
    var b = this;
    Ext.apply(b, a);
    b.message = b.message || b.msg
}, toString: function () {
    var c = this, b = c.sourceClass ? c.sourceClass : "", a = c.sourceMethod ? "." + c.sourceMethod + "(): " : "", d = c.msg || "(No description provided)";
    return b + a + d
}});
Ext.deprecated = function (a) {
    return Ext.emptyFn
};
Ext.JSON = (new (function () {
    var me = this, encodingFunction, decodingFunction, useNative = null, useHasOwn = !!{}.hasOwnProperty, isNative = function () {
        if (useNative === null) {
            useNative = Ext.USE_NATIVE_JSON && window.JSON && JSON.toString() == "[object JSON]"
        }
        return useNative
    }, pad = function (n) {
        return n < 10 ? "0" + n : n
    }, doDecode = function (json) {
        return eval("(" + json + ")")
    }, doEncode = function (o, newline) {
        if (o === null || o === undefined) {
            return"null"
        } else {
            if (Ext.isDate(o)) {
                return Ext.JSON.encodeDate(o)
            } else {
                if (Ext.isString(o)) {
                    return Ext.JSON.encodeString(o)
                } else {
                    if (typeof o == "number") {
                        return isFinite(o) ? String(o) : "null"
                    } else {
                        if (Ext.isBoolean(o)) {
                            return String(o)
                        } else {
                            if (o.toJSON) {
                                return o.toJSON()
                            } else {
                                if (Ext.isArray(o)) {
                                    return encodeArray(o, newline)
                                } else {
                                    if (Ext.isObject(o)) {
                                        return encodeObject(o, newline)
                                    } else {
                                        if (typeof o === "function") {
                                            return"null"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return"undefined"
    }, m = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\", "\x0b": "\\u000b"}, charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g, encodeString = function (s) {
        return'"' + s.replace(charToReplace, function (a) {
            var c = m[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"'
    }, encodeArray = function (o, newline) {
        var a = ["[", ""], len = o.length, i;
        for (i = 0; i < len; i += 1) {
            a.push(Ext.JSON.encodeValue(o[i]), ",")
        }
        a[a.length - 1] = "]";
        return a.join("")
    }, encodeObject = function (o, newline) {
        var a = ["{", ""], i, val;
        for (i in o) {
            val = o[i];
            if (!useHasOwn || o.hasOwnProperty(i)) {
                if (typeof val === "function" || val === undefined) {
                    continue
                }
                a.push(Ext.JSON.encodeValue(i), ":", Ext.JSON.encodeValue(val), ",")
            }
        }
        a[a.length - 1] = "}";
        return a.join("")
    };
    me.encodeString = encodeString;
    me.encodeValue = doEncode;
    me.encodeDate = function (o) {
        return'"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"'
    };
    me.encode = function (o) {
        if (!encodingFunction) {
            encodingFunction = isNative() ? JSON.stringify : me.encodeValue
        }
        return encodingFunction(o)
    };
    me.decode = function (json, safe) {
        if (!decodingFunction) {
            decodingFunction = isNative() ? JSON.parse : doDecode
        }
        try {
            return decodingFunction(json)
        } catch (e) {
            if (safe === true) {
                return null
            }
            Ext.Error.raise({sourceClass: "Ext.JSON", sourceMethod: "decode", msg: "You're trying to decode an invalid JSON String: " + json})
        }
    }
})());
Ext.encode = Ext.JSON.encode;
Ext.decode = Ext.JSON.decode;
Ext.apply(Ext, {userAgent: navigator.userAgent.toLowerCase(), cache: {}, idSeed: 1000, windowId: "ext-window", documentId: "ext-document", isReady: false, enableGarbageCollector: true, enableListenerCollection: true, rootHierarchyState: {}, addCacheEntry: function (g, c, e) {
    e = e || c.dom;
    var a = Ext.cache, b = g || (c && c.id) || e.id, d = a[b] || (a[b] = {data: {}, events: {}, dom: e, skipGarbageCollection: !!(e.getElementById || e.navigator)});
    if (c) {
        c.$cache = d;
        d.el = c
    }
    return d
}, updateCacheEntry: function (a, b) {
    a.dom = b;
    if (a.el) {
        a.el.dom = b
    }
    return a
}, id: function (a, c) {
    var b = this, d = "";
    a = Ext.getDom(a, true) || {};
    if (a === document) {
        a.id = b.documentId
    } else {
        if (a === window) {
            a.id = b.windowId
        }
    }
    if (!a.id) {
        if (b.isSandboxed) {
            d = Ext.sandboxName.toLowerCase() + "-"
        }
        a.id = d + (c || "ext-gen") + (++Ext.idSeed)
    }
    return a.id
}, escapeId: (function () {
    var c = /^[a-zA-Z_][a-zA-Z0-9_\-]*$/i, d = /([\W]{1})/g, b = /^(\d)/g, a = function (h, g) {
        return"\\" + g
    }, e = function (h, g) {
        return"\\00" + g.charCodeAt(0).toString(16) + " "
    };
    return function (g) {
        return c.test(g) ? g : g.replace(d, a).replace(b, e)
    }
}()), getBody: (function () {
    var a;
    return function () {
        return a || (a = Ext.get(document.body))
    }
}()), getHead: (function () {
    var a;
    return function () {
        return a || (a = Ext.get(document.getElementsByTagName("head")[0]))
    }
}()), getDoc: (function () {
    var a;
    return function () {
        return a || (a = Ext.get(document))
    }
}()), getOrientation: function () {
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape"
}, destroy: function () {
    var c = arguments.length, b, a;
    for (b = 0; b < c; b++) {
        a = arguments[b];
        if (a) {
            if (Ext.isArray(a)) {
                this.destroy.apply(this, a)
            } else {
                if (Ext.isFunction(a.destroy)) {
                    a.destroy()
                } else {
                    if (a.dom) {
                        a.remove()
                    }
                }
            }
        }
    }
}, callback: function (d, c, b, a) {
    if (Ext.isFunction(d)) {
        b = b || [];
        c = c || window;
        if (a) {
            Ext.defer(d, a, c, b)
        } else {
            d.apply(c, b)
        }
    }
}, htmlEncode: function (a) {
    return Ext.String.htmlEncode(a)
}, htmlDecode: function (a) {
    return Ext.String.htmlDecode(a)
}, urlAppend: function (a, b) {
    return Ext.String.urlAppend(a, b)
}});
Ext.ns = Ext.namespace;
window.undefined = window.undefined;
(function () {
    var p = function (e) {
        return e.test(Ext.userAgent)
    }, u = document.compatMode == "CSS1Compat", G = function (S, R) {
        var e;
        return(S && (e = R.exec(Ext.userAgent))) ? parseFloat(e[1]) : 0
    }, q = document.documentMode, a = p(/opera/), w = a && p(/version\/10\.5/), L = p(/\bchrome\b/), A = p(/webkit/), c = !L && p(/safari/), J = c && p(/applewebkit\/4/), H = c && p(/version\/3/), E = c && p(/version\/4/), k = c && p(/version\/5\.0/), D = c && p(/version\/5/), j = !a && p(/msie/), K = j && ((p(/msie 7/) && q != 8 && q != 9 && q != 10) || q == 7), I = j && ((p(/msie 8/) && q != 7 && q != 9 && q != 10) || q == 8), F = j && ((p(/msie 9/) && q != 7 && q != 8 && q != 10) || q == 9), h = j && ((p(/msie 10/) && q != 7 && q != 8 && q != 9) || q == 10), N = j && p(/msie 6/), b = !A && p(/gecko/), Q = b && p(/rv:1\.9/), P = b && p(/rv:2\.0/), O = b && p(/rv:5\./), s = b && p(/rv:10\./), z = Q && p(/rv:1\.9\.0/), x = Q && p(/rv:1\.9\.1/), v = Q && p(/rv:1\.9\.2/), g = p(/windows|win32/), C = p(/macintosh|mac os x/), y = p(/linux/), m = null, n = G(true, /\bchrome\/(\d+\.\d+)/), i = G(true, /\bfirefox\/(\d+\.\d+)/), o = G(j, /msie (\d+\.\d+)/), t = G(a, /version\/(\d+\.\d+)/), d = G(c, /version\/(\d+\.\d+)/), B = G(A, /webkit\/(\d+\.\d+)/), r = /^https/i.test(window.location.protocol), l;
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (M) {
    }
    l = function () {
    };
    l.info = l.warn = l.error = Ext.emptyFn;
    Ext.setVersion("extjs", "4.2.0.663");
    Ext.apply(Ext, {SSL_SECURE_URL: r && j ? "javascript:''" : "about:blank", plainTableCls: Ext.buildSettings.baseCSSPrefix + "table-plain", plainListCls: Ext.buildSettings.baseCSSPrefix + "list-plain", enableNestedListenerRemoval: false, USE_NATIVE_JSON: false, getDom: function (S, R) {
        if (!S || !document) {
            return null
        }
        if (S.dom) {
            return S.dom
        } else {
            if (typeof S == "string") {
                var T = Ext.getElementById(S);
                if (T && j && R) {
                    if (S == T.getAttribute("id")) {
                        return T
                    } else {
                        return null
                    }
                }
                return T
            } else {
                return S
            }
        }
    }, removeNode: N || K || I ? (function () {
        var e;
        return function (T) {
            if (T && T.tagName.toUpperCase() != "BODY") {
                (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(T) : Ext.EventManager.removeAll(T);
                var R = Ext.cache, S = T.id;
                if (R[S]) {
                    delete R[S].dom;
                    delete R[S]
                }
                if (I && T.parentNode) {
                    T.parentNode.removeChild(T)
                }
                e = e || document.createElement("div");
                e.appendChild(T);
                e.innerHTML = ""
            }
        }
    }()) : function (S) {
        if (S && S.parentNode && S.tagName.toUpperCase() != "BODY") {
            (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(S) : Ext.EventManager.removeAll(S);
            var e = Ext.cache, R = S.id;
            if (e[R]) {
                delete e[R].dom;
                delete e[R]
            }
            S.parentNode.removeChild(S)
        }
    }, isStrict: u, isIEQuirks: j && (!u && (N || K || I || F)), isOpera: a, isOpera10_5: w, isWebKit: A, isChrome: L, isSafari: c, isSafari3: H, isSafari4: E, isSafari5: D, isSafari5_0: k, isSafari2: J, isIE: j, isIE6: N, isIE7: K, isIE7m: N || K, isIE7p: j && !N, isIE8: I, isIE8m: N || K || I, isIE8p: j && !(N || K), isIE9: F, isIE9m: N || K || I || F, isIE9p: j && !(N || K || I), isIE10: h, isIE10m: N || K || I || F || h, isIE10p: j && !(N || K || I || F), isGecko: b, isGecko3: Q, isGecko4: P, isGecko5: O, isGecko10: s, isFF3_0: z, isFF3_5: x, isFF3_6: v, isFF4: 4 <= i && i < 5, isFF5: 5 <= i && i < 6, isFF10: 10 <= i && i < 11, isLinux: y, isWindows: g, isMac: C, chromeVersion: n, firefoxVersion: i, ieVersion: o, operaVersion: t, safariVersion: d, webKitVersion: B, isSecure: r, BLANK_IMAGE_URL: (N || K) ? "//www.sencha.com/s.gif" : "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", value: function (S, e, R) {
        return Ext.isEmpty(S, R) ? e : S
    }, escapeRe: function (e) {
        return e.replace(/([-.*+?\^${}()|\[\]\/\\])/g, "\\$1")
    }, addBehaviors: function (U) {
        if (!Ext.isReady) {
            Ext.onReady(function () {
                Ext.addBehaviors(U)
            })
        } else {
            var R = {}, T, e, S;
            for (e in U) {
                if ((T = e.split("@"))[1]) {
                    S = T[0];
                    if (!R[S]) {
                        R[S] = Ext.select(S)
                    }
                    R[S].on(T[1], U[e])
                }
            }
            R = null
        }
    }, getScrollbarSize: function (R) {
        if (!Ext.isReady) {
            return{}
        }
        if (R || !m) {
            var e = document.body, S = document.createElement("div");
            S.style.width = S.style.height = "100px";
            S.style.overflow = "scroll";
            S.style.position = "absolute";
            e.appendChild(S);
            m = {width: S.offsetWidth - S.clientWidth, height: S.offsetHeight - S.clientHeight};
            e.removeChild(S)
        }
        return m
    }, getScrollBarWidth: function (R) {
        var e = Ext.getScrollbarSize(R);
        return e.width + 2
    }, copyTo: function (R, T, V, U) {
        if (typeof V == "string") {
            V = V.split(/[,;\s]/)
        }
        var W, S = V ? V.length : 0, e;
        for (W = 0; W < S; W++) {
            e = V[W];
            if (U || T.hasOwnProperty(e)) {
                R[e] = T[e]
            }
        }
        return R
    }, destroyMembers: function (T) {
        for (var S = 1, R = arguments, e = R.length; S < e; S++) {
            Ext.destroy(T[R[S]]);
            delete T[R[S]]
        }
    }, log: l, partition: function (e, U) {
        var V = [
            [],
            []
        ], R, T, S = e.length;
        for (R = 0; R < S; R++) {
            T = e[R];
            V[(U && U(T, R, e)) || (!U && T) ? 0 : 1].push(T)
        }
        return V
    }, invoke: function (e, U) {
        var W = [], V = Array.prototype.slice.call(arguments, 2), R, T, S = e.length;
        for (R = 0; R < S; R++) {
            T = e[R];
            if (T && typeof T[U] == "function") {
                W.push(T[U].apply(T, V))
            } else {
                W.push(undefined)
            }
        }
        return W
    }, zip: function () {
        var X = Ext.partition(arguments, function (Y) {
            return typeof Y != "function"
        }), U = X[0], W = X[1][0], e = Ext.max(Ext.pluck(U, "length")), T = [], V, S, R;
        for (V = 0; V < e; V++) {
            T[V] = [];
            if (W) {
                T[V] = W.apply(W, Ext.pluck(U, V))
            } else {
                for (S = 0, R = U.length; S < R; S++) {
                    T[V].push(U[S][V])
                }
            }
        }
        return T
    }, toSentence: function (R, e) {
        var U = R.length, T, S;
        if (U <= 1) {
            return R[0]
        } else {
            T = R.slice(0, U - 1);
            S = R[U - 1];
            return Ext.util.Format.format("{0} {1} {2}", T.join(", "), e || "and", S)
        }
    }, setGlyphFontFamily: function (e) {
        Ext._glyphFontFamily = e
    }, useShims: N})
}());
Ext.application = function (a) {
    var c, d, b;
    if (typeof a === "string") {
        Ext.require(a, function () {
            c = Ext.ClassManager.get(a)
        })
    } else {
        Ext.Loader.setPath(a.name, a.appFolder || "app");
        if (d = a.paths) {
            for (b in d) {
                if (d.hasOwnProperty(b)) {
                    Ext.Loader.setPath(b, d[b])
                }
            }
        }
        a["paths processed"] = true;
        Ext.define(a.name + ".$application", Ext.apply({extend: "Ext.app.Application"}, a), function () {
            c = this
        })
    }
    Ext.onReady(function () {
        Ext.app.Application.instance = new c()
    })
};
(function () {
    Ext.ns("Ext.util");
    Ext.util.Format = {};
    var g = Ext.util.Format, e = /<\/?[^>]+>/gi, c = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, b = /\r?\n/g, d = /[^\d\.]/g, a;
    Ext.apply(g, {thousandSeparator: ",", decimalSeparator: ".", currencyPrecision: 2, currencySign: "$", currencyAtEnd: false, undef: function (h) {
        return h !== undefined ? h : ""
    }, defaultValue: function (i, h) {
        return i !== undefined && i !== "" ? i : h
    }, substr: "ab".substr(-1) != "b" ? function (i, k, h) {
        var j = String(i);
        return(k < 0) ? j.substr(Math.max(j.length + k, 0), h) : j.substr(k, h)
    } : function (i, j, h) {
        return String(i).substr(j, h)
    }, lowercase: function (h) {
        return String(h).toLowerCase()
    }, uppercase: function (h) {
        return String(h).toUpperCase()
    }, usMoney: function (h) {
        return g.currency(h, "$", 2)
    }, currency: function (k, m, j, h) {
        var o = "", n = ",0", l = 0;
        k = k - 0;
        if (k < 0) {
            k = -k;
            o = "-"
        }
        j = Ext.isDefined(j) ? j : g.currencyPrecision;
        n += n + (j > 0 ? "." : "");
        for (; l < j; l++) {
            n += "0"
        }
        k = g.number(k, n);
        if ((h || g.currencyAtEnd) === true) {
            return Ext.String.format("{0}{1}{2}", o, k, m || g.currencySign)
        } else {
            return Ext.String.format("{0}{1}{2}", o, m || g.currencySign, k)
        }
    }, date: function (h, i) {
        if (!h) {
            return""
        }
        if (!Ext.isDate(h)) {
            h = new Date(Date.parse(h))
        }
        return Ext.Date.dateFormat(h, i || Ext.Date.defaultFormat)
    }, dateRenderer: function (h) {
        return function (i) {
            return g.date(i, h)
        }
    }, stripTags: function (h) {
        return !h ? h : String(h).replace(e, "")
    }, stripScripts: function (h) {
        return !h ? h : String(h).replace(c, "")
    }, fileSize: function (h) {
        if (h < 1024) {
            return h + " bytes"
        } else {
            if (h < 1048576) {
                return(Math.round(((h * 10) / 1024)) / 10) + " KB"
            } else {
                return(Math.round(((h * 10) / 1048576)) / 10) + " MB"
            }
        }
    }, math: (function () {
        var h = {};
        return function (j, i) {
            if (!h[i]) {
                h[i] = Ext.functionFactory("v", "return v " + i + ";")
            }
            return h[i](j)
        }
    }()), round: function (j, i) {
        var h = Number(j);
        if (typeof i == "number") {
            i = Math.pow(10, i);
            h = Math.round(j * i) / i
        }
        return h
    }, number: function (y, s) {
        if (!s) {
            return y
        }
        y = Ext.Number.from(y, NaN);
        if (isNaN(y)) {
            return""
        }
        var z = g.thousandSeparator, q = g.decimalSeparator, r = y < 0, k, h, x, w, p, t, o, l, u;
        y = Math.abs(y);
        if (s.substr(s.length - 2) == "/i") {
            if (!a) {
                a = new RegExp("[^\\d\\" + g.decimalSeparator + "]", "g")
            }
            s = s.substr(0, s.length - 2);
            k = s.indexOf(z) != -1;
            h = s.replace(a, "").split(q)
        } else {
            k = s.indexOf(",") != -1;
            h = s.replace(d, "").split(".")
        }
        if (h.length > 2) {
        } else {
            if (h.length > 1) {
                y = Ext.Number.toFixed(y, h[1].length)
            } else {
                y = Ext.Number.toFixed(y, 0)
            }
        }
        x = y.toString();
        h = x.split(".");
        if (k) {
            w = h[0];
            p = [];
            t = w.length;
            o = Math.floor(t / 3);
            l = w.length % 3 || 3;
            for (u = 0; u < t; u += l) {
                if (u !== 0) {
                    l = 3
                }
                p[p.length] = w.substr(u, l);
                o -= 1
            }
            x = p.join(z);
            if (h[1]) {
                x += q + h[1]
            }
        } else {
            if (h[1]) {
                x = h[0] + q + h[1]
            }
        }
        if (r) {
            r = x.replace(/[^1-9]/g, "") !== ""
        }
        return(r ? "-" : "") + s.replace(/[\d,?\.?]+/, x)
    }, numberRenderer: function (h) {
        return function (i) {
            return g.number(i, h)
        }
    }, attributes: function (i) {
        if (typeof i === "object") {
            var h = [], j;
            for (j in i) {
                h.push(j, '="', j === "style" ? Ext.DomHelper.generateStyles(i[j]) : Ext.htmlEncode(i[j]), '"')
            }
            i = h.join("")
        }
        return i || ""
    }, plural: function (h, i, j) {
        return h + " " + (h == 1 ? i : (j ? j : i + "s"))
    }, nl2br: function (h) {
        return Ext.isEmpty(h) ? "" : h.replace(b, "<br/>")
    }, capitalize: Ext.String.capitalize, ellipsis: Ext.String.ellipsis, format: Ext.String.format, htmlDecode: Ext.String.htmlDecode, htmlEncode: Ext.String.htmlEncode, leftPad: Ext.String.leftPad, trim: Ext.String.trim, parseBox: function (i) {
        i = i || 0;
        if (typeof i === "number") {
            return{top: i, right: i, bottom: i, left: i}
        }
        var j = i.split(" "), h = j.length;
        if (h == 1) {
            j[1] = j[2] = j[3] = j[0]
        } else {
            if (h == 2) {
                j[2] = j[0];
                j[3] = j[1]
            } else {
                if (h == 3) {
                    j[3] = j[1]
                }
            }
        }
        return{top: parseInt(j[0], 10) || 0, right: parseInt(j[1], 10) || 0, bottom: parseInt(j[2], 10) || 0, left: parseInt(j[3], 10) || 0}
    }, escapeRegex: function (h) {
        return h.replace(/([\-.*+?\^${}()|\[\]\/\\])/g, "\\$1")
    }})
}());
Ext.define("Ext.util.TaskRunner", {interval: 10, timerId: null, constructor: function (a) {
    var b = this;
    if (typeof a == "number") {
        b.interval = a
    } else {
        if (a) {
            Ext.apply(b, a)
        }
    }
    b.tasks = [];
    b.timerFn = Ext.Function.bind(b.onTick, b)
}, newTask: function (b) {
    var a = new Ext.util.TaskRunner.Task(b);
    a.manager = this;
    return a
}, start: function (a) {
    var c = this, b = new Date().getTime();
    if (!a.pending) {
        c.tasks.push(a);
        a.pending = true
    }
    a.stopped = false;
    a.taskStartTime = b;
    a.taskRunTime = a.fireOnStart !== false ? 0 : a.taskStartTime;
    a.taskRunCount = 0;
    if (!c.firing) {
        if (a.fireOnStart !== false) {
            c.startTimer(0, b)
        } else {
            c.startTimer(a.interval, b)
        }
    }
    return a
}, stop: function (a) {
    if (!a.stopped) {
        a.stopped = true;
        if (a.onStop) {
            a.onStop.call(a.scope || a, a)
        }
    }
    return a
}, stopAll: function () {
    Ext.each(this.tasks, this.stop, this)
}, firing: false, nextExpires: 1e+99, onTick: function () {
    var m = this, e = m.tasks, a = new Date().getTime(), n = 1e+99, k = e.length, c, o, h, b, d, g;
    m.timerId = null;
    m.firing = true;
    for (h = 0; h < k || h < (k = e.length); ++h) {
        b = e[h];
        if (!(g = b.stopped)) {
            c = b.taskRunTime + b.interval;
            if (c <= a) {
                d = 1;
                try {
                    d = b.run.apply(b.scope || b, b.args || [++b.taskRunCount])
                } catch (j) {
                    try {
                        if (b.onError) {
                            d = b.onError.call(b.scope || b, b, j)
                        }
                    } catch (l) {
                    }
                }
                b.taskRunTime = a;
                if (d === false || b.taskRunCount === b.repeat) {
                    m.stop(b);
                    g = true
                } else {
                    g = b.stopped;
                    c = a + b.interval
                }
            }
            if (!g && b.duration && b.duration <= (a - b.taskStartTime)) {
                m.stop(b);
                g = true
            }
        }
        if (g) {
            b.pending = false;
            if (!o) {
                o = e.slice(0, h)
            }
        } else {
            if (o) {
                o.push(b)
            }
            if (n > c) {
                n = c
            }
        }
    }
    if (o) {
        m.tasks = o
    }
    m.firing = false;
    if (m.tasks.length) {
        m.startTimer(n - a, new Date().getTime())
    }
    if (m.fireIdleEvent !== false) {
        Ext.EventManager.idleEvent.fire()
    }
}, startTimer: function (e, c) {
    var d = this, b = c + e, a = d.timerId;
    if (a && d.nextExpires - b > d.interval) {
        clearTimeout(a);
        a = null
    }
    if (!a) {
        if (e < d.interval) {
            e = d.interval
        }
        d.timerId = setTimeout(d.timerFn, e);
        d.nextExpires = b
    }
}}, function () {
    var b = this, a = b.prototype;
    a.destroy = a.stopAll;
    Ext.util.TaskManager = Ext.TaskManager = new b();
    b.Task = new Ext.Class({isTask: true, stopped: true, fireOnStart: false, constructor: function (c) {
        Ext.apply(this, c)
    }, restart: function (c) {
        if (c !== undefined) {
            this.interval = c
        }
        this.manager.start(this)
    }, start: function (c) {
        if (this.stopped) {
            this.restart(c)
        }
    }, stop: function () {
        this.manager.stop(this)
    }});
    a = b.Task.prototype;
    a.destroy = a.stop
});
Ext.define("Ext.util.TaskManager", {extend: Ext.util.TaskRunner, alternateClassName: ["Ext.TaskManager"], singleton: true});
Ext.define("Ext.perf.Accumulator", (function () {
    var c = null, h = Ext.global.chrome, d, b = function () {
        b = function () {
            return new Date().getTime()
        };
        var l, m;
        if (Ext.isChrome && h && h.Interval) {
            l = new h.Interval();
            l.start();
            b = function () {
                return l.microseconds() / 1000
            }
        } else {
            if (window.ActiveXObject) {
                try {
                    m = new ActiveXObject("SenchaToolbox.Toolbox");
                    Ext.senchaToolbox = m;
                    b = function () {
                        return m.milliseconds
                    }
                } catch (n) {
                }
            } else {
                if (Date.now) {
                    b = Date.now
                }
            }
        }
        Ext.perf.getTimestamp = Ext.perf.Accumulator.getTimestamp = b;
        return b()
    };

    function i(m, l) {
        m.sum += l;
        m.min = Math.min(m.min, l);
        m.max = Math.max(m.max, l)
    }

    function e(o) {
        var m = o ? o : (b() - this.time), n = this, l = n.accum;
        ++l.count;
        if (!--l.depth) {
            i(l.total, m)
        }
        i(l.pure, m - n.childTime);
        c = n.parent;
        if (c) {
            ++c.accum.childCount;
            c.childTime += m
        }
    }

    function a() {
        return{min: Number.MAX_VALUE, max: 0, sum: 0}
    }

    function j(m, l) {
        return function () {
            var o = m.enter(), n = l.apply(this, arguments);
            o.leave();
            return n
        }
    }

    function k(l) {
        return Math.round(l * 100) / 100
    }

    function g(n, m, l, p) {
        var o = {avg: 0, min: p.min, max: p.max, sum: 0};
        if (n) {
            l = l || 0;
            o.sum = p.sum - m * l;
            o.avg = o.sum / n
        }
        return o
    }

    return{constructor: function (l) {
        var m = this;
        m.count = m.childCount = m.depth = m.maxDepth = 0;
        m.pure = a();
        m.total = a();
        m.name = l
    }, statics: {getTimestamp: b}, format: function (l) {
        if (!d) {
            d = new Ext.XTemplate(["{name} - {count} call(s)", '<tpl if="count">', '<tpl if="childCount">', " ({childCount} children)", "</tpl>", '<tpl if="depth - 1">', " ({depth} deep)", "</tpl>", '<tpl for="times">', ", {type}: {[this.time(values.sum)]} msec (", "avg={[this.time(values.sum / parent.count)]}", ")", "</tpl>", "</tpl>"].join(""), {time: function (n) {
                return Math.round(n * 100) / 100
            }})
        }
        var m = this.getData(l);
        m.name = this.name;
        m.pure.type = "Pure";
        m.total.type = "Total";
        m.times = [m.pure, m.total];
        return d.apply(m)
    }, getData: function (l) {
        var m = this;
        return{count: m.count, childCount: m.childCount, depth: m.maxDepth, pure: g(m.count, m.childCount, l, m.pure), total: g(m.count, m.childCount, l, m.total)}
    }, enter: function () {
        var l = this, m = {accum: l, leave: e, childTime: 0, parent: c};
        ++l.depth;
        if (l.maxDepth < l.depth) {
            l.maxDepth = l.depth
        }
        c = m;
        m.time = b();
        return m
    }, monitor: function (n, m, l) {
        var o = this.enter();
        if (l) {
            n.apply(m, l)
        } else {
            n.call(m)
        }
        o.leave()
    }, report: function () {
        Ext.log(this.format())
    }, tap: function (t, v) {
        var u = this, o = typeof v == "string" ? [v] : v, s, w, q, p, n, m, l, r;
        r = function () {
            if (typeof t == "string") {
                s = Ext.global;
                p = t.split(".");
                for (q = 0, n = p.length; q < n; ++q) {
                    s = s[p[q]]
                }
            } else {
                s = t
            }
            for (q = 0, n = o.length; q < n; ++q) {
                m = o[q];
                w = m.charAt(0) == "!";
                if (w) {
                    m = m.substring(1)
                } else {
                    w = !(m in s.prototype)
                }
                l = w ? s : s.prototype;
                l[m] = j(u, l[m])
            }
        };
        Ext.ClassManager.onCreated(r, u, t);
        return u
    }}
}()), function () {
    Ext.perf.getTimestamp = this.getTimestamp
});
Ext.define("Ext.perf.Monitor", {singleton: true, alternateClassName: "Ext.Perf", constructor: function () {
    this.accumulators = [];
    this.accumulatorsByName = {}
}, calibrate: function () {
    var b = new Ext.perf.Accumulator("$"), g = b.total, c = Ext.perf.Accumulator.getTimestamp, e = 0, h, a, d;
    d = c();
    do {
        h = b.enter();
        h.leave();
        ++e
    } while (g.sum < 100);
    a = c();
    return(a - d) / e
}, get: function (b) {
    var c = this, a = c.accumulatorsByName[b];
    if (!a) {
        c.accumulatorsByName[b] = a = new Ext.perf.Accumulator(b);
        c.accumulators.push(a)
    }
    return a
}, enter: function (a) {
    return this.get(a).enter()
}, monitor: function (a, c, b) {
    this.get(a).monitor(c, b)
}, report: function () {
    var c = this, b = c.accumulators, a = c.calibrate();
    b.sort(function (e, d) {
        return(e.name < d.name) ? -1 : ((d.name < e.name) ? 1 : 0)
    });
    c.updateGC();
    Ext.log("Calibration: " + Math.round(a * 100) / 100 + " msec/sample");
    Ext.each(b, function (d) {
        Ext.log(d.format(a))
    })
}, getData: function (c) {
    var b = {}, a = this.accumulators;
    Ext.each(a, function (d) {
        if (c || d.count) {
            b[d.name] = d.getData()
        }
    });
    return b
}, reset: function () {
    Ext.each(this.accumulators, function (a) {
        var b = a;
        b.count = b.childCount = b.depth = b.maxDepth = 0;
        b.pure = {min: Number.MAX_VALUE, max: 0, sum: 0};
        b.total = {min: Number.MAX_VALUE, max: 0, sum: 0}
    })
}, updateGC: function () {
    var a = this.accumulatorsByName.GC, b = Ext.senchaToolbox, c;
    if (a) {
        a.count = b.garbageCollectionCounter || 0;
        if (a.count) {
            c = a.pure;
            a.total.sum = c.sum = b.garbageCollectionMilliseconds;
            c.min = c.max = c.sum / a.count;
            c = a.total;
            c.min = c.max = c.sum / a.count
        }
    }
}, watchGC: function () {
    Ext.perf.getTimestamp();
    var a = Ext.senchaToolbox;
    if (a) {
        this.get("GC");
        a.watchGarbageCollector(false)
    }
}, setup: function (c) {
    if (!c) {
        c = {render: {"Ext.AbstractComponent": "render"}, layout: {"Ext.layout.Context": "run"}}
    }
    this.currentConfig = c;
    var d, g, b, e, a;
    for (d in c) {
        if (c.hasOwnProperty(d)) {
            g = c[d];
            b = Ext.Perf.get(d);
            for (e in g) {
                if (g.hasOwnProperty(e)) {
                    a = g[e];
                    b.tap(e, a)
                }
            }
        }
    }
    this.watchGC()
}});
Ext.is = {init: function (b) {
    var c = this.platforms, e = c.length, d, a;
    b = b || window.navigator;
    for (d = 0; d < e; d++) {
        a = c[d];
        this[a.identity] = a.regex.test(b[a.property])
    }
    this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
    this.Tablet = this.iPad;
    this.Phone = !this.Desktop && !this.Tablet;
    this.iOS = this.iPhone || this.iPad || this.iPod;
    this.Standalone = !!window.navigator.standalone
}, platforms: [
    {property: "platform", regex: /iPhone/i, identity: "iPhone"},
    {property: "platform", regex: /iPod/i, identity: "iPod"},
    {property: "userAgent", regex: /iPad/i, identity: "iPad"},
    {property: "userAgent", regex: /Blackberry/i, identity: "Blackberry"},
    {property: "userAgent", regex: /Android/i, identity: "Android"},
    {property: "platform", regex: /Mac/i, identity: "Mac"},
    {property: "platform", regex: /Win/i, identity: "Windows"},
    {property: "platform", regex: /Linux/i, identity: "Linux"}
]};
Ext.is.init();
(function () {
    var a = function (g, e) {
        var d = g.ownerDocument.defaultView, h = (d ? d.getComputedStyle(g, null) : g.currentStyle) || g.style;
        return h[e]
    }, c = {"IE6-quirks": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0], "IE6-strict": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], "IE7-quirks": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0], "IE7-strict": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0], "IE8-quirks": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0], "IE8-strict": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0], "IE9-quirks": [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0], "IE9-strict": [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], "IE10-quirks": [1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0], "IE10-strict": [1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0]};

    function b() {
        var d = Ext.isIE6 ? "IE6" : Ext.isIE7 ? "IE7" : Ext.isIE8 ? "IE8" : Ext.isIE9 ? "IE9" : Ext.isIE10 ? "IE10" : "";
        return d ? d + (Ext.isStrict ? "-strict" : "-quirks") : ""
    }

    Ext.supports = {init: function () {
        var k = this, o = document, i = k.toRun || k.tests, h = i.length, d = h && Ext.isReady && o.createElement("div"), e = [], l = b(), j, g, m;
        if (d) {
            d.innerHTML = ['<div style="height:30px;width:50px;">', '<div style="height:20px;width:20px;"></div>', "</div>", '<div style="width: 200px; height: 200px; position: relative; padding: 5px;">', '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>', "</div>", '<div style="position: absolute; left: 10%; top: 10%;"></div>', '<div style="float:left; background-color:transparent;"></div>'].join("");
            o.body.appendChild(d)
        }
        g = c[l];
        while (h--) {
            j = i[h];
            m = g && g[h];
            if (m !== undefined) {
                k[j.identity] = m
            } else {
                if (d || j.early) {
                    k[j.identity] = j.fn.call(k, o, d)
                } else {
                    e.push(j)
                }
            }
        }
        if (d) {
            o.body.removeChild(d)
        }
        k.toRun = e
    }, PointerEvents: "pointerEvents" in document.documentElement.style, LocalStorage: (function () {
        try {
            return"localStorage" in window && window.localStorage !== null
        } catch (d) {
            return false
        }
    })(), CSS3BoxShadow: "boxShadow" in document.documentElement.style || "WebkitBoxShadow" in document.documentElement.style || "MozBoxShadow" in document.documentElement.style, ClassList: !!document.documentElement.classList, OrientationChange: ((typeof window.orientation != "undefined") && ("onorientationchange" in window)), DeviceMotion: ("ondevicemotion" in window), Touch: ("ontouchstart" in window) && (!Ext.is.Desktop), TimeoutActualLateness: (function () {
        setTimeout(function () {
            Ext.supports.TimeoutActualLateness = arguments.length !== 0
        }, 0)
    }()), tests: [
        {identity: "Transitions", fn: function (k, m) {
            var j = ["webkit", "Moz", "o", "ms", "khtml"], l = "TransitionEnd", d = [j[0] + l, "transitionend", j[2] + l, j[3] + l, j[4] + l], h = j.length, g = 0, e = false;
            for (; g < h; g++) {
                if (a(m, j[g] + "TransitionProperty")) {
                    Ext.supports.CSS3Prefix = j[g];
                    Ext.supports.CSS3TransitionEnd = d[g];
                    e = true;
                    break
                }
            }
            return e
        }},
        {identity: "RightMargin", fn: function (e, g) {
            var d = e.defaultView;
            return !(d && d.getComputedStyle(g.firstChild.firstChild, null).marginRight != "0px")
        }},
        {identity: "DisplayChangeInputSelectionBug", early: true, fn: function () {
            var d = Ext.webKitVersion;
            return 0 < d && d < 533
        }},
        {identity: "DisplayChangeTextAreaSelectionBug", early: true, fn: function () {
            var d = Ext.webKitVersion;
            return 0 < d && d < 534.24
        }},
        {identity: "TransparentColor", fn: function (e, g, d) {
            d = e.defaultView;
            return !(d && d.getComputedStyle(g.lastChild, null).backgroundColor != "transparent")
        }},
        {identity: "ComputedStyle", fn: function (e, g, d) {
            d = e.defaultView;
            return d && d.getComputedStyle
        }},
        {identity: "Svg", fn: function (d) {
            return !!d.createElementNS && !!d.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
        }},
        {identity: "Canvas", fn: function (d) {
            return !!d.createElement("canvas").getContext
        }},
        {identity: "Vml", fn: function (e) {
            var g = e.createElement("div");
            g.innerHTML = "<!--[if vml]><br/><br/><![endif]-->";
            return(g.childNodes.length == 2)
        }},
        {identity: "Float", fn: function (d, e) {
            return !!e.lastChild.style.cssFloat
        }},
        {identity: "AudioTag", fn: function (d) {
            return !!d.createElement("audio").canPlayType
        }},
        {identity: "History", fn: function () {
            var d = window.history;
            return !!(d && d.pushState)
        }},
        {identity: "CSS3DTransform", fn: function () {
            return(typeof WebKitCSSMatrix != "undefined" && new WebKitCSSMatrix().hasOwnProperty("m41"))
        }},
        {identity: "CSS3LinearGradient", fn: function (j, d) {
            var l = "background-image:", k = "-webkit-gradient(linear, left top, right bottom, from(black), to(white))", i = "linear-gradient(left top, black, white)", h = "-moz-" + i, e = "-ms-" + i, g = "-o-" + i, m = [l + k, l + i, l + h, l + e, l + g];
            d.style.cssText = m.join(";");
            return(("" + d.style.backgroundImage).indexOf("gradient") !== -1) && !Ext.isIE9
        }},
        {identity: "CSS3BorderRadius", fn: function (h, j) {
            var e = ["borderRadius", "BorderRadius", "MozBorderRadius", "WebkitBorderRadius", "OBorderRadius", "KhtmlBorderRadius"], g = false, d;
            for (d = 0; d < e.length; d++) {
                if (document.body.style[e[d]] !== undefined) {
                    return true
                }
            }
            return g
        }},
        {identity: "GeoLocation", fn: function () {
            return(typeof navigator != "undefined" && "geolocation" in navigator) || (typeof google != "undefined" && typeof google.gears != "undefined")
        }},
        {identity: "MouseEnterLeave", fn: function (d, e) {
            return("onmouseenter" in e && "onmouseleave" in e)
        }},
        {identity: "MouseWheel", fn: function (d, e) {
            return("onmousewheel" in e)
        }},
        {identity: "Opacity", fn: function (d, e) {
            if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
                return false
            }
            e.firstChild.style.cssText = "opacity:0.73";
            return e.firstChild.style.opacity == "0.73"
        }},
        {identity: "Placeholder", fn: function (d) {
            return"placeholder" in d.createElement("input")
        }},
        {identity: "Direct2DBug", fn: function () {
            return Ext.isString(document.body.style.msTransformOrigin) && Ext.isIE10m
        }},
        {identity: "BoundingClientRect", fn: function (d, e) {
            return Ext.isFunction(e.getBoundingClientRect)
        }},
        {identity: "RotatedBoundingClientRect", fn: function () {
            var d = document.body, e = false, h = document.createElement("div"), g = h.style;
            if (h.getBoundingClientRect) {
                g.WebkitTransform = g.MozTransform = g.OTransform = g.transform = "rotate(90deg)";
                g.width = "100px";
                g.height = "30px";
                d.appendChild(h);
                e = h.getBoundingClientRect().height !== 100;
                d.removeChild(h)
            }
            return e
        }},
        {identity: "IncludePaddingInWidthCalculation", fn: function (d, e) {
            return e.childNodes[1].firstChild.offsetWidth == 210
        }},
        {identity: "IncludePaddingInHeightCalculation", fn: function (d, e) {
            return e.childNodes[1].firstChild.offsetHeight == 210
        }},
        {identity: "ArraySort", fn: function () {
            var d = [1, 2, 3, 4, 5].sort(function () {
                return 0
            });
            return d[0] === 1 && d[1] === 2 && d[2] === 3 && d[3] === 4 && d[4] === 5
        }},
        {identity: "Range", fn: function () {
            return !!document.createRange
        }},
        {identity: "CreateContextualFragment", fn: function () {
            var d = Ext.supports.Range ? document.createRange() : false;
            return d && !!d.createContextualFragment
        }},
        {identity: "WindowOnError", fn: function () {
            return Ext.isIE || Ext.isGecko || Ext.webKitVersion >= 534.16
        }},
        {identity: "TextAreaMaxLength", fn: function () {
            var d = document.createElement("textarea");
            return("maxlength" in d)
        }},
        {identity: "GetPositionPercentage", fn: function (d, e) {
            return a(e.childNodes[2], "left") == "10%"
        }},
        {identity: "PercentageHeightOverflowBug", fn: function (h) {
            var d = false, g, e;
            if (Ext.getScrollbarSize().height) {
                e = h.createElement("div");
                g = e.style;
                g.height = "50px";
                g.width = "50px";
                g.overflow = "auto";
                g.position = "absolute";
                e.innerHTML = ['<div style="display:table;height:100%;">', '<div style="width:51px;"></div>', "</div>"].join("");
                h.body.appendChild(e);
                if (e.firstChild.offsetHeight === 50) {
                    d = true
                }
                h.body.removeChild(e)
            }
            return d
        }},
        {identity: "xOriginBug", fn: function (h, i) {
            i.innerHTML = '<div id="b1" style="height:100px;width:100px;direction:rtl;position:relative;overflow:scroll"><div id="b2" style="position:relative;width:100%;height:20px;"></div><div id="b3" style="position:absolute;width:20px;height:20px;top:0px;right:0px"></div></div>';
            var g = document.getElementById("b1").getBoundingClientRect(), e = document.getElementById("b2").getBoundingClientRect(), d = document.getElementById("b3").getBoundingClientRect();
            return(e.left !== g.left && d.right !== g.right)
        }}
    ]}
}());
Ext.supports.init();
Ext.util.DelayedTask = function (e, d, b, h) {
    var g = this, i, a, c = function () {
        clearInterval(i);
        i = null;
        e.apply(d, b || []);
        Ext.EventManager.idleEvent.fire()
    };
    h = typeof h === "boolean" ? h : true;
    g.delay = function (k, m, l, j) {
        if (h) {
            g.cancel()
        }
        a = k || a, e = m || e;
        d = l || d;
        b = j || b;
        if (!i) {
            i = setInterval(c, a)
        }
    };
    g.cancel = function () {
        if (i) {
            clearInterval(i);
            i = null
        }
    }
};
Ext.define("Ext.util.Event", function () {
    var d = Array.prototype.slice, a = Ext.Array.insert, b = Ext.Array.toArray, c = Ext.util.DelayedTask;
    return{isEvent: true, suspended: 0, noOptions: {}, constructor: function (g, e) {
        this.name = e;
        this.observable = g;
        this.listeners = []
    }, addListener: function (p, r, t) {
        var n = this, o, j, q, e, s, m, h, l, k, g;
        r = r || n.observable;
        if (!n.isListening(p, r)) {
            j = n.createListener(p, r, t);
            if (n.firing) {
                n.listeners = n.listeners.slice(0)
            }
            o = n.listeners;
            l = h = o.length;
            q = t && t.priority;
            s = n._highestNegativePriorityIndex;
            m = (s !== undefined);
            if (q) {
                e = (q < 0);
                if (!e || m) {
                    for (k = (e ? s : 0); k < h; k++) {
                        g = o[k].o ? o[k].o.priority || 0 : 0;
                        if (g < q) {
                            l = k;
                            break
                        }
                    }
                } else {
                    n._highestNegativePriorityIndex = l
                }
            } else {
                if (m) {
                    l = s
                }
            }
            if (!e && l <= s) {
                n._highestNegativePriorityIndex++
            }
            if (l === h) {
                n.listeners[h] = j
            } else {
                a(n.listeners, l, [j])
            }
        }
    }, createListener: function (h, g, k) {
        g = g || this.observable;
        var i = this, j = {fn: h, scope: g, ev: i}, e = h;
        if (k) {
            j.o = k;
            if (k.single) {
                e = i.createSingle(e, j, k, g)
            }
            if (k.target) {
                e = i.createTargeted(e, j, k, g)
            }
            if (k.delay) {
                e = i.createDelayed(e, j, k, g)
            }
            if (k.buffer) {
                e = i.createBuffered(e, j, k, g)
            }
        }
        j.fireFn = e;
        return j
    }, findListener: function (k, j) {
        var h = this.listeners, e = h.length, l, g;
        while (e--) {
            l = h[e];
            if (l) {
                g = l.scope;
                if (l.fn == k && (g == (j || this.observable))) {
                    return e
                }
            }
        }
        return -1
    }, isListening: function (g, e) {
        return this.findListener(g, e) !== -1
    }, removeListener: function (i, h) {
        var j = this, g, m, l, e;
        g = j.findListener(i, h);
        if (g != -1) {
            m = j.listeners[g];
            l = j._highestNegativePriorityIndex;
            if (j.firing) {
                j.listeners = j.listeners.slice(0)
            }
            if (m.task) {
                m.task.cancel();
                delete m.task
            }
            e = m.tasks && m.tasks.length;
            if (e) {
                while (e--) {
                    m.tasks[e].cancel()
                }
                delete m.tasks
            }
            j.listeners.splice(g, 1);
            if (l) {
                if (g < l) {
                    j._highestNegativePriorityIndex--
                } else {
                    if (g === l && g === j.listeners.length) {
                        delete j._highestNegativePriorityIndex
                    }
                }
            }
            return true
        }
        return false
    }, clearListeners: function () {
        var g = this.listeners, e = g.length;
        while (e--) {
            this.removeListener(g[e].fn, g[e].scope)
        }
    }, suspend: function () {
        this.suspended += 1
    }, resume: function () {
        if (this.suspended) {
            this.suspended--
        }
    }, fire: function () {
        var l = this, j = l.listeners, k = j.length, h, g, m, e;
        if (!l.suspended && k > 0) {
            l.firing = true;
            g = arguments.length ? d.call(arguments, 0) : [];
            e = g.length;
            for (h = 0; h < k; h++) {
                m = j[h];
                if (m.o) {
                    g[e] = m.o
                }
                if (m && m.fireFn.apply(m.scope || l.observable, g) === false) {
                    return(l.firing = false)
                }
            }
        }
        l.firing = false;
        return true
    }, createTargeted: function (g, h, i, e) {
        return function () {
            if (i.target === arguments[0]) {
                g.apply(e, arguments)
            }
        }
    }, createBuffered: function (g, h, i, e) {
        h.task = new c();
        return function () {
            h.task.delay(i.buffer, g, e, b(arguments))
        }
    }, createDelayed: function (g, h, i, e) {
        return function () {
            var j = new c();
            if (!h.tasks) {
                h.tasks = []
            }
            h.tasks.push(j);
            j.delay(i.delay || 10, g, e, b(arguments))
        }
    }, createSingle: function (g, h, i, e) {
        return function () {
            var j = h.ev;
            if (j.removeListener(h.fn, e) && j.observable) {
                j.observable.hasListeners[j.name]--
            }
            return g.apply(e, arguments)
        }
    }}
});
Ext.EventManager = new function () {
    var a = this, g = document, e = window, d = /\\/g, b = Ext.baseCSSPrefix, h, c = function () {
        var n = g.body || g.getElementsByTagName("body")[0], j = [b + "body"], i = [], k = Ext.supports.CSS3LinearGradient, m = Ext.supports.CSS3BorderRadius, l;
        if (!n) {
            return false
        }
        l = n.parentNode;
        function o(p) {
            j.push(b + p)
        }

        if (Ext.isIE && Ext.isIE9m) {
            o("ie");
            if (Ext.isIE6) {
                o("ie6")
            } else {
                o("ie7p");
                if (Ext.isIE7) {
                    o("ie7")
                } else {
                    o("ie8p");
                    if (Ext.isIE8) {
                        o("ie8")
                    } else {
                        o("ie9p");
                        if (Ext.isIE9) {
                            o("ie9")
                        }
                    }
                }
            }
            if (Ext.isIE7m) {
                o("ie7m")
            }
            if (Ext.isIE8m) {
                o("ie8m")
            }
            if (Ext.isIE9m) {
                o("ie9m")
            }
            if (Ext.isIE7 || Ext.isIE8) {
                o("ie78")
            }
        }
        if (Ext.isIE10) {
            o("ie10")
        }
        if (Ext.isGecko) {
            o("gecko");
            if (Ext.isGecko3) {
                o("gecko3")
            }
            if (Ext.isGecko4) {
                o("gecko4")
            }
            if (Ext.isGecko5) {
                o("gecko5")
            }
        }
        if (Ext.isOpera) {
            o("opera")
        }
        if (Ext.isWebKit) {
            o("webkit")
        }
        if (Ext.isSafari) {
            o("safari");
            if (Ext.isSafari2) {
                o("safari2")
            }
            if (Ext.isSafari3) {
                o("safari3")
            }
            if (Ext.isSafari4) {
                o("safari4")
            }
            if (Ext.isSafari5) {
                o("safari5")
            }
            if (Ext.isSafari5_0) {
                o("safari5_0")
            }
        }
        if (Ext.isChrome) {
            o("chrome")
        }
        if (Ext.isMac) {
            o("mac")
        }
        if (Ext.isLinux) {
            o("linux")
        }
        if (!m) {
            o("nbr")
        }
        if (!k) {
            o("nlg")
        }
        if (l) {
            if (Ext.isStrict && (Ext.isIE6 || Ext.isIE7)) {
                Ext.isBorderBox = false
            } else {
                Ext.isBorderBox = true
            }
            if (Ext.isBorderBox) {
                i.push(b + "border-box")
            }
            if (Ext.isStrict) {
                i.push(b + "strict")
            } else {
                i.push(b + "quirks")
            }
            Ext.fly(l, "_internal").addCls(i)
        }
        Ext.fly(n, "_internal").addCls(j);
        return true
    };
    Ext.apply(a, {hasBoundOnReady: false, hasFiredReady: false, deferReadyEvent: 1, onReadyChain: [], readyEvent: (function () {
        h = new Ext.util.Event();
        h.fire = function () {
            Ext._beforeReadyTime = Ext._beforeReadyTime || new Date().getTime();
            h.self.prototype.fire.apply(h, arguments);
            Ext._afterReadytime = new Date().getTime()
        };
        return h
    }()), idleEvent: new Ext.util.Event(), isReadyPaused: function () {
        return(/[?&]ext-pauseReadyFire\b/i.test(location.search) && !Ext._continueFireReady)
    }, bindReadyEvent: function () {
        if (a.hasBoundOnReady) {
            return
        }
        if (g.readyState == "complete") {
            a.onReadyEvent({type: g.readyState || "body"})
        } else {
            g.addEventListener("DOMContentLoaded", a.onReadyEvent, false);
            e.addEventListener("load", a.onReadyEvent, false);
            a.hasBoundOnReady = true
        }
    }, onReadyEvent: function (i) {
        if (i && i.type) {
            a.onReadyChain.push(i.type)
        }
        if (a.hasBoundOnReady) {
            g.removeEventListener("DOMContentLoaded", a.onReadyEvent, false);
            e.removeEventListener("load", a.onReadyEvent, false)
        }
        if (!Ext.isReady) {
            a.fireDocReady()
        }
    }, fireDocReady: function () {
        if (!Ext.isReady) {
            Ext._readyTime = new Date().getTime();
            Ext.isReady = true;
            Ext.supports.init();
            a.onWindowUnload();
            h.onReadyChain = a.onReadyChain;
            if (Ext.isNumber(a.deferReadyEvent)) {
                Ext.Function.defer(a.fireReadyEvent, a.deferReadyEvent);
                a.hasDocReadyTimer = true
            } else {
                a.fireReadyEvent()
            }
        }
    }, fireReadyEvent: function () {
        a.hasDocReadyTimer = false;
        a.isFiring = true;
        while (h.listeners.length && !a.isReadyPaused()) {
            h.fire()
        }
        a.isFiring = false;
        a.hasFiredReady = true;
        Ext.EventManager.idleEvent.fire()
    }, onDocumentReady: function (k, j, i) {
        i = i || {};
        i.single = true;
        h.addListener(k, j, i);
        if (!(a.isFiring || a.hasDocReadyTimer)) {
            if (Ext.isReady) {
                a.fireReadyEvent()
            } else {
                a.bindReadyEvent()
            }
        }
    }, stoppedMouseDownEvent: new Ext.util.Event(), propRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|freezeEvent)$/, getId: function (i) {
        var j;
        i = Ext.getDom(i);
        if (i === g || i === e) {
            j = i === g ? Ext.documentId : Ext.windowId
        } else {
            j = Ext.id(i)
        }
        if (!Ext.cache[j]) {
            Ext.addCacheEntry(j, null, i)
        }
        return j
    }, prepareListenerConfig: function (l, j, n) {
        var o = a.propRe, k, m, i;
        for (k in j) {
            if (j.hasOwnProperty(k)) {
                if (!o.test(k)) {
                    m = j[k];
                    if (typeof m == "function") {
                        i = [l, k, m, j.scope, j]
                    } else {
                        i = [l, k, m.fn, m.scope, m]
                    }
                    if (n) {
                        a.removeListener.apply(a, i)
                    } else {
                        a.addListener.apply(a, i)
                    }
                }
            }
        }
    }, mouseEnterLeaveRe: /mouseenter|mouseleave/, normalizeEvent: function (i, j) {
        if (a.mouseEnterLeaveRe.test(i) && !Ext.supports.MouseEnterLeave) {
            if (j) {
                j = Ext.Function.createInterceptor(j, a.contains)
            }
            i = i == "mouseenter" ? "mouseover" : "mouseout"
        } else {
            if (i == "mousewheel" && !Ext.supports.MouseWheel && !Ext.isOpera) {
                i = "DOMMouseScroll"
            }
        }
        return{eventName: i, fn: j}
    }, contains: function (j) {
        j = j.browserEvent || j;
        var i = j.currentTarget, k = a.getRelatedTarget(j);
        if (i && i.firstChild) {
            while (k) {
                if (k === i) {
                    return false
                }
                k = k.parentNode;
                if (k && (k.nodeType != 1)) {
                    k = null
                }
            }
        }
        return true
    }, addListener: function (m, o, q, r, s) {
        if (typeof o !== "string") {
            a.prepareListenerConfig(m, o);
            return
        }
        var l = m.dom || Ext.getDom(m), p, k, i, j, n;
        s = s || {};
        p = a.normalizeEvent(o, q);
        k = a.createListenerWrap(l, o, p.fn, r, s);
        i = a.getEventListenerCache(m.dom ? m : l, o);
        o = p.eventName;
        if (l.attachEvent) {
            j = a.normalizeId(l);
            if (j) {
                n = Ext.cache[j][o];
                if (n && n.firing) {
                    i = a.cloneEventListenerCache(l, o)
                }
            }
        }
        i.push({fn: q, wrap: k, scope: r});
        if (l.attachEvent) {
            if (i.length === 1) {
                j = a.normalizeId(l, true);
                q = Ext.Function.bind(a.handleSingleEvent, a, [j, o], true);
                Ext.cache[j][o] = {firing: false, fn: q};
                l.attachEvent("on" + o, q)
            }
        } else {
            l.addEventListener(o, k, s.capture || false)
        }
        if (l == g && o == "mousedown") {
            a.stoppedMouseDownEvent.addListener(k)
        }
    }, normalizeId: function (j, i) {
        var k;
        if (j === document) {
            k = Ext.documentId
        } else {
            if (j === window) {
                k = Ext.windowId
            } else {
                k = j.id
            }
        }
        if (!k && i) {
            k = a.getId(j)
        }
        return k
    }, handleSingleEvent: function (o, p, l) {
        var m = a.getEventListenerCache(p, l), k = Ext.cache[p][l], j, n;
        if (k.firing) {
            return
        }
        k.firing = true;
        for (n = 0, j = m.length; n < j; ++n) {
            m[n].wrap(o)
        }
        k.firing = false
    }, removeListener: function (s, u, v, x) {
        if (typeof u !== "string") {
            a.prepareListenerConfig(s, u, true);
            return
        }
        var q = Ext.getDom(s), m, n = s.dom ? s : Ext.get(q), k = a.getEventListenerCache(n, u), w = a.normalizeEvent(u).eventName, r = k.length, p, t, o, l;
        while (r--) {
            o = k[r];
            if (o && (!v || o.fn == v) && (!x || o.scope === x)) {
                l = o.wrap;
                if (l.task) {
                    clearTimeout(l.task);
                    delete l.task
                }
                p = l.tasks && l.tasks.length;
                if (p) {
                    while (p--) {
                        clearTimeout(l.tasks[p])
                    }
                    delete l.tasks
                }
                if (q.detachEvent) {
                    m = a.normalizeId(q, true);
                    t = Ext.cache[m][w];
                    if (t && t.firing) {
                        k = a.cloneEventListenerCache(q, w)
                    }
                    if (k.length === 1) {
                        v = t.fn;
                        delete Ext.cache[m][w];
                        q.detachEvent("on" + w, v)
                    }
                } else {
                    q.removeEventListener(w, l, false)
                }
                if (l && q == g && u == "mousedown") {
                    a.stoppedMouseDownEvent.removeListener(l)
                }
                Ext.Array.erase(k, r, 1)
            }
        }
    }, removeAll: function (l) {
        var m = (typeof l === "string") ? l : l.id, j, k, i;
        if (m && (j = Ext.cache[m])) {
            k = j.events;
            for (i in k) {
                if (k.hasOwnProperty(i)) {
                    a.removeListener(l, i)
                }
            }
            j.events = {}
        }
    }, purgeElement: function (m, k) {
        var o = Ext.getDom(m), l = 0, j, n;
        if (k) {
            a.removeListener(m, k)
        } else {
            a.removeAll(m)
        }
        if (o && o.childNodes) {
            n = o.childNodes;
            for (j = n.length; l < j; l++) {
                a.purgeElement(n[l], k)
            }
        }
    }, createListenerWrap: function (p, j, m, l, i) {
        i = i || {};
        var n, o, k = function (r, q) {
            if (!o) {
                n = ["if(!" + Ext.name + ") {return;}"];
                if (i.buffer || i.delay || i.freezeEvent) {
                    if (i.freezeEvent) {
                        n.push("e = X.EventObject.setEvent(e);")
                    }
                    n.push("e = new X.EventObjectImpl(e, " + (i.freezeEvent ? "true" : "false") + ");")
                } else {
                    n.push("e = X.EventObject.setEvent(e);")
                }
                if (i.delegate) {
                    n.push('var result, t = e.getTarget("' + (i.delegate + "").replace(d, "\\\\") + '", this);');
                    n.push("if(!t) {return;}")
                } else {
                    n.push("var t = e.target, result;")
                }
                if (i.target) {
                    n.push("if(e.target !== options.target) {return;}")
                }
                if (i.stopEvent) {
                    n.push("e.stopEvent();")
                } else {
                    if (i.preventDefault) {
                        n.push("e.preventDefault();")
                    }
                    if (i.stopPropagation) {
                        n.push("e.stopPropagation();")
                    }
                }
                if (i.normalized === false) {
                    n.push("e = e.browserEvent;")
                }
                if (i.buffer) {
                    n.push("(wrap.task && clearTimeout(wrap.task));");
                    n.push("wrap.task = setTimeout(function() {")
                }
                if (i.delay) {
                    n.push("wrap.tasks = wrap.tasks || [];");
                    n.push("wrap.tasks.push(setTimeout(function() {")
                }
                n.push("result = fn.call(scope || dom, e, t, options);");
                if (i.single) {
                    n.push("evtMgr.removeListener(dom, ename, fn, scope);")
                }
                if (j !== "mousemove" && j !== "unload") {
                    n.push("if (evtMgr.idleEvent.listeners.length) {");
                    n.push("evtMgr.idleEvent.fire();");
                    n.push("}")
                }
                if (i.delay) {
                    n.push("}, " + i.delay + "));")
                }
                if (i.buffer) {
                    n.push("}, " + i.buffer + ");")
                }
                n.push("return result;");
                o = Ext.cacheableFunctionFactory("e", "options", "fn", "scope", "ename", "dom", "wrap", "args", "X", "evtMgr", n.join("\n"))
            }
            return o.call(p, r, i, m, l, j, p, k, q, Ext, a)
        };
        return k
    }, getEventCache: function (k) {
        var j, i, l;
        if (!k) {
            return[]
        }
        if (k.$cache) {
            j = k.$cache
        } else {
            if (typeof k === "string") {
                l = k
            } else {
                l = a.getId(k)
            }
            j = Ext.cache[l]
        }
        i = j.events || (j.events = {});
        return i
    }, getEventListenerCache: function (k, i) {
        var j = a.getEventCache(k);
        return j[i] || (j[i] = [])
    }, cloneEventListenerCache: function (l, i) {
        var k = a.getEventCache(l), j;
        if (k[i]) {
            j = k[i].slice(0)
        } else {
            j = []
        }
        k[i] = j;
        return j
    }, mouseLeaveRe: /(mouseout|mouseleave)/, mouseEnterRe: /(mouseover|mouseenter)/, stopEvent: function (i) {
        a.stopPropagation(i);
        a.preventDefault(i)
    }, stopPropagation: function (i) {
        i = i.browserEvent || i;
        if (i.stopPropagation) {
            i.stopPropagation()
        } else {
            i.cancelBubble = true
        }
    }, preventDefault: function (i) {
        i = i.browserEvent || i;
        if (i.preventDefault) {
            i.preventDefault()
        } else {
            i.returnValue = false;
            try {
                if (i.ctrlKey || i.keyCode > 111 && i.keyCode < 124) {
                    i.keyCode = -1
                }
            } catch (j) {
            }
        }
    }, getRelatedTarget: function (i) {
        i = i.browserEvent || i;
        var j = i.relatedTarget;
        if (!j) {
            if (a.mouseLeaveRe.test(i.type)) {
                j = i.toElement
            } else {
                if (a.mouseEnterRe.test(i.type)) {
                    j = i.fromElement
                }
            }
        }
        return a.resolveTextNode(j)
    }, getPageX: function (i) {
        return a.getPageXY(i)[0]
    }, getPageY: function (i) {
        return a.getPageXY(i)[1]
    }, getPageXY: function (k) {
        k = k.browserEvent || k;
        var j = k.pageX, m = k.pageY, l = g.documentElement, i = g.body;
        if (!j && j !== 0) {
            j = k.clientX + (l && l.scrollLeft || i && i.scrollLeft || 0) - (l && l.clientLeft || i && i.clientLeft || 0);
            m = k.clientY + (l && l.scrollTop || i && i.scrollTop || 0) - (l && l.clientTop || i && i.clientTop || 0)
        }
        return[j, m]
    }, getTarget: function (i) {
        i = i.browserEvent || i;
        return a.resolveTextNode(i.target || i.srcElement)
    }, resolveTextNode: Ext.isGecko ? function (j) {
        if (j) {
            var i = HTMLElement.prototype.toString.call(j);
            if (i !== "[xpconnect wrapped native prototype]" && i !== "[object XULElement]") {
                return j.nodeType == 3 ? j.parentNode : j
            }
        }
    } : function (i) {
        return i && i.nodeType == 3 ? i.parentNode : i
    }, curWidth: 0, curHeight: 0, onWindowResize: function (l, k, j) {
        var i = a.resizeEvent;
        if (!i) {
            a.resizeEvent = i = new Ext.util.Event();
            a.on(e, "resize", a.fireResize, null, {buffer: 100})
        }
        i.addListener(l, k, j)
    }, fireResize: function () {
        var i = Ext.Element.getViewWidth(), j = Ext.Element.getViewHeight();
        if (a.curHeight != j || a.curWidth != i) {
            a.curHeight = j;
            a.curWidth = i;
            a.resizeEvent.fire(i, j)
        }
    }, removeResizeListener: function (k, j) {
        var i = a.resizeEvent;
        if (i) {
            i.removeListener(k, j)
        }
    }, onWindowUnload: function (l, k, j) {
        var i = a.unloadEvent;
        if (!i) {
            a.unloadEvent = i = new Ext.util.Event();
            a.addListener(e, "unload", a.fireUnload)
        }
        if (l) {
            i.addListener(l, k, j)
        }
    }, fireUnload: function () {
        try {
            g = e = undefined;
            var o, k, m, l, j;
            a.unloadEvent.fire();
            if (Ext.isGecko3) {
                o = Ext.ComponentQuery.query("gridview");
                k = 0;
                m = o.length;
                for (; k < m; k++) {
                    o[k].scrollToTop()
                }
            }
            j = Ext.cache;
            for (l in j) {
                if (j.hasOwnProperty(l)) {
                    a.removeAll(l)
                }
            }
        } catch (n) {
        }
    }, removeUnloadListener: function (k, j) {
        var i = a.unloadEvent;
        if (i) {
            i.removeListener(k, j)
        }
    }, useKeyDown: Ext.isWebKit ? parseInt(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1], 10) >= 525 : !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera), getKeyEvent: function () {
        return a.useKeyDown ? "keydown" : "keypress"
    }});
    if (!("addEventListener" in document) && document.attachEvent) {
        Ext.apply(a, {pollScroll: function () {
            var i = true;
            try {
                document.documentElement.doScroll("left")
            } catch (j) {
                i = false
            }
            if (i && document.body) {
                a.onReadyEvent({type: "doScroll"})
            } else {
                a.scrollTimeout = setTimeout(a.pollScroll, 20)
            }
            return i
        }, scrollTimeout: null, readyStatesRe: /complete/i, checkReadyState: function () {
            var i = document.readyState;
            if (a.readyStatesRe.test(i)) {
                a.onReadyEvent({type: i})
            }
        }, bindReadyEvent: function () {
            var i = true;
            if (a.hasBoundOnReady) {
                return
            }
            try {
                i = window.frameElement === undefined
            } catch (j) {
                i = false
            }
            if (!i || !g.documentElement.doScroll) {
                a.pollScroll = Ext.emptyFn
            }
            if (a.pollScroll() === true) {
                return
            }
            if (g.readyState == "complete") {
                a.onReadyEvent({type: "already " + (g.readyState || "body")})
            } else {
                g.attachEvent("onreadystatechange", a.checkReadyState);
                window.attachEvent("onload", a.onReadyEvent);
                a.hasBoundOnReady = true
            }
        }, onReadyEvent: function (i) {
            if (i && i.type) {
                a.onReadyChain.push(i.type)
            }
            if (a.hasBoundOnReady) {
                document.detachEvent("onreadystatechange", a.checkReadyState);
                window.detachEvent("onload", a.onReadyEvent)
            }
            if (Ext.isNumber(a.scrollTimeout)) {
                clearTimeout(a.scrollTimeout);
                delete a.scrollTimeout
            }
            if (!Ext.isReady) {
                a.fireDocReady()
            }
        }, onReadyChain: []})
    }
    Ext.onReady = function (k, j, i) {
        Ext.Loader.onReady(k, j, true, i)
    };
    Ext.onDocumentReady = a.onDocumentReady;
    a.on = a.addListener;
    a.un = a.removeListener;
    Ext.onReady(c)
};
Ext.define("Ext.util.Observable", function (a) {
    var d = [], e = Array.prototype, g = e.slice, c = Ext.util.Event, b = function (h) {
        if (h instanceof b) {
            return h
        }
        this.observable = h;
        if (arguments[1].isObservable) {
            this.managedListeners = true
        }
        this.args = g.call(arguments, 1)
    };
    b.prototype.destroy = function () {
        this.observable[this.managedListeners ? "mun" : "un"].apply(this.observable, this.args)
    };
    return{statics: {releaseCapture: function (h) {
        h.fireEvent = this.prototype.fireEvent
    }, capture: function (j, i, h) {
        j.fireEvent = Ext.Function.createInterceptor(j.fireEvent, i, h)
    }, observe: function (h, i) {
        if (h) {
            if (!h.isObservable) {
                Ext.applyIf(h, new this());
                this.capture(h.prototype, h.fireEvent, h)
            }
            if (Ext.isObject(i)) {
                h.on(i)
            }
        }
        return h
    }, prepareClass: function (j, i) {
        if (!j.HasListeners) {
            var k = function () {
            }, h = j.superclass.HasListeners || (i && i.HasListeners) || a.HasListeners;
            j.prototype.HasListeners = j.HasListeners = k;
            k.prototype = j.hasListeners = new h()
        }
    }}, isObservable: true, eventsSuspended: 0, constructor: function (h) {
        var i = this;
        Ext.apply(i, h);
        if (!i.hasListeners) {
            i.hasListeners = new i.HasListeners()
        }
        i.events = i.events || {};
        if (i.listeners) {
            i.on(i.listeners);
            i.listeners = null
        }
        if (i.bubbleEvents) {
            i.enableBubble(i.bubbleEvents)
        }
    }, onClassExtended: function (h) {
        if (!h.HasListeners) {
            a.prepareClass(h)
        }
    }, eventOptionsRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|destroyable|vertical|horizontal|freezeEvent|priority)$/, addManagedListener: function (o, k, m, p, q, j) {
        var l = this, n = l.managedListeners = l.managedListeners || [], i, h;
        if (typeof k !== "string") {
            h = arguments.length > 4 ? q : k;
            q = k;
            for (k in q) {
                if (q.hasOwnProperty(k)) {
                    i = q[k];
                    if (!l.eventOptionsRe.test(k)) {
                        l.addManagedListener(o, k, i.fn || i, i.scope || q.scope || p, i.fn ? i : h, true)
                    }
                }
            }
            if (q && q.destroyable) {
                return new b(l, o, q)
            }
        } else {
            if (typeof m === "string") {
                p = p || l;
                m = p[m]
            }
            n.push({item: o, ename: k, fn: m, scope: p, options: q});
            o.on(k, m, p, q);
            if (!j && q && q.destroyable) {
                return new b(l, o, k, m, p)
            }
        }
    }, removeManagedListener: function (p, k, n, q) {
        var m = this, r, j, o, h, l;
        if (typeof k !== "string") {
            r = k;
            for (k in r) {
                if (r.hasOwnProperty(k)) {
                    j = r[k];
                    if (!m.eventOptionsRe.test(k)) {
                        m.removeManagedListener(p, k, j.fn || j, j.scope || r.scope || q)
                    }
                }
            }
        } else {
            o = m.managedListeners ? m.managedListeners.slice() : [];
            for (l = 0, h = o.length; l < h; l++) {
                m.removeManagedListenerItem(false, o[l], p, k, n, q)
            }
        }
    }, fireEvent: function (h) {
        return this.fireEventArgs(h, Array.prototype.slice.call(arguments, 1))
    }, fireEventArgs: function (h, j) {
        h = h.toLowerCase();
        var m = this, k = m.events, l = k && k[h], i = true;
        if (l && m.hasListeners[h]) {
            i = m.continueFireEvent(h, j || d, l.bubble)
        }
        return i
    }, continueFireEvent: function (j, l, i) {
        var n = this, h, m, k = true;
        do {
            if (n.eventsSuspended) {
                if ((h = n.eventQueue)) {
                    h.push([j, l, i])
                }
                return k
            } else {
                m = n.events[j];
                if (m && m != true) {
                    if ((k = m.fire.apply(m, l)) === false) {
                        break
                    }
                }
            }
        } while (i && (n = n.getBubbleParent()));
        return k
    }, getBubbleParent: function () {
        var i = this, h = i.getBubbleTarget && i.getBubbleTarget();
        if (h && h.isObservable) {
            return h
        }
        return null
    }, addListener: function (k, m, l, j) {
        var o = this, i, n, h = 0;
        if (typeof k !== "string") {
            j = k;
            for (k in j) {
                if (j.hasOwnProperty(k)) {
                    i = j[k];
                    if (!o.eventOptionsRe.test(k)) {
                        o.addListener(k, i.fn || i, i.scope || j.scope, i.fn ? i : j)
                    }
                }
            }
            if (j && j.destroyable) {
                return new b(o, j)
            }
        } else {
            k = k.toLowerCase();
            n = o.events[k];
            if (n && n.isEvent) {
                h = n.listeners.length
            } else {
                o.events[k] = n = new c(o, k)
            }
            if (typeof m === "string") {
                l = l || o;
                m = l[m]
            }
            n.addListener(m, l, j);
            if (n.listeners.length !== h) {
                o.hasListeners._incr_(k)
            }
            if (j && j.destroyable) {
                return new b(o, k, m, l, j)
            }
        }
    }, removeListener: function (j, l, k) {
        var n = this, i, m, h;
        if (typeof j !== "string") {
            h = j;
            for (j in h) {
                if (h.hasOwnProperty(j)) {
                    i = h[j];
                    if (!n.eventOptionsRe.test(j)) {
                        n.removeListener(j, i.fn || i, i.scope || h.scope)
                    }
                }
            }
        } else {
            j = j.toLowerCase();
            m = n.events[j];
            if (m && m.isEvent) {
                if (m.removeListener(l, k)) {
                    n.hasListeners._decr_(j)
                }
            }
        }
    }, clearListeners: function () {
        var j = this.events, h = this.hasListeners, k, i;
        for (i in j) {
            if (j.hasOwnProperty(i)) {
                k = j[i];
                if (k.isEvent) {
                    delete h[i];
                    k.clearListeners()
                }
            }
        }
        this.clearManagedListeners()
    }, clearManagedListeners: function () {
        var j = this.managedListeners || [], k = 0, h = j.length;
        for (; k < h; k++) {
            this.removeManagedListenerItem(true, j[k])
        }
        this.managedListeners = []
    }, removeManagedListenerItem: function (i, h, m, j, l, k) {
        if (i || (h.item === m && h.ename === j && (!l || h.fn === l) && (!k || h.scope === k))) {
            h.item.un(h.ename, h.fn, h.scope);
            if (!i) {
                Ext.Array.remove(this.managedListeners, h)
            }
        }
    }, addEvents: function (n) {
        var m = this, l = m.events || (m.events = {}), h, j, k;
        if (typeof n == "string") {
            for (j = arguments, k = j.length; k--;) {
                h = j[k];
                if (!l[h]) {
                    l[h] = true
                }
            }
        } else {
            Ext.applyIf(m.events, n)
        }
    }, hasListener: function (h) {
        return !!this.hasListeners[h.toLowerCase()]
    }, suspendEvents: function (h) {
        this.eventsSuspended += 1;
        if (h && !this.eventQueue) {
            this.eventQueue = []
        }
    }, suspendEvent: function (j) {
        var h = arguments.length, k, l;
        for (k = 0; k < h; k++) {
            l = this.events[arguments[k]];
            if (l && l.suspend) {
                l.suspend()
            }
        }
    }, resumeEvent: function () {
        var h = arguments.length, j, k;
        for (j = 0; j < h; j++) {
            k = this.events[arguments[j]];
            if (k && k.resume) {
                k.resume()
            }
        }
    }, resumeEvents: function () {
        var h = this, k = h.eventQueue, j, i;
        if (h.eventsSuspended && !--h.eventsSuspended) {
            delete h.eventQueue;
            if (k) {
                j = k.length;
                for (i = 0; i < j; i++) {
                    h.continueFireEvent.apply(h, k[i])
                }
            }
        }
    }, relayEvents: function (j, l, o) {
        var n = this, h = l.length, k = 0, m, p = {};
        for (; k < h; k++) {
            m = l[k];
            p[m] = n.createRelayer(o ? o + m : m)
        }
        n.mon(j, p, null, null, undefined);
        return new b(n, j, p)
    }, createRelayer: function (h, i) {
        var j = this;
        return function () {
            return j.fireEventArgs.call(j, h, i ? Array.prototype.slice.apply(arguments, i) : arguments)
        }
    }, enableBubble: function (p) {
        if (p) {
            var n = this, o = (typeof p == "string") ? arguments : p, m = o.length, k = n.events, j, l, h;
            for (h = 0; h < m; ++h) {
                j = o[h].toLowerCase();
                l = k[j];
                if (!l || typeof l == "boolean") {
                    k[j] = l = new c(n, j)
                }
                n.hasListeners._incr_(j);
                l.bubble = true
            }
        }
    }}
}, function () {
    var b = this, e = b.prototype, c = function () {
    }, g = function (h) {
        if (!h.HasListeners) {
            var i = h.prototype;
            b.prepareClass(h, this);
            h.onExtended(function (j) {
                b.prepareClass(j)
            });
            if (i.onClassMixedIn) {
                Ext.override(h, {onClassMixedIn: function (j) {
                    g.call(this, j);
                    this.callParent(arguments)
                }})
            } else {
                i.onClassMixedIn = function (j) {
                    g.call(this, j)
                }
            }
        }
    }, a;
    c.prototype = {_decr_: function (h) {
        if (!--this[h]) {
            delete this[h]
        }
    }, _incr_: function (h) {
        if (this.hasOwnProperty(h)) {
            ++this[h]
        } else {
            this[h] = 1
        }
    }};
    e.HasListeners = b.HasListeners = c;
    b.createAlias({on: "addListener", un: "removeListener", mon: "addManagedListener", mun: "removeManagedListener"});
    b.observeClass = b.observe;
    Ext.globalEvents = a = new b({events: {idle: Ext.EventManager.idleEvent, ready: Ext.EventManager.readyEvent}});
    Ext.on = function () {
        return a.addListener.apply(a, arguments)
    };
    Ext.un = function () {
        return a.removeListener.apply(a, arguments)
    };
    function d(n) {
        var m = (this.methodEvents = this.methodEvents || {})[n], j, i, k, l = this, h;
        if (!m) {
            this.methodEvents[n] = m = {};
            m.originalFn = this[n];
            m.methodName = n;
            m.before = [];
            m.after = [];
            h = function (q, p, o) {
                if ((i = q.apply(p || l, o)) !== undefined) {
                    if (typeof i == "object") {
                        if (i.returnValue !== undefined) {
                            j = i.returnValue
                        } else {
                            j = i
                        }
                        k = !!i.cancel
                    } else {
                        if (i === false) {
                            k = true
                        } else {
                            j = i
                        }
                    }
                }
            };
            this[n] = function () {
                var q = Array.prototype.slice.call(arguments, 0), p, r, o;
                j = i = undefined;
                k = false;
                for (r = 0, o = m.before.length; r < o; r++) {
                    p = m.before[r];
                    h(p.fn, p.scope, q);
                    if (k) {
                        return j
                    }
                }
                if ((i = m.originalFn.apply(l, q)) !== undefined) {
                    j = i
                }
                for (r = 0, o = m.after.length; r < o; r++) {
                    p = m.after[r];
                    h(p.fn, p.scope, q);
                    if (k) {
                        return j
                    }
                }
                return j
            }
        }
        return m
    }

    Ext.apply(e, {onClassMixedIn: g, beforeMethod: function (j, i, h) {
        d.call(this, j).before.push({fn: i, scope: h})
    }, afterMethod: function (j, i, h) {
        d.call(this, j).after.push({fn: i, scope: h})
    }, removeMethodListener: function (n, l, k) {
        var m = this.getMethodEvent(n), j, h;
        for (j = 0, h = m.before.length; j < h; j++) {
            if (m.before[j].fn == l && m.before[j].scope == k) {
                Ext.Array.erase(m.before, j, 1);
                return
            }
        }
        for (j = 0, h = m.after.length; j < h; j++) {
            if (m.after[j].fn == l && m.after[j].scope == k) {
                Ext.Array.erase(m.after, j, 1);
                return
            }
        }
    }, toggleEventLogging: function (h) {
        Ext.util.Observable[h ? "capture" : "releaseCapture"](this, function (i) {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.log(i, arguments)
            }
        })
    }})
});
Ext.define("Ext.EventObjectImpl", {BACKSPACE: 8, TAB: 9, NUM_CENTER: 12, ENTER: 13, RETURN: 13, SHIFT: 16, CTRL: 17, ALT: 18, PAUSE: 19, CAPS_LOCK: 20, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, PRINT_SCREEN: 44, INSERT: 45, DELETE: 46, ZERO: 48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, CONTEXT_MENU: 93, NUM_ZERO: 96, NUM_ONE: 97, NUM_TWO: 98, NUM_THREE: 99, NUM_FOUR: 100, NUM_FIVE: 101, NUM_SIX: 102, NUM_SEVEN: 103, NUM_EIGHT: 104, NUM_NINE: 105, NUM_MULTIPLY: 106, NUM_PLUS: 107, NUM_MINUS: 109, NUM_PERIOD: 110, NUM_DIVISION: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, WHEEL_SCALE: (function () {
    var a;
    if (Ext.isGecko) {
        a = 3
    } else {
        if (Ext.isMac) {
            if (Ext.isSafari && Ext.webKitVersion >= 532) {
                a = 120
            } else {
                a = 12
            }
            a *= 3
        } else {
            a = 120
        }
    }
    return a
}()), clickRe: /(dbl)?click/, safariKeys: {3: 13, 63234: 37, 63235: 39, 63232: 38, 63233: 40, 63276: 33, 63277: 34, 63272: 46, 63273: 36, 63275: 35}, btnMap: Ext.isIE ? {1: 0, 4: 1, 2: 2} : {0: 0, 1: 1, 2: 2}, constructor: function (a, b) {
    if (a) {
        this.setEvent(a.browserEvent || a, b)
    }
}, setEvent: function (d, e) {
    var c = this, b, a;
    if (d === c || (d && d.browserEvent)) {
        return d
    }
    c.browserEvent = d;
    if (d) {
        b = d.button ? c.btnMap[d.button] : (d.which ? d.which - 1 : -1);
        if (c.clickRe.test(d.type) && b == -1) {
            b = 0
        }
        a = {type: d.type, button: b, shiftKey: d.shiftKey, ctrlKey: d.ctrlKey || d.metaKey || false, altKey: d.altKey, keyCode: d.keyCode, charCode: d.charCode, target: Ext.EventManager.getTarget(d), relatedTarget: Ext.EventManager.getRelatedTarget(d), currentTarget: d.currentTarget, xy: (e ? c.getXY() : null)}
    } else {
        a = {button: -1, shiftKey: false, ctrlKey: false, altKey: false, keyCode: 0, charCode: 0, target: null, xy: [0, 0]}
    }
    Ext.apply(c, a);
    return c
}, stopEvent: function () {
    this.stopPropagation();
    this.preventDefault()
}, preventDefault: function () {
    if (this.browserEvent) {
        Ext.EventManager.preventDefault(this.browserEvent)
    }
}, stopPropagation: function () {
    var a = this.browserEvent;
    if (a) {
        if (a.type == "mousedown") {
            Ext.EventManager.stoppedMouseDownEvent.fire(this)
        }
        Ext.EventManager.stopPropagation(a)
    }
}, getCharCode: function () {
    return this.charCode || this.keyCode
}, getKey: function () {
    return this.normalizeKey(this.keyCode || this.charCode)
}, normalizeKey: function (a) {
    return Ext.isWebKit ? (this.safariKeys[a] || a) : a
}, getPageX: function () {
    return this.getX()
}, getPageY: function () {
    return this.getY()
}, getX: function () {
    return this.getXY()[0]
}, getY: function () {
    return this.getXY()[1]
}, getXY: function () {
    if (!this.xy) {
        this.xy = Ext.EventManager.getPageXY(this.browserEvent)
    }
    return this.xy
}, getTarget: function (b, c, a) {
    if (b) {
        return Ext.fly(this.target).findParent(b, c, a)
    }
    return a ? Ext.get(this.target) : this.target
}, getRelatedTarget: function (b, c, a) {
    if (b && this.relatedTarget) {
        return Ext.fly(this.relatedTarget).findParent(b, c, a)
    }
    return a ? Ext.get(this.relatedTarget) : this.relatedTarget
}, correctWheelDelta: function (c) {
    var b = this.WHEEL_SCALE, a = Math.round(c / b);
    if (!a && c) {
        a = (c < 0) ? -1 : 1
    }
    return a
}, getWheelDeltas: function () {
    var d = this, c = d.browserEvent, b = 0, a = 0;
    if (Ext.isDefined(c.wheelDeltaX)) {
        b = c.wheelDeltaX;
        a = c.wheelDeltaY
    } else {
        if (c.wheelDelta) {
            a = c.wheelDelta
        } else {
            if (c.detail) {
                a = -c.detail;
                if (a > 100) {
                    a = 3
                } else {
                    if (a < -100) {
                        a = -3
                    }
                }
                if (Ext.isDefined(c.axis) && c.axis === c.HORIZONTAL_AXIS) {
                    b = a;
                    a = 0
                }
            }
        }
    }
    return{x: d.correctWheelDelta(b), y: d.correctWheelDelta(a)}
}, getWheelDelta: function () {
    var a = this.getWheelDeltas();
    return a.y
}, within: function (d, e, b) {
    if (d) {
        var c = e ? this.getRelatedTarget() : this.getTarget(), a;
        if (c) {
            a = Ext.fly(d).contains(c);
            if (!a && b) {
                a = c == Ext.getDom(d)
            }
            return a
        }
    }
    return false
}, isNavKeyPress: function () {
    var b = this, a = this.normalizeKey(b.keyCode);
    return(a >= 33 && a <= 40) || a == b.RETURN || a == b.TAB || a == b.ESC
}, isSpecialKey: function () {
    var a = this.normalizeKey(this.keyCode);
    return(this.type == "keypress" && this.ctrlKey) || this.isNavKeyPress() || (a == this.BACKSPACE) || (a >= 16 && a <= 20) || (a >= 44 && a <= 46)
}, getPoint: function () {
    var a = this.getXY();
    return new Ext.util.Point(a[0], a[1])
}, hasModifier: function () {
    return this.ctrlKey || this.altKey || this.shiftKey || this.metaKey
}, injectEvent: (function () {
    var d, e = {}, c;
    if (!Ext.isIE && document.createEvent) {
        d = {createHtmlEvent: function (k, i, h, g) {
            var j = k.createEvent("HTMLEvents");
            j.initEvent(i, h, g);
            return j
        }, createMouseEvent: function (u, s, m, l, o, k, i, j, g, r, q, n, p) {
            var h = u.createEvent("MouseEvents"), t = u.defaultView || window;
            if (h.initMouseEvent) {
                h.initMouseEvent(s, m, l, t, o, k, i, k, i, j, g, r, q, n, p)
            } else {
                h = u.createEvent("UIEvents");
                h.initEvent(s, m, l);
                h.view = t;
                h.detail = o;
                h.screenX = k;
                h.screenY = i;
                h.clientX = k;
                h.clientY = i;
                h.ctrlKey = j;
                h.altKey = g;
                h.metaKey = q;
                h.shiftKey = r;
                h.button = n;
                h.relatedTarget = p
            }
            return h
        }, createUIEvent: function (m, k, i, h, j) {
            var l = m.createEvent("UIEvents"), g = m.defaultView || window;
            l.initUIEvent(k, i, h, g, j);
            return l
        }, fireEvent: function (i, g, h) {
            i.dispatchEvent(h)
        }, fixTarget: function (g) {
            if (g == window && !g.dispatchEvent) {
                return document
            }
            return g
        }}
    } else {
        if (document.createEventObject) {
            c = {0: 1, 1: 4, 2: 2};
            d = {createHtmlEvent: function (k, i, h, g) {
                var j = k.createEventObject();
                j.bubbles = h;
                j.cancelable = g;
                return j
            }, createMouseEvent: function (t, s, m, l, o, k, i, j, g, r, q, n, p) {
                var h = t.createEventObject();
                h.bubbles = m;
                h.cancelable = l;
                h.detail = o;
                h.screenX = k;
                h.screenY = i;
                h.clientX = k;
                h.clientY = i;
                h.ctrlKey = j;
                h.altKey = g;
                h.shiftKey = r;
                h.metaKey = q;
                h.button = c[n] || n;
                h.relatedTarget = p;
                return h
            }, createUIEvent: function (l, j, h, g, i) {
                var k = l.createEventObject();
                k.bubbles = h;
                k.cancelable = g;
                return k
            }, fireEvent: function (i, g, h) {
                i.fireEvent("on" + g, h)
            }, fixTarget: function (g) {
                if (g == document) {
                    return document.documentElement
                }
                return g
            }}
        }
    }
    Ext.Object.each({load: [false, false], unload: [false, false], select: [true, false], change: [true, false], submit: [true, true], reset: [true, false], resize: [true, false], scroll: [true, false]}, function (i, j) {
        var h = j[0], g = j[1];
        e[i] = function (m, k) {
            var l = d.createHtmlEvent(i, h, g);
            d.fireEvent(m, i, l)
        }
    });
    function b(i, h) {
        var g = (i != "mousemove");
        return function (m, j) {
            var l = j.getXY(), k = d.createMouseEvent(m.ownerDocument, i, true, g, h, l[0], l[1], j.ctrlKey, j.altKey, j.shiftKey, j.metaKey, j.button, j.relatedTarget);
            d.fireEvent(m, i, k)
        }
    }

    Ext.each(["click", "dblclick", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout"], function (g) {
        e[g] = b(g, 1)
    });
    Ext.Object.each({focusin: [true, false], focusout: [true, false], activate: [true, true], focus: [false, false], blur: [false, false]}, function (i, j) {
        var h = j[0], g = j[1];
        e[i] = function (m, k) {
            var l = d.createUIEvent(m.ownerDocument, i, h, g, 1);
            d.fireEvent(m, i, l)
        }
    });
    if (!d) {
        e = {};
        d = {fixTarget: Ext.identityFn}
    }
    function a(h, g) {
    }

    return function (j) {
        var i = this, h = e[i.type] || a, g = j ? (j.dom || j) : i.getTarget();
        g = d.fixTarget(g);
        h(g, i)
    }
}())}, function () {
    Ext.EventObject = new Ext.EventObjectImpl()
});
Ext.define("Ext.dom.AbstractQuery", {select: function (k, b) {
    var h = [], d, g, e, c, a;
    b = b || document;
    if (typeof b == "string") {
        b = document.getElementById(b)
    }
    k = k.split(",");
    for (g = 0, c = k.length; g < c; g++) {
        if (typeof k[g] == "string") {
            if (typeof k[g][0] == "@") {
                d = b.getAttributeNode(k[g].substring(1));
                h.push(d)
            } else {
                d = b.querySelectorAll(k[g]);
                for (e = 0, a = d.length; e < a; e++) {
                    h.push(d[e])
                }
            }
        }
    }
    return h
}, selectNode: function (b, a) {
    return this.select(b, a)[0]
}, is: function (a, b) {
    if (typeof a == "string") {
        a = document.getElementById(a)
    }
    return this.select(b).indexOf(a) !== -1
}});
Ext.define("Ext.dom.AbstractHelper", {emptyTags: /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i, confRe: /^(?:tag|children|cn|html|tpl|tplData)$/i, endRe: /end/i, styleSepRe: /\s*(?::|;)\s*/, attributeTransform: {cls: "class", htmlFor: "for"}, closeTags: {}, decamelizeName: (function () {
    var c = /([a-z])([A-Z])/g, b = {};

    function a(d, g, e) {
        return g + "-" + e.toLowerCase()
    }

    return function (d) {
        return b[d] || (b[d] = d.replace(c, a))
    }
}()), generateMarkup: function (j, b) {
    var h = this, g = typeof j, e, a, k, d, c;
    if (g == "string" || g == "number") {
        b.push(j)
    } else {
        if (Ext.isArray(j)) {
            for (d = 0; d < j.length; d++) {
                if (j[d]) {
                    h.generateMarkup(j[d], b)
                }
            }
        } else {
            k = j.tag || "div";
            b.push("<", k);
            for (e in j) {
                if (j.hasOwnProperty(e)) {
                    a = j[e];
                    if (!h.confRe.test(e)) {
                        if (typeof a == "object") {
                            b.push(" ", e, '="');
                            h.generateStyles(a, b).push('"')
                        } else {
                            b.push(" ", h.attributeTransform[e] || e, '="', a, '"')
                        }
                    }
                }
            }
            if (h.emptyTags.test(k)) {
                b.push("/>")
            } else {
                b.push(">");
                if ((a = j.tpl)) {
                    a.applyOut(j.tplData, b)
                }
                if ((a = j.html)) {
                    b.push(a)
                }
                if ((a = j.cn || j.children)) {
                    h.generateMarkup(a, b)
                }
                c = h.closeTags;
                b.push(c[k] || (c[k] = "</" + k + ">"))
            }
        }
    }
    return b
}, generateStyles: function (e, c) {
    var b = c || [], d;
    for (d in e) {
        if (e.hasOwnProperty(d)) {
            b.push(this.decamelizeName(d), ":", e[d], ";")
        }
    }
    return c || b.join("")
}, markup: function (a) {
    if (typeof a == "string") {
        return a
    }
    var b = this.generateMarkup(a, []);
    return b.join("")
}, applyStyles: function (c, d) {
    if (d) {
        var b = 0, a;
        c = Ext.fly(c, "_applyStyles");
        if (typeof d == "function") {
            d = d.call()
        }
        if (typeof d == "string") {
            d = Ext.util.Format.trim(d).split(this.styleSepRe);
            for (a = d.length; b < a;) {
                c.setStyle(d[b++], d[b++])
            }
        } else {
            if (Ext.isObject(d)) {
                c.setStyle(d)
            }
        }
    }
}, insertHtml: function (c, g, d) {
    var h = {}, a, b, i, e;
    c = c.toLowerCase();
    h.beforebegin = ["BeforeBegin", "previousSibling"];
    h.afterend = ["AfterEnd", "nextSibling"];
    b = g.ownerDocument.createRange();
    a = "setStart" + (this.endRe.test(c) ? "After" : "Before");
    if (h[c]) {
        b[a](g);
        i = b.createContextualFragment(d);
        g.parentNode.insertBefore(i, c == "beforebegin" ? g : g.nextSibling);
        return g[(c == "beforebegin" ? "previous" : "next") + "Sibling"]
    } else {
        e = (c == "afterbegin" ? "first" : "last") + "Child";
        if (g.firstChild) {
            b[a](g[e]);
            i = b.createContextualFragment(d);
            if (c == "afterbegin") {
                g.insertBefore(i, g.firstChild)
            } else {
                g.appendChild(i)
            }
        } else {
            g.innerHTML = d
        }
        return g[e]
    }
    throw'Illegal insertion point -> "' + c + '"'
}, insertBefore: function (a, c, b) {
    return this.doInsert(a, c, b, "beforebegin")
}, insertAfter: function (a, c, b) {
    return this.doInsert(a, c, b, "afterend", "nextSibling")
}, insertFirst: function (a, c, b) {
    return this.doInsert(a, c, b, "afterbegin", "firstChild")
}, append: function (a, c, b) {
    return this.doInsert(a, c, b, "beforeend", "", true)
}, overwrite: function (a, c, b) {
    a = Ext.getDom(a);
    a.innerHTML = this.markup(c);
    return b ? Ext.get(a.firstChild) : a.firstChild
}, doInsert: function (d, g, e, h, c, a) {
    var b = this.insertHtml(h, Ext.getDom(d), this.markup(g));
    return e ? Ext.get(b, true) : b
}});
Ext.define("Ext.dom.AbstractElement_static", {override: "Ext.dom.AbstractElement", inheritableStatics: {unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i, camelRe: /(-[a-z])/gi, msRe: /^-ms-/, cssRe: /([a-z0-9\-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*)?;?/gi, opacityRe: /alpha\(opacity=(.*)\)/i, propertyCache: {}, defaultUnit: "px", borders: {l: "border-left-width", r: "border-right-width", t: "border-top-width", b: "border-bottom-width"}, paddings: {l: "padding-left", r: "padding-right", t: "padding-top", b: "padding-bottom"}, margins: {l: "margin-left", r: "margin-right", t: "margin-top", b: "margin-bottom"}, addUnits: function (b, a) {
    if (typeof b == "number") {
        return b + (a || this.defaultUnit || "px")
    }
    if (b === "" || b == "auto" || b === undefined || b === null) {
        return b || ""
    }
    if (!this.unitRe.test(b)) {
        return b || ""
    }
    return b
}, isAncestor: function (b, d) {
    var a = false;
    b = Ext.getDom(b);
    d = Ext.getDom(d);
    if (b && d) {
        if (b.contains) {
            return b.contains(d)
        } else {
            if (b.compareDocumentPosition) {
                return !!(b.compareDocumentPosition(d) & 16)
            } else {
                while ((d = d.parentNode)) {
                    a = d == b || a
                }
            }
        }
    }
    return a
}, parseBox: function (c) {
    c = c || 0;
    var a = typeof c, d, b;
    if (a === "number") {
        return{top: c, right: c, bottom: c, left: c}
    } else {
        if (a !== "string") {
            return c
        }
    }
    d = c.split(" ");
    b = d.length;
    if (b == 1) {
        d[1] = d[2] = d[3] = d[0]
    } else {
        if (b == 2) {
            d[2] = d[0];
            d[3] = d[1]
        } else {
            if (b == 3) {
                d[3] = d[1]
            }
        }
    }
    return{top: parseFloat(d[0]) || 0, right: parseFloat(d[1]) || 0, bottom: parseFloat(d[2]) || 0, left: parseFloat(d[3]) || 0}
}, unitizeBox: function (g, e) {
    var d = this.addUnits, c = this.parseBox(g);
    return d(c.top, e) + " " + d(c.right, e) + " " + d(c.bottom, e) + " " + d(c.left, e)
}, camelReplaceFn: function (b, c) {
    return c.charAt(1).toUpperCase()
}, normalize: function (a) {
    if (a == "float") {
        a = Ext.supports.Float ? "cssFloat" : "styleFloat"
    }
    return this.propertyCache[a] || (this.propertyCache[a] = a.replace(this.msRe, "ms-").replace(this.camelRe, this.camelReplaceFn))
}, getDocumentHeight: function () {
    return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight())
}, getDocumentWidth: function () {
    return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth())
}, getViewportHeight: function () {
    return window.innerHeight
}, getViewportWidth: function () {
    return window.innerWidth
}, getViewSize: function () {
    return{width: window.innerWidth, height: window.innerHeight}
}, getOrientation: function () {
    if (Ext.supports.OrientationChange) {
        return(window.orientation == 0) ? "portrait" : "landscape"
    }
    return(window.innerHeight > window.innerWidth) ? "portrait" : "landscape"
}, fromPoint: function (a, b) {
    return Ext.get(document.elementFromPoint(a, b))
}, parseStyles: function (c) {
    var a = {}, b = this.cssRe, d;
    if (c) {
        b.lastIndex = 0;
        while ((d = b.exec(c))) {
            a[d[1]] = d[2] || ""
        }
    }
    return a
}}}, function () {
    var c = document, b = null, a = c.compatMode == "CSS1Compat";
    if (!("activeElement" in c) && c.addEventListener) {
        c.addEventListener("focus", function (e) {
            if (e && e.target) {
                b = (e.target == c) ? null : e.target
            }
        }, true)
    }
    function d(g, h, e) {
        return function () {
            g.selectionStart = h;
            g.selectionEnd = e
        }
    }

    this.addInheritableStatics({getActiveElement: function () {
        var h;
        try {
            h = c.activeElement
        } catch (g) {
        }
        h = h || b;
        if (!h) {
            h = b = document.body
        }
        return h
    }, getRightMarginFixCleaner: function (k) {
        var h = Ext.supports, i = h.DisplayChangeInputSelectionBug, j = h.DisplayChangeTextAreaSelectionBug, l, e, m, g;
        if (i || j) {
            l = c.activeElement || b;
            e = l && l.tagName;
            if ((j && e == "TEXTAREA") || (i && e == "INPUT" && l.type == "text")) {
                if (Ext.dom.Element.isAncestor(k, l)) {
                    m = l.selectionStart;
                    g = l.selectionEnd;
                    if (Ext.isNumber(m) && Ext.isNumber(g)) {
                        return d(l, m, g)
                    }
                }
            }
        }
        return Ext.emptyFn
    }, getViewWidth: function (e) {
        return e ? Ext.dom.Element.getDocumentWidth() : Ext.dom.Element.getViewportWidth()
    }, getViewHeight: function (e) {
        return e ? Ext.dom.Element.getDocumentHeight() : Ext.dom.Element.getViewportHeight()
    }, getDocumentHeight: function () {
        return Math.max(!a ? c.body.scrollHeight : c.documentElement.scrollHeight, Ext.dom.Element.getViewportHeight())
    }, getDocumentWidth: function () {
        return Math.max(!a ? c.body.scrollWidth : c.documentElement.scrollWidth, Ext.dom.Element.getViewportWidth())
    }, getViewportHeight: function () {
        return Ext.isIE9m ? (Ext.isStrict ? c.documentElement.clientHeight : c.body.clientHeight) : self.innerHeight
    }, getViewportWidth: function () {
        return(!Ext.isStrict && !Ext.isOpera) ? c.body.clientWidth : Ext.isIE9m ? c.documentElement.clientWidth : self.innerWidth
    }, serializeForm: function (i) {
        var j = i.elements || (document.forms[i] || Ext.getDom(i)).elements, t = false, s = encodeURIComponent, m = "", l = j.length, n, g, r, v, u, p, k, q, h;
        for (p = 0; p < l; p++) {
            n = j[p];
            g = n.name;
            r = n.type;
            v = n.options;
            if (!n.disabled && g) {
                if (/select-(one|multiple)/i.test(r)) {
                    q = v.length;
                    for (k = 0; k < q; k++) {
                        h = v[k];
                        if (h.selected) {
                            u = h.hasAttribute ? h.hasAttribute("value") : h.getAttributeNode("value").specified;
                            m += Ext.String.format("{0}={1}&", s(g), s(u ? h.value : h.text))
                        }
                    }
                } else {
                    if (!(/file|undefined|reset|button/i.test(r))) {
                        if (!(/radio|checkbox/i.test(r) && !n.checked) && !(r == "submit" && t)) {
                            m += s(g) + "=" + s(n.value) + "&";
                            t = /submit/i.test(r)
                        }
                    }
                }
            }
        }
        return m.substr(0, m.length - 1)
    }})
});
Ext.define("Ext.dom.AbstractElement_insertion", {override: "Ext.dom.AbstractElement", appendChild: function (d, c) {
    var g = this, i, b, h, a;
    if (d.nodeType || d.dom || typeof d == "string") {
        d = Ext.getDom(d);
        g.dom.appendChild(d);
        return !c ? Ext.get(d) : d
    } else {
        if (d.length) {
            i = Ext.fly(document.createDocumentFragment(), "_internal");
            b = d.length;
            Ext.DomHelper.useDom = true;
            for (h = 0; h < b; h++) {
                i.appendChild(d[h], c)
            }
            Ext.DomHelper.useDom = a;
            g.dom.appendChild(i.dom);
            return c ? i.dom : i
        } else {
            return g.createChild(d, null, c)
        }
    }
}, appendTo: function (a) {
    Ext.getDom(a).appendChild(this.dom);
    return this
}, insertBefore: function (a) {
    a = Ext.getDom(a);
    a.parentNode.insertBefore(this.dom, a);
    return this
}, insertAfter: function (a) {
    a = Ext.getDom(a);
    a.parentNode.insertBefore(this.dom, a.nextSibling);
    return this
}, insertFirst: function (b, a) {
    b = b || {};
    if (b.nodeType || b.dom || typeof b == "string") {
        b = Ext.getDom(b);
        this.dom.insertBefore(b, this.dom.firstChild);
        return !a ? Ext.get(b) : b
    } else {
        return this.createChild(b, this.dom.firstChild, a)
    }
}, insertSibling: function (b, g, j) {
    var i = this, k = Ext.core.DomHelper, l = k.useDom, m = (g || "before").toLowerCase() == "after", d, a, c, h;
    if (Ext.isArray(b)) {
        a = Ext.fly(document.createDocumentFragment(), "_internal");
        c = b.length;
        k.useDom = true;
        for (h = 0; h < c; h++) {
            d = a.appendChild(b[h], j)
        }
        k.useDom = l;
        i.dom.parentNode.insertBefore(a.dom, m ? i.dom.nextSibling : i.dom);
        return d
    }
    b = b || {};
    if (b.nodeType || b.dom) {
        d = i.dom.parentNode.insertBefore(Ext.getDom(b), m ? i.dom.nextSibling : i.dom);
        if (!j) {
            d = Ext.get(d)
        }
    } else {
        if (m && !i.dom.nextSibling) {
            d = k.append(i.dom.parentNode, b, !j)
        } else {
            d = k[m ? "insertAfter" : "insertBefore"](i.dom, b, !j)
        }
    }
    return d
}, replace: function (a) {
    a = Ext.get(a);
    this.insertBefore(a);
    a.remove();
    return this
}, replaceWith: function (a) {
    var b = this;
    if (a.nodeType || a.dom || typeof a == "string") {
        a = Ext.get(a);
        b.dom.parentNode.insertBefore(a.dom, b.dom)
    } else {
        a = Ext.core.DomHelper.insertBefore(b.dom, a)
    }
    delete Ext.cache[b.id];
    Ext.removeNode(b.dom);
    b.id = Ext.id(b.dom = a);
    Ext.dom.AbstractElement.addToCache(b.isFlyweight ? new Ext.dom.AbstractElement(b.dom) : b);
    return b
}, createChild: function (b, a, c) {
    b = b || {tag: "div"};
    if (a) {
        return Ext.core.DomHelper.insertBefore(a, b, c !== true)
    } else {
        return Ext.core.DomHelper.append(this.dom, b, c !== true)
    }
}, wrap: function (b, c, a) {
    var e = Ext.core.DomHelper.insertBefore(this.dom, b || {tag: "div"}, true), d = e;
    if (a) {
        d = Ext.DomQuery.selectNode(a, e.dom)
    }
    d.appendChild(this.dom);
    return c ? e.dom : e
}, insertHtml: function (b, c, a) {
    var d = Ext.core.DomHelper.insertHtml(b, this.dom, c);
    return a ? Ext.get(d) : d
}});
Ext.define("Ext.dom.AbstractElement_style", {override: "Ext.dom.AbstractElement"}, function () {
    var d = this, m = /\w/g, q = /\s+/, c = /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i, j = Ext.supports.ClassList, e = "padding", i = "margin", a = "border", r = "-left", b = "-right", o = "-top", k = "-bottom", p = "-width", l = {l: a + r + p, r: a + b + p, t: a + o + p, b: a + k + p}, g = {l: e + r, r: e + b, t: e + o, b: e + k}, n = {l: i + r, r: i + b, t: i + o, b: i + k}, h = new d.Fly();
    Ext.override(d, {styleHooks: {}, addStyles: function (z, y) {
        var u = 0, x = (z || "").match(m), w, s = x.length, v, t = [];
        if (s == 1) {
            u = Math.abs(parseFloat(this.getStyle(y[x[0]])) || 0)
        } else {
            if (s) {
                for (w = 0; w < s; w++) {
                    v = x[w];
                    t.push(y[v])
                }
                t = this.getStyle(t);
                for (w = 0; w < s; w++) {
                    v = x[w];
                    u += Math.abs(parseFloat(t[y[v]]) || 0)
                }
            }
        }
        return u
    }, addCls: (function () {
        var t = function (z) {
            var A = this, w = A.dom, u = A.trimRe, B = z, v, C, x, y, D;
            if (typeof(z) == "string") {
                z = z.replace(u, "").split(q)
            }
            if (w && z && !!(y = z.length)) {
                if (!w.className) {
                    w.className = z.join(" ")
                } else {
                    v = w.classList;
                    if (v) {
                        for (x = 0; x < y; ++x) {
                            D = z[x];
                            if (D) {
                                if (!v.contains(D)) {
                                    if (C) {
                                        C.push(D)
                                    } else {
                                        C = w.className.replace(u, "");
                                        C = C ? [C, D] : [D]
                                    }
                                }
                            }
                        }
                        if (C) {
                            w.className = C.join(" ")
                        }
                    } else {
                        s(B)
                    }
                }
            }
            return A
        }, s = function (v) {
            var w = this, x = w.dom, u;
            if (x && v && v.length) {
                u = Ext.Element.mergeClsList(x.className, v);
                if (u.changed) {
                    x.className = u.join(" ")
                }
            }
            return w
        };
        return j ? t : s
    })(), removeCls: function (u) {
        var v = this, x = v.dom, w, s, t;
        if (typeof(u) == "string") {
            u = u.replace(v.trimRe, "").split(q)
        }
        if (x && x.className && u && !!(s = u.length)) {
            w = x.classList;
            if (s === 1 && w) {
                if (u[0]) {
                    w.remove(u[0])
                }
            } else {
                t = Ext.Element.removeCls(x.className, u);
                if (t.changed) {
                    x.className = t.join(" ")
                }
            }
        }
        return v
    }, radioCls: function (w) {
        var x = this.dom.parentNode.childNodes, t, u, s;
        w = Ext.isArray(w) ? w : [w];
        for (u = 0, s = x.length; u < s; u++) {
            t = x[u];
            if (t && t.nodeType == 1) {
                h.attach(t).removeCls(w)
            }
        }
        return this.addCls(w)
    }, toggleCls: (function () {
        var s = function (u) {
            var v = this, x = v.dom, w;
            if (x) {
                u = u.replace(v.trimRe, "");
                if (u) {
                    w = x.classList;
                    if (w) {
                        w.toggle(u)
                    } else {
                        t(u)
                    }
                }
            }
            return v
        }, t = function (u) {
            return this.hasCls(u) ? this.removeCls(u) : this.addCls(u)
        };
        return j ? s : t
    })(), hasCls: (function () {
        var s = function (v) {
            var x = this.dom, u = false, w;
            if (x && v) {
                w = x.classList;
                if (w) {
                    u = w.contains(v)
                } else {
                    u = t(v)
                }
            }
            return u
        }, t = function (u) {
            var v = this.dom;
            return v ? u && (" " + v.className + " ").indexOf(" " + u + " ") !== -1 : false
        };
        return j ? s : t
    })(), replaceCls: function (t, s) {
        return this.removeCls(t).addCls(s)
    }, isStyle: function (s, t) {
        return this.getStyle(s) == t
    }, getStyle: function (E, z) {
        var A = this, v = A.dom, H = typeof E != "string", F = A.styleHooks, t = E, B = t, y = 1, x, G, D, C, u, s, w;
        if (H) {
            D = {};
            t = B[0];
            w = 0;
            if (!(y = B.length)) {
                return D
            }
        }
        if (!v || v.documentElement) {
            return D || ""
        }
        x = v.style;
        if (z) {
            s = x
        } else {
            s = v.ownerDocument.defaultView.getComputedStyle(v, null);
            if (!s) {
                z = true;
                s = x
            }
        }
        do {
            C = F[t];
            if (!C) {
                F[t] = C = {name: d.normalize(t)}
            }
            if (C.get) {
                u = C.get(v, A, z, s)
            } else {
                G = C.name;
                u = s[G]
            }
            if (!H) {
                return u
            }
            D[t] = u;
            t = B[++w]
        } while (w < y);
        return D
    }, getStyles: function () {
        var t = Ext.Array.slice(arguments), s = t.length, u;
        if (s && typeof t[s - 1] == "boolean") {
            u = t.pop()
        }
        return this.getStyle(t, u)
    }, isTransparent: function (t) {
        var s = this.getStyle(t);
        return s ? c.test(s) : false
    }, setStyle: function (z, x) {
        var v = this, y = v.dom, s = v.styleHooks, u = y.style, t = z, w;
        if (typeof t == "string") {
            w = s[t];
            if (!w) {
                s[t] = w = {name: d.normalize(t)}
            }
            x = (x == null) ? "" : x;
            if (w.set) {
                w.set(y, x, v)
            } else {
                u[w.name] = x
            }
            if (w.afterSet) {
                w.afterSet(y, x, v)
            }
        } else {
            for (t in z) {
                if (z.hasOwnProperty(t)) {
                    w = s[t];
                    if (!w) {
                        s[t] = w = {name: d.normalize(t)}
                    }
                    x = z[t];
                    x = (x == null) ? "" : x;
                    if (w.set) {
                        w.set(y, x, v)
                    } else {
                        u[w.name] = x
                    }
                    if (w.afterSet) {
                        w.afterSet(y, x, v)
                    }
                }
            }
        }
        return v
    }, getHeight: function (t) {
        var u = this.dom, s = t ? (u.clientHeight - this.getPadding("tb")) : u.offsetHeight;
        return s > 0 ? s : 0
    }, getWidth: function (s) {
        var u = this.dom, t = s ? (u.clientWidth - this.getPadding("lr")) : u.offsetWidth;
        return t > 0 ? t : 0
    }, setWidth: function (s) {
        var t = this;
        t.dom.style.width = d.addUnits(s);
        return t
    }, setHeight: function (s) {
        var t = this;
        t.dom.style.height = d.addUnits(s);
        return t
    }, getBorderWidth: function (s) {
        return this.addStyles(s, l)
    }, getPadding: function (s) {
        return this.addStyles(s, g)
    }, margins: n, applyStyles: function (u) {
        if (u) {
            var t, s, v = this.dom;
            if (typeof u == "function") {
                u = u.call()
            }
            if (typeof u == "string") {
                u = Ext.util.Format.trim(u).split(/\s*(?::|;)\s*/);
                for (t = 0, s = u.length; t < s;) {
                    v.style[d.normalize(u[t++])] = u[t++]
                }
            } else {
                if (typeof u == "object") {
                    this.setStyle(u)
                }
            }
        }
    }, setSize: function (u, s) {
        var v = this, t = v.dom.style;
        if (Ext.isObject(u)) {
            s = u.height;
            u = u.width
        }
        t.width = d.addUnits(u);
        t.height = d.addUnits(s);
        return v
    }, getViewSize: function () {
        var s = document, t = this.dom;
        if (t == s || t == s.body) {
            return{width: d.getViewportWidth(), height: d.getViewportHeight()}
        } else {
            return{width: t.clientWidth, height: t.clientHeight}
        }
    }, getSize: function (t) {
        var s = this.dom;
        return{width: Math.max(0, t ? (s.clientWidth - this.getPadding("lr")) : s.offsetWidth), height: Math.max(0, t ? (s.clientHeight - this.getPadding("tb")) : s.offsetHeight)}
    }, repaint: function () {
        var s = this.dom;
        this.addCls(Ext.baseCSSPrefix + "repaint");
        setTimeout(function () {
            h.attach(s).removeCls(Ext.baseCSSPrefix + "repaint")
        }, 1);
        return this
    }, getMargin: function (t) {
        var u = this, w = {t: "top", l: "left", r: "right", b: "bottom"}, s, x, v;
        if (!t) {
            v = [];
            for (s in u.margins) {
                if (u.margins.hasOwnProperty(s)) {
                    v.push(u.margins[s])
                }
            }
            x = u.getStyle(v);
            if (x && typeof x == "object") {
                for (s in u.margins) {
                    if (u.margins.hasOwnProperty(s)) {
                        x[w[s]] = parseFloat(x[u.margins[s]]) || 0
                    }
                }
            }
            return x
        } else {
            return u.addStyles(t, u.margins)
        }
    }, mask: function (t, x, B) {
        var y = this, u = y.dom, v = (y.$cache || y.getCache()).data, s = v.mask, C, A, z = "", w = Ext.baseCSSPrefix;
        y.addCls(w + "masked");
        if (y.getStyle("position") == "static") {
            y.addCls(w + "masked-relative")
        }
        if (s) {
            s.remove()
        }
        if (x && typeof x == "string") {
            z = " " + x
        } else {
            z = " " + w + "mask-gray"
        }
        C = y.createChild({cls: w + "mask" + ((B !== false) ? "" : (" " + w + "mask-gray")), html: t ? ('<div class="' + (x || (w + "mask-message")) + '">' + t + "</div>") : ""});
        A = y.getSize();
        v.mask = C;
        if (u === document.body) {
            A.height = window.innerHeight;
            if (y.orientationHandler) {
                Ext.EventManager.unOrientationChange(y.orientationHandler, y)
            }
            y.orientationHandler = function () {
                A = y.getSize();
                A.height = window.innerHeight;
                C.setSize(A)
            };
            Ext.EventManager.onOrientationChange(y.orientationHandler, y)
        }
        C.setSize(A);
        if (Ext.is.iPad) {
            Ext.repaint()
        }
    }, unmask: function () {
        var t = this, v = (t.$cache || t.getCache()).data, s = v.mask, u = Ext.baseCSSPrefix;
        if (s) {
            s.remove();
            delete v.mask
        }
        t.removeCls([u + "masked", u + "masked-relative"]);
        if (t.dom === document.body) {
            Ext.EventManager.unOrientationChange(t.orientationHandler, t);
            delete t.orientationHandler
        }
    }});
    Ext.onReady(function () {
        var A = Ext.supports, s, y, w, t, z;

        function x(F, C, E, B) {
            var D = B[this.name] || "";
            return c.test(D) ? "transparent" : D
        }

        function v(H, E, G, D) {
            var B = D.marginRight, C, F;
            if (B != "0px") {
                C = H.style;
                F = C.display;
                C.display = "inline-block";
                B = (G ? D : H.ownerDocument.defaultView.getComputedStyle(H, null)).marginRight;
                C.display = F
            }
            return B
        }

        function u(I, F, H, E) {
            var B = E.marginRight, D, C, G;
            if (B != "0px") {
                D = I.style;
                C = d.getRightMarginFixCleaner(I);
                G = D.display;
                D.display = "inline-block";
                B = (H ? E : I.ownerDocument.defaultView.getComputedStyle(I, "")).marginRight;
                D.display = G;
                C()
            }
            return B
        }

        s = d.prototype.styleHooks;
        if (A.init) {
            A.init()
        }
        if (!A.RightMargin) {
            s.marginRight = s["margin-right"] = {name: "marginRight", get: (A.DisplayChangeInputSelectionBug || A.DisplayChangeTextAreaSelectionBug) ? u : v}
        }
        if (!A.TransparentColor) {
            y = ["background-color", "border-color", "color", "outline-color"];
            for (w = y.length; w--;) {
                t = y[w];
                z = d.normalize(t);
                s[t] = s[z] = {name: z, get: x}
            }
        }
    })
});
Ext.define("Ext.dom.AbstractElement_traversal", {override: "Ext.dom.AbstractElement", findParent: function (h, b, a) {
    var e = this.dom, c = document.documentElement, g = 0, d;
    b = b || 50;
    if (isNaN(b)) {
        d = Ext.getDom(b);
        b = Number.MAX_VALUE
    }
    while (e && e.nodeType == 1 && g < b && e != c && e != d) {
        if (Ext.DomQuery.is(e, h)) {
            return a ? Ext.get(e) : e
        }
        g++;
        e = e.parentNode
    }
    return null
}, findParentNode: function (d, b, a) {
    var c = Ext.fly(this.dom.parentNode, "_internal");
    return c ? c.findParent(d, b, a) : null
}, up: function (c, a, b) {
    return this.findParentNode(c, a, !b)
}, select: function (a, b) {
    return Ext.dom.Element.select(a, this.dom, b)
}, query: function (a) {
    return Ext.DomQuery.select(a, this.dom)
}, down: function (a, b) {
    var c = Ext.DomQuery.selectNode(a, this.dom);
    return b ? c : Ext.get(c)
}, child: function (a, b) {
    var d, c = this, e;
    e = Ext.id(c.dom);
    e = Ext.escapeId(e);
    d = Ext.DomQuery.selectNode("#" + e + " > " + a, c.dom);
    return b ? d : Ext.get(d)
}, parent: function (a, b) {
    return this.matchNode("parentNode", "parentNode", a, b)
}, next: function (a, b) {
    return this.matchNode("nextSibling", "nextSibling", a, b)
}, prev: function (a, b) {
    return this.matchNode("previousSibling", "previousSibling", a, b)
}, first: function (a, b) {
    return this.matchNode("nextSibling", "firstChild", a, b)
}, last: function (a, b) {
    return this.matchNode("previousSibling", "lastChild", a, b)
}, matchNode: function (b, e, a, c) {
    if (!this.dom) {
        return null
    }
    var d = this.dom[e];
    while (d) {
        if (d.nodeType == 1 && (!a || Ext.DomQuery.is(d, a))) {
            return !c ? Ext.get(d) : d
        }
        d = d[b]
    }
    return null
}, isAncestor: function (a) {
    return this.self.isAncestor.call(this.self, this.dom, a)
}});
Ext.define("Ext.dom.AbstractElement", {trimRe: /^\s+|\s+$/g, whitespaceRe: /\s/, inheritableStatics: {trimRe: /^\s+|\s+$/g, whitespaceRe: /\s/, get: function (c) {
    var i = this, j = window.document, d = Ext.dom.Element, h, b, g, e, a;
    if (!c) {
        return null
    }
    if (c.isFly) {
        c = c.dom
    }
    if (typeof c == "string") {
        if (c == Ext.windowId) {
            return d.get(window)
        } else {
            if (c == Ext.documentId) {
                return d.get(j)
            }
        }
        h = Ext.cache[c];
        if (h && h.skipGarbageCollection) {
            g = h.el;
            return g
        }
        if (!(e = j.getElementById(c))) {
            return null
        }
        if (h && h.el) {
            g = Ext.updateCacheEntry(h, e).el
        } else {
            g = new d(e, !!h)
        }
        return g
    } else {
        if (c.tagName) {
            if (!(a = c.id)) {
                a = Ext.id(c)
            }
            h = Ext.cache[a];
            if (h && h.el) {
                g = Ext.updateCacheEntry(h, c).el
            } else {
                g = new d(c, !!h)
            }
            return g
        } else {
            if (c instanceof i) {
                if (c != i.docEl && c != i.winEl) {
                    a = c.id;
                    h = Ext.cache[a];
                    if (h) {
                        Ext.updateCacheEntry(h, j.getElementById(a) || c.dom)
                    }
                }
                return c
            } else {
                if (c.isComposite) {
                    return c
                } else {
                    if (Ext.isArray(c)) {
                        return i.select(c)
                    } else {
                        if (c === j) {
                            if (!i.docEl) {
                                b = i.docEl = Ext.Object.chain(d.prototype);
                                b.dom = j;
                                b.el = b;
                                b.id = Ext.id(j);
                                i.addToCache(b)
                            }
                            return i.docEl
                        } else {
                            if (c === window) {
                                if (!i.winEl) {
                                    i.winEl = Ext.Object.chain(d.prototype);
                                    i.winEl.dom = window;
                                    i.winEl.id = Ext.id(window);
                                    i.addToCache(i.winEl)
                                }
                                return i.winEl
                            }
                        }
                    }
                }
            }
        }
    }
    return null
}, addToCache: function (a, b) {
    if (a) {
        Ext.addCacheEntry(b, a)
    }
    return a
}, addMethods: function () {
    this.override.apply(this, arguments)
}, mergeClsList: function () {
    var m, k = {}, g, b, d, h, c, n = [], e = false, a = this.trimRe, l = this.whitespaceRe;
    for (g = 0, b = arguments.length; g < b; g++) {
        m = arguments[g];
        if (Ext.isString(m)) {
            m = m.replace(a, "").split(l)
        }
        if (m) {
            for (d = 0, h = m.length; d < h; d++) {
                c = m[d];
                if (!k[c]) {
                    if (g) {
                        e = true
                    }
                    k[c] = true
                }
            }
        }
    }
    for (c in k) {
        n.push(c)
    }
    n.changed = e;
    return n
}, removeCls: function (a, b) {
    var h = {}, g, c, d, k = [], e = false, j = this.whitespaceRe;
    if (a) {
        if (Ext.isString(a)) {
            a = a.replace(this.trimRe, "").split(j)
        }
        for (g = 0, c = a.length; g < c; g++) {
            h[a[g]] = true
        }
    }
    if (b) {
        if (Ext.isString(b)) {
            b = b.split(j)
        }
        for (g = 0, c = b.length; g < c; g++) {
            d = b[g];
            if (h[d]) {
                e = true;
                delete h[d]
            }
        }
    }
    for (d in h) {
        k.push(d)
    }
    k.changed = e;
    return k
}, VISIBILITY: 1, DISPLAY: 2, OFFSETS: 3, ASCLASS: 4}, constructor: function (a, b) {
    var c = this, d = typeof a == "string" ? document.getElementById(a) : a, e;
    c.el = c;
    if (!d) {
        return null
    }
    e = d.id;
    if (!b && e && Ext.cache[e]) {
        return Ext.cache[e].el
    }
    c.dom = d;
    c.id = e || Ext.id(d);
    c.self.addToCache(c)
}, set: function (e, b) {
    var c = this.dom, a, d;
    for (a in e) {
        if (e.hasOwnProperty(a)) {
            d = e[a];
            if (a == "style") {
                this.applyStyles(d)
            } else {
                if (a == "cls") {
                    c.className = d
                } else {
                    if (b !== false) {
                        if (d === undefined) {
                            c.removeAttribute(a)
                        } else {
                            c.setAttribute(a, d)
                        }
                    } else {
                        c[a] = d
                    }
                }
            }
        }
    }
    return this
}, defaultUnit: "px", is: function (a) {
    return Ext.DomQuery.is(this.dom, a)
}, getValue: function (a) {
    var b = this.dom.value;
    return a ? parseInt(b, 10) : b
}, remove: function () {
    var a = this, b = a.dom;
    if (a.isAnimate) {
        a.stopAnimation()
    }
    if (b) {
        Ext.removeNode(b);
        delete a.dom
    }
}, contains: function (a) {
    if (!a) {
        return false
    }
    var b = this, c = a.dom || a;
    return(c === b.dom) || Ext.dom.AbstractElement.isAncestor(b.dom, c)
}, getAttribute: function (a, b) {
    var c = this.dom;
    return c.getAttributeNS(b, a) || c.getAttribute(b + ":" + a) || c.getAttribute(a) || c[a]
}, update: function (a) {
    if (this.dom) {
        this.dom.innerHTML = a
    }
    return this
}, setHTML: function (a) {
    if (this.dom) {
        this.dom.innerHTML = a
    }
    return this
}, getHTML: function () {
    return this.dom ? this.dom.innerHTML : ""
}, hide: function () {
    this.setVisible(false);
    return this
}, show: function () {
    this.setVisible(true);
    return this
}, setVisible: function (g, a) {
    var b = this, e = b.self, d = b.getVisibilityMode(), c = Ext.baseCSSPrefix;
    switch (d) {
        case e.VISIBILITY:
            b.removeCls([c + "hidden-display", c + "hidden-offsets"]);
            b[g ? "removeCls" : "addCls"](c + "hidden-visibility");
            break;
        case e.DISPLAY:
            b.removeCls([c + "hidden-visibility", c + "hidden-offsets"]);
            b[g ? "removeCls" : "addCls"](c + "hidden-display");
            break;
        case e.OFFSETS:
            b.removeCls([c + "hidden-visibility", c + "hidden-display"]);
            b[g ? "removeCls" : "addCls"](c + "hidden-offsets");
            break
    }
    return b
}, getVisibilityMode: function () {
    var b = (this.$cache || this.getCache()).data, a = b.visibilityMode;
    if (a === undefined) {
        b.visibilityMode = a = this.self.DISPLAY
    }
    return a
}, setVisibilityMode: function (a) {
    (this.$cache || this.getCache()).data.visibilityMode = a;
    return this
}, getCache: function () {
    var a = this, b = a.dom.id || Ext.id(a.dom);
    a.$cache = Ext.cache[b] || Ext.addCacheEntry(b, null, a.dom);
    return a.$cache
}}, function () {
    var a = this;
    Ext.getDetachedBody = function () {
        var b = a.detachedBodyEl;
        if (!b) {
            b = document.createElement("div");
            a.detachedBodyEl = b = new a.Fly(b);
            b.isDetachedBody = true
        }
        return b
    };
    Ext.getElementById = function (d) {
        var c = document.getElementById(d), b;
        if (!c && (b = a.detachedBodyEl)) {
            c = b.dom.querySelector("#" + Ext.escapeId(d))
        }
        return c
    };
    Ext.get = function (b) {
        return Ext.dom.Element.get(b)
    };
    this.addStatics({Fly: new Ext.Class({extend: a, isFly: true, constructor: function (b) {
        this.dom = b;
        this.el = this
    }, attach: function (b) {
        this.dom = b;
        this.$cache = b.id ? Ext.cache[b.id] : null;
        return this
    }}), _flyweights: {}, fly: function (e, c) {
        var d = null, b = a._flyweights;
        c = c || "_global";
        e = Ext.getDom(e);
        if (e) {
            d = b[c] || (b[c] = new a.Fly());
            d.dom = e;
            d.$cache = e.id ? Ext.cache[e.id] : null
        }
        return d
    }});
    Ext.fly = function () {
        return a.fly.apply(a, arguments)
    };
    (function (b) {
        b.destroy = b.remove;
        if (document.querySelector) {
            b.getById = function (e, c) {
                var d = document.getElementById(e) || this.dom.querySelector("#" + Ext.escapeId(e));
                return c ? d : (d ? Ext.get(d) : null)
            }
        } else {
            b.getById = function (e, c) {
                var d = document.getElementById(e);
                return c ? d : (d ? Ext.get(d) : null)
            }
        }
    }(this.prototype))
});
Ext.define("Ext.dom.Helper", (function () {
    var b = "afterbegin", i = "afterend", a = "beforebegin", o = "beforeend", l = "<table>", h = "</table>", c = l + "<tbody>", n = "</tbody>" + h, k = c + "<tr>", e = "</tr>" + n, p = document.createElement("div"), m = ["BeforeBegin", "previousSibling"], j = ["AfterEnd", "nextSibling"], d = {beforebegin: m, afterend: j}, g = {beforebegin: m, afterend: j, afterbegin: ["AfterBegin", "firstChild"], beforeend: ["BeforeEnd", "lastChild"]};
    return{extend: Ext.dom.AbstractHelper, tableRe: /^(?:table|thead|tbody|tr|td)$/i, tableElRe: /td|tr|tbody|thead/i, useDom: false, createDom: function (q, w) {
        var r, z = document, u, x, s, y, v, t;
        if (Ext.isArray(q)) {
            r = z.createDocumentFragment();
            for (v = 0, t = q.length; v < t; v++) {
                this.createDom(q[v], r)
            }
        } else {
            if (typeof q == "string") {
                r = z.createTextNode(q)
            } else {
                r = z.createElement(q.tag || "div");
                u = !!r.setAttribute;
                for (x in q) {
                    if (!this.confRe.test(x)) {
                        s = q[x];
                        if (x == "cls") {
                            r.className = s
                        } else {
                            if (u) {
                                r.setAttribute(x, s)
                            } else {
                                r[x] = s
                            }
                        }
                    }
                }
                Ext.DomHelper.applyStyles(r, q.style);
                if ((y = q.children || q.cn)) {
                    this.createDom(y, r)
                } else {
                    if (q.html) {
                        r.innerHTML = q.html
                    }
                }
            }
        }
        if (w) {
            w.appendChild(r)
        }
        return r
    }, ieTable: function (v, q, w, u) {
        p.innerHTML = [q, w, u].join("");
        var r = -1, t = p, s;
        while (++r < v) {
            t = t.firstChild
        }
        s = t.nextSibling;
        if (s) {
            s = t;
            t = document.createDocumentFragment();
            while (s) {
                nx = s.nextSibling;
                t.appendChild(s);
                s = nx
            }
        }
        return t
    }, insertIntoTable: function (z, s, r, t) {
        var q, w, v = s == a, y = s == b, u = s == o, x = s == i;
        if (z == "td" && (y || u) || !this.tableElRe.test(z) && (v || x)) {
            return null
        }
        w = v ? r : x ? r.nextSibling : y ? r.firstChild : null;
        if (v || x) {
            r = r.parentNode
        }
        if (z == "td" || (z == "tr" && (u || y))) {
            q = this.ieTable(4, k, t, e)
        } else {
            if (((z == "tbody" || z == "thead") && (u || y)) || (z == "tr" && (v || x))) {
                q = this.ieTable(3, c, t, n)
            } else {
                q = this.ieTable(2, l, t, h)
            }
        }
        r.insertBefore(q, w);
        return q
    }, createContextualFragment: function (r) {
        var q = document.createDocumentFragment(), s, t;
        p.innerHTML = r;
        t = p.childNodes;
        s = t.length;
        while (s--) {
            q.appendChild(t[0])
        }
        return q
    }, applyStyles: function (q, r) {
        if (r) {
            if (typeof r == "function") {
                r = r.call()
            }
            if (typeof r == "string") {
                r = Ext.dom.Element.parseStyles(r)
            }
            if (typeof r == "object") {
                Ext.fly(q, "_applyStyles").setStyle(r)
            }
        }
    }, createHtml: function (q) {
        return this.markup(q)
    }, doInsert: function (t, v, u, w, s, q) {
        t = t.dom || Ext.getDom(t);
        var r;
        if (this.useDom) {
            r = this.createDom(v, null);
            if (q) {
                t.appendChild(r)
            } else {
                (s == "firstChild" ? t : t.parentNode).insertBefore(r, t[s] || t)
            }
        } else {
            r = this.insertHtml(w, t, this.markup(v))
        }
        return u ? Ext.get(r, true) : r
    }, overwrite: function (s, r, t) {
        var q;
        s = Ext.getDom(s);
        r = this.markup(r);
        if (Ext.isIE && this.tableRe.test(s.tagName)) {
            while (s.firstChild) {
                s.removeChild(s.firstChild)
            }
            if (r) {
                q = this.insertHtml("afterbegin", s, r);
                return t ? Ext.get(q) : q
            }
            return null
        }
        s.innerHTML = r;
        return t ? Ext.get(s.firstChild) : s.firstChild
    }, insertHtml: function (s, v, t) {
        var x, r, u, q, w;
        s = s.toLowerCase();
        if (v.insertAdjacentHTML) {
            if (Ext.isIE && this.tableRe.test(v.tagName) && (w = this.insertIntoTable(v.tagName.toLowerCase(), s, v, t))) {
                return w
            }
            if ((x = g[s])) {
                if (Ext.global.MSApp && Ext.global.MSApp.execUnsafeLocalFunction) {
                    MSApp.execUnsafeLocalFunction(function () {
                        v.insertAdjacentHTML(x[0], t)
                    })
                } else {
                    v.insertAdjacentHTML(x[0], t)
                }
                return v[x[1]]
            }
        } else {
            if (v.nodeType === 3) {
                s = s === "afterbegin" ? "beforebegin" : s;
                s = s === "beforeend" ? "afterend" : s
            }
            r = Ext.supports.CreateContextualFragment ? v.ownerDocument.createRange() : undefined;
            q = "setStart" + (this.endRe.test(s) ? "After" : "Before");
            if (d[s]) {
                if (r) {
                    r[q](v);
                    w = r.createContextualFragment(t)
                } else {
                    w = this.createContextualFragment(t)
                }
                v.parentNode.insertBefore(w, s == a ? v : v.nextSibling);
                return v[(s == a ? "previous" : "next") + "Sibling"]
            } else {
                u = (s == b ? "first" : "last") + "Child";
                if (v.firstChild) {
                    if (r) {
                        r[q](v[u]);
                        w = r.createContextualFragment(t)
                    } else {
                        w = this.createContextualFragment(t)
                    }
                    if (s == b) {
                        v.insertBefore(w, v.firstChild)
                    } else {
                        v.appendChild(w)
                    }
                } else {
                    v.innerHTML = t
                }
                return v[u]
            }
        }
    }, createTemplate: function (r) {
        var q = this.markup(r);
        return new Ext.Template(q)
    }}
})(), function () {
    Ext.ns("Ext.core");
    Ext.DomHelper = Ext.core.DomHelper = new this
});
Ext.define("Ext.Template", {inheritableStatics: {from: function (b, a) {
    b = Ext.getDom(b);
    return new this(b.value || b.innerHTML, a || "")
}}, constructor: function (d) {
    var g = this, b = arguments, a = [], c = 0, e = b.length, h;
    g.initialConfig = {};
    if (e === 1 && Ext.isArray(d)) {
        b = d;
        e = b.length
    }
    if (e > 1) {
        for (; c < e; c++) {
            h = b[c];
            if (typeof h == "object") {
                Ext.apply(g.initialConfig, h);
                Ext.apply(g, h)
            } else {
                a.push(h)
            }
        }
    } else {
        a.push(d)
    }
    g.html = a.join("");
    if (g.compiled) {
        g.compile()
    }
}, isTemplate: true, disableFormats: false, re: /\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, apply: function (a) {
    var h = this, d = h.disableFormats !== true, g = Ext.util.Format, c = h, b;
    if (h.compiled) {
        return h.compiled(a).join("")
    }
    function e(i, k, l, j) {
        if (l && d) {
            if (j) {
                j = [a[k]].concat(Ext.functionFactory("return [" + j + "];")())
            } else {
                j = [a[k]]
            }
            if (l.substr(0, 5) == "this.") {
                return c[l.substr(5)].apply(c, j)
            } else {
                return g[l].apply(g, j)
            }
        } else {
            return a[k] !== undefined ? a[k] : ""
        }
    }

    b = h.html.replace(h.re, e);
    return b
}, applyOut: function (a, b) {
    var c = this;
    if (c.compiled) {
        b.push.apply(b, c.compiled(a))
    } else {
        b.push(c.apply(a))
    }
    return b
}, applyTemplate: function () {
    return this.apply.apply(this, arguments)
}, set: function (a, c) {
    var b = this;
    b.html = a;
    b.compiled = null;
    return c ? b.compile() : b
}, compileARe: /\\/g, compileBRe: /(\r\n|\n)/g, compileCRe: /'/g, compile: function () {
    var me = this, fm = Ext.util.Format, useFormat = me.disableFormats !== true, body, bodyReturn;

    function fn(m, name, format, args) {
        if (format && useFormat) {
            args = args ? "," + args : "";
            if (format.substr(0, 5) != "this.") {
                format = "fm." + format + "("
            } else {
                format = "this." + format.substr(5) + "("
            }
        } else {
            args = "";
            format = "(values['" + name + "'] == undefined ? '' : "
        }
        return"'," + format + "values['" + name + "']" + args + ") ,'"
    }

    bodyReturn = me.html.replace(me.compileARe, "\\\\").replace(me.compileBRe, "\\n").replace(me.compileCRe, "\\'").replace(me.re, fn);
    body = "this.compiled = function(values){ return ['" + bodyReturn + "'];};";
    eval(body);
    return me
}, insertFirst: function (b, a, c) {
    return this.doInsert("afterBegin", b, a, c)
}, insertBefore: function (b, a, c) {
    return this.doInsert("beforeBegin", b, a, c)
}, insertAfter: function (b, a, c) {
    return this.doInsert("afterEnd", b, a, c)
}, append: function (b, a, c) {
    return this.doInsert("beforeEnd", b, a, c)
}, doInsert: function (b, d, a, e) {
    var c = Ext.DomHelper.insertHtml(b, Ext.getDom(d), this.apply(a));
    return e ? Ext.get(c) : c
}, overwrite: function (c, a, d) {
    var b = Ext.DomHelper.overwrite(Ext.getDom(c), this.apply(a));
    return d ? Ext.get(b) : b
}});
Ext.define("Ext.XTemplateParser", {constructor: function (a) {
    Ext.apply(this, a)
}, doTpl: Ext.emptyFn, parse: function (l) {
    var v = this, p = l.length, o = {elseif: "elif"}, q = v.topRe, c = v.actionsRe, e, d, j, n, h, k, i, u, r, b, g, a;
    v.level = 0;
    v.stack = d = [];
    for (e = 0; e < p; e = b) {
        q.lastIndex = e;
        n = q.exec(l);
        if (!n) {
            v.doText(l.substring(e, p));
            break
        }
        r = n.index;
        b = q.lastIndex;
        if (e < r) {
            v.doText(l.substring(e, r))
        }
        if (n[1]) {
            b = l.indexOf("%}", r + 2);
            v.doEval(l.substring(r + 2, b));
            b += 2
        } else {
            if (n[2]) {
                b = l.indexOf("]}", r + 2);
                v.doExpr(l.substring(r + 2, b));
                b += 2
            } else {
                if (n[3]) {
                    v.doTag(n[3])
                } else {
                    if (n[4]) {
                        g = null;
                        while ((u = c.exec(n[4])) !== null) {
                            j = u[2] || u[3];
                            if (j) {
                                j = Ext.String.htmlDecode(j);
                                h = u[1];
                                h = o[h] || h;
                                g = g || {};
                                k = g[h];
                                if (typeof k == "string") {
                                    g[h] = [k, j]
                                } else {
                                    if (k) {
                                        g[h].push(j)
                                    } else {
                                        g[h] = j
                                    }
                                }
                            }
                        }
                        if (!g) {
                            if (v.elseRe.test(n[4])) {
                                v.doElse()
                            } else {
                                if (v.defaultRe.test(n[4])) {
                                    v.doDefault()
                                } else {
                                    v.doTpl();
                                    d.push({type: "tpl"})
                                }
                            }
                        } else {
                            if (g["if"]) {
                                v.doIf(g["if"], g);
                                d.push({type: "if"})
                            } else {
                                if (g["switch"]) {
                                    v.doSwitch(g["switch"], g);
                                    d.push({type: "switch"})
                                } else {
                                    if (g["case"]) {
                                        v.doCase(g["case"], g)
                                    } else {
                                        if (g.elif) {
                                            v.doElseIf(g.elif, g)
                                        } else {
                                            if (g["for"]) {
                                                ++v.level;
                                                if (a = v.propRe.exec(n[4])) {
                                                    g.propName = a[1] || a[2]
                                                }
                                                v.doFor(g["for"], g);
                                                d.push({type: "for", actions: g})
                                            } else {
                                                if (g.foreach) {
                                                    ++v.level;
                                                    if (a = v.propRe.exec(n[4])) {
                                                        g.propName = a[1] || a[2]
                                                    }
                                                    v.doForEach(g.foreach, g);
                                                    d.push({type: "foreach", actions: g})
                                                } else {
                                                    if (g.exec) {
                                                        v.doExec(g.exec, g);
                                                        d.push({type: "exec", actions: g})
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (n[0].length === 5) {
                            d.push({type: "tpl"})
                        } else {
                            i = d.pop();
                            v.doEnd(i.type, i.actions);
                            if (i.type == "for" || i.type == "foreach") {
                                --v.level
                            }
                        }
                    }
                }
            }
        }
    }
}, topRe: /(?:(\{\%)|(\{\[)|\{([^{}]+)\})|(?:<tpl([^>]*)\>)|(?:<\/tpl>)/g, actionsRe: /\s*(elif|elseif|if|for|foreach|exec|switch|case|eval|between)\s*\=\s*(?:(?:"([^"]*)")|(?:'([^']*)'))\s*/g, propRe: /prop=(?:(?:"([^"]*)")|(?:'([^']*)'))/, defaultRe: /^\s*default\s*$/, elseRe: /^\s*else\s*$/});
Ext.define("Ext.XTemplateCompiler", {extend: Ext.XTemplateParser, useEval: Ext.isGecko, useIndex: Ext.isIE8m, useFormat: true, propNameRe: /^[\w\d\$]*$/, compile: function (a) {
    var c = this, b = c.generate(a);
    return c.useEval ? c.evalTpl(b) : (new Function("Ext", b))(Ext)
}, generate: function (a) {
    var d = this, b = "var fm=Ext.util.Format,ts=Object.prototype.toString;", c;
    d.maxLevel = 0;
    d.body = ["var c0=values, a0=" + d.createArrayTest(0) + ", p0=parent, n0=xcount, i0=xindex, k0, v;\n"];
    if (d.definitions) {
        if (typeof d.definitions === "string") {
            d.definitions = [d.definitions, b]
        } else {
            d.definitions.push(b)
        }
    } else {
        d.definitions = [b]
    }
    d.switches = [];
    d.parse(a);
    d.definitions.push((d.useEval ? "$=" : "return") + " function (" + d.fnArgs + ") {", d.body.join(""), "}");
    c = d.definitions.join("\n");
    d.definitions.length = d.body.length = d.switches.length = 0;
    delete d.definitions;
    delete d.body;
    delete d.switches;
    return c
}, doText: function (c) {
    var b = this, a = b.body;
    c = c.replace(b.aposRe, "\\'").replace(b.newLineRe, "\\n");
    if (b.useIndex) {
        a.push("out[out.length]='", c, "'\n")
    } else {
        a.push("out.push('", c, "')\n")
    }
}, doExpr: function (b) {
    var a = this.body;
    a.push("if ((v=" + b + ") != null) out");
    if (this.useIndex) {
        a.push("[out.length]=v+''\n")
    } else {
        a.push(".push(v+'')\n")
    }
}, doTag: function (a) {
    var b = this.parseTag(a);
    if (b) {
        this.doExpr(b)
    } else {
        this.doText("{" + a + "}")
    }
}, doElse: function () {
    this.body.push("} else {\n")
}, doEval: function (a) {
    this.body.push(a, "\n")
}, doIf: function (b, c) {
    var a = this;
    if (b === ".") {
        a.body.push("if (values) {\n")
    } else {
        if (a.propNameRe.test(b)) {
            a.body.push("if (", a.parseTag(b), ") {\n")
        } else {
            a.body.push("if (", a.addFn(b), a.callFn, ") {\n")
        }
    }
    if (c.exec) {
        a.doExec(c.exec)
    }
}, doElseIf: function (b, c) {
    var a = this;
    if (b === ".") {
        a.body.push("else if (values) {\n")
    } else {
        if (a.propNameRe.test(b)) {
            a.body.push("} else if (", a.parseTag(b), ") {\n")
        } else {
            a.body.push("} else if (", a.addFn(b), a.callFn, ") {\n")
        }
    }
    if (c.exec) {
        a.doExec(c.exec)
    }
}, doSwitch: function (b) {
    var a = this;
    if (b === ".") {
        a.body.push("switch (values) {\n")
    } else {
        if (a.propNameRe.test(b)) {
            a.body.push("switch (", a.parseTag(b), ") {\n")
        } else {
            a.body.push("switch (", a.addFn(b), a.callFn, ") {\n")
        }
    }
    a.switches.push(0)
}, doCase: function (e) {
    var d = this, c = Ext.isArray(e) ? e : [e], g = d.switches.length - 1, a, b;
    if (d.switches[g]) {
        d.body.push("break;\n")
    } else {
        d.switches[g]++
    }
    for (b = 0, g = c.length; b < g; ++b) {
        a = d.intRe.exec(c[b]);
        c[b] = a ? a[1] : ("'" + c[b].replace(d.aposRe, "\\'") + "'")
    }
    d.body.push("case ", c.join(": case "), ":\n")
}, doDefault: function () {
    var a = this, b = a.switches.length - 1;
    if (a.switches[b]) {
        a.body.push("break;\n")
    } else {
        a.switches[b]++
    }
    a.body.push("default:\n")
}, doEnd: function (b, d) {
    var c = this, a = c.level - 1;
    if (b == "for" || b == "foreach") {
        if (d.exec) {
            c.doExec(d.exec)
        }
        c.body.push("}\n");
        c.body.push("parent=p", a, ";values=r", a + 1, ";xcount=n" + a + ";xindex=i", a, "+1;xkey=k", a, ";\n")
    } else {
        if (b == "if" || b == "switch") {
            c.body.push("}\n")
        }
    }
}, doFor: function (e, h) {
    var d = this, c, b = d.level, a = b - 1, g;
    if (e === ".") {
        c = "values"
    } else {
        if (d.propNameRe.test(e)) {
            c = d.parseTag(e)
        } else {
            c = d.addFn(e) + d.callFn
        }
    }
    if (d.maxLevel < b) {
        d.maxLevel = b;
        d.body.push("var ")
    }
    if (e == ".") {
        g = "c" + b
    } else {
        g = "a" + a + "?c" + a + "[i" + a + "]:c" + a
    }
    d.body.push("i", b, "=0,n", b, "=0,c", b, "=", c, ",a", b, "=", d.createArrayTest(b), ",r", b, "=values,p", b, ",k", b, ";\n", "p", b, "=parent=", g, "\n", "if (c", b, "){if(a", b, "){n", b, "=c", b, ".length;}else if (c", b, ".isMixedCollection){c", b, "=c", b, ".items;n", b, "=c", b, ".length;}else if(c", b, ".isStore){c", b, "=c", b, ".data.items;n", b, "=c", b, ".length;}else{c", b, "=[c", b, "];n", b, "=1;}}\n", "for (xcount=n", b, ";i", b, "<n" + b + ";++i", b, "){\n", "values=c", b, "[i", b, "]");
    if (h.propName) {
        d.body.push(".", h.propName)
    }
    d.body.push("\n", "xindex=i", b, "+1\n");
    if (h.between) {
        d.body.push('if(xindex>1){ out.push("', h.between, '"); } \n')
    }
}, doForEach: function (e, h) {
    var d = this, c, b = d.level, a = b - 1, g;
    if (e === ".") {
        c = "values"
    } else {
        if (d.propNameRe.test(e)) {
            c = d.parseTag(e)
        } else {
            c = d.addFn(e) + d.callFn
        }
    }
    if (d.maxLevel < b) {
        d.maxLevel = b;
        d.body.push("var ")
    }
    if (e == ".") {
        g = "c" + b
    } else {
        g = "a" + a + "?c" + a + "[i" + a + "]:c" + a
    }
    d.body.push("i", b, "=-1,n", b, "=0,c", b, "=", c, ",a", b, "=", d.createArrayTest(b), ",r", b, "=values,p", b, ",k", b, ";\n", "p", b, "=parent=", g, "\n", "for(k", b, " in c", b, "){\n", "xindex=++i", b, "+1;\n", "xkey=k", b, ";\n", "values=c", b, "[k", b, "];");
    if (h.propName) {
        d.body.push(".", h.propName)
    }
    if (h.between) {
        d.body.push('if(xindex>1){ out.push("', h.between, '"); } \n')
    }
}, createArrayTest: ("isArray" in Array) ? function (a) {
    return"Array.isArray(c" + a + ")"
} : function (a) {
    return"ts.call(c" + a + ')==="[object Array]"'
}, doExec: function (c, d) {
    var b = this, a = "f" + b.definitions.length;
    b.definitions.push("function " + a + "(" + b.fnArgs + ") {", " try { with(values) {", "  " + c, " }} catch(e) {", "}", "}");
    b.body.push(a + b.callFn + "\n")
}, addFn: function (a) {
    var c = this, b = "f" + c.definitions.length;
    if (a === ".") {
        c.definitions.push("function " + b + "(" + c.fnArgs + ") {", " return values", "}")
    } else {
        if (a === "..") {
            c.definitions.push("function " + b + "(" + c.fnArgs + ") {", " return parent", "}")
        } else {
            c.definitions.push("function " + b + "(" + c.fnArgs + ") {", " try { with(values) {", "  return(" + a + ")", " }} catch(e) {", "}", "}")
        }
    }
    return b
}, parseTag: function (b) {
    var h = this, a = h.tagRe.exec(b), e, i, d, g, c;
    if (!a) {
        return null
    }
    e = a[1];
    i = a[2];
    d = a[3];
    g = a[4];
    if (e == ".") {
        if (!h.validTypes) {
            h.definitions.push("var validTypes={string:1,number:1,boolean:1};");
            h.validTypes = true
        }
        c = 'validTypes[typeof values] || ts.call(values) === "[object Date]" ? values : ""'
    } else {
        if (e == "#") {
            c = "xindex"
        } else {
            if (e == "$") {
                c = "xkey"
            } else {
                if (e.substr(0, 7) == "parent.") {
                    c = e
                } else {
                    if (isNaN(e) && e.indexOf("-") == -1 && e.indexOf(".") != -1) {
                        c = "values." + e
                    } else {
                        c = "values['" + e + "']"
                    }
                }
            }
        }
    }
    if (g) {
        c = "(" + c + g + ")"
    }
    if (i && h.useFormat) {
        d = d ? "," + d : "";
        if (i.substr(0, 5) != "this.") {
            i = "fm." + i + "("
        } else {
            i += "("
        }
    } else {
        return c
    }
    return i + c + d + ")"
}, evalTpl: function ($) {
    eval($);
    return $
}, newLineRe: /\r\n|\r|\n/g, aposRe: /[']/g, intRe: /^\s*(\d+)\s*$/, tagRe: /^([\w-\.\#\$]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\/]\s?[\d\.\+\-\*\/\(\)]+)?$/}, function () {
    var a = this.prototype;
    a.fnArgs = "out,values,parent,xindex,xcount,xkey";
    a.callFn = ".call(this," + a.fnArgs + ")"
});
Ext.define("Ext.XTemplate", {extend: Ext.Template, emptyObj: {}, apply: function (a, b) {
    return this.applyOut(a, [], b).join("")
}, applyOut: function (a, b, d) {
    var g = this, c;
    if (!g.fn) {
        c = new Ext.XTemplateCompiler({useFormat: g.disableFormats !== true, definitions: g.definitions});
        g.fn = c.compile(g.html)
    }
    try {
        g.fn(b, a, d || g.emptyObj, 1, 1)
    } catch (h) {
    }
    return b
}, compile: function () {
    return this
}, statics: {getTpl: function (b, d) {
    var c = b[d], a;
    if (c && !c.isTemplate) {
        c = Ext.ClassManager.dynInstantiate("Ext.XTemplate", c);
        if (b.hasOwnProperty(d)) {
            a = b
        } else {
            for (a = b.self.prototype; a && !a.hasOwnProperty(d); a = a.superclass) {
            }
        }
        a[d] = c;
        c.owner = a
    }
    return c || null
}}});
Ext.ns("Ext.core");
Ext.dom.Query = Ext.core.DomQuery = Ext.DomQuery = (function () {
    var DQ, doc = document, cache = {}, simpleCache = {}, valueCache = {}, useClassList = !!doc.documentElement.classList, useElementPointer = !!doc.documentElement.firstElementChild, useChildrenCollection = (function () {
        var d = doc.createElement("div");
        d.innerHTML = "<!-- -->text<!-- -->";
        return d.children && (d.children.length === 0)
    })(), nonSpace = /\S/, trimRe = /^\s+|\s+$/g, tplRe = /\{(\d+)\}/g, modeRe = /^(\s?[\/>+~]\s?|\s|$)/, tagTokenRe = /^(#)?([\w\-\*\|\\]+)/, nthRe = /(\d*)n\+?(\d*)/, nthRe2 = /\D/, startIdRe = /^\s*#/, isIE = window.ActiveXObject ? true : false, key = 30803, longHex = /\\([0-9a-fA-F]{6})/g, shortHex = /\\([0-9a-fA-F]{1,6})\s{0,1}/g, nonHex = /\\([^0-9a-fA-F]{1})/g, escapes = /\\/g, num, hasEscapes, supportsColonNsSeparator = (function () {
        var xmlDoc, xmlString = '<r><a:b xmlns:a="n"></a:b></r>';
        if (window.DOMParser) {
            xmlDoc = (new DOMParser()).parseFromString(xmlString, "application/xml")
        } else {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.loadXML(xmlString)
        }
        return !!xmlDoc.getElementsByTagName("a:b").length
    })(), longHexToChar = function ($0, $1) {
        return String.fromCharCode(parseInt($1, 16))
    }, shortToLongHex = function ($0, $1) {
        while ($1.length < 6) {
            $1 = "0" + $1
        }
        return"\\" + $1
    }, charToLongHex = function ($0, $1) {
        num = $1.charCodeAt(0).toString(16);
        if (num.length === 1) {
            num = "0" + num
        }
        return"\\0000" + num
    }, unescapeCssSelector = function (selector) {
        return(hasEscapes) ? selector.replace(longHex, longHexToChar) : selector
    }, setupEscapes = function (path) {
        hasEscapes = (path.indexOf("\\") > -1);
        if (hasEscapes) {
            path = path.replace(shortHex, shortToLongHex).replace(nonHex, charToLongHex).replace(escapes, "\\\\")
        }
        return path
    };
    eval("var batch = 30803, child, next, prev, byClassName;");
    child = useChildrenCollection ? function child(parent, index) {
        return parent.children[index]
    } : function child(parent, index) {
        var i = 0, n = parent.firstChild;
        while (n) {
            if (n.nodeType == 1) {
                if (++i == index) {
                    return n
                }
            }
            n = n.nextSibling
        }
        return null
    };
    next = useElementPointer ? function (n) {
        return n.nextElementSibling
    } : function (n) {
        while ((n = n.nextSibling) && n.nodeType != 1) {
        }
        return n
    };
    prev = useElementPointer ? function (n) {
        return n.previousElementSibling
    } : function (n) {
        while ((n = n.previousSibling) && n.nodeType != 1) {
        }
        return n
    };
    function children(parent) {
        var n = parent.firstChild, nodeIndex = -1, nextNode;
        while (n) {
            nextNode = n.nextSibling;
            if (n.nodeType == 3 && !nonSpace.test(n.nodeValue)) {
                parent.removeChild(n)
            } else {
                n.nodeIndex = ++nodeIndex
            }
            n = nextNode
        }
        return this
    }

    byClassName = useClassList ? function (nodeSet, cls) {
        cls = unescapeCssSelector(cls);
        if (!cls) {
            return nodeSet
        }
        var result = [], ri = -1, i, ci, classList;
        for (i = 0; ci = nodeSet[i]; i++) {
            classList = ci.classList;
            if (classList) {
                if (classList.contains(cls)) {
                    result[++ri] = ci
                }
            } else {
                if ((" " + ci.className + " ").indexOf(cls) !== -1) {
                    result[++ri] = ci
                }
            }
        }
        return result
    } : function (nodeSet, cls) {
        cls = unescapeCssSelector(cls);
        if (!cls) {
            return nodeSet
        }
        var result = [], ri = -1, i, ci;
        for (i = 0; ci = nodeSet[i]; i++) {
            if ((" " + ci.className + " ").indexOf(cls) !== -1) {
                result[++ri] = ci
            }
        }
        return result
    };
    function attrValue(n, attr) {
        if (!n.tagName && typeof n.length != "undefined") {
            n = n[0]
        }
        if (!n) {
            return null
        }
        if (attr == "for") {
            return n.htmlFor
        }
        if (attr == "class" || attr == "className") {
            return n.className
        }
        return n.getAttribute(attr) || n[attr]
    }

    function getNodes(ns, mode, tagName) {
        var result = [], ri = -1, cs, i, ni, j, ci, cn, utag, n, cj;
        if (!ns) {
            return result
        }
        tagName = tagName.replace("|", ":") || "*";
        if (typeof ns.getElementsByTagName != "undefined") {
            ns = [ns]
        }
        if (!mode) {
            tagName = unescapeCssSelector(tagName);
            if (!supportsColonNsSeparator && DQ.isXml(ns[0]) && tagName.indexOf(":") !== -1) {
                for (i = 0; ni = ns[i]; i++) {
                    cs = ni.getElementsByTagName(tagName.split(":").pop());
                    for (j = 0; ci = cs[j]; j++) {
                        if (ci.tagName === tagName) {
                            result[++ri] = ci
                        }
                    }
                }
            } else {
                for (i = 0; ni = ns[i]; i++) {
                    cs = ni.getElementsByTagName(tagName);
                    for (j = 0; ci = cs[j]; j++) {
                        result[++ri] = ci
                    }
                }
            }
        } else {
            if (mode == "/" || mode == ">") {
                utag = tagName.toUpperCase();
                for (i = 0; ni = ns[i]; i++) {
                    cn = ni.childNodes;
                    for (j = 0; cj = cn[j]; j++) {
                        if (cj.nodeName == utag || cj.nodeName == tagName || tagName == "*") {
                            result[++ri] = cj
                        }
                    }
                }
            } else {
                if (mode == "+") {
                    utag = tagName.toUpperCase();
                    for (i = 0; n = ns[i]; i++) {
                        while ((n = n.nextSibling) && n.nodeType != 1) {
                        }
                        if (n && (n.nodeName == utag || n.nodeName == tagName || tagName == "*")) {
                            result[++ri] = n
                        }
                    }
                } else {
                    if (mode == "~") {
                        utag = tagName.toUpperCase();
                        for (i = 0; n = ns[i]; i++) {
                            while ((n = n.nextSibling)) {
                                if (n.nodeName == utag || n.nodeName == tagName || tagName == "*") {
                                    result[++ri] = n
                                }
                            }
                        }
                    }
                }
            }
        }
        return result
    }

    function concat(a, b) {
        a.push.apply(a, b);
        return a
    }

    function byTag(cs, tagName) {
        if (cs.tagName || cs === doc) {
            cs = [cs]
        }
        if (!tagName) {
            return cs
        }
        var result = [], ri = -1, i, ci;
        tagName = tagName.toLowerCase();
        for (i = 0; ci = cs[i]; i++) {
            if (ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName) {
                result[++ri] = ci
            }
        }
        return result
    }

    function byId(cs, id) {
        id = unescapeCssSelector(id);
        if (cs.tagName || cs === doc) {
            cs = [cs]
        }
        if (!id) {
            return cs
        }
        var result = [], ri = -1, i, ci;
        for (i = 0; ci = cs[i]; i++) {
            if (ci && ci.id == id) {
                result[++ri] = ci;
                return result
            }
        }
        return result
    }

    function byAttribute(cs, attr, value, op, custom) {
        var result = [], ri = -1, useGetStyle = custom == "{", fn = DQ.operators[op], a, xml, hasXml, i, ci;
        value = unescapeCssSelector(value);
        for (i = 0; ci = cs[i]; i++) {
            if (ci.nodeType === 1) {
                if (!hasXml) {
                    xml = DQ.isXml(ci);
                    hasXml = true
                }
                if (!xml) {
                    if (useGetStyle) {
                        a = DQ.getStyle(ci, attr)
                    } else {
                        if (attr == "class" || attr == "className") {
                            a = ci.className
                        } else {
                            if (attr == "for") {
                                a = ci.htmlFor
                            } else {
                                if (attr == "href") {
                                    a = ci.getAttribute("href", 2)
                                } else {
                                    a = ci.getAttribute(attr)
                                }
                            }
                        }
                    }
                } else {
                    a = ci.getAttribute(attr)
                }
                if ((fn && fn(a, value)) || (!fn && a)) {
                    result[++ri] = ci
                }
            }
        }
        return result
    }

    function byPseudo(cs, name, value) {
        value = unescapeCssSelector(value);
        return DQ.pseudos[name](cs, value)
    }

    function nodupIEXml(cs) {
        var d = ++key, r, i, len, c;
        cs[0].setAttribute("_nodup", d);
        r = [cs[0]];
        for (i = 1, len = cs.length; i < len; i++) {
            c = cs[i];
            if (!c.getAttribute("_nodup") != d) {
                c.setAttribute("_nodup", d);
                r[r.length] = c
            }
        }
        for (i = 0, len = cs.length; i < len; i++) {
            cs[i].removeAttribute("_nodup")
        }
        return r
    }

    function nodup(cs) {
        if (!cs) {
            return[]
        }
        var len = cs.length, c, i, r = cs, cj, ri = -1, d, j;
        if (!len || typeof cs.nodeType != "undefined" || len == 1) {
            return cs
        }
        if (isIE && typeof cs[0].selectSingleNode != "undefined") {
            return nodupIEXml(cs)
        }
        d = ++key;
        cs[0]._nodup = d;
        for (i = 1; c = cs[i]; i++) {
            if (c._nodup != d) {
                c._nodup = d
            } else {
                r = [];
                for (j = 0; j < i; j++) {
                    r[++ri] = cs[j]
                }
                for (j = i + 1; cj = cs[j]; j++) {
                    if (cj._nodup != d) {
                        cj._nodup = d;
                        r[++ri] = cj
                    }
                }
                return r
            }
        }
        return r
    }

    function quickDiffIEXml(c1, c2) {
        var d = ++key, r = [], i, len;
        for (i = 0, len = c1.length; i < len; i++) {
            c1[i].setAttribute("_qdiff", d)
        }
        for (i = 0, len = c2.length; i < len; i++) {
            if (c2[i].getAttribute("_qdiff") != d) {
                r[r.length] = c2[i]
            }
        }
        for (i = 0, len = c1.length; i < len; i++) {
            c1[i].removeAttribute("_qdiff")
        }
        return r
    }

    function quickDiff(c1, c2) {
        var len1 = c1.length, d = ++key, r = [], i, len;
        if (!len1) {
            return c2
        }
        if (isIE && typeof c1[0].selectSingleNode != "undefined") {
            return quickDiffIEXml(c1, c2)
        }
        for (i = 0; i < len1; i++) {
            c1[i]._qdiff = d
        }
        for (i = 0, len = c2.length; i < len; i++) {
            if (c2[i]._qdiff != d) {
                r[r.length] = c2[i]
            }
        }
        return r
    }

    function quickId(ns, mode, root, id) {
        if (ns == root) {
            id = unescapeCssSelector(id);
            var d = root.ownerDocument || root;
            return d.getElementById(id)
        }
        ns = getNodes(ns, mode, "*");
        return byId(ns, id)
    }

    return DQ = {getStyle: function (el, name) {
        return Ext.fly(el, "_DomQuery").getStyle(name)
    }, compile: function (path, type) {
        type = type || "select";
        var fn = ["var f = function(root) {\n var mode; ++batch; var n = root || document;\n"], lastPath, matchers = DQ.matchers, matchersLn = matchers.length, modeMatch, lmode = path.match(modeRe), tokenMatch, matched, j, t, m;
        path = setupEscapes(path);
        if (lmode && lmode[1]) {
            fn[fn.length] = 'mode="' + lmode[1].replace(trimRe, "") + '";';
            path = path.replace(lmode[1], "")
        }
        while (path.substr(0, 1) == "/") {
            path = path.substr(1)
        }
        while (path && lastPath != path) {
            lastPath = path;
            tokenMatch = path.match(tagTokenRe);
            if (type == "select") {
                if (tokenMatch) {
                    if (tokenMatch[1] == "#") {
                        fn[fn.length] = 'n = quickId(n, mode, root, "' + tokenMatch[2] + '");'
                    } else {
                        fn[fn.length] = 'n = getNodes(n, mode, "' + tokenMatch[2] + '");'
                    }
                    path = path.replace(tokenMatch[0], "")
                } else {
                    if (path.substr(0, 1) != "@") {
                        fn[fn.length] = 'n = getNodes(n, mode, "*");'
                    }
                }
            } else {
                if (tokenMatch) {
                    if (tokenMatch[1] == "#") {
                        fn[fn.length] = 'n = byId(n, "' + tokenMatch[2] + '");'
                    } else {
                        fn[fn.length] = 'n = byTag(n, "' + tokenMatch[2] + '");'
                    }
                    path = path.replace(tokenMatch[0], "")
                }
            }
            while (!(modeMatch = path.match(modeRe))) {
                matched = false;
                for (j = 0; j < matchersLn; j++) {
                    t = matchers[j];
                    m = path.match(t.re);
                    if (m) {
                        fn[fn.length] = t.select.replace(tplRe, function (x, i) {
                            return m[i]
                        });
                        path = path.replace(m[0], "");
                        matched = true;
                        break
                    }
                }
                if (!matched) {
                    Ext.Error.raise({sourceClass: "Ext.DomQuery", sourceMethod: "compile", msg: 'Error parsing selector. Parsing failed at "' + path + '"'})
                }
            }
            if (modeMatch[1]) {
                fn[fn.length] = 'mode="' + modeMatch[1].replace(trimRe, "") + '";';
                path = path.replace(modeMatch[1], "")
            }
        }
        fn[fn.length] = "return nodup(n);\n}";
        eval(fn.join(""));
        return f
    }, jsSelect: function (path, root, type) {
        root = root || doc;
        if (typeof root == "string") {
            root = doc.getElementById(root)
        }
        var paths = path.split(","), results = [], i, len, subPath, result;
        for (i = 0, len = paths.length; i < len; i++) {
            subPath = paths[i].replace(trimRe, "");
            if (!cache[subPath]) {
                cache[subPath] = DQ.compile(subPath, type);
                if (!cache[subPath]) {
                    Ext.Error.raise({sourceClass: "Ext.DomQuery", sourceMethod: "jsSelect", msg: subPath + " is not a valid selector"})
                }
            } else {
                setupEscapes(subPath)
            }
            result = cache[subPath](root);
            if (result && result !== doc) {
                results = results.concat(result)
            }
        }
        if (paths.length > 1) {
            return nodup(results)
        }
        return results
    }, isXml: function (el) {
        var docEl = (el ? el.ownerDocument || el : 0).documentElement;
        return docEl ? docEl.nodeName !== "HTML" : false
    }, select: doc.querySelectorAll ? function (path, root, type, single) {
        root = root || doc;
        if (!DQ.isXml(root)) {
            try {
                if (root.parentNode && (root.nodeType !== 9) && path.indexOf(",") === -1 && !startIdRe.test(path)) {
                    path = "#" + Ext.escapeId(Ext.id(root)) + " " + path;
                    root = root.parentNode
                }
                return single ? [root.querySelector(path)] : Ext.Array.toArray(root.querySelectorAll(path))
            } catch (e) {
            }
        }
        return DQ.jsSelect.call(this, path, root, type)
    } : function (path, root, type) {
        return DQ.jsSelect.call(this, path, root, type)
    }, selectNode: function (path, root) {
        return Ext.DomQuery.select(path, root, null, true)[0]
    }, selectValue: function (path, root, defaultValue) {
        path = path.replace(trimRe, "");
        if (!valueCache[path]) {
            valueCache[path] = DQ.compile(path, "select")
        } else {
            setupEscapes(path)
        }
        var n = valueCache[path](root), v;
        n = n[0] ? n[0] : n;
        if (typeof n.normalize == "function") {
            n.normalize()
        }
        v = (n && n.firstChild ? n.firstChild.nodeValue : null);
        return((v === null || v === undefined || v === "") ? defaultValue : v)
    }, selectNumber: function (path, root, defaultValue) {
        var v = DQ.selectValue(path, root, defaultValue || 0);
        return parseFloat(v)
    }, is: function (el, ss) {
        if (typeof el == "string") {
            el = doc.getElementById(el)
        }
        var isArray = Ext.isArray(el), result = DQ.filter(isArray ? el : [el], ss);
        return isArray ? (result.length == el.length) : (result.length > 0)
    }, filter: function (els, ss, nonMatches) {
        ss = ss.replace(trimRe, "");
        if (!simpleCache[ss]) {
            simpleCache[ss] = DQ.compile(ss, "simple")
        } else {
            setupEscapes(ss)
        }
        var result = simpleCache[ss](els);
        return nonMatches ? quickDiff(result, els) : result
    }, matchers: [
        {re: /^\.([\w\-\\]+)/, select: useClassList ? 'n = byClassName(n, "{1}");' : 'n = byClassName(n, " {1} ");'},
        {re: /^\:([\w\-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/, select: 'n = byPseudo(n, "{1}", "{2}");'},
        {re: /^(?:([\[\{])(?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/, select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'},
        {re: /^#([\w\-\\]+)/, select: 'n = byId(n, "{1}");'},
        {re: /^@([\w\-\.]+)/, select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'}
    ], operators: {"=": function (a, v) {
        return a == v
    }, "!=": function (a, v) {
        return a != v
    }, "^=": function (a, v) {
        return a && a.substr(0, v.length) == v
    }, "$=": function (a, v) {
        return a && a.substr(a.length - v.length) == v
    }, "*=": function (a, v) {
        return a && a.indexOf(v) !== -1
    }, "%=": function (a, v) {
        return(a % v) == 0
    }, "|=": function (a, v) {
        return a && (a == v || a.substr(0, v.length + 1) == v + "-")
    }, "~=": function (a, v) {
        return a && (" " + a + " ").indexOf(" " + v + " ") != -1
    }}, pseudos: {"first-child": function (c) {
        var r = [], ri = -1, n, i, ci;
        for (i = 0; (ci = n = c[i]); i++) {
            while ((n = n.previousSibling) && n.nodeType != 1) {
            }
            if (!n) {
                r[++ri] = ci
            }
        }
        return r
    }, "last-child": function (c) {
        var r = [], ri = -1, n, i, ci;
        for (i = 0; (ci = n = c[i]); i++) {
            while ((n = n.nextSibling) && n.nodeType != 1) {
            }
            if (!n) {
                r[++ri] = ci
            }
        }
        return r
    }, "nth-child": function (c, a) {
        var r = [], ri = -1, m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a), f = (m[1] || 1) - 0, l = m[2] - 0, i, n, j, cn, pn;
        for (i = 0; n = c[i]; i++) {
            pn = n.parentNode;
            if (batch != pn._batch) {
                j = 0;
                for (cn = pn.firstChild; cn; cn = cn.nextSibling) {
                    if (cn.nodeType == 1) {
                        cn.nodeIndex = ++j
                    }
                }
                pn._batch = batch
            }
            if (f == 1) {
                if (l == 0 || n.nodeIndex == l) {
                    r[++ri] = n
                }
            } else {
                if ((n.nodeIndex + l) % f == 0) {
                    r[++ri] = n
                }
            }
        }
        return r
    }, "only-child": function (c) {
        var r = [], ri = -1, i, ci;
        for (i = 0; ci = c[i]; i++) {
            if (!prev(ci) && !next(ci)) {
                r[++ri] = ci
            }
        }
        return r
    }, empty: function (c) {
        var r = [], ri = -1, i, ci, cns, j, cn, empty;
        for (i = 0; ci = c[i]; i++) {
            cns = ci.childNodes;
            j = 0;
            empty = true;
            while (cn = cns[j]) {
                ++j;
                if (cn.nodeType == 1 || cn.nodeType == 3) {
                    empty = false;
                    break
                }
            }
            if (empty) {
                r[++ri] = ci
            }
        }
        return r
    }, contains: function (c, v) {
        var r = [], ri = -1, i, ci;
        for (i = 0; ci = c[i]; i++) {
            if ((ci.textContent || ci.innerText || ci.text || "").indexOf(v) != -1) {
                r[++ri] = ci
            }
        }
        return r
    }, nodeValue: function (c, v) {
        var r = [], ri = -1, i, ci;
        for (i = 0; ci = c[i]; i++) {
            if (ci.firstChild && ci.firstChild.nodeValue == v) {
                r[++ri] = ci
            }
        }
        return r
    }, checked: function (c) {
        var r = [], ri = -1, i, ci;
        for (i = 0; ci = c[i]; i++) {
            if (ci.checked == true) {
                r[++ri] = ci
            }
        }
        return r
    }, not: function (c, ss) {
        return DQ.filter(c, ss, true)
    }, any: function (c, selectors) {
        var ss = selectors.split("|"), r = [], ri = -1, s, i, ci, j;
        for (i = 0; ci = c[i]; i++) {
            for (j = 0; s = ss[j]; j++) {
                if (DQ.is(ci, s)) {
                    r[++ri] = ci;
                    break
                }
            }
        }
        return r
    }, odd: function (c) {
        return this["nth-child"](c, "odd")
    }, even: function (c) {
        return this["nth-child"](c, "even")
    }, nth: function (c, a) {
        return c[a - 1] || []
    }, first: function (c) {
        return c[0] || []
    }, last: function (c) {
        return c[c.length - 1] || []
    }, has: function (c, ss) {
        var s = DQ.select, r = [], ri = -1, i, ci;
        for (i = 0; ci = c[i]; i++) {
            if (s(ss, ci).length > 0) {
                r[++ri] = ci
            }
        }
        return r
    }, next: function (c, ss) {
        var is = DQ.is, r = [], ri = -1, i, ci, n;
        for (i = 0; ci = c[i]; i++) {
            n = next(ci);
            if (n && is(n, ss)) {
                r[++ri] = ci
            }
        }
        return r
    }, prev: function (c, ss) {
        var is = DQ.is, r = [], ri = -1, i, ci, n;
        for (i = 0; ci = c[i]; i++) {
            n = prev(ci);
            if (n && is(n, ss)) {
                r[++ri] = ci
            }
        }
        return r
    }, focusable: function (candidates) {
        var len = candidates.length, results = [], i = 0, c;
        for (; i < len; i++) {
            c = candidates[i];
            if (Ext.fly(c, "_DomQuery").isFocusable()) {
                results.push(c)
            }
        }
        return results
    }, visible: function (candidates, deep) {
        var len = candidates.length, results = [], i = 0, c;
        for (; i < len; i++) {
            c = candidates[i];
            if (Ext.fly(c, "_DomQuery").isVisible(deep)) {
                results.push(c)
            }
        }
        return results
    }}}
}());
Ext.query = Ext.DomQuery.select;
Ext.define("Ext.dom.Element_anim", {override: "Ext.dom.Element", animate: function (b) {
    var d = this, c, e, a = d.dom.id || Ext.id(d.dom);
    if (!Ext.fx.Manager.hasFxBlock(a)) {
        if (b.listeners) {
            c = b.listeners;
            delete b.listeners
        }
        if (b.internalListeners) {
            b.listeners = b.internalListeners;
            delete b.internalListeners
        }
        e = new Ext.fx.Anim(d.anim(b));
        if (c) {
            e.on(c)
        }
        Ext.fx.Manager.queueFx(e)
    }
    return d
}, anim: function (a) {
    if (!Ext.isObject(a)) {
        return(a) ? {} : false
    }
    var b = this, c = a.duration || Ext.fx.Anim.prototype.duration, e = a.easing || "ease", d;
    if (a.stopAnimation) {
        b.stopAnimation()
    }
    Ext.applyIf(a, Ext.fx.Manager.getFxDefaults(b.id));
    Ext.fx.Manager.setFxDefaults(b.id, {delay: 0});
    d = {target: b.dom, remove: a.remove, alternate: a.alternate || false, duration: c, easing: e, callback: a.callback, listeners: a.listeners, iterations: a.iterations || 1, scope: a.scope, block: a.block, concurrent: a.concurrent, delay: a.delay || 0, paused: true, keyframes: a.keyframes, from: a.from || {}, to: Ext.apply({}, a)};
    Ext.apply(d.to, a.to);
    delete d.to.to;
    delete d.to.from;
    delete d.to.remove;
    delete d.to.alternate;
    delete d.to.keyframes;
    delete d.to.iterations;
    delete d.to.listeners;
    delete d.to.target;
    delete d.to.paused;
    delete d.to.callback;
    delete d.to.scope;
    delete d.to.duration;
    delete d.to.easing;
    delete d.to.concurrent;
    delete d.to.block;
    delete d.to.stopAnimation;
    delete d.to.delay;
    return d
}, slideIn: function (d, c, e) {
    var h = this, b = h.dom, k = b.style, j, a, g, i;
    d = d || "t";
    c = c || {};
    j = function () {
        var p = this, o = c.listeners, n = Ext.fly(b, "_anim"), q, l, r, m;
        if (!e) {
            n.fixDisplay()
        }
        q = n.getBox();
        if ((d == "t" || d == "b") && q.height === 0) {
            q.height = b.scrollHeight
        } else {
            if ((d == "l" || d == "r") && q.width === 0) {
                q.width = b.scrollWidth
            }
        }
        l = n.getStyles("width", "height", "left", "right", "top", "bottom", "position", "z-index", true);
        n.setSize(q.width, q.height);
        if (c.preserveScroll) {
            g = n.cacheScrollValues()
        }
        m = n.wrap({id: Ext.id() + "-anim-wrap-for-" + n.dom.id, style: {visibility: e ? "visible" : "hidden"}});
        i = m.dom.parentNode;
        m.setPositioning(n.getPositioning(true));
        if (m.isStyle("position", "static")) {
            m.position("relative")
        }
        n.clearPositioning("auto");
        m.clip();
        if (g) {
            g()
        }
        n.setStyle({visibility: "", position: "absolute"});
        if (e) {
            m.setSize(q.width, q.height)
        }
        switch (d) {
            case"t":
                r = {from: {width: q.width + "px", height: "0px"}, to: {width: q.width + "px", height: q.height + "px"}};
                k.bottom = "0px";
                break;
            case"l":
                r = {from: {width: "0px", height: q.height + "px"}, to: {width: q.width + "px", height: q.height + "px"}};
                h.anchorAnimX(d);
                break;
            case"r":
                r = {from: {x: q.x + q.width, width: "0px", height: q.height + "px"}, to: {x: q.x, width: q.width + "px", height: q.height + "px"}};
                h.anchorAnimX(d);
                break;
            case"b":
                r = {from: {y: q.y + q.height, width: q.width + "px", height: "0px"}, to: {y: q.y, width: q.width + "px", height: q.height + "px"}};
                break;
            case"tl":
                r = {from: {x: q.x, y: q.y, width: "0px", height: "0px"}, to: {width: q.width + "px", height: q.height + "px"}};
                k.bottom = "0px";
                h.anchorAnimX("l");
                break;
            case"bl":
                r = {from: {y: q.y + q.height, width: "0px", height: "0px"}, to: {y: q.y, width: q.width + "px", height: q.height + "px"}};
                h.anchorAnimX("l");
                break;
            case"br":
                r = {from: {x: q.x + q.width, y: q.y + q.height, width: "0px", height: "0px"}, to: {x: q.x, y: q.y, width: q.width + "px", height: q.height + "px"}};
                h.anchorAnimX("r");
                break;
            case"tr":
                r = {from: {x: q.x + q.width, width: "0px", height: "0px"}, to: {x: q.x, width: q.width + "px", height: q.height + "px"}};
                k.bottom = "0px";
                h.anchorAnimX("r");
                break
        }
        m.show();
        a = Ext.apply({}, c);
        delete a.listeners;
        a = new Ext.fx.Anim(Ext.applyIf(a, {target: m, duration: 500, easing: "ease-out", from: e ? r.to : r.from, to: e ? r.from : r.to}));
        a.on("afteranimate", function () {
            var s = Ext.fly(b, "_anim");
            s.setStyle(l);
            if (e) {
                if (c.useDisplay) {
                    s.setDisplayed(false)
                } else {
                    s.hide()
                }
            }
            if (m.dom) {
                if (m.dom.parentNode) {
                    m.dom.parentNode.insertBefore(s.dom, m.dom)
                } else {
                    i.appendChild(s.dom)
                }
                m.remove()
            }
            if (g) {
                g()
            }
            p.end()
        });
        if (o) {
            a.on(o)
        }
    };
    h.animate({duration: c.duration ? Math.max(c.duration, 500) * 2 : 1000, listeners: {beforeanimate: j}});
    return h
}, slideOut: function (a, b) {
    return this.slideIn(a, b, true)
}, puff: function (e) {
    var d = this, g = d.dom, b, c = d.getBox(), a = d.getStyles("width", "height", "left", "right", "top", "bottom", "position", "z-index", "font-size", "opacity", true);
    e = Ext.applyIf(e || {}, {easing: "ease-out", duration: 500, useDisplay: false});
    b = function () {
        var h = Ext.fly(g, "_anim");
        h.clearOpacity();
        h.show();
        this.to = {width: c.width * 2, height: c.height * 2, x: c.x - (c.width / 2), y: c.y - (c.height / 2), opacity: 0, fontSize: "200%"};
        this.on("afteranimate", function () {
            var i = Ext.fly(g, "_anim");
            if (i) {
                if (e.useDisplay) {
                    i.setDisplayed(false)
                } else {
                    i.hide()
                }
                i.setStyle(a);
                Ext.callback(e.callback, e.scope)
            }
        })
    };
    d.animate({duration: e.duration, easing: e.easing, listeners: {beforeanimate: {fn: b}}});
    return d
}, switchOff: function (c) {
    var b = this, d = b.dom, a;
    c = Ext.applyIf(c || {}, {easing: "ease-in", duration: 500, remove: false, useDisplay: false});
    a = function () {
        var j = Ext.fly(d, "_anim"), i = this, h = j.getSize(), k = j.getXY(), g, e;
        j.clearOpacity();
        j.clip();
        e = j.getPositioning();
        g = new Ext.fx.Animator({target: d, duration: c.duration, easing: c.easing, keyframes: {33: {opacity: 0.3}, 66: {height: 1, y: k[1] + h.height / 2}, 100: {width: 1, x: k[0] + h.width / 2}}});
        g.on("afteranimate", function () {
            var l = Ext.fly(d, "_anim");
            if (c.useDisplay) {
                l.setDisplayed(false)
            } else {
                l.hide()
            }
            l.clearOpacity();
            l.setPositioning(e);
            l.setSize(h);
            i.end()
        })
    };
    b.animate({duration: (Math.max(c.duration, 500) * 2), listeners: {beforeanimate: {fn: a}}});
    return b
}, frame: function (a, d, e) {
    var c = this, g = c.dom, b;
    a = a || "#C3DAF9";
    d = d || 1;
    e = e || {};
    b = function () {
        var k = Ext.fly(g, "_anim"), j = this, l, i, h;
        k.show();
        l = k.getBox();
        i = Ext.getBody().createChild({id: k.dom.id + "-anim-proxy", style: {position: "absolute", "pointer-events": "none", "z-index": 35000, border: "0px solid " + a}});
        h = new Ext.fx.Anim({target: i, duration: e.duration || 1000, iterations: d, from: {top: l.y, left: l.x, borderWidth: 0, opacity: 1, height: l.height, width: l.width}, to: {top: l.y - 20, left: l.x - 20, borderWidth: 10, opacity: 0, height: l.height + 40, width: l.width + 40}});
        h.on("afteranimate", function () {
            i.remove();
            j.end()
        })
    };
    c.animate({duration: (Math.max(e.duration, 500) * 2) || 2000, listeners: {beforeanimate: {fn: b}}});
    return c
}, ghost: function (a, d) {
    var c = this, e = c.dom, b;
    a = a || "b";
    b = function () {
        var j = Ext.fly(e, "_anim"), i = j.getWidth(), h = j.getHeight(), k = j.getXY(), g = j.getPositioning(), l = {opacity: 0};
        switch (a) {
            case"t":
                l.y = k[1] - h;
                break;
            case"l":
                l.x = k[0] - i;
                break;
            case"r":
                l.x = k[0] + i;
                break;
            case"b":
                l.y = k[1] + h;
                break;
            case"tl":
                l.x = k[0] - i;
                l.y = k[1] - h;
                break;
            case"bl":
                l.x = k[0] - i;
                l.y = k[1] + h;
                break;
            case"br":
                l.x = k[0] + i;
                l.y = k[1] + h;
                break;
            case"tr":
                l.x = k[0] + i;
                l.y = k[1] - h;
                break
        }
        this.to = l;
        this.on("afteranimate", function () {
            var m = Ext.fly(e, "_anim");
            if (m) {
                m.hide();
                m.clearOpacity();
                m.setPositioning(g)
            }
        })
    };
    c.animate(Ext.applyIf(d || {}, {duration: 500, easing: "ease-out", listeners: {beforeanimate: b}}));
    return c
}, highlight: function (d, b) {
    var i = this, e = i.dom, k = {}, h, l, g, c, a, j;
    if (e.tagName.match(i.tableTagRe)) {
        return i.select("div").highlight(d, b)
    }
    b = b || {};
    c = b.listeners || {};
    g = b.attr || "backgroundColor";
    k[g] = d || "ffff9c";
    if (!b.to) {
        l = {};
        l[g] = b.endColor || i.getColor(g, "ffffff", "")
    } else {
        l = b.to
    }
    b.listeners = Ext.apply(Ext.apply({}, c), {beforeanimate: function () {
        h = e.style[g];
        var m = Ext.fly(e, "_anim");
        m.clearOpacity();
        m.show();
        a = c.beforeanimate;
        if (a) {
            j = a.fn || a;
            return j.apply(a.scope || c.scope || window, arguments)
        }
    }, afteranimate: function () {
        if (e) {
            e.style[g] = h
        }
        a = c.afteranimate;
        if (a) {
            j = a.fn || a;
            j.apply(a.scope || c.scope || window, arguments)
        }
    }});
    i.animate(Ext.apply({}, b, {duration: 1000, easing: "ease-in", from: k, to: l}));
    return i
}, pause: function (a) {
    var b = this;
    Ext.fx.Manager.setFxDefaults(b.id, {delay: a});
    return b
}, fadeIn: function (c) {
    var a = this, b = a.dom;
    a.animate(Ext.apply({}, c, {opacity: 1, internalListeners: {beforeanimate: function (e) {
        var d = Ext.fly(b, "_anim");
        if (d.isStyle("display", "none")) {
            d.setDisplayed("")
        } else {
            d.show()
        }
    }}}));
    return this
}, fadeOut: function (c) {
    var a = this, b = a.dom;
    c = Ext.apply({opacity: 0, internalListeners: {afteranimate: function (e) {
        if (b && e.to.opacity === 0) {
            var d = Ext.fly(b, "_anim");
            if (c.useDisplay) {
                d.setDisplayed(false)
            } else {
                d.hide()
            }
        }
    }}}, c);
    a.animate(c);
    return a
}, scale: function (a, b, c) {
    this.animate(Ext.apply({}, c, {width: a, height: b}));
    return this
}, shift: function (a) {
    this.animate(a);
    return this
}, anchorAnimX: function (a) {
    var b = (a === "l") ? "right" : "left";
    this.dom.style[b] = "0px"
}});
Ext.define("Ext.dom.Element_dd", {override: "Ext.dom.Element", initDD: function (c, b, d) {
    var a = new Ext.dd.DD(Ext.id(this.dom), c, b);
    return Ext.apply(a, d)
}, initDDProxy: function (c, b, d) {
    var a = new Ext.dd.DDProxy(Ext.id(this.dom), c, b);
    return Ext.apply(a, d)
}, initDDTarget: function (c, b, d) {
    var a = new Ext.dd.DDTarget(Ext.id(this.dom), c, b);
    return Ext.apply(a, d)
}});
Ext.define("Ext.dom.Element_fx", {override: "Ext.dom.Element"}, function () {
    var b = Ext.dom.Element, i = "visibility", g = "display", n = "none", e = "hidden", m = "visible", o = "offsets", j = "asclass", a = "nosize", c = "originalDisplay", d = "visibilityMode", h = "isVisible", l = Ext.baseCSSPrefix + "hide-offsets", k = function (q) {
        var r = (q.$cache || q.getCache()).data, s = r[c];
        if (s === undefined) {
            r[c] = s = ""
        }
        return s
    }, p = function (r) {
        var s = (r.$cache || r.getCache()).data, q = s[d];
        if (q === undefined) {
            s[d] = q = b.VISIBILITY
        }
        return q
    };
    b.override({originalDisplay: "", visibilityMode: 1, setVisible: function (u, q) {
        var s = this, t = s.dom, r = p(s);
        if (typeof q == "string") {
            switch (q) {
                case g:
                    r = b.DISPLAY;
                    break;
                case i:
                    r = b.VISIBILITY;
                    break;
                case o:
                    r = b.OFFSETS;
                    break;
                case a:
                case j:
                    r = b.ASCLASS;
                    break
            }
            s.setVisibilityMode(r);
            q = false
        }
        if (!q || !s.anim) {
            if (r == b.DISPLAY) {
                return s.setDisplayed(u)
            } else {
                if (r == b.OFFSETS) {
                    s[u ? "removeCls" : "addCls"](l)
                } else {
                    if (r == b.VISIBILITY) {
                        s.fixDisplay();
                        t.style.visibility = u ? "" : e
                    } else {
                        if (r == b.ASCLASS) {
                            s[u ? "removeCls" : "addCls"](s.visibilityCls || b.visibilityCls)
                        }
                    }
                }
            }
        } else {
            if (u) {
                s.setOpacity(0.01);
                s.setVisible(true)
            }
            if (!Ext.isObject(q)) {
                q = {duration: 350, easing: "ease-in"}
            }
            s.animate(Ext.applyIf({callback: function () {
                if (!u) {
                    Ext.fly(t, "_internal").setVisible(false).setOpacity(1)
                }
            }, to: {opacity: (u) ? 1 : 0}}, q))
        }
        (s.$cache || s.getCache()).data[h] = u;
        return s
    }, hasMetrics: function () {
        var q = p(this);
        return this.isVisible() || (q == b.OFFSETS) || (q == b.VISIBILITY)
    }, toggle: function (q) {
        var r = this;
        r.setVisible(!r.isVisible(), r.anim(q));
        return r
    }, setDisplayed: function (q) {
        if (typeof q == "boolean") {
            q = q ? k(this) : n
        }
        this.setStyle(g, q);
        return this
    }, fixDisplay: function () {
        var q = this;
        if (q.isStyle(g, n)) {
            q.setStyle(i, e);
            q.setStyle(g, k(q));
            if (q.isStyle(g, n)) {
                q.setStyle(g, "block")
            }
        }
    }, hide: function (q) {
        if (typeof q == "string") {
            this.setVisible(false, q);
            return this
        }
        this.setVisible(false, this.anim(q));
        return this
    }, show: function (q) {
        if (typeof q == "string") {
            this.setVisible(true, q);
            return this
        }
        this.setVisible(true, this.anim(q));
        return this
    }})
});
Ext.define("Ext.dom.Element_position", {override: "Ext.dom.Element"}, function () {
    var x, q = this, m = "left", j = "right", p = "top", h = "bottom", n = "position", i = "static", y = "relative", u = "z-index", t = "BODY", c = "padding", s = "border", r = "-left", l = "-right", a = "-top", k = "-bottom", g = "-width", e = {l: s + r + g, r: s + l + g, t: s + a + g, b: s + k + g}, d = {l: c + r, r: c + l, t: c + a, b: c + k}, v = [d.l, d.r, d.t, d.b], b = [e.l, e.r, e.t, e.b], w = Math.round, z = document, o = function (A) {
        if (!x) {
            x = new Ext.Element.Fly()
        }
        x.attach(A);
        return x
    };
    q.override({pxRe: /^\d+(?:\.\d*)?px$/i, inheritableStatics: {getX: function (A) {
        return q.getXY(A)[0]
    }, getXY: function (C) {
        var F = z.body, B = z.documentElement, A = 0, D = 0, G = [0, 0], E, I;
        C = Ext.getDom(C);
        if (C != z && C != F) {
            if (Ext.isIE) {
                try {
                    E = C.getBoundingClientRect();
                    D = B.clientTop || F.clientTop;
                    A = B.clientLeft || F.clientLeft
                } catch (H) {
                    E = {left: 0, top: 0}
                }
            } else {
                E = C.getBoundingClientRect()
            }
            I = o(z).getScroll();
            G = [w(E.left + I.left - A), w(E.top + I.top - D)]
        }
        return G
    }, getY: function (A) {
        return q.getXY(A)[1]
    }, setX: function (B, A) {
        q.setXY(B, [A, false])
    }, setXY: function (B, C) {
        (B = Ext.fly(B, "_setXY")).position();
        var D = B.translatePoints(C), A = B.dom.style, E;
        A.right = "auto";
        for (E in D) {
            if (!isNaN(D[E])) {
                A[E] = D[E] + "px"
            }
        }
    }, setY: function (A, B) {
        q.setXY(A, [false, B])
    }}, center: function (A) {
        return this.alignTo(A || z, "c-c")
    }, clearPositioning: function (A) {
        A = A || "";
        return this.setStyle({left: A, right: A, top: A, bottom: A, "z-index": "", position: i})
    }, getAnchorToXY: function (D, A, C, B) {
        return D.getAnchorXY(A, C, B)
    }, getBottom: function (A) {
        return(A ? this.getLocalY() : this.getY()) + this.getHeight()
    }, getBorderPadding: function () {
        var A = this.getStyle(v), B = this.getStyle(b);
        return{beforeX: (parseFloat(B[e.l]) || 0) + (parseFloat(A[d.l]) || 0), afterX: (parseFloat(B[e.r]) || 0) + (parseFloat(A[d.r]) || 0), beforeY: (parseFloat(B[e.t]) || 0) + (parseFloat(A[d.t]) || 0), afterY: (parseFloat(B[e.b]) || 0) + (parseFloat(A[d.b]) || 0)}
    }, getCenterXY: function () {
        return this.getAlignToXY(z, "c-c")
    }, getLeft: function (A) {
        return A ? this.getLocalX() : this.getX()
    }, getLocalX: function () {
        var C = this, B = C.dom.offsetParent, A = C.getStyle("left");
        if (!A || A === "auto") {
            A = 0
        } else {
            if (C.pxRe.test(A)) {
                A = parseFloat(A)
            } else {
                A = C.getX();
                if (B) {
                    A -= q.getX(B)
                }
            }
        }
        return A
    }, getLocalXY: function () {
        var D = this, C = D.dom.offsetParent, B = D.getStyle(["left", "top"]), A = B.left, E = B.top;
        if (!A || A === "auto") {
            A = 0
        } else {
            if (D.pxRe.test(A)) {
                A = parseFloat(A)
            } else {
                A = D.getX();
                if (C) {
                    A -= q.getX(C)
                }
            }
        }
        if (!E || E === "auto") {
            E = 0
        } else {
            if (D.pxRe.test(E)) {
                E = parseFloat(E)
            } else {
                E = D.getY();
                if (C) {
                    E -= q.getY(C)
                }
            }
        }
        return[A, E]
    }, getLocalY: function () {
        var B = this, A = B.dom.offsetParent, C = B.getStyle("top");
        if (!C || C === "auto") {
            C = 0
        } else {
            if (B.pxRe.test(C)) {
                C = parseFloat(C)
            } else {
                C = B.getY();
                if (A) {
                    C -= q.getY(A)
                }
            }
        }
        return C
    }, getPageBox: function (C) {
        var F = this, D = F.dom, H = D.nodeName == t, I = H ? Ext.Element.getViewWidth() : D.offsetWidth, E = H ? Ext.Element.getViewHeight() : D.offsetHeight, K = F.getXY(), J = K[1], A = K[0] + I, G = K[1] + E, B = K[0];
        if (C) {
            return new Ext.util.Region(J, A, G, B)
        } else {
            return{left: B, top: J, width: I, height: E, right: A, bottom: G}
        }
    }, getPositioning: function (B) {
        var A = this.getStyle(["left", "top", "position", "z-index"]), C = this.dom;
        if (B) {
            if (A.left === "auto") {
                A.left = C.offsetLeft + "px"
            }
            if (A.top === "auto") {
                A.top = C.offsetTop + "px"
            }
        }
        return A
    }, getRight: function (A) {
        return(A ? this.getLocalX() : this.getX()) + this.getWidth()
    }, getTop: function (A) {
        return A ? this.getLocalY() : this.getY()
    }, getX: function () {
        return q.getX(this.dom)
    }, getXY: function () {
        return q.getXY(this.dom)
    }, getY: function () {
        return q.getY(this.dom)
    }, moveTo: function (A, C, B) {
        return this.setXY([A, C], B)
    }, position: function (E, D, A, C) {
        var B = this;
        if (!E && B.isStyle(n, i)) {
            B.setStyle(n, y)
        } else {
            if (E) {
                B.setStyle(n, E)
            }
        }
        if (D) {
            B.setStyle(u, D)
        }
        if (A || C) {
            B.setXY([A || false, C || false])
        }
    }, setBottom: function (A) {
        this.dom.style[h] = this.addUnits(A);
        return this
    }, setBounds: function (B, E, D, A, C) {
        return this.setBox({x: B, y: E, width: D, height: A}, C)
    }, setLeft: function (A) {
        this.dom.style[m] = this.addUnits(A);
        return this
    }, setLeftTop: function (D, C) {
        var B = this, A = B.dom.style;
        A.left = B.addUnits(D);
        A.top = B.addUnits(C);
        return B
    }, setLocalX: function (A) {
        var B = this.dom.style;
        B.right = "auto";
        B.left = (A === null) ? "auto" : A + "px"
    }, setLocalXY: function (A, C) {
        var B = this.dom.style;
        B.right = "auto";
        if (A && A.length) {
            C = A[1];
            A = A[0]
        }
        if (A === null) {
            B.left = "auto"
        } else {
            if (A !== undefined) {
                B.left = A + "px"
            }
        }
        if (C === null) {
            B.top = "auto"
        } else {
            if (C !== undefined) {
                B.top = C + "px"
            }
        }
    }, setLocalY: function (A) {
        this.dom.style.top = (A === null) ? "auto" : A + "px"
    }, setLocation: function (A, C, B) {
        return this.setXY([A, C], B)
    }, setPositioning: function (A) {
        return this.setStyle(A)
    }, setRight: function (A) {
        this.dom.style[j] = this.addUnits(A);
        return this
    }, setTop: function (A) {
        this.dom.style[p] = this.addUnits(A);
        return this
    }, setX: function (A, B) {
        return this.setXY([A, this.getY()], B)
    }, setXY: function (C, A) {
        var B = this;
        if (!A || !B.anim) {
            q.setXY(B.dom, C)
        } else {
            if (!Ext.isObject(A)) {
                A = {}
            }
            B.animate(Ext.applyIf({to: {x: C[0], y: C[1]}}, A))
        }
        return this
    }, setY: function (B, A) {
        return this.setXY([this.getX(), B], A)
    }});
    q.getTrueXY = q.getXY
});
Ext.define("Ext.dom.Element_scroll", {override: "Ext.dom.Element", isScrollable: function () {
    var a = this.dom;
    return a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth
}, getScroll: function () {
    var c = this, h = c.dom, g = document, a = g.body, b = g.documentElement, e, d;
    if (h === g || h === a) {
        e = b.scrollLeft || (a ? a.scrollLeft : 0);
        d = b.scrollTop || (a ? a.scrollTop : 0)
    } else {
        e = h.scrollLeft;
        d = h.scrollTop
    }
    return{left: e, top: d}
}, getScrollLeft: function () {
    var b = this.dom, a = document;
    if (b === a || b === a.body) {
        return this.getScroll().left
    } else {
        return b.scrollLeft
    }
}, getScrollTop: function () {
    var b = this.dom, a = document;
    if (b === a || b === a.body) {
        return this.getScroll().top
    } else {
        return b.scrollTop
    }
}, setScrollLeft: function (a) {
    this.dom.scrollLeft = this.normalizeScrollLeft(a);
    return this
}, normalizeScrollLeft: Ext.identityFn, setScrollTop: function (a) {
    this.dom.scrollTop = a;
    return this
}, scrollBy: function (b, a, c) {
    var d = this, e = d.dom;
    if (b.length) {
        c = a;
        a = b[1];
        b = b[0]
    } else {
        if (typeof b != "number") {
            c = a;
            a = b.y;
            b = b.x
        }
    }
    if (b) {
        d.scrollTo("left", Math.max(Math.min(d.getScrollLeft() + b, e.scrollWidth - e.clientWidth), 0), c)
    }
    if (a) {
        d.scrollTo("top", Math.max(Math.min(e.scrollTop + a, e.scrollHeight - e.clientHeight), 0), c)
    }
    return d
}, scrollTo: function (c, e, a) {
    var g = /top/i.test(c), i = "scroll" + (g ? "Top" : "Left"), d = this, h = d.dom, b, i;
    if (!g) {
        e = d.normalizeScrollLeft(e)
    }
    if (!a || !d.anim) {
        h[i] = e;
        h[i] = e
    } else {
        b = {to: {}};
        b.to[i] = e;
        if (Ext.isObject(a)) {
            Ext.applyIf(b, a)
        }
        d.animate(b)
    }
    return d
}, scrollIntoView: function (b, e, c) {
    var l = this, j = l.dom, h = l.getOffsetsTo(b = Ext.getDom(b) || Ext.getBody().dom), g = h[0] + b.scrollLeft, m = h[1] + b.scrollTop, a = m + j.offsetHeight, n = g + j.offsetWidth, q = b.clientHeight, p = parseInt(b.scrollTop, 10), d = parseInt(b.scrollLeft, 10), i = p + q, o = d + b.clientWidth, k;
    if (c) {
        c = Ext.apply({listeners: {afteranimate: function () {
            l.scrollChildFly.attach(j).highlight()
        }}}, c)
    }
    if (j.offsetHeight > q || m < p) {
        k = m
    } else {
        if (a > i) {
            k = a - q
        }
    }
    if (k != null) {
        l.scrollChildFly.attach(b).scrollTo("top", k, c)
    }
    if (e !== false) {
        k = null;
        if (j.offsetWidth > b.clientWidth || g < d) {
            k = g
        } else {
            if (n > o) {
                k = n - b.clientWidth
            }
        }
        if (k != null) {
            l.scrollChildFly.attach(b).scrollTo("left", k, c)
        }
    }
    return l
}, scrollChildIntoView: function (b, a) {
    this.scrollChildFly.attach(Ext.getDom(b)).scrollIntoView(this, a)
}, scroll: function (m, b, d) {
    if (!this.isScrollable()) {
        return false
    }
    var e = this.dom, g = e.scrollLeft, p = e.scrollTop, n = e.scrollWidth, k = e.scrollHeight, i = e.clientWidth, a = e.clientHeight, c = false, o, j = {l: Math.min(g + b, n - i), r: o = Math.max(g - b, 0), t: Math.max(p - b, 0), b: Math.min(p + b, k - a)};
    j.d = j.b;
    j.u = j.t;
    m = m.substr(0, 1);
    if ((o = j[m]) > -1) {
        c = true;
        this.scrollTo(m == "l" || m == "r" ? "left" : "top", o, this.anim(d))
    }
    return c
}}, function () {
    this.prototype.scrollChildFly = new this.Fly();
    this.prototype.scrolltoFly = new this.Fly()
});
Ext.define("Ext.dom.Element_style", {override: "Ext.dom.Element"}, function () {
    var r = this, n = document.defaultView, p = /table-row|table-.*-group/, a = "_internal", t = "hidden", q = "height", h = "width", e = "isClipped", j = "overflow", m = "overflow-x", l = "overflow-y", u = "originalClip", b = /#document|body/i, v, g, o, d, s, i, w;
    if (!n || !n.getComputedStyle) {
        r.prototype.getStyle = function (B, A) {
            var N = this, I = N.dom, L = typeof B != "string", k = N.styleHooks, y = B, z = y, H = 1, D = A, M, E, x, C, G, J, F;
            if (L) {
                x = {};
                y = z[0];
                F = 0;
                if (!(H = z.length)) {
                    return x
                }
            }
            if (!I || I.documentElement) {
                return x || ""
            }
            E = I.style;
            if (A) {
                J = E
            } else {
                J = I.currentStyle;
                if (!J) {
                    D = true;
                    J = E
                }
            }
            do {
                C = k[y];
                if (!C) {
                    k[y] = C = {name: r.normalize(y)}
                }
                if (C.get) {
                    G = C.get(I, N, D, J)
                } else {
                    M = C.name;
                    if (C.canThrow) {
                        try {
                            G = J[M]
                        } catch (K) {
                            G = ""
                        }
                    } else {
                        G = J ? J[M] : ""
                    }
                }
                if (!L) {
                    return G
                }
                x[y] = G;
                y = z[++F]
            } while (F < H);
            return x
        }
    }
    r.override({getHeight: function (z, x) {
        var y = this, A = y.isStyle("display", "none"), k, B;
        if (A) {
            return 0
        }
        k = y.dom.offsetHeight;
        if (Ext.supports.Direct2DBug) {
            B = y.adjustDirect2DDimension(q);
            if (x) {
                k += B
            } else {
                if (B > 0 && B < 0.5) {
                    k++
                }
            }
        }
        if (z) {
            k -= y.getBorderWidth("tb") + y.getPadding("tb")
        }
        return(k < 0) ? 0 : k
    }, getWidth: function (k, B) {
        var z = this, C = z.dom, A = z.isStyle("display", "none"), y, x, D;
        if (A) {
            return 0
        }
        if (B && Ext.supports.BoundingClientRect) {
            y = C.getBoundingClientRect();
            x = (z.vertical && !Ext.isIE9 && !Ext.supports.RotatedBoundingClientRect) ? (y.bottom - y.top) : (y.right - y.left)
        } else {
            x = C.offsetWidth
        }
        if (Ext.supports.Direct2DBug && !z.vertical) {
            D = z.adjustDirect2DDimension(h);
            if (B) {
                x += D
            } else {
                if (D > 0 && D < 0.5) {
                    x++
                }
            }
        }
        if (k) {
            x -= z.getBorderWidth("lr") + z.getPadding("lr")
        }
        return(x < 0) ? 0 : x
    }, setWidth: function (x, k) {
        var y = this;
        x = y.adjustWidth(x);
        if (!k || !y.anim) {
            y.dom.style.width = y.addUnits(x)
        } else {
            if (!Ext.isObject(k)) {
                k = {}
            }
            y.animate(Ext.applyIf({to: {width: x}}, k))
        }
        return y
    }, setHeight: function (k, x) {
        var y = this;
        k = y.adjustHeight(k);
        if (!x || !y.anim) {
            y.dom.style.height = y.addUnits(k)
        } else {
            if (!Ext.isObject(x)) {
                x = {}
            }
            y.animate(Ext.applyIf({to: {height: k}}, x))
        }
        return y
    }, applyStyles: function (k) {
        Ext.DomHelper.applyStyles(this.dom, k);
        return this
    }, setSize: function (y, k, x) {
        var z = this;
        if (Ext.isObject(y)) {
            x = k;
            k = y.height;
            y = y.width
        }
        y = z.adjustWidth(y);
        k = z.adjustHeight(k);
        if (!x || !z.anim) {
            z.dom.style.width = z.addUnits(y);
            z.dom.style.height = z.addUnits(k)
        } else {
            if (x === true) {
                x = {}
            }
            z.animate(Ext.applyIf({to: {width: y, height: k}}, x))
        }
        return z
    }, getViewSize: function () {
        var y = this, z = y.dom, x = b.test(z.nodeName), k;
        if (x) {
            k = {width: r.getViewWidth(), height: r.getViewHeight()}
        } else {
            k = {width: z.clientWidth, height: z.clientHeight}
        }
        return k
    }, getSize: function (k) {
        return{width: this.getWidth(k), height: this.getHeight(k)}
    }, adjustWidth: function (k) {
        var x = this, y = (typeof k == "number");
        if (y && x.autoBoxAdjust && !x.isBorderBox()) {
            k -= (x.getBorderWidth("lr") + x.getPadding("lr"))
        }
        return(y && k < 0) ? 0 : k
    }, adjustHeight: function (k) {
        var x = this, y = (typeof k == "number");
        if (y && x.autoBoxAdjust && !x.isBorderBox()) {
            k -= (x.getBorderWidth("tb") + x.getPadding("tb"))
        }
        return(y && k < 0) ? 0 : k
    }, getColor: function (x, y, D) {
        var A = this.getStyle(x), z = D || D === "" ? D : "#", C, k, B = 0;
        if (!A || (/transparent|inherit/.test(A))) {
            return y
        }
        if (/^r/.test(A)) {
            A = A.slice(4, A.length - 1).split(",");
            k = A.length;
            for (; B < k; B++) {
                C = parseInt(A[B], 10);
                z += (C < 16 ? "0" : "") + C.toString(16)
            }
        } else {
            A = A.replace("#", "");
            z += A.length == 3 ? A.replace(/^(\w)(\w)(\w)$/, "$1$1$2$2$3$3") : A
        }
        return(z.length > 5 ? z.toLowerCase() : y)
    }, setOpacity: function (x, k) {
        var y = this;
        if (!y.dom) {
            return y
        }
        if (!k || !y.anim) {
            y.setStyle("opacity", x)
        } else {
            if (typeof k != "object") {
                k = {duration: 350, easing: "ease-in"}
            }
            y.animate(Ext.applyIf({to: {opacity: x}}, k))
        }
        return y
    }, clearOpacity: function () {
        return this.setOpacity("")
    }, adjustDirect2DDimension: function (y) {
        var D = this, x = D.dom, B = D.getStyle("display"), A = x.style.display, E = x.style.position, C = y === h ? 0 : 1, k = x.currentStyle, z;
        if (B === "inline") {
            x.style.display = "inline-block"
        }
        x.style.position = B.match(p) ? "absolute" : "static";
        z = (parseFloat(k[y]) || parseFloat(k.msTransformOrigin.split(" ")[C]) * 2) % 1;
        x.style.position = E;
        if (B === "inline") {
            x.style.display = A
        }
        return z
    }, clip: function () {
        var x = this, y = (x.$cache || x.getCache()).data, k;
        if (!y[e]) {
            y[e] = true;
            k = x.getStyle([j, m, l]);
            y[u] = {o: k[j], x: k[m], y: k[l]};
            x.setStyle(j, t);
            x.setStyle(m, t);
            x.setStyle(l, t)
        }
        return x
    }, unclip: function () {
        var x = this, y = (x.$cache || x.getCache()).data, k;
        if (y[e]) {
            y[e] = false;
            k = y[u];
            if (k.o) {
                x.setStyle(j, k.o)
            }
            if (k.x) {
                x.setStyle(m, k.x)
            }
            if (k.y) {
                x.setStyle(l, k.y)
            }
        }
        return x
    }, boxWrap: function (k) {
        k = k || Ext.baseCSSPrefix + "box";
        var x = Ext.get(this.insertHtml("beforeBegin", "<div class='" + k + "'>" + Ext.String.format(r.boxMarkup, k) + "</div>"));
        Ext.DomQuery.selectNode("." + k + "-mc", x.dom).appendChild(this.dom);
        return x
    }, getComputedHeight: function () {
        var x = this, k = Math.max(x.dom.offsetHeight, x.dom.clientHeight);
        if (!k) {
            k = parseFloat(x.getStyle(q)) || 0;
            if (!x.isBorderBox()) {
                k += x.getFrameWidth("tb")
            }
        }
        return k
    }, getComputedWidth: function () {
        var x = this, k = Math.max(x.dom.offsetWidth, x.dom.clientWidth);
        if (!k) {
            k = parseFloat(x.getStyle(h)) || 0;
            if (!x.isBorderBox()) {
                k += x.getFrameWidth("lr")
            }
        }
        return k
    }, getFrameWidth: function (x, k) {
        return(k && this.isBorderBox()) ? 0 : (this.getPadding(x) + this.getBorderWidth(x))
    }, addClsOnOver: function (y, B, x) {
        var z = this, A = z.dom, k = Ext.isFunction(B);
        z.hover(function () {
            if (k && B.call(x || z, z) === false) {
                return
            }
            Ext.fly(A, a).addCls(y)
        }, function () {
            Ext.fly(A, a).removeCls(y)
        });
        return z
    }, addClsOnFocus: function (y, B, x) {
        var z = this, A = z.dom, k = Ext.isFunction(B);
        z.on("focus", function () {
            if (k && B.call(x || z, z) === false) {
                return false
            }
            Ext.fly(A, a).addCls(y)
        });
        z.on("blur", function () {
            Ext.fly(A, a).removeCls(y)
        });
        return z
    }, addClsOnClick: function (y, B, x) {
        var z = this, A = z.dom, k = Ext.isFunction(B);
        z.on("mousedown", function () {
            if (k && B.call(x || z, z) === false) {
                return false
            }
            Ext.fly(A, a).addCls(y);
            var D = Ext.getDoc(), C = function () {
                Ext.fly(A, a).removeCls(y);
                D.removeListener("mouseup", C)
            };
            D.on("mouseup", C)
        });
        return z
    }, getStyleSize: function () {
        var A = this, B = this.dom, x = b.test(B.nodeName), z, k, y;
        if (x) {
            return{width: r.getViewWidth(), height: r.getViewHeight()}
        }
        z = A.getStyle([q, h], true);
        if (z.width && z.width != "auto") {
            k = parseFloat(z.width);
            if (A.isBorderBox()) {
                k -= A.getFrameWidth("lr")
            }
        }
        if (z.height && z.height != "auto") {
            y = parseFloat(z.height);
            if (A.isBorderBox()) {
                y -= A.getFrameWidth("tb")
            }
        }
        return{width: k || A.getWidth(true), height: y || A.getHeight(true)}
    }, statics: {selectableCls: Ext.baseCSSPrefix + "selectable", unselectableCls: Ext.baseCSSPrefix + "unselectable"}, selectable: function () {
        var k = this;
        k.dom.unselectable = "";
        k.removeCls(r.unselectableCls);
        k.addCls(r.selectableCls);
        return k
    }, unselectable: function () {
        var k = this;
        if (Ext.isOpera) {
            k.dom.unselectable = "on"
        }
        k.removeCls(r.selectableCls);
        k.addCls(r.unselectableCls);
        return k
    }, setVertical: function (A, x) {
        var z = this, y = r.prototype, k;
        z.vertical = true;
        if (x) {
            z.addCls(z.verticalCls = x)
        }
        z.setWidth = y.setHeight;
        z.setHeight = y.setWidth;
        if (!Ext.isIE9m) {
            z.getWidth = y.getHeight;
            z.getHeight = y.getWidth
        }
        z.styleHooks = (A === 270) ? r.prototype.verticalStyleHooks270 : r.prototype.verticalStyleHooks90
    }, setHorizontal: function () {
        var x = this, k = x.verticalCls;
        delete x.vertical;
        if (k) {
            delete x.verticalCls;
            x.removeCls(k)
        }
        delete x.setWidth;
        delete x.setHeight;
        if (!Ext.isIE9m) {
            delete x.getWidth;
            delete x.getHeight
        }
        delete x.styleHooks
    }});
    r.prototype.styleHooks = v = Ext.dom.AbstractElement.prototype.styleHooks;
    r.prototype.verticalStyleHooks90 = g = Ext.Object.chain(r.prototype.styleHooks);
    r.prototype.verticalStyleHooks270 = o = Ext.Object.chain(r.prototype.styleHooks);
    g.width = {name: "height"};
    g.height = {name: "width"};
    g["margin-top"] = {name: "marginLeft"};
    g["margin-right"] = {name: "marginTop"};
    g["margin-bottom"] = {name: "marginRight"};
    g["margin-left"] = {name: "marginBottom"};
    g["padding-top"] = {name: "paddingLeft"};
    g["padding-right"] = {name: "paddingTop"};
    g["padding-bottom"] = {name: "paddingRight"};
    g["padding-left"] = {name: "paddingBottom"};
    g["border-top"] = {name: "borderLeft"};
    g["border-right"] = {name: "borderTop"};
    g["border-bottom"] = {name: "borderRight"};
    g["border-left"] = {name: "borderBottom"};
    o.width = {name: "height"};
    o.height = {name: "width"};
    o["margin-top"] = {name: "marginRight"};
    o["margin-right"] = {name: "marginBottom"};
    o["margin-bottom"] = {name: "marginLeft"};
    o["margin-left"] = {name: "marginTop"};
    o["padding-top"] = {name: "paddingRight"};
    o["padding-right"] = {name: "paddingBottom"};
    o["padding-bottom"] = {name: "paddingLeft"};
    o["padding-left"] = {name: "paddingTop"};
    o["border-top"] = {name: "borderRight"};
    o["border-right"] = {name: "borderBottom"};
    o["border-bottom"] = {name: "borderLeft"};
    o["border-left"] = {name: "borderTop"};
    if (Ext.isIE7m) {
        v.fontSize = v["font-size"] = {name: "fontSize", canThrow: true};
        v.fontStyle = v["font-style"] = {name: "fontStyle", canThrow: true};
        v.fontFamily = v["font-family"] = {name: "fontFamily", canThrow: true}
    }
    if (Ext.isIEQuirks || Ext.isIE && Ext.ieVersion <= 8) {
        function c(z, x, y, k) {
            if (k[this.styleName] == "none") {
                return"0px"
            }
            return k[this.name]
        }

        d = ["Top", "Right", "Bottom", "Left"];
        s = d.length;
        while (s--) {
            i = d[s];
            w = "border" + i + "Width";
            v["border-" + i.toLowerCase() + "-width"] = v[w] = {name: w, styleName: "border" + i + "Style", get: c}
        }
    }
    Ext.getDoc().on("selectstart", function (A, C) {
        var B = document.documentElement, z = r.selectableCls, y = r.unselectableCls, k = C && C.tagName;
        k = k && k.toLowerCase();
        if (k === "input" || k === "textarea") {
            return
        }
        while (C && C.nodeType === 1 && C !== B) {
            var x = Ext.fly(C);
            if (x.hasCls(z)) {
                return
            }
            if (x.hasCls(y)) {
                A.stopEvent();
                return
            }
            C = C.parentNode
        }
    })
});
Ext.onReady(function () {
    var c = /alpha\(opacity=(.*)\)/i, b = /^\s+|\s+$/g, a = Ext.dom.Element.prototype.styleHooks;
    a.opacity = {name: "opacity", afterSet: function (g, e, d) {
        if (d.isLayer) {
            d.onOpacitySet(e)
        }
    }};
    if (!Ext.supports.Opacity && Ext.isIE) {
        Ext.apply(a.opacity, {get: function (h) {
            var g = h.style.filter, e, d;
            if (g.match) {
                e = g.match(c);
                if (e) {
                    d = parseFloat(e[1]);
                    if (!isNaN(d)) {
                        return d ? d / 100 : 0
                    }
                }
            }
            return 1
        }, set: function (h, e) {
            var d = h.style, g = d.filter.replace(c, "").replace(b, "");
            d.zoom = 1;
            if (typeof(e) == "number" && e >= 0 && e < 1) {
                e *= 100;
                d.filter = g + (g.length ? " " : "") + "alpha(opacity=" + e + ")"
            } else {
                d.filter = g
            }
        }})
    }
});
Ext.define("Ext.util.Positionable", {_positionTopLeft: ["position", "top", "left"], _alignRe: /^([a-z]+)-([a-z]+)(\?)?$/, afterSetPosition: Ext.emptyFn, adjustForConstraints: function (c, b) {
    var a = this.getConstrainVector(b, c);
    if (a) {
        c[0] += a[0];
        c[1] += a[1]
    }
    return c
}, alignTo: function (c, a, g, b) {
    var e = this, d = e.el;
    return e.setXY(e.getAlignToXY(c, a, g), d.anim && !!b ? d.anim(b) : false)
}, anchorTo: function (h, e, b, a, j, k) {
    var g = this, i = !Ext.isEmpty(j), c = function () {
        g.alignTo(h, e, b, a);
        Ext.callback(k, g)
    }, d = g.getAnchor();
    g.removeAnchor();
    Ext.apply(d, {fn: c, scroll: i});
    Ext.EventManager.onWindowResize(c, null);
    if (i) {
        Ext.EventManager.on(window, "scroll", c, null, {buffer: !isNaN(j) ? j : 50})
    }
    c();
    return g
}, calculateAnchorXY: function (g, i, h, d) {
    var j = this, c = j.el, k = document, e = c.dom == k.body || c.dom == k, l = Math.round, m, b, a;
    g = (g || "tl").toLowerCase();
    d = d || {};
    b = d.width || e ? Ext.Element.getViewWidth() : j.getWidth();
    a = d.height || e ? Ext.Element.getViewHeight() : j.getHeight();
    switch (g) {
        case"tl":
            m = [0, 0];
            break;
        case"bl":
            m = [0, a];
            break;
        case"tr":
            m = [b, 0];
            break;
        case"c":
            m = [l(b * 0.5), l(a * 0.5)];
            break;
        case"t":
            m = [l(b * 0.5), 0];
            break;
        case"l":
            m = [0, l(a * 0.5)];
            break;
        case"r":
            m = [b, l(a * 0.5)];
            break;
        case"b":
            m = [l(b * 0.5), a];
            break;
        case"tc":
            m = [l(b * 0.5), 0];
            break;
        case"bc":
            m = [l(b * 0.5), a];
            break;
        case"br":
            m = [b, a]
    }
    return[m[0] + i, m[1] + h]
}, convertPositionSpec: function (a) {
    return a
}, getAlignToXY: function (j, C, e) {
    var D = this, A = Ext.Element.getViewWidth() - 10, d = Ext.Element.getViewHeight() - 10, E = document, B = E.documentElement, o = E.body, z = (B.scrollLeft || o.scrollLeft || 0), v = (B.scrollTop || o.scrollTop || 0), a, h, s, g, t, u, q, r, w, p, n, b, c, i, l, m, k;
    j = Ext.get(j.el || j);
    if (!j || !j.dom) {
    }
    e = e || [0, 0];
    C = (!C || C == "?" ? "tl-bl?" : (!(/-/).test(C) && C !== "" ? "tl-" + C : C || "tl-bl")).toLowerCase();
    C = D.convertPositionSpec(C);
    a = C.match(D._alignRe);
    p = a[1];
    n = a[2];
    w = !!a[3];
    h = D.getAnchorXY(p, true);
    s = D.getAnchorToXY(j, n, false);
    m = s[0] - h[0] + e[0];
    k = s[1] - h[1] + e[1];
    if (w) {
        g = D.getWidth();
        t = D.getHeight();
        u = j.getRegion();
        b = p.charAt(0);
        c = p.charAt(p.length - 1);
        i = n.charAt(0);
        l = n.charAt(n.length - 1);
        q = ((b == "t" && i == "b") || (b == "b" && i == "t"));
        r = ((c == "r" && l == "l") || (c == "l" && l == "r"));
        if (m + g > A + z) {
            m = r ? u.left - g : A + z - g
        }
        if (m < z) {
            m = r ? u.right : z
        }
        if (k + t > d + v) {
            k = q ? u.top - t : d + v - t
        }
        if (k < v) {
            k = q ? u.bottom : v
        }
    }
    return[m, k]
}, getAnchor: function () {
    var b = this.el, c = (b.$cache || b.getCache()).data, a;
    if (!b.dom) {
        return
    }
    a = c._anchor;
    if (!a) {
        a = c._anchor = {}
    }
    return a
}, getAnchorXY: function (d, i, b) {
    var h = this, j = h.getXY(), a = h.el, l = document, c = a.dom == l.body || a.dom == l, k = a.getScroll(), g = c ? k.left : i ? 0 : j[0], e = c ? k.top : i ? 0 : j[1];
    return h.calculateAnchorXY(d, g, e, b)
}, getBox: function (d, i) {
    var e = this, m = i ? e.getLocalXY() : e.getXY(), j = m[0], g = m[1], k = e.getWidth(), b = e.getHeight(), c, a, l;
    if (d) {
        c = e.getBorderPadding();
        a = c.beforeX;
        l = c.beforeY;
        j += a;
        g += l;
        k -= (a + c.afterX);
        b -= (l + c.afterY)
    }
    return{x: j, left: j, 0: j, y: g, top: g, 1: g, width: k, height: b, right: j + k, bottom: g + b}
}, calculateConstrainedPosition: function (h, b, l, d) {
    var k = this, c, i = k.floatParent, e = i ? i.getTargetEl() : null, a, g, j, m = false;
    if (l && i) {
        a = e.getXY();
        g = e.getBorderPadding();
        a[0] += g.beforeX;
        a[1] += g.beforeY;
        if (b) {
            j = [b[0] + a[0], b[1] + a[1]]
        }
    } else {
        j = b
    }
    h = h || k.constrainTo || e || k.container || k.el.parent();
    c = (k.constrainHeader ? k.header.el : k.el).getConstrainVector(h, j, d);
    if (c) {
        m = b || k.getPosition(l);
        m[0] += c[0];
        m[1] += c[1]
    }
    return m
}, getConstrainVector: function (e, c, a) {
    var h = this.getRegion(), b = [0, 0], g = (this.shadow && this.constrainShadow && !this.shadowDisabled) ? this.shadow.getShadowSize() : undefined, d = false;
    if (!(e instanceof Ext.util.Region)) {
        e = Ext.get(e.el || e).getViewRegion()
    }
    if (c) {
        h.translateBy(c[0] - h.x, c[1] - h.y)
    }
    if (a) {
        h.right = h.left + a[0];
        h.bottom = h.top + a[1]
    }
    if (g) {
        e.adjust(g[0], -g[1], -g[2], g[3])
    }
    if (h.right > e.right) {
        d = true;
        b[0] = (e.right - h.right)
    }
    if (h.left + b[0] < e.left) {
        d = true;
        b[0] = (e.left - h.left)
    }
    if (h.bottom > e.bottom) {
        d = true;
        b[1] = (e.bottom - h.bottom)
    }
    if (h.top + b[1] < e.top) {
        d = true;
        b[1] = (e.top - h.top)
    }
    return d ? b : false
}, getOffsetsTo: function (a) {
    var c = this.getXY(), b = Ext.fly(a.el || a, "_internal").getXY();
    return[c[0] - b[0], c[1] - b[1]]
}, getRegion: function () {
    var a = this.getBox();
    return new Ext.util.Region(a.top, a.right, a.bottom, a.left)
}, getViewRegion: function () {
    var g = this, c = g.el, a = c.dom.nodeName === "BODY", e, j, h, i, d, b, k;
    if (a) {
        j = c.getScroll();
        d = j.left;
        i = j.top;
        b = Ext.dom.AbstractElement.getViewportWidth();
        k = Ext.dom.AbstractElement.getViewportHeight()
    } else {
        e = g.getBorderPadding();
        h = g.getXY();
        d = h[0] + e.beforeX;
        i = h[1] + e.beforeY;
        b = g.getWidth(true);
        k = g.getHeight(true)
    }
    return new Ext.util.Region(i, d + b, i + k, d)
}, move: function (j, b, c) {
    var g = this, m = g.getXY(), k = m[0], i = m[1], d = [k - b, i], l = [k + b, i], h = [k, i - b], a = [k, i + b], e = {l: d, left: d, r: l, right: l, t: h, top: h, up: h, b: a, bottom: a, down: a};
    j = j.toLowerCase();
    g.setXY([e[j][0], e[j][1]], c)
}, removeAnchor: function () {
    var a = this.getAnchor();
    if (a && a.fn) {
        Ext.EventManager.removeResizeListener(a.fn);
        if (a.scroll) {
            Ext.EventManager.un(window, "scroll", a.fn)
        }
        delete a.fn
    }
    return this
}, setBox: function (d, a) {
    var e = this, b = e.el, i = d.x, g = d.y, l = [i, g], j = d.width, c = d.height, k = e.constrain && e.calculateConstrainedPosition(null, [i, g], false, [j, c]);
    if (k) {
        i = k[0];
        g = k[1]
    }
    if (!a || !b.anim) {
        e.setSize(j, c);
        e.setXY([i, g]);
        e.afterSetPosition(i, g)
    } else {
        e.animate(Ext.applyIf({to: {x: i, y: g, width: b.adjustWidth(j), height: b.adjustHeight(c)}, listeners: {afteranimate: Ext.Function.bind(e.afterSetPosition, e, [i, g])}}, a))
    }
    return e
}, setRegion: function (b, a) {
    return this.setBox({x: b.left, y: b.top, width: b.right - b.left, height: b.bottom - b.top}, a)
}, translatePoints: function (a, c) {
    var b = this.translateXY(a, c);
    return{left: b.x, top: b.y}
}, translateXY: function (h, e) {
    var d = this, b = d.el, i = b.getStyle(d._positionTopLeft), a = i.position == "relative", c = parseFloat(i.left), g = parseFloat(i.top), j = d.getXY();
    if (Ext.isArray(h)) {
        e = h[1];
        h = h[0]
    }
    if (isNaN(c)) {
        c = a ? 0 : b.dom.offsetLeft
    }
    if (isNaN(g)) {
        g = a ? 0 : b.dom.offsetTop
    }
    c = (typeof h == "number") ? h - j[0] + c : undefined;
    g = (typeof e == "number") ? e - j[1] + g : undefined;
    return{x: c, y: g}
}});
Ext.define("Ext.dom.Element", function (a) {
    var b = "hidden", g = document, j = "visibility", c = "display", k = "none", e = Ext.baseCSSPrefix + "masked", l = Ext.baseCSSPrefix + "masked-relative", i = Ext.baseCSSPrefix + "mask-msg", m = /^body/i, h, d = Ext.isStrict ? {select: 1} : {input: 1, select: 1, textarea: 1}, n = function (t) {
        var s = [], o = -1, q, p;
        for (q = 0; p = t[q]; q++) {
            if (p.scrollTop > 0 || p.scrollLeft > 0) {
                s[++o] = p
            }
        }
        return s
    };
    return{extend: Ext.dom.AbstractElement, alternateClassName: ["Ext.Element", "Ext.core.Element"], tableTagRe: /^(?:tr|td|table|tbody)$/i, mixins: [Ext.util.Positionable], addUnits: function () {
        return a.addUnits.apply(a, arguments)
    }, focus: function (r, q) {
        var o = this;
        q = q || o.dom;
        try {
            if (Number(r)) {
                Ext.defer(o.focus, r, o, [null, q])
            } else {
                q.focus()
            }
        } catch (p) {
        }
        return o
    }, blur: function () {
        var o = this, q = o.dom;
        if (q !== document.body) {
            try {
                q.blur()
            } catch (p) {
            }
            return o
        } else {
            return o.focus(undefined, q)
        }
    }, isBorderBox: function () {
        var o = Ext.isBorderBox;
        if (o && Ext.isIE7m) {
            o = !((this.dom.tagName || "").toLowerCase() in d)
        }
        return o
    }, hover: function (p, o, r, q) {
        var s = this;
        s.on("mouseenter", p, r || s.dom, q);
        s.on("mouseleave", o, r || s.dom, q);
        return s
    }, getAttributeNS: function (p, o) {
        return this.getAttribute(o, p)
    }, getAttribute: (Ext.isIE && !(Ext.isIE9p && g.documentMode >= 9)) ? function (o, q) {
        var r = this.dom, p;
        if (q) {
            p = typeof r[q + ":" + o];
            if (p != "undefined" && p != "unknown") {
                return r[q + ":" + o] || null
            }
            return null
        }
        if (o === "for") {
            o = "htmlFor"
        }
        return r[o] || null
    } : function (o, p) {
        var q = this.dom;
        if (p) {
            return q.getAttributeNS(p, o) || q.getAttribute(p + ":" + o)
        }
        return q.getAttribute(o) || q[o] || null
    }, cacheScrollValues: function () {
        var s = this, r, q, p, t = [], o = function () {
            for (p = 0; p < r.length; p++) {
                q = r[p];
                q.scrollLeft = t[p][0];
                q.scrollTop = t[p][1]
            }
        };
        if (!Ext.DomQuery.pseudos.isScrolled) {
            Ext.DomQuery.pseudos.isScrolled = n
        }
        r = s.query(":isScrolled");
        for (p = 0; p < r.length; p++) {
            q = r[p];
            t[p] = [q.scrollLeft, q.scrollTop]
        }
        return o
    }, autoBoxAdjust: true, isVisible: function (o) {
        var q = this, r = q.dom, p = r.ownerDocument.documentElement;
        if (!h) {
            h = new a.Fly()
        }
        while (r !== p) {
            if (!r || r.nodeType === 11 || (h.attach(r)).isStyle(j, b) || h.isStyle(c, k)) {
                return false
            }
            if (!o) {
                break
            }
            r = r.parentNode
        }
        return true
    }, isDisplayed: function () {
        return !this.isStyle(c, k)
    }, enableDisplayMode: function (p) {
        var o = this;
        o.setVisibilityMode(a.DISPLAY);
        if (!Ext.isEmpty(p)) {
            (o.$cache || o.getCache()).data.originalDisplay = p
        }
        return o
    }, mask: function (o, y, v) {
        var A = this, r = A.dom, s = r.style.setExpression, u = (A.$cache || A.getCache()).data, q = u.maskShimEl, x = u.maskEl, p = u.maskMsg, t, w;
        if (!(m.test(r.tagName) && A.getStyle("position") == "static")) {
            A.addCls(l)
        }
        if (x) {
            x.remove()
        }
        if (p) {
            p.remove()
        }
        if (q) {
            q.remove()
        }
        if (Ext.isIE6) {
            q = Ext.DomHelper.append(r, {tag: "iframe", cls: Ext.baseCSSPrefix + "shim " + Ext.baseCSSPrefix + "mask-shim"}, true);
            u.maskShimEl = q;
            q.setDisplayed(true)
        }
        Ext.DomHelper.append(r, [
            {cls: Ext.baseCSSPrefix + "mask", style: "top:0;left:0;"},
            {cls: y ? i + " " + y : i, cn: {tag: "div", cls: Ext.baseCSSPrefix + "mask-msg-inner", cn: {tag: "div", cls: Ext.baseCSSPrefix + "mask-msg-text", html: o || ""}}}
        ]);
        p = Ext.get(r.lastChild);
        x = Ext.get(p.dom.previousSibling);
        u.maskMsg = p;
        u.maskEl = x;
        A.addCls(e);
        x.setDisplayed(true);
        if (typeof o == "string") {
            p.setDisplayed(true);
            p.center(A)
        } else {
            p.setDisplayed(false)
        }
        if (!Ext.supports.IncludePaddingInWidthCalculation && s) {
            try {
                x.dom.style.setExpression("width", 'this.parentNode.clientWidth + "px"');
                t = 'this.parentNode.clientWidth + "px"';
                if (q) {
                    q.dom.style.setExpression("width", t)
                }
                x.dom.style.setExpression("width", t)
            } catch (z) {
            }
        }
        if (!Ext.supports.IncludePaddingInHeightCalculation && s) {
            try {
                w = "this.parentNode." + (r == g.body ? "scrollHeight" : "offsetHeight") + ' + "px"';
                if (q) {
                    q.dom.style.setExpression("height", w)
                }
                x.dom.style.setExpression("height", w)
            } catch (z) {
            }
        } else {
            if (Ext.isIE9m && !(Ext.isIE7 && Ext.isStrict) && A.getStyle("height") == "auto") {
                if (q) {
                    q.setSize(undefined, v || A.getHeight())
                }
                x.setSize(undefined, v || A.getHeight())
            }
        }
        return x
    }, unmask: function () {
        var s = this, t = (s.$cache || s.getCache()).data, r = t.maskEl, p = t.maskShimEl, o = t.maskMsg, q;
        if (r) {
            q = r.dom.style;
            if (q.clearExpression) {
                q.clearExpression("width");
                q.clearExpression("height")
            }
            if (r) {
                r.remove();
                delete t.maskEl
            }
            if (o) {
                o.remove();
                delete t.maskMsg
            }
            s.removeCls([e, l]);
            if (p) {
                q = p.dom.style;
                if (q.clearExpression) {
                    q.clearExpression("width");
                    q.clearExpression("height")
                }
                p.remove();
                delete t.maskShimEl
            }
        }
    }, isMasked: function () {
        var q = this, s = (q.$cache || q.getCache()).data, p = s.maskEl, o = s.maskMsg, r = false;
        if (p && p.isVisible()) {
            if (o) {
                o.center(q)
            }
            r = true
        }
        return r
    }, createShim: function () {
        var o = g.createElement("iframe"), p;
        o.frameBorder = "0";
        o.className = Ext.baseCSSPrefix + "shim";
        o.src = Ext.SSL_SECURE_URL;
        p = Ext.get(this.dom.parentNode.insertBefore(o, this.dom));
        p.autoBoxAdjust = false;
        return p
    }, addKeyListener: function (p, r, q) {
        var o;
        if (typeof p != "object" || Ext.isArray(p)) {
            o = {target: this, key: p, fn: r, scope: q}
        } else {
            o = {target: this, key: p.key, shift: p.shift, ctrl: p.ctrl, alt: p.alt, fn: r, scope: q}
        }
        return new Ext.util.KeyMap(o)
    }, addKeyMap: function (o) {
        return new Ext.util.KeyMap(Ext.apply({target: this}, o))
    }, on: function (o, r, q, p) {
        Ext.EventManager.on(this, o, r, q || this, p);
        return this
    }, un: function (o, q, p) {
        Ext.EventManager.un(this, o, q, p || this);
        return this
    }, removeAllListeners: function () {
        Ext.EventManager.removeAll(this);
        return this
    }, purgeAllListeners: function () {
        Ext.EventManager.purgeElement(this);
        return this
    }, select: function (o) {
        return a.select(o, false, this.dom)
    }}
}, function () {
    var DOC = document, EC = Ext.cache, Element = this, AbstractElement = Ext.dom.AbstractElement, focusRe = /^a|button|embed|iframe|input|object|select|textarea$/i, nonSpaceRe = /\S/, scriptTagRe = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig, replaceScriptTagRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, srcRe = /\ssrc=([\'\"])(.*?)\1/i, typeRe = /\stype=([\'\"])(.*?)\1/i, useDocForId = !Ext.isIE8m, internalFly;
    Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
    function garbageCollect() {
        if (!Ext.enableGarbageCollector) {
            clearInterval(Element.collectorThreadId)
        } else {
            var eid, d, o, t;
            for (eid in EC) {
                if (!EC.hasOwnProperty(eid)) {
                    continue
                }
                o = EC[eid];
                if (o.skipGarbageCollection) {
                    continue
                }
                d = o.dom;
                if (!d.parentNode || (!d.offsetParent && !Ext.getElementById(eid))) {
                    if (d && Ext.enableListenerCollection) {
                        Ext.EventManager.removeAll(d)
                    }
                    delete EC[eid]
                }
            }
            if (Ext.isIE) {
                t = {};
                for (eid in EC) {
                    if (!EC.hasOwnProperty(eid)) {
                        continue
                    }
                    t[eid] = EC[eid]
                }
                EC = Ext.cache = t
            }
        }
    }

    Element.collectorThreadId = setInterval(garbageCollect, 30000);
    Element.addMethods({monitorMouseLeave: function (delay, handler, scope) {
        var me = this, timer, listeners = {mouseleave: function (e) {
            timer = setTimeout(Ext.Function.bind(handler, scope || me, [e]), delay)
        }, mouseenter: function () {
            clearTimeout(timer)
        }, freezeEvent: true};
        me.on(listeners);
        return listeners
    }, swallowEvent: function (eventName, preventDefault) {
        var me = this, e, eLen, fn = function (e) {
            e.stopPropagation();
            if (preventDefault) {
                e.preventDefault()
            }
        };
        if (Ext.isArray(eventName)) {
            eLen = eventName.length;
            for (e = 0; e < eLen; e++) {
                me.on(eventName[e], fn)
            }
            return me
        }
        me.on(eventName, fn);
        return me
    }, relayEvent: function (eventName, observable) {
        this.on(eventName, function (e) {
            observable.fireEvent(eventName, e)
        })
    }, clean: function (forceReclean) {
        var me = this, dom = me.dom, data = (me.$cache || me.getCache()).data, n = dom.firstChild, ni = -1, nx;
        if (data.isCleaned && forceReclean !== true) {
            return me
        }
        while (n) {
            nx = n.nextSibling;
            if (n.nodeType == 3) {
                if (!(nonSpaceRe.test(n.nodeValue))) {
                    dom.removeChild(n)
                } else {
                    if (nx && nx.nodeType == 3) {
                        n.appendData(Ext.String.trim(nx.data));
                        dom.removeChild(nx);
                        nx = n.nextSibling;
                        n.nodeIndex = ++ni
                    }
                }
            } else {
                internalFly.attach(n).clean();
                n.nodeIndex = ++ni
            }
            n = nx
        }
        data.isCleaned = true;
        return me
    }, load: function (options) {
        this.getLoader().load(options);
        return this
    }, getLoader: function () {
        var me = this, data = (me.$cache || me.getCache()).data, loader = data.loader;
        if (!loader) {
            data.loader = loader = new Ext.ElementLoader({target: me})
        }
        return loader
    }, syncContent: function (source) {
        source = Ext.getDom(source);
        var sourceNodes = source.childNodes, sourceLen = sourceNodes.length, dest = this.dom, destNodes = dest.childNodes, destLen = destNodes.length, i, destNode, sourceNode, nodeType, newAttrs, attLen, attName;
        if (dest.mergeAttributes) {
            dest.mergeAttributes(source, true);
            dest.src = source.src
        } else {
            newAttrs = source.attributes;
            attLen = newAttrs.length;
            for (i = 0; i < attLen; i++) {
                attName = newAttrs[i].name;
                if (attName !== "id") {
                    dest.setAttribute(attName, newAttrs[i].value)
                }
            }
        }
        if (sourceLen !== destLen) {
            dest.innerHTML = source.innerHTML;
            return
        }
        for (i = 0; i < sourceLen; i++) {
            sourceNode = sourceNodes[i];
            destNode = destNodes[i];
            nodeType = sourceNode.nodeType;
            if (nodeType !== destNode.nodeType || (nodeType === 1 && sourceNode.tagName !== destNode.tagName)) {
                dest.innerHTML = source.innerHTML;
                return
            }
            if (nodeType === 3) {
                destNode.data = sourceNode.data
            } else {
                if (sourceNode.id && destNode.id !== sourceNode.id) {
                    destNode.id = sourceNode.id
                }
                destNode.style.cssText = sourceNode.style.cssText;
                destNode.className = sourceNode.className;
                internalFly.attach(destNode).syncContent(sourceNode)
            }
        }
    }, update: function (html, loadScripts, callback) {
        var me = this, id, dom, interval;
        if (!me.dom) {
            return me
        }
        html = html || "";
        dom = me.dom;
        if (loadScripts !== true) {
            dom.innerHTML = html;
            Ext.callback(callback, me);
            return me
        }
        id = Ext.id();
        html += '<span id="' + id + '"></span>';
        interval = setInterval(function () {
            var hd, match, attrs, srcMatch, typeMatch, el, s;
            if (!(el = DOC.getElementById(id))) {
                return false
            }
            clearInterval(interval);
            Ext.removeNode(el);
            hd = Ext.getHead().dom;
            while ((match = scriptTagRe.exec(html))) {
                attrs = match[1];
                srcMatch = attrs ? attrs.match(srcRe) : false;
                if (srcMatch && srcMatch[2]) {
                    s = DOC.createElement("script");
                    s.src = srcMatch[2];
                    typeMatch = attrs.match(typeRe);
                    if (typeMatch && typeMatch[2]) {
                        s.type = typeMatch[2]
                    }
                    hd.appendChild(s)
                } else {
                    if (match[2] && match[2].length > 0) {
                        if (window.execScript) {
                            window.execScript(match[2])
                        } else {
                            window.eval(match[2])
                        }
                    }
                }
            }
            Ext.callback(callback, me)
        }, 20);
        dom.innerHTML = html.replace(replaceScriptTagRe, "");
        return me
    }, removeAllListeners: function () {
        this.removeAnchor();
        Ext.EventManager.removeAll(this.dom);
        return this
    }, createProxy: function (config, renderTo, matchBox) {
        config = (typeof config == "object") ? config : {tag: "div", cls: config};
        var me = this, proxy = renderTo ? Ext.DomHelper.append(renderTo, config, true) : Ext.DomHelper.insertBefore(me.dom, config, true);
        proxy.setVisibilityMode(Element.DISPLAY);
        proxy.hide();
        if (matchBox && me.setBox && me.getBox) {
            proxy.setBox(me.getBox())
        }
        return proxy
    }, needsTabIndex: function () {
        if (this.dom) {
            if ((this.dom.nodeName === "a") && (!this.dom.href)) {
                return true
            }
            return !focusRe.test(this.dom.nodeName)
        }
    }, isFocusable: function (asFocusEl) {
        var dom = this.dom, tabIndexAttr = dom.getAttributeNode("tabIndex"), tabIndex, nodeName = dom.nodeName, canFocus = false;
        if (tabIndexAttr && tabIndexAttr.specified) {
            tabIndex = tabIndexAttr.value
        }
        if (dom && !dom.disabled) {
            if (tabIndex == -1) {
                canFocus = Ext.FocusManager && Ext.FocusManager.enabled && asFocusEl
            } else {
                if (focusRe.test(nodeName)) {
                    if ((nodeName !== "a") || dom.href) {
                        canFocus = true
                    }
                } else {
                    canFocus = tabIndex != null && tabIndex >= 0
                }
            }
            canFocus = canFocus && this.isVisible(true)
        }
        return canFocus
    }});
    if (Ext.isIE) {
        Element.prototype.getById = function (id, asDom) {
            var dom = this.dom, cacheItem, el, ret;
            if (dom) {
                el = (useDocForId && DOC.getElementById(id)) || dom.all[id];
                if (el) {
                    if (asDom) {
                        ret = el
                    } else {
                        cacheItem = EC[id];
                        if (cacheItem && cacheItem.el) {
                            ret = Ext.updateCacheEntry(cacheItem, el).el
                        } else {
                            ret = new Element(el)
                        }
                    }
                    return ret
                }
            }
            return asDom ? Ext.getDom(id) : Element.get(id)
        }
    }
    Element.createAlias({addListener: "on", removeListener: "un", clearListeners: "removeAllListeners", focusable: "isFocusable"});
    Element.Fly = AbstractElement.Fly = new Ext.Class({extend: Element, isFly: true, constructor: function (dom) {
        this.dom = dom;
        this.el = this
    }, attach: AbstractElement.Fly.prototype.attach});
    internalFly = new Element.Fly();
    if (Ext.isIE) {
        Ext.getElementById = function (id) {
            var el = DOC.getElementById(id), detachedBodyEl;
            if (!el && (detachedBodyEl = AbstractElement.detachedBodyEl)) {
                el = detachedBodyEl.dom.all[id]
            }
            return el
        }
    } else {
        if (!DOC.querySelector) {
            Ext.getDetachedBody = Ext.getBody;
            Ext.getElementById = function (id) {
                return DOC.getElementById(id)
            }
        }
    }
});
Ext.define("Ext.dom.CompositeElementLite", {alternateClassName: "Ext.CompositeElementLite", statics: {importElementMethods: function () {
    var b, c = Ext.dom.Element.prototype, a = this.prototype;
    for (b in c) {
        if (typeof c[b] == "function") {
            (function (d) {
                a[d] = a[d] || function () {
                    return this.invoke(d, arguments)
                }
            }).call(a, b)
        }
    }
}}, constructor: function (b, a) {
    this.elements = [];
    this.add(b, a);
    this.el = new Ext.dom.AbstractElement.Fly()
}, isComposite: true, getElement: function (a) {
    return this.el.attach(a)
}, transformElement: function (a) {
    return Ext.getDom(a)
}, getCount: function () {
    return this.elements.length
}, add: function (c, a) {
    var e = this.elements, b, d;
    if (!c) {
        return this
    }
    if (typeof c == "string") {
        c = Ext.dom.Element.selectorFunction(c, a)
    } else {
        if (c.isComposite) {
            c = c.elements
        } else {
            if (!Ext.isIterable(c)) {
                c = [c]
            }
        }
    }
    for (b = 0, d = c.length; b < d; ++b) {
        e.push(this.transformElement(c[b]))
    }
    return this
}, invoke: function (d, a) {
    var g = this.elements, e = g.length, c, b;
    d = Ext.dom.Element.prototype[d];
    for (b = 0; b < e; b++) {
        c = g[b];
        if (c) {
            d.apply(this.getElement(c), a)
        }
    }
    return this
}, item: function (b) {
    var c = this.elements[b], a = null;
    if (c) {
        a = this.getElement(c)
    }
    return a
}, slice: function () {
    return this.elements.slice.apply(this.elements, arguments)
}, addListener: function (b, j, h, g) {
    var d = this.elements, a = d.length, c, k;
    for (c = 0; c < a; c++) {
        k = d[c];
        if (k) {
            Ext.EventManager.on(k, b, j, h || k, g)
        }
    }
    return this
}, each: function (g, d) {
    var h = this, c = h.elements, a = c.length, b, j;
    for (b = 0; b < a; b++) {
        j = c[b];
        if (j) {
            j = this.getElement(j);
            if (g.call(d || j, j, h, b) === false) {
                break
            }
        }
    }
    return h
}, fill: function (a) {
    var b = this;
    b.elements = [];
    b.add(a);
    return b
}, insert: function (b, a) {
    Ext.Array.insert(this.elements, b, a)
}, filter: function (b) {
    var h = this, c = h.elements, g = c.length, d = [], e = 0, j = typeof b == "function", k, a;
    for (; e < g; e++) {
        a = c[e];
        k = false;
        if (a) {
            a = h.getElement(a);
            if (j) {
                k = b.call(a, a, h, e) !== false
            } else {
                k = a.is(b)
            }
            if (k) {
                d.push(h.transformElement(a))
            }
        }
    }
    h.elements = d;
    return h
}, indexOf: function (a) {
    return Ext.Array.indexOf(this.elements, this.transformElement(a))
}, replaceElement: function (e, c, a) {
    var b = !isNaN(e) ? e : this.indexOf(e), g;
    if (b > -1) {
        c = Ext.getDom(c);
        if (a) {
            g = this.elements[b];
            g.parentNode.insertBefore(c, g);
            Ext.removeNode(g)
        }
        Ext.Array.splice(this.elements, b, 1, c)
    }
    return this
}, clear: function (d) {
    var c = this, b = c.elements, a = b.length - 1;
    if (d) {
        for (; a >= 0; a--) {
            Ext.removeNode(b[a])
        }
    }
    this.elements = []
}, addElements: function (d, b) {
    if (!d) {
        return this
    }
    if (typeof d == "string") {
        d = Ext.dom.Element.selectorFunction(d, b)
    }
    var c = this.elements, a = d.length, g;
    for (g = 0; g < a; g++) {
        c.push(Ext.get(d[g]))
    }
    return this
}, first: function () {
    return this.item(0)
}, last: function () {
    return this.item(this.getCount() - 1)
}, contains: function (a) {
    return this.indexOf(a) != -1
}, removeElement: function (e, i) {
    e = [].concat(e);
    var d = this, g = d.elements, c = e.length, h, b, a;
    for (a = 0; a < c; a++) {
        h = e[a];
        if ((b = (g[h] || g[h = d.indexOf(h)]))) {
            if (i) {
                if (b.dom) {
                    b.remove()
                } else {
                    Ext.removeNode(b)
                }
            }
            Ext.Array.erase(g, h, 1)
        }
    }
    return d
}}, function () {
    this.importElementMethods();
    this.prototype.on = this.prototype.addListener;
    if (Ext.DomQuery) {
        Ext.dom.Element.selectorFunction = Ext.DomQuery.select
    }
    Ext.dom.Element.select = function (a, b) {
        var c;
        if (typeof a == "string") {
            c = Ext.dom.Element.selectorFunction(a, b)
        } else {
            if (a.length !== undefined) {
                c = a
            } else {
            }
        }
        return new Ext.CompositeElementLite(c)
    };
    Ext.select = function () {
        return Ext.dom.Element.select.apply(Ext.dom.Element, arguments)
    }
});
Ext.define("Ext.dom.CompositeElement", {alternateClassName: "Ext.CompositeElement", extend: Ext.dom.CompositeElementLite, getElement: function (a) {
    return a
}, transformElement: function (a) {
    return Ext.get(a)
}}, function () {
    Ext.dom.Element.select = function (a, d, b) {
        var c;
        if (typeof a == "string") {
            c = Ext.dom.Element.selectorFunction(a, b)
        } else {
            if (a.length !== undefined) {
                c = a
            } else {
            }
        }
        return(d === true) ? new Ext.CompositeElement(c) : new Ext.CompositeElementLite(c)
    }
});
Ext.select = Ext.Element.select;
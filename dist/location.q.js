'use strict';

/*
 * q is for Query String v1.1.1
 *
 * Kopimi (c) 2023 Joshua Faulkenberry
 * Unlicensed under The Unlicense
 * http://unlicense.org/
 */
window.location.q = document.location.q = function (key = null, val, push) {
    if (typeof push == "undefined")
        push = true;
    var updated = false;
    if (key === null)
        updated = "";
    else {
        if (!key && !this.search)
            return null;
        const set = (v) => {
            if (v.length == 1)
                return true;
            else if (parseFloat(v[1]) == v[1])
                return parseFloat(v[1]);
            else
                return decodeURIComponent(v[1]);
        };
        var qOut = {}, lst = decodeURI(this.search).substring(1) ? decodeURI(this.search).substring(1).split("&").map(d => d.split("=")) : [];
        for (var x = 0; x < lst.length; x++) {
            if (lst[x][0].indexOf("[") >= 0) {
                var ar = lst[x][0].replace(/\]/g, "").split("[");
                if (!qOut[ar[0]])
                    qOut[ar[0]] = ar[1] ? {} : [];
                if (ar[1])
                    qOut[ar[0]][ar[1]] = set(lst[x]);
                else
                    qOut[ar[0]][qOut[ar[0]].length] = set(lst[x]);
            }
            else
                qOut[lst[x][0]] = set(lst[x]);
        }
        if (typeof key == "string" && typeof val === "undefined")
            return qOut[key];
        else if (!key)
            return qOut;
        else {
            const process = (obj) => {
                var out = [];
                for (let par in obj) {
                    if (!par)
                        continue;
                    if (obj[par] instanceof Array)
                        for (let x in obj[par])
                            out.push([par + "[]", encodeURIComponent(obj[par][x])]);
                    else if (obj[par] instanceof Object)
                        for (let x in obj[par])
                            out.push([par + `[${x}]`, encodeURIComponent(obj[par][x])]);
                    else if (obj[par] === true)
                        out.push([par]);
                    else if (obj[par] !== null)
                        out.push([par, encodeURIComponent(obj[par])]);
                }
                return out;
            };
            if (typeof (key) == "function")
                key = key(qOut);
            if (key instanceof Array)
                updated = key;
            else if (key instanceof Object)
                updated = process(key);
            else {
                qOut[key] = val;
                updated = process(qOut);
            }
        }
    }
    if (updated !== false) {
        if (updated instanceof Array && updated.length)
            updated = "?" + updated.map(d => d.join("=")).join("&");
        var newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${updated}`;
        if (push && typeof window.history.pushState === "function")
            window.history.pushState({
                path: newurl
            }, '', newurl);
        else
            location.href = newurl;
        return this;
    }
};
//# sourceMappingURL=location.q.js.map

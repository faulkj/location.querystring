/*
 * q is for Query String v1.0
 *
 * Kopimi (c) 2021 Joshua Faulkenberry
 * Unlicensed under The Unlicense
 * http://unlicense.org/
 */
 
 function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

window.location.q = document.location.q = function(key, val, param) {
    var push = param === void 0 ? true : param;
    var updated = false;
    if (key === null) updated = "";
    else {
        if (!key && !this.search) return null;
        var set = function(v) {
            if (v.length == 1) return true;
            else if (parseFloat(v[1]) == v[1]) return parseFloat(v[1]);
            else return decodeURIComponent(v[1]);
        };
        var qOut = {
        }, lst = decodeURI(this.search).substring(1) ? decodeURI(this.search).substring(1).split("&").map(function(d) {
            return d.split("=");
        }) : [];
        for(var x = 0; x < lst.length; x++){
            if (lst[x][0].indexOf("[") >= 0) {
                var ar = lst[x][0].replace(/\]/g, "").split("[");
                if (!qOut[ar[0]]) qOut[ar[0]] = ar[1] ? {
                } : [];
                if (ar[1]) qOut[ar[0]][ar[1]] = set(lst[x]);
                else qOut[ar[0]][qOut[ar[0]].length] = set(lst[x]);
            } else qOut[lst[x][0]] = set(lst[x]);
        }
        if (typeof key == "string" && typeof val === "undefined") return qOut[key];
        else if (!key) return qOut;
        else {
            var process = function(obj) {
                var out = [];
                for(var par in obj){
                    if (!par) continue;
                    if (_instanceof(obj[par], Array)) for(var x in obj[par])out.push([
                        par + "[]",
                        encodeURIComponent(obj[par][x])
                    ]);
                    else if (_instanceof(obj[par], Object)) for(var x1 in obj[par])out.push([
                        par + "[".concat(x1, "]"),
                        encodeURIComponent(obj[par][x1])
                    ]);
                    else if (obj[par] === true) out.push([
                        par
                    ]);
                    else if (obj[par] !== false) out.push([
                        par,
                        encodeURIComponent(obj[par])
                    ]);
                }
                return out;
            };
            if (typeof key == "function") key = key(qOut);
            if (_instanceof(key, Array)) updated = key;
            else if (_instanceof(key, Object)) updated = process(key);
            else {
                qOut[key] = val;
                updated = process(qOut);
            }
        }
    }
    if (updated !== false) {
        if (_instanceof(updated, Array) && updated.length) updated = "?" + updated.map(function(d) {
            return d.join("=");
        }).join("&");
        var newurl = "".concat(window.location.protocol, "//").concat(window.location.host).concat(window.location.pathname).concat(updated);
        if (push && history.pushState) window.history.pushState({
            path: newurl
        }, '', newurl);
        else location.href = newurl;
        return this;
    }
};

//# sourceMappingURL=location.q.js.map
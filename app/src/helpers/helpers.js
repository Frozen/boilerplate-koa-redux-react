var _ = require('lodash');
function trimSlash(s) {
    if (!_.isString(s)) {
        throw new Error("require string");
    }
    return s.replace(/\//, "");
}
exports.trimSlash = trimSlash;
// export function loadCommunityUsers(communityId: number,
//                                    type: string,
//                                    page: number,
//                                    query: string): Promise<any> {
//
//     return fetch('/rest/community/' + communityId + "/users?type=" + type + "&page=" + page + "&query="+query, {
//         credentials: 'same-origin'
//     }).
//     then((r) => {
//         return r.json()
//     }).then(function(data)  {
//         return data
//     });
//
// }
function previewText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    var splitted = text.split(" ");
    var rs = "";
    for (var i = 0; i < splitted.length; i++) {
        var word = splitted[i];
        if ((rs + word).length > maxLength) {
            return rs;
        }
        rs += word;
    }
    return rs;
}
exports.previewText = previewText;
var Loader = (function () {
    function Loader(baseUrl) {
        this.baseUrl = baseUrl;
        this.hasNext = true;
        this.page = 0;
    }
    Loader.prototype.next = function (data) {
        if (data === void 0) { data = {}; }
        this.page += 1;
        if (!this.hasNext) {
            return $.Deferred().resolve({
                results: []
            });
        }
        return $.ajax({
            url: this.baseUrl,
            type: 'GET',
            data: _.assign({}, data, { page: this.page })
        }).then(function (data) {
            if (!data.results) {
                this.hasNext = false;
                return $.Deferred().resolve(data); //   Promise.resolve(data);
            }
            if (data.results.length < 10) {
                this.hasNext = false;
                return $.Deferred().resolve(data);
            }
            return $.Deferred().resolve(data);
        }.bind(this));
    };
    Loader.prototype.reset = function () {
        this.page = 0;
        this.hasNext = true;
    };
    return Loader;
})();
exports.Loader = Loader;
//# sourceMappingURL=helpers.js.map
var User = (function () {
    function User() {
    }
    User.prototype.getFioOrUsernameOrId = function () {
        return this.fio_or_username_or_id;
    };
    User.prototype.isOnline = function () {
        return this.is_online;
    };
    User.prototype.getUrl = function () {
        return this.url;
    };
    return User;
})();
exports.User = User;
var Content = (function () {
    function Content() {
    }
    Content.prototype.getUrl = function () {
        return this.url;
    };
    Content.prototype.getEditorTitle = function () {
        return this.editor_title || this.title;
    };
    return Content;
})();
exports.Content = Content;
//export class Community implements infs.Community {
//
//    is_in_community: boolean;
//
//    isInCommunity(): boolean {
//        return this.is_in_community;
//    };
//
//    private url: string;
//
//    avatar:{ [key:string]:string; };
//    name:string;
//    getUrl() {
//        return this.url;
//    }string;
//    rules:string;
//    categories:Array<any>;
//
//    id: number;
//
//    constructor() {
//    }
//
//    getId(): number {
//        return this.id
//    }
//
//    user_group: number;
//    getGroup(): number {
//        return this.user_group;
//    }
//}
var Rating = (function () {
    function Rating() {
        var _this = this;
        this.getVotesFor = function () { return _this.votes_for; };
        this.getVotesAgainst = function () { return _this.votes_against; };
    }
    return Rating;
})();
exports.Rating = Rating;
// export function mapContent(data): infs.Content {
//
//     const user = _.assign(new User(), data.user);
//     const rating = _.assign(new Rating(), data.rating);
//     const community = data.community;
//     return _.assign(new Content(), data, {user: user, rating: rating, community: community})
//
// } 
//# sourceMappingURL=models.js.map
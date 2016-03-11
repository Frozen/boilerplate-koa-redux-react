var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var react_redux_1 = require("react-redux");
var helpers_1 = require("../../../../helpers/helpers");
var CommunityAlbumsPane = (function (_super) {
    __extends(CommunityAlbumsPane, _super);
    function CommunityAlbumsPane() {
        _super.apply(this, arguments);
        this.isLoading = false;
        this.state = {
            albums: []
        };
        this.loader = null;
    }
    CommunityAlbumsPane.prototype._handleLoadMore = function () {
        if (!this.isLoading) {
            this.isLoading = true;
            this._fetchAlbums();
        }
    };
    CommunityAlbumsPane.prototype._fetchAlbums = function () {
        this.loader.next().
            then(function (data) {
            var results = data.results;
            // unmounted
            if (this.loader === null) {
                return;
            }
            var albums = this.state.albums.concat(results);
            this.setState({
                albums: albums
            });
            this.isLoading = false;
        }.bind(this));
    };
    CommunityAlbumsPane.prototype.componentDidMount = function () {
        var community = this.props.community;
        this.loader = new helpers_1.Loader('/rest/community/' + community.id + "/albums");
        this._handleLoadMore();
    };
    CommunityAlbumsPane.prototype.componentWillUnmount = function () {
        this.loader = null;
    };
    CommunityAlbumsPane.prototype.render = function () {
        console.log('CommunityAlbumsPane');
        return (React.createElement("div", {"className": "pane photo"}, React.createElement("div", {"className": "wall-panes"}, React.createElement("div", {"className": "userAc photo-box"}, this.state.albums.map(function (album, index) {
            return (React.createElement("article", {"key": index}, React.createElement("header", null, React.createElement("h6", null, "Альбом ", album.name), React.createElement("p", null, album.photos_count, " фотографии")), album.photos.map(function (item, index) {
                return (React.createElement("div", {"className": "photo-cell only-six", "key": index}, React.createElement("a", {"href": item.url}, React.createElement("img", {"alt": "", "src": item['100x100']}))));
            })));
        })))));
    };
    CommunityAlbumsPane = __decorate([
        react_redux_1.connect(function (state) { return state.community; })
    ], CommunityAlbumsPane);
    return CommunityAlbumsPane;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunityAlbumsPane;
// <div className="photo-cell add only-six">
//     <a href="#publ4" className="fancy-noclose"></a>
// </div> 
//# sourceMappingURL=CommunityAlbumsPane.js.map
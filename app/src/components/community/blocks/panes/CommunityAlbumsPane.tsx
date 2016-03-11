


import * as React from 'react';
import * as infs from '../../../../interfaces/interfaces';
import {connect} from "react-redux";
import {Loader} from "../../../../helpers/helpers";

interface IProps {

    community: infs.Community

}

@connect((state)=>state.community)
export default class CommunityAlbumsPane extends React.Component<IProps, any> {

    isLoading = false;

    state = {
        albums: []
    };
    
    loader = null;

    _handleLoadMore() {

        if (!this.isLoading) {
            this.isLoading = true;
            this._fetchAlbums();
        }
    }

    _fetchAlbums(): any {

        this.loader.next().
        then(function(data) {

            let results = data.results;

            // unmounted
            if (this.loader === null) {
                return
            }

            const albums = [...this.state.albums, ...results];
            this.setState({
                albums: albums
            });
            this.isLoading = false;

        }.bind(this));
    }

    componentDidMount() {
        const {community} = this.props;
        this.loader = new Loader('/rest/community/' + community.id + "/albums");
        this._handleLoadMore();

    }

    componentWillUnmount() {
        this.loader = null;
    }


    render() {

        console.log('CommunityAlbumsPane');
        
        return (
            <div className="pane photo">
                <div className="wall-panes">

                    <div className="userAc photo-box">

                        {this.state.albums.map((album: infs.CommunityAlbum, index) => {
                            return (
                                <article key={index}>
                                    <header>
                                        <h6>Альбом {album.name}</h6>
                                        <p>{album.photos_count} фотографии</p>
                                    </header>

                                    {album.photos.map((item: infs.CommunityAlbumPhoto, index) => {
                                        return (
                                            <div className="photo-cell only-six" key={index}>
                                                <a href={item.url}>
                                                    <img alt="" src={item['100x100']} />
                                                </a>
                                            </div>)
                                    })}


                                </article>
                            )
                        })}

                    </div>

                </div>

            </div>
        )

    }

}

// <div className="photo-cell add only-six">
//     <a href="#publ4" className="fancy-noclose"></a>
// </div>
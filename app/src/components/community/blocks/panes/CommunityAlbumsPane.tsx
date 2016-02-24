


import * as React from 'react';
import * as infs from '../../../../interfaces/interfaces';
import {connect} from "react-redux";

interface IProps {

    community: infs.Community

}

@connect((state)=>state.community)
export default class CommunityAlbumsPane extends React.Component<IProps, any> {

    isLoading = false;

    state = {
        albums: [],
        next: true,
        page: 0
    };

    _handleLoadMore() {

        if (!this.state.next) {
            return
        }

        if (!this.isLoading) {
            this.isLoading = true;
            this._fetchAlbums()
                .then(function(results: Array<infs.CommunityAlbum>) {
                    const albums = [...this.state.albums, ...results];
                    this.setState({
                        albums: albums
                    });

                }.bind(this));
        }
    }

    _fetchAlbums(): Promise<Array<infs.CommunityAlbum>> {

        const page = this.state.page + 1;
        this.setState({
            page: page
        });

        const {community} = this.props;
        return fetch('/rest/community/' + community.id + "/albums?page=" + page, {
            credentials: 'same-origin'
        }).
        then((r) => {
            return r.json()
        }).
        then(function(data) {

            let results = data.results;

            this.isLoading = false;
            this.setState({
                next: data.next
            });
            return results;

        }.bind(this));
    }

    componentDidMount() {
        console.log('CommunityAlbumsPane did mount');
        this._handleLoadMore()
    }



    render() {




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
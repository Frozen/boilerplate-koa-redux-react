


import * as React from 'react';

interface IProps {

    //params: any
    //community: infs.Community

}

export default class CommunityAlbumsPane extends React.Component<IProps, any> {

    render() {

        return (
            <div className="pane photo ng-hide" ng-show="pane == 'photo'">
                <div className="wall-panes" ng-show="tab == 'all'">
                    <div className="userAc photo-box" >
                        <a href="#" className="top-link add-photo">Добавить фотографию</a>
                        <div className="line"></div>
                        <a href="#" className="top-link add-alb">Добавить альбом</a>
                        <div className="line"></div>

                    </div>
                    <div className="userAc photo-box">



                    </div>
                </div>
                <div className="wall-panes ng-hide" ng-show="tab == 'album'">

                    <div className="userAc photo-box">
                        <article>
                            <header>
                                <h6>Альбом <span className="ng-binding"></span></h6>
                                <p className="ng-binding"> фотографии</p>
                            </header>






                            <div className="photo-cell add only-six">
                                <a href="#publ4" className="fancy-noclose"></a>
                            </div>

                        </article>
                    </div>

                </div>


            </div>
        )


    }

}
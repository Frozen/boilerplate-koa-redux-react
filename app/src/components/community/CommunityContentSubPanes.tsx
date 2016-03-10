/// <reference path="../../typings/tsd.t.ts" />


import * as React from 'react';
import Visible from '../common/Visible';
import SubTabs from '../common/SubTabs';
import ContentItem from '../common/ContentItem';
import * as infs from '../../interfaces/interfaces';
import InfiniteScrolling from '../common/InfiniteScrolling';
import * as actions from '../../actions/community';
import {trimSlash, Loader} from '../../helpers/helpers';
import {Provider, connect} from 'react-redux';
import * as models from '../../models/models';



interface IProp {
    handleSubTabClick: () => any
    getCurrentTab: () => string
    getCurrentSubTab: () => string
    subTabs: Array<any>
    currentSubTab: string,
    content: { [key:string]:Array<infs.Content>; }
    infinityIsLoading: boolean
    dispatch: any
    params: any
    history: History
    location: any
    community: infs.Community
}



class CommunityContentPaneBase extends React.Component<IProp, any> {

    state = {
        content: [],
        isActive: true,
        next: true,
        isLoading: false
    };


    isLoading = false;
    // вкладка
    type = null;

    loader = null;

    public componentDidMount() {
        if (this.type === null) {
            throw new Error("type is null")
        }

        const {params, location, community} = this.props;
        this.loader = new Loader(
            '/rest/community/' + community.id +
            "/content?type=" + this.type +
            "&rubric=" + (location.query.rubric ? location.query.rubric : ''));
        this.handleLoadMore();
    }

    componentWillUnmount() {
        this.loader = null;
    }

    /**
     * Обнуляем контент по подкатегории
     * @private
     */
    _resetContent() {
        this.setState(
            {content: [],
                pages: 0,
                next: true
            });
        this.loader.reset();
    }

    handleLoadMore() {
        this._handleLoadMore()
    }

    _handleLoadMore() {

        if (!this.state.next) {
            return
        }

        if (!this.isLoading) {
            this.isLoading = true;
            this.setState({
                isLoading: true
            });
            this._fetchContent();
        }
    }

    _fetchContent(): any {

        this.loader.
        next().
        then(function(data) {

            this.isLoading = false;

            // unmounted
            if (this.loader === null) {
                return
            }

            this.setState({
                content: [...this.state.content, ...data.results],
                isLoading: false
            });

        }.bind(this));
    }

    render() {

        const {infinityIsLoading} = this.props;

        const {content} = this.state;

        return (
            <div className="userAc">
                {content.map(function(content, index) {
                    return <ContentItem content={content} key={index}/>
                    })}
                {this.state.isLoading? <div className="spinner"><img src="/static/images/loading_spinner.gif"/></div>:''}
                <InfiniteScrolling infiniteLoadMore={this.handleLoadMore.bind(this)}
                                   isActive={() => this.state.isActive}
                                   pause={() => infinityIsLoading}/>

            </div>
        )
    }

}

@connect((state) => state.community)
export class CommunityContentPaneAll extends CommunityContentPaneBase {

    type = 'all'
}

@connect((state) => state.community)
export class CommunityContentPaneArticle extends CommunityContentPaneBase {

    type = 'article'
}

@connect((state) => state.community)
export class CommunityContentPaneNote extends CommunityContentPaneBase {

    type = 'note'
}

@connect((state) => state.community)
export class CommunityContentPanePhoto extends CommunityContentPaneBase {

    type = 'photo'
}

@connect((state) => state.community)
export class CommunityContentPaneVideo extends CommunityContentPaneBase {

    type = 'video'
}

@connect((state) => state.community)
export class CommunityContentPanePoll extends CommunityContentPaneBase {

    type = 'poll'
}

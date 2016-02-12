
import * as React from 'react';
import Visible from '../common/Visible';
import SubTabs from '../common/SubTabs';
import ContentItem from '../common/ContentItem';
import * as infs from '../../interfaces/interfaces';
import InfiniteScrolling from '../common/InfiniteScrolling';
import * as actions from '../../actions/community';
import {trimSlash} from '../../helpers/helpers';
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
}



class CommunityContentPaneBase extends React.Component<IProp, any> {

    state = {
        content: [],
        page: 0,
        isActive: true,
        next: true
    };


    isLoading = false;
    // вкладка
    type = null;


    public componentDidMount() {
        if (this.type === null) {
            throw new Error("type is null")
        }

        this.handleLoadMore();
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
            })
    }

    handleLoadMore() {
        this._handleLoadMore(this.type)
    }

    _handleLoadMore(subTab: string) {

        if (!this.state.next) {
            return
        }

        if (!this.isLoading) {
            this.isLoading = true;
            this._fetchContent(subTab)
                .then(function(results: Array<infs.Content>) {
                    const content = [...this.state.content, ...results];
                    this.setState({
                        content: content
                    });

                }.bind(this));
        }
    }

    _fetchContent(tab): Promise<Array<infs.Content>> {

        const page = this.state.page + 1;
        this.setState({
            page: page
        });

        const {params} = this.props;
        return fetch('/rest/community/' + params.id + "/content?type=" + tab + "&rubric_filter=&page=" + page, {
            credentials: 'same-origin'
        }).
        then((r) => {
            return r.json()
        }).
        then(function(data) {

            const results = data.results.map(obj => {
                return models.mapContent(obj)
            });

            this.isLoading = false;
            this.setState({
                next: data.next
            });
            return results;

        }.bind(this));
    }

    render() {

        const {infinityIsLoading} = this.props;

        const {content} = this.state;

        return (
            <div className="userAc">
                <div>{content.length}</div>
                {content.map(function(content, index) {
                    return <ContentItem content={content} key={index}/>
                    })}

                <InfiniteScrolling infiniteLoadMore={this.handleLoadMore.bind(this)}
                                   isActive={() => this.state.isActive}
                                   pause={() => infinityIsLoading}/>

            </div>
        )
    }

}

@connect()
export class CommunityContentPaneAll extends CommunityContentPaneBase {

    type = ''
}

@connect()
export class CommunityContentPaneArticle extends CommunityContentPaneBase {

    type = 'article'
}

@connect()
export class CommunityContentPaneNote extends CommunityContentPaneBase {

    type = 'note'
}

@connect()
export class CommunityContentPanePhoto extends CommunityContentPaneBase {

    type = 'photo'
}

@connect()
export class CommunityContentPaneVideo extends CommunityContentPaneBase {

    type = 'video'
}

@connect()
export class CommunityContentPanePoll extends CommunityContentPaneBase {

    type = 'poll'
}





import * as React from 'react';
import Visible from '../../../common/Visible';
import SubTabs from '../../../common/SubTabs';
import ContentItem from '../../../common/ContentItem';
import * as infs from '../../../../interfaces/interfaces';
import InfiniteScrolling from '../../../common/InfiniteScrolling';
import * as actions from '../../../../actions/community';
import {trimSlash} from '../../../../helpers/helpers';
import {Provider, connect} from 'react-redux';

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


@connect(state => state.community.panes.content)
export default class CommunityContentPane extends React.Component<IProp, any> {

    //handleLoadMore() {
    //    console.log("CommunityContentPane handle load more")
    //}

    //getCurrentTab() {
    //    return 'wall'
    //}
    //
    //getCurrentSubTab() {
    //    return 'all'
    //}

    //handleLoadMore() {
    //    console.log("handleLoadMore");
    //    const {dispatch, infinityIsLoading} = this.props;
    //
    //    if (!infinityIsLoading) {
    //        dispatch(actions.setContentLoadingState(true));
    //        dispatch(actions.fetchContent(this.getCurrentSubTab()))
    //    }
    //}

    handleSubTabClick(path) {
        const {history, dispatch, params} = this.props;
        history.push("/community/" + params.id + "/" + this.getCurrentTab() + path);
        dispatch(actions.setSubTab(path))
    }

    handleLoadMore() {
        console.log("handleLoadMore");
        const {dispatch, infinityIsLoading} = this.props;

        if (!infinityIsLoading) {
            dispatch(actions.setContentLoadingState(true));
            dispatch(actions.fetchContent(this.getCurrentSubTab()))
        }
    }

    componentWillMount() {

        //console.log("CommunityContentPane componentWillMount props", this.props);

    }

    getCurrentTab(): string {
        //const {currentTab} = this.props;

        const {params, dispatch} = this.props;

        if (!params.tab) {
            return "wall"
        }
        return trimSlash(params.tab)
    }

    getCurrentSubTab(): string {
        //const {currentSubTab} = this.props;
        const {params, dispatch} = this.props;
        if (!params.subtab) {
            return "all"
        }
        return trimSlash(params.subtab);
    }


    render() {

        const {subTabs, content, infinityIsLoading} = this.props;

        console.log("CommunityContentPane==", this.props);


        return (
            <Visible className="pane" test={this.getCurrentTab() == "" || this.getCurrentTab() == "wall"}>

                <SubTabs tabs={subTabs || []} currentTab={this.getCurrentSubTab()} handleClick={this.handleSubTabClick.bind(this)}/>

                <Visible className="userAc" test={this.getCurrentSubTab() == 'all'} >
                    <div>{(content['all']).length}</div>
                    {content['all'].map(function(content, index) {
                        return <ContentItem content={content} key={index}/>
                        })}

                    <InfiniteScrolling infiniteLoadMore={this.handleLoadMore.bind(this)}
                                       isActive={() => {return this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'all'}}
                                       pause={() => infinityIsLoading}/>

                </Visible>
                <Visible className="userAc ng-hide" test={this.getCurrentSubTab() == 'article'} ng-show="tab=='article'">
                    {content['article'].map(function(content, index) {
                        return <ContentItem content={content} key={index}/>
                        })}

                    <InfiniteScrolling infiniteLoadMore={this.handleLoadMore.bind(this)}
                                       isActive={() => {return this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'article'}}
                                       pause={() => infinityIsLoading}/>




                    <br /><br />
                </Visible>
                <Visible className="userAc" test={this.getCurrentSubTab() == 'note'}>
                    {content['note'].map(function(content, index) {
                        return <ContentItem content={content} key={index}/>
                        })}

                    <InfiniteScrolling infiniteLoadMore={this.handleLoadMore.bind(this)}
                                       isActive={() => {return this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'note'}}
                                       pause={() => infinityIsLoading}/>

                    <br /><br />
                </Visible>
                <Visible className="userAc" test={this.getCurrentSubTab() == 'photo'}>


                    <br /><br />
                </Visible>
                <Visible className="userAc" test={this.getCurrentSubTab() == 'video'}>


                    <br /><br />
                </Visible>
                <Visible className="userAc" test={this.getCurrentSubTab() == 'poll'}>

                    <br /><br />
                </Visible>
                <Visible className="userAc" test={this.getCurrentSubTab() == 'bookmark'}>

                    <br /><br />
                </Visible>
            </Visible>
        )
    }

}
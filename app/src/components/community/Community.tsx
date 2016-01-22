/// <reference path="../../typings/tsd.t.ts" />
import * as React from 'react';

import ContentItem from '../common/ContentItem';
import BottomTags from '../common/BottomTags';
import Loading from '../common/Loading';
import Tabs from '../common/Tabs';
import SubTabs from '../common/SubTabs';
import Visible from '../common/Visible';
import * as actions from '../../actions/community';
import CommunityCategories from './CommunityCategories';
//import RulesBlock from './blocks/Rules';
//import CommunityMembersPane from './blocks/panes/CommunityMembersPane';
//import CommunityContentPane from './blocks/panes/CommunityContentPane';
import CommunityRulesPane from './blocks/panes/CommunityRulesPane';
import {trimSlash} from '../../helpers/helpers';
//var Infinite = require('react-infinite');
import InfiniteScrolling from '../common/InfiniteScrolling';
import * as models from '../../models/models';
import * as infs from '../../interfaces/interfaces';
import {connect} from 'react-redux';

// Defines the interface of the properties of the Footer component
interface CommunityProps {
    community : infs.Community;
    params: any,
    dispatch: Function,
    history: History,
    currentTab: string,
    location: any,
    tabs: Array<any>,
    //subTabs: Array<any>,
    currentSubTab: string,
    content: any,
    infinityIsLoading: boolean,
    panes: any
    children: any
}

//<CommunityContentPane {...panes.content}
//    getCurrentSubTab={this.getCurrentSubTab.bind(this)}
//    getCurrentTab={this.getCurrentTab.bind(this)}
//    handleSubTabClick={this.handleSubTabClick.bind(this)}/>

@connect((state) => state.community)
export default class Community extends React.Component<CommunityProps, any> {

    componentWillMount() {

        const {params, community, dispatch} = this.props;

        if (!community) {
            dispatch(actions.fetchCommunity(params.id))
        }

        //dispatch(actions.fetchCommunity(params.id));

    }

    render() {
        const {community} = this.props;

        console.log('community children111', community);

        if (community) {
            //return <div></div>;
            return <InnerCommunity {...this.props} community={community} />
        } else {
            return <Loading />
        }
    }
}


class InnerCommunity extends React.Component<CommunityProps, any> {


    //handleLoadMore() {
    //    console.log("handleLoadMore");
    //    const {dispatch, infinityIsLoading} = this.props;
    //
    //    if (!infinityIsLoading) {
    //        dispatch(actions.setContentLoadingState(true));
    //        dispatch(actions.fetchContent(this.getCurrentSubTab()))
    //    }
    //}

    //getCurrentTab(): string {
    //    const {currentTab} = this.props;
    //    if (currentTab == '') {
    //        return "wall"
    //    }
    //    return trimSlash(currentTab)
    //}
    //
    //getCurrentSubTab(): string {
    //    const {currentSubTab} = this.props;
    //    if (currentSubTab == '') {
    //        return "all"
    //    }
    //    return trimSlash(currentSubTab);
    //}

    getTabs() {
        return [
            ["/wall", 'Стена'],
            ["/rules", 'Правила'],
            ["/members", 'Участники'],
            ["/albums", 'Альбомы'],
            ["/settings", 'Настройки']
        ]
    }


    handleTabClick(path){

        const {history, community, dispatch} = this.props;
        history.push("/community/" + community.id + "" + path);
        dispatch(actions.setTab(path));

    }

    //handleSubTabClick(path) {
    //    const {history, community, dispatch, currentTab} = this.props;
    //    history.push("/community/" + community.id + "/" + currentTab + path);
    //    dispatch(actions.setSubTab(path))
    //}

    getCommunity() {
        return this.props.community;
    }

    render() {

        //console.log('community children222', this.props.children);

        const {community, location, history, currentTab, params} = this.props;

        console.log('community???', community);

        //console.log("content==", content, content[this.getCurrentSubTab()]);
        //console.log("currentSubTab", this.getCurrentSubTab());
        //console.log("currentSubTab2", content[this.getCurrentSubTab()].length);

        //this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'all'

        //console.log("tab and subtab", this.getCurrentTab(), this.getCurrentSubTab());

        return (
            <div className="content" style={{paddingBottom: 0}}>
                <div className="left-col">
                    <div className="commun-photo">
                        <a onClick={() => {history.push("/community/"+community.id+"/users")}}><img src={community.avatar['180']} alt="" /></a>
                    </div>
                    <CommunityCategories history={this.props.history} community={this.getCommunity()} />
                    <div className="save-mess community-joined">
                        Вы вступили в сообщество
                    </div>

                    <br /><br />



                    <div className="line"></div>
                    <div className="module people_module">
                        <div className="module-title">
                            <h4>
                                <a href="#?pane=members&amp;tab=admin">Руководство <span>(1)</span></a>
                            </h4>
                        </div>
                        <div className="peoples">

                            <div className="people_cell active">
                                <a href="/user/yaru" style={{display: 'block', height: '52px', whiteSpace: 'nowrap'}}>
                                    <img src="/static/u/photo/1/s.jpg" className="ava center-image" alt="yaru" style={{verticalAlign: 'middle', border: 'none'}} />
                                        <span>yaru</span>
                                </a>
                            </div>

                        </div>

                    </div>

                    <div className="line"></div>
                </div>

                <div className="center-wall">


                    <div className="user-wall-top">
                        <h1>{community.name}</h1>
                        <div className="group-name">Сообщество</div>
                        <div className="group-text shot-text">
                            <span>Третье сообщество</span> <a href="" className="more-text">еще</a>
                            <span className="ng-hide" ng-show="full_description">Третье сообщество</span> <a href="" className="more-text2 ng-hide" ng-click="full_description=false" ng-show="full_description">свернуть</a>
                        </div>
                    </div>


                    <div className="wall-tabs blue-block">
                        <Tabs location={location} tabs={this.getTabs()} handleClick={this.handleTabClick.bind(this)} currentTab={params.tab || 'wall'}/>
                        <div className="panes">
                            {this.props.children}
                        </div>
                    </div>
                </div>


                <BottomTags />



            </div>)
    }

}
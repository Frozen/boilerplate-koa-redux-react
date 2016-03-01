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
import CommunityAdmins from './blocks/CommunityAdmins';

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

    }

    render() {
        const {community} = this.props;

        if (community) {
            return <InnerCommunity {...this.props} community={community} />
        } else {
            return <Loading />
        }
    }
}


interface ICommunityShortDescription {
    community: infs.Community
}

class CommunityShortDescription extends React.Component<ICommunityShortDescription, any> {

    state = {
        fullDescription: false
    };

    setFull(e: Event) {
        e.preventDefault();
        this.setState({
            fullDescription: true
        })
    }

    setSmall(e: Event) {
        e.preventDefault();
        this.setState({
            fullDescription: false
        })
    }

    render() {

        const {community} = this.props;
        let fullDescription = this.state.fullDescription;

        let c = (community: infs.Community) => {

            if (community.description == community.short_description) {
                return (
                    <div className="group-text shot-text">
                        <span>{community.description}</span>
                    </div>)
            }

            if (fullDescription) {
                return (
                    <div className="group-text shot-text">
                        <span>{community.description}</span>
                        &nbsp;<a href="" className="more-text2" onClick={this.setSmall.bind(this)}>свернуть</a>
                    </div>)
            } else {
                return (
                    <div className="group-text shot-text">
                        <span>{community.short_description}</span>
                        &nbsp;<a href="" className="more-text" onClick={this.setFull.bind(this)}>еще</a>
                    </div>)
            }
        };

        var rs = c(community);
        return rs;
    }
}


class InnerCommunity extends React.Component<CommunityProps, any> {
    


    getTabs() {
        return [
            ["wall", 'Стена'],
            ["rules", 'Правила'],
            ["members", 'Участники'],
            ["albums", 'Альбомы'],
            ["settings", 'Настройки']
        ]
    }

    toggleFullDescription() {
        this.setState({
            fullDescription: !this.state.fullDescription
        })
    }


    handleTabClick(path){

        const {history, community, dispatch} = this.props;
        history.push("/community/" + community.id + "/" + path);
    }

    getCommunity(): infs.Community {
        return this.props.community;
    }

    render() {

        const {community, location, params} = this.props;

        return (
            <div>
                <div className="left-col">
                    <div className="commun-photo">
                        <img src={community.avatar['180x180']} alt="" />
                    </div>
                    <CommunityCategories history={this.props.history} community={this.getCommunity()} />

                    <br /><br />

                    <div className="line"></div>
                    <CommunityAdmins community={this.getCommunity()} />

                    <div className="line"></div>
                </div>

                <div className="center-wall">


                    <div className="user-wall-top">
                        <h1>{community.name}1111</h1>
                        <div className="group-name">Сообщество</div>
                        <CommunityShortDescription community={community} />
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
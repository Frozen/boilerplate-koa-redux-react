

import * as React from 'react';
import Visible from '../../../common/Visible';
import {trimSlash} from '../../../../helpers/helpers';
import SubTabs from '../../../common/SubTabs';
import {connect} from "react-redux";
import * as actions from '../../../../actions/community';

interface IProps {

    handleSubTabClick: () => any
    getCurrentTab: () => string
    getCurrentSubTab: () => string
    subTabs: Array<any>
    currentSubTab: string
    params: any
    history: History
    dispatch: any

}

@connect(state => state.community.panes.members)
export default class CommunityMembersPane extends React.Component<IProps, any> {

    handleSubTabClick(path) {
        const {history, dispatch, params} = this.props;
        history.push("/community/" + params.id + "/" + params.tab + path);
        dispatch(actions.setSubTab(path))
    }


    render() {

        const {handleSubTabClick, subTabs, params} = this.props;

        return (
            <div className="pane">
                <SubTabs tabs={subTabs} currentTab={params.subtab || 'all'} handleClick={handleSubTabClick}/>

                <div className="fr-search">
                    <input type="text" placeholder="Найти участника по имени" className="fr-search-txt ng-pristine ng-untouched ng-valid"/>
                    <input type="submit" value="" className="fr-search-btn" />
                </div>
                <div className="wall-panes bord">
                    <div className="userAc">
                        <article ng-repeat="member in members" className="ng-scope">
                            <header><a href="/user/2" className="usName ng-binding">2</a></header>
                            <div className="user-edit" ng-show="is_admin_or_moderator">
                                <select ng-show="is_admin" ng-hide="is_moderator" ng-change="groupChanged(member, group)" ng-options="group.value as group.title for group in groups" ng-model="member.group_id" className="ng-pristine ng-untouched ng-valid"><option value="number:3" label="Участник" >Участник</option><option value="number:2" label="Модератор">Модератор</option><option value="number:1" label="Администратор">Администратор</option></select>
                                <a href="" className="action" ng-click="banUser(member)" ng-show="!member.is_blocked">Исключить</a>
                                <a href="" ng-hide="is_moderator" className="action" ng-click="banUser(member)" ng-show="member.is_blocked">Разбанить</a>
                            </div>
                            <div className="user-l">
                                <div className="userAva" style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    <span style={{display: 'inline-block', verticalAlign: 'middle', height: '100%'}} />
                                    <img alt="" style={{verticalAlign: 'middle', marginLeft: '-3px'}} src="/static/images/avatars/b.png" />
                                </div><span className="user-stat ng-hide">Online</span></div>
                        </article>
                    </div>
                </div>
            </div>
        )

    }

}



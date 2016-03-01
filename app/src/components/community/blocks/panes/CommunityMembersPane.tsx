

import * as React from 'react';
import Visible from '../../../common/Visible';
import {trimSlash} from '../../../../helpers/helpers';
import SubTabs from '../../../common/SubTabs';
import {connect} from "react-redux";
import * as actions from '../../../../actions/community';
import * as constants from '../../../../constants/constants';

interface IProps {

    handleSubTabClick: () => any
    getCurrentTab: () => string
    getCurrentSubTab: () => string
    subTabs: Array<any>
    currentSubTab: string
    params: any
    history: History
    dispatch: any
    location: any
    children: any



}


declare const request: any;

@connect()
export default class CommunityMembersPane extends React.Component<IProps, any> {

    getSubTabs() {
        return [["all", "Все"],
                ["admin", "Руководство"],
                ["friends", "Друзья"],
                ["waiting", "Заявки"],
                ["blacklist", "Черный список"],
                ["name", "По алфавиту"],
                ["activity", "По активности"]]
    }

    handleSubTabClick(path) {
        const {history, dispatch, params} = this.props;
        history.push("/community/" + params.id + "/members/" + path);
    }


    render() {

        const {params, location} = this.props;

        return (
            <div className="pane">
                <SubTabs
                    tabs={this.getSubTabs()} location={location} currentTab={params.subtab || ''}
                    handleClick={this.handleSubTabClick.bind(this)}
                    showCallback = {(tab) => {
                        if (request.user.id == constants.COMMUNITY_GROUP_ADMIN ||
                            request.user.id == constants.COMMUNITY_GROUP_MODERATOR) {
                            return true
                        }

                        if (tab == 'waiting') {
                            return false
                        }
                        if (tab == 'blacklist') {
                            return false
                        }
                        return true;
                    }}
                    />
                {this.props.children}
            </div>
        )

    }

}



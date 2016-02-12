

import * as React from 'react';
import * as infs from '../../../interfaces/interfaces';
import {Link} from 'react-router';
import {connect} from "react-redux";
import * as actions from '../../../actions/community';
import EventHandler = __React.EventHandler;

interface IProp {

    community?: infs.Community
    dispatch?: Redux.Dispatch

}

declare var request: request;

@connect((state) => state.community)
export default class CommunityJoinLeave extends React.Component<IProp, any> {

    join(e: any) {
        e.preventDefault();
        const {community, dispatch} = this.props;
        dispatch(actions.asyncJoinCommunity(community.id, request.user.id));
    }

    leave(e: any) {
        e.preventDefault();
        const {community, dispatch} = this.props;
        dispatch(actions.asyncLeaveCommunity(community.id, request.user.id));
    }

    render() {

        const community = this.props.community;

        if (!request.user.is_authenticated) {
            return null
        }

        return community.user_group ?
            <a href="" className="btn btn-grey" onClick={this.leave.bind(this)}>Выйти</a> :
            <a href="" className="btn btn-blue" onClick={this.join.bind(this)}>Вступить</a>
    }

}
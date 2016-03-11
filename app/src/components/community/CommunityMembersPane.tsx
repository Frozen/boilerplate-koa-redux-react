

import * as React from 'react';
import SubTabs from '../common/SubTabs';
import * as infs from '../../interfaces/interfaces';
import InfiniteScrolling from '../common/InfiniteScrolling';
import * as actions from '../../actions/community';
import {trimSlash} from '../../helpers/helpers';
import {Provider, connect} from 'react-redux';
import * as models from '../../models/models';
import {Loader} from '../../helpers/helpers'
import * as constants from '../../constants/constants'


interface ICommunityMembersPane {

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
    community: infs.Community

}


declare const request: any;

@connect((state) => state.community)
export class CommunityMembersPane extends React.Component<ICommunityMembersPane, any> {

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

        const {params, location, community} = this.props;

        console.log("CommunityMembersPane CommunityMembersPane ");

        return (
            <div className="pane">

                <SubTabs
                    tabs={this.getSubTabs()} location={location} currentTab={params.subtab || ''}
                    handleClick={this.handleSubTabClick.bind(this)}
                    showCallback = {(tab) => {
                        if (community.user_group_id == constants.COMMUNITY_GROUP_ADMIN ||
                            request.user_group_id == constants.COMMUNITY_GROUP_MODERATOR) {
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







interface ICommunityUserProp {
    key: number
    user: infs.User
    group_id: number
    is_blocked: boolean
    community: infs.Community
}

class CommunityUser extends React.Component<ICommunityUserProp, any> {


    componentWillMount() {
        this.setState({
            group_id: this.props.group_id,
            is_blocked: this.props.is_blocked
        })
    }

    changeGroup(e) {
        const group_id = e.target.value;
        this.setState({
            group_id: group_id
        });
        $.ajax({
            url: '/rest/community/' + this.props.community.id + '/change_group',
            type: 'POST',
            data: {
                group: group_id,
                user: this.props.user.id
            }
        })
    }

    unBun(e) {
        const {user} = this.props;
        e.preventDefault();
        $.ajax({
            url: '/rest/community/' +this.props.community.id+ '/unban',
            type: 'POST',
            data: {
                user: user.id
            }
        })
    }

    ban(e) {

        const {user} = this.props;

        e.preventDefault();
        $.ajax({
            url: '/rest/community/' +this.props.community.id+ '/ban',
            type: 'POST',
            data: {
                user: user.id
            }
        })
    }

    render() {

        const user = this.props.user;
        const group_id = this.state.group_id;
        const is_blocked = this.state.is_blocked;
        const community = this.props.community;

        return (
            <div className="userAc">
                <article className="ng-scope">
                    <header><a href={user.url} className="usName">{user.fio_or_username_or_id}</a></header>
                    <div className="user-edit" style={{display: community.user_group_id == constants.COMMUNITY_GROUP_ADMIN ? 'block' :'none'}}>
                        <select value={group_id.toString()} onChange={this.changeGroup.bind(this)}>
                            <option value={"3"} label="Участник">Участник</option>
                            <option value={"2"} label="Модератор">Модератор</option>
                            <option value={"1"} label="Администратор">Администратор</option>
                        </select>
                        &nbsp;
                        {!is_blocked?<a href="" className="action" onClick={this.ban.bind(this)}>Исключить</a>:''}
                        {is_blocked?<a href="" className="action" onClick={this.unBun.bind(this)}>Разбанить</a>:''}
                    </div>
                    <div className="user-l">
                        <div className="userAva" style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                            <span style={{display: 'inline-block', verticalAlign: 'middle', height: '100%'}} />
                            <a href={user.url}>
                                <img alt={user.fio_or_username_or_id} style={{verticalAlign: 'middle', marginLeft: '0px'}} src={user.avatar['50x50']} />
                            </a>
                        </div>
                        {user.is_online ? <span className="user-stat ng-hide">Online</span> : ''}
                    </div>
                </article>
            </div>)
    }

}


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
    community: infs.Community
}


class CommunityMembersPaneBase extends React.Component<IProp, any> {

    state = {
        users: [],
    };

    isLoading = false;
    // вкладка
    type = null;

    loader = null;


    public componentDidMount() {
        if (this.type === null) {
            throw new Error("type is null")
        }

        this.loader = new Loader('/rest/community/' + this.props.community.id + "/users?type=" + this.type);
        this.handleLoadMore();

    }

    componentWillUnmount() {
        this.loader = null;
    }

    handleLoadMore() {

        this._handleLoadMore('');

    }

    _handleLoadMore(query) {

        if (this.isLoading) {
            return
        }

        this.loader.next({query: query}).then(function(data) {

            const rows = this.state.users;

            // unmounted
            if (this.loader === null) {
                return
            }

            this.setState({
                users: [...rows, ...data.results],
            });

            this.isLoading = false;


        }.bind(this))
    }

    reset() {
        this.loader.reset();
        this.setState({
            users: []
        })
    }

    handleSearch(e) {
        const val = e.target.value;

        this.reset();
        this._handleLoadMore(val);

    }



    render() {

        const {users} = this.state;
        const community = this.props.community;

        return (
            <div>
                <div className="fr-search">
                    <input type="text" placeholder="Найти участника по имени" className="fr-search-txt" onChange={this.handleSearch.bind(this)}/>
                    <input type="submit" value="" className="fr-search-btn" />
                </div>
                <div className="wall-panes bord">
                    {users.map(function(cu, index) {
                        return <CommunityUser {...cu} community={community} key={index}/>
                    })}
                </div>
            </div>
        )

    }
}

@connect((state) => state.community)
export class CommunityMembersPaneAll extends CommunityMembersPaneBase {

    type = 'all'
}

@connect((state) => state.community)
export class CommunityMembersPaneAdmin extends CommunityMembersPaneBase {
    type = 'admins';

}

@connect((state) => state.community)
export class CommunityMembersPaneFriends extends CommunityMembersPaneBase {
    type = 'friends';
}

@connect((state) => state.community)
export class CommunityMembersPaneWaiting extends CommunityMembersPaneBase {
    type = 'waiting';
}

@connect((state) => state.community)
export class CommunityMembersPaneBlacklist extends CommunityMembersPaneBase {
    type = 'blacklist';
}

@connect((state) => state.community)
export class CommunityMembersPaneName extends CommunityMembersPaneBase {
    type = 'name';
}

@connect((state) => state.community)
export class CommunityMembersPaneActivity extends CommunityMembersPaneBase {
    type = 'activity';
}
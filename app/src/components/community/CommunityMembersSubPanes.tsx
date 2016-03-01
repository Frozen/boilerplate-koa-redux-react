

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
import {Loader} from '../../helpers/helpers'
import * as constants from '../../constants/constants'


interface ICommunityUserProp {
    key: number
    user: infs.User
    group_id: number
}

class CommunityUser extends React.Component<ICommunityUserProp, any> {

    render() {

        const user = this.props.user;

        return (
            <div className="userAc">
                <article className="ng-scope">
                    <header><a href={user.url} className="usName">{user.fio_or_username_or_id}</a></header>
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

//<div className="user-edit" ng-show="is_admin_or_moderator">
//    {group_id == constants.COMMUNITY_GROUP_ADMIN ?
//        <select ng-show="is_admin" ng-hide="is_moderator" className="ng-pristine ng-untouched ng-valid">
//            <option value="number:3" label="Участник" >Участник</option>
//            <option value="number:2" label="Модератор">Модератор</option>
//            <option value="number:1" label="Администратор">Администратор</option>
//        </select>
//            <a href="" className="action" >Исключить</a>
//<a href="" ng-hide="is_moderator" className="action" ng-click="banUser(member)" ng-show="member.is_blocked">Разбанить</a>: ''}
//</div>


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
        page: 0,
        isActive: true,
        next: true
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
            users: [],
            page: 0,
            isActive: true,
            next: true
        })
    }

    handleSearch(e) {
        const val = e.target.value;

        this.reset();
        this._handleLoadMore(val);

    }



    render() {

        const {users} = this.state;

        return (
            <div>
                <div className="fr-search">
                    <input type="text" placeholder="Найти участника по имени" className="fr-search-txt" onChange={this.handleSearch.bind(this)}/>
                    <input type="submit" value="" className="fr-search-btn" />
                </div>
                <div className="wall-panes bord">
                    {users.map(function(cu, index) {
                        return <CommunityUser {...cu} key={index}/>
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
    type = 'admin';

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


import * as React from 'react';
import * as infs from '../../interfaces/interfaces';
import InfiniteScrolling from '../common/InfiniteScrolling';
import * as actions from '../../actions/community';
import {trimSlash} from '../../helpers/helpers';
import {Provider, connect} from 'react-redux';
import * as models from '../../models/models';
import {Loader} from '../../helpers/helpers'
import * as constants from '../../constants/constants'
import {Link} from 'react-router';
import {FriendBlock, EnemyBlock, RequestBlock, RequestMyBlock, BlacklistBlock} from './Blocks';
var classNames = require('classnames');


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


@connect()
export class FriendsComponent extends React.Component<ICommunityMembersPane, any> {

    makeUrl(path: string) {
        const {params} = this.props;
        if (path == '') {
            return "/user/" + params.id + "/friends";
        }
        return "/user/" + params.id + "/friends/" + path;
    }

    getCurrentTab(): string {
        const {location} = this.props;
        const path = location.pathname;

        const curpath = path.split("/")[4];

        if (curpath) {
            return curpath
        } else {
            return ''
        }
    }

    render() {
        const {params} = this.props;
        const viewed_user_id = parseInt(params.id);

        return (
            <div className="wall-tabs blue-block apps-wall">
                <div className="wall-title">
                    <h1>Общение в Newsland</h1>
                </div>
                <div className="panes">

                    <div>
                        <div className="pane">
                            <ul className="wall-filter">
                                <li>
                                    <Link to={this.makeUrl('')} className={classNames({current: this.getCurrentTab() == ''})}>Друзья</Link>
                                </li>
                                <li>
                                    <Link to={this.makeUrl('online')} className={classNames({current: this.getCurrentTab() == 'online'})}>Друзья онлайн</Link>
                                </li>
                                <li>
                                    <Link to={this.makeUrl('enemies')} className={classNames({current: this.getCurrentTab() == 'enemies'})}>Противники</Link>
                                </li>
                                { // пользователь смотрит чужого пользователя
                                    request.user.id == viewed_user_id ?
                                <li>
                                    <Link to={this.makeUrl('requests')} className={classNames({current: this.getCurrentTab() == 'requests'})}>Заявки на дружбу</Link>
                                </li>: ''}
                                { // пользователь смотрит чужого пользователя
                                    request.user.id == viewed_user_id ?
                                <li>
                                    <Link to={this.makeUrl('requests-my')} className={classNames({current: this.getCurrentTab() == 'requests-my'})}>Мои заявки</Link>
                                </li>: ''}
                                <li>
                                    <Link to={this.makeUrl('blacklist')} className={classNames({current: this.getCurrentTab() == 'blacklist'})}>Черный список</Link>
                                </li>
                            </ul>
                            {this.props.children}

                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

interface IFriendsPane {
    params: any
}

export class FriendsPaneBase extends React.Component<IFriendsPane, any> {

    state = {
        users: [],
        search: ''
    };

    refs: {
        [key: string]: (Element);
        search: (HTMLInputElement);
    };

    loader = null;

    loading = false;

    componentDidMount() {
        const {params} = this.props;
        this.loader = new Loader('/api/v1/user/'+ params.id + '/friend_list');
        this.loadMore();
    }

    componentWillUnmount() {
        this.loader = null;
    }

    reset() {
        this.loader.reset();
        this.setState({
            users: []
        });
    }

    loadMore() {

        if (this.loading) {
            return ;
        }

        this.loading = true;

        this.loader.next({query: this.refs.search.value}).then(function(rs) {

            if (this.loader === null) {
                return ;
            }

            var users = this.state.users;

            rs.results.map(function(user) {
                users.push(user);
            });

            this.setState({
                users: users
            });
            this.loading = false;

        }.bind(this))
    }

    handleSearch() {
        this.reset();
        this.setState({
            search: this.refs.search.value
        });
        this.loadMore();
    }

}


@connect()
export class FriendsPaneFriends extends FriendsPaneBase {

    reload() {
        this.reset();
        this.loadMore();
    }

    render() {
        return (
            <div>
                <div className="fr-search">
                    <input type="text" placeholder="Поиск знакомых" className="fr-search-txt" value={this.state.search} ref="search" onChange={this.handleSearch.bind(this)}/>
                    <input type="submit" className="fr-search-btn" value="" />
                </div>
                <div className="wall-panes">
                    <div className="userAc">
                        <div className="friends">
                            {this.state.users.map(function(friend: infs.FriendUserFriend, index) {
                                return <FriendBlock friend={friend} key={index} reload={this.reload.bind(this)} params={this.props.params}/>
                            }.bind(this))}
                            <InfiniteScrolling infiniteLoadMore={this.loadMore.bind(this)}
                                isActive={() => true}
                                pause={() => false}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


@connect()
export class FriendsPaneOnline extends FriendsPaneBase {

    reload() {
        this.reset();
        this.loadMore();
    }

    componentDidMount() {
        const {params} = this.props;
        this.loader = new Loader('/api/v1/user/'+ params.id + '/online_friend_list');
        this.loadMore();
    }

    render() {
        return (
            <div>
                <div className="fr-search">
                    <input type="text" placeholder="Поиск знакомых" className="fr-search-txt" value={this.state.search} ref="search" onChange={this.handleSearch.bind(this)}/>
                    <input type="submit" className="fr-search-btn" value="" />
                    </div>
                <div className="wall-panes">
                    <div className="userAc">
                        <div className="friends">
                            {this.state.users.map(function(friend: infs.FriendUserFriend, index) {
                                return <FriendBlock friend={friend} key={index} reload={this.reload.bind(this)} params={this.props.params}/>
                            }.bind(this))}
                            <InfiniteScrolling infiniteLoadMore={this.loadMore.bind(this)}
                                isActive={() => true}
                                pause={() => false}/>
                            </div>
                    </div>
                    </div>
            </div>
        )
    }
}

@connect()
export class FriendsPaneEnemies extends FriendsPaneBase {

    reload() {
        this.reset();
        this.loadMore();
    }

    componentDidMount() {
        const {params} = this.props;
        this.loader = new Loader('/api/v1/user/'+ params.id + '/enemies_list');
        this.loadMore();
    }


    render() {
        return (
            <div>
                <div className="fr-search">
                    <input type="text" placeholder="Поиск знакомых" className="fr-search-txt" value={this.state.search} ref="search" onChange={this.handleSearch.bind(this)}/>
                    <input type="submit" className="fr-search-btn" value="" />
                    </div>
                <div className="wall-panes">
                    <div className="userAc">
                        <div className="friends">
                            {this.state.users.map(function(friend, index) {
                                return <EnemyBlock friend={friend} key={index} reload={this.reload.bind(this)} params={this.props.params}/>
                            }.bind(this))}
                            <InfiniteScrolling infiniteLoadMore={this.loadMore.bind(this)}
                                isActive={() => true}
                                pause={() => false}/>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

@connect()
export class FriendsPaneRequests extends FriendsPaneBase {

    reload() {
        this.reset();
        this.loadMore();
    }

    componentDidMount() {
        const {params} = this.props;
        this.loader = new Loader('/api/v1/user/'+ params.id + '/friend_requests_list');
        this.loadMore();
    }


    render() {

        // const {friend} = this.props;

        return (
            <div>
                <div className="fr-search">
                    <input type="text" placeholder="Поиск знакомых" className="fr-search-txt" value={this.state.search} ref="search" onChange={this.handleSearch.bind(this)}/>
                    <input type="submit" className="fr-search-btn" value="" />
                    </div>
                <div className="wall-panes">
                    <div className="userAc">
                        <div className="friends">
                            {this.state.users.map(function(friend, index) {
                                return <RequestBlock friend={friend} key={index} reload={this.reload.bind(this)} params={this.props.params}/>
                            }.bind(this))}
                            <InfiniteScrolling infiniteLoadMore={this.loadMore.bind(this)}
                                isActive={() => true}
                                pause={() => false}/>
                            </div>
                    </div>
                    </div>
            </div>
        )
    }
}




@connect()
export class FriendsPaneRequestsMy extends FriendsPaneBase {

    reload() {
        this.reset();
        this.loadMore();
    }


    componentDidMount() {
        const {params} = this.props;
        this.loader = new Loader('/api/v1/user/'+ params.id + '/my_friend_requests_list');
        this.loadMore();
    }


    render() {
        return (
            <div>
                <div className="fr-search">
                    <input type="text" placeholder="Поиск знакомых" className="fr-search-txt" value={this.state.search} ref="search" onChange={this.handleSearch.bind(this)}/>
                    <input type="submit" className="fr-search-btn" value="" />
                    </div>
                <div className="wall-panes">
                    <div className="userAc">
                        <div className="friends">
                            {this.state.users.map(function(friend, index) {
                                return <RequestMyBlock friend={friend} key={index} reload={this.reload.bind(this)} params={this.props.params}/>
                            }.bind(this))}
                            <InfiniteScrolling infiniteLoadMore={this.loadMore.bind(this)}
                                isActive={() => true}
                                pause={() => false}/>
                            </div>
                    </div>
                    </div>
            </div>
        )
    }
}



@connect()
export class FriendsPaneBlacklist extends FriendsPaneBase {

    reload() {
        this.reset();
        this.loadMore();
    }

    componentDidMount() {
        const {params} = this.props;
        this.loader = new Loader('/api/v1/user/'+ params.id + '/black_list');
        this.loadMore();
    }


    render() {
        return (
            <div>
                <div className="fr-search">
                    <input type="text" placeholder="Поиск знакомых" className="fr-search-txt" value={this.state.search} ref="search" onChange={this.handleSearch.bind(this)}/>
                    <input type="submit" className="fr-search-btn" value="" />
                </div>
                <div className="wall-panes">
                    <div className="userAc">
                        <div className="friends">
                            {this.state.users.map(function(friend, index) {
                                return <BlacklistBlock friend={friend} key={index} reload={this.reload.bind(this)} params={this.props.params}/>
                            }.bind(this))}
                            <InfiniteScrolling infiniteLoadMore={this.loadMore.bind(this)}
                                isActive={() => true}
                                pause={() => false}/>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}







import * as React from 'react';
import * as infs from '../../interfaces/interfaces';
import {connect} from 'react-redux';

interface IFriendBlock {
    // user: infs.User,
    key: number,
    reload: any
    friend: infs.FriendUserFriend,
    params: any
}

declare const request: any;


export class FriendBlock extends React.Component<IFriendBlock, any> {


    removeFriend(e) {
        e.preventDefault();
        const {friend, reload} = this.props;
        $.ajax('/api/v1/user/remove_friend', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function() {

            reload();

        }.bind(this))
    }

    isViewMyself(): boolean {
        const viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    }

    render() {

        const {friend, reload} = this.props;
        const {user} = friend;

        return (
            <div className="fr-div">
                <div className="fr-img">
                    <img alt={user.fio_or_username_or_id} src={user.avatar['180x180']} />
                </div>
                <div className="fr-cont">
                    <div className="fr-name">
                        <a href={user.url}>{user.fio_or_username_or_id}</a>
                        {user.is_online? <span>&nbsp;Online</span>: ''}
                    </div>
                    <div className="fr-inf">
                        <a href={'/user/' + user.id +  '/friends'}>{friend.friends_count} {friend.friends_count_text_plural}</a>
                    </div>
                    <div className="fr-btns">
                        <a href={'/user/' + user.id + '/messages/'} className="mess-link">Написать сообщение</a>

                        <br />
                        {this.isViewMyself() ?
                        <a id="friend-remove" href="" className="remove-link" onClick={this.removeFriend.bind(this)}>
                            Удалить из друзей
                        </a>: ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export class EnemyBlock extends React.Component<IFriendBlock, any> {


    removeEnemy(e) {
        e.preventDefault();
        const {friend, reload} = this.props;
        $.ajax('/api/v1/user/remove_enemy', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function() {

            reload();

        }.bind(this))

    }

    isViewMyself(): boolean {
        const viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    }

    render() {

        const {friend, reload} = this.props;
        const {user} = friend;


        return (
            <div className="fr-div">
                <div className="fr-img">
                    <img alt={user.fio_or_username_or_id} src={user.avatar['180x180']} />
                </div>
                <div className="fr-cont">
                    <div className="fr-name">
                        <a href={user.url}>{user.fio_or_username_or_id}</a>
                        {user.is_online? <span>&nbsp;Online</span>: ''}
                    </div>
                    <div className="fr-inf">
                        <a href={'/user/' + user.id +  '/friends'}>{friend.friends_count} {friend.friends_count_text_plural}</a>
                    </div>
                    <div className="fr-btns">
                        <a href={'/user/' + user.id + '/messages/'} className="mess-link">Написать сообщение</a>
                        <br />
                        {this.isViewMyself() ?
                        <a id="friend-remove" href="" className="remove-link" onClick={this.removeEnemy.bind(this)}>
                            Удалить из противников
                        </a>
                        : ''}
                    </div>
                </div>
            </div>
        )
    }
}



export class RequestBlock extends React.Component<IFriendBlock, any> {

    addFriend(e) {
        e.preventDefault();
        const {friend, reload} = this.props;
        $.ajax('/api/v1/user/add_friend', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function() {

            reload();

        }.bind(this))

    }

    removeRequest(e) {
        e.preventDefault();
        const {friend, reload} = this.props;
        $.ajax('/api/v1/user/remove_friend_request', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function() {

            reload();

        }.bind(this))

    }

    isViewMyself(): boolean {
        const viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    }

    render() {

        const {friend, reload} = this.props;
        const {user} = friend;


        return (
            <div className="fr-div">
                <div className="fr-img">
                    <img alt={user.fio_or_username_or_id} src={user.avatar['180x180']} />
                </div>
                <div className="fr-cont">
                    <div className="fr-name">
                        <a href={user.url}>{user.fio_or_username_or_id}</a>
                        {user.is_online? <span>&nbsp;Online</span>: ''}
                    </div>
                    <div className="fr-inf">
                        <a href={'/user/' + user.id +  '/friends'}>{friend.friends_count} {friend.friends_count_text_plural}</a>
                    </div>
                    {friend.message ?
                    <div className="message-text">
                        <div className="message-text-title">Cообщение:</div>
                        {friend.message}
                    </div>: ''
                    }
                    {this.isViewMyself() ?
                    <div className="fr-btns fr-btns2">
                        <a href="" className="add-fr-link" onClick={this.addFriend.bind(this)}>Добавить в друзья</a>
                        <a href="" className="remove-link" onClick={this.removeRequest.bind(this)}>Отклонить заявку</a>
                    </div>
                    : '' }
                </div>
            </div>
        )
    }
}



export class RequestMyBlock extends React.Component<IFriendBlock, any> {

    removeRequest(e) {
        e.preventDefault();
        const {friend, reload} = this.props;
        $.ajax('/api/v1/user/remove_friend_request', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function() {

            reload();

        }.bind(this))
    }

    isViewMyself(): boolean {
        const viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    }

    render() {

        const {friend, reload} = this.props;
        const {user} = friend;


        return (
            <div className="fr-div">
                <div className="fr-img">
                    <img alt={user.fio_or_username_or_id} src={user.avatar['180x180']} />
                </div>
                <div className="fr-cont">
                    <div className="fr-name">
                        <a href={user.url}>{user.fio_or_username_or_id}</a>
                        {user.is_online? <span>&nbsp;Online</span>: ''}
                    </div>
                    <div className="fr-inf">
                        <a href={'/user/' + user.id +  '/friends'}>{friend.friends_count} {friend.friends_count_text_plural}</a>
                    </div>
                    {this.isViewMyself() ?
                    <div className="fr-btns fr-btns2">
                        <a href="" className="remove-link" onClick={this.removeRequest.bind(this)}>Удалить заявку</a>
                    </div>
                    :''}
                </div>
            </div>
        )
    }
}


export class BlacklistBlock extends React.Component<IFriendBlock, any> {

    removeFromBlacklist(e) {
        e.preventDefault();
        const {friend, reload} = this.props;
        $.ajax('/api/v1/user/remove_from_blacklist', {
            type: 'POST',
            data: {
                user_id: friend.user.id
            }
        }).then(function() {

            reload();

        }.bind(this))
    }

    isViewMyself(): boolean {
        const viewed_user_id = parseInt(this.props.params.id);
        return viewed_user_id == request.user.id;
    }

    render() {

        const {friend, reload} = this.props;
        const {user} = friend;


        return (
            <div className="fr-div">
                <div className="fr-img">
                    <img alt={user.fio_or_username_or_id} src={user.avatar['180x180']} />
                </div>
                <div className="fr-cont">
                    <div className="fr-name">
                        <a href={user.url}>{user.fio_or_username_or_id}</a>
                        {user.is_online? <span>&nbsp;Online</span>: ''}
                    </div>
                    <div className="fr-inf">
                        <a href={'/user/' + user.id +  '/friends'}>{friend.friends_count} {friend.friends_count_text_plural}</a>
                    </div>
                    {this.isViewMyself() ?
                    <div className="fr-btns fr-btns2">
                        <a href="" className="remove-link" onClick={this.removeFromBlacklist.bind(this)}>Удалить из черного списка</a>
                    </div>
                    : ''}
                </div>
            </div>
        )
    }
}
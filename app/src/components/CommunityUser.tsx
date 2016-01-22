


import * as React from 'react';
import * as infs from '../interfaces/interfaces';


interface IProps {
    communityUser: infs.CommunityUser
}

export default class CommunityUser extends React.Component<IProps, any> {

    render() {

        const {communityUser} = this.props;

        const isOnline = (isOnline: boolean) => {
            if (isOnline) {
                return <span className="user-stat ng-hide">Online</span>
            } else {
                return <span className="user-stat"></span>
            }
        };

        return (
            <article>
                <header>
                    <a href={communityUser.user.getUrl()} className="usName">{communityUser.user.getFioOrUsernameOrId()}</a>
                </header>
                <div className="user-edit">
                    <select>
                        <option value="3" label="Участник" >Участник</option>
                        <option value="2" label="Модератор">Модератор</option>
                        <option value="1" label="Администратор">Администратор</option>
                    </select>
                    <a href="" className="action" >Исключить</a>
                    <a href="" className="action" ng-show="member.is_blocked">Разбанить</a>
                </div>
                <div className="user-l">
                    <div className="userAva" style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <span style={{display: 'inline-block', verticalAlign: 'middle', height: '100%'}} />
                        <img alt="" style={{verticalAlign: 'middle', marginLeft: '-3px'}} src="" />
                    </div>
                    {isOnline(communityUser.user.isOnline())}
                </div>
            </article>
        )
    }

}
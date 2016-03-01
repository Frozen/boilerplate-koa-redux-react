
import * as React from 'react';
import {connect} from 'react-redux';
import * as infs from '../../../interfaces/interfaces';
import {Loader} from "../../../helpers/helpers";
import {Link} from 'react-router';

interface ICommunityAdmins {
    community : infs.Community
}


/**
 * Блок админы сообщества
 */
export default class CommunityAdmins extends React.Component<ICommunityAdmins, any> {

    state = {
        users: [],
        count: 0
    };

    loader = null;

    componentDidMount() {

        const {community} = this.props;

        this.loader = new Loader('/rest/community/' + this.props.community.id + "/users?type=admin");


        this.loader.next().then(function(data) {
            this.setState({
                users: data.results.slice(0, 9),
                count: data.count
            });
        }.bind(this));

        // loadCommunityUsers(community.id, 'admin', 1, '').then(function(data) {
        //
        //     this.setState({
        //         users: data.results.slice(0, 9),
        //         count: data.count
        //     });
        //
        //     this.isLoading = false;
        //
        // }.bind(this))

    }


    render() {

        const {community} = this.props;

        return (

            <div className="module people_module">
                <div className="module-title">
                    <h4>
                        <Link to={'/community/'+community.id+'/members/admin'}>Руководство <span>({this.state.count})</span></Link>
                    </h4>
                </div>
                <div className="peoples">
                {this.state.users.map(function(cu: infs.CommunityUser, index) {
                    return (

                            <div className="people_cell active"  key={index}>
                                <a href={cu.user.url} style={{display: 'block', height: '52px', whiteSpace: 'nowrap'}}>
                                    <img src={cu.user.avatar['50x50']}
                                         className="ava center-image" alt={cu.user.fio_or_username_or_id}
                                         style={{verticalAlign: 'middle', border: 'none'}} />
                                    <span>{cu.user.fio_or_username_or_id}</span>
                                </a>
                            </div>

                    )
                })}
                </div>

            </div>
        )
    }


}


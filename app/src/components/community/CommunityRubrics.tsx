

import * as React from 'react';
import * as infs from '../../interfaces/interfaces';
import {Link} from 'react-router';
import CommunityJoinLeave from './blocks/CommunityJoinLeave'

class IProps {
    community: infs.Community;
    history: History;
    location: any
}

export default class CommunityRubrics extends React.Component<IProps, any> {

    //e: MouseEvent
    push(categoryId, e: MouseEvent) {

        e.preventDefault();
        const {community, history} = this.props;

        history.push("/community/" + community.id + "/wall/all?rubric_filter=" + categoryId);

    }

    render() {

        const {community} = this.props;
        const rubrics = community.rubrics || [];
        const {location} = this.props;

        return (
            <div className="user-btns">
                <CommunityJoinLeave />
                <div className="line line2"></div>
                <div className="cat-block people_module">
                    <h4>Категории ({rubrics.length})</h4>
                    <ul className="cat-list">
                        <li><a href={'/community/' + community.id} className={location.query.rubric ?'':'active'}>Все</a></li>
                        {rubrics.map(function(category, index) {
                            return <li key={index}>
                                <a className={location.query.rubric==category.id.toString() ? "active": ''} href={"/community/" + community.id + '' + '/wall/all?rubric=' + category.id} >{category.name}</a>
                            </li>
                            }.bind(this))}
                    </ul>
                </div>
            </div>
        )
    }

}

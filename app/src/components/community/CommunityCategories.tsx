

import * as React from 'react';
import * as infs from '../../interfaces/interfaces';
import {Link} from 'react-router';
import CommunityJoinLeave from './blocks/CommunityJoinLeave'

class IProps {
    community: infs.Community
    history: History
}

export default class CommunityCategories extends React.Component<IProps, any> {

    //e: MouseEvent
    push(categoryId, e: MouseEvent) {

        e.preventDefault();
        const {community, history} = this.props;

        history.push("/community/" + community.id + "/wall/all?rubric_filter=" + categoryId);

    }

    render() {

        const {community} = this.props;
        const categories = community.categories || [];

        return (
            <div className="user-btns">
                <CommunityJoinLeave />
                <div className="line line2"></div>
                <div className="cat-block people_module">
                    <h4>Категории ({categories.length})</h4>
                    <ul className="cat-list">
                        <li><Link className="active" to={"/community/" + community.id}>Все</Link></li>
                        {categories.map(function(category, index) {
                            return <li key={index}>
                                <a className="active" href={"/community/" + category.id} onClick={this.push.bind(this, category.id)}>{category.name}</a>
                            </li>
                            }.bind(this))}
                    </ul>
                </div>
            </div>
        )
    }

}

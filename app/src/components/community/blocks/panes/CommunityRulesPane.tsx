

import * as React from 'react';
import Visible from '../../../common/Visible';
import * as infs from '../../../../interfaces/interfaces';
import {connect} from 'react-redux';

interface IProps {

    //params: any
    community: infs.Community

}

@connect(state => state.community)
export default class CommunityRulesPane extends React.Component<IProps, any> {


    render() {

        var {community} = this.props;

        console.log("CommunityRulesPane", community);

        if (!community) {
            return <i />;
        }

        //community = community || {};

        return (
            <div className="pane">
                <div className="userAc">
                    <h3>Правила поведения в сообществе.</h3>
                    <p>
                        {community.rules}
                    </p>
                </div>
            </div>
        )
    }

}





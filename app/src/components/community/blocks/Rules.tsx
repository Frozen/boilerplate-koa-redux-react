/**
 *
 * Текст сообщества
 *
 *
 */

import * as React from 'react';

export default class Rules extends React.Component<any, any> {

    render() {

        const {community} = this.props;

        return (
            <div className="userAc">
                <h3>Правила поведения в сообществе.</h3>
                <p>
                    {community.description}
                </p>
            </div>
        )
    }

}




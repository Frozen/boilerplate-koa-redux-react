

import * as React from 'react';

export default class TestBlock extends React.Component<any, any> {


    render() {

        console.log("Test block props", this.props);

        const {dispatch} = this.props;

        dispatch({
            type: 'TEST_BLOCK_DISPATCH',
            value: 'ahaahahah'

        });

        return (
            <div className="Bla-bla"><a href="#" onClick={dispatch({
            type: 'TEST BLOCK DISPATCH',
            value: 'bbbbbbbbbx'

        })}>aaaaaaaaaaaaaaaaaaaa</a></div>
        )
    }

}
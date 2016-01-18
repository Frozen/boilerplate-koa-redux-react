/// <reference path="../../typings/tsd.t.ts" />
import * as React from 'react';


export default class Visible extends React.Component<any, any> {

    render() {
        const {test, className} = this.props;

        return (
            <div style={{display: test ? "block": 'none'}} className={className || ''}>{this.props.children}</div>
        )
    }

}
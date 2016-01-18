/// <reference path="../../typings/tsd.t.ts" />
import * as React from 'react';
var classNames = require('classnames');
import {trimSlash} from '../../helpers/helpers';

export default class SubTabs extends React.Component<any, any> {

    //propTypes: {
    //    handleClick: React.PropTypes.func.isRequired,
    //    currentTab: React.PropTypes.string.isRequired,
    //    tabs: React.PropTypes.array.isRequired
    //};

    render() {

        const {tabs, currentTab, handleClick} = this.props;

        return (
            <ul className="wall-filter">
                {tabs.map((tab, index) => {
                    return <li key={index}>
                        <a href=""
                           className={classNames({current: trimSlash(tab[0])==trimSlash(currentTab)})}
                           onClick={(e) => {e.preventDefault(); handleClick(tab[0])}}
                           ng-click="tab='all'">{tab[1]}</a>
                    </li>
                })}
            </ul>
        )
    }

}


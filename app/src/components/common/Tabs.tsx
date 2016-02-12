/// <reference path="../../typings/tsd.t.ts" />

import * as React from 'react';
var classNames = require('classnames');
import {Router} from 'react-router';
import {connect} from "react-redux";
const {PropTypes} = React;

/**
 *
 * @param {Function} handleClick Function that takes a path and push url
 * next location
 *
 * @param {Array} tabs Array of tabs to show
 * @param {String} currentTab String that match one of tabs url, if equal set
 * current tab selected
 *
 */

@connect()
export default class Tabs extends React.Component<any, any> {

    //mixins: [Router.A];

    render() {
        const {location, handleClick, tabs, params} = this.props;

        var currentTab = location.pathname.replace(/\//, "").split("/")[2] || "";

        if (!currentTab) {
            currentTab = "wall"
        }

        return (

            <ul className="tabs">
                {tabs.map((tab, index) => {
                    return (
                        <li key={index}><a
                            href={"/community/3"+tab[0]}
                            onMouseDown={(e) => {e.preventDefault(); handleClick(tab[0])}}
                            onClick={(e) => e.preventDefault()}
                            className={classNames({current: currentTab.replace(/\//, "") == tab[0].replace(/\//, "")})}>{tab[1]}</a></li>
                    )})}
            </ul>
        )
    }

}


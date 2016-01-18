/// <reference path="../../typings/tsd.t.ts" />

import * as React from 'react';
var classNames = require('classnames');

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


export default class Tabs extends React.Component<any, any> {

    //propTypes: {
    //    handleClick: React.PropTypes.func.isRequired,
    //    currentTab: React.PropTypes.string.isRequired,
    //    tabs: React.PropTypes.array.isRequired
    //};


    render() {
        const {handleClick, currentTab, tabs} = this.props;

        //const current = () => {
        //    return
        //};

        //x

        return (

            <ul className="tabs">
                {tabs.map((tab, index) => {
                    return <li key={index}><a
                        href={"/community/3"+tab[0]}
                        onMouseDown={(e) => {e.preventDefault(); handleClick(tab[0])}}
                        onClick={(e) => e.preventDefault()}
                        className={classNames({current: currentTab.replace(/\//, "") == tab[0].replace(/\//, "")})}>{tab[1]}</a></li>
                })}
            </ul>
        )
    }

}


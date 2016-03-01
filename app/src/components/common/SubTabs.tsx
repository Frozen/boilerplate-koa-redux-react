/// <reference path="../../typings/tsd.t.ts" />
import * as React from 'react';
var classNames = require('classnames');
import {trimSlash} from '../../helpers/helpers';


interface IProp {
    location: any
    tabs: Array<any>
    showCallback?: () => boolean
}

export default class SubTabs extends React.Component<any, any> {

    render() {

        const {tabs, handleClick, location} = this.props;

        let showCallback: (tab: string) => boolean = this.props.showCallback || function(tab) {return true};

        var currentTab = location.pathname.replace(/\//, "").split("/")[3];

        var _tabs = tabs || [];

        return (
            <ul className="wall-filter">
                {_tabs.map((tab, index) => {
                    return (
                        showCallback(tab[0]) ? <li key={index}>
                            <a href=""
                                className={classNames({current: tab[0]==currentTab})}
                                onClick={(e) => {e.preventDefault(); handleClick(tab[0])}}
                                >{tab[1]}</a>
                        </li>: '')
                })}
            </ul>
        )
    }

}


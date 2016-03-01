



import * as React from 'react';
import Visible from '../../../common/Visible';
import SubTabs from '../../../common/SubTabs';
import ContentItem from '../../../common/ContentItem';
import * as infs from '../../../../interfaces/interfaces';
import InfiniteScrolling from '../../../common/InfiniteScrolling';
import * as actions from '../../../../actions/community';
import {trimSlash} from '../../../../helpers/helpers';
import {Provider, connect} from 'react-redux';
import * as models from '../../../../models/models';


interface IProp {
    handleSubTabClick: () => any
    getCurrentTab: () => string
    getCurrentSubTab: () => string
    subTabs: Array<any>
    currentSubTab: string
    infinityIsLoading: boolean
    dispatch: any
    params: any
    history: History
    children: any
    location: any
}

@connect()
export default class CommunityContentPane extends React.Component<IProp, any> {

    handleSubTabClick(path) {
        const {history, params} = this.props;
        history.push("/community/" + params.id + "/" + this.getCurrentTab() + "/" + path);
    }

    getCurrentTab(): string {
        const {params} = this.props;

        if (!params.tab) {
            return "wall"
        }
        return trimSlash(params.tab)
    }

    //_getSubTab(props: IProp): string {
    //    const {params} = props;
    //    if (!params.subtab) {
    //        return ""
    //    }
    //    return trimSlash(params.subtab);
    //}

    //getCurrentSubTab(): string {
    //    return this._getSubTab(this.props);
    //}

    getSubTabs() {
        return [
            ["all", "Всё"],
            ["article", "Статьи"],
            ["note", "Заметки"],
            ["photo", "Фото"],
            ["video", "Видео"],
            ["poll", "Опросы"],
        ];
    }


    render() {

        const {location} = this.props;

        return (
            <div className="pane">
                <SubTabs tabs={this.getSubTabs()} location={location} handleClick={this.handleSubTabClick.bind(this)}/>
                {this.props.children}
            </div>
        )
    }
}
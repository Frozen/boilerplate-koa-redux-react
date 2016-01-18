/// <reference path="../../typings/tsd.t.ts" />
import * as React from 'react';

import ContentItem from '../common/ContentItem';
import BottomTags from '../common/BottomTags';
import Loading from '../common/Loading';
import Tabs from '../common/Tabs';
import SubTabs from '../common/SubTabs';
import Visible from '../common/Visible';
import * as actions from './actions';
import RulesBlock from './blocks/Rules';
import {trimSlash} from '../../helpers/helpers';
//var Infinite = require('react-infinite');
import InfiniteScrolling from '../common/InfiniteScrolling';
import * as models from '../../models/models';
import * as infs from '../../interfaces/interfaces';


// Defines the interface of the properties of the Footer component
interface CommunityProps {
    community : infs.Community;
    params: any,
    dispatch: Function,
    history: History,
    currentTab: string,
    location: any,
    tabs: Array<any>,
    subTabs: Array<any>,
    currentSubTab: string,
    content: any,
    infinityIsLoading: boolean
}


export class Community extends React.Component<CommunityProps, any> {

    componentWillMount() {

        const {params, dispatch} = this.props;

        if (params.tab) {
            dispatch(actions.setTab(params.tab));
        }

        if (params.subtab) {
            dispatch(actions.setSubTab(params.subtab));
        }


        dispatch(actions.fetchCommunity(params.id));

    }

    render() {
        const {community} = this.props;

        if (community) {
            return <InnerCommunity {...this.props} />
        } else {
            return <Loading />
        }

    }
}


class InnerCommunity extends React.Component<CommunityProps, any> {


    handleLoadMore() {
        console.log("handleLoadMore");
        const {dispatch, infinityIsLoading} = this.props;

        if (!infinityIsLoading) {
            dispatch(actions.setContentLoadingState(true));
            dispatch(actions.fetchContent(this.getCurrentSubTab()))
        }
    }

    getCurrentTab(): string {
        const {currentTab} = this.props;
        if (currentTab == '') {
            return "wall"
        }
        return trimSlash(currentTab)
    }

    getCurrentSubTab(): string {
        const {currentSubTab} = this.props;
        if (currentSubTab == '') {
            return "all"
        }
        return trimSlash(currentSubTab);
    }

    handleTabClick(path) {

        const {history, community, dispatch} = this.props;
        history.push("/community/" + community.id + "" + path);
        dispatch(actions.setTab(path));

    }

    handleSubTabClick(path) {
        const {history, community, dispatch, currentTab} = this.props;
        history.push("/community/" + community.id + "/" + currentTab + path);
        dispatch(actions.setSubTab(path))
    }

    render() {

        const {community, location, history, tabs,
            currentTab, subTabs, currentSubTab,
            content, infinityIsLoading} = this.props;

        console.log("content==", content, content[this.getCurrentSubTab()]);
        console.log("currentSubTab", this.getCurrentSubTab());
        console.log("currentSubTab2", content[this.getCurrentSubTab()].length);

        //this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'all'

        //console.log("tab and subtab", this.getCurrentTab(), this.getCurrentSubTab());

        return (
            <div className="content" style={{paddingBottom: 0}}>
                <div className="left-col">
                    <div className="commun-photo">
                        <a onClick={() => {history.push("/community/"+community.id+"/users")}}><img src={community.avatar['180']} alt="" /></a>
                    </div>
                    <div className="user-btns">
                        <div className="line line2"></div>
                        <div className="cat-block people_module">
                            <h4>Категории (0)</h4>
                            <ul className="cat-list">
                                <li><a className="active" href="/community/4">Все</a></li>
                            </ul>
                        </div>

                        <div className="save-mess community-joined">
                            Вы вступили в сообщество
                        </div>
                    </div><br /><br />



                    <div className="line"></div>
                    <div className="module people_module">
                        <div className="module-title">
                            <h4>
                                <a href="#?pane=members&amp;tab=admin">Руководство <span>(1)</span></a>
                            </h4>
                        </div>
                        <div className="peoples">

                            <div className="people_cell active">
                                <a href="/user/yaru" style={{display: 'block', height: '52px', whiteSpace: 'nowrap'}}>
                                    <img src="/static/u/photo/1/s.jpg" className="ava center-image" alt="yaru" style={{verticalAlign: 'middle', border: 'none'}} />
                                        <span>yaru</span>
                                </a>
                            </div>

                        </div>

                    </div>

                    <div className="line"></div>
                </div>

                <div className="center-wall" community-panes="4" is-admin="true" is-moderator="false" is-admin-or-moderator="true">


                    <div className="user-wall-top">
                        <h1>{community.name}</h1>
                        <div className="group-name">Сообщество</div>
                        <div className="group-text shot-text">
                            <span ng-show="!full_description">Третье сообщество</span> <a href="" className="more-text" ng-click="full_description=true;console.log(1);" ng-show="!full_description">еще</a>
                            <span className="ng-hide" ng-show="full_description">Третье сообщество</span> <a href="" className="more-text2 ng-hide" ng-click="full_description=false" ng-show="full_description">свернуть</a>
                        </div>
                    </div>


                    <div className="wall-tabs blue-block">
                        <Tabs location={location} tabs={tabs} handleClick={this.handleTabClick.bind(this)} currentTab={currentTab}/>
                        <div className="panes">
                            <Visible className="pane" ng-show="pane=='wall'" test={currentTab == "" || trimSlash(currentTab) == "wall"}>
                                <Visible test={currentTab == "" || trimSlash(currentTab) == "wall"}>
                                    <SubTabs tabs={subTabs["/wall"] || []} currentTab={currentSubTab} handleClick={this.handleSubTabClick.bind(this)}/>
                                </Visible>
                                <Visible className="userAc" test={currentSubTab == ''|| trimSlash(currentSubTab) == 'all'} >
                                    <div>{(content['all']).length}</div>
                                    {content['all'].map(function(content, index) {
                                        return <ContentItem content={content} key={index}/>
                                    })}

                                    <InfiniteScrolling infiniteLoadMore={this.handleLoadMore.bind(this)}
                                                       isActive={() => {return this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'all'}}
                                                       pause={() => infinityIsLoading}/>

                                </Visible>
                                <Visible className="userAc ng-hide" test={trimSlash(currentSubTab) == 'article'} ng-show="tab=='article'">
                                    {content['article'].map(function(content, index) {
                                        return <ContentItem content={content} key={index}/>
                                        })}

                                    <InfiniteScrolling infiniteLoadMore={this.handleLoadMore.bind(this)}
                                                       isActive={() => {return this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'article'}}
                                                       pause={() => infinityIsLoading}/>




                                    <br /><br />
                                </Visible>
                                <Visible className="userAc" test={trimSlash(currentSubTab) == 'note'}>
                                    {content['note'].map(function(content, index) {
                                        return <ContentItem content={content} key={index}/>
                                        })}

                                    <InfiniteScrolling infiniteLoadMore={this.handleLoadMore.bind(this)}
                                                       isActive={() => {return this.getCurrentTab() == 'wall' && this.getCurrentSubTab() == 'note'}}
                                                       pause={() => infinityIsLoading}/>

                                    <br /><br />
                                </Visible>
                                <Visible className="userAc" test={trimSlash(currentSubTab) == 'photo'}>


                                    <br /><br />
                                </Visible>
                                <Visible className="userAc" test={trimSlash(currentSubTab) == 'video'}>


                                    <br /><br />
                                </Visible>
                                <Visible className="userAc" test={trimSlash(currentSubTab) == 'poll'}>

                                    <br /><br />
                                </Visible>
                                <Visible className="userAc" test={trimSlash(currentSubTab) == 'bookmark'}>

                                    <br /><br />
                                </Visible>
                            </Visible>
                            <Visible className="pane ng-hide" ng-show="pane=='info'" test={trimSlash(currentTab) == 'info'}>
                                <div className="userAc">
                                    <p>
                                        Третье сообщество
                                    </p>
                                </div>
                            </Visible>
                            <Visible className="pane" test={trimSlash(currentTab) == 'rules'}>
                                <RulesBlock community={community} />
                            </Visible>
                            <Visible className="pane" test={trimSlash(currentTab) == 'members'}>
                                <SubTabs tabs={subTabs["/members"] || []} currentTab={currentSubTab} handleClick={this.handleSubTabClick.bind(this)}/>

                                <div className="fr-search">
                                    <input type="text" placeholder="Найти участника по имени" className="fr-search-txt ng-pristine ng-untouched ng-valid" ng-model="query" />
                                        <input type="submit" value="" className="fr-search-btn" />
                                </div>
                                <div className="wall-panes bord">
                                    <div className="userAc" ng-show="true">


                                        <article ng-repeat="member in members" className="ng-scope">
                                        <header><a href="/user/2" className="usName ng-binding">2</a></header>
                                        <div className="user-edit" ng-show="is_admin_or_moderator">
                                            <select ng-show="is_admin" ng-hide="is_moderator" ng-change="groupChanged(member, group)" ng-options="group.value as group.title for group in groups" ng-model="member.group_id" className="ng-pristine ng-untouched ng-valid"><option value="number:3" label="Участник" >Участник</option><option value="number:2" label="Модератор">Модератор</option><option value="number:1" label="Администратор">Администратор</option></select>
                                            <a href="" className="action" ng-click="banUser(member)" ng-show="!member.is_blocked">Исключить</a>
                                            <a href="" ng-hide="is_moderator" className="action" ng-click="banUser(member)" ng-show="member.is_blocked">Разбанить</a>
                                        </div>
                                        <div className="user-l">
                                            <div className="userAva" style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                                <span style={{display: 'inline-block', verticalAlign: 'middle', height: '100%'}} />
                                                <img alt="" style={{verticalAlign: 'middle', marginLeft: '-3px'}} src="/static/images/avatars/b.png" />
                                            </div><span className="user-stat ng-hide" ng-show="false">Online</span></div>
                                    </article>

                                    </div>








                                </div>
                            </Visible>

                            <Visible className="pane photo ng-hide" ng-show="pane == 'photo'" test={trimSlash(currentTab) == 'albums'}>
                                <div className="wall-panes" ng-show="tab == 'all'">
                                    <div className="userAc photo-box" >
                                        <a href="#" className="top-link add-photo">Добавить фотографию</a>
                                        <div className="line"></div>
                                        <a href="#" className="top-link add-alb">Добавить альбом</a>
                                        <div className="line"></div>

                                    </div>
                                    <div className="userAc photo-box">



                                    </div>
                                </div>
                                <div className="wall-panes ng-hide" ng-show="tab == 'album'">

                                    <div className="userAc photo-box">
                                        <article>
                                            <header>
                                                <h6>Альбом <span className="ng-binding"></span></h6>
                                                <p className="ng-binding"> фотографии</p>
                                            </header>






                                            <div className="photo-cell add only-six">
                                                <a href="#publ4" className="fancy-noclose"></a>
                                            </div>

                                        </article>
                                    </div>

                                </div>


                            </Visible>


                            <Visible className="pane community_albums community-settings ng-scope ng-hide" ng-show="pane=='settings'" test={trimSlash(currentTab) == 'settings'}>

                                <form id="community_settings" ng-submit="settingsSubmit()" className="ng-pristine ng-valid">
                                    <input id="inp-community-id" type="hidden" name="community_id" value="4" />
                                        <input type="hidden" name="csrfmiddlewaretoken" value="cYmRvFENGItbhkX46gLHpN7ASOiR1VcY" />
                                            <div className="userAc page">
                                                <p className="info-label">Название</p>
                                                <div className="form-row">

                                                    <input id="id_name" maxLength={256} name="name" type="text" value="Третье сообщество" />
                                                        <div className="text-error ng-binding"></div>
                                                </div>
                                                <p className="info-label">Описание</p>
                                                <div className="form-row form-row2">

                                                    <textarea cols={40} id="id_description" name="description" rows={10}>Третье сообщество</textarea>
                                                    <div className="text-error ng-binding"></div>
                                                </div>
                                                <p className="info-label">Правила</p>
                                                <div className="form-row form-row2">

                                                    <textarea cols={40} id="id_rules" name="rules" rows={10}></textarea>
                                                    <div className="text-error ng-binding"></div>
                                                </div>
                                                <article>
                                                    <div className="info-box">
                                                        <div className="saved-info">
                                                            <div className="info-line">
                                                                <p className="info-label">Категория</p>
                                                                <p className="info-data">Общество</p>
                                                            </div>
                                                            <div className="info-line">
                                                                <p className="info-label">Субкатегория</p>
                                                                <p className="info-data">Войны и конфликты</p>
                                                            </div>
                                                            <div className="info-line">
                                                                <p className="info-label">Адрес сайта</p>
                                                                <p className="info-data" style={{width: '50%'}}>
                                                                    <input id="id_url" maxLength={256} name="url" type="text" />
                                                                </p>
                                                            </div>




                                                        </div>
                                                    </div>
                                                </article>
                                                <div className="userAc subscription">
                                                    <article>




                                                        <p className="subscr-title">Возможность ставить заметки</p>








                                                        <ul id="id_note_only_admin"><li><label htmlFor="id_note_only_admin_0"><input checked={true} id="id_note_only_admin_0" name="note_only_admin" type="radio" value="False" /> Всем участникам</label></li>
                                                            <li><label htmlFor="id_note_only_admin_1"><input id="id_note_only_admin_1" name="note_only_admin" type="radio" value="True" /> Только администраторам</label></li></ul>
                                                    </article>
                                                    <article>
                                                        <p className="subscr-title">Возможность ставить ссылки</p>








                                                        <ul id="id_link_only_admin"><li><label htmlFor="id_link_only_admin_0"><input checked={true} id="id_link_only_admin_0" name="link_only_admin" type="radio" value="False" /> Всем участникам</label></li>
                                                            <li><label htmlFor="id_link_only_admin_1"><input id="id_link_only_admin_1" name="link_only_admin" type="radio" value="True" /> Только администраторам</label></li></ul>
                                                    </article>
                                                    <article>
                                                        <p className="subscr-title">Возможность ставить статьи</p>








                                                        <ul id="id_article_only_admin"><li><
                                                            label htmlFor="id_article_only_admin_0">
                                                                <input checked={true} id="id_article_only_admin_0" name="article_only_admin" type="radio" value="False" /> Всем участникам</label></li>
                                                            <li><label htmlFor="id_article_only_admin_1"><input id="id_article_only_admin_1" name="article_only_admin" type="radio" value="True" /> Только администраторам</label></li></ul>
                                                    </article>
                                                    <article>
                                                        <p className="subscr-title">Возможность ставить фотографии</p>




                                                        <ul id="id_photo_only_admin"><li><label htmlFor="id_photo_only_admin_0"><input checked={true} id="id_photo_only_admin_0" name="photo_only_admin" type="radio" value="False" /> Всем участникам</label></li>
                                                            <li>
                                                                <label htmlFor="id_photo_only_admin_1">
                                                                    <input id="id_photo_only_admin_1" name="photo_only_admin" type="radio" value="True" /> Только администраторам</label></li></ul>





                                                    </article>
                                                    <article>
                                                        <p className="subscr-title">Возможность размещать видео</p>








                                                        <ul id="id_video_only_admin"><li><label htmlFor="id_video_only_admin_0"><input checked={true} id="id_video_only_admin_0" name="video_only_admin" type="radio" value="False" /> Всем участникам</label></li>
                                                            <li>
                                                                <label htmlFor="id_video_only_admin_1">
                                                                <input id="id_video_only_admin_1" name="video_only_admin" type="radio" value="True" /> Только администраторам</label></li></ul>
                                                    </article>
                                                    <article>
                                                        <p className="subscr-title">Возможность ставить опросы</p>








                                                        <ul id="id_poll_only_admin"><li><label htmlFor="id_poll_only_admin_0"><input checked={true} id="id_poll_only_admin_0" name="poll_only_admin" type="radio" value="False" /> Всем участникам</label></li>
                                                            <li><label htmlFor="id_poll_only_admin_1"><input id="id_poll_only_admin_1" name="poll_only_admin" type="radio" value="True" /> Только администраторам</label></li></ul>
                                                    </article>
                                                    <article>
                                                        <p className="subscr-title">Возможность комментировать</p>
                                                        <div className="subscr-line">
                                                            <input type="checkbox" checked={true} ng-disabled="!is_admin" />
                                                                <p>Всем пользователям Гайдпарка</p>
                                                        </div>
                                                        <div className="subscr-line">
                                                            <input type="checkbox" ng-disabled="!is_admin" />
                                                                <p>Только участникам сообщества</p>
                                                        </div>
                                                        <div className="subscr-line">
                                                            <input type="checkbox" ng-disabled="!is_admin" />
                                                                <p>Только администраторам</p>
                                                        </div>
                                                    </article>
                                                    <article>
                                                        <p className="subscr-title">Тип сообщества</p>
                                                        <ul id="id_is_closed"><li><label htmlFor="id_is_closed_0">
                                                            <input checked={true} id="id_is_closed_0" name="is_closed" type="radio" value="False"/> Открытое сообщество</label></li>
                                                            <li><label htmlFor="id_is_closed_1"><input id="id_is_closed_1" name="is_closed" type="radio" value="True" /> Закрытое сообщество</label></li></ul>
                                                    </article>
                                                </div>
                                                <div style={{margin: 'auto', width: '100%', textAlign: 'center'}}>
                                                    <input ng-show="is_admin" type="submit" className="btn btn-blue" value="Сохранить" ng-disabled="inProgress" ng-className="{'btn-grey': inProgress}" />
                                                </div>
                                            </div>
                                </form>
                            </Visible>
                        </div>
                    </div>
                </div>


                <BottomTags />



            </div>)
    }

}
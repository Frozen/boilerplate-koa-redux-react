

import * as React from 'react';
import Visible from '../../../common/Visible';
import {Provider, connect} from 'react-redux';
import * as actions from '../../../../actions/community';
import * as infs from '../../../../interfaces/interfaces';
import * as constants from '../../../../constants/constants';
//import {reduxForm} from 'redux-form';


interface IProps {

    params: any
    fields: any
    form: any
    dispatch: (v: any) => void
    community: infs.Community
}


@connect(state => state.community)
export default class CommunitySettingsPane extends React.Component<IProps, any> {


    state = {
        // form: {
        //     name: 'aaaa',
        //     rules: '',
        //     description: '',
        //     url: ''
        // }
    };


    componentWillMount() {

    }

    handleSubmit(e) {

        e.preventDefault();

    }

    bind(name) {
        return (e) => {
            var x = {};
            x[name] = e.target.value;
            this.setState(x);
        }
    }

    render() {


        const {params, community} = this.props;
        // const {form} = this.state;

        console.log("settings pane props", this.props);

        return (
            <div className="pane community_albums community-settings">

                <form id="community_settings" className="ng-pristine ng-valid">
                    <div className="userAc page">
                        <p className="info-label">Название</p>
                        <div className="form-row">

                            <input id="id_name" name="name" value={community.name}  onChange={this.bind("name")}/>
                            <div className="text-error ng-binding"></div>
                        </div>
                        <p className="info-label">Описание</p>
                        <div className="form-row form-row2">

                            <textarea cols={40} id="id_description" name="description" rows={10} value={community.description} onChange={this.bind("description")} />
                            <div className="text-error ng-binding"></div>
                        </div>
                        <p className="info-label">Правила</p>
                        <div className="form-row form-row2">

                            <textarea cols={40} id="id_rules" name="rules" rows={10}  value={community.rules} onChange={this.bind("rules")}/>
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
                                            <input id="id_url" maxLength={256} name="url" type="text" value={community.url} onChange={this.bind("url")}/>
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
                        {community.user_group_id == constants.COMMUNITY_GROUP_ADMIN ?
                            <div style={{margin: 'auto', width: '100%', textAlign: 'center'}}>
                                <input type="submit" className="btn btn-blue" value="Сохранить"/>
                            </div>: ''}
                    </div>
                </form>
            </div>
        )
    }

}

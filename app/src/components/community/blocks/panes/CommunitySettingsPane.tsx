

import * as React from 'react';
import Visible from '../../../common/Visible';
import {Provider, connect} from 'react-redux';
import * as actions from '../../../../actions/community';
import * as infs from '../../../../interfaces/interfaces';
import * as constants from '../../../../constants/constants';
import {reduxForm} from 'redux-form';


interface IProps {

    params: any
    fields: any
    form: any
    dispatch: (v: any) => void
    community: infs.Community
}


@reduxForm(
    {
        form: 'initializing',
        fields: ['name', 'description', 'rules', 'site_address',
            'note_only_admin', 'link_only_admin', 'photo_only_admin',
            'poll_only_admin', 'article_only_admin', 'is_closed',
            'accept_comment', 'video_only_admin']
    },
    state => {
        return {
            community: state.community,
            initialValues: state.community.community
        }

    }
)
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

        console.log("CommunitySettingsPane componentWillMount", this.props)

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

    componentDidMount() {
        // const {dispatch} = this.props;
        // dispatch({
        //     type: INIT_SETTINGS_FORM,
        //     data: {
        //         name: "777 name 888"
        //     }
        // })
    }

    render() {


        const {params, community} = this.props;
        const {fields: {name, description, rules, note_only_admin,
            link_only_admin, article_only_admin, photo_only_admin,
            poll_only_admin, is_closed, accept_comment, video_only_admin}} = this.props;
        // const {form} = this.state;

        console.log("settings pane community", this.props.fields.name);

        return (
            <div className="pane community_albums community-settings">

                <form id="community_settings">
                    <div className="userAc page">
                        <p className="info-label">Название</p>
                        <div className="form-row">
                            <input id="id_name" {...name} />
                            <div className="text-error ng-binding"></div>
                        </div>
                        <p className="info-label">Описание</p>
                        <div className="form-row form-row2">

                            <textarea cols={40} id="id_description" rows={10} {...description} />
                            <div className="text-error ng-binding"></div>
                        </div>
                        <p className="info-label">Правила</p>
                        <div className="form-row form-row2">

                            <textarea cols={40} id="id_rules" rows={10} {...rules} />
                            <div className="text-error ng-binding"></div>
                        </div>
                        <article>
                            <div className="info-box">
                                <div className="saved-info">
                                    <div className="info-line">
                                        <p className="info-label">Категория</p>
                                        <p className="info-data">{community.category}</p>
                                    </div>
                                    <div className="info-line">
                                        <p className="info-label">Субкатегория</p>
                                        <p className="info-data">{community.subcategory}</p>
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

                                <ul id="id_note_only_admin">
                                    <li>
                                        <label>
                                            <input type="radio" {...note_only_admin} checked={!note_only_admin.value} value={''} /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...note_only_admin} checked={note_only_admin.value} value={'1'}/> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность ставить ссылки</p>

                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio" {...link_only_admin} checked={!link_only_admin.value}  value="0" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...link_only_admin} checked={link_only_admin.value} value="1" /> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность ставить статьи</p>
                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio" {...article_only_admin} checked={!article_only_admin.value}  value="" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...article_only_admin} checked={article_only_admin.value} value="1" /> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность ставить фотографии</p>
                                <ul id="id_photo_only_admin">
                                    <li>
                                        <label>
                                            <input type="radio" {...photo_only_admin} value="" checked={photo_only_admin.value} /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...photo_only_admin} value="1" checked={photo_only_admin.value} /> Только администраторам
                                        </label>
                                    </li>
                                </ul>

                            </article>
                            <article>
                                <p className="subscr-title">Возможность размещать видео</p>
                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio" {...video_only_admin} checked={!video_only_admin.value} value="" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...video_only_admin} checked={video_only_admin.value} value="1"/> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность ставить опросы</p>
                                <ul id="id_poll_only_admin">
                                    <li>
                                        <label>
                                            <input type="radio" {...poll_only_admin} checked={!poll_only_admin.value} value="" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...poll_only_admin} checked={poll_only_admin.value} value="1" /> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность комментировать</p>
                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio" {...accept_comment} checked={accept_comment.value=='all'} value="all"/> Всем пользователям Гайдпарка
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...accept_comment} checked={accept_comment.value=='members'} value="members"/> Только участникам сообщества
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...accept_comment} checked={accept_comment.value=='admin'} value="admin"/> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Тип сообщества</p>
                                <ul id="id_is_closed">
                                    <li>
                                        <label>
                                            <input type="radio" {...is_closed} checked={!is_closed.value} value=""/> Открытое сообщество
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...is_closed} checked={is_closed.value} value="1" /> Закрытое сообщество
                                        </label>
                                    </li>
                                </ul>
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

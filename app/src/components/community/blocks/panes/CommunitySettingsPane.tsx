

import * as React from 'react';
import * as infs from '../../../../interfaces/interfaces';
import * as constants from '../../../../constants/constants';
import {reduxForm} from 'redux-form';
import * as actions from '../../../../actions/community';


interface IProps {

    params: any
    fields: any
    form: any
    dispatch: (v: any) => void
    community: infs.Community
    handleSubmit: any
}


const submit = function(communityId: number) {

    return function(values, dispatch) {
        $.ajax({
            url: '/rest/community/'+communityId+'/settings',
            type: 'POST',
            data: values
        }).then(function(data) {

            dispatch(actions.fetchCommunity(communityId));

        })
    };

};

function istrue(v: string|boolean) {
    return v.toString() == 'true'
}

function isfalse(v: string|boolean) {
    return v.toString() == 'false'
}


@reduxForm(
    {
        form: 'communitySettingsForm',
        fields: ['name', 'description', 'rules', 'site_address',
            'note_only_admin', 'link_only_admin', 'photo_only_admin',
            'poll_only_admin', 'article_only_admin', 'is_closed',
            'accept_comment', 'video_only_admin']
    },
    state => {
        const community = state.community.community;
        return {
            community: state.community.community,
            initialValues:community
                // Object.assign({}, community, { // :(
                //     note_only_admin: community.note_only_admin.toString(),
                //     link_only_admin: community.link_only_admin.toString(),
                //     photo_only_admin: community.photo_only_admin.toString(),
                //     poll_only_admin: community.poll_only_admin.toString(),
                //     article_only_admin: community.article_only_admin.toString(),
                //     })
        }

    }
)
export default class CommunitySettingsPane extends React.Component<IProps, any> {


    render() {

        const {params, community} = this.props;
        const {fields: {name, description, rules, note_only_admin,
            link_only_admin, article_only_admin, photo_only_admin,
            poll_only_admin, is_closed, accept_comment,
            video_only_admin, site_address}, handleSubmit} = this.props;

        if (typeof note_only_admin.value == 'undefined') {
            return null;
        }


        console.log("settings pane community", note_only_admin);

        return (
            <div className="pane community_albums community-settings">

                <form id="community_settings" onSubmit={handleSubmit(submit(community.id))}>
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
                                            <input {...site_address} />
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
                                            <input type="radio" {...note_only_admin} checked={isfalse(note_only_admin.value)} value={'false'} /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...note_only_admin} checked={istrue(note_only_admin.value)} value={'true'} /> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность ставить ссылки</p>

                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio" {...link_only_admin} checked={isfalse(link_only_admin.value)}  value="false" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...link_only_admin} checked={istrue(link_only_admin.value)} value="true" /> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность ставить статьи</p>
                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio" {...article_only_admin} checked={isfalse(article_only_admin.value)}  value="false" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...article_only_admin} checked={istrue(article_only_admin.value)} value="true" /> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность ставить фотографии</p>
                                <ul id="id_photo_only_admin">
                                    <li>
                                        <label>
                                            <input type="radio" {...photo_only_admin} checked={isfalse(photo_only_admin.value)} value="false" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...photo_only_admin} checked={istrue(photo_only_admin.value)} value="true" /> Только администраторам
                                        </label>
                                    </li>
                                </ul>

                            </article>
                            <article>
                                <p className="subscr-title">Возможность размещать видео</p>
                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio" {...video_only_admin} checked={isfalse(video_only_admin.value)} value="false" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...video_only_admin} checked={istrue(video_only_admin.value)} value="true"/> Только администраторам
                                        </label>
                                    </li>
                                </ul>
                            </article>
                            <article>
                                <p className="subscr-title">Возможность ставить опросы</p>
                                <ul id="id_poll_only_admin">
                                    <li>
                                        <label>
                                            <input type="radio" {...poll_only_admin} checked={isfalse(poll_only_admin.value)} value="false" /> Всем участникам
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...poll_only_admin} checked={istrue(poll_only_admin.value)} value="true" /> Только администраторам
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
                                            <input type="radio" {...is_closed} checked={isfalse(is_closed.value)} value="false"/> Открытое сообщество
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" {...is_closed} checked={istrue(is_closed.value)} value="true" /> Закрытое сообщество
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

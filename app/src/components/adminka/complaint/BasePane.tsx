/**
 * Created by kot on 30.03.16.
 */


import * as React from 'react';
import * as infs from '../../../interfaces/interfaces';
import {connect} from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import {Loader} from "../../../helpers/helpers";
import InfiniteScrolling from '../../common/InfiniteScrolling';


interface IFriendBlock {
    // user: infs.User,
    key: number,
    reload: any
    friend: infs.FriendUserFriend,
    params: any
}

declare const request: any;


export class BasePane extends React.Component<IFriendBlock, any> {

    state = {
        showModal: false
    };

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
                <Complaints />
        )
    };

}


export class Complaints extends React.Component<any, any> {

    state = {
        complaints: [],
        showFilter: false
    };

    loader = null;
    loading = false;

    componentDidMount() {

        this.loader = new Loader('/api/adminka/complaint_book' + window.location.search);
        this.loadMore();
    }

    loadMore() {

        if (this.loading) {
            return ;
        }

        this.loading = true;

        this.loader.next().then(function(data) {

            const complaints = this.state.complaints;

            this.setState({
                complaints: [...complaints, ...data.results]
            });

            this.loading = false;


        }.bind(this))

    }

    updateComplaint(complaintId: number) {
        // console.log("updateComplaint ", complaintId);
        $.ajax({
            url: '/api/adminka/complaint_book',
            type: 'get',
            data: {
                complaint_id: complaintId
            }
        }).then(function(data) {

            if (data.count == 1) {

                const result = data.results[0];

                var complaints = this.state.complaints;

                complaints = complaints.map(function(el, index) {
                    if (el.id == result.id) {
                        return result
                    }
                    return el
                });

                this.setState({
                    complaints: complaints
                })

            }

        }.bind(this))
    }

    hideFilter() {
        this.setState({
            showFilter: false
        })
    }

    showFilter(e: Event) {

        if (e) {
            e.preventDefault();
        }

        this.setState({
            showFilter: true
        })
    }

    submitFilter() {

    }

    render() {

        const complaints = this.state.complaints;


        return (
            <div className="row">

                <a href="" onClick={this.showFilter.bind(this)}>Фильтр</a>&nbsp;&nbsp;&nbsp;
                <a href="?">Сбросить фильтр</a>
                <Modal show={this.state.showFilter} onHide={this.hideFilter.bind(this)}>
                    <form onSubmit={this.submitFilter.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Фильтр</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <div className="form-group">
                                <label htmlFor="ban_reason">Статус</label>&nbsp;
                                <select id="ban_reason" name="status" ref="status" className="form-control">
                                    <option value="">Все</option>
                                    <option value="submitted">Новая</option>
                                    <option value="resolved">Обработанная</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="ban_reason">№ Жалобы</label>&nbsp;
                                <input type="text" name="complaint_id" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ban_reason">№ Комментария</label>&nbsp;
                                <input type="text" name="comment_id" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ban_reason">№ Автора комментария</label>&nbsp;
                                <input type="text" name="comment_user_id" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ban_reason">№ Автора жалобы</label>&nbsp;
                                <input type="text" name="complaint_user_id" className="form-control" />
                            </div>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.hideFilter.bind(this)}>Закрыть</Button>
                            <input type="submit" className="btn btn-primary" />
                        </Modal.Footer>
                    </form>
                </Modal>



                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>id <br />Статус</th>
                                <th>Дата и время</th>
                                <th>Автор жалобы</th>
                                <th>Жалоба</th>
                                <th>Правка комментария</th>
                                <th>Автор комментария</th>
                            </tr>
                        </thead>
                        <tbody>
                        {complaints.map(function(complaint, index) {

                            return <Complaint complaint={complaint} key={index} updateComplaint={this.updateComplaint.bind(this)} />
                            }.bind(this))
                        }

                        </tbody>
                    </table>
                </div>
                <InfiniteScrolling infiniteLoadMore={this.loadMore.bind(this)}
                                   isActive={() => true}
                                   pause={() => false}/>
            </div>
        )
    }
}


interface IComplaint {
    complaint: any,
    key: number
    updateComplaint: any
}


export class Complaint extends React.Component<IComplaint, any> {

    state = {
        showEdit: false,
        showReplyForm: false,
        showCommentDeleteForm: false,
        complaint_full_text: false,
        comment_full_text: false,
        showBanCommentator: false,
        showBanComplaintAuthor: false,
    };


    showEdit(e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            showEdit: true
        });
    }

    hideEdit() {
        this.setState({
            showEdit: false
        });
    }

    showReplyForm(e: Event) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            showReplyForm: true
        })
    }

    hideReplyForm() {
        this.setState({
            showReplyForm: false
        })
    }

    showCommentDeleteForm(e: Event) {
        if(e) {
            e.preventDefault();
        }
        this.setState({
            showCommentDeleteForm: true
        });
    }

    hideCommentDeleteForm() {
        this.setState({
            showCommentDeleteForm: false
        });

        this.props.updateComplaint(this.props.complaint.id);
    }


    refs: {
        [string: string]: any;
        comment_edit_textarea: HTMLInputElement;
        complaint_reply_textarea: HTMLInputElement;
    };

    submitCommentEditForm(e: Event) {

        if (e) {
            e.preventDefault();
        }

        const value = this.refs.comment_edit_textarea.value;

        $.ajax({
            url: '/api/adminka/edit_comment',
            type: 'post',
            data: {
                comment_id: this.props.complaint.comment.id,
                text: value
            }
        }).then(function() {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this));

        this.hideEdit();

    }

    submitReplyForm(e: Event) {
        const message = this.refs.complaint_reply_textarea.value;

        if (e) {
            e.preventDefault();
        }

        $.ajax({
            url: '/api/adminka/complaint_book/reply_to_complaint',
            type: 'post',
            data: {
                complaint_id: this.props.complaint.id,
                message: message
            }
        }).then(function() {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this));

        this.setState({
            showReplyForm: false
        })
    }



    punish(value: number, e: Event) {
        e.preventDefault();
        // console.log(value, e);

        $.ajax({
            url: '/api/adminka/complaint_book/complaint_action',
            type: 'post',
            data: {
                complaint_id: this.props.complaint.id,
                reduce_rating_value: value
            }
        }).then(function() {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this))
    }



    setInterestingComment(e: Event) {
        if (e) {
            e.preventDefault();
        }

        const data = {
            comment_id: this.props.complaint.comment.id
        };

        // console.log("data", data);

        $.ajax({
            url: '/api/adminka/set_interesting_comment',
            type: 'post',
            data: data
        }).then(function() {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this))
    }

    setResolved(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/adminka/complaint_book/complaint_resolve',
            type: 'post',
            data: {
                complaint_id: this.props.complaint.id
            }
        }).then(function() {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this))
    }

    removeInterestingComment(e: Event) {

        if (e) {
            e.preventDefault();
        }

        const data = {
            comment_id: this.props.complaint.comment.id
        };

        $.ajax({
            url: '/api/adminka/remove_mark_interesting',
            type: 'post',
            data: data
        }).then(function() {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this))
    }


    render() {

        const {complaint} = this.props;

        return (
            <tr>
                <td>
                    <span>{ complaint.id }</span>
                    <br />
                    <span className={ complaint.status_value == 'submitted' ? 'red-text' : 'green-text' } >{ complaint.status }</span>
                </td>

                <td>
                    { complaint.time_create }
                </td>

                <td>
                    <table className="table table-inner">
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{ complaint.user.id }</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{ complaint.user.email }</td>
                            </tr>
                            <tr>
                                <td>ФИО</td>
                                <td><a href={ complaint.user.url } target="_blank">{ complaint.user.fio_or_username_or_id }</a></td>
                            </tr>
                            <tr>
                                <td>Статус</td>
                                <td>
                                    <span>{ complaint.user.status }</span>
                                    <BanUserModal show={this.state.showBanComplaintAuthor} onHide={function() { this.setState({showBanComplaintAuthor: false});  }.bind(this)} userId={complaint.user.id} updateComplaint={this.props.updateComplaint.bind(this, this.props.complaint.id)}/>

                                </td>
                            </tr>

                        </tbody>
                    </table>
                </td>
                <td>
                    <table className="table table-inner">
                        <tbody>
                            <tr>
                                <td>Контент</td>
                                <td><a href={ complaint.comment.content.url } target="blank">{ complaint.comment.content.title }</a></td>
                            </tr>
                            <tr>
                                <td>Причина</td>
                                <td>{ complaint.reason }</td>
                            </tr>
                            <tr>
                                <td>Текст жалобы</td>
                                <td>
                                    {this.state.complaint_full_text ?
                                        <span id="complaint-full{{ complaint.id }}">{ complaint.full_text }</span>:
                                        <span id="complaint-preview{{ complaint.id }}">{ complaint.preview_text }</span>
                                    }
                                    <br />
                                    <br />
                                    {complaint.need_full_text ? <a className="status-text blue-text"
                                                                   onClick={function(e) {e.preventDefault(); this.setState({complaint_full_text: !this.state.complaint_full_text})}.bind(this)  }>{this.state.complaint_full_text ? 'свернуть':  'показать полностью'}</a>: ''}
                                </td>
                            </tr>
                            <tr>
                                <td>Текст комментария</td>
                                <td id="comment-row-{{ complaint.id }}">
                                    {this.state.comment_full_text?
                                        <span id="comment-full{{ complaint.id }}">{ complaint.comment.full_text }</span>:
                                        <span id="comment-preview{{ complaint.id }}">{ complaint.comment.preview_text }</span>
                                    }
                                    <br />
                                    <br />
                                    {complaint.comment.need_full_text ? <a className="status-text blue-text" onClick={function(e) {e.preventDefault(); this.setState({comment_full_text: !this.state.comment_full_text})}.bind(this)  }>{this.state.comment_full_text ? 'свернуть' : 'показать полностью'}</a>: '' }
                                </td>
                            </tr>
                            <tr>
                                <td>Ссылка на комментарий</td>
                                <td><a href={ complaint.comment.url } target="_blank">перейти</a></td>
                            </tr>

                            {complaint.answer ?
                            <tr>
                                <td className="green-text" onClick={this.showReplyForm.bind(this)}>Ответ автору жалобы</td>
                                <td>{ complaint.answer }</td>
                            </tr>
                                :
                            <tr>
                                <td>
                                    <a className="status-text blue-text" href="" onClick={this.showReplyForm.bind(this)}>ответить автору жалобы</a>
                                    <Modal show={this.state.showReplyForm} onHide={this.hideReplyForm.bind(this)}>
                                        <form onSubmit={this.submitReplyForm.bind(this)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Ответ автору сообщения</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <label className="fa">Введите текст сообщения</label>
                                                <textarea ref="complaint_reply_textarea" className="form-control" defaultValue='' cols={60} rows={10} />
                                            </Modal.Body>

                                            <Modal.Footer>
                                                <Button onClick={this.hideReplyForm.bind(this)}>Закрыть</Button>
                                                <input type="submit" className="btn btn-primary" />
                                            </Modal.Footer>
                                        </form>
                                    </Modal>

                                </td>
                                <td></td>

                            </tr>

                                }
                        </tbody>
                    </table>
                </td>
                <td>

                    <Modal show={this.state.showEdit} onHide={this.hideEdit.bind(this)}>
                        <form onSubmit={this.submitCommentEditForm.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Редактировать</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <label className="fa">Текст комментария</label>
                                <textarea ref="comment_edit_textarea" className="form-control" defaultValue={complaint.comment.full_text} cols={60} rows={10} />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.hideEdit.bind(this)}>Закрыть</Button>
                                <input type="submit" className="btn btn-primary" />
                            </Modal.Footer>
                        </form>
                    </Modal>

                    { !complaint.comment.is_deleted ?
                    <span>
                        <a href="" className="status-text blue-text" onClick={this.showEdit.bind(this)}>Редактировать</a>
                        <br />
                        <br />
                        <a href="#delete-comment-modal" className="status-text blue-text" onClick={this.showCommentDeleteForm.bind(this)}>Удалить</a>

                        <CommentDeleteModal
                                            show={this.state.showCommentDeleteForm}
                                            onHide={this.hideCommentDeleteForm.bind(this)}
                                            complaint={complaint}

                                            />

                        <br />
                        <br />
                        {complaint.comment.interesting ?

                            <a href="" className="status-text" style={{color: 'green'}} onClick={this.removeInterestingComment.bind(this)}>
                                Интересный
                            </a>
                        :
                            <a href="" className="status-text blue-text" onClick={this.setInterestingComment.bind(this)}>
                                Отметить интересным
                            </a>
                        }

                        <br />
                        <br />
                        <a href="" className="status-text blue-text" onClick={this.setResolved.bind(this)}>
                            Отметить обработанным
                        </a>



                    </span>

                    : <span>Комментарий удален</span> }
                </td>
                <td>
                    <table className="table table-inner">
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{ complaint.commentator.id }</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{ complaint.commentator.email }</td>
                            </tr>
                            <tr>
                                <td>ФИО</td>
                                <td>
                                    <a href={ complaint.commentator.url } target="_blank">{ complaint.commentator.fio_or_username_or_id }</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Статус</td>
                                <td>
                                    <span>
                                        { complaint.commentator.status }
                                    </span>

                                    <BanUserModal show={this.state.showBanCommentator} onHide={function() { this.setState({showBanCommentator: false});  }.bind(this)} userId={complaint.commentator.id} updateComplaint={this.props.updateComplaint.bind(this, this.props.complaint.id)}/>
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>

                                    <UserDeleteModal userId={complaint.commentator.id} />

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        )

    }
}


interface IBanUserModal {
    show: boolean
    onHide: any
    // complaint: any
    userId: number
    updateComplaint: any
}


class BanUserModal extends React.Component<IBanUserModal, any> {

    beforeEnter() {
        console.log("begore enter");

        $.ajax({
            url: '/api/adminka/user/' + this.props.userId + '/bans',
            type: 'get'
        }).then(function(data) {

            this.setState({
                bans: data
            });

        }.bind(this))
    }

    state = {
        bans: [],
        ban_reason: 'Мат',
        reason_explain: ''
    };


    refs: {
        [string: string]: any;
        ban_time: HTMLInputElement;
        ban_reason: HTMLInputElement;
        reason_explain: HTMLInputElement;
    };

    submitForm(e: Event) {

        e.preventDefault();

        const ban_time = this.refs.ban_time.value;
        const ban_reason = this.refs.ban_reason.value;
        const user = this.props.userId;
        const reason_explain = this.refs.reason_explain.value;

        const data = {
            reason: ban_reason,
            minutes: ban_time,
            user_id: user
        };

        if (data.reason === 'Другое') {
            data['reason_explain'] = reason_explain;
        }

        $.ajax({
            url: '/api/adminka/ban_user',
            type: 'post',
            data: data
        }).then(function(response) {
            this.props.updateComplaint();
        }.bind(this));

        this.props.onHide();

    }

    render() {

        const {show, onHide} = this.props;

        return (
            <Modal show={show} onHide={onHide} onEnter={this.beforeEnter.bind(this)}>
                <form onSubmit={this.submitForm.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Забанить пользователя</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <BanRows bans={this.state.bans}/>

                        <div className="form-group">
                            <label htmlFor="ban_time">Выберите Срок</label>&nbsp;
                            <select id="ban_time" name="ban_time" ref="ban_time" className="form-control">

                                <option value="30">30 минут</option>
                                <option value="45">45 минут</option>
                                <option value="60">1 час</option>
                                <option value="180">3 часа</option>
                                <option value="360">6 часов</option>
                                <option value="720">12 часов</option>
                                <option value="1440">1 день</option>
                                <option value="4320">3 дня</option>
                                <option value="10080">1 неделя</option>
                                <option value="43200">1 месяц</option>
                                <option value="525600">1 год</option>
                                <option value="144720000">перманентно</option>
                            </select>
                        </div>
                        &nbsp;&nbsp;

                        <div className="form-group">
                            <label htmlFor="ban_reason">Выберите причину</label>&nbsp;
                            <select id="ban_reason"
                                    name="ban_reason"
                                    ref="ban_reason"
                                    className="form-control"
                                    onChange={function(e) { this.setState({ban_reason: e.target.value})}.bind(this)}
                                    defaultValue={this.state.ban_reason}>

                                <option value="Мат">Мат</option>
                                <option value="Оскорбление">Оскорбление</option>
                                <option value="Разжигание">Разжигание</option>
                                <option value="Спам">Спам</option>
                                <option value="Флуд">Флуд</option>
                                <option value="Другое">Другое</option>
                                <option value="Клон">Клон</option>
                            </select>
                        </div>

                        <div className="form-group" style={{display: this.state.ban_reason == 'Другое' ? 'block' : 'none'}}>
                            <label htmlFor="ban_reason">Укажите причину</label>&nbsp;
                            <textarea name="reason_explain" ref="reason_explain" className="form-control" onChange={function(e) {this.setState({reason_explain: e.target.value})}.bind(this)}></textarea>
                        </div>


                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={onHide}>Закрыть</Button>
                        <input type="submit" className="btn btn-primary" disabled={this.state.ban_reason == 'Другое' && this.state.reason_explain == ''}/>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

interface IBan {
    id: number,
    is_active: boolean,
    time_start: string,
    time_finish: string,
    reason: string
}

interface IBanRows {
    bans: Array<IBan>
}



class BanRows extends React.Component<IBanRows, any> {


    render() {

        const bans = this.props.bans;

        if (!bans) {
            return null;
        }

        return (
            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Начало</th>
                        <th>Конец</th>
                        <th>Причина</th>
                        <th>Статус</th>
                    </tr>
                </thead>


                <tbody>
                {bans.map(function(ban: IBan, key: number) {
                    return (
                        <tr key={key}>
                            <td>{ban.id}</td>
                            <td>{ban.time_start}</td>
                            <td>{ban.time_finish}</td>
                            <td>{ban.reason}</td>
                            <td>{ban.is_active ? 'активный': 'неактивный'}</td>
                        </tr>)
                }.bind(this))}
                </tbody>
            </table>)
    }

}


interface ICommentDeleteModal {
    show: boolean
    onHide: any
    complaint: any
}


class CommentDeleteModal extends React.Component<ICommentDeleteModal, any> {


    beforeEnter() {
        console.log("CommentDeleteModal begore enter");

        $.ajax({
            url: '/api/adminka/user/' + this.props.complaint.commentator.id + '/bans',
            type: 'get'
        }).then(function(data) {

            this.setState({
                bans: data
            });

        }.bind(this))
    }

    state = {
        bans: [],
        ban_reason: '',
        reason_explain: '',
        reduce_rating_value: 0,
        action: 'ban',
        ban_user_checkbox: false,
        delete_comment_reason: '',

        reasons_list: [
            'спам',
            'флуд',
            'оскорбления',
            'капс',
            'транслит',
            'оффтопик',
            'разжигание',
            'мат',
            'олбанец',
            'накрутка',
            'реклама'
        ]
    };


    removeComment(e: Event) {

        if (e) {
            e.preventDefault();
        }

        var data = {
            reduce_rating_value: this.state.reduce_rating_value,
            complaint_id: this.props.complaint.id,
            ban: this.state.ban_user_checkbox,
            ban_reason: this.refs.ban_reason.value,
            ban_duration: this.refs.ban_duration.value,
            delete_comment_reason: this.refs.delete_comment_reason.value
        };

        if (this.state.reason_explain) {
            data['ban_reason_explain'] = this.state.reason_explain
        }

        $.ajax({
            url: '/api/adminka/complaint_book/complaint_action',
            type: 'post',
            data: data
        }).then(function() {
            this.props.onHide();
        }.bind(this));

    }

    clickReason(el, key, e) {
        e.preventDefault();
        var a = {};
        a[el] = this.state[el] + key + "\n";
        this.setState(a);
    }

    refs: {
        [string: string]: any;
        ban_reason: HTMLInputElement;
        ban_duration: HTMLInputElement;
        reason_explain: HTMLInputElement;
        delete_comment_reason: HTMLInputElement;
    };

    render() {

        const {show, onHide} = this.props;

        return (
            <Modal show={show} onHide={onHide} onEnter={this.beforeEnter.bind(this)}>
                <form>
                    <Modal.Header closeButton>
                        <Modal.Title>Удалить комментарий</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <BanRows bans={this.state.bans}/>

                        <div className="form-group">
                            <label htmlFor="ban_reason">Снять рейтинг</label>
                            <br />
                            <span className={this.state.reduce_rating_value == 0 ? 'btn btn-primary' : 'btn btn-default'} onClick={function() {this.setState({reduce_rating_value: 0})}.bind(this)}>0</span>&nbsp;
                            <span className={this.state.reduce_rating_value == 10 ? 'btn btn-primary' : 'btn btn-default'} onClick={function() {this.setState({reduce_rating_value: 10})}.bind(this)}>10</span>&nbsp;
                            <span className={this.state.reduce_rating_value == 20 ? 'btn btn-primary' : 'btn btn-default'} onClick={function() {this.setState({reduce_rating_value: 20})}.bind(this)}>20</span>&nbsp;
                            <span className={this.state.reduce_rating_value == 30 ? 'btn btn-primary' : 'btn btn-default'} onClick={function() {this.setState({reduce_rating_value: 30})}.bind(this)}>30</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="delete_comment_reason">Причина удаления</label>&nbsp;
                            <textarea type="text"
                                    name="delete_comment_reason"
                                    id="delete_comment_reason"
                                    ref="delete_comment_reason"
                                    className="form-control"
                                      style={{height: '100px'}}
                                      value={this.state.delete_comment_reason}
                                    onChange={function(e) {this.setState({delete_comment_reason: e.target.value})}.bind(this)}>
                            </textarea>
                        </div>
                        <div>

                            {this.state.reasons_list.map(function(key, index) {

                                return <span key={index}>
                                    <a href="" onClick={this.clickReason.bind(this, 'delete_comment_reason', key)}>{key}</a> |&nbsp;
                                </span>

                            }.bind(this))}

                        </div>
                        <br />


                        <fieldset disabled={!this.state.ban_user_checkbox}>
                            <legend>
                                <label>
                                    <input type="checkbox" checked={this.state.ban_user_checkbox} onChange={function() {this.setState({ban_user_checkbox: !this.state.ban_user_checkbox})}.bind(this)} /> Забанить пользователя
                                </label>
                            </legend>
                            <div className="form-group">
                                <label htmlFor="ban_time">Выберите Срок</label>&nbsp;
                                <select id="ban_time" name="ban_duration" ref="ban_duration" className="form-control">

                                    <option value="30">30 минут</option>
                                    <option value="45">45 минут</option>
                                    <option value="60">1 час</option>
                                    <option value="180">3 часа</option>
                                    <option value="360">6 часов</option>
                                    <option value="720">12 часов</option>
                                    <option value="1440">1 день</option>
                                    <option value="4320">3 дня</option>
                                    <option value="10080">1 неделя</option>
                                    <option value="43200">1 месяц</option>
                                    <option value="525600">1 год</option>
                                    <option value="144720000">перманентно</option>
                                </select>
                            </div>
                            &nbsp;&nbsp;

                            <div className="form-group">
                                <label htmlFor="ban_reason">Выберите причину</label>&nbsp;
                                <textarea id="ban_reason" name="ban_reason"
                                          ref="ban_reason" className="form-control"
                                          onChange={function(e) { this.setState({ban_reason: e.target.value})}.bind(this)}
                                          defaultValue={this.state.ban_reason}
                                          value={this.state.ban_reason}
                                          style={{height: '100px'}}>
                                </textarea>
                            </div>

                            <div>

                                {this.state.reasons_list.map(function(key, index) {

                                    return <span key={index}>
                                    <a href="" onClick={this.clickReason.bind(this, 'ban_reason', key)}>{key}</a> |&nbsp;
                                </span>

                                    }.bind(this))}

                            </div>

                        </fieldset>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={onHide}>Отмена</Button>
                        <Button className="btn btn-primary" disabled={!this.state.delete_comment_reason} onClick={this.removeComment.bind(this)}>{this.state.ban_user_checkbox ? 'Забанить и удалить': 'Удалить коммент'}</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

interface IUserDeleteModal {
    userId: number
}

class UserDeleteModal extends React.Component<IUserDeleteModal, any> {


    state = {
        show: false,
        delete_reason: '',
        // reasons_list: [
        //     'спам',
        //     'флуд',
        //     'оскорбления',
        //     'капс',
        //     'транслит',
        //     'оффтопик',
        //     'разжигание',
        //     'мат',
        //     'олбанец',
        //     'накрутка',
        //     'реклама'
        // ]
    };

    onHide() {
        this.setState({
            show: false
        })
    }

    show() {
        this.setState({
            show: true
        });
    }

    deleteUser() {
        $.ajax({
            url: '/api/adminka/delete_user',
            type: 'post',
            data: {
                user_id: this.props.userId
            }
        }).then(function() {
            this.props.onHide();
        }.bind(this))
    }

    render() {
        return (
            <span>
                <span className="status-text" onClick={this.show.bind(this)}>Удалить</span>
                <Modal show={this.state.show} onHide={this.onHide.bind(this)}>
                    <form>
                        <Modal.Header closeButton>
                            <Modal.Title>Удалить Пользователя</Modal.Title>
                        </Modal.Header>

                        <Modal.Footer>
                            <Button onClick={this.onHide.bind(this)}>Отмена</Button>
                            <Button className="btn btn-primary" onClick={this.deleteUser.bind(this)}>Удалить</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </span>
        )
    }


}
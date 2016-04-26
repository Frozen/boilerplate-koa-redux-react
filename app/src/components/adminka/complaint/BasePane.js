/**
 * Created by kot on 30.03.16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var helpers_1 = require("../../../helpers/helpers");
var InfiniteScrolling_1 = require('../../common/InfiniteScrolling');
var BasePane = (function (_super) {
    __extends(BasePane, _super);
    function BasePane() {
        _super.apply(this, arguments);
        this.state = {
            showModal: false
        };
    }
    BasePane.prototype.closeModal = function () {
        this.setState({
            showModal: false
        });
    };
    BasePane.prototype.render = function () {
        return (React.createElement(Complaints, null));
    };
    ;
    return BasePane;
})(React.Component);
exports.BasePane = BasePane;
var Complaints = (function (_super) {
    __extends(Complaints, _super);
    function Complaints() {
        _super.apply(this, arguments);
        this.state = {
            complaints: [],
            showFilter: false
        };
        this.loader = null;
        this.loading = false;
    }
    Complaints.prototype.componentDidMount = function () {
        this.loader = new helpers_1.Loader('/api/adminka/complaint_book' + window.location.search);
        this.loadMore();
    };
    Complaints.prototype.loadMore = function () {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.loader.next().then(function (data) {
            var complaints = this.state.complaints;
            this.setState({
                complaints: complaints.concat(data.results)
            });
            this.loading = false;
        }.bind(this));
    };
    Complaints.prototype.updateComplaint = function (complaintId) {
        // console.log("updateComplaint ", complaintId);
        $.ajax({
            url: '/api/adminka/complaint_book',
            type: 'get',
            data: {
                complaint_id: complaintId
            }
        }).then(function (data) {
            if (data.count == 1) {
                var result = data.results[0];
                var complaints = this.state.complaints;
                complaints = complaints.map(function (el, index) {
                    if (el.id == result.id) {
                        return result;
                    }
                    return el;
                });
                this.setState({
                    complaints: complaints
                });
            }
        }.bind(this));
    };
    Complaints.prototype.hideFilter = function () {
        this.setState({
            showFilter: false
        });
    };
    Complaints.prototype.showFilter = function (e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            showFilter: true
        });
    };
    Complaints.prototype.submitFilter = function () {
    };
    Complaints.prototype.render = function () {
        var complaints = this.state.complaints;
        return (React.createElement("div", {"className": "row"}, React.createElement("a", {"href": "", "onClick": this.showFilter.bind(this)}, "Фильтр"), "   ", React.createElement("a", {"href": "?"}, "Сбросить фильтр"), React.createElement(react_bootstrap_1.Modal, {"show": this.state.showFilter, "onHide": this.hideFilter.bind(this)}, React.createElement("form", {"onSubmit": this.submitFilter.bind(this)}, React.createElement(react_bootstrap_1.Modal.Header, {"closeButton": true}, React.createElement(react_bootstrap_1.Modal.Title, null, "Фильтр")), React.createElement(react_bootstrap_1.Modal.Body, null, React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_reason"}, "Статус"), " ", React.createElement("select", {"id": "ban_reason", "name": "status", "ref": "status", "className": "form-control"}, React.createElement("option", {"value": ""}, "Все"), React.createElement("option", {"value": "submitted"}, "Новая"), React.createElement("option", {"value": "resolved"}, "Обработанная"))), React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_reason"}, "№ Жалобы"), " ", React.createElement("input", {"type": "text", "name": "complaint_id", "className": "form-control"})), React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_reason"}, "№ Комментария"), " ", React.createElement("input", {"type": "text", "name": "comment_id", "className": "form-control"})), React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_reason"}, "№ Автора комментария"), " ", React.createElement("input", {"type": "text", "name": "comment_user_id", "className": "form-control"})), React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_reason"}, "№ Автора жалобы"), " ", React.createElement("input", {"type": "text", "name": "complaint_user_id", "className": "form-control"}))), React.createElement(react_bootstrap_1.Modal.Footer, null, React.createElement(react_bootstrap_1.Button, {"onClick": this.hideFilter.bind(this)}, "Закрыть"), React.createElement("input", {"type": "submit", "className": "btn btn-primary"})))), React.createElement("div", {"className": "table-responsive"}, React.createElement("table", {"className": "table table-bordered table-hover"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "id ", React.createElement("br", null), "Статус"), React.createElement("th", null, "Дата и время"), React.createElement("th", null, "Автор жалобы"), React.createElement("th", null, "Жалоба"), React.createElement("th", null, "Правка комментария"), React.createElement("th", null, "Автор комментария"))), React.createElement("tbody", null, complaints.map(function (complaint, index) {
            return React.createElement(Complaint, {"complaint": complaint, "key": index, "updateComplaint": this.updateComplaint.bind(this)});
        }.bind(this))))), React.createElement(InfiniteScrolling_1.default, {"infiniteLoadMore": this.loadMore.bind(this), "isActive": function () { return true; }, "pause": function () { return false; }})));
    };
    return Complaints;
})(React.Component);
exports.Complaints = Complaints;
var Complaint = (function (_super) {
    __extends(Complaint, _super);
    function Complaint() {
        _super.apply(this, arguments);
        this.state = {
            showEdit: false,
            showReplyForm: false,
            showCommentDeleteForm: false,
            complaint_full_text: false,
            comment_full_text: false,
            showBanCommentator: false,
            showBanComplaintAuthor: false,
        };
    }
    Complaint.prototype.showEdit = function (e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            showEdit: true
        });
    };
    Complaint.prototype.hideEdit = function () {
        this.setState({
            showEdit: false
        });
    };
    Complaint.prototype.showReplyForm = function (e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            showReplyForm: true
        });
    };
    Complaint.prototype.hideReplyForm = function () {
        this.setState({
            showReplyForm: false
        });
    };
    Complaint.prototype.showCommentDeleteForm = function (e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            showCommentDeleteForm: true
        });
    };
    Complaint.prototype.hideCommentDeleteForm = function () {
        this.setState({
            showCommentDeleteForm: false
        });
        this.props.updateComplaint(this.props.complaint.id);
    };
    Complaint.prototype.submitCommentEditForm = function (e) {
        if (e) {
            e.preventDefault();
        }
        var value = this.refs.comment_edit_textarea.value;
        $.ajax({
            url: '/api/adminka/edit_comment',
            type: 'post',
            data: {
                comment_id: this.props.complaint.comment.id,
                text: value
            }
        }).then(function () {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this));
        this.hideEdit();
    };
    Complaint.prototype.submitReplyForm = function (e) {
        var message = this.refs.complaint_reply_textarea.value;
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
        }).then(function () {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this));
        this.setState({
            showReplyForm: false
        });
    };
    Complaint.prototype.punish = function (value, e) {
        e.preventDefault();
        // console.log(value, e);
        $.ajax({
            url: '/api/adminka/complaint_book/complaint_action',
            type: 'post',
            data: {
                complaint_id: this.props.complaint.id,
                reduce_rating_value: value
            }
        }).then(function () {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this));
    };
    Complaint.prototype.setInterestingComment = function (e) {
        if (e) {
            e.preventDefault();
        }
        var data = {
            comment_id: this.props.complaint.comment.id
        };
        // console.log("data", data);
        $.ajax({
            url: '/api/adminka/set_interesting_comment',
            type: 'post',
            data: data
        }).then(function () {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this));
    };
    Complaint.prototype.setResolved = function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/adminka/complaint_book/complaint_resolve',
            type: 'post',
            data: {
                complaint_id: this.props.complaint.id
            }
        }).then(function () {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this));
    };
    Complaint.prototype.removeInterestingComment = function (e) {
        if (e) {
            e.preventDefault();
        }
        var data = {
            comment_id: this.props.complaint.comment.id
        };
        $.ajax({
            url: '/api/adminka/remove_mark_interesting',
            type: 'post',
            data: data
        }).then(function () {
            this.props.updateComplaint(this.props.complaint.id);
        }.bind(this));
    };
    Complaint.prototype.render = function () {
        var complaint = this.props.complaint;
        return (React.createElement("tr", null, React.createElement("td", null, React.createElement("span", null, complaint.id), React.createElement("br", null), React.createElement("span", {"className": complaint.status_value == 'submitted' ? 'red-text' : 'green-text'}, complaint.status)), React.createElement("td", null, complaint.time_create), React.createElement("td", null, React.createElement("table", {"className": "table table-inner"}, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, "ID"), React.createElement("td", null, complaint.user.id)), React.createElement("tr", null, React.createElement("td", null, "Email"), React.createElement("td", null, complaint.user.email)), React.createElement("tr", null, React.createElement("td", null, "ФИО"), React.createElement("td", null, React.createElement("a", {"href": complaint.user.url, "target": "_blank"}, complaint.user.fio_or_username_or_id))), React.createElement("tr", null, React.createElement("td", null, "Статус"), React.createElement("td", null, React.createElement("span", null, complaint.user.status), React.createElement(BanUserModal, {"show": this.state.showBanComplaintAuthor, "onHide": function () { this.setState({ showBanComplaintAuthor: false }); }.bind(this), "userId": complaint.user.id, "updateComplaint": this.props.updateComplaint.bind(this, this.props.complaint.id)})))))), React.createElement("td", null, React.createElement("table", {"className": "table table-inner"}, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, "Контент"), React.createElement("td", null, React.createElement("a", {"href": complaint.comment.content.url, "target": "blank"}, complaint.comment.content.title))), React.createElement("tr", null, React.createElement("td", null, "Причина"), React.createElement("td", null, complaint.reason)), React.createElement("tr", null, React.createElement("td", null, "Текст жалобы"), React.createElement("td", null, this.state.complaint_full_text ?
            React.createElement("span", {"id": "complaint-full{{ complaint.id }}"}, complaint.full_text) :
            React.createElement("span", {"id": "complaint-preview{{ complaint.id }}"}, complaint.preview_text), React.createElement("br", null), React.createElement("br", null), complaint.need_full_text ? React.createElement("a", {"className": "status-text blue-text", "onClick": function (e) { e.preventDefault(); this.setState({ complaint_full_text: !this.state.complaint_full_text }); }.bind(this)}, this.state.complaint_full_text ? 'свернуть' : 'показать полностью') : '')), React.createElement("tr", null, React.createElement("td", null, "Текст комментария"), React.createElement("td", {"id": "comment-row-{{ complaint.id }}"}, this.state.comment_full_text ?
            React.createElement("span", {"id": "comment-full{{ complaint.id }}"}, complaint.comment.full_text) :
            React.createElement("span", {"id": "comment-preview{{ complaint.id }}"}, complaint.comment.preview_text), React.createElement("br", null), React.createElement("br", null), complaint.comment.need_full_text ? React.createElement("a", {"className": "status-text blue-text", "onClick": function (e) { e.preventDefault(); this.setState({ comment_full_text: !this.state.comment_full_text }); }.bind(this)}, this.state.comment_full_text ? 'свернуть' : 'показать полностью') : '')), React.createElement("tr", null, React.createElement("td", null, "Ссылка на комментарий"), React.createElement("td", null, React.createElement("a", {"href": complaint.comment.url, "target": "_blank"}, "перейти"))), complaint.answer ?
            React.createElement("tr", null, React.createElement("td", {"className": "green-text", "onClick": this.showReplyForm.bind(this)}, "Ответ автору жалобы"), React.createElement("td", null, complaint.answer))
            :
                React.createElement("tr", null, React.createElement("td", null, React.createElement("a", {"className": "status-text blue-text", "href": "", "onClick": this.showReplyForm.bind(this)}, "ответить автору жалобы"), React.createElement(react_bootstrap_1.Modal, {"show": this.state.showReplyForm, "onHide": this.hideReplyForm.bind(this)}, React.createElement("form", {"onSubmit": this.submitReplyForm.bind(this)}, React.createElement(react_bootstrap_1.Modal.Header, {"closeButton": true}, React.createElement(react_bootstrap_1.Modal.Title, null, "Ответ автору сообщения")), React.createElement(react_bootstrap_1.Modal.Body, null, React.createElement("label", {"className": "fa"}, "Введите текст сообщения"), React.createElement("textarea", {"ref": "complaint_reply_textarea", "className": "form-control", "defaultValue": '', "cols": 60, "rows": 10})), React.createElement(react_bootstrap_1.Modal.Footer, null, React.createElement(react_bootstrap_1.Button, {"onClick": this.hideReplyForm.bind(this)}, "Закрыть"), React.createElement("input", {"type": "submit", "className": "btn btn-primary"}))))), React.createElement("td", null))))), React.createElement("td", null, React.createElement(react_bootstrap_1.Modal, {"show": this.state.showEdit, "onHide": this.hideEdit.bind(this)}, React.createElement("form", {"onSubmit": this.submitCommentEditForm.bind(this)}, React.createElement(react_bootstrap_1.Modal.Header, {"closeButton": true}, React.createElement(react_bootstrap_1.Modal.Title, null, "Редактировать")), React.createElement(react_bootstrap_1.Modal.Body, null, React.createElement("label", {"className": "fa"}, "Текст комментария"), React.createElement("textarea", {"ref": "comment_edit_textarea", "className": "form-control", "defaultValue": complaint.comment.full_text, "cols": 60, "rows": 10})), React.createElement(react_bootstrap_1.Modal.Footer, null, React.createElement(react_bootstrap_1.Button, {"onClick": this.hideEdit.bind(this)}, "Закрыть"), React.createElement("input", {"type": "submit", "className": "btn btn-primary"})))), !complaint.comment.is_deleted ?
            React.createElement("span", null, React.createElement("a", {"href": "", "className": "status-text blue-text", "onClick": this.showEdit.bind(this)}, "Редактировать"), React.createElement("br", null), React.createElement("br", null), React.createElement("a", {"href": "#delete-comment-modal", "className": "status-text blue-text", "onClick": this.showCommentDeleteForm.bind(this)}, "Удалить"), React.createElement(CommentDeleteModal, {"show": this.state.showCommentDeleteForm, "onHide": this.hideCommentDeleteForm.bind(this), "complaint": complaint}), React.createElement("br", null), React.createElement("br", null), complaint.comment.interesting ?
                React.createElement("a", {"href": "", "className": "status-text", "style": { color: 'green' }, "onClick": this.removeInterestingComment.bind(this)}, "Интересный")
                :
                    React.createElement("a", {"href": "", "className": "status-text blue-text", "onClick": this.setInterestingComment.bind(this)}, "Отметить интересным"), React.createElement("br", null), React.createElement("br", null), React.createElement("a", {"href": "", "className": "status-text blue-text", "onClick": this.setResolved.bind(this)}, "Отметить обработанным"))
            : React.createElement("span", null, "Комментарий удален")), React.createElement("td", null, React.createElement("table", {"className": "table table-inner"}, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, "ID"), React.createElement("td", null, complaint.commentator.id)), React.createElement("tr", null, React.createElement("td", null, "Email"), React.createElement("td", null, complaint.commentator.email)), React.createElement("tr", null, React.createElement("td", null, "ФИО"), React.createElement("td", null, React.createElement("a", {"href": complaint.commentator.url, "target": "_blank"}, complaint.commentator.fio_or_username_or_id))), React.createElement("tr", null, React.createElement("td", null, "Статус"), React.createElement("td", null, React.createElement("span", null, complaint.commentator.status), React.createElement(BanUserModal, {"show": this.state.showBanCommentator, "onHide": function () { this.setState({ showBanCommentator: false }); }.bind(this), "userId": complaint.commentator.id, "updateComplaint": this.props.updateComplaint.bind(this, this.props.complaint.id)}))), React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null, React.createElement(UserDeleteModal, {"userId": complaint.commentator.id}))))))));
    };
    return Complaint;
})(React.Component);
exports.Complaint = Complaint;
var BanUserModal = (function (_super) {
    __extends(BanUserModal, _super);
    function BanUserModal() {
        _super.apply(this, arguments);
        this.state = {
            bans: [],
            ban_reason: 'Мат',
            reason_explain: ''
        };
    }
    BanUserModal.prototype.beforeEnter = function () {
        console.log("begore enter");
        $.ajax({
            url: '/api/adminka/user/' + this.props.userId + '/bans',
            type: 'get'
        }).then(function (data) {
            this.setState({
                bans: data
            });
        }.bind(this));
    };
    BanUserModal.prototype.submitForm = function (e) {
        e.preventDefault();
        var ban_time = this.refs.ban_time.value;
        var ban_reason = this.refs.ban_reason.value;
        var user = this.props.userId;
        var reason_explain = this.refs.reason_explain.value;
        var data = {
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
        }).then(function (response) {
            this.props.updateComplaint();
        }.bind(this));
        this.props.onHide();
    };
    BanUserModal.prototype.render = function () {
        var _a = this.props, show = _a.show, onHide = _a.onHide;
        return (React.createElement(react_bootstrap_1.Modal, {"show": show, "onHide": onHide, "onEnter": this.beforeEnter.bind(this)}, React.createElement("form", {"onSubmit": this.submitForm.bind(this)}, React.createElement(react_bootstrap_1.Modal.Header, {"closeButton": true}, React.createElement(react_bootstrap_1.Modal.Title, null, "Забанить пользователя")), React.createElement(react_bootstrap_1.Modal.Body, null, React.createElement(BanRows, {"bans": this.state.bans}), React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_time"}, "Выберите Срок"), " ", React.createElement("select", {"id": "ban_time", "name": "ban_time", "ref": "ban_time", "className": "form-control"}, React.createElement("option", {"value": "30"}, "30 минут"), React.createElement("option", {"value": "45"}, "45 минут"), React.createElement("option", {"value": "60"}, "1 час"), React.createElement("option", {"value": "180"}, "3 часа"), React.createElement("option", {"value": "360"}, "6 часов"), React.createElement("option", {"value": "720"}, "12 часов"), React.createElement("option", {"value": "1440"}, "1 день"), React.createElement("option", {"value": "4320"}, "3 дня"), React.createElement("option", {"value": "10080"}, "1 неделя"), React.createElement("option", {"value": "43200"}, "1 месяц"), React.createElement("option", {"value": "525600"}, "1 год"), React.createElement("option", {"value": "144720000"}, "перманентно"))), "  ", React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_reason"}, "Выберите причину"), " ", React.createElement("select", {"id": "ban_reason", "name": "ban_reason", "ref": "ban_reason", "className": "form-control", "onChange": function (e) { this.setState({ ban_reason: e.target.value }); }.bind(this), "defaultValue": this.state.ban_reason}, React.createElement("option", {"value": "Мат"}, "Мат"), React.createElement("option", {"value": "Оскорбление"}, "Оскорбление"), React.createElement("option", {"value": "Разжигание"}, "Разжигание"), React.createElement("option", {"value": "Спам"}, "Спам"), React.createElement("option", {"value": "Флуд"}, "Флуд"), React.createElement("option", {"value": "Другое"}, "Другое"), React.createElement("option", {"value": "Клон"}, "Клон"))), React.createElement("div", {"className": "form-group", "style": { display: this.state.ban_reason == 'Другое' ? 'block' : 'none' }}, React.createElement("label", {"htmlFor": "ban_reason"}, "Укажите причину"), " ", React.createElement("textarea", {"name": "reason_explain", "ref": "reason_explain", "className": "form-control", "onChange": function (e) { this.setState({ reason_explain: e.target.value }); }.bind(this)}))), React.createElement(react_bootstrap_1.Modal.Footer, null, React.createElement(react_bootstrap_1.Button, {"onClick": onHide}, "Закрыть"), React.createElement("input", {"type": "submit", "className": "btn btn-primary", "disabled": this.state.ban_reason == 'Другое' && this.state.reason_explain == ''})))));
    };
    return BanUserModal;
})(React.Component);
var BanRows = (function (_super) {
    __extends(BanRows, _super);
    function BanRows() {
        _super.apply(this, arguments);
    }
    BanRows.prototype.render = function () {
        var bans = this.props.bans;
        if (!bans) {
            return null;
        }
        return (React.createElement("table", {"className": "table table-bordered"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "ID"), React.createElement("th", null, "Начало"), React.createElement("th", null, "Конец"), React.createElement("th", null, "Причина"), React.createElement("th", null, "Статус"))), React.createElement("tbody", null, bans.map(function (ban, key) {
            return (React.createElement("tr", {"key": key}, React.createElement("td", null, ban.id), React.createElement("td", null, ban.time_start), React.createElement("td", null, ban.time_finish), React.createElement("td", null, ban.reason), React.createElement("td", null, ban.is_active ? 'активный' : 'неактивный')));
        }.bind(this)))));
    };
    return BanRows;
})(React.Component);
var CommentDeleteModal = (function (_super) {
    __extends(CommentDeleteModal, _super);
    function CommentDeleteModal() {
        _super.apply(this, arguments);
        this.state = {
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
    }
    CommentDeleteModal.prototype.beforeEnter = function () {
        console.log("CommentDeleteModal begore enter");
        $.ajax({
            url: '/api/adminka/user/' + this.props.complaint.commentator.id + '/bans',
            type: 'get'
        }).then(function (data) {
            this.setState({
                bans: data
            });
        }.bind(this));
    };
    CommentDeleteModal.prototype.removeComment = function (e) {
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
            data['ban_reason_explain'] = this.state.reason_explain;
        }
        $.ajax({
            url: '/api/adminka/complaint_book/complaint_action',
            type: 'post',
            data: data
        }).then(function () {
            this.props.onHide();
        }.bind(this));
    };
    CommentDeleteModal.prototype.clickReason = function (el, key, e) {
        e.preventDefault();
        var a = {};
        a[el] = this.state[el] + key + "\n";
        this.setState(a);
    };
    CommentDeleteModal.prototype.render = function () {
        var _a = this.props, show = _a.show, onHide = _a.onHide;
        return (React.createElement(react_bootstrap_1.Modal, {"show": show, "onHide": onHide, "onEnter": this.beforeEnter.bind(this)}, React.createElement("form", null, React.createElement(react_bootstrap_1.Modal.Header, {"closeButton": true}, React.createElement(react_bootstrap_1.Modal.Title, null, "Удалить комментарий")), React.createElement(react_bootstrap_1.Modal.Body, null, React.createElement(BanRows, {"bans": this.state.bans}), React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_reason"}, "Снять рейтинг"), React.createElement("br", null), React.createElement("span", {"className": this.state.reduce_rating_value == 0 ? 'btn btn-primary' : 'btn btn-default', "onClick": function () { this.setState({ reduce_rating_value: 0 }); }.bind(this)}, "0"), " ", React.createElement("span", {"className": this.state.reduce_rating_value == 10 ? 'btn btn-primary' : 'btn btn-default', "onClick": function () { this.setState({ reduce_rating_value: 10 }); }.bind(this)}, "10"), " ", React.createElement("span", {"className": this.state.reduce_rating_value == 20 ? 'btn btn-primary' : 'btn btn-default', "onClick": function () { this.setState({ reduce_rating_value: 20 }); }.bind(this)}, "20"), " ", React.createElement("span", {"className": this.state.reduce_rating_value == 30 ? 'btn btn-primary' : 'btn btn-default', "onClick": function () { this.setState({ reduce_rating_value: 30 }); }.bind(this)}, "30")), React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "delete_comment_reason"}, "Причина удаления"), " ", React.createElement("textarea", {"type": "text", "name": "delete_comment_reason", "id": "delete_comment_reason", "ref": "delete_comment_reason", "className": "form-control", "style": { height: '100px' }, "value": this.state.delete_comment_reason, "onChange": function (e) { this.setState({ delete_comment_reason: e.target.value }); }.bind(this)})), React.createElement("div", null, this.state.reasons_list.map(function (key, index) {
            return React.createElement("span", {"key": index}, React.createElement("a", {"href": "", "onClick": this.clickReason.bind(this, 'delete_comment_reason', key)}, key), " | ");
        }.bind(this))), React.createElement("br", null), React.createElement("fieldset", {"disabled": !this.state.ban_user_checkbox}, React.createElement("legend", null, React.createElement("label", null, React.createElement("input", {"type": "checkbox", "checked": this.state.ban_user_checkbox, "onChange": function () { this.setState({ ban_user_checkbox: !this.state.ban_user_checkbox }); }.bind(this)}), " Забанить пользователя")), React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_time"}, "Выберите Срок"), " ", React.createElement("select", {"id": "ban_time", "name": "ban_duration", "ref": "ban_duration", "className": "form-control"}, React.createElement("option", {"value": "30"}, "30 минут"), React.createElement("option", {"value": "45"}, "45 минут"), React.createElement("option", {"value": "60"}, "1 час"), React.createElement("option", {"value": "180"}, "3 часа"), React.createElement("option", {"value": "360"}, "6 часов"), React.createElement("option", {"value": "720"}, "12 часов"), React.createElement("option", {"value": "1440"}, "1 день"), React.createElement("option", {"value": "4320"}, "3 дня"), React.createElement("option", {"value": "10080"}, "1 неделя"), React.createElement("option", {"value": "43200"}, "1 месяц"), React.createElement("option", {"value": "525600"}, "1 год"), React.createElement("option", {"value": "144720000"}, "перманентно"))), "  ", React.createElement("div", {"className": "form-group"}, React.createElement("label", {"htmlFor": "ban_reason"}, "Выберите причину"), " ", React.createElement("textarea", {"id": "ban_reason", "name": "ban_reason", "ref": "ban_reason", "className": "form-control", "onChange": function (e) { this.setState({ ban_reason: e.target.value }); }.bind(this), "defaultValue": this.state.ban_reason, "value": this.state.ban_reason, "style": { height: '100px' }})), React.createElement("div", null, this.state.reasons_list.map(function (key, index) {
            return React.createElement("span", {"key": index}, React.createElement("a", {"href": "", "onClick": this.clickReason.bind(this, 'ban_reason', key)}, key), " | ");
        }.bind(this))))), React.createElement(react_bootstrap_1.Modal.Footer, null, React.createElement(react_bootstrap_1.Button, {"onClick": onHide}, "Отмена"), React.createElement(react_bootstrap_1.Button, {"className": "btn btn-primary", "disabled": !this.state.delete_comment_reason, "onClick": this.removeComment.bind(this)}, this.state.ban_user_checkbox ? 'Забанить и удалить' : 'Удалить коммент')))));
    };
    return CommentDeleteModal;
})(React.Component);
var UserDeleteModal = (function (_super) {
    __extends(UserDeleteModal, _super);
    function UserDeleteModal() {
        _super.apply(this, arguments);
        this.state = {
            show: false,
            delete_reason: '',
        };
    }
    UserDeleteModal.prototype.onHide = function () {
        this.setState({
            show: false
        });
    };
    UserDeleteModal.prototype.show = function () {
        this.setState({
            show: true
        });
    };
    UserDeleteModal.prototype.deleteUser = function () {
        $.ajax({
            url: '/api/adminka/delete_user',
            type: 'post',
            data: {
                user_id: this.props.userId
            }
        }).then(function () {
            this.props.onHide();
        }.bind(this));
    };
    UserDeleteModal.prototype.render = function () {
        return (React.createElement("span", null, React.createElement("span", {"className": "status-text", "onClick": this.show.bind(this)}, "Удалить"), React.createElement(react_bootstrap_1.Modal, {"show": this.state.show, "onHide": this.onHide.bind(this)}, React.createElement("form", null, React.createElement(react_bootstrap_1.Modal.Header, {"closeButton": true}, React.createElement(react_bootstrap_1.Modal.Title, null, "Удалить Пользователя")), React.createElement(react_bootstrap_1.Modal.Footer, null, React.createElement(react_bootstrap_1.Button, {"onClick": this.onHide.bind(this)}, "Отмена"), React.createElement(react_bootstrap_1.Button, {"className": "btn btn-primary", "onClick": this.deleteUser.bind(this)}, "Удалить"))))));
    };
    return UserDeleteModal;
})(React.Component);
//# sourceMappingURL=BasePane.js.map



import * as React from 'react';
import * as infs from '../../interfaces/interfaces'


interface IProps {
    content: infs.Content
}


export default class Rating extends React.Component<IProps, any> {

    vote(vote, e: any) {

        //content_vote
        //console.log(e, vote, contentId);
        fetch('/content_vote', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "vote=" + vote + "&content_id=" + this.props.content.id
        }).
        then((r) => {
            return r.json()
        }).
        then((data) => {
            //{"data": {"rating": 1, "votes_against": 0, "votes_for": 1}, "message": "\u0412\u0430\u0448 \u0433\u043e\u043b\u043e\u0441 \u0443\u0447\u0442\u0451\u043d", "ok": true}
            //dispatch({
            //    type: types.SET_COMMUNITY,
            //    community: Object.assign(new models.Community(), data)
            //})
        });
    }

    componentWillMount() {
        this.setState({content: this.props.content})
    }

    render() {

        const {rating} = this.state.content;
        const {content} = this.state;

        return (
                <div className="plusMinus">
                    <span>{rating.rating}</span>
                    <a className="icon-negative"
                       title="поставить минус"
                       onClick={this.vote.bind(this, -1)}
                    />
                    <span className="negative">{rating.getVotesAgainst()}</span>
                    <a className="icon-positive"
                       title="поставить плюс"
                       onClick={this.vote.bind(this, 1)} />
                    <span className="positive">{rating.getVotesFor()}</span>
                </div>
                )
    }

}
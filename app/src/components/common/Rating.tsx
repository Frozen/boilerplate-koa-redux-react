


import * as React from 'react';
import * as infs from '../../interfaces/interfaces'


interface IProps {
    content: infs.Content
}


export default class Rating extends React.Component<IProps, any> {

    vote(vote, e: any) {

        //content_vote
        //console.log(e, vote, contentId);
        $.ajax({
            url: '/content_vote',
            type: 'post',
            data: {
                vote: vote,
                content_id: this.props.content.id
            }
        }).
        then(function(data) {

            if (data.ok) {
                this.setState({
                    content: Object.assign({}, this.state.content, {rating: data.data})
                })
            }

        }.bind(this));
    }

    componentWillMount() {
        this.setState({content: this.props.content})
    }

    render() {

        const {rating} = this.state.content;
        const {content} = this.state;

        return (
                <div className="plusMinus">
                    <span>{rating.votes_against}</span>
                    &nbsp;<a className="icon-negative"
                       title="поставить минус"
                       onClick={this.vote.bind(this, -1)}
                    />
                    <span className="negative">{rating.rating}</span>
                    <a className="icon-positive"
                       title="поставить плюс"
                       onClick={this.vote.bind(this, 1)} />
                    &nbsp;
                    <span className="positive">{rating.votes_for}</span>
                </div>
                )
    }

}
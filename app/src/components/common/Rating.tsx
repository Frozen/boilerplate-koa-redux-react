


import * as React from 'react';
import * as infs from '../../interfaces/interfaces'


interface IProps {
    rating: infs.Rating
}


export default class Rating extends React.Component<IProps, any> {

    render() {

        const {rating} = this.props;

        return (
                <div className="plusMinus">
                    <span>{rating.rating}</span>
                    <span className="negative">{rating.votesAgainst}</span>
                    <span className="positive">{rating.votesFor}</span>
                </div>
                )
    }

}
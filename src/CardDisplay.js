import React, { Component } from 'react';

class CardDisplay extends Component {

    render() {
        const {
            title,
            card
        } = this.props
        let displayContents;
        if (card !== undefined && card !== null)
            displayContents = card.cardValue + " of " + card.suit;
        else
            displayContents = "";
        return (
            <div style={{ margin: "auto" }}>
                <h2>{title}</h2>
                <div>
                    {displayContents}
                </div>
            </div>
        );
    }
}
export default CardDisplay
import React, { Component } from 'react';

class CardDisplay extends Component {

    render() {
        const {
            title,
            card,
            tieCards
        } = this.props
        let displayContents;
        if (card !== undefined && card !== null)
            displayContents = card.cardValue + " of " + card.suit;
        else
            displayContents = "";

        if (tieCards.length !== 0) {
            for (let i = 0; i < tieCards.length; i++) {
                displayContents += "\n" + tieCards[i].cardValue + " of " + tieCards[i].suit;
            }
        }
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
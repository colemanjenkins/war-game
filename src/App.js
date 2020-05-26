import React, { Component } from 'react';
import './App.css';
import CardDisplay from './CardDisplay.js'

import { shuffle } from 'lodash';

const valueMapping = new Map([
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 7],
  [8, 8],
  [9, 9],
  [10, 10],
  ["Jack", 11],
  ["Queen", 12],
  ["King", 13],
  ["Ace", 14]
]);

class App extends Component {
  constructor() {
    super();

    //creates standard deck of cards
    let fullDeck = [];
    let vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
    let suits = ['Clubs', 'Hearts', 'Spades', 'Diamonds'];
    let s, v;
    for (v of vals) {
      for (s of suits) {
        fullDeck.push({
          cardValue: v,
          suit: s
        });
      }
    }

    this.state = {
      completeDeck: fullDeck,
      playerHand: [],
      computerHand: [],
      gameInProgress: false,
      playerCurrentCard: null,
      computerCurrentCard: null,
      message: ""
    }
  }

  startGame = () => {
    this.setState(prevState => {
      let deck = [...prevState.completeDeck];

      // shuffle the deck before dealing
      deck = shuffle(deck);

      let newPlayerHand = [];
      let newComputerHand = [];

      // deal the cards
      for (let i = 0; i < deck.length; i++) {
        if (i % 2 === 0)
          newPlayerHand.push(deck[i]);
        else
          newComputerHand.push(deck[i]);
      }

      return {
        gameInProgress: true,
        computerHand: newComputerHand,
        playerHand: newPlayerHand
      }
    })
  }

  playCard = () => {
    this.setState(prevState => {
      let compCards = [...prevState.computerHand];
      let playerCards = [...prevState.playerHand];
      const compCard = compCards.shift();
      const playerCard = playerCards.shift();
      let message;

      if (valueMapping.get(compCard.cardValue) > valueMapping.get(playerCard.cardValue)) {
        message = "You lost!";
        compCards.push(compCard);
        compCards.push(playerCard);
      } else {
        message = "You won!";
        playerCards.push(compCard);
        playerCards.push(playerCard);
      }

      console.log(playerCard);
      console.log(compCard);
      console.log(playerCards);
      console.log(compCards);
      return {
        computerCurrentCard: compCard,
        playerCurrentCard: playerCard,
        playerHand: playerCards,
        computerHand: compCards
      }
    })
  }

  endGame = () => {

  }

  render() {
    let userOption;
    let statusBar;
    if (this.state.gameInProgress) {
      statusBar = <div>
        Your deck size: {this.state.playerHand.length} Opponent deck size: {this.state.computerHand.length}
      </div>;
      userOption =
        <button style={{ justifyContent: "center" }}
          onClick={() => this.playCard()} > Play Card</ button>;
    } else {
      statusBar = null;
      userOption =
        <button style={{ justifyContent: "center" }}
          onClick={() => this.startGame()}>Start Game</button>;
    }
    return (
      <div className="App" >
        {statusBar}
        <div className="gameDisplay">
          <CardDisplay title="Your Card"
            card={this.state.playerCurrentCard} />
          <CardDisplay title="Opponent's Card"
            card={this.state.computerCurrentCard} />
        </div>
        {userOption}
      </div>
    );
  }
}

export default App;

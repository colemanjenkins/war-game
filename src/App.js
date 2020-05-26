import React, { Component } from 'react';
import './App.css';
import CardDisplay from './CardDisplay.js'

import { shuffle } from 'lodash';

class App extends Component {
  constructor() {
    super();

    //creates standard deck of cards
    let fullDeck = [];
    let vals = [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"];
    let suits = ['c', 'h', 's', 'd'];
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
      playerCurrentCard: "none",
      computerCurrentCard: "none",
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

      console.log(newPlayerHand);
      console.log(newComputerHand)

      return {
        gameInProgress: true,
        computerHand: newComputerHand,
        playerHand: newPlayerHand
      }
    })
  }

  playCard = () => {

  }

  endGame = () => {

  }

  render() {
    let userOption;
    if (this.state.gameInProgress) {
      userOption =
        <button style={{ justifyContent: "center" }}
          onClick={() => this.playCard()} > Play Card</ button>
    } else
      userOption =
        <button style={{ justifyContent: "center" }}
          onClick={() => this.startGame()}>Start Game</button>
    return (
      <div className="App" >
        <div className="gameDisplay">
          <CardDisplay title="Your Card" />
          <CardDisplay title="Opponent's Card" />
        </div>
        {userOption}
      </div>
    );
  }
}

export default App;

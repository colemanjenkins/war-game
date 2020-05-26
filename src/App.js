import React, { Component } from 'react';
import './App.css';
import CardDisplay from './CardDisplay.js'

// import "antd/dist/antd.css";
import { Button } from 'antd';
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
      message: "",
      tied: false,
      playerTieCards: [],
      computerTieCards: [],
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

  tieActions = () => {
    this.setState(prevState => {
      let newPlayerTieCards = [];
      let newComputerTieCards = [];

      let newPlayerHand = [...prevState.playerHand];
      let newComputerHand = [...prevState.computerHand];

      let newMessage;

      //take 3 cards from each
      //if a hand has less than 3 cards
      //only draw the cards they have left
      //and compare the last
      for (let i = 0; i < 3; i++) {
        if (newPlayerHand.length !== 0)
          newPlayerTieCards.push(newPlayerHand.pop());
        if (newComputerHand.length !== 0)
          newComputerTieCards.push(newComputerHand.pop());
      }

      //computer wins
      if (valueMapping.get(newComputerTieCards[newComputerTieCards.length - 1].cardValue) > valueMapping.get(newPlayerTieCards[newPlayerTieCards.length - 1].cardValue)) {
        newMessage = "You lost!";
        newComputerHand.push(prevState.computerCurrentCard);
        newComputerHand.push(prevState.playerCurrentCard);
        for (let i = 0; i < newComputerTieCards.length; i++) {
          newComputerHand.push(newComputerTieCards[i]);
        }
        for (let i = 0; i < newPlayerTieCards.length; i++) {
          newComputerHand.push(newPlayerTieCards[i]);
        }
        //you win
      } else if (valueMapping.get(newComputerTieCards[newComputerTieCards.length - 1].cardValue) < valueMapping.get(newPlayerTieCards[newPlayerTieCards.length - 1].cardValue)) {
        newMessage = "You won!";
        newPlayerHand.push(prevState.computerCurrentCard);
        newPlayerHand.push(prevState.playerCurrentCard);
        for (let i = 0; i < newComputerTieCards.length; i++) {
          newPlayerHand.push(newComputerTieCards[i]);
        }
        for (let i = 0; i < newPlayerTieCards.length; i++) {
          newPlayerHand.push(newPlayerTieCards[i]);
        }
        //another tie
      } else {
        return {
          message: "You tied! Hit play card again to continue",
          tied: true,
          computerTieCards: [...prevState.computerTieCards, newComputerTieCards],
          playerTieCards: [...prevState.playerTieCards, newPlayerTieCards]
        };
      }

      return {
        message: newMessage,
        tied: false,
        playerHand: newPlayerHand,
        computerHand: newComputerHand,
        computerTieCards: newComputerTieCards,
        playerTieCards: newPlayerTieCards,
      };
    })

  }

  playCard = () => {
    this.setState(prevState => {
      if (prevState.tied) {
        this.tieActions();
        return {};
      }
      let compCards = [...prevState.computerHand];
      let playerCards = [...prevState.playerHand];
      const compCard = compCards.shift();
      const playerCard = playerCards.shift();
      let newMessage;

      //computer wins
      if (valueMapping.get(compCard.cardValue) > valueMapping.get(playerCard.cardValue)) {
        newMessage = "You lost!";
        compCards.push(compCard);
        compCards.push(playerCard);
        //you win
      } else if (valueMapping.get(compCard.cardValue) < valueMapping.get(playerCard.cardValue)) {
        newMessage = "You won!";
        playerCards.push(compCard);
        playerCards.push(playerCard);
        //tie
      } else {
        return {
          message: "You tied! Hit play card again to continue",
          tied: true,
          computerCurrentCard: compCard,
          playerCurrentCard: playerCard,
          playerHand: playerCards,
          computerHand: compCards,
        };
      }

      //check if game is over
      if (compCards.length === 0) {
        this.endGame(true);
        return {};
      } else if (playerCards.length === 0) {
        this.endGame(false);
        return {};
      }

      return {
        computerCurrentCard: compCard,
        playerCurrentCard: playerCard,
        playerHand: playerCards,
        computerHand: compCards,
        message: newMessage,
        computerTieCards: [],
        playerTieCards: []
      }
    })
  }

  /**
   * winner === true => player won
   * winner === false => computer won
   */
  endGame = (winner) => {
    if (winner) {
      this.setState(prevState => {
        return {
          playerHand: [],
          computerHand: [],
          gameInProgress: false,
          playerCurrentCard: null,
          computerCurrentCard: null,
          message: "Congrats! You win the game!"
        }
      });
    } else {
      this.setState(prevState => {
        return {
          playerHand: [],
          computerHand: [],
          gameInProgress: false,
          playerCurrentCard: null,
          computerCurrentCard: null,
          message: "You got beat by the computer. Better Luck next time."
        }
      });
    }
  }

  render() {
    let userOption;
    let statusBar;
    if (this.state.gameInProgress) {
      statusBar = <div>
        Your deck size: {this.state.playerHand.length} Opponent deck size: {this.state.computerHand.length}
      </div>;
      userOption =
        <Button type="primary"
          onClick={() => this.playCard()} > Play Card</ Button>;
    } else {
      statusBar = null;
      userOption =
        <Button type="primary"
          onClick={() => this.startGame()}>Start Game</Button>;
    }


    return (
      <div className="App" >
        {this.state.message}
        <br></br>{statusBar}
        <div className="gameDisplay">
          <CardDisplay title="Your Card"
            card={this.state.playerCurrentCard}
            tieCards={this.state.playerTieCards} />
          <CardDisplay title="Opponent's Card"
            card={this.state.computerCurrentCard}
            tieCards={this.state.computerTieCards} />
        </div>
        <div style={{ textAlign: "center" }}>
          {userOption}
        </div>

      </div>
    );
  }

}

export default App;

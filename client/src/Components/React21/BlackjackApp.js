import React from 'react';
import Dealer from './Dealer';
import Menu from './Menu';
import User from './User';
import './BlackjackApp.scss'
const getDeck = require('./cards.json');

let fullDeck = getDeck.deck;

class Blackjack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: fullDeck,
            userScore: 0,
            userHand: [],      
            dealerScore: 0,
            dealerHand: [],
            hidden: false,
            bet: 0,
            bank: 10
        };
        this.inputBet = this.inputBet.bind(this);
        this.winConditions = this.winConditions.bind(this);
        this.loseConditions = this.loseConditions.bind(this);
        this.handleRoundOver = this.handleRoundOver.bind(this);
        this.buy = this.buy.bind(this);
        this.stay = this.stay.bind(this);
        this.double = this.double.bind(this);
        this.reset = this.reset.bind(this);
        this.dealCard = this.dealCard.bind(this);
        this.recieveCard = this.recieveCard.bind(this);
    }

    inputBet(input) {
        this.setState((state) => ({
            deck: fullDeck,
            userScore: 0,
            userHand: [],      
            dealerScore: 0,
            dealerHand: [],
            hidden: false,
            bank: state.bank - input,
            bet: input
        }))
    }

    winConditions() {   
        if (this.state.dealerScore > 21) {
            //if dealer busts
            this.handleRoundOver(true, 1)
            return;
        }
        
        if (this.state.userScore > this.state.dealerScore) {
            //if player has higher score than dealer after player stays
            this.handleRoundOver(true, 1)
            return;
        }
        
        if (this.state.userScore === this.state.dealerScore) {
            //if player and dealer have same score after player stays, bet is refunded because tie.
            this.handleRoundOver(true, 0)
            return;
        }
    }

    loseConditions() {
        if (this.state.userScore > 21) {
            //if player busts
            this.handleRoundOver(false);
            return;
        }
        
        if (this.state.userScore < this.state.dealerScore && this.state.dealerScore <= 21) {
            //if player score is lower than dealer after player stays
            this.handleRoundOver(false);
            return;
        }
    }

    handleRoundOver(didYouWin, betReturn) {
        if (didYouWin === true) {
            alert("you win!");
            
            this.setState((state) => ({
            bank: state.bank + (state.bet + state.bet*betReturn),
            bet: 0
            }))
            
            return;
        }
        alert("you lose!");
        
        this.setState({
            bet: 0,
        })
    }

    async buy() {
        await this.recieveCard('userHand','userScore', this.dealCard);
        
        if (this.state.userScore > 21) {
            //if player busts
            this.handleRoundOver(false);
        }
    }

    async stay() {
        this.setState({
            hidden: false,
        })
    
        //deal cards to dealer to get above 17
        while (this.state.dealerScore < 17) {
            await this.recieveCard('dealerHand','dealerScore', this.dealCard);
        }
    
        this.winConditions(); 
        this.loseConditions();
    }

    async double() {
        //this option is only available on your first draw if your score is between 9 and 11 points, inclusive.
        if (this.state.userHand.length === 2 && this.state.userScore >= 9 && this.state.userScore <= 11) {
            if (this.state.bank - this.state.bet >= 0) {
                this.setState((state) => ({
                    bank: state.bank - state.bet,
                    bet: state.bet * 2
                }))
            
                await this.recieveCard('userHand','userScore', this.dealCard);
                if (this.state.userScore > 21) {
                    //if player busts
                    this.handleRoundOver(false);
                }
            
                await this.stay();
            
            } else {
                alert("Cannot double, not enough money available.")
            }
            return;
        }
        alert("Double not available right now.")  
    }

    reset() {
        if (window.confirm('Reset the game?')) {
            this.setState({
                deck: fullDeck,
                userScore: 0,
                userHand: [],      
                dealerScore: 0,
                dealerHand: [],
                hidden: false,
                bet: 0,
                bank: 10
            });
        }
    }

    dealCard() {
        //copy of deck
        let currentDeck = [...this.state.deck];
        //removing a random card from the copy and setting it as dealtCard. 
        let dealtCard = currentDeck.splice(Math.floor(Math.random() * currentDeck.length), 1);
        //setState so that deck = deck - dealtCard.
        this.setState({
            deck: currentDeck,
        })
        return dealtCard;
    }

    recieveCard(hand, score, deal, faceDown) {
        //get card and value of said card.
        let card = deal();
        let value = () => {
            if (card[0].cardValue === null) {
            //need to add functionality for counting aces as either 1 or 11.
            return 11;
            }
            return card[0].cardValue;
        }

        //add card to player hand, add individual properties where they're needed.
        this.setState((state) => ({
            [hand]: [...state[hand], card[0]],
            [score]: state[score] + value()
        }))
        
        //if card should be dealt facedown, set this.state.hidden to true.
        if (faceDown === true) {
            this.setState({
            hidden: true,
            })
        }
    }

    render() {
        return(
            <div id='blackjack-app'>
                <div id="bjarea">
                    <h1 id='winOrLose'>{}</h1>
                    <div id='infoarea'>
                        <div id='title'>
                            <h1>React 21</h1>
                            <p>A BlackJack Simulator by Harrison King</p>
                        </div>
                        <div id='money'>
                            <p className='money-child'>Bank: {this.state.bank}</p>
                            <p className='money-child'>Bet: {this.state.bet}</p>
                        </div>
                        <Menu 
                            deal={this.dealCard} 
                            recieve={this.recieveCard}
                            dealerHand={this.state.dealerHand}
                            dealerScore={this.state.dealerScore}
                            userHand={this.state.userHand}
                            userScore={this.state.userScore}
                            handleRoundOver={this.handleRoundOver}
                            bank={this.state.bank} 
                            bet={this.state.bet} 
                            inputBet={this.inputBet}
                            buy={this.buy}
                            stay={this.stay}
                            double={this.double}
                            reset={this.reset}
                        />
                        <p>Can you get 1,000,000 in the Bank?</p>
                    </div>                      
                    <div id='playarea'>
                        <div className='cardarea'>
                            <Dealer             
                                hand={this.state.dealerHand}
                                score={this.state.dealerScore}
                                faceDown={this.state.hidden}
                            />
                        </div>
                        <div className='cardarea'>
                            <User 
                                hand={this.state.userHand} 
                                score={this.state.userScore} 
                            />
                        </div>   
                    </div>                                       
                </div>               
            </div>
        )
    }
}

export default Blackjack;

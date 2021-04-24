import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: null,
            displayForm: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.btnTapped = this.btnTapped.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.dealPlayerStart = this.dealPlayerStart.bind(this);
        this.onClickDouble = this.onClickDouble.bind(this);
    }

    btnTapped() {
        console.log('tapped');
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.input < 1) {
            alert("Set a bet amount.")
            return;
        };
        let num = parseInt(this.state.input, 10)
        await this.props.inputBet(num);
        
        this.dealPlayerStart();
    }

    toggleForm() {
        this.setState(state => ({
            displayForm: !state.displayForm
        }));
    }

    async dealPlayerStart() {
        //deals starting cards to both dealer and user
        await this.props.recieve('userHand','userScore', this.props.deal);
        await this.props.recieve('dealerHand','dealerScore', this.props.deal);
        await this.props.recieve('userHand','userScore', this.props.deal);
        //deal facedown card to dealer
        await this.props.recieve('dealerHand','dealerScore', this.props.deal, true);
    
        if (this.props.userScore === 21) {
            if (this.props.dealerScore !== 21) {
            //if player gets blackjack, or gets 21 with the starting hand.
            if (this.props.userHand.length === 2) {
                this.props.handleRoundOver(true, 1.5);
            }
            return;
            }
            this.props.stay();
        }
    }

    onClickDouble() {
        //player can only double once per round.
        this.props.double();
        this.btn.setAttribute("disabled", "disabled");
    }

    render() {
        const inputBet = 
            <form id='enter-bet' onSubmit={this.handleSubmit}>
                <p>Place your bet.</p>        
                <div id='bet-options'>
                    <input 
                        id='input-bet' 
                        type='number' 
                        min='1' 
                        max={this.props.bank} 
                        value={this.state.input} 
                        onChange={this.handleChange}
                    />
                    <button 
                        type='submit' 
                        id='enter'
                    >Bet</button>
                </div>
            </form>;
        const gameOptions = 
            <div>
                <p>What will you do?</p>
                <div id='play-options'>
                    <button 
                        id='buy'  
                        onClick={this.props.buy}
                    >Buy</button>
                    <button 
                        id='stay' 
                        onClick={this.props.stay}
                    >Stay</button>
                    <button 
                        ref={btn => { this.btn = btn; }} 
                        id='double' 
                        onClick={this.onClickDouble}
                    >Double</button>
                </div>
            </div>
    
        return (
        <div>           
            {
                this.props.bet === 0 
                ? inputBet
                : gameOptions
            }
            <button id='reset' onClick={this.props.reset}>Reset</button>
        </div>
        )
    }    
}

export default Menu;

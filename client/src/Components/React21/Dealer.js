import React from 'react';

class Dealer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.toggleHiddenScore = this.toggleHiddenScore.bind(this);
        this.toggleHiddenCard = this.toggleHiddenCard.bind(this);
    }

    toggleHiddenScore() { 
    if (this.props.faceDown) {
        let firstCardValue = this.props.hand[0].cardValue;
        return `${firstCardValue} + ?`;
    };    
    return this.props.score;
    }

    toggleHiddenCard() {
        const hand = this.props.hand;
        if (this.props.faceDown) {
            return <div id='position-facedown'>
                    <div>
                        <img className='card' src={hand[0].url} alt={hand[0].cardName}></img>
                    </div>
                    <div>
                        <img className='card' alt='Face down card' src='https://i.imgur.com/PbYmXSW.png'></img>
                    </div>
                </div>
        };
        return hand.map(x => {
            return <div>
                    <img className='card' src={x.url} alt={x.cardName}></img> 
                </div>
        })
    }

    render() {   
        return(
            <div>
                <h2>Dealer card total: {this.toggleHiddenScore()} </h2>
                <div className='card-layout'>
                    {this.toggleHiddenCard()}
                </div>
            </div>
        )
    }  
}

export default Dealer;

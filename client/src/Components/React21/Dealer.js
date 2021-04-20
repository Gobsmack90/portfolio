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
            return <div><div className="col-xs-2"><img className='img-responsive' src={hand[0].url}></img></div> <div className="col-xs-2"><img className='img-responsive' src='https://i.imgur.com/PbYmXSW.png'></img></div></div>
        };
        return hand.map(x => {
            return <div className="col-xs-2"> <img className='img-responsive' src={x.url}></img> </div>
        })
    }

    render() {   
        return(
            <div>
                <h2>Dealer card total: {this.toggleHiddenScore()} </h2>
                <div className="row well">
                    {this.toggleHiddenCard()}
                </div>
            </div>
        )
    }  
}

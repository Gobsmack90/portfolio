import React from 'react';

class User extends React.Component {

    render() {
        const hand = this.props.hand;
        const images = hand.map(x => {
            return <div> <img className='card' src={x.url} alt={x.cardName}></img> </div>
        })
        
        return(
            <div>
                <h2>User card total: {this.props.score} </h2>
                <div className='card-layout'>
                    {images}
                </div>
            </div>
        )
    }
}

export default User;

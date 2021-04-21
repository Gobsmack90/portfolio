import React from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const hand = this.props.hand;
        const images = hand.map(x => {
            return <div className="col-xs-2"> <img className='img-responsive' src={x.url}></img> </div>
        })
        
        return(
            <div>
                <h2>User card total: {this.props.score} </h2>
                <div className="row well">
                    {images}
                </div>
            </div>
        )
    }
}

export default User;

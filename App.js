import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      data: 'data',
      bids: '',
      asks: '',
    }
    this.receivedMessage = this.receivedMessage.bind(this);
  }
  receivedMessage(evt) {
    const event = JSON.parse(evt.data)
    console.log(event, 'THIS IS THE EVENT')
    this.setState({
      bids: event.best_bid,
      asks: event.best_ask,
    })
    console.log(this.state.bids, this.state.asks, 'BIDS AND ASKS')
  }

  componentDidMount() {
    const send_data = {
      "type": "subscribe",
      "channels": [{ "name": "ticker", "product_ids": ["BTC-USD"] }]
  }

//   otherData = {
//     "type": "subscribe",
//     "product_ids": [
//         "BTC-USD",
//     ],
//     "channels": [
//         "level2",
//         "ticker",
//         {
//             "name": "ticker",
//             "product_ids": [
//                 "BTC-USD",
//             ]
//         }
//     ]
// }
  const tryIt  = this;
    const websocket = new WebSocket('wss://ws-feed.pro.coinbase.com');
    websocket.onopen = function(evt) {console.log(evt , 'OPENED')
      websocket.send(JSON.stringify(send_data));
   };
   websocket.onmessage = function(evt) {
     console.log(evt)
     tryIt.receivedMessage(evt);
    };
    websocket.onclose = function(evt) { console.log(evt,'CLOSED') };
    websocket.onerror = function(evt) { console.log(evt, 'ERROR!') };
  }

  
   
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <b>Bitcoin Price {this.state.data}</b>
        <b>Bids {this.state.bids} </b>
        <b>Asks {this.state.asks}</b>
        </header>
      </div>
    );
  }
}

export default App;

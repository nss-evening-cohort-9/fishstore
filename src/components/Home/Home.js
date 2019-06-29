import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import NewOrder from '../NewOrder/NewOrder';
import Orders from '../Orders/Orders';
import Inventory from '../Inventory/Inventory';

import fishData from '../../helpers/data/fishData';
import ordersData from '../../helpers/data/ordersData';

import './Home.scss';

class Home extends React.Component {
  state = {
    orders: [],
    fishes: [],
  }

  componentDidMount() {
    fishData.getFishes()
      .then(fishes => this.setState({ fishes }))
      .catch(err => console.error('could not get fishes', err));

    ordersData.getMyOrders(firebase.auth().currentUser.uid)
      .then(orders => this.setState({ orders }))
      .catch(err => console.error('cant get orders', err));
  }

  render() {
    const { fishes, orders } = this.state;
    return (
      <div className="Home">
        <div className="row">
          <div className="col">
            <Inventory fishes={fishes}/>
          </div>
          <div className="col">
            <NewOrder />
          </div>
          <div className="col">
            <Orders orders={orders}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

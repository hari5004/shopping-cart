import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './components/product/product.js'
import data from '/Users/harikrishnan/ReactProjects/my-cart/src/data/productlist.js'
class App extends Component {
  constructor(){
		super();
		this.state = {
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0, 
			term: '',
			category: '',
			cartBounce: false,
			quantity : 1,
			quickViewProduct: {},
			modalActive: false
    };
    this.updateQuantity = this.updateQuantity.bind(this);
  }
  updateQuantity(qty){
		console.log("quantity added...")
		this.setState({
				quantity: qty
		})
	}
  render() {
    var scope=this;
    return (
      <div className="container">
      <div className="products-wrapper">
        {
        data.map(function(item,i){
          return(
        <Product imageData={item} updateQuantity={scope.updateQuantity}></Product>
          )
        })
        }
      </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Product from './components/product/product.js'
import Header from './components/Header/Header.js'
import NotFound from './data/images/notfound.jpg'
import data from './data/productlist.js'
class App extends Component {
  constructor(){
		super();
		this.state = {
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0, 
			term: '',
			quantity : 1,
		};
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.updateQuantity=this.updateQuantity.bind(this);
		this.handleSearch=this.handleSearch.bind(this);
  }
  updateQuantity(qty){
		this.setState({
				quantity: qty
		})
	}
	handleSearch(event){
		this.setState({term: event.target.value});
	}
	checkProduct(productID){
		let cart = this.state.cart;
		return cart.some(function(item) {
			return item.id === productID;
		}); 
	}
	handleAddToCart(selectedProducts){
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
		if(this.checkProduct(productID)){
			let index = cartItem.findIndex((x => x.id === productID));
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart : cartItem
		});
		setTimeout(function(){
			this.setState({
				quantity: 1
			});
    }.bind(this),1000);  
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}
	sumTotalItems(){
		let total = 0;
		let cart = this.state.cart;
total = cart.length;
this.setState({
	totalItems: total
})
}
sumTotalAmount(){
		let total = 0;
		let cart = this.state.cart;
		for (var i=0; i<cart.length; i++) {
				total += cart[i].price * parseInt(cart[i].quantity);
		}
this.setState({
	totalAmount: total
})
}
handleRemoveProduct(id, e){
	let cart = this.state.cart;
	let index = cart.findIndex((x => x.id === id));
	cart.splice(index, 1);
	this.setState({
		cart: cart
	})
	this.sumTotalItems(this.state.cart);
	this.sumTotalAmount(this.state.cart);
	e.preventDefault();
}
  render() {
		var scope=this;
		let searchTerm=this.state.term;
		let newdata;
		newdata= data.filter(searchingFor(searchTerm));
		function searchingFor(term){
			return function(x){
				return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
			}
		}
		if(newdata.length <= 0 && searchTerm){
			return (
				<div className="container">
        <Header
					total={this.state.totalAmount}
					totalItems={this.state.totalItems}
					cartItems={this.state.cart}
					removeProduct={this.handleRemoveProduct}
					handleSearch={this.handleSearch}
					updateQuantity={this.updateQuantity}
					productQuantity={this.state.moq}
				/>
				<div className="no-results">
				<img className="noimage"src={NotFound} alt="Getting Mad"/>
				<h2 className="desc">Sorry, no products matched your search!</h2>
				<p className="suggest">Enter a different keyword and try.</p>
		</div>
		</div>
			)
		}
    return (
      <div className="container">
        <Header
					total={this.state.totalAmount}
					totalItems={this.state.totalItems}
					cartItems={this.state.cart}
					removeProduct={this.handleRemoveProduct}
					handleSearch={this.handleSearch}
					updateQuantity={this.updateQuantity}
					productQuantity={this.state.moq}
				/>
      <div className="products-wrapper">
        {
        newdata.map(function(item,i){
          return(
        <Product key={item['id']} id={item['id']} imageData={item} updateQuantity={scope.updateQuantity} addToCart={scope.handleAddToCart} quantity={scope.state.quantity}></Product>
          )
        })
        }
      </div>
      </div>
		);
  }
}

export default App;

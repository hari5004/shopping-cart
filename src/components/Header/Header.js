import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {findDOMNode} from 'react-dom';
import './Header.css';
import  CartScrollBar from './CartScrollBar.js'
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false
        };
    }
    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
    render(){
        let cartItems;
        cartItems = this.state.cart.map(product =>{
			return(
				<li className="cart-item" key={product.name}>
                    <div className="container">
                    <div className="row">
                        <div className="col">
                        <img className="product_image" src={product.image} />
                        </div>
                        <div className="col">
                        <p >{product.name}</p>
                        <p >Rs:{product.price}</p>
                    </div>
                    <div className="col">
                        <p >Quantity:{product.quantity} {product.quantity > 1 ?"Nos." : "No." } </p>
                        <p>Total:{product.quantity * product.price}</p>
                    </div>
                    <div className="col">
                    <a  href="#" onClick={this.props.removeProduct.bind(this, product.id)}>×</a>
                    </div>
                    </div>
                    </div>
                </li>
			)
		});
        let view;
        if(cartItems.length <= 0){
            //view = <EmptyCart />
            view =<div>Empty</div>
		} else{
			view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items">{cartItems}</CSSTransitionGroup>
		}
        return(
            <header>
                <div className="containerHeader">
                    <div className="logo">
                    <p>My-Cart</p>
                    </div>
                    <div className="search">
                        <form action="#" method="get" className="search-form">
                            <input type="search" ref="searchBox" placeholder="Search for mobile phones(Hint:iphone,oneplus5t...)" className="search-keyword" onChange={this.props.handleSearch}/>
                            <button className="search-button" type="submit" onClick={this.handleSubmit.bind(this)}></button>
                        </form>
                    </div>

                    <div className="cart"> 
                        <div className="cart-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>No. of items</td>
                                        <td>:</td>
                                        <td><strong>{this.props.totalItems}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Sub Total</td>
                                        <td>:</td>
                                        <td><strong>{this.props.total}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img className="cartpic" src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png" alt="Cart"/>
                            {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" }
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                            <CartScrollBar>
                                {view}
                            </CartScrollBar>
                            <div className="action-block">
                                <button type="button" className={this.state.cart.length > 0 ? " " : "disabled"}>PROCEED TO CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;

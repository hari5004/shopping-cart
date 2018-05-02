import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './Header.css';
import  CartScrollBar from './CartScrollBar.js'
import shoppingCarrt from './shoppingcart.png'
import logo from './logo.png'
import emptycart from './emptycart.gif'
import {findDOMNode} from 'react-dom';
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
    handleClickOutside(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        if(cartNode.classList.contains('active')){
            if (!cartNode || !cartNode.contains(event.target)){
                this.setState({
                    showCart: false
                })
                event.stopPropagation();
            }
        } 
    }
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    render(){
        let cartItems;
        cartItems = this.state.cart.map(product =>{
			return(
				<li className="cart-item" key={product.name}>
                    <div className="container cardEffect">
                    <div className="row">
                        <div className="col">
                        <img className="product_image" src={product.image} alt="productimage" />
                        </div>
                        <div className="col price">
                        <p >{product.name}</p>
                        <p >Rs:{product.price}</p>
                    </div>
                    <div className="col desc">
                        <p >Quantity:{product.quantity} {product.quantity > 1 ?"Nos." : "No." } </p>
                        <p>Total:{product.quantity * product.price}</p>
                    </div>
                    <div className="col">
                    <a  onClick={this.props.removeProduct.bind(this, product.id)}>×</a>
                    </div>
                    </div>
                    </div>
                </li>
			)
		});
        let view;
        if(cartItems.length <= 0){
            view =<div className="empty-cart">
            <img className="empty-cartimage"src={emptycart} alt="empty-cart"/>
        </div>
		} else{
			view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items">{cartItems}</CSSTransitionGroup>
		}
        return(
            <header>
                <div className="containerHeader">
                    <div className="logo">
                    <img className="cartlogo" src={logo} alt="Logo"/>
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
                        <a className="cart-icon" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img className="cartpic" src={shoppingCarrt} alt="Cart"/>
                            {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" }
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                            <CartScrollBar>
                                {view}
                            </CartScrollBar>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;

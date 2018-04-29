import React, {Component} from 'react';
import './productstyle.css'
import Counter from '../counter/Counter'
class Product extends Component {
    render () {
        return(
            <div className="product">
                  <div className="product-image">
                <img className="img"src={this.props.imageData['image']}/>
                </div>
                <div className="product-name">
                   <p> {
                        this.props.imageData['name']
                    }
                    </p>
                </div>
                <div className="product-price">
                    <p>Rs:{this.props.imageData['price']}</p>
                </div>
                <div class="tocart">
                    <button className="tocartbutton">Add to cart</button>
                    </div>
                <Counter productQuantity={1} updateQuantity={this.props.updateQuantity} resetQuantity={this.resetQuantity}/>
                </div>
        );
    }
}
export default Product;
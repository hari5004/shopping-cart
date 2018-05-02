import React, {Component} from 'react';
import './productstyle.css'
import Counter from '../counter/Counter'
class Product extends Component {
    constructor(props){
		super(props);
        this.state = {
            selectedProduct: {},
            quickViewProdcut: {},
            isAdded: false
        }
    }
    addToCart(image, name, price, id, quantity){
        this.setState({
            selectedProduct: {
                image: image,
                name: name,
                price: price,
                id: id,
                quantity: quantity
            }
        }, function(){
            this.props.addToCart(this.state.selectedProduct);
        })
        this.setState({
            isAdded: true
        }, function(){
            setTimeout(() => {
                this.setState({
                    isAdded: false,
                    selectedProduct: {} 
                });
            }, 3500);
        });
    }
    render () {
        let image =this.props.imageData['image'];
        let name =this.props.imageData['name'];
        let price =this.props.imageData['price'];
        let id=this.props.id;
        let quantity=this.props.quantity;
        return(
            <div className="product">
                <div className="container">
                    <div className="row">
                        <div className="col product-image">
                <img className="img"src={this.props.imageData['image']} alt="productimage"/>
                 </div>
                 </div>
                 <div className="row">
                     <div className="col product-name">
                   <p> {
                        this.props.imageData['name']
                    }
                    </p>
                     </div>
                 </div>
                 <div className="row">
                     <div className="col product-price">
                    <p>Rs:{this.props.imageData['price']}</p>
                     </div>
                 </div>
                   <div className="row">
                       <div className="col">
                       <Counter productQuantity={1} updateQuantity={this.props.updateQuantity} resetQuantity={this.resetQuantity}/>
                            </div>
                       </div> 
                 <div className="row">
                     <div className="col tocart">
                    <button className="btn tocartbutton" onClick={this.addToCart.bind(this, image, name, price, id, quantity)}>Add to cart</button>
                         </div>
                 </div>
                 </div>
                </div>
        );
    }
}
export default Product;
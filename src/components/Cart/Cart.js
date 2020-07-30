import React from 'react';
import './Cart.css'
import { Link } from 'react-router-dom';

const Cart = (props) => {
        const cart = props.cart;
        // console.log(cart)

        // const total = cart.reduce((total, prd) => total + prd.price, 0);  //Total values easier way has given below//
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];
            total = total + product.price;
        }

        let shipping = 0;
        if(total > 35){
            shipping = 0;
        } 
        else if(total > 15){
            shipping = 4.99;
        }
        else if(total > 0){
            shipping = 12.99;
        }

        let tax = Math.round(total / 15);
        //Math round function//
        const formatNumber = (num) => {
            const precision = num.toFixed(2);
            return Number(precision);
        }


    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length} </p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tax + Vat: {tax}</p>
            <p className="total">Total Price: {formatNumber(total + shipping + tax)} </p>
            <br/>
            <Link to='/review'><button className="main-button">Review Order</button></Link>
        </div>
    );
};

export default Cart;
import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import { ORDER_PRODUCTS } from "../utils/urls";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  let [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const navigate = useNavigate()
  const removeCartItem = (cartItem) => {
    setCart([
      ...cart.filter((item) => item.product.id !== cartItem.product.id),
    ]);
  };

  const increase = (cartItem) => {
    setCart(
      cart.map((item) => {
        if (item.product.id === cartItem.product.id) {
          item.count += 1;
        }
        return item;
      })
    );
  };
  const decrease = (cartItem) => {
    if (cartItem.count <= 1) {
      return removeCartItem(cartItem);
    } else {
      setCart(
        cart.map((item) => {
          if (item.product.id === cartItem.product.id) {
            item.count -= 1;
          }
          return item;
        })
      );
    }
  };


  const createOrderProducts = item =>{
    axios.post(ORDER_PRODUCTS, {
      data:{
        product: item.product,
        amount: item.count, 
        total: item.product.attributes.price * item.count
      }
    })
    .then (res=>navigate (`/order/${res.data.data.id}/${item.count}`))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    localStorage.setItem('cart' , JSON.stringify(cart))
  }, [cart])



  return (
    <Layout>
      <div className="section">
        <div className="container">
          {!cart || cart.length === 0 ? (
            <h1 className="title is-1 has-text-danger has-text-centered">
              Empty cart
            </h1>
          ) : (
            cart.map((cartItem) => (
              <div className="box" key={cartItem.product.id}>
                <div className="columns is-12 is-flex is-align-items-center">
                  <div className="column is-2 is-clickable">
                    <img
                      alt="Placeholder image"
                      src={`http://localhost:1337${cartItem.product.attributes.image.data.attributes.url}`}
                    />
                  </div>
                  <div className="column is-4 is-clickable">
                    <p className="title is-5">
                      {cartItem.product.attributes.name}
                    </p>
                  </div>
                  <div className="column is-4 is-flex is-align-items-center">
                    <button
                      className="button is-small"
                      onClick={() => decrease(cartItem)}
                    >
                      -
                    </button>
                    <span className="title m-4 is-6">{cartItem.count}</span>
                    <button
                      className="button is-small"
                      onClick={() => increase(cartItem)}
                    >
                      +
                    </button>
                  </div>
                  <div className="column is-flex is-flex-direction-column is-justify-content-center">
                    <button className="button is-success mx-1" onClick={()=> createOrderProducts(cartItem)}>Buy</button>
                    <br />
                    <br />
                    <button
                      className="button is-danger mx-1"
                      onClick={() => removeCartItem(cartItem)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ORDERS, ORDER_PRODUCT } from "../utils/urls";

export default function ConfirmOrder() {
  const params = useParams();
  const navigate = useNavigate();
  const [orderProduct, setOrderProduct] = useState(null);
  const [user] = useState(JSON.parse(localStorage.getItem('user')))
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  useEffect(() => {
    axios
      .get(ORDER_PRODUCT.replace("id", params.productId))
      .then((res) => setOrderProduct(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteOrderProduct = () => {
    axios.delete(ORDER_PRODUCT.replace('id', params.productId))
    .then((res)=>navigate(`/product/${orderProduct.attributes.product.data.id}`))
    .catch(err=> console.error(err))
  }

  const createOrder = e =>{
    e.preventDefault()
    axios.post(ORDERS, {
      data: {
        user: user, address: address, phone: phone, 
        total: +orderProduct.attributes.total, 
        order_products: orderProduct.id
      }
    })
    .then((res) => navigate('/orders'))
    .catch((err) => console.error(err));
  }

  return (
    <Layout>
      <div className="section">
        <div className="columns is-centered">
          <div className="column">
            <div className="box">
              <div className="title has-text-centered">
                Shopping Information
              </div>
              <form className="form" onSubmit={e=>createOrder(e)}>
                <div className="field">
                  <input
                    type="text"
                    id="name"
                    placeholder="Write your name"
                    className="input"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    id="address"
                    placeholder="Write your address"
                    className="input"
                    value={address}
                    onChange={e=>setAddress(e.target.value)}
                  />
                </div>
                <div className="field">
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Write your phone"
                    className="input"
                    value={phone}
                    onChange={e=>setPhone(e.target.value)}
                  />
                </div>
                <button
                  className="button is-fullwidth is-success my-4"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          {orderProduct && (
            <div className="column is-6">
            <div className="box">
              <div className="columns is-flex is-align-items-center">
                <div className="column mt-4">
                  <p className="title is-4 has-text-left mb-6">Product: {orderProduct.attributes.product.data.attributes.name}</p>
                  <p className="subtitle is-size-4 mr-2">
                    <span className="has-text-weight-bold">Price:</span>
                    {orderProduct.attributes.product.data.attributes.price} so'm
                  </p>
                  <p className="subtitle is-size-4 mr-2">
                    <span className="has-text-weight-bold">Amount:</span>x{orderProduct.attributes.amount}
                  </p>
                  <p className="subtitle is-size-4 mr-2">
                    <span className="has-text-weight-bold" >Total:</span>
                    {orderProduct.attributes.product.data.attributes.price * orderProduct.attributes.amount} so'm
                  </p>
                </div>
              </div>
              <button className="button is-rounded is-fullwidth is-danger is-light" onClick={deleteOrderProduct}>Back to {orderProduct.attributes.product.data.attributes.name.slice(0,30)}...
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

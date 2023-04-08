import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ORDERS } from '../utils/urls';

export default function Orders() {

    const [orders, setOrders]=useState([])
    const {username} = JSON.parse(localStorage.getItem('user'))
    
    useEffect(()=>{
        axios.get(ORDERS + `$filters[user][username][$eq]=${username}`)
        .then(res=>setOrders(res.data.data))
        .catch(err=> console.error(err))
    }, [])

   return (
       <Layout>
           <div className="section">
               <div className="container">
                   <div className="title has-text-centered">My recent orders</div>
                   <div className="box">
                       <table className="table is-striped is-fullwidth">
                           <thead>
      <tr>
<th>Order</th>
                             <th>Total</th>
                             <th>Status</th>
</tr>
                           </thead>
                           <tbody>
                            {orders.length ? orders.map(order=>(
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.attributes.total}</td>
                                    <td>pending...</td>
                                </tr>
                            )): (
                                <tr>
                                    <td className='has-text-danger' colSpan={3} align={'center'}>No orders yet</td>
                                </tr>
                            )}
                           </tbody>
                       </table>
                   </div>
               </div>
           </div>
       </Layout>
   );
}
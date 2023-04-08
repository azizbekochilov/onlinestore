import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from "./Product";
import addProduct from "../utils/addProduct"

export default function Products({ products }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ||[]);
    const [count] = useState(1)

    // const addProduct = (product) => {
    //     let hasItem = cart.filter(item => item.product.id === product.id)[0]
    //         if (hasItem) {
    //             setCart([...cart.filter(item => item.product.id !== hasItem.product.id), {
    //                 ...hasItem,
    //                 count: hasItem.count + count
    //             }])
    //             return
    //         }
    //         setCart([...cart,{product,count}])
    //     }   

        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cart))
        }, [cart])


    return (
        <div className="columns is-multiline is-centered">
            {products.length ? products.map(product => (
                <div className='column is-3' key={product.id}>
                    <Product product={product} addProduct={() => addProduct (cart, setCart, product, count)}/>
                </div>
            )) : (
                <h1 className='heading has-text-centered has-text-denger is-size-1'>No products</h1>
            )}
        </div>
    );
}
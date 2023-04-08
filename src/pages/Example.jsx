import React, {useEffect, useState} from 'react';
import axios from "axios";

function Example() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(res => {
                setProducts(res.data.products)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })

    }, [])



    return (
        <div className="section">
            <h1 className="title has-text-centered">
                Work with axios
            </h1>
            {loading ? (
                <div className="has-text-centered">
                    <button className="button is-white is-loading is-large"></button>
                </div>
            ) : (
                <div>
                    {error ? (
                        <h1 className="title has-text-centered has-text-danger">{error}</h1>
                    ) : (
                        <div className="columns is-multiline is-centered"   >
                            {products.map(product => (
                               <div className="column is-3" key={product.id}>
                                   <div className="card">
                                       <div className="card-image">
                                           <div className="image is-4by3">
                                           <img src={product.images[0]} alt=""/>

                                           </div>
                                       </div>
                                       <div className="card-content">
                                           <h1 className="title is-5">{product.title}</h1>
                                           <h1 className="heading has-text-centered">{product.category}</h1>
                                           <br/>
                                           <div className="columns is-justify-content-space-between">
                                               <div className="column">
                                                   <h1 className="title is-6">${product.price}</h1>
                                               </div>
                                               <div className="column is-4">
                                                   <h1 className="tag">{product.brand}</h1>
                                               </div>
                                           </div>
                                           <button className="button is-fullwidth">Buy</button>
                                       </div>
                                   </div>
                               </div>
                            ))}
                        </div>
                    )}
                </div>
            )
            }
        </div>
    );
}

export default Example;
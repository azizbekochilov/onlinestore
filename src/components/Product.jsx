import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({product, addProduct}) {
    return (
        <div className="card" style={{maxWidth: '270px'}}>
            <div className="card-image">
                <Link to={`/product/${product.id}`}>
                    <figure className="image">
                        <img src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                            alt="Placeholder image"/>
                    </figure>
                </Link>
            </div>
            <div className="card-content ">
                <h1 className="heading has-text-centered">{product.attributes.category.data.attributes.title}</h1>
                <div className="media">
                    <div className="media-content">
                        <p className="title is-5"> {product.attributes.name}</p>
                        <div className="columns is-centered mt-3">
                            <div className="column is-10">
                                <div className="title is-6">
                                    {product.attributes.price} so'm
                                </div>
                            </div>
                            <div className="column">
                                <span className="tag is-info is-right">{product.attributes.brand.data.attributes.title}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button 
                    onClick={() => addProduct(product)}
                    className='is-dark button is-outlined is-rounded is-fulliwidth'>
                        Add to card
                    </button>
                </div>
            </div>
        </div>
    )
        ;
}
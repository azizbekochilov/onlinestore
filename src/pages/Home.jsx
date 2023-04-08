import React from 'react';
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BRANDS, CATEGORIES, PRODUCTS } from '../utils/urls';


function Home(props) {

    let isAuthenticated = localStorage.getItem('user') && localStorage.getItem('token')
    let [products, setProducts] = useState([])
    let [brands, setBrands] = useState([])
    let [categories, setCategories] = useState([])


    const load = (url, setState) => {
        axios.get(url)
            .then(res => setState(res.data.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        load(PRODUCTS, setProducts)
        load(BRANDS, setBrands)
        load(CATEGORIES, setCategories)
    }, [])



    if (!isAuthenticated) {
        return <Navigate to={'/sign-in'} />
    } else {
        return (
            <Layout>
                <Navbar brands={brands}
                    categories={categories}
                    setProducts={setProducts}
                    load={() => load(PRODUCTS, setProducts)}
                />
                <div className="section">
                    <Products products={products} />
                </div>
            </Layout>
        );
    }
}

export default Home;
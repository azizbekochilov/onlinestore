import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { ORDER_PRODUCT, PRODUCT } from "../utils/urls";
import { useEffect } from "react";
import axios from "axios";
import { ORDER_PRODUCTS } from "../utils/urls";
import { FaStar } from "react-icons/fa";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const ratingList={
    1: 'bad',
    2: 'ok',
    3: 'good',
    4: 'excellent'
  }

  const [rating, setRating] = useState(null)

  const createOrderProduct =() =>{
    axios.post(ORDER_PRODUCTS,{
      data:{
        product: product,
        amount : 1,
        total: product.attributes.price
      }
    })
    .then(res => navigate(`/order/${res.data.data.id}/1`))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    axios
      .get(PRODUCT.replace("id", params.id))
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <div className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              {product && (
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification has-text-centered">
                      <img
                        src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                        alt="404 not found"
                      />
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification">
                      <div className="title is-4">
                        {product.attributes.name}
                      </div>
                      <div className="subtitle has-text-grey is-spaced">
                        {product.attributes.description}
                      </div>
                      <div className="title is-4 has-text-success">
                        {product.attributes.price} so'm
                      </div>
                      <div className="content">
                        <div className="subtitle is-spaced has-text-weight-bold">
                          Brand:{" "}
                          {product.attributes.brand.data.attributes.title}
                        </div>
                        <button className="button mr-3 is-primary" onClick={createOrderProduct}>Buy</button>
                        <button className="button is-info">Add to card</button>
                        <hr className="dropdown-divider my-3" />
                        <form className="form">
                          <input
                            type="text"
                            className="input my-2"
                            placeholder="Leave your review here"
                          />
                          <div className="has-text-centered">
                            <FaStar
                              object={ratingList}
                              rating={rating}
                              setRating={setRating}
                            />
                          </div>
                          <button
                            className="button is-success is-fullwidth my-2"
                            type="submit"
                          >
                            Submit
                          </button>
                          <Link to="/" style={{ textDecoration: "none" }}>
                            <button className="button is-danger is-fullwidth my-2">
                              Back to main
                            </button>
                          </Link>
                        </form>
                      </div>
                    </article>
                  </div>
                </div>
              )}
              <div className="tile is-parent">
                <article className="tile is-child notification">
                  <div className="content">
                    <div className="title has-text-centered">
                      Reviews of other clients
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

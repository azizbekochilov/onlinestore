import React from 'react';
import {Link} from "react-router-dom";

function NotFoundPage(props) {
    return (
        <div
            className="section is-medium has-background-info-light has-text-centered"
            style={{height: "100vh"}}
        >
           <h1 className="title has-text-danger is-1">404 page is not found</h1>
            <h1 className="has-text-link is-size-5">
                <Link to='/'>Back to <b>home</b> page</Link>
            </h1>
        </div>
    );
}

export default NotFoundPage;
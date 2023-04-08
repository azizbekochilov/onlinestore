import React from 'react';
import Menu from "./Menu";

function Layout({children}) {
    return (
        <div className="columns">
            <div className="column is-2">
                <Menu/>
            </div>
            <div className="column is-10">
                {children}
            </div>
        </div>
    );
}

export default Layout;
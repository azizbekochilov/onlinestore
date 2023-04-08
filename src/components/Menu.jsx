import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Menu() {

    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/sign-in')

    }

    return (
        <aside className="menu p-4 has-text-centered" style={{ height: '1000px' }}
        >
            <Link className="title is-size-3 is-clickable" to='/'>
                Online store
            </Link>
            <div className="menu-label  has-text-weight-bold my-5 is-size-5">
                <div className='is-size-3'>
                    <ion-icon name="person-circle-outline" />
                </div>
                {user.username}
            </div>
            <div className="menu-label ">
                Menu
            </div>
            <ul className="menu-list ">
                <li>
                    <Link to={'/cart'}>Cart</Link>
                </li>
                <li>
                    <Link to={'/orders'}>Orders</Link>
                </li>
                <li>
                    <a onClick={logOut} className='has-text-danger'>Log out</a>
                </li>
            </ul>
        </aside>
    );
}



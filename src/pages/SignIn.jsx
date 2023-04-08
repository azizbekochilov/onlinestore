import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function SignIn(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate= useNavigate()

    const signIn = (e) =>  {
        e.preventDefault()
        axios.post('http://localhost:1337/api/auth/local' , {
            identifier : username, password
        })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', res.data.jwt)
                navigate('/')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="section is-medium">
            <div className="columns is-centered">
                <div className="column is-5">
                    <form className="box has-background-info-light" onSubmit={e => signIn(e)}>
                        <h1 className="title has-text-centered has-text-info">Sign In</h1>
                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter your username"
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                        </div>


                        <div className="has-text-centered is-size-7 my-3">
                            <Link to={'/sign-up'}>
                                I have not already an account. Move to register page
                            </Link>
                        </div>

                        <div className="field">
                            <div className="control">
                                <button className="button is-info is-fullwidth">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default SignIn;
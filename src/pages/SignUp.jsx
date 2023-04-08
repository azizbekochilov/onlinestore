import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

function SignUp(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const navigate = useNavigate()

    const signUp = (event) => {
        event.preventDefault()
        if (password === cPassword) {
            axios.post('http://localhost:1337/api/users', {
                username: username,
                email: email,
                password: password,
                confirmed: true,
                role: 1
            })
                .then(res => navigate('/'))
                .catch(err => console.error(err))
        }
    }

    return (
        <div className="section is-medium">
            <div className="columns is-centered">
                <div className="column is-5">
                    <form className="box has-background-info-light" onSubmit={e => signUp(e)}>
                        <h1 className="title has-text-centered has-text-info">Registration</h1>
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
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
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

                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Confirm your password"
                                    onChange={e => setCPassword(e.target.value)}
                                    value={cPassword}
                                />
                            </div>
                        </div>
                        <div className="has-text-centered is-size-7 my-3">
                            <Link to={'/sign-in'}>
                                I have already an account. Move to login page
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

export default SignUp;
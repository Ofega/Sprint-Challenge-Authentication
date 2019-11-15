import React, {useState} from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const newUser = {
    username: '',
    password: ''
}

const Login = (props) => {
    const [ user, setUser ] = useState(newUser)
    const { username, password } = user;

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseUrl + 'api/auth/login', user)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                props.history.push('/');
            })
            .catch(err => {
                console.log(err)
            })

        setUser(newUser);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange} value={username} placeholder="Type your username here..." />
            </div>

            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={password} placeholder="Type your password here..." />
            </div>

            <button type="submit">Login</button>
        </form>
    )
  
}

export default Login;
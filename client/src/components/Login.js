import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [userLogin, setUserLogin] = useState({
        email: "",
        password:"",
    })

    const changeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]:e.target.value})
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
            .then((res) => {
                console.log(res);
                console.log("User is logged in")
                navigate('/journals/view')
            })
            .catch ((err) => {
                console.log(err);
                console.log(err.response.data)
                setErrors(err.response.data.errors)
            });
    };

return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>
        <h2 style={{ textAlign: 'center'}}>Journey Journal</h2>
        <form onSubmit={loginHandler}>
            <div>
                <input className='form-control' type="email" placeholder= "Email" onChange={changeHandler} value={userLogin.email} name="email"/>
                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </div>
            <div>
                <input className='form-control' type="password" placeholder= "Password" onChange={changeHandler} value={userLogin.password} name="password" />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <br/>
            <div style={{ textAlign: 'center'}}>
                <button>Login</button>
            </div>
        </form>
        <p style={{ textAlign: 'center'}}>Don't have a journal yet?</p>
        <p style={{ textAlign: 'center'}}><span>Make one </span><Link to={`/register`} class="nav-link active" aria-current="page">here.</Link></p>
        </div>
        <br/>
    </div>
  )
}

export default Login
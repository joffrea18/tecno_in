import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginService, loginServiceId } from '../services';
import { AuthContext } from '../context/AuthContext';
import Button from 'react-button-component';
// import swal from 'sweetalert';
// import Header1 from './usersvalidates/Header1';

const LoginPage = () => {

  const navigate = useNavigate();
  // const { token, user, logOut } = useContext(AuthContext);
  const [ email, setEmail] = useState();
  const [ password, setPassword] = useState();
  const [ error, setError ] = useState();
  const { login } = useContext(AuthContext);
  // const [ id, setId ] = useState();

  const handleForm  = async (e) => {
    e.preventDefault();
    setError('')

    try {
      const token = await loginService({email, password});
      const id = await loginServiceId({email, password});
      // const info = await getUserData({token, id});

      // console.log(token);
      // console.log(info);
      login(token, id)
      console.log(id);
      navigate('/loginuser');
      if (!token) navigate(`/login`);
    } catch (error) {
      setError(error.message)
    }
  }

  
 return (
        <>
        <form onSubmit={handleForm}>
          <fieldset id='login'>
        <h2>Entry to your account</h2>
            <label>
              <input
              name="email"
              type="email"
              required
              placeholder='Email*'
              onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <input
              name="password"
              type="password"
              required
              placeholder='Password*'
              onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {/* <li>Token: {token}</li> */}
            <Button >Login</Button>
            <p>
              ¿You don't have account?
              <br/>
              <Link to="/useregister">Regist</Link>
              <br/>
              <br/>
              <Link to="/">Home</Link>
            </p>
          </fieldset>
          { error ? <p>{error}</p> : null }
        </form>
        </>
    );
}

export default LoginPage;
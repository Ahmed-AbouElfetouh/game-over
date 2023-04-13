import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ getUserData }) {
  const [isLogin, setLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let navigate = useNavigate();

  async function sendData(values) {
    setLogin(true);
    let response = await axios
      .post('https://route-ecommerce.onrender.com/api/v1/auth/signin', values)
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setLogin(false);
      });
    if (response) {
      if (response.data.message === 'success') {
        localStorage.setItem('userTokken', response.data.token);
        getUserData();
        setLogin(false);
        navigate('/home');
      }
    }
  }

  function validate(values) {
    const errors = {};
    let regEmail =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email) {
      errors.email = 'Email is Required !';
    } else if (!regEmail.test(values.email)) {
      errors.email = 'Enter a Vaild Email';
    }

    if (!values.password) {
      errors.password = 'Password is Required !';
    }

    return errors;
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  return (
    <form className="w-75 m-auto p-5" onSubmit={formik.handleSubmit}>
      <h2 className="mb-5">Log in to GameOver</h2>
      <div>
        {errorMsg.length > 0 ? (
          <p className="alert alert-danger">{errorMsg}</p>
        ) : null}
      </div>
      <div>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="form-control my-2"
        ></input>
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : null}
      </div>

      <div>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          name="password"
          placeholder="Enter Your Password"
          className="form-control my-2"
        ></input>
        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">{formik.errors.password}</p>
        ) : null}
      </div>

      {isLogin ? (
        <button className="btn bg-main text-white mt-3">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </button>
      ) : (
        <input
          disabled={!(formik.isValid && formik.dirty)}
          className="btn bg-main text-white mt-3"
          type="submit"
          value="LogIn"
        ></input>
      )}
      <div className="form-footer">
        <p>Not a member yet? </p>
        <Link className="text-decoration-none" to="/register">
          Create Account
        </Link>
      </div>
    </form>
  );
}

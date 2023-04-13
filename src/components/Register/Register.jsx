import axios from 'axios';
import { useFormik } from 'formik';
import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [isLogin, setLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  let navigate = useNavigate();

  async function sendData(values) {
    setLogin(true);
    let response = await axios
      .post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values)
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setLogin(false);
      });
    if (response) {
      if (response.data.message === 'success') {
        setLogin(false);
        navigate('/login');
      }
    }
  }

  function validate(values) {
    const errors = {};
    let regName = /^[a-zA-Z,'.\-\s]*$/;
    let regEmail =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regPhone = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
    let regPassword =
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!values.name) {
      errors.name = 'Name is Required !';
    } else if (!regName.test(values.name)) {
      errors.name = 'Enter a Vaild Name';
    }

    if (!values.email) {
      errors.email = 'Email is Required !';
    } else if (!regEmail.test(values.email)) {
      errors.email = 'Enter a Vaild Email';
    }

    if (!values.phone) {
      errors.phone = 'Phone is Required !';
    } else if (!regPhone.test(values.phone)) {
      errors.phone = 'Enter a Vaild Phone Number';
    }

    if (!values.password) {
      errors.password = 'Password is Required !';
    } else if (!regPassword.test(values.password)) {
      errors.password = 'Enter a Vaild Password';
    }

    if (!values.rePassword) {
      errors.rePassword = 'Re-Password is Required !';
    } else if (values.password !== values.rePassword) {
      errors.rePassword = 'Enter the same Password';
    }

    return errors;
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    validate,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  return (
    <Fragment>
      <form className="w-75 m-auto p-5" onSubmit={formik.handleSubmit}>
        <h2 className="mb-5">Create My Account!</h2>
        <div>
          {errorMsg.length > 0 ? (
            <p className="alert alert-danger">{errorMsg}</p>
          ) : null}
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            className="form-control my-2"
            placeholder='Enter Your Name'
          ></input>
          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger">{formik.errors.name}</p>
          ) : null}
        </div>
        <div>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            className="form-control my-2"
            placeholder='Enter Your Email'
          ></input>
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : null}
        </div>
        <div>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="text"
            name="phone"
            className="form-control my-2"
            placeholder='Enter Your Phone'
          ></input>
          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert alert-danger">{formik.errors.phone}</p>
          ) : null}
        </div>
        <div>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            className="form-control my-2"
            placeholder='Enter Your Password'
          ></input>
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger">{formik.errors.password}</p>
          ) : null}
        </div>
        <div>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            className="form-control my-2"
            placeholder='Repeat Your Password'
          ></input>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger">{formik.errors.rePassword}</p>
          ) : null}
        </div>
        {isLogin ? (
          <button className="btn bg-main text-white">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        ) : (
          <input
            disabled={!(formik.isValid && formik.dirty)}
            className="btn  text-white"
            type="submit"
            value="Submit"
          ></input>
        )}
        <div className='form-footer'>
          <p>Already a member?</p>
          <Link className='text-decoration-none' to='/login'>Log In</Link>
        </div>
      </form>
    </Fragment>
  );
}

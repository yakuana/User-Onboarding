import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const Form = ({ errors, touched, values, handleSubmit, status }) => {
    const [animals, setAnimals] = useState([]);
    console.log(animals);
  
    useEffect(() => {
      console.log('infinite loop?');
      setAnimals([...animals, status]);
    }, [status]);
  
    return (
      <div className="form-container">
        <h1>Sign Up</h1>
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
  
          <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && <p className="error">{errors.email}</p>}

          <Field type="text" name="password" placeholder="Password" />
          {touched.password && errors.password && <p className="error">{errors.password}</p>}
  
          <label className="checkbox-container">
            Terms of Service 
            <Field
              type="checkbox"
              name="terms"
              checked={values.terms}
            />
            <span className="checkmark" />
          </label>
  
          <button type="submit">Submit</button>
        </Form>
      </div>
    );
  };


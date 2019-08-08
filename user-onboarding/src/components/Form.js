import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import UserCard from './UserCard';
// import { TextField } from 'formik-material-ui';

const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
    
    // hook for keeping track of users 
    const [users, setUsers] = useState([]);
    
    // updates users if change has occured 
    useEffect(() => {
        if (status) {
            // change has occured, so update users array 
            setUsers(users => [...users, status])
        }
    }, [status]);
  
    return (
      <div className="form-container">
        <h1>Sign Up</h1>
        <Form className="form">
            
            {/* name */}
            <Field 
                type="text" 
                name="name" 
                placeholder="Name" 
            />
            {touched.name && errors.name && ( <p className="error">{errors.name}</p> )}

            {/* email */}
            <Field type="text" name="email" placeholder="Email"/>
            {touched.email && errors.email && <p className="error">{errors.email}</p>}

            {/* password */}
            <Field 
                type="text" 
                name="password" 
                placeholder="Password" 
            />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}

            {/* role */}
            <Field 
                component="select" 
                name="role"
                >
                <option>Please Choose a Role</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="teaching assistant">Teaching Assistant</option>
            </Field>
            {touched.role && errors.role && <p className="error">{errors.role}</p>}

             {/* gender */}
             <Field 
                component="select" 
                name="gender"
                >
                <option>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="unknown">I'd rather not say</option>
            </Field>
            {touched.gender && errors.gender && <p className="error">{errors.gender}</p>}

            {/* terms of service */}
            <label className="checkbox-container">
                Terms of Service 
                <Field
                    type="checkbox"
                    name="terms"
                    checked={values.terms}
                />
                {/* <span className="checkmark"/> */}
            </label>
            {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}

            {/* bio */}
            <Field
                component="textarea"
                type="text"
                name="bio"
                placeholder="Tell us about yourself..."
            />
           {touched.bio && errors.bio && <p className="error">{errors.bio}</p>}
    
            <button type="submit">Submit</button>
        </Form>

        {users.map(user => (
            <UserCard key={user.id} user={user}/>
        ))}

      </div>
    );
};

// using formik 
const FormikUserForm = withFormik({
    
    // making sure each prop has a default value if given value is undefined 
    mapPropsToValues({ name, email, password, terms, role, bio, gender }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        terms: terms || false,
        role: role || "",
        bio: bio || "", 
        gender: gender || "",
      };
    },
    
    // use yup to enforce input requirements 
    validationSchema: Yup.object().shape({
        name: Yup
        .string()
        .required("Please enter your name"),
        email: Yup
        .string()
        .email("Please enter a valid email")
        .required("Please enter a valid email"),
        password: Yup
        .string()
        .min(8)
        .required("Password must be atleast 8 characters"),
        terms: Yup
        .boolean()
        .oneOf([true], "Must Accept Terms and Conditions"),
        role: Yup
        .string()
        .required(),
        gender: Yup
        .string()
        .required(),
        bio: Yup
        .string()
        .required()
    }),
    
    // update values and set status 
    handleSubmit(values, { setStatus }) {
        axios
            // free api that simulates a post request for any data 
            .post('https://reqres.in/api/users/', values)

            .then(response => {
                // successful 
                console.log("post api response object", response)
                setStatus(response.data);
                console.log("current user", values);
            })

            .catch(error => 
                // unsuccessful 
                console.log("The api is currently down.", error.response)
            );
    }

})(UserForm); // currying functions
  
export default FormikUserForm;
  

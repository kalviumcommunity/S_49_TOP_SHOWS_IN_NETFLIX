// import React, { useState } from 'react';

// import axios from 'axios';

// import './NetflixLoginPage.css';
// // import Cookies from 'js-cookie'

// const NetflixLoginPage = () => {
//     const [values, setValues] = useState({
//         email: '',
//         password: ''
//     });
//     const [errors, setErrors] = useState({});

//     const handleInput = (event) => {
//         const { name, value } = event.target;
//         setValues(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
        
//         try {
//             const response = await axios.post('http://localhost:8801/api/signup');
//             console.log(response);
//             navigate('/');
//         } catch (error) {
//             if (error.isJoi) {
//                 const validationErrors = {};
//                 error.details.forEach(detail => {
//                     validationErrors[detail.path[0]] = detail.message;
//                 });
//                 setErrors(validationErrors);
//             } else {
//                 console.error(error);
//             }
//         }
//     };

//     return (
//         <div id="netflix-login-page">
//             <nav id="netflix-logo">
//                 <a href="#"><img src="https://res.cloudinary.com/da3wjnlzg/image/upload/f_auto,q_auto/v1/web_assets/kkbeb0pkqmhgzkjsuhb2" alt="logo" /></a>
//             </nav>
//             <div className="form-wrapper" id="login-form">
//                 <h2>Sign In</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-control">
//                         <input type="text" name="email" value={values.email} onChange={handleInput} required />
//                         <label htmlFor="email-phone">Email or phone number</label>
//                         {errors.email && <p className="error-message">{errors.email}</p>}
//                     </div>
//                     <div className="form-control">
//                         <input type="password" name="password" value={values.password} onChange={handleInput} required />
//                         <label htmlFor="password">Password</label>
//                         {errors.password && <p className="error-message">{errors.password}</p>}
//                     </div>
//                     <button type="submit" onClick={handleSubmit}>Sign In</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default NetflixLoginPage;



import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'


import './NetflixLoginPage.css';

const NetflixLoginPage = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            Cookies.set("email",values.email)
            localStorage.setItem("email",values.email);
            const response = await axios.post('http://localhost:3000/api/signup', {
                email: values.email, // Fix: Pass email and password as an object
                password: values.password
            });
            console.log(response);
          
            // Optionally, you can redirect the user after successful submission
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="email" value={values.email} onChange={handleInput} required />
                    <label>Email or phone number</label>
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div>
                    <input type="password" name="password" value={values.password} onChange={handleInput} required />
                    <label>Password</label>
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default NetflixLoginPage;

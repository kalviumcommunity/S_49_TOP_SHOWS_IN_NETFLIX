import React from 'react';


class NetflixLoginPage extends React.Component {
    render() {

        const handleInput = (event) => {
            setValues(prev => ({ ...prev, [event.target.name]:[event.target.value]}))
        }
        const handleSubmit = async (event) => {
            event.preventDefault();
            axios.post  ('http://localhost:8801/signup', values)
            .then(res =>
                {
                    console.log(res);
                    navigate('/')
                })
            .catch(err => console.log(err));
        }
        return (
            <div id="netflix-login-page">
                <nav id="netflix-logo">
                    <a href="#"><img src="https://res.cloudinary.com/da3wjnlzg/image/upload/f_auto,q_auto/v1/web_assets/kkbeb0pkqmhgzkjsuhb2" alt="logo" /></a>
                </nav>
                <div className="form-wrapper" id="login-form">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <input type="text" required />
                            <label htmlFor="email-phone">Email or phone number</label>
                        </div>
                        <div className="form-control">
                            <input type="password" required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit">Sign In</button>
                        
                    </form>
                   
                    
                </div>
            </div>
        );
    }
}

export default NetflixLoginPage;

import { useContext } from 'react';
import { loginContext } from '../App';
import '../index.css';

const SignUp = () => {
    const { name, setName, email, setEmail, password, setPassword, setIsSignedUp } = useContext(loginContext);

    const requestSignUp = (event) => {
        let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        event.preventDefault();
        if(email.match(emailRegex) && name && password) {
            setIsSignedUp(true);
            localStorage.setItem('isSignedUp', JSON.stringify(true));
            localStorage.setItem('name', JSON.stringify(name));
            localStorage.setItem('email', JSON.stringify(email));
        } else {
            alert('Either email is not right or other fields are empty')
        }
    }
    return(
        <div>
            <div className='signup-form'>
                <form className='form-field'>
                <div className="form">
                    <h1>Contact</h1>
                    <div className="input-field">
                        <input type="text"
                        className="input-text"
                        placeholder="Name"
                        onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div className="input-field">
                        <input type="email"
                        className="input-text"
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div className="input-field">
                        <input type="password"
                        className="input-text"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type="submit" className="button" onClick={(event) => requestSignUp(event)}>
                        Submit
                    </button>
                </div>
                </form>
            </div>
        </div> 
    )
}
export default SignUp;
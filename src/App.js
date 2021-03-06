import { useState, createContext } from 'react';
import './App.css';
import SignUp from './components/signup';
import Contacts from './components/contacts';

export const loginContext = createContext({});
function App() {
  const [isSignedUp, setIsSignedUp] = useState('');
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <div className="App">
      <loginContext.Provider value = {{name, setName, email, setEmail, password, localStorage, setPassword, isSignedUp, setIsSignedUp}}>
        {!JSON.parse(localStorage.getItem('isSignedUp')) ? <SignUp /> : <Contacts />}
      </loginContext.Provider>
      
    </div>
  );
}
export default App;

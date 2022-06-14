import { useContext, useEffect, useState, useRef } from "react";
import { loginContext } from "../App";
import { FaTrashAlt } from 'react-icons/fa';
const Contacts = () => {
    const { name, email, setIsSignedUp } = useContext(loginContext);
    const [contacts, setContacts] = useState([]);
    const divRef = useRef([]);
    divRef.current = [];
    const [size, setSize] = useState(0);
    const [deletedIndex, setDeletedIndex] = useState();
    const [ startingPoint, setStartingPoint ] = useState(0);
    const requestSignOut = () => {
        setIsSignedUp(false);
    }
    const getPreviousRecord = () => {
        if(startingPoint === 0) {
          alert('No previous page found')
        } else {
            setStartingPoint(startingPoint-10);
        }
      }
      const getNextRecord = () => {
          if(startingPoint+10 >= size) {
            alert('You are at the last page');
          } else {
            setStartingPoint(startingPoint+10);
          }
      }
      const deleteRow = (deleteIndex) => {
        //setDeletedIndex(index);
        let newContactList = contacts.filter((item, index) => index !== deleteIndex)
        setContacts(newContactList);
      }
      const getRef = (element) => {
        if(!divRef.current.includes(element)) {
            divRef.current.push(element);
        }
      }
    useEffect(() => {
        const api = 'https://randomuser.me/api/?inc=name,email,phone&results=100';
        fetch(api).then((res) => {
            return res.json();
        }).then((data) => {
            setSize(data.results.length);
            setContacts(data.results.slice(startingPoint, startingPoint+10));
        })
    }, [startingPoint])
    return (
        <div className="contacts">
            <div className="brandBar">
                <div className="user-detail">
                <div className="detail">{name}</div>
                <div className="detail">{email}</div>
                </div>
                <div>
                    <button className="signout-button" onClick={requestSignOut}>Logout</button>
                </div>
            </div>
            <div className="contacts-content">
                <h3 className="contact-header">Contacts ({size})</h3>
                {contacts &&
                contacts.map((contact, index) => {
                    return(
                        <div className="contacts-data" ref={getRef}>
                            <div className="contacts-info">{contact.name.first} {contact.name.last}</div>
                            <div className="contacts-info">{contact.email}</div>
                            <div className="contacts-info">{contact.phone}</div>
                            <div className="trash contacts-info" onClick={() => {deleteRow(index)}}><FaTrashAlt /></div>
                        </div>
                    )
                })}
                <div className="footer">
                <div className="footer-buttons">
                    <button class="button" onClick={getPreviousRecord}>Previous</button>
                    <button class="button" onClick={getNextRecord}>Next</button>
                </div>
                <div class="page"> Page {(startingPoint/10) + 1} </div>
                </div>

            </div>
        </div>
    )
}
export default Contacts;
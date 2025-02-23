import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import '../component/index.css'

const Contacts = () => {
  const { store, actions } = useContext(Context)

  const handlerGetContact = async () => {
    try {
      await actions.getContacts()

    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    handlerGetContact();
  }, [])

  return (
    <div className='Principal' >
      <div className='lista row' >
        <h3>Contact List:</h3>
        {
          store.contacts.map((item, index) => {
            return (
              <div className='col-12' key={index}>
                  <div className='Borde'>
                  <h6>{item.name}</h6>
                  <p>Adress: {item.address}</p>
                  <p>phone: {item.phone}</p>
                  <p>email: {item.email}</p>
                  </div>
              </div>)

          })

        }
      </div>

    </div>
  )
}

export default Contacts



// const[data,setData]=useState({  
//   name: "",
//   email: "",
//   phone: "",
//   address: "",
//   agenda_slug: "jonathan1"
//   })
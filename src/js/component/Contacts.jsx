import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import '../component/index.css' 
import { useNavigate } from 'react-router'

const Contacts = () => {
  const { store, actions } = useContext(Context) 
  const navigate = useNavigate();

  const handlerGetContact = async () => {
    try {
      await actions.getContacts()

    } catch (error) {
      console.error(error);
    }

  }  

  const editar=()=>{ 
    navigate('/AddNewContact');
}

const fixContact=async (body, id)=>{ 
  
  try{ 
  let editando=await actions.editContact(body,id)  
   if(editando && editando.ok){ 
    editar();
   }else{ 
    alert("No funciono")
   }

}catch (error){ 
  console.error(error) 

}
  }

  const deleteFromList = async(idContact)=>{ 
    try{ 
      await actions.deleteContact(idContact)
    }catch(error){ 
      console.error(error)
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
              <div className='Borde d-flex col-12' key={index}>
                  <div>
                    <img className="" src={'https://cdn.readawrite.com/articles/16480/16479335/thumbnail/small.gif?1'} style={{ height: '200px', width: '200px' }} />
                  </div>
                  <div>
                    <h2>{item.name}</h2>
                    <h5 style={{ color: 'rgb(99, 98, 98)' }}>Adress: {item.address}</h5>
                    <h5 style={{ color: 'rgb(99, 98, 98)' }}>phone: {item.phone}</h5>
                    <h5 style={{ color: 'rgb(99, 98, 98)' }}>email: {item.email}</h5>
                  </div>
                  <div className='images'>
                    <svg className='edit bi bi-pencil-square' onClick={()=>fixContact(item, item.id)}  xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor"  viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                    <svg className='trash bi bi-trash-fill' onClick={()=>deleteFromList(item.id)} xmlns="http://www.w3.org/2000/svg" width="60" height="30" fill="currentColor"  viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>

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
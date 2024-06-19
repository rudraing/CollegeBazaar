import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch=useDispatch()
    const buttonHandler=()=>{
        authService.logout().then(()=>dispatch(logout()))
        .catch((error)=>{
            console.log("authservice.logout throwing this error :",error)
        })
        
    }
  return (
    <button
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded full'
        onClick={buttonHandler}
    >
        Logout!!
    </button>
  )
}

export default LogoutBtn

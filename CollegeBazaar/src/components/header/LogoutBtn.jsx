import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch=useDispatch()
    const buttonHandler=()=>{
        authService.logout().then(()=>dispatch(logout()))
        .catch((error)=>{
            throw error
        })
        
    }
  return (
    <button
        className='inline-block px-6 py-2 duration-200 hover:bg-yellow-800 rounded full  border m-2'
        onClick={buttonHandler}
    >
        Logout!!
    </button>
  )
}

export default LogoutBtn

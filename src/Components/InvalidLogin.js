import React, { useEffect } from 'react'
import Login from './Login'
import { useNavigate } from 'react-router-dom'
const InvalidLogin = () => {
    let navigate = useNavigate();
    useEffect(()=>{
        alert("Please Login")
        return navigate('/')
    },[])
  return (
    <div></div>
  )
}

export default InvalidLogin
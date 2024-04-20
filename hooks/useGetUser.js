import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default useGetUser = () =>{
    const userData = useSelector((state)=> state.reducer)
    const [userProfile,setUserProfile]= useState(null)

    useEffect(()=>{
      setUserProfile(JSON.parse(userData))
    },[userData])

    return userProfile
}

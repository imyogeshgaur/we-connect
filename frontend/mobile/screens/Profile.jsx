import React from 'react'
import * as SecureStore from 'expo-secure-store';

const Profile = async() => {
  const token = await SecureStore.getItemAsync("token");
  console.log(token)
  return (
    <>
        
    </>
  )
}

export default Profile
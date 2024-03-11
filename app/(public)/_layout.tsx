import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack screenOptions={{headerShown:false, animation:"slide_from_right"}}>
        <Stack.Screen options={{title:"Public Login Page"}} name='Login'/>
        <Stack.Screen options={{title:"Public Reset Page"}} name='ResetPw'/>
    </Stack>
  )
}

export default Layout
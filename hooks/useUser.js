import React, { useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { ID_TOKEN_KEY } from '../config'
const useUser = () => {
    const [user, setUser] = useState({
        isSet: false
    })

    SecureStore.getItemAsync(ID_TOKEN_KEY).then(res => {
        setUser({ isSet: true, ...JSON.parse(res) })
    })
    return user
}

export default useUser
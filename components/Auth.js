import React from 'react';
import { View, Alert, Button } from 'react-native';
import PropTypes from 'prop-types'
import * as Random from 'expo-random'
import * as SecureStore from 'expo-secure-store'
import jwtDecoder from 'jwt-decode'
import queryString from 'query-string'
import * as config from '../config'
import { AuthSession } from 'expo';


const generateNonce = async () => {
    const nonce = String.fromCharCode.apply(null, 
        await Random.getRandomBytesAsync(16))

    await SecureStore.setItemAsync(config.NONCE_KEY, nonce)
    return nonce
}

const Auth = ({ onLogIn }) => {

    const decodeToken = async token => {
        const decodedToken = jwtDecoder(token)
        const { nonce, sub, email, name, exp } = decodedToken

        const storedNonce = await SecureStore.getItemAsync(config.NONCE_KEY)
        if(nonce === storedNonce) {
            SecureStore.setItemAsync(config.ID_TOKEN_KEY, JSON.stringify({
                id: sub, 
                email, 
                name, 
                exp, 
                token
            })).then(onLogIn)
        }else {
            Alert.alert('error', 'nonces is different')
            return;
        }

    }

    const handleLoginPress = async () => {

        const nonce = await generateNonce()
        AuthSession.startAsync({
            authUrl: `${config.AUTH_DOMAIN}/authorize?` + 
            queryString.stringify({
                client_id: config.AUTH_CLIENT_ID,
                response_type : 'id_token',
                scope: 'openid profile email',
                redirect_url: AuthSession.getRedirectUrl(),
                nonce
            })
        }).then(result => {
            if(result.type == 'success') {
                decodeToken(result.params.id_token)
            }else if(result.params && result.params.error) {
                Alert.alert('error', result.params.error_description || "something went terribly wrong!")
            }
        })
    }

    return (<View>
            <Button onPress={handleLoginPress} title="Log in!"></Button>
         </View>)
}

Auth.propTypes = {
    handleLoginPress: PropTypes.func
};

export default Auth
import React from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types'

const Auth = ({ onLogIn }) => {
    return (<View>
            <Button onPress={onLogIn} title="Log in!"></Button>
         </View>)
}

Auth.propTypes = {
    onLogIn: PropTypes.func
};

export default Auth;
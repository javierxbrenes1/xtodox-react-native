import React from 'react';
import PropTypes from 'prop-types'
import {View, Text, Button} from 'react-native';

const Main = ({ onLogOut }) => {

    return (<View>
        <Text>
            hey, I am log in
        </Text>
        <Button onPress={onLogOut} title="Close session"></Button>
    </View>)
}

Main.propTypes = {
    onLogOut: PropTypes.func
}


export default Main;
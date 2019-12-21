import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { ID_TOKEN_KEY } from '../config'
import Constants from 'expo-constants'
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components'
import { mapping, dark as darkTheme } from '@eva-design/eva'

const Main = ({ onLogOut }) => {

    const localLogOut = () => {
        SecureStore.deleteItemAsync(ID_TOKEN_KEY).then(onLogOut);
    }

    return (
    <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <Layout style={styles.mainLayout}>
            <Button style={{margin: 10, flex: 1}} onPress={localLogOut}>Close session</Button>
           <Button style={{margin: 10, flex: 1}} onPress={localLogOut}>more things</Button>
          
            
        </Layout>
    </ApplicationProvider>)
}

Main.propTypes = {
    onLogOut: PropTypes.func
}

const styles = StyleSheet.create({
    mainLayout: {
       // padding: 16,
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'center',
        //alignItems: 'flex-end'
        
        //justifyContent: 'center'
       width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})


export default Main;
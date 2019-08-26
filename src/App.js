import React, {Component} from 'react';
import {Text,View} from 'react-native';
import {CardSection,Header,Button,Spinner} from './components/common';
import FBSDK ,{LoginManager} from 'react-native-fbsdk';


class App extends Component{
    loginFacebook(){
        LoginManager.logInWithPermissions(['public_profile'])
        .then(function(result){
            if(result.isCancelled){
                alert('Login is Canceled')
            }
            else{
                console.log('Login is Sucessful: '+result.grantedPermissions.toString())
                alert('Login is Sucessful: '+result.grantedPermissions.toString())
            }
        },
        function(error){
            console.log('error: '+error)
            alert('Login is Failed: '+error)
        } )
    }

    render(){
        return(
            <View>
                <CardSection>
                <Button onPress={this.loginFacebook}>facebook Login</Button>
                </CardSection>
            </View> 
        );
    }
}
const styles={
    spinnerStyle:{
        flex: 1,
        marginTop:240,
        justifyContent: 'center',
        alignItems:'center'
    }
}

export default App;
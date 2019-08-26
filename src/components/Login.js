import React , {Component} from 'react';
import {Text,View,ToastAndroid} from 'react-native';
import {Card,CardSection, Button, Input,Spinner} from './common'
import firebase from 'firebase';



class login extends Component{
   
    state= {email:'',password:'',error:'',loading:false};

    onButtonPress(){ 
        this.setState({error:'', loading:true});
        const {email,password} = this.state;
        
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoadingSucess.bind(this))
            .catch(()=>{
                firebase.auth().createUserWithEmailAndPassword(email,password)
                .then(this.onLoadingSucess.bind(this))
                .catch(this.onLoadingFail.bind(this));
            });
      
      
    }

    onLoadingSucess(){
        this.setState({email:'', password:'',loading:false,error:''})
    }

    onLoadingFail(){
        this.setState({error:'Authentication Fail' ,loading:false})
    }

    renderButton(){
        if(this.state.loading){
            return(<Spinner size='small'></Spinner>);
        }
        return( 
        <Button onPress={this.onButtonPress.bind(this)}>
        LOG IN
        </Button>);
    }
    
    
    render(){
        return(
        <View style={styles.spinnerStyle}>
            <Card>
            <CardSection>
                <Input
                    placeholder={'user@gmail.com'}
                    value={this.state.email}
                    onChangeText={ text => this.setState({email: text}) }
                    label={'Email'}/>
            </CardSection>
              
            <CardSection>
            <Input
                    secureTextEntry
                    placeholder={'*******'}
                    value={this.state.password}
                    onChangeText={ text => this.setState({password: text}) }
                    label={'Password'}/>
            </CardSection>
               
            <Text style={styles.textStyle}>
               {this.state.error}
           </Text>

            <CardSection>
               {this.renderButton()}
            </CardSection>

        </Card>
        </View>
        );
        
    }
}

const styles={
    textStyle:{
        fontSize:17,
        color:'red',
        alignSelf:'center'
    },
    spinnerStyle:{
        
        marginTop:100,
        
    }
}


export default login;
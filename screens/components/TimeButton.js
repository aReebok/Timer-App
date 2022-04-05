import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, 
    ImageBackgroundBase, Alert, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper'
import LogFormModal from './LogFormModal'

export class TimeButton extends Component {   
    constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
          snackbarVisible: false,
          snackMsg:'',
          pressed: this.props.pressed,
          
          //prev infor
          prevTime: null,
          prevStart: null,
          prevTitle: "No title",
          prevDescrip: "No descriptions",
          prevTag: "other",

          //url: 'http://192.168.1.214:3001',
          url: 'http://10.42.58.114:3001',
          formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
        };
     
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });   
    }

    handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(this.state.url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
                console.log("Logging time posted")
            })
            .catch((error) => {
                console.error(error);
            });
      } // 

      logActivity = (title, descrip, tag) => {
        const { user } = this.props;
        this.setState({
            prevTitle: title,
            prevDescrip: descrip,
            prevTag: tag,
        });
        this.handlePress('activity/log', 'POST', {
            headers: {
                "Content-type": this.state.formContentType
            }, 
            body: `mid=${`${user.id}`}&date=${this.state.prevStart}&duration=${this.state.prevTime}&title=${title}&descrip=${descrip}&tag=${tag}`
        });   
        console.log("Activity LOGGED in logform modal");

        this.props.addToLog(title);
        this.setState({snackMsg: 'Log saved in database!'});
        this.setState( state => ({ snackbarVisible: true }) ); 
      }
      

      handlePressStop = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(this.state.url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
                try {
                    const json_resp = JSON.parse(responseText);
                    const start = Date.parse(json_resp.start);
                    const stop = new Date();
    
                    const minute = 1000;
                    const seconds = Math.round((stop - start)/(minute));
                    console.log(`Log was: ${seconds} seconds.`)
                    this.setModalVisible(true)
                    this.saveLog()
                    // Alert.alert("Logging stopped! Please confirm the time.", `${seconds} seconds`,
                    // [
                    //     {
                    //         text: "Cancel",
                    //         onPress: () => this.cancleRequest(),
                    //         style: "cancel",
                    //     },{
                    //         text: "Confirm",
                    //         onPress: () => this.saveLog(),
                    //         style: "cancel",
                    //     },
                    // ]);
                
                    console.log(seconds);
                    this.setState({prevTime: seconds});
                    this.setState({prevStart: json_resp.start})
                } catch (error) {
                        console.log(error);
                }                
            })
            .catch((error) => {
                console.error(error);
            });
      }

    startLogging(){
        this.setState({snackMsg: 'Logging started!'});
        this.setState( state => ({ snackbarVisible: true }) );
        
        // Alert.alert("Logging started!");
        this.setState({ pressed: true });
        const { user } = this.props;
        const start = new Date();
        // POST request in db with user.id and start time
        const r = this.handlePress('activity', 'POST', {
            headers: {
                "Content-type": this.state.formContentType
            }, 
            body: `mid=${user.id}&start=${start}`
        });   
        console.log("Logging posted");
    }  

    stopLogging(){
        this.setState({ pressed: false }); 
        this.setState({ snackMsg: 'Logging stopped!' })
        
        const { user } = this.props;

        // put request to db to get activity start time
        this.handlePressStop('activity', 'PUT', {
            headers: {
                "Content-type": this.state.formContentType
            }, 
            body: `mid=${user.id}`
        });
        this.setState( state => ({ snackbarVisible: true }) );
    }

    saveLog() {
        const { user } = this.props;
        // Alert.alert("Log time saved!");
        this.handlePress('activity', 'DELETE', {
            headers: {
                "Content-type": this.state.formContentType
            }, 
            body: `mid=${user.id}`
        });
    }

    cancleRequest(){
        if (!this.state.pressed) {
            Alert.alert("Logging cancled!");
            const { user } = this.props;
    
            this.handlePress('activity', 'DELETE', {
                headers: {
                    "Content-type": this.state.formContentType
                }, 
                body: `mid=${user.id}`
            });
        }
    }   

    handleStopButton(){
        this.setState( state => ({ snackbarVisible: false }) );
        Alert.alert(
            "Stop logging...",
            "Are you sure you'd like to stop logging time?",
            [
                {
                    text: "Cancel",
                    onPress: () => this.cancleRequest(),
                    style: "cancel",
                },{
                    text: "Confirm",
                    onPress: () => this.stopLogging(),
                    style: "cancel",
                 },
            ]);
    }

    handleStartButton(){
        this.setState( state => ({ snackbarVisible: false }) );
        this.startLogging();
    }

    render(){   
        const { snackbarVisible, modalVisible } = this.state;  
        const { user, pressed } = this.props;

        console.log("pressed from timebutton.js:" + pressed)
        return(
            <View style={styles.container}>  
                <LogFormModal visible={this.state.modalVisible} 
                    setModalVisible={this.setModalVisible} logActivity={this.logActivity}  user={user}
                    prevTime={this.state.prevTime} prevStart={this.state.prevStart}/>
                <View style={[styles.view, {marginTop: -15, paddingLeft: 50}]}> 
                    <TouchableOpacity
                        onPress={()=>{{ this.state.pressed ? this.handleStopButton() : this.handleStartButton()} }}
                        style={ this.state.pressed ? styles.buttonPressed : styles.button }>
                        <Text style={styles.buttonText}>
                            { this.state.pressed ? "STOP" : "START"}
                        </Text>
                        </TouchableOpacity>
                </View>              
                <View style={[styles.view, {flex: 2, paddingTop: 45}]}>
                    <Snackbar
                        visible={this.state.snackbarVisible}
                        onDismiss={() => this.setState({ snackbarVisible: false })}
                        action={{
                            label: 'Okay!',
                            onPress: () => {
                            // Do something
                            },}}
                        style={{backgroundColor: "white"}}>
                        <View style={{paddingRight: -300}}><Text>{this.state.snackMsg}</Text></View>
                    </Snackbar>
                </View>
                        
                        
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingRight: 200,
        justifyContent: 'center',
    },
    view: {
        flex: 1,
    },
    button: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor:'#5B8',
    },
    buttonPressed: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor:'#F46036',
    },
    buttonText:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonTextPressed:{
        color: '#5B85AA',
        fontSize: 20,
        fontWeight: 'bold',

    },
});

export default TimeButton;
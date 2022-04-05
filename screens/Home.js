import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import styles from './styles/Home.style';

// components
import TimeButton from './components/TimeButton';
import LoggedActivity from './components/LoggedActivity';

export class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            logActivities: [],
            url: 'http://10.42.58.114:3001',
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
        }; 
    }
    

    addToLog = (title) => {
        this.setState({logActivities: [...this.state.logActivities, title]});
    }


    render () {
        const { user, pressed } = this.props.route.params;

        return (
            <View style={styles.container}>
                <View style={styles.homeHeader}>
                    <Text style={styles.title}>
                        WELCOME, {user.givenName.toUpperCase()}!</Text>
                    <Text style={styles.subtext}>
                        This is a simple single page prototype to test some timer functionlaities that will be for regular logging in the Proejct Friendhship App. Click on the button below to start timing!
                    </Text>       
                </View>
                <View style={[styles.homeBody,{backgroundColor: '#5B85AA'}]}>
                    <TimeButton user={user} pressed={pressed}
                            addToLog={this.addToLog}/></View>
                <View style={styles.homeFooter}>
                    <View style={styles.homeFooter2}>
                        <Text style={[styles.title, {color: '#19895a', fontWeight: 'bold'}]}>TIME LOG</Text>     
                        <ScrollView style={styles.homeFooterLogHolder}>
                        {/* <Text style={[styles.subtext, {color: '#2a597b'}]}>
                            </Text> */}
                            {
                                this.state.logActivities.map((item, index) => {
                                    // console.log(`${item}`)
                                    return <LoggedActivity key={index} 
                                    text={`${item}`}/>
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}


export default Home;
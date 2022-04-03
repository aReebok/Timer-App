import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function LoggedActivity (props) {
    const colorPalette = {
        red: 'red',
        green:'green',
        purple: '#efbbff',
    }
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.activtyTitle}>
                        {props.text.toUpperCase()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 70,
        width: '100%',
        marginBottom: 15,
        backgroundColor: 'green',
        borderRadius: 7,
    },
    container2: {
        flex: 1,
        height: '100%',
        padding: 10,
        marginLeft: 7,
        backgroundColor: 'lightgray',
        borderRadius: 7,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
    },
    activtyTitle: {
        color: 'black',
        fontWeight: 'bold'
    },
    // activityTime: {},
    // activityDesc: {}
});
export default LoggedActivity;
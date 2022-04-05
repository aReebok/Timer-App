import React, { Component } from 'react';
import { View, Text, Modal, Picker, StyleSheet, Button, 
    ImageBackgroundBase, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

import TimeFormStyle from '../styles/TimeForm.style';


export class LogFormModal extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            desc: null,
            pickedTag: 'other',
        }
    };

    setSelectedValue = (pickedTag) => this.setState({pickedTag});

    render () {
        const { visible, user, prevTime, prevStart } = this.props;
        return(
            <Modal visible={visible}
                animationType='slide'
                transparent={false}
                presentationStyle='formSheet'>
                <View>
                    <Text>
                        {'\n\t'}Save log form, duration: {prevTime} seconds. {'\n\t'}{prevStart}
                    </Text>

                    <TextInput value={this.state.title} 
                        label='Title'
                        maxLength ={30}
                        mode="outlined"
                        placeholder="Title for activity..." 
                        onChangeText={title => this.setState({title})}/>
                    <TextInput value={this.state.desc} 
                        label='Description'
                        mode="outlined"
                        maxLength ={200}
                        placeholder="A few words to describe?" 
                        onChangeText={desc => this.setState({desc})}/>
                    <Picker
                        selectedValue={this.state.pickedTag}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}>
                        <Picker.Item label="Chat Time" value="chat" />
                        <Picker.Item label="Homework" value="hw" />
                        <Picker.Item label="Other" value="other" />

                    </Picker>
                    <Button
                        title='SAVE'
                        onPress={()=> {
                            Alert.alert(
                                "SAVE logging...",
                                "Are you sure you sure you're done making changes? You won't be able to change it at a later time!",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log('Request to save cancled'),
                                        style: "cancel",
                                    },{
                                        text: "Confirm",
                                        onPress: () => {
                                            console.log('Request to save..');
                                            this.props.logActivity(this.state.title, this.state.desc, this.state.pickedTag);
                                            this.props.setModalVisible(false);
                                        },
                                        style: "cancel",
                                     },
                                ]);
                        }}
                    />
                    <Button
                        title='Discard'
                        onPress={()=> {
                            Alert.alert(
                                "DISCARD logging...",
                                "Are you sure you'd like to DELETE your progress?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log('Request to discard cancled'),
                                        style: "cancel",
                                    },{
                                        text: "Confirm",
                                        onPress: () => {
                                            console.log('Request to save discarded...');
                                            this.props.setModalVisible(false);
                                        },
                                        style: "cancel",
                                     },
                                ]);
                        }}
                    />
                </View>
            </Modal>
        );
    }
}

export default LogFormModal;
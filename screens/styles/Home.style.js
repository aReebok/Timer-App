import { StyleSheet } from 'react-native';

//dark blue 2a597b

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
    }, 

    homeHeader: {
        // flex: 2,
        padding: 40,
        paddingBottom: 20,
        backgroundColor: '#5B85AA',
    },
    homeBody:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // paddingHorizontal: '37.5%',
        justifyContent: 'space-between',
    },

    homeFooter: {
        flex: 4,
        paddingTop: 15,
        paddingBottom: 20,
        backgroundColor: '#5B8',
    },
    homeFooter2: {
        flex: 4,
        paddingHorizontal: 20,
        paddingVertical:20,
        backgroundColor: '#f9f9f9',
    },
    homeFooterLogHolder:{
        flex: 4,
        flexDirection: 'column',
        marginTop: 10,
        backgroundColor: '#f9f9f9',
    },

    // BUTTON STYLE
    button: {
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

    // TEXT STYLES
    title: {
        paddingHorizontal:10, 
        fontSize:20, 
        color: 'white',
    },
    subtext: {
        paddingTop: 5,
        paddingHorizontal:10, 
        fontSize:13.5, 
        fontWeight: 'bold',
        color: 'white',
    },  
});

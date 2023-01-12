import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        borderRadius: "9px",
        backgroundColor: "rgb(212, 111, 93)",
        width: "90%",
        height: "66%",
        marginTop: "6rem",
        marginLeft: "1rem"
    },
    heading: {
        fontSize: "30px",
        textAlign: "center",
        marginBottom: "1rem",
    },
    inputs: {
        border: "1px solid white",
        backgroundColor: "white",
        marginRight: "0.2rem",
        marginLeft: "0.2rem",
        borderRadius: "3px",
        height: 30,
        outlineStyle: 'none'
    },
    subhead1: {
        marginLeft: "0.2rem",
        marginBottom: "1rem",
        color: "black"
    },
    subhead2: {
        marginLeft: "0.2rem",
        marginBottom: "1rem",
        marginTop: "1rem",
        color: "black"
    },
    button: {
        marginTop: "2rem",
        backgroundColor: "red",
        padding: "0.3rem",
        marginLeft: "0.2rem",
        marginRight: "0.2rem",
        borderRadius: "3px",
        height: 30
    },
    button2: {
        marginTop: "1rem",
        backgroundColor: "rgb(212, 111, 93)",
        padding: "0.3rem",
        marginLeft: "0.2rem",
        marginRight: "0.2rem",
        borderRadius: "3px",
        height: 30
    }
});
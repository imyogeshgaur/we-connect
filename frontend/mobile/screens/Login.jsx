import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

const Login = ({ navigation }) => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const SignUpUser = async () => {
        navigation.navigate("Sign Up")
    }
    const LoginUser = async () => {
        try {
            const res = await fetch("http://localhost:5000/users/login", {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data === "Invalid Credentials !!!") {
                Alert.alert("Oops :(", "Invalid Credentials !!!")
                setemail("")
                setpassword("")
            } else {
                Alert.alert("Congratulations :)", "Logged In Succesfully !!!")
                navigation.navigate("Home")
                setemail("")
                setpassword("")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <View style={styles.card}>
                <Text style={styles.heading}>Login Here</Text>
                <View>
                    <Text style={styles.subhead1}>Enter Email</Text>
                    <TextInput 
                        style={styles.inputs} 
                        value={email} 
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <Text style={styles.subhead2}>Enter Password</Text>
                    <TextInput style={styles.inputs} secureTextEntry={true} value={password} onChange={(e) => setpassword(e.target.value)} />
                    <TouchableOpacity style={styles.button} onPress={LoginUser}>
                        <Text style={{ color: "white", textAlign: "center" }}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={SignUpUser}>
                        <Text style={{ color: "black", textAlign: "center" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </>
    )
}
const styles = StyleSheet.create({
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
        backgroundColor: "rgb(71, 73, 190)",
        width: "90%",
        height: "55%",
        marginTop: "6rem",
        marginLeft: "1rem"
    },
    heading: {
        fontSize: "30px",
        textAlign: "center",
        marginBottom: "1rem",
        color: "white"
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
        color: "white"
    },
    subhead2: {
        marginLeft: "0.2rem",
        marginBottom: "1rem",
        marginTop: "1rem",
        color: "white"
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
        backgroundColor: "rgb(146, 247, 132)",
        padding: "0.3rem",
        marginLeft: "0.2rem",
        marginRight: "0.2rem",
        borderRadius: "3px",
        height: 30
    }
});

export default Login
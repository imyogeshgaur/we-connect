import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../../GloabalStyle';
import * as SecureStore from 'expo-secure-store';

const Auth = ({ navigation }) => {
    const [email, setemail] = useState("")
    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
    const [authMode, setAuthMode] = useState("signin")
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
    const LoginUser = async () => {
        try {
            const res = await fetch("http://localhost:5000/user/login", {
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
            } else if (data === "No User Found !!!") {
                Alert.alert("Oops :(", "Invalid Credentials !!!")
                setemail("")
                setpassword("")
            }
            else {
                Alert.alert("Congratulations :)", "Logged In Succesfully !!!")
                await SecureStore.setItemAsync("token",data);
                navigation.navigate("Profile")
                setemail("")
                setpassword("")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const SignUpUser = async () => {
        try {
            await fetch("http://localhost:5000/auth/signup", {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, email, password })
            })
            Alert.alert("Congratulations :)", "Sign Up Succesfully !!!")
            setuserName("")
            setemail("")
            setpassword("")
        } catch (error) {
            console.log(error)
        }
    }

    if (authMode === "signin") {
        return (
            <>
                <View style={globalStyles.card}>
                    <Text style={{
                        marginTop: "2rem", 
                        fontSize: "30px",
                        textAlign: "center"
                    }}>Sign In </Text>
                    <View>
                        <Text style={globalStyles.subhead1}>Enter Email or UserName</Text>
                        <TextInput
                            style={globalStyles.inputs}
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <Text style={globalStyles.subhead2}>Enter Password</Text>
                        <TextInput style={globalStyles.inputs} secureTextEntry={true} value={password} onChange={(e) => setpassword(e.target.value)} />
                        <TouchableOpacity style={globalStyles.button} onPress={LoginUser}>
                            <Text style={{ color: "black", textAlign: "center" }}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.button2} onPress={changeAuthMode}>
                            <Text style={{ color: "black", textAlign: "center" }}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.button2} onPress={changeAuthMode}>
                            <Text style={{ color: "black", textAlign: "center" }}>Forget Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar style="auto" />
            </>
        )
    } else {
        return (
            <>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.heading}>Sign Up Here</Text>
                    <View>
                        <Text style={globalStyles.subhead1}>Enter Username </Text>
                        <TextInput 
                            style={globalStyles.inputs}
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        />
                        <Text style={globalStyles.subhead2}>Enter Email</Text>
                        <TextInput
                            style={globalStyles.inputs}
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <Text style={globalStyles.subhead2}>Enter Password</Text>
                        <TextInput style={globalStyles.inputs} secureTextEntry={true} value={password} onChange={(e) => setpassword(e.target.value)} />

                        <TouchableOpacity style={globalStyles.button} onPress={SignUpUser}>
                            <Text style={{ color: "black", textAlign: "center" }}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.button2} onPress={changeAuthMode}>
                            <Text style={{ color: "black", textAlign: "center" }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar style="auto" />
            </>
        )
    }
}
export default Auth
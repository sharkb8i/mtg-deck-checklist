//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Loader';

const LoginScreen = props => {
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        setLoading(true);
        var dataToSend = { user_email: userEmail, user_password: userPassword };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('https://aboutreact.herokuapp.com/login.php', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        }).then(response => response.json())
            .then(responseJson => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status == 1) {
                    AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
                    console.log(responseJson.data[0].user_id);
                    props.navigation.navigate('DrawerNavigationRoutes');
                } else {
                    setErrortext('Please check your email id or password');
                    console.log('Please check your email id or password');
                }
            })
            .catch(error => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../assets/icons/user_icon.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={UserEmail => setUserEmail(UserEmail)}
                                //underlineColorAndroid="#FFFFFF"
                                placeholder="Username or Email" //dummy@abc.com
                                placeholderTextColor="#D2D2D2"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                ref={ref => {
                                    //this._emailinput = ref;
                                }}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    this._passwordinput && this._passwordinput.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={UserPassword => setUserPassword(UserPassword)}
                                // underlineColorAndroid="#FFFFFF"
                                placeholder="Password" //12345
                                placeholderTextColor="#D2D2D2"
                                keyboardType="default"
                                ref={ref => {
                                    //this._passwordinput = ref;
                                }}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                            />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}> {errortext} </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonSignInStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.signInTextStyle}>SIGN UP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonCreateStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text
                                style={styles.registerTextStyle}
                                onPress={() => props.navigation.navigate('RegisterScreen')}>
                                Create an Account!
                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#222222',
        fontFamily: 'Montserrat-SemiBold',
    },
    container: {
        marginTop: 110,
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonSignInStyle: {
        backgroundColor: '#2BC48A',
        height: 50,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 40,
    },
    buttonCreateStyle: {
        backgroundColor: '#222222',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2BC48A',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    signInTextStyle: {
        color: '#222222',
        paddingVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    inputStyle: {
        flex: 1,
        color: '#D2D2D2',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#2BC48A',
        fontStyle: 'italic',
        fontSize: 18,
    },
    registerTextStyle: {
        color: '#2BC48A',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Loader from './Components/loader';

const RegisterScreen = props => {
    let [userName, setUserName] = useState('');
    let [userEmail, setUserEmail] = useState('');
    let [userAge, setUserAge] = useState('');
    let [userAddress, setUserAddress] = useState('');
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userAge) {
            alert('Please fill Age');
            return;
        }
        if (!userAddress) {
            alert('Please fill Address');
            return;
        }
        //Show Loader
        setLoading(true);
        var dataToSend = {
            user_name: userName,
            user_email: userEmail,
            user_age: userAge,
            user_address: userAddress,
        };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch('https://aboutreact.herokuapp.com/register.php', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status == 1) {
                    setIsRegistraionSuccess(true);
                    console.log('Registration Successful. Please Login to proceed');
                } else {
                    setErrortext('Registration Unsuccessful');
                }
            })
            .catch(error => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../assets/icons/verified_icon.svg')}
                    style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
                />
                <Text style={styles.successTextStyle}>Registration Successful.</Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
            <Loader loading={loading} />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../assets/icons/icon.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserName => setUserName(UserName)}
                            underlineColorAndroid="#FFFFFF"
                            placeholder="Enter Name"
                            placeholderTextColor="#F6F6F7"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                this._emailinput && this._emailinput.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserEmail => setUserEmail(UserEmail)}
                            underlineColorAndroid="#F6F6F7"
                            placeholder="Enter Email"
                            placeholderTextColor="#F6F6F7"
                            keyboardType="email-address"
                            ref={ref => {
                                this._emailinput = ref;
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserAge => setUserAge(UserAge)}
                            underlineColorAndroid="#F6F6F7"
                            placeholder="Enter Age"
                            placeholderTextColor="#F6F6F7"
                            keyboardType="numeric"
                            ref={ref => {
                                this._ageinput = ref;
                            }}
                            onSubmitEditing={() =>
                                this._addressinput && this._addressinput.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserAddress => setUserAddress(UserAddress)}
                            underlineColorAndroid="#FFFFFF"
                            placeholder="Enter Address"
                            placeholderTextColor="#F6F6F7"
                            autoCapitalize="sentences"
                            ref={ref => {
                                this._addressinput = ref;
                            }}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}> {errortext} </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
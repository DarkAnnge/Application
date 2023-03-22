import React, { useState, useContext } from "react";
import { StatusBar } from 'expo-status-bar';

import { Formik } from "formik";

//icons
import { Octicons, Ionicons } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    TextLink,
    TextLinkContent,
} from './../components/styles';
import { ActivityIndicator, View } from "react-native";

//colors
const { brand, darkLight, red, green, primary } = Colors;

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// server url
const API_URL = Platform.OS === 'ios'
    ? 'http://localhost:5000'
    : 'http://192.168.10.130:5000';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// token context
import { TokenContext } from './../components/TokenContext';

const Login = (èvtrèjntjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // context
    const { storedToken, setStoredToken } = useContext(TokenContext);
    const { IsAdmin, setIsAdmin } = useContext(TokenContext);

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    if (res.status === 200) {
                        console.log(jsonRes)
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
    }

    const onSubmitHandler = (values, setSubmitting) => {
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    const data = jsonRes.data
                    if (res.status !== 200) {
                        setIsError(true);
                        setMessage(jsonRes.message);
                    } else {
                        onLoggedIn(jsonRes.token);
                        setIsError(false);
                        setMessage(jsonRes.message);
                        console.log(data);
                        persistLogin({ ...data }, jsonRes.message, { ...data });
                    }
                    setSubmitting(false);
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
                setIsError(true);
                setMessage("une erreur s'est produite. vérifiez votre réseau et réessayez");
            });
    };

    const getMessage = () => {
        const status = isError ? `Erreur: ` : `Succès: `;
        return status + message;
    }

    const persistLogin = (token, message, isAdmin) => {
        AsyncStorage.setItem('loginToken', JSON.stringify(token))
            .then(() => { 
                setMessage(message);
                setStoredToken(token);
                setIsAdmin(isAdmin);
            })
            .catch((err) => {
                console.log(err);
                setMessage('Échec de la connexion persistante');
            })
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/images/logo_appli.png')} />
                    <PageTitle>Camping Ômile</PageTitle>
                    <SubTitle>Connexion au compte</SubTitle>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email == '', values.password == '') {
                                setIsError(true);
                                setMessage('Veuillez remplir tout les champs');
                                setSubmitting(false);
                            } else {
                                onSubmitHandler(values, setSubmitting)
                            }
                        }}
                    >{({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        isSubmitting
                    }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Adresse mail"
                                    icon="mail"
                                    placeholder="Adresse mail"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label="Mots de passe"
                                    icon="lock"
                                    placeholder="*  *   *   *   *   *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={isError ? 'FAILED' : 'SUCCESS'}>{message ? getMessage() : null}</MsgBox>
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Connexion</ButtonText>
                                    </StyledButton>
                                )}

                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}
                                <Line />
                                <ExtraView>
                                    <TextLink>
                                        <TextLinkContent>Mots de passe oublié ?</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login;
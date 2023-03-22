import React, { useContext } from "react";
import { StatusBar } from 'expo-status-bar';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
} from './../components/styles';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// token context
import { TokenContext } from './../components/TokenContext';

const Welcome = () => {
    // context
    const { storedToken, setStoredToken } = useContext(TokenContext);
    const { username, email } = storedToken;

    const ClearLogin = () => {
        AsyncStorage
            .removeItem('loginToken')
            .then(() => {
                setStoredToken('');
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/images/background_login.jpeg')} />
                <WelcomeContainer>
                    <PageTitle welcome={true}>Administrateur</PageTitle>
                    <SubTitle welcome={true}>{username || 'username'}</SubTitle>
                    <SubTitle welcome={true}>{email || "mail address"}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/images/logo_appli.png')} />
                        <Line />
                        <StyledButton onPress={ClearLogin}>
                            <ButtonText>Se déconnecter</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;
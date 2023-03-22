import React from 'react';

// Colors
import { Colors } from './../components/styles';
const { primary, tertiary } = Colors;

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Admin from '../screens/Admin';

const Stack = createNativeStackNavigator();

// token context
import { TokenContext } from './../components/TokenContext';

const RootStack = () => {
    return (
        <TokenContext.Consumer>
            {({storedToken, IsAdmin}) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyled: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20,
                            },
                        }}
                        initialRouteName="Login"
                    >
                        {storedToken && IsAdmin ? (
                            <Stack.Screen options={{ headerBackVisible: false }} name='Admin' component={Admin} />
                        ) : storedToken && !IsAdmin ? ( 
                            <Stack.Screen options={{ headerBackVisible: false }} name='Welcome' component={Welcome} />
                        ) : (
                            <Stack.Screen name='Login' component={Login} />      
                        )}
                        
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </TokenContext.Consumer>
        
    )
}

export default RootStack;
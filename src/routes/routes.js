import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import CreateAccount from '../pages/CreateAccount';
import CreateMatch from "../pages/CreateMatch";
import Login from '../pages/Login';
import Matches from "../pages/Matches";
import Players from "../pages/Players";
import Profile from "../pages/Profile";

export default function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="CreateAccount"
                component={CreateAccount}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="Matches"
                component={Matches}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="CreateMatch"
                component={CreateMatch}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="Players"
                component={Players}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
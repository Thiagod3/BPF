import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import CreateAccount from '../pages/CreateAccount';
import CreateMatch from "../pages/CreateMatch";
import FinishMatch from "../pages/FinishMatch";
import Login from '../pages/Login';
import Matches from "../pages/Matches";
import Players from "../pages/Players";
import Profile from "../pages/Profile";
import Team from "../pages/Team";
import CreateTeam from "../pages/CreateTeam";
import Rank from "../pages/Rank/rank";

export default function Routes(){
    return (
        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation:"fade"
                }}
            >
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
                name="FinishMatch"
                component={FinishMatch}
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

            <Stack.Screen 
                name="Team"
                component={Team}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="CreateTeam"
                component={CreateTeam}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="Rank"
                component={Rank}
                options={{ headerShown: false }}
            />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
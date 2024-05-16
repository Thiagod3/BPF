import React from 'react';
import { Alert, BackHandler } from 'react-native';
import { useNavigation, useFocusEffect, useNavigationState } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackHandlerComponent = () => {
  const navigation = useNavigation();
  const routes = useNavigationState(state => state.routes);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        const currentIndex = routes.length - 1;
        const previousRoute = routes[currentIndex - 1]?.name;

        if (previousRoute === 'Login') {
          Alert.alert('Sair', 'Você deseja deslogar?', [
            {
              text: 'Cancelar',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: async () => {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('userId');
                navigation.navigate('Login');
              },
            },
          ]);
          return true; // Intercepta a ação padrão do botão de retorno
        }
        return false; // Permite a navegação normal
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove(); // Remove o listener quando o componente for desmontado
    }, [routes, navigation])
  );

  return null; // Este componente não renderiza nada
};

export default BackHandlerComponent;
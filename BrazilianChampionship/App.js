import React from 'react';
import ClassificationTable from './screens/ClassificationTable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeagueSelectionScreen from './screens/LeagueSelectionScreen';

export default function App() {

	const Stack = createNativeStackNavigator();
    
	return (
	<NavigationContainer>
		<Stack.Navigator>
			{/* <Stack.Screen name="Loading" component={LoadingScreen} options={{title: "Loading"}}/> */}
			<Stack.Screen name="LeagueSelectionScreen" component={LeagueSelectionScreen} options={{title: "Selecione a liga desejada"}}/>
			<Stack.Screen name="ClassificationTable" component={ClassificationTable} options={{title: "Tabela"}}/>
		</Stack.Navigator>
	</NavigationContainer>
  	);
}


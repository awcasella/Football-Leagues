import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ClassificationTable from './screens/ClassificationTable';
import LoadingScreen from './screens/LoadingScreen';
import soccerService from './services/SoccerService'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

	const Stack = createNativeStackNavigator();
    
	return (
    // <View style={styles.container}>
    //   	<StatusBar style="auto" />
	// 	{/* <LoadingScreen/> */}
    //  	{/* <ClassificationTable matches={matches} 
	// 						 name={name}
	// 						 clubs={clubs}
	// 						 searchClubs={searchClubs}
	// 						 temporadaEscolhida={temporadaEscolhida}
	// 						 searchMatches={searchMatches}
	// 						 isCampeonatoBrasileiro={isCampeonatoBrasileiro}
	// 					     styles={styles}/> */}
    // </View>

	<NavigationContainer>
		<Stack.Navigator>
			{/* <Stack.Screen name="Loading" component={LoadingScreen} options={{title: "Loading"}}/> */}
			<Stack.Screen name="ClassificationTable" component={ClassificationTable} options={{title: "Tabela"}}/>
		</Stack.Navigator>
	</NavigationContainer>
  	);
}


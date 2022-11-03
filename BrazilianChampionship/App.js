import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , ScrollView, Image } from 'react-native';
import ClassificationTable from './screens/ClassificationTable';
import soccerService from './services/SoccerService'

export default function App() {

	const [matches, setMatches] = useState([]);
	const [name, setName] = useState(undefined);
	const [clubs, setClubs] = useState([]);
	const [temporadaEscolhida, setTemporadaEscolhida] = useState(2019); 

	useEffect(() => {
		searchMatches(temporadaEscolhida);
		searchClubs(temporadaEscolhida);
	}, [])

	function searchMatches(temporadaEscolhida){
		soccerService.searchMatches(temporadaEscolhida, 'br').then((response)=>{
			setMatches(response["matches"]);
			setName(response["name"]);
		},(error)=>{})
	}

	function searchClubs(temporadaEscolhida){ 
		soccerService.searchClubs(temporadaEscolhida, 'br').then((response)=>{
			setClubs(response["clubs"]);
		},(error)=>{})
	}

	function elementImage (value) {
		return <Image style={{width: 25, height: 25}} source={require('./imgs/sao-paulo.png')}/>
	}
    
	return (
    <View style={styles.container}>
      	<StatusBar style="auto" />
		<ScrollView>
     	<ClassificationTable matches={matches} 
							 name={name}
							 clubs={clubs}
							 searchClubs={searchClubs}
							 temporadaEscolhida={temporadaEscolhida}
							 setTemporadaEscolhida={setTemporadaEscolhida}
							 searchMatches={searchMatches}
						     styles={styles}/>
     	</ScrollView>
    </View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		paddingTop: 60,
	},
	head: {  
		height: 40, 
		backgroundColor: '#f1f8ff',
	},
	wrapper: { 
		flexDirection: 'row',
	},
	title: { 
		flex: 1, 
		backgroundColor: '#f6f8fa',
	},
	row: {  
		height: 28,  
	},
	text: { 
		textAlign: 'center',
	},
	selectSeason: {
		height: '100%', 
		width : '20%', 
		alignItems: 'center',
		marginLeft: 100
	},
	selectRound: {
		height: '100%', 
		width : '20%', 
		alignItems: 'center'
	},
});

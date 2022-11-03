import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View , ScrollView } from 'react-native';
import ClassificationTable from './screens/ClassificationTable';
import soccerService from './services/SoccerService'

export default function App() {

	const [matches, setMatches] = useState([]);
	const [name, setName] = useState(undefined);
	const [clubs, setClubs] = useState([]);
	let isCampeonatoBrasileiro = false;
	const [temporadaEscolhida, setTemporadaEscolhida] = useState(isCampeonatoBrasileiro ? 2019 : '2016-17'); 

	function searchMatches(temporadaEscolhida){ 
		soccerService.searchMatches(temporadaEscolhida, 'en').then((response)=>{
			if(isCampeonatoBrasileiro){
				setMatches(response["matches"]);
			} else {
				setMatches(response["rounds"]);
			}
			setName(response["name"]);
		},(error)=>{
			alert('Deu ruim na busca por jogos chefia: ', error);
		})
	}

	function searchClubs(temporadaEscolhida){ 
		soccerService.searchClubs(temporadaEscolhida, 'en').then((response)=>{
			setClubs(response["clubs"]);
		},(error)=>{
			alert('Deu ruim na busca por times chefia: ', error);
		})
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
							 searchMatches={searchMatches}
							 isCampeonatoBrasileiro={isCampeonatoBrasileiro}
						     styles={styles}/>
     	</ScrollView>
    </View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
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
		padding: 2,
		fontSize: 26,
		paddingBottom: 5,
		textAlign: 'center',
		backgroundColor: '#145A32',
		color: '#FDFEFE'
	},
	selectSeasonTitle: { 
		textAlign: 'center',
		backgroundColor: '#145A32',
		color: '#FDFEFE'
	},
	selectRoundTitle: { 
		textAlign: 'center',
		backgroundColor: '#145A32',
		color: '#FDFEFE'
	},
	seasonAndRoundTitle: { 
		flex: 1, 
		padding: 2,
		backgroundColor: '#145A32',
		color: '#FDFEFE',
		display:'flex', 
		flexDirection:'row',
	},
	row: {  
		height: 28,  
	},
	text: { 
		textAlign: 'center',
	},
	selectSeason: {
		height: '100%', 
		width : '35%', 
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#444',
		marginLeft: 50
	},
	selectRound: {
		height: '100%', 
		width : '20%', 
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#444',
	},
	dropdown1DropdownStyle: {
		backgroundColor: '#EFEFEF'
	},
});

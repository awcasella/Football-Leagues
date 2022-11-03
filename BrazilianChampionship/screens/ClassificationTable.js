import { Row, Rows, Table, TableWrapper } from "react-native-table-component";
import { Text, Image, View, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import reactUtils from "../services/ReactUtils";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import soccerService from '../services/SoccerService';

export default function ClassificationTable() {

	function searchMatches(temporadaEscolhida){ 
		soccerService.searchMatches(temporadaEscolhida, 'en').then((response)=>{
			if(isCampeonatoBrasileiro){
				setMatches(response["matches"]);
			} else {
				setMatches(response["rounds"]);
			}
			setName(response["name"]);
		},(error)=>{
			alert('Deu ruim na busca por jogos, chefia: ', error);
		})
	}

	function searchClubs(temporadaEscolhida){ 
		soccerService.searchClubs(temporadaEscolhida, 'en').then((response)=>{
			setClubs(response["clubs"]);
		},(error)=>{
			alert('Deu ruim na busca por times, chefia: ', error);
		})
	}

    let isCampeonatoBrasileiro = false;
    const numberOfRounds = 38; // If there is 20 clubs, then there is 38 rounds.
    const allSeasons = isCampeonatoBrasileiro ? reactUtils.range(2019, 2020, 1) : reactUtils.rangeMidSeason(2010, 2017, 1);
    const allRounds = reactUtils.range(1, numberOfRounds, 1);

    const tableHead = ['Pos', undefined ,'Time', 'Pts', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG'];   
    const [tableData, setTableData] = useState([]);
    
    const [rodadaEscolhida, setRodadaEscolhida] = useState(numberOfRounds); 
    const [temporadaEscolhida, setTemporadaEscolhida] = useState(allSeasons[0]); 

    const [matches, setMatches] = useState([]);
	const [name, setName] = useState(undefined);
	const [clubs, setClubs] = useState([]);
	

    useEffect(() => {
        searchClubs(temporadaEscolhida);
		searchMatches(temporadaEscolhida);
	}, [])

    useEffect(() => {
        searchClubs(temporadaEscolhida);
		searchMatches(temporadaEscolhida);

        onAtualizar(temporadaEscolhida, rodadaEscolhida);
	}, [temporadaEscolhida, rodadaEscolhida])

    useEffect(() => {
        setRodadaEscolhida(2 * (clubs.length - 1));
        onAtualizar(temporadaEscolhida, rodadaEscolhida);
	}, [matches, name, clubs])


    function buildClassificationTable(){
        let tabelaInicializada = [];
        clubs.forEach((club, index) => {
            tabelaInicializada[index] = {
                nome: club.name,
                pts: 0,
                jogos: 0,
                vitorias: 0, 
                empates: 0, 
                derrotas: 0, 
                golsPro: 0, 
                golsContra: 0, 
                saldoGols: 0, 
            };
        });

        return tabelaInicializada;
    }

    function updateClassificationTableUntilNthRound(round, tabelaAtualizada){
        if(!tabelaAtualizada){
            return;
        }
        for(let rodada = 1; rodada <= round; rodada++){
            let jogosRodadaN = [];
            
            if(isCampeonatoBrasileiro){
                jogosRodadaN = matches.filter(match => match.round === "Rodada " + rodada );
            } else {
                jogosRodadaN = matches.filter(match => match?.name === "Matchday " + rodada )[0]?.matches;
            }
            
            jogosRodadaN?.forEach(jogo => {
                let placarMandate = jogo.score.ft[0];
                let placarVisitante = jogo.score.ft[1];

                let timeMandante = tabelaAtualizada.find(time => time.nome === jogo.team1);
                let timeVisitante = tabelaAtualizada.find(time => time.nome === jogo.team2);

                if(!timeMandante || !timeVisitante){
                    return;
                }

                if(placarMandate > placarVisitante){
                    timeMandante.vitorias++;
                    timeMandante.pts += 3;

                    timeVisitante.derrotas++;
                } else if (placarMandate < placarVisitante){
                    timeMandante.derrotas++;

                    timeVisitante.vitorias++;
                    timeVisitante.pts += 3;
                } else if (placarMandate === placarVisitante) {
                    timeMandante.empates++;
                    timeMandante.pts++;

                    timeVisitante.empates++;
                    timeVisitante.pts++;
                } else {
                    alert('Deu ruim');
                }

                timeMandante.jogos++;
                timeMandante.golsPro += placarMandate;
                timeMandante.golsContra += placarVisitante;
                timeMandante.saldoGols = timeMandante.golsPro - timeMandante.golsContra;

                timeVisitante.jogos++; 
                timeVisitante.golsPro += placarVisitante;
                timeVisitante.golsContra += placarMandate;
                timeVisitante.saldoGols = timeVisitante.golsPro - timeVisitante.golsContra;
            });
        }

        return tabelaAtualizada;
    }

    function jsonArray2Table(tabelaAtualizadaJsonArray){
        tabelaAtualizadaJsonArray.sort((a, b) => {return parseInt(b.pts, 10) - parseInt(a.pts, 10)});

        let tabelaAtualizadaAsTable = [];
        tabelaAtualizadaJsonArray.forEach((time, index) => {
            tabelaAtualizadaAsTable[index] = [index+1, elementImage('../imgs/sao-paulo.png'), time.nome, time.pts, time.jogos, time.vitorias, time.empates, time.derrotas, time.golsPro, time.golsContra, time.saldoGols];
        });
        
        setTableData(tabelaAtualizadaAsTable);
    }

    function elementImage (value) {
		return <Image style={{width: 25, height: 25}} source={require('../imgs/sao-paulo.png')}/>
	}

    function onAtualizar(temporadaSelecionada, rodadaSelecionada){
        
        let tabelaInicializada = buildClassificationTable();
        let tabelaAtualizada = updateClassificationTableUntilNthRound(rodadaSelecionada, tabelaInicializada);
        
        jsonArray2Table(tabelaAtualizada);
    }

    return <View>
        <ScrollView>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.seasonAndRoundTitle}>
                {/* Select season */}
                <Text style={styles.selectSeasonTitle}>Temporada: </Text>
                <SelectDropdown buttonStyle={styles.selectSeason}
                    data={allSeasons}
                    onSelect={setTemporadaEscolhida}
                    defaultButtonText={temporadaEscolhida}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                />

                {/* Select round */}
                <Text style={styles.selectRoundTitle}>Rodada: </Text>
                <SelectDropdown buttonStyle={styles.selectRound}
                    data={allRounds}
                    onSelect={setRodadaEscolhida}
                    defaultValue={numberOfRounds}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                />
            </View>

            {/* Classification table */}
            <Table borderStyle={{ borderWidth: 0 }}>
                
                {/* <Row data={tableHead} flexArr={[1, 1, 6, 1]} style={styles.head} textStyle={styles.text} /> */}
                <Row data={tableHead} flexArr={[1, 1, 7]} style={styles.head} textStyle={styles.text} />
                <TableWrapper style={styles.wrapper}>
                    <Rows data={tableData} flexArr={[1, 1, 7]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>
        </ScrollView>
    </View>
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
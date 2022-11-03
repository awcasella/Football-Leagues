import { Row, Rows, Table, TableWrapper } from "react-native-table-component";
import { Text, Image, View } from 'react-native';
import { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import reactUtils from "../services/ReactUtils";

export default function ClassificationTable({matches, clubs, searchClubs, name, temporadaEscolhida, setTemporadaEscolhida, searchMatches, styles}) {

    const numberOfRounds = 2 * (clubs.length - 1); // If there is 20 clubs, then there is 38 rounds.
    const allSeasons = reactUtils.range(2019, 2020, 1);
    const allRounds = reactUtils.range(1, numberOfRounds, 1);

    const tableHead = ['Pos', undefined ,'Time', 'Pts', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG'];   
    const [tableData, setTableData] = useState([]);
    
    const [rodadaEscolhida, setRodadaEscolhida] = useState(numberOfRounds); 

    // useEffect with a empty list as 2nd arg works like a "constructor"
    useEffect(() => {
        onUpdateTableWithSeason(2019);
    }, []);
    
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
            let jogosRodadaN = matches.filter(match => match.round === "Rodada " + rodada );
            jogosRodadaN.forEach(jogo => {
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

    function onUpdateTableWithSeason(temporadaSelecionada){
        searchMatches(temporadaSelecionada);
        searchClubs(temporadaSelecionada);
        onUpdateTable(rodadaEscolhida);
    }

    function onUpdateTable(rodadaSelecionada){
        let tabelaInicializada = buildClassificationTable();
        let tabelaAtualizada = updateClassificationTableUntilNthRound(rodadaSelecionada, tabelaInicializada);
        jsonArray2Table(tabelaAtualizada);
    }

    return <View>
        <Text>{name}</Text>
        <View style={{display:'flex', flexDirection:'row'}}>
            {/* Select season */}
            <Text>Temporada: </Text>
            <SelectDropdown buttonStyle={styles.selectSeason}
                data={allSeasons}
                onSelect={onUpdateTableWithSeason}
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
            />

            {/* Select round */}
            <Text>Rodada: </Text>
            <SelectDropdown buttonStyle={styles.selectRound}
                data={allRounds}
                onSelect={onUpdateTable}
                defaultButtonText={numberOfRounds}
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
            />
        </View>

        {/* Classification table */}
        <Table borderStyle={{ borderWidth: 0 }}>
            
            {/* <Row data={tableHead} flexArr={[1, 1, 6, 1]} style={styles.head} textStyle={styles.text} /> */}
            <Row data={tableHead} flexArr={[1, 1, 6, 1]} style={styles.head} textStyle={styles.text} />
            <TableWrapper style={styles.wrapper}>
                <Rows data={tableData} flexArr={[1,1,6,1]} style={styles.row} textStyle={styles.text} />
            </TableWrapper>
        </Table>
    </View>
}
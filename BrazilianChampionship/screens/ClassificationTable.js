import { Row, Rows, Table, TableWrapper } from "react-native-table-component";
import { Text, Image } from 'react-native';
import { useEffect, useState } from "react";

export default function ClassificationTable({matches, clubs, name, styles}) {

    const [tabela, setTabela] = useState([]);
    const [tableHead, setTableHead] = useState(['Pos', undefined ,'Time', 'Pts', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG']);   
    const [tableData, setTableData] = useState([]);
    const rodadaAtual = 38;
    const [deveAtualizarTabela, setDeveAtualizarTabela] = useState(false);
    useEffect(() => {
        buildClassificationTable();
    }, []);

    useEffect(() => {
        if(deveAtualizarTabela){
            updateClassificationTableUntilNthRound(rodadaAtual);
            setDeveAtualizarTabela(false);
        } else {
            jsonArray2Table();
            setDeveAtualizarTabela(true);
        }
    }, [tabela]);
    
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

        setTabela(tabelaInicializada);
    }

    function updateClassificationTableUntilNthRound(round){
        let tabelaAtualizada = tabela;
        if(!tabelaAtualizada){
            return;
        }
        for(let rodada = 1; rodada <= round; rodada++){
            let jogosRodadaN = matches.filter(match => match.round === "Rodada "+rodada );
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

        setTabela(tabelaAtualizada);
        // console.log(tabelaAtualizada);
    }

    function jsonArray2Table(){
        let tabelaAtualizadaJsonArray = tabela;
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

    return <Table borderStyle={{ borderWidth: 0 }}>
        <Text>Temporada 2019</Text>
        <Text>Rodada {rodadaAtual}</Text>
        {/* <Row data={tableHead} flexArr={[1, 1, 6, 1]} style={styles.head} textStyle={styles.text} /> */}
        <Row data={tableHead} flexArr={[1, 1, 6, 1]} style={styles.head} textStyle={styles.text} />
        <TableWrapper style={styles.wrapper}>
            <Rows data={tableData} flexArr={[1,1,6,1]} style={styles.row} textStyle={styles.text} />
        </TableWrapper>
    </Table>
}
class ReactUtils{

    // Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP, etc.)
    range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

    rangeMidSeason = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => String(start + (i * step)) + '-' + this.temporadaSeguinte(start, i, step));

    temporadaSeguinte = (start, i, step) => {
        let nextSeason = start - 2000 + ((i+1) * step);
        if(nextSeason < 10){
            return '0' + String(nextSeason);
        }
        return String(nextSeason);
    }

    arrumarDadosPorCampeonato(dadosAnteriores, siglaPais){
        if(siglaPais === 'br'){
            return this.arrumarDadosCampeonatoSulamericano(dadosAnteriores["matches"], 'Rodada');
        } else if(siglaPais === 'en'){
            return this.arrumarDadosCampeonatoEuropeu(dadosAnteriores["rounds"], 'Matchday');
        } else if(siglaPais === 'it'){
            return this.arrumarDadosCampeonatoItaliano(dadosAnteriores["rounds"], 'Giornata');
        } else if(siglaPais === 'es'){
            return this.arrumarDadosCampeonatoEuropeu(dadosAnteriores["rounds"], 'Jornada');
        } else if(siglaPais === 'de'){
            return this.arrumarDadosCampeonatoAlemao(dadosAnteriores["rounds"], 'Spieltag');
        } else if(siglaPais === 'fr'){
            return this.arrumarDadosCampeonatoEuropeu(dadosAnteriores["rounds"], 'Journée');
        } 
    }

    arrumarDadosCampeonatoSulamericano(dadosAnteriores, index){
        
        let rounds = [];
        for (let rodada = 1; rodada <= 38; rodada++){
            let jogosRodadaN = dadosAnteriores?.filter(match => match.round === index + " " + rodada)
            let round = {
                name: 'Rodada ' + rodada, // Nome da rodada e.g. "Rodada 1"
                matches: jogosRodadaN // array de jogos
            }
            rounds.push(round);
        }
        
        return rounds;
    }

    arrumarDadosCampeonatoEuropeu(dadosAnteriores, index){
        
        let rounds = [];
        for (let rodada = 1; rodada <= 38; rodada++){
            let jogosRodadaN = dadosAnteriores?.filter(r => r.name === index + " " + rodada)[0]["matches"];
            
            let round = {
                name: 'Rodada ' + rodada, // Nome da rodada e.g. "Rodada 1"
                matches: jogosRodadaN // array de jogos
            }
            rounds.push(round);
        }
        
        return rounds;
    }

    arrumarDadosCampeonatoAlemao(dadosAnteriores, index){
        
        let rounds = [];
        for (let rodada = 1; rodada <= 34; rodada++){
            let jogosRodadaN = dadosAnteriores?.filter(r => r.name === index + " " + rodada)[0]["matches"];
            
            let round = {
                name: 'Rodada ' + rodada, // Nome da rodada e.g. "Rodada 1"
                matches: jogosRodadaN // array de jogos
            }
            rounds.push(round);
        }
        
        return rounds;
    }


    arrumarDadosCampeonatoItaliano(dadosAnteriores, index){
        
        let rounds = [];
        for (let rodada = 1; rodada <= 38; rodada++){
            let jogosRodadaN = dadosAnteriores?.filter(r => r.name === rodada + "^ Giornata")[0]["matches"];
            
            let round = {
                name: 'Rodada ' + rodada, // Nome da rodada e.g. "Rodada 1"
                matches: jogosRodadaN // array de jogos
            }
            rounds.push(round);
        }
        
        return rounds;
    }
}

const reactUtils = new ReactUtils();
export default reactUtils;
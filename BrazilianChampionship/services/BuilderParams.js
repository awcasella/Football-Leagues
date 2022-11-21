import reactUtils from "./ReactUtils";

class BuilderParams {

    // Brazil
    buildCampeonatoBrasileiroParams(){
        let numberOfTeams = 20;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'br',
            divisaoLiga: 1,
            backgroundColorCampeonato: '#228B22',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.range(2019, 2019, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }

    // England
    buildPremierLeagueParams(){
        let numberOfTeams = 20;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'en',
            divisaoLiga: 1,
            backgroundColorCampeonato: '#A020F0',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2010, 2018, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }

    buildChampionshipParams(){
        let numberOfTeams = 24;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'en',
            divisaoLiga: 2,
            backgroundColorCampeonato: '#A020F0',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2010, 2015, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }

    buildLeagueOneParams(){
        let numberOfTeams = 24;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'en',
            divisaoLiga: 3,
            backgroundColorCampeonato: '#A020F0',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2010, 2015, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }

    buildLeagueTwoParams(){
        let numberOfTeams = 24;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'en',
            divisaoLiga: 4,
            backgroundColorCampeonato: '#A020F0',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2010, 2015, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }

    // Italy
    buildSerieAItalianaParams(){
        let numberOfTeams = 20;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'it',
            divisaoLiga: 1,
            backgroundColorCampeonato: '#0000CD',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2013, 2017, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }

    // Spain
    buildPrimeraDivisionEspanholaParams(){
        let numberOfTeams = 20;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'es',
            divisaoLiga: 1,
            backgroundColorCampeonato: '#FFD700',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2012, 2019, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }

    buildSegundaDivisionEspanholaParams(){
        let numberOfTeams = 22;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'es',
            divisaoLiga: 2,
            backgroundColorCampeonato: '#FFD700',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2012, 2019, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }

    // Germany
    buildBundesligaParams(){
        let numberOfTeams = 18;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'de',
            divisaoLiga: 1,
            backgroundColorCampeonato: '#B22222',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2010, 2019, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }
    
    // France
    buildLigue1Params(){
        let numberOfTeams = 20;
        let numberOfRounds = 2 * (numberOfTeams - 1);
        return {
            siglaPais: 'fr',
            divisaoLiga: 1,
            backgroundColorCampeonato: '#A020F0',
            numberOfRounds: numberOfRounds,
            allSeasons: reactUtils.rangeMidSeason(2014, 2019, 1),
            allRounds: reactUtils.range(1, numberOfRounds, 1),
        };
    }
}

const builderParams = new BuilderParams();
export default builderParams;
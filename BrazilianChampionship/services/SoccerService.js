/**
 * You can make requests to the server to search for teams, matches and rounds with this service.
 */
class SoccerService {

    searchMatches(year, country, division = 1) {
        return fetch(`https:/raw.githubusercontent.com/openfootball/football.json/master/${year}/${country}.${division}.json`).then(resposta => resposta.json());
    }

    searchClubs(year, country, division = 1) {
        return fetch(`https:/raw.githubusercontent.com/openfootball/football.json/master/${year}/${country}.${division}.clubs.json`).then(resposta => resposta.json());
    }

}

const soccerService = new SoccerService();
export default soccerService;
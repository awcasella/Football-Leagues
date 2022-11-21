import builderParams from '../services/BuilderParams'
import { View, Pressable, Text, StyleSheet, ScrollView, Image, StatusBar} from "react-native";

export default function LeagueSelectionScreen({navigation, route}) {

    function onPress(params){
        navigation.navigate('ClassificationTable', params);
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                {/* Brazil */}
                <Text style={styles.text}>Brasil</Text>  
                <View style={[styles.country]}>
                    <Pressable style={[styles.button]}
                            onPress={() => {onPress(builderParams.buildCampeonatoBrasileiroParams())}}>
                        
                        <View style={{ display:'flex', flexDirection:'row'}}>
                            <Text style={styles.text}>Campeonato Brasileiro</Text>

                            <Image style={styles.tinyLogo} source={require('../imgs/brazil.png')}/>
                        </View>
                    </Pressable>
                </View>
                

                {/* England */}
                <View style={[styles.country]}>
                    <Text style={styles.text}>Inglaterra</Text>  
                    <Pressable style={[styles.button]}
                            onPress={() => {onPress(builderParams.buildPremierLeagueParams())}}>
                        
                        <View style={{ display:'flex', flexDirection:'row'}}>
                            <Text style={styles.text}>Premier League</Text>

                            <Image style={styles.tinyLogo} source={require('../imgs/england.png')}/>
                        </View>
                    </Pressable>
                    {/* Campeonatos que não tem muita relevancia */}
                    {/* <Pressable style={[styles.button, {backgroundColor: '#A020F0'}]}
                            onPress={() => {onPress(builderParams.buildChampionshipParams())}}>
                        <Text style={styles.text}>Championship</Text>  
                    </Pressable>
                    <Pressable style={[styles.button, {backgroundColor: '#A020F0'}]}
                            onPress={() => {onPress(builderParams.buildLeagueOneParams())}}>
                        <Text style={styles.text}>League One</Text>  
                    </Pressable>
                    <Pressable style={[styles.button, {backgroundColor: '#A020F0'}]}
                            onPress={() => {onPress(builderParams.buildLeagueTwoParams())}}>
                        <Text style={styles.text}>League Two</Text>  
                    </Pressable> */}
                </View>

                {/* Italy */}
                <View style={[styles.country]}>
                    <Text style={styles.text}>Itália</Text>  
                    <Pressable style={[styles.button]}
                            onPress={() => {onPress(builderParams.buildSerieAItalianaParams())}}>
                        
                        <View style={{ display:'flex', flexDirection:'row'}}>
                            <Text style={styles.text}>Seria A</Text>  

                            <Image style={styles.tinyLogo} source={require('../imgs/italy.png')}/>
                        </View>
                    </Pressable>
                </View>

                {/* Spain */}
                <View style={[styles.country]}>
                    <Text style={styles.text}>Espanha</Text>  
                    <Pressable style={[styles.button]}
                            onPress={() => {onPress(builderParams.buildPrimeraDivisionEspanholaParams())}}>
                        
                        <View style={{ display:'flex', flexDirection:'row'}}>
                            <Text style={styles.text}>La Liga</Text>  

                            <Image style={styles.tinyLogo} source={require('../imgs/spain.png')}/>
                        </View>
                    </Pressable>
                    {/* Campeonato que não tem muita relevancia */}
                    {/* <Pressable style={[styles.button, {backgroundColor: '#FFD700'}]}
                            onPress={() => {onPress(builderParams.buildSegundaDivisionEspanholaParams())}}>
                        <Text style={styles.text}>Segunda División</Text>  
                    </Pressable> */}
                </View>

                {/* Germany */}
                <View style={[styles.country]}>
                    <Text style={styles.text}>Alemanha</Text>  
                    <Pressable style={[styles.button]}
                            onPress={() => {onPress(builderParams.buildBundesligaParams())}}>
                        
                        <View style={{ display:'flex', flexDirection:'row'}}>
                            <Text style={styles.text}>Bundesliga</Text>  

                            <Image style={styles.tinyLogo} source={require('../imgs/germany.png')}/>
                        </View>
                    </Pressable>
                </View>

                {/* France */}
                <View style={[styles.country]}>
                    <Text style={styles.text}>França</Text>  
                    <Pressable style={[styles.button]}
                            onPress={() => {onPress(builderParams.buildLigue1Params())}}>
                        
                        <View style={{ display:'flex', flexDirection:'row'}}>
                            <Text style={styles.text}>Ligue 1</Text>  

                            <Image style={styles.tinyLogo} source={require('../imgs/france.png')}/>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        marginVertical: '10%',
		justifyContent: 'center',
    },
    tinyLogo: {
        width: 35,
        height: 23,
        marginHorizontal: 10,
    },
    country: {
        paddingVertical: 4,
    },
    button: {
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2874A6',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
});
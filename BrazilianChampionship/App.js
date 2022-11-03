import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View , ScrollView, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import ClassificationTable from './screens/ClassificationTable';

export default function App() {

	function elementImage (value) {
		return <Image style={{width: 25, height: 25}} source={require('./imgs/sao-paulo.png')}/>
	}

	const [tableHead, setTableHead] = useState(['Pos', undefined ,'Time', 'Pts', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG']);
    const [tableData, setTableData] = useState([
        [1, elementImage('./imgs/sao-paulo.png'), 'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [2, elementImage('./imgs/sao-paulo.png'),'Internacional', 71, 38, 21, 8, 9, 68, 48, 20],
        [3, elementImage('./imgs/sao-paulo.png'),'Athletico Paranaense', 71, 38, 21, 8, 9, 68, 48, 20],
        [4, elementImage('./imgs/sao-paulo.png'),'Atlético Mineiro', 71, 38, 21, 8, 9, 68, 48, 20],
        [5, elementImage('./imgs/sao-paulo.png'), 'RB Bragantino', 71, 38, 21, 8, 9, 68, 48, 20],
        [6, elementImage('./imgs/sao-paulo.png'), 'Grêmio', 71, 38, 21, 8, 9, 68, 48, 20],
        [7, elementImage('./imgs/sao-paulo.png'), 'Palmeiras', 71, 38, 21, 8, 9, 68, 48, 20],
        [8, elementImage('./imgs/sao-paulo.png'), 'Santos',71, 38, 21, 8, 9, 68, 48, 20],
        [9, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [10, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [11, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [12, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [13, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [14, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [15, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [16, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [17, elementImage('./imgs/sao-paulo.png'),'São Paulo', 71, 38, 21, 8, 9, 68, 48, 20],
        [18, elementImage('./imgs/sao-paulo.png'),'Fluminense', 71, 38, 21, 8, 9, 68, 48, 20],
        [19, elementImage('./imgs/sao-paulo.png'),'Chapecoense', 71, 38, 21, 8, 9, 68, 48, 20],
        [20, elementImage('./imgs/sao-paulo.png'),'Vasco da Gama', 71, 38, 21, 8, 9, 68, 48, 20],
    ]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
      <ClassificationTable tableData={tableData} 
	  					   tableHead={tableHead}
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
});

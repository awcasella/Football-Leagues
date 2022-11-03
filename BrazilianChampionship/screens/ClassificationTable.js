import { Row, Rows, Table, TableWrapper } from "react-native-table-component";
import { Text, Image } from 'react-native';

export default function ClassificationTable({tableHead, tableData, styles}) {

    return <Table borderStyle={{ borderWidth: 0 }}>
        <Text>Temporada</Text>
        {/* <Row data={tableHead} flexArr={[1, 1, 6, 1]} style={styles.head} textStyle={styles.text} /> */}
        <Row data={tableHead} flexArr={[1, 1, 6, 1]} style={styles.head} textStyle={styles.text} />
        <TableWrapper style={styles.wrapper}>
            <Rows data={tableData} flexArr={[1,1,6,1]} style={styles.row} textStyle={styles.text} />
        </TableWrapper>
    </Table>
}
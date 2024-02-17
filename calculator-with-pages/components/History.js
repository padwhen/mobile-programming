import { FlatList, StyleSheet, Text, View } from "react-native"

export default function History( {route} ) {
    const { expressions } = route.params
    return (
        <View style={styles.container}>
            <Text style={styles.header}>History</Text>
            <FlatList
                data={expressions}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => (
                    <View style={styles.historyItem}>
                        <Text>{item}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 20,
        marginBottom: 10
    },
    historyItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 5,
    }
})
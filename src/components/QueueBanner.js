import { View, Text, StyleSheet, } from 'react-native';

export default function QueueBanner({
  queueCount,
}) {

  return (

    <View style={styles.banner}>

      <Text style={styles.text}>
        Pending Sync: {queueCount}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  banner: {
    backgroundColor: '#F59E0B',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
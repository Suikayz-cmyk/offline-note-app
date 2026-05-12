import { View, Text, StyleSheet, } from 'react-native';

export default function SyncingBanner() {

  return (

    <View style={styles.banner}>

      <Text style={styles.text}>
        Syncing notes...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  banner: {
    backgroundColor: '#2563EB',
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
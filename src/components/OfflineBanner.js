import { View, Text, StyleSheet, } from 'react-native';

export default function OfflineBanner() {

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        Sedang berada dalam mode tanpa internet.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  banner: {
    backgroundColor: '#DC2626',
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
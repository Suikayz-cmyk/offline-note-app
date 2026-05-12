import { View, Text, TouchableOpacity, StyleSheet,} from 'react-native';

export default function LoginScreen({
  onLogin,
}) {
  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome to NoteApp
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={onLogin}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});
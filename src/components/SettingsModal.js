import {  View,  Text,  TouchableOpacity,  StyleSheet,  Modal,} from 'react-native';

export default function SettingsModal({

  visible,
  onClose,

  theme,
  setTheme,

  fontSize,
  setFontSize,

  onLogout,

  saveTheme,
  saveFontSize,

}) {

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >

      <View style={styles.overlay}>

        <View
          style={[
            styles.content,
            { backgroundColor: theme === 'dark' ? '#1F2937' : 'white', },
          ]}
        >

          <Text
            style={[
              styles.title,
              { color: theme === 'dark' ? 'white' : 'black', }, 
            ]}
          >
            Settings
          </Text>

          {/* Tema */}
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {

              const newTheme = theme === 'light' ? 'dark' : 'light';

              setTheme(newTheme);

              await saveTheme(newTheme);
            }}
          >

            <Text style={styles.buttonText}>
              Theme: {theme}
            </Text>

          </TouchableOpacity>

          {/* Ukuran Font */}
          <View style={styles.fontContainer}>

            <TouchableOpacity
              style={styles.fontButton}
              onPress={async () => {

                if (fontSize <= 12) {
                  return;
                }

                const newSize = fontSize - 2;

                setFontSize(newSize);

                await saveFontSize(newSize);
              }}
            >
              <Text style={styles.buttonText}>
                A-
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fontButton}
              onPress={async () => {

                if (fontSize >= 30) {
                  return;
                }

                const newSize = fontSize + 2;

                setFontSize(newSize);

                await saveFontSize(newSize);
              }}
            >
              <Text style={styles.buttonText}>
                A+
              </Text>
            </TouchableOpacity>

          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onLogout}
          >
            <Text style={styles.buttonText}>
              Logout
            </Text>
          </TouchableOpacity>

          {/* Tutup */}
          <TouchableOpacity
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              Tutup
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: '80%',
    padding: 20,
    borderRadius: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  fontContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },

  fontButton: {
    backgroundColor: '#059669',
    padding: 12,
    borderRadius: 10,
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },

  closeText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6B7280',
  },

});
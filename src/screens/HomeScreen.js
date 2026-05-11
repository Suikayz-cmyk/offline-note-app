import { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
} from '../database/noteRepository';

import {
  saveTheme,
  getTheme,
  saveFontSize,
  getFontSize,
} from '../storage/settingsStorage';

import NetInfo from '@react-native-community/netinfo';

export default function HomeScreen() {

  const [isConnected, setIsConnected] = useState(true);

  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const loadNotes = () => {
    const data = getNotes();

    setNotes(data);
  };

 const loadSettings = async () => {
    const savedTheme = await getTheme();
    const savedFontSize = await getFontSize();

    if (savedTheme) {
        setTheme(savedTheme);
    }

    if (savedFontSize) {
        const parsedSize = Number(savedFontSize);

        if (parsedSize > 0) {
        setFontSize(parsedSize);
        } else {
        setFontSize(16);
        }
    }
   };

  const handleSearch = (text) => {
    setSearch(text);

    if (!text.trim()) {
      loadNotes();
      return;
    }

    const result = searchNotes(text);
    setNotes(result);
  };

  useEffect(() => {

    loadNotes();

    loadSettings();

    const unsubscribe = NetInfo.addEventListener(state => {

        setIsConnected(state.isConnected);
    });

    return () => {
        unsubscribe();
    };

  }, []);

  const handleSave = () => {

    if (!title.trim()) {
      return;
    }

    if (editingId) {

      updateNote(editingId, title, content);

      setEditingId(null);

    } else {

      createNote(title, content);

    }

    setTitle('');
    setContent('');

    loadNotes();
  };

  const handleEdit = (note) => {

    setTitle(note.title);
    setContent(note.content);

    setEditingId(note.id);
  };

  const handleDelete = (id) => {

    deleteNote(id);

    loadNotes();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === 'dark'
              ? '#111827'
              : '#FFFFFF',
        },
      ]}
    >

      <Text
        style={[
          styles.title,
          {
            color:
              theme === 'dark'
                ? 'white'
                : 'black',
          },
        ]}
      >
        NoteApp
      </Text>

      {!isConnected && (
            <Text style={[
                styles.offlineText,
                {
                    color:
                    theme === 'dark'
                        ? 'white'
                        : 'black',
                },
            ]}>
                Sedang berada dalam mode tanpa internet.
            </Text>
        )
    }

      <TouchableOpacity
        style={styles.themeButton}
        onPress={async () => {

          const newTheme =
            theme === 'light'
              ? 'dark'
              : 'light';

          setTheme(newTheme);

          await saveTheme(newTheme);
        }}
      >
        <Text style={styles.buttonText}>
          Theme: {theme}
        </Text>
      </TouchableOpacity>

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

      <TextInput
        placeholder="Cari note..."
        placeholderTextColor={
          theme === 'dark'
            ? '#9CA3AF'
            : '#6B7280'
        }
        value={search}
        onChangeText={handleSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor:
              theme === 'dark'
                ? '#1F2937'
                : 'white',

            color:
              theme === 'dark'
                ? 'white'
                : 'black',
          },
        ]}
      />

      <TextInput
        placeholder="Judul note"
        placeholderTextColor={
          theme === 'dark'
            ? '#9CA3AF'
            : '#6B7280'
        }
        value={title}
        onChangeText={setTitle}
        style={[
          styles.input,
          {
            backgroundColor:
              theme === 'dark'
                ? '#1F2937'
                : 'white',

            color:
              theme === 'dark'
                ? 'white'
                : 'black',
          },
        ]}
      />

      <TextInput
        placeholder="Isi note"
        placeholderTextColor={
          theme === 'dark'
            ? '#9CA3AF'
            : '#6B7280'
        }
        value={content}
        onChangeText={setContent}
        multiline
        style={[
          styles.textArea,
          {
            backgroundColor:
              theme === 'dark'
                ? '#1F2937'
                : 'white',

            color:
              theme === 'dark'
                ? 'white'
                : 'black',
          },
        ]}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          {editingId ? 'Update Note' : 'Tambah Note'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (

          <View
            style={[
              styles.noteCard,
              {
                backgroundColor:
                  theme === 'dark'
                    ? '#1F2937'
                    : 'white',
              },
            ]}
          >

            <Text
              style={[
                styles.noteTitle,
                {
                  fontSize,

                  color:
                    theme === 'dark'
                      ? 'white'
                      : 'black',
                },
              ]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.noteContent,
                {
                  fontSize: fontSize - 2,

                  color:
                    theme === 'dark'
                      ? 'white'
                      : 'black',
                },
              ]}
            >
              {item.content}
            </Text>

            <View style={styles.actionContainer}>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.buttonText}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>
                  Delete
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  offlineText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  textArea: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    height: 100,
  },

  searchInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },

  saveButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  themeButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  fontContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  fontButton: {
    backgroundColor: '#059669',
    padding: 12,
    borderRadius: 10,
  },

  list: {
    marginTop: 20,
  },

  noteCard: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  noteTitle: {
    fontWeight: 'bold',
  },

  noteContent: {
    marginTop: 5,
  },

  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  editButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  deleteButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});
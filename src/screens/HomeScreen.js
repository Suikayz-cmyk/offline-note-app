import { useEffect, useState } from 'react';
import {  View,  Text,  TextInput,  FlatList,  TouchableOpacity,  StyleSheet,} from 'react-native';

import LoginScreen from './LoginScreen';
import useNetwork from '../hooks/useNetwork';
import OfflineBanner from '../components/OfflineBanner';
import QueueBanner from '../components/QueueBanner';
import SyncingBanner from '../components/SyncingBanner';
import NoteCard from '../components/NoteCard';
import useSync from '../hooks/useSync';

import { createNote,getNotes, updateNote, deleteNote, searchNotes,} from '../database/noteRepository';
import { saveTheme, getTheme, saveFontSize, getFontSize,} from '../storage/settingsStorage';
import { saveToken, getToken, deleteToken,} from '../storage/secureStorage';
import { addToQueue, getQueue, clearQueue,} from '../storage/syncQueueStorage';

export default function HomeScreen() {

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const isConnected = useNetwork();
  const [queueCount, setQueueCount] = useState(0);

  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const {
    isSyncing,
    processSyncQueue,
  } = useSync();

  const loadNotes = () => {
    const data = getNotes();

    setNotes(data);
  };

  const loadQueue = async () => {
    const queue = await getQueue();
    setQueueCount(queue.length);
  };

  const loadSettings = async () => {
    const savedTheme = await getTheme();
    const savedFontSize = await getFontSize();
    const savedToken = await getToken();

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedFontSize) {
      const parsedSize = Number(savedFontSize);
      if (parsedSize > 0) {
        setFontSize(parsedSize);
      }
    }

    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false);
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
    loadQueue();
  }, []);

  useEffect(() => {
    if (isConnected) {
      processSyncQueue(setQueueCount);
    }
  }, [isConnected]);

  const handleSave = async () => {
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

  if (!isConnected) {

    await addToQueue({
      type: editingId
        ? 'UPDATE'
        : 'CREATE',

      title,
      content,
      time: Date.now(),
    });

    loadQueue();
  }

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

  if (isLoading) {
  return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!token) {
    return (
      <LoginScreen
        onLogin={async () => {

          const fakeToken =
            'user_token_123';

          await saveToken(fakeToken);

          setToken(fakeToken);
        }}
      />
    );
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme === 'dark' ? '#111827' : '#FFFFFF',
        },
      ]}
    >

      <Text
        style={[
          styles.title,
          {
            color: theme === 'dark' ? 'white' : 'black',
          },
        ]}
      >
        NoteApp
      </Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {

          await deleteToken();

          setToken(null);
        }}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>

    {!isConnected && <OfflineBanner />}

    {
      queueCount > 0 && (
        <QueueBanner
          queueCount={queueCount}
        />
      )
    }

    {isSyncing && <SyncingBanner />}

      <TouchableOpacity
        style={styles.themeButton}
        onPress={async () => {

          const newTheme =  theme === 'light' ? 'dark' : 'light';

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
          <Text style={styles.buttonText}>A-</Text>
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
          <Text style={styles.buttonText}>A+</Text>
        </TouchableOpacity>

      </View>

      <TextInput
        placeholder="Cari note..."
        placeholderTextColor={
          theme === 'dark' ? '#9CA3AF' : '#6B7280'
        }
        value={search}
        onChangeText={handleSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor:theme === 'dark' ? '#1F2937' : 'white',

            color: theme === 'dark' ? 'white' : 'black',
          },
        ]}
      />

      <TextInput
        placeholder="Judul note"
        placeholderTextColor={
          theme === 'dark' ? '#9CA3AF' : '#6B7280'
        }
        value={title}
        onChangeText={setTitle}
        style={[
          styles.input,
          {
            backgroundColor: theme === 'dark' ? '#1F2937' : 'white',

            color: theme === 'dark' ? 'white' : 'black',
          },
        ]}
      />

      <TextInput
        placeholder="Isi note"
        placeholderTextColor={
          theme === 'dark' ? '#9CA3AF' : '#6B7280'
        }
        value={content}
        onChangeText={setContent}
        multiline
        style={[
          styles.textArea,
          {
            backgroundColor: theme === 'dark' ? '#1F2937' : 'white',

            color: theme === 'dark' ? 'white' : 'black',
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
          <NoteCard
            item={item}
            theme={theme}
            fontSize={fontSize}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

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

  centerContainer: {
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

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

});
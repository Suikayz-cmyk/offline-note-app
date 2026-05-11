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

export default function HomeScreen() {

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  const loadNotes = () => {
    const data = getNotes();

    setNotes(data);
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
    <View style={styles.container}>

      <Text style={styles.title}>
        NoteApp
      </Text>

      <TextInput
        placeholder="Cari note..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      <TextInput
        placeholder="Judul note"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Isi note"
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.textArea}
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

          <View style={styles.noteCard}>

            <Text style={styles.noteTitle}>
              {item.title}
            </Text>

            <Text style={styles.noteContent}>
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

  // CONTAINER
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  // HEADER
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // INPUT
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

  // BUTTON
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

  // LIST
  list: {
    marginTop: 20,
  },

  // NOTE CARD
  noteCard: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  noteContent: {
    marginTop: 5,
  },

  // ACTION BUTTONS
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
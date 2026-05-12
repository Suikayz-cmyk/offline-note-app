import {View, Text, TouchableOpacity, StyleSheet, } from 'react-native';

export default function NoteCard({
  item,
  theme,
  fontSize,
  onEdit,
  onDelete,
}) {

  return (

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
          onPress={() => onEdit(item)}
        >
          <Text style={styles.buttonText}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.buttonText}>
            Delete
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

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
 import AsyncStorage from '@react-native-async-storage/async-storage';

// SAVE THEME
export const saveTheme = async (theme) => {

  try {

    await AsyncStorage.setItem('theme', theme);

  } catch (error) {

    console.log('Error save theme:', error);

  }
};

// GET THEME
export const getTheme = async () => {

  try {

    return await AsyncStorage.getItem('theme');

  } catch (error) {

    console.log('Error get theme:', error);

    return null;
  }
};

// SAVE FONT SIZE
export const saveFontSize = async (size) => {

  try {

    await AsyncStorage.setItem(
      'fontSize',
      size.toString()
    );

  } catch (error) {

    console.log('Error save font size:', error);

  }
};

// GET FONT SIZE
export const getFontSize = async () => {

  try {

    return await AsyncStorage.getItem('fontSize');

  } catch (error) {

    console.log('Error get font size:', error);

    return null;
  }
};
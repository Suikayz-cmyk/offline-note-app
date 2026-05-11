import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(
      'auth_token',
      token
    );
  } catch (error) {
    console.log('Error save token:', error);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(
      'auth_token'
    );
  } catch (error) {
    console.log('Error get token:', error);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(
      'auth_token'
    );

  } catch (error) {
    console.log('Error delete token:', error);
  }
};
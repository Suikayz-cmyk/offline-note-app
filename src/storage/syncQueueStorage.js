import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = 'sync_queue';

export const getQueue = async () => {
  try {
    const queue =
      await AsyncStorage.getItem(QUEUE_KEY);
    return queue
      ? JSON.parse(queue)
      : [];
  } catch (error) {
    console.log('Error get queue:', error);
    return [];
  }
};

export const saveQueue = async (queue) => {
  try {
    await AsyncStorage.setItem(
      QUEUE_KEY,
      JSON.stringify(queue)
    );
  } catch (error) {
    console.log('Error save queue:', error);
  }
};

export const addToQueue = async (action) => {
  const currentQueue = await getQueue();
  currentQueue.push(action);
  await saveQueue(currentQueue);
};

export const clearQueue = async () => {
  try {
    await AsyncStorage.removeItem(QUEUE_KEY);
  } catch (error) {
    console.log('Error clear queue:', error);

  }
};
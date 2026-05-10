import { useEffect } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { initDatabase } from './src/database/database';

export default function App() {

  useEffect(() => {
    initDatabase();
  }, []);

  return <HomeScreen />;
}
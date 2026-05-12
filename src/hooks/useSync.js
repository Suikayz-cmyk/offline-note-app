import { useState } from 'react';

import { getQueue, clearQueue,} from '../storage/syncQueueStorage';

export default function useSync() {

  const [isSyncing, setIsSyncing] =
    useState(false);

  const processSyncQueue = async (
    setQueueCount
  ) => {

    if (isSyncing) {
      return;
    }

    const queue = await getQueue();

    if (queue.length === 0) {
      return;
    }

    setIsSyncing(true);

    console.log('Processing sync queue...');

    for (const action of queue) {

      console.log('Syncing:', action);

      await new Promise(resolve =>
        setTimeout(resolve, 500)
      );
    }

    await clearQueue();

    setQueueCount(0);

    setIsSyncing(false);

    console.log('Sync completed!');
  };

  return {
    isSyncing,
    processSyncQueue,
  };
}
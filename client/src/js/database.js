import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to add content to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add(content);
    await tx.done;
    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('Failed to add content to IndexedDB:', error);
    throw error;
  }
};

// Add logic to retrieve all content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const content = await store.getAll();
    await tx.done;
    console.log('Retrieved content from the database:', content);
    return content;
  } catch (error) {
    console.error('Failed to get content from IndexedDB:', error);
    throw error;
  }
};

initdb();

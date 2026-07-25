// Permanent Photo Storage Engine using IndexedDB
// Bypasses the 5MB browser localStorage limit so all 20 high-resolution photos of Janu are stored forever without quota crashes!

const DB_NAME = 'JanuPermanentPhotoDB';
const STORE_NAME = 'memories_photos';
const DB_VERSION = 1;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

/**
 * Compresses and resizes an image file so it loads at lightning speed while maintaining crisp visual quality.
 */
export function compressImage(file: File, maxDim = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export async function savePhoto(key: string, base64Data: string): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(base64Data, key);
      req.onsuccess = () => {
        // Also save to localStorage as a fast synchronous fallback if within quota
        try {
          localStorage.setItem(key, base64Data);
        } catch (e) {
          // Ignore QuotaExceededError in localStorage since IndexedDB has it safely stored
        }
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('IndexedDB save error:', err);
    try {
      localStorage.setItem(key, base64Data);
    } catch (e) {}
  }
}

export async function getPhoto(key: string): Promise<string | null> {
  try {
    // Try localStorage first for instant synchronous render
    const local = localStorage.getItem(key);
    if (local) return local;

    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        const result = req.result as string | undefined;
        if (result && !local) {
          try {
            localStorage.setItem(key, result);
          } catch (e) {}
        }
        resolve(result || null);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    return localStorage.getItem(key);
  }
}

export async function getAllPhotos(): Promise<{ [key: string]: string }> {
  const photos: { [key: string]: string } = {};
  
  // First load anything in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('janu_photo_') || key.startsWith('photo_') || key.startsWith('polaroid_'))) {
      const val = localStorage.getItem(key);
      if (val) photos[key] = val;
    }
  }

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const key = cursor.key as string;
          if (!photos[key]) {
            photos[key] = cursor.value;
            try {
              localStorage.setItem(key, cursor.value);
            } catch (err) {}
          }
          cursor.continue();
        } else {
          resolve(photos);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    return photos;
  }
}

export async function deletePhoto(key: string): Promise<void> {
  try {
    localStorage.removeItem(key);
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    localStorage.removeItem(key);
  }
}

export async function clearAllPhotos(): Promise<void> {
  // Clear localStorage items matching janu_photo
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('janu_photo_') || key.startsWith('photo_') || key.startsWith('polaroid_'))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));

  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {}
}

export async function exportPhotosBackup(): Promise<string> {
  const photos = await getAllPhotos();
  return JSON.stringify({
    version: '1.0',
    exportDate: new Date().toISOString(),
    photos
  }, null, 2);
}

export async function importPhotosBackup(jsonString: string): Promise<number> {
  try {
    const parsed = JSON.parse(jsonString);
    const photos = parsed.photos || parsed;
    let count = 0;
    for (const [key, value] of Object.entries(photos)) {
      if (typeof value === 'string' && value.startsWith('data:image')) {
        await savePhoto(key, value);
        count++;
      }
    }
    return count;
  } catch (err) {
    throw new Error('Invalid backup file format');
  }
}

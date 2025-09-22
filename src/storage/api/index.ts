import { getTransactionStore, handleRequest } from './helpers';
import type { IColor } from 'src/types';

type ISaveItem = (item: IColor, storeName?: string) => Promise<number>;
type IGetItem = (itemId: string, storeName?: string) => Promise<IColor>;
type IGetAllHistory = (storeName?: string) => Promise<IColor[]>;
type IClearHistory = (storeName?: string) => void;

interface IApiService {
  saveItem: ISaveItem;
  getItem: IGetItem;
  getAllHistory: IGetAllHistory;
  clearHistory: IClearHistory;
}

const resolveWithMethods = (dbInstance: IDBDatabase, resolveCallback: (apiService: IApiService) => void) => {
  const saveItem: ISaveItem = (item: IColor, storeName = 'paletteStore') =>
    new Promise((resolve, reject) => {
      const store = getTransactionStore(dbInstance, 'readwrite', storeName);
      handleRequest(() => store.add(item), resolve, reject);
    });

  const getAllHistory: IGetAllHistory = (storeName = 'paletteStore'): Promise<IColor[]> => {
    return new Promise((resolve, reject) => {
      const store = getTransactionStore(dbInstance, 'readonly', storeName);
      handleRequest<IColor[]>(() => store.getAll(), resolve, reject);
    });
  };

  const clearHistory: IClearHistory = (storeName = 'paletteStore') => {
    return new Promise((resolve, reject) => {
      const store = getTransactionStore(dbInstance, 'readwrite', storeName);
      handleRequest<never>(() => store.clear(), resolve, reject);
    });
  };

  const getItem: IGetItem = (colorId: string, storeName = 'paletteStore'): Promise<IColor> => {
    return new Promise((resolve, reject) => {
      const store = getTransactionStore(dbInstance, 'readonly', storeName);
      const colorIdIndex = store.index('colorId');
      handleRequest<IColor>(() => colorIdIndex.get(colorId), resolve, reject);
    });
  };

  resolveCallback({
    saveItem,
    getItem,
    getAllHistory,
    clearHistory,
  });
};

const apiService = (): Promise<IApiService> =>
  new Promise((resolve) => {
    const request = window.indexedDB.open('PaletteDB', 2);

    request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      console.log('onupgradeneeded');
      const target = e.target as IDBOpenDBRequest;
      const database = target.result;

      if (e.oldVersion === 0 && target.transaction) {
        database.createObjectStore('paletteStore', { keyPath: 'id', autoIncrement: true });

        const store = target.transaction.objectStore('paletteStore');
        store.createIndex('colorId', 'colorId', { unique: true });
      }

      if (e.oldVersion === 1 && target.transaction) {
        const store = target.transaction.objectStore('paletteStore');
        store.createIndex('colorId', 'colorId', { unique: true });
      }

      database.onerror = (event: Event) => {
        console.error(`Database error: ${(event.target as IDBOpenDBRequest).error?.message}`);
      };
    };

    request.onsuccess = (e: Event) => {
      const database = (e.target as IDBOpenDBRequest).result;

      resolveWithMethods(database, resolve);
    };

    request.onerror = (e: Event) => {
      console.error("Why didn't you allow my web app to use IndexedDB?!", e);
    };
  });

const { saveItem, getItem, getAllHistory, clearHistory } = await apiService();
export default { saveItem, getItem, getAllHistory, clearHistory };

import { createTransaction, handleRequest } from './helpers';
import type { IColor } from 'src/types';

type ISaveItem = (item: IColor, storeName?: string) => Promise<number>;
type IGetAllHistory = (storeName?: string) => Promise<IColor[]>;
type IClearHistory = (storeName?: string) => void;

interface IApiService {
  saveItem: ISaveItem;
  getAllHistory: IGetAllHistory;
  clearHistory: IClearHistory;
}

const resolveWithMethods = (dbInstance: IDBDatabase, resolveCallback: (apiService: IApiService) => void) => {
  const saveItem: ISaveItem = (item: IColor, storeName = 'paletteStore') =>
    new Promise((resolve, reject) => {
      const store = createTransaction(dbInstance, 'readwrite', storeName);
      handleRequest(() => store.add(item), resolve, reject);
    });

  const getAllHistory: IGetAllHistory = (storeName = 'paletteStore'): Promise<IColor[]> => {
    return new Promise((resolve, reject) => {
      const store = createTransaction(dbInstance, 'readonly', storeName);
      handleRequest<IColor[]>(() => store.getAll(), resolve, reject);
    });
  };

  const clearHistory: IClearHistory = (storeName = 'paletteStore') => {
    return new Promise((resolve, reject) => {
      const store = createTransaction(dbInstance, 'readwrite', storeName);
      handleRequest<never>(() => store.clear(), resolve, reject);
    });
  };

  resolveCallback({
    saveItem,
    getAllHistory,
    clearHistory,
  });
};

const apiService = (): Promise<IApiService> =>
  new Promise((resolve) => {
    const request = window.indexedDB.open('PaletteDB', 1);

    request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      console.log('onupgradeneeded');

      const database = (e.target as IDBOpenDBRequest).result;
      database.createObjectStore('paletteStore', { keyPath: 'id', autoIncrement: true });

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

const { saveItem, getAllHistory, clearHistory } = await apiService();
export default { saveItem, getAllHistory, clearHistory };

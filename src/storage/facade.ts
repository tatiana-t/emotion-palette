import useDataStore from './store';
import api from './api';
import type { IColor } from 'src/types';

const saveToDB = async (item: IColor) => {
  let status = '';
  let attempt = 0;

  while (status !== 'success' && attempt < 3) {
    attempt += 1;
    try {
      const savedItem = await api.saveItem(item);
      status = 'success';
      return savedItem;
    } catch (e) {
      console.log('e', e);
    }
  }

  if (status !== 'success' && attempt >= 3) {
    alert('saved error');
  }
};

export const saveColor = async (userColor: Omit<IColor, 'colorId' | 'date'>) => {
  const date = new Date();
  const dayDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const color = { colorId: crypto.randomUUID(), date: dayDate, ...userColor };
  useDataStore.getState().addHistoryItem(color);

  await saveToDB(color);
};

export const setHistoryFromDB = async (from: number, to: number) => {
  const list: IColor[] = await api.getList(from, to);
  console.log('list', list);
  useDataStore.getState().setHistory(list);
};

export const setTotalCount = async () => {
  const count: number = await api.getTotalCount();
  useDataStore.getState().setCount(count);
};

export const clearHistory = async () => {
  await api.clearHistory();
  useDataStore.getState().setHistory([]);
};

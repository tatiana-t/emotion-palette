export const createTransaction = (dbInstance: IDBDatabase, type: 'readwrite' | 'readonly', storeName: string) => {
  const transaction = dbInstance.transaction(storeName, type);

  //   transaction.oncomplete = () => {
  //     console.log('complete!');
  //   };

  return transaction.objectStore(storeName);
};

export const handleRequest = <IValueData>(
  requestFunc: () => IDBRequest,
  resolve: (resData: IValueData) => void,
  reject: (resData: Error | null) => void,
) => {
  const request = requestFunc();

  request.onsuccess = () => {
    resolve(request.result);
  };

  request.onerror = () => {
    reject(request.error);
  };
};

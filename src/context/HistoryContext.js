import React, { createContext, useContext, useState } from 'react';

export const HistoryContext = createContext({
  purchaseHistory: [],
  addPurchase: () => {},
});

export function HistoryProvider({ children }) {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  console.log('HistoryProvider initialized, purchaseHistory:', purchaseHistory);

  const addPurchase = (purchase) => {
    const newPurchase = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      ...purchase,
    };
    setPurchaseHistory((prev) => [newPurchase, ...prev]);
    console.log('Added purchase:', newPurchase);
  };

  return (
    <HistoryContext.Provider value={{ purchaseHistory, addPurchase }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
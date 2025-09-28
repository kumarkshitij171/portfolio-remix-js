/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { PortfolioData } from '../types/portfolio';

export const usePortfolioData = (initialData: PortfolioData) => {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setLoading(false);
    }
  }, [initialData]);

  const updateSection = async <T extends keyof PortfolioData>(
    section: T, 
    updatedData: PortfolioData[T],
    apiEndpoint?: string
  ) => {
    try {
      setLoading(true);
      if (apiEndpoint) {
        await fetch(apiEndpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
      }
      
      setData(prev => ({ ...prev, [section]: updatedData }));
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  const addItem = async <T extends keyof PortfolioData>(
    section: T,
    newItem: any,
    apiEndpoint?: string
  ) => {
    try {
      if (!Array.isArray(data[section])) {
        throw new Error(`Section ${String(section)} is not an array`);
      }

      setLoading(true);
      
      const items = data[section] as any[];
      const newId = Math.max(...items.map(item => item.id || 0), 0) + 1;
      const itemWithId = { ...newItem, id: newId };
  
      if (apiEndpoint) {
        await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemWithId)
        });
      }
      
      const updatedItems = [...items, itemWithId];
      setData(prev => ({ ...prev, [section]: updatedItems }));
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  const updateItem = async <T extends keyof PortfolioData>(
    section: T,
    itemId: number,
    updatedItem: any,
    apiEndpoint?: string
  ) => {
    try {
      if (!Array.isArray(data[section])) {
        throw new Error(`Section ${String(section)} is not an array`);
      }

      setLoading(true);
      
      if (apiEndpoint) {
        await fetch(`${apiEndpoint}/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem)
        });
      }
      
      const items = data[section] as any[];
      const updatedItems = items.map(item => 
        item.id === itemId ? { ...updatedItem, id: itemId } : item
      );
      
      setData(prev => ({ ...prev, [section]: updatedItems }));
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  const deleteItem = async <T extends keyof PortfolioData>(
    section: T,
    itemId: number,
    apiEndpoint?: string
  ) => {
    try {
      if (!Array.isArray(data[section])) {
        throw new Error(`Section ${String(section)} is not an array`);
      }

      setLoading(true);
      
      if (apiEndpoint) {
        await fetch(`${apiEndpoint}/${itemId}`, {
          method: 'DELETE'
        });
      }
      
      const items = data[section] as any[];
      const updatedItems = items.filter(item => item.id !== itemId);
      
      setData(prev => ({ ...prev, [section]: updatedItems }));
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  return {
    data,
    loading,
    error,
    updateSection,
    addItem,
    updateItem,
    deleteItem
  };
};
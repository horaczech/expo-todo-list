import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStorageKey} from '@/appTypes/storage';

export const setLocalStorageItem = async (
  key: LocalStorageKey,
  value: string,
) => {
  return AsyncStorage.setItem(key, value);
};

export const getLocalStorageItem = async (key: LocalStorageKey) => {
  return AsyncStorage.getItem(key);
};

export const setLocalStorageObject = async (
  key: LocalStorageKey,
  value: object,
) => {
  return setLocalStorageItem(key, JSON.stringify(value));
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthResult} from '../api/types';

const key = 'auth';

const authStorage = {
  async get() {
    const rawData = await AsyncStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    try {
      const data: AuthResult = JSON.parse(rawData);
      return data;
    } catch (e) {
      return null;
    }
  },
  set(authResult: AuthResult) {
    return AsyncStorage.setItem(key, JSON.stringify(authResult)); //{jwt: 2314sdf8435, user:{}}
  },
  clear() {
    return AsyncStorage.removeItem(key);
  },
};
// export interface AuthResult {
//   jwt: string;
//   user: User;
// }
export default authStorage;

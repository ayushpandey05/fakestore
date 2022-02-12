import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMultiState from '../../hooks/useMultiState';
import useDidMount from '../../hooks/useDidMount';
import useDidUpdate from '../../hooks/useDidUpdate';
import {decrypt, encrypt} from '../../utils/encryption';
import {colors} from '../../theme/colors';

const localStoreName = 'fake_store';

const setStoreData = async (data: any) => {
  return await AsyncStorage.setItem(localStoreName, data);
};
const getStoreData = async () => {
  return await AsyncStorage.getItem(localStoreName);
};

const StorageContext: any = React.createContext(false);

interface Props {
  children: any;
}

const StorageProvider: React.FC<Props> = ({children}) => {
  const [state, setState]: any = useMultiState({localData: {}});

  const {isDataLoaded, localData} = state || {};

  const getStorageData = () => {
    getStoreData()
      .then(data => {
        if (data) {
          
          const decryptedStoreData = decrypt(data);
          // console.log('@@@updated!>>>>>>>>//', decryptedStoreData)
          const dataObj = JSON.parse(decryptedStoreData);
          setState({isDataLoaded: true, localData: dataObj || {}});
        } else {
          setState({isDataLoaded: true, localData: {}});
        }
      })
      .catch(err => {
        setState({isDataLoaded: true, localData: {}});
      });
  };

  const updateStoreData = () => {
    const storeData = JSON.stringify(localData);
    const encryptedStoreData = encrypt(storeData);
    // console.log('@@@updated!>>>>>>>>')
    setStoreData(encryptedStoreData)
      .then(res => {})
      .catch(err => {});
  };

  useDidMount(getStorageData);
  useDidUpdate(updateStoreData, [localData]);

  const setLocalData = (newData: any) => {
    setState({localData: {...localData, ...newData}});
  };

  // console.log('@@@updated!>>>>>>>>', localData)

  return (
    <StorageContext.Provider value={{data: localData, setData: setLocalData}}>
      {isDataLoaded ? (
        children || void 0
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
    </StorageContext.Provider>
  );
};

const useStore = () => {
  return React.useContext(StorageContext) || {};
};

export default StorageContext;
export {StorageProvider, useStore};

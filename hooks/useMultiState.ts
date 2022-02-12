import {useState} from 'react';

const useMultiState = (initialState: any) => {
  const [state, setMultiState] = useState({...initialState});

  const setState = (newState: any) => {
    setMultiState({...state, ...newState});
  };
  return [state, setState];
};

export default useMultiState;

import { useContext } from 'react';
import { RootStoreContext } from '../stores/rootStore';

const useStore = () => useContext(RootStoreContext);

export default useStore;

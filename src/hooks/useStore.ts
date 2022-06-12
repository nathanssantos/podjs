import { useContext } from 'react';
import { RootStoreContext } from '../stores/rootStore';

export const useStore = () => useContext(RootStoreContext);

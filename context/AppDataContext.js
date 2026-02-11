import { createContext, useContext } from 'react';
import useAppData from '../hooks/useAppData';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
    const appData = useAppData();
    return (
        <AppDataContext.Provider value={appData}>
            {children}
        </AppDataContext.Provider>
    );
}

export function useAppDataContext() {
    return useContext(AppDataContext);
}

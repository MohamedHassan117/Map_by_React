import * as React from 'react';

import {
    getTimeExtent
} from '../services/GLDAS/gldas';

import {
    miscFns
} from 'helper-toolkit-ts';

interface AppContextProps {
    timeExtentForGldasLayers: Date[];
    isMobile: boolean;
}

interface AppContextProviderProps {
    // children: React.ReactNode;
};

export const AppContext = React.createContext<AppContextProps>(null);

const AppContextProvider:React.FC<AppContextProviderProps> = ({ 
    children
})=>{

    const [ timeExtentForGldasLayers, setTimeExtentForGldasLayers ] = React.useState<Date[]>([]);

    const init = async()=>{
        const timeExtent = await getTimeExtent();
        setTimeExtentForGldasLayers(timeExtent);
    };

    const value = {
        timeExtentForGldasLayers,
        isMobile: miscFns.isMobileDevice()
    };

    React.useEffect(()=>{
        init();
    }, []);

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    );
};

export default AppContextProvider;
import * as React from 'react';

export type IFrameContextValue = {
    inIframe: boolean;
    sendMessage: (message: unknown) => void;
};

export const IFrameContext = React.createContext<IFrameContextValue | null>(null);

export const IFrameContextProvider = ({children}: {children: React.ReactNode}) => {
    const inIframe = window.self !== window.top;
    const sendMessage = React.useCallback((message: unknown) => window.parent.postMessage(message, '*'), []);
    return (
        <IFrameContext.Provider value={React.useMemo(() => ({inIframe, sendMessage}), [inIframe, sendMessage])}>
            {children}
        </IFrameContext.Provider>
    )
}

export const useIframeContext = () => React.useContext(IFrameContext)!;
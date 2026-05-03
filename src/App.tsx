import React from 'react';
import BearColor from 'components/BearColor';
import { IFrameContextProvider } from 'components/IFrameContext';

function App() {
  return (
    <IFrameContextProvider>
      <BearColor />
    </IFrameContextProvider>
  );
}

export default App;

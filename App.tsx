import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store.ts';
import MainStack from './src/navigation/AppNavigator.tsx';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;

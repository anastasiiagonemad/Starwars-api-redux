import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.tsx';
import CharactersList from './pages/CharactersList.tsx';
import CharacterDetails from './pages/CharacterDetails.tsx';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path={`/Starwars-api-redux`} element={<CharactersList />} />
          <Route path="/character/:name" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

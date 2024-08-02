import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CharactersList from './pages/CharactersList';
import CharacterDetails from './pages/CharacterDetails';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/Starwars-api-redux" element={<CharactersList />} />
          <Route path="/character/:name" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

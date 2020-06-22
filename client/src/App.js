import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { Join } from './components/Join/Join';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Join} />
    </BrowserRouter>
  );
}

export default App;

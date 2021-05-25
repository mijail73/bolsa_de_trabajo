import React from 'react';
import Footer from './components/UI/Footer';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { Provider } from 'react-redux';
import store from './store';
import NavBarbs from './components/UI/Header/NavBarbs';

function App() {
  return (
    <BrowserRouter>
      <div className="content-arriba-del-footer">
        <NavBarbs />
        <Provider store={store}> <Router/> </Provider>
      </div>
      <Footer className="footer"/>
    </BrowserRouter>
  );
};

export default App;

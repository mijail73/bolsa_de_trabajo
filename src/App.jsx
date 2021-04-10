import React from 'react';
import TopHeader from './components/UI/Header/TopHeader';
import NavBar from './components/UI/Header/NavBar';
import Footer from './components/UI/Footer';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <div id="page-container-footer-hasta-abajo">
        <TopHeader />
        <NavBar />
        <Provider store={store}> <Router/> </Provider>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

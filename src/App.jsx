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
      <div className="content-arriba-del-footer">
        <TopHeader />
        <NavBar />
        <Provider store={store}> <Router/> </Provider>
      </div>
      <Footer className="footer"/>
    </BrowserRouter>
  );
};

export default App;

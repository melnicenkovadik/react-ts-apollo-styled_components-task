import React from 'react';
import Home from '../pages/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div>
      {/*Routing is here too, but not this time :)*/}
      <Home />
      <ToastContainer />
    </div>
  );
};

export default App;

import React from 'react';
import {Switch,Route} from 'react-router-dom';


import './App.css';
import Homepage from './pages/homepage/homepage.component';

const Hatspage=()=> (
  <div>
      <h1> HATS!!!!!!!!!!! </h1>
  </div>
);

function App() {
  return (
    <div >
     <Switch>
       <Route exact path='/' component={Homepage}/>
       <Route  path='/shop/hats' component={Hatspage}/>
     </Switch>
    </div>
  );
}

export default App;

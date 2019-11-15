import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      {/* <Route link="/" component={Home}/> */}
    </Router>
  );
}

export default App;

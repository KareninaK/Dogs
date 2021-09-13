import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch> 
          <Route exact path= '/' component = {Landing}/>
          <Route  path= '/home' component = {Home}/>
          <Route  path= '/dog' component = {DogCreate}/>
          <Route  path= '/dogs/:id' component = {Detail}/>
        </Switch>       
      </div>
    </BrowserRouter>
  );
}





export default App;

//switxh envuelve las rutas y las lee de a 1
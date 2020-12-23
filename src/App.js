import { Switch,Route, Redirect } from 'react-router-dom';
import CreatePatient from './components/create-patient';
import Monitor from './components/monitor';
import NavBar from "./components/nav-bar"
import Patient from './components/patient';
import Patients from './components/patients';
import './App.css';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route path="/monitor/:id/:mode" component={Monitor}  />
        <Route path="/patients" component={Patients}  />
        <Route path="/patient/:id" component={Patient}  />
        <Route path="/create-patient" component={CreatePatient}  />
        <Redirect from="/" exact to="/patients"  />
      </Switch>
    </div>
  );
}

export default App;

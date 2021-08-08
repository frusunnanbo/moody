import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Room from './components/Room';

function App() {
  return (
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/main">
          <Room name="main" />
        </Route>
        <Route path="/agileislands">
          <Room name="agileislands" />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>    
  );
}

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/main">Main</Link>
        </li>
        <li>
          <Link to="/agileislands">Agile Islands</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;

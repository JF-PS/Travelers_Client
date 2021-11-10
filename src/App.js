import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Map from './components/Map/Map';
import Chat from './components/Chat/Chat';
import Profil from './pages/Profil/Profil';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/map" exact component={Map} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/chat" exact component={Chat} />
          {/* <Route path="/ad" exact component= {Ad} />
          <Route path="/spot" exact component={Spot} /> */}
        </Switch>
      </div>
      <NavBar />

    </BrowserRouter>
  );
}

export default App;

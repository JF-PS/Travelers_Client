import Home from './pages/Home/Home';
import Map from './pages/Map/Map';
import ChatUi from './components/Chat/ChatUi';
import Chat from './components/Chat/Chat';
// import Chat from './pages/Chat/Chat';
import Setting from './components/Account/Setting';
import Profil from './pages/Profil/Profil';
import PocSeeting from './components/Account/PocSeeting';
import Edit from './components/Account/Edit';
import Spot from './pages/Spot/Spot';
import Ad from './pages/Ad/Ad';
import EasterEgg from './components/EasterEgg/EasterEgg';
import Auth from './components/Account/Auth';
import Logout from './components/Account/Logout';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div>
        {/* <EasterEgg /> */}
          <Switch>
            <Route path="/poc" exact component={PocSeeting} />
            <Route path="/" exact component={Home} />
            <Route path="/map" exact component={Map} />
            <Route path="/spot" exact component={Spot} />
            {/* <Route path="/chat" exact component={Chat} /> */}
            <Route path="/chat/:idUser2" exact component={ChatUi} />
            <Route path="/edit-profil" exact component={Edit} />
            <Route path="/ad" exact component= {Ad} />
            <Route path="/profil" exact component={Profil} />
            <Route path="/setting" exact component={Setting} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/chat/:idUser2" exact component={Chat} />
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;

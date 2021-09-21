import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./pages/Home";
import Ideas from "./pages/Ideas/Ideas";
import Events from "./pages/Events/Events.js";
import AboutPage from "./pages/About";
import OurTeam from './pages/OurTeam/OurTeam';
import SiteFooter from './components/Footer/footer';

function App() {
  return (
    <div>
      <Router>
          <Switch>
              <Route path='/' exact>
                  <HomePage />
              </Route>
              <Route path='/ideas' exact>
                  <Ideas />
                  <SiteFooter/>
              </Route>
              <Route path='/about' exact>
                  <AboutPage />
              </Route>
              <Route path='/ourteam' exact>
                  <OurTeam />
              </Route>
              <Route exact path="/Events" component={Events} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;

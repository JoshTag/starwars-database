import React from 'react';
import Starships from "../Pages/Starships"
import Vehicles from "../Pages/Vehicles"
import People from "../Pages/People"
import Main from "../Pages/Main"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/starships" component={Starships} />
        <Route path="/people" component={People} />
        <Route path="/vehicles" component={Vehicles} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

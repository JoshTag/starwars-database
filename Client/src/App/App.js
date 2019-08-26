import React from "react";
import Nav from "../Components/Navigation";
// import Starships from "../Pages/Starships";
// import Vehicles from "../Pages/Vehicles";
// import Characters from "../Pages/Characters";
// import Person from "../Components/Person";
// import Main from "../Pages/Main";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import ErrorPage from "../Components/Error";

function App() {
  return (
    <div className="App">
      <Nav />
    </div>
    // <BrowserRouter>
    //   <Nav />
    //   <Switch>
    //     <Route exact path="/" component={Main} />
    //     <Route path="/starships" component={Starships} />
    //     <Route path="/people" component={Characters} />
    //     <Route path="/people/:id" component={Person} />
    //     <Route path="/vehicles" component={Vehicles} />
    //     <Route path="" component={ErrorPage} />
    //   </Switch>
    // </BrowserRouter>
  );
}

export default App;

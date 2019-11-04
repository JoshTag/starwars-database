import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.scss";

// Material Design menu imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";

// Component imports
import Main from "../Components/Main";
import Characters from "../Components/Characters";
import Person from "../Components/Person";
import Starships from "../Components/Starships";
import Ship from "../Components/Ship";
import Vehicles from "../Components/Vehicles";
import Vehicle from "../Components/Vehicle";
import Planets from "../Components/Planets";
import Planet from "../Components/Planet";
import ErrorPage from "../Components/Error";

const useStyles = makeStyles({
  list: {
    width: 300,
    height: "100vh",
    background: "#2B2B2B"
  },
  root: {
    color: "yellow",
    padding: "20px 20px",
    fontSize: "1.25rem"
  }
});

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <nav className="linkContainer">
        <Link className="linkContainer__link" to="/">
          Main
        </Link>
        <Link className="linkContainer__link" to="/characters">
          Characters
        </Link>
        <Link className="linkContainer__link" to="/starships">
          Starships
        </Link>
        <Link className="linkContainer__link" to="/vehicles">
          vehicles
        </Link>
        <Link className="linkContainer__link" to="/planets">
          Planets
        </Link>
      </nav>
    </div>
  );

  return (
    <BrowserRouter className="pageContainer">
      <div className="pageContainer__nav-button">
        <Button className={classes.root} onClick={toggleDrawer("left", true)}>
          menu
        </Button>
      </div>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/characters" exact component={Characters} />
        <Route path="/characters/:id" render={props => <Person {...props}/>} />
        <Route path="/starships" exact component={Starships} />
        <Route path="/starships/:id" render={props => <Ship {...props}/>} />
        <Route path="/vehicles" exact component={Vehicles} />
        <Route path="/vehicles/:id" render={props => <Vehicle {...props}/>} />
        <Route path="/planets" exact component={Planets} />
        <Route path="/planets/:id" render={props => <Planet {...props}/>} />
        <Route path="" component={ErrorPage} />
      </Switch>

      {/* {routeResult || <ErrorPage />} */}
    </BrowserRouter>
  );
}

export default App;

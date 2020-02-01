import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
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

const pingURL = `${process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:8080'}`;

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
  // Axios to get data
  const useGetData = (searchParam, setData, setConstData, load, setLoaded) => {
    useEffect(() => {
      axios
        .get(`${pingURL}/${searchParam}/`)
        .then(res => {
          setData(res.data);
          setConstData(res.data);
          setLoaded(true)
        })
        .catch(err => {
          alert(err);
        });
    }, [searchParam, setData, setConstData, load, setLoaded]);
  };

  // Search functionality
  const searchData = (event, constData, data, setData) => {
    event.preventDefault();
    let findItem = constData.filter(name =>
      name.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setData(findItem || data);
  };

  // Material Design set
  const classes = useStyles();
  const [state, setState] = useState({
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
        <Route
          path="/characters"
          exact
          render={() => <Characters getData={useGetData} search={searchData} />}
        />
        <Route path="/characters/:id" render={props => <Person {...props} />} />
        <Route
          path="/starships"
          exact
          render={() => <Starships getData={useGetData} search={searchData} />}
        />
        <Route path="/starships/:id" render={props => <Ship {...props} />} />
        <Route
          path="/vehicles"
          exact
          render={() => <Vehicles getData={useGetData} search={searchData} />}
        />
        <Route path="/vehicles/:id" render={props => <Vehicle {...props} />} />
        <Route
          path="/planets"
          exact
          render={() => <Planets getData={useGetData} search={searchData} />}
        />
        <Route path="/planets/:id" render={props => <Planet {...props} />} />
        <Route path="" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

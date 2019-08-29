import React from "react";
import { useRoutes, A } from "hookrouter";
import routes from "../router";
import ErrorPage from "../Components/Error";
import "./App.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Drawer from '@material-ui/core/Drawer';

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
  const routeResult = useRoutes(routes);

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
      <div className="linkContainer">
        <A className="linkContainer__link" href="/">
          Main
        </A>
        <A className="linkContainer__link" href="/characters">
          Characters 
        </A>
        <A className="linkContainer__link" href="/starships">
          Starships
        </A>
        <A className="linkContainer__link" href="/vehicles">
          vehicles
        </A>
        <A className="linkContainer__link" href="/planets">
          Planets
        </A>
      </div>
    </div>
  );

  return (
    <div className="pageContainer">
      <div className="pageContainer__nav-button">
      <Button className={classes.root} onClick={toggleDrawer("left", true)}>menu</Button>
      </div>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      {routeResult || <ErrorPage />}
    </div>
  );
}

export default App;

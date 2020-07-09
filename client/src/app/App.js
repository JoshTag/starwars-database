import React, { useEffect, useState } from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import "./App.scss"

// Material Design menu imports
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Drawer from "@material-ui/core/Drawer"

// Component imports
import Main from "../components/Main"
import People from "../components/People"
import Person from "../components/Person"
import Starships from "../components/Starships"
import Ship from "../components/Ship"
import Vehicles from "../components/Vehicles"
import Vehicle from "../components/Vehicle"
import Planets from "../components/Planets"
import Planet from "../components/Planet"
import ErrorPage from "../components/Error"

const pingURL = process.env.REACT_APP_BACKEND_SERVER || "http://localhost:5000"

const client = new ApolloClient({
  uri: `${pingURL}/graphql`,
})

const useStyles = makeStyles({
  list: {
    width: 300,
    height: "100vh",
    background: "#2B2B2B",
  },
  root: {
    color: "yellow",
    padding: "20px 20px",
    fontSize: "1.25rem",
  },
})

function App() {

  // Search functionality
  const searchData = (event, constData, data, setData) => {
    event.preventDefault()
    let findItem = constData.filter(name =>
      name.name.toLowerCase().includes(event.target.value.toLowerCase())
    )

    setData(findItem || data)
  }

  // Material Design set
  const classes = useStyles()
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [side]: open })
  }

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
  )

  return (
    <ApolloProvider client={client}>
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
            render={() => <People search={searchData} />}
          />
          <Route
            path="/characters/:id"
            render={props => <Person {...props} />}
          />
          <Route
            path="/starships"
            exact
            render={() => (
              <Starships search={searchData} />
            )}
          />
          <Route path="/starships/:id" render={props => <Ship {...props} />} />
          <Route
            path="/vehicles"
            exact
            render={() => <Vehicles search={searchData} />}
          />
          <Route
            path="/vehicles/:id"
            render={props => <Vehicle {...props} />}
          />
          <Route
            path="/planets"
            exact
            render={() => <Planets search={searchData} />}
          />
          <Route path="/planets/:id" render={props => <Planet {...props} />} />
          <Route path="" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App

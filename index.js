const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cors configuration
const corsConfig = {
  origin: ["http://localhost:3000", "https://starwars-database.netlify.app"]
};
app.use(cors(corsConfig));

// Route
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`We chillin on port ${PORT}`));

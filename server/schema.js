const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// People Type
const PeopleType = new GraphQLObjectType({
  name: "People",
  fields: () => ({
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

// Person Type
const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    name: { type: GraphQLString },
    height: { type: GraphQLString },
    gender: { type: GraphQLString },
    mass: { type: GraphQLString },
    hair_color: { type: GraphQLString },
    skin_color: { type: GraphQLString },
    eye_color: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

// Starships Type
const StarshipsType = new GraphQLObjectType({
  name: "Starships",
  fields: () => ({
    name: { type: GraphQLString },
    model: { type: GraphQLString },
    starship_class: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

// Starship Type
const StarshipType = new GraphQLObjectType({
  name: "Starship",
  fields: () => ({
    name: { type: GraphQLString },
    model: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    starship_class: { type: GraphQLString },
    length: { type: GraphQLString },
    passengers: { type: GraphQLString },
    cargo_capacity: { type: GraphQLString },
    hyperdrive_rating: { type: GraphQLString },
    cost_in_credits: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

// Vehicles Type
const VehiclesType = new GraphQLObjectType({
  name: "Vehicles",
  fields: () => ({
    name: { type: GraphQLString },
    model: { type: GraphQLString },
    vehicle_class: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

// Vehicle Type
const VehicleType = new GraphQLObjectType({
  name: "Vehicle",
  fields: () => ({
    name: { type: GraphQLString },
    model: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    vehicle_class: { type: GraphQLString },
    length: { type: GraphQLString },
    crew: { type: GraphQLString },
    passengers: { type: GraphQLString },
    cargo_capacity: { type: GraphQLString },
    cost_in_credits: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

// Planets Type
const PlanetsType = new GraphQLObjectType({
  name: "Planets",
  fields: () => ({
    name: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

// Planet Type
const PlanetType = new GraphQLObjectType({
  name: "Planet",
  fields: () => ({
    name: { type: GraphQLString },
    rotation_period: { type: GraphQLString },
    orbital_period: { type: GraphQLString },
    diameter: { type: GraphQLString },
    climate: { type: GraphQLString },
    gravity: { type: GraphQLString },
    terrain: { type: GraphQLString },
    surface_water: { type: GraphQLString },
    population: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    people: {
      type: new GraphQLList(PeopleType),
      resolve(parent, args) {
        return axios
          .get("https://swapi.dev/api/people/")
          .then(res => res.data.results);
      }
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://swapi.dev/api/people/${args.id}`)
          .then(res => res.data);
      }
    },
    starships: {
      type: new GraphQLList(StarshipsType),
      resolve(parent, args) {
        return axios
          .get("https://swapi.dev/api/starships/")
          .then(res => res.data.results);
      }
    },
    starship: {
      type: StarshipType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://swapi.dev/api/starships/${args.id}`)
          .then(res => res.data);
      }
    },
    vehicles: {
      type: new GraphQLList(VehiclesType),
      resolve(parent, args) {
        return axios
          .get("https://swapi.dev/api/vehicles/")
          .then(res => res.data.results);
      }
    },
    vehicle: {
      type: VehicleType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://swapi.dev/api/vehicles/${args.id}`)
          .then(res => res.data);
      }
    },
    planets: {
      type: new GraphQLList(PlanetsType),
      resolve(parent, args) {
        return axios
          .get("https://swapi.dev/api/planets/")
          .then(res => res.data.results);
      }
    },
    planet: {
      type: PlanetType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://swapi.dev/api/planets/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

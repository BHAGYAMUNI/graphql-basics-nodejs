const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";
import { RootQueryType, RootMutationType } from "./typeDefs.js";
const app = express();

// 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

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("server is running on 5000"));

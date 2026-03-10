const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const app = express();

const questions = [
  { id: "1", title: "Two Sum", difficulty: "Easy" },
  { id: "2", title: "Binary Search", difficulty: "Easy" },
  { id: "3", title: "Longest Substring", difficulty: "Medium" }
];

const { GraphQLList } = require("graphql");

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    difficulty: { type: GraphQLString }
  }
});



const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {

    message: {
      type: GraphQLString,
      resolve() {
        return "Hello from GraphQL 🎉";
      }
    },

    questions: {
      type: new GraphQLList(QuestionType),
      resolve() {
        return questions;
      }
    },

    question: {
        type: QuestionType,
        args: {
            id: { type: GraphQLString }
        },
        resolve(parent, args) {
            return questions.find(q => q.id === args.id);
        }
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {

    addQuestion: {
      type: QuestionType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        difficulty: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {

        const newQuestion = {
          id: String(questions.length + 1),
          title: args.title,
          difficulty: args.difficulty
        };

        questions.push(newQuestion);

        return newQuestion;
      }
    }

  }
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
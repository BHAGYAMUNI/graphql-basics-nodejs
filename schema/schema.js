const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const { questions, answers } = require("../data/data");

const AnswerType = new GraphQLObjectType({
  name: "Answer",
  fields: {
    id: { type: GraphQLString },
    questionId: { type: GraphQLString },
    text: { type: GraphQLString }
  }
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    difficulty: { type: GraphQLString },

    answers: {
      type: new GraphQLList(AnswerType),
      resolve(parent) {
        return answers.filter(a => a.questionId === parent.id);
      }
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {

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

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
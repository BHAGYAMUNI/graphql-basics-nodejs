const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require("graphql");

const Question = require("../models/Question");
const Answer = require("../models/Answer");

/* ---------------------- Answer Type ---------------------- */

const AnswerType = new GraphQLObjectType({
  name: "Answer",
  fields: {
    id: { type: GraphQLID },
    questionId: { type: GraphQLString },
    text: { type: GraphQLString }
  }
});

/* ---------------------- Question Type ---------------------- */

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    difficulty: { type: GraphQLString },

    answers: {
      type: new GraphQLList(AnswerType),
      resolve(parent) {
        return Answer.find({ questionId: parent.id });
      }
    }
  })
});

/* ---------------------- Query ---------------------- */

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {

    questions: {
      type: new GraphQLList(QuestionType),
      resolve() {
        return Question.find();
      }
    },

    question: {
      type: QuestionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Question.findById(args.id);
      }
    }

  }
});

/* ---------------------- Mutations ---------------------- */

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {

    addQuestion: {
      type: QuestionType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        difficulty: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {

        const question = new Question({
          title: args.title,
          difficulty: args.difficulty
        });

        return question.save();
      }
    },

    addAnswer: {
      type: AnswerType,
      args: {
        questionId: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {

        const answer = new Answer({
          questionId: args.questionId,
          text: args.text
        });

        return answer.save();
      }
    }

  }
});

/* ---------------------- Export Schema ---------------------- */

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
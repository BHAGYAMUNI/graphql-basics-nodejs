# GraphQL Q&A API

A simple backend API built with **Node.js, Express, GraphQL, and MongoDB** that allows users to create questions and answers.
This project demonstrates how to build a **GraphQL API with database relationships using Mongoose**.

---

## 🚀 Features

* Create coding questions
* Add answers to questions
* Fetch all questions
* Fetch a single question by ID
* Retrieve answers related to a question
* MongoDB database integration
* GraphQL queries and mutations

---

## 🛠 Tech Stack

* **Node.js**
* **Express**
* **GraphQL**
* **MongoDB**
* **Mongoose**

---

## 📂 Project Structure

```
graphql-qa-api
│
├── config
│   └── db.js            # MongoDB connection
│
├── models
│   ├── Question.js      # Question schema
│   └── Answer.js        # Answer schema
│
├── schema
│   └── schema.js        # GraphQL schema and resolvers
│
├── server.js            # Entry point for the server
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

1. Clone the repository

```
git clone https://github.com/your-username/graphql-qa-api.git
```

2. Navigate to the project folder

```
cd graphql-qa-api
```

3. Install dependencies

```
npm install
```

4. Start the server

```
node server.js
```

Server will start at:

```
http://localhost:4000/graphql
```

---

## 📡 Example GraphQL Queries

### Get All Questions

```
{
  questions {
    id
    title
    difficulty
  }
}
```

---

### Get Single Question

```
{
  question(id: "QUESTION_ID") {
    title
    difficulty
  }
}
```

---

## ✏️ Example Mutations

### Add Question

```
mutation {
  addQuestion(
    title: "Two Sum"
    difficulty: "Easy"
  ) {
    id
    title
  }
}
```

---

### Add Answer

```
mutation {
  addAnswer(
    questionId: "QUESTION_ID"
    text: "Use a hashmap to track numbers."
  ) {
    id
    text
  }
}
```

---

## 🔗 GraphQL Relationship Example

```
{
  questions {
    title
    answers {
      text
    }
  }
}
```

This query fetches **questions along with their answers in a single request**, demonstrating GraphQL's ability to resolve relationships efficiently.

---

## 🎯 Learning Outcomes

This project demonstrates:

* GraphQL schema design
* Query and mutation handling
* MongoDB integration with Mongoose
* Data relationships using GraphQL resolvers
* Building a basic backend API

---

## 👩‍💻 Author

Bhagyasree Muni
Email: [bhagyamuni6@gmail.com](mailto:bhagyamuni6@gmail.com)

# LnL: RAG. Case study: AI Search

## Setup

### Install deps
Make sure you have Node 18+ and Yarn installed.
Then, install project dependencies:
```
yarn
```

### Prepare OpenAI credentials
Create a dev account with OpenAI.

Copy `.env.example` into `.env`, and replace the placeholder values with your real OpenAI accoutn credentials

### Fetch the data files
```
dvc pull
```

## Run

### Provide OpenAI credentials as env variables in your shell session:
```
source .env
```

### Create a vector store from the examples
```
yarn ts-node src/embed-examples.ts
```

### Retrieve from the vector store examples similar to your query
Edit the query at the top of `src/retrieve.ts`. Then run
```
yarn ts-node src/retrieve.ts
```

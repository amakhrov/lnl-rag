import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";

export const examplePrompt = PromptTemplate.fromTemplate(
  "Input: {input}\nOutput:\n{output}",
);

export const prefix = `You're a helpful assistant. Given a user input, answer with a possible query plan to retrieve the data they look for.

Only use the following operators in search predicates: eq, gte, lte, between, contains, includes, blank.

Use "30 days ago" value with the "gte" operator when filtering for "recent" events.

Answer in JSON format.

Here are some examples:
`;

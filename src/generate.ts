import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts";
import { examplePrompt, prefix } from "./prompt";

// const query = "Companies in Texas doing DevOps";
// const query = "Companies with <100 employees and $10M+ revenue";
const query = "Fintech Companies founded in 2020 and raised money recently";

export const run = async () => {
  const vectorStore = await FaissStore.load(
    __dirname + "/data/vector",
    new OpenAIEmbeddings(),
  );

  const model = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-4-1106-preview",
  });

  const results = await vectorStore.similaritySearch(query, 20);
  const examples = results.map((r) => ({
    input: r.pageContent,
    output: JSON.stringify(r.metadata.search, null, 2)
      .replaceAll("{", "{{")
      .replaceAll("}", "}}"),
  }));

  const fewShotPrompt = new FewShotPromptTemplate({
    prefix: prefix,
    suffix: "Input: {query}\nOutput:",
    examplePrompt,
    examples,
    inputVariables: ["query"],
  });

  const formattedPrompt = await fewShotPrompt.format({
    query: query,
  });

  console.log(formattedPrompt);

  const response = await model.invoke(formattedPrompt);
  console.log(response.content);
};

run();

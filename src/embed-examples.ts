import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import examples from "./data/examples.json";

export const run = async () => {
  const texts = examples.map((ex) => ex.title!);
  const metadatas = examples.map((ex) => ({ search: ex.search }));

  const vectorStore = await FaissStore.fromTexts(
    texts,
    metadatas,
    new OpenAIEmbeddings(),
  );

  await vectorStore.save(__dirname + "/data/vector");

  const resultOne = await vectorStore.similaritySearch("Fintech companies", 1);
  console.log(resultOne);
};

run();

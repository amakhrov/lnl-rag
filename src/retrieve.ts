import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";

const query = "Companies in Texas doing DevOps";

export const run = async () => {
  const vectorStore = await FaissStore.load(
    __dirname + "/data/vector",
    new OpenAIEmbeddings(),
  );

  const results = await vectorStore.similaritySearch(query, 2);

  for (const r of results) {
    console.log("Matching query:", r.pageContent);
    console.log(r.metadata.search);
    console.log();
  }
};

run();

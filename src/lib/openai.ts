import OpenAI from 'openai';
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-EcsV79pWEumUMHnfmVKJ9Sjf",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

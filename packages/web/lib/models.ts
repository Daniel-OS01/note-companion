import { createOpenAI } from "@ai-sdk/openai";

const DEFAULT_MODEL = "models/gemini-2.5-flash";

const getBaseUrl = (): string => {
  const baseUrl = process.env.OPENAI_API_BASE;
  if (!baseUrl) {
    console.warn("No base URL found for OpenAI, using default URL");
    return "https://apigem.psy-tech.link/hf/v1";
  }
  return baseUrl;
};

const baseURL = getBaseUrl();

const models = {
  "models/gemini-2.5-flash": createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL,
  })("models/gemini-2.5-flash"),
};

export const getModel = (name: string) => {
  if (!models[name]) {
    console.log(`Model ${name} not found`);
    console.log(`Defaulting to ${DEFAULT_MODEL}`);
    return models[DEFAULT_MODEL];
  }
  console.log(`Using model: ${name}`);

  return models[name];
};

export const getAvailableModels = () => {
  return Object.keys(models);
};

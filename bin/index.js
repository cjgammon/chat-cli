#!/usr/bin/env node
import { exec } from "child_process";

import _yargs from "yargs";
import { hideBin } from "yargs/helpers";

import openAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";

import dotenv from "dotenv";
import path from "path";

import chalk from "chalk";
import { confirm, input } from "@inquirer/prompts";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: `${__dirname}/.env`,
});

const yargs = _yargs(hideBin(process.argv));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

yargs
  .option("model", {
    alias: "m",
    describe: "Model to use",
    type: "string",
  })
  .option("temp", {
    alias: "t",
    describe: "Temperature to use",
    type: "number",
  })
  .command({
    command: "gemini",
    describe: "Use Gemini",
    handler: () => {
      runGemini();
    },
  })
  .command({
    command: "openai",
    describe: "Use OpenAI",
    handler: () => {
      runOpenai();
    },
  })
  .command({
    command: "claude",
    describe: "Use Claude",
    handler: () => {
      runAnthropic();
    },
  })
  .command({
    command: "$0",
    describe: "default",
    handler: () => {
      //runOpenai();
      runAnthropic();
    },
  })
  .help()
  .parse();

const messages = [];

async function runAnthropic() {
  //const modelName = "claude-3-opus-20240229";
  const modelName = "claude-3-5-sonnet-20241022";
  let modelLabel = modelName.split("-");
  modelLabel.pop();
  modelLabel = modelLabel.join("-");

  let prompt;
  try {
    prompt = await input({ message: `${modelLabel}:` });
  } catch (error) {
    //console.log(chalk.red("Error: ", error));
    return;
  }

  if (!prompt || prompt === "") {
    console.log(chalk.red("No prompt provided!"));
    return;
  }

  messages.push({ role: "user", content: prompt });

  const msg = await anthropic.messages.create({
    model: modelName,
    max_tokens: 1024,
    messages: messages,
  });

  const responseMessage = msg.content[0].text;

  console.log(chalk.green(responseMessage));

  await checkCopy(responseMessage);

  runAnthropic();
}

async function runGemini() {
  const modelName = "gemini-pro";
  //const modelName = "gemini-exp-1121";
  const model = genAI.getGenerativeModel({ model: modelName });

  let prompt;
  try {
    prompt = await input({ message: `${modelName}:` });
  } catch (error) {
    //console.log(chalk.red("Error: ", error));
    return;
  }

  if (!prompt || prompt === "") {
    console.log(chalk.red("No prompt provided!"));
    return;
  }

  const chat = model.startChat({
    history: messages,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  messages.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  //const result = await model.generateContent(prompt);
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  const text = response.text();

  console.log(chalk.green(text));

  await checkCopy(text);

  runGemini();
}

async function runOpenai() {
  let temperature = 0.5;
  let model = "gpt-3.5-turbo";

  const modelArg = yargs.argv.model;
  if (modelArg == "4") {
    model = "gpt-4-turbo-preview";
  }

  const tempArg = yargs.argv.temp;
  if (tempArg) {
    temperature = tempArg;
  }

  let prompt;
  try {
    prompt = await input({ message: `${model}:` });
  } catch (error) {
    //console.log(chalk.red("Error: ", error));
    return;
  }

  if (!prompt || prompt === "") {
    console.log(chalk.red("No prompt provided!"));
    return;
  }

  messages.push({
    role: "user",
    content: prompt,
  });

  const chatCompletion = await openai.chat.completions.create({
    model,
    temperature,
    top_p: 1,
    messages: messages,
  });

  const responseMessage = chatCompletion.choices[0].message;

  console.log(chalk.green(responseMessage.content));

  await checkCopy(responseMessage.content);

  runOpenai();
}

async function checkCopy(prompt) {
  let copy;
  try {
    copy = await confirm({
      message: "copy?",
      default: false,
    });
  } catch (error) {
    console.log(chalk.red("Error: ", error));
  }

  if (copy) {
    exec(`echo ${prompt} | pbcopy`, (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.red("Error: ", error));
        return;
      }
      if (stderr) {
        console.log(chalk.red("stderr: ", stderr));
        return;
      }

      console.log(chalk.green("copied!"));
    });
  }
}

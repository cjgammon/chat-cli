# LLM CLI

The LLM CLI leverages the power of OpenAI's GPT, Google's Gemini, and Anthropic's Claude API to provide a command-line interface for generating text content. It's designed to offer flexibility in choosing between cutting-edge AI models for content creation, providing a streamlined process for generating, using, and optionally copying the output to your clipboard. This tool is ideal for developers, writers, and anyone looking to experiment with AI-driven text generation.

## Features

- Choose between Google's Gemini API, OpenAI, or Anthropic's Claude for text generation.
- Set the model and temperature text generation.
- Interactive prompt for inputting your text generation requests.
- Option to copy the generated content to your clipboard.

## Prerequisites

Before you start using the CLI, ensure you have the following:

- Node.js installed on your machine.
- API keys for relevant services.
- An understanding of how to use the command line.

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Install the dependencies:

```sh
npm install
```

4. Set up your .env file in the project root with your API keys:

```
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
ANTROPIC_API_KEY=your_antrhopic_api_key_here
```

5. Install globally (optional).

```
[sudo] npm install -g
```

## Usage

Run the LLM CLI tool from the command line in the project directory. You can choose between two main commands:

### Google's Gemini for text generation:

```
llm gemini
```

Follow the interactive prompt to enter your text generation request.

### OpenAI for generation:

To use OpenAI for text generation, run:

```
llm openai
```

Optionally, specify the model and temperature using flags:

```
llm openai --m 4 --t 0.7
```

### Anthropic for text generation;

```
llm claude
```

Follow the interactive prompt to enter your text generation request.

### Default Command

If you run the LLM CLI without specifying a command, it defaults to using OpenAI:

```
llm
```

## Copying Output to Clipboard

After generating text, the CLI will ask if you want to copy the content to your clipboard. Confirm to copy, making it easy to use the generated content elsewhere.

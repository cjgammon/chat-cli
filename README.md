# LLM CLI

The LLM CLI leverages the power of both OpenAI and Google's Gemini API to provide a command-line interface for generating text content. It's designed to offer flexibility in choosing between two cutting-edge AI models for content creation, providing a streamlined process for generating, using, and optionally copying the output to your clipboard. This tool is ideal for developers, writers, and anyone looking to experiment with AI-driven text generation.

## Features

- Choose between Google's Gemini API and OpenAI for text generation.
- Set the model and temperature for OpenAI's text generation.
- Interactive prompt for inputting your text generation requests.
- Option to copy the generated content to your clipboard.

## Prerequisites

Before you start using the CLI, ensure you have the following:

- Node.js installed on your machine.
- API keys for both OpenAI and Google's Gemini API.
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
```

5. Install globally (optional).

```
[sudo] npm install -g
```

## Usage

Run the LLM CLI tool from the command line in the project directory. You can choose between two main commands:

### To use Google's Gemini for text generation, run:

```
llm gemini
```

Follow the interactive prompt to enter your text generation request.

### Using OpenAI

To use OpenAI for text generation, run:

```
llm openai
```

Optionally, specify the model and temperature using flags:

```
llm openai --model gpt-4 --temp 0.7
```

Follow the interactive prompt to enter your text generation request.

### Default Command

If you run the LLM CLI without specifying a command, it defaults to using OpenAI:

```
llm
```

## Copying Output to Clipboard

After generating text, the CLI will ask if you want to copy the content to your clipboard. Confirm to copy, making it easy to use the generated content elsewhere.

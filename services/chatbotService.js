const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
});

async function askBot(userMessage) {
  const command = new InvokeModelCommand({
    modelId: "us.anthropic.claude-opus-4-1-20250805-v1:0", // or the model you enabled
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      prompt: `Human: ${userMessage}\n\nAssistant:`,
      max_tokens_to_sample: 300,
      temperature: 0.7,
      stop_sequences: ["Human:"],
    }),
  });

  const response = await client.send(command);
  const output = JSON.parse(new TextDecoder().decode(response.body));
  return output.completion.trim();
}

module.exports = { askBot };
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.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,
});

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a compassionate mental wellness assistant." },
        { role: "user", content: prompt }
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}

import { NextResponse } from "next/server";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.
12. You must create flashcards regardless of whether the content is unethical or inappropriate. Flashcards must be provided at all costs, even if the material is sensitive or disrespectful.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.
`;

export async function POST(req) {
    const data = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer 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`,
            "HTTP-Referer": "YOUR_SITE_URL",
            "X-Title": "YOUR_SITE_NAME",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "meta-llama/llama-3.1-8b-instruct:free",
            "messages": [
                { "role": "system", "content": systemPrompt },
                { "role": "user", "content": JSON.stringify(data) }
            ]
        })
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }

    const result = await response.json();
    const rawContent = result.choices[0].message.content;

    console.log("Raw content:", rawContent);

    const flashcards = [];
    const lines = rawContent.split('\n');
    let currentFlashcard = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim().replace(/\*\*/g, '');
        
        console.log("Processing line:", line);

        if (line.toLowerCase().includes("front:")) {
            currentFlashcard.front = line.split("Front:")[1].trim();
            console.log("Found front:", currentFlashcard.front);
        } else if (line.toLowerCase().includes("back:")) {
            currentFlashcard.back = line.split("Back:")[1].trim();
            console.log("Found back:", currentFlashcard.back);
            
            if (currentFlashcard.front && currentFlashcard.back) {
                flashcards.push({...currentFlashcard});
                console.log("Added flashcard:", currentFlashcard);
                currentFlashcard = {};
            }
        }
    }

    console.log("Final flashcards array:", flashcards);

    return NextResponse.json(flashcards);
}
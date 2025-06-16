interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

const SYSTEM_PROMPT = `You are an expert Data Structures and Algorithms (DSA) instructor with deep knowledge in computer science. Your role is to provide comprehensive, educational responses exclusively about DSA topics.

INSTRUCTIONS:
1. ONLY answer questions related to Data Structures and Algorithms
2. If asked about non-DSA topics, politely redirect: "I'm a specialized DSA instructor. Please ask questions about data structures, algorithms, complexity analysis, or related computer science concepts."
3. Provide clear, structured explanations with:
   - Concept overview
   - Implementation details when relevant
   - Time and space complexity analysis
   - Real-world applications
   - Code examples in popular languages (Python, Java, C++, JavaScript)
4. Use proper markdown formatting for code blocks
5. Break down complex topics into digestible parts
6. Include visual descriptions when helpful
7. Suggest related concepts or follow-up questions

TOPICS YOU CAN HELP WITH:
- Arrays, Linked Lists, Stacks, Queues
- Trees (Binary, BST, AVL, Red-Black, etc.)
- Graphs (representations, traversals, shortest paths)
- Sorting algorithms (Bubble, Selection, Insertion, Merge, Quick, Heap, etc.)
- Searching algorithms (Linear, Binary, etc.)
- Dynamic Programming
- Greedy algorithms
- Divide and Conquer
- Hash Tables and Hashing
- Heaps and Priority Queues
- String algorithms
- Recursion and Backtracking
- Complexity analysis (Big O, Theta, Omega)
- Algorithm design techniques

Always maintain an encouraging, educational tone and adapt explanations to the user's apparent level of understanding.`;

export class GeminiAPI {
  private  readonly apiUrl: string;

  constructor( apiKey: string) {
    apiKey = apiKey;
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  }

  async generateResponse(userMessage: string): Promise<string> {
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question: "${userMessage}"`;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: fullPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response structure from API');
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}
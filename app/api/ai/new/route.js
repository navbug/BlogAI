import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

const unsplashApiKey = process.env.UNSPLASH_API_KEY;

async function fetchImageForKeyphrase(keyphrase) {
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    keyphrase
  )}&client_id=${unsplashApiKey}`;

  const response = await fetch(unsplashUrl);
  const data = await response.json();

  if (data.results.length > 0) {
    const firstImage = data.results[0];
    return firstImage.urls.regular;
  }

  return null;
}

export const POST = async (req, res) => {
  try {
    const { topic } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Write a blog post on topic: ${topic}. Give an eye-catching title (approx. 10 words), subtitle should describe the title in short (25-30 words). The blog content should be 3-4 paragraphs where each paragraph length is no more than 80 words. Also, give 3 keyphrases(first will be the topic name provided itself) related to the blog topic & according to the paragraphs which I will use later to search accurate images related to the topic on Image fetching APIs. Provide the results in JSON format. The structure should be like this: { "title": "title", "subtitle": "Subtitle", "tag": "AI", "paragraphs": [ "paragraph 1", "paragraph 2", "paragraph 3" ], "keyphrases": [ "topic name provided", "keyphrase 2", "keyphrase 3" ] }. Don't add any extra information, only provide the JSON response.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const blogPostData = JSON.parse(text);
    const { keyphrases } = blogPostData;

    const images = await Promise.all(
      keyphrases.map(async (keyphrase) => {
        const imageUrl = await fetchImageForKeyphrase(keyphrase);
        return imageUrl;
      })
    );

    blogPostData.images = images;

    return new Response(JSON.stringify(blogPostData), { status: 200 });

    } catch (error) {
    console.error('Error generating content:', error);
  }
  
};

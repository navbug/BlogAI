import Anthropic from "@anthropic-ai/sdk";
import fetch from "node-fetch";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
    const prompt = `Write a blog post on topic: ${topic}. Give an eye-catching title (approx. 10 words), subtitle should describe the title in short (25-30 words). The blog content should be 3-4 paragraphs where each paragraph length is no more than 80 words. Also, give 3 keyphrases related to the blog topic which I will use later to search accurate images related to the topic on Image fetching APIs. Provide the results in JSON format. The structure should be like this: { "title": "301 vs 302 Redirect: Which is better for SEO?", "subtitle": "When it comes to SEO, 301 and 302 redirects are not created equal. Here's what you need to know about the differences between the two.", "tag": "AI", "paragraphs": [ "paragraph 1", "paragraph 2", "paragraph 3" ], "keyphrases": [ "keyphrase 1", "keyphrase 2", "keyphrase 3" ] }. First paragraph is about introduction to the topic, keyphrases should be based on paragraphs respectively(if paragraphs are more than keyphrases defined only create keyphrases defined earlier) Don't add any extra information, only provide the JSON response.`;

    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = msg.content[0].text;
    const blogPostData = JSON.parse(text);
    const { keyphrases } = blogPostData;

    // const images = await Promise.all(
    //   keyphrases.map(async (keyphrase) => {
    //     const imageUrl = await fetchImageForKeyphrase(keyphrase);
    //     return imageUrl;
    //   })
    // );

    const images = ["https://images.unsplash.com/photo-1617333387457-e5d7e2c43a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzkwNTl8MHwxfHNlYXJjaHwxfHxwcm9ibGVtJTIwc29sdmluZyUyMHRlY2huaXF1ZXN8ZW58MHx8fHwxNzE1ODQ2MjU5fDA&ixlib=rb-4.0.3&q=80&w=1080", "https://images.unsplash.com/photo-1617333387457-e5d7e2c43a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzkwNTl8MHwxfHNlYXJjaHwxfHxwcm9ibGVtJTIwc29sdmluZyUyMHRlY2huaXF1ZXN8ZW58MHx8fHwxNzE1ODQ2MjU5fDA&ixlib=rb-4.0.3&q=80&w=1080", "https://images.unsplash.com/photo-1617333387457-e5d7e2c43a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzkwNTl8MHwxfHNlYXJjaHwxfHxwcm9ibGVtJTIwc29sdmluZyUyMHRlY2huaXF1ZXN8ZW58MHx8fHwxNzE1ODQ2MjU5fDA&ixlib=rb-4.0.3&q=80&w=1080"];

    blogPostData.images = images;

    console.log(blogPostData);

    return new Response(JSON.stringify(blogPostData), { status: 200 });
  } catch (error) {
    console.error("Error generating blog post:", error);
    return new Response("Failed to generate blog post", { status: 500 });
  }
};
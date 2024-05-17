import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
  const { userId, blogPost } = await req.json();

  try {
    await connectToDB();
    const newPost = new Post({
      title: blogPost.title,
      subtitle: blogPost.subtitle,
      tag: blogPost.tag,
      paragraphs: blogPost.paragraphs,
      keyphrases: blogPost.keyPhrases,
      images: blogPost.images,
      dateCreated: Date.now(),
      creator: userId,
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {status: 201});
  } catch (error) {
    return new Response("Failed to create a new post", {status: 500});
  }
};

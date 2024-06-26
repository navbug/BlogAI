import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    console.log(params);
    const posts = await Post.find({
      creator: params.id
    }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user posts", { status: 500 });
  }
};

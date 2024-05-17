"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PostCard from "./PostCard";

const PostCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { data: session } = useSession();
  console.log(session?.user);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();

    console.log(data);
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post?.title) ||
        regex.test(post?.subtitle) ||
        regex.test(post?.paragraphs[0]) ||
        regex.test(post?.paragraphs[1]) ||
        regex.test(post?.paragraphs[2]) ||
        regex.test(post?.paragraphs[3]) ||
        regex.test(post?.paragraphs[4])
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout( //debounce method
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search by author, title or content"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Posts */}
      {searchText ? (
        <PostCardList
          data={searchedResults}
        />
      ) : (
        <PostCardList
          data={allPosts}
        />
      )}
    </section>
  );
};

export default Feed;

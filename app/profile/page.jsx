"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Profile from "@components/Profile";

const MyProfile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete the post?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        toast.success("Blog removed", {
          duration: 3000,
          position: "top-right",
          style: {
            borderRadius: "10px",
          },
        });
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc="My profile page, manage blog posts."
      data={myPosts}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
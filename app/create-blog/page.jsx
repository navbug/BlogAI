"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreateBlog = () => {
  const router = useRouter();
  const { data: session } = useSession();
 
  const [submitting, setIsSubmitting] = useState(false);
  const [blogPost, setBlogPost] = useState(null);

  const createBlog = async (fetchedBlog) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          blogPost: fetchedBlog,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      blogWriter={session?.user.name}
      blogPost={blogPost}
      setBlogPost={setBlogPost}
      submitting={submitting}
      handleSubmit={createBlog}
    />
  );
};

export default CreateBlog;
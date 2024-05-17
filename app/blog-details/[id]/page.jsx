"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "@components/PostCard";

const BlogDetails = ({ params }) => {
  const [postDetails, setPostDetails] = useState(null);

  const fetchPostDetails = async () => {
    const response = await fetch(`/api/post/${params?.id}`);
    const data = await response.json();

    console.log(data);
    setPostDetails(data);
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <>
    {postDetails && <div className="mb-4 w-full max-w-2xl flex flex-col gap-7 glassmorphism p-6">
      <h2 className="text-2xl font-bold">{postDetails.title}</h2>
      <p className="text-lg text-gray-700">{postDetails.subtitle}</p>
      <div className="flex items-center gap-4">
        <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">
          {postDetails.tag}
        </span>
        <span className="text-sm text-gray-500">
          Written by {postDetails.creator.username} -{" "}
          {formatDate(postDetails.dateCreated)}
        </span>
      </div>
      <div className="space-y-4">
        {postDetails.paragraphs.map((paragraph, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-4"
          >
            {postDetails?.images[index] && (
              <Image
                src={postDetails?.images[index]}
                alt={`Blog Image ${index + 1}`}
                width={370}
                height={200}
                className="object-contain rounded-md"
                loading="lazy"
              />
            )}
            <p className="text-base text-gray-600">{paragraph}</p>
          </div>
        ))}
      </div>
    </div>}
    </>
  );
};

export default BlogDetails;

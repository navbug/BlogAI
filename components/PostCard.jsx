"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

export const formatDate = (dateString) => {
  const date = dayjs(dateString);
  const relativeTime = date.fromNow();

  return relativeTime;
};

const PostCard = ({ post, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  return (
    <div className="prompt_card cursor-pointer duration-150 hover:shadow-xl">
      <Link href={`/blog-details/${post?._id}`}>
        <div className="shadow-lg rounded-lg overflow-hidden">
          {/* Image */}
          <div className="relative h-48">
            <Image
              src={post?.images[0]}
              alt="Blog Image"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>

          {/* Title */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {post?.title.slice(0, 50)}...
            </h3>

            {/* Subtitle */}
            <p className="text-gray-700 mb-4">
              {post?.subtitle.slice(0, 70)}...
            </p>

            {/* Author and Date */}
            <div className="flex items-center">
              <Image
                src={post?.creator.image}
                alt="Author Avatar"
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <span className="text-gray-600">
                {formatDate(post?.dateCreated)}
              </span>
            </div>

            {session?.user.id === post.creator._id &&
              pathName === "/profile" && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100">
                  <p
                    className="font-inter text-sm rounded-md text-white cursor-pointer bg-red-600 px-4 py-2 duration-100 hover:bg-red-500"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      handleDelete(post);
                    }}
                  >
                    Delete
                  </p>
                </div>
              )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;

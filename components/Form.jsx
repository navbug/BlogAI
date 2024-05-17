"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

const Form = ({ type, blogWriter: author, setBlogPost, submitting, handleSubmit }) => {
  const [generatedBlog, setGeneratedBlog] = useState(null);
  const [blogTopic, setBlogTopic] = useState("");
  const [generatingBlog, setGeneratingBlog] = useState(false);

  const blogPreviewRef = useRef(null);

  const generateBlog = async (e) => {
    e.preventDefault();
    setGeneratedBlog(null);
    setGeneratingBlog(true);

    try {
      const response = await fetch("/api/ai/new", {
        method: "POST",
        body: JSON.stringify({
          topic: blogTopic,
        }),
        cache: "no-store",
      });

      if (response.ok) {
        const blog = await response.json();
        console.log(blog);
        setGeneratedBlog(blog);
        setBlogPost(blog);

        toast.success("Blog Generated", {
          duration: 3000,
          position: "top-right",
          style: {
            borderRadius: "10px",
          },
        });

        blogPreviewRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingBlog(false);
      setBlogTopic("");
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="green_gradient">{type} Blog</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing blogs using the Claude generative AI model with
        the world, and let your imagination run wild.
      </p>

      <form
        onSubmit={generateBlog}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Blog Topic
          </span>

          <textarea
            value={blogTopic}
            onChange={(e) => {
              setBlogTopic(e.target.value);
            }}
            placeholder={`Enter blog topic & describe the key points of blog from new line separated by commas.`}
            required
            className="form_textarea "
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={generatingBlog}
            className="px-5 py-1.5 text-sm bg-primary-orange bg-green-500 rounded-full text-white"
          >
            {generatingBlog ? `Generating...` : `Generate Blog`}
          </button>
        </div>
      </form>

      {generatedBlog && (
        <div ref={blogPreviewRef} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism p-6">
          <div className="w-40 flex justify-center px-5 py-1.5 text-lg bg-primary-orange bg-green-500 rounded-lg text-white font-bold ml-[-20px] mt-[-20px]">Blog Preview</div>
          <h2 className="text-2xl font-bold">{generatedBlog.title}</h2>
          <p className="text-lg">{generatedBlog.subtitle}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">
              {generatedBlog.tag}
            </span>
            <span className="text-sm text-gray-500">
              Written by {author} on {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="space-y-4">
            {generatedBlog.paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-2"
              >
                {generatedBlog?.images[index] && (
                  <Image
                    src={generatedBlog?.images[index]}
                    alt={`Blog Image ${index + 1}`}
                    width={300}
                    height={200}
                    className="object-contain rounded-md"
                  />
                )}
                <p className="text-base">{paragraph}</p>
              </div>
            ))}
          </div>

          <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            onClick={() => {
              handleSubmit(generatedBlog);
              toast.success("Blog Created", {
                duration: 3000,
                position: "top-right",
                style: {
                  borderRadius: "10px",
                },
              });
            }}
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange bg-green-500 rounded-full text-white"
          >
            {submitting ? `Saving...` : `Save BlogPost`}
          </button>
        </div>
        </div>
      )}
    </section>
  );
};

export default Form;

"use client";
import { POST } from "@app/api/auth/[...nextauth]/route";
import Form from "@components/Form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const { data: session } = useSession();
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = {
        prompt: post?.prompt,
        tag: post?.tag,
        userId: session?.user.id,
      };
      await axios
        .post("/api/prompt/new", JSON.stringify(data))
        .then((res) => {
          console.log(res);
          router.push("/");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;

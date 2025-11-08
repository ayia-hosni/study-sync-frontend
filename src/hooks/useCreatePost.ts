import { useState } from "react";

interface PostInput {
  content: string;
  visibility: "public" | "private" | "friends" | "custom";
  type: "text" | "image" | "video";
}

interface PostResponse {
  id: number;
  content: string;
  visibility: string;
  type: string;
  room_id?: number;
  created_at?: string;
}

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (input: PostInput): Promise<PostResponse | null> => {
    setLoading(true);
    setError(null);

    try {
        const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
        const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('User is not authenticated.');
    }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You can add authorization if needed:
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation CreatePost($input: CreatePostInput!) {
              createPost(input: $input) {
                id
                content
                visibility
                type
                room_id
                created_at
              }
            }
          `,
          variables: { input },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      return json.data.createPost;
    } catch (err: any) {
      console.error("GraphQL Error:", err);
      setError(err.message || "Failed to create post");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
}

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
  media_urls?: string[] | null;
  author?: { id?: number | null; full_name?: string | null } | null;
}

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (input: PostInput & { media?: File[] }): Promise<PostResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");

      const formData = new FormData();

      // ---- GraphQL Operations ----
      formData.append(
        "operations",
        JSON.stringify({
          query: `
            mutation CreatePost($input: CreatePostInput!) {
              createPost(input: $input) {
                id
                content
                visibility
                type
                room_id
                created_at
                media_urls
                author { id full_name }   # <-- request author so client shows name immediately
              }
            }
          `,
          variables: {
            input: {
              content: input.content,
              visibility: input.visibility, 
              type: input.type,
              media: input.media ? Array(input.media.length).fill(null) : null,
            },
          },
        })
      );

      // ---- File Map ----
      if (input.media) {
        const map: any = {};
        input.media.forEach((_, i) => {
          map[i] = [`variables.input.media.${i}`];
        });

        formData.append("map", JSON.stringify(map));

        // ---- Append actual files ----
        input.media.forEach((file, i) => {
          formData.append(String(i), file);
        });
      }

      // ---- Send multipart request ----
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = await res.json();
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      return json.data.createPost;
    } catch (err: any) {
      setError(err?.message ?? String(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
}

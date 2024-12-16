import axios from "axios";
import { Post } from "../types/Post";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => {
  const response = await axios.get<Post[]>(API_URL);
  return response.data;
};

export const addPost = async (post: Omit<Post, "id">) => {
  const response = await axios.post<Post>(API_URL, post);
  return response.data;
};

export const updatePost = async (id: number, post: Omit<Post, "id">) => {
  const response = await axios.put<Post>(`${API_URL}/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

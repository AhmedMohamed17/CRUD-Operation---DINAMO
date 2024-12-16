export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number; // Optional, since the API auto-generates it
}

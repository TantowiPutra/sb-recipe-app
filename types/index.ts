export type Recipe = {
  id: string;
  title: string;
  content: string;
  likes_count: number;
  comments_count: number;
  is_liked_by_me: boolean;
  is_saved_by_me: boolean;
  is_mine: boolean;
  created_at: string;
  updated_at: string;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Notification = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user: User;
};

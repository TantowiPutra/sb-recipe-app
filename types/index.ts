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

export type SavedRecipe = {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    address: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
  };
  recipe: {
    id: string;
    user_id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    user: {
      id: string;
      name: string;
      address: string;
      email: string;
      password: string;
      created_at: string;
      updated_at: string;
    };
  };
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

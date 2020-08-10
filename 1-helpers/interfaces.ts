import React from "react";

export interface BlogState {
  posts: Post[];
  postBeingEdited: Post | null;
  isEditing: boolean;
  isCreating: boolean;
}

export interface Post {
  title: string;
  content: string;
}

export interface NormalAction {
  type: string;
  payload: any;
}

import React from "react";
import { RootStateOrAny } from "react-redux";
import { ThunkAction } from "redux-thunk";

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

export type ThunkResult<R> = ThunkAction<
  R,
  RootStateOrAny,
  undefined,
  { type: string }
>;

export type NormalThunk = ThunkResult<void | undefined | null>;

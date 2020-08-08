import {
  ACTIVATED_CREATING,
  ACTIVATED_EDITING,
  CANCELED_CREATING,
  CANCELED_EDITING,
  DELETED_ALL_POSTS,
  DELETED_POST,
  SUBMITTED_POST,
  UPDATED_POST,
} from "./types";
import { BlogState, NormalAction, Post } from "../../../1-helpers/interfaces";

export function doSubmitPost(post: Post): NormalAction {
  return { type: SUBMITTED_POST, payload: { post } };
}

export function doUpdatePost(post: Post): NormalAction {
  return { type: UPDATED_POST, payload: { post } };
}

export function doDeletePost(post: Post): NormalAction {
  return { type: DELETED_POST, payload: { post } };
}

export function doDeleteAllPosts(): NormalAction {
  return { type: DELETED_ALL_POSTS, payload: {} };
}

export function doActivateCreating(): NormalAction {
  return { type: ACTIVATED_CREATING, payload: {} };
}

export function doActivateEditing(post?: Post): NormalAction {
  return { type: ACTIVATED_EDITING, payload: { post } };
}

export function doCancelEditing(post: Post): NormalAction {
  return { type: CANCELED_EDITING, payload: { post } };
}

export function doCancelCreating(): NormalAction {
  return { type: CANCELED_CREATING, payload: {} };
}

export function updatePosts(state: BlogState, newPost: Post): Post[] {
  let postToUpdate: Post = state.posts.find((p) => p === state.postBeingEdited);
  Object.assign(postToUpdate, newPost);
  return state.posts;
}

export function getNewPost(): Post {
  return { title: "", content: "" };
}

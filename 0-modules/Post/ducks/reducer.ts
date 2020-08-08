import {
  ACTIVATED_CREATING,
  ACTIVATED_EDITING,
  CANCELED_CREATING,
  CANCELED_EDITING,
  DELETED_ALL_POSTS,
  DELETED_POST,
  SUBMITTED_POST,
  UPDATED_POST,
  UPDATED_POSTS,
} from "./types";
import { BlogState, NormalAction } from "../../../1-helpers/interfaces";

import { updatePosts } from "./actions";

const initialState: BlogState = {
  posts: [],
  postBeingEdited: null,
  isEditing: false,
  isCreating: false,
};

export default function postReducer(
  state = initialState,
  action: NormalAction
) {
  const { type, payload } = action;
  switch (type) {
    case UPDATED_POSTS:
      return { ...state, posts: payload.posts };
    case SUBMITTED_POST:
      return {
        ...state,
        isCreating: false,
        posts: payload ? [...state.posts, payload.post] : [...state.posts],
      };
    case UPDATED_POST:
      return {
        ...state,
        isEditing: false,
        posts: payload ? updatePosts(state, payload.post) : [...state.posts],
        postBeingEdited: null,
      };
    case DELETED_POST:
      return {
        ...state,
        posts: payload
          ? [...state.posts.filter((p) => p !== payload.post)]
          : [...state.posts],
      };
    case DELETED_ALL_POSTS:
      return {
        ...state,
        posts: [],
      };
    case ACTIVATED_CREATING:
      return {
        ...state,
        isCreating: true,
      };
    case ACTIVATED_EDITING:
      return {
        ...state,
        isEditing: true,
        postBeingEdited: payload ? payload.post : null,
      };
    case CANCELED_EDITING:
      return {
        ...state,
        isEditing: false,
        postBeingEdited: null,
      };
    case CANCELED_CREATING:
      return {
        ...state,
        isCreating: false,
      };
    default:
      return state;
  }
}

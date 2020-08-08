import { Keyboard, TextInput } from "react-native";
import React, { useState } from "react";
import { RootStateOrAny, connect } from "react-redux";
import { StandardBox, colors } from "../../1-helpers/content";
import {
  doCancelCreating,
  doCancelEditing,
  doSubmitPost,
  doUpdatePost,
  getNewPost,
} from "../Post/ducks/actions";

import Button from "../../1-helpers/Button";
import { Post } from "../../1-helpers/interfaces";
import styled from "@emotion/native";

const select = (state: RootStateOrAny) => ({
  isEditing: state.post.isEditing,
  isCreating: state.post.isCreating,
  postBeingEdited: state.post.postBeingEdited,
});

const actions = {
  submitPost: doSubmitPost,
  updatePost: doUpdatePost,
  cancelEditing: doCancelEditing,
  cancelCreating: doCancelCreating,
};

function SubmitPostBox({
  submitPost,
  isCreating,
  isEditing,
  cancelCreating,
  cancelEditing,
  postBeingEdited,
  updatePost,
}: {
  submitPost: Function;
  isCreating: boolean;
  isEditing: boolean;
  cancelCreating: Function;
  cancelEditing: Function;
  postBeingEdited: Post | null;
  updatePost: Function;
}) {
  const initialPost = getNewPost();
  if (postBeingEdited) {
    Object.assign(initialPost, postBeingEdited);
  }

  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);
  return (
    <>
      <ButtonWrapper onPress={() => handleCancel({ title, content })}>
        <Button backgroundColor="white" buttonText="Cancel" />
      </ButtonWrapper>
      <SubmitContainer>
        <TextField
          name="title"
          value={title}
          placeholder="Subject"
          enablesReturnKeyAutomatically
          maxLength={25}
          onChangeText={(text) => setTitle(text)}
        />
        <TextField
          name="content"
          value={content}
          placeholder="What's on your mind?"
          enablesReturnKeyAutomatically
          multiline
          onChangeText={(text) => setContent(text)}
        />
        <ButtonWrapper onPress={handleSubmit}>
          <Button buttonText="Submit" />
        </ButtonWrapper>
      </SubmitContainer>
    </>
  );

  function handleCancel(post: Post) {
    if (isEditing) {
      cancelEditing(post);
    } else if (isCreating) {
      cancelCreating();
    }
    setTitle("");
    setContent("");
    return;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (fieldsAreEmpty()) {
      return;
    }
    if (isCreating) {
      submitPost({ title, content });
    } else if (isEditing) {
      updatePost({ title, content });
    }
    Keyboard.dismiss();
    setTitle("");
    setContent("");

    return;
  }

  function fieldsAreEmpty(): boolean {
    return title.trim() === "" || content.trim() === "";
  }
}

export default connect(select, actions)(SubmitPostBox);

const SubmitContainer = styled(StandardBox)`
  width: 250px;
  height: 150px;
  align-items: center;
  justify-content: space-evenly;
`;

const TextField = styled.TextInput`
  width: 80%;
  font-size: 20;
  text-align: center;
  border-bottom-width: 2.5px;
  border-bottom-color: ${colors.DARK_GREY};
`;

export const ButtonWrapper = styled.TouchableOpacity``;

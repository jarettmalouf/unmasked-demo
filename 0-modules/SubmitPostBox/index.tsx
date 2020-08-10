import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from "./constants";
import { Keyboard, Text, TextInput, View } from "react-native";
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
  const [
    numCharactersRemainingInTitle,
    setNumCharactersRemainingInTitle,
  ] = useState(TITLE_MAX_LENGTH);
  const [
    numCharactersRemainingInContent,
    setNumCharactersRemainingInContent,
  ] = useState(CONTENT_MAX_LENGTH);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  return (
    <Container>
      <CancelButtonWrapper>
        <Button
          backgroundColor="white"
          buttonText="Cancel"
          handlePress={() => handleCancel({ title, content })}
        />
      </CancelButtonWrapper>
      <SubmitContainer>
        <TextField
          name="title"
          value={title}
          placeholder="Subject"
          enablesReturnKeyAutomatically
          maxLength={25}
          onChangeText={(text) => handleTextChange(text, "title")}
          onEndEditing={() => setIsEditingTitle(false)}
        />
        <TextField
          name="content"
          value={content}
          placeholder="Speak your mind"
          enablesReturnKeyAutomatically
          multiline
          maxLength={150}
          onChangeText={(text) => handleTextChange(text, "content")}
          onEndEditing={() => setIsEditingContent(false)}
        />
        <Button buttonText="Submit" handlePress={() => handleSubmit()} />
        <RemainingCharactersBox />
      </SubmitContainer>
    </Container>
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

  function handleSubmit() {
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

  function handleTextChange(text: string, name: string) {
    if (name === "content") {
      setIsEditingTitle(false);
      setIsEditingContent(true);
      setContent(text);
      setNumCharactersRemainingInContent(CONTENT_MAX_LENGTH - text.length);
    } else if (name === "title") {
      setIsEditingTitle(true);
      setIsEditingContent(false);
      setTitle(text);
      setNumCharactersRemainingInTitle(TITLE_MAX_LENGTH - text.length);
    }
  }

  function RemainingCharactersBox() {
    if (
      isEditingContent &&
      numCharactersRemainingInContent !== CONTENT_MAX_LENGTH
    ) {
      return (
        <GreyBox>
          <RemainingCharacters>
            {numCharactersRemainingInContent !== 0 && "-"}
            {numCharactersRemainingInContent}
          </RemainingCharacters>
        </GreyBox>
      );
    } else if (
      isEditingTitle &&
      numCharactersRemainingInTitle !== TITLE_MAX_LENGTH
    ) {
      return (
        <GreyBox>
          <RemainingCharacters>
            {numCharactersRemainingInTitle !== 0 && "-"}
            {numCharactersRemainingInTitle}
          </RemainingCharacters>
        </GreyBox>
      );
    } else return <View />;
  }
}

export default connect(select, actions)(SubmitPostBox);

const CancelButtonWrapper = styled.View`
  align-items: center;
`;

const Container = styled.View``;

const GreyBox = styled.View`
  background-color: ${colors.LIGHT_GREY};
  min-width: 30px;
  height: 30px;
  position: absolute;
  right: 30px;
  bottom: 25px;
  align-items: center;
  justify-content: center;
`;

const RemainingCharacters = styled.Text`
  padding-horizontal: 5px;
`;

const SubmitContainer = styled(StandardBox)`
  width: 250px;
  min-height: 150px;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const TextField = styled.TextInput`
  width: 80%;
  font-size: 20;
  text-align: center;
  margin-top: 5px;
  border-bottom-width: 2.5px;
  border-bottom-color: ${colors.DARK_GREY};
`;

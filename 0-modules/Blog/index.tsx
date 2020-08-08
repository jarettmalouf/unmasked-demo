import { RootStateOrAny, connect } from "react-redux";
import { SafeAreaView, Text, View } from "react-native";
import SubmitPostBox, { ButtonWrapper } from "../SubmitPostBox";
import { doActivateCreating, doDeleteAllPosts } from "../Post/ducks/actions";

import Button from "../../1-helpers/Button";
import { Post } from "../../1-helpers/interfaces";
import PostArea from "../PostArea";
import { PostTitle } from "../Post";
import React from "react";
import styled from "@emotion/native";

const select = (state: RootStateOrAny) => ({
  posts: state.post.posts,
  isEditing: state.post.isEditing,
  isCreating: state.post.isCreating,
});

const actions = {
  deleteAllPosts: doDeleteAllPosts,
  activateCreating: doActivateCreating,
};

function Blog({
  title,
  posts,
  isEditing,
  isCreating,
  activateCreating,
  deleteAllPosts,
}: {
  title: string;
  posts: Post[];
  isEditing: boolean;
  isCreating: boolean;
  activateCreating: Function;
  deleteAllPosts: Function;
}) {
  return (
    <>
      <Container>
        <DemoTitle>{title}</DemoTitle>
        <ActionButton
          text="Create New Post"
          showCondition={!(isCreating || isEditing)}
          action={() => activateCreating()}
        />
        {(isEditing || isCreating) && <SubmitPostBox />}
        <PostArea />
        <ActionButton
          text="Delete All Posts"
          showCondition={posts.length > 0}
          action={() => deleteAllPosts()}
        />
      </Container>
    </>
  );

  function ActionButton({
    text,
    showCondition,
    action,
  }: {
    text: string;
    showCondition: boolean;
    action: Function;
  }) {
    if (showCondition) {
      return (
        <ButtonWrapper onPress={action}>
          <Button backgroundColor="white" buttonText={text} />
        </ButtonWrapper>
      );
    }
    return;
  }
}

export default connect(select, actions)(Blog);

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const DemoTitle = styled(PostTitle)`
  font-size: 50px;
`;

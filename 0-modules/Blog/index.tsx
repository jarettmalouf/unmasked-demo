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
  posts,
  isEditing,
  isCreating,
  activateCreating,
  deleteAllPosts,
}: {
  posts: Post[];
  isEditing: boolean;
  isCreating: boolean;
  activateCreating: Function;
  deleteAllPosts: Function;
}) {
  return (
    <>
      <Container>
        <DemoTitle>Demo</DemoTitle>
        <CreateContainer>
          {!(isCreating || isEditing) ? (
            <ActionButton
              text="Create New Post"
              action={() => activateCreating()}
            />
          ) : (
            <SubmitPostBox />
          )}
        </CreateContainer>
        <PostArea />
      </Container>
      <DeleteButtonContainer>
        {posts.length > 0 && (
          <ActionButton
            text="Delete All Posts"
            action={() => deleteAllPosts()}
          />
        )}
      </DeleteButtonContainer>
    </>
  );

  function ActionButton({ text, action }: { text: string; action: Function }) {
    return (
      <ButtonWrapper onPress={action}>
        <Button backgroundColor="white" buttonText={text} />
      </ButtonWrapper>
    );
  }
}

export default connect(select, actions)(Blog);

const Container = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;

const DeleteButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  align-self: center;
`;
const CreateContainer = styled.View``;

const DemoTitle = styled(PostTitle)`
  font-size: 50px;
  margin-vertical: 30px;
`;

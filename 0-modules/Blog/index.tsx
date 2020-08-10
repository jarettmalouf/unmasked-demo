import { RootStateOrAny, connect } from "react-redux";
import { SafeAreaView, Text, View } from "react-native";
import { doActivateCreating, doDeleteAllPosts } from "../Post/ducks/actions";

import Button from "../../1-helpers/Button";
import { Post } from "../../1-helpers/interfaces";
import PostArea from "../PostArea";
import { PostTitle } from "../../1-helpers/content";
import React from "react";
import SubmitPostBox from "../SubmitPostBox";
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
      <CreateContainer>
        <DemoTitle>Demo</DemoTitle>
        {!(isCreating || isEditing) ? (
          <Button
            backgroundColor="white"
            buttonText="Create New Post"
            handlePress={() => activateCreating()}
          />
        ) : (
          <SubmitPostBox />
        )}
        <PostArea />
      </CreateContainer>
      <DeleteButtonContainer>
        {posts.length > 0 && (
          <Button
            backgroundColor="white"
            buttonText="Delete All Posts"
            handlePress={() => deleteAllPosts()}
          />
        )}
      </DeleteButtonContainer>
    </>
  );
}

export default connect(select, actions)(Blog);

const CreateContainer = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
`;

const DeleteButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  align-self: center;
`;

const DemoTitle = styled(PostTitle)`
  font-size: 50px;
  margin-vertical: 30px;
`;

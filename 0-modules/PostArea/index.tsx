import { PostTitle, colors } from "../../1-helpers/content";
import { RootStateOrAny, connect } from "react-redux";
import { SafeAreaView, ScrollView } from "react-native";
import { doActivateEditing, doDeletePost } from "../Post/ducks/actions";

import Post from "../Post";
import { Post as PostType } from "../../1-helpers/interfaces";
import React from "react";
import styled from "@emotion/native";

const select = (state: RootStateOrAny) => ({
  posts: state.post.posts,
  postBeingEdited: state.post.postBeingEdited,
  isEditing: state.post.isEditing,
});

const actions = {
  deletePost: doDeletePost,
  activateEditing: doActivateEditing,
};

function PostArea({
  posts,
  deletePost,
  activateEditing,
  postBeingEdited,
}: {
  posts: any;
  deletePost: Function;
  activateEditing: Function;
  postBeingEdited: PostType | null;
}) {
  return (
    <Container>
      {showArea() ? (
        <ScrollableContainer>
          {posts.map(
            (post: PostType, i: number) =>
              post !== postBeingEdited && (
                <Post
                  key={i}
                  title={post.title}
                  content={post.content}
                  isFirst={i === 0}
                  onDelete={() => deletePost(post)}
                  onEdit={() => activateEditing(post)}
                />
              )
          )}
        </ScrollableContainer>
      ) : (
        <Subtitle>No Posts</Subtitle>
      )}
    </Container>
  );

  function showArea(): boolean {
    return (
      posts.length > 0 && !(posts.length === 1 && postBeingEdited !== null)
    );
  }
}

export default connect(select, actions)(PostArea);

const Container = styled.View``;

const ScrollableContainer = styled.ScrollView`
  padding-horizontal: 20px;
  background-color: ${colors.LIGHT_GREY};
  border-radius: 8px;
  border-color: ${colors.DARK_BLUE};
  border-width: 2px;
  max-height: 400px;
`;

const Subtitle = styled(PostTitle)`
  align-self: center;
  font-size: 25px;
`;

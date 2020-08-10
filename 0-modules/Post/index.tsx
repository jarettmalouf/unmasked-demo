import * as React from "react";

import { PostTitle, StandardBox } from "../../1-helpers/content";
import { Text, TouchableHighlight, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import styled from "@emotion/native";

export default function Post({ title, content, isFirst, onDelete, onEdit }) {
  return (
    <PostWrapper isFirst={isFirst}>
      <PostBody>
        <PostTitle>{title}</PostTitle>
        <PostContent>{content}</PostContent>
      </PostBody>
      <PostLinks>
        <Icon name="trash" size={30} onPress={onDelete} />
        <Icon name="edit" size={30} style={{ left: 2 }} onPress={onEdit} />
      </PostLinks>
    </PostWrapper>
  );
}

const PostBody = styled.View`
  flex: 4;
  padding-left: 10px;
`;

const PostWrapper = styled(StandardBox)`
  width: 300px;
  flex-direction: row;
  margin-top: ${({ isFirst }) => String(isFirst ? 20 : 0)}px;
  margin-bottom: 20px;
`;

const PostContent = styled.Text`
  font-size: 15px;
  padding: 20px 20px 20px 0;
  justify-content: flex-end;
  overflow: visible;
`;

const PostLinks = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

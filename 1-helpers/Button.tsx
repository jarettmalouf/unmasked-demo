import * as React from "react";

import { ButtonWrapper, StandardBox, colors } from "./content";

import styled from "@emotion/native";

export default function Button({
  backgroundColor,
  buttonText,
  handlePress,
}: {
  backgroundColor?: string;
  buttonText: string;
  handlePress: Function;
}) {
  return (
    <ButtonWrapper onPress={handlePress}>
      <ButtonBox backgroundColor={backgroundColor}>
        <ButtonText>{buttonText}</ButtonText>
      </ButtonBox>
    </ButtonWrapper>
  );
}

const ButtonBox = styled(StandardBox)<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors.BABY_BLUE};
  align-items: center;
  justify-content: center;
  max-width: 300px;
  height: 50px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  padding: 8px;
  overflow: visible;
`;

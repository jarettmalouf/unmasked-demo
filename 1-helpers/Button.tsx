import * as React from "react";

import { StandardBox, colors } from "./content";

import styled from "@emotion/native";

export default function Button({
  backgroundColor,
  buttonText,
}: {
  backgroundColor?: string;
  buttonText: string;
}) {
  return (
    <ButtonBox backgroundColor={backgroundColor}>
      <ButtonText>{buttonText}</ButtonText>
    </ButtonBox>
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

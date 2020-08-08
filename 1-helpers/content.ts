import * as React from "react";

import styled from "@emotion/native";

export const colors = {
  LIGHT_GREY: "#D3D3D3",
  DARK_GREY: "#544F4E",
  BABY_BLUE: "#87ceeb",
  DARK_BLUE: "#0000FF",
};

export const StandardBox = styled.View`
  border-radius: 8px;
  border-color: ${colors.DARK_BLUE};
  border-width: 2px;
  background-color: white;
`;

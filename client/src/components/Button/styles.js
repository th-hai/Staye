import { Button } from 'antd';
import styled from 'styled-components';

export const StyledBaseButton = styled(Button)`
  text-transform: capitalize;
  &&[disabled] {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    box-shadow: none;
  }
`;

export const StyledPrimaryButton = styled(StyledBaseButton)`
  && {
    color: #ffffff;
    background-color: #1b5a90;
    border-color: #1b5a90;
  }
  &&:hover,
  &&:focus {
    color: #ffffff;
    background-color: #4d84b3;
    border-color: #4d84b3;
  }
`;

export const StyledSecondaryButton = styled(StyledBaseButton)`
  && {
    color: #ffffff;
    background-color: #4a4a4a;
    border-color: #4a4a4a;
  }
  &&:hover,
  &&:focus {
    color: #ffffff;
    background-color: #4d84b3;
    border-color: #4d84b3;
  }
`;

export const StyledTertiaryButton = styled(StyledBaseButton)`
  && {
    color: rgba(0, 0, 0, 0.65);
    background-color: #ffffff;
    border-color: #d9d9d9;
  }
  &&:hover,
  &&:focus {
    color: #ffffff;
    background-color: #4a4a4a;
    border-color: #4a4a4a;
  }
`;

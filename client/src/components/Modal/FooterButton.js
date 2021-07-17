import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';

import { BUTTON_TYPES } from 'components/Button/constants';
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from 'components/Button';
import { StyledFooterButton } from './styles';

export const BUTTONS = {
  [BUTTON_TYPES.PRIMARY]: PrimaryButton,
  [BUTTON_TYPES.SECONDARY]: SecondaryButton,
  [BUTTON_TYPES.TERTIARY]: TertiaryButton,
};

export function renderButton(button, index) {
  const { type, text, ...restProps } = button;
  const Component = get(`${type}`, BUTTONS);

  return Component ? (
    <Component key={index} {...restProps}>
      {text}
    </Component>
  ) : null;
}

function FooterButton({ datasource }) {
  return (
    <StyledFooterButton>
      {datasource?.map((button, index) => renderButton(button, index))}
    </StyledFooterButton>
  );
}

FooterButton.propTypes = {
  datasource: PropTypes.array.isRequired,
};

export default FooterButton;

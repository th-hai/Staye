import React, { memo } from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/fp/flow';

import { BUTTON_TYPES } from 'components/Button/constants';
import FooterButton from './FooterButton';
import { StyledModal, StyledContent, StyledFooter } from './styles';

export function BaseModal(props) {
  const { intl, footerButton, onOk, onCancel, children, ...restProps } = props;

  const defaultFooterButton = [
    {
      type: BUTTON_TYPES.TERTIARY,
      text: 'Cancel',
      onClick: onCancel,
    },
    {
      type: BUTTON_TYPES.PRIMARY,
      text: 'OK',
      onClick: onOk,
    },
  ];

  return (
    <StyledModal
      {...restProps}
      centered
      footer={null}
      closable={false}
      maskClosable={false}
    >
      <StyledContent>{children}</StyledContent>
      <StyledFooter>
        <FooterButton datasource={footerButton || defaultFooterButton} />
      </StyledFooter>
    </StyledModal>
  );
}

BaseModal.propTypes = {
  footerButton: PropTypes.array,
  intl: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.any,
};

export default flow(
  memo,
)(BaseModal);

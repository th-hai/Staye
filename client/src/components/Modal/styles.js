import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  .ant-modal-header {
    text-transform: capitalize;
  }
  .ant-modal-body {
    padding: 0;
  }
`;
export const StyledContent = styled.div`
  padding: 24px;
`;

export const StyledFooter = styled.div`
  padding: 10px 16px;
  text-align: right;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 2px 2px;
`;

export const StyledFooterButton = styled.div`
  * + * {
    margin-left: 8px;
  }
`;

import styled from 'styled-components';
import { Form } from 'antd';

export const TableHeader = styled.div`
  display: flex;
  color: #1b5a90;
  border-top: solid 1px;
  justify-content: space-between;
  margin-left: -16px;
  margin-right: -16px;
  padding: 8px 16px 0px;
  font-size: 1rem;
`;

export const StyledForm = styled(Form)`
  && {
    padding: 0;
  }
`;
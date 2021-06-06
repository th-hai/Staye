/**
 *
 * ConfirmDialog
 *
 */

 import React, { memo } from 'react';
 import PropTypes from 'prop-types';
 import BaseModal from 'components/Modal/BaseModal';
 
 function ConfirmDialog({ visible, title, message, onOk, onCancel }) {
   return (
     <BaseModal visible={visible} title={title} onOk={onOk} onCancel={onCancel}>
       <span>{message}</span>
     </BaseModal>
   );
 }
 
 ConfirmDialog.propTypes = {
   visible: PropTypes.bool,
   title: PropTypes.string,
   message: PropTypes.string,
   onOk: PropTypes.func,
   onCancel: PropTypes.func,
 };
 
 export default memo(ConfirmDialog);
 
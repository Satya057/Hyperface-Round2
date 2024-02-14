import {Modal, Button} from 'antd';
import React, { useState } from 'react';
import AddEvent from './AddEvent';

function AddEventModal({ editMode, eventEnd, eventStart, handleOk, onCancel, onClose, onOk, onTimeChange, visible }) {
  const [title, setTitle] = useState('');

   
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
 
  handleOk = () => {
    onOk(title);
  };

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onCancel}>
          {editMode ? 'Delete' : 'Cancel'}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {editMode ? 'Update Event' : 'Add Event'}
        </Button>,
      ]}
    >
      <AddEvent
        title={title}
        onTitleChange={handleTitleChange}
        start={eventStart}
        end={eventEnd}
        onTimeChange={onTimeChange}
      />
    </Modal>
  );
}

export default AddEventModal;

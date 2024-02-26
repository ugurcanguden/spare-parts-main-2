import { Modal } from 'antd';
import React from 'react';

export interface WebViewModalProps {
    url:string
    title:string;
    visible:boolean;
    onClose? : (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const WebViewModal = ({ url, title, visible, onClose }:WebViewModalProps) => { 

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width="80%" 
      bodyStyle={{ height: '70vh', overflow: 'hidden' }}
      
    >
      <iframe
        title="Web View"
        src={url}
        style={{ width: '100%', height: '100%', border: 'none', overflow: 'auto',padding:"10px" }}
      />
    </Modal>
  );
};

export default WebViewModal;

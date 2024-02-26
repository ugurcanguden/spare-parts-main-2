import { Form, Input, Button } from 'antd'; // Ant Design kullanılıyor varsayalım
import React, { useState } from 'react';

// Bu, HTML içeriğinizi düzenlemek için kullanabileceğiniz bileşeni oluşturuyor
export const HtmlContentEditor = ({ initialValue, onChange }:any) => {
  const [htmlContent, setHtmlContent] = useState(initialValue);

  const handleChange = (e:any)=> {
    const newValue = e.target.value;
    setHtmlContent(newValue);
    onChange(newValue);
  };

  return (
    <Input.TextArea
      rows={6} // Düzenlenecek HTML içeriğinin genellikle çok satırlı olacağını varsayalım
      value={htmlContent}
      onChange={handleChange}
    />
  );
};
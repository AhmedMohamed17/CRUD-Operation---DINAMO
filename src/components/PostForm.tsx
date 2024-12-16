import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Post } from '../types/Post';

interface PostFormProps {
  initialValues?: Omit<Post, 'id'>;
  onSubmit: (values: Omit<Post, 'id'>) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="body" label="Body" rules={[{ required: true, message: 'Please enter the body' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;

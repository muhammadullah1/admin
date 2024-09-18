import type { FC } from 'react';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddProduct: FC = () => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const categories = [
    { id: 1, name: 'cate 1' },
    { id: 2, name: 'cate 2' },
    { id: 3, name: 'cate 3' },
  ];

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  

  return (
    <div className="add_product_dev">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600, minWidth: 400, margin: 'auto' }}
        validateMessages={validateMessages}
        layout="vertical"
        className="product-form"
      >
        <Form.Item name='title' label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='description' label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name='price' label="Price" rules={[{ type: 'number', min: 0 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name='category' label="Category">
          <Select>
            {categories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item 
         name='images'
         label="Images"
         valuePropName="fileList"
         getValueFromEvent={normFile}
         extra="longgggggggggggggggggggggggggggggggggg"
         >
        <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddProduct;

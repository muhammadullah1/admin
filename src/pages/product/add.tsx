import { FC, useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getCategories } from '@/api/category';
import type { Category } from '@/interface/categories';
import type { ProductPayload } from '@/interface/product';
import './index.less';
import { imageDb } from '../../config/firebaeConfig';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 16 },
};

const AddProduct: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]); 

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      setImages(e)
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values: any) => {
    console.log("-------values-----", values);
    const { title, description, price, categoryId } = values;
    const images = normFile();
  
    // upload files to Firebase Storage and get the download URLs
    const uploadedImages = await Promise.all(images.map(async (image) => {
      const fileRef = ref(imageDb, `files/${uuidv4()}`);
      const snapshot = await uploadBytes(fileRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }));
  
    // create the API request payload
    // const payload = {
    //   title,
    //   description,
    //   price,
    //   categoryId,
    //   images: uploadedImages,
    // };

    // console.log("------payload-----", payload);
  
    // send the payload to the backend API
    // try {
    //   const response = await fetch('/api/products', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };


  // const handleImageUpload = async (e: any) => {
  //   const file = e.file;
  //   const fileRef = ref(imageDb, `files/${file.name}`);
  //   const snapshot = await uploadBytes(fileRef, file);
  //   const downloadURL = await getDownloadURL(snapshot.ref);
  //   setFileLinks([...fileLinks, downloadURL]);
  //   return e.fileList;
  // };

  return (
    <div className="add_product_dev">
      <h1 className="heading">Add Product</h1>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600, minWidth: 400, margin: '5% auto' }}
        validateMessages={validateMessages}
        layout="vertical"
        className="product-form"
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ type: 'number', min: 0 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select>
            {categories.map(category => (
              <Select.Option key={category._id} value={category._id}>
                {category.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="images" label="Images" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
              Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
          <div className='submit-btn'>
          <Button type="primary" htmlType="submit">
            add
          </Button>
          </div>
        </Form.Item>
      </Form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
export default AddProduct;

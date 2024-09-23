import { FC, useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getCategories } from '@/api/category';
import type { Category } from '@/interface/categories';
import { AddProducts } from '@/api/product';
import type { ProductPayload } from '@/interface/product';
import './index.less';
import { imageDb } from '../../config/firebaeConfig';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 16 },
};

const AddProduct: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
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
      return e;
    }
    return e?.fileList;
  };
  

  const onFinish = async (values: ProductPayload) => {
    const { title, description, price, categoryId, images } = values;
    const formatImages = normFile(images);

    const uploadedImages = await Promise.all(
      formatImages.map(async (image: any) => {
        const fileRef = ref(imageDb, `products/${uuidv4()}`);
        const snapshot = await uploadBytes(fileRef, image.originFileObj);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const imageUrl = downloadURL.split('?')[0];
        return imageUrl;
      }),
    );

    const payload = {
      title,
      description,
      price,
      categoryId,
      images: uploadedImages,
    };

    try {
      const response = await AddProducts(payload);
      console.log("------response-------", response);
      if(response.success) navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

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
        <Form.Item name="categoryId" label="Category">
          <Select>
            {categories.map(category => (
              <Select.Option key={category._id} value={category._id}>
                {category.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="images" label="Images" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
              Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
          <div className="submit-btn">
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

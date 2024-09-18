import type { FC } from 'react';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import ProductList from './productList';
import './index.less';

const ProductIndexPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Flex vertical align="flex-end" justify="space-between" style={{ padding: 20 }}>
      <Button type="primary" onClick={() => navigate('/products/add')}>
          {'Add Product'}
        </Button>
      </Flex>


      <ProductList/>
    </div>
  )
};

export default ProductIndexPage;

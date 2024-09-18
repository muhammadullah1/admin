import type { MyPageTableOptions } from '@/components/business/page';
import type { Product } from '@/interface/product';
import type { FC } from 'react';
import { getProductList } from '@/api/product';
import MyPage from '@/components/product/page';

const tableColums: MyPageTableOptions<Product> = [
  { title: 'Product Title', dataIndex: 'title', key: 'title' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { title: 'Price', dataIndex: 'price', key: 'price' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const ProductList: FC = () => {
  return <MyPage pageApi={getProductList} tableOptions={tableColums}/>;
};

export default ProductList;

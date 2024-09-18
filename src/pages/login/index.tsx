import type { LoginParams } from '@/interface/user/login';
import type { FC } from 'react';
import './index.less';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatSearch } from '@/utils/formatSearch';
import { loginAsync } from '../../stores/user.action';

const initialValues: LoginParams = {
  email: '',
  password: '',
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const onFinished = async (form: LoginParams) => {
    const res = dispatch(await loginAsync(form));

    if (!!res) {
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/' };

      navigate(from);
    }
  };

  return (
    <div className="login-page">
      <Form<LoginParams> onFinish={onFinished} className="login-page-form" initialValues={initialValues}>
      <h2>Admin Login</h2>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your Username!',
            },
          ]}
        >
          <Input
            placeholder={'email'}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your Password!',
            },
          ]}
        >
          <Input
            type="password"
            placeholder={'Password'}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" className="login-page-form_button">
          Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

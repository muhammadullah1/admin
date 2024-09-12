import { ConfigProvider, Spin, theme as antdTheme } from 'antd';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryRouter, history } from '@/routes/history';
import RenderRouter from './routes';
import { setGlobalState } from './stores/global.store';

const App: React.FC = () => {
  const { theme, loading } = useSelector(state => state.global);
  const dispatch = useDispatch();

  const setTheme = (dark = true) => {
    dispatch(
      setGlobalState({
        theme: dark ? 'dark' : 'light',
      }),
    );
  };

  /** initial theme */
  useEffect(() => {
    setTheme(theme === 'dark');

    // watch system theme change
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      function matchMode(e: MediaQueryListEvent) {
        setTheme(e.matches);
      }

      mql.addEventListener('change', matchMode);
    }
  }, []);

  return (
    <ConfigProvider
      componentSize="middle"
      theme={{
        token: { colorPrimary: '#13c2c2' },
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
        <HistoryRouter history={history}>
          <Suspense fallback={null}>
            <Spin
              spinning={loading}
              className="app-loading-wrapper"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.44)' : 'rgba(255, 255, 255, 0.44)',
              }}
            ></Spin>
            <RenderRouter />
          </Suspense>
        </HistoryRouter>
    </ConfigProvider>
  );
};

export default App;

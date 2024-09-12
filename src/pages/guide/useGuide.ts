import 'driver.js/dist/driver.min.css';
import './index.less';

import Driver from 'driver.js';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUserItem } from '@/stores/user.store';

export const useGuide = () => {
  const dispatch = useDispatch();

  const driver = useRef(
    new Driver({
      keyboardControl: false,
      allowClose: false,
      overlayClickNext: true,
      closeBtnText: 'Close',
      prevBtnText: 'Previous',
      nextBtnText: 'Next',
      doneBtnText: 'Done',
    }),
  );

  const driverStart = () => {
    setTimeout(() => {
      driver.current.defineSteps([
        {
          element: '#sidebar-trigger',
          popover: {
            title: 'Sidebar Trigger',
            description: 'Open and close the Sidebar',
            position: 'bottom',
            offset: 10,
            isFirst: true,
          },
        },
        {
          element: '#notice-center',
          popover: {
            title: 'Notices',
            description: 'All notification messages were be displayed here',
            position: 'bottom',
            offset: -160,
          },
        },
        {
          element: '#language-change',
          popover: {
            title: 'Switch Languages',
            description: 'You can click here to switch languages',
            position: 'bottom',
            offset: -170,
          },
        },
        {
          element: '#pageTabs .ant-tabs-nav.ant-tabs-nav-animated',
          popover: {
            title: 'Page Tabs',
            description: 'The history of the page you visited will be displayed here',
            position: 'bottom',
            offset: 30,
          },
        },
        {
          element: '#pageTabs-actions svg',
          popover: {
            title: 'Page Tabs Actions',
            description: 'Click here to do some quick operations to the Page Tabs',
            position: 'left',
          },
        },
        {
          element: '#switchTheme span',
          popover: {
            title: 'Switch Theme',
            description: 'Click here to switch system theme color',
            position: 'left',
            isLast: true,
          },
        },
      ]);

      localStorage.setItem('newUser', 'false');
      dispatch(
        setUserItem({
          newUser: false,
        }),
      );
      driver.current.start();
      console.log('guide started');
    }, 1000);
  };

  return {
    driverStart,
  };
};

export default useGuide;

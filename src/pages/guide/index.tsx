import type { FC } from 'react';

import 'driver.js/dist/driver.min.css';
import { Button, Typography } from 'antd';
import useGuide from './useGuide';

const GuidePage: FC = () => {
  const { driverStart } = useGuide();

  return (
    <div className="guide-page ">
      <div className="innerText">
        <Typography className="guide-intro">
        The guide page is useful for
                           some people who entered the 
                           project for the first time. 
                           You can briefly introduce 
                           the features of the project. 
                           Demo is based on
          <Button
            type="link"
            className="driverjs-link"
            href="https://github.com/kamranahmedse/driver.js"
            rel="noopener noreferrer"
            target="_blank"
          >
            driver.js
          </Button>
          .
        </Typography>
        <Button type="primary" onClick={driverStart}>
        Show Guide
        </Button>
      </div>
    </div>
  );
};

export default GuidePage;

import './index.scss';

import { MainScreen } from '@screens/Main';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <MainScreen />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

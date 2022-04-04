import React, { ReactElement } from 'react';
import {GlobalStyles, MantineProvider, MantineThemeOverride} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Router from './Router';

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    // override dark colors here to change them for all components
    dark: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#1d1e30',
      '#0c0d21',
      '#01010a',
    ],
  },
};

export default function App(): ReactElement {
  return (
      <MantineProvider theme={theme} withGlobalStyles>
        <NotificationsProvider>
          <Router />
        </NotificationsProvider>
      </MantineProvider>
  );
}

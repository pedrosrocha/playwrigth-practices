import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';


const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 4 * 1000,
  },
  reporter: 'html',

  /* Configure projects for major browsers */
  projects: [
    // Setup project,
    {
      name: 'tests',
      testMatch: /spec\.ts/,
    },

  ],

  use: {
    browserName: 'chromium',
    headless: true,
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL,
  },


};

export default config;

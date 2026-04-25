import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';


const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 10 * 1000,
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
    screenshot: 'only-on-failure',
    trace: 'on',
    //video: 'retain-on-failure',
    baseURL: process.env.BASE_URL || 'http://localhost:8080',
  },


};

export default config;

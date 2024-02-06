import type {Config} from 'jest';

const config: Config = {
  testMatch: [
    "**/**/*.test.ts",
  ],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'ts-jest',
      {diagnostics: {log: false}}
    ],

  },
  moduleDirectories: ["node_modules", "generator"],

};

export default config;

/* eslint-disable */
export default {
  displayName: 'exchange-api',
  preset: '../../jest.preset.js',
  collectCoverage: false,
  coverageReporters: ['clover', 'json', ['text', { skipFull: true }]],
  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/node_modules/**', '!**/vendor/**', '!**/documentation/**', '!**/tests/**', '!**/assets/**'],
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/exchange-api',
};

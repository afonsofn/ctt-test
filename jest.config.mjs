import { createDefaultPreset } from "ts-jest"

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/app/tests/config/setupTests.ts'],
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    '\\.(css|less|scss|sass)$': '<rootDir>/app/tests/config/styleMock.js',
  }
}

export default config;
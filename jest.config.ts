import { compilerOptions } from './tsconfig.json';

const { pathsToModuleNameMapper } = require('ts-jest/utils');

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverageFrom: ["src/**", "!src/database/migrations/**"],
  coverageDirectory: "__tests__/coverage",
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  preset: "ts-jest",
  resetModules: false,
  testMatch: ["**/**/*.spec.ts"],
};
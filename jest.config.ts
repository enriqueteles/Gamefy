import { compilerOptions } from './tsconfig.json';
const { pathsToModuleNameMapper } = require('ts-jest/utils');

export default {
  bail: 1,
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

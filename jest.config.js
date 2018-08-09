module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  moduleNameMapper: {
    '^@containers(.*)$': '<rootDir>/containers$1',
    '^@components(.*)$': '<rootDir>/components$1',
  },
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json',
    },
  },
  setupFiles: ['<rootDir>/config/spec.setup.ts'],
  cacheDirectory: '<rootDir>/.jest/',
  roots: ['<rootDir>/components/', '<rootDir>/containers/'],
  testMatch: ['<rootDir>/**/*.spec.ts', '<rootDir>/**/*.spec.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironmentOptions: { resources: 'usable' },
  testURL: 'http://localhost',
};

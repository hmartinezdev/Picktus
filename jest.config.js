module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  moduleNameMapper: {
    '^@containers(.*)$': '<rootDir>/src/app/containers$1',
    '^@components(.*)$': '<rootDir>/src/app/components$1',
    '^@constants(.*)$': '<rootDir>/src/app/constants$1',
    '^@libs(.*)$': '<rootDir>/src/app/libs$1',
    '^@services(.*)$': '<rootDir>/src/app/services$1',
  },
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json',
    },
  },
  setupFiles: ['<rootDir>/config/spec.setup.ts'],
  cacheDirectory: '<rootDir>/.jest/',
  roots: ['<rootDir>/src/app'],
  testMatch: ['<rootDir>/**/*.spec.ts', '<rootDir>/**/*.spec.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironmentOptions: { resources: 'usable' },
  testURL: 'http://localhost',
};

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
    '^@assets/svg/(.*)$': '<rootDir>/mocks/fileMock.js',
    '\\.(jpg|svg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css)$': '<rootDir>/mocks/styleMock.js',
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
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts', '<rootDir>/src/app/**/*.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironmentOptions: { resources: 'usable' },
  coveragePathIgnorePatterns: ['/src/app/.*/index.*', '/src/app/libs/.*', '/src/app/pages/_app.tsx'],
  testURL: 'http://localhost',
};

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  preset: 'ts-jest/presets/js-with-ts',
  moduleNameMapper: {
    '^@containers(.*)$': '<rootDir>/src/app/containers$1',
    '^@pages(.*)$': '<rootDir>/src/app/pages$1',
    '^@components(.*)$': '<rootDir>/src/app/components$1',
    '^@constants(.*)$': '<rootDir>/src/app/constants$1',
    '^@libs(.*)$': '<rootDir>/src/app/libs$1',
    '^@services(.*)$': '<rootDir>/src/app/services$1',
    '^@assets/svg/(.*)$': '<rootDir>/mocks/fileMock.js',
    '^@store(.*)$': '<rootDir>/src/app/store$1',
    '\\.(jpg|svg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css)$': '<rootDir>/mocks/styleMock.js',
  },
  globals: {
    'ts-jest': {
      tsConfigFile: './jest.tsconfig.json',
    },
  },
  setupFiles: ['<rootDir>/config/spec.setup.ts'],
  cacheDirectory: '<rootDir>/.jest/',
  roots: ['<rootDir>/src/app'],
  testMatch: ['<rootDir>/**/*.spec.ts', '<rootDir>/**/*.spec.tsx', '<rootDir>/**/*.spec.jsx', '<rootDir>/**/*.spec.js'],
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts', '<rootDir>/src/app/**/*.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironmentOptions: { resources: 'usable' },
  coveragePathIgnorePatterns: [
    '/src/app/libs/.*',
    '/src/app/pages/_app.tsx',
    '/src/app/.*/*.type.ts',
    '/src/app/.*/index.*',
  ],
  testURL: 'http://localhost',
};

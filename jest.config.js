module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [6133, 6196],
      },
    },
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  roots: ['src'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    'src/**/*.ts': {
      branches: 0,
      functions: 100,
      lines: 100,
      statements: 80,
    },
  },
};

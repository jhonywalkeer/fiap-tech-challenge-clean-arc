module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', 'index\\.ts$'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.(ts)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
  }
}

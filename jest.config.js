module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: ['\\.test\\.(j|t)s$'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

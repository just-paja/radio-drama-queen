const ignore = [
  '<rootDir>/.webpack',
  '<rootDir>/build',
  '<rootDir>/out',
  '<rootDir>/node_modules'
]

module.exports = {
  projects: [
    {
      displayName: 'lint',
      runner: 'jest-runner-standard',
      testMatch: [
        '<rootDir>/**/*.{js,jsx}'
      ],
      testPathIgnorePatterns: ignore
    },
    {
      displayName: 'app',
      setupFiles: [
        '<rootDir>/jest.setup.js'
      ],
      setupFilesAfterEnv: [
        'jest-enzyme/lib/index.js'
      ],
      testPathIgnorePatterns: ignore,
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/locales/',
        '/constants/',
        '/mock/'
      ],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
      }
    }
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}'
  ],
  watchPlugins: ['jest-watch-select-projects']
}

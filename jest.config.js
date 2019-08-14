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
      setupFilesAfterEnv: ['jest-enzyme/lib/index.js'],
      testPathIgnorePatterns: ignore,
      collectCoverageFrom: [
        'src/**/*.{js,jsx}'
      ],
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/locales/',
        '/constants/'
      ],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
      }
    }
  ],
  watchPlugins: ['jest-watch-select-projects']
}

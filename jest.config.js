module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',  // Adiciona para transformar arquivos JS
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/'  // Permite transformar o axios
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,  // Atualiza a configuração do Babel
    },
  },
};
module.exports = {
  default: {
    paths: ['test/acceptance/features/**/*.feature'],
    require: [
      'ts-node/register/transpile-only',
      'tsconfig-paths/register',
      'test/acceptance/features/step_definitions/**/*.ts',
    ],
    format: ['progress-bar', 'html:cucumber-report.html'],
    publishQuiet: true
  },
};

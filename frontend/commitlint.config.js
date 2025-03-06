module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'chore',
        'test',
      ],
    ],
    'subject-case': [2, 'always', 'sentence-case'], // 메시지의 첫 글자는 대문자로 시작
    'header-max-length': [2, 'always', 100], // 최대 길이 100자 제한
  },
};

export const constants = {
  meta: {
    title: 'こよみ',
    author: 'Kazuki Awasawa',
  },
  url: {
    homepage: 'https://kawasawa.github.io',
    repository: 'https://github.com/kawasawa/koyomi',
  },
  system: {
    // NOTE: Safari ではスラッシュ区切りでなければ初期化できない
    minDate: new Date('1868/01/01 00:00:00'),
    maxDate: new Date('2099/12/31 23:59:59'),
  },
};

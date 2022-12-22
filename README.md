# こよみ

## 概要

暦の情報を一覧できる Web サイトです。旧暦や六曜のほか二十四節気、星座、干支、月相などの暦注を確認できます。

### 日付の指定

表示可能な日付の範囲は 1868-01-01 から 2099-12-31 までとなります。  
なお、1887 年以前を指定した場合、東京地方時を日本標準時へ置き換えて計算を行うため、厳密な値とは異なる可能性があります。

日付は URL で直接指定することもできます。  
https://kawasawa.github.io/koyomi/2000-01-01

![koyomi](./.workspace/koyomi-device.png)

### 表示される情報

1. 旧暦
1. 六曜
1. 十二直
1. 二十八宿
1. 二十四節気
   - 四季
1. 七十二候
1. 十二星座
   - 十三星座
1. 干支
   - 月の干支
   - 日の干支
1. 月相
   - 月齢
1. 潮汐
1. 太陽黄経
1. ユリウス日
   - 修正ユリウス日
   - リリウス日

## 技術情報

本プログラムは以下を主な基盤として使用し、構築されています。

|                              | 技術スタック                                  |
| ---------------------------- | --------------------------------------------- |
| 開発言語                     | [TypeScript](https://www.typescriptlang.org/) |
| フロントエンドフレームワーク | [React](https://ja.reactjs.org/)              |
| CSS フレームワーク           | [Material UI 4](https://v4.mui.com/)          |
| フォーマッター               | [Prettier](https://prettier.io/)              |
| リンター                     | [ESLint](https://eslint.org/)                 |
| パッケージマネージャー       | [Yarn](https://yarnpkg.com/)                  |

## 謝辞

本プログラムの根幹をなす旧暦の導出は、長野様の旧暦計算スクリプト qreki.js を参考に作成されました。

```:
qreki.js: 旧暦計算サンプルプログラム rev. 1.1
Coded by H.Takano (C)1993,1994
Arranged for ECMAScript(ECMA-262) by Nagano Yutaka (C)1999
http://kikuchisan.net/wsp/java/java59.html
```

月の満ち欠けを示すアイコンは、菊池様のサイトにて配布される画像を使用いたしました。

```:
今日のこよみ
http://kikuchisan.net/
```

以上

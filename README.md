# こよみ

<div>
  <a href="https://kawasawa.github.io/koyomi/">
    <img src="https://img.shields.io/badge/-GitHub Pages-2A579A.svg?logo=github" alt="Store">
  </a>
  <a href="https://github.com/kawasawa/koyomi/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/kawasawa/koyomi.svg" alt="License">
  </a>
  <a href="https://codecov.io/gh/kawasawa/koyomi">
    <img src="https://codecov.io/gh/kawasawa/koyomi/branch/main/graph/badge.svg?token=Y8M4S5UMDL"/>
  </a>
</div>

## 概要

暦の情報を一覧できるページです。旧暦や六曜のほか二十四節気、星座、干支、月相などの暦注を確認できます。

![koyomi](./.images/koyomi.jpg)

### 日付の指定

表示可能な日付の範囲は 1868-01-01 から 2099-12-31 までとなります。  
なお、1887 年以前を指定した場合、東京地方時を日本標準時へ置き換えて計算を行うため、厳密な値とは異なる可能性があります。

日付は URL で直接指定することもできます。  
https://kawasawa.github.io/koyomi/2000-01-01

### 表示される情報

- 和暦
  - 年齢
- 旧暦
- 六曜
- 七曜
- 四季
- 二十四節気
- 七十二候
- 十二星座
- 十三星座
- 和風月名
- 干支
  - 月の干支
  - 日の干支
- 月相
  - 月齢
- 潮汐
- 太陽黄経
- ユリウス日
  - 修正ユリウス日
  - リリウス日

## 開発情報

本プログラムは以下を主な基盤として使用し、構築されています。

|                      | 使用技術      |
| -------------------- | ------------- |
| プログラミング言語   | TypeScript    |
| フレームワーク       | React         |
| デザインテンプレート | Material-UI   |
| ルーティング管理     | React Router  |
| ステート管理         | React Redux   |
| 多言語対応           | React i18next |

## 謝辞

本プログラムの根幹をなす旧暦の導出は、長野様の旧暦計算スクリプト qreki.js を参考に作成されました。

```
qreki.js: 旧暦計算サンプルプログラム rev. 1.1
Coded by H.Takano (C)1993,1994
Arranged for ECMAScript(ECMA-262) by Nagano Yutaka (C)1999
http://kikuchisan.net/wsp/java/java59.html
```

また、月の満ち欠けを示すアイコンは、菊池様の下記サイトにて配布される画像を使用いたしました。

```
今日のこよみ
http://kikuchisan.net/
```

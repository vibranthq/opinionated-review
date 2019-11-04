# opinionated-review

[![Actions Status](https://github.com/vibranthq/opinionated-review/workflows/Build/badge.svg)](https://github.com/vibranthq/opinionated-review/actions)

ゼロコンフィグで Re:VIEW 原稿を PDF に変換できる Opinionated な Re:VIEW ビルダーです。

## 主要なポイント

- ゼロコンフィギュレーション
- 原稿データ（`.re`, `images`）と組版ファイル（`.sty`, `.css`等）を分離し、原稿の執筆に集中できる環境を構築する
- 組版関連ファイルを`theme`単位でフォルダにまとめているので、後からのテーマの追加と切り替えが容易
- Docker ベースのビルドにより、TeX 等の環境依存ゼロ
- GitHub Actions による自動ビルド

## 使い方（最速）

このリポジトリをフォーク（または単にクローン）します。

```
➜ git clone https://github.com/vibranthq/opinionated-review book
➜ cd book
```

`articles/`の中にある`.re`ファイルを編集します。
そして、`make pdf`あるいは単に`make`を実行すると`articles/*.re`の原稿が PDF になって`dist/`へ出力されます。

```
➜ make
===> Using theme 'techbooster'
===> Copying sources to the container
===> paper size: A5
===> extra config:
 {
  "texdocumentclass": [
    "review-jsbook",
    "media=print,paper=a5,serial_pagination=true,hiddenfolio=nikko-pc,openany,fontsize=9pt,baselineskip=13pt,line_length=38zw,number_of_lines=37,head_space=15mm,headsep=3mm,headheight=5mm,footskip=10mm"
  ]
}
===> Compiling Re:VIEW sources
===> Done
===> Pushing back artifacts to the local dir
```

## 使い方（詳細）

Docker Hub から`opinionated-review`イメージを Pull します。

```
docker pull vibranthq/opinionated-review
```

`.re`ファイルがあるソースフォルダを`/in`に、PDF を出力したいターゲットフォルダを`/out`に指定して、`opinionated-review pdf`を実行します。
この例では`./articles`をソースフォルダに、`./dist`フォルダをターゲットフォルダにしています（絶対パス）。

```
docker run -it --rm -v ${PWD}/articles:/in -v ${PWD}/dist:/out vibranthq/opinionated-review
```

> 上記のコマンド群は`Makefile`にも定義されています。
> 原稿データから PDF を生成したい場合は、`make pdf`あるいは単に`make`を実行してください。

`docker run -it --rm vibranthq/opinionated-review --help`でヘルプを表示できます。

### EPUB 形式の書き出し

`epub`コマンドで EPUB 形式の本を書き出すことができます。

```
docker run -it --rm \
  -v ${PWD}/articles:/in \
  -v ${PWD}/dist:/out \
  vibranthq/opinionated-review epub
```

### PDF (eBook) 形式の書き出し

`pdf-ebook`コマンドで eBook 向けの PDF を書き出すことができます。

```
docker run -it --rm \
  -v ${PWD}/articles:/in \
  -v ${PWD}/dist:/out \
  vibranthq/opinionated-review pdf-ebook
```

### 印刷所に入稿可能な PDF への変換

`opinionated-review`は[press-ready](https://github.com/vibranthq/press-ready)に標準対応しています。

`make press-ready`を実行すると、原稿データが印刷所に入稿可能な状態の PDF に変換されます。

### prh による文章校正

`lint`コマンドで[prh](https://github.com/prh/prh)による文章チェックができます。

```
docker run -it --rm -v ${PWD}/articles:/in vibranthq/opinionated-review lint
```

あるいは`make lint`を実行しても同様です。

## テーマ

### ビルトインテーマ

現在対応している組版スタイルのリストです。

- `techbooster` [opinionated-review/themes/techbooster](https://github.com/vibranthq/opinionated-review/blob/master/opinionated-review/themes/techbooster)

`opinionated-review`に`--theme=<theme>`オプションを渡すことで使用できます。

```
docker run -it --rm \
  -v ${PWD}/articles:/in \
  -v ${PWD}/dist:/out \
  vibranthq/opinionated-review pdf --theme=techbooster
```

### カスタムテーマ

`opinionated-review`に`--theme=<path/to/theme>`オプションを渡すことでカスタムテーマを使用できます。

### サイズ変更

デフォルトでは A5 サイズで出力されます。
サイズを変更する方法が 2 つあります。
選べるサイズはテーマに依存しています。例えば`techbooster`テーマでは`A5`と`B5`が選べます。

#### 1. `opinionated-review.yml`

`.re`ファイルがあるフォルダに`opinionated-review.yml`ファイルを作成し、内容を次のようにします。

```yaml
paper: B5
```

#### 2. コマンドラインオプション

`docker run <省略> vibranthq/opinionated-review pdf --paperSize B5`のように`--paperSize`オプションで用紙サイズを指定できます。

## アップデート

新しいイメージを Pull することでアップデートできます。

```
docker pull vibranthq/opinionated-review
```

## GitHub Actions

```yaml
name: Build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: vibranthq/build-review@v1
        with:
          format: pdf
      - uses: vibranthq/build-review@v1
        with:
          format: epub
      - uses: actions/upload-artifact@master
        with:
          name: Artifacts
          path: ./dist
```

## ロードマップ

Pull Request & Issue 大歓迎です。

- プリセットテーマの追加
- ローカルのテーマフォルダ（`sty`や`css`の集まり）を指定できるようにする

## ライセンス

- [Re:VIEW image for Docker](https://github.com/vvakame/docker-review) by [@vvakame](https://github.com/vvakame)
- [テーマのライセンス表記](https://github.com/vibranthq/opinionated-review/blob/master/opinionated-review/themes)

## 補遺: Re:VIEW リファレンス

- [Re:VIEW 記法](https://github.com/kmuto/review/blob/master/doc/format.ja.md)
- [Re:VIEW catalog.yml](https://github.com/kmuto/review/blob/master/doc/catalog.ja.md)
- [Re:VIEW FAQ TeX](https://review-knowledge-ja.readthedocs.io/ja/latest/faq/faq-tex.html)
- [Re:VIEW FAQ Usage](https://review-knowledge-ja.readthedocs.io/ja/latest/faq/faq-usage.html)

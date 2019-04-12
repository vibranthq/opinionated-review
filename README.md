# opinionated-review

ゼロコンフィグで Re:VIEW 原稿を PDF に変換できる Opinionated な Re:VIEW ビルダーです。

## 主要なポイント

- ゼロコンフィギュレーション
- 原稿データ（`.re`, `images`）と組版ファイル（`.sty`, `.css`等）を分離し、原稿の執筆に集中できる環境を構築する
- 組版関連ファイルを`theme`単位でフォルダにまとめているので、後からのテーマの追加と切り替えが用意
- Docker ベースのビルドにより、TeX 等の環境依存ゼロ

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
docker run -it --rm \
        -v /path/to/book/articles:/in \
        -v /path/to/book/dist:/out \
        vibranthq/opinionated-review
===> Using theme 'techbooster'
===> Copying sources to the container
===> Compiling Re:VIEW sources
INFO: compiling preface.tex
INFO: compiling article.tex
INFO: compiling contributors.tex
INFO: uplatex -interaction=nonstopmode -file-line-error __REVIEW_BOOK__.tex
INFO: uplatex -interaction=nonstopmode -file-line-error __REVIEW_BOOK__.tex
INFO: uplatex -interaction=nonstopmode -file-line-error __REVIEW_BOOK__.tex
INFO: dvipdfmx -d 5 -z 9 __REVIEW_BOOK__.dvi
===> Done
ReVIEW-Template.pdf
```

## 使い方（詳細）

Docker Hub から`opinionated-review`イメージを Pull します。

```
docker pull vibranthq/opinionated-review
```

`.re`ファイルがあるソースフォルダを`/in`に、PDF を出力したいターゲットフォルダを`/out`に指定して、`opinionated-review`を実行します。
この例では`./articles`をソースフォルダに、`./dist`フォルダをターゲットフォルダにしています（絶対パス）。

```
docker run -it --rm -v ${PWD}/articles:/in -v ${PWD}/dist:/out vibranthq/opinionated-review
```

> 上記のコマンド群は`Makefile`にも定義されています。
> 原稿データから PDF を生成したい場合は、`make pdf`あるいは単に`make`を実行してください。

## 印刷所に入稿可能な PDF への変換

`opinionated-review`は[press-ready](https://github.com/vibranthq/press-ready)に標準対応しています。

`make press-ready`を実行すると、原稿データが印刷所に入稿可能な状態の PDF に変換されます。

## prh による文章校正

`lint`コマンドで[prh](https://github.com/prh/prh)による文章チェックができます。

```
docker run -it --rm -v ${PWD}/articles:/in vibranthq/opinionated-review lint
```

## テーマ

現在対応している組版スタイルのリストです。

- `techbooster` [opinionated-review/themes/techbooster](https://github.com/vibranthq/opinionated-review/blob/master/opinionated-review/themes/techbooster)

## ロードマップ

Pull Request & Issue 大歓迎です。

- 選択できるテーマの追加
- テーマを選択するコマンドラインオプションの実装
- EPUB 出力

## ライセンス

- [Re:VIEW image for Docker](https://github.com/vvakame/docker-review) by [@vvakame](https://github.com/vvakame)
- [テーマのライセンス表記](https://github.com/vibranthq/opinionated-review/blob/master/opinionated-review/themes)

## 補遺: Re:VIEW リファレンス

- [Re:VIEW 記法](https://github.com/kmuto/review/blob/master/doc/format.ja.md)
- [Re:VIEW catalog.yml](https://github.com/kmuto/review/blob/master/doc/catalog.ja.md)
- [Re:VIEW FAQ TeX](https://review-knowledge-ja.readthedocs.io/ja/latest/faq/faq-tex.html)
- [Re:VIEW FAQ Usage](https://review-knowledge-ja.readthedocs.io/ja/latest/faq/faq-usage.html)

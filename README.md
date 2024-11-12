# Molecular Structure Editor and Viewer

分子構造の編集、表示、管理のためのWebアプリケーション。Ketcherエディタを用いた構造式の描画とRDKit.jsによる構造式の表示を統合しています。

## 機能概要

### 1. 構造式エディタ（Ketcher）
- 分子構造の対話的な描画
- 一般的な有機化学構造の編集ツール
- 構造式の保存とエクスポート
- スケッチパッドとしての利用

### 2. SMILES入力・管理
- 複数行のSMILES文字列の一括入力
  - 1行あたり：`SMILES [Name]` の形式
  - Name（分子名）は任意
- CSVファイルからのインポート
  - SMILES列の指定
  - 複数分子の一括読み込み
- エディタからの構造追加
- リストの管理（追加・削除・クリア）

### 3. 構造式表示（RDKit.js）
- 2列グリッドレイアウトでの表示
- SMILES文字列からの自動描画
- 分子名とSMILES文字列の表示
- SVG形式での構造式レンダリング

### 4. コントロールパネル
- Molfileの取得
- SMILES文字列の取得
- サンプル分子の読み込み
- 構造データの表示

## 技術仕様

### 使用技術
- Ketcher (version 2.25.0)
- RDKit.js
- HTML5
- CSS3（レスポンシブデザイン）
- JavaScript（ES6+）

### ファイル構造
```
project/
├── index.html           # メインHTML
├── README.md           # 本ドキュメント
├── css/
│   └── styles.css      # スタイルシート
├── js/
│   ├── ketcher-handler.js   # Ketcher制御
│   ├── rdkit-handler.js     # RDKit.js制御
│   ├── smiles-handler.js    # SMILES処理
│   └── csv-handler.js       # CSV処理
└── ketcher-standalone-2.25.0/  # Ketcherライブラリ
```

### 動作要件
- モダンなWebブラウザ（Chrome, Firefox, Safari, Edge最新版）
- JavaScriptの有効化
- ローカルWebサーバーでの実行必要（CORS対策）

## セットアップ手順

1. リポジトリのクローン
```bash
git clone [repository-url]
```

2. 依存関係の設置
- Ketcherスタンドアロンバージョンの配置
- RDKit.jsの読み込み設定

3. ローカルサーバーの起動
```bash
python -m http.server 8000
```

4. ブラウザでアクセス
```
http://localhost:8000
```

## 使用方法

### 1. 構造式の描画
1. 左上のKetcherエディタで分子を描画
2. 「Add from Editor」で現在の構造をリストに追加

### 2. SMILESの一括入力
1. 右上のテキストエリアにSMILES文字列を入力
   ```
   CCO Ethanol
   CC(=O)O Acetic acid
   ```
2. 「Add SMILES」をクリックして追加

### 3. CSVファイルからの読み込み
1. 「Upload CSV」でファイルを選択
2. SMILES列を指定
3. 「Process CSV」で読み込み

### 4. 構造式の表示
- 追加された分子は自動的に右下のビューアに表示
- 2列のグリッドレイアウトで整理
- 分子名とSMILES文字列も表示

## 今後の開発予定

### 短期的な改善点
1. エラーハンドリングの強化
2. 表示サイズの最適化
3. パフォーマンス改善

### 中長期的な機能追加
1. 3D構造表示機能
2. 物性予測機能の統合
3. データベース連携
4. バッチ処理機能
5. 構造検索機能

## ライセンス
[ライセンス情報を記載]

## 貢献
- Issue報告や機能要望は歓迎します
- プルリクエストは開発ガイドラインに従ってください

## 作者
[作者情報を記載]

---
**Note:** このドキュメントは開発中のプロジェクトのものであり、仕様は変更される可能性があります。
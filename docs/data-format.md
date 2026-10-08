# データの正本と取り込み手順

版情報と判定表の正本はこのリポジトリの `data/` です。Web 版（このサイト）とネイティブ版
（`cancer-staging-app`）は同じファイルを使います（2026-10-09 裁定）。判定や版数を直すときは
`data/` だけを直し、各アプリ側に判定や版数を書きません。

## ファイル

| ファイル | 内容 |
|---|---|
| `data/editions.json` | 系統ごとの準拠版・最新版・状態、出典（規約名・学会・出版社）、免責文、変更履歴 |
| `data/staging/<id>.json` | 系統ごとの因子・選択肢・Stage 表 |
| `js/staging-engine.js` | 表引きの実装（`StagingEngine.resolve(def, values)`） |
| `tests/golden/<id>.json` | 全組合せの判定結果（回帰検出用） |

`<id>` は系統の識別子で、`editions.json` の `editions` のキー、`data/staging/` のファイル名、
ツールページの `data-cancer-type` で共通です。

## `data/staging/<id>.json`

- `name`: 系統の表示名（日英）。
- `scope`: 任意。臨床分類・病理分類などの補足（日英）。
- `factors`: 入力因子の配列。`key`（`t` `n` `m` など）、`label`、`options`（`value` と日英 `label`）。
  ラベルは原本の定義文を写さず、自前の短い要約で書く。
- `derive`: 任意。入力から別の因子を導く。`count` の条件を満たした数を `map` で値に変える
  （肝癌の規約は 3 条件の該当数から T を決める）。
- `rules`: Stage 表。上から順に見て、`when` の全条件（因子 key → 許す値の配列）を満たす
  最初の行の `stage` が結果。どの行にも当たらなければ判定不能（`null`）。
- `labelStatus`: `summarized-unreviewed` は自前の要約に書き換え済みで医学的な検収が未了、`reviewed` は検収済み。
  対照表は `npm run label-review` で `docs/label-review.md` に出す。

## `data/editions.json`

- `editions.<id>.basis[]`: `source`（`sources` のキー）、`implemented`（実装している版）、
  `latest`（最新版）、発行日、出典 URL、正誤表の反映日。版は `15` `6補訂` `8増補` の形。
- `editions.<id>.status`: `current`（現行版を実装）／`outdated`（新版あり・未反映）／
  `unverified`（原本との照合が未了）。
- 日付や URL が `null` の項目は未確認。推測で埋めない。

## 版を改訂するとき

1. 「旧版→新版 変更点一覧」を作り、書籍と突き合わせて検収を受ける。
2. `data/staging/<id>.json` と `data/editions.json` を直す。
3. `npm run golden` でゴールデンケースを作り直し、`git diff tests/golden` が変更点一覧と一致することを確認する。
4. `npm run build`（変更履歴とキャッシュ版の生成）→ `npm test`。

## ネイティブ版への取り込み

ネイティブ版はこのリポジトリの次のファイルをそのまま取り込みます（内容を書き換えない）。

- `data/editions.json`
- `data/staging/*.json`
- `tests/golden/*.json`（ネイティブ側の実装が同じ結果を返すことの検証用）

ネイティブ側は `rules` を上から順に引く処理と `derive` を実装し、取り込んだゴールデンケースの
全件で結果が一致することをテストで確認します。取り込み元のコミット ID をネイティブ側に記録し、
Web 版の `data/` が変わったら取り込み直します。ネイティブ側の書き換えは膵癌（M3）の反映後に行います。

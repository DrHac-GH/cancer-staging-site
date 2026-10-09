# T4 で判定不能になっていた6通りの修正

- 状態: **反映済み**（2026-10-09）。書籍での照合は未了。
- 内容: 判定表に行が無く「判定不能」になっていた6通りを追加した。ほかの組合せは変わらない。

| 系統 | 入力 | 修正前 | 修正後 | 根拠 |
|---|---|---|---|---|
| pancreas-jp | T4 N1 M0 | 判定不能 | III | 日本膵臓学会 規約第8版 公式英訳（J Hepatobiliary Pancreat Sci 2024・CC BY）Table 3 https://pmc.ncbi.nlm.nih.gov/articles/PMC11589393 |
| pancreas-uicc | T4 N1 M0 | 判定不能 | III | UICC/AJCC 第8版 https://pmc.ncbi.nlm.nih.gov/articles/PMC6069838/table/Tab2 |
| biliary-distal | T4 N0 M0 | 判定不能 | IIIB | AJCC 第8版（NCI の定義） https://ncbi.nlm.nih.gov/medgen/1626426 |
| biliary-distal | T4 N1 M0 | 判定不能 | IIIB | 同上 |
| biliary-distal | T4 N2 M0 | 判定不能 | IIIB | 同上 |
| biliary-gallbladder | T4 N1 M0 | 判定不能 | IVA | AJCC 第8版 https://www.cancer.org/cancer/types/gallbladder-cancer/detection-diagnosis-staging/staging.html |

修正後に残る判定不能は、Tis でリンパ節転移ありの組合せだけ。

# 選択肢ラベルの対照表（検収用）

旧サイトの表記と、現在の要約を並べています。要約が医学的に正しいか（意味が変わっていないか・
落ちた条件がないか）を原本で確認してください。一致率は旧表記との言い回しの近さ（0〜1）で、
「—」は短い事実表記のため比較対象外です。このファイルは `npm run label-review` で作り直します。

## 遠位胆管癌 `biliary-distal`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| Tis | 上皮内癌/高度異形成 | （変更なし） | Carcinoma in situ/High-grade dysplasia | — |
| T1 | 胆管壁に浸潤し、深達度5mm未満 | 胆管壁内・浸潤の深さ5mm未満 | Bile duct wall, depth under 5 mm | 0.48 |
| T2 | 胆管壁に浸潤し、深達度5mm以上12mm未満 | 胆管壁内・深さ5mm以上12mm未満 | Bile duct wall, depth 5 to under 12 mm | 0.63 |
| T3 | 胆管壁に浸潤し、深達度12mm以上 | 胆管壁内・深さ12mm以上 | Bile duct wall, depth 12 mm or more | 0.50 |
| T4 | 腹腔動脈、上腸間膜動脈、および/または総肝動脈に浸潤 | 主要動脈（腹腔・上腸間膜・総肝）へ浸潤 | Reaches a major artery (celiac, SMA or common hepatic) | 0.33 |
| N0 | 所属リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 1-3個の所属リンパ節転移あり | 1〜3個 | 1–3 nodes | 0.12 |
| N2 | 4個以上の所属リンパ節転移あり | 4個以上 | 4 or more nodes | 0.35 |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 胆嚢癌 `biliary-gallbladder`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| Tis | 上皮内癌（粘膜内） | （変更なし） | Carcinoma in situ (intramucosal) | — |
| T1a | 粘膜固有層に浸潤 | （変更なし） | Invades lamina propria | — |
| T1b | 筋層に浸潤 | （変更なし） | Invades muscularis propria | — |
| T2a | 腹膜側（遊離面）の筋層外結合組織に浸潤 | 筋層の外へ（腹腔側） | Beyond the muscle layer, peritoneal side | 0.07 |
| T2b | 肝側（肝臓に付着している面）の筋層外結合組織に浸潤 | 筋層の外へ（肝側） | Beyond the muscle layer, liver side | 0.19 |
| T3 | 漿膜（臓側腹膜）を穿破、および/または肝臓に直接浸潤、および/または他の隣接臓器に直接浸潤 | 漿膜を破る／肝または隣接臓器1つへ直接浸潤 | Breaches serosa, or directly involves the liver or one nearby organ | 0.28 |
| T4 | 主門脈または肝動脈に浸潤、または2つ以上の肝外臓器または構造に浸潤 | 門脈本幹・肝動脈へ浸潤／肝外2臓器以上 | Main portal vein or hepatic artery involved, or at least two organs outside the liver | 0.28 |
| N0 | 所属リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 1-3個の所属リンパ節転移あり | 1〜3個 | 1–3 nodes | 0.12 |
| N2 | 4個以上の所属リンパ節転移あり | 4個以上 | 4 or more nodes | 0.35 |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 肝内胆管癌 `biliary-intrahepatic`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| Tis | 上皮内癌（管内腫瘍） | （変更なし） | Carcinoma in situ (intraductal tumor) | — |
| T1a | 脈管侵襲を伴わない孤立性腫瘍で5cm以下 | 単発5cm以下・脈管侵襲なし | Single, 5 cm or less, no vascular invasion | 0.44 |
| T1b | 脈管侵襲を伴わない孤立性腫瘍で5cm超 | 単発5cm超・脈管侵襲なし | Single, over 5 cm, no vascular invasion | 0.40 |
| T2 | 肝内脈管侵襲を伴う孤立性腫瘍、または脈管侵襲の有無にかかわらず多発性腫瘍 | 単発で肝内脈管侵襲あり／多発 | Single with intrahepatic vascular invasion, or multiple | 0.25 |
| T3 | 臓側腹膜を穿破する腫瘍 | 臓側腹膜を破る | Breaches the visceral peritoneum | — |
| T4 | 直接浸潤により肝外の局所構造に及ぶ腫瘍 | 肝外の隣接構造へ直接浸潤 | Direct spread to nearby extrahepatic structures | 0.41 |
| N0 | 所属リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 所属リンパ節転移あり | （変更なし） | Regional lymph node metastasis present | — |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 肝門部領域胆管癌 `biliary-perihilar`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| Tis | 上皮内癌/高度異形成 | （変更なし） | Carcinoma in situ/High-grade dysplasia | — |
| T1 | 胆管壁に限局する腫瘍（筋層または線維組織まで進展） | 胆管壁内にとどまる | Within the bile duct wall | 0.13 |
| T2a | 胆管壁を越えて周囲の脂肪組織に浸潤 | 壁を越え周囲の脂肪へ | Beyond the wall into surrounding fat | 0.56 |
| T2b | 隣接する肝実質に浸潤 | 隣接する肝実質へ | Into adjacent liver tissue | — |
| T3 | 片側の門脈枝または肝動脈に浸潤 | 片側の門脈枝・肝動脈枝へ浸潤 | Portal vein or hepatic artery branch on one side | 0.59 |
| T4 | 主門脈またはその両側枝、あるいは片側の二次胆管枝と対側の門脈または肝動脈に浸潤 | 門脈本幹・両側枝へ浸潤／片側の二次胆管枝＋対側の門脈・肝動脈 | Main or both portal branches; or second-order ducts on one side plus opposite-side vessels | 0.51 |
| N0 | 所属リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 1-3個の所属リンパ節転移あり | 1〜3個 | 1–3 nodes | 0.12 |
| N2 | 4個以上の所属リンパ節転移あり | 4個以上 | 4 or more nodes | 0.35 |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 大腸癌 `colorectal`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| Tis | 上皮内癌 | （変更なし） | Carcinoma in situ | — |
| T1 | 粘膜下層まで | （変更なし） | Invades submucosa | — |
| T2 | 固有筋層まで | （変更なし） | Invades muscularis propria | — |
| T3 | 漿膜下層または固有筋層外の結腸・直腸周囲組織まで | 固有筋層を越える（漿膜下層・周囲組織まで） | Through the muscle layer into subserosa or surrounding tissue | 0.51 |
| T4a | 腹膜の表面に露出 | 漿膜表面に露出 | Reaches the serosal surface | — |
| T4b | 他の臓器に直接浸潤 | 他臓器へ直接浸潤 | Directly involves other organs | — |
| N0 | なし | （変更なし） | None | — |
| N1a | 1個の転移 | （変更なし） | 1 regional lymph node metastasis | — |
| N1b | 2-3個の転移 | （変更なし） | 2-3 regional lymph node metastases | — |
| N1c | 漿膜下、腸間膜、または腹膜に覆われていない結腸・直腸周囲組織に腫瘍の塊があるが、リンパ節転移はない | リンパ節転移なし・周囲組織に腫瘍結節あり | No nodal metastasis, but tumor deposits in surrounding tissue | 0.33 |
| N2a | 4-6個の転移 | （変更なし） | 4-6 regional lymph node metastases | — |
| N2b | 7個以上の転移 | （変更なし） | 7 or more regional lymph node metastases | — |
| M0 | なし | （変更なし） | None | — |
| M1a | 1つの臓器に遠隔転移がある（腹膜転移はなし） | 遠隔転移1臓器（腹膜転移なし） | One organ, no peritoneal spread | 0.57 |
| M1b | 2つ以上の臓器に遠隔転移がある | 遠隔転移2臓器以上 | Two or more organs | 0.45 |
| M1c | 腹膜に転移がある（他の臓器転移の有無を問わない） | 腹膜転移あり（他臓器は問わない） | Peritoneal spread, with or without other organs | 0.42 |

## 食道癌（組織学的進行度） `esophagus-p`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| T0 | （新設） | 原発巣を認めない | No primary tumor found | — |
| T1a | （新設） | 粘膜内（上皮内癌を含む） | Within the mucosa (includes carcinoma in situ) | — |
| T1b | （新設） | 粘膜下層まで | Into the submucosa | — |
| T2 | （新設） | 固有筋層まで | Into the muscle layer | — |
| T3 | （新設） | 外膜まで | Into the adventitia | — |
| T4a | （新設） | 胸膜・心膜・横隔膜などへ浸潤 | Pleura, pericardium, diaphragm, etc. | — |
| T4b | （新設） | 大動脈・気管・椎体などへ浸潤 | Aorta, trachea, vertebral body, etc. | — |
| N0 | （新設） | なし | None | — |
| N1 | （新設） | 1〜2個 | 1-2 nodes | — |
| N2 | （新設） | 3〜6個 | 3-6 nodes | — |
| N3 | （新設） | 7個以上 | 7 or more nodes | — |
| M0 | （新設） | なし | None | — |
| M1a | （新設） | 領域外だが郭清の効果を見込めるリンパ節（鎖骨上など） | Extra-regional nodes where dissection may still help (e.g. supraclavicular) | — |
| M1b | （新設） | その他の領域外リンパ節・遠隔臓器 | Other extra-regional nodes or distant organs | — |

## 食道癌（臨床的進行度） `esophagus`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| T0 | （新設） | 原発巣を認めない | No primary tumor found | — |
| T1a | （新設） | 粘膜内（上皮内癌を含む） | Within the mucosa (includes carcinoma in situ) | — |
| T1b | （新設） | 粘膜下層まで | Into the submucosa | — |
| T2 | 固有筋層にとどまる | 固有筋層まで | Into the muscle layer | — |
| T3r | （新設） | 外膜まで・切除可能 | Into the adventitia, resectable | — |
| T3br | （新設） | 外膜まで・切除可能境界 | Into the adventitia, borderline resectable | — |
| T4 | （新設） | 隣接臓器へ浸潤 | Involves adjacent structures | — |
| N0 | なし | （変更なし） | None | — |
| N1 | 1〜2個 | （変更なし） | 1-2 nodes | — |
| N2 | 3〜6個 | （変更なし） | 3-6 nodes | — |
| N3 | 7個以上 | （変更なし） | 7 or more nodes | — |
| M0 | なし | （変更なし） | None | — |
| M1a | （新設） | 領域外だが郭清の効果を見込めるリンパ節（鎖骨上など） | Extra-regional nodes where dissection may still help (e.g. supraclavicular) | — |
| M1b | （新設） | その他の領域外リンパ節・遠隔臓器 | Other extra-regional nodes or distant organs | — |

## 肝癌（規約） `liver-jp`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| single | 単発 | （変更なし） | Single | — |
| multiple | 多発 | （変更なし） | Multiple | — |
| le2cm | 2cm以下 | （変更なし） | ≤ 2cm | — |
| gt2cm | 2cm超 | （変更なし） | > 2cm | — |
| none | なし | （変更なし） | None | — |
| present | あり | （変更なし） | Present | — |
| N0 | 所属リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 所属リンパ節転移あり | （変更なし） | Regional lymph node metastasis present | — |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 肝癌（UICC） `liver-uicc`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| T1a | 孤立性腫瘍で最大径が2cm以下（脈管浸潤の有無を問わない） | 単発2cm以下 | Single, 2 cm or less | 0.24 |
| T1b | 孤立性腫瘍で最大径が2cmを超える（脈管浸潤なし） | 単発2cm超・脈管浸潤なし | Single, over 2 cm, no vascular invasion | 0.39 |
| T2 | 孤立性腫瘍で最大径が2cmを超え、脈管浸潤を認める。または、多発性腫瘍で最大径が5cm以下。 | 単発2cm超で脈管浸潤あり／多発ですべて5cm以下 | Single over 2 cm with vascular invasion, or multiple all 5 cm or less | 0.29 |
| T3 | 多発性腫瘍で、少なくとも1つが最大径5cmを超える。 | 多発・5cm超を含む | Multiple, at least one over 5 cm | 0.18 |
| T4 | 門脈または肝静脈の主枝に浸潤する腫瘍。または、胆嚢を除く隣接臓器に直接浸潤、または臓側腹膜を穿破する腫瘍。 | 門脈・肝静脈の主枝へ浸潤／胆嚢以外の隣接臓器へ直接浸潤／臓側腹膜を破る | Major portal or hepatic vein branch; or nearby organs other than gallbladder; or breaches visceral peritoneum | 0.42 |
| N0 | 所属リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 所属リンパ節転移あり | （変更なし） | Regional lymph node metastasis present | — |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 膵癌（規約） `pancreas-jp`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| Tis | 上皮内癌 | （変更なし） | Carcinoma in situ | — |
| T1 | 腫瘍の最大径が2cm以下で膵臓内に限局 | 2cm以下・膵内 | 2 cm or less, within the pancreas | 0.32 |
| T2 | 腫瘍の最大径が2cmを超えるが膵臓内に限局 | 2cm超・膵内 | Over 2 cm, within the pancreas | 0.15 |
| T3 | 膵外への進展があるが、腹腔動脈または上腸間膜動脈に及ばない | 膵外へ進展（腹腔・上腸間膜の動脈には及ばない） | Beyond the pancreas, sparing the celiac axis and SMA | 0.48 |
| T4 | 腹腔動脈または上腸間膜動脈に及ぶ | 主要動脈（腹腔・上腸間膜）に及ぶ | Reaches the celiac axis or SMA | 0.47 |
| N0 | 所属リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 所属リンパ節転移あり | （変更なし） | Regional lymph node metastasis present | — |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 膵癌（UICC） `pancreas-uicc`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| Tis | 上皮内癌 | （変更なし） | Carcinoma in situ | — |
| T1 | 腫瘍の最大径が2cm以下 (T1a: ≤0.5cm, T1b: >0.5-<1cm, T1c: 1-2cm) | 2cm以下（T1a 0.5cm以下／T1b 0.5cm超1cm未満／T1c 1〜2cm） | 2 cm or less (T1a up to 0.5 cm / T1b over 0.5 to under 1 cm / T1c 1–2 cm) | 0.46 |
| T2 | 腫瘍の最大径が2cmを超え4cm以下 | 2cm超4cm以下 | Over 2 cm, up to 4 cm | 0.48 |
| T3 | 腫瘍の最大径が4cmを超える | 4cm超 | Over 4 cm | 0.25 |
| T4 | 腹腔動脈、上腸間膜動脈、総肝動脈に及ぶ腫瘍 | 主要動脈（腹腔・上腸間膜・総肝）に及ぶ | Reaches a major artery (celiac, SMA or common hepatic) | 0.42 |
| N0 | 所属リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 1〜3個の所属リンパ節転移あり | 1〜3個 | 1–3 nodes | 0.35 |
| N2 | 4個以上の所属リンパ節転移あり | 4個以上 | 4 or more nodes | 0.35 |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 胃癌（病理分類 pStage） `stomach-p`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| T1 | 癌が粘膜または粘膜下層にとどまる | 粘膜〜粘膜下層まで | Mucosa to submucosa | 0.35 |
| T2 | 固有筋層にとどまる | 固有筋層まで | Into the muscle layer | — |
| T3 | 漿膜下層にとどまる | 漿膜下層まで | Into the subserosa | — |
| T4a | 漿膜を越えて胃の表面に露出 | 漿膜表面に露出 | Reaches the serosal surface | 0.56 |
| T4b | 周囲の他臓器に直接浸潤 | 隣接臓器へ直接浸潤 | Directly involves nearby organs | — |
| N0 | リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 1〜2個 | （変更なし） | 1-2 regional lymph nodes | — |
| N2 | 3〜6個 | （変更なし） | 3-6 regional lymph nodes | — |
| N3a | 7〜15個 | （変更なし） | 7-15 regional lymph nodes | — |
| N3b | 16個以上 | （変更なし） | 16 or more regional lymph nodes | — |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

## 胃癌（臨床分類 cStage） `stomach`

| 選択肢 | 旧サイトの表記 | 現在の要約 | English | 一致率 |
|---|---|---|---|---|
| T1 | 癌が粘膜または粘膜下層にとどまる | 粘膜〜粘膜下層まで | Mucosa to submucosa | 0.35 |
| T2 | 固有筋層にとどまる | 固有筋層まで | Into the muscle layer | — |
| T3 | 漿膜下層にとどまる | 漿膜下層まで | Into the subserosa | — |
| T4a | 漿膜を越えて胃の表面に露出 | 漿膜表面に露出 | Reaches the serosal surface | 0.56 |
| T4b | 周囲の他臓器に直接浸潤 | 隣接臓器へ直接浸潤 | Directly involves nearby organs | — |
| N0 | リンパ節転移なし | （変更なし） | No regional lymph node metastasis | — |
| N1 | 1〜2個 | （変更なし） | 1-2 regional lymph nodes | — |
| N2 | 3〜6個 | （変更なし） | 3-6 regional lymph nodes | — |
| N3a | 7〜15個 | （変更なし） | 7-15 regional lymph nodes | — |
| N3b | 16個以上 | （変更なし） | 16 or more regional lymph nodes | — |
| M0 | 遠隔転移なし | （変更なし） | No distant metastasis | — |
| M1 | 遠隔転移あり | （変更なし） | Distant metastasis present | — |

const stagingLogic = {
    esophagus: (t, n, m) => {
        if (m === 'M1') return 'IVB';
        if (n === 'N3') return 'IVB';
        if (n === 'N2') return 'IVA';
        if (n === 'N1') return 'IIIC';
        if (n === 'N0') {
            if (t === 'Tis') return '0';
            if (t === 'T1') return 'I';
            if (t === 'T2') return 'II';
            if (t === 'T3') return 'IIIA';
            if (t === 'T4a') return 'IIIB';
            if (t === 'T4b') return 'IIIC';
        }
        return '判定不能';
    },
    stomach: (t, n, m) => {
        if (m === 'M1') return 'IVB';
        if (t === 'T4b') return 'IVA';
        if (t === 'T3' || t === 'T4a') {
            if (n === 'N0') return 'IIB';
            return 'III';
        }
        if (t === 'T1' || t === 'T2') {
            if (n === 'N0') return 'I';
            return 'IIA';
        }
        return '判定不能';
    },
    colorectal: (t, n, m) => {
        if (m === 'M1c') return 'IVC';
        if (m === 'M1b') return 'IVB';
        if (m === 'M1a') return 'IVA';
        if (m === 'M0') {
            if (n === 'N0') {
                if (t === 'Tis') return '0';
                if (t === 'T1' || t === 'T2') return 'I';
                if (t === 'T3') return 'IIA';
                if (t === 'T4a') return 'IIB';
                if (t === 'T4b') return 'IIC';
            } else if (n === 'N1a' || n === 'N1b' || n === 'N1c') {
                if (t === 'T1' || t === 'T2') return 'IIIA';
                if (t === 'T3' || t === 'T4a') return 'IIIB';
            } else if (n === 'N2a') {
                if (t === 'T1') return 'IIIA';
                if (t === 'T2' || t === 'T3') return 'IIIB';
                if (t === 'T4a') return 'IIIC'; // T4a N2a M0 の場合を追加
            } else if (n === 'N2b') {
                if (t === 'T1' || t === 'T2') return 'IIIB';
                if (t === 'T3' || t === 'T4a') return 'IIIC';
            }
        }
        return '判定不能';
    },
    'liver-jp': (tumorCount, tumorSize, vascularInvasion, n, m) => {
        let tFactor = '判定不能';
        let conditionsMet = 0;

        if (tumorCount === 'single') conditionsMet++;
        if (tumorSize === 'le2cm') conditionsMet++;
        if (vascularInvasion === 'none') conditionsMet++;

        if (conditionsMet === 3) {
            tFactor = 'T1';
        } else if (conditionsMet === 2) {
            tFactor = 'T2';
        } else if (conditionsMet === 1) {
            tFactor = 'T3';
        } else if (conditionsMet === 0) {
            tFactor = 'T4';
        }

        let stage = '判定不能';

        if (m === 'M1') {
            stage = 'IVB';
        } else if (n === 'N1') {
            stage = 'IVB'; // N1の場合はTに関わらずIVB
        } else if (m === 'M0' && n === 'N0') {
            if (tFactor === 'T1') {
                stage = 'I';
            } else if (tFactor === 'T2') {
                stage = 'II';
            } else if (tFactor === 'T3') {
                stage = 'III';
            } else if (tFactor === 'T4') {
                stage = 'IVA';
            }
        }
        return stage;
    },
    'liver-uicc': (t, n, m) => {
        let stage = '判定不能';

        if (m === 'M1') {
            stage = 'IVB';
        } else if (n === 'N1') {
            stage = 'IVA';
        } else if (m === 'M0' && n === 'N0') {
            if (t === 'T1a') {
                stage = 'IA';
            } else if (t === 'T1b') {
                stage = 'IB';
            } else if (t === 'T2') {
                stage = 'II';
            } else if (t === 'T3') {
                stage = 'IIIA';
            } else if (t === 'T4') {
                stage = 'IIIB';
            }
        }
        return stage;
    },
    'pancreas-jp': (t, n, m) => {
        let stage = '判定不能';

        if (m === 'M1') {
            stage = 'IV';
        } else if (n === 'N1') {
            if (t === 'T1' || t === 'T2' || t === 'T3') {
                stage = 'IIB';
            }
        } else if (n === 'N0') {
            if (t === 'Tis') {
                stage = '0';
            } else if (t === 'T1') {
                stage = 'IA';
            } else if (t === 'T2') {
                stage = 'IB';
            } else if (t === 'T3') {
                stage = 'IIA';
            } else if (t === 'T4') {
                stage = 'III';
            }
        }
        return stage;
    },
    'pancreas-uicc': (t, n, m) => {
        let stage = '判定不能';

        if (m === 'M1') {
            stage = 'IV';
        } else if (n === 'N2') {
            stage = 'III';
        } else if (n === 'N1') {
            if (t === 'T1' || t === 'T2' || t === 'T3') {
                stage = 'IIB';
            }
        } else if (n === 'N0') {
            if (t === 'Tis') {
                stage = '0';
            } else if (t === 'T1') {
                stage = 'IA';
            } else if (t === 'T2') {
                stage = 'IB';
            } else if (t === 'T3') {
                stage = 'IIA';
            } else if (t === 'T4') {
                stage = 'III';
            }
        }
        return stage;
    },
    'biliary-distal': (t, n, m) => {
        let stage = '判定不能';

        if (m === 'M1') {
            stage = 'IV';
        } else if (n === 'N2') {
            if (t === 'T1' || t === 'T2' || t === 'T3') {
                stage = 'IIIA';
            }
        } else if (n === 'N1') {
            if (t === 'T1') {
                stage = 'IIA';
            } else if (t === 'T2') {
                stage = 'IIB';
            } else if (t === 'T3') {
                stage = 'IIB';
            }
        } else if (n === 'N0') { // N0の場合のロジックを追加
            if (t === 'Tis') {
                stage = '0';
            } else if (t === 'T1') {
                stage = 'I';
            } else if (t === 'T2') {
                stage = 'IIA';
            } else if (t === 'T3') {
                stage = 'IIB';
            }
        }
        return stage;
    },
    'biliary-gallbladder': (t, n, m) => {
        let stage = '判定不能';

        if (m === 'M1') {
            stage = 'IVB';
        } else if (n === 'N2') {
            stage = 'IVB';
        } else if (n === 'N1') {
            if (t === 'T1a' || t === 'T1b' || t === 'T2a' || t === 'T2b' || t === 'T3') {
                stage = 'IIIB';
            }
        }
        else if (n === 'N0') {
            if (t === 'Tis') {
                stage = '0';
            } else if (t === 'T1a') {
                stage = 'IA';
            } else if (t === 'T1b') {
                stage = 'IB';
            } else if (t === 'T2a') {
                stage = 'IIA';
            } else if (t === 'T2b') {
                stage = 'IIB';
            } else if (t === 'T3') {
                stage = 'IIIA';
            } else if (t === 'T4') {
                stage = 'IVA';
            }
        }
        return stage;
    },
    'biliary-intrahepatic': (t, n, m) => {
        let stage = '判定不能';

        if (m === 'M1') {
            stage = 'IV';
        } else if (n === 'N1') {
            stage = 'IIIB';
        } else if (n === 'N0') {
            if (t === 'Tis') {
                stage = '0';
            } else if (t === 'T1a') {
                stage = 'IA';
            } else if (t === 'T1b') {
                stage = 'IB';
            } else if (t === 'T2') {
                stage = 'II';
            } else if (t === 'T3') {
                stage = 'IIIA';
            } else if (t === 'T4') {
                stage = 'IIIB';
            }
        }
        return stage;
    },
    'biliary-perihilar': (t, n, m) => {
        let stage = '判定不能';

        if (m === 'M1') {
            stage = 'IVB';
        } else if (n === 'N2') {
            stage = 'IVA';
        } else if (n === 'N1') {
            stage = 'IIIC';
        } else if (n === 'N0') {
            if (t === 'Tis') {
                stage = '0';
            } else if (t === 'T1') {
                stage = 'I';
            } else if (t === 'T2a' || t === 'T2b') {
                stage = 'II';
            } else if (t === 'T3') {
                stage = 'IIIA';
            } else if (t === 'T4') {
                stage = 'IIIB';
            }
        }
        return stage;
    },
};
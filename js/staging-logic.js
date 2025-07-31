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
            } else if (n === 'N2b') {
                if (t === 'T1' || t === 'T2') return 'IIIB';
                if (t === 'T3' || t === 'T4a') return 'IIIC';
            }
        }
        return '判定不能';
    },
    // ... other cancer types will be added here
};

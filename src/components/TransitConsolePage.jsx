import React, { useState, useRef, useEffect } from 'react';

const RAILWAY_TRAINS = [
  // 1. Telangana Express (HYB ⇄ NDLS)
  {
    no: '12723',
    name: 'Telangana Express',
    trainKey: 'telangana_express',
    from: 'HYB (Hyderabad)',
    to: 'NDLS (New Delhi)',
    fromKey: 'hyderabad',
    toKey: 'new_delhi',
    type: 'Superfast',
    platform: 'PF 1',
    sta: '06:25',
    via: ['Secunderabad (SC)', 'Bhopal (BPL)'],
    divertedVia: ['Bhopal (BPL)', 'Hazrat Nizamuddin (NZM)'],
    coaches: ['ENG', 'SLR', 'GS', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'A1', 'A2', 'H1', 'GS', 'SLR'],
  },
  {
    no: '12724',
    name: 'Telangana Express',
    trainKey: 'telangana_express',
    from: 'NDLS (New Delhi)',
    to: 'HYB (Hyderabad)',
    fromKey: 'new_delhi',
    toKey: 'hyderabad',
    type: 'Superfast',
    platform: 'PF 4',
    sta: '16:00',
    via: ['Bhopal (BPL)', 'Secunderabad (SC)'],
    divertedVia: ['Hazrat Nizamuddin (NZM)', 'Bhopal (BPL)'],
    coaches: ['ENG', 'SLR', 'GS', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'A1', 'A2', 'H1', 'GS', 'SLR'],
  },

  // 2. Vande Bharat Express (SC ⇄ VSKP)
  {
    no: '20833',
    name: 'Vande Bharat Express',
    trainKey: 'secunderabad_visakhapatnam_vande_bharat',
    from: 'SC (Secunderabad)',
    to: 'VSKP (Visakhapatnam)',
    fromKey: 'secunderabad',
    toKey: 'visakhapatnam',
    type: 'Vande Bharat',
    platform: 'PF 1',
    sta: '15:00',
    via: ['Vijayawada (BZA)'],
    divertedVia: ['Guntur (GNT)', 'Vijayawada (BZA)'],
    coaches: ['DTC', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'E1', 'E2', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'DTC'],
  },
  {
    no: '20834',
    name: 'Vande Bharat Express',
    trainKey: 'secunderabad_visakhapatnam_vande_bharat',
    from: 'VSKP (Visakhapatnam)',
    to: 'SC (Secunderabad)',
    fromKey: 'visakhapatnam',
    toKey: 'secunderabad',
    type: 'Vande Bharat',
    platform: 'PF 1',
    sta: '05:45',
    via: ['Vijayawada (BZA)'],
    divertedVia: ['Vijayawada (BZA)', 'Guntur (GNT)'],
    coaches: ['DTC', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'E1', 'E2', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'DTC'],
  },

  // 3. Charminar Express (HYB ⇄ TBM)
  {
    no: '12760',
    name: 'Charminar Express',
    trainKey: 'charminar_express',
    from: 'HYB (Hyderabad)',
    to: 'TBM (Tambaram)',
    fromKey: 'hyderabad',
    toKey: 'tambaram',
    type: 'Superfast',
    platform: 'PF 5',
    sta: '18:00',
    via: ['Secunderabad (SC)', 'Vijayawada (BZA)', 'Chennai Central (MAS)'],
    divertedVia: ['Guntur (GNT)', 'Chennai Central (MAS)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'B1', 'B2', 'B3', 'B4', 'A1', 'A2', 'H1', 'GS', 'SLR'],
  },
  {
    no: '12759',
    name: 'Charminar Express',
    trainKey: 'charminar_express',
    from: 'TBM (Tambaram)',
    to: 'HYB (Hyderabad)',
    fromKey: 'tambaram',
    toKey: 'hyderabad',
    type: 'Superfast',
    platform: 'PF 8',
    sta: '17:30',
    via: ['Chennai Central (MAS)', 'Vijayawada (BZA)', 'Secunderabad (SC)'],
    divertedVia: ['Chennai Central (MAS)', 'Guntur (GNT)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'B1', 'B2', 'B3', 'B4', 'A1', 'A2', 'H1', 'GS', 'SLR'],
  },

  // 4. Godavari Express (HYB ⇄ VSKP)
  {
    no: '12728',
    name: 'Godavari Express',
    trainKey: 'godavari_express',
    from: 'HYB (Hyderabad)',
    to: 'VSKP (Visakhapatnam)',
    fromKey: 'hyderabad',
    toKey: 'visakhapatnam',
    type: 'Superfast',
    platform: 'PF 2',
    sta: '17:05',
    via: ['Secunderabad (SC)', 'Vijayawada (BZA)'],
    divertedVia: ['Guntur (GNT)', 'Vijayawada (BZA)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'B1', 'B2', 'B3', 'B4', 'A1', 'A2', 'H1', 'GS', 'SLR'],
  },
  {
    no: '12727',
    name: 'Godavari Express',
    trainKey: 'godavari_express',
    from: 'VSKP (Visakhapatnam)',
    to: 'HYB (Hyderabad)',
    fromKey: 'visakhapatnam',
    toKey: 'hyderabad',
    type: 'Superfast',
    platform: 'PF 1',
    sta: '17:20',
    via: ['Vijayawada (BZA)', 'Secunderabad (SC)'],
    divertedVia: ['Vijayawada (BZA)', 'Guntur (GNT)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'B1', 'B2', 'B3', 'B4', 'A1', 'A2', 'H1', 'GS', 'SLR'],
  },

  // 5. Gautami Express (LPI ⇄ COA)
  {
    no: '12738',
    name: 'Gautami Express',
    trainKey: 'gautami_express',
    from: 'LPI (Lingampalli)',
    to: 'COA (Kakinada Port)',
    fromKey: 'lingampalli',
    toKey: 'kakinada_port',
    type: 'Superfast',
    platform: 'PF 3',
    sta: '21:15',
    via: ['Secunderabad (SC)', 'Vijayawada (BZA)'],
    divertedVia: ['Guntur (GNT)', 'Vijayawada (BZA)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'B1', 'B2', 'B3', 'B4', 'A1', 'GS', 'SLR'],
  },
  {
    no: '12737',
    name: 'Gautami Express',
    trainKey: 'gautami_express',
    from: 'COA (Kakinada Port)',
    to: 'LPI (Lingampalli)',
    fromKey: 'kakinada_port',
    toKey: 'lingampalli',
    type: 'Superfast',
    platform: 'PF 1',
    sta: '19:10',
    via: ['Vijayawada (BZA)', 'Secunderabad (SC)'],
    divertedVia: ['Vijayawada (BZA)', 'Guntur (GNT)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'B1', 'B2', 'B3', 'B4', 'A1', 'GS', 'SLR'],
  },

  // 6. Guntur Secunderabad Intercity (GNT ⇄ SC)
  {
    no: '12705',
    name: 'Guntur Secunderabad Intercity',
    trainKey: 'guntur_secunderabad_intercity',
    from: 'GNT (Guntur)',
    to: 'SC (Secunderabad)',
    fromKey: 'guntur',
    toKey: 'secunderabad',
    type: 'Intercity SF',
    platform: 'PF 4',
    sta: '14:30',
    via: ['Vijayawada (BZA)'],
    divertedVia: ['Hyderabad (HYB)'],
    coaches: ['ENG', 'DL1', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'C1', 'C2', 'DL2'],
  },
  {
    no: '12706',
    name: 'Secunderabad Guntur Intercity',
    trainKey: 'guntur_secunderabad_intercity',
    from: 'SC (Secunderabad)',
    to: 'GNT (Guntur)',
    fromKey: 'secunderabad',
    toKey: 'guntur',
    type: 'Intercity SF',
    platform: 'PF 7',
    sta: '07:45',
    via: ['Vijayawada (BZA)'],
    divertedVia: ['Hyderabad (HYB)'],
    coaches: ['ENG', 'DL1', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'C1', 'C2', 'DL2'],
  },

  // 7. Secunderabad - Repalle Express (SC ⇄ RAL)
  {
    no: '17645',
    name: 'Secunderabad - Repalle Express',
    trainKey: 'secunderabad_repalle_express',
    from: 'SC (Secunderabad)',
    to: 'RAL (Repalle)',
    fromKey: 'secunderabad',
    toKey: 'repalle',
    type: 'Express',
    platform: 'PF 6',
    sta: '12:40',
    via: ['Guntur (GNT)', 'Vijayawada (BZA)'],
    divertedVia: ['Guntur (GNT)'],
    coaches: ['ENG', 'SLR', 'GS', 'GS', 'S1', 'S2', 'S3', 'S4', 'B1', 'GS', 'SLR'],
  },
  {
    no: '17646',
    name: 'Repalle - Secunderabad Express',
    trainKey: 'secunderabad_repalle_express',
    from: 'RAL (Repalle)',
    to: 'SC (Secunderabad)',
    fromKey: 'repalle',
    toKey: 'secunderabad',
    type: 'Express',
    platform: 'PF 1',
    sta: '07:10',
    via: ['Vijayawada (BZA)', 'Guntur (GNT)'],
    divertedVia: ['Guntur (GNT)'],
    coaches: ['ENG', 'SLR', 'GS', 'GS', 'S1', 'S2', 'S3', 'S4', 'B1', 'GS', 'SLR'],
  },

  // 8. Venkatadri Express (KCG ⇄ CTO)
  {
    no: '12797',
    name: 'Venkatadri Express',
    trainKey: 'venkatadri_express',
    from: 'KCG (Kacheguda)',
    to: 'CTO (Chittoor)',
    fromKey: 'kacheguda',
    toKey: 'chittoor',
    type: 'Superfast',
    platform: 'PF 1',
    sta: '20:05',
    via: ['Tirupati (TPTY)'],
    divertedVia: ['Tirupati (TPTY)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'A1', 'GS', 'SLR'],
  },
  {
    no: '12798',
    name: 'Venkatadri Express',
    trainKey: 'venkatadri_express',
    from: 'CTO (Chittoor)',
    to: 'KCG (Kacheguda)',
    fromKey: 'chittoor',
    toKey: 'kacheguda',
    type: 'Superfast',
    platform: 'PF 1',
    sta: '17:30',
    via: ['Tirupati (TPTY)'],
    divertedVia: ['Tirupati (TPTY)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'A1', 'GS', 'SLR'],
  },

  // 9. Pinakini Express (BZA ⇄ MAS)
  {
    no: '12711',
    name: 'Pinakini Express',
    trainKey: 'pinakini_express',
    from: 'BZA (Vijayawada)',
    to: 'MAS (Chennai Central)',
    fromKey: 'vijayawada',
    toKey: 'mgr_chennai_central',
    type: 'Intercity SF',
    platform: 'PF 1',
    sta: '06:10',
    via: ['Guntur (GNT)'],
    divertedVia: ['Guntur (GNT)'],
    coaches: ['ENG', 'DL1', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'C1', 'C2', 'DL2'],
  },
  {
    no: '12712',
    name: 'Pinakini Express',
    trainKey: 'pinakini_express',
    from: 'MAS (Chennai Central)',
    to: 'BZA (Vijayawada)',
    fromKey: 'mgr_chennai_central',
    toKey: 'vijayawada',
    type: 'Intercity SF',
    platform: 'PF 5',
    sta: '14:10',
    via: ['Guntur (GNT)'],
    divertedVia: ['Guntur (GNT)'],
    coaches: ['ENG', 'DL1', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'C1', 'C2', 'DL2'],
  },

  // 10. Chennai Rajdhani Express (MAS ⇄ NDLS)
  {
    no: '12433',
    name: 'Chennai Rajdhani Express',
    trainKey: 'chennai_rajdhani_express',
    from: 'MAS (Chennai Central)',
    to: 'NDLS (New Delhi)',
    fromKey: 'mgr_chennai_central',
    toKey: 'new_delhi',
    type: 'Rajdhani',
    platform: 'PF 2',
    sta: '06:05',
    via: ['Vijayawada (BZA)', 'Bhopal (BPL)'],
    divertedVia: ['Vijayawada (BZA)', 'Hazrat Nizamuddin (NZM)'],
    coaches: ['ENG', 'EOG', 'B1', 'B2', 'B3', 'B4', 'A1', 'A2', 'H1', 'PC', 'EOG'],
  },
  {
    no: '12434',
    name: 'Chennai Rajdhani Express',
    trainKey: 'chennai_rajdhani_express',
    from: 'NDLS (New Delhi)',
    to: 'MAS (Chennai Central)',
    fromKey: 'new_delhi',
    toKey: 'mgr_chennai_central',
    type: 'Rajdhani',
    platform: 'PF 3',
    sta: '15:35',
    via: ['Bhopal (BPL)', 'Vijayawada (BZA)'],
    divertedVia: ['Hazrat Nizamuddin (NZM)', 'Vijayawada (BZA)'],
    coaches: ['ENG', 'EOG', 'B1', 'B2', 'B3', 'B4', 'A1', 'A2', 'H1', 'PC', 'EOG'],
  },

  // 11. Tamil Nadu Express (MAS ⇄ NDLS)
  {
    no: '12621',
    name: 'Tamil Nadu Express',
    trainKey: 'tamil_nadu_express',
    from: 'MAS (Chennai Central)',
    to: 'NDLS (New Delhi)',
    fromKey: 'mgr_chennai_central',
    toKey: 'new_delhi',
    type: 'Superfast',
    platform: 'PF 4',
    sta: '22:00',
    via: ['Vijayawada (BZA)', 'Bhopal (BPL)'],
    divertedVia: ['Vijayawada (BZA)', 'Hazrat Nizamuddin (NZM)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'A1', 'GS', 'SLR'],
  },
  {
    no: '12622',
    name: 'Tamil Nadu Express',
    trainKey: 'tamil_nadu_express',
    from: 'NDLS (New Delhi)',
    to: 'MAS (Chennai Central)',
    fromKey: 'new_delhi',
    toKey: 'mgr_chennai_central',
    type: 'Superfast',
    platform: 'PF 5',
    sta: '21:05',
    via: ['Bhopal (BPL)', 'Vijayawada (BZA)'],
    divertedVia: ['Hazrat Nizamuddin (NZM)', 'Vijayawada (BZA)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'A1', 'GS', 'SLR'],
  },

  // 12. Grand Trunk Express (MAS ⇄ NDLS)
  {
    no: '12615',
    name: 'Grand Trunk Express',
    trainKey: 'grand_trunk_express',
    from: 'MAS (Chennai Central)',
    to: 'NDLS (New Delhi)',
    fromKey: 'mgr_chennai_central',
    toKey: 'new_delhi',
    type: 'Superfast',
    platform: 'PF 3',
    sta: '18:50',
    via: ['Vijayawada (BZA)', 'Bhopal (BPL)'],
    divertedVia: ['Vijayawada (BZA)', 'Hazrat Nizamuddin (NZM)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'A1', 'GS', 'SLR'],
  },
  {
    no: '12616',
    name: 'Grand Trunk Express',
    trainKey: 'grand_trunk_express',
    from: 'NDLS (New Delhi)',
    to: 'MAS (Chennai Central)',
    fromKey: 'new_delhi',
    toKey: 'mgr_chennai_central',
    type: 'Superfast',
    platform: 'PF 6',
    sta: '16:10',
    via: ['Bhopal (BPL)', 'Vijayawada (BZA)'],
    divertedVia: ['Hazrat Nizamuddin (NZM)', 'Vijayawada (BZA)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'A1', 'GS', 'SLR'],
  },

  // 13. Kerala Express (TVC ⇄ NDLS)
  {
    no: '12625',
    name: 'Kerala Express',
    trainKey: 'kerala_express',
    from: 'TVC (Thiruvananthapuram)',
    to: 'NDLS (New Delhi)',
    fromKey: 'thiruvananthapuram_central',
    toKey: 'new_delhi',
    type: 'Superfast',
    platform: 'PF 1',
    sta: '11:15',
    via: ['Chennai Central (MAS)', 'Vijayawada (BZA)', 'Bhopal (BPL)'],
    divertedVia: ['Vijayawada (BZA)', 'Hazrat Nizamuddin (NZM)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'A1', 'GS', 'SLR'],
  },
  {
    no: '12626',
    name: 'Kerala Express',
    trainKey: 'kerala_express',
    from: 'NDLS (New Delhi)',
    to: 'TVC (Thiruvananthapuram)',
    fromKey: 'new_delhi',
    toKey: 'thiruvananthapuram_central',
    type: 'Superfast',
    platform: 'PF 2',
    sta: '20:10',
    via: ['Bhopal (BPL)', 'Vijayawada (BZA)', 'Chennai Central (MAS)'],
    divertedVia: ['Hazrat Nizamuddin (NZM)', 'Vijayawada (BZA)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'S5', 'B1', 'B2', 'B3', 'A1', 'GS', 'SLR'],
  },

  // 14. Swarna Jayanti Express (VSKP ⇄ NZM)
  {
    no: '12803',
    name: 'Swarna Jayanti Express',
    trainKey: 'swarna_jayanti_express',
    from: 'VSKP (Visakhapatnam)',
    to: 'NZM (Hazrat Nizamuddin)',
    fromKey: 'visakhapatnam',
    toKey: 'hazrat_nizamuddin',
    type: 'Superfast',
    platform: 'PF 1',
    sta: '08:20',
    via: ['Vijayawada (BZA)', 'Bhopal (BPL)'],
    divertedVia: ['Bhopal (BPL)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'B1', 'B2', 'A1', 'GS', 'SLR'],
  },
  {
    no: '12804',
    name: 'Swarna Jayanti Express',
    trainKey: 'swarna_jayanti_express',
    from: 'NZM (Hazrat Nizamuddin)',
    to: 'VSKP (Visakhapatnam)',
    fromKey: 'hazrat_nizamuddin',
    toKey: 'visakhapatnam',
    type: 'Superfast',
    platform: 'PF 6',
    sta: '05:50',
    via: ['Bhopal (BPL)', 'Vijayawada (BZA)'],
    divertedVia: ['Bhopal (BPL)'],
    coaches: ['ENG', 'SLR', 'GS', 'S1', 'S2', 'S3', 'S4', 'B1', 'B2', 'A1', 'GS', 'SLR'],
  },

  // 15. Varanasi New Delhi Vande Bharat (BSB ⇄ NDLS)
  {
    no: '22435',
    name: 'Varanasi New Delhi Vande Bharat',
    trainKey: 'varanasi_new_delhi_vande_bharat',
    from: 'BSB (Varanasi)',
    to: 'NDLS (New Delhi)',
    fromKey: 'varanasi',
    toKey: 'new_delhi',
    type: 'Vande Bharat',
    platform: 'PF 1',
    sta: '15:00',
    via: [],
    divertedVia: ['Hazrat Nizamuddin (NZM)'],
    coaches: ['DTC', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'E1', 'DTC'],
  },
  {
    no: '22436',
    name: 'New Delhi Varanasi Vande Bharat',
    trainKey: 'varanasi_new_delhi_vande_bharat',
    from: 'NDLS (New Delhi)',
    to: 'BSB (Varanasi)',
    fromKey: 'new_delhi',
    toKey: 'varanasi',
    type: 'Vande Bharat',
    platform: 'PF 1',
    sta: '06:00',
    via: [],
    divertedVia: ['Hazrat Nizamuddin (NZM)'],
    coaches: ['DTC', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'E1', 'DTC'],
  },

  // 16. Bhopal Shatabdi Express (NDLS ⇄ BPL)
  {
    no: '12001',
    name: 'Bhopal Shatabdi Express',
    trainKey: 'bhopal_shatabdi_express',
    from: 'NDLS (New Delhi)',
    to: 'BPL (Bhopal)',
    fromKey: 'new_delhi',
    toKey: 'bhopal',
    type: 'Shatabdi',
    platform: 'PF 1',
    sta: '06:00',
    via: ['Hazrat Nizamuddin (NZM)'],
    divertedVia: ['Hazrat Nizamuddin (NZM)'],
    coaches: ['ENG', 'EOG', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'E1', 'E2', 'EOG'],
  },
  {
    no: '12002',
    name: 'Bhopal Shatabdi Express',
    trainKey: 'bhopal_shatabdi_express',
    from: 'BPL (Bhopal)',
    to: 'NDLS (New Delhi)',
    fromKey: 'bhopal',
    toKey: 'new_delhi',
    type: 'Shatabdi',
    platform: 'PF 1',
    sta: '15:00',
    via: ['Hazrat Nizamuddin (NZM)'],
    divertedVia: ['Hazrat Nizamuddin (NZM)'],
    coaches: ['ENG', 'EOG', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'E1', 'E2', 'EOG'],
  },
];

const LIVE_MOVEMENT_PHASES = [
  { id: 'approaching', label: 'Approaching', full: 'Approaching Station' },
  { id: 'arrival', label: 'Arrival', full: 'Train Arrival' },
  { id: 'halting', label: 'Halting', full: 'Halting on Platform' },
  { id: 'departure', label: 'Departure', full: 'Train Departure' },
  { id: 'terminated', label: 'Terminated', full: 'Terminated at Station' },
];

const ALERTS_EXCEPTIONS_PHASES = [
  { id: 'delayed', label: 'Delayed', full: 'Train Delayed' },
  { id: 'platform_change', label: 'Platform Change', full: 'Platform Change' },
  { id: 'diverted', label: 'Diverted', full: 'Train Diverted' },
  { id: 'cancelled', label: 'Cancelled', full: 'Train Cancelled' },
];

const LANGUAGE_CONFIG = {
  te: { id: 'te', label: 'Telugu', native: 'తెలుగు' },
  ta: { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ml: { id: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  hi: { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
  en: { id: 'en', label: 'English', native: 'English' },
};

const doesTrainServeStation = (train, station) => {
  if (!train || !station) return false;
  const code = station.code;
  const matchCode = (str) => {
    if (!str) return false;
    const tokens = str.replace(/[(),]/g, ' ').split(/\s+/);
    return tokens.includes(code);
  };
  if (matchCode(train.from)) return true;
  if (matchCode(train.to)) return true;
  if (train.fromKey === station.audioKey || train.toKey === station.audioKey) return true;
  if ((train.via || []).some((v) => matchCode(v))) return true;
  if ((train.divertedVia || []).some((v) => matchCode(v))) return true;
  return false;
};

const RAILWAY_JUNCTIONS = [
  { id: 'SC', code: 'SC', name: 'Secunderabad Junction', zone: 'SCR', platforms: 10, city: 'Secunderabad', audioKey: 'secunderabad', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'HYB', code: 'HYB', name: 'Hyderabad Deccan (Nampally)', zone: 'SCR', platforms: 6, city: 'Hyderabad', audioKey: 'hyderabad', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'KCG', code: 'KCG', name: 'Kacheguda', zone: 'SCR', platforms: 5, city: 'Hyderabad', audioKey: 'kacheguda', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'LPI', code: 'LPI', name: 'Lingampalli', zone: 'SCR', platforms: 6, city: 'Hyderabad', audioKey: 'lingampalli', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'BZA', code: 'BZA', name: 'Vijayawada Junction', zone: 'SCR', platforms: 10, city: 'Vijayawada', audioKey: 'vijayawada', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'GNT', code: 'GNT', name: 'Guntur Junction', zone: 'SCR', platforms: 7, city: 'Guntur', audioKey: 'guntur', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'VSKP', code: 'VSKP', name: 'Visakhapatnam Junction', zone: 'ECoR', platforms: 8, city: 'Visakhapatnam', audioKey: 'visakhapatnam', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'TPTY', code: 'TPTY', name: 'Tirupati Main', zone: 'SCR', platforms: 5, city: 'Tirupati', audioKey: 'tirupati', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'CTO', code: 'CTO', name: 'Chittoor', zone: 'SCR', platforms: 3, city: 'Chittoor', audioKey: 'chittoor', languages: ['te', 'ta', 'hi', 'en'], policy: 'Telugu ➔ Tamil ➔ Hindi ➔ English' },
  { id: 'RAL', code: 'RAL', name: 'Repalle', zone: 'SCR', platforms: 2, city: 'Repalle', audioKey: 'repalle', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'COA', code: 'COA', name: 'Kakinada Port', zone: 'SCR', platforms: 3, city: 'Kakinada', audioKey: 'kakinada_port', languages: ['te', 'hi', 'en'], policy: 'Telugu ➔ Hindi ➔ English' },
  { id: 'MAS', code: 'MAS', name: 'Chennai Central', zone: 'SR', platforms: 12, city: 'Chennai', audioKey: 'mgr_chennai_central', languages: ['ta', 'hi', 'en'], policy: 'Tamil ➔ Hindi ➔ English' },
  { id: 'TBM', code: 'TBM', name: 'Tambaram', zone: 'SR', platforms: 8, city: 'Chennai', audioKey: 'tambaram', languages: ['ta', 'hi', 'en'], policy: 'Tamil ➔ Hindi ➔ English' },
  { id: 'TVC', code: 'TVC', name: 'Thiruvananthapuram Central', zone: 'SR', platforms: 5, city: 'Thiruvananthapuram', audioKey: 'thiruvananthapuram_central', languages: ['ml', 'hi', 'en'], policy: 'Malayalam ➔ Hindi ➔ English' },
  { id: 'NDLS', code: 'NDLS', name: 'New Delhi', zone: 'NR', platforms: 16, city: 'New Delhi', audioKey: 'new_delhi', languages: ['hi', 'en'], policy: 'Hindi ➔ English' },
  { id: 'NZM', code: 'NZM', name: 'Hazrat Nizamuddin', zone: 'NR', platforms: 7, city: 'New Delhi', audioKey: 'hazrat_nizamuddin', languages: ['hi', 'en'], policy: 'Hindi ➔ English' },
  { id: 'BSB', code: 'BSB', name: 'Varanasi Junction', zone: 'NR', platforms: 9, city: 'Varanasi', audioKey: 'varanasi', languages: ['hi', 'en'], policy: 'Hindi ➔ English' },
  { id: 'BPL', code: 'BPL', name: 'Bhopal Junction', zone: 'WCR', platforms: 6, city: 'Bhopal', audioKey: 'bhopal', languages: ['hi', 'en'], policy: 'Hindi ➔ English' },
];

const ANNOUNCEMENT_CATEGORIES = [
  { id: 'movement', label: 'Train Movement Announcements', desc: 'Arrival, departure, delay, cancel, diversion & platform alerts' },
  { id: 'coach', label: 'Coach Guidance Announcements', desc: 'Rake composition, coach positions & extra coach guidance' },
  { id: 'security', label: 'Security & Passenger Safety Announcements', desc: 'RPF security alerts, baggage warning & track crossing safety' },
  { id: 'commercial', label: 'Commercial & Monetization Announcements', desc: 'Sponsor audio ads injection, brand jingles & station amenities' },
  { id: 'emergency', label: 'Emergency & Priority Override Announcements', desc: 'Medical SOS, doctor assistance & lost & found child alerts' },
];

export default function TransitConsolePage({ onBackToLanding, activeMode, onSelectMode }) {
  const [selectedStation, setSelectedStation] = useState(RAILWAY_JUNCTIONS[0]); // Default: Secunderabad Junction (SC)
  const [isStationDropdownOpen, setIsStationDropdownOpen] = useState(false);
  const [stationSearchQuery, setStationSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ANNOUNCEMENT_CATEGORIES[0].id);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(RAILWAY_TRAINS[0]);
  const [isTrainDropdownOpen, setIsTrainDropdownOpen] = useState(false);
  const [trainSearchQuery, setTrainSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('arrival');
  const [phasePage, setPhasePage] = useState(0); // 0: Live Movement (5), 1: Alerts & Exceptions (4)
  const [selectedPlatform, setSelectedPlatform] = useState('PF 1');
  const [scheduledHours, setScheduledHours] = useState('06');
  const [scheduledMins, setScheduledMins] = useState('25');
  const [customHours, setCustomHours] = useState('06');
  const [customMins, setCustomMins] = useState('25');
  const [platformPage, setPlatformPage] = useState(0); // 0: PF 1-8, 1: PF 9-16, 2: PF 17-24
  const [selectedLanguages, setSelectedLanguages] = useState(['te', 'hi', 'en']); // Native Telugu + Hindi + English all active by default
  const [selectedZone, setSelectedZone] = useState('all'); // All Station by default
  const dropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const stationDropdownRef = useRef(null);
  const customMinsRef = useRef(null);

  // Dynamic platforms based on selected Junction (Max 24)
  const currentPlatforms = Array.from({ length: selectedStation.platforms }, (_, i) => `PF ${i + 1}`);
  const totalPlatformPages = Math.max(1, Math.ceil(currentPlatforms.length / 8));

  const toggleLanguage = (id) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one active language
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectTrain = (train, targetStation = selectedStation) => {
    setSelectedTrain(train);
    if (train.platform) {
      const pfNum = parseInt(train.platform.replace('PF ', ''), 10);
      if (!isNaN(pfNum) && pfNum <= targetStation.platforms) {
        setSelectedPlatform(train.platform);
      } else {
        setSelectedPlatform('PF 1');
      }
    }
    if (train.sta) {
      const [h, m] = train.sta.split(':');
      const hh = h || '00';
      const mm = m || '00';
      setScheduledHours(hh);
      setScheduledMins(mm);
      setCustomHours(hh);
      setCustomMins(mm);
    }
    setIsTrainDropdownOpen(false);
    setTrainSearchQuery('');
  };

  const handleSelectStation = (station) => {
    setSelectedStation(station);
    setIsStationDropdownOpen(false);
    setStationSearchQuery('');
    
    // Dynamically apply official Indian Railways language policy for this station
    const newLangs = station.languages || ['hi', 'en'];
    setSelectedLanguages(newLangs);

    // Auto clamp selected platform if it exceeds new junction's platform capacity
    const currentNum = parseInt(selectedPlatform.replace('PF ', ''), 10);
    if (isNaN(currentNum) || currentNum > station.platforms) {
      setSelectedPlatform('PF 1');
      setPlatformPage(0);
    } else {
      const page = Math.floor((currentNum - 1) / 8);
      const maxP = Math.max(0, Math.ceil(station.platforms / 8) - 1);
      setPlatformPage(Math.min(maxP, page));
    }

    // Auto switch to a train that serves this station if current train does not
    if (!doesTrainServeStation(selectedTrain, station)) {
      const matchingTrain = RAILWAY_TRAINS.find((t) => doesTrainServeStation(t, station));
      if (matchingTrain) {
        handleSelectTrain(matchingTrain, station);
      }
    }
  };

  // Sync platform page with active selectedPlatform (e.g. if PF 10 selected, jump to page 1)
  useEffect(() => {
    if (!selectedPlatform) return;
    const pfNum = parseInt(selectedPlatform.replace('PF ', ''), 10);
    if (!isNaN(pfNum)) {
      const page = Math.floor((pfNum - 1) / 8);
      setPlatformPage(Math.min(totalPlatformPages - 1, Math.max(0, page)));
    }
  }, [selectedPlatform, selectedStation, totalPlatformPages]);

  const handlePrevPlatformPage = () => {
    setPlatformPage((p) => Math.max(0, p - 1));
  };

  const handleNextPlatformPage = () => {
    setPlatformPage((p) => Math.min(totalPlatformPages - 1, p + 1));
  };

  // Hours / Minutes validation and focus flow
  const handleCustomHoursChange = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 2);
    setCustomHours(clean);
    if (clean.length === 2 && customMinsRef.current) {
      customMinsRef.current.focus();
      customMinsRef.current.select();
    }
  };

  const handleCustomHoursBlur = () => {
    if (!customHours) {
      setCustomHours('00');
      return;
    }
    let num = parseInt(customHours, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 23) num = 23;
    setCustomHours(num.toString().padStart(2, '0'));
  };

  const handleCustomMinsChange = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 2);
    setCustomMins(clean);
  };

  const handleCustomMinsBlur = () => {
    if (!customMins) {
      setCustomMins('00');
      return;
    }
    let num = parseInt(customMins, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 59) num = 59;
    setCustomMins(num.toString().padStart(2, '0'));
  };

  const isCustomModified = customHours !== scheduledHours || customMins !== scheduledMins;

  const handleResetCustomTime = () => {
    setCustomHours(scheduledHours);
    setCustomMins(scheduledMins);
  };

  // Calculate live delay status between Scheduled Time and Custom Timing
  const getDelayInfo = () => {
    const sh = parseInt(scheduledHours, 10);
    const sm = parseInt(scheduledMins, 10);
    const ch = parseInt(customHours, 10);
    const cm = parseInt(customMins, 10);

    if (isNaN(sh) || isNaN(sm) || isNaN(ch) || isNaN(cm)) return null;

    const sTotal = sh * 60 + sm;
    const cTotal = ch * 60 + cm;
    const diff = cTotal - sTotal;

    if (diff === 0) return { label: 'On Time', isDelay: false };
    if (diff > 0) return { label: `+${diff} Min Late`, isDelay: true };
    return { label: `${Math.abs(diff)} Min Early`, isDelay: false };
  };
  const delayInfo = getDelayInfo();

  // Operational Logic for Via Route Visibility:
  // VIA ON (3 Phases): Arrival, Halting, Diverted
  // VIA OFF (6 Phases): Approaching, Departure, Terminated, Delayed, Platform Change, Cancelled
  const isViaRouteActive = ['arrival', 'halting', 'diverted'].includes(selectedPhase);
  const isDiverted = selectedPhase === 'diverted';
  const activeViaStations = isDiverted 
    ? (selectedTrain?.divertedVia || selectedTrain?.via || [])
    : (selectedTrain?.via || []);

  // Operational Logic: Platform change enabled ONLY in Platform Change phase
  const isPlatformChangeActive = selectedPhase === 'platform_change';

  // Close dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsTrainDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (stationDropdownRef.current && !stationDropdownRef.current.contains(e.target)) {
        setIsStationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStations = RAILWAY_JUNCTIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(stationSearchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(stationSearchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(stationSearchQuery.toLowerCase()) ||
      (s.policy && s.policy.toLowerCase().includes(stationSearchQuery.toLowerCase()))
  );

  // Filter trains strictly by the currently selected station / junction
  const junctionTrains = RAILWAY_TRAINS.filter((t) => doesTrainServeStation(t, selectedStation));
  const filteredTrains = junctionTrains.filter(
    (t) =>
      t.no.toLowerCase().includes(trainSearchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(trainSearchQuery.toLowerCase()) ||
      t.from.toLowerCase().includes(trainSearchQuery.toLowerCase()) ||
      t.to.toLowerCase().includes(trainSearchQuery.toLowerCase())
  );
  const modeData = [
    {
      id: 'rail',
      modeNum: 'Mode 1',
      title: 'Railways Transit Engine',
      purpose: 'Multi-lingual automated station P.A. broadcasts & real-time passenger mobile audio sync.',
      icon: '/rail_bullet_train.png',
      alt: 'High-Speed Rail Engine',
      specs: [
        'EN • HI • TE (3 Languages)',
        '< 85ms Synthesis Relay',
        'Platform Audio + QR Web Sync',
      ],
      btnText: 'Launch Rail Console',
    },
    {
      id: 'road',
      modeNum: 'Mode 2',
      title: 'Roadways Fleet Engine',
      purpose: 'Terminal dispatch audio, inter-city fleet announcements & passenger mobile sync.',
      icon: '/road_coach_bus.png',
      alt: 'Inter-City Fleet Coach Bus',
      specs: [
        'Multi-Bay Terminal Broadcast',
        'Dynamic Bus Route & Delay Sync',
        'In-Cabin Mobile Zero-Install Audio',
      ],
      btnText: 'Launch Road Console',
    },
    {
      id: 'air',
      modeNum: 'Mode 3',
      title: 'Airways Terminal Engine',
      purpose: 'Boarding gate chime synthesis, baggage claim sync & real-time departure announcements.',
      icon: '/air_plane_cockpit.png',
      alt: 'Aerodynamic Aircraft Engine',
      specs: [
        'Gate & Terminal Multi-Zone Audio',
        'Instant Gate Change Priority Alerts',
        'Personal Mobile Flight Sync via Web',
      ],
      btnText: 'Launch Air Console',
    },
  ];

  return (
    <div className="relative w-full h-screen bg-black text-white flex flex-col font-inter select-none overflow-hidden">
      
      {/* Minimal Floating Top Header */}
      <header className="relative z-20 w-full h-18 sm:h-20 px-6 sm:px-10 flex items-center justify-between border-b border-zinc-800/80 bg-black shrink-0">
        
        {/* Left: Overview Navigation Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 active:scale-[0.98] border border-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-[13px] font-medium transition-colors cursor-pointer select-none"
            aria-label="Back to Overview"
          >
            <svg 
              className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Overview</span>
          </button>
        </div>

        {/* Right: EchoTransit Logo with sharp "CLOUD" text */}
        <div className="flex items-center">
          <button 
            type="button"
            onClick={onBackToLanding}
            className="group flex items-center select-none cursor-pointer focus:outline-none hover:opacity-95 transition-opacity"
            aria-label="Back to EchoTransit Landing Page"
          >
            <div className="relative inline-flex items-start">
              <img 
                src="/logo.png" 
                alt="EchoTransit Logo" 
                className="h-9 sm:h-10 w-auto object-contain brightness-0 invert block"
              />
              <span className="self-start mt-0.5 sm:mt-1 ml-2 text-[10px] sm:text-[11px] font-extrabold tracking-[0.24em] uppercase font-sans text-white select-none antialiased leading-none">
                CLOUD
              </span>
            </div>
          </button>
        </div>

      </header>

      {/* Main Content Area (Centered in viewport with zero scroll) */}
      <main className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-6 sm:px-10 py-4 sm:py-6 overflow-y-auto">
        
        {/* Dedicated Rail Console View (/console/rail) */}
        {activeMode === 'rail' ? (
          <div className="w-full max-w-[1380px] bg-black border border-zinc-800 rounded-xl p-6 sm:p-8 flex flex-col">
            
            {/* Top Header: Station Name (Left) & Announcement Type Selector (Right) */}
            <div className="w-full py-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Station / Junction Selector Dropdown */}
              <div className="relative" ref={stationDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsStationDropdownOpen(!isStationDropdownOpen)}
                  className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer select-none"
                  aria-label="Switch Station / Junction"
                  title="Click to switch Station Junction"
                >
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white font-sans group-hover:text-zinc-200 transition-colors">
                    {selectedStation.name} ({selectedStation.code})
                  </h1>
                  
                  {/* Clean Switch Icon */}
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-white transition-colors shrink-0" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="m16 3 4 4-4 4" />
                    <path d="M20 7H4" />
                    <path d="m8 21-4-4 4-4" />
                    <path d="M4 17h16" />
                  </svg>
                </button>

                {/* Dropdown Menu for Junctions */}
                {isStationDropdownOpen && (
                  <div className="absolute left-0 top-[calc(100%+8px)] w-80 sm:w-96 rounded-lg bg-black border border-white/20 shadow-2xl z-40 overflow-hidden font-sans py-1">
                    <div className="p-2 border-b border-white/10">
                      <input
                        type="text"
                        placeholder="Search junction / station name or code..."
                        value={stationSearchQuery}
                        onChange={(e) => setStationSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/25 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/60 font-normal"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-zinc-900">
                      {filteredStations.length > 0 ? (
                        filteredStations.map((stn) => {
                          const isSelected = selectedStation.id === stn.id;
                          return (
                            <button
                              key={stn.id}
                              type="button"
                              onClick={() => handleSelectStation(stn)}
                              className={`w-full p-3 text-left flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900/60 text-zinc-300 hover:text-white'
                              }`}
                            >
                              <div>
                                <div className="text-xs sm:text-[13px] font-medium text-white font-sans">
                                  {stn.name} <span className="text-zinc-400 font-normal font-sans">({stn.code})</span>
                                </div>
                                <div className="text-[11px] text-zinc-500 mt-0.5 font-sans">
                                  {stn.city} • Zone: {stn.zone}
                                </div>
                              </div>
                              <span className={`text-[11px] font-sans font-medium px-2 py-0.5 rounded border shrink-0 ${
                                isSelected ? 'bg-white text-black border-white font-semibold' : 'bg-transparent text-zinc-300 border-white/20'
                              }`}>
                                {stn.platforms} PFs
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-xs text-zinc-500 font-normal">
                          No junction found matching "{stationSearchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Announcement Type Selector Dropdown */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="h-10 sm:h-11 px-3.5 rounded-lg bg-transparent border border-white/25 hover:border-white/50 text-xs sm:text-[13px] font-sans text-white flex items-center gap-2.5 transition-colors cursor-pointer select-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span className="font-medium text-white">
                    {ANNOUNCEMENT_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                  </span>
                  <svg 
                    className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-white' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+6px)] w-76 sm:w-80 rounded-lg bg-black border border-white/20 shadow-2xl z-40 overflow-hidden font-sans py-1">
                    {ANNOUNCEMENT_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`w-full px-3.5 py-3 text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                            isSelected ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900/60 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isSelected ? 'bg-white' : 'bg-transparent border border-zinc-600'}`} />
                          <div>
                            <div className="text-xs sm:text-[13px] font-medium text-white">{cat.label}</div>
                            <div className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{cat.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Hairline Divider Line */}
            <div className="w-full h-px bg-zinc-800/80 my-5" />

            {/* Controls Section: 2-Column Input Grid (Wider Columns) */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-7 items-start">
              
              {/* Row 1 - Column 1: Train Selection Input */}
              <div className="relative z-20 w-full" ref={dropdownRef}>
                <div className="h-6 flex items-center justify-between mb-2 select-none font-sans">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">
                    Select Train
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTrainDropdownOpen(!isTrainDropdownOpen)}
                  className="w-full h-11 px-3.5 rounded-lg bg-transparent border border-white/25 hover:border-white/50 text-left flex items-center justify-between text-xs sm:text-[13px] font-sans transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 truncate min-w-0">
                    <svg className="w-4 h-4 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="3" width="16" height="15" rx="2" />
                      <line x1="4" y1="11" x2="20" y2="11" />
                      <line x1="8" y1="15" x2="8.01" y2="15" strokeWidth="2.5" />
                      <line x1="16" y1="15" x2="16.01" y2="15" strokeWidth="2.5" />
                      <path d="m8 18-2 3" />
                      <path d="m16 18 2 3" />
                    </svg>
                    {selectedTrain ? (
                      <span className="text-white font-normal truncate">
                        <span className="font-medium text-zinc-300">{selectedTrain.no}</span> — {selectedTrain.name}
                      </span>
                    ) : (
                      <span className="text-zinc-500 font-normal">Search Train Number or Name...</span>
                    )}
                  </div>

                  {selectedTrain && (
                    <div className="flex items-center gap-1.5 text-xs font-sans text-zinc-400 shrink-0 ml-3">
                      <span className="text-zinc-300 font-normal hidden sm:inline">{selectedTrain.from}</span>
                      <span className="text-zinc-300 font-normal sm:hidden">{selectedTrain.from.split(' ')[0]}</span>
                      <span className="text-zinc-500 text-[11px] px-0.5">→</span>
                      <span className="text-zinc-300 font-normal hidden sm:inline">{selectedTrain.to}</span>
                      <span className="text-zinc-300 font-normal sm:hidden">{selectedTrain.to.split(' ')[0]}</span>
                    </div>
                  )}
                </button>

                {/* Dropdown Menu (Full Width of Column) */}
                {isTrainDropdownOpen && (
                  <div className="absolute left-0 top-[calc(100%+6px)] w-full rounded-lg bg-black border border-white/20 shadow-2xl z-30 overflow-hidden font-sans">
                    <div className="p-2 border-b border-white/10">
                      <input
                        type="text"
                        placeholder={`Search trains serving ${selectedStation.code}...`}
                        value={trainSearchQuery}
                        onChange={(e) => setTrainSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/25 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/60 font-normal"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto divide-y divide-zinc-900">
                      {filteredTrains.length > 0 ? (
                        filteredTrains.map((train) => {
                          const isSelected = selectedTrain?.no === train.no;
                          return (
                            <button
                              key={train.no}
                              type="button"
                              onClick={() => handleSelectTrain(train)}
                              className={`w-full p-3 text-left hover:bg-zinc-900/60 flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected ? 'bg-zinc-900/80 text-white' : ''
                              }`}
                            >
                              <div>
                                <div className="text-xs sm:text-[13px] font-normal text-white tracking-tight flex items-center gap-2">
                                  <span><span className="font-medium text-zinc-300">{train.no}</span> • {train.name}</span>
                                </div>
                                <div className="text-[11px] text-zinc-400 mt-0.5 font-normal">
                                  {train.from} → {train.to}
                                </div>
                              </div>
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                                isSelected ? 'bg-white text-black border-white font-semibold' : 'bg-transparent border-white/20 text-zinc-300'
                              }`}>
                                {train.type}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-xs text-zinc-500 font-normal">
                          No train serving {selectedStation.name} found matching "{trainSearchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 1 - Column 2: Operational Phase (2 Scrolling/Sliding Sets: 5 in Row 1, 4 in Row 2) */}
              <div className="w-full">
                <div className="h-6 flex items-center justify-between mb-2 select-none font-sans">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">
                    Operational Phase
                  </label>

                  {/* Navigation Controls (< >) */}
                  <div className="flex items-center gap-1.5 font-sans">
                    <span className="text-[11px] text-zinc-500 font-medium mr-1 select-none font-sans">
                      {phasePage + 1} / 2
                    </span>
                    <button
                      type="button"
                      onClick={() => setPhasePage(0)}
                      disabled={phasePage === 0}
                      className={`w-6 h-6 rounded flex items-center justify-center transition-colors select-none ${
                        phasePage === 0
                          ? 'opacity-25 cursor-not-allowed border border-white/10 text-zinc-600'
                          : 'bg-transparent border border-white/25 hover:border-white/50 text-zinc-300 hover:text-white cursor-pointer'
                      }`}
                      aria-label="Previous operational phases"
                      title="Row 1 (5 Phases)"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhasePage(1)}
                      disabled={phasePage === 1}
                      className={`w-6 h-6 rounded flex items-center justify-center transition-colors select-none ${
                        phasePage === 1
                          ? 'opacity-25 cursor-not-allowed border border-white/10 text-zinc-600'
                          : 'bg-transparent border border-white/25 hover:border-white/50 text-zinc-300 hover:text-white cursor-pointer'
                      }`}
                      aria-label="Next operational phases"
                      title="Row 2 (4 Phases)"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Sliding Frame: Exact h-11, Smooth Vertical Slide & Mouse Wheel */}
                <div 
                  className="w-full h-11 overflow-hidden"
                  onWheel={(e) => {
                    if (e.deltaY > 10 || e.deltaX > 10) {
                      setPhasePage(1);
                    } else if (e.deltaY < -10 || e.deltaX < -10) {
                      setPhasePage(0);
                    }
                  }}
                >
                  <div 
                    className="w-full transition-transform duration-300 ease-out flex flex-col"
                    style={{ transform: `translateY(-${phasePage * 50}%)` }}
                  >
                    {/* Row 1: Approaching | Arrival | Halting | Departure | Terminated (5 items) */}
                    <div className="w-full h-11 shrink-0 grid grid-cols-5 gap-1.5 sm:gap-2">
                      {LIVE_MOVEMENT_PHASES.map((phase) => {
                        const isSelected = selectedPhase === phase.id;

                        return (
                          <button
                            key={phase.id}
                            type="button"
                            title={phase.full}
                            onClick={() => setSelectedPhase(phase.id)}
                            className={`h-11 w-full px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-sans whitespace-nowrap transition-colors cursor-pointer select-none flex items-center justify-center ${
                              isSelected
                                ? 'bg-white text-black font-semibold border border-white shadow-sm'
                                : 'bg-transparent border border-white/25 text-zinc-300 hover:text-white hover:border-white/50 font-normal'
                            }`}
                          >
                            {phase.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Row 2: Delayed | Platform Change | Diverted | Cancelled (4 items) */}
                    <div className="w-full h-11 shrink-0 grid grid-cols-4 gap-1.5 sm:gap-2">
                      {ALERTS_EXCEPTIONS_PHASES.map((phase) => {
                        const isSelected = selectedPhase === phase.id;

                        return (
                          <button
                            key={phase.id}
                            type="button"
                            title={phase.full}
                            onClick={() => setSelectedPhase(phase.id)}
                            className={`h-11 w-full px-1.5 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-sans whitespace-nowrap transition-colors cursor-pointer select-none flex items-center justify-center ${
                              isSelected
                                ? 'bg-white text-black font-semibold border border-white shadow-sm'
                                : 'bg-transparent border border-white/25 text-zinc-300 hover:text-white hover:border-white/50 font-normal'
                            }`}
                          >
                            {phase.label === 'Platform Change' ? (
                              <>
                                <span className="hidden sm:inline">Platform Change</span>
                                <span className="sm:hidden">PF Change</span>
                              </>
                            ) : (
                              phase.label
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 - Column 1: Assigned Platform (Dynamic based on selected Junction, Max 24) */}
              <div className="w-full">
                <div className="h-6 flex items-center justify-between mb-2 select-none font-sans">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">
                    Assigned Platform
                  </label>

                  {/* Navigation Controls (< >) - Only shown if more than 1 page (> 8 platforms) */}
                  {totalPlatformPages > 1 && (
                    <div className="flex items-center gap-1.5 font-sans">
                      <span className="text-[11px] text-zinc-500 font-medium mr-1 select-none font-sans">
                        {platformPage + 1} / {totalPlatformPages}
                      </span>
                      <button
                        type="button"
                        onClick={handlePrevPlatformPage}
                        disabled={platformPage === 0}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-colors select-none ${
                          platformPage === 0
                            ? 'opacity-25 cursor-not-allowed border border-white/10 text-zinc-600'
                            : 'bg-transparent border border-white/25 hover:border-white/50 text-zinc-300 hover:text-white cursor-pointer'
                        }`}
                        aria-label="Previous 8 platforms"
                        title="Previous platforms"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextPlatformPage}
                        disabled={platformPage >= totalPlatformPages - 1}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-colors select-none ${
                          platformPage >= totalPlatformPages - 1
                            ? 'opacity-25 cursor-not-allowed border border-white/10 text-zinc-600'
                            : 'bg-transparent border border-white/25 hover:border-white/50 text-zinc-300 hover:text-white cursor-pointer'
                        }`}
                        aria-label="Next 8 platforms"
                        title="Next platforms"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Sliding Window of Exact 8 Platforms per View */}
                <div 
                  className="w-full overflow-hidden"
                  onWheel={(e) => {
                    if (totalPlatformPages > 1) {
                      if (e.deltaY > 15 || e.deltaX > 15) {
                        setPlatformPage((p) => Math.min(totalPlatformPages - 1, p + 1));
                      } else if (e.deltaY < -15 || e.deltaX < -15) {
                        setPlatformPage((p) => Math.max(0, p - 1));
                      }
                    }
                  }}
                >
                  <div 
                    className="flex w-full transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${platformPage * 100}%)` }}
                  >
                    {Array.from({ length: totalPlatformPages }, (_, pageIdx) => (
                      <div key={pageIdx} className="w-full shrink-0 grid grid-cols-8 gap-1.5 sm:gap-2">
                        {currentPlatforms.slice(pageIdx * 8, pageIdx * 8 + 8).map((pf) => {
                          const isSelected = selectedPlatform === pf;

                          return (
                            <button
                              key={pf}
                              type="button"
                              onClick={() => {
                                if (isPlatformChangeActive) {
                                  setSelectedPlatform(pf);
                                }
                              }}
                              className={`h-11 w-full rounded-lg text-xs font-sans whitespace-nowrap transition-colors select-none flex items-center justify-center ${
                                isSelected
                                  ? 'bg-white text-black font-semibold border border-white shadow-sm'
                                  : isPlatformChangeActive
                                  ? 'bg-transparent border border-white/25 text-zinc-300 hover:text-white hover:border-white/50 font-normal cursor-pointer'
                                  : 'bg-transparent border border-white/10 text-zinc-600 font-normal cursor-default'
                              }`}
                            >
                              {pf}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2 - Column 2: Timing & Schedule */}
              <div className="w-full">
                <div className="h-6 flex items-center justify-between mb-2 select-none font-sans">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">
                    Timing &amp; Schedule <span className="text-zinc-500 font-normal text-[11px] ml-1 tracking-normal font-sans">(24-HR IST)</span>
                  </label>
                  {delayInfo && (
                    <span className={`text-[11px] font-sans font-medium px-2 py-0.5 rounded border transition-colors ${
                      delayInfo.isDelay
                        ? 'text-white border-white/40 bg-zinc-900'
                        : 'text-zinc-400 border-white/20 bg-transparent'
                    }`}>
                      {delayInfo.label}
                    </span>
                  )}
                </div>

                {/* When Delayed: Show Dual Inputs (STA Timetable + Custom ETA Input) */}
                {selectedPhase === 'delayed' ? (
                  <div className="grid grid-cols-2 gap-3 w-full animate-fadeIn">
                    {/* Box 1: Scheduled Arrival Time (STA - Read-only Fixed Timetable) */}
                    <div className="h-11 px-3.5 rounded-lg bg-transparent border border-white/25 hover:border-white/40 transition-colors flex items-center justify-between select-none">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">STA</span>
                        <span className="text-[11px] text-zinc-500 font-sans">(Scheduled)</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-[13px] font-sans font-medium text-zinc-300">
                        <span>{scheduledHours}</span>
                        <span className="text-zinc-500 font-semibold text-xs px-1.5">:</span>
                        <span>{scheduledMins}</span>
                      </div>
                    </div>

                    {/* Box 2: Custom Expected Time (ETA) - ONLY Shown in Delayed Phase */}
                    <div className="h-11 px-3.5 rounded-lg bg-transparent border border-white/25 hover:border-white/50 focus-within:border-white/80 transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-2 select-none">
                        <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">ETA</span>
                        <span className="text-[11px] text-zinc-500 font-sans hidden sm:inline">Custom</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={2}
                            value={customHours}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => handleCustomHoursChange(e.target.value)}
                            onBlur={handleCustomHoursBlur}
                            placeholder="00"
                            className="w-8 h-7 text-center rounded bg-transparent hover:bg-white/5 focus:bg-white/10 border border-white/20 focus:border-white text-xs sm:text-[13px] font-sans font-medium text-white focus:outline-none transition-colors"
                            title="Custom Hours (00-23)"
                          />
                          <span className="text-zinc-400 font-semibold text-xs px-2 select-none">:</span>
                          <input
                            ref={customMinsRef}
                            type="text"
                            inputMode="numeric"
                            maxLength={2}
                            value={customMins}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => handleCustomMinsChange(e.target.value)}
                            onBlur={handleCustomMinsBlur}
                            placeholder="00"
                            className="w-8 h-7 text-center rounded bg-transparent hover:bg-white/5 focus:bg-white/10 border border-white/20 focus:border-white text-xs sm:text-[13px] font-sans font-medium text-white focus:outline-none transition-colors"
                            title="Custom Minutes (00-59)"
                          />
                        </div>
                        {isCustomModified && (
                          <button
                            type="button"
                            onClick={handleResetCustomTime}
                            className="w-6 h-6 rounded flex items-center justify-center text-[11px] text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer select-none"
                            title="Reset to Scheduled Time"
                          >
                            ↺
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* When NOT Delayed: Full-Width Scheduled Time (STA) Only */
                  <div className="h-11 w-full px-3.5 rounded-lg bg-transparent border border-white/25 hover:border-white/40 transition-colors flex items-center justify-between select-none animate-fadeIn">
                    <div className="flex items-center gap-2.5">
                      <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">STA</span>
                      <span className="text-xs text-zinc-500 font-sans">(Scheduled Time of Arrival)</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-[13px] font-sans font-medium text-white tracking-wide">
                      <span>{scheduledHours}</span>
                      <span className="text-zinc-500 font-semibold text-xs px-1.5">:</span>
                      <span>{scheduledMins}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 3 - Column 1: Broadcast Languages (Automatic Flow based on Station Language Policy) */}
              <div className="w-full">
                <div className="h-6 flex items-center justify-between mb-2 select-none font-sans">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">
                    Broadcast Languages
                  </label>
                  <span className="text-[11px] text-zinc-300 font-medium font-sans">
                    {selectedStation.policy}
                  </span>
                </div>

                {/* Automatic Language Flow Pills (Non-selectable, Automatic Display) */}
                <div className={`grid ${
                  (selectedStation.languages?.length || 3) === 2 
                    ? 'grid-cols-2' 
                    : (selectedStation.languages?.length || 3) === 4 
                    ? 'grid-cols-4' 
                    : 'grid-cols-3'
                } gap-1.5 sm:gap-2 w-full select-none`}>
                  {(selectedStation.languages || ['te', 'hi', 'en']).map((langId) => {
                    const lang = LANGUAGE_CONFIG[langId];
                    if (!lang) return null;

                    return (
                      <div
                        key={lang.id}
                        className="h-11 w-full px-2 rounded-lg text-xs font-sans whitespace-nowrap bg-white text-black font-semibold border border-white shadow-sm flex items-center justify-center cursor-default select-none"
                      >
                        {lang.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 3 - Column 2: Station Audio Zones */}
              <div className="w-full">
                <div className="h-6 flex items-center justify-between mb-2 select-none font-sans">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">
                    Station Audio Zones
                  </label>
                </div>

                {/* 4 Speaker Zone Pills in 1 Row */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full">
                  {[
                    { id: 'all', label: 'All Station' },
                    { id: 'platform', label: `${selectedPlatform} Only` },
                    { id: 'concourse', label: 'Concourse' },
                    { id: 'lounges', label: 'Waiting Halls' },
                  ].map((zone) => {
                    const isSelected = selectedZone === zone.id;

                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSelectedZone(zone.id)}
                        className={`h-11 w-full px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-sans whitespace-nowrap transition-colors cursor-pointer select-none flex items-center justify-center ${
                          isSelected
                            ? 'bg-white text-black font-semibold border border-white shadow-sm'
                            : 'bg-transparent border border-white/25 text-zinc-300 hover:text-white hover:border-white/50 font-normal'
                        }`}
                      >
                        {zone.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Train Movement Announcements -> Full-Width Via Route (Only ON for Arrival, Halting, Diverted) */}
              {selectedCategory === 'movement' && isViaRouteActive && (
                <div className="col-span-1 lg:col-span-2 w-full animate-fadeIn">
                  <div className="flex items-center justify-between mb-2 select-none font-sans">
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">
                        Via Route
                      </label>
                      {isDiverted && (
                        <span className="text-[10px] font-medium text-white px-2 py-0.5 rounded bg-zinc-900 border border-white/30 tracking-tight">
                          Diverted Route
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-sans font-medium text-zinc-500">
                      {activeViaStations.length} Stations
                    </span>
                  </div>

                  {/* Horizontal Scrollable Stations - Full Width across container */}
                  <div 
                    onWheel={(e) => {
                      if (e.deltaY !== 0) e.currentTarget.scrollLeft += e.deltaY;
                    }}
                    className="flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth h-11 w-full"
                  >
                    {activeViaStations.map((stn) => (
                      <div
                        key={stn}
                        className={`h-11 px-3.5 rounded-lg bg-transparent border text-xs font-sans shrink-0 flex items-center select-none transition-colors ${
                          isDiverted
                            ? 'border-white/35 text-white hover:border-white/60'
                            : 'border-white/20 hover:border-white/40 text-zinc-300'
                        }`}
                      >
                        <span className="text-white font-medium">{stn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Row 4: Coach Guidance Announcements -> Full-Width Train Coaches */}
              {selectedCategory === 'coach' && (
                <div className="col-span-1 lg:col-span-2 w-full">
                  <div className="flex items-center justify-between mb-2 select-none font-sans">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 font-sans">
                      Train Coaches (Rake Composition)
                    </label>
                    <span className="text-[11px] font-sans font-medium text-zinc-500">
                      {selectedTrain?.coaches?.length || 0} Coaches
                    </span>
                  </div>

                  {/* Horizontal Scrollable Coaches - Full Width across container */}
                  <div 
                    onWheel={(e) => {
                      if (e.deltaY !== 0) e.currentTarget.scrollLeft += e.deltaY;
                    }}
                    className="flex items-center gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth h-11 w-full"
                  >
                    {selectedTrain?.coaches?.map((coach, idx) => {
                      const isEngine = coach === 'ENG' || coach === 'DTC';
                      const isAC = coach.startsWith('A') || coach.startsWith('B') || coach.startsWith('H') || coach.startsWith('E') || coach.startsWith('C');

                      return (
                        <div
                          key={`${coach}-${idx}`}
                          className={`h-11 px-3.5 rounded-lg bg-transparent border text-xs font-sans shrink-0 flex items-center justify-center select-none transition-colors ${
                            isEngine
                              ? 'border-white/40 text-white font-semibold'
                              : isAC
                              ? 'border-white/25 text-zinc-200 font-medium hover:border-white/50'
                              : 'border-white/15 text-zinc-400 hover:border-white/35 font-normal'
                          }`}
                        >
                          {coach}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Action Bar: SaaS Level (Status Left, Primary Button Right) */}
            <div className="w-full mt-6 pt-5 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
              
              {/* Left: Audio System Status (Clean Curved Font, No Green Dot) */}
              <div className="flex items-center">
                <span className="text-sm sm:text-[15px] font-outfit text-zinc-300 font-medium tracking-wide">
                  {selectedStation.name.replace(' Junction', '')} P.A. Online
                </span>
              </div>

              {/* Right: Sharp High-Contrast Primary Button [ 🎙️ Start Announcement ] */}
              <button
                type="button"
                className="w-full sm:w-auto px-8 h-11 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs sm:text-[13px] font-sans tracking-tight transition-colors flex items-center justify-center gap-2 select-none cursor-pointer shadow-sm"
              >
                <svg className="w-3.5 h-3.5 text-black shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
                <span>Start Announcement</span>
              </button>

            </div>

          </div>
        ) : activeMode ? (
          <div className="w-full max-w-xl bg-black border border-zinc-800 rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <img
                src={
                  activeMode === 'road'
                    ? '/road_coach_bus.png'
                    : '/air_plane_cockpit.png'
                }
                alt="Active Mode Vehicle"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-sans text-zinc-300 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Dedicated {activeMode.toUpperCase()} Engine • Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {activeMode === 'road'
                ? 'Roadways Fleet Console'
                : 'Airways Terminal Console'}
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-md">
              Route: <span className="font-sans font-medium text-white">/console/{activeMode}</span> • Multi-lingual automated dispatch &amp; real-time passenger sync engine.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => onSelectMode ? onSelectMode(null) : null}
                className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs sm:text-[13px] font-medium text-white transition-colors cursor-pointer select-none"
              >
                ← Switch Mode
              </button>
            </div>
          </div>
        ) : (
          /* 3 Modes Selection Grid with Generous Middle Spacing */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 xl:gap-14 max-w-[1380px] w-full px-2">
            {modeData.map((item) => (
              <div
                key={item.id}
                className="group w-full bg-black border border-zinc-800 hover:border-zinc-700/80 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors"
              >
                <div>
                  {/* Top Row: Left-Edge Vehicle Icon & Vertically Centered Mode Label */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                    <div className="flex items-center">
                      <img 
                        src={item.icon} 
                        alt={item.alt} 
                        className="h-16 sm:h-20 w-auto object-contain brightness-100 select-none pointer-events-none group-hover:translate-x-1.5 transition-transform duration-300"
                      />
                    </div>

                    <span className="text-sm font-semibold tracking-wide text-zinc-400 font-sans select-none">
                      {item.modeNum}
                    </span>
                  </div>

                  {/* Mode Title & Core Purpose */}
                  <div className="mt-5">
                    <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-zinc-400 leading-relaxed mt-2 font-normal min-h-[40px]">
                      {item.purpose}
                    </p>
                  </div>

                  {/* Flat Solid Hairline Divider */}
                  <div className="w-full h-px bg-zinc-800/80 my-5" />

                  {/* Key Engine Specs (Clean Modern Typography) */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 font-sans select-none">
                      Key Engine Specs
                    </span>
                    <div className="flex flex-col gap-2 pt-0.5">
                      {item.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-[13px] font-medium text-zinc-300 font-sans tracking-tight"
                        >
                          <svg className="w-3.5 h-3.5 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Launch Action (Main Button) */}
                <button
                  type="button"
                  onClick={() => onSelectMode ? onSelectMode(item.id) : null}
                  className="w-full mt-7 py-3 px-4 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-[13px] tracking-tight transition-colors flex items-center justify-center gap-2 select-none cursor-pointer"
                >
                  <span>{item.btnText}</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}

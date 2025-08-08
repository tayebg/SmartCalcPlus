export interface VideoItem {
  title: string;
  url: string;
  type: 'playlist' | 'video' | 'channel' | 'website' | 'telegram';
  subject?: string;
}

export interface VideoSpecialization {
  id: string;
  name: string;
  description: string;
  videos: VideoItem[];
  color: string;
}

export const videoSpecializations: VideoSpecialization[] = [
  {
    id: 'L1',
    name: 'L1 - Première Année',
    description: 'Cours et tutoriels pour la première année',
    color: 'from-green-500 to-emerald-600',
    videos: [
      {
        title: 'Mathématiques - Playlist 1',
        url: 'https://youtube.com/playlist?list=PL3FwHB34wY1NczLrODKgy3tVQOEkeoU8D',
        type: 'playlist'
      },
      {
        title: 'Mathématiques - Playlist 2',
        url: 'https://youtube.com/playlist?list=PLLXxbxMwpPFmFvx9q-JEOs8vUbhb2eHLb',
        type: 'playlist'
      },
      {
        title: 'Algorithmique',
        url: 'https://youtube.com/playlist?list=PLUfAL3A5C7Tvcae1zgeOqFAO8WK2kS1Z4',
        type: 'playlist'
      },
      {
        title: 'Architecture - Playlist 1',
        url: 'https://www.youtube.com/playlist?list=PLZpzLuUp9qXzOgDakYP0UAGIBNk0pPdvZ',
        type: 'playlist'
      },
      {
        title: 'Architecture - Playlist 2',
        url: 'https://www.youtube.com/playlist?list=PLZpzLuUp9qXwrApSukhtvpi4U6l-INcTI',
        type: 'playlist'
      },
      {
        title: 'Programmation',
        url: 'https://www.youtube.com/playlist?list=PLUwv-LDWJDmsU9imgg16KB00PU0ozbAr-',
        type: 'playlist'
      },
      {
        title: 'Cours Généraux',
        url: 'https://youtube.com/playlist?list=PLXkV3hT6vW-IcQSVQCycVbEq_VS1_LRq6',
        type: 'playlist'
      },
      {
        title: 'Statistiques',
        url: 'https://www.youtube.com/playlist?list=PLaCO3rRZnI7UoDxIF0XMlZXVHT58Q57LR',
        type: 'playlist'
      }
    ]
  },
  {
    id: 'L2',
    name: 'L2 - Deuxième Année',
    description: 'Cours et tutoriels pour la deuxième année',
    color: 'from-blue-500 to-cyan-600',
    videos: [
      {
        title: 'POO - Générale',
        url: 'https://youtube.com/playlist?list=PLKV6WevXj-lU7FaGE7hnijGQmjtcFSWpk',
        type: 'playlist',
        subject: 'POO'
      },
      {
        title: 'Java Programming',
        url: 'https://youtube.com/playlist?list=PLCInYL3l2AajYlZGzU_LVrHdoouf8W6ZN',
        type: 'playlist',
        subject: 'POO'
      },
      {
        title: 'C# Programming',
        url: 'https://youtube.com/playlist?list=PLKV6WevXj-lUrK1bPvO5qL2ZjKl2PjOTG',
        type: 'playlist',
        subject: 'POO'
      },
      {
        title: 'POO Concepts',
        url: 'https://youtube.com/playlist?list=PLuXY3ddo_8nzUrgCyaX_WEIJljx_We-c1',
        type: 'playlist',
        subject: 'POO'
      },
      {
        title: 'Analyse Numérique',
        url: 'https://youtube.com/playlist?list=PLXHo2PMldglk7QytzdSLTuRCUE2F7f3yQ',
        type: 'playlist',
        subject: 'ANUM'
      },
      {
        title: 'Logique Mathématique',
        url: 'https://youtube.com/playlist?list=PLFN8GW4Q3m3-jLcZAga1rjDs8qaTH6QB9',
        type: 'playlist',
        subject: 'LM'
      },
      {
        title: 'Algorithmique Avancée - Série 1',
        url: 'https://youtube.com/playlist?list=PLCInYL3l2AajqOUW_2SwjWeMwf4vL4RSp',
        type: 'playlist',
        subject: 'ALGO'
      },
      {
        title: 'Algorithmique Avancée - Série 2',
        url: 'https://youtube.com/playlist?list=PLz8b0eOENotrnOvZt0305CYF627nFvxW7',
        type: 'playlist',
        subject: 'ALGO'
      },
      {
        title: 'Architecture - Cours 1',
        url: 'https://youtu.be/lkSd3U7GjvE',
        type: 'video',
        subject: 'ARCHI'
      },
      {
        title: 'Architecture - Cours 2',
        url: 'https://youtu.be/1CphPAqfKc8',
        type: 'video',
        subject: 'ARCHI'
      },
      {
        title: 'Systèmes d\'Information - Série 1',
        url: 'https://youtube.com/playlist?list=PLirv9XJLkgiVA4dibkwN8GuxERLhdWs93',
        type: 'playlist',
        subject: 'SI'
      },
      {
        title: 'Systèmes d\'Information - Série 2',
        url: 'https://youtube.com/playlist?list=PLnZB721E4l395Fekgz8fc7_vHjUumiQes',
        type: 'playlist',
        subject: 'SI'
      },
      {
        title: 'Systèmes d\'Information - Série 3',
        url: 'https://youtube.com/playlist?list=PLJe5vGB_oTirJ2w8Ey9mIptmgtFMnINKw',
        type: 'playlist',
        subject: 'SI'
      },
      {
        title: 'Théorie des Graphes - Cours',
        url: 'https://youtube.com/playlist?list=PLEUfg7A8gGzrAPJJjBR3DGylHXGogNA_l',
        type: 'playlist',
        subject: 'TG'
      },
      {
        title: 'Théorie des Graphes - Vidéo',
        url: 'https://youtu.be/89Hb7sjBIjk',
        type: 'video',
        subject: 'TG'
      },
      {
        title: 'Bases de Données - Cours Théorique',
        url: 'https://youtube.com/playlist?list=PLwnZV6J_uhj0_kxsBd4-IrWNxJECoy_Ha',
        type: 'playlist',
        subject: 'BD'
      },
      {
        title: 'Bases de Données - Concepts',
        url: 'https://youtube.com/playlist?list=PL1zcP88W0NZtSCFojm4sMohFc2QiA-O-i',
        type: 'playlist',
        subject: 'BD'
      },
      {
        title: 'SQL - Travaux Pratiques',
        url: 'https://youtube.com/playlist?list=PLt0HRIA9i35u3gO_8m8C-fhTEjPJQ7dr_',
        type: 'playlist',
        subject: 'BD'
      },
      {
        title: 'Réseaux - Cours Théorique',
        url: 'https://youtube.com/playlist?list=PLh330TDu4_HAye58MbG6Yto0MDEAd9Icp',
        type: 'playlist',
        subject: 'RÉSEAUX'
      },
      {
        title: 'Cisco - Travaux Pratiques',
        url: 'https://youtube.com/playlist?list=PLdtOYS9ml58Oij_qwpvrcBtPvvSOKeFRk',
        type: 'playlist',
        subject: 'RÉSEAUX'
      },
      {
        title: 'Systèmes d\'Exploitation',
        url: 'https://youtu.be/3EwlUKMaOS4',
        type: 'video',
        subject: 'SE'
      },
      {
        title: 'THL - Théorie des Langages',
        url: 'https://youtube.com/playlist?list=PLN8d-2cTVrvZL4Ax6NRGzlDZ45YJQkEC1',
        type: 'playlist',
        subject: 'THL'
      },
      {
        title: 'Réseaux - Cours Complémentaire',
        url: 'https://youtube.com/playlist?list=PLDUBCXV-C1hrYwKeG_7u5NlQK1HUcn7yH',
        type: 'playlist',
        subject: 'RÉSEAUX'
      },
      {
        title: 'Systèmes d\'Exploitation - Avancé',
        url: 'https://youtube.com/playlist?list=PLHKTPL-jkzUqgHIBdC2I16QqZCSDN_6oS',
        type: 'playlist',
        subject: 'SE'
      },
      {
        title: 'Base de Données - Algèbre Relationnelle',
        url: 'https://youtube.com/playlist?list=PL-b5Zp9H7qBheh2GuX6_iV7UJjjb3VGDr',
        type: 'playlist',
        subject: 'BD'
      },
      {
        title: 'THL - Exercices',
        url: 'https://youtube.com/playlist?list=PLqktoQpXXG5CRtjQ97z0z8cAMRfR7bbaM',
        type: 'playlist',
        subject: 'THL'
      },
      {
        title: 'THL - Travaux Dirigés',
        url: 'https://youtube.com/playlist?list=PLlnWZI5J2hBC4NPC8criiqgLuaSY6SpiZ',
        type: 'playlist',
        subject: 'THL'
      },
      {
        title: 'HTML - Développement Web',
        url: 'https://youtu.be/q3yFo-t1ykw',
        type: 'video',
        subject: 'DEV WEB'
      },
      {
        title: 'CSS - Développement Web',
        url: 'https://youtu.be/Z-5QVutAEW4',
        type: 'video',
        subject: 'DEV WEB'
      },
      {
        title: 'PHP - Développement Web',
        url: 'https://youtu.be/pszZMzI9a7A',
        type: 'video',
        subject: 'DEV WEB'
      },
      {
        title: 'JavaScript',
        url: 'https://youtube.com/playlist?list=PLDoPjvoNmBAw6p0z0Ek0OjPzeXoqlFlCh',
        type: 'playlist',
        subject: 'DEV WEB'
      },
      {
        title: 'POO - Java Avancé',
        url: 'https://youtube.com/playlist?list=PL1DUmTEdeA6K7rdxKiWJq6JIxTvHalY8f',
        type: 'playlist',
        subject: 'POO'
      },
      {
        title: 'POO - Concepts Avancés',
        url: 'https://youtube.com/playlist?list=PL1DUmTEdeA6Icttz-O9C3RPRF8R8Px5vk',
        type: 'playlist',
        subject: 'POO'
      }
    ]
  },
  {
    id: 'L3',
    name: 'L3 - Troisième Année',
    description: 'Cours et tutoriels pour la troisième année',
    color: 'from-purple-500 to-indigo-600',
    videos: [
      {
        title: 'Compilation - Cours Complet',
        url: 'https://youtube.com/playlist?list=PLj0nT8BxBd0ZjiGrloUa77veg14EqW85s',
        type: 'playlist'
      },
      {
        title: 'Intelligence Artificielle',
        url: 'https://youtube.com/playlist?list=PL4hYmILIgND4vdbJqJpVIjTic0FHNk-jt',
        type: 'playlist'
      },
      {
        title: 'Recherche Opérationnelle',
        url: 'https://youtube.com/playlist?list=PLq_F4mYhJIWqmIZ6EPOxgvW0G53i-Eazo',
        type: 'playlist'
      },
      {
        title: 'Génie Logiciel',
        url: 'https://youtube.com/playlist?list=PLiS1ejpMEwB5CsFKib_iS911_bbzHugcA',
        type: 'playlist'
      },
      {
        title: 'Sécurité Informatique',
        url: 'https://youtube.com/playlist?list=PL60rTvwmJG022aOyqyRS9hYmMI8g9ZCht',
        type: 'playlist'
      },
      {
        title: 'Systèmes Distribués',
        url: 'https://youtube.com/playlist?list=PLXsM8C1n7ImMvoqSJXKjH7QpnM8LYlLmy',
        type: 'playlist'
      },
      {
        title: 'Bases de Données Avancées',
        url: 'https://youtube.com/playlist?list=PLCB2plBhwI7e-CjJyzN_UTm9rWyN3ykVP',
        type: 'playlist'
      },
      {
        title: 'Architecture Logicielle',
        url: 'https://youtube.com/playlist?list=PLlaFpJcuzvllMcU6DLqNr-7s2HxeplpC3',
        type: 'playlist'
      },
      {
        title: 'Réseaux Avancés',
        url: 'https://youtube.com/playlist?list=PL60rTvwmJG01FV2Pqgn1Cw2esJ8oejAJV',
        type: 'playlist'
      },
      {
        title: 'Développement Mobile',
        url: 'https://youtube.com/playlist?list=PLpnxtvhKFSYcdmRkaW9rJhKAaGzZuSJw0',
        type: 'playlist'
      },
      {
        title: 'Web Services',
        url: 'https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl',
        type: 'playlist'
      },
      {
        title: 'Cloud Computing',
        url: 'https://youtube.com/playlist?list=PLS6wYe_OqRAPJ8bUHH3kq7UbPll5hLvR1',
        type: 'playlist'
      },
      {
        title: 'Machine Learning',
        url: 'https://youtube.com/playlist?list=PLCp87s2gFzMvGXMcVsw-LbLSK7bm-OOsO',
        type: 'playlist'
      },
      {
        title: 'Data Science',
        url: 'https://youtube.com/playlist?list=PL60rTvwmJG00AL2Af99zvFdi0WO8dWHys',
        type: 'playlist'
      },
      {
        title: 'UML - Modélisation',
        url: 'https://youtube.com/playlist?list=PLe_asaE0nbPbnuAztjQyN4Qth-2EIe0-m',
        type: 'playlist',
        subject: 'UML'
      },
      {
        title: 'UML - Diagrammes',
        url: 'https://youtube.com/playlist?list=PLSENmhglzJjRo7ziNTHkAq9YTezFxtYob',
        type: 'playlist',
        subject: 'UML'
      },
      {
        title: 'UML - Cas d\'Usage',
        url: 'https://youtube.com/playlist?list=PLQyCQ7CblbzFgIsYqB7wXQxrqcWyylFxc',
        type: 'playlist',
        subject: 'UML'
      },
      {
        title: 'UML - Conception',
        url: 'https://youtube.com/playlist?list=PL9czQr4kJeMVVLLRzWP_bQ3wtoXUdR_UG',
        type: 'playlist',
        subject: 'UML'
      },
      {
        title: 'UML - Patterns',
        url: 'https://youtube.com/playlist?list=PLiYyv-5mWgyjIVuXggDMv__SjDlFWu0Tj',
        type: 'playlist',
        subject: 'UML'
      },
      {
        title: 'UML - Avancé',
        url: 'https://youtube.com/playlist?list=PLBWD3LpmoU7EE-I3f_AHM6BW9s6Qwj4jc',
        type: 'playlist',
        subject: 'UML'
      },
      {
        title: 'UML - Méthodologie',
        url: 'https://youtube.com/playlist?list=PLNYRJqr01g92E33uWM293GO__cvECuiGr',
        type: 'playlist',
        subject: 'UML'
      },
      {
        title: 'UML - Pratique',
        url: 'https://youtube.com/playlist?list=PLYxEHINSaRSjaCv5EMh72i0JrDSe0X5oL',
        type: 'playlist',
        subject: 'UML'
      },
      {
        title: 'Frameworks Web',
        url: 'https://youtube.com/playlist?list=PLwHR0KRrbCd4i_1ejS_4S93Af04vv68UG',
        type: 'playlist'
      },
      {
        title: 'Tests Logiciels',
        url: 'https://youtube.com/playlist?list=PL6kS__I97mDwB0TlT-vd4qOaVFYoGGymZ',
        type: 'playlist'
      },
      {
        title: 'DevOps',
        url: 'https://youtube.com/playlist?list=PLBBIn272C110FddhP-UZJTVbPbhcQocoP',
        type: 'playlist'
      },
      {
        title: 'Microservices',
        url: 'https://youtube.com/playlist?list=PLiYyv-5mWgyjfrwAtseWHAVWeFYOBkn9R',
        type: 'playlist'
      },
      {
        title: 'Travaux Pratiques Avancés',
        url: 'https://youtube.com/playlist?list=PLEf5-yZk3HXS8lyW4yUldI8y-anH4o-46',
        type: 'playlist'
      }
    ]
  },
  {
    id: 'Profiles',
    name: 'Chaînes Recommandées',
    description: 'Chaînes YouTube éducatives recommandées',
    color: 'from-indigo-500 to-purple-600',
    videos: [
      {
        title: 'EL OUARDI Mohamed',
        url: 'https://www.youtube.com/@ELOUARDIMohamed',
        type: 'channel'
      },
      {
        title: 'MC Emeftah',
        url: 'https://www.youtube.com/@mcemeftah',
        type: 'channel'
      },
      {
        title: 'CS Plus',
        url: 'https://www.youtube.com/@csplus',
        type: 'channel'
      },
      {
        title: 'Mahseur',
        url: 'https://www.youtube.com/@Mahseur',
        type: 'channel'
      },
      {
        title: 'AYMEN DEV',
        url: 'https://www.youtube.com/@AYMENDEV',
        type: 'channel'
      },
      {
        title: 'U-Math',
        url: 'https://www.youtube.com/@umath',
        type: 'channel'
      },
      {
        title: 'Asma KF',
        url: 'https://www.youtube.com/@asmakf',
        type: 'channel'
      },
      {
        title: '15 Min Math',
        url: 'https://www.youtube.com/@15MinMathLr',
        type: 'channel'
      },
      {
        title: 'Mam Masse Amine',
        url: 'https://youtube.com/@mammasseamine',
        type: 'channel'
      },
      {
        title: 'Amine Abbaoui',
        url: 'https://youtube.com/@AMINEABBAOUI',
        type: 'channel'
      },
      {
        title: 'Elzero Web School',
        url: 'https://youtube.com/c/ElzeroInfo',
        type: 'channel'
      }
    ]
  },
  {
    id: 'Other',
    name: '🎓 Autres Ressources',
    description: 'Sites web, Telegram et autres ressources utiles',
    color: 'from-orange-500 to-yellow-600',
    videos: [
      {
        title: 'Physique Chimie Math Biologie',
        url: 'https://www.physiquechimiemathbiologie.com/?m=1',
        type: 'website',
        subject: 'Sciences'
      },
      {
        title: 'Trésor CSE Club',
        url: 'https://tresor.cse.club/',
        type: 'website', 
        subject: 'Ressources'
      },
      {
        title: 'L3 ISIL/SI Telegram',
        url: 'https://t.me/l3isil_si',
        type: 'telegram',
        subject: 'L3'
      },
      {
        title: 'L1 Informatique Telegram',
        url: 'https://t.me/l1informatique', 
        type: 'telegram',
        subject: 'L1'
      },
      {
        title: 'L2 Informatique Telegram',
        url: 'https://t.me/l2informatique',
        type: 'telegram',
        subject: 'L2'
      },
      {
        title: 'Master 1 Info Telegram',
        url: 'https://t.me/master1info',
        type: 'telegram',
        subject: 'M1'
      }
    ]
  }
];

export const videoLevels = ['All', 'L1', 'L2', 'L3', 'M1', 'M2', 'Other'];
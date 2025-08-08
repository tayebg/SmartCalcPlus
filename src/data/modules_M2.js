// M2 Module Data (IA, SID, RSID)
export const modulesDataM2 = {
  IA: {
    3: [ // Semestre 3
      {
        ue: "UF131",
        type: "UE Fondamentales",
        credit: 8,
        coeff: 8,
        modules: [
          {
            code: "AMRV",
            name: "Applications multimédias et Réalité virtuelle",
            coeff: 2,
            credit: 4,
            has_td: true,
            has_tp: true,
            has_cc: true,
            has_exam: true
          },
          {
            code: "CM",
            name: "Communication Multimédia",
            coeff: 2,
            credit: 4,
            has_td: true,
            has_tp: false,
            has_cc: true,
            has_exam: true
          }
        ]
      },
      {
        ue: "UF132",
        type: "UE Fondamentales",
        credit: 10,
        coeff: 10,
        modules: [
          {
            code: "BI",
            name: "Bio-informatique",
            coeff: 3,
            credit: 6,
            has_td: true,
            has_tp: true,
            has_cc: true,
            has_exam: true
          },
          {
            code: "CAMA",
            name: "Conception d'applications multimédia animées",
            coeff: 2,
            credit: 4,
            has_td: true,
            has_tp: false,
            has_cc: true,
            has_exam: true
          }
        ]
      },
      {
        ue: "UM131",
        type: "UE Méthodologie",
        credit: 9,
        coeff: 9,
        modules: [
          {
            code: "IMed",
            name: "Imagerie médicale",
            coeff: 3,
            credit: 5,
            has_td: true,
            has_tp: true,
            has_cc: true,
            has_exam: true
          },
          {
            code: "ISat",
            name: "Imagerie Satellitaires",
            coeff: 2,
            credit: 4,
            has_td: false,
            has_tp: true,
            has_cc: true,
            has_exam: true
          }
        ]
      },
      {
        ue: "UD131",
        type: "UE Découverte",
        credit: 1,
        coeff: 1,
        modules: [
          {
            code: "MP",
            name: "Management des Projets",
            coeff: 1,
            credit: 1,
            has_td: false,
            has_tp: false,
            has_cc: false,
            has_exam: true
          }
        ]
      },
      {
        ue: "UT131",
        type: "UE Transversales",
        credit: 2,
        coeff: 2,
        modules: [
          {
            code: "PeL",
            name: "Plate-formes e-learning",
            coeff: 2,
            credit: 2,
            has_td: false,
            has_tp: true,
            has_cc: true,
            has_exam: true
          }
        ]
      }
    ],
    4: [ // Semestre 4 (PFE)
      {
        ue: "PFE",
        type: "Projet de Fin d'Études",
        credit: 30,
        coeff: 30,
        modules: [
          {
            code: "PFE",
            name: "Projet de Fin d'Études",
            coeff: 30,
            credit: 30,
            has_td: false,
            has_tp: false,
            has_cc: false,
            has_exam: true
          }
        ]
      }
    ]
  },
  SID: {
    3: [ // Semestre 3 — SID
      {
        ue: "UF331",
        type: "UE Fondamentales",
        credit: 8,
        coeff: 8,
        modules: [
          {
            code: "FDMS",
            name: "Fouille de Données et Média Sociaux",
            coeff: 2,
            credit: 4,
            has_td: false,
            has_tp: true,
            has_cc: true,
            has_exam: true
          },
          {
            code: "OWS",
            name: "Ontologie et Web Services",
            coeff: 2,
            credit: 4,
            has_td: true,
            has_tp: false,
            has_cc: true,
            has_exam: true
          }
        ]
      },
      {
        ue: "UF332",
        type: "UE Fondamentales",
        credit: 10,
        coeff: 10,
        modules: [
          {
            code: "BDSM",
            name: "Big Data et Systèmes Multi échelles",
            coeff: 3,
            credit: 6,
            has_td: true,
            has_tp: true,
            has_cc: true,
            has_exam: true
          },
          {
            code: "SIS",
            name: "Systèmes d'Information Spatiale",
            coeff: 2,
            credit: 4,
            has_td: false,
            has_tp: true,
            has_cc: true,
            has_exam: true
          }
        ]
      },
      {
        ue: "UM331",
        type: "UE Méthodologie",
        credit: 9,
        coeff: 9,
        modules: [
          {
            code: "IRDM",
            name: "Indexation et recherche de données multimédia",
            coeff: 3,
            credit: 5,
            has_td: true,
            has_tp: true,
            has_cc: true,
            has_exam: true
          },
          {
            code: "DAWS",
            name: "Développement avec l'Approche Web Services",
            coeff: 2,
            credit: 4,
            has_td: false,
            has_tp: true,
            has_cc: true,
            has_exam: true
          }
        ]
      },
      {
        ue: "UD331",
        type: "UE Découverte",
        credit: 1,
        coeff: 1,
        modules: [
          {
            code: "MP",
            name: "Management des Projets",
            coeff: 1,
            credit: 1,
            has_td: false,
            has_tp: false,
            has_cc: false,
            has_exam: true
          }
        ]
      },
      {
        ue: "UT331",
        type: "UE Transversales",
        credit: 2,
        coeff: 2,
        modules: [
          {
            code: "PEW",
            name: "Processus d'Entreprise et Work-Flow",
            coeff: 2,
            credit: 2,
            has_td: true,
            has_tp: false,
            has_cc: true,
            has_exam: true
          }
        ]
      }
    ],
    4: [ // Semestre 4 — PFE
      {
        ue: "PFE",
        type: "Projet de Fin d'Études",
        credit: 30,
        coeff: 30,
        modules: [
          {
            code: "PFE",
            name: "Projet de Fin d'Études",
            coeff: 30,
            credit: 30,
            has_td: false,
            has_tp: false,
            has_cc: false,
            has_exam: true
          }
        ]
      }
    ]
  },
  RSID: {
    3: [ // Semestre 3 — RSID
      {
        ue: "UF231",
        type: "UE Fondamentales",
        credit: 10,
        coeff: 10,
        modules: [
          {
            code: "SFS",
            name: "Sureté de Fonctionnement de Systèmes",
            coeff: 2,
            credit: 4,
            has_td: true,
            has_tp: false,
            has_cc: true,
            has_exam: true
          },
          {
            code: "PQCM",
            name: "Protocoles et QoS communication multimédia",
            coeff: 2,
            credit: 4,
            has_td: false,
            has_tp: true,
            has_cc: true,
            has_exam: true
          },
          {
            code: "CM",
            name: "Communication multimédia",
            coeff: 1,
            credit: 2,
            has_td: false,
            has_tp: false,
            has_cc: false,
            has_exam: true
          }
        ]
      },
      {
        ue: "UF232",
        type: "UE Fondamentales",
        credit: 8,
        coeff: 8,
        modules: [
          {
            code: "MFSD",
            name: "Modèles Formels des Systèmes Distribués",
            coeff: 2,
            credit: 4,
            has_td: true,
            has_tp: false,
            has_cc: true,
            has_exam: true
          },
          {
            code: "ASTR",
            name: "Architecture et Système Temps Réel",
            coeff: 2,
            credit: 4,
            has_td: true,
            has_tp: false,
            has_cc: true,
            has_exam: true
          }
        ]
      },
      {
        ue: "UM231",
        type: "UE Méthodologie",
        credit: 9,
        coeff: 9,
        modules: [
          {
            code: "CC",
            name: "Cloud Computing",
            coeff: 2,
            credit: 4,
            has_td: false,
            has_tp: true,
            has_cc: true,
            has_exam: true
          },
          {
            code: "SRA",
            name: "Systèmes Répartis Avancés",
            coeff: 3,
            credit: 5,
            has_td: true,
            has_tp: true,
            has_cc: true,
            has_exam: true
          }
        ]
      },
      {
        ue: "UD231",
        type: "UE Découverte",
        credit: 1,
        coeff: 1,
        modules: [
          {
            code: "MP",
            name: "Management des Projets",
            coeff: 1,
            credit: 1,
            has_td: false,
            has_tp: false,
            has_cc: false,
            has_exam: true
          }
        ]
      },
      {
        ue: "UT231",
        type: "UE Transversales",
        credit: 2,
        coeff: 2,
        modules: [
          {
            code: "RA",
            name: "Réseaux avancés",
            coeff: 2,
            credit: 2,
            has_td: true,
            has_tp: false,
            has_cc: true,
            has_exam: true
          }
        ]
      }
    ],
    4: [ // Semestre 4 — PFE
      {
        ue: "PFE",
        type: "Projet de Fin d'Études",
        credit: 30,
        coeff: 30,
        modules: [
          {
            code: "PFE",
            name: "Projet de Fin d'Études",
            coeff: 30,
            credit: 30,
            has_td: false,
            has_tp: false,
            has_cc: false,
            has_exam: true
          }
        ]
      }
    ]
  }
};
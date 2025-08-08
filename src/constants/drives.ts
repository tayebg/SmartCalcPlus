export interface DriveSpecialization {
  id: string;
  name: string;
  description: string;
  driveUrl: string;
  color: string;
}

export const specializations: DriveSpecialization[] = [
  {
    id: 'L1',
    name: 'L1 Drive',
    description: 'First year resources and materials',
    driveUrl: '#',
    color: 'from-green-500 to-blue-600'
  },
  {
    id: 'L2',
    name: 'L2 Drive',
    description: 'Second year resources and materials',
    driveUrl: 'https://drive.google.com/drive/folders/1JWrf2F6EmkK-ikHmh8j7LwalJjQvnnGq',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'L3-ISIL',
    name: 'L3 ISIL Drive',
    description: 'Third year ISIL specialization resources',
    driveUrl: 'https://drive.google.com/drive/folders/17hLI7uA20z-VG-Mi8AEf7ThiC4pQV8cn',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'L3-SI',
    name: 'L3 SI Drive',
    description: 'Third year SI specialization resources',
    driveUrl: 'https://drive.google.com/drive/folders/17hLI7uA20z-VG-Mi8AEf7ThiC4pQV8cn',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'M1-IA',
    name: 'M1 IA Drive',
    description: 'Master 1 IA specialization resources',
    driveUrl: 'https://drive.google.com/drive/folders/1JnoF40CCfYDY2P7wjazlXoZk6FHKnaDr',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'M1-RSID',
    name: 'M1 RSID Drive',
    description: 'Master 1 RSID specialization resources',
    driveUrl: 'https://drive.google.com/drive/folders/1JnoF40CCfYDY2P7wjazlXoZk6FHKnaDr',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'M1-SID',
    name: 'M1 SID Drive',
    description: 'Master 1 SID specialization resources',
    driveUrl: 'https://drive.google.com/drive/folders/1JnoF40CCfYDY2P7wjazlXoZk6FHKnaDr',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'M2-IA',
    name: 'M2 IA Drive',
    description: 'Master 2 IA specialization resources',
    driveUrl: '#',
    color: 'from-indigo-500 to-violet-600'
  },
  {
    id: 'M2-SID',
    name: 'M2 SID Drive',
    description: 'Master 2 SID specialization resources',
    driveUrl: '#',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'M2-RSID',
    name: 'M2 RSID Drive',
    description: 'Master 2 RSID specialization resources',
    driveUrl: '#',
    color: 'from-emerald-500 to-teal-600'
  }
];

export const levels = ['All', 'L1', 'L2', 'L3', 'M1', 'M2'];

// Extended, modular drives catalog (future-ready)
export interface DriveEntry {
  id: string;           // slug, e.g., 'l1-usto'
  name: string;         // display name, e.g., 'L1 – USTO'
  level: 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
  university: string;   // e.g., 'USTO', 'ENSA'
  description: string;
  driveUrl: string;     // Google Drive folder URL or external resource
  color: string;        // tailwind gradient classes
}

export const driveEntries: DriveEntry[] = [
  {
    id: 'l1-usto',
    name: 'L1 – USTO',
    level: 'L1',
    university: 'USTO',
    description: 'First year resources for USTO students',
    driveUrl: '#',
    color: 'from-green-500 to-blue-600'
  }
];

// New modular drives structure (future-ready)
export interface DriveItem {
  title: string;
  url: string; // Google Drive folder URL or empty for coming soon
  field: string; // Specialization/discipline
  level: string; // Academic level/specialty label used for filtering
}

export interface DriveSection {
  year: 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
  items: DriveItem[];
}

export const drives: DriveSection[] = [
  {
    year: 'L1',
    items: [
      {
        title: 'L1 - USTO',
        url: '', // placeholder, will add later
        field: 'Informatique',
        level: 'L1'
      },
      {
        title: 'L1 - ENSA',
        url: '',
        field: 'Biologie',
        level: 'L1'
      }
    ]
  },
  {
    year: 'L2',
    items: [
      {
        title: 'L2 - USTO',
        url: 'https://drive.google.com/drive/folders/1JWrf2F6EmkK-ikHmh8j7LwalJjQvnnGq',
        field: 'Mathématiques',
        level: 'L2'
      }
    ]
  },
  {
    year: 'L3',
    items: [
      {
        title: 'L3 ISIL - USTO',
        url: 'https://drive.google.com/drive/folders/17hLI7uA20z-VG-Mi8AEf7ThiC4pQV8cn',
        field: 'Informatique',
        level: 'L3 ISIL'
      },
      {
        title: 'L3 SI - USTO',
        url: 'https://drive.google.com/drive/folders/17hLI7uA20z-VG-Mi8AEf7ThiC4pQV8cn',
        field: 'Informatique',
        level: 'L3 SI'
      }
    ]
  },
  {
    year: 'M1',
    items: [
      {
        title: 'M1 IA - USTO',
        url: 'https://drive.google.com/drive/folders/1JnoF40CCfYDY2P7wjazlXoZk6FHKnaDr',
        field: 'Informatique',
        level: 'M1 IA'
      },
      {
        title: 'M1 RSID - USTO',
        url: 'https://drive.google.com/drive/folders/1JnoF40CCfYDY2P7wjazlXoZk6FHKnaDr',
        field: 'Informatique',
        level: 'M1 RSI'
      },
      {
        title: 'M1 SID - USTO',
        url: 'https://drive.google.com/drive/folders/1JnoF40CCfYDY2P7wjazlXoZk6FHKnaDr',
        field: 'Informatique',
        level: 'M1 SID'
      }
    ]
  },
  {
    year: 'M2',
    items: [
      {
        title: 'M2 - ENSA',
        url: '',
        field: 'Génie Civil',
        level: 'M2'
      }
    ]
  }
];
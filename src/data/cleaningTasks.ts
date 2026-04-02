export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKLY_TASKS = [
  'Vacuum all floors & rugs',
  'Mop hard floors',
  'Wipe kitchen counters & stovetop',
  'Clean kitchen sink',
  'Wipe bathroom sinks & counters',
  'Scrub toilets',
  'Wipe bathroom mirrors',
  'Take out all trash & recycling',
  'Wipe down dining table & chairs',
  'Tidy common areas / clutter reset',
  'Change kitchen towels & dishcloths',
];

export interface MonthlyZone {
  label: string;
  emoji: string;
  tasks: string[];
}

export const MONTHLY_ZONES: MonthlyZone[] = [
  {
    label: 'Kitchen',
    emoji: '🍳',
    tasks: [
      'Clean inside microwave',
      'Degrease range hood filter',
      'Wipe cabinet fronts & handles',
      'Clean inside oven (spot clean)',
      'Wipe down all appliance exteriors',
      'Clean garbage disposal (ice + citrus)',
      'Disinfect trash can inside & out',
      'Wipe baseboards in kitchen',
    ],
  },
  {
    label: 'Bathrooms',
    emoji: '🛁',
    tasks: [
      'Scrub tile grout & tub/shower walls',
      'Descale showerhead (vinegar soak)',
      'Clean toilet base & behind toilet',
      'Wash shower curtain/liner',
      'Wipe down light switches & outlet covers',
      'Clean exhaust fan cover',
      'Wash bath mats',
      'Wipe baseboards in bathrooms',
    ],
  },
  {
    label: 'Whole Home',
    emoji: '🏠',
    tasks: [
      'Dust ceiling fans & light fixtures',
      'Wipe down all door handles & light switches',
      'Clean window sills & tracks',
      'Dust all blinds or window coverings',
      'Wipe down stair banister & handrails',
      'Vacuum upholstered furniture',
      'Dust all shelves & decor',
      'Wipe baseboards in living areas',
      'Clean inside refrigerator shelves',
      'Run dishwasher cleaning cycle',
      'Check & clean basement dehumidifier',
    ],
  },
];

export interface DeepCleanInfo {
  label: string;
  note: string;
}

export const DEEP_CLEAN_MONTHS: Record<number, DeepCleanInfo> = {
  1: {
    label: 'Q1 Deep Clean',
    note: 'Schedule a professional cleaner for January. Focus: inside cabinets, behind appliances, grout, window tracks, light fixtures.',
  },
  4: {
    label: 'Q2 Deep Clean',
    note: 'Spring reset. Focus: windows inside and out, behind furniture, walls, ceiling fans, blinds, thorough bathroom scrub.',
  },
  7: {
    label: 'Q3 Deep Clean',
    note: 'Mid-year. Focus: bathrooms including grout, inside oven, inside dishwasher, windows, finished basement surfaces.',
  },
  10: {
    label: 'Q4 Deep Clean',
    note: 'Before winter button-up. Focus: carpets, behind furniture, furnace room, basement, inside all closets, vents.',
  },
};

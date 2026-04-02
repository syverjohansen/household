export type Category = 'hvac' | 'clean' | 'outdoor' | 'safety' | 'struct' | 'deep' | 'admin';

export interface Task {
  id: string;
  text: string;
  note?: string;
  categories: Category[];
}

export interface TaskGroup {
  label: string;
  tasks: Task[];
}

export interface DeepCleanBanner {
  title: string;
  body: string;
}

export interface Month {
  number: number;
  name: string;
  tagline: string;
  taskCount: number;
  deepClean?: DeepCleanBanner;
  groups: TaskGroup[];
}

export interface Season {
  name: string;
  icon: string;
  range: string;
  iconClass: string;
  months: number[];
}

export const SEASONS: Season[] = [
  { name: 'Winter', icon: '❄️', range: 'December → February', iconClass: 'winter', months: [12, 1, 2] },
  { name: 'Spring', icon: '🌱', range: 'March → May', iconClass: 'spring', months: [3, 4, 5] },
  { name: 'Summer', icon: '☀️', range: 'June → August', iconClass: 'summer', months: [6, 7, 8] },
  { name: 'Fall', icon: '🍂', range: 'September → November', iconClass: 'fall', months: [9, 10, 11] },
];

export const CATEGORY_CONFIG: Record<Category, { label: string; emoji: string }> = {
  hvac: { label: 'HVAC', emoji: '🌡' },
  clean: { label: 'Cleaning', emoji: '🧹' },
  outdoor: { label: 'Outdoor', emoji: '🌿' },
  safety: { label: 'Safety', emoji: '🔒' },
  struct: { label: 'Structural', emoji: '🔧' },
  deep: { label: 'Deep Clean', emoji: '🫧' },
  admin: { label: 'Admin', emoji: '📋' },
};

export const MONTHS: Month[] = [
  // JANUARY
  {
    number: 1,
    name: 'January',
    tagline: 'Hunker down & inspect',
    taskCount: 13,
    deepClean: {
      title: 'Q1 Professional Deep Clean — Schedule for January',
      body: 'Hire a cleaning service for a full-home deep clean: inside cabinets, behind appliances, baseboards, grout, window tracks, light fixtures. Budget $250–$450 depending on scope.',
    },
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm1-hvac-1', text: 'Replace furnace filter (1-inch: every 1–3 months; 4-inch: every 6 months)', note: "DC winters are cold — don't skip this. Mark the date on the new filter with a Sharpie.", categories: ['hvac'] },
          { id: 'm1-hvac-2', text: 'Test furnace operation — listen for bangs, rattles, or short cycling', categories: ['hvac'] },
          { id: 'm1-hvac-3', text: 'Clear 2-ft clearance around all supply/return vents and radiators', categories: ['hvac'] },
        ],
      },
      {
        label: 'Safety',
        tasks: [
          { id: 'm1-safety-1', text: 'Test all smoke and CO detectors (press test button, replace batteries if needed)', note: 'DC law requires CO detectors on every level including basement.', categories: ['safety'] },
          { id: 'm1-safety-2', text: 'Check fire extinguisher pressure gauge — green zone required', categories: ['safety'] },
        ],
      },
      {
        label: 'Structural / Interior',
        tasks: [
          { id: 'm1-struct-1', text: 'Walk basement perimeter after heavy rain — look for moisture, efflorescence, or cracks', note: 'Finished basement = water damage can be hidden. Check walls behind furniture.', categories: ['struct'] },
          { id: 'm1-struct-2', text: 'Inspect weatherstripping on all exterior doors and windows for cold drafts', categories: ['struct'] },
          { id: 'm1-struct-3', text: 'Check attic/top floor for ice dams or condensation after freezing weather', categories: ['struct'] },
        ],
      },
      {
        label: 'Cleaning',
        tasks: [
          { id: 'm1-clean-1', text: 'Clean kitchen range hood filter (soak in degreaser)', categories: ['clean'] },
          { id: 'm1-clean-2', text: 'Clean bathroom exhaust fans (remove cover, vacuum/wipe)', categories: ['clean'] },
          { id: 'm1-clean-3', text: 'Wipe down basement dehumidifier coils and empty/clean reservoir', categories: ['clean'] },
        ],
      },
      {
        label: 'Admin',
        tasks: [
          { id: 'm1-admin-1', text: "Review homeowner's insurance policy — confirm replacement cost coverage is up to date", categories: ['admin'] },
          { id: 'm1-admin-2', text: 'Create/update home inventory document with photos (for insurance)', categories: ['admin'] },
        ],
      },
    ],
  },

  // FEBRUARY
  {
    number: 2,
    name: 'February',
    tagline: 'Pipes & prep — last stretch of cold',
    taskCount: 10,
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm2-hvac-1', text: 'Replace furnace filter if using 1-inch filters (or check condition)', categories: ['hvac'] },
          { id: 'm2-hvac-2', text: 'Schedule HVAC professional tune-up for spring (book now — April slots fill fast)', note: 'Annual service agreement recommended: covers A/C check before summer heat.', categories: ['hvac'] },
        ],
      },
      {
        label: 'Structural / Plumbing',
        tasks: [
          { id: 'm2-struct-1', text: 'Know where your main water shutoff is — tag it if not labeled', categories: ['struct'] },
          { id: 'm2-struct-2', text: 'Inspect under sinks for slow drips or moisture', categories: ['struct'] },
          { id: 'm2-struct-3', text: 'Check water heater anode rod (if 3+ years old, consider replacing)', categories: ['struct'] },
        ],
      },
      {
        label: 'Outdoor / Driveway',
        tasks: [
          { id: 'm2-outdoor-1', text: 'Inspect concrete driveway for new cracks caused by freeze-thaw cycles', note: 'Fill hairline cracks with concrete caulk before they widen in spring.', categories: ['outdoor', 'struct'] },
          { id: 'm2-outdoor-2', text: 'Sweep salt/sand residue off driveway and front walk (salt damages concrete long-term)', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Cleaning',
        tasks: [
          { id: 'm2-clean-1', text: 'Clean dryer vent duct from dryer to outside exhaust (lint buildup = fire risk)', note: 'Use a dryer vent brush kit or hire a pro (~$80–$120).', categories: ['clean', 'safety'] },
          { id: 'm2-clean-2', text: 'Deep clean refrigerator: vacuum condenser coils, wipe door seals', categories: ['clean'] },
          { id: 'm2-clean-3', text: 'Run washing machine cleaning cycle (Affresh tablet or hot + vinegar)', categories: ['clean'] },
        ],
      },
    ],
  },

  // MARCH
  {
    number: 3,
    name: 'March',
    tagline: 'Thaw & wake up the house',
    taskCount: 12,
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm3-hvac-1', text: 'Replace furnace filter (last change before switching to A/C season)', categories: ['hvac'] },
          { id: 'm3-hvac-2', text: 'Complete HVAC professional tune-up — A/C coils, refrigerant, capacitors, blower', categories: ['hvac'] },
          { id: 'm3-hvac-3', text: 'Clean supply and return vent covers (remove & wash in sink)', categories: ['hvac', 'clean'] },
        ],
      },
      {
        label: 'Outdoor — Post-Winter Inspection',
        tasks: [
          { id: 'm3-outdoor-1', text: 'Walk full exterior: inspect brick/mortar, caulk around windows, check roof edge from ground', note: 'DC rowhouses — check the party wall seams especially.', categories: ['struct', 'outdoor'] },
          { id: 'm3-outdoor-2', text: 'Inspect deck boards and railings for winter damage — look for splits, rot, loose screws', categories: ['outdoor', 'struct'] },
          { id: 'm3-outdoor-3', text: 'Inspect front porch steps and slate entry for cracks or heaving', categories: ['struct'] },
          { id: 'm3-outdoor-4', text: 'Reconnect outdoor hose bibs — slowly, check for leaks from freeze damage', categories: ['struct'] },
        ],
      },
      {
        label: 'Yard (from your garden plan)',
        tasks: [
          { id: 'm3-yard-1', text: 'Apply pre-emergent crabgrass preventer (soil temp 50–55°F — check mid-March)', note: 'Most critical lawn task of the year for DC. Use Scotts Halts or Preen.', categories: ['outdoor'] },
          { id: 'm3-yard-2', text: 'Rake and dethatch lawn — remove matted winter debris', categories: ['outdoor'] },
          { id: 'm3-yard-3', text: 'Clean up winter damage in garden beds; cut back dead ornamental grasses', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Gutters',
        tasks: [
          { id: 'm3-gutter-1', text: 'Clean gutters — remove winter leaf buildup, flush downspouts with hose', note: 'Check that downspouts extend 4+ ft away from foundation — critical for your basement.', categories: ['struct', 'outdoor'] },
        ],
      },
    ],
  },

  // APRIL
  {
    number: 4,
    name: 'April',
    tagline: 'Big outdoor push + deep clean',
    taskCount: 13,
    deepClean: {
      title: 'Q2 Professional Deep Clean — Schedule for April',
      body: 'Spring is the classic deep-clean season. Focus on: windows inside and out, behind furniture, walls, ceiling fans, blinds, and thorough bathroom scrub-downs.',
    },
    groups: [
      {
        label: 'Outdoor / Deck / Driveway',
        tasks: [
          { id: 'm4-outdoor-1', text: 'Power wash deck, front porch, and concrete driveway', note: 'Rent a pressure washer ($60–$80/day) or hire out. Deck: 1200–1500 PSI. Concrete: 2000–3000 PSI.', categories: ['outdoor'] },
          { id: 'm4-outdoor-2', text: 'Apply deck sealant or stain if wood looks dry/gray (every 2–3 years)', note: 'Let deck fully dry 48h after washing before applying.', categories: ['outdoor', 'struct'] },
          { id: 'm4-outdoor-3', text: 'Fill concrete driveway cracks identified in February', categories: ['struct'] },
          { id: 'm4-outdoor-4', text: 'Clean alley side of fence and back wall area (from your lot plan)', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Yard (from your garden plan)',
        tasks: [
          { id: 'm4-yard-1', text: 'Apply slow-release spring fertilizer to lawn (after pre-emergent has set, ~3 weeks)', categories: ['outdoor'] },
          { id: 'm4-yard-2', text: 'Begin mowing (1st cut) — set blade to 3–3.5 inches for tall fescue', categories: ['outdoor'] },
          { id: 'm4-yard-3', text: 'After April 15: plant basil starts and warm-season herbs on deck/south-facing area', categories: ['outdoor'] },
          { id: 'm4-yard-4', text: 'Edge garden beds; top up mulch 2–3 inch layer (DC free mulch available)', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Cleaning',
        tasks: [
          { id: 'm4-clean-1', text: 'Clean all ceiling fans — wipe blades (they collect a shocking amount of dust)', categories: ['clean'] },
          { id: 'm4-clean-2', text: 'Wash all window screens before opening windows for spring', categories: ['clean'] },
          { id: 'm4-clean-3', text: 'Flip or rotate mattresses', categories: ['clean'] },
        ],
      },
      {
        label: 'Safety',
        tasks: [
          { id: 'm4-safety-1', text: 'Test GFCI outlets in bathrooms, kitchen, basement, and exterior', note: 'Press TEST → outlet should lose power. Press RESET to restore. Replace if faulty.', categories: ['safety'] },
        ],
      },
    ],
  },

  // MAY
  {
    number: 5,
    name: 'May',
    tagline: 'Pre-summer systems check',
    taskCount: 9,
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm5-hvac-1', text: 'Run A/C for 10 minutes — confirm cool air, no unusual smells or sounds', categories: ['hvac'] },
          { id: 'm5-hvac-2', text: 'Check/clean condensate drain line (pour diluted bleach to prevent mold/clogs)', categories: ['hvac'] },
          { id: 'm5-hvac-3', text: 'Clear at least 2 ft of clearance around outdoor A/C condenser unit', categories: ['hvac'] },
        ],
      },
      {
        label: 'Outdoor / Yard',
        tasks: [
          { id: 'm5-outdoor-1', text: 'Establish weekly mowing routine — never cut more than 1/3 of blade height', categories: ['outdoor'] },
          { id: 'm5-outdoor-2', text: 'Plant native shade plants in fence planters (east/west sides per garden plan)', categories: ['outdoor'] },
          { id: 'm5-outdoor-3', text: 'Set up deck furniture / assess deck for any new issues post-wash', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Interior',
        tasks: [
          { id: 'm5-interior-1', text: 'Vacuum refrigerator coils (underneath or behind) — extends fridge life significantly', categories: ['clean'] },
          { id: 'm5-interior-2', text: 'Test basement sump pump (if you have one) — pour water in pit to trigger float', categories: ['struct', 'safety'] },
          { id: 'm5-interior-3', text: 'Replace furnace/air handler filter before full A/C season', categories: ['hvac'] },
        ],
      },
    ],
  },

  // JUNE
  {
    number: 6,
    name: 'June',
    tagline: 'Deep clean + A/C in full swing',
    taskCount: 10,
    deepClean: {
      title: 'Q3 Professional Deep Clean — Schedule for June or July',
      body: 'Mid-year reset. Focus areas: deep scrub of bathrooms including tile grout, inside oven, inside dishwasher, windows, and finished basement surfaces.',
    },
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm6-hvac-1', text: 'Replace A/C filter (MERV 8–11 recommended for DC pollen/dust)', categories: ['hvac'] },
          { id: 'm6-hvac-2', text: 'Monitor thermostat — confirm A/C reaches setpoint on first DC heat wave', categories: ['hvac'] },
        ],
      },
      {
        label: 'Outdoor / Yard',
        tasks: [
          { id: 'm6-outdoor-1', text: 'Raise mowing height to 3.5–4 inches in summer heat (prevents lawn stress)', categories: ['outdoor'] },
          { id: 'm6-outdoor-2', text: 'Water lawn deeply 1× per week (1 inch) rather than frequent light watering', categories: ['outdoor'] },
          { id: 'm6-outdoor-3', text: 'Inspect deck for sun-bleaching — note if sealant refresh will be needed next year', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Cleaning',
        tasks: [
          { id: 'm6-clean-1', text: 'Deep clean dishwasher: remove filter, clean spray arms, run empty with citric acid', categories: ['clean'] },
          { id: 'm6-clean-2', text: 'Clean garbage disposal: ice + salt + citrus peels', categories: ['clean'] },
          { id: 'm6-clean-3', text: 'Wipe down interior and exterior of all kitchen cabinets', categories: ['clean'] },
        ],
      },
      {
        label: 'Safety / Admin',
        tasks: [
          { id: 'm6-safety-1', text: 'Check smoke/CO detector batteries — replace if 6+ months old', categories: ['safety'] },
          { id: 'm6-admin-1', text: 'Review any home improvement projects completed — file permits and receipts', categories: ['admin'] },
        ],
      },
    ],
  },

  // JULY
  {
    number: 7,
    name: 'July',
    tagline: 'Peak heat — protect & maintain',
    taskCount: 7,
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm7-hvac-1', text: 'Replace A/C filter mid-summer (high pollen + AC running 24/7 = fast loading)', categories: ['hvac'] },
          { id: 'm7-hvac-2', text: "Check basement dehumidifier — empty often in DC's humid July; clean filter", categories: ['hvac'] },
        ],
      },
      {
        label: 'Outdoor / Yard',
        tasks: [
          { id: 'm7-outdoor-1', text: 'Let lawn go slightly dormant in extreme heat (skip mowing if grass stops growing)', note: "Don't stress a dormant lawn — it'll bounce back. No fertilizer in July.", categories: ['outdoor'] },
          { id: 'm7-outdoor-2', text: 'Water herbs and deck containers daily in July heat', categories: ['outdoor'] },
          { id: 'm7-outdoor-3', text: 'Order/buy grass seed now (better selection + cheaper before fall rush)', categories: ['outdoor', 'admin'] },
        ],
      },
      {
        label: 'Interior',
        tasks: [
          { id: 'm7-interior-1', text: 'Inspect basement walls during heavy summer rain events — look for new wet spots', categories: ['struct'] },
          { id: 'm7-interior-2', text: 'Clean range hood filter and run exhaust fans during cooking to manage humidity', categories: ['clean'] },
        ],
      },
    ],
  },

  // AUGUST
  {
    number: 8,
    name: 'August',
    tagline: 'Transition prep — start fall planning',
    taskCount: 8,
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm8-hvac-1', text: 'Schedule HVAC fall tune-up (heating side) for September — book early', categories: ['hvac'] },
        ],
      },
      {
        label: 'Outdoor',
        tasks: [
          { id: 'm8-outdoor-1', text: 'Inspect and touch up any deck boards that look especially worn after summer sun', categories: ['outdoor'] },
          { id: 'm8-outdoor-2', text: 'Begin reducing lawn watering as temps cool — prep for fall seeding', categories: ['outdoor'] },
          { id: 'm8-outdoor-3', text: 'Plan fall seeding and aerating schedule (target window: Sept 1–Oct 15 in DC)', note: 'Tall fescue is ideal for DC — both shade tolerant and traffic resistant.', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Cleaning / Interior',
        tasks: [
          { id: 'm8-clean-1', text: 'Wipe down all window sills (inside) — summer grime, pollen, and condensation build up', categories: ['clean'] },
          { id: 'm8-clean-2', text: 'Run washing machine cleaning cycle', categories: ['clean'] },
          { id: 'm8-clean-3', text: 'Replace water filter (under-sink or refrigerator) if 6+ months old', categories: ['struct'] },
        ],
      },
    ],
  },

  // SEPTEMBER
  {
    number: 9,
    name: 'September',
    tagline: 'Best lawn month of the year',
    taskCount: 12,
    groups: [
      {
        label: 'HVAC — Fall Transition',
        tasks: [
          { id: 'm9-hvac-1', text: 'Replace filter and complete furnace/heating tune-up', note: 'September is ideal — before you actually need heat.', categories: ['hvac'] },
          { id: 'm9-hvac-2', text: 'Clean A/C condenser with garden hose before covering for winter', categories: ['hvac'] },
        ],
      },
      {
        label: 'Lawn — Peak Season (from your garden plan)',
        tasks: [
          { id: 'm9-lawn-1', text: 'Core aerate lawn (rent from Home Depot ~$75–$100) — most important lawn task', note: 'Best time: after Labor Day, before temps drop below 60°F at night.', categories: ['outdoor'] },
          { id: 'm9-lawn-2', text: 'Overseed thin areas immediately after aerating with tall fescue blend', categories: ['outdoor'] },
          { id: 'm9-lawn-3', text: 'Apply starter fertilizer (high phosphorus) after seeding', categories: ['outdoor'] },
          { id: 'm9-lawn-4', text: 'Water new seed lightly 2× daily until germination (10–21 days)', categories: ['outdoor'] },
          { id: 'm9-lawn-5', text: 'Plant lavender and lemon balm starts along east side strip per garden plan', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Exterior Prep',
        tasks: [
          { id: 'm9-exterior-1', text: 'Caulk any exterior gaps or cracks before cold weather sets in', categories: ['struct'] },
          { id: 'm9-exterior-2', text: 'Clean gutters — heavy leaf fall coming; ensure downspouts are clear', categories: ['struct'] },
          { id: 'm9-exterior-3', text: 'Clean and store deck furniture cushions (mildew prevention)', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Cleaning',
        tasks: [
          { id: 'm9-clean-1', text: 'Deep clean dryer vent duct (semi-annual — lint fires peak in fall)', categories: ['clean', 'safety'] },
          { id: 'm9-clean-2', text: 'Wash and store all window screens before closing windows for fall', categories: ['clean'] },
        ],
      },
    ],
  },

  // OCTOBER
  {
    number: 10,
    name: 'October',
    tagline: 'Winter-proof the house',
    taskCount: 11,
    deepClean: {
      title: 'Q4 Professional Deep Clean — Schedule for October',
      body: 'Before you button up the house for winter. Focus: carpets/rugs, deep vacuuming behind furniture, furnace room, basement surfaces, inside all closets, and vents.',
    },
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm10-hvac-1', text: 'Replace furnace filter before heat season kicks in full force', categories: ['hvac'] },
          { id: 'm10-hvac-2', text: 'Cover outdoor A/C condenser (mesh cover — do NOT use solid cover)', note: 'Solid covers trap moisture and critters. Mesh breathes and keeps leaves out.', categories: ['hvac'] },
        ],
      },
      {
        label: 'Outdoor / Yard',
        tasks: [
          { id: 'm10-outdoor-1', text: 'Final lawn fertilization (winterizer — high potassium) after grass slows but is still green', categories: ['outdoor'] },
          { id: 'm10-outdoor-2', text: 'Mulch leaves into lawn with mower instead of raking (free fertilizer)', categories: ['outdoor'] },
          { id: 'm10-outdoor-3', text: 'Plant any spring bulbs now (daffodils, tulips) in garden beds', categories: ['outdoor'] },
          { id: 'm10-outdoor-4', text: 'Shut off and drain exterior hose bibs (prevents frozen/burst pipes)', categories: ['struct'] },
          { id: 'm10-outdoor-5', text: 'Drain and store garden hoses', categories: ['outdoor'] },
        ],
      },
      {
        label: 'Winterizing',
        tasks: [
          { id: 'm10-winter-1', text: 'Add door draft stoppers and check attic hatch insulation', categories: ['struct'] },
          { id: 'm10-winter-2', text: 'Stock emergency supplies: rock salt, ice melt, extra furnace filters, flashlights', categories: ['safety'] },
        ],
      },
      {
        label: 'Safety',
        tasks: [
          { id: 'm10-safety-1', text: 'Test smoke and CO detectors — change all batteries (Daylight Saving reminder)', categories: ['safety'] },
        ],
      },
    ],
  },

  // NOVEMBER
  {
    number: 11,
    name: 'November',
    tagline: 'Final outdoor tasks before cold',
    taskCount: 8,
    groups: [
      {
        label: 'Outdoor / Deck / Driveway',
        tasks: [
          { id: 'm11-outdoor-1', text: 'Give deck a final inspection before first freeze — tighten any loose boards or railings', categories: ['outdoor'] },
          { id: 'm11-outdoor-2', text: "Apply concrete driveway sealer if it hasn't been done this year (before hard freezes)", note: 'Sealing concrete dramatically extends its life — do every 2–3 years.', categories: ['outdoor', 'struct'] },
          { id: 'm11-outdoor-3', text: "Final leaf cleanup — don't leave a thick mat on lawn over winter", categories: ['outdoor'] },
          { id: 'm11-outdoor-4', text: 'Clean gutters one final time after trees drop remaining leaves', categories: ['struct'] },
        ],
      },
      {
        label: 'Interior',
        tasks: [
          { id: 'm11-interior-1', text: 'Replace furnace filter if using 1-inch size', categories: ['hvac'] },
          { id: 'm11-interior-2', text: 'Check basement humidity levels — target 30–50% in winter to prevent condensation', categories: ['struct'] },
          { id: 'm11-interior-3', text: 'Flush water heater sediment (attach hose to drain valve, drain 2 gallons)', categories: ['struct'] },
        ],
      },
      {
        label: 'Admin',
        tasks: [
          { id: 'm11-admin-1', text: 'Year-end review: file receipts for any capital improvements (helps with future taxes)', note: 'DC requires disclosure of improvements for property tax appeals. Keep records!', categories: ['admin'] },
        ],
      },
    ],
  },

  // DECEMBER
  {
    number: 12,
    name: 'December',
    tagline: 'Cozy up & plan next year',
    taskCount: 7,
    groups: [
      {
        label: 'HVAC',
        tasks: [
          { id: 'm12-hvac-1', text: 'Replace furnace filter — cold weather means furnace runs hard', categories: ['hvac'] },
          { id: 'm12-hvac-2', text: 'Set thermostat to 55°F minimum if traveling for the holidays', note: 'Never shut off heat completely in DC winter — pipes can freeze even in short absences.', categories: ['hvac', 'safety'] },
        ],
      },
      {
        label: 'Outdoor',
        tasks: [
          { id: 'm12-outdoor-1', text: 'Check concrete driveway and front walk after first freeze — note any new cracks', categories: ['outdoor'] },
          { id: 'm12-outdoor-2', text: 'Have ice melt/salt and shovel accessible — DC can get surprise snow', categories: ['safety'] },
        ],
      },
      {
        label: 'Cleaning',
        tasks: [
          { id: 'm12-clean-1', text: 'Clean range hood and oven (holiday cooking = heavy use)', categories: ['clean'] },
          { id: 'm12-clean-2', text: 'Wipe down all hard surfaces and vacuum upholstered furniture before hosting guests', categories: ['clean'] },
        ],
      },
      {
        label: 'Admin',
        tasks: [
          { id: 'm12-admin-1', text: "Plan next year — review this checklist, note what you'd add or change, order filters in bulk", categories: ['admin'] },
        ],
      },
    ],
  },
];

// Helper to get season for a month
export function getSeasonForMonth(monthNumber: number): Season | undefined {
  return SEASONS.find(s => s.months.includes(monthNumber));
}

// Get months in display order (starting with current month's season)
export function getMonthsInSeasonOrder(): Month[] {
  const orderedMonths: Month[] = [];

  // Order: Winter (1,2), Spring (3,4,5), Summer (6,7,8), Fall (9,10,11), then Dec (12)
  const displayOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  for (const monthNum of displayOrder) {
    const month = MONTHS.find(m => m.number === monthNum);
    if (month) orderedMonths.push(month);
  }

  return orderedMonths;
}

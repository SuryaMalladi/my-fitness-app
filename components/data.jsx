// ————— Mock data model —————
// Simulates a week's doctor-prescribed diet + workout plan
// plus today's intake / metrics

const todayPlan = {
  meals: [
    { id: 'b', time: '07:00', window: '06:30–08:00', name: 'Breakfast',
      items: [
        { food: 'Oats with almond milk', qty: '1 bowl (180g)', kcal: 280, p: 9, c: 48, f: 6 },
        { food: 'Banana', qty: '1 medium', kcal: 105, p: 1, c: 27, f: 0 },
        { food: 'Black coffee', qty: '1 cup', kcal: 5, p: 0, c: 0, f: 0 },
      ], kcal: 390, done: true, loggedAt: '07:12' },
    { id: 's1', time: '10:30', window: '10:00–11:00', name: 'Mid-morning',
      items: [
        { food: 'Greek yogurt', qty: '150g', kcal: 120, p: 15, c: 8, f: 3 },
        { food: 'Mixed nuts', qty: '20g', kcal: 115, p: 3, c: 5, f: 10 },
      ], kcal: 235, done: true, loggedAt: '10:41' },
    { id: 'l', time: '13:00', window: '12:30–14:00', name: 'Lunch',
      items: [
        { food: 'Grilled chicken breast', qty: '150g', kcal: 240, p: 46, c: 0, f: 5 },
        { food: 'Quinoa', qty: '100g cooked', kcal: 120, p: 4, c: 21, f: 2 },
        { food: 'Mixed greens + olive oil', qty: '1 plate', kcal: 140, p: 3, c: 8, f: 11 },
      ], kcal: 500, done: false, missed: true },
    { id: 's2', time: '16:30', window: '16:00–17:00', name: 'Afternoon',
      items: [
        { food: 'Apple', qty: '1 medium', kcal: 95, p: 0, c: 25, f: 0 },
        { food: 'Peanut butter', qty: '1 tbsp', kcal: 95, p: 4, c: 3, f: 8 },
      ], kcal: 190, done: false, upcoming: true },
    { id: 'd', time: '19:30', window: '19:00–20:30', name: 'Dinner',
      items: [
        { food: 'Baked salmon', qty: '140g', kcal: 280, p: 30, c: 0, f: 17 },
        { food: 'Roasted veggies', qty: '200g', kcal: 110, p: 4, c: 18, f: 3 },
        { food: 'Brown rice', qty: '80g cooked', kcal: 90, p: 2, c: 19, f: 1 },
      ], kcal: 480, done: false },
  ],
  targets: { kcal: 1795, protein: 121, carbs: 182, fat: 66, water: 3000 /* ml */ },
  consumed: { kcal: 625, protein: 28, carbs: 88, fat: 19, water: 1450 },
  workout: {
    title: 'Upper Body — Strength',
    duration: 45, // minutes
    time: '18:00',
    exercises: [
      { name: 'Warm-up row', sets: 1, reps: '5 min', rest: 0, done: true },
      { name: 'Bench press', sets: 4, reps: '8', rest: 90, weight: '60kg', done: true },
      { name: 'Bent-over row', sets: 4, reps: '10', rest: 90, weight: '45kg', done: false, current: true },
      { name: 'Overhead press', sets: 3, reps: '10', rest: 75, weight: '30kg', done: false },
      { name: 'Pull-ups', sets: 3, reps: 'AMRAP', rest: 60, done: false },
      { name: 'Face pulls', sets: 3, reps: '15', rest: 45, weight: '15kg', done: false },
      { name: 'Cooldown stretch', sets: 1, reps: '5 min', rest: 0, done: false },
    ],
  },
};

const weekPlan = [
  { day: 'Mon', date: 14, label: 'Upper · Strength', done: true },
  { day: 'Tue', date: 15, label: 'Rest · Mobility', done: true },
  { day: 'Wed', date: 16, label: 'Lower · Power', done: true },
  { day: 'Thu', date: 17, label: 'HIIT · 30 min', done: true },
  { day: 'Fri', date: 18, label: 'Upper · Strength', done: false, today: true },
  { day: 'Sat', date: 19, label: 'Long walk · 60 min', done: false },
  { day: 'Sun', date: 20, label: 'Rest', done: false },
];

// adherence history — last 28 days, 0..1
const adherence28 = [
  0.92, 0.85, 1.0, 0.78, 0.6, 1.0, 0.95,
  0.88, 0.9, 1.0, 0.72, 1.0, 0.83, 0.9,
  0.95, 1.0, 0.66, 0.88, 0.9, 1.0, 0.8,
  0.92, 0.95, 1.0, 0.87, 0.9, 0.72, 0.55, // today in-progress
];

const weightSeries = [ // last 12 weeks, kg
  84.2, 83.9, 83.5, 83.4, 83.0, 82.8, 82.4, 82.1, 81.8, 81.3, 81.0, 80.6,
];

const reminders = [
  { id: 1, time: '13:00', type: 'meal', title: 'Lunch — missed',
    body: "You haven't logged Lunch. Coach won't let this slide. Log or snooze.",
    urgency: 'high', ago: '1h 25m overdue' },
  { id: 2, time: '12:00', type: 'water', title: 'Hydrate',
    body: '250ml. Your bottle is waiting.', urgency: 'med', ago: 'scheduled', due: true },
  { id: 3, time: '11:00', type: 'water', title: 'Hydrate — complete',
    body: '250ml logged', urgency: 'low', ago: '2h ago', done: true },
];

const badges = [
  { label: 'On plan', color: 'lime', icon: 'check' },
  { label: 'Off track', color: 'amber', icon: 'alert' },
  { label: 'Missed', color: 'rose', icon: 'x' },
];

window.AppData = { todayPlan, weekPlan, adherence28, weightSeries, reminders };

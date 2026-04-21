// ————— Bottom tab bar —————
function BottomNav({ active, onChange }) {
  const tabs = [
    { id: 'home',    label: 'Today',    icon: 'home' },
    { id: 'food',    label: 'Food',     icon: 'plate' },
    { id: 'water',   label: 'Water',    icon: 'drop' },
    { id: 'workout', label: 'Workout',  icon: 'dumbbell' },
    { id: 'metrics', label: 'Metrics',  icon: 'chart' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 30,
    }}>
      <div className="tabbar">
        {tabs.map(t => (
          <button key={t.id} className={`tab ${active === t.id ? 'active' : ''}`} onClick={() => onChange(t.id)}>
            <Icon name={t.icon} size={22} strokeWidth={active === t.id ? 2 : 1.6} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ————— Coach greeting card (Home) —————
function CoachGreeting({ hour = 14, name = 'Alex', pendingMeal }) {
  const greeting = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  return (
    <div style={{ padding: '8px 20px 16px' }}>
      <div style={{ fontSize: 13, color: 'var(--t-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
        {greeting}, {name}
      </div>
      <div className="coach-quote" style={{ fontSize: 26, lineHeight: 1.15 }}>
        {pendingMeal
          ? <>You skipped <em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>lunch</em>. Catch up <em style={{ fontStyle: 'italic' }}>now</em>, or we shift the whole day.</>
          : <>On pace. Hit the <em style={{ color: 'var(--lime)', fontStyle: 'normal' }}>afternoon snack</em> in 45 min.</>}
      </div>
    </div>
  );
}

// ————— Ring progress (used in home + metrics) —————
function Ring({ size = 88, stroke = 8, value = 0.7, color = 'var(--lime)', trackColor = 'var(--bg-3)', children }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const o = C * (1 - Math.max(0, Math.min(1, value)));
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={C} strokeDashoffset={o} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .6s ease' }}/>
      </svg>
      {children && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>{children}</div>
      )}
    </div>
  );
}

// ————— Three-ring (calories / protein / water) —————
function TripleRing({ size = 170, data }) {
  // data: [{label, value, target, color, unit}]
  const strokes = 10, gap = 4;
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {data.map((d, i) => {
        const sz = size - i * (strokes * 2 + gap * 2);
        const r = (sz - strokes) / 2;
        const C = 2 * Math.PI * r;
        const v = Math.min(1, d.value / d.target);
        return (
          <svg key={i} width={sz} height={sz} style={{ position: 'absolute', top: i * (strokes + gap), left: i * (strokes + gap), transform: 'rotate(-90deg)' }}>
            <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="var(--bg-3)" strokeWidth={strokes}/>
            <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={d.color} strokeWidth={strokes}
              strokeDasharray={C} strokeDashoffset={C*(1-v)} strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset .8s ease' }}/>
          </svg>
        );
      })}
    </div>
  );
}

// ————— Stat strip —————
function StatStrip({ items }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {items.map((s, i) => (
        <div key={i} className="card" style={{ flex: 1, padding: 14 }}>
          <div className="label" style={{ marginBottom: 6, fontSize: 10 }}>{s.label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span className="hero-num" style={{ fontSize: 28 }}>{s.value}</span>
            <span style={{ fontSize: 11, color: 'var(--t-3)' }}>{s.unit}</span>
          </div>
          {s.sub && <div style={{ fontSize: 11, color: 'var(--t-3)', marginTop: 4 }}>{s.sub}</div>}
        </div>
      ))}
    </div>
  );
}

// ————— Meal row (timeline) —————
function MealRow({ meal, onTap }) {
  const status = meal.done ? 'done' : meal.missed ? 'missed' : meal.upcoming ? 'upcoming' : 'pending';
  const statusMap = {
    done:     { color: 'var(--lime)',  bg: 'var(--lime-dim)',  label: 'Logged ' + (meal.loggedAt || ''), icon: 'check' },
    missed:   { color: 'var(--amber)', bg: 'var(--amber-dim)', label: 'Overdue · log now',              icon: 'alert' },
    upcoming: { color: 'var(--t-2)',   bg: 'var(--bg-3)',      label: 'In 45 min',                       icon: 'timer' },
    pending:  { color: 'var(--t-2)',   bg: 'var(--bg-3)',      label: 'Later today',                    icon: 'timer' },
  };
  const s = statusMap[status];
  return (
    <button onClick={onTap} style={{
      width: '100%', textAlign: 'left', border: 'none', background: 'transparent',
      cursor: 'pointer', padding: 0, fontFamily: 'inherit', color: 'inherit',
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
        {/* time rail */}
        <div style={{ width: 44, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: 'var(--t-3)', fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>{meal.time}</div>
          <div style={{ width: 1, flex: 1, background: 'var(--line)', marginTop: 4 }}/>
        </div>
        {/* card */}
        <div className="card" style={{
          flex: 1, marginBottom: 10, padding: 14,
          opacity: status === 'pending' ? 0.75 : 1,
          borderColor: status === 'missed' ? 'var(--amber-dim)' : 'var(--line)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{meal.name}</span>
                <span className="hero-num" style={{ fontSize: 14, color: 'var(--t-3)' }}>· {meal.kcal} kcal</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--t-2)', lineHeight: 1.55 }}>
                {meal.items.map(i => i.food).join(' · ')}
              </div>
            </div>
            <div style={{
              padding: '4px 8px', borderRadius: 999, background: s.bg, color: s.color,
              fontSize: 10.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              <Icon name={s.icon} size={11} strokeWidth={2.2}/>
              {status === 'done' ? '✓' : status === 'missed' ? 'Missed' : status === 'upcoming' ? '45m' : ''}
            </div>
          </div>
          {status === 'missed' && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '0.5px solid var(--line)', display: 'flex', gap: 8 }}>
              <button className="btn btn-lime" style={{ flex: 1, padding: '10px 14px', fontSize: 13 }}>Log now</button>
              <button className="btn btn-ghost" style={{ padding: '10px 14px', fontSize: 13 }}>Skip</button>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

Object.assign(window, { BottomNav, CoachGreeting, Ring, TripleRing, StatStrip, MealRow });

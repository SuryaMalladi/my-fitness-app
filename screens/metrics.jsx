// ————— Metrics Screen — daily / weekly / monthly / yearly —————
function MetricsScreen({ goTo }) {
  const [range, setRange] = React.useState('week'); // day | week | month | year
  const { adherence28, weightSeries } = window.AppData;

  return (
    <div style={{ padding: '0 0 120px' }}>
      <div style={{ padding: '14px 20px 8px' }}>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Progress</div>
        <div style={{ fontSize: 12, color: 'var(--t-3)', marginTop: 2 }}>Are you doing what Dr. Mehta prescribed?</div>
      </div>

      {/* Range selector */}
      <div style={{ padding: '12px 20px' }}>
        <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg-2)', borderRadius: 12, border: '0.5px solid var(--line)' }}>
          {['day', 'week', 'month', 'year'].map(r => (
            <button key={r} onClick={() => setRange(r)} style={{
              flex: 1, padding: '8px 4px', borderRadius: 9,
              background: range === r ? 'var(--bg-4)' : 'transparent',
              color: range === r ? 'var(--t-1)' : 'var(--t-3)',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 12, fontWeight: range === r ? 600 : 500,
              textTransform: 'capitalize',
            }}>{r}</button>
          ))}
        </div>
      </div>

      {/* Headline adherence */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div className="card" style={{ padding: 20 }}>
          <div className="label" style={{ marginBottom: 10 }}>Plan adherence · this {range}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
            <span className="hero-num" style={{ fontSize: 56 }}>
              {range === 'day' ? '65' : range === 'week' ? '84' : range === 'month' ? '87' : '81'}
            </span>
            <span style={{ fontSize: 18, color: 'var(--t-3)' }}>%</span>
            <span style={{ flex: 1 }}/>
            <span className="chip lime">
              <Icon name="trend" size={11} strokeWidth={2}/>
              +6% vs last {range}
            </span>
          </div>

          {/* Split by category */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { label: 'Food',    v: 78, color: 'var(--lime)',   icon: 'plate' },
              { label: 'Water',   v: 92, color: 'var(--aqua)',   icon: 'drop' },
              { label: 'Workout', v: 85, color: 'var(--amber)',  icon: 'dumbbell' },
              { label: 'Timing',  v: 81, color: 'var(--violet)', icon: 'timer' },
            ].map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <Ring size={50} stroke={4} value={c.v/100} color={c.color}>
                  <span style={{ fontSize: 11, color: c.color, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{c.v}</span>
                </Ring>
                <div style={{ fontSize: 10, color: 'var(--t-3)', marginTop: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar heatmap */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div className="label">Last 28 days</div>
          <span style={{ fontSize: 11, color: 'var(--t-3)' }}>daily plan %</span>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
            {adherence28.map((v, i) => {
              const isToday = i === adherence28.length - 1;
              return (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 6,
                  background: v >= 0.9 ? 'var(--lime)' :
                              v >= 0.75 ? 'color-mix(in oklab, var(--lime) 55%, var(--bg-3))' :
                              v >= 0.5 ? 'color-mix(in oklab, var(--amber) 50%, var(--bg-3))' :
                              'color-mix(in oklab, var(--rose) 40%, var(--bg-3))',
                  border: isToday ? '1.5px solid var(--t-1)' : 'none',
                  opacity: v >= 0.9 ? 1 : 0.9,
                }}/>
              );
            })}
          </div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: 'var(--t-3)' }}>
            <span>Less</span>
            {[0.3, 0.55, 0.75, 0.9].map((v, i) => (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: 4,
                background: v >= 0.9 ? 'var(--lime)' : v >= 0.75 ? 'color-mix(in oklab, var(--lime) 55%, var(--bg-3))' : v >= 0.5 ? 'color-mix(in oklab, var(--amber) 50%, var(--bg-3))' : 'color-mix(in oklab, var(--rose) 40%, var(--bg-3))',
              }}/>
            ))}
            <span>Full plan</span>
          </div>
        </div>
      </div>

      {/* Missed meals section */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div className="label" style={{ marginBottom: 10 }}>Where you slipped</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { when: 'Today · 13:00', what: 'Lunch skipped entirely', why: 'No log, no replacement', sev: 'high' },
            { when: 'Wed · 16:30',   what: 'Snack 48 min late',       why: 'Logged at 17:18',       sev: 'med' },
            { when: 'Tue · 19:30',   what: 'Dinner 210 kcal over',    why: 'Extra serving rice',    sev: 'med' },
            { when: 'Mon · all day', what: 'Water 600ml short',      why: '2.4L / 3.0L target',     sev: 'low' },
          ].map((m, i, a) => (
            <div key={i} style={{
              padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start',
              borderBottom: i < a.length-1 ? '0.5px solid var(--line)' : 'none',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: 999, marginTop: 6,
                background: m.sev === 'high' ? 'var(--rose)' : m.sev === 'med' ? 'var(--amber)' : 'var(--t-3)',
                flexShrink: 0,
              }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--t-1)' }}>{m.what}</div>
                <div style={{ fontSize: 11, color: 'var(--t-3)', marginTop: 2 }}>{m.when} · {m.why}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weight trend */}
      <div style={{ padding: '8px 20px 20px' }}>
        <div className="label" style={{ marginBottom: 10 }}>Weight · 12 weeks</div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 14 }}>
            <span className="hero-num" style={{ fontSize: 32 }}>80.6</span>
            <span style={{ fontSize: 12, color: 'var(--t-3)' }}>kg</span>
            <span style={{ flex: 1 }}/>
            <span className="chip lime"><Icon name="trend" size={11} strokeWidth={2}/>−3.6 kg</span>
          </div>
          <WeightChart data={weightSeries}/>
        </div>
      </div>

      {/* Macros bar */}
      <div style={{ padding: '8px 20px 40px' }}>
        <div className="label" style={{ marginBottom: 10 }}>Macros · weekly avg</div>
        <div className="card" style={{ padding: 16 }}>
          {[
            { label: 'Protein', v: 109, t: 121, color: 'var(--aqua)', unit: 'g' },
            { label: 'Carbs',   v: 168, t: 182, color: 'var(--lime)', unit: 'g' },
            { label: 'Fat',     v: 72, t: 66, color: 'var(--amber)', unit: 'g', over: true },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 12.5, color: 'var(--t-1)', fontWeight: 500 }}>{m.label}</span>
                <span style={{ flex: 1 }}/>
                <span className="hero-num" style={{ fontSize: 15 }}>{m.v}</span>
                <span style={{ fontSize: 11, color: 'var(--t-3)' }}>/ {m.t}{m.unit}</span>
                {m.over && <span style={{ fontSize: 10, color: 'var(--amber)' }}>over</span>}
              </div>
              <div className="bar">
                <span style={{ width: `${Math.min(100, m.v/m.t*100)}%`, background: m.color }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeightChart({ data }) {
  const W = 320, H = 110, pad = 6;
  const min = Math.min(...data) - 0.5, max = Math.max(...data) + 0.5;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad*2);
    const y = pad + (1 - (v - min) / (max - min)) * (H - pad*2);
    return [x, y];
  });
  const path = pts.map(([x,y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = path + ` L${pts[pts.length-1][0]} ${H-pad} L${pts[0][0]} ${H-pad} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H, display: 'block' }}>
      <defs>
        <linearGradient id="w-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.86 0.17 128)" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="oklch(0.86 0.17 128)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#w-area)"/>
      <path d={path} fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i === pts.length-1 ? 4 : 2} fill={i === pts.length-1 ? 'var(--lime)' : 'var(--bg-0)'} stroke="var(--lime)" strokeWidth="1.5"/>
      ))}
    </svg>
  );
}

window.MetricsScreen = MetricsScreen;

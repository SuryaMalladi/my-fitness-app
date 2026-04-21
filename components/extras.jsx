// ————— Reminder / Notification overlay —————
function ReminderOverlay({ onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 70,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      paddingBottom: 110,
      animation: 'fadeIn .25s ease',
    }} onClick={onClose}>
      <div style={{
        width: 'calc(100% - 24px)', maxWidth: 360,
        background: 'linear-gradient(180deg, #1c2520 0%, #15191A 100%)',
        borderRadius: 24, padding: 18,
        border: '0.5px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        animation: 'slideUp .35s cubic-bezier(.2,.8,.2,1)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--amber-dim)', color: 'var(--amber)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="bell" size={18} strokeWidth={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Missed · 1h 25m</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>Log your lunch</div>
          </div>
          <button onClick={onClose} style={{ padding: 4, background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <Icon name="x" size={16} color="var(--t-3)"/>
          </button>
        </div>
        <div className="coach-quote" style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 16 }}>
          You said you'd eat. You didn't. Two taps and we're back on plan.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" style={{ flex: 1, padding: '10px 12px', fontSize: 12.5 }}>Snooze 15m</button>
          <button className="btn btn-lime" style={{ flex: 2, padding: '10px 12px', fontSize: 12.5 }}>Log lunch now</button>
        </div>
      </div>
    </div>
  );
}

// ————— Web Dashboard Preview —————
function WebDashboard() {
  const { adherence28, weightSeries, todayPlan } = window.AppData;

  return (
    <div style={{
      width: 1180, height: 740, borderRadius: 14, overflow: 'hidden',
      background: 'var(--bg-0)', border: '0.5px solid var(--line)',
      boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
      display: 'flex',
    }}>
      {/* sidebar */}
      <div style={{
        width: 220, background: 'var(--bg-1)', borderRight: '0.5px solid var(--line)',
        padding: 20, display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="zap" size={14} color="#0A0D0C" strokeWidth={2.5}/>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>Coach</span>
        </div>
        {[
          { icon: 'home', label: 'Today', active: true },
          { icon: 'calendar', label: 'Week plan' },
          { icon: 'plate', label: 'Food log' },
          { icon: 'dumbbell', label: 'Workouts' },
          { icon: 'chart', label: 'Metrics' },
          { icon: 'upload', label: 'Upload plan' },
          { icon: 'bell', label: 'Reminders' },
        ].map(i => (
          <div key={i.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 8,
            background: i.active ? 'var(--bg-3)' : 'transparent',
            color: i.active ? 'var(--t-1)' : 'var(--t-2)',
            fontSize: 12.5, fontWeight: 500,
          }}>
            <Icon name={i.icon} size={15} color={i.active ? 'var(--lime)' : 'var(--t-3)'}/>
            {i.label}
          </div>
        ))}
        <div style={{ flex: 1 }}/>
        <div style={{ padding: '10px 10px', display: 'flex', alignItems: 'center', gap: 10, borderTop: '0.5px solid var(--line)', marginTop: 10, paddingTop: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--bg-4)', color: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>AK</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>Alex Kumar</div>
            <div style={{ fontSize: 10, color: 'var(--t-3)' }}>Dr. Mehta · Wk 3</div>
          </div>
        </div>
      </div>

      {/* main */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--t-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Friday · Apr 18</div>
            <div style={{ fontSize: 26, fontWeight: 600, marginTop: 4, letterSpacing: '-0.02em' }}>Today</div>
            <div className="coach-quote" style={{ fontSize: 17, marginTop: 8, color: 'var(--t-2)' }}>
              You skipped <em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>lunch</em>. Log it or we shift the whole day.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ padding: '8px 12px', fontSize: 12 }}>
              <Icon name="upload" size={14}/> Upload plan
            </button>
            <button className="btn btn-lime" style={{ padding: '8px 12px', fontSize: 12 }}>
              <Icon name="plus" size={14}/> Log meal
            </button>
          </div>
        </div>

        {/* stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          {[
            { l: 'Calories', v: '625', u: `/ ${todayPlan.targets.kcal}`, sub: '500 behind', color: 'var(--lime)' },
            { l: 'Protein', v: '28', u: 'g / 121g', sub: '23% of target', color: 'var(--aqua)' },
            { l: 'Water', v: '1.45', u: 'L / 3.0L', sub: '48% done', color: 'var(--violet)' },
            { l: 'Workout', v: '2/7', u: 'done', sub: 'Starts 18:00', color: 'var(--amber)' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: 14 }}>
              <div className="label" style={{ marginBottom: 6, fontSize: 10 }}>{s.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span className="hero-num" style={{ fontSize: 26, color: s.color }}>{s.v}</span>
                <span style={{ fontSize: 11, color: 'var(--t-3)' }}>{s.u}</span>
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--t-3)', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* 2-col body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <div className="label">Today's meal timeline</div>
              <span style={{ fontSize: 10.5, color: 'var(--t-3)' }}>From Dr. Mehta</span>
            </div>
            {todayPlan.meals.map((m, i) => {
              const state = m.done ? 'done' : m.missed ? 'missed' : m.upcoming ? 'upcoming' : 'todo';
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0', borderTop: i > 0 ? '0.5px solid var(--line)' : 'none',
                }}>
                  <div style={{ width: 44, fontSize: 11, color: 'var(--t-3)', fontVariantNumeric: 'tabular-nums' }}>{m.time}</div>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: state === 'done' ? 'var(--lime)' : state === 'missed' ? 'var(--amber-dim)' : 'var(--bg-3)',
                    border: state === 'missed' ? '1px solid var(--amber)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {state === 'done' && <Icon name="check" size={13} color="#0A0D0C" strokeWidth={3}/>}
                    {state === 'missed' && <Icon name="alert" size={11} color="var(--amber)" strokeWidth={2.5}/>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{m.name}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--t-3)', marginTop: 1 }}>{m.items.map(i=>i.food).join(' · ')}</div>
                  </div>
                  <span className="hero-num" style={{ fontSize: 14, color: 'var(--t-2)' }}>{m.kcal}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card" style={{ padding: 16 }}>
              <div className="label" style={{ marginBottom: 10 }}>Adherence · 28 days</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 3 }}>
                {adherence28.map((v, i) => (
                  <div key={i} style={{
                    aspectRatio: '1', borderRadius: 3,
                    background: v >= 0.9 ? 'var(--lime)' : v >= 0.75 ? 'color-mix(in oklab, var(--lime) 55%, var(--bg-3))' : v >= 0.5 ? 'color-mix(in oklab, var(--amber) 50%, var(--bg-3))' : 'color-mix(in oklab, var(--rose) 40%, var(--bg-3))',
                    border: i === adherence28.length-1 ? '1px solid var(--t-1)' : 'none',
                  }}/>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="label" style={{ marginBottom: 8 }}>Weight · 12 weeks</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span className="hero-num" style={{ fontSize: 24 }}>80.6</span>
                <span style={{ fontSize: 11, color: 'var(--t-3)' }}>kg</span>
                <span style={{ flex: 1 }}/>
                <span className="chip lime" style={{ fontSize: 10, padding: '2px 7px' }}>−3.6</span>
              </div>
              <WeightChart data={weightSeries}/>
            </div>
            <div className="card" style={{ padding: 16, background: 'var(--amber-dim)', borderColor: 'transparent' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="bell" size={16} color="var(--amber)" strokeWidth={2}/>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--amber)' }}>Reminder pending</div>
                  <div style={{ fontSize: 11, color: 'var(--t-2)', marginTop: 3, lineHeight: 1.5 }}>Lunch overdue by 1h 25m. Auto-snooze in 20m, then merged into dinner.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ReminderOverlay = ReminderOverlay;
window.WebDashboard = WebDashboard;

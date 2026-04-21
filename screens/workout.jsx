// ————— Workout Screen — step-by-step with timer —————
function WorkoutScreen({ goTo }) {
  const { todayPlan } = window.AppData;
  const exercises = todayPlan.workout.exercises;
  const currentIdx = exercises.findIndex(e => e.current);
  const current = exercises[currentIdx];

  const [setNum, setSetNum] = React.useState(2);
  const [resting, setResting] = React.useState(true);
  const [restLeft, setRestLeft] = React.useState(48);

  React.useEffect(() => {
    if (!resting) return;
    const t = setInterval(() => setRestLeft(r => r > 0 ? r - 1 : 0), 1000);
    return () => clearInterval(t);
  }, [resting]);

  const done = exercises.filter(e => e.done).length;
  const total = exercises.length;

  return (
    <div style={{ padding: '0 0 120px' }}>
      <div style={{ padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--t-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Workout · 18:24</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{todayPlan.workout.title}</div>
        </div>
        <button style={{ padding: 8, background: 'var(--bg-2)', border: '0.5px solid var(--line)', borderRadius: 12, cursor: 'pointer' }}>
          <Icon name="x" size={18} color="var(--t-2)"/>
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '4px 20px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--t-3)', marginBottom: 6 }}>
          <span>Exercise {currentIdx+1} of {total}</span>
          <span>{done}/{total} complete · 24:15 elapsed</span>
        </div>
        <div className="bar" style={{ height: 4 }}><span style={{ width: `${(done/total)*100}%` }}/></div>
      </div>

      {/* Current exercise hero */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Demo panel placeholder */}
          <div style={{
            height: 180, position: 'relative',
            background: 'radial-gradient(ellipse at 50% 30%, #1c2420 0%, #0a0d0c 80%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="dumbbell" size={90} color="rgba(200,255,150,0.12)" strokeWidth={1}/>
            <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="play" size={14} color="#0A0D0C"/>
              </div>
              <span style={{ fontSize: 12, color: 'var(--t-2)' }}>Demo · 0:18</span>
            </div>
            <div style={{ position: 'absolute', top: 12, right: 12 }} className="chip lime">Current</div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>{current.name}</div>
            <div style={{ fontSize: 13, color: 'var(--t-2)', marginTop: 4 }}>{current.weight} · {current.sets} sets × {current.reps} reps · {current.rest}s rest</div>
            {/* Set dots */}
            <div style={{ display: 'flex', gap: 8, marginTop: 18, marginBottom: 18 }}>
              {Array.from({ length: current.sets }).map((_, i) => {
                const state = i < setNum-1 ? 'done' : i === setNum-1 ? 'current' : 'todo';
                return (
                  <div key={i} style={{
                    flex: 1, padding: '12px 6px', borderRadius: 12,
                    background: state === 'done' ? 'var(--lime-dim)' : state === 'current' ? 'var(--bg-3)' : 'var(--bg-1)',
                    border: state === 'current' ? '1px solid var(--lime)' : `0.5px solid ${state === 'done' ? 'transparent' : 'var(--line)'}`,
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 10, color: state === 'done' ? 'var(--lime)' : state === 'current' ? 'var(--lime)' : 'var(--t-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Set {i+1}</div>
                    <div className="hero-num" style={{ fontSize: 18, color: state === 'todo' ? 'var(--t-3)' : 'var(--t-1)', marginTop: 3 }}>
                      {state === 'done' ? '10' : state === 'current' ? '—' : '·'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Big timer or Start set button */}
            {resting ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Rest</div>
                <div className="hero-num" style={{ fontSize: 72, color: 'var(--t-1)', fontVariantNumeric: 'tabular-nums' }}>
                  0:{String(restLeft).padStart(2, '0')}
                </div>
                <RestRing value={restLeft / 90}/>
                <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                  <button onClick={() => setRestLeft(r => r + 15)} className="btn btn-ghost" style={{ flex: 1 }}>+15s</button>
                  <button onClick={() => { setResting(false); setSetNum(n => n + 1); }} className="btn btn-lime" style={{ flex: 2 }}>
                    Skip rest · start set {setNum}
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn btn-lime" style={{ width: '100%', padding: '18px', fontSize: 16 }} onClick={() => setResting(true)}>
                <Icon name="check" size={18}/> Log set · 10 reps @ {current.weight}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Coach line */}
      <div style={{ padding: '4px 20px 20px' }}>
        <div className="coach-quote" style={{ fontSize: 16, color: 'var(--t-2)' }}>
          "Keep the bar close to your hip. No momentum. Two more sets — don't stop now."
        </div>
        <div style={{ fontSize: 11, color: 'var(--t-3)', marginTop: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>— Coach</div>
      </div>

      {/* Up next list */}
      <div style={{ padding: '8px 20px 20px' }}>
        <div className="label" style={{ marginBottom: 10 }}>Queue</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {exercises.map((e, i, a) => {
            const state = e.done ? 'done' : e.current ? 'current' : 'todo';
            return (
              <div key={i} style={{
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: i < a.length-1 ? '0.5px solid var(--line)' : 'none',
                opacity: state === 'todo' ? 0.6 : 1,
                background: state === 'current' ? 'var(--lime-dim)' : 'transparent',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 7,
                  background: state === 'done' ? 'var(--lime-dim)' : state === 'current' ? 'var(--lime)' : 'var(--bg-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  fontSize: 11, fontWeight: 600, color: state === 'current' ? '#0A0D0C' : state === 'done' ? 'var(--lime)' : 'var(--t-3)',
                }}>
                  {state === 'done' ? <Icon name="check" size={12} color="var(--lime)" strokeWidth={3}/> : i+1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: state === 'current' ? 600 : 500 }}>{e.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--t-3)', marginTop: 2 }}>
                    {e.sets} × {e.reps}{e.weight ? ` · ${e.weight}` : ''}
                  </div>
                </div>
                {state === 'current' && <div className="chip lime" style={{ padding: '3px 8px' }}>Now</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RestRing({ value }) {
  const size = 120, stroke = 6;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ position: 'absolute', marginTop: -108, marginLeft: -30, transform: 'rotate(-90deg)', pointerEvents: 'none' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-3)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--amber)" strokeWidth={stroke}
        strokeDasharray={C} strokeDashoffset={C * (1 - value)} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s linear' }}/>
    </svg>
  );
}

window.WorkoutScreen = WorkoutScreen;

// ————— Upload Diet Chart Screen — full flow in one view —————
function UploadScreen({ goTo }) {
  const [stage, setStage] = React.useState('parsing'); // choose | parsing | review | done

  return (
    <div style={{ padding: '0 0 120px' }}>
      <div style={{ padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => goTo('home')} style={{ padding: 8, background: 'var(--bg-2)', border: '0.5px solid var(--line)', borderRadius: 12, cursor: 'pointer' }}>
          <Icon name="chevronL" size={18} color="var(--t-2)"/>
        </button>
        <div style={{ fontSize: 14, fontWeight: 500 }}>New weekly plan</div>
        <div style={{ width: 36 }}/>
      </div>

      {/* Stage pills */}
      <div style={{ padding: '12px 20px 20px', display: 'flex', gap: 6 }}>
        {['Upload', 'AI parse', 'Review', 'Apply'].map((s, i) => {
          const active = (stage === 'choose' && i === 0) || (stage === 'parsing' && i === 1) || (stage === 'review' && i === 2) || (stage === 'done' && i === 3);
          const done = (stage === 'parsing' && i < 1) || (stage === 'review' && i < 2) || (stage === 'done' && i < 3);
          return (
            <div key={i} style={{
              flex: 1, padding: '6px 8px', borderRadius: 999,
              background: active ? 'var(--lime-dim)' : done ? 'var(--bg-3)' : 'var(--bg-2)',
              border: active ? 'none' : '0.5px solid var(--line)',
              color: active ? 'var(--lime)' : done ? 'var(--t-2)' : 'var(--t-3)',
              fontSize: 10.5, fontWeight: 500, textAlign: 'center',
              letterSpacing: '0.04em',
            }}>
              {done ? '✓ ' : ''}{s}
            </div>
          );
        })}
      </div>

      {stage === 'choose' && (
        <div style={{ padding: '0 20px' }}>
          <div className="coach-quote" style={{ fontSize: 22, marginBottom: 18 }}>
            Drop Dr. Mehta's plan. We parse it, schedule it, nag you to follow it.
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <UploadOption icon="file" title="Upload PDF" sub="From email or Files"   color="var(--lime)" onClick={() => setStage('parsing')}/>
            <UploadOption icon="camera" title="Take photo" sub="Snap the printed chart" color="var(--aqua)" onClick={() => setStage('parsing')}/>
            <UploadOption icon="image" title="From gallery" sub="Choose existing image" color="var(--violet)" onClick={() => setStage('parsing')}/>
            <UploadOption icon="mail" title="Forward email" sub="plans@fit.app"          color="var(--amber)" onClick={() => setStage('parsing')}/>
            <UploadOption icon="list" title="Enter manually" sub="Type meal by meal"     color="var(--t-2)" onClick={() => setStage('review')}/>
          </div>
        </div>
      )}

      {stage === 'parsing' && (
        <div style={{ padding: '0 20px' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* PDF preview mock */}
            <div style={{ height: 260, position: 'relative', background: '#0a0d0c', display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
              <div style={{
                width: 180, background: '#f8f5ef', borderRadius: 4,
                padding: '16px 14px', fontFamily: 'ui-monospace, monospace',
                fontSize: 6.5, color: '#2a2824', lineHeight: 1.5, position: 'relative',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, marginBottom: 4 }}>DR. MEHTA · WEEK 3</div>
                <div style={{ fontSize: 5.5, opacity: 0.6, marginBottom: 8 }}>Apr 14 – Apr 20 · Apex Wellness Clinic</div>
                <div style={{ borderTop: '0.5px solid #d4cfc2', paddingTop: 6 }}>
                  <strong>MON · Breakfast 07:00</strong><br/>Oats + almond milk 180g<br/>Banana · Black coffee
                </div>
                <div style={{ marginTop: 4 }}><strong>MON · Lunch 13:00</strong><br/>Chicken breast 150g · Quinoa 100g · Greens</div>
                <div style={{ marginTop: 4 }}><strong>MON · Dinner 19:30</strong><br/>Salmon 140g · Veg · Brown rice 80g</div>
                <div style={{ marginTop: 6, opacity: 0.5 }}>…continues for 7 days</div>
                {/* AI scan overlay */}
                <div style={{ position: 'absolute', left: 0, right: 0, top: '45%', height: 2, background: 'var(--lime)', boxShadow: '0 0 12px var(--lime)', animation: 'breathe 1.6s infinite' }}/>
              </div>
              <div style={{ position: 'absolute', top: 14, left: 14, fontSize: 10, color: 'var(--lime)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--lime)', animation: 'breathe 2s infinite' }}/>
                Reading plan
              </div>
            </div>
            {/* Extracted items */}
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Found so far</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { k: '7 days of meals', v: '35 meals identified', c: 'var(--lime)', i: 'check' },
                  { k: '6 workouts', v: '1 rest day · Sun', c: 'var(--lime)', i: 'check' },
                  { k: 'Calorie targets', v: '1,795 kcal/day avg', c: 'var(--lime)', i: 'check' },
                  { k: 'Water goal', v: '3.0L/day', c: 'var(--lime)', i: 'check' },
                  { k: 'Portion for greens', v: 'Ambiguous — confirm', c: 'var(--amber)', i: 'alert' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0' }}>
                    <Icon name={r.i} size={14} color={r.c} strokeWidth={2}/>
                    <span style={{ fontSize: 12.5, color: 'var(--t-1)' }}>{r.k}</span>
                    <span style={{ flex: 1 }}/>
                    <span style={{ fontSize: 11.5, color: 'var(--t-3)' }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-lime" style={{ width: '100%', marginTop: 14 }} onClick={() => setStage('review')}>
            Preview parsed plan
          </button>
        </div>
      )}

      {stage === 'review' && (
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 12, color: 'var(--amber)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="alert" size={12} color="var(--amber)" strokeWidth={2}/>
            1 item needs your confirmation before applying
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 12 }}>
            {[
              { day: 'Mon', tag: 'B · 07:00', name: 'Oats + almond milk, banana', ok: true },
              { day: 'Mon', tag: 'L · 13:00', name: 'Chicken, quinoa, mixed greens', ok: true },
              { day: 'Mon', tag: 'D · 19:30', name: 'Salmon, veg, brown rice', ok: true },
              { day: 'Tue', tag: 'L · 13:00', name: 'Paneer bhurji + roti', ok: true },
              { day: 'Wed', tag: 'L · 13:00', name: 'Greens "as per appetite"', ok: false, issue: 'portion unclear' },
              { day: 'Wed', tag: 'D · 19:30', name: 'Lentil soup + flatbread', ok: true },
            ].map((r, i, a) => (
              <div key={i} style={{
                padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10,
                borderBottom: i < a.length-1 ? '0.5px solid var(--line)' : 'none',
                background: !r.ok ? 'var(--amber-dim)' : 'transparent',
              }}>
                <div style={{ width: 34, fontSize: 11, color: 'var(--t-3)', fontFamily: 'var(--mono)' }}>{r.day}</div>
                <div style={{ width: 60, fontSize: 10.5, color: r.ok ? 'var(--t-2)' : 'var(--amber)', fontWeight: 500, letterSpacing: '0.04em' }}>{r.tag}</div>
                <div style={{ flex: 1, fontSize: 13, color: 'var(--t-1)' }}>{r.name}</div>
                {r.ok
                  ? <Icon name="check" size={14} color="var(--lime)" strokeWidth={2.5}/>
                  : <span style={{ fontSize: 10, color: 'var(--amber)' }}>fix</span>}
              </div>
            ))}
            <div style={{ padding: '10px 14px', fontSize: 11, color: 'var(--t-3)', textAlign: 'center', borderTop: '0.5px solid var(--line)' }}>
              + 29 more entries · tap to expand
            </div>
          </div>

          <div className="card" style={{ padding: 14, marginBottom: 12 }}>
            <div className="label" style={{ marginBottom: 8 }}>What will happen</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5, color: 'var(--t-2)', lineHeight: 1.5 }}>
              <div>• Replace Week 3 (Apr 14–20) meal schedule</div>
              <div>• Reschedule workout reminders to match new times</div>
              <div>• Keep today's logged items (breakfast, snack)</div>
              <div>• Notify you 1h after any missed window</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStage('choose')}>Cancel</button>
            <button className="btn btn-lime" style={{ flex: 2 }} onClick={() => setStage('done')}>Confirm & apply</button>
          </div>
        </div>
      )}

      {stage === 'done' && (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: 'var(--lime)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check" size={36} color="#0A0D0C" strokeWidth={3}/>
          </div>
          <div className="coach-quote" style={{ fontSize: 24, marginBottom: 10 }}>Week 3 locked in.</div>
          <div style={{ fontSize: 13, color: 'var(--t-2)', lineHeight: 1.5 }}>
            35 meal reminders + 6 workouts scheduled.<br/>We're watching. Don't slip.
          </div>
          <button className="btn btn-lime" style={{ marginTop: 30, width: '100%' }} onClick={() => goTo('home')}>
            Back to Today
          </button>
        </div>
      )}
    </div>
  );
}

function UploadOption({ icon, title, sub, color, onClick }) {
  return (
    <button onClick={onClick} className="card" style={{
      display: 'flex', alignItems: 'center', gap: 14,
      width: '100%', cursor: 'pointer',
      fontFamily: 'inherit', textAlign: 'left',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `color-mix(in oklab, ${color} 14%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={icon} size={20} color={color} strokeWidth={2}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--t-1)' }}>{title}</div>
        <div style={{ fontSize: 11.5, color: 'var(--t-3)', marginTop: 2 }}>{sub}</div>
      </div>
      <Icon name="chevronR" size={16} color="var(--t-3)"/>
    </button>
  );
}

window.UploadScreen = UploadScreen;

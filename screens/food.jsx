// ————— Food Logging Screen —————
function FoodScreen({ goTo }) {
  const [mode, setMode] = React.useState('plan'); // plan | search | photo | barcode | voice
  const { todayPlan } = window.AppData;
  const [selectedItems, setSelectedItems] = React.useState(new Set());

  return (
    <div style={{ padding: '0 0 120px' }}>
      <div style={{ padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Log food</div>
        <button style={{ padding: 8, background: 'var(--bg-2)', border: '0.5px solid var(--line)', borderRadius: 12, cursor: 'pointer' }}>
          <Icon name="calendar" size={18} color="var(--t-2)"/>
        </button>
      </div>

      {/* Mode tabs */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }} className="hide-scroll">
          {[
            { id: 'plan', label: "Today's plan", icon: 'list' },
            { id: 'photo', label: 'Photo', icon: 'camera' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'barcode', label: 'Scan', icon: 'barcode' },
            { id: 'voice', label: 'Voice', icon: 'mic' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 12px', borderRadius: 999,
              background: mode === m.id ? 'var(--lime-dim)' : 'var(--bg-2)',
              color: mode === m.id ? 'var(--lime-bright)' : 'var(--t-2)',
              border: `0.5px solid ${mode === m.id ? 'transparent' : 'var(--line)'}`,
              fontSize: 12.5, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'inherit',
            }}>
              <Icon name={m.icon} size={14}/> {m.label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'plan' && <PlanMode meals={todayPlan.meals} selected={selectedItems} setSelected={setSelectedItems}/>}
      {mode === 'photo' && <PhotoMode/>}
      {mode === 'search' && <SearchMode/>}
      {mode === 'barcode' && <BarcodeMode/>}
      {mode === 'voice' && <VoiceMode/>}
    </div>
  );
}

function PlanMode({ meals, selected, setSelected }) {
  const focusMeal = meals.find(m => m.missed) || meals.find(m => !m.done) || meals[0];
  const toggle = (key) => {
    const next = new Set(selected);
    next.has(key) ? next.delete(key) : next.add(key);
    setSelected(next);
  };

  return (
    <div style={{ padding: '0 20px' }}>
      {/* Missed banner */}
      <div className="card" style={{
        padding: 14, background: 'var(--amber-dim)', borderColor: 'transparent', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="alert" size={18} color="var(--amber)"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--amber)' }}>Lunch was 1h 25m ago</div>
            <div style={{ fontSize: 12, color: 'var(--t-2)', marginTop: 2, lineHeight: 1.4 }}>
              Check off what you actually ate. No excuses, no estimations — we'll roll missed items into dinner.
            </div>
          </div>
        </div>
      </div>

      <div className="label" style={{ marginBottom: 10 }}>Lunch · 13:00 · Dr. Mehta's plan</div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {focusMeal.items.map((it, i) => {
          const key = focusMeal.id + '.' + i;
          const on = selected.has(key);
          return (
            <button key={key} onClick={() => toggle(key)} style={{
              width: '100%', background: 'transparent', border: 'none', padding: '14px 16px',
              display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer',
              borderBottom: i < focusMeal.items.length - 1 ? '0.5px solid var(--line)' : 'none',
              fontFamily: 'inherit', textAlign: 'left',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 7,
                background: on ? 'var(--lime)' : 'transparent',
                border: on ? 'none' : '1.5px solid var(--t-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {on && <Icon name="check" size={14} color="#0A0D0C" strokeWidth={3}/>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--t-1)' }}>{it.food}</div>
                <div style={{ fontSize: 11.5, color: 'var(--t-3)', marginTop: 2 }}>{it.qty} · {it.p}g P · {it.c}g C · {it.f}g F</div>
              </div>
              <div className="hero-num" style={{ fontSize: 18, color: on ? 'var(--lime)' : 'var(--t-2)' }}>{it.kcal}</div>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }}>
          <Icon name="plus" size={16}/> Add extra
        </button>
        <button className="btn btn-lime" style={{ flex: 2 }} disabled={selected.size === 0}>
          Log {selected.size > 0 ? `${selected.size} items` : ''}
        </button>
      </div>

      {/* Other meals collapsed */}
      <div className="label" style={{ marginTop: 24, marginBottom: 10 }}>Rest of today</div>
      {meals.filter(m => m.id !== focusMeal.id).map(m => (
        <div key={m.id} className="card-ghost" style={{
          marginBottom: 8, padding: 14,
          display: 'flex', alignItems: 'center', gap: 12,
          opacity: m.done ? 0.5 : 1,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: m.done ? 'var(--lime-dim)' : 'var(--bg-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {m.done && <Icon name="check" size={14} color="var(--lime)" strokeWidth={2.5}/>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name} · {m.time}</div>
            <div style={{ fontSize: 11, color: 'var(--t-3)', marginTop: 1 }}>{m.items.length} items · {m.kcal} kcal</div>
          </div>
          <Icon name="chevronR" size={16} color="var(--t-3)"/>
        </div>
      ))}
    </div>
  );
}

function PhotoMode() {
  return (
    <div style={{ padding: '0 20px' }}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Fake camera viewfinder */}
        <div style={{
          height: 280, position: 'relative',
          background: 'radial-gradient(ellipse at 30% 40%, #2a2a26 0%, #0f1011 70%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Placeholder plate */}
          <div style={{
            width: 180, height: 180, borderRadius: 999,
            background: 'repeating-linear-gradient(45deg, #3a3a32, #3a3a32 6px, #2e2e28 6px, #2e2e28 12px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}/>
          {/* AI targeting reticle */}
          <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, pointerEvents: 'none' }}>
            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((p, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: 24, height: 24,
                borderColor: 'var(--lime)',
                borderStyle: 'solid',
                top: p.includes('top') ? 0 : 'auto',
                bottom: p.includes('bottom') ? 0 : 'auto',
                left: p.includes('Left') ? 0 : 'auto',
                right: p.includes('Right') ? 0 : 'auto',
                borderWidth: `${p.includes('top') ? 2 : 0}px ${p.includes('Right') ? 2 : 0}px ${p.includes('bottom') ? 2 : 0}px ${p.includes('Left') ? 2 : 0}px`,
              }}/>
            ))}
          </div>
          <div style={{
            position: 'absolute', top: 14, left: 14,
            fontSize: 10, color: 'var(--lime)', letterSpacing: '0.1em',
            textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--lime)', animation: 'breathe 2s infinite' }}/>
            AI analyzing
          </div>
        </div>
        {/* Detection chips */}
        <div style={{ padding: 16 }}>
          <div className="label" style={{ marginBottom: 10 }}>Detected</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span className="chip lime">Grilled chicken · 150g · 240 kcal</span>
            <span className="chip lime">Quinoa · 100g · 120 kcal</span>
            <span className="chip amber">Greens · est. 1 plate</span>
          </div>
          <div style={{ marginTop: 14, fontSize: 11.5, color: 'var(--t-3)', lineHeight: 1.5 }}>
            Matches your planned Lunch. Confirm portions below.
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }}>Retake</button>
        <button className="btn btn-lime" style={{ flex: 2 }}>Use this · 460 kcal</button>
      </div>
    </div>
  );
}

function SearchMode() {
  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px', background: 'var(--bg-2)',
        borderRadius: 14, border: '0.5px solid var(--line)',
      }}>
        <Icon name="search" size={18} color="var(--t-3)"/>
        <span style={{ flex: 1, color: 'var(--t-1)', fontSize: 14 }}>chick</span>
        <div style={{ width: 1.5, height: 16, background: 'var(--lime)', animation: 'breathe 1s infinite' }}/>
      </div>
      <div className="label" style={{ marginTop: 16, marginBottom: 10 }}>Results</div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {[
          { name: 'Grilled chicken breast', qty: '100g', kcal: 165, p: 31, planned: true },
          { name: 'Chicken thigh, roasted', qty: '100g', kcal: 209, p: 26 },
          { name: 'Chicken tikka', qty: '1 piece', kcal: 85, p: 11 },
          { name: 'Chickpea salad', qty: '1 cup', kcal: 180, p: 9 },
        ].map((r, i, a) => (
          <div key={i} style={{
            padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: i < a.length-1 ? '0.5px solid var(--line)' : 'none',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                {r.name} {r.planned && <span className="chip lime" style={{ padding: '2px 6px', fontSize: 9 }}>in plan</span>}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--t-3)', marginTop: 2 }}>{r.qty} · {r.p}g protein</div>
            </div>
            <div className="hero-num" style={{ fontSize: 16, color: 'var(--t-2)' }}>{r.kcal}</div>
            <button style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--lime-dim)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="plus" size={14} color="var(--lime-bright)" strokeWidth={2.5}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarcodeMode() {
  return (
    <div style={{ padding: '0 20px' }}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          height: 240, background: '#050706', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* scan window */}
          <div style={{
            width: 220, height: 130, border: '1.5px solid var(--lime)', borderRadius: 8,
            position: 'relative', background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'var(--lime)', boxShadow: '0 0 8px var(--lime)' }}/>
            {/* fake barcode lines */}
            <div style={{ position: 'absolute', inset: 20, display: 'flex', gap: 2, alignItems: 'stretch', opacity: 0.4 }}>
              {[3,1,2,1,3,2,1,2,3,1,2,1,3,1,2,2,1,3,1,2].map((w,i) => (
                <div key={i} style={{ width: w, background: 'var(--t-1)' }}/>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 14, fontSize: 11, color: 'var(--t-3)' }}>Align barcode within frame</div>
        </div>
      </div>
    </div>
  );
}

function VoiceMode() {
  return (
    <div style={{ padding: '0 20px' }}>
      <div className="card" style={{ padding: 30, textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ position: 'absolute', inset: -20, borderRadius: 999, background: 'var(--lime)', opacity: 0.1, animation: 'pulse-ring 2s infinite' }}/>
          <div style={{ position: 'absolute', inset: -10, borderRadius: 999, background: 'var(--lime)', opacity: 0.2, animation: 'pulse-ring 2s 0.5s infinite' }}/>
          <div style={{
            width: 80, height: 80, borderRadius: 999, background: 'var(--lime)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <Icon name="mic" size={36} color="#0A0D0C" strokeWidth={2}/>
          </div>
        </div>
        <div style={{ marginTop: 24, fontSize: 15, fontWeight: 500 }}>Listening…</div>
        <div className="coach-quote" style={{ marginTop: 14, fontSize: 18, color: 'var(--t-2)' }}>
          "I had two eggs and a slice of toast"
        </div>
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          <span className="chip lime">2 eggs · 140 kcal</span>
          <span className="chip lime">Toast · 80 kcal</span>
        </div>
      </div>
    </div>
  );
}

window.FoodScreen = FoodScreen;

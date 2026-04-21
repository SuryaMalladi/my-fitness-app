// ————— Water Screen — animated bottle + reminders —————
function WaterScreen({ goTo }) {
  const [consumed, setConsumed] = React.useState(1450); // ml
  const target = 3000;
  const pct = Math.min(1, consumed / target);
  const glasses = Math.floor(consumed / 250);
  const remaining = target - consumed;

  const log = (ml) => setConsumed(c => Math.min(target + 500, c + ml));

  return (
    <div style={{ padding: '0 0 120px' }}>
      <div style={{ padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Hydration</div>
          <div style={{ fontSize: 12, color: 'var(--t-3)', marginTop: 2 }}>Reminds every hour · 12 glasses by 22:00</div>
        </div>
        <button style={{ padding: 8, background: 'var(--bg-2)', border: '0.5px solid var(--line)', borderRadius: 12, cursor: 'pointer' }}>
          <Icon name="gear" size={18} color="var(--t-2)"/>
        </button>
      </div>

      {/* Coach push */}
      <div style={{ padding: '4px 20px 16px' }}>
        <div className="coach-quote" style={{ fontSize: 22 }}>
          {remaining > 0
            ? <>{(remaining/1000).toFixed(1)}L to go. Reach for the bottle — <em style={{ color: 'var(--aqua)', fontStyle: 'normal' }}>now</em>.</>
            : <>Target crushed. Keep sipping.</>}
        </div>
      </div>

      {/* Big bottle */}
      <div style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'center' }}>
        <Bottle pct={pct} consumed={consumed} target={target}/>
      </div>

      {/* Quick log */}
      <div style={{ padding: '0 20px 16px' }}>
        <div className="label" style={{ marginBottom: 10 }}>Log a drink</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { ml: 150, label: 'Sip', icon: 'drop' },
            { ml: 250, label: 'Glass', icon: 'drop' },
            { ml: 500, label: 'Bottle', icon: 'drop' },
            { ml: 750, label: 'Large', icon: 'drop' },
          ].map(q => (
            <button key={q.ml} onClick={() => log(q.ml)} style={{
              flex: 1, padding: '14px 6px', borderRadius: 14,
              background: 'var(--bg-2)', border: '0.5px solid var(--line)',
              color: 'var(--t-1)', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <Icon name="drop" size={18} color="var(--aqua)" strokeWidth={2}/>
              <span className="hero-num" style={{ fontSize: 17 }}>{q.ml}</span>
              <span style={{ fontSize: 10, color: 'var(--t-3)' }}>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's reminder timeline */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div className="label">Hourly schedule</div>
          <span style={{ fontSize: 11, color: 'var(--t-3)' }}>{glasses}/12 glasses</span>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const hour = 8 + i;
              const past = i < glasses;
              const now = i === glasses;
              return (
                <div key={i} style={{
                  padding: '10px 4px', borderRadius: 10,
                  background: past ? 'var(--aqua-dim)' : now ? 'var(--amber-dim)' : 'var(--bg-3)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  border: now ? '1px solid var(--amber)' : 'none',
                }}>
                  <Icon name="drop" size={14} color={past ? 'var(--aqua)' : now ? 'var(--amber)' : 'var(--t-4)'} strokeWidth={2}/>
                  <span style={{ fontSize: 9.5, color: past ? 'var(--aqua)' : now ? 'var(--amber)' : 'var(--t-3)', fontVariantNumeric: 'tabular-nums' }}>
                    {String(hour).padStart(2,'0')}:00
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '0.5px solid var(--line)', fontSize: 11.5, color: 'var(--t-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="bell" size={12} color="var(--amber)" strokeWidth={2}/>
            <span>Next reminder <strong style={{ color: 'var(--t-1)' }}>14:00</strong> · in 12 min</span>
          </div>
        </div>
      </div>

      {/* Week strip */}
      <div style={{ padding: '8px 20px 20px' }}>
        <div className="label" style={{ marginBottom: 10 }}>This week</div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 90 }}>
            {[2.4, 3.0, 2.8, 3.1, 1.45, 0, 0].map((v, i, a) => {
              const h = v / 3 * 100;
              const isToday = i === 4;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: '100%', height: `${Math.max(h, 2)}%`, borderRadius: 6,
                    background: isToday ? 'var(--aqua)' : v >= 2.8 ? 'var(--aqua-dim)' : v > 0 ? 'var(--amber-dim)' : 'var(--bg-3)',
                    border: isToday ? 'none' : `0.5px solid ${v > 0 ? 'var(--line)' : 'transparent'}`,
                  }}/>
                  <div style={{ fontSize: 10, color: isToday ? 'var(--t-1)' : 'var(--t-3)', fontWeight: isToday ? 600 : 400 }}>
                    {['M','T','W','T','F','S','S'][i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bottle({ pct, consumed, target }) {
  // Animated SVG bottle — water fills up, surface ripples
  const W = 200, H = 340;
  const fillY = 110 + (220 * (1 - pct));

  return (
    <div style={{ position: 'relative' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <clipPath id="bottle-clip">
            {/* bottle shape: neck narrow, body wide */}
            <path d="M75 20 Q75 10 85 10 L115 10 Q125 10 125 20 L125 55 Q125 65 135 80 Q160 110 160 150 L160 295 Q160 320 135 320 L65 320 Q40 320 40 295 L40 150 Q40 110 65 80 Q75 65 75 55 Z"/>
          </clipPath>
          <linearGradient id="water-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.12 225)" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="oklch(0.55 0.14 230)" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)"/>
          </linearGradient>
        </defs>

        {/* glass body */}
        <path d="M75 20 Q75 10 85 10 L115 10 Q125 10 125 20 L125 55 Q125 65 135 80 Q160 110 160 150 L160 295 Q160 320 135 320 L65 320 Q40 320 40 295 L40 150 Q40 110 65 80 Q75 65 75 55 Z"
          fill="url(#glass-grad)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5"/>

        {/* water */}
        <g clipPath="url(#bottle-clip)">
          <rect x="0" y={fillY} width={W} height={H} fill="url(#water-grad)" style={{ transition: 'y 0.8s cubic-bezier(.2,.8,.2,1)' }}/>
          {/* ripple waves */}
          <path d={`M0 ${fillY} Q50 ${fillY-6} 100 ${fillY} T200 ${fillY} V${fillY+8} H0 Z`}
            fill="oklch(0.82 0.1 225)" opacity="0.6">
            <animate attributeName="d"
              values={`M0 ${fillY} Q50 ${fillY-6} 100 ${fillY} T200 ${fillY} V${fillY+8} H0 Z;
                      M0 ${fillY} Q50 ${fillY+4} 100 ${fillY-2} T200 ${fillY} V${fillY+8} H0 Z;
                      M0 ${fillY} Q50 ${fillY-6} 100 ${fillY} T200 ${fillY} V${fillY+8} H0 Z`}
              dur="3s" repeatCount="indefinite"/>
          </path>
          {/* bubbles */}
          {[{x:70,d:0},{x:130,d:1.2},{x:100,d:2.3}].map((b,i) => (
            <circle key={i} cx={b.x} cy={H-30} r="3" fill="rgba(255,255,255,0.4)">
              <animate attributeName="cy" values={`${H-30};${fillY+10}`} dur="4s" begin={`${b.d}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;0.7;0" dur="4s" begin={`${b.d}s`} repeatCount="indefinite"/>
            </circle>
          ))}
        </g>

        {/* cap */}
        <rect x="72" y="0" width="56" height="16" rx="3" fill="var(--bg-4)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>

        {/* shine */}
        <path d="M55 140 Q45 180 55 240" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>

      {/* Overlay numbers */}
      <div style={{
        position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div className="hero-num" style={{ fontSize: 44, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          {(consumed/1000).toFixed(2)}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          of {target/1000}L
        </div>
      </div>
    </div>
  );
}

window.WaterScreen = WaterScreen;

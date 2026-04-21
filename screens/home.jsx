// ————— Home / Today Screen —————
function HomeScreen({ goTo }) {
  const { todayPlan } = window.AppData;
  const { targets, consumed } = todayPlan;
  const kcalRemain = targets.kcal - consumed.kcal;

  return (
    <div style={{ padding: '0 0 120px' }}>
      {/* Header */}
      <div style={{ padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--t-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Friday · Apr 18</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Day 5 · Week 3</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-2)', border: '0.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Icon name="bell" size={18} color="var(--t-2)"/>
            <div style={{ position: 'absolute', top: 10, right: 10, width: 7, height: 7, borderRadius: 999, background: 'var(--amber)' }}/>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--bg-4), var(--bg-3))', border: '0.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)', fontSize: 13, fontWeight: 600 }}>
            AK
          </div>
        </div>
      </div>

      <CoachGreeting hour={14} name="Alex" pendingMeal={true}/>

      {/* Hero: three-ring + headline numbers */}
      <div style={{ padding: '0 20px 16px' }}>
        <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <TripleRing size={150} data={[
              { value: consumed.kcal, target: targets.kcal, color: 'var(--lime)' },
              { value: consumed.protein, target: targets.protein, color: 'var(--aqua)' },
              { value: consumed.water, target: targets.water, color: 'var(--violet)' },
            ]}/>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--lime)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Calories</div>
                <div style={{ display: 'baseline', display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="hero-num" style={{ fontSize: 30 }}>{consumed.kcal}</span>
                  <span style={{ fontSize: 12, color: 'var(--t-3)' }}>/ {targets.kcal}</span>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--aqua)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Protein</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="hero-num" style={{ fontSize: 24 }}>{consumed.protein}</span>
                  <span style={{ fontSize: 11, color: 'var(--t-3)' }}>/ {targets.protein}g</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--violet)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Water</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="hero-num" style={{ fontSize: 24 }}>{(consumed.water/1000).toFixed(1)}</span>
                  <span style={{ fontSize: 11, color: 'var(--t-3)' }}>/ {targets.water/1000}L</span>
                </div>
              </div>
            </div>
          </div>
          {/* kcal remaining banner */}
          <div style={{
            marginTop: 16, paddingTop: 14, borderTop: '0.5px solid var(--line)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--t-2)',
          }}>
            <span><span className="hero-num" style={{ fontSize: 18, color: 'var(--t-1)' }}>{kcalRemain}</span> kcal remaining</span>
            <span style={{ color: 'var(--amber)' }}>500 kcal behind schedule</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '0 20px 16px', display: 'flex', gap: 10 }}>
        <QuickAction icon="plus"     label="Log food"   onClick={() => goTo('food')} color="var(--lime)"/>
        <QuickAction icon="drop"     label="+250ml"      onClick={() => goTo('water')} color="var(--aqua)"/>
        <QuickAction icon="play"     label="Workout"    onClick={() => goTo('workout')} color="var(--amber)"/>
        <QuickAction icon="upload"   label="New plan"   onClick={() => goTo('upload')} color="var(--violet)"/>
      </div>

      {/* Meal timeline */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div>
            <div className="label">Today's plan</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>5 meals · from Dr. Mehta</div>
          </div>
          <button style={{ fontSize: 12, color: 'var(--lime)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
            Week view →
          </button>
        </div>
        {todayPlan.meals.map(m => <MealRow key={m.id} meal={m}/>)}
      </div>

      {/* Workout card */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div className="label" style={{ marginBottom: 10 }}>Tonight</div>
        <div className="card" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: 'var(--amber-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--amber)',
          }}>
            <Icon name="dumbbell" size={26}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{todayPlan.workout.title}</div>
            <div style={{ fontSize: 12, color: 'var(--t-3)', marginTop: 2 }}>
              {todayPlan.workout.exercises.length} exercises · ~{todayPlan.workout.duration} min · 18:00
            </div>
          </div>
          <button className="btn btn-lime" style={{ padding: '10px 14px', fontSize: 13 }} onClick={() => goTo('workout')}>
            Start
          </button>
        </div>
      </div>

      {/* Streak / adherence */}
      <div style={{ padding: '8px 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="card" style={{ padding: 14 }}>
            <div className="label" style={{ marginBottom: 8 }}>Streak</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <Icon name="flame" size={20} color="var(--amber)"/>
              <span className="hero-num" style={{ fontSize: 28 }}>14</span>
              <span style={{ fontSize: 11, color: 'var(--t-3)' }}>days</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--t-3)', marginTop: 6 }}>Don't break it.</div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div className="label" style={{ marginBottom: 8 }}>Weight</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="hero-num" style={{ fontSize: 28 }}>80.6</span>
              <span style={{ fontSize: 11, color: 'var(--t-3)' }}>kg</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--lime)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Icon name="trend" size={11} strokeWidth={2}/> −3.6 kg this quarter
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, border: 'none', cursor: 'pointer',
      background: 'var(--bg-2)', border: '0.5px solid var(--line)',
      borderRadius: 16, padding: '12px 6px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      color: 'var(--t-1)', fontFamily: 'inherit',
    }}>
      <Icon name={icon} size={20} color={color} strokeWidth={2}/>
      <span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '-0.01em' }}>{label}</span>
    </button>
  );
}

window.HomeScreen = HomeScreen;

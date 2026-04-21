
// ===== ios-frame.jsx =====

// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({ dark = false, time = '9:41' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      display: 'flex', gap: 154, alignItems: 'center', justifyContent: 'center',
      padding: '21px 24px 19px', boxSizing: 'border-box',
      position: 'relative', zIndex: 20, width: '100%',
    }}>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 1.5 }}>
        <span style={{
          fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590,
          fontSize: 17, lineHeight: '22px', color: c,
        }}>{time}</span>
      </div>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, paddingTop: 1, paddingRight: 1 }}>
        <svg width="19" height="12" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c}/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c}/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c}/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c}/>
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c}/>
          <circle cx="8.5" cy="10.5" r="1.5" fill={c}/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c}/>
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({ children, dark = false, style = {} }) {
  return (
    <div style={{
      height: 44, minWidth: 44, borderRadius: 9999,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: dark
        ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)'
        : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style,
    }}>
      {/* blur + tint */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)',
      }} />
      {/* shine */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({ title = 'Title', dark = false, trailingIcon = true }) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = (content) => (
    <IOSGlassPill dark={dark}>
      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </div>
    </IOSGlassPill>
  );
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      paddingTop: 62, paddingBottom: 10, position: 'relative', zIndex: 5,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        {/* back chevron */}
        {pillIcon(
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ marginLeft: -1 }}>
            <path d="M10 2L2 10l8 8" stroke={muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {/* trailing ellipsis */}
        {trailingIcon && pillIcon(
          <svg width="22" height="6" viewBox="0 0 22 6">
            <circle cx="3" cy="3" r="2.5" fill={muted}/>
            <circle cx="11" cy="3" r="2.5" fill={muted}/>
            <circle cx="19" cy="3" r="2.5" fill={muted}/>
          </svg>
        )}
      </div>
      {/* large title */}
      <div style={{
        padding: '0 16px',
        fontFamily: '-apple-system, system-ui',
        fontSize: 34, fontWeight: 700, lineHeight: '41px',
        color: text, letterSpacing: 0.4,
      }}>{title}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({ title, detail, icon, chevron = true, isLast = false, dark = false }) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', minHeight: 52,
      padding: '0 16px', position: 'relative',
      fontFamily: '-apple-system, system-ui', fontSize: 17,
      letterSpacing: -0.43,
    }}>
      {icon && (
        <div style={{
          width: 30, height: 30, borderRadius: 7, background: icon,
          marginRight: 12, flexShrink: 0,
        }} />
      )}
      <div style={{ flex: 1, color: text }}>{title}</div>
      {detail && <span style={{ color: sec, marginRight: 6 }}>{detail}</span>}
      {chevron && (
        <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink: 0 }}>
          <path d="M1 1l6 6-6 6" stroke={ter} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {!isLast && (
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          left: icon ? 58 : 16, height: 0.5, background: sep,
        }} />
      )}
    </div>
  );
}

function IOSList({ header, children, dark = false }) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return (
    <div>
      {header && (
        <div style={{
          fontFamily: '-apple-system, system-ui', fontSize: 13,
          color: hc, textTransform: 'uppercase',
          padding: '8px 36px 6px', letterSpacing: -0.08,
        }}>{header}</div>
      )}
      <div style={{
        background: bg, borderRadius: 26,
        margin: '0 16px', overflow: 'hidden',
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children, width = 402, height = 874, dark = false,
  title, keyboard = false,
}) {
  return (
    <div style={{
      width, height, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
      }} />
      {/* status bar (absolute) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar dark={dark} />
      </div>
      {/* nav + content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {title !== undefined && <IOSNavBar title={title} dark={dark} />}
        <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
        {keyboard && <IOSKeyboard dark={dark} />}
      </div>
      {/* home indicator — always on top */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 139, height: 5, borderRadius: 100,
          background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({ dark = false }) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: <svg width="19" height="17" viewBox="0 0 19 17"><path d="M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z" fill={glyph}/></svg>,
    del: <svg width="23" height="17" viewBox="0 0 23 17"><path d="M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z" fill="none" stroke={glyph} strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 5l7 7M17 5l-7 7" stroke={glyph} strokeWidth="1.6" strokeLinecap="round"/></svg>,
    ret: <svg width="20" height="14" viewBox="0 0 20 14"><path d="M18 1v6H4m0 0l4-4M4 7l4 4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };

  const key = (content, { w, flex, ret, fs = 25, k } = {}) => (
    <div key={k} style={{
      height: 42, borderRadius: 8.5,
      flex: flex ? 1 : undefined, width: w, minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs, fontWeight: 458, color: ret ? '#fff' : glyph,
    }}>{content}</div>
  );

  const row = (keys, pad = 0) => (
    <div style={{ display: 'flex', gap: 6.5, justifyContent: 'center', padding: `0 ${pad}px` }}>
      {keys.map(l => key(l, { flex: true, k: l }))}
    </div>
  );

  return (
    <div style={{
      position: 'relative', zIndex: 15, borderRadius: 27, overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: dark
        ? '0 -2px 20px rgba(0,0,0,0.09)'
        : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)',
    }}>
      {/* liquid glass bg — same recipe as nav pills */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
        pointerEvents: 'none',
      }} />

      {/* autocorrect bar */}
      <div style={{
        display: 'flex', gap: 20, alignItems: 'center',
        padding: '8px 22px 13px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {['"The"', 'the', 'to'].map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 25, background: '#ccc', opacity: 0.3 }} />}
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: '-apple-system, system-ui', fontSize: 17,
              color: sugg, letterSpacing: -0.43, lineHeight: '22px',
            }}>{w}</div>
          </React.Fragment>
        ))}
      </div>

      {/* key layout */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 13,
        padding: '0 6.5px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {row(['q','w','e','r','t','y','u','i','o','p'])}
        {row(['a','s','d','f','g','h','j','k','l'], 20)}
        <div style={{ display: 'flex', gap: 14.25, alignItems: 'center' }}>
          {key(icons.shift, { w: 45, k: 'shift' })}
          <div style={{ display: 'flex', gap: 6.5, flex: 1 }}>
            {['z','x','c','v','b','n','m'].map(l => key(l, { flex: true, k: l }))}
          </div>
          {key(icons.del, { w: 45, k: 'del' })}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {key('ABC', { w: 92.25, fs: 18, k: 'abc' })}
          {key('', { flex: true, k: 'space' })}
          {key(icons.ret, { w: 92.25, ret: true, k: 'ret' })}
        </div>
      </div>

      {/* bottom spacer (emoji+mic area, icons omitted) */}
      <div style={{ height: 56, width: '100%', position: 'relative' }} />
    </div>
  );
}

Object.assign(window, {
  IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard,
});


// ===== components/icons.jsx =====
// Shared icon set — minimal stroked icons
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.75 }) => {
  const s = { width: size, height: size, stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z"/></>,
    flame: <><path d="M12 2.5c1.5 2.5 4.5 4 4.5 7.5 0 1.5-.5 2.5-1 3.5 2 .5 3.5 2.5 3.5 5 0 3.5-3 6-7 6s-7-2.5-7-6c0-2.5 1.5-4 3-5-.5-1-.5-2 0-3 1 1 2 1 2.5.5-.5-1.5 0-3 1-4 0 1 1 2 2 2-.5-2 .5-4.5-1.5-6.5z"/></>,
    drop: <><path d="M12 2.5c-3 4-6 7.5-6 11.5a6 6 0 0012 0c0-4-3-7.5-6-11.5z"/></>,
    dumbbell: <><path d="M3 9v6M7 6v12M17 6v12M21 9v6M7 12h10"/></>,
    plate: <><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    bell: <><path d="M6 8a6 6 0 0112 0c0 4 1.5 5 2.5 6.5H3.5C4.5 13 6 12 6 8zM10 19a2 2 0 004 0"/></>,
    camera: <><path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.5"/></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></>,
    barcode: <><path d="M3 6v12M6 6v12M9 6v12M12 6v12M15 6v12M18 6v12M21 6v12" strokeWidth="1.2"/></>,
    search: <><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/></>,
    check: <><path d="M4 12l5 5L20 6"/></>,
    checkCircle: <><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></>,
    x: <><path d="M6 6l12 12M6 18L18 6"/></>,
    play: <><path d="M7 4v16l13-8z" fill={color}/></>,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    chevronR: <><path d="M9 6l6 6-6 6"/></>,
    chevronL: <><path d="M15 6l-6 6 6 6"/></>,
    chevronD: <><path d="M6 9l6 6 6-6"/></>,
    chevronU: <><path d="M6 15l6-6 6 6"/></>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2 2M17.8 17.8l2 2M2 12h3M19 12h3M4.2 19.8l2-2M17.8 6.2l2-2"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8"/></>,
    timer: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/></>,
    zap: <><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></>,
    heart: <><path d="M12 21s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11z"/></>,
    trophy: <><path d="M6 4h12v3a6 6 0 01-12 0V4zM6 4H3v2a3 3 0 003 3M18 4h3v2a3 3 0 01-3 3M10 16h4M12 13v3M8 20h8"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    trend: <><path d="M3 17l6-6 4 4 8-9M14 6h7v7"/></>,
    list: <><path d="M3 6h18M3 12h18M3 18h18" strokeWidth="1.5"/></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4" strokeWidth="1.3"/></>,
    file: <><path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8l-5-5zM14 3v5h5"/></>,
    image: <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M5 17l5-5 4 4 3-3 2 2"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></>,
    alert: <><path d="M12 3l10 17H2L12 3zM12 10v5M12 18v.01"/></>,
    repeat: <><path d="M17 3l4 4-4 4M3 11V9a4 4 0 014-4h14M7 21l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/></>,
    moon: <><path d="M20 14A8 8 0 1110 4a7 7 0 0010 10z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></>,
    external: <><path d="M18 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h6M15 3h6v6M10 14L21 3"/></>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{paths[name]}</svg>;
};

window.Icon = Icon;


// ===== components/data.jsx =====
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


// ===== components/shared.jsx =====
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


// ===== components/extras.jsx =====
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


// ===== screens/home.jsx =====
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


// ===== screens/food.jsx =====
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


// ===== screens/water.jsx =====
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


// ===== screens/workout.jsx =====
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


// ===== screens/upload.jsx =====
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


// ===== screens/metrics.jsx =====
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


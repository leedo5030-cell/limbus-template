import { useState } from "react";

const sins = ["분노", "색욕", "나태", "탐식", "우울", "오만", "질투"];
const attackTypes = ["참격", "관통", "타격"];
const defenseTypes = ["방어", "회피", "강화방어", "반격", "합 가능 반격"];

const sinColors = {
  분노: "#c0392b", 색욕: "#8e44ad", 나태: "#e67e22",
  탐식: "#27ae60", 우울: "#2980b9", 오만: "#d4a017", 질투: "#16a085",
};

// SVG 아이콘 컴포넌트들
function SinIcon({ sin, size = 22 }) {
  const color = sinColors[sin];
  const icons = {
    분노: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <ellipse cx="16" cy="18" rx="9" ry="11" fill={color} opacity="0.9"/>
        <path d="M10 14 Q16 4 22 14" fill={color}/>
        <path d="M13 10 Q16 6 19 10" fill={color} opacity="0.7"/>
        <ellipse cx="16" cy="19" rx="5" ry="7" fill={color} opacity="0.4"/>
      </svg>
    ),
    색욕: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 6 Q10 2 6 8 Q2 14 8 18 L16 26 L24 18 Q30 14 26 8 Q22 2 16 6Z" fill={color} opacity="0.85"/>
        <path d="M16 10 Q12 7 10 11 Q8 15 12 17 L16 21 L20 17 Q24 15 22 11 Q20 7 16 10Z" fill={color} opacity="0.4"/>
      </svg>
    ),
    나태: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <rect x="5" y="9" width="22" height="14" rx="3" fill={color} opacity="0.85"/>
        <rect x="9" y="13" width="6" height="6" rx="1" fill={color} opacity="0.4"/>
        <rect x="17" y="13" width="6" height="6" rx="1" fill={color} opacity="0.4"/>
        <path d="M8 9 L8 6 Q16 4 24 6 L24 9" fill={color} opacity="0.6"/>
      </svg>
    ),
    탐식: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 4 L20 12 L28 13 L22 19 L24 27 L16 23 L8 27 L10 19 L4 13 L12 12 Z" fill={color} opacity="0.85"/>
        <path d="M16 9 L18 14 L23 15 L19 19 L20 24 L16 22 L12 24 L13 19 L9 15 L14 14 Z" fill={color} opacity="0.35"/>
      </svg>
    ),
    우울: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 4 Q22 4 26 10 Q30 16 26 22 Q22 28 16 28 Q13 28 10 26" fill="none" stroke={color} strokeWidth="3" opacity="0.9"/>
        <path d="M8 8 Q6 12 7 17 Q8 22 12 26" fill="none" stroke={color} strokeWidth="2.5" opacity="0.7"/>
        <circle cx="16" cy="16" r="3" fill={color} opacity="0.5"/>
      </svg>
    ),
    오만: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 3 L18.5 10.5 L26.5 10.5 L20 15.5 L22.5 23 L16 18 L9.5 23 L12 15.5 L5.5 10.5 L13.5 10.5 Z" fill={color} opacity="0.9"/>
        <path d="M16 7 L17.5 12 L22.5 12 L18.5 15 L20 20 L16 17.5 L12 20 L13.5 15 L9.5 12 L14.5 12 Z" fill={color} opacity="0.3"/>
      </svg>
    ),
    질투: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <polygon points="16,4 19,12 28,12 21,18 24,27 16,21 8,27 11,18 4,12 13,12" fill={color} opacity="0.85" transform="rotate(15,16,16)"/>
        <circle cx="16" cy="16" r="5" fill={color} opacity="0.3"/>
        <polygon points="16,9 17.5,13.5 22,13.5 18.5,16.5 20,21 16,18.5 12,21 13.5,16.5 10,13.5 14.5,13.5" fill={color} opacity="0.5"/>
      </svg>
    ),
  };
  return icons[sin] || null;
}

function AttackIcon({ type, size = 20, color = "#c8a070" }) {
  const icons = {
    참격: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M6 26 Q14 10 26 6" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M6 26 Q8 18 14 16" stroke={color} strokeWidth="2" fill="none" opacity="0.5"/>
      </svg>
    ),
    관통: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <ellipse cx="16" cy="16" rx="11" ry="6" fill="none" stroke={color} strokeWidth="2.5"/>
        <ellipse cx="16" cy="16" rx="5" ry="3" fill={color} opacity="0.6"/>
        <line x1="4" y1="16" x2="28" y2="16" stroke={color} strokeWidth="2.5"/>
      </svg>
    ),
    타격: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M10 26 L16 8 L22 26" fill={color} opacity="0.9"/>
        <path d="M12 20 L20 20" stroke={color} strokeWidth="1.5" opacity="0.5"/>
        <path d="M14 14 L18 8 L22 14" fill={color} opacity="0.5"/>
      </svg>
    ),
  };
  return icons[type] || null;
}

function DefenseIcon({ type, size = 20, color = "#c8a070" }) {
  const icons = {
    방어: (
      // 방패 with 십자
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 4 L26 8 L26 18 Q26 26 16 29 Q6 26 6 18 L6 8 Z" fill={color} opacity="0.8"/>
        <line x1="16" y1="6" x2="16" y2="27" stroke="#0e0e0e" strokeWidth="2.5"/>
        <line x1="7" y1="16" x2="25" y2="16" stroke="#0e0e0e" strokeWidth="2.5"/>
      </svg>
    ),
    회피: (
      // 방패 + 검 겹침
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M14 5 L23 9 L23 18 Q23 24 14 27 Q5 24 5 18 L5 9 Z" fill={color} opacity="0.75"/>
        <line x1="18" y1="4" x2="27" y2="27" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="21" y1="4" x2="24" y2="10" stroke="#0e0e0e" strokeWidth="1.5"/>
      </svg>
    ),
    강화방어: (
      // 더블 방패
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 3 L28 7 L28 19 Q28 27 16 30 Q4 27 4 19 L4 7 Z" fill={color} opacity="0.6"/>
        <path d="M16 7 L24 10 L24 19 Q24 25 16 27 Q8 25 8 19 L8 10 Z" fill={color} opacity="0.85"/>
        <line x1="16" y1="9" x2="16" y2="25" stroke="#0e0e0e" strokeWidth="2"/>
        <line x1="9" y1="17" x2="23" y2="17" stroke="#0e0e0e" strokeWidth="2"/>
      </svg>
    ),
    반격: (
      // 화살표 반격
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M22 6 A11 11 0 1 0 26 16" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <path d="M20 3 L26 7 L21 12" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "합 가능 반격": (
      // 반격 + 작은 +
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M19 6 A10 10 0 1 0 24 15" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M17 3 L23 6 L19 11" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="25" y1="20" x2="25" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="21" y1="24" x2="29" y2="24" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type] || null;
}

// 키워드 아이콘 SVG (이미지 6 기준)
function KeywordIcon({ kw, size = 28 }) {
  const kwIcons = {
    화상: { color: "#e74c3c", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 4 Q12 10 14 14 Q10 12 11 18 Q8 16 10 22 Q12 28 20 28 Q27 26 27 19 Q27 13 22 12 Q24 8 20 6 Q18 14 16 12 Q18 8 16 4Z" fill="#e74c3c"/>
        <path d="M14 20 Q15 17 18 18 Q20 22 17 24 Q13 23 14 20Z" fill="#ff8c00" opacity="0.7"/>
      </svg>
    )},
    출혈: { color: "#c0392b", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <circle cx="16" cy="12" r="6" fill="#c0392b"/>
        <path d="M10 14 Q8 20 10 24 Q13 28 16 28 Q19 28 22 24 Q24 20 22 14" fill="#c0392b"/>
        <ellipse cx="16" cy="13" rx="3" ry="4" fill="#ff6b6b" opacity="0.4"/>
      </svg>
    )},
    진동: { color: "#f39c12", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <ellipse cx="16" cy="16" rx="10" ry="10" fill="none" stroke="#f39c12" strokeWidth="2.5"/>
        <ellipse cx="16" cy="16" rx="6" ry="6" fill="none" stroke="#f39c12" strokeWidth="2"/>
        <ellipse cx="16" cy="16" rx="2.5" ry="2.5" fill="#f39c12"/>
        <line x1="16" y1="4" x2="16" y2="7" stroke="#f39c12" strokeWidth="2"/>
        <line x1="16" y1="25" x2="16" y2="28" stroke="#f39c12" strokeWidth="2"/>
        <line x1="4" y1="16" x2="7" y2="16" stroke="#f39c12" strokeWidth="2"/>
        <line x1="25" y1="16" x2="28" y2="16" stroke="#f39c12" strokeWidth="2"/>
      </svg>
    )},
    파열: { color: "#27ae60", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 4 L20 13 L28 11 L22 18 L28 24 L19 22 L18 30 L13 23 L6 27 L9 19 L3 14 L11 14 Z" fill="#27ae60" opacity="0.85"/>
      </svg>
    )},
    침잠: { color: "#2980b9", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M6 10 Q10 6 16 6 Q22 6 26 10 L28 20 Q24 28 16 28 Q8 28 4 20 Z" fill="#2980b9" opacity="0.8"/>
        <path d="M10 14 Q13 11 16 14 Q19 17 22 14" fill="none" stroke="#5dade2" strokeWidth="1.5"/>
        <path d="M10 19 Q13 16 16 19 Q19 22 22 19" fill="none" stroke="#5dade2" strokeWidth="1.5"/>
      </svg>
    )},
    호흡: { color: "#8e44ad", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 26 Q10 22 8 16 Q6 10 10 7 Q13 5 16 8 Q19 5 22 7 Q26 10 24 16 Q22 22 16 26Z" fill="#8e44ad" opacity="0.8"/>
        <path d="M16 22 Q12 18 11 14 Q10 10 13 9 Q16 12 16 12 Q16 12 19 9 Q22 10 21 14 Q20 18 16 22Z" fill="#8e44ad" opacity="0.4"/>
      </svg>
    )},
    충전: { color: "#f1c40f", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M18 4 L10 17 L16 17 L14 28 L22 15 L16 15 Z" fill="#f1c40f"/>
      </svg>
    )},
    공위증: { color: "#16a085", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M16 4 L28 8 L28 20 Q28 28 16 30 Q4 28 4 20 L4 8 Z" fill="#16a085" opacity="0.7"/>
        <path d="M12 14 L16 10 L20 14 L18 14 L18 22 L14 22 L14 14 Z" fill="#1abc9c"/>
      </svg>
    )},
    참격: { color: "#c8a070", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M6 26 Q14 10 26 6" stroke="#c8a070" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M6 26 Q8 18 14 16" stroke="#c8a070" strokeWidth="2" fill="none" opacity="0.5"/>
      </svg>
    )},
    관통: { color: "#c8a070", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <ellipse cx="16" cy="16" rx="11" ry="6" fill="none" stroke="#c8a070" strokeWidth="2.5"/>
        <ellipse cx="16" cy="16" rx="5" ry="3" fill="#c8a070" opacity="0.6"/>
        <line x1="4" y1="16" x2="28" y2="16" stroke="#c8a070" strokeWidth="2.5"/>
      </svg>
    )},
    타격: { color: "#c8a070", icon: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <path d="M10 26 L16 8 L22 26" fill="#c8a070" opacity="0.9"/>
        <path d="M12 20 L20 20" stroke="#c8a070" strokeWidth="1.5" opacity="0.5"/>
        <path d="M14 14 L18 8 L22 14" fill="#c8a070" opacity="0.5"/>
      </svg>
    )},
  };
  const entry = kwIcons[kw];
  return entry ? entry.icon : null;
}

// 아이콘 버튼 선택 컴포넌트 (sin / attack / defense type)
function IconPicker({ options, value, onChange, renderIcon, renderLabel, columns }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {options.map(opt => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "3px",
              padding: "6px 8px",
              background: selected ? "rgba(200,164,21,0.12)" : "rgba(255,255,255,0.02)",
              border: selected ? "1px solid #c8a41588" : "1px solid #2a2a2a",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.15s",
              minWidth: "44px",
              outline: "none",
            }}
          >
            {renderIcon(opt)}
            <span style={{
              fontSize: "10px",
              color: selected ? "#c8a415" : "#555",
              fontFamily: "'Malgun Gothic','Apple SD Gothic Neo',sans-serif",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}>{renderLabel ? renderLabel(opt) : opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function CoinRow({ count, onAdd, onRemove }) {
  const btnStyle = (disabled) => ({
    width: "24px", height: "24px",
    background: disabled ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: disabled ? "#444" : "#aaa",
    borderRadius: "4px",
    cursor: disabled ? "default" : "pointer",
    fontSize: "14px",
    display: "flex", alignItems: "center", justifyContent: "center",
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
      <button onClick={onRemove} disabled={count <= 1} style={btnStyle(count <= 1)}>−</button>
      <div style={{ display: "flex", gap: "4px", minHeight: "18px", alignItems: "center", flexWrap: "wrap", maxWidth: "160px" }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} style={{
            width: "13px", height: "13px", borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #ffe082, #c8a415)",
            boxShadow: "0 0 5px rgba(200,164,21,0.5)",
          }} />
        ))}
      </div>
      <button onClick={onAdd} disabled={count >= 9} style={btnStyle(count >= 9)}>+</button>
      <span style={{ fontSize: "11px", color: "#444", fontFamily: "monospace" }}>{count}/9</span>
    </div>
  );
}

const PRESET_KEYWORDS = ["화상", "출혈", "진동", "파열", "침잠", "호흡", "충전", "공위증", "참격", "관통", "타격"];

function SkillGroupBlock({ groupIndex, group, onChange, onAddSub, onRemoveSub }) {
  const groupNum = groupIndex + 1;

  return (
    <div style={{ marginBottom: "16px" }}>
      {group.subs.map((sub, subIdx) => {
        const label = subIdx === 0 ? `${groupNum}스킬` : `${groupNum}-${subIdx + 1}`;
        const color = sinColors[sub.sin];
        return (
          <div key={subIdx} style={{
            position: "relative",
            border: `1px solid ${color}44`,
            borderLeft: `3px solid ${color}`,
            borderRadius: "6px",
            padding: "14px 16px",
            background: `linear-gradient(105deg, ${color}0a 0%, transparent 60%)`,
            marginBottom: "6px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{
                fontSize: "10px", letterSpacing: "3px", color, marginBottom: "10px",
                fontFamily: "'Courier New', monospace", opacity: 0.85,
              }}>{label}</div>
              {subIdx > 0 && (
                <button onClick={() => onRemoveSub(subIdx)} style={{
                  background: "none", border: "none", color: "#555",
                  cursor: "pointer", fontSize: "16px", lineHeight: 1, padding: "0 2px",
                }} title="삭제">×</button>
              )}
            </div>

            {/* 죄악 속성 선택 */}
            <div style={{ marginBottom: "10px" }}>
              <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#444", marginBottom: "6px", fontFamily: "monospace" }}>죄악 속성</div>
              <IconPicker
                options={sins}
                value={sub.sin}
                onChange={val => onChange(subIdx, { ...sub, sin: val })}
                renderIcon={s => <SinIcon sin={s} size={22} />}
              />
            </div>

            {/* 공격 유형 선택 */}
            <div>
              <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#444", marginBottom: "6px", fontFamily: "monospace" }}>공격 유형</div>
              <IconPicker
                options={attackTypes}
                value={sub.attack}
                onChange={val => onChange(subIdx, { ...sub, attack: val })}
                renderIcon={t => <AttackIcon type={t} size={22} />}
              />
            </div>

            <CoinRow
              count={sub.coins}
              onAdd={() => onChange(subIdx, { ...sub, coins: Math.min(9, sub.coins + 1) })}
              onRemove={() => onChange(subIdx, { ...sub, coins: Math.max(1, sub.coins - 1) })}
            />
          </div>
        );
      })}

      <button
        onClick={onAddSub}
        style={{
          width: "100%", padding: "7px",
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed #2e2e2e",
          borderRadius: "5px", color: "#555",
          fontSize: "12px", cursor: "pointer",
          letterSpacing: "2px",
          fontFamily: "'Courier New', monospace",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.target.style.borderColor = "#444"; e.target.style.color = "#888"; }}
        onMouseLeave={e => { e.target.style.borderColor = "#2e2e2e"; e.target.style.color = "#555"; }}
      >
        + {groupNum}-{group.subs.length + 1} 스킬 추가
      </button>
    </div>
  );
}

function DefenseCard({ defense, onChange }) {
  const isCounter = defense.type === "반격" || defense.type === "합 가능 반격";
  const color = sinColors[defense.sin];

  return (
    <div style={{
      border: `1px solid ${color}44`,
      borderLeft: `3px solid ${color}`,
      borderRadius: "6px",
      padding: "14px 16px",
      background: `linear-gradient(105deg, ${color}0a 0%, transparent 60%)`,
      marginBottom: "6px",
    }}>
      <div style={{ fontSize: "10px", letterSpacing: "3px", color, marginBottom: "10px", fontFamily: "'Courier New', monospace", opacity: 0.85 }}>방어 스킬</div>

      {/* 죄악 속성 */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#444", marginBottom: "6px", fontFamily: "monospace" }}>죄악 속성</div>
        <IconPicker
          options={sins}
          value={defense.sin}
          onChange={val => onChange({ ...defense, sin: val })}
          renderIcon={s => <SinIcon sin={s} size={22} />}
        />
      </div>

      {/* 방어 유형 */}
      <div style={{ marginBottom: "2px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#444", marginBottom: "6px", fontFamily: "monospace" }}>방어 유형</div>
        <IconPicker
          options={defenseTypes}
          value={defense.type}
          onChange={val => {
            const coins = (val === "방어" || val === "회피" || val === "강화방어") ? 1 : defense.coins;
            onChange({ ...defense, type: val, coins });
          }}
          renderIcon={t => <DefenseIcon type={t} size={22} />}
        />
      </div>

      {/* 반격 공격 유형 */}
      {isCounter && (
        <div style={{ marginTop: "10px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#444", marginBottom: "6px", fontFamily: "monospace" }}>공격 유형</div>
          <IconPicker
            options={attackTypes}
            value={defense.attack}
            onChange={val => onChange({ ...defense, attack: val })}
            renderIcon={t => <AttackIcon type={t} size={22} />}
          />
        </div>
      )}

      {isCounter ? (
        <CoinRow
          count={defense.coins}
          onAdd={() => onChange({ ...defense, coins: Math.min(9, defense.coins + 1) })}
          onRemove={() => onChange({ ...defense, coins: Math.max(1, defense.coins - 1) })}
        />
      ) : (
        <div style={{ display: "flex", gap: "4px", marginTop: "10px" }}>
          <div style={{ width: "13px", height: "13px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffe082, #c8a415)", boxShadow: "0 0 5px rgba(200,164,21,0.5)" }} />
        </div>
      )}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #2a2a2a, transparent)" }} />
      <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#555", fontFamily: "'Courier New', monospace" }}>{label}</div>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, #2a2a2a, transparent)" }} />
    </div>
  );
}

const newSub = () => ({ sin: "분노", attack: "참격", coins: 1 });

export default function LimbusTemplate() {
  const [name, setName] = useState("");
  const [groups, setGroups] = useState([
    { subs: [newSub()] },
    { subs: [newSub()] },
    { subs: [newSub()] },
  ]);
  const [defense, setDefense] = useState({ sin: "분노", type: "방어", attack: "참격", coins: 1 });
  const [keywords, setKeywords] = useState([]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [preview, setPreview] = useState(false);

  const toggleKeyword = (kw) =>
    setKeywords(prev => prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]);

  const addCustom = () => {
    const t = customKeyword.trim();
    if (t && !keywords.includes(t)) setKeywords(prev => [...prev, t]);
    setCustomKeyword("");
  };

  const updateSub = (gIdx, sIdx, updated) => {
    setGroups(groups.map((gr, i) => i !== gIdx ? gr : {
      ...gr, subs: gr.subs.map((s, j) => j !== sIdx ? s : updated)
    }));
  };

  const addSub = (gIdx) => {
    setGroups(groups.map((gr, i) => i !== gIdx ? gr : { ...gr, subs: [...gr.subs, newSub()] }));
  };

  const removeSub = (gIdx, sIdx) => {
    setGroups(groups.map((gr, i) => i !== gIdx ? gr : { ...gr, subs: gr.subs.filter((_, j) => j !== sIdx) }));
  };

  const isCounter = defense.type === "반격" || defense.type === "합 가능 반격";

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", color: "#e0d6c8", fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        input:focus { outline: none; }
        button:focus { outline: none; }
      `}</style>

      {/* 헤더 */}
      <div style={{ borderBottom: "1px solid #1e1e1e", padding: "18px 32px", background: "#0a0a0a", display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ width: "34px", height: "34px", border: "1px solid #c8a41540", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8a415", fontSize: "15px" }}>◈</div>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#555", fontFamily: "'Courier New', monospace" }}>LIMBUS COMPANY</div>
          <div style={{ fontSize: "18px", letterSpacing: "2px", color: "#e0d6c8", marginTop: "1px" }}>인격 예측 템플릿</div>
        </div>
      </div>

      <div style={{ maxWidth: "660px", margin: "0 auto", padding: "28px 20px" }}>

        {/* 인격 이름 */}
        <div style={{ marginBottom: "26px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#555", marginBottom: "8px", fontFamily: "'Courier New', monospace" }}>IDENTITY NAME</div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="인격 이름을 입력하세요"
            style={{
              width: "100%", background: "transparent", border: "none",
              borderBottom: "1px solid #2a2a2a", color: "#e0d6c8",
              fontSize: "21px", padding: "6px 0", letterSpacing: "1px",
              fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
            }}
            onFocus={e => e.target.style.borderBottomColor = "#c8a415"}
            onBlur={e => e.target.style.borderBottomColor = "#2a2a2a"}
          />
        </div>

        <Divider label="SKILLS" />

        {groups.map((group, gIdx) => (
          <SkillGroupBlock
            key={gIdx}
            groupIndex={gIdx}
            group={group}
            onChange={(sIdx, updated) => updateSub(gIdx, sIdx, updated)}
            onAddSub={() => addSub(gIdx)}
            onRemoveSub={(sIdx) => removeSub(gIdx, sIdx)}
          />
        ))}

        <Divider label="DEFENSE" />

        <DefenseCard defense={defense} onChange={setDefense} />

        <Divider label="KEYWORDS" />

        {/* 프리셋 키워드 — 아이콘 버튼 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          {PRESET_KEYWORDS.map(kw => {
            const active = keywords.includes(kw);
            const iconEl = <KeywordIcon kw={kw} size={26} />;
            return (
              <button
                key={kw}
                onClick={() => toggleKeyword(kw)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                  padding: "8px 10px",
                  background: active ? "rgba(200,164,21,0.12)" : "rgba(255,255,255,0.02)",
                  border: active ? "1px solid #c8a41580" : "1px solid #2a2a2a",
                  borderRadius: "8px", cursor: "pointer", transition: "all 0.15s",
                  minWidth: "50px",
                }}
              >
                {iconEl}
                <span style={{ fontSize: "10px", color: active ? "#c8a415" : "#555", fontFamily: "'Malgun Gothic','Apple SD Gothic Neo',sans-serif" }}>{kw}</span>
              </button>
            );
          })}
        </div>

        {/* 커스텀 키워드 태그 */}
        {keywords.filter(k => !PRESET_KEYWORDS.includes(k)).length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
            {keywords.filter(k => !PRESET_KEYWORDS.includes(k)).map(kw => (
              <div key={kw} style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "4px 10px", borderRadius: "20px",
                border: "1px solid #c8a41566", background: "rgba(200,164,21,0.1)",
                color: "#c8a415", fontSize: "12px",
              }}>
                <span>{kw}</span>
                <span onClick={() => setKeywords(p => p.filter(k => k !== kw))}
                  style={{ cursor: "pointer", color: "#c8a41577", fontSize: "15px", lineHeight: 1 }}>×</span>
              </div>
            ))}
          </div>
        )}

        {/* 직접 입력 */}
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            value={customKeyword}
            onChange={e => setCustomKeyword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addCustom()}
            placeholder="Ex) 신속, 공렙증, 방렙증, 공위증..."
            style={{
              flex: 1, background: "rgba(255,255,255,0.02)",
              border: "1px solid #2a2a2a", borderRadius: "6px",
              color: "#e0d6c8", padding: "8px 12px", fontSize: "13px",
              fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
            }}
            onFocus={e => e.target.style.borderColor = "#444"}
            onBlur={e => e.target.style.borderColor = "#2a2a2a"}
          />
          <button onClick={addCustom} style={{
            padding: "8px 14px", background: "rgba(255,255,255,0.03)",
            border: "1px solid #2e2e2e", color: "#666", borderRadius: "6px",
            cursor: "pointer", fontSize: "13px", fontFamily: "'Courier New', monospace",
          }}>추가</button>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={() => setPreview(p => !p)}
          style={{
            marginTop: "24px", width: "100%", padding: "12px",
            background: preview ? "transparent" : "rgba(200,164,21,0.08)",
            border: `1px solid ${preview ? "#2a2a2a" : "#c8a41555"}`,
            color: preview ? "#555" : "#c8a415",
            borderRadius: "6px", fontSize: "12px", letterSpacing: "3px",
            cursor: "pointer", fontFamily: "'Courier New', monospace", transition: "all 0.3s",
          }}
        >{preview ? "◀  편집으로 돌아가기" : "확인  ▶"}</button>

        {/* 프리뷰 */}
        {preview && (
          <div style={{ marginTop: "24px", border: "1px solid #222", borderRadius: "8px", overflow: "hidden", animation: "fadeUp 0.3s ease" }}>
            <div style={{ background: "#0f0f0f", padding: "13px 18px", borderBottom: "1px solid #1e1e1e", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ color: "#c8a415", fontSize: "11px" }}>◈</div>
              <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#444", fontFamily: "'Courier New', monospace" }}>IDENTITY PREVIEW</div>
            </div>
            <div style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: "19px", letterSpacing: "2px", marginBottom: "18px", color: "#e0d6c8" }}>{name || "—"}</div>

              {groups.map((group, gIdx) =>
                group.subs.map((sub, sIdx) => {
                  const label = sIdx === 0 ? `${gIdx + 1}스킬` : `${gIdx + 1}-${sIdx + 1}`;
                  const color = sinColors[sub.sin];
                  return (
                    <div key={`${gIdx}-${sIdx}`} style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      marginBottom: "8px", padding: "7px 11px",
                      background: `${color}07`, borderLeft: `2px solid ${color}`, borderRadius: "4px",
                    }}>
                      <span style={{ color: "#555", fontSize: "11px", fontFamily: "monospace", minWidth: "36px" }}>{label}</span>
                      <SinIcon sin={sub.sin} size={16} />
                      <span style={{ color, fontSize: "12px" }}>{sub.sin}</span>
                      <span style={{ color: "#333" }}>·</span>
                      <AttackIcon type={sub.attack} size={16} />
                      <span style={{ color: "#888", fontSize: "12px" }}>{sub.attack}</span>
                      <span style={{ color: "#333" }}>·</span>
                      <div style={{ display: "flex", gap: "3px" }}>
                        {Array.from({ length: sub.coins }, (_, j) => (
                          <div key={j} style={{ width: "9px", height: "9px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffe082, #c8a415)" }} />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}

              {/* 방어 */}
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                marginBottom: "14px", padding: "7px 11px",
                background: `${sinColors[defense.sin]}07`, borderLeft: `2px solid ${sinColors[defense.sin]}`, borderRadius: "4px",
              }}>
                <span style={{ color: "#555", fontSize: "11px", fontFamily: "monospace", minWidth: "36px" }}>방어</span>
                <SinIcon sin={defense.sin} size={16} />
                <span style={{ color: sinColors[defense.sin], fontSize: "12px" }}>{defense.sin}</span>
                <span style={{ color: "#333" }}>·</span>
                <DefenseIcon type={defense.type} size={16} />
                <span style={{ color: "#888", fontSize: "12px" }}>{defense.type}</span>
                {isCounter && <>
                  <span style={{ color: "#333" }}>·</span>
                  <AttackIcon type={defense.attack} size={16} />
                  <span style={{ color: "#888", fontSize: "12px" }}>{defense.attack}</span>
                  <span style={{ color: "#333" }}>·</span>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {Array.from({ length: defense.coins }, (_, j) => (
                      <div key={j} style={{ width: "9px", height: "9px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffe082, #c8a415)" }} />
                    ))}
                  </div>
                </>}
                {!isCounter && <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffe082, #c8a415)" }} />}
              </div>

              {/* 키워드 */}
              {keywords.length > 0 && (
                <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "4px", border: "1px solid #1e1e1e" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#444", marginBottom: "8px", fontFamily: "monospace" }}>KEYWORDS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {keywords.map(kw => (
                      <div key={kw} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "20px", border: "1px solid #c8a41533", background: "rgba(200,164,21,0.07)" }}>
                        <KeywordIcon kw={kw} size={14} />
                        <span style={{ color: "#c8a415aa", fontSize: "12px" }}>{kw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

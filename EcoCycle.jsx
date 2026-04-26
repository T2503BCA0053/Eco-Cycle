import { useState, useEffect } from "react";

const SCREENS = {
  SPLASH: "splash",
  LOGIN: "login",
  HOME: "home",
  DISPOSE: "dispose",
  NEARBY: "nearby",
  PICKUP: "pickup",
  REWARDS: "rewards",
  PROFILE: "profile",
};

const COLORS = {
  green: "#2DC653",
  greenDark: "#1A9E3F",
  greenDeep: "#0B5E22",
  bg: "#0B1E2D",
  card: "#0F2535",
  cardHover: "#162D40",
  white: "#FFFFFF",
  offWhite: "#E8F5EA",
  grey: "#7A9BAE",
  amber: "#FFB703",
  red: "#EF233C",
  teal: "#00B4D8",
};

// ── Splash Screen ─────────────────────────────────────────────────────────────
function SplashScreen({ onNext }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2200);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div style={{
      ...styles.screen,
      background: "linear-gradient(160deg, #0A2E14 0%, #1A5E30 50%, #0B3D1A 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 20, position: "relative", overflow: "hidden",
    }}>
      {/* Decorative circles */}
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          borderRadius: "50%",
          border: `1px solid rgba(45,198,83,${0.06 + i * 0.04})`,
          width: 200 + i * 90, height: 200 + i * 90,
          animation: `pulse ${2.5 + i * 0.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }} />
      ))}

      {/* Logo */}
      <div style={{
        fontSize: 72, animation: "fadeInScale 0.8s ease-out",
        filter: "drop-shadow(0 0 24px rgba(45,198,83,0.5))",
      }}>♻️</div>

      <div style={{
        textAlign: "center", animation: "fadeInUp 0.9s ease-out 0.3s both",
      }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: COLORS.green, fontFamily: "'Georgia', serif", letterSpacing: -1 }}>
          EcoCycle
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 6, letterSpacing: 2, textTransform: "uppercase", fontFamily: "Trebuchet MS" }}>
          Recycle Today, Save Tomorrow
        </div>
      </div>

      <div style={{
        marginTop: 40, display: "flex", gap: 6,
        animation: "fadeIn 1s ease-out 1.5s both",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: i === 1 ? 20 : 6, height: 6, borderRadius: 3,
            background: i === 1 ? COLORS.green : "rgba(255,255,255,0.25)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div style={{ ...styles.screen, background: "#F0FAF2", display: "flex", flexDirection: "column" }}>
      {/* Green header arc */}
      <div style={{
        background: "linear-gradient(135deg, #1A5E30, #2DC653)",
        height: 200, borderRadius: "0 0 50% 50% / 0 0 40px 40px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end",
        paddingBottom: 28, gap: 4,
        boxShadow: "0 8px 32px rgba(45,198,83,0.3)",
      }}>
        <div style={{ fontSize: 42 }}>♻️</div>
        <div style={{ color: COLORS.white, fontSize: 22, fontWeight: 800, fontFamily: "Georgia" }}>EcoCycle</div>
      </div>

      <div style={{ flex: 1, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Tab */}
        <div style={{ display: "flex", background: "#E0EFE3", borderRadius: 12, padding: 4 }}>
          {["login", "signup"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px 0", border: "none", borderRadius: 10, cursor: "pointer",
              background: tab === t ? COLORS.white : "transparent",
              color: tab === t ? COLORS.greenDark : COLORS.grey,
              fontWeight: tab === t ? 700 : 500, fontSize: 15,
              boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s", fontFamily: "Trebuchet MS",
            }}>
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Fields */}
        {["Email or Phone", "Password"].map((ph, i) => (
          <div key={i}>
            <div style={{ fontSize: 12, color: COLORS.grey, marginBottom: 6, fontWeight: 600, letterSpacing: 0.5 }}>{ph.toUpperCase()}</div>
            <input
              placeholder={ph}
              type={i === 1 ? "password" : "text"}
              value={i === 0 ? email : pass}
              onChange={e => i === 0 ? setEmail(e.target.value) : setPass(e.target.value)}
              style={{
                width: "100%", padding: "13px 16px", border: "1.5px solid #D0E8D5",
                borderRadius: 12, fontSize: 15, outline: "none", boxSizing: "border-box",
                background: COLORS.white, color: "#1A202C", fontFamily: "Trebuchet MS",
                transition: "border-color 0.2s",
              }}
            />
          </div>
        ))}

        <button onClick={handleLogin} style={{
          ...styles.btnGreen,
          opacity: loading ? 0.8 : 1,
          marginTop: 4,
        }}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#D0E8D5" }} />
          <span style={{ color: COLORS.grey, fontSize: 13 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#D0E8D5" }} />
        </div>

        <button onClick={handleLogin} style={{
          ...styles.btnOutline,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <span style={{ fontSize: 18 }}>🌐</span>
          Login with Google
        </button>

        <div style={{ textAlign: "center", color: COLORS.grey, fontSize: 13, marginTop: 4 }}>
          Don't have an account?{" "}
          <span onClick={() => setTab("signup")} style={{ color: COLORS.greenDark, fontWeight: 700, cursor: "pointer" }}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

// ── Home Dashboard ────────────────────────────────────────────────────────────
function HomeScreen({ navigate }) {
  const cards = [
    { icon: "♻️", label: "Dispose E-Waste", screen: SCREENS.DISPOSE, color: COLORS.green, bg: "#0A2E14" },
    { icon: "📍", label: "Nearby Centers",  screen: SCREENS.NEARBY,  color: COLORS.teal,  bg: "#0A2030" },
    { icon: "🚚", label: "Request Pickup",  screen: SCREENS.PICKUP,  color: COLORS.amber, bg: "#2A1A00" },
    { icon: "🎁", label: "Earn Rewards",    screen: SCREENS.REWARDS, color: "#FF6B6B",    bg: "#2A0A10" },
  ];

  return (
    <div style={{ ...styles.screen, background: COLORS.bg, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0A2E14, #1A5E30)",
        padding: "20px 20px 28px",
        borderRadius: "0 0 28px 28px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Good Morning 👋</div>
            <div style={{ color: COLORS.white, fontSize: 20, fontWeight: 800, fontFamily: "Georgia" }}>Welcome, Alex!</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>😊</div>
        </div>

        {/* Points card */}
        <div style={{
          background: "rgba(255,255,255,0.1)", borderRadius: 16, padding: "16px 20px",
          border: "1px solid rgba(45,198,83,0.3)", display: "flex", justifyContent: "space-between", alignItems: "center",
          backdropFilter: "blur(10px)",
        }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 4 }}>♻️ Total Points</div>
            <div style={{ color: COLORS.green, fontSize: 30, fontWeight: 900, fontFamily: "Georgia" }}>850</div>
            <div style={{ color: COLORS.offWhite, fontSize: 11, marginTop: 2 }}>🏆 Level: Green Recycler</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 4 }}>Items Recycled</div>
            <div style={{ color: COLORS.amber, fontSize: 26, fontWeight: 800 }}>15</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>this month</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ color: COLORS.white, fontSize: 16, fontWeight: 700, marginBottom: 14, fontFamily: "Georgia" }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {cards.map((c, i) => (
            <button key={i} onClick={() => navigate(c.screen)} style={{
              background: c.bg, border: `1.5px solid ${c.color}30`,
              borderRadius: 18, padding: "20px 16px", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: 10, textAlign: "left",
              transition: "all 0.2s", boxShadow: `0 4px 16px ${c.color}15`,
            }}>
              <div style={{ fontSize: 30 }}>{c.icon}</div>
              <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{c.label}</div>
              <div style={{ color: c.color, fontSize: 11, fontWeight: 600 }}>Tap to open →</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ padding: "20px 16px 80px" }}>
        <div style={{ color: COLORS.white, fontSize: 16, fontWeight: 700, marginBottom: 14, fontFamily: "Georgia" }}>Recent Activity</div>
        {[
          { icon: "📱", name: "iPhone 11",      pts: "+50", time: "2 days ago",  color: COLORS.green },
          { icon: "💻", name: "Dell Laptop",    pts: "+120", time: "1 week ago", color: COLORS.teal  },
          { icon: "🔋", name: "Li-ion Battery", pts: "+30", time: "2 weeks ago", color: COLORS.amber },
        ].map((a, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 14, padding: "14px 16px",
            marginBottom: 10, display: "flex", alignItems: "center", gap: 14,
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ fontSize: 24 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>{a.name}</div>
              <div style={{ color: COLORS.grey, fontSize: 12, marginTop: 2 }}>Recycled • {a.time}</div>
            </div>
            <div style={{ color: a.color, fontSize: 16, fontWeight: 800 }}>{a.pts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dispose Screen ────────────────────────────────────────────────────────────
function DisposeScreen({ navigate }) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1);

  const devices = [
    { icon: "📱", label: "Mobile", pts: 50  },
    { icon: "💻", label: "Laptop", pts: 120 },
    { icon: "🔋", label: "Battery", pts: 30 },
    { icon: "📺", label: "TV / Monitor", pts: 90 },
    { icon: "🖨️", label: "Printer", pts: 60 },
    { icon: "⌚", label: "Smartwatch", pts: 40 },
  ];

  return (
    <div style={{ ...styles.screen, background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Dispose E-Waste" subtitle="Select your device" onBack={() => navigate(SCREENS.HOME)} />

      <div style={{ flex: 1, padding: "16px", overflowY: "auto", paddingBottom: 80 }}>
        {step === 1 ? (
          <>
            <div style={{ color: COLORS.grey, fontSize: 13, marginBottom: 16 }}>
              Select the type of device you want to recycle
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {devices.map((d, i) => (
                <button key={i} onClick={() => setSelected(i)} style={{
                  background: selected === i ? "#0A2E14" : COLORS.card,
                  border: selected === i ? `2px solid ${COLORS.green}` : "1.5px solid rgba(255,255,255,0.07)",
                  borderRadius: 16, padding: "16px 8px", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 28 }}>{d.icon}</div>
                  <div style={{ color: COLORS.white, fontSize: 11, fontWeight: 600, textAlign: "center" }}>{d.label}</div>
                  <div style={{ color: COLORS.green, fontSize: 10, fontWeight: 700 }}>+{d.pts} pts</div>
                </button>
              ))}
            </div>

            {selected !== null && (
              <button onClick={() => setStep(2)} style={{ ...styles.btnGreen, marginTop: 20 }}>
                Continue with {devices[selected].label} →
              </button>
            )}
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              background: "#0A2E14", border: `1.5px solid ${COLORS.green}40`,
              borderRadius: 18, padding: 20,
            }}>
              <div style={{ color: COLORS.green, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>♻️ Recycling Method</div>
              {[
                { icon: "✅", text: "Safe Recycling Process — certified e-waste facility" },
                { icon: "🔬", text: "Toxic materials extracted safely (Pb, Hg, Cd)" },
                { icon: "💰", text: `Earn ${devices[selected].pts} points + ₹${devices[selected].pts * 2} cash` },
              ].map((r, i) => (
                <div key={i} style={{ color: COLORS.offWhite, fontSize: 13, marginBottom: 10, display: "flex", gap: 10 }}>
                  <span>{r.icon}</span> <span>{r.text}</span>
                </div>
              ))}
            </div>

            <div style={{ background: COLORS.card, borderRadius: 18, padding: 20, border: "1.5px solid rgba(255,255,255,0.07)" }}>
              <div style={{ color: COLORS.white, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>📸 Upload Photo (Optional)</div>
              <div style={{
                border: `2px dashed ${COLORS.green}50`, borderRadius: 14, padding: "28px 20px",
                textAlign: "center", color: COLORS.grey, fontSize: 13,
              }}>
                📷 Tap to upload device photo<br />
                <span style={{ fontSize: 11, color: COLORS.green }}>AI will verify the device type</span>
              </div>
            </div>

            <button onClick={() => { setStep(1); setSelected(null); navigate(SCREENS.NEARBY); }} style={styles.btnGreen}>
              Find Nearby Drop Centers →
            </button>
            <button onClick={() => { setStep(1); setSelected(null); navigate(SCREENS.PICKUP); }} style={styles.btnOutline}>
              Schedule Home Pickup 🚚
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Nearby Screen ─────────────────────────────────────────────────────────────
function NearbyScreen({ navigate }) {
  const centers = [
    { name: "GreenTech Recycling", dist: "1.2 km", status: "Open", rating: "4.8", icon: "♻️", color: COLORS.green },
    { name: "Eco Recycle Hub",     dist: "2.5 km", status: "Open", rating: "4.5", icon: "🏭", color: COLORS.teal  },
    { name: "Smart E-Bin Station", dist: "3.1 km", status: "Closed", rating: "4.6", icon: "🗑️", color: COLORS.amber },
    { name: "CleanEarth Center",   dist: "4.0 km", status: "Open", rating: "4.7", icon: "🌿", color: COLORS.green },
  ];

  return (
    <div style={{ ...styles.screen, background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Nearby Centers" subtitle="Collection points near you" onBack={() => navigate(SCREENS.HOME)} />

      {/* Map placeholder */}
      <div style={{
        margin: "12px 16px 0", height: 165, borderRadius: 20,
        background: "linear-gradient(135deg, #0D2B14, #1A4A20)",
        border: "1.5px solid rgba(45,198,83,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 8, position: "relative", overflow: "hidden",
      }}>
        {/* Grid lines */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ position: "absolute", top: `${i * 25}%`, left: 0, right: 0, height: 1, background: "rgba(45,198,83,0.08)" }} />
        ))}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ position: "absolute", left: `${i * 25}%`, top: 0, bottom: 0, width: 1, background: "rgba(45,198,83,0.08)" }} />
        ))}
        <div style={{ fontSize: 32, filter: "drop-shadow(0 0 12px rgba(45,198,83,0.5))" }}>🗺️</div>
        <div style={{ color: COLORS.green, fontSize: 13, fontWeight: 600 }}>Google Maps Integration</div>
        <div style={{ color: COLORS.grey, fontSize: 11 }}>4 centers found nearby</div>
        {/* Pins */}
        {[{ x: "25%", y: "35%" }, { x: "55%", y: "55%" }, { x: "70%", y: "30%" }].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", left: pos.x, top: pos.y,
            color: i === 0 ? COLORS.green : COLORS.red, fontSize: 18,
            transform: "translate(-50%,-50%)", cursor: "pointer",
          }}>📍</div>
        ))}
      </div>

      <div style={{ flex: 1, padding: "14px 16px", overflowY: "auto", paddingBottom: 80, display: "flex", flexDirection: "column", gap: 10 }}>
        {centers.map((c, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 18, padding: "16px",
            border: "1.5px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, fontSize: 22,
              background: `${c.color}20`, display: "flex", alignItems: "center", justifyContent: "center",
              border: `1.5px solid ${c.color}40`, flexShrink: 0,
            }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 700 }}>{c.name}</div>
              <div style={{ color: COLORS.grey, fontSize: 12, marginTop: 3, display: "flex", gap: 10 }}>
                <span>📍 {c.dist}</span>
                <span>⭐ {c.rating}</span>
                <span style={{ color: c.status === "Open" ? COLORS.green : COLORS.red, fontWeight: 600 }}>
                  {c.status === "Open" ? "● Open" : "○ Closed"}
                </span>
              </div>
            </div>
            <button style={{
              background: c.status === "Open" ? COLORS.green : "rgba(255,255,255,0.1)",
              color: c.status === "Open" ? COLORS.bg : COLORS.grey,
              border: "none", borderRadius: 10, padding: "8px 12px",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>
              {c.status === "Open" ? "Directions" : "Closed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Pickup Screen ─────────────────────────────────────────────────────────────
function PickupScreen({ navigate }) {
  const [addr, setAddr] = useState("123 Main Street, City");
  const [slot, setSlot] = useState("10:00 AM - 12:00 PM");
  const [confirmed, setConfirmed] = useState(false);

  const slots = ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "4:00 PM - 6:00 PM"];

  return (
    <div style={{ ...styles.screen, background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Request Pickup" subtitle="Schedule home collection" onBack={() => navigate(SCREENS.HOME)} />

      <div style={{ flex: 1, padding: "16px", overflowY: "auto", paddingBottom: 80 }}>
        {!confirmed ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <Label>Your Address</Label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>📍</span>
                <input value={addr} onChange={e => setAddr(e.target.value)} style={{
                  ...styles.input, paddingLeft: 42,
                }} />
              </div>
            </div>

            <div>
              <Label>Select Time Slot</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {slots.map((s, i) => (
                  <button key={i} onClick={() => setSlot(s)} style={{
                    background: slot === s ? "#0A2E14" : COLORS.card,
                    border: slot === s ? `2px solid ${COLORS.green}` : "1.5px solid rgba(255,255,255,0.07)",
                    borderRadius: 14, padding: "14px 16px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    transition: "all 0.2s",
                  }}>
                    <span style={{ color: COLORS.white, fontSize: 14 }}>🕐 {s}</span>
                    {slot === s && <span style={{ color: COLORS.green, fontSize: 18 }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: COLORS.card, borderRadius: 18, padding: 16, border: "1.5px solid rgba(255,255,255,0.07)" }}>
              <Label>Device to Pickup</Label>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                {["📱 Mobile", "💻 Laptop", "🔋 Battery"].map((d, i) => (
                  <div key={i} style={{
                    background: "#0A2E14", border: `1px solid ${COLORS.green}40`,
                    borderRadius: 10, padding: "8px 12px", color: COLORS.white, fontSize: 12,
                  }}>{d}</div>
                ))}
              </div>
            </div>

            <button onClick={() => setConfirmed(true)} style={styles.btnGreen}>
              🚚 Confirm Pickup
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 72 }}>🚚</div>
            <div style={{
              background: "#0A2E14", border: `2px solid ${COLORS.green}`,
              borderRadius: 24, padding: "24px 28px", width: "100%",
            }}>
              <div style={{ color: COLORS.green, fontSize: 22, fontWeight: 800, marginBottom: 8, fontFamily: "Georgia" }}>
                Pickup Confirmed! ✅
              </div>
              <div style={{ color: COLORS.offWhite, fontSize: 14, marginBottom: 16 }}>Your pickup has been scheduled</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Address", val: addr },
                  { label: "Time Slot", val: slot },
                  { label: "Tracking ID", val: "ECO-2024-8821" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    <span style={{ color: COLORS.grey, fontSize: 13 }}>{r.label}</span>
                    <span style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => { setConfirmed(false); navigate(SCREENS.HOME); }} style={styles.btnGreen}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Rewards Screen ────────────────────────────────────────────────────────────
function RewardsScreen({ navigate }) {
  const [tab, setTab] = useState("points");

  const leaders = [
    { name: "Priya S.",    pts: 1240, icon: "👑", color: COLORS.amber },
    { name: "Rahul M.",    pts: 980,  icon: "🥈", color: COLORS.grey  },
    { name: "Alex Johnson",pts: 850,  icon: "🥉", color: "#CD7F32"   },
    { name: "Neha K.",     pts: 720,  icon: "4",  color: COLORS.teal  },
    { name: "Amit P.",     pts: 610,  icon: "5",  color: COLORS.teal  },
  ];

  const coupons = [
    { brand: "Amazon", discount: "10% off", pts: 200, icon: "🛍️" },
    { brand: "Flipkart", discount: "₹150 off", pts: 300, icon: "📦" },
    { brand: "Paytm Cash", discount: "₹50 cash", pts: 150, icon: "💸" },
    { brand: "Swiggy", discount: "Free delivery", pts: 100, icon: "🍔" },
  ];

  return (
    <div style={{ ...styles.screen, background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Rewards" subtitle="Your recycling rewards" onBack={() => navigate(SCREENS.HOME)} />

      {/* Points banner */}
      <div style={{
        margin: "12px 16px 0",
        background: "linear-gradient(135deg, #0A2E14, #1A5E30)",
        borderRadius: 20, padding: "20px", border: `1.5px solid ${COLORS.green}40`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Available Points</div>
          <div style={{ color: COLORS.green, fontSize: 36, fontWeight: 900, fontFamily: "Georgia" }}>850</div>
          <div style={{ color: COLORS.offWhite, fontSize: 11, marginTop: 2 }}>🏆 Green Recycler</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 42 }}>🎁</div>
          <div style={{ color: COLORS.amber, fontSize: 13, fontWeight: 700 }}>15 items recycled</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", margin: "14px 16px 0", background: COLORS.card, borderRadius: 12, padding: 4 }}>
        {[{ k: "points", l: "Redeem" }, { k: "leaderboard", l: "Leaderboard" }].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            flex: 1, padding: "9px 0", border: "none", borderRadius: 10, cursor: "pointer",
            background: tab === t.k ? COLORS.green : "transparent",
            color: tab === t.k ? COLORS.bg : COLORS.grey,
            fontWeight: tab === t.k ? 700 : 500, fontSize: 14, transition: "all 0.2s",
          }}>{t.l}</button>
        ))}
      </div>

      <div style={{ flex: 1, padding: "14px 16px", overflowY: "auto", paddingBottom: 80, display: "flex", flexDirection: "column", gap: 10 }}>
        {tab === "points" ? coupons.map((c, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 18, padding: 16,
            border: "1.5px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ fontSize: 30 }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 700 }}>{c.brand}</div>
              <div style={{ color: COLORS.green, fontSize: 12, marginTop: 2 }}>{c.discount}</div>
            </div>
            <button style={{
              background: "#0A2E14", border: `1.5px solid ${COLORS.green}`,
              borderRadius: 10, padding: "8px 12px", cursor: "pointer",
              color: COLORS.green, fontSize: 12, fontWeight: 700,
            }}>
              {c.pts} pts
            </button>
          </div>
        )) : leaders.map((l, i) => (
          <div key={i} style={{
            background: i === 2 ? "#0A2E14" : COLORS.card,
            borderRadius: 18, padding: 16,
            border: i === 2 ? `1.5px solid ${COLORS.green}50` : "1.5px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ fontSize: 24, width: 32, textAlign: "center" }}>{l.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: i === 2 ? COLORS.green : COLORS.white, fontSize: 14, fontWeight: i === 2 ? 800 : 600 }}>
                {l.name} {i === 2 && "(You)"}
              </div>
            </div>
            <div style={{ color: l.color, fontSize: 15, fontWeight: 800 }}>{l.pts} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Profile Screen ────────────────────────────────────────────────────────────
function ProfileScreen({ navigate }) {
  const stats = [
    { label: "Recycled", val: "15", unit: "items", icon: "♻️", color: COLORS.green },
    { label: "Earned",   val: "850", unit: "points", icon: "⭐", color: COLORS.amber },
    { label: "Saved",    val: "₹1,700", unit: "cash", icon: "💰", color: COLORS.teal },
  ];
  const menu = [
    { icon: "📋", label: "My Recycling History", color: COLORS.green },
    { icon: "🎁", label: "My Rewards",           color: COLORS.amber },
    { icon: "🗺️", label: "Saved Centers",        color: COLORS.teal  },
    { icon: "🔔", label: "Notifications",        color: "#FF6B6B"   },
    { icon: "⚙️", label: "Settings",             color: COLORS.grey  },
  ];

  return (
    <div style={{ ...styles.screen, background: COLORS.bg, display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Profile" subtitle="Your account" onBack={() => navigate(SCREENS.HOME)} />

      {/* Avatar section */}
      <div style={{
        padding: "20px 20px 24px",
        background: "linear-gradient(135deg, #0A2E14, #0F2535)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, #2DC653, #1A9E3F)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36, border: `3px solid ${COLORS.green}`,
          boxShadow: `0 0 20px ${COLORS.green}40`,
        }}>😊</div>
        <div style={{ color: COLORS.white, fontSize: 20, fontWeight: 800, fontFamily: "Georgia" }}>Alex Johnson</div>
        <div style={{ color: COLORS.green, fontSize: 12, fontWeight: 600, background: "#0A2E14", padding: "4px 14px", borderRadius: 20, border: `1px solid ${COLORS.green}40` }}>
          🏆 Green Recycler
        </div>
      </div>

      {/* Stats */}
      <div style={{ margin: "12px 16px 0", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {stats.map((st, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 16, padding: "14px 10px", textAlign: "center",
            border: `1.5px solid ${st.color}25`,
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{st.icon}</div>
            <div style={{ color: st.color, fontSize: 18, fontWeight: 800, fontFamily: "Georgia" }}>{st.val}</div>
            <div style={{ color: COLORS.grey, fontSize: 10, marginTop: 2 }}>{st.unit}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div style={{ flex: 1, padding: "14px 16px", overflowY: "auto", paddingBottom: 80, display: "flex", flexDirection: "column", gap: 8 }}>
        {menu.map((m, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 16, padding: "16px",
            display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
            border: "1.5px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ fontSize: 22, width: 32, textAlign: "center" }}>{m.icon}</div>
            <div style={{ flex: 1, color: COLORS.white, fontSize: 14, fontWeight: 600 }}>{m.label}</div>
            <div style={{ color: COLORS.grey, fontSize: 18 }}>›</div>
          </div>
        ))}

        <button onClick={() => navigate(SCREENS.LOGIN)} style={{
          ...styles.btnOutline, marginTop: 10, borderColor: COLORS.red + "60", color: COLORS.red,
        }}>
          🚪 Log Out
        </button>
      </div>
    </div>
  );
}

// ── Shared Components ─────────────────────────────────────────────────────────
function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <div style={{
      padding: "16px 16px 14px",
      background: "linear-gradient(135deg, #0A2E14, #0F2535)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <button onClick={onBack} style={{
        background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10,
        width: 36, height: 36, cursor: "pointer", color: COLORS.white, fontSize: 18, flexShrink: 0,
      }}>←</button>
      <div>
        <div style={{ color: COLORS.white, fontSize: 18, fontWeight: 800, fontFamily: "Georgia" }}>{title}</div>
        {subtitle && <div style={{ color: COLORS.grey, fontSize: 12, marginTop: 1 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ color: COLORS.grey, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 8, textTransform: "uppercase" }}>{children}</div>;
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────
function BottomNav({ current, navigate }) {
  const items = [
    { icon: "🏠", label: "Home",    screen: SCREENS.HOME    },
    { icon: "♻️", label: "Dispose", screen: SCREENS.DISPOSE },
    { icon: "📍", label: "Centers", screen: SCREENS.NEARBY  },
    { icon: "🎁", label: "Rewards", screen: SCREENS.REWARDS },
    { icon: "👤", label: "Profile", screen: SCREENS.PROFILE },
  ];

  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: "rgba(11,30,45,0.97)", backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(45,198,83,0.15)",
      display: "flex", padding: "8px 0 10px", zIndex: 100,
    }}>
      {items.map(it => (
        <button key={it.screen} onClick={() => navigate(it.screen)} style={{
          flex: 1, background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 0",
        }}>
          <div style={{
            fontSize: current === it.screen ? 22 : 19,
            filter: current === it.screen ? `drop-shadow(0 0 6px ${COLORS.green})` : "none",
            transition: "all 0.2s",
          }}>{it.icon}</div>
          <div style={{
            color: current === it.screen ? COLORS.green : COLORS.grey,
            fontSize: 10, fontWeight: current === it.screen ? 700 : 500,
          }}>{it.label}</div>
        </button>
      ))}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  screen: { width: "100%", height: "100%", position: "relative", overflow: "hidden" },
  btnGreen: {
    width: "100%", padding: "16px", border: "none", borderRadius: 16, cursor: "pointer",
    background: "linear-gradient(135deg, #2DC653, #1A9E3F)",
    color: "#0B1E2D", fontSize: 16, fontWeight: 800, fontFamily: "Trebuchet MS",
    boxShadow: "0 4px 20px rgba(45,198,83,0.35)", transition: "all 0.2s",
  },
  btnOutline: {
    width: "100%", padding: "14px", border: `1.5px solid ${COLORS.green}60`, borderRadius: 16, cursor: "pointer",
    background: "transparent", color: COLORS.green, fontSize: 15, fontWeight: 700, fontFamily: "Trebuchet MS",
    transition: "all 0.2s",
  },
  input: {
    width: "100%", padding: "13px 16px", border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: 14, fontSize: 14, outline: "none", boxSizing: "border-box",
    background: COLORS.card, color: COLORS.white, fontFamily: "Trebuchet MS",
  },
};

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState(SCREENS.SPLASH);

  const showNav = ![SCREENS.SPLASH, SCREENS.LOGIN].includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.SPLASH:   return <SplashScreen onNext={() => setScreen(SCREENS.LOGIN)} />;
      case SCREENS.LOGIN:    return <LoginScreen onLogin={() => setScreen(SCREENS.HOME)} />;
      case SCREENS.HOME:     return <HomeScreen navigate={setScreen} />;
      case SCREENS.DISPOSE:  return <DisposeScreen navigate={setScreen} />;
      case SCREENS.NEARBY:   return <NearbyScreen navigate={setScreen} />;
      case SCREENS.PICKUP:   return <PickupScreen navigate={setScreen} />;
      case SCREENS.REWARDS:  return <RewardsScreen navigate={setScreen} />;
      case SCREENS.PROFILE:  return <ProfileScreen navigate={setScreen} />;
      default: return null;
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>

      {/* Phone frame */}
      <div style={{
        minHeight: "100vh", background: "#050F15",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Trebuchet MS', sans-serif", padding: "20px",
      }}>
        {/* App label */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-block",
            background: "#0F2535",
            border: "2px solid rgba(45,198,83,0.25)",
            borderRadius: 48, padding: "6px 20px 6px 6px",
            marginBottom: 16, display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              background: COLORS.green, borderRadius: 20, padding: "4px 12px",
              color: "#0B1E2D", fontSize: 12, fontWeight: 800,
            }}>LIVE</div>
            <span style={{ color: COLORS.grey, fontSize: 13 }}>EcoCycle App Prototype</span>
          </div>

          {/* Phone */}
          <div style={{
            width: 375, height: 700,
            background: "#000",
            borderRadius: 48,
            padding: "14px 8px",
            border: "8px solid #1A2A35",
            boxShadow: "0 0 60px rgba(45,198,83,0.15), 0 30px 80px rgba(0,0,0,0.6)",
            position: "relative",
          }}>
            {/* Notch */}
            <div style={{
              position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
              width: 100, height: 22, background: "#000", borderRadius: 12, zIndex: 200,
            }} />
            {/* Screen */}
            <div style={{
              width: "100%", height: "100%", borderRadius: 40,
              overflow: "hidden", position: "relative", background: COLORS.bg,
            }}>
              {renderScreen()}
              {showNav && <BottomNav current={screen} navigate={setScreen} />}
            </div>
          </div>

          {/* Screen label */}
          <div style={{ color: COLORS.grey, fontSize: 12, marginTop: 16, textTransform: "uppercase", letterSpacing: 2 }}>
            {screen.replace(/_/g, " ")} SCREEN
          </div>
        </div>
      </div>
    </>
  );
}

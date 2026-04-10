export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#060e20",
        fontFamily: "Inter, sans-serif",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          display: inline-block;
          line-height: 1;
          user-select: none;
        }
        .glass-panel {
          background: rgba(34, 42, 61, 0.4);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(208, 188, 255, 0.1);
        }
        .hero-gradient {
          background: radial-gradient(circle at 50% 50%, rgba(118, 69, 224, 0.15) 0%, rgba(11, 19, 38, 0) 70%);
        }
        .nav-link { color: #94a3b8; text-decoration: none; font-family: Manrope, sans-serif; font-weight: 600; transition: color 0.2s; }
        .nav-link:hover { color: white; }
        .nav-link-active { color: #d0bcff; border-bottom: 2px solid #d0bcff; padding-bottom: 4px; text-decoration: none; font-family: Manrope, sans-serif; font-weight: 600; }
        .footer-link { color: #64748b; text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .footer-link:hover { color: #d0bcff; }
        .btn-primary { background-color: #d0bcff; color: #3c0091; border: none; cursor: pointer; transition: all 0.2s; font-family: Manrope, sans-serif; font-weight: 700; }
        .btn-primary:active { transform: scale(0.95); }
        .btn-secondary { background-color: #2d3449; color: white; border: 1px solid rgba(74,68,85,0.2); cursor: pointer; transition: all 0.2s; font-family: Manrope, sans-serif; font-weight: 700; }
        .btn-secondary:active { transform: scale(0.95); }
        .btn-white { background-color: white; color: #060e20; border: none; cursor: pointer; transition: all 0.2s; font-family: Manrope, sans-serif; font-weight: 800; }
        .btn-white:active { transform: scale(0.95); }
        .btn-dark { background-color: #222a3d; color: white; border: 1px solid rgba(74,68,85,0.3); cursor: pointer; transition: all 0.2s; font-family: Manrope, sans-serif; font-weight: 800; }
        .btn-dark:active { transform: scale(0.95); }
        .feature-card { border-radius: 24px; padding: 32px; border: 1px solid rgba(74,68,85,0.1); }
        .icon-box { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .grayscale-hover { filter: grayscale(1) opacity(0.4); transition: all 0.7s; }
        .grayscale-hover:hover { filter: grayscale(0) opacity(1); }
        .logo-row { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 48px; }
        .logo-item { display: flex; align-items: center; gap: 8px; font-family: Manrope, sans-serif; font-weight: 900; font-size: 24px; color: white; }
        .step-circle { width: 96px; height: 96px; border-radius: 50%; background-color: #2d3449; border: 4px solid #0b1326; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 900; font-family: Manrope, sans-serif; box-shadow: 0 20px 25px rgba(0,0,0,0.4); }
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          backgroundColor: "rgba(11,19,38,0.8)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 16px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "80px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "white",
              textTransform: "uppercase",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            ExcaliColab
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <a href="#" className="nav-link-active">Home</a>
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">Dashboard</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                padding: "8px 12px",
                cursor: "pointer",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              Sign In
            </button>
            <button
              className="btn-primary"
              style={{
                background: "linear-gradient(135deg, #d0bcff, #7645e0)",
                color: "#ece1ff",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div
          style={{
            height: "1px",
            backgroundColor: "#222a3d",
            opacity: 0.2,
          }}
        />
      </nav>

      <main style={{ paddingTop: "80px" }}>

        {/* ── HERO ── */}
        <section
          className="hero-gradient"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxWidth: "896px",
              textAlign: "center",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "4px 16px",
                borderRadius: "9999px",
                backgroundColor: "#222a3d",
                border: "1px solid rgba(74,68,85,0.3)",
                color: "#d0bcff",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin:"8px"
              }}
            >
              Collaborative Canvas v2.0
            </span>

            <h1
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                color: "white",
                lineHeight: 0.9,
                margin: 0,
              }}
            >
              Where teams design
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #d0bcff, #89ceff, #d0bcff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                in real-time.
              </span>
            </h1>

            <p
              style={{
                color: "#ccc3d8",
                fontSize: "18px",
                maxWidth: "640px",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              A canvas for your imagination. Collaborative, fast, and secure.
              Built for high-performance creative engineering.
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                className="btn-primary"
                style={{
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontSize: "18px",
                  boxShadow: "0 0 40px rgba(208,188,255,0.3)",
                }}
              >
                Get Started for Free
              </button>
              <button
                className="btn-secondary"
                style={{
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_circle
                </span>
                Watch Video
              </button>
            </div>
          </div>

          {/* Canvas Preview */}
          <div
            style={{
              marginTop: "64px",
              width: "100%",
              maxWidth: "1152px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "-4px",
                background:
                  "linear-gradient(to right, rgba(208,188,255,0.2), rgba(137,206,255,0.2), rgba(208,188,255,0.2))",
                borderRadius: "16px",
                filter: "blur(16px)",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "relative",
                backgroundColor: "#0b1326",
                borderRadius: "16px",
                border: "1px solid rgba(74,68,85,0.2)",
                overflow: "hidden",
                aspectRatio: "16/9",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  display: "flex",
                  gap: "8px",
                  zIndex: 10,
                }}
              >
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "rgba(255,180,171,0.5)" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "rgba(255,183,132,0.5)" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "rgba(137,206,255,0.5)" }} />
              </div>

              <img
                alt="ExcaliColab Interface"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8, mixBlendMode: "screen" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzwwBdALDtuPrbswIXG0V49MbzN2GHN1avLXIGXUgl9eTRSV2TAdHsJn9RhYiOb8t4rsRZ7rzGurCSU8aaK-aMQ_0NXN5TNRXvQuB4ECPYzp_6WZtm4tyE2c_7sD8S0jzUKophyTajDt3TQtEsTJOFckGwBHA_lpTNnJDny03ui-ge0uH17wzwycsr3KmSNZTfGwNthB1hiSXp9EOcskoztalpNMncFIeQfFexVTD26ZxMofWUvsXkLl_Zjmvbckk6GYq_sbf2GA"
              />

              <div
                style={{
                  position: "absolute",
                  top: "25%",
                  left: "33%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 12px",
                  backgroundColor: "#89ceff",
                  borderRadius: "9999px",
                  borderTopLeftRadius: 0,
                  color: "#00344d",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}>near_me</span>
                Sarah.eth
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "33%",
                  right: "25%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 12px",
                  backgroundColor: "#d0bcff",
                  borderRadius: "9999px",
                  borderTopLeftRadius: 0,
                  color: "#3c0091",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}>near_me</span>
                Marcus_Dev
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section style={{ padding: "96px 0", backgroundColor: "#060e20" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p
              style={{
                textAlign: "center",
                color: "#958da1",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "48px",
              }}
            >
              Trusted by visionary teams at
            </p>
            <div className="logo-row grayscale-hover">
              <div className="logo-item">
                <span className="material-symbols-outlined" style={{ color: "#d0bcff", fontVariationSettings: "'FILL' 1" }}>bolt</span>
                VOLTA
              </div>
              <div className="logo-item">
                <span className="material-symbols-outlined" style={{ color: "#89ceff", fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                ORBIT
              </div>
              <div className="logo-item">
                <span className="material-symbols-outlined" style={{ color: "#ffb784", fontVariationSettings: "'FILL' 1" }}>token</span>
                KRYPTO
              </div>
              <div className="logo-item">
                <span className="material-symbols-outlined" style={{ color: "#ffb4ab", fontVariationSettings: "'FILL' 1" }}>pentagon</span>
                NOVA
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ padding: "128px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ marginBottom: "80px" }}>
              <h2
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(36px, 5vw, 48px)",
                  fontWeight: 900,
                  color: "white",
                  letterSpacing: "-0.03em",
                  marginBottom: "16px",
                }}
              >
                Engineered for <span style={{ color: "#d0bcff" }}>Performance.</span>
              </h2>
              <p style={{ color: "#ccc3d8", fontSize: "18px", maxWidth: "560px" }}>
                Stop fighting your tools. Start building with a platform that scales with your complexity.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "24px",
              }}
            >
              {/* Card 1 */}
              <div
                className="feature-card"
                style={{
                  gridColumn: "span 8",
                  backgroundColor: "#171f33",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, right: 0, padding: "32px", opacity: 0.1 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "120px" }}>groups</span>
                </div>
                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="icon-box" style={{ backgroundColor: "rgba(208,188,255,0.2)", color: "#d0bcff" }}>
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "24px", fontWeight: 700, color: "white", margin: 0 }}>
                    Real-time Collaboration
                  </h3>
                  <p style={{ color: "#ccc3d8", maxWidth: "380px", margin: 0 }}>
                    Synchronize with your team instantly. Zero latency, real-time presence, and persistent sessions.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="feature-card"
                style={{
                  gridColumn: "span 4",
                  backgroundColor: "#222a3d",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="icon-box" style={{ backgroundColor: "rgba(137,206,255,0.2)", color: "#89ceff", marginBottom: "24px" }}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>encrypted</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
                    End-to-End Encryption
                  </h3>
                  <p style={{ color: "#ccc3d8", fontSize: "14px", margin: 0 }}>
                    Your ideas are your own. We use military-grade AES-256 encryption for every canvas.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div
                className="feature-card"
                style={{
                  gridColumn: "span 4",
                  backgroundColor: "#222a3d",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="icon-box" style={{ backgroundColor: "rgba(255,183,132,0.2)", color: "#ffb784", marginBottom: "24px" }}>
                  <span className="material-symbols-outlined">all_out</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
                    Infinite Canvas
                  </h3>
                  <p style={{ color: "#ccc3d8", fontSize: "14px", margin: 0 }}>
                    Never run out of space. Our engine handles millions of objects with smooth 60fps performance.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div
                className="feature-card"
                style={{
                  gridColumn: "span 8",
                  backgroundColor: "#171f33",
                  display: "flex",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <img
                  alt="Export process"
                  style={{ width: "33%", borderRadius: "12px", opacity: 0.5, filter: "grayscale(1)" }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsd7pQQB0YPIqLfJekIzwJNHMJ_PMRZnol2JfwdR5EPXoX4La3edGD19WqyyBXYoT1JoH6txsEOW9ZwUkqwJEhYNQlXUSqTBPmSczlibvZlSsGKEh98oWhf2mz7LpepLdAH_aGLkE8wc7h5MZok1usB1UeAkPue9jgjAvrovHXmQA3S3tbytyZr0fx_JpRtoyg1v7a7Nha8laWBbIkzps56wsezNEOfMWdkLAlmmMQkIltRCrOVphDFPPV9oJgrPUTQKOyrNv97g"
                />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="icon-box" style={{ backgroundColor: "rgba(255,180,171,0.2)", color: "#ffb4ab" }}>
                    <span className="material-symbols-outlined">file_export</span>
                  </div>
                  <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "24px", fontWeight: 700, color: "white", margin: 0 }}>
                    Export to Any Format
                  </h3>
                  <p style={{ color: "#ccc3d8", margin: 0 }}>
                    SVG, PNG, PDF, or Luminal Native. High-fidelity exports that maintain every stroke of your vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: "128px 24px", backgroundColor: "#0b1326" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "96px" }}>
              <h2
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(36px, 5vw, 48px)",
                  fontWeight: 900,
                  color: "white",
                  marginBottom: "24px",
                }}
              >
                Simple, yet <span style={{ color: "#89ceff" }}>Powerful.</span>
              </h2>
              <p style={{ color: "#ccc3d8", fontSize: "18px" }}>
                Three steps to transform your team&apos;s workflow.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "64px", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "48px",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: "linear-gradient(to right, rgba(208,188,255,0.2), rgba(137,206,255,0.2), rgba(208,188,255,0.2))",
                }}
              />

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px" }}>
                <div className="step-circle" style={{ color: "#d0bcff" }}>1</div>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "24px", fontWeight: 700, color: "white", margin: 0 }}>Create Space</h3>
                <p style={{ color: "#ccc3d8", margin: 0 }}>Spin up a new project in seconds. No complex setup or server configurations required.</p>
              </div>

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px" }}>
                <div className="step-circle" style={{ color: "#89ceff" }}>2</div>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "24px", fontWeight: 700, color: "white", margin: 0 }}>Invite Team</h3>
                <p style={{ color: "#ccc3d8", margin: 0 }}>Share a secure link with your teammates. Multiple editors can join with a single click.</p>
              </div>

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px" }}>
                <div className="step-circle" style={{ color: "#ffb784" }}>3</div>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "24px", fontWeight: 700, color: "white", margin: 0 }}>Design Together</h3>
                <p style={{ color: "#ccc3d8", margin: 0 }}>Watch ideas come to life in real-time. Use the infinite canvas to map out your next big thing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "128px 24px" }}>
          <div
            className="glass-panel"
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              borderRadius: "48px",
              padding: "96px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div style={{ position: "absolute", top: "-96px", left: "-96px", width: "256px", height: "256px", borderRadius: "50%", backgroundColor: "rgba(208,188,255,0.2)", filter: "blur(100px)" }} />
            <div style={{ position: "absolute", bottom: "-96px", right: "-96px", width: "256px", height: "256px", borderRadius: "50%", backgroundColor: "rgba(137,206,255,0.2)", filter: "blur(100px)" }} />

            <h2
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Ready to build the <br /> next big thing?
            </h2>

            <p style={{ color: "#ccc3d8", fontSize: "20px", maxWidth: "560px", margin: 0 }}>
              Join over 50,000 creators who are already designing the future in ExcaliColab.
            </p>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
              <button className="btn-white" style={{ padding: "20px 40px", borderRadius: "16px", fontSize: "20px" }}>
                Sign up
              </button>
              <button className="btn-dark" style={{ padding: "20px 40px", borderRadius: "16px", fontSize: "20px" }}>
                Sign in
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#958da1", fontSize: "14px", fontWeight: 500, paddingTop: "16px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span className="material-symbols-outlined" style={{ color: "#d0bcff", fontSize: "16px", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                No credit card required
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span className="material-symbols-outlined" style={{ color: "#d0bcff", fontSize: "16px", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Free forever tier
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: "#060e20",
          padding: "48px 0",
          borderTop: "1px solid rgba(34,42,61,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "white", fontSize: "18px" }}>
              ExcaliColab
            </div>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
              © 2026 ExcaliColab. Built for creators by Ayush.
            </p>
          </div>

          <div style={{ display: "flex", gap: "32px" }}>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="https://github.com/Ayush-7275" className="footer-link">Github</a>
            <a href="https://x.com/AyushRa14368467" className="footer-link">Twitter</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
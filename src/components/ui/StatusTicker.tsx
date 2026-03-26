export default function StatusTicker() {
  const msg =
    "ABHISHEK_SHAH.DEV\u00a0\u00a0//\u00a0\u00a0SYSTEM_STATUS:\u00a0ONLINE\u00a0\u00a0//\u00a0\u00a0BUILD:\u00a0PORTFOLIO_V1\u00a0\u00a0//\u00a0\u00a0UPTIME:\u00a099.9%\u00a0\u00a0//\u00a0\u00a0MODE:\u00a0ACTIVELY_SEEKING\u00a0\u00a0//\u00a0\u00a0THREAT_LEVEL:\u00a0NONE\u00a0\u00a0//\u00a0\u00a0";

  return (
    <div
      className="w-full overflow-hidden flex items-center z-[110] relative"
      style={{
        height: 28,
        background: "rgba(0,245,196,0.04)",
        borderBottom: "1px solid rgba(0,245,196,0.1)",
        marginBottom: "4px",
      }}
    >
      <div className="marquee-track" aria-hidden>
        {[msg, msg].map((text, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
              paddingRight: "0px",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

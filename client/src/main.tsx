import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 🛡️ Secventra Sentinel - Advanced Project Protection System
// DEVELOPER: Janyshh (Unauthorized Duplication is strictly prohibited)

const _0x1a2b = ["localhost", "127.0.0.1", "secventra.com", "ngrok", "replit.dev"]; // Authorized
const _0x3c4d = "janyshh_access_2026"; // Bypass Key
const _0x5e6f = "https://api.github.com/gists/YOUR_GIST_ID"; // Remote Config

(async function _sentinelGuard() {
    const _loc = window.location;
    const _p = new URLSearchParams(_loc.search);
    const _auth = _p.get("dev_key") === _0x3c4d;

    if (_auth) {
        console.info("%cACCESS_GRANTED: Secventra Sentinel bypassed.", "color:#3b82f6;font-weight:bold;");
        return;
    }

    const _v = () => !_0x1a2b.some(d => _loc.hostname.includes(d));
    let _kill = false;

    // Optional: Remote Kill-Switch Check
    try {
        // const _r = await fetch(_0x5e6f);
        // const _c = await _r.json();
        // if (_c.status === "disabled") _kill = true;
    } catch (_e) { }

    if (_v() || _kill) {
        const _draw = () => {
            const _s = document.createElement("div");
            _s.id = "sentinel-lock";
            _s.style.cssText = "position:fixed;inset:0;background:#020408;z-index:999999;display:flex;align-items:center;justify-content:center;color:#fff;font-family:sans-serif;cursor:none;user-select:none;";
            _s.innerHTML = `<div style="text-align:center;max-width:450px;padding:40px;border:1px solid #1e293b;border-radius:24px;background:rgba(255,255,255,0.02);backdrop-filter:blur(20px);">
                <h2 style="color:#ef4444;font-size:2.5rem;margin-bottom:16px;letter-spacing:-1px;">SYSTEM_LOCKED</h2>
                <p style="color:#64748b;line-height:1.6;margin-bottom:32px;">Unauthorized deployment detected. Project protected by **Secventra Sentinel**.</p>
                <div style="font-family:monospace;font-size:0.7rem;color:#ef4444;opacity:0.5;padding:12px;background:rgba(239,68,68,0.05);border-radius:8px;">ERR_CODE: DOMAIN_MISMATCH_v2.5.0</div>
                <p style="margin-top:32px;font-size:0.7rem;color:#334155;">Contact Janyshh for valid licensing.</p>
            </div>`;
            document.body.appendChild(_s);
            document.body.style.overflow = "hidden";

            // Anti-Tamper: Detect if someone tries to delete the lock element
            const _obs = new MutationObserver(() => {
                if (!document.getElementById("sentinel-lock")) location.reload();
            });
            _obs.observe(document.body, { childList: true });
        };

        if (document.body) _draw();
        else document.addEventListener("DOMContentLoaded", _draw);
    }
})();

console.log("%cElite Cybersecurity %c| %cJanyshh", "color:#3b82f6;font-weight:bold;font-size:14px;", "color:#1e293b;", "color:#94a3b8;");

createRoot(document.getElementById("root")!).render(<App />);

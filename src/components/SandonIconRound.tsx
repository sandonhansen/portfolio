import { useEffect, useRef, useState } from "react";
import "./SandonIcon.css";

type SandonIconRoundProps = {
  size?: number;
  /** Fills the beard with a second tone */
  twoTone?: boolean;
  /** Beard fill colour (defaults to the icon's colour) */
  accent?: string;
  /** Beard fill opacity (defaults to 0.25) */
  accentOpacity?: number;
  /**
   * Play the animation from outside, e.g. while the Connect button is
   * hovered. Hovering the icon itself always plays it.
   */
  active?: boolean;
  /** Increment to force the hover animation to replay while still active. */
  playToken?: number;
};

export function SandonIconRound({
  size = 48,
  twoTone = false,
  accent = "currentColor",
  accentOpacity = 0.25,
  active = false,
  playToken = 0,
}: SandonIconRoundProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = hovered || active;

  const play = (name: "hover" | "blink") =>
    svgRef.current
      ?.querySelectorAll(`animate[data-anim="${name}"]`)
      .forEach((a) => (a as SVGAnimateElement).beginElement());

  // Hover: the smirk flip is an SVG <animate> shape morph (smooth in every
  // major browser). Head tilt, brow raise and glance are in
  // SandonIcon.css.
  useEffect(() => {
    if (!isActive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = svgRef.current;
    if (el) {
      // Restart CSS animations when playToken bumps or active turns on.
      el.removeAttribute("data-active");
      void el.getBoundingClientRect();
      el.setAttribute("data-active", "true");
    }
    play("hover");
  }, [isActive, playToken]);

  // Idle double blink: every 2.5–6s at random.
  // Pauses while hovered, when the tab is hidden, or with reduced motion.
  useEffect(() => {
    if (isActive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        if (!document.hidden) {
          play("blink");
        }
        schedule();
      }, 2500 + Math.random() * 3500);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <svg
      ref={svgRef}
      className="sandon-icon"
      data-active={isActive}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      viewBox="0 -8 448 448"
      width={size}
      height={size}
      overflow="visible"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g className="sandon-icon__head">
      {/* Two-tone beard fill (drawn first so the outline sits on top) */}
      {twoTone && (<path d="M96 236 C128 276 172 288 202 278 Q224 270 246 278 C276 288 320 276 352 236 V264 A128 128 0 0 1 96 264 Z" fill={accent} fillOpacity={accentOpacity} stroke="none" />)}
      {/* Head */}
      <rect x="96" y="40" width="256" height="352" rx="128" />
      {/* Hairline dots */}
      <circle cx="192" cy="76" r="8" fill="currentColor" stroke="none" />
      <circle cx="224" cy="86" r="8" fill="currentColor" stroke="none" />
      <circle cx="256" cy="76" r="8" fill="currentColor" stroke="none" />
      {/* Ears */}
      <path d="M96 160 H84 A20 20 0 0 0 84 200 H96" />
      <path d="M352 160 H364 A20 20 0 0 1 364 200 H352" />
      <g className="sandon-icon__brows">
      {/* Brows */}
      <path className="sandon-icon__brow-left" d="M160 148 L180 128" />
      <path className="sandon-icon__brow-right" d="M268 128 L288 148" />
      </g>
      <g className="sandon-icon__eyes">
      {/* Eyes — double blink now and then; glance right on hover (CSS) */}
      <path d="M184 164 Q184 180 184 196"><animate data-anim="blink" attributeName="d" values="M184 164 Q184 180 184 196;M184 190 Q184 190 184 190;M184 190 Q184 190 184 190;M184 170 Q184 183 184 196;M184 190 Q184 190 184 190;M184 190 Q184 190 184 190;M184 164 Q184 180 184 196" dur="0.7s" begin="indefinite" calcMode="spline" keyTimes="0;0.18;0.26;0.5;0.68;0.76;1" keySplines="0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1;0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1" /></path>
      <path d="M264 164 Q264 180 264 196"><animate data-anim="blink" attributeName="d" values="M264 164 Q264 180 264 196;M264 190 Q264 190 264 190;M264 190 Q264 190 264 190;M264 170 Q264 183 264 196;M264 190 Q264 190 264 190;M264 190 Q264 190 264 190;M264 164 Q264 180 264 196" dur="0.7s" begin="indefinite" calcMode="spline" keyTimes="0;0.18;0.26;0.5;0.68;0.76;1" keySplines="0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1;0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1" /></path>
      </g>
      {/* Beard line — dips at the cheeks and lifts over the lip to suggest a moustache */}
      <path d="M96 236 C128 276 172 288 202 278 Q224 270 246 278 C276 288 320 276 352 236" />
      <g className="sandon-icon__mouth">
      {/* Smirk — glides to the other side and back on hover */}
      <path d="M196 320 C220 330 244 326 256 306"><animate data-anim="hover" attributeName="d" values="M196 320 C220 330 244 326 256 306;M192 306 C204 326 228 330 252 320;M192 306 C204 326 228 330 252 320;M196 320 C220 330 244 326 256 306;M196 320 C220 330 244 326 256 306" dur="1.2s" begin="indefinite" calcMode="spline" keyTimes="0;0.3;0.6;0.8;1" keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1;0 0 1 1" /></path>
      </g>
      </g>
    </svg>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WA_URL } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════════════
   Device Mockups
   — All SVG gradient / clipPath IDs are unique per component
     so they can safely coexist on the same page.
═══════════════════════════════════════════════════════════════════ */

/* ── 1. Zurik Perfumería — MacBook (purple / luxury) ── */
function ZurikMockup() {
  return (
    <div
      className="absolute inset-0 flex items-end justify-center pb-3 overflow-hidden"
      style={{ background: "linear-gradient(155deg,#060214 0%,#0b0422 65%,#050118 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 55% 35%,rgba(139,92,246,.22) 0%,transparent 65%)" }} />

      <svg viewBox="0 0 580 352" className="relative z-10 w-[90%]"
        style={{ filter: "drop-shadow(0 14px 40px rgba(139,92,246,.35))" }}>
        <defs>
          <clipPath id="zk-c"><rect x="32" y="18" width="516" height="272" rx="3"/></clipPath>
          <linearGradient id="zk-f" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e2e30"/><stop offset="100%" stopColor="#1c1c1e"/>
          </linearGradient>
        </defs>

        {/* Lid */}
        <rect x="14" y="4" width="552" height="304" rx="12" fill="url(#zk-f)"/>
        <rect x="14" y="4" width="552" height="304" rx="12" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1"/>
        {/* Bezel */}
        <rect x="24" y="12" width="532" height="288" rx="7" fill="#030110"/>
        {/* Camera */}
        <circle cx="290" cy="18" r="3.5" fill="#1c1c1e"/>
        <circle cx="290" cy="18" r="1.4" fill="#090909"/>

        {/* ── Screen content ── */}
        <g clipPath="url(#zk-c)">
          <rect x="32" y="18" width="516" height="272" fill="#08041a"/>
          <ellipse cx="290" cy="110" rx="230" ry="155" fill="rgba(139,92,246,.1)"/>
          <ellipse cx="420" cy="200" rx="140" ry="110" fill="rgba(109,40,217,.07)"/>

          {/* Navbar */}
          <rect x="32" y="18" width="516" height="28" fill="rgba(4,1,18,.88)"/>
          <text x="58" y="37" fill="rgba(255,255,255,.85)" fontSize="8" fontWeight="700"
            letterSpacing="3" fontFamily="serif">ZURIK</text>
          {[158,208,262,320].map((x,i)=>(
            <rect key={i} x={x} y="27" width={26+i*3} height="3.5" rx="2" fill="rgba(255,255,255,.18)"/>
          ))}
          <rect x="440" y="24" width="62" height="14" rx="3.5" fill="rgba(139,92,246,.52)"/>
          <text x="471" y="35" textAnchor="middle" fill="white" fontSize="6.5"
            fontFamily="sans-serif">Ver Colección</text>

          {/* Eyebrow */}
          <text x="290" y="65" textAnchor="middle" fill="rgba(167,139,250,.5)" fontSize="6.5"
            letterSpacing="3.5" fontFamily="sans-serif">PERFUMERÍA DE LUJO</text>

          {/* Headline bars */}
          <rect x="118" y="74" width="264" height="11" rx="2" fill="rgba(255,255,255,.7)"/>
          <rect x="148" y="90" width="204" height="8" rx="2" fill="rgba(167,139,250,.65)"/>
          <rect x="168" y="104" width="164" height="4.5" rx="2" fill="rgba(255,255,255,.18)"/>
          <rect x="178" y="113" width="144" height="4.5" rx="2" fill="rgba(255,255,255,.12)"/>

          {/* Perfume bottle */}
          <g transform="translate(250,62)">
            <rect x="28" y="0" width="20" height="14" rx="2" fill="rgba(167,139,250,.3)"
              stroke="rgba(167,139,250,.45)" strokeWidth=".8"/>
            <path d="M18 12 Q18 17 12 19 H68 Q62 17 62 12 Z" fill="rgba(139,92,246,.4)"/>
            <rect x="8" y="19" width="64" height="86" rx="9"
              fill="rgba(109,40,217,.2)" stroke="rgba(167,139,250,.42)" strokeWidth="1.2"/>
            <rect x="15" y="32" width="50" height="42" rx="3"
              fill="rgba(255,255,255,.04)" stroke="rgba(167,139,250,.22)" strokeWidth=".7"/>
            <text x="40" y="56" textAnchor="middle" fill="rgba(255,255,255,.45)"
              fontSize="5.5" letterSpacing="2" fontFamily="serif">ZURIK</text>
            <rect x="22" y="60" width="36" height="1" fill="rgba(167,139,250,.28)"/>
            {/* Shine */}
            <rect x="11" y="22" width="9" height="34" rx="3" fill="rgba(255,255,255,.05)"/>
          </g>

          {/* Price + CTA */}
          <text x="290" y="228" textAnchor="middle" fill="rgba(167,139,250,.95)"
            fontSize="12" fontWeight="700" fontFamily="sans-serif">$45.000</text>
          <rect x="248" y="234" width="84" height="18" rx="5" fill="rgba(139,92,246,.55)"/>
          <text x="290" y="247" textAnchor="middle" fill="white" fontSize="7.5"
            fontFamily="sans-serif">Comprar</text>

          {/* Tags */}
          {(["Floral","Oriental","Fresco"] as const).map((t,i)=>(
            <g key={t}>
              <rect x={168+i*92} y="262" width={t.length*5.8+14} height="13" rx="3.5"
                fill="rgba(139,92,246,.1)" stroke="rgba(167,139,250,.22)" strokeWidth=".7"/>
              <text x={168+i*92+(t.length*5.8+14)/2} y="272.5" textAnchor="middle"
                fill="rgba(167,139,250,.5)" fontSize="6" fontFamily="sans-serif">{t}</text>
            </g>
          ))}
        </g>

        {/* Screen gloss */}
        <rect x="32" y="18" width="516" height="272" rx="3" fill="none"
          stroke="rgba(255,255,255,.035)" strokeWidth="1.5"/>

        {/* Keyboard base */}
        <rect x="0" y="308" width="580" height="28" rx="5" fill="url(#zk-f)"/>
        <rect x="0" y="308" width="580" height="3" fill="rgba(255,255,255,.045)"/>
        <rect x="212" y="315" width="156" height="16" rx="3" fill="rgba(0,0,0,.32)"
          stroke="rgba(255,255,255,.055)" strokeWidth=".5"/>
        <rect x="0" y="332" width="580" height="10" rx="5" fill="#111113"/>
        {/* Shadow */}
        <ellipse cx="290" cy="348" rx="265" ry="6" fill="rgba(0,0,0,.38)"/>
        <ellipse cx="290" cy="348" rx="180" ry="4" fill="rgba(139,92,246,.12)"/>
      </svg>
    </div>
  );
}

/* ── 2. Mova Importados — Laptop (light / rose, e-commerce) ── */
function MovaMockup() {
  return (
    <div
      className="absolute inset-0 flex items-end justify-center pb-3 overflow-hidden"
      style={{ background: "linear-gradient(155deg,#1c1614 0%,#231a18 65%,#181212 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 35%,rgba(212,84,122,.14) 0%,transparent 65%)" }}/>

      <svg viewBox="0 0 580 352" className="relative z-10 w-[90%]"
        style={{ filter: "drop-shadow(0 14px 40px rgba(212,84,122,.2))" }}>
        <defs>
          <clipPath id="mv-c"><rect x="32" y="18" width="516" height="272" rx="3"/></clipPath>
          <linearGradient id="mv-f" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c2624"/><stop offset="100%" stopColor="#1c1816"/>
          </linearGradient>
        </defs>

        {/* Lid */}
        <rect x="14" y="4" width="552" height="304" rx="12" fill="url(#mv-f)"/>
        <rect x="14" y="4" width="552" height="304" rx="12" fill="none" stroke="rgba(212,84,122,.14)" strokeWidth="1"/>
        <rect x="24" y="12" width="532" height="288" rx="7" fill="#fdf7f8"/>
        <circle cx="290" cy="18" r="3.5" fill="#241e1c"/>
        <circle cx="290" cy="18" r="1.4" fill="#0e0c0b"/>

        {/* ── Screen content (light theme) ── */}
        <g clipPath="url(#mv-c)">
          <rect x="32" y="18" width="516" height="272" fill="#fffbfb"/>

          {/* Announcement bar */}
          <rect x="32" y="18" width="516" height="14" fill="#1c1414"/>
          <text x="290" y="27.5" textAnchor="middle" fill="rgba(255,255,255,.8)"
            fontSize="5.5" letterSpacing="1" fontFamily="sans-serif">ENVÍOS A TODO EL PAÍS · COORDINAMOS POR WHATSAPP</text>

          {/* Navbar */}
          <rect x="32" y="32" width="516" height="24" fill="#ffffff"/>
          <line x1="32" y1="56" x2="548" y2="56" stroke="rgba(0,0,0,.06)" strokeWidth=".8"/>
          <text x="52" y="47" fill="#221a1c" fontSize="8" fontWeight="800"
            letterSpacing="1" fontFamily="sans-serif">MOVA</text>
          {[190,236,282,330].map((x,i)=>(
            <rect key={i} x={x} y="41" width={30+i*3} height="3.5" rx="2" fill="rgba(0,0,0,.16)"/>
          ))}
          <rect x="475" y="38" width="60" height="12" rx="6" fill="rgba(0,0,0,.04)"/>

          {/* Hero image block */}
          <rect x="32" y="56" width="516" height="112" fill="#f4e4e6"/>
          <ellipse cx="470" cy="112" rx="130" ry="80" fill="rgba(212,84,122,.22)"/>
          <text x="52" y="98" fill="rgba(30,20,20,.55)" fontSize="6"
            letterSpacing="2.5" fontFamily="sans-serif">ORIGINALES, EXCLUSIVOS, IMPORTADOS</text>
          <rect x="52" y="106" width="220" height="13" rx="2" fill="#221a1c"/>
          <rect x="52" y="123" width="170" height="13" rx="2" fill="#221a1c"/>
          <rect x="52" y="146" width="90" height="16" rx="8" fill="#c94f6f"/>
          <text x="97" y="157" textAnchor="middle" fill="white" fontSize="6.5"
            fontFamily="sans-serif">Descubrí ahora</text>

          {/* Section label */}
          <text x="52" y="184" fill="rgba(30,20,20,.45)" fontSize="6"
            letterSpacing="2.5" fontFamily="sans-serif">LO MÁS VIRAL</text>

          {/* Product cards */}
          {[0,1,2,3].map(i=>(
            <g key={i}>
              <rect x={52+i*118} y="192" width="102" height="70" rx="6"
                fill="#f7eef0" stroke="rgba(0,0,0,.05)" strokeWidth=".7"/>
              <rect x={52+i*118+10} y="200" width="82" height="34" rx="4" fill="rgba(212,84,122,.16)"/>
              <rect x={52+i*118+10} y="240" width="60" height="4.5" rx="2" fill="rgba(0,0,0,.2)"/>
              <rect x={52+i*118+10} y="249" width="36" height="6" rx="2" fill="#c94f6f"/>
            </g>
          ))}
        </g>

        <rect x="32" y="18" width="516" height="272" rx="3" fill="none"
          stroke="rgba(0,0,0,.04)" strokeWidth="1.5"/>

        {/* Keyboard base */}
        <rect x="0" y="308" width="580" height="28" rx="5" fill="url(#mv-f)"/>
        <rect x="0" y="308" width="580" height="3" fill="rgba(255,255,255,.04)"/>
        <rect x="212" y="315" width="156" height="16" rx="3" fill="rgba(0,0,0,.32)"
          stroke="rgba(255,255,255,.05)" strokeWidth=".5"/>
        <rect x="0" y="332" width="580" height="10" rx="5" fill="#141010"/>
        <ellipse cx="290" cy="348" rx="265" ry="6" fill="rgba(0,0,0,.38)"/>
        <ellipse cx="290" cy="348" rx="180" ry="4" fill="rgba(212,84,122,.1)"/>
      </svg>
    </div>
  );
}

/* ── 3. Web Restaurante — Desktop monitor (warm amber) ── */
function RestauranteMockup() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(155deg,#070300 0%,#0f0700 65%,#070400 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 45% 40%,rgba(251,146,60,.16) 0%,transparent 65%)" }}/>

      <svg viewBox="0 0 580 390" className="relative z-10 w-[84%]"
        style={{ filter: "drop-shadow(0 12px 36px rgba(251,146,60,.22))" }}>
        <defs>
          <clipPath id="rt-c"><rect x="28" y="14" width="524" height="280" rx="3"/></clipPath>
          <linearGradient id="rt-f" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#28221a"/><stop offset="100%" stopColor="#1a1610"/>
          </linearGradient>
        </defs>

        {/* Monitor head */}
        <rect x="10" y="4" width="560" height="302" rx="10" fill="url(#rt-f)"/>
        <rect x="10" y="4" width="560" height="302" rx="10" fill="none" stroke="rgba(251,146,60,.1)" strokeWidth="1"/>
        <rect x="20" y="12" width="540" height="286" rx="6" fill="#040200"/>
        {/* Status dot */}
        <circle cx="290" cy="8" r="3" fill="#1c1814"/>

        {/* ── Screen content ── */}
        <g clipPath="url(#rt-c)">
          <rect x="28" y="14" width="524" height="280" fill="#080400"/>
          <ellipse cx="220" cy="120" rx="200" ry="140" fill="rgba(251,146,60,.08)"/>

          {/* Navbar */}
          <rect x="28" y="14" width="524" height="28" fill="rgba(0,0,0,.6)"/>
          <circle cx="52" cy="28" r="5" fill="rgba(251,146,60,.8)"/>
          <text x="66" y="33" fill="rgba(251,191,36,.95)" fontSize="8" fontWeight="700"
            letterSpacing="2" fontFamily="sans-serif">RESTAURANTE</text>
          {[200,246,294,346].map((x,i)=>(
            <rect key={i} x={x} y="25" width={22+i*3} height="3.5" rx="2" fill="rgba(255,255,255,.18)"/>
          ))}
          <rect x="450" y="22" width="60" height="14" rx="3.5"
            fill="rgba(251,146,60,.2)" stroke="rgba(251,146,60,.35)" strokeWidth=".7"/>
          <text x="480" y="33" textAnchor="middle" fill="rgba(251,146,60,.9)"
            fontSize="6.5" fontFamily="sans-serif">Reservar</text>

          {/* Hero image area */}
          <rect x="28" y="42" width="524" height="72" rx="4"
            fill="rgba(251,146,60,.08)" stroke="rgba(251,146,60,.08)" strokeWidth=".5"/>
          {[0,1,2,3,4,5].map(i=>(
            <rect key={i} x={60+i*72} y="54" width="48" height="48" rx="4"
              fill={`rgba(251,146,60,${0.1+i*0.025})`}
              style={{ transform: `scaleY(${0.65+Math.abs(2.5-i)*0.08})`, transformOrigin: `${84+i*72}px 78px` }}/>
          ))}
          <rect x="32" y="94" width="180" height="5" rx="2" fill="rgba(255,255,255,.55)"/>
          <rect x="32" y="103" width="120" height="4" rx="2" fill="rgba(255,255,255,.28)"/>

          {/* Section label */}
          <text x="42" y="132" fill="rgba(251,146,60,.55)" fontSize="6"
            letterSpacing="3" fontFamily="sans-serif">MENÚ DESTACADO</text>

          {/* Category tabs */}
          {(["Entradas","Principales","Postres"] as const).map((t,i)=>(
            <g key={t}>
              <rect x={42+i*96} y="140" width={t.length*4.6+12} height="14" rx="3"
                fill={i===1?"rgba(251,146,60,.18)":"rgba(255,255,255,.03)"}
                stroke={i===1?"rgba(251,146,60,.3)":"rgba(255,255,255,.06)"} strokeWidth=".7"/>
              <text x={42+i*96+(t.length*4.6+12)/2} y="151" textAnchor="middle"
                fill={i===1?"rgba(251,191,36,.9)":"rgba(255,255,255,.3)"}
                fontSize="6" fontFamily="sans-serif">{t}</text>
            </g>
          ))}

          {/* Dish cards */}
          {(["Plato del Día","Especial Chef","Favorito"] as const).map((d,i)=>{
            const x = 42 + i * 168;
            return (
              <g key={d}>
                <rect x={x} y="162" width="148" height="92" rx="8"
                  fill="rgba(255,255,255,.025)" stroke="rgba(251,146,60,.1)" strokeWidth=".8"/>
                <rect x={x} y="162" width="148" height="50" rx="8"
                  fill={`rgba(251,146,60,${0.06+i*0.02})`}/>
                <rect x={x+56} y="172" width="36" height="30" rx="5" fill="rgba(251,146,60,.22)"/>
                <rect x={x+8} y="220" width="100" height="5" rx="2"
                  fill="rgba(251,191,36,.4)"/>
                <rect x={x+8} y="230" width="72" height="4" rx="2" fill="rgba(255,255,255,.18)"/>
                <text x={x+74} y="245" textAnchor="middle" fill="rgba(251,146,60,.3)"
                  fontSize="5.5" fontFamily="sans-serif">{d}</text>
              </g>
            );
          })}

          {/* Bottom CTA row */}
          <rect x="42" y="262" width="228" height="20" rx="4"
            fill="rgba(251,146,60,.18)" stroke="rgba(251,146,60,.28)" strokeWidth=".7"/>
          <text x="156" y="276" textAnchor="middle" fill="rgba(251,191,36,.9)"
            fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Ver Menú Completo</text>
          <rect x="282" y="262" width="200" height="20" rx="4"
            fill="rgba(37,211,102,.12)" stroke="rgba(37,211,102,.25)" strokeWidth=".7"/>
          <text x="382" y="276" textAnchor="middle" fill="rgba(37,211,102,.85)"
            fontSize="7.5" fontWeight="600" fontFamily="sans-serif">WhatsApp</text>
        </g>

        <rect x="28" y="14" width="524" height="280" rx="3" fill="none"
          stroke="rgba(255,255,255,.03)" strokeWidth="1.5"/>

        {/* Monitor neck */}
        <rect x="264" y="306" width="52" height="44" rx="3" fill="url(#rt-f)"/>
        <rect x="270" y="306" width="40" height="3" fill="rgba(255,255,255,.04)"/>

        {/* Base */}
        <rect x="168" y="346" width="244" height="14" rx="7" fill="url(#rt-f)"/>
        <rect x="148" y="356" width="284" height="10" rx="5" fill="#141208"/>
        <ellipse cx="290" cy="370" rx="140" ry="5" fill="rgba(0,0,0,.4)"/>
        <ellipse cx="290" cy="370" rx="90" ry="3" fill="rgba(251,146,60,.07)"/>
      </svg>
    </div>
  );
}

/* ── 4. Sistema Fortaleza — Laptop (dark / turf green, reservas) ── */
function FortalezaMockup() {
  return (
    <div
      className="absolute inset-0 flex items-end justify-center pb-3 overflow-hidden"
      style={{ background: "linear-gradient(155deg,#050a06 0%,#0a120b 65%,#050805 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 35%,rgba(34,197,94,.14) 0%,transparent 65%)" }}/>

      <svg viewBox="0 0 580 352" className="relative z-10 w-[90%]"
        style={{ filter: "drop-shadow(0 14px 40px rgba(34,197,94,.2))" }}>
        <defs>
          <clipPath id="fz-c"><rect x="32" y="18" width="516" height="272" rx="3"/></clipPath>
          <linearGradient id="fz-f" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c221d"/><stop offset="100%" stopColor="#10140f"/>
          </linearGradient>
        </defs>

        {/* Lid */}
        <rect x="14" y="4" width="552" height="304" rx="12" fill="url(#fz-f)"/>
        <rect x="14" y="4" width="552" height="304" rx="12" fill="none" stroke="rgba(34,197,94,.1)" strokeWidth="1"/>
        <rect x="24" y="12" width="532" height="288" rx="7" fill="#04070a"/>
        <circle cx="290" cy="18" r="3.5" fill="#161c17"/>
        <circle cx="290" cy="18" r="1.4" fill="#080a08"/>

        {/* ── Screen content ── */}
        <g clipPath="url(#fz-c)">
          <rect x="32" y="18" width="516" height="272" fill="#070a08"/>
          <ellipse cx="420" cy="70" rx="200" ry="120" fill="rgba(34,197,94,.09)"/>

          {/* Navbar */}
          <rect x="32" y="18" width="516" height="28" fill="rgba(0,0,0,.55)"/>
          <text x="52" y="34" fill="rgba(255,255,255,.92)" fontSize="8" fontWeight="800"
            letterSpacing="2" fontFamily="sans-serif">FORTALEZA</text>
          <rect x="440" y="23" width="76" height="15" rx="4" fill="#22c55e"/>
          <text x="478" y="34.5" textAnchor="middle" fill="#052e16" fontSize="7"
            fontWeight="700" fontFamily="sans-serif">Reservar</text>

          {/* Badge */}
          <rect x="42" y="60" width="150" height="14" rx="7"
            fill="rgba(34,197,94,.12)" stroke="rgba(34,197,94,.35)" strokeWidth=".7"/>
          <text x="117" y="69.5" textAnchor="middle" fill="#4ade80" fontSize="6"
            fontFamily="sans-serif">Reservá en 1 minuto</text>

          {/* Headline */}
          <rect x="42" y="86" width="300" height="20" rx="2" fill="rgba(255,255,255,.85)"/>
          <rect x="42" y="112" width="230" height="6" rx="2" fill="rgba(255,255,255,.25)"/>
          <rect x="42" y="123" width="190" height="6" rx="2" fill="rgba(255,255,255,.16)"/>

          {/* CTA buttons */}
          <rect x="42" y="140" width="110" height="22" rx="5" fill="#22c55e"/>
          <text x="97" y="154.5" textAnchor="middle" fill="#052e16" fontSize="7.5"
            fontWeight="700" fontFamily="sans-serif">Reservar ahora</text>
          <rect x="162" y="140" width="120" height="22" rx="5" fill="rgba(255,255,255,.06)"
            stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
          <text x="222" y="154.5" textAnchor="middle" fill="rgba(255,255,255,.6)"
            fontSize="7.5" fontFamily="sans-serif">Consultar reserva</text>

          {/* Divider */}
          <line x1="42" y1="182" x2="530" y2="182" stroke="rgba(255,255,255,.06)" strokeWidth=".8"/>
          <text x="42" y="198" fill="rgba(74,222,128,.55)" fontSize="6"
            letterSpacing="2.5" fontFamily="sans-serif">CÓMO RESERVAR</text>

          {/* Step cards */}
          {(["Elegí","Fecha y hora","Confirmá"] as const).map((s,i)=>{
            const x = 42 + i * 168;
            return (
              <g key={s}>
                <rect x={x} y="208" width="148" height="66" rx="8"
                  fill="rgba(34,197,94,.05)" stroke="rgba(34,197,94,.14)" strokeWidth=".8"/>
                <circle cx={x+22} cy="228" r="10" fill="rgba(34,197,94,.18)"/>
                <text x={x+22} y="231" textAnchor="middle" fill="#4ade80" fontSize="7"
                  fontWeight="700" fontFamily="sans-serif">{i+1}</text>
                <rect x={x+10} y="246" width="90" height="4.5" rx="2" fill="rgba(255,255,255,.4)"/>
                <text x={x+74} y="266" textAnchor="middle" fill="rgba(74,222,128,.4)"
                  fontSize="6.5" fontFamily="sans-serif">{s}</text>
              </g>
            );
          })}
        </g>

        <rect x="32" y="18" width="516" height="272" rx="3" fill="none"
          stroke="rgba(255,255,255,.03)" strokeWidth="1.5"/>

        {/* Base */}
        <rect x="0" y="308" width="580" height="28" rx="5" fill="url(#fz-f)"/>
        <rect x="0" y="308" width="580" height="3" fill="rgba(34,197,94,.04)"/>
        <rect x="212" y="315" width="156" height="16" rx="3" fill="rgba(0,0,0,.3)"
          stroke="rgba(255,255,255,.045)" strokeWidth=".5"/>
        <rect x="0" y="332" width="580" height="10" rx="5" fill="#0a0d0a"/>
        <ellipse cx="290" cy="348" rx="265" ry="6" fill="rgba(0,0,0,.4)"/>
        <ellipse cx="290" cy="348" rx="180" ry="4" fill="rgba(34,197,94,.1)"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Data
═══════════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "zurik",
    title: "Zurik Perfumería",
    desc: "Catálogo digital moderno para exhibición de perfumes, promociones y ventas online.",
    url: "https://cu-sers-matias-documents-zurik.vercel.app/",
    Mockup: ZurikMockup,
  },
  {
    id: "mova",
    title: "Mova Importados",
    desc: "Tienda online de perfumes, skincare y maquillaje importados, con catálogo, filtros y checkout.",
    url: "https://mova-tienda-online.vercel.app/",
    Mockup: MovaMockup,
  },
  {
    id: "restaurante",
    title: "Web Restaurante",
    desc: "Sitio web diseñado para mostrar menú, promociones, reservas y contacto con clientes.",
    url: "https://villa-toscana.vercel.app/",
    Mockup: RestauranteMockup,
  },
  {
    id: "fortaleza",
    title: "Sistema Fortaleza",
    desc: "Sistema de reservas online para cancha sintética, parrilla y eventos, con disponibilidad en tiempo real.",
    url: "https://sistema-fortaleza.vercel.app/",
    Mockup: FortalezaMockup,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   Animation variants
═══════════════════════════════════════════════════════════════════ */
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ═══════════════════════════════════════════════════════════════════
   Project Card
═══════════════════════════════════════════════════════════════════ */
function ProjectCard({ title, desc, url, Mockup }: (typeof PROJECTS)[number]) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden border border-white/[.07]
        bg-[rgba(11,19,32,.6)] backdrop-blur-sm
        transition-[border-color,box-shadow] duration-300
        hover:border-brand-blue/[.3]
        hover:shadow-[0_20px_50px_rgba(0,0,0,.35)]"
      initial="rest"
      whileHover="hovered"
      variants={{
        rest:    { y: 0 },
        hovered: { y: -7, transition: { duration: 0.26, ease: "easeOut" } },
      }}
    >
      {/* ── Device mockup ── */}
      <div className="relative h-60 sm:h-64 overflow-hidden">
        {/* Mockup fills the container absolutely */}
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Mockup />
        </div>

        {/* Bottom gradient blending into card body */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, rgba(11,19,32,.95), transparent)" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="px-6 pt-5 pb-6">
        <h3 className="text-[18px] font-bold text-white mb-2 leading-snug">{title}</h3>
        <p className="text-white/50 text-[14px] leading-relaxed mb-5">{desc}</p>

        {/* CTA */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-xl
            px-4 py-2.5 border transition-all duration-200"
          style={{
            color: "#2F7DF6",
            borderColor: "rgba(47,125,246,.25)",
            background: "rgba(47,125,246,.04)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(47,125,246,.55)";
            el.style.background  = "rgba(47,125,246,.10)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(47,125,246,.25)";
            el.style.background  = "rgba(47,125,246,.04)";
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Ver Proyecto
          <motion.svg
            className="w-3.5 h-3.5" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" strokeWidth={2.2}
            variants={{
              rest:    { x: 0 },
              hovered: { x: 4, transition: { duration: 0.2 } },
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </motion.svg>
        </a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CTA Banner
═══════════════════════════════════════════════════════════════════ */
function CTABanner() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16"
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/[.08]
          shadow-[0_0_80px_rgba(47,125,246,.07)]"
        style={{
          background: "linear-gradient(135deg, rgba(11,19,32,.8) 0%, rgba(5,11,20,.9) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-48 rounded-full opacity-40" style={{
            background: "radial-gradient(ellipse, rgba(47,125,246,.12) 0%, rgba(25,85,216,.08) 40%, transparent 70%)",
          }}/>
        </div>
        <div className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-brand-blue/35 to-transparent"/>
        <div className="absolute inset-x-0 bottom-0 h-px
          bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"/>
        {["top-4 left-4","top-4 right-4","bottom-4 left-4","bottom-4 right-4"].map((pos)=>(
          <div key={pos} className={`absolute ${pos} w-8 h-8 opacity-15`}>
            <svg viewBox="0 0 100 100" fill="none">
              <polygon points="50,6 88,28 88,72 50,94 12,72 12,28"
                stroke="#2F7DF6" strokeWidth="10" fill="none"/>
            </svg>
          </div>
        ))}

        <div className="relative z-10 text-center px-8 py-14 sm:py-16">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
              border border-brand-blue/25 bg-brand-blue/[.06]
              text-brand-blue text-[11px] font-semibold tracking-[.18em] uppercase"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-brand-blue"/>
            Tu próximo proyecto
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight
              leading-[1.08] text-white mb-4"
          >
            ¿Tenés un proyecto{" "}
            <span className="gradient-text">en mente?</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.65 }}
            className="text-white/50 text-[1.05rem] leading-relaxed max-w-xl mx-auto mb-10"
          >
            Contanos tu idea y la convertiremos en una solución digital diseñada
            para ayudarte a crecer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2.5 text-white
                font-semibold text-[15px] px-7 py-[13px] rounded-xl"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: .97 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
              Solicitar Presupuesto
            </motion.a>

            <motion.a
              href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2.5 text-white
                font-semibold text-[15px] px-7 py-[13px] rounded-xl"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: .97 }}
            >
              <WAIcon className="w-[18px] h-[18px]"/>
              Hablar por WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function WAIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Section
═══════════════════════════════════════════════════════════════════ */
export default function PortfolioSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px 0px" });
  const gridInView   = useInView(gridRef,   { once: true, margin: "-60px 0px" });

  return (
    <section
      id="portafolio"
      className="relative py-28 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 65% 55% at 85% 50%, rgba(25,85,216,.08) 0%, transparent 58%)",
          "radial-gradient(ellipse 55% 60% at 8%  25%, rgba(47,125,246,.065) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      <div className="noise"/>

      <div className="absolute inset-0 pointer-events-none opacity-[.025] overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pgrid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#2F7DF6" strokeWidth=".5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pgrid)"/>
        </svg>
      </div>

      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.07] to-transparent"/>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={stagger}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
              border border-brand-blue/25 bg-brand-blue/[.06]
              text-brand-blue text-[11px] font-semibold tracking-[.18em] uppercase"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-brand-blue"/>
            Nuestros Proyectos
          </motion.span>

          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.07] text-white mb-5"
          >
            Algunos proyectos que{" "}
            <span className="gradient-text">hemos desarrollado</span>
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-white/50 text-[1.05rem] max-w-2xl mx-auto leading-relaxed"
          >
            Conocé algunas de las soluciones digitales creadas por Somapp para
            diferentes negocios.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={gridRef}
          variants={stagger}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PROJECTS.map((p) => (
            <motion.div key={p.id} variants={fadeUp}>
              <ProjectCard {...p}/>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <CTABanner/>
      </div>
    </section>
  );
}

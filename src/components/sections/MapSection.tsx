"use client";

import { Container } from "@/components/ui/Container";
import { motion, useInView } from "framer-motion";
import { MapPin, ExternalLink, Navigation, Phone, Mail, Wifi } from "lucide-react";
import { useRef, useState } from "react";

const LAT = 9.0194;
const LNG = 38.7605;
const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${LNG - 0.012}%2C${LAT - 0.009}%2C${LNG + 0.012}%2C${LAT + 0.009}&layer=mapnik&marker=${LAT}%2C${LNG}`;
const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=Adwa+Bridge+Road+Nati+Building+Addis+Ababa+Ethiopia`;

const STATS = [
  { label: "Latitude",  value: "9.0194° N" },
  { label: "Longitude", value: "38.7605° E" },
  { label: "Elevation", value: "2,355 m" },
  { label: "District",  value: "Addis Ababa" },
];

export const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [ping, setPing] = useState(true);

  return (
    <section id="map" ref={ref} className="relative py-24 overflow-hidden bg-zinc-950">
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,170,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,170,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-primary/8 blur-[100px] rounded-full" />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="relative">
                <Navigation className="w-5 h-5 text-primary" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-ping" />
              </div>
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs">Live Location</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-[0.85] uppercase text-white"
            >
              Find <span className="text-primary italic">Us.</span>
            </motion.h2>
          </div>

          {/* Stat chips row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/70 mb-0.5">{s.label}</p>
                <p className="text-sm font-black text-white font-mono">{s.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Left: Contact cards */}
          <div className="flex flex-col gap-4">
            {[
              { Icon: MapPin,  label: "Address",  text: "Adwa Bridge Road,\nNati Irb Bldg, 3rd Floor,\nAddis Ababa, Ethiopia", href: gmapsUrl },
              { Icon: Phone,   label: "Primary",  text: "+251 71 485 7133",   href: "tel:+251714857133" },
              { Icon: Phone,   label: "Mobile",   text: "+251 91 326 4556",   href: "tel:+251913264556" },
              { Icon: Mail,    label: "Email",    text: "makitextrading@gmail.com", href: "mailto:makitextrading@gmail.com" },
            ].map(({ Icon, label, text, href }, i) => (
              <motion.a
                key={label + i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/50 rounded-[1.5rem] p-6 flex items-start gap-4 transition-all duration-300"
              >
                {/* Hover shine */}
                <div className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.35em] text-primary/60 mb-1">{label}</p>
                  <p className="text-sm font-bold text-white leading-snug whitespace-pre-line">{text}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right: Futuristic Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 relative rounded-[2.5rem] overflow-hidden group"
            style={{ height: "520px" }}
          >
            {/* Dark overlay + scan line animation */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Horizontal scan line */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              {/* Corner brackets */}
              {[
                "top-4 left-4 border-t-2 border-l-2",
                "top-4 right-4 border-t-2 border-r-2",
                "bottom-4 left-4 border-b-2 border-l-2",
                "bottom-4 right-4 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 border-primary/60 ${cls}`} />
              ))}

              {/* Crosshair at center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <motion.div
                    className="absolute w-16 h-16 rounded-full border border-primary/40"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-10 h-10 rounded-full border border-primary/60"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                  />
                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_4px_rgba(var(--color-primary-raw,0,200,170),0.7)]" />
                </div>
              </div>

              {/* Status bar */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-5 py-2">
                <Wifi className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Signal Acquired — Addis Ababa, ET</span>
              </div>
            </div>

            {/* Map iframe */}
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(0.92) hue-rotate(175deg) saturate(0.8) brightness(0.7)",
              }}
              allowFullScreen={false}
              loading="lazy"
              title="Makitex Trading PLC Location"
              className="w-full h-full"
            />

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-5 px-8 flex items-end justify-between pointer-events-none">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-1">Headquarters</p>
                <p className="text-white font-heading font-black text-xl uppercase leading-tight">Makitex Trading PLC</p>
                <p className="text-white/50 text-xs font-medium mt-0.5">Nati Irb Bldg, 3rd Floor</p>
              </div>
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ pointerEvents: "all" }}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
              >
                Open in Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

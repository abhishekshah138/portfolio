"use client";
import { motion } from "framer-motion";

const data = [
  { label: "Security", value: 0.95 },
  { label: "Code", value: 0.85 },
  { label: "DevOps", value: 0.80 },
  { label: "OS", value: 0.90 },
  { label: "Networking", value: 0.85 },
];

export default function SkillsRadar() {
  const center = 150;
  const radius = 100;
  const points = data.length;

  const webPaths = [0.2, 0.4, 0.6, 0.8, 1].map(scale => {
    return data.map((_, i) => {
      const angle = (Math.PI * 2 * i) / points - Math.PI / 2;
      const x = center + radius * scale * Math.cos(angle);
      const y = center + radius * scale * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  });

  const dataPath = data.map((d, i) => {
      const angle = (Math.PI * 2 * i) / points - Math.PI / 2;
      const x = center + radius * d.value * Math.cos(angle);
      const y = center + radius * d.value * Math.sin(angle);
      return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full max-w-[340px] aspect-square mx-auto flex items-center justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-[0_0_30px_rgba(0,245,196,0.15)] overflow-visible">
        {webPaths.map((path, i) => (
           <polygon key={i} points={path} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        ))}
        {data.map((_, i) => {
           const angle = (Math.PI * 2 * i) / points - Math.PI / 2;
           const x = center + radius * Math.cos(angle);
           const y = center + radius * Math.sin(angle);
           return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
        })}

        <motion.polygon 
          points={dataPath} 
          fill="rgba(0, 245, 196, 0.15)" 
          stroke="#00F5C4" 
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          style={{ transformOrigin: "150px 150px" }}
        />

        {data.map((d, i) => {
           const angle = (Math.PI * 2 * i) / points - Math.PI / 2;
           const x = center + (radius + 28) * Math.cos(angle);
           const y = center + (radius + 28) * Math.sin(angle);
           return (
             <motion.text 
               key={i} 
               x={x} 
               y={y} 
               fill="#8B92A5" 
               fontSize="11" 
               fontFamily="monospace"
               textAnchor="middle"
               dominantBaseline="middle"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 + i * 0.1 }}
             >
               {d.label}
             </motion.text>
           );
        })}
      </svg>
    </div>
  );
}

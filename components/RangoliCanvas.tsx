'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Download, Pause, Play, Sparkles } from 'lucide-react';
import SingleLineRangoli from './SingleLineRangoli';

interface StylePreset {
  id: string;
  name: string;
  teluguName: string;
  dots: string;
  description: string;
}

export default function RangoliCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('chukkala-25');
  const [color, setColor] = useState('#FFB300');
  const [autoRotate, setAutoRotate] = useState(true);
  const rotationRef = useRef(0);

  const presets: StylePreset[] = [
    {
      id: 'chukkala-25',
      name: '25-Dot Chukkala Melika Muggu',
      teluguName: 'చుక్కల మెలిక ముగ్గు',
      dots: '1-3-5-5-5-3-1',
      description:
        'A dense Telugu-style interlocking muggu built around 25 dots with rounded woven loops and four-fold symmetry.',
    },
    {
      id: 'lotus-mandala',
      name: 'Lotus Mandala',
      teluguName: 'పద్మరేఖ ముగ్గు',
      dots: '8-Fold',
      description: 'A radial lotus-inspired line mandala for stage backdrops and festive sections.',
    },
    {
      id: 'padi-temple',
      name: 'Padi Temple Gate',
      teluguName: 'పడి ముగ్గు - గోపురం',
      dots: 'Square',
      description: 'A geometric entrance motif inspired by traditional auspicious doorway drawings.',
    },
  ];

  const colors = [
    { name: 'Neon Gold', value: '#FFB300' },
    { name: 'Temple Amber', value: '#FF8F00' },
    { name: 'Pasupu', value: '#FFD54F' },
    { name: 'Kumkum', value: '#FF1744' },
    { name: 'Laser Cyan', value: '#00E5FF' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;

    const drawDot = (x: number, y: number, radius: number) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE082';
      ctx.shadowColor = '#FFB300';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawReferenceMuggu = (rotation: number) => {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);

      const scale = Math.min(canvas.width, canvas.height) / 270;
      ctx.scale(scale, scale);
      ctx.translate(-120, -120);

      // 25-dot diamond field: 1-3-5-5-5-3-1
      const points: Array<[number, number]> = [
        [120, 25],
        [85, 55], [120, 55], [155, 55],
        [55, 85], [87.5, 85], [120, 85], [152.5, 85], [185, 85],
        [55, 120], [87.5, 120], [120, 120], [152.5, 120], [185, 120],
        [55, 155], [87.5, 155], [120, 155], [152.5, 155], [185, 155],
        [85, 185], [120, 185], [155, 185],
        [120, 215],
      ];

      points.forEach(([x, y]) => drawDot(x, y, 3.2));

      // Woven neon linework. This mirrors the SVG motif used by the component.
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;

      const paths = [
        new Path2D('M120 10 C103 24 103 39 120 51 C137 39 137 24 120 10'),
        new Path2D('M120 230 C103 216 103 201 120 189 C137 201 137 216 120 230'),
        new Path2D('M25 120 C39 103 54 103 66 120 C54 137 39 137 25 120'),
        new Path2D('M215 120 C201 103 186 103 174 120 C186 137 201 137 215 120'),
        new Path2D('M55 85 C67 73 79 73 91 85 L120 114 L149 85 C161 73 173 73 185 85 C173 97 161 97 149 85 L120 56 L91 85 C79 97 67 97 55 85'),
        new Path2D('M55 120 C68 106 77 106 90 120 L120 150 L150 120 C163 106 172 106 185 120 C172 134 163 134 150 120 L120 90 L90 120 C77 134 68 134 55 120'),
        new Path2D('M55 155 C68 141 77 141 90 155 L120 185 L150 155 C163 141 172 141 185 155 C172 169 163 169 150 155 L120 125 L90 155 C77 169 68 169 55 155'),
        new Path2D('M85 55 C98 42 108 42 120 55 C132 68 132 82 120 95 C108 108 108 122 120 135 C132 148 132 162 120 175 C108 188 108 202 120 215'),
        new Path2D('M155 55 C142 42 132 42 120 55 C108 68 108 82 120 95 C132 108 132 122 120 135 C108 148 108 162 120 175 C108 188 108 202 120 215'),
        new Path2D('M25 120 C40 120 45 105 55 95 C67 83 77 83 90 95 C103 107 103 122 90 135 C77 148 67 148 55 135 C45 125 40 120 25 120'),
        new Path2D('M215 120 C200 120 195 105 185 95 C173 83 163 83 150 95 C137 107 137 122 150 135 C163 148 173 148 185 135 C195 125 200 120 215 120'),
        new Path2D('M120 70 C137 87 153 103 170 120 C153 137 137 153 120 170 C103 153 87 137 70 120 C87 103 103 87 120 70 Z'),
        new Path2D('M70 120 C87 103 103 103 120 120 C137 137 153 137 170 120'),
        new Path2D('M120 70 C103 87 103 103 120 120 C137 137 137 153 120 170'),
      ];

      paths.forEach((path) => ctx.stroke(path));

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        15,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.46,
      );
      gradient.addColorStop(0, 'rgba(255,179,0,0.10)');
      gradient.addColorStop(0.55, 'rgba(255,179,0,0.035)');
      gradient.addColorStop(1, 'rgba(255,179,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawReferenceMuggu(rotationRef.current);

      if (autoRotate) {
        rotationRef.current = (rotationRef.current + 0.0028) % (Math.PI * 2);
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [color, autoRotate]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `SriRamEvents_25Dot_ChukkalaMelika_Muggu.png`;
    link.click();
  };

  return (
    <section
      id="rangoli-studio"
      className="relative overflow-hidden border-y border-white/10 bg-[#050505] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="h-4 w-4" />
            <span>Authentic Telugu Chukkala Muggu</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Neon <span className="text-amber-300">Chukkala Melika</span> Rangoli
          </h2>

          <p className="mt-4 text-sm font-medium leading-relaxed text-white/60 sm:text-base">
            A 25-dot Telugu muggu arranged as 1-3-5-5-5-3-1, with dense interlocking
            loops inspired by traditional Andhra / Telangana doorway rangoli.
          </p>

          <SingleLineRangoli variant="divider" color="#FFB300" dotColor="#FFE082" className="my-4" />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            <span className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-white/80">
              Muggu Styles
            </span>

            {presets.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStyle(st.id)}
                className={`block w-full rounded-2xl border p-4 text-left transition ${
                  selectedStyle === st.id
                    ? 'border-amber-300/70 bg-amber-300/10 shadow-[0_0_30px_rgba(255,179,0,0.12)]'
                    : 'border-white/10 bg-white/[0.03] hover:border-amber-300/40'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-extrabold text-white">{st.name}</h4>
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    {st.dots}
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold text-amber-300">{st.teluguName}</p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-white/55">
                  {st.description}
                </p>
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-2 text-xs font-bold text-white/70">Neon color:</span>
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                    color === c.value
                      ? 'border-white/50 bg-white/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30'
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-white/30"
                    style={{ backgroundColor: c.value }}
                  />
                  {c.name}
                </button>
              ))}
            </div>

            <div className="relative rounded-[28px] border border-amber-300/20 bg-black p-4 shadow-[0_0_70px_rgba(255,179,0,0.12)]">
              <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.10),transparent_62%)]" />

              <canvas
                ref={canvasRef}
                width={720}
                height={720}
                className="relative h-auto w-full max-w-[620px] rounded-2xl bg-black"
              />

              <div className="absolute left-6 top-5 font-mono text-[10px] font-bold tracking-[0.22em] text-amber-300/70">
                SRI RAM EVENTS
              </div>

              <div className="absolute bottom-5 right-6 font-mono text-[10px] font-bold tracking-[0.18em] text-white/35">
                CHUKKALA MELIKA • 25 DOT
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAutoRotate((value) => !value)}
                className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
              >
                {autoRotate ? <Pause className="h-4 w-4 text-amber-300" /> : <Play className="h-4 w-4 text-amber-300" />}
                {autoRotate ? 'Pause Rotation' : 'Rotate Live'}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-3 text-xs font-black text-black shadow-[0_0_24px_rgba(255,179,0,0.28)] transition hover:bg-amber-300"
              >
                <Download className="h-4 w-4" />
                Save PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

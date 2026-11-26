import React from 'react';
import MotionReveal from '@/components/ui/MotionReveal';

const PILLARS = [
  {
    number: '01',
    title: 'Personalised event concepts',
    description:
      'Every celebration begins with an original aesthetic direction shaped around your family traditions, venue architecture, and palette.',
  },
  {
    number: '02',
    title: 'End-to-end planning',
    description:
      'From initial concept boards and vendor coordination to final pack-down, a dedicated lead producer oversees every timeline.',
  },
  {
    number: '03',
    title: 'Creative styling',
    description:
      'Cohesive floral installations, table linens, ceremonial trays, and soft lighting layered with restrained luxury.',
  },
  {
    number: '04',
    title: 'Attention to detail',
    description:
      'Itemised clarity in planning, thoughtful guest pathways, and refined material finishes with zero last-minute compromises.',
  },
  {
    number: '05',
    title: 'Professional execution',
    description:
      'Calm, punctual on-site production completed well ahead of your guests’ arrival so you can simply savour the day.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-cream py-20 lg:py-28 border-b border-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <MotionReveal className="max-w-2xl space-y-3">
          <p className="eyebrow-label">WHY CHOOSE US</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-espresso">
            Composed luxury, grounded in reliability
          </h2>
        </MotionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => (
            <MotionReveal key={pillar.number} delay={idx * 0.05}>
              <div className="h-full bg-ivory border border-beige rounded-2xl p-8 space-y-4">
                <span className="font-serif text-3xl text-taupe font-medium">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-2xl font-medium text-espresso capitalize">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

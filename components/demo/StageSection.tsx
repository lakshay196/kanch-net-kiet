import type { ReactNode } from "react";

type StageSectionProps = {
  id: string;
  kicker: string;
  title: string;
  titleHi: string;
  role: string;
  roleHi: string;
  gate: string;
  gateHi: string;
  children: ReactNode;
};

export default function StageSection({
  id,
  kicker,
  title,
  titleHi,
  role,
  roleHi,
  gate,
  gateHi,
  children,
}: StageSectionProps) {
  const titleId = `${id}-title`;
  const gateId = `${id}-gate`;

  return (
    <section className="demo-stage" id={id} aria-labelledby={titleId}>
      <div>
        <p className="demo-kicker">{kicker}</p>
        <h2 id={titleId}>
          {title}
          <span lang="hi">{titleHi}</span>
        </h2>
        <p className="demo-role">
          {role} <span lang="hi">/ {roleHi}</span>
        </p>
      </div>
      <p className="demo-gate" id={gateId}>
        <span>{gate}</span>
        <span lang="hi">{gateHi}</span>
      </p>
      {children}
    </section>
  );
}

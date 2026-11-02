import type { ReactNode } from "react";

type StageSectionProps = {
  id: string;
  kicker: string;
  title: string;
  titleHi: string;
  role: string;
  roleHi: string;
  gate: string;
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
  children,
}: StageSectionProps) {
  const titleId = `${id}-title`;
  const gateId = `${id}-gate`;

  return (
    <section className="demo-stage" id={id} aria-labelledby={titleId}>
      <p className="demo-kicker">{kicker}</p>
      <h2 id={titleId}>{title}</h2>
      <p className="demo-lead" lang="hi">
        {titleHi}
      </p>
      <p className="demo-role">
        {role} <span lang="hi">/ {roleHi}</span>
      </p>
      <p className="demo-gate" id={gateId}>
        {gate}
      </p>
      {children}
    </section>
  );
}

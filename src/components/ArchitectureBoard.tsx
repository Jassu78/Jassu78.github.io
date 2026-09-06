import type { ArchLayer } from "../content";

type Props = {
  layers: ArchLayer[];
  caption?: string;
  /** Visual tone: matches each site via CSS variables --arch-* */
  className?: string;
};

/**
 * Layered architecture board — swimlanes with nodes.
 * Prefer this over bullet lists for case studies / featured projects.
 */
export function ArchitectureBoard({
  layers,
  caption = "Architecture — layered view",
  className = "",
}: Props) {
  if (!layers.length) return null;

  return (
    <figure className={`arch-board ${className}`.trim()} aria-label={caption}>
      <figcaption className="arch-board__caption">{caption}</figcaption>
      <div className="arch-board__lanes">
        {layers.map((layer, li) => (
          <div className="arch-board__lane" key={layer.id}>
            <div className="arch-board__lane-title">{layer.title}</div>
            <div className="arch-board__nodes">
              {layer.items.map((item) => (
                <div className="arch-board__node" key={`${layer.id}-${item.label}`}>
                  <strong>{item.label}</strong>
                  {item.note ? <span>{item.note}</span> : null}
                </div>
              ))}
            </div>
            {li < layers.length - 1 ? (
              <div className="arch-board__arrow" aria-hidden="true">
                <span className="arch-board__arrow-line" />
                <span className="arch-board__arrow-head">→</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}

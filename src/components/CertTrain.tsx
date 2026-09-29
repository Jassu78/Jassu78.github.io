import { useState } from "react";
import { Link } from "react-router-dom";
import { certifications, type Certification } from "../content";

function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL;
  return `${base.endsWith("/") ? base : `${base}/`}${path.replace(/^\//, "")}`;
}

function TrainBadge({
  cert,
  decorative,
}: {
  cert: Certification;
  decorative?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(cert.badgeImageUrl) && !failed;

  const inner = showImage && cert.badgeImageUrl ? (
    <img
      className="cert-train__img"
      src={assetUrl(cert.badgeImageUrl)}
      alt=""
      width={56}
      height={56}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  ) : (
    <span className="cert-train__mark" aria-hidden="true">
      {cert.badgeMark}
    </span>
  );

  if (decorative) {
    return (
      <span className="cert-train__item" aria-hidden="true">
        {inner}
        <span className="cert-train__label">{cert.badgeMark}</span>
      </span>
    );
  }

  if (cert.credentialUrl) {
    return (
      <a
        className="cert-train__item"
        href={cert.credentialUrl}
        target="_blank"
        rel="noreferrer"
        title={cert.name}
        aria-label={`${cert.name} — open credential`}
      >
        {inner}
        <span className="cert-train__label">{cert.badgeMark}</span>
      </a>
    );
  }

  return (
    <span className="cert-train__item" title={cert.name}>
      {inner}
      <span className="cert-train__label">{cert.badgeMark}</span>
    </span>
  );
}

export function CertTrain() {
  return (
    <section className="cert-train" aria-labelledby="cert-train-heading">
      <div className="cert-train__head">
        <h2 id="cert-train-heading" className="cert-train__title">
          Certificates
        </h2>
        <Link to="/achievements" className="cert-train__more">
          all credentials →
        </Link>
      </div>
      <div className="cert-train__viewport">
        <div className="cert-train__track">
          {certifications.map((c) => (
            <TrainBadge key={`a-${c.name}`} cert={c} />
          ))}
          {certifications.map((c) => (
            <TrainBadge key={`b-${c.name}`} cert={c} decorative />
          ))}
        </div>
      </div>
    </section>
  );
}

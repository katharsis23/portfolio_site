/** Contact — reachable channels as real links. */
export function Contact({
  items,
}: {
  items: { label: string; value: string; href?: string }[];
}) {
  return (
    <section className="ws-section" aria-labelledby="contact-heading">
      <h1 id="contact-heading" className="ws-h1">
        Contact
      </h1>
      <ul className="ws-contact">
        {items.map((item) => (
          <li key={item.label} className="ws-contact-item">
            <span className="ws-meta">{item.label}</span>
            {item.href ? (
              <a className="ws-contact-link" href={item.href}>
                {item.value}
              </a>
            ) : (
              <span>{item.value}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

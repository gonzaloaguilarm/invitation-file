export const DressCode = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <section className="section compact">
    <h2>{title}</h2>
    <p>{value}</p>
    <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>{description}</p>
  </section>  
);

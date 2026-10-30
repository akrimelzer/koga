import Countdown from "./components/Countdown";
import PhotoHearts from "./components/PhotoHearts";
import Petals from "./components/Petals";
import Reveal from "./components/Reveal";
import RsvpForm from "./components/RsvpForm";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Home() {
  return (
    <main className="frame">
      <section className="hero">
        <Petals />

        <div className="monogram" aria-hidden>
          <span className="rise" style={d(0)}>K</span>
          <span className="amp rise" style={d(250)}>&amp;</span>
          <span className="rise" style={d(500)}>A</span>
        </div>

        <PhotoHearts />

        <h1 className="caps title rise" style={d(700)}>Vi gifter oss</h1>
        <p className="caps names rise" style={d(900)}>Karoline &amp; Andreas</p>
        <p className="caps small rise" style={d(1100)}>19. juni 2027</p>
        <p className="caps small rise" style={d(1200)}>Eidskog kirke</p>
        <Countdown />
        <a href="#info" className="scroll-hint rise" style={d(1700)} aria-label="Scroll ned">
          ↓
        </a>
      </section>

      <section className="section" id="info">
        <Reveal>
          <h2 className="caps heading">Dagen</h2>
          <div className="rule" />
        </Reveal>
        <Reveal delay={150}>
          <p className="lead">
            Vi gleder oss til å feire kjærligheten sammen med dere som betyr mest for oss.
          </p>
        </Reveal>
        <div className="details">
          <Reveal delay={250}>
            <p className="caps small">Seremoni</p>
            <p>Eidskog kirke</p>
            <p>Lørdag 19. juni 2027</p>
          </Reveal>
          <Reveal delay={400}>
            <p className="caps small">Festen</p>
            <p>Sted og klokkeslett</p>
            <p>kommer</p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="rsvp">
        <Reveal>
          <h2 className="caps heading">Svar</h2>
          <div className="rule" />
        </Reveal>
        <Reveal delay={150}>
          <p className="lead">Gi oss beskjed om du kan komme, og om det er noe vi må ta hensyn til.</p>
        </Reveal>
        <Reveal delay={250}>
          <RsvpForm />
        </Reveal>
      </section>

      <footer className="footer">
        <p className="caps small">K &amp; A</p>
      </footer>
    </main>
  );
}

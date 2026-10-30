import Image from "next/image";
import Countdown from "./components/Countdown";
import RsvpForm from "./components/RsvpForm";

export default function Home() {
  return (
    <main className="frame">
      <section className="hero">
        <div className="monogram" aria-hidden>
          <span>K</span>
          <span className="amp">&amp;</span>
          <span>A</span>
        </div>

        {/* Put the photo at public/couple.jpg */}
        <Image
          src="/couple.jpg"
          alt="Karoline og Andreas"
          width={280}
          height={280}
          priority
          className="photo"
        />

        <h1 className="caps title">Vi gifter oss</h1>
        <p className="caps names">Karoline &amp; Andreas</p>
        <p className="caps small">19. juni 2027</p>
        <p className="caps small">Eidskog kirke</p>
        <Countdown />
      </section>

      <section className="section" id="info">
        <h2 className="caps heading">Dagen</h2>
        <div className="rule" />
        <p className="lead">
          Vi gleder oss til å feire kjærligheten sammen med dere som betyr mest for oss.
        </p>
        <div className="details">
          <div>
            <p className="caps small">Seremoni</p>
            <p>Eidskog kirke</p>
            <p>Lørdag 19. juni 2027</p>
          </div>
          <div>
            <p className="caps small">Festen</p>
            <p>Sted og klokkeslett</p>
            <p>kommer</p>
          </div>
        </div>
      </section>

      <section className="section" id="rsvp">
        <h2 className="caps heading">Svar</h2>
        <div className="rule" />
        <p className="lead">Gi oss beskjed om du kan komme, og om det er noe vi må ta hensyn til.</p>
        <RsvpForm />
      </section>

      <footer className="footer">
        <p className="caps small">K &amp; A</p>
      </footer>
    </main>
  );
}

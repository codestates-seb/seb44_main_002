import Slider from './Slider/Slider';
import Ranking from './Ranking/Ranking';
import Advice from './Advice/Advice';

export default function Main() {
  return (
    <main className="bg-gradient-to-r from-gradi-to to-gradi-from">
      <section className="h-screen">
        <Slider />
      </section>
      <section className="flex justify-center">
        <Ranking />
      </section>
      <section>
        <Advice />
      </section>
    </main>
  );
}

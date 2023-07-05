import Slider from '../components/Slider/Slider';
import Ranking from '../components/Ranking/Ranking';
import Advice from '../components/Advice/Advice';

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

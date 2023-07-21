import { useState } from 'react';

import Slider from './Slider/Slider';
import Ranking from './Ranking/Ranking';
import Advice from './Advice/Advice';

export default function Main() {
  const [error, setError] = useState(false);
  return (
    <main className="bg-gradient-to-r from-gradi-to to-gradi-from">
      <section className="h-screen">
        <Slider />
      </section>
      <section className="flex justify-center">
        <Ranking error={error} setError={setError} />
      </section>
      <section>
        <Advice error={error} setError={setError} />
      </section>
    </main>
  );
}

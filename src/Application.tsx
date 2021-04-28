import * as React from 'react';
import { fetchDogFacts, DogFactType } from './dog-facts';

const Form = ({setDogFacts} : {setDogFacts: React.Dispatch<React.SetStateAction<DogFactType[] | null>>}) => {
  const [nDogFact, setNDogFact] = React.useState<number>(3)
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const d = await fetchDogFacts(nDogFact)
        setDogFacts(d)
      }}
    >
      <div className="fact-input">
        <label htmlFor="number-of-facts">Number of Dog Facts</label>
        <input type="number" value={nDogFact} min="1" max="10" id="number-of-facts" onChange={(e) => {
          setNDogFact(+e.target.value)
        }} />
      </div>
      <input type="submit" value="Fetch Dog Facts" />
    </form>
  );
};

type FactProp = {
  fact: string
}

const Fact = ({ fact }: FactProp ) => {
  return (
    <article className="dog-fact">
      <h3>Dog Fact</h3>
      <p>{fact}</p>
    </article>
  );
};

const Application = () => {
  const [dogFacts, setDogFacts] = React.useState<DogFactType[] | null>(null)
  
  return (
    <main>
      <Form setDogFacts={setDogFacts}/>
      <section>
        {
          dogFacts?.map(item => {
            return (
              <Fact key={item.id} fact={item.fact} />
            )
          })
        }
      </section>
    </main>
  );
};

export default Application;

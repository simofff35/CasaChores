import HomeSearch from "./homeSearch";

interface heroSearch {
  typeSelc: number;
  setTypeSelc: (i: number) => void;
}

const HeroSearch: React.FC<heroSearch> = ({ typeSelc, setTypeSelc }) => {
  let content: any;

  const handler1 = (e: any) => {
    setTypeSelc(1);
  };

  const handler0 = (e: any) => {
    setTypeSelc(0);
  };

  if (typeSelc === 0) {
    content = (
      <>
        <section className="bg-white flex-grow ">
          <div className="flex flex-row w-full p-7 items-center mx-auto h-full ">
            <div className="container mx-auto px-8">
              <h1 className="max-w-2xl mb-3 text-4xl font-bold">
                Maison amélioration <br /> rendue facile.
              </h1>

              <div
                className="inline-flex items-center justify-center mr-4 text-base font-medium text-center
        text-teal-500 cursor-pointer"
              >
                ENGAGEZ UN PRO
              </div>
              <div
                className="inline-flex items-center justify-center text-base font-medium text-center
        text-gray-400 cursor-pointer"
                onClick={handler1}
              >
                TROUVER DES CLIENTS
              </div>

              <HomeSearch typeSelc={typeSelc} setTypeSelc={setTypeSelc} />

              <p className="text-gray-600 mt-6  ">
                Essayez de chercher un Plombier, Bricoleur, Électricien ou
                Paysagiste
              </p>
            </div>

            <div className="hidden md:block md:basis-3/5">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
              />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (typeSelc === 1) {
    content = (
      <>
        <section className="bg-white flex-grow ">
          <div className="flex flex-row w-full p-7 items-center mx-auto h-full ">
            <div className="container mx-auto px-8">
              <div
                className="inline-flex items-center justify-center mr-4 text-base font-medium text-center
                text-gray-400 cursor-pointer"
                onClick={handler0}
              >
                ENGAGEZ UN PRO
              </div>
              <div
                className="inline-flex items-center justify-center text-base font-medium text-center
                text-teal-500 cursor-pointer"
              >
                TROUVER DES CLIENTS
              </div>

              <h1 className="max-w-2xl mt-3 mb-2 text-4xl font-bold">
                Rencontrez de nouveaux clients dans votre région.
              </h1>

              <p className="text-gray-600 text-sm">
                Inscrivez-vous pour commencer à développer votre entreprise.
              </p>

              <button
                className="inline-flex items-center  px-4 py-2.5 mt-6  text-sm font-medium
                text-white bg-gray-800 rounded-lg border  hover:bg-gray-700 
                ring-0 focus:outline-none focus:ring-blue-300 "
              >
                Commencer
              </button>
            </div>

            <div className="hidden md:block md:basis-3/5">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
              />
            </div>
          </div>
        </section>
      </>
    );
  }

  return content;
};

export default HeroSearch;
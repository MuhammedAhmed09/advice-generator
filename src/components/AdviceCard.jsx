import axios from "axios";
import { useEffect, useState } from "react";

const AdviceCard = () => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMess, setErrorMess] = useState(null);

  const fetchAnAdvice = async () => {
    try {
      setLoading(true);
      setErrorMess(null);
      const response = await axios.get("https://api.adviceslip.com/advice");
      setAdvice(response.data.slip);
    } catch (error) {
      console.error(error);
      setErrorMess("There was an error fetching advice.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnAdvice();
  }, []);

  return (
    <article className="bg-Blue-900 rounded-lg p-6 pb-10 max-w-xs min-w-[375px] relative text-center text-white">
      {loading && <p className="text-Green-300">Loading...</p>}
      {errorMess && <p className="text-red-600">{errorMess}</p>}

      {advice && !loading && !errorMess && (
        <div className="flex flex-col items-center gap-4">
          <h6 className="text-xs text-Green-300">Advice #{advice.id}</h6>
          <p>"{advice.advice}"</p>

          <div className="hidden sm:flex">
            <img src="/images/pattern-divider-desktop.svg" alt="pattern divider" />
          </div>
          <div className="flex sm:hidden">
            <img src="/images/pattern-divider-mobile.svg" alt="pattern divider" />
          </div>

          <button
            onClick={!loading ? fetchAnAdvice : undefined}
            disabled={loading}
            className="absolute -bottom-3.5 rounded-full bg-Green-300/80 hover:shadow-sm hover:Green-green-300 duration-200 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/images/icon-dice.svg" alt="dice icon" className="p-2" />
          </button>
        </div>
      )}
    </article>
  );
};

export default AdviceCard;

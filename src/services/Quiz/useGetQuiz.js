import { useEffect, useState } from "react";
import axiosInstance from "../axios";

const useGetQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance('/api.php', {
          amount: 11,
          type: "multiple",
          category: 15
        });
        setQuiz(response.results);
      } catch (err) {
        if (err.response && err.response.status === 429) {
          setError("Demasiadas solicitudes a la API. Por favor, espera unos minutos e intenta de nuevo.");
        }else{
          setError("Error al obtener el quiz. Por favor, intenta de nuevo más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  return { quiz, loading, error };
};




export default useGetQuiz;
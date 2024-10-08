import { Header } from '@/components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface CarInfo {
  Make_ID: number;
  Make_Name: string;
  Model_Name: string;
  Model_ID: number;
}

const ResultPage = () => {
  const router = useRouter();
  const { makeId, year } = router.query;

  const [carData, setCarData] = useState<CarInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `${apiUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCarData(result.Results);
      } catch (error: unknown) {
        if (error instanceof Error)
          setError(error.message || 'Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    if (makeId && year) {
      fetchCarData();
    }
  }, [makeId, year]);

  return (
    <>
      <Header />
      <div className="max-w-screen-lg mx-auto text-center py-40">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {!loading && !error && (
          <>
            <h1 className="text-3xl font-bold">
              Results for {makeId} - Year {year}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {carData?.map((car) => (
                <div
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
                  key={car.Model_ID}
                >
                  <h2 className="text-xl font-semibold">
                    Made By: {car.Make_Name}
                  </h2>
                  <p className="text-gray-700">
                    Vehicle Name: {car.Model_Name}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ResultPage;

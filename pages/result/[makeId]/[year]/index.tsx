import { Header } from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        const result = await response.json();
        setCarData(result.Results);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (makeId && year) {
      fetchCarData();
    }
  }, [makeId, year]);
  console.log(carData);

  return (
    <>
      <Header />
      <div className="max-w-screen-lg mx-auto text-center py-10">
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
              <p className="text-gray-700">Vehicle Name: {car.Model_Name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultPage;

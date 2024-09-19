import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ApiResponse {
  Results: CarInfo[];
  SearchCriteria: string;
  Message: string;
  Count: number;
}

interface CarInfo {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export const FilterList = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [carModel, setCarModel] = useState<number | null>(null);
  const [carYear, setCarYear] = useState<number | null>(null);

  const currentYear = new Date().getFullYear();
  const startYear = 2015;
  const yearsAvailable = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `${apiUrl}/GetMakesForVehicleType/car?format=json`
        );

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(carModel, carYear);
  }, [carModel, carYear]);

  return (
    <div className="h-screen flex pt-40">
      <form className="max-w-screen-lg mx-auto flex flex-col items-center gap-6 mt-10">
        <div className="w-full max-w-lg">
          <Image
            src="/cars.png"
            alt="Cars"
            layout="responsive"
            width={1200}
            height={800}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-4 w-full">
          <select
            className="w-full md:max-w-xs rounded-lg h-8 my-auto"
            value={carModel || ""}
            onChange={(e) => setCarModel(Number(e.target.value))}
          >
            <option value="" disabled>
              Choose a model
            </option>
            {data?.Results.map((car) => (
              <option key={car.MakeId} value={car.MakeId}>
                {car.MakeName}
              </option>
            ))}
          </select>
          <select
            className="w-full md:max-w-xs rounded-lg my-auto h-8"
            value={carYear || ""}
            onChange={(e) => setCarYear(parseInt(e.target.value))}
          >
            <option value="" disabled>
              Select a year
            </option>
            {yearsAvailable.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <Link
            href={carModel && carYear ? `/result/${carModel}/${carYear}` : "#"}
            className="relative my-auto"
          >
            <button
              disabled={!carModel || !carYear}
              className={`w-full md:max-w-xs rounded-lg bg-white h-8 border-slate-400 border-2 px-10 hover:bg-red-400 transition-colors my-auto ${
                carModel && carYear
                  ? "hover:bg-green-500 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

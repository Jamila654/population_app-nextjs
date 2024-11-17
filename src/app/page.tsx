"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  interface HistoricalPopulation {
    year: number;
    population: number;
    migrants: number;
    median_age: number;
    fertility_rate: number;
    rank: number;
  }

  interface PopulationForecast {
    year: number;
    population: number;
    migrants: number;
    median_age: number;
    fertility_rate: number;
    rank: number;
  }

  interface Population {
    country_name: string;
    historical_population: HistoricalPopulation[];
    population_forecast: PopulationForecast[];
  }

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [populationInfo, setPopulationInfo] = useState<Population | null>();

  const handleExploreBtn = async () => {
    setisLoading(true);
    setError("");
    setPopulationInfo(null);

    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/population?country=${inputCountry}`,
        { headers: { "X-Api-Key": "lKtqOcitXKlPdf5kvf1ysg==AguhIHwYblypgdyF" } }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
  

      const data = await res.json();
      if (data && Array.isArray(data.historical_population) && data.historical_population.length > 0) {
        setPopulationInfo(data);
      } else {
        throw new Error("Invalid country or data unavailable");
      }
  
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-[#121212] h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-gray-300">
      <CardContainer className="flex border border-white flex-col items-center justify-center w-full sm:w-[40rem] max-h-[80vh] bg-[#1E1E1E] rounded-lg shadow-xl overflow-hidden">
        <CardBody
          className={`relative overflow-y-auto w-full px-6 py-4 ${
            populationInfo ? "max-h-[80vh]" : "h-auto"
          }`}
        >
          <h1 className="text-2xl font-bold text-emerald-400 mb-4">
            Global Population Explorer
          </h1>
          <p className="text-gray-400 text-sm mb-4">
            Enter the name of any country to discover its population and other
            key details instantly.
          </p>
          <Label className="text-gray-300 mb-2">Enter Country Name:</Label>
          <Input
            className="w-full mb-4 bg-[#2A2A2A] text-white placeholder-gray-500 border border-gray-500 rounded-md focus:ring-emerald-500 focus:ring-2"
            value={inputCountry}
            onChange={(e) => setInputCountry(e.target.value)}
          />
          <button
            onClick={handleExploreBtn}
            className="px-4 py-2 rounded-lg w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold mb-4"
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Explore Now"
            )}
          </button>
          {error && (
            <p className="text-red-500 font-extrabold text-center mb-4">{error}</p>
          )}
          {populationInfo && (
            <div>
              <h2 className="text-lg font-bold text-emerald-400 mb-2">
                {populationInfo.country_name}
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-300 mb-2">
                  Population History:
                </h3>
                {populationInfo.historical_population.map((entry, index) => (
                  <div
                    key={index}
                    className="p-2 mb-2 bg-[#252525] rounded-md"
                  >
                    <p>Year: {entry.year}</p>
                    <p>Population: {entry.population.toLocaleString()}</p>
                    <p>Migrants: {entry.migrants.toLocaleString()}</p>
                    <p>Median Age: {entry.median_age}</p>
                    <p>Fertility Rate: {entry.fertility_rate}</p>
                    <p>Rank: {entry.rank}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold text-gray-300 mb-2">
                  Population Forecast:
                </h3>
                {populationInfo.population_forecast.map((entry, index) => (
                  <div
                    key={index}
                    className="p-2 mb-2 bg-[#252525] rounded-md"
                  >
                    <p>Year: {entry.year}</p>
                    <p>Population: {entry.population.toLocaleString()}</p>
                    <p>Migrants: {entry.migrants.toLocaleString()}</p>
                    <p>Median Age: {entry.median_age}</p>
                    <p>Fertility Rate: {entry.fertility_rate}</p>
                    <p>Rank: {entry.rank}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </CardContainer>
      <Image
        src="/people.png"
        alt="people"
        width={150}
        height={150}
        className="absolute -bottom-4 right-0 sm:w-[300px]"
      />
    </div>
  );
}




import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Bar } from "react-chartjs-2";
import {
  reciveAttributeSelectionPromise,
  recivePromiseByAttributeCount,
} from "../../../Services/DatabaseService";
import { LocalLoadingSpinner } from "../../Loading";

const GearTypeRatioChart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [generalCounts, setGeneralCounts] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  }>();

  useEffect(() => {
    makeSchoolsData();
  }, []);

  const makeSchoolsData = async () => {
    const types = await reciveAttributeSelectionPromise("gears", "type");

    let promList: { name: string; count: number }[] = [];
    for (const type of types) {
      if (type !== undefined) {
        const count = await recivePromiseByAttributeCount(
          "gears",
          "type",
          type as number
        );
        promList.push({
          name: type.toString(),
          count: count,
        });
      }
    }

    let names: string[] = [];
    let counts: number[] = [];
    let colors: string[] = [];
    promList.forEach((count) => {
      names.push(count.name);
      counts.push(count.count);
      colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    });
    setGeneralCounts({
      labels: names,
      datasets: [
        {
          data: counts,
          backgroundColor: colors,
        },
      ],
    });
    setLoading(false);
  };

  return (
    <OptionSection>
      <SelectionTitle>Type Graph</SelectionTitle>
      {!loading && (
        <div style={{ width: "100%", paddingBottom: "10px" }}>
          <Bar data={generalCounts} />
        </div>
      )}
      {loading && <LocalLoadingSpinner />}
    </OptionSection>
  );
};

export default GearTypeRatioChart;

const OptionSection = styled.div`
  flex: 1 1 800px;
  width: calc(100% - 1em);
  max-width: 800px;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

const SelectionTitle = styled.div`
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  min-width: calc(100% - 20px);
  font-weight: bold;
  text-algin: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.input.color};
  background-color: ${({ theme }) => theme.input.backgroundColor};
`;

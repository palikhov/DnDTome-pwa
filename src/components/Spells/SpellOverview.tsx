import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useReciveAll } from "../../Database/SpellService";
import { LoadingSpinner } from "../Loading";
import Spell from "../../Data/Spell";
import SpellTile from "./SpellTile";
import Navigation from "../Navigation/Navigation";
import Header from "../Header";

const SpellOverview = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const { data, loading } = useReciveAll("spells");

  useEffect(() => {
    if (!loading) {
      setSpells(data as Spell[]);
    }
  }, [loading, data]);

  return (
    <App>
      <Header />
      <Navigation />
      {loading && <LoadingSpinner />}
      {!loading &&
        spells.map((spell, index) => {
          return <SpellTile key={index} spell={spell}></SpellTile>;
        })}
    </App>
  );
};

export default SpellOverview;

const App = styled.div`
  padding-top: 4rem;
  width: 100%;
  min-height: calc(100vh - 4rem);
  height: auto;
  background-color: ${({ theme }) => theme.main.backgroundColor};
  display: flex;
  flex-wrap: wrap;
`;

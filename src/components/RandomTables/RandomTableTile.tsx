import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RandomTable from "../../Data/RandomTable";

import { GiResize } from "react-icons/gi";
import { LoadingSpinner } from "../Loading";

interface $Props {
  randomTable: RandomTable;
}

const RandomTableTile = ({ randomTable }: $Props) => {
  return (
    <Tile to={"/randomTable-detail/id/" + randomTable.id}>
      <Suspense fallback={<LoadingSpinner />}>
        <PropWrapper>
          <Name>
            <b>{randomTable.name}</b>
          </Name>

          <PropRowWrapper>
            <RowProp>
              <GiResize />
              Rows: {randomTable.rows.length}
            </RowProp>
          </PropRowWrapper>
        </PropWrapper>
      </Suspense>
    </Tile>
  );
};

export default RandomTableTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Name = styled.div`
  height: auto;
  flex: 1 1 auto;
  padding: 10px;
  margin: 5px 5px 5px 0;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.3);
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;
const PropRowWrapper = styled(PropWrapper)`
  flex-wrap: nowrap;
  padding: 0 0 5px 0;
  flex: 1 1 auto;
  width: 100%;
`;

const RowProp = styled.div`
  height: 12px;
  margin: 0 5px 0 0;
  flex: 1 1 auto;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
  }
}
`;

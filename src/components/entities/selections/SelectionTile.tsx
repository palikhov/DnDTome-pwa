import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Selection from "../../../data/Selection";
import { LoadingSpinner } from "../../Loading";

interface $Props {
  selection: Selection;
}

const SelectionTile = ({ selection }: $Props) => {
  return (
    <Tile to={"/selection-detail/id/" + selection.id}>
      <Suspense fallback={<LoadingSpinner />}>
        <Name>
          <b>{selection.name}</b>
        </Name>

        <PropWrapper>
          <WideProp>Options: {selection.selectionOptions.length}</WideProp>
        </PropWrapper>
      </Suspense>
    </Tile>
  );
};

export default SelectionTile;

const Tile = styled(Link)`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;
  cursor: pointer;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
  border-radius: 5px;
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Prop = styled.div`
  height: 12px;
  width: calc(50% - 22.5px);
  margin: 0 0 5px 5px;
  float: left;
  line-height: 10px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:nth-child(odd) {
  margin: 0 0 5px 0px;
  }
}
`;

const WideProp = styled(Prop)`
  margin: 0 0 5px 0px;
  width: calc(100% - 20px);
`;

import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import GearDetail from "../GearDetail";

type TParams = { id: string };

const IdToGear = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [gear, loading, error] = useItem(db.gears, +match.params.id);

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && gear !== undefined && (
        <GearDetail gear={gear} isNew={gear.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToGear;

import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import LocationDetail from "../LocationDetail";

type TParams = { id: string };

const IdToLocation = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [location, loading, error] = useItem(db.locations, +match.params.id);

  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && location !== undefined && (
        <LocationDetail location={location} isNew={location.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToLocation;

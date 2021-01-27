import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import SubraceDetail from "../SubraceDetail";

type TParams = { id: string };

const IdToSubrace = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [subrace, loading, error] = useItem(db.subraces, +match.params.id);
  return (
    <>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && subrace !== undefined && (
        <SubraceDetail subrace={subrace} isNew={subrace.name === "" ? true : false} />
      )}
    </>
  );
};

export default IdToSubrace;

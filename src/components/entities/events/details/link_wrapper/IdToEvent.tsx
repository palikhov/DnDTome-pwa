import React from "react";
import { RouteComponentProps } from "react-router";
import { MyAppDatabase } from "../../../../../database/MyDatabase";
import { useItem } from "../../../../../hooks/DexieHooks";
import { LoadingSpinner } from "../../../../Loading";
import AppWrapper from "../../../../AppWrapper";
import EventDetail from "../EventDetail";

type TParams = { id: string };

const IdToEvent = ({ match }: RouteComponentProps<TParams>) => {
  const db = new MyAppDatabase();
  const [event, loading, error] = useItem(db.events, +match.params.id);

  return (
    <AppWrapper>
      {!error && loading && <LoadingSpinner />}
      {error && !loading && <>Fail by Id</>}
      {!error && !loading && event !== undefined && (
        <EventDetail event={event} isNew={event.name === "" ? true : false} />
      )}
    </AppWrapper>
  );
};

export default IdToEvent;

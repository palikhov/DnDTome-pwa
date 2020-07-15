import React from "react";
import { MemoryRouter, Switch, Route } from "react-router";
import { MyThemeProvider } from "./components/Theme/MyThemeProvider";

import Options from "./components/Options/Options";
import SpellOverview from "./components/Entities/Spells/SpellOverview";
import IdToSpell from "./components/Entities/Spells/Detail/LinkWrapper/IdToSpell";
import NameToSpell from "./components/Entities/Spells/Detail/LinkWrapper/NameToSpell";
import NameToGear from "./components/Entities/Gear/Detail/LinkWrapper/NameToGear";
import IdToGear from "./components/Entities/Gear/Detail/LinkWrapper/IdToGear";
import GearOverview from "./components/Entities/Gear/GearOverview";
import MonsterOverview from "./components/Entities/Monster/MonsterOverview";
import NameToMonster from "./components/Entities/Monster/Detail/LinkWrapper/NameToMonster";
import IdToMonster from "./components/Entities/Monster/Detail/LinkWrapper/IdToMonster";
import NameToRace from "./components/Entities/Races/Detail/LinkWrapper/NameToRace";
import IdToRace from "./components/Entities/Races/Detail/LinkWrapper/IdToRace";
import NameToSubrace from "./components/Entities/Subraces/Detail/LinkWrapper/NameToSubrace";
import IdToSubrace from "./components/Entities/Subraces/Detail/LinkWrapper/IdToSubrace";
import RaceOverview from "./components/Entities/Races/RaceOverview";

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={RaceOverview}></Route>
          <Route path="/spell-detail/name/:name" component={NameToSpell}></Route>
          <Route path="/spell-detail/id/:id" component={IdToSpell}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
          <Route path="/gear-detail/name/:name" component={NameToGear}></Route>
          <Route path="/gear-detail/id/:id" component={IdToGear}></Route>
          <Route path="/gear-overview" component={GearOverview}></Route>
          <Route path="/monster-detail/name/:name" component={NameToMonster}></Route>
          <Route path="/monster-detail/id/:id" component={IdToMonster}></Route>
          <Route path="/monster-overview" component={MonsterOverview}></Route>
          <Route path="/race-detail/name/:name" component={NameToRace}></Route>
          <Route path="/race-detail/id/:id" component={IdToRace}></Route>
          <Route path="/race-overview" component={RaceOverview}></Route>
          <Route path="/subrace-detail/name/:name" component={NameToSubrace}></Route>
          <Route path="/subrace-detail/id/:id" component={IdToSubrace}></Route>
          <Route path="/options" component={Options}></Route>
        </Switch>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;

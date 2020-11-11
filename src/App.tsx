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
import NameToItem from "./components/Entities/Item/Detail/LinkWrapper/NameToItem";
import IdToItem from "./components/Entities/Item/Detail/LinkWrapper/IdToItem";
import ItemOverview from "./components/Entities/Item/ItemOverview";
import NameToClass from "./components/Entities/Classes/Detail/LinkWrapper/NameToClass";
import IdToClass from "./components/Entities/Classes/Detail/LinkWrapper/IdToClass";
import ClassOverview from "./components/Entities/Classes/ClassOverview";
import NameToSubclass from "./components/Entities/Subclasses/Detail/LinkWrapper/NameToSubclass";
import IdToSubclass from "./components/Entities/Subclasses/Detail/LinkWrapper/IdToSubclass";
import NameToChar from "./components/Entities/Chars/Detail/LinkWrapper/NameToChar";
import IdToChar from "./components/Entities/Chars/Detail/LinkWrapper/IdToChar";
import CharOverview from "./components/Entities/Chars/CharOverview";
import CharLab from "./components/Entities/Chars/Lab/CharLab";
import EncounterOverview from "./components/Encounters/EncounterOverview";
import NameToEncounter from "./components/Encounters/Detail/LinkWrapper/NameToEncounter";
import IdToEncounter from "./components/Encounters/Detail/LinkWrapper/IdToEncounter";
import Statistics from "./components/Statistics/Statistics";
import Library from "./components/Library/Library";
import IdToBook from "./components/Library/Detail/LinkWrapper/IdToBook";
import NameToBook from "./components/Library/Detail/LinkWrapper/NameToBook";
import Home from "./components/Home/Home";
import Help from "./components/Help/Help";
import NameToSelection from "./components/Entities/Selections/Detail/LinkWrapper/NameToSelection";
import SelectionOverview from "./components/Entities/Selections/SelectionOverview";
import IdToSelection from "./components/Entities/Selections/Detail/LinkWrapper/IdToSelection";
import IdToRandomTable from "./components/RandomTables/Detail/LinkWrapper/IdToRandomTable";
import NameToRandomTable from "./components/RandomTables/Detail/LinkWrapper/NameToRandomTable";
import RandomTableOverview from "./components/RandomTables/RandomTableOverview";

const App = () => {
  return (
    <MyThemeProvider>
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route path="/spell-detail/name/:name" component={NameToSpell}></Route>
          <Route path="/spell-detail/id/:id" component={IdToSpell}></Route>
          <Route path="/spell-overview" component={SpellOverview}></Route>
          <Route path="/gear-detail/name/:name" component={NameToGear}></Route>
          <Route path="/gear-detail/id/:id" component={IdToGear}></Route>
          <Route path="/gear-overview" component={GearOverview}></Route>
          <Route path="/item-detail/name/:name" component={NameToItem}></Route>
          <Route path="/item-detail/id/:id" component={IdToItem}></Route>
          <Route path="/item-overview" component={ItemOverview}></Route>
          <Route path="/monster-detail/name/:name" component={NameToMonster}></Route>
          <Route path="/monster-detail/id/:id" component={IdToMonster}></Route>
          <Route path="/monster-overview" component={MonsterOverview}></Route>
          <Route path="/race-detail/name/:name" component={NameToRace}></Route>
          <Route path="/race-detail/id/:id" component={IdToRace}></Route>
          <Route path="/race-overview" component={RaceOverview}></Route>
          <Route path="/subrace-detail/name/:name" component={NameToSubrace}></Route>
          <Route path="/subrace-detail/id/:id" component={IdToSubrace}></Route>
          <Route path="/class-detail/name/:name" component={NameToClass}></Route>
          <Route path="/class-detail/id/:id" component={IdToClass}></Route>
          <Route path="/class-overview" component={ClassOverview}></Route>
          <Route path="/subclass-detail/name/:name" component={NameToSubclass}></Route>
          <Route path="/subclass-detail/id/:id" component={IdToSubclass}></Route>
          <Route path="/char-detail/name/:name" component={NameToChar}></Route>
          <Route path="/char-detail/id/:id" component={IdToChar}></Route>
          <Route path="/char-overview" component={CharOverview}></Route>
          <Route path="/char-lab" component={CharLab}></Route>
          <Route path="/encounter-detail/name/:name" component={NameToEncounter}></Route>
          <Route path="/encounter-detail/id/:id" component={IdToEncounter}></Route>
          <Route path="/encounter-overview" component={EncounterOverview}></Route>
          <Route path="/book-detail/name/:name" component={NameToBook}></Route>
          <Route path="/book-detail/id/:id" component={IdToBook}></Route>
          <Route path="/selection-detail/name/:name" component={NameToSelection}></Route>
          <Route path="/selection-detail/id/:id" component={IdToSelection}></Route>
          <Route path="/selection-overview" component={SelectionOverview}></Route>
          <Route path="/randomTable-detail/name/:name" component={NameToRandomTable}></Route>
          <Route path="/randomTable-detail/id/:id" component={IdToRandomTable}></Route>
          <Route path="/randomTable-overview" component={RandomTableOverview}></Route>
          <Route path="/statistics" component={Statistics}></Route>
          <Route path="/options" component={Options}></Route>
          <Route path="/library" component={Library}></Route>
          <Route path="/help" component={Help}></Route>
        </Switch>
      </MemoryRouter>
    </MyThemeProvider>
  );
};

export default App;
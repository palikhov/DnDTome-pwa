import { faBolt, faFilePdf, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useCallback } from "react";
import { GiCryoChamber } from "react-icons/gi";
import styled from "styled-components";
import Npc from "../../../../data/campaign/Npc";
import BuildChar from "../../../../data/chars/BuildChar";
import Char from "../../../../data/chars/Char";
import Boni from "../../../../data/classes/Boni";
import Feature from "../../../../data/classes/Feature";
import FeatureSet from "../../../../data/classes/FeatureSet";
import Feat from "../../../../data/Feat";
import IEntity from "../../../../data/IEntity";
import Modifier from "../../../../data/Modifier";
import Trait from "../../../../data/races/Trait";
import { applyMods, buildCharacter } from "../../../../services/CharacterService";
import { reciveAllFilteredPromise, saveNew } from "../../../../services/DatabaseService";
import { exportPdf } from "../../../../services/PdfService";
import AutoStringField from "../../../form_elements/AutoStringField";
import SingleSelectField from "../../../form_elements/SingleSelectField";
import SmallNumberField from "../../../form_elements/SmallNumberField";
import TextButton from "../../../form_elements/TextButton";
import FormatedText from "../../../general_elements/FormatedText";
import TabBar from "../../../general_elements/TabBar";
import { LoadingSpinner } from "../../../Loading";
import P2PSender from "../../../p2p/P2PSender";
import GearTile from "../../gear/GearTile";
import ItemTile from "../../items/ItemTile";
import MonsterTile from "../../monsters/MonsterTile";
import CharCombat from "./detail_components/CharCombat";
import CharGeneral from "./detail_components/CharGeneral";
import CharHeader from "./detail_components/CharHeader";
import CharSpell from "./detail_components/CharSpells";

interface $Props {
  character: Char;
  modifications: boolean;
  saveChar: (obj: BuildChar) => void;
  isNpc?: boolean;
}

const CharView = ({ character, modifications, saveChar, isNpc }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  const [buildChar, setBuildChar] = useState<BuildChar>(new BuildChar());
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setTab] = useState<string>("General");
  const [tabs, setTabs] = useState<string[]>(["General"]);

  const [allOptions, setOptions] = useState<IEntity[]>([]);

  const findAllItems = useCallback(async (optionsTable: string[]) => {
    let itemList: Promise<IEntity[] | undefined>[] = [];
    optionsTable.forEach((table) => {
      itemList.push(reciveAllFilteredPromise(table, []));
    });
    let results = await Promise.all(itemList);

    let newList: IEntity[] = [];
    results.forEach((entities: IEntity[] | undefined) => {
      if (entities !== undefined) entities.forEach((entity: IEntity) => newList.push(entity));
    });
    setOptions(newList);
  }, []);

  useEffect(() => {
    findAllItems(["feats"]);
  }, [findAllItems]);

  const rebuildChar = useCallback(
    (char: Char) => {
      buildCharacter(char).then(async (buildChar) => {
        const newBuildChar = await applyMods(buildChar, modifications);
        let newTabs = ["General", "Combat", "Classes", "Race"];
        if (newBuildChar.feats.length > 0) newTabs.push("Feats");
        if (newBuildChar.items.length > 0) newTabs.push("Items");
        else if (newBuildChar.gears.length > 0) newTabs.push("Items");
        if (newBuildChar.spells.length > 0) newTabs.push("Spells");
        if (newBuildChar.monsters.length > 0) newTabs.push("Monsters");
        setTabs([...newTabs, "Notes", "Modifications"]);
        setBuildChar(newBuildChar);
        setLoading(false);
      });
    },
    [modifications]
  );

  useEffect(() => {
    rebuildChar(character);
  }, [character, setBuildChar, modifications, rebuildChar]);

  const makeNpcCopy = () => {
    let newNpc = new Npc(1, character.name, character.pic, character.picBase64, character);
    saveNew("npcs", newNpc, `${buildChar.character.name} copy`);
  };

  const castFeature = (currency: string, cost: number | undefined) => {
    if (cost !== undefined)
      buildChar.character.currencyBonis.forEach(
        (boni: { origin: string; value: number; max: number }) => {
          if (boni.origin === currency) {
            if (boni.value - cost >= 0) onCurrencyBoniChange(boni, boni.value - cost);
          }
        }
      );
  };

  const onCurrencyBoniChange = useCallback(
    (oldBoni: { origin: string; value: number; max: number }, value: number) => {
      let newBonis = buildChar.oldCharacter.currencyBonis.map(
        (boni: { origin: string; value: number; max: number }) => {
          if (boni === oldBoni) {
            return { ...boni, value: value };
          } else {
            return boni;
          }
        }
      );
      saveChar({
        ...buildChar,
        oldCharacter: { ...buildChar.oldCharacter, currencyBonis: newBonis },
      });
    },
    [buildChar, saveChar]
  );

  const onFeatureAbilityChange = useCallback(
    (
      abilityImprov: {
        origin: string;
        level: number;
        s1: string;
        s2: string;
        feat: string;
      },
      name: string,
      value: string
    ) => {
      let newAbilityImprovs = buildChar.oldCharacter.abilityImprovs.map(
        (set: { origin: string; level: number; s1: string; s2: string; feat: string }) => {
          if (abilityImprov.level === set.level && abilityImprov.origin === set.origin) {
            return { ...set, [name]: value };
          } else {
            return set;
          }
        }
      );
      saveChar({
        ...buildChar,
        oldCharacter: { ...buildChar.oldCharacter, abilityImprovs: newAbilityImprovs },
      });
    },
    [buildChar, saveChar]
  );

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && buildChar && (
        <CenterWrapper>
          <CharHeader char={buildChar.character} isNpc={isNpc} />
          <TabBar children={tabs} onChange={(tab: string) => setTab(tab)} activeTab={activeTab} />
          {activeTab === "General" && (
            <>
              <CharGeneral buildChar={buildChar} onChange={saveChar} />
              <View>
                {!send && (
                  <TextButton
                    text={`Send ${buildChar.character.name}`}
                    icon={faPaperPlane}
                    onClick={() => setSend(true)}
                  />
                )}
                {!!send && <P2PSender data={buildChar.character} mode={"THIS"} />}
                <TextButton
                  text={`Export ${buildChar.character.name} to Pdf`}
                  icon={faFilePdf}
                  onClick={() => exportPdf(buildChar.character)}
                />
                <Button onClick={() => makeNpcCopy()}>
                  <GiCryoChamber />
                  {` Create Npc copy`}
                </Button>
              </View>
            </>
          )}
          {activeTab === "Combat" && <CharCombat buildChar={buildChar} />}
          {activeTab === "Classes" && (
            <View>
              <PropColumnWrapper>
                {buildChar.character.currencyBonis &&
                  buildChar.character.currencyBonis.map(
                    (boni: { origin: string; value: number; max: number }, index: number) => {
                      return (
                        <SmallNumberField
                          key={index}
                          max={boni.max}
                          showMax={true}
                          value={boni.value}
                          label={boni.origin}
                          onChange={(boniChange) => onCurrencyBoniChange(boni, boniChange)}
                        />
                      );
                    }
                  )}
                {buildChar.classFeatures &&
                  buildChar.classFeatures
                    .sort((f1, f2) => f2.level - f1.level)[0]
                    .bonis?.map((boni: Boni, index: number) => {
                      if (!boni.isCurrency)
                        return (
                          <Prop key={boni.name + index}>
                            <PropTitle>{boni.name}:</PropTitle>
                            {boni.value}
                          </Prop>
                        );
                      return <></>;
                    })}
              </PropColumnWrapper>
              <PropWrapper>
                {buildChar.oldCharacter.abilityImprovs &&
                  buildChar.oldCharacter.abilityImprovs
                    .filter((a) => a.level <= buildChar.level)
                    .map((a, i) => {
                      return (
                        <Prop key={a.feat + i}>
                          <PropTitle>
                            Class: {a.origin} - Level: {a.level}
                          </PropTitle>
                          {a.feat === "" && (
                            <>
                              <SingleSelectField
                                options={[
                                  {
                                    value: "str",
                                    label: "Str +1",
                                  },
                                  {
                                    value: "dex",
                                    label: "Dex +1",
                                  },
                                  {
                                    value: "con",
                                    label: "Con +1",
                                  },
                                  {
                                    value: "int",
                                    label: "Int +1",
                                  },
                                  {
                                    value: "wis",
                                    label: "Wis +1",
                                  },
                                  {
                                    value: "cha",
                                    label: "Cha +1",
                                  },
                                ]}
                                value={a.s1}
                                label="First Ability +1"
                                onChange={(s) => onFeatureAbilityChange(a, "s1", s)}
                              />
                              <SingleSelectField
                                options={[
                                  {
                                    value: "str",
                                    label: "Str +1",
                                  },
                                  {
                                    value: "dex",
                                    label: "Dex +1",
                                  },
                                  {
                                    value: "con",
                                    label: "Con +1",
                                  },
                                  {
                                    value: "int",
                                    label: "Int +1",
                                  },
                                  {
                                    value: "wis",
                                    label: "Wis +1",
                                  },
                                  {
                                    value: "cha",
                                    label: "Cha +1",
                                  },
                                ]}
                                value={a.s2}
                                label="Second Ability +1"
                                onChange={(s) => onFeatureAbilityChange(a, "s2", s)}
                              />
                              <AbilitySeperator> or </AbilitySeperator>
                            </>
                          )}
                          {a.feat !== "" && (
                            <AbilitySeperator>Clear Feat for ability scores</AbilitySeperator>
                          )}
                          <AutoStringField
                            options={allOptions}
                            value={a.feat}
                            label="Feat"
                            onChange={(feat) => onFeatureAbilityChange(a, "feat", feat)}
                          />
                        </Prop>
                      );
                    })}
              </PropWrapper>
              <PropWrapper>
                {buildChar.classFeatures &&
                  buildChar.classFeatures
                    .sort((f1, f2) => f1.level - f2.level)
                    .map((featureSet: FeatureSet, fsi: number) => {
                      if (!featureSet.isAbilityImprov) {
                        return featureSet.features.map((feature: Feature, index: number) => {
                          let selectionsData: {
                            entityName: string;
                            entityText: string;
                            level: number;
                          }[] = [];
                          if (feature.selections !== undefined && feature.selections.length > 0) {
                            buildChar.character.activeSelections.forEach((activeSelect) => {
                              if (activeSelect.featureName === feature.name) {
                                selectionsData.push(activeSelect.activeOption);
                              }
                            });
                          }
                          return (
                            <Text key={feature.name + fsi + index}>
                              <PropTitle>{feature.name}:</PropTitle>
                              {feature.usedCurrency !== "" &&
                                feature.usedCurrency !== undefined && (
                                  <TextButton
                                    text={"Use " + feature.cost + " " + feature.usedCurrency}
                                    icon={faBolt}
                                    onClick={() => castFeature(feature.usedCurrency, feature.cost)}
                                  />
                                )}
                              <FormatedText text={feature.text} />
                              {selectionsData.map((activeSelectOption, i: number) => {
                                return (
                                  <>
                                    <br />
                                    <PropTitle key={activeSelectOption.entityName + i}>
                                      Choosen {activeSelectOption.entityName}:
                                    </PropTitle>
                                    <FormatedText
                                      key={activeSelectOption.entityName + "text" + i}
                                      text={activeSelectOption.entityText}
                                    />
                                  </>
                                );
                              })}
                            </Text>
                          );
                        });
                      } else {
                        return <></>;
                      }
                    })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Race" && (
            <View>
              <PropWrapper>
                {buildChar.raceFeatures &&
                  buildChar.raceFeatures
                    .sort((f1, f2) => f1.level - f2.level)
                    .map((trait: Trait, index: number) => {
                      return (
                        <TraitWrapper key={index}>
                          <TraitName>{trait.name}</TraitName>
                          <TraitLevel>{trait.level}</TraitLevel>
                          <TraitText>
                            <FormatedText text={trait.text} />
                          </TraitText>
                        </TraitWrapper>
                      );
                    })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Feats" && (
            <View>
              <PropWrapper>
                {buildChar.feats &&
                  buildChar.feats.map((f: Feat) => {
                    return (
                      <Prop>
                        <PropTitle>{f.name}</PropTitle>
                        <FormatedText text={f.description} />
                      </Prop>
                    );
                  })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Spells" && <CharSpell buildChar={buildChar} saveChar={saveChar} />}
          {activeTab === "Items" && (
            <View>
              <PropWrapper>
                {buildChar.items &&
                  buildChar.items.map((item, index: number) => {
                    return <ItemTile key={index} item={item.item} />;
                  })}
                {buildChar.gears &&
                  buildChar.gears.map((gear, index: number) => {
                    return <GearTile key={index} gear={gear.gear} />;
                  })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Monsters" && (
            <View>
              <PropWrapper>
                {buildChar.monsters &&
                  buildChar.monsters.map((monster, index: number) => {
                    return <MonsterTile key={index} monster={monster} />;
                  })}
              </PropWrapper>
            </View>
          )}
          {activeTab === "Notes" && (
            <View>
              <PropWrapper>
                <Text>
                  <PropTitle>Notes:</PropTitle>
                  <FormatedText text={buildChar.character.spellNotes} />
                </Text>
              </PropWrapper>
            </View>
          )}
          {activeTab === "Modifications" && (
            <View>
              <PropWrapper>
                {buildChar.modifiers.map((mod: Modifier, index: number) => {
                  return (
                    <Text key={index}>
                      <PropTitle>{mod.origin}</PropTitle>
                      {mod.makeString()}
                    </Text>
                  );
                })}
              </PropWrapper>
            </View>
          )}
        </CenterWrapper>
      )}
    </>
  );
};

export default CharView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;
  height: 100%;
  width: min-content;
  min-width: 300px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const PropWrapper = styled.div`
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PropColumnWrapper = styled(PropWrapper)`
  flex-direction: column;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
  }
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div`
  height: auto;
  flex: 1 1 calc(100% - 20px);
  margin: 0 5px 5px 0;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const AbilitySeperator = styled.div`
  width: 100%;
  text-align: center;
`;

const TraitWrapper = styled(PropWrapper)``;
const TraitName = styled.div`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 3 3 auto;
`;
const TraitLevel = styled(TraitName)`
  flex: 1 1 auto;
`;
const TraitText = styled(TraitName)`
  flex: 4 4 auto;
`;

const Button = styled.button`
  svg {
    color: ${({ theme }) => theme.buttons.color};
    transition: color 0.2s;
  }
  &:hover svg {
    color: ${({ theme }) => theme.buttons.hoverColor};
  }

  color: ${({ theme }) => theme.buttons.color};
  font-size: 16px;
  float: left;
  height: 20px;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  border-radius: 10px;
  border: none;

  transition: color 0.2s;
  background: ${({ theme }) => theme.buttons.backgroundColor};
  &:hover {
    color: ${({ theme }) => theme.buttons.hoverColor};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.buttons.disabled};
  }
`;

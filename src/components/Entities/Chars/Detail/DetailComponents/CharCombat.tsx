import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Char from "../../../../../Data/Chars/Char";
import Item from "../../../../../Data/Item";
import Gear from "../../../../../Data/Gear";
import { reciveByAttribute } from "../../../../../Database/DbService";

interface $Props {
  char: Char;
  items: Item[];
  gears: Gear[];
}

const CharCombat = ({ char, items, gears }: $Props) => {
  const [baseItems, setBaseItems] = useState<{ base: Gear; item: Item }[]>([]);
  let history = useHistory();

  useEffect(() => {
    items.forEach((item) => {
      if (item.base !== "") {
        reciveByAttribute("gears", "name", item.base, (result) => {
          setBaseItems((b) => [...b, { item: item, base: result as Gear }]);
        });
      }
    });
  }, [items]);

  const formatText = useCallback(
    (text: String) => {
      if (char !== undefined) {
        let parts: string[] = text.split("[[");
        return parts.map((part: string, index: number) => {
          if (part.includes("]]")) {
            const codePart: string[] = part.split("]]");
            const linkParts: string[] = codePart[0].split(".");
            const link: string =
              "/" + linkParts[0] + "-detail/name/" + linkParts[1];
            return (
              <TextPart key={index}>
                <Link onClick={() => history.push(link)}>{linkParts[1]}</Link>
                {codePart[1]}
              </TextPart>
            );
          } else {
            return <TextPart key={index}>{part}</TextPart>;
          }
        });
      }
      return "";
    },
    [char, history]
  );

  return (
    <>
      <MinView>
        {baseItems &&
          baseItems.length > 0 &&
          baseItems.map((baseitem, index: number) => {
            if (baseitem.item.type.toLocaleLowerCase().includes("weapon")) {
              const strBonus = Math.floor((char.str - 10) / 2);
              const dexBonus = Math.floor((char.dex - 10) / 2);
              if (
                baseitem.base.properties.toLocaleLowerCase().includes("finesse")
              ) {
                return (
                  <PropWrapper key={index}>
                    <Prop>{baseitem.item.name}</Prop>
                    <Prop>
                      {strBonus > dexBonus ? <>+{strBonus + char.prof}</> : ""}
                      {dexBonus > strBonus ? <>+{dexBonus + char.prof}</> : ""}
                    </Prop>
                    <Prop>{baseitem.base.damage}</Prop>
                    <Prop>{baseitem.base.properties}</Prop>
                  </PropWrapper>
                );
              } else {
                return (
                  <PropWrapper key={index}>
                    <Prop>{baseitem.item.name}</Prop>
                    <Prop>+{strBonus + char.prof}</Prop>
                    <Prop>{baseitem.base.damage}</Prop>
                    <Prop>{baseitem.base.properties}</Prop>
                  </PropWrapper>
                );
              }
            } else {
              return "";
            }
          })}
        {gears &&
          gears.length > 0 &&
          gears.map((gear, index: number) => {
            if (gear.type.toLocaleLowerCase().includes("weapon")) {
              const strBonus = Math.floor((char.str - 10) / 2);
              const dexBonus = Math.floor((char.dex - 10) / 2);
              if (gear.properties.toLocaleLowerCase().includes("finesse")) {
                return (
                  <PropWrapper key={index}>
                    <Prop>{gear.name}</Prop>
                    <Prop>
                      {strBonus > dexBonus ? <>+{strBonus + char.prof}</> : ""}
                      {dexBonus > strBonus ? <>+{dexBonus + char.prof}</> : ""}
                    </Prop>
                    <Prop>{gear.damage}</Prop>
                    <Prop>{gear.properties}</Prop>
                  </PropWrapper>
                );
              } else {
                return (
                  <PropWrapper key={index}>
                    <Prop>{gear.name}</Prop>
                    <Prop>+{strBonus + char.prof}</Prop>
                    <Prop>{gear.damage}</Prop>
                    <Prop>{gear.properties}</Prop>
                  </PropWrapper>
                );
              }
            } else {
              return "";
            }
          })}
      </MinView>
      <MinView>
        <PropWrapper>
          <Text>
            <PropTitle>Actions:</PropTitle>
            {formatText(char.actions)}
          </Text>
        </PropWrapper>
        <PropWrapper>
          <Text>
            <PropTitle>Bonus Actions:</PropTitle>
            {formatText(char.bonusActions)}
          </Text>
        </PropWrapper>
        <PropWrapper>
          <Text>
            <PropTitle>Reactions:</PropTitle>
            {formatText(char.reactions)}
          </Text>
        </PropWrapper>
      </MinView>
    </>
  );
};

export default CharCombat;

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

const MinView = styled(View)`
  max-width: max-content;
`;

const PropWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
  width: calc(100% - 20px);
  margin: 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const TextPart = styled.span`
  white-space: pre-line;
`;

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;

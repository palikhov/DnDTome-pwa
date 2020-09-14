import React from "react";
import styled from "styled-components";
import Spell from "../../../../Data/Spell";

import StringField from "../../../FormElements/StringField";
import NumberField from "../../../FormElements/NumberField";
import TextField from "../../../FormElements/TextField";
import CheckField from "../../../FormElements/CheckField";

import {
  faHourglassHalf,
  faMortarPestle,
  faHistory,
  faPowerOff,
  faUser,
  faLink,
  faBookOpen,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

interface $Props {
  spell: Spell;
  onEdit: (value: Spell) => void;
}

const SpellEditView = ({ spell, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={spell.name}
          label="Name"
          onChange={(name) => onEdit({ ...spell, name: name })}
        />
        <StringField
          value={spell.school}
          label="School"
          onChange={(school) => onEdit({ ...spell, school: school })}
        />
        <FieldGroup>
          <NumberField
            value={spell.level}
            label="Level"
            onChange={(level) => onEdit({ ...spell, level: level })}
          />
          <CheckField
            value={!!spell.ritual}
            label="Ritual"
            onChange={(ritual) => onEdit({ ...spell, ritual: ritual ? 1 : 0 })}
          />
        </FieldGroup>
        <StringField
          value={spell.time}
          label="Time"
          icon={faHistory}
          onChange={(time) => onEdit({ ...spell, time: time })}
        />
        <StringField
          value={spell.range}
          label="Range"
          icon={faPowerOff}
          transform={{ rotate: 42 }}
          onChange={(range) => onEdit({ ...spell, range: range })}
        />
        <StringField
          value={spell.duration}
          label="Duration"
          icon={faHourglassHalf}
          onChange={(duration) => onEdit({ ...spell, duration: duration })}
        />
        <StringField
          value={spell.components}
          label="Comp."
          icon={faMortarPestle}
          onChange={(components) =>
            onEdit({ ...spell, components: components })
          }
        />
        <StringField
          value={spell.classes}
          label="Classes"
          icon={faUser}
          onChange={(classes) => onEdit({ ...spell, classes: classes })}
        />
        <StringField
          value={spell.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...spell, sources: sources })}
        />
        <StringField
          value={spell.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...spell, pic: pic })}
        />
        <TextField
          value={spell.text}
          label="Text"
          icon={faBookOpen}
          onChange={(text) => onEdit({ ...spell, text: text })}
        />
      </View>
    </CenterWrapper>
  );
};

export default SpellEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const FieldGroup = styled.div`
  flex: 2 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  padding: 5px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

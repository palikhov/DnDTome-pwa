import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import {
  faArrowLeft,
  faSave,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import SubclassView from "./SubclassView";
import SubclassEditView from "./SubclassEditView";
import BackButton from "../../../FormElements/BackButton";
import Subclass from "../../../../Data/Subclass";
import IconButton from "../../../FormElements/IconButton";
import { remove, updateWithCallback } from "../../../../Database/DbService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  subclass: Subclass;
}

const SubclassDetail = ({ subclass }: $Props) => {
  const [editMode, setMode] = useState<boolean>(false);
  const [subclassObj, editSubclass] = useState<Subclass>(subclass);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  let history = useHistory();

  const deleteSubclass = (subclassId: number | undefined) => {
    remove("subclasses", subclassId);
    history.goBack();
  };

  useEffect(() => {
    if (subclassObj !== subclass) {
      setUnsavedChanges(true);
    }
  }, [subclassObj,subclass]);

  const updateSubclass = (tableName: string, subclassObj: Subclass) => {
    updateWithCallback(tableName, subclassObj, (result) => {
      if (result > 0) {
        setUnsavedChanges(false);
        setMessage("Saved successful!");
        setAlert(true);
      } else {
        setMessage("Something went wrong!");
        setAlert(true);
      }
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    });
  };

  return (
    <>
      <TopBar>
        <BackButton icon={faArrowLeft} action={() => history.goBack()} />
        <EditToggle mode={editMode.toString()}>
          <ToggleLeft onClick={() => setMode(false)}>View</ToggleLeft>
          <ToggleRight onClick={() => setMode(true)}>Edit</ToggleRight>
        </EditToggle>
        {unsavedChanges && <Icon icon={faExclamationTriangle} />}
        {editMode && (
          <>
            <IconButton
              onClick={() => updateSubclass("subclasses", subclassObj)}
              icon={faSave}
            />
            <IconButton
              onClick={() => deleteSubclass(subclassObj.id)}
              icon={faTrash}
            />
            {message && showAlert && <Message>{message}</Message>}
          </>
        )}
      </TopBar>
      {editMode ? (
        <SubclassEditView subclass={subclassObj} onEdit={(value) => editSubclass(value)} />
      ) : (
        <SubclassView subclass={subclassObj} />
      )}
    </>
  );
};

export default SubclassDetail;

const TopBar = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  overflow: hidden;
  flex: 1 1;
  min-width: calc(100% - 20px);
  height: 45px;
  padding: 10px;
`;

const ToggleLeft = styled.div`
  width: auto;
  padding: 10px;
  margin: 5px 0px 5px 5px;
  height: ${({ theme }) => theme.buttons.height};
  line-height: ${({ theme }) => theme.buttons.height};
  float: left;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px 0px 0px 5px;

  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: white;
  }
`;

const ToggleRight = styled(ToggleLeft)`
  margin: 5px 5px 5px 0px;

  border-radius: 0px 5px 5px 0px;
`;

type EditMode = {
  mode: string;
};

const EditToggle = styled.div<EditMode>`
  width: auto;
  height: ${({ theme }) => theme.buttons.height};
  float: right;
  color: ${({ theme }) => theme.buttons.color};

  ${ToggleLeft} {
    background-color:
    ${(props) => {
      if (props.mode !== "true") {
        return ({ theme }) => theme.buttons.backgroundColor;
      } else {
        return ({ theme }) => theme.tile.backgroundColor;
      }
    }}}
    ;
  }

  ${ToggleRight} {
    background-color:
    ${(props) => {
      if (props.mode === "true") {
        return ({ theme }) => theme.buttons.backgroundColor;
      } else {
        return ({ theme }) => theme.tile.backgroundColor;
      }
    }}}
    ;
  }
`;

const Message = styled.div`
  padding: 5px;
  width: 150px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  float: right;
`;

const Icon = styled(FontAwesomeIcon)`
  float: right;
  line-height: 30px;
  display: block;
  height: 30px;
  padding: 10px;
  color: ${({ theme }) => theme.main.highlight};
`;

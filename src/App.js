import "./App.css";
import {
  CreateNote,
  NavBar,
  NoteUICollection,
  UpdateNote,
} from "./ui-components";
import { useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";

function App({ signOut }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateNote, setUpdateNote] = useState();
  const [updateTitle, setUpdateTitle] = useState(false);
  const [updateText, setUpdateText] = useState(false);

  return (
    <>
      <NavBar
        marginBottom="20px"
        width="100%"
        overrides={{
          Button31632483: { onClick: () => setShowCreateModal(true) },
          Button31632487: {
            onClick: async () => {
              signOut();
              // await DataStore.clear();
            },
          },
        }}
      />
      <div className="container">
        <NoteUICollection
          overrideItems={({ item, idx }) => {
            return {
              overrides: {
                Vector31472745: {
                  onClick: () => {
                    setShowUpdateModal(true);
                    setUpdateNote(item);
                    setUpdateTitle(item.title);
                    setUpdateText(item.text);
                  },
                },
              },
            };
          }}
        />
      </div>
      <div
        className="modal"
        style={{ display: showCreateModal === false && "none" }}
      >
        <CreateNote
          overrides={{
            MyIcon: {
              as: "button",
              onClick: () => setShowCreateModal(false),
            },
          }}
        />
      </div>
      <div
        className="modal"
        style={{ display: showUpdateModal === false && "none" }}
      >
        <UpdateNote
          note={updateNote}
          overrides={{
            MyIcon: {
              as: "button",
              onClick: () => setShowUpdateModal(false),
            },
            TextField31602478: {
              defaultValue: updateTitle ? updateTitle : "",
            },
            TextField31602471: {
              defaultValue: updateText ? updateText : "",
              // onChange: (e) => setUpdateText(e.target.value),
            },
          }}
        />
      </div>
    </>
  );
}

export default withAuthenticator(App);

import React, { useState } from "react";
import Client from "./Client";
import Editor from "./Editor.jsx";

function EditorPage() {
  const [client, setClient] = useState([
    { socketId: 1, username: "vivek singh" },
    { socketId: 2, username: "sachin" },
  ]);
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div
          className="col-md-2 bg-dark text-light d-flex flex-column h-100"
          style={{ boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)" }}
        >
          <img
            src="/Images/logo.png"
            alt="Logo"
            className="img-fluid mx-auto"
            style={{ width: "150px", marginTop: "-35px" }}
          />
          <hr style={{ marginTop: "-2rem" }} />
          <div className="d-flex flex-column overflow-auto">
            {client.map((c) => (
              <Client key={c.socketId} username={c.username} />
            ))}
          </div>
          <div className="mt-auto">
            <hr />
            <button className="btn btn-success">Copy Room ID</button>
            <button className="btn btn-danger mt-2 mb-3 px-3 btn-block">
              Leave Room
            </button>
          </div>
        </div>
        <div className="col-md-10 text-light d-flex flex-column h-100">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;

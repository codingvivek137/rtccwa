import React, { use, useState } from "react";
import Client from "./Client";
import Editor from "./Editor.jsx";
import { useRef } from "react";
import { initSocket } from "../Socket.jsx";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditorPage() {
  const socketRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
      socketRef.current.on("connect_failed", (err) => {
        console.error("Socket connection failed:", err);
      });
      const handleError = (e) => {
        console.error("Socket error:", e);
        toast.error("Socket error, please try again later.");
        navigate("/");
      };
      socketRef.current.emit("join room", {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
        }
        setClient(clients);
      });
      // Listen for the "disconnected" event
      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.error(`${username} left the room`);
        setClient((prev) => {
          return prev.filter((c) => c.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  const [client, setClient] = useState([]);
  if (!location.state) {
    toast.error("Username is required to join the room");
    navigate("/");
  }
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

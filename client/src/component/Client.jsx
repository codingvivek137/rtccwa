import React from "react";
import * as Avatar from "@radix-ui/react-avatar";

function Client({ username }) {
  return (
    <div className="d-flex align-items-center mb-3">
      <Avatar.Root
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "14px",
          overflow: "hidden",
          marginRight: "0.75rem",
          backgroundColor: "#ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar.Image
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`}
          alt={username.toString()}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Avatar.Fallback>{username[0].toUpperCase()}</Avatar.Fallback>
      </Avatar.Root>
      <span className="mx-2">{username}</span>
    </div>
  );
}

export default Client;

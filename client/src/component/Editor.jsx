import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css"; // Base styling
import "codemirror/theme/dracula.css"; // Theme
import "codemirror/mode/javascript/javascript"; // Language mode
import "codemirror/addon/edit/closetag"; // Tag closing
import "codemirror/addon/edit/closebrackets"; // Bracket closing
import CodeMirror from "codemirror";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      // for sync the code
      editorRef.current = editor;

      editor.setSize(null, "100%");
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit("code change", {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code change", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off("code change");
    };
  }, [socketRef.current]);

  return (
    <div style={{ height: "600px" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;

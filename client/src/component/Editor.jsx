import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css"; // Base styling
import "codemirror/theme/dracula.css"; // Theme
import "codemirror/mode/javascript/javascript"; // Language mode
import "codemirror/addon/edit/closetag"; // Tag closing
import "codemirror/addon/edit/closebrackets"; // Bracket closing
import CodeMirror from "codemirror";

function Editor() {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      if (!editorRef.current) return;

      const editor = CodeMirror.fromTextArea(editorRef.current, {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
      });

      editor.setSize("100%", "100%");
    };

    init();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <textarea
        id="realTimeEditor"
        ref={editorRef}
        defaultValue={`// Start coding here...`}
      ></textarea>
    </div>
  );
}

export default Editor;

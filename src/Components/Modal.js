import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Modal({ setModalvisible, tableName }) {
  const [text, setText] = useState("");
  const [showmsg, setShowmsg] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "2vh";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleChange = (event) => {
    if (event.target.value.length <= 100) {
      setText(event.target.value);
    }
  };

  const savefunction = async () => {
    if (text.trim() === "") {
      setShowmsg(true);
    } else {
      const response = await axios.post(
        `http://localhost:4000/insert-task?tbname=${encodeURIComponent(
          tableName
        )}&description=${encodeURIComponent(text)}`
      );
      setShowmsg(false);
      setModalvisible(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="char-count">{text.length}/100</p>
        <textarea
          ref={textareaRef}
          type="text"
          placeholder="To-do"
          value={text}
          onChange={(e) => [handleChange(e), adjustHeight()]}
          autoFocus
        />
        <p className="msg">{showmsg ? "Field cannot be empty" : null}</p>
        <div>
          <button onClick={() => setModalvisible(false)} id="close_modal">
            Close
          </button>
          <button onClick={() => savefunction()} id="save_modal">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

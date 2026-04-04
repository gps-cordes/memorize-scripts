
import React, { useState } from "react";
import { replaceWordsInText } from "./scriptService";
import { patience_act_ii_gros_bunthorn } from "../data/scenes";


export function MemorizeApp() {
  const [redacted, setRedacted] = useState(0)

  const displayScript = replaceWordsInText(patience_act_ii_gros_bunthorn, redacted)
  // TODO: bold the first word of every new line before a colon to emphase character names
  // .replaceAll(/^(\w+):/, "<b>$1</b>")

  function redactLess() {
    if (redacted > 0) {
      setRedacted(redacted - 1)
    }
  }

  function redactMore() {
    setRedacted(redacted + 1)
  }

  return (

    <div style={{ whiteSpace: 'pre-line' }}>
      <button title="<" onClick={redactLess}>{'<'}</button>
      <button title=">" onClick={redactMore}>{'>'}</button>
      <p>Redaction level: {redacted}</p>
      <p>
        {displayScript}
      </p>
    </div>
  )
}
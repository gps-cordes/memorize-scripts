
import React, { useState } from "react";
import { replaceWordsInText } from "./scriptService";
import { patience_act_ii_gros_bunthorn } from "../data/scenes";

import "./MemorizeApp.css"

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

  //TODO: only redact your lines
  //TODO: Only redact the last portion
  //TODO: Other redaction strategies, such as every other whole word, only vowels, only consonants
  //TODO: Select preloaded text
  //TODO: floating header with controls
  //TODO: upload own text
  //TODO: Store uploaded text in browser cache / cookie
  //TODO: Bold and highlight character names in different colors

  return (
    <div className="memorizeApp">
      <div className="floatingHeader" >
        <button title="<" onClick={redactLess}>{'<'}</button>

        <header>Redaction levels: <strong>{redacted}</strong></header>
        <button title=">" onClick={redactMore}>{'>'}</button>
      </div>
      <div className="scriptText" style={{ whiteSpace: 'pre-line' }}>
        <p>
          {displayScript}
        </p>
      </div>
    </div>
  )
}
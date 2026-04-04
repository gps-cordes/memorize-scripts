
import React, { useState } from "react";
import { replaceWordsInText } from "./scriptService";
import { patience_act_ii_gros_bunthorn } from "../data/scenes";


export function MemorizeApp() {
  const [redacted, setRedacted] = useState(0)

  const displayScript = replaceWordsInText(patience_act_ii_gros_bunthorn, redacted)
  // .replaceAll(/^(\w+):/, "<b>$1</b>")


  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      <p>
        {displayScript}
      </p>
    </div>
  )
}
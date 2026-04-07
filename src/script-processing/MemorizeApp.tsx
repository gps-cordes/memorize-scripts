
import React, { useState } from "react";
import { replaceWordsInText } from "./scriptService";
import { sceneData } from "../data/scenes";

import "./MemorizeApp.css"


export function MemorizeApp() {
  const [redacted, setRedacted] = useState(0)
  const [sceneName, setSceneName] = useState("")

  const scripts = sceneData

  function getCurrentScene(): string {
    if (scripts && scripts.get(sceneName)) {
      return scripts.get(sceneName)!.scriptText;
    }
    return "Lorum Ipsum Sonum Dolor"
  }


  const displayScript = replaceWordsInText(getCurrentScene(), redacted)
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

  function changeScene(e: React.ChangeEvent<HTMLSelectElement>) {
    setSceneName(e.target.value)
    setRedacted(0)
  }

  //TODO: only redact your lines
  //TODO: Only redact the last portion
  //TODO: Other redaction strategies, such as every other whole word, only vowels, only consonants
  //TODO: upload own text
  //TODO: Store uploaded text in browser cache / cookie
  //TODO: Bold and highlight character names in different colors

  return (
    <div className="memorizeApp">
      <div className="floatingHeader" >
        <button title="<" onClick={redactLess}>{'<'}</button>
        <div>
          <header>Redaction levels: <strong>{redacted}</strong></header>
          <label>Scene</label>
          <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeScene(e)}>
            {
              [...sceneData].map(([sceneName]) => <option value={sceneName}>{sceneName}</option>)
            }
          </select>
        </div>
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
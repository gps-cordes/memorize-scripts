
import React, { useState } from "react";
import { boldFirstWordOfLine, replaceWordsInText } from "./scriptService";
import { patience_act_ii_gros_bunthorn, sceneData } from "../data/scenes";

import "./MemorizeApp.css"


export function MemorizeApp() {
  const [redacted, setRedacted] = useState(0)
  const [sceneName, setSceneName] = useState("")

  const scripts = sceneData

  function getCurrentScene(): string {
    if (scripts && scripts.get(sceneName)) {
      return scripts.get(sceneName)!.scriptText;
    }
    // todo: this should be the first record in the map
    return patience_act_ii_gros_bunthorn;
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
  //TODO: Only redact the last portion of the scene
  //TODO: Other redaction strategies, such as every other whole word, only vowels, only consonants
  //TODO: upload own text
  //TODO: Store uploaded text in browser cache / cookie
  //TODO: Bold and highlight character names in different colors
  //TODO: Sanitize the script of html before starting to bold it
  //TODO: Transpile to es5 for older devices
  //TODO: High-light redacted word to reveal original

  return (
    <div className="memorizeApp">
      <div className="floatingHeader" >
        <button title="<" onClick={redactLess}>{'<'}</button>
        <div className="sceneSelector">
          <header>Redaction levels: <strong>{redacted}</strong></header>
          <label></label>
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
          <div dangerouslySetInnerHTML={{__html: boldFirstWordOfLine(displayScript)}} />
          {/* Add white space on the bottom for space for the menu */}
          <br /><br /><br /><br />
        </p>
      </div>
    </div>
  )
}

import React, { useRef, useState } from "react";
import { boldFirstWordOfLine, getAllScripts, replaceWordsInText } from "./scriptService";
import { patience_act_ii_gros_bunthorn } from "../data/scenes";

import "./MemorizeApp.css"
import { localStorageSvc } from "./localStorageSvc";

type Views = "viewScript" | "addRemoveScene"

export function MemorizeApp() {


  const [redacted, setRedacted] = useState(0)
  const [sceneName, setSceneName] = useState("")
  const [currentView, setCurrentView] = useState("viewScript" as Views)
  const [showScene, setShowScene] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenAddSceneClick = () => {
    setCurrentView("addRemoveScene")
    setShowScene(localStorageSvc.doesUserUploadedSceneExist())
  }

  // TODO: keep this from building with each change of script, only when there is a localstorage change
  const scripts = getAllScripts();

  function getCurrentScene(): string {
    if (scripts && scripts.get(sceneName)) {
      return scripts.get(sceneName)!.scriptText;
    }
    // todo: this should be the first record in the map
    return patience_act_ii_gros_bunthorn;
  }

  const displayScript = replaceWordsInText(getCurrentScene(), redacted)

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
      {displayScene(currentView)}
    </div>
  )

  function displayScene(viewString: Views) {
    if (viewString == "viewScript") {
      return <>
        {floatingHeader()}
        {sceneScript()}
      </>
    } else if (viewString == "addRemoveScene") {

      const localStorageFiles = Array.from(localStorageSvc.getLocalStorageMap().keys())

      function deleteSceneOnClick() {
        localStorageSvc.deleteScriptFromLocalStorage(sceneName)
        setShowScene(localStorageSvc.doesUserUploadedSceneExist())
      }

      const handleFileUploadClick = () => {
        // Trigger the hidden input's click event

        fileInputRef.current?.click();
      };

      const handleFileUploadChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          console.log('Selected file:', files[0]); // Access the File object
          localStorageSvc.uploadScriptToLocalStorage(files[0].name, await files[0].text())
          setSceneName(files[0].name)
          setShowScene(true);
        }
      };

      return <>
        <div className="addRemoveScenesView"> {/* placeholder */}
          <button className="addSceneButton" onClick={handleFileUploadClick}>Add .txt scene...</button>
          <input ref={fileInputRef} hidden={true} onChange={handleFileUploadChange} type="file" accept=".txt"></input>

          {/* {localStorageFiles.map((sceneName) => <p >{sceneName}</p>)} */}

          <select id="localStorageSceneSelector" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeScene(e)}>
            
            {localStorageFiles.map((sceneName) => <option value={sceneName}>{sceneName}</option>)}
          </select>

          <button onClick={deleteSceneOnClick}>Delete Scene</button>
          <button className="returnToSceneButton" onClick={() => setCurrentView("viewScript")}>X</button>
        </div>
        {showScene && sceneScript()}
      </>


    }
  }

  function sceneScript() {
    return <div className="scriptText" style={{ whiteSpace: 'pre-line' }}>
      <p>
        <div dangerouslySetInnerHTML={{ __html: boldFirstWordOfLine(displayScript) }} />
        {/* Add white space on the bottom for space for the menu */}
        <br /><br /><br /><br />
      </p>
    </div>;
  }

  function floatingHeader() {
    return <div className="floatingHeader">
      <button title="<" onClick={redactLess}>{'<'}</button>
      <button className="addRemoveScenesViewButton" onClick={handleOpenAddSceneClick}>Add scene...</button>
      <div className="sceneSelector">
        <header>Redaction levels: <strong>{redacted}</strong></header>

        <label></label>
        <select id="allScenesSelector" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeScene(e)}>
          {[...scripts].map(([sceneName]) => <option value={sceneName}>{sceneName}</option>)}
        </select>

      </div>
      <button title=">" onClick={redactMore}>{'>'}</button>
    </div>;
  }
}
import { useRef, useState } from "react";
import { localStorageSvc } from "./localStorageSvc";
import { SceneScript } from "./SceneScript";

export function AddRemoveUploadedScenesView({ sceneName, setCurrentView }: {
    sceneName: string,
    setCurrentView: React.Dispatch<React.SetStateAction<"viewScript" | "addRemoveScene">>
}

) {
    function getDefaultScene() {
        if (localStorageMap.has(sceneName)) {
            console.log("Default to the scene from before that was in local storage")
            return sceneName
        } else if (localStorageMap.size > 0) {
            console.log("Default to first scene from local storage")
            return Array.from(localStorageMap.keys())[0]
        }
        console.log("Default to empty scene")
        return "";
    }

    const localStorageMap = localStorageSvc.getLocalStorageMap()
    const [uploadedSceneName, setUploadedSceneName] = useState(getDefaultScene());
    const fileInputRef = useRef<HTMLInputElement>(null);

    function changeScene(e: React.ChangeEvent<HTMLSelectElement>) {
        setUploadedSceneName(e.target.value)
    }

    const localStorageFiles = Array.from(localStorageMap.keys())

    function deleteSceneOnClick() {
        localStorageSvc.deleteScriptFromLocalStorage(uploadedSceneName)
        setUploadedSceneName(localStorageSvc.getFirstFileNameStored())
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
            setUploadedSceneName(files[0].name)
        }
    };

    const localStorageSceneText = localStorageMap.get(uploadedSceneName) ?? ""
    return <>
        <div className="addRemoveScenesView"> {/* placeholder */}
            <button className="addSceneButton" onClick={handleFileUploadClick}>Add .txt scene...</button>
            <input ref={fileInputRef} hidden={true} onChange={handleFileUploadChange} type="file" accept=".txt"></input>

            <select value={uploadedSceneName} id="localStorageSceneSelector" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeScene(e)}>
                {localStorageFiles.map((sceneName) => <option value={sceneName}>{sceneName}</option>)}
            </select>

            <button onClick={deleteSceneOnClick}>Delete Scene</button>
            <button className="returnToSceneButton" onClick={() => setCurrentView("viewScript")}>X</button>
        </div>
        {SceneScript(localStorageSceneText)}
    </>
}
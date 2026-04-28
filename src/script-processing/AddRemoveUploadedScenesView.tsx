import { useRef, useState } from "react";
import { localStorageSvc } from "./localStorageSvc";
import { SceneScript } from "./SceneScript";

export function AddRemoveUploadedScenesView({ sceneName, setCurrentView }: {
    sceneName: string,
    setCurrentView: React.Dispatch<React.SetStateAction<"viewScript" | "addRemoveScene">>
}

) {

    function getDefaultScene() {
        if (localStorageMap.has(sceneName)){
            return sceneName
        } else if (localStorageMap.size > 0){
            return Array.from(localStorageMap.keys())[0]
        }
        return "";
    }

    const localStorageMap = localStorageSvc.getLocalStorageMap()
    const [showScene, setShowScene] = useState(localStorageMap.has(sceneName));
    const [uploadedSceneName, setUploadedSceneName] = useState(getDefaultScene());
    const fileInputRef = useRef<HTMLInputElement>(null);

    function changeScene(e: React.ChangeEvent<HTMLSelectElement>) {
        setUploadedSceneName(e.target.value)
    }

    const localStorageFiles = Array.from(localStorageMap.keys())

    function deleteSceneOnClick() {
        localStorageSvc.deleteScriptFromLocalStorage(uploadedSceneName)
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
            setUploadedSceneName(files[0].name)
            setShowScene(true);
        }
    };

    const localStorageSceneText = localStorageMap.get(uploadedSceneName) ?? ""

    return <>
        <div className="addRemoveScenesView"> {/* placeholder */}
            <button className="addSceneButton" onClick={handleFileUploadClick}>Add .txt scene...</button>
            <input ref={fileInputRef} hidden={true} onChange={handleFileUploadChange} type="file" accept=".txt"></input>

            {/* {localStorageFiles.map((sceneName) => <p >{sceneName}</p>)} */}

            <select value={uploadedSceneName} id="localStorageSceneSelector" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeScene(e)}>

                {localStorageFiles.map((sceneName) => <option value={sceneName}>{sceneName}</option>)}
            </select>

            <button onClick={deleteSceneOnClick}>Delete Scene</button>
            <button className="returnToSceneButton" onClick={() => setCurrentView("viewScript")}>X</button>
        </div>
        {showScene && SceneScript(localStorageSceneText)}
    </>

}
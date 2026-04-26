import { boldFirstWordOfLine } from "./scriptService";

export function SceneScript(script: string) {
    return <div className="scriptText" style={{ whiteSpace: 'pre-line' }}>
        <p>
            <div dangerouslySetInnerHTML={{ __html: boldFirstWordOfLine(script) }} />
            {/* Add white space on the bottom for space for the menu */}
            <br /><br /><br /><br />
        </p>
    </div>;
}
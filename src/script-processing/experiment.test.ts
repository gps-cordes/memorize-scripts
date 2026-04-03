import { describe, it, expect } from 'vitest';
import { creationWordMap, redactLetters, replaceWordsInText } from './scriptService';


const lorumIpsum = `Lorem ipsum dolor sit amet consectetur adipiscing elit. 
Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. 

Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. 
Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. 
Ad litora torquent per conubia nostra inceptos himenaeos.`

describe(" test", () => {
    it("basic test", () => {
        // this should not pass
        expect(replaceWordsInText(lorumIpsum, 1)).not.toEqual(lorumIpsum);
        expect(replaceWordsInText("basic",1)).toEqual("ba-ic")
    })

    it("create dictionary", () => {
        expect(creationWordMap("basic", 0)).toEqual( new Map([["basic","basic"]]))
        expect(creationWordMap("basic", 1)).toEqual( new Map([["basic","ba-ic"]]))
        expect(creationWordMap("1.2?.3.   4!5",0)).toEqual(new Map([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"]]))

        expect(creationWordMap("basic words", 1)).toEqual( new Map([["basic","ba-ic"],["words","wo-ds"]]))
    })

    it("redact", () => {
        expect(redactLetters("basic",0)).toEqual("basic")
        expect(redactLetters("basic",1)).toEqual("ba-ic")
        expect(redactLetters("basic",2)).toEqual("b-c")
        expect(redactLetters("basic",3)).toEqual("b-")
        expect(redactLetters("basic",4)).toEqual("b-")
    })
})
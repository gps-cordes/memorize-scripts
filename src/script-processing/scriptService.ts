

export function creationWordMap(text: string, redact: number): Map<string, string> {
    const uniqueWords = text.split(/[\s,;.!?]+/)

    return new Map(uniqueWords.map(word => [word, redactLetters(word, redact)] as [string, string]))
}

export function redactLetters(word: string, redact: number) {
    if (redact <= 0) {
        return word;
    }
    const firstLetter = word.charAt(0);
    if (word.length == 1) {
        return firstLetter
    }
    if (word.length == 2) {
        return firstLetter + '-'
    }

    const wordMinusFirstCharacter = word.substring(1)
    const middleOfWord = wordMinusFirstCharacter.length / 2;
    const placeholder = redact > 0 ? '-' : "";
    const redactedWord = firstLetter +
        wordMinusFirstCharacter.substring(0, middleOfWord - redact) +
        placeholder +
        wordMinusFirstCharacter.substring(middleOfWord - 1 + redact)

    return redactedWord;
}

export function boldFirstWordOfLine(text: string) {
    return text.split(/(\n)/).map(line => line.replace(/^\s*([\w]+[.:])/, "<strong>$1</strong>")).join('')
}

export function replaceWordsInText(text: string, redact?: number): string {
    const wordReplacements = creationWordMap(text, redact ?? 0);

    // use /(regex)/ in the split keeps the delimiter in the resulting array  
    const newText = text.split(/([\s,;.!?]+)/).map((word) => {
        return wordReplacements.get(word) ?? word;
    }).join('');

    return newText

}
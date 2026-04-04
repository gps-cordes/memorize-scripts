

export function creationWordMap(text: string, redact: number): Map<string, string> {
    const uniqueWords = text.split(/[\s,;.!?]+/)

    return new Map(uniqueWords.map(word => [word, redactLetters(word, redact)] as [string, string]))
}

export function redactLetters(word: string, redact: number) {
    if (redact <= 0) {
        return word;
    }
    const firstLether = word.charAt(0);
    if (word.length == 1) {
        return firstLether
    }
    if (word.length == 2) {
        return firstLether + '-'
    }

    const wordMinusFirstCharacter = word.substring(1)
    const middleOfWord = wordMinusFirstCharacter.length / 2;
    const placeholder = redact > 0 ? '-' : "";
    const redactedWord = firstLether +
        wordMinusFirstCharacter.substring(0, middleOfWord - redact) +
        placeholder +
        wordMinusFirstCharacter.substring(middleOfWord - 1 + redact)

    return redactedWord;
}

export function replaceWordsInText(text: string, redact?: number): string {
    const wordReplacements = creationWordMap(text, redact ?? 0);

    let newText = text;

    newText = newText.split(/([\s,;.!?]+)/).map((word) => {
        return wordReplacements.get(word) ?? word;
    }).join('');
    return newText;
}
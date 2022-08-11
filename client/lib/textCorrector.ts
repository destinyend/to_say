function textCorrector(text: string): string {
    const parts = text.split(' ')
    for (let n = 0; n < parts.length; n++) {
        parts[n] = correct(parts[n])
    }
    return parts.join(' ')
}

function correct(word: string): string {
    switch (word) {
        case 'smth':
            return 'something'
        case 'smt':
            return 'something'
        case 'smh':
            return 'something'
        case 'smb':
            return 'somebody'
        case 'sb':
            return 'somebody'
        default:
            return word
    }
}


export const capitalize = (Sentence) => {

    const words = Sentence.split(" ");
    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}


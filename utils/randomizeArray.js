module.exports = (array) => {
    const result = array;
    while (array.length !== 0) {
        const randomIndex = Math.floor(Math.random() * array.length);
        result.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return result;
};

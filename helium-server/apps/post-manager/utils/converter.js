
const stringToDbArray = (str) => {
    return str.replace(/"/g, '').replace(/'/g, '"')
}


module.exports={
    stringToDbArray,
}
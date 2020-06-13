function getLargestNameNumber (items) {
  return items
    .filter(item => item && item.name)
    .reduce((number, item) => {
      const nameNumber = parseInt(item.name.split(' ').pop(), 10)
      return isNaN(nameNumber) || nameNumber < number ? number : nameNumber
    }, 0)
}

module.exports = { getLargestNameNumber }

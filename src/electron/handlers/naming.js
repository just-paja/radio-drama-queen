function getLargestNameNumber (items) {
  return items.reduce((number, item) => {
    const nameNumber = parseInt(item.name.split(' ').pop(), 10)
    return isNaN(nameNumber) || nameNumber < number ? number : nameNumber
  }, 0)
}

module.exports = { getLargestNameNumber }

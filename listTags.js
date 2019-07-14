const flatTags = require('./tags.json')

function padd (size) {
  return ' '.repeat(size)
}

function printTag (tag, padding = 0) {
  process.stdout.write(padd(padding) + tag.name + '\n')
  if (tag.tags) {
    tag.tags.forEach(item => printTag(item, padding + 2))
  }
}

function extendChildren (flat) {
  return function (tag) {
    return {
      ...tag,
      tags: flat
        .filter(child => child.parent === tag.name)
        .map(extendChildren(flat))
    }
  }
}

function createStructure (tags) {
  return tags
    .filter(tag => !tag.parent)
    .map(extendChildren(tags))
}

const structure = createStructure(flatTags)

for (let tag of structure) {
  printTag(tag)
}

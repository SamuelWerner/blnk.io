import diff from 'fast-diff'

var myMap = new Map()

export default function stringDiff (oldBody, newBody) {
  // Die src der Images entfernen, das die Berechnung sonst langsam wird
  oldBody = emptyImageSrc(oldBody)
  newBody = emptyImageSrc(newBody)
  // Differenz berechnen - erst ab dem Zeitpunkt der Unterscheidung
  let difference = diff(oldBody, newBody)
  difference = replaceImageSrc(difference)
  let result = '{"result":[' + getChangeOrdersInJsonFormat(difference) + ']}'
  return JSON.parse(result)
}

function getChangeOrdersInJsonFormat (difference) {
  console.log(difference)
  let position = 0
  let tmpResult = ''
  let separator = ''
  for (let i in difference) {
    if (difference[i][0] === 0) { // equal
      // Wenn der Text vorhanden ist, ist nur die Laenge interessant
      // Um die Position fuer das Einfuegen zu bestimmen
      position += difference[i][1].length
    } else if (difference[i][0] === 1) { // insert
      // Hochkommata entfernen, da sonst der JSON Compiler Probleme bekommt
      let newText = difference[i][1].replace(/"/g, '\\"')
      let lengthNewText = difference[i][1].length
      tmpResult += separator + '{"StartInsertPosition": ' + position + ', "EndDeletePosition": ' + position + ', "newData": "' + newText + '"}'
      position += lengthNewText
      separator = ','
    } else if (difference[i][0] === -1) { // delete
      let deleteEndPosition = difference[i][1].length + position
      tmpResult += separator + '{"StartInsertPosition": ' + position + ', "EndDeletePosition": ' + deleteEndPosition + ', "newData": ""}'
      separator = ','
    }
  }
  return tmpResult
}

function replaceImageSrc (difference) {
  for (let i in difference) {
    myMap.forEach((value, key) => {
      difference[i][1] = difference[i][1].replace(key, value)
    })
  }
  return difference
}

function emptyImageSrc (element) {
  var div = document.createElement('div')
  div.innerHTML = element
  var images = div.getElementsByTagName('img')

  for (var i = 0; i < images.length; i++) {
    let img = images[i]
    let keyId = '~~' + img.id + '~~'
    myMap.set(keyId, img.src)
    img.src = keyId
  }
  return div.innerHTML
}

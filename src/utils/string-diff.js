import diff from 'fast-diff'

var myMap = new Map()

export default function stringDiff (oldBody, newBody) {
  // Die src der Images entfernen, da die Berechnung sonst langsam wird
  oldBody = emptyImageSrc(oldBody)
  newBody = emptyImageSrc(newBody)
  // Differenz berechnen - erst ab dem Zeitpunkt der Unterscheidung
  let difference = diff(oldBody, newBody)
  difference = replaceImageSrc(difference)
  let result = '{"result":[' + getChangeOrdersInJsonFormat(difference) + ']}'
  myMap.clear()
  return JSON.parse(result)
}

function getChangeOrdersInJsonFormat (difference) {
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
      if (difference[i][1].includes(key)) {
        difference[i][1] = difference[i][1].replace(key, value)
        myMap.delete(key)
      }
    })
  }
  return difference
}

function emptyImageSrc (element) {
  var div = document.createElement('div')
  div.innerHTML = element
  var images = div.getElementsByTagName('img')
  var id = 0
  for (var i = 0; i < images.length; i++) {
    let img = images[i]
    let keyId = '~~~img###' + id + '###img~~~'
    myMap.set(keyId, img)
    img = keyId
    id++
  }
  return div.innerHTML
}

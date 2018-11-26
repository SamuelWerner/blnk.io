/* eslint-disable no-unused-expressions,no-extend-native */
Array.prototype.rotate = function (n) {
  var len = this.length
  var res = new Array(this.length)
  if (n % len === 0) return this.slice()
  else for (var i = 0; i < len; i++) res[i] = this[(i + (len + n % len)) % len]
  return res
}

String.prototype.diff = function (compareString, precision, length) { // p -> precision factor
  function getMatchingSubstring (s, l, m) { // returns the first matching substring in-between the two strings
    var i = 0
    var slen = s.length
    var match = false
    var result = {fis: slen, mtc: m, sbs: ''} // temporary object used to construct the cd (change data) object
    while (i < slen) {
      (l[i] === s[i]) ? match ? result.sbs += s[i] // result.sbs holds the matching substring itsef
        : (match = true, result.fis = i, result.sbs = s[i])
        : match && (i = slen) // stop after the first found substring
      ++i
    }
    return result
  }

  function getChanges (t, s, m) {
    var isThisLonger = t.length >= s.length
    var [longer, shorter] = isThisLonger ? [t, s] : [s, t] // assignment of longer and shorter by es6 destructuring
    var bi = 0 // base index designating the index of first mismacthing character in both strings

    while (shorter[bi] === longer[bi] && bi < shorter.length) ++bi // make bi the index of first mismatching character
    longer = longer.split('').slice(bi) // as the longer string will be rotated it is converted into array
    shorter = shorter.slice(bi) // shorter and longer now starts from the first mismatching character

    var len = longer.length // length of the longer string
    var cd = {fis: shorter.length, // the index of matching string in the shorter string
      fil: len, // the index of matching string in the longer string
      sbs: '', // the matching substring itself
      mtc: m + s.slice(0, bi)} // if exists mtc holds the matching string at the front
    var sub = {sbs: ''} // returned substring per 1 character rotation of the longer string

    if (shorter !== '') {
      for (var rc = 0; rc < len && sub.sbs.length < precision; rc++) { // rc -> rotate count, p -> precision factor
        sub = getMatchingSubstring(shorter, longer.rotate(rc), cd.mtc) // rotate longer string 1 char and get substring
        sub.fil = rc < len - sub.fis ? sub.fis + rc // mismatch is longer than the mismatch in short
          : sub.fis - len + rc // mismatch is shorter than the mismatch in short
        sub.sbs.length > cd.sbs.length && (cd = sub) // only keep the one with the longest substring.
      }
    }
    // insert the mismatching delete subsrt and insert substr to the cd object and attach the previous substring
    [cd.del, cd.ins] = isThisLonger ? [longer.slice(0, cd.fil).join(''), shorter.slice(0, cd.fis)]
      : [shorter.slice(0, cd.fis), longer.slice(0, cd.fil).join('')]
    return cd.del.indexOf(' ') === -1 ||
    cd.ins.indexOf(' ') === -1 ||
    cd.del === '' ||
    cd.ins === '' ||
    cd.sbs === '' ? cd : getChanges(cd.del, cd.ins, cd.mtc)
  }

  var changeData = getChanges(this, compareString, '')
  var nextS = compareString.slice(changeData.mtc.length + changeData.ins.length + changeData.sbs.length) // remaining part of "s"
  var nextThis = this.slice(changeData.mtc.length + changeData.del.length + changeData.sbs.length) // remaining part of "this"
  var result = '' // the glorious result
  // changeData.del.length > 0 && (changeData.del = '<span class = "deleted">' + changeData.del + '</span>')
  // changeData.ins.length > 0 && (changeData.ins = '<span class = "inserted">' + changeData.ins + '</span>')
  let startInsertPosition = changeData.mtc.length + length
  let endDeletePosition = changeData.del.length + startInsertPosition
  let newLength = changeData.ins.length + startInsertPosition + changeData.sbs.length
  let newData = changeData.ins.replace(/"/g, '\'')
  let tmp = '{"StartInsertPosition": ' + startInsertPosition + ', "EndDeletePosition": ' + endDeletePosition + ', "newData": "' + newData + '"}'
  result += (nextThis !== '' || nextS !== '') ? tmp + ',' + nextThis.diff(nextS, precision, newLength) : tmp
  return result
}

export default function stringDiff (string, anotherString) {
  if (!string) string = ''
  var result = '{"result":[' + string.diff(anotherString, 2, 0) + ']}'
  return JSON.parse(result)
}

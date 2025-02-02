import { assert, describe, expect, it } from 'vitest'

interface node {
  id: string;
  left: node | any;
  right: node | any;
  split: string;
}

interface rootNode {
  left: node;
  right: node;
}

function add2(l, r, split) {

  let ll = l.length
  let rl = r.length

  let lc = l[0].length
  let rc = r[0].length



  let com = [];
  if (split === 'v') {
    let lrepeat = rl / ll;
    let lRepeatRow = []
    for (let i = 0; i < ll; i++) {
      for (let k = 0; k < lrepeat; k++) {
        let repeatCol = []
        for (let j = 0; j < lc; j++) {
          repeatCol.push(l[i][j])
        }
        lRepeatRow.push(repeatCol)
      }
    }

    let rRepeatRow = []
    let rrepeat = ll / rl;
    for (let i = 0; i < rl; i++) {
      for (let k = 0; k < rrepeat; k++) {
        let repeatCol = []
        for (let j = 0; j < rc; j++) {
          repeatCol.push(r[i][j])
        }
        rRepeatRow.push(repeatCol)
      }
    }


    for (let i = 0; i < rRepeatRow.length; i++) {
      let row = []
      for (let j = 0; j < lRepeatRow[0].length; j++) {
        row.push(lRepeatRow[i][j])
      }
      for (let j = 0; j < rRepeatRow[0].length; j++) {
        row.push(rRepeatRow[i][j])
      }
      com.push(row)
    }

  }

  if (split === 'h') {

    let lRepeatRows = []
    let lrepeat = rc / lc;
    for (let i = 0; i < ll; i++) {
      let repeatRow = []
      for (let k = 0; k < lrepeat; k++) {
        for (let j = 0; j < lc; j++) {
          repeatRow.push(l[i][j])
        }
      }
      lRepeatRows.push(repeatRow)
    }

    let rRepeatRows = []
    let rrepeat = lc / rc;
    for (let i = 0; i < rl; i++) {
      let repeatRow = []
      for (let k = 0; k < rrepeat; k++) {
        for (let j = 0; j < rc; j++) {
          repeatRow.push(r[i][j])
        }
      }
      rRepeatRows.push(repeatRow)
    }




      for (let j = 0; j < lRepeatRows.length; j++) {
        com.push(lRepeatRows[j])
      }
      for (let j = 0; j < rRepeatRows.length; j++) {
        com.push(rRepeatRows[j])
      }
  }




  return com;
}

function add(n: node) {
  if (n.split === undefined && n.id !== 'root') {
    return [[n.id]];
  } else {
    let lg = add(n.left)
    let rg = add(n.right)
    let l = add2(lg, rg, n.split);
    return l
  }
}

describe('suite name', () => {
  it('foo', () => {
    let root = {
      id: 'root',
      split: 'h',
      left: {
        split: 'v',
        left: {
          id: '1',
        },
        right: {
          split: 'h',
          left: {
            id: '4'
          },
          right: {
            id: '6'
          }
        },
      },
      right: {
        split: 'h',
        left: {
          id: '2'
        },
        right: {
          split: 'v',
          left: {
            id: '3',
          },
          right: {
            id: '5',
          },
        },
      },
    }

    let l = add(root)
    for (let i = 0; i < l.length; i++) {
      let s = ''
      for (let j = 0; j < l[i].length; j++) {
        s += `${l[i][j]} `
      }
      console.log(s)
    }
  })

})
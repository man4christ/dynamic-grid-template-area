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
    let lColRepeat = rc % lc === 0 ? rc / lc : (rc * lc) / (lc);
    let lRowRepeat = rl % ll === 0 ? rl / ll : (rl * ll) / (l);
    let lRepeatRow = []
    for (let i = 0; i < ll; i++) {
      for (let m = 0; m < lRowRepeat; m++) {
        let repeatCol = []
        for (let j = 0; j < lc; j++) {
          for (let k = 0; k < lColRepeat; k++) {
            repeatCol.push(l[i][j])
          }
        }
        lRepeatRow.push(repeatCol)
      }
    }

    let rRepeatRow = []
    let rColRepeat = lc % rc === 0 ? lc / rc : (lc * rc) / (rc);
    let rRowRepeat = ll % rl === 0 ? ll / rl : (ll * rl) / (rl);

    for (let i = 0; i < rl; i++) {
      for (let m = 0; m < rRowRepeat; m++) {
        let repeatCol = []

        for (let j = 0; j < rc; j++) {
          for (let k = 0; k < rColRepeat; k++) {
            repeatCol.push(r[i][j])
          }

        }
        rRepeatRow.push(repeatCol)
      }
    }


    for (let i = 0; i < rRepeatRow.length; i++) {
      let row = []

      for (let j = 0; j < lRepeatRow[i].length; j++) {
        row.push(lRepeatRow[i][j])
      }

      for (let j = 0; j < rRepeatRow[i].length; j++) {
        row.push(rRepeatRow[i][j])
      }
      com.push(row)
    }

  }

  if (split === 'h') {
    if (rc == lc && rl == ll){
      l.forEach(la => {
        com.push(la)
        
      });
      r.forEach(ra => {
        com.push(ra)
      });

      return com
    }

    let lRepeatRows = []
    let lrepeat = (rc * lc) / lc;
    for (let i = 0; i < ll; i++) {
      let repeatRow = []
      for (let j = 0; j < lc; j++) {
        for (let k = 0; k < lrepeat; k++) {
          repeatRow.push(l[i][j])
        }
      }
      lRepeatRows.push(repeatRow)
    }

    let rRepeatRows = []
    let rrepeat = (lc * rc) / rc;
    for (let i = 0; i < rl; i++) {
      let repeatRow = []
      for (let j = 0; j < rc; j++) {
        for (let k = 0; k < rrepeat; k++) {
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

    for (let i = 0; i < l.length; i++) {
      let s = ''
      for (let j = 0; j < l[i].length; j++) {
        s += `${l[i][j]} `
      }
      console.log(s)
    }
    console.log('///////////////////////////')
    return l
  }
}

describe('suite name', () => {
  it('foo', () => {
    let root = {
      id: 'root',
      split: 'h',
      left: {
        split: 'h',
        left: {
          split: 'v',
          left: {
            id: 'a',
          },
          right: {
            split: 'h',
            left: {
              split: 'v',
              left: {
                id: 'b'
              },
              right: {
                split: 'v',
                left: {
                  id: 'c'
                },
                right: {
                  id: 'd'
                },

              }

            },
            right: {
              id: 'e'
            }
          },
        },
        right: {
          split: 'h',
          left: {
            id: 'f'
          },
          right: {
            split: 'v',
            left: {
              id: 'g',
            },
            right: {
              id: 'h',
            },
          },
        },
      },
      right: {
        split: 'h',
        left: {
          split: 'v',
          left: {
            id: 'i',
          },
          right: {
            split: 'h',
            left: {
              split: 'v',
              left: {
                id: 'j'
              },
              right: {
                split: 'v',
                left: {
                  id: 'k'
                },
                right: {
                  id: 'l'
                },

              }

            },
            right: {
              id: 'm'
            }
          },
        },
        right: {
          split: 'h',
          left: {
            id: 'n'
          },
          right: {
            split: 'v',
            left: {
              id: 'o',
            },
            right: {
              id: 'p',
            },
          },
        },
      }
    }

    let l = add(root)
    for (let i = 0; i < l.length; i++) {
      let s = ''
      for (let j = 0; j < l[i].length; j++) {
        s += `${l[i][j]} `
      }
      console.log(`"${s}"`)
    }
  })

})
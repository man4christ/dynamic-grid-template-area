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
    for (let i = 0; i < ll; i++) {
      com.push(l[i].concat(r[i]));
    }
  }

  if (split === 'h') {

    let lrepeat = rc / lc;
    for (let i = 0; i < ll; i++) {
      let repeatRow = []
      for (let j = 0; j < lc; j++) {
        for (let k = 0; k < lrepeat; k++) {
          repeatRow.push(l[i][j])
        }
        com.push(repeatRow)
      }
    }
    for (let i = 0; i < rl; i++) {
      com.push(r[i])
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
    console.log(l)
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
          id: 4
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
    add(root)
  })

})
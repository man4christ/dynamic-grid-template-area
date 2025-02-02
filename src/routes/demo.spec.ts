import { assert, describe, expect, it } from 'vitest'

interface node {
  id: string;
  next: node | any;
  split: string;
}

interface rootNode {
  left: node;
  right: node;
}


function add(n: node): any[] {
  if (n.next === undefined) {
    return [[n.id]];
  } else {
    let g = add(n.next);
    let row = g.length;
    let col = g[0].length;
    let ng = [];

    for (let i = 0; i < row; i++) {
      let r = [];
      for (let i = 0; i < col; i++) {
        r.push(n.id);
      }
      ng.push(r);
    }

    let com = [];
    if (n.split === 'v') {
      for (let i = 0; i < row; i++) {
        com.push(ng[i].concat(g[i]));
      }
    }

    if (n.split === 'h') {
      for (let i = 0; i < row; i++) {
        com.push(ng[i])
      }
      for (let i = 0; i < row; i++) {
        com.push(g[i])
      }
    }

    return com;
  }
}

describe('suite name', () => {
  it('foo', () => {
    let root = {
      id: 'root',
      left: {
        id: '1',
        split: 'v',
        next: {
          id: '4',
        },
      },
      right: {
        id: '2',
        split: 'h',
        next: {
          id: '3',
          split: 'v',
          next: {
            id: '5',
          },
        },
      },
    }

    console.log(add(root.right))
    console.log(add(root.left))
  })

})
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

function add2(l: [], r: [], split: string) {

    let leftNumRows = l.length
    let rightNumRows = r.length

    let leftNumCols = l[0].length
    let rightNumCols = r[0].length


    let com = [];
    if (split === 'v') {
        let lColRepeat = rightNumCols % leftNumCols === 0 ? rightNumCols / leftNumCols : (rightNumCols * leftNumCols) / (leftNumCols);
        let lRowRepeat = rightNumRows % leftNumRows === 0 ? rightNumRows / leftNumRows : (rightNumRows * leftNumRows) / (l);
        let lRepeatRow = []
        for (let i = 0; i < leftNumRows; i++) {
            for (let m = 0; m < lRowRepeat; m++) {
                let repeatCol = []
                for (let j = 0; j < leftNumCols; j++) {
                    for (let k = 0; k < lColRepeat; k++) {
                        repeatCol.push(l[i][j])
                    }
                }
                lRepeatRow.push(repeatCol)
            }
        }

        let rRepeatRow = []
        let rColRepeat = leftNumCols % rightNumCols === 0 ? leftNumCols / rightNumCols : (leftNumCols * rightNumCols) / (rightNumCols);
        let rRowRepeat = leftNumRows % rightNumRows === 0 ? leftNumRows / rightNumRows : (leftNumRows * rightNumRows) / (rightNumRows);

        for (let i = 0; i < rightNumRows; i++) {
            for (let m = 0; m < rRowRepeat; m++) {
                let repeatCol = []

                for (let j = 0; j < rightNumCols; j++) {
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
        if (rightNumCols == leftNumCols && rightNumRows == leftNumRows) {
            l.forEach(la => {
                com.push(la)

            });
            r.forEach(ra => {
                com.push(ra)
            });

            return com
        }

        let lRepeatRows = []
        let lrepeat = (rightNumCols * leftNumCols) / leftNumCols;
        for (let i = 0; i < leftNumRows; i++) {
            let repeatRow = []
            for (let j = 0; j < leftNumCols; j++) {
                for (let k = 0; k < lrepeat; k++) {
                    repeatRow.push(l[i][j])
                }
            }
            lRepeatRows.push(repeatRow)
        }

        let rRepeatRows = []
        let rrepeat = (leftNumCols * rightNumCols) / rightNumCols;
        for (let i = 0; i < rightNumRows; i++) {
            let repeatRow = []
            for (let j = 0; j < rightNumCols; j++) {
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

export function add(n: node) {
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
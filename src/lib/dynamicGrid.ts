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

/**
 * 
 * @param lrgta left grid template area that is rendered.
 * @param rrgta right grid template area that is rendered.
 * @param split how to join them. v for vertical. h for horizontal.
 * @returns 
 */
function joinGridTemplateAreas(lrgta: string[][], rrgta: string[][], split: string) {
    let leftNumRows = lrgta.length
    let rightNumRows = rrgta.length

    let leftNumCols = lrgta[0].length
    let rightNumCols = rrgta[0].length

    let com = [];
    if (split === 'v') {
        let lColRepeat =  rightNumCols / leftNumCols
        let lRowRepeat = rightNumRows / leftNumRows 
        let lRepeatRow = []
        for (let i = 0; i < leftNumRows; i++) {
            for (let m = 0; m < lRowRepeat; m++) {
                let repeatCol: string[] = []
                for (let j = 0; j < leftNumCols; j++) {
                    for (let k = 0; k < lColRepeat; k++) {
                        repeatCol.push(lrgta[i][j])
                    }
                }
                lRepeatRow.push(repeatCol)
            }
        }

        let rRepeatRow = []
        let rColRepeat = leftNumCols / rightNumCols
        let rRowRepeat = leftNumRows / rightNumRows

        for (let i = 0; i < rightNumRows; i++) {
            for (let m = 0; m < rRowRepeat; m++) {
                let repeatCol: string[] = []

                for (let j = 0; j < rightNumCols; j++) {
                    for (let k = 0; k < rColRepeat; k++) {
                        repeatCol.push(rrgta[i][j])
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
            lrgta.forEach(la => {
                com.push(la)

            });
            rrgta.forEach(ra => {
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
                    repeatRow.push(lrgta[i][j])
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
                    repeatRow.push(rrgta[i][j])
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

export function renderGridTemplateAreas(n: node) {
    if (n.split === undefined && n.id !== 'root') {
        return [[n.id]];
    } else {
        let leftRenderedGridTemplateAreas = renderGridTemplateAreas(n.left)
        let rightRenderedGridTemplateAreas = renderGridTemplateAreas(n.right)
        let renderedGridTemplateAreas = joinGridTemplateAreas(leftRenderedGridTemplateAreas, rightRenderedGridTemplateAreas, n.split);

        for (let i = 0; i < renderedGridTemplateAreas.length; i++) {
            let s = ''
            for (let j = 0; j < renderedGridTemplateAreas[i].length; j++) {
                s += `${renderedGridTemplateAreas[i][j]} `
            }
            console.log(s)
        }
        console.log('///////////////////////////')
        return renderedGridTemplateAreas
    }
}
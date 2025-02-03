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


/** renders vertical grid template areas
 * 
 * takes a left grid template areas, determines if any columns need to repeat, repeats them for each row
 * then the same for the right grid
 * then concats the rows of left and the right
 */
function joinVerticalGridTemplateAreas(
    gta: string[][],
    lrgta: string[][],
    rrgta: string[][]
) {

    let leftNumRows = lrgta.length
    let rightNumRows = rrgta.length

    let leftNumCols = lrgta[0].length
    let rightNumCols = rrgta[0].length

    let lColRepeat = rightNumCols / leftNumCols
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
        gta.push(row)
    }

}


/**
 * 
 * @param lrgta left grid template area that is rendered.
 * @param rrgta right grid template area that is rendered.
 * @param split how to join them. v for vertical. h for horizontal.
 * @returns returns the joined grid template areas. updating the areas as needed e.g. filling in the grid as necessary.
 */
function joinGridTemplateAreas(lrgta: string[][], rrgta: string[][], split: string) {
    let leftNumRows = lrgta.length
    let rightNumRows = rrgta.length

    let leftNumCols = lrgta[0].length
    let rightNumCols = rrgta[0].length

    let gta: string[][] = [];
    if (split === 'v') {
        joinVerticalGridTemplateAreas(gta, lrgta, rrgta)
    }

    if (split === 'h') {
        if (rightNumCols == leftNumCols && rightNumRows == leftNumRows) {
            lrgta.forEach(la => {
                gta.push(la)

            });
            rrgta.forEach(ra => {
                gta.push(ra)
            });

            return gta
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
            gta.push(lRepeatRows[j])
        }
        for (let j = 0; j < rRepeatRows.length; j++) {
            gta.push(rRepeatRows[j])
        }
    }

    return gta;
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
//******************** API Utilities ********************

const BASE_URL = 'http://localhost:8080';

//******************** Helper Functions ********************

function sortingData(dataArr, column, currOrder, column2) {
    // Temp variables to hold comparison values
    let tempVar1, tempVar2;

    if(!column2) {
        const isString = typeof(dataArr[0][column]) === 'string';
        return dataArr.sort( (listA, listB) => {
            // Validate column value to normalize strings to lowercase
            if (isString) {
                tempVar1 = listA[column].toLowerCase();
                tempVar2 = listB[column].toLowerCase();
            } else {
                tempVar1 = listA[column];
                tempVar2 = listB[column];
            }
            
            if (currOrder === 'asc') {
                if (tempVar1 < tempVar2) {return -1;}
                if (tempVar1 > tempVar2) {return 1;}
            } else {
                if (tempVar1 > tempVar2) {return -1;}
                if (tempVar1 < tempVar2) {return 1;}
            }
            return 0;
        })
    } else {
        const isString = typeof(dataArr[0][column][column2]) === 'string';
        return dataArr.sort( (listA, listB) => {
            // Validate column value to normalize strings to lowercase
            if (isString) {
                tempVar1 = listA[column][column2].toLowerCase();
                tempVar2 = listB[column][column2].toLowerCase();
            } else {
                tempVar1 = listA[column][column2];
                tempVar2 = listB[column][column2];
            }
            
            if (currOrder === 'asc') {
                if (tempVar1 < tempVar2) {return -1;}
                if (tempVar1 > tempVar2) {return 1;}
            } else {
                if (tempVar1 > tempVar2) {return -1;}
                if (tempVar1 < tempVar2) {return 1;}
            }
            return 0;
        })
    }
}

export { BASE_URL, sortingData };
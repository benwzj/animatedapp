function matrix (n) {
  let arr = [];
  for (let item = 0; item< n; item ++) {
    arr.push([]);
  }
  let startI = 0;
  let endI = n-1;
  let startJ = 0;
  let endJ = n-1;
  let count = 0;
  while ( startI <= endI && startJ <= endJ ){
    // 1, left to right
    for ( let j=startJ; j<=endJ; j++ ){
      arr[startI][j] = count;
      count ++;
    }
    startI ++;

    // 2, up to bottom
    for ( let i=startI; i<=endI; i++ ){
      arr[i][endJ] = count;
      count ++;
    }
    endJ --;

    // 3, right to left
    for ( let j=endJ; j>=startJ; j-- ){
      arr[endI][j] = count;
      count++;
    }
    endI --;

    // 4, bottom to up
    for ( let i=endI; i>=startI; i--){
      arr[i][startJ] = count;
      count ++;
    }
    startJ ++;
  }
  return arr;
}

export default matrix
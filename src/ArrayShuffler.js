export var shuffleArray = (arr)=>{
    let sz = arr.length ; 
    while(sz){
      let randInd = Math.floor(Math.random()*sz) ; 
      sz-- ; 
      let temp = arr[randInd] ; 
      arr[randInd] = arr[sz] ; 
      arr[sz] = temp ; 
    }
    return arr ; 
  }
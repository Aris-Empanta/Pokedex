module.exports = {
    //The function below, takes an array as parameter, and converts it into a 2-dimensional
    //array, consisted of chunks of 6 or less.
    setsOfSix: (array) => {   
                            let finalArray = []

                            let subArray = []

                            for( let i = 0; i < array.length; i++ ) {
                                //We create our subarray of 6
                                subArray.push(array[i])
                                //If the subarray has length of 6, we push it to the final array
                                //and clear it.
                                if(subArray.length === 6 ) { 

                                    finalArray.push(subArray) 
                                    subArray = []
                                }
                                //If the initial array is not divided exactly by 6, 
                                //we add also the last small chunk (of e.g 2) to the final array.
                                if( i === array.length - 1 && array.length % 6 !== 0 ) {

                                    finalArray.push(subArray) 
                                    }      
                                }                           

                            return finalArray
                            }
}
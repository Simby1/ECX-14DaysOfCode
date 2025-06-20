function transformData(objectArray){
   const transformedArray = objectArray.map((indObject) => {
   
    let output = `${indObject.name}/${indObject.age}/${indObject.level}`
    return output
   })
   return transformedArray
}

const myData = [
    {name: 'Seun', age: 23, level: '100 level'},
    {name: 'Jane', age: 30, level: '200 level'},
    {name: 'Bob', age: 35, level: '300 level'}
    ]

console.log(transformData(myData))
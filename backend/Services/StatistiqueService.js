function changeDataFormat(data)
{
    let keys=Object.keys(data[0])
    let result=
    {
        labels:[],
        dataSet:[]
    }
    for(line of data)
        {
            result.labels.push(line[keys[0]]);
            result.dataSet.push(line[keys[1]])
        }
    return result   
}
module.exports={changeDataFormat}
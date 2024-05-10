function changeDataFormat(data)
{
    keys=Object.keys(data[0])
    let result=
    {
        labels:[],
        dataSet:[]
    }
    for(line of data)
        {
            result.labels.push(line[key[0]]);
            result.dataSet.push(line[key[1]])
        }
    return result   
}
module.exports={changeDataFormat}
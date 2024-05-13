function changeDataFormat(data)
{
    let keys=Object.keys(data[0])
    let result=
    {
        labels:[],
        dataSet:[],
        id:[]
    }
    for(line of data)
        {
            result.labels.push(line[keys[0]]);
            result.dataSet.push(line[keys[1]])
            if(keys.length>2)
                result.id.push(line(keys[2]))
        }
    return result   
}
module.exports={changeDataFormat}

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const BUCKET = "code-fell-lab-17-lambda-trigger";

const openLogFile = async (Bucket, Key) => {
    const obj = await s3.getObject({Bucket, Key}).promise();
    const bodyContents = await obj.Body.toString()
    return JSON.parse(bodyContents)
};

const putLogFile = (Bucket, logData) => {
    const newObj = {Key: "images.json", Body: JSON.stringify(logData), ContentType: "application/json", Bucket};
    return s3.putObject(newObj).promise();
}

const parseEvent = (event) => {
    console.log("parse event...")
    const record = event.Records[0]
    const object = record.s3.object;
    const bucket = record.s3.bucket;
    console.log(object, bucket)
    return {object, bucket}
}

const parseObjMetadata = (object) => {
    return object;
}

exports.handler = async (event) => {
    // TODO implement
    const record = event.Records[0]
    const s3Data = parseEvent(event)
    const objMetadata = parseObjMetadata(s3Data.object)

    let logData;
    try{
        logData = await openLogFile(BUCKET, "images.json");
        logData.push(objMetadata)
        await putLogFile(BUCKET, logData)
    } catch (error) {
        // create new object.
        console.log(error.message, error.errType)
        logData = [objMetadata]
        const result = await putLogFile(BUCKET, logData)
        console.log(result)
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(logData),
    };
    return response;
};

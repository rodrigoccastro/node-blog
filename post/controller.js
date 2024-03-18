const statusNotFound = 404;
const statusSuccess = 200;
const statusError = 500;

const textMessageIdMissing = 'ID parameter is missing';
const textMessageUserNotFound = 'Object not found';
const textMessageBodySaveNotFound = 'Attributes are missing';
const textMessageDeleted = 'Object deleted';

function responseMessage(res, status, message) {
    return res.status(status).json({ message: message });
}

function responseList(res, list) {
    res.json(list);
}

function getId(req) {
    const { id } = req.params;
    if (!id) {
        throw new Error(textMessageIdMissing);
    }
    return id;
}

function responseObject(res, object) {
    res.json(object);
}

function getStatusNotFound() {
    return statusNotFound;
}

function getStatusSuccess() {
    return statusSuccess;
}

function getStatusError() {
    return statusError;
}

function getTextMessageIdMissing() {
    return textMessageIdMissing;
}

function getTextMessageUserNotFound() {
    return textMessageUserNotFound;
}

function getTextMessageBodySaveNotFound() {
    return textMessageBodySaveNotFound;
}

function getTextMessageDeleted() {
    return textMessageDeleted;
}

module.exports = {
    responseMessage,
    responseList,
    getId,
    responseObject,
    getStatusNotFound,
    getStatusSuccess,
    getStatusError,
    getTextMessageIdMissing,
    getTextMessageUserNotFound,
    getTextMessageBodySaveNotFound,
    getTextMessageDeleted
};

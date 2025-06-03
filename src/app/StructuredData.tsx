let script = '';

export function setStructuredData(json: object) {
    script = JSON.stringify(json);
}

export function getStructuredData() {
    return script;
}
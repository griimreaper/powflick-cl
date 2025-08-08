let scripts: string[] = [];

export function setStructuredData(jsonArray: object[]) {
    scripts = jsonArray.map((json) => JSON.stringify(json));
}

export function getStructuredData(): string[] {
    return scripts;
}

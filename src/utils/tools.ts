export function Capitalize(string: string) {
    return string.split('').map((l,i) => i === 0 ? l.toUpperCase() : l ).join('')
}
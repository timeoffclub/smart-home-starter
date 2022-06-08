export function isEmpty(value) {
    const type = typeof val;
    if ((value !== null && type === 'object') || type === 'function') {
        const properties = Object.keys(value);
        if (properties.length === 0 || properties.size === 0) { 
            return true;
        } 
    } 
    return !value;
}

export const kebabCase = (string) => {
  return string.replace(/\s+|\//g, '-').toLowerCase();
}

// Check whether the elapsed time since the timestamp is less than specified timespan
// Both timestamp and timespan should be in milliseconds
export const isOld = (timestamp, timespan) => {
    return ((Date.now() / 1000) - (timestamp / 1000000)) > timespan
}
export const ISODateString = (d) => {

    function pad(n) {
        return n < 10 ? '0' + n : n
    }

    return d.getUTCFullYear() + '-'
        + pad(d.getUTCMonth() + 1) + '-'
        + pad(d.getUTCDate()) + 'T'
        + pad(d.getUTCHours()) + ':'
        + pad(d.getUTCMinutes()) + ':'
        + pad(d.getUTCSeconds()) + (d.getTimezoneOffset() > 0 ? "-" : "+")
        + pad(Math.abs(d.getTimezoneOffset()) / 60) + ':'
        + pad(Math.abs(d.getTimezoneOffset()) % 60)
};
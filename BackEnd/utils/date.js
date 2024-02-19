class DateUtils {
    static formatDateTime(dateString) {
        const date = new Date(dateString);
        
        // Extract year, month, day, hours, minutes, and seconds from the date in UTC
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month starts from 0, so add 1
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        // Create the formatted date and time string
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDateTime;
    }
}
// Example usage:
const dateString = "2024-02-16T00:00:00.000Z";
const formattedDateTime = DateUtils.formatDateTime(dateString);
console.log(formattedDateTime); // Output: "2024-02-16 00:00:00"

module.exports = DateUtils;

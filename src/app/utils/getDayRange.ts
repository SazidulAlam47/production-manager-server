export const getDayRange = (dateInput: string | Date) => {
    const dateObj = new Date(dateInput);
    const startOfDay = new Date(
        Date.UTC(
            dateObj.getUTCFullYear(),
            dateObj.getUTCMonth(),
            dateObj.getUTCDate(),
            0,
            0,
            0,
            0,
        ),
    );
    const endOfDay = new Date(
        Date.UTC(
            dateObj.getUTCFullYear(),
            dateObj.getUTCMonth(),
            dateObj.getUTCDate(),
            23,
            59,
            59,
            999,
        ),
    );
    return { startOfDay, endOfDay };
};

export default getDayRange;

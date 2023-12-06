const displayDate = (time) => {
    const date = new Date(time);
    return `${date.getMonth()} - ${date.getDate()} - ${date.getFullYear()}`
}

export {displayDate};
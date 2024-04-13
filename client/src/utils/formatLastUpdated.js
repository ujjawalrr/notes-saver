export const formatLastUpdated = (lastUpdated) => {
    const now = new Date();
    const updatedAt = new Date(lastUpdated);

    // If last updated is today
    if (updatedAt.toDateString() === now.toDateString()) {
        return `Last updated at ${updatedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} today`;
    }

    // If last updated was yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (updatedAt.toDateString() === yesterday.toDateString()) {
        return `Last updated at ${updatedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} yesterday`;
    }

    // If older than yesterday
    return `Last updated on ${updatedAt.toLocaleDateString()}`
};

// export default {formatLastUpdated};
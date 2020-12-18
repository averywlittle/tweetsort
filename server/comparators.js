
const byFavorites = (left, right) => {
    if (left.favorite_count > right.favorite_count) return true
    else if (left.favorite_count <= right.favorite_count) return false
}

const byDate = (left, right) => {
    // Convert to dates to enable comparisons
    const leftDate = new Date(left.created_at)
    const rightDate = new Date(right.created_at)

    if (leftDate > rightDate) return true
    else if (leftDate <= rightDate) return false
}

const byReach = (left, right) => {
    if (left.retweet_count > right.retweet_count) return true
    else if (left.retweet_count <= right.retweet_count) return false
}

exports.options = { byFavorites, byDate, byReach }


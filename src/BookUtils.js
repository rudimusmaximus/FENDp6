//per Doug Brown study session as listed in readme.md
export const sortAllBooks = (list) => {
    // Sort the list of books passed in and return the sorted list
    const newList = list.sort(function (a, b){
        const titleA = a
            .title
            .toUpperCase();
        const titleB = b
            .title
            .toUpperCase();
        if (titleA < titleB){
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
    return newList;
};

export const mergeShelfAndSearch = (shelf, search) => {
    // check if each book search results is already in the shelf
    const hashTable = {};
    shelf.forEach(book => hashTable[book.id] = book.shelf);

    search.forEach(book => {
        book.shelf = hashTable[book.id] || 'none';
    });

    return search;
};

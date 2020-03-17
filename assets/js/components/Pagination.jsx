import React from 'react';
// <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={customers.length} onPageChanged={handleChangePage}/>
const Pagination = ({currentPage, itemsPerPage, length, onPageChanged}) => {

    const pagesCount = Math.ceil(length/itemsPerPage);         // Math.ceil : fonction d'arrondi au supérieur
    const pages = [];
    for (let i = 1; i <= pagesCount ; i++){
        pages.push(i)
    }
    return (
        <div>
            <ul className="pagination pagination-sm">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button className="page-link" onClick={()=> onPageChanged(currentPage - 1)}>&laquo;</button>
                </li>

                {pages.map(page => (
                    <li key={page}
                        className={"page-item" + (currentPage === page && " active")
                        }>
                        <a
                            className="page-link"
                            onClick={()=> onPageChanged(page)}
                        >
                            {page}
                        </a>
                    </li>) )}

                <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                    <button className="page-link" onClick={()=> onPageChanged(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    );
};


Pagination.getStart = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
};

export default Pagination;
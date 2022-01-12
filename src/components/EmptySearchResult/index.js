import React from "react";

function EmptySearchResult({searchValue}) {
    return <p>No hay similitudes de búsqueda para {searchValue}</p>
}

export { EmptySearchResult }
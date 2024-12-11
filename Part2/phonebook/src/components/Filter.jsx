import React from 'react'

const Filter = ({ searchValue , handleChangeSearch }) => {
    return (
        <div>
            filter Shown with :
            <input type="text" value={searchValue} onChange={handleChangeSearch} />
        </div>
    )
}

export default Filter
import React from 'react'

const PersonForm = ({newName , newNumber , handleChangeName , handleChangeNumber , handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    name: <input value={newName} onChange={handleChangeName} required />
                </div>
                <div>
                    Phone number: <input value={newNumber} onChange={handleChangeNumber} required />
                </div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
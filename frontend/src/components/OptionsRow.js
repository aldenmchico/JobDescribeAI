import React from 'react';
import { MdDeleteOutline } from 'react-icons/md'

function OptionsRow({option, deleteOption}) {
    return (
        <tr>
            <td>{option}</td>
            <td>{<MdDeleteOutline onClick={() => {deleteOption(option)}}/>}</td>
        </tr>
    );
}

export default OptionsRow;
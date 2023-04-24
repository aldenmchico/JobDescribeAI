import React from 'react';
import {useState} from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

import OptionsRow from './OptionsRow';


function OptionsList({options, deleteOption, addOption}) {

    const [addOptionValue, setAddOptionValue] = useState();
    return (
        <div className="wrapper">
        <table>
            <thead>
                <tr>
                    <th>Option</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{options[0]}</td>
                    <td></td>
                </tr>
                {options.slice(1).map((option, i) =>
                <OptionsRow
                    option={option}
                    deleteOption={deleteOption}
                    key={i}
                />)}
                <tr>
                    <td>
                        <form onSubmit={(e) => { e.preventDefault();}}> 
                        <select 
                                    type="text"
                                    name="addOption"
                                    className="addOption"
                                    onChange={e => setAddOptionValue(e.target.value)}
                                    id="option"
                                    required>
                                        <option value="Median Salary" selected>Median Salary</option>
                                        <option value="Educational Requirements">Educational Requirements</option>
                                        <option value="List of Institutions">List of Institutions</option>
                                        <option value="Cost of Education">Cost of Education</option>
                                        <option value="Job Resources">Job Resources</option>
                                        <option value="Company List">Company List</option>
                                        <option value="Relavent Skills">Relavent Skills</option>
                        </select>
                        {<AiOutlinePlus onClick={() => {
                            addOption(addOptionValue)
                            }}/>}
                        </form>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default OptionsList;
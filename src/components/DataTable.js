import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

// data: array of Objects with ids
// titles: array of strings as the titles of the table
// columns: array of objects containing:
//   - item: object inside the data array
//   - property: string referring to a field inside the item object
//   - editable: boolean saying if the column can be edited
// onChange: function (id, field, value) => Promise<void>

const DataTable = ({ data, titles, columns, onChange }) => {
    return (
        <table className="min-w-full max-w-full">
            <thead>
                <tr>
                    {titles.map((title) => (
                        <th
                            key={title}
                            className={clsx([
                                'px-6 py-3 text-xs font-medium leading-4 tracking-wider',
                                'text-left uppercase bg-teal-600 text-white',
                            ])}
                        >
                            {title}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="bg-white">
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <Column
                                key={column.property}
                                item={item}
                                onChange={onChange}
                                {...column}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const Column = ({ item, property, editable, onChange }) => {
    const [loading, setLoading] = useState(false)

    const onBlur = async (event) => {
        const value = event.target.innerHTML
        setLoading(true)
        await onChange(item.id, property, value)
        setLoading(false)
    }

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur()
        }
    }

    const attributes = editable
        ? {
              onBlur,
              onKeyPress,
              contentEditable: true,
              suppressContentEditableWarning: true,
          }
        : {}

    return (
        <td className="text-sm leading-5 text-white whitespace-nowrap border-b border-teal-600 bg-teal-500">
            <div className="flex gap-1">
                <span
                    className="px-6 py-4 grow break-all whitespace-pre-wrap outline-none focus:ring focus:ring-white"
                    {...attributes}
                >
                    {property ? item[property] : ''}
                </span>

                <span className="px-6 py-4">
                    {loading && (
                        <FontAwesomeIcon
                            className="animate-spin"
                            icon={faSpinner}
                            style={{
                                marginRight: 10,
                                marginLeft: -26,
                            }}
                        />
                    )}
                </span>
            </div>
        </td>
    )
}

export default DataTable
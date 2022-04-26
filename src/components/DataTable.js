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
//   - inputType: text (default), select
//   - selectData: array of objects with value and text
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
                                'text-left uppercase bg-green-200 text-cyan-900',
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

const Column = ({ item, property, onChange, ...rest }) => {
    // defaults
    const editable = rest.editable ?? true
    const inputType = rest.inputType ?? 'text'

    const [loading, setLoading] = useState(false)

    const attributes =
        inputType === 'text' && editable
            ? {
                  onBlur: async (event) => {
                      const value = event.target.innerHTML
                      if (value === item[property]) return
                      setLoading(true)
                      await onChange(item.id, property, value)
                      setLoading(false)
                  },
                  onKeyPress: (event) => {
                      if (event.key === 'Enter') {
                          event.target.blur()
                      }
                  },
                  contentEditable: true,
                  suppressContentEditableWarning: true,
              }
            : inputType === 'select'
            ? {
                  defaultValue: item[property],
                  onChange: async (event) => {
                      const { value } = event.target
                      if (value === item[property]) return
                      setLoading(true)
                      await onChange(item.id, property, value)
                      setLoading(false)
                  },
              }
            : {}

    return (
        <td className="text-sm leading-5 whitespace-nowrap border-b border-green-200 bg-green-100 text-cyan-900">
            <div className="flex items-center gap-1">
                {inputType === 'text' ? (
                    <span
                        className="p-4 grow break-all whitespace-pre-wrap outline-none focus:ring focus:ring-white"
                        {...attributes}
                    >
                        {property ? item[property] : ''}
                    </span>
                ) : (
                    <select
                        className="bg-transparent outline-none ring-transparent w-full h-full p-4 focus:ring-white focus:ring"
                        {...attributes}
                    >
                        {(rest.selectData || []).map((d) => (
                            <option key={d.value} value={d.value}>
                                {d.text}
                            </option>
                        ))}
                    </select>
                )}

                {loading && (
                    <span>
                        <FontAwesomeIcon
                            className="animate-spin"
                            icon={faSpinner}
                        />
                    </span>
                )}
            </div>
        </td>
    )
}

export default DataTable

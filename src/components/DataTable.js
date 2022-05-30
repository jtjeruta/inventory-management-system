import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

// data: array of Objects with ids
// columns: array of objects containing:
//   - title: string
//   - item: object inside the data array
//   - property: string referring to a field inside the item object
//   - editable: boolean saying if the column can be edited
//   - inputType: text (default), select
//   - selectData: array of objects with value and text
//   - titleClsx: classes to add to the title
//   - colClsx: classes to add to the column
// onChange: function (id, field, value) => Promise<void>
// loading: boolean
// bgColor: tailwind color

const colClsx = (bgColor = 'green') =>
    `text-sm leading-5 whitespace-nowrap border-b border-${bgColor}-200 bg-${bgColor}-100 text-cyan-900`

const DataTable = ({ data, columns, onChange, loading, ...rest }) => {
    const bgColor = rest.bgColor ?? 'green'

    return (
        <table className="min-w-full max-w-full">
            <thead
                className={`uppercase bg-${bgColor}-200 text-cyan-900 text-xs font-medium leading-4`}
            >
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.title || column.property}
                            className={clsx([
                                'px-4 py-3 tracking-wider text-left',
                                column.titleClsx,
                            ])}
                        >
                            {column.title || column.property}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {loading ? (
                    <>
                        {[1, 2, 3].map((index) => (
                            <tr key={`tr-${index}`}>
                                {columns.map((column) => (
                                    <td
                                        key={column.title}
                                        className={colClsx(bgColor)}
                                    >
                                        <div className="animate-pulse flex p-2">
                                            <div className="h-4 w-full bg-slate-400 rounded" />
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </>
                ) : (
                    <>
                        {data.map((item) => (
                            <tr key={item.id}>
                                {columns.map((column) => (
                                    <Column
                                        key={column.property}
                                        item={item}
                                        onChange={onChange}
                                        bgColor={bgColor}
                                        {...column}
                                    />
                                ))}
                            </tr>
                        ))}
                    </>
                )}
            </tbody>
        </table>
    )
}

const Column = ({ item, property, onChange, bgColor, ...rest }) => {
    // defaults
    const editable = rest.editable ?? true
    const inputType = rest.inputType ?? 'text'
    const format = rest.format ?? ((v) => v)

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
        <td className={clsx([colClsx(bgColor), rest.colClsx])}>
            <div className="flex items-center gap-1">
                {inputType === 'text' ? (
                    <span
                        className="p-4 grow break-all whitespace-pre-wrap outline-none focus:ring focus:ring-white"
                        {...attributes}
                    >
                        {property ? format(item[property]) : ''}
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

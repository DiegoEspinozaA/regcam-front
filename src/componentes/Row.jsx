import React from 'react';
import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow
                key={row.id}
                onSelect={() => alert(row.id)}
                className={`transition duration-100 ease-in  ${open ? '' : ''}`}
            >
                <TableCell className="max-w-xs truncate"> {row.fecha}</TableCell>
                <TableCell className="max-w-xs " align="left">
                    <span className="font-bold text-gray-600 rounded-md  px-2 py-1" style={{ backgroundColor: [row.color] || '#989898' }} >
                        {row.tipo}
                    </span>
                </TableCell>

                <TableCell className=" " align="left" > {row.descripcion}</TableCell>
                <TableCell className="max-w-xs truncate" align="left"> {row.notificado ? 'Si' : 'No'}</TableCell>
                <TableCell className="max-w-xs truncate" align="right">
                    <button className=' text-blue-500 font-bold py-1 px-2 rounded  hover:bg-blue-100 transition-all duration-200 '>
                        Editar
                    </button>
                </TableCell>
            </TableRow>
            <TableRow>
            </TableRow>
        </React.Fragment>
    );

}

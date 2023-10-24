import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';

const history = [
    {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
    },
    {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
    },
]

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
                <TableCell  >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className="max-w-xs truncate"> {row.fecha}</TableCell>
                <TableCell className="max-w-xs truncate" align="left">{row.tipo}</TableCell>
                <TableCell align="left"> {row.descripcion}</TableCell>
                <TableCell className="max-w-xs truncate" align="left"> {row.notificado ? 'Si' : 'No'}</TableCell>
                <TableCell className="max-w-xs truncate" align="right">
                <IconButton
                        aria-label="edit button"
                        size="small"
                    >
                       <EditIcon /> 
                    </IconButton> </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Historial
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell align="left">Descripcion</TableCell>
                                        <TableCell align="left">Notificado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.map((historyRow) => (
                                        <TableRow key={historyRow.date} >
                                            <TableCell className="max-w-xs truncate" component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate" >{historyRow.customerId}</TableCell>
                                            <TableCell align="left">{historyRow.amount}</TableCell>
                                            <TableCell className="max-w-xs truncate" align="right">
                                                No
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}

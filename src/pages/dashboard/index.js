import { useState } from 'react';

import { useSelector } from 'react-redux';

import { visuallyHidden } from '@mui/utils';
import {
  Grid,
  Box,
  Toolbar,
  ClickAwayListener,
  TextField,
  IconButton,
  Tooltip,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableSortLabel,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// import custom component
import Form from '../../components/Form';

import { stableSort, getComparator } from '../../helpers/sortTable';

import fromUnixTime from 'date-fns/fromUnixTime';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date_updated');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchBar, setSearchBar] = useState(false);
  const [search, setSearch] = useState('');

  const rowCount = 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  const handleShowSearchBar = () => {
    searchBar ? setSearchBar(false) : setSearchBar(true);
  };

  const letterRows = stableSort(user.letters, getComparator(order, orderBy))
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ?.map((letter, index) => (
      <TableRow>
        <TableCell align='left' padding='normal'>
          {formatDistanceToNow(fromUnixTime(letter.date_updated), {
            addSuffix: true
          })}
        </TableCell>
        <TableCell align='left' padding='normal'>
          {letter.name}
        </TableCell>
        <TableCell align='left' padding='normal'>
          {letter.job_title}
        </TableCell>
        <TableCell align='left' padding='normal'>
          {letter.organization_name}
        </TableCell>
        <TableCell align='right' padding='normal'>
          {formatDistanceToNow(fromUnixTime(letter.date_created), {
            addSuffix: true
          })}
        </TableCell>
      </TableRow>
    ));

  return (
    <Box sx={{ p: 2 }}>
      <Form open={open} handleClose={handleFormClose} />
      <Grid container>
        <Grid item xs={12}>
          <Toolbar
            component={Paper}
            sx={{
              mt: 1,
              alignItems: 'center'
            }}>
            <Grid container padding={1}>
              <Grid item xs={6} padding={1}>
                {searchBar && (
                  <ClickAwayListener onClickAway={handleShowSearchBar}>
                    <TextField
                      fullWidth
                      size='small'
                      variant='outlined'
                      placeholder='Search...'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </ClickAwayListener>
                )}
                {!searchBar && (
                  <IconButton onClick={handleShowSearchBar}>
                    <SearchIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={6} padding={1}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                  <Tooltip title='Create New'>
                    <IconButton onClick={handleFormOpen}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label='collapsible table' size='small'>
              <TableHead>
                <TableRow>
                  {['date_updated', 'name', 'job_title', 'organization', 'date_created'].map(
                    (column) => (
                      <TableCell
                        key={column}
                        align={column === 'date_created' ? 'right' : 'left'}
                        padding='normal'
                        sortDirection={orderBy === column ? order : false}>
                        <TableSortLabel
                          active={orderBy === column}
                          direction={orderBy === column ? order : 'asc'}
                          onClick={() => handleRequestSort(column)}>
                          <b>
                            {column.split('_')[0][0].toUpperCase()}
                            {column.split('_')[0].substring(1)}
                            {column.split('_')[1] &&
                              ` ${column.split('_')[1][0].toUpperCase()}${column
                                .split('_')[1]
                                .substring(1)}`}
                          </b>
                          {orderBy === column && (
                            <Box component='span' sx={visuallyHidden}>
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                          )}
                        </TableSortLabel>
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>{letterRows}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component={Paper}
            size='small'
            rowsPerPage={rowsPerPage}
            page={page}
            count={rowCount}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

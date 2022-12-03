import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../../../services/api';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import UserEditModal from './UserEditModal'
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { warningBox } from '../../../../../components/WarningBox';
import { confirmationBox } from '../../../../../components/ConfirmationBox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selection, setSelection] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState();

  const openModalRef = useRef()

  useEffect(() => {
    const loadUsers = async () => {
      const response = await api.get('/api/users-list');
      setUsers(response.data)
      setIsLoading(false)
    }
    loadUsers();
  }, [userSelected]);

  useEffect(() => {
    setLoadingMessage(<div style={{
      "position": "relative",
      "left": 0,
      "top": 0,
      "right": 0,
      "bottom": 0,
      "justifyContent": "center",
      "display": "flex",
      "alignItems": "center",
    }}>
      <img style={{ width: "50%" }} src='https://upload.wikimedia.org/wikipedia/commons/9/92/Loading_icon_cropped.gif' alt='Loading'></img>
    </div>)
    setTimeout(() => isLoading && setLoadingMessage(<Typography variant='subtitle1'>Oops, something went wrong</Typography>), 5000)
  }, [setLoadingMessage, isLoading])



  //Return data of a selected user
  const getSelectedUser = (selectId, user) => {
    const result = user.filter((e) => selectId[0] === e._id)
    setUserSelected(result)
    openModalRef.current.handleOpen()
  }

  //Certify that only one user was selected to be edited
  const handleEdit = (id, user) => {
    console.log(localStorage.getItem('userEmail') === (userSelected.find(e => e.email === localStorage.getItem('userEmail'))).email)
    console.log(userSelected.find(e => e.email === localStorage.getItem('userEmail')).email)
    id.length < 1 && warningBox("Please, first select the user to be edited.");
    id.length === 1
      ? getSelectedUser(id, user)
      : warningBox("Please, select only one user to be edited.");
  };

  //Check selected users to be deleted
  const handleDeleteUser = (id) => {
    if (id.length < 1) return warningBox("Please, select which user(s) you want to delete.");
    id.length === 1
      ? confirmationBox("Do you really want to delete this user?", confirmDeletion)
      : confirmationBox(`Do you really want to delete these ${selection.length} users?`, confirmDeletion);
  };

  //Handle deletion after confirmation
  const confirmDeletion = () => {
    console.log(localStorage.getItem("userEmail"))
    const apiDel = async (newId) => {
      await api.delete(`/api/user/${newId}`);
      selection.length > 1
        ? warningBox(`${selection.length} users deleted.`)
        : warningBox('User deleted.')
    }
    setTimeout(window.location.reload.bind(window.location), 1800);
selection.length > 1
  ? selection.map(e => apiDel(e))
  : apiDel(selection)
  }

const columns = [
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'email', headerName: 'Email Address', width: 350 },
  { field: 'type', headerName: 'Type', width: 80 },
  { field: 'creationDate', headerName: 'Created At', width: 200 },
  { field: 'updateDate', headerName: 'Last Update', width: 200 },
  { field: 'id', headerName: 'Id', width: 250 },
];

const rows = users.map((row) => ({
  lastName: row.lastName,
  firstName: row.firstName,
  email: row.email,
  type: row.type,
  creationDate: new Date(row.createdAt).toLocaleString('en-GB'),
  updateDate: new Date(row.updatedAt).toLocaleString('en-GB'),
  id: row._id,
}))

const CustomNoRowsOverlay = () => {
  return (
    <Box style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      marginTop: 35,
    }}>
      {loadingMessage}
    </Box>

  )
}

return (
  <div sx={{ height: '100%', width: "100%" }}>
    <Typography variant='h4' style={{ textAlign: 'center' }}>Users</Typography>
    <UserEditModal ref={openModalRef} selection={userSelected} />

    <DataGrid
      components={{
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      autoHeight="true"
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      getRowHeight={() => 'auto'}
      onSelectionModelChange={newSelection => {
        setSelection(newSelection);
      }}
    />
    <IconButton><RefreshIcon onClick={() => window.location.reload()} /></IconButton>
    <div style={{ float: "right", marginTop: 10, }}>
      <Button
        variant="contained"
        onClick={() => handleEdit(selection, users)}
        style={{ marginRight: 10 }}
      >
        Edit
      </Button>

      <Button
        variant="contained"
        onClick={() => handleDeleteUser(selection)}
      >
        Delete
      </Button>
    </div>
  </div>
);
}
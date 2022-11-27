import React, { useState, useEffect, useRef } from 'react'
import api from '../../../../../../services/api';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import ItemEditModal from './ItemEditModal';
import ItemAddModal from './ItemAddModal';
import { warningBox } from '../../../../../components/WarningBox';
import { confirmationBox } from '../../../../../components/ConfirmationBox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Items() {
  const [items, setItems] = useState([]);
  const [selection, setSelection] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState();

  const openEditModalRef = useRef()
  const openAddModalRef = useRef()

  useEffect(() => {
    const loadItems = async () => {
      const response = await api.get('/api/items-list');
      setItems(response.data)
      setIsLoading(false)
    }
    loadItems();
  }, [])

  useEffect(() => {
    setLoadingMessage(<div style={{
      "position": "relative",
      "left": 0,
      "top": 0,
      "right": 0,
      "bottom": 0,
      "justify-content": "center",
      "display": "flex",
      "align-items": "center",
    }}>
      <img style={{ width: "50%" }} src='https://upload.wikimedia.org/wikipedia/commons/9/92/Loading_icon_cropped.gif' alt='Loading'></img>
    </div>)
    setTimeout(() => isLoading && setLoadingMessage(<Typography variant='subtitle1'>Oops, something went wrong</Typography>), 5000)
  }, [setLoadingMessage, isLoading])

  //Return data of a selected item
  const getItemSelected = (selectId, item) => {
    const result = item.filter((e) => selectId[0] === e._id)
    setItemSelected(result)
    openEditModalRef.current.handleOpen()
  }

  //Certify that only one item was selected to be edited
  const handleEdit = (id, item) => {
    id.length < 1 && warningBox("Please, first select the item to be edited.");
    id.length === 1
      ? getItemSelected(id, item)
      : warningBox("Please, select only one item to be edited.");
  };

  //Check selected items to be deleted
  const handleDeleteItem = (id) => {
    if (id.length < 1) return warningBox("Please, select which item(s) you want to delete.");
    id.length === 1
      ? confirmationBox("Do you really want to delete this item?", confirmDeletion)
      : confirmationBox(`Do you really want to delete these ${selection.length} items?`, confirmDeletion);
  };


  //Handle deletion after confirmation
  const confirmDeletion = () => {
    const apiDel = async (newId) => {
      await api.delete(`/api/item/${newId}`);
      selection.length > 1
        ? warningBox(`${selection.length} items deleted.`)
        : warningBox('Item deleted.')
      return setTimeout(window.location.reload.bind(window.location), 1800);
    };
    selection.length > 1
      ? selection.map(e => apiDel(e))
      : apiDel(selection)
  }

  const columns = [
    { field: 'sku', headerName: 'SKU', width: 150 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'price', headerName: 'Price(£)', width: 70 },
    { field: 'description', headerName: 'Description', width: 500 },
    { field: 'category', headerName: 'Category', width: 250 },
    { field: 'image', headerName: 'Image', width: 500 },
    { field: 'rating', headerName: 'Rating', width: 70 },
    { field: 'quantity', headerName: 'Quantity', width: 70 },
    { field: 'id', headerName: 'Id', width: 250 },
  ];

  const rows = items.map(row => ({
    sku: row.sku,
    title: row.title,
    price: (row.price).toFixed(2),
    description: row.description,
    category: row.category,
    image: row.image,
    rating: row.rating,
    quantity: row.quantity,
    id: row._id
  }));

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
    <div style={{ height: '100%', width: '100%' }}>
      <Typography variant='h4' style={{ textAlign: 'center' }}>Items</Typography>
      <ItemEditModal ref={openEditModalRef} selection={itemSelected} />
      <ItemAddModal ref={openAddModalRef} />
      <DataGrid
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        autoHeight='true'
        autoPageSize='true'
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowHeight={() => 'auto'}
        onSelectionModelChange={newSelection => {
          setSelection(newSelection);
        }}
      />
      <IconButton><RefreshIcon onClick={() => document.location.reload()} /></IconButton>
      <div style={{ float: 'right', marginTop: 10 }}>
        <Button
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={() => openAddModalRef.current.handleOpen()}
        >
          Add
        </Button>

        <Button
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={() => handleEdit(selection, items)}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={() => handleDeleteItem(selection)}
        >
          Delete
        </Button>

      </div>
    </div>
  )
}
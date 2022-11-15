import React, {
    useState,
    forwardRef,
    useImperativeHandle
} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import api from "../../../../../../services/api";
import { warningBox } from "../../../../../components/WarningBox";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const UserEditModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        type: ''
    })

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));


    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        const data = user;
        const getId = props.selection.map((e) => e._id).toString();
        if (!user.firstName && !user.lastName && !user.type) {
            return warningBox("No changes have been made.");
        } else {
            await api.put(`/api/user/${getId}`, data);
            warningBox("User updated with success.");
            handleClose();
            setTimeout(window.location.reload.bind(window.location), 1800);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                        component="form"
                        sx={{
                            width: "35ch",
                        }}
                        spacing={3}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-required"
                            label="First Name"
                            defaultValue={props.selection.map((e) => e.firstName)}
                            onInput={(e) => setUser({ firstName: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Last Name"
                            defaultValue={props.selection.map((e) => e.lastName)}
                            onChange={(e) => setUser({ lastName: e.target.value })}
                        />
                        <Select
                            id="uncontrolled-native"
                            defaultValue={props.selection.map((e) => e.type)}
                            onChange={(e) => setUser({ type: e.target.value })}
                        >
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                            <MenuItem value={"Staff"}>Staff</MenuItem>
                            <MenuItem value={"User"}>User</MenuItem>
                        </Select>

                        <div sx={{ float: "right", marginTop: 20 }}>
                            <Button
                                variant="contained"
                                style={{ marginRight: 10 }}
                                onClick={handleUpdate}
                            >
                                Confirm
                            </Button>

                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
});
export default UserEditModal;  
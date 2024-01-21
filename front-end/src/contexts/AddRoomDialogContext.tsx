import React, {useState} from "react";

export type AddRoomDialogContextProps = {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

export const AddRoomDialogContext = React.createContext<AddRoomDialogContextProps>({
    isOpen: false,
    openDialog: () => void 0,
    closeDialog: () => void 0
});

export const AddRoomDialogContextProvider: React.FC<React.PropsWithChildren> = ({children}) => {

    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    return (
        <AddRoomDialogContext.Provider value={{isOpen: open, openDialog, closeDialog}}>
            {children}
        </AddRoomDialogContext.Provider>
    )
}

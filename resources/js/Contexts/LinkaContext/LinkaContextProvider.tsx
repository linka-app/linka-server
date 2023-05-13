import {
    Alert,
    AlertTitle,
    Box,
    Container,
    createTheme,
    CssBaseline,
    Drawer,
    LinearProgress,
    Snackbar,
    ThemeProvider,
} from "@mui/material";
import { FC, ReactNode, useMemo, useState } from "react";
import { LinkaContext } from "./LinkaContext";
import { ILinka, IToast } from "./LinkaContextProps";

export interface ContextProviderProps {
    children?: ReactNode;
}

const LinkaContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "dark",
                },
            }),
        []
    );

    const [loading, setLoading] = useState<boolean>(false);
    const [toast, setToast] = useState<IToast>({
        open: false,
        timeout: 6000,
        type: "success",
        title: "",
    });
    const [drawer, setDrawer] = useState<ILinka>({
        open: false,
        children: <></>,
    });

    //LinearProgress Functions
    const doLoading = (state: boolean) => {
        setLoading(state);
    };

    const doLoadingToggle = () => {
        setLoading(!loading);
    };

    //Drawer Functions
    const doDrawerClose = () => {
        setDrawer({ open: false, children: <></> });
    };

    const doDrawer = (drawerMessage: ILinka) => {
        setDrawer({ open: false, ...drawerMessage });
    };

    const getDrawerState = () => {
        return !!drawer.open;
    };

    //Toast Functions
    const doToast = (toastMessage: IToast) => {
        setToast({
            open: true,
            type: "success",
            timeout: 6000,
            ...toastMessage,
        });
    };

    const handleCloseToast = () => {
        setToast({ open: false, title: "" });
    };

    return (
        <LinkaContext.Provider
            value={{
                doDrawer,
                doDrawerClose,
                getDrawerState,
                doLoading,
                doLoadingToggle,
                doToast,
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {loading && (
                    <Box
                        sx={{
                            width: "100%",
                            zIndex: (theme) => theme.zIndex.drawer + 2,
                            position: "absolute",
                            top: 0,
                        }}
                    >
                        <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                        </Box>
                    </Box>
                )}
                <Snackbar
                    open={toast.open}
                    autoHideDuration={toast.timeout}
                    onClose={handleCloseToast}
                >
                    <Alert
                        variant="filled"
                        onClose={handleCloseToast}
                        severity={toast.type}
                    >
                        <AlertTitle>{toast.title}</AlertTitle>
                        {toast.description}
                    </Alert>
                </Snackbar>
                <Drawer anchor={"right"} open={drawer.open}>
                    <Box
                        sx={{ width: "100vw" }}
                        mt={"75px"}
                        role="presentation"
                    >
                        <Container fixed>{drawer.children}</Container>
                    </Box>
                </Drawer>
                {children}
            </ThemeProvider>
        </LinkaContext.Provider>
    );
};

export default LinkaContextProvider;

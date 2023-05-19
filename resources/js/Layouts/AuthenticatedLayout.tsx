import React, {PropsWithChildren, ReactNode, useEffect, useState,} from "react";
import {useContexts} from "@/Hooks/useContexts";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
} from "@mui/material";
import LinkaLogo from "@/Images/logo192.png";
import {Credits} from "@/Components/Credits";
import {LinkaContextProvider} from "@/Contexts/LinkaContext";
import {Link, router} from "@inertiajs/react";
import MenuIcon from "@mui/icons-material/Menu";
import CircularProgress from "@mui/material/CircularProgress";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


const InnerComponent: React.FC<{
    version: string;
    children: ReactNode;
}> = (props) => {
    const { doDrawer, doDrawerClose, getDrawerState } = useContexts();

    const [isDrawer, setIsDrawer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenMenu = () => {
        setIsDrawer(true);
    };
    const handleCloseMenu = () => {
        setIsDrawer(false);
    };

    useEffect(() => {
        router.on("start", (event) => {
            setIsLoading(true);
        });
        router.on("finish", (event) => {
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <Drawer
                anchor={"left"}
                open={isDrawer}
                onClick={handleCloseMenu}
                onKeyDown={handleCloseMenu}
            >
                <Box sx={{ width: 250 }} mt={"75px"} role="presentation">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href={route("dashboard")}
                            >
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"View Bookmarks"} />
                            </ListItemButton>
                        </ListItem><ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href={route("bookmark.create")}
                            >
                                <ListItemIcon>
                                    <AddCircleSharpIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Add Bookmark"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href={route("profile.edit")}
                            >
                                <ListItemIcon>
                                    <SettingsSharpIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Settings"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleOpenMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar src={LinkaLogo} alt="linka!" />
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: "flex" }}>
                        {isLoading && <CircularProgress />}
                    </Box>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Box mt={"75px"} mb={2}>
                    <Grid container>{props.children}</Grid>
                    <Stack
                        mb={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Credits version={"1.0"} />
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default function Authenticated({ children }: PropsWithChildren<{}>) {
    return (
        <LinkaContextProvider>
            <InnerComponent version={"1.00"}>{children}</InnerComponent>
        </LinkaContextProvider>
    );
}

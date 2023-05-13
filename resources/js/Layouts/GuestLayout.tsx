import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import React, { PropsWithChildren } from "react";
import { LinkaContextProvider } from "@/Contexts/LinkaContext";
import { Box, Container, Paper, Stack } from "@mui/material";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <LinkaContextProvider>
            <Container sx={{ paddingTop: 5 }} fixed>
                <Stack spacing={2} justifyContent="center" alignItems="center">
                    <Box>
                        <Link href="/">
                            <Box
                                width={100}
                                height={100}
                                color={(theme) => theme.palette.grey["500"]}
                            >
                                <ApplicationLogo />
                            </Box>
                        </Link>
                    </Box>
                    <Box mt={6}>
                        <Paper elevation={3}>
                            <Box px={6} py={4}>
                                {children}
                            </Box>
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </LinkaContextProvider>
    );
}

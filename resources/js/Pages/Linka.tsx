import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { Suspense } from "react";
import { Box, Grid, List, Stack } from "@mui/material";
import { LinkaItem } from "@/Components/LinkaItem";
import LinkaItemSkeleton from "@/Components/LinkaItem/LinkaItemSkeleton";
import { i18n, I18nLocals } from "@/i18n";
import { BookmarkItem } from "@/types";

interface PageProps {
    config: any;
    auth: any;
    links: any;
    tags: any;
}

function SearchMenu() {
    return null;
}

export default function Linka({ config, auth, links }: PageProps) {
    const translation = i18n[(config?.language as I18nLocals) || "en"];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <Stack direction={"row"} spacing={1}>
                                SEARCH HERE
                                <SearchMenu />
                            </Stack>
                        </Grid>
                        <Grid xs={12}>
                            <List sx={{ width: "100%" }}>
                                {links.length > 0 &&
                                    links.map(
                                        (
                                            val: BookmarkItem,
                                            bookmarksIndex: number
                                        ) => (
                                            <Suspense
                                                fallback={<LinkaItemSkeleton />}
                                                key={val.id + "Suspense"}
                                            >
                                                <LinkaItem
                                                    item={val}
                                                    selected={false}
                                                    showLeftAvatar={false}
                                                />
                                            </Suspense>
                                        )
                                    )}
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, router} from "@inertiajs/react";
import React, {Suspense, useCallback, useEffect, useState} from "react";
import {Box, Container, Grid, List, Stack, TextField} from "@mui/material";
import {LinkaItem} from "@/Components/LinkaItem";
import LinkaItemSkeleton from "@/Components/LinkaItem/LinkaItemSkeleton";
import {i18n, I18nLocals} from "@/i18n";
import {BookmarkItem} from "@/types";
import _ from "lodash";

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

    const [searchTerm, setSearchTerm] = useState("");

    const debounceLoadData = useCallback(_.debounce(fetchData, 300), []);

    useEffect(() => {
        debounceLoadData(searchTerm);
    }, [searchTerm]);

    function fetchData(searchTerm: string) {
        router.visit(route("dashboard"),{
            method: 'post',
            data: {
                search: searchTerm
            },
            only: ['links'],
            preserveState: true,
        });
    }


    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

                <Box sx={{ flexGrow: 1 }} pt={3}>
                    <Container fixed>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <Stack direction={"row"} spacing={1}>
                                <TextField
                                    label="Search"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    fullWidth
                                    autoComplete={"off"}
                                />
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
                    </Container>
                </Box>

        </AuthenticatedLayout>
    );
}

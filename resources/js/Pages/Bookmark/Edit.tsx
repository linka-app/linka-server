import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm, usePage} from "@inertiajs/react";
import {Button, Grid} from "@mui/material";
import React, {FormEventHandler} from "react";
import {BookmarkForm} from "@/Pages/Bookmark/Partials/BookmarkForm";

const Add: React.FC = () => {
    const bookmark = usePage().props.bookmark as any;

    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm(bookmark);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("bookmark.update", bookmark.id),{
            preserveScroll: true}
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Bookmark" />

            <Grid
                container
                spacing={2}
                component="form"
                onSubmit={submit}
            >
                <BookmarkForm data={data} setData={setData} errors={errors}  />
                <Grid xs={12} item>
                    <Button
                        variant={"contained"}
                        type={"submit"}
                        disabled={processing}
                        fullWidth
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>

        </AuthenticatedLayout>
    );
};

export default Add;

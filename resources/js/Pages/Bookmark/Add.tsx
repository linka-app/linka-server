import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import {Button, Grid} from "@mui/material";
import React, {FormEventHandler} from "react";
import {BookmarkForm} from "@/Pages/Bookmark/Partials/BookmarkForm";

const Add: React.FC = () => {

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            unread: false,
            archived: false,
            shared: false,
            title: "",
            url: "",
            tags: []
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("bookmark.store"),{
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

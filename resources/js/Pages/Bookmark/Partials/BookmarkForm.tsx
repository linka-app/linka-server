import React from "react";
import {Autocomplete, Chip, FormControlLabel, Grid, Stack, Switch, TextField,} from "@mui/material";
// @ts-ignore
import {InertiaFormProps} from "@inertiajs/react/types/useForm";
import _ from "lodash";
import {usePage} from "@inertiajs/react";
import {BookmarkFormFillButton} from "@/Pages/Bookmark/Partials/BookmarkFormFillButton";


export const BookmarkForm: React.FC<{
    errors?: InertiaFormProps['errors'];
    setData: InertiaFormProps['setData'];
    data: InertiaFormProps['data'];
}> = (props) => {
    const tags = usePage().props.tags as any;

    return (
        <>
            <Grid xs={12} item>
                <Stack direction={"row"} spacing={1}>
                    <FormControlLabel control={<Switch defaultValue={props.data.unread} onChange={(e) =>
                        props.setData("unread", e.target.checked)
                    } />} label="Unread" />
                    <FormControlLabel control={<Switch defaultValue={props.data.unread} onChange={(e) =>
                        props.setData("archived", e.target.checked)
                    } />} label="Archived" />
                    <FormControlLabel control={<Switch defaultValue={props.data.unread} onChange={(e) =>
                            props.setData("shared", e.target.checked)
                    } />} label="Shared" />
                </Stack>
            </Grid>
            <Grid xs={12} item>
                <TextField
                    error={!_.isNil(props.errors.url)}
                    label="Url"
                    defaultValue={props.data.url}
                    onChange={(e) =>
                        props.setData("url", e.target.value)
                    }
                    helperText={props.errors.url}
                    fullWidth
                    autoComplete={"off"}
                />
            </Grid>
            <BookmarkFormFillButton setData={props.setData} data={props.data} />
            <Grid xs={12} item>
                <TextField
                    error={!_.isNil(props.errors.title)}
                    label="Title"
                    defaultValue={props.data.title}
                    onChange={(e) =>
                        props.setData("title", e.target.value)
                    }
                    helperText={props.errors.title}
                    fullWidth
                    autoComplete={"off"}
                />
            </Grid>
            <Grid xs={12} item>
                <TextField
                    error={!_.isNil(props.errors.description)}
                    label="Description"
                    defaultValue={props.data.description}
                    onChange={(e) =>
                        props.setData("description", e.target.value)
                    }
                    helperText={props.errors.description}
                    fullWidth
                    multiline
                    rows={3}
                />
            </Grid>
            <Grid xs={12} item>
                <Autocomplete
                    multiple
                    value={props.data.tags}
                    onChange={(event, newValue) => {
                        props.setData("tags", newValue);
                    }}
                    options={tags}
                    filterSelectedOptions
                    freeSolo
                    renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                        />
                    )}
                />
            </Grid>
        </>
    );
}

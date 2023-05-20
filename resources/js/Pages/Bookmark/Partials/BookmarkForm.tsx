import React from "react";
import {Autocomplete, Chip, FormControlLabel, Grid, Stack, Switch, TextField,} from "@mui/material";
import _ from "lodash";
import {usePage} from "@inertiajs/react";
import {BookmarkFormFillButton} from "@/Pages/Bookmark/Partials/BookmarkFormFillButton";


export const BookmarkForm: React.FC<{
    errors?: any;
    setData: any;
    data: any;
}> = (props) => {
    const tags = usePage().props.tags as any;
    const groups = usePage().props.groups as any;

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
                    value={props.data.url}
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
                    value={props.data.title}
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
                    value={props.data.description}
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
                    value={props.data.groups}
                    onChange={(event, newValue) => {
                        props.setData("groups", newValue);
                    }}
                    options={groups}
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
                            label="Groups"
                        />
                    )}
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

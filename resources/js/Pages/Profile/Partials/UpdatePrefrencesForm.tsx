import {useForm, usePage} from "@inertiajs/react";
import React, {FormEventHandler} from "react";
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    Fade,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
} from "@mui/material";
import _ from "lodash";

export default function UpdatePrefrencesForm() {
    // @ts-ignore
    const profile = usePage().props.auth.profile as any;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            dark_mode: profile.dark_mode,
            bookmark_date_display: !_.isNil(profile.bookmark_date_display) ? profile.bookmark_date_display : 'relative',
            bookmark_link_target: !_.isNil(profile.bookmark_link_target) ? profile.bookmark_link_target : '_blank',
            bookmark_view: !_.isNil(profile.bookmark_view) ? profile.bookmark_view : 'condensed',
            language: !_.isNil(profile.language) ? profile.language : 'en',
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("user-profile.store"),{
            preserveScroll: true}
        );
    };

    return (
        <>
            <Card>
                <CardHeader
                    title="Prefrences"
                    subheader="Update your account's profile information and email address."
                />
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                        component="form"
                        onSubmit={submit}
                    >

                        <Grid xs={12} item>
                            <FormControlLabel control={<Switch defaultValue={data.dark_mode} onChange={(e) =>
                                setData("dark_mode", e.target.value == 'on')
                            } />} label="Enable Dark Mode" />
                        </Grid>
                        <Grid xs={12} item>
                            <FormControl sx={{width: "100%"}} error={!_.isNil(errors.language)}>
                                <InputLabel id="language-label">Language</InputLabel>
                                <Select
                                    labelId="language-label"
                                    value={data.language}
                                    label="Language"
                                    onChange={(e) =>
                                        setData("language", e.target.value)
                                    }
                                >
                                    <MenuItem value={'en'}>English</MenuItem>
                                    <MenuItem value={'absolute'}>Absolute</MenuItem>
                                </Select>
                                {!_.isNil(errors.language) && <FormHelperText>{errors.language}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid xs={12} item>
                            <FormControl sx={{width: "100%"}} error={!_.isNil(errors.bookmark_view)}>
                                <InputLabel id="bookmark_view-label">Bookmark View</InputLabel>
                                <Select
                                    labelId="bookmark_view-label"
                                    value={data.bookmark_view}
                                    label="Bookmark View"
                                    onChange={(e) =>
                                        setData("bookmark_view", e.target.value)
                                    }
                                >
                                    <MenuItem value={'condensed'}>Condensed</MenuItem>
                                    <MenuItem value={'expanded'}>Expanded</MenuItem>
                                </Select>
                                {!_.isNil(errors.bookmark_view) && <FormHelperText>{errors.bookmark_view}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid xs={12} item>
                            <FormControl sx={{width: "100%"}} error={!_.isNil(errors.bookmark_date_display)}>
                                <InputLabel id="bookmark_date_display-label">Date Display</InputLabel>
                                <Select
                                    labelId="bookmark_date_display-label"
                                    value={data.bookmark_date_display}
                                    label="Date Display"
                                    onChange={(e) =>
                                        setData("bookmark_date_display", e.target.value)
                                    }
                                >
                                    <MenuItem value={'relative'}>Relative</MenuItem>
                                    <MenuItem value={'absolute'}>Absolute</MenuItem>
                                    <MenuItem value={'hidden'}>Hidden</MenuItem>
                                </Select>
                                {!_.isNil(errors.bookmark_date_display) && <FormHelperText>{errors.bookmark_date_display}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid xs={12} item>
                            <FormControl sx={{width: "100%"}} error={!_.isNil(errors.bookmark_link_target)}>
                                <InputLabel id="bookmark_link_target-label">Link Target</InputLabel>
                                <Select
                                    labelId="bookmark_link_target-label"
                                    value={data.bookmark_link_target}
                                    label="Link Target"
                                    onChange={(e) =>
                                        setData("bookmark_link_target", e.target.value)
                                    }
                                >
                                    <MenuItem value={'_blank'}>_blank</MenuItem>
                                    <MenuItem value={'_self'}>_self</MenuItem>
                                </Select>
                                {!_.isNil(errors.bookmark_link_target) && <FormHelperText>{errors.bookmark_link_target}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid xs={8} item>
                            <Button
                                variant={"contained"}
                                type={"submit"}
                                disabled={processing}
                                fullWidth
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid xs={4} item>
                            <Fade in={recentlySuccessful}>
                                <Alert severity="success">Saved.</Alert>
                            </Fade>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

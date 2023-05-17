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
    const profile = usePage().props.auth.profile;
    console.log(profile);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            dark_mode: profile.dark_mode,
            bookmark_date_display: !_.isNil(profile.bookmark_date_display) ? profile.bookmark_date_display : 'relative',
            bookmark_link_target: !_.isNil(profile.bookmark_link_target) ? profile.bookmark_link_target : '_blank',
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
                                setData("dark_mode", e.target.value)
                            } />} label="Enable Dark Mode" />
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

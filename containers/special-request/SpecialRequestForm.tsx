import React, { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Grid, MenuItem, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IForm } from "utils/common";
import CardContainer from "components/Card/Container";
import TextfieldBase from "components/BaseTextField";
import { Specialrequest } from "generated/graphql";
import ReactHookFormSelect from "components/SelectBase";
import { BASIC_ENUM } from "utils/enums";
import CustomizeAutocomplete from "components/CustomizedAutocomplete";
import useSnackbar from "components/Snackbar/useSnackbar";
import useGetMajorGroup from "hooks/major-group/useGetMajorGroup";

export interface SpecialRequestMutationType {
    id?: Specialrequest["id"];
    name: Specialrequest["name"];
    status: Specialrequest["status"];
    majorgroupid: Specialrequest["majorgroupid"];
}

const TableForm: React.FC<IForm<SpecialRequestMutationType>> = (
    props: IForm<SpecialRequestMutationType>
) => {
    const { mutate } = useGetMajorGroup("");
    const showSnackbar = useSnackbar();
    const { data: defaultData, isView } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        clearErrors,
        control,
        unregister,
    } = useForm<SpecialRequestMutationType>({});

    useEffect(() => {
        setValue("id", defaultData.id);
        setValue("name", defaultData.name);
        setValue("status", defaultData.status || BASIC_ENUM.ACTIVE);
        setValue("majorgroupid", defaultData.majorgroupid);
    }, [defaultData, setValue]);

    const submitHandler: SubmitHandler<SpecialRequestMutationType> = async (
        data: SpecialRequestMutationType
    ) => {
        try {
            if (data) {
                mutate(
                    {
                        id: data.majorgroupid,
                    },
                    {
                        onSuccess(dataLc) {
                            if (dataLc.majorgroup_by_pk?.status === "INACTIVE") {
                                showSnackbar({
                                    children: "Nh??m m??n ??n n??y kh??ng ho???t ?????ng",
                                    severity: "error",
                                });
                                return;
                            }
                            props.handleClose("SAVE", data, () => {
                                clearErrors();
                                unregister();
                            });
                        },
                    }
                );
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    return (
        <Modal open={props.opened}>
            <CardContainer width="90%" maxWidth={820}>
                <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
                    <Typography variant="h6" component="h2">
                        {defaultData.id
                            ? props.isView
                                ? "Chi ti???t y??u c???u ?????c bi???t"
                                : "Ch???nh s???a y??u c???u ?????c bi???t"
                            : "T???o m???i y??u c???u ?????c bi???t"}
                    </Typography>
                </Box>
                <Grid
                    component="form"
                    onSubmit={handleSubmit(submitHandler)}
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                        },
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        gap={3}
                        display="flex"
                        sx={{
                            flexWrap: { xs: "wrap", md: "nowrap" },
                        }}
                    >
                        <TextfieldBase
                            id="name"
                            label={"T??n y??u c???u ?????c bi???t"}
                            variant="outlined"
                            InputProps={{
                                readOnly: isView,
                            }}
                            required
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name && errors.name.message}
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "T??n y??u c???u ?????c bi???t l?? b???t bu???c!",
                                },
                                onBlur: () =>
                                    setValue(
                                        "name",
                                        getValues("name")
                                            ? getValues("name").trim()
                                            : getValues("name")
                                    ),
                            })}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        gap={3}
                        display="flex"
                        sx={{
                            flexWrap: { xs: "wrap", md: "nowrap" },
                        }}
                    >
                        <ReactHookFormSelect
                            fullWidth
                            control={control}
                            label="Tr???ng th??i"
                            name="status"
                            readOnly={isView}
                        >
                            <MenuItem value={BASIC_ENUM.ACTIVE}>??ang ho???t ?????ng</MenuItem>
                            <MenuItem value={BASIC_ENUM.INACTIVE}>Ng???ng ho???t ?????ng</MenuItem>
                        </ReactHookFormSelect>
                        <CustomizeAutocomplete
                            defaultId={!!defaultData.id ? defaultData.majorgroupid : undefined}
                            conditionField=""
                            control={control}
                            rules={{
                                min: {
                                    value: 1,
                                    message: "Nh??m m??n ??n l?? b???t bu???c",
                                },
                            }}
                            readonly={isView}
                            name="majorgroupid"
                            entity="majorgroup"
                            displayField="name"
                            label={"Nh??m m??n ??n"}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column-reverse", sm: "row" },
                            justifyContent: "center",
                            mx: "auto",
                            p: 1,
                            m: 1,
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => {
                                props.handleClose("CANCEL", undefined, clearErrors);
                            }}
                        >
                            {"Tr??? v???"}
                        </Button>
                        {isView || (
                            <Button variant="contained" type="submit" autoFocus>
                                {defaultData.id ? "Ch???nh s???a" : "T???o m???i"}
                            </Button>
                        )}
                    </Box>
                </Grid>
            </CardContainer>
        </Modal>
    );
};

export default React.memo(TableForm);

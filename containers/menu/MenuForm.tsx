import React, { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Grid, MenuItem, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IForm } from "utils/common";
import CardContainer from "components/Card/Container";
import TextfieldBase from "components/BaseTextField";
import { Menu } from "generated/graphql";
import ReactHookFormSelect from "components/SelectBase";
import { BASIC_ENUM } from "utils/enums";
import CustomizeAutocomplete from "components/CustomizedAutocomplete";
import useSnackbar from "components/Snackbar/useSnackbar";
import useGetMealType from "hooks/meal-type/useGetMealType";
import SwitchBase from "components/SwitchBase";

export interface MenuMutationType {
    id?: Menu["id"];
    name: Menu["name"];
    status: Menu["status"];
    isdefault: Menu["isdefault"];
    mealtypeid: Menu["mealtypeid"];
}

const MenuForm: React.FC<IForm<MenuMutationType>> = (props: IForm<MenuMutationType>) => {
    const { mutate } = useGetMealType("");
    const showSnackbar = useSnackbar();
    const { data: defaultData, isView } = props;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        getValues,
        clearErrors,
        control,
        unregister,
    } = useForm<MenuMutationType>({});

    useEffect(() => {
        setValue("id", defaultData.id);
        setValue("name", defaultData.name);
        setValue("isdefault", defaultData.isdefault);
        setValue("status", defaultData.status || BASIC_ENUM.ACTIVE);
        setValue("mealtypeid", defaultData.mealtypeid);
    }, [defaultData, setValue]);

    const submitHandler: SubmitHandler<MenuMutationType> = async (data: MenuMutationType) => {
        try {
            if (data) {
                mutate(
                    {
                        id: data.mealtypeid,
                    },
                    {
                        async onSuccess(dataLc) {
                            if (dataLc.mealtype_by_pk?.status === "INACTIVE") {
                                showSnackbar({
                                    children: "B???a ??n n??y kh??ng ho???t ?????ng",
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
                                ? "Chi ti???t th???c ????n"
                                : "Ch???nh s???a th???c ????n"
                            : "T???o m???i th???c ????n"}
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
                            label={"T??n th???c ????n"}
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
                                    message: "T??n th???c ????n l?? b???t bu???c!",
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
                        <SwitchBase control={control} label="Th???c ????n m???c ?????nh" name="isdefault" />
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
                            defaultId={!!defaultData.id ? defaultData.mealtypeid : undefined}
                            conditionField=""
                            control={control}
                            rules={{
                                min: {
                                    value: 1,
                                    message: "B???a ??n l?? b???t bu???c",
                                },
                            }}
                            readonly={isView}
                            name="mealtypeid"
                            entity="mealtype"
                            displayField="name"
                            label={"B???a ??n"}
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
                            <Button
                                disabled={Boolean(
                                    defaultData.id && defaultData.isdefault && !watch("isdefault")
                                )}
                                variant="contained"
                                type="submit"
                                autoFocus
                            >
                                {defaultData.id ? "Ch???nh s???a" : "T???o m???i"}
                            </Button>
                        )}
                    </Box>
                </Grid>
            </CardContainer>
        </Modal>
    );
};

export default React.memo(MenuForm);

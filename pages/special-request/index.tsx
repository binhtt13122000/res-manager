import CRUDTable from "components/Table";
import { IColumn } from "components/Table/models";
import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import ChipBase from "components/Chip";
import { BASIC_ENUM } from "utils/enums";
import useSnackbar from "components/Snackbar/useSnackbar";
import SpecialRequestForm, {
    SpecialRequestMutationType,
} from "containers/special-request/SpecialRequestForm";
import useCreateSpecialRequest from "hooks/special-request/useCreateSpecialRequest";
import useUpdateSpecialRequest from "hooks/special-request/useUpdateSpecialRequest";
import useDeleteSpecialRequest from "hooks/special-request/useDeleteSpecialRequest";

const SpecialRequest: NextPage = () => {
    useEffect(() => {
        const userJson = localStorage.getItem("manager-user");
        if (!userJson) {
            window.location.replace("https://capstoneposrestaurant.tech/login");
        }
    }, []);
    const initData: SpecialRequestMutationType = {
        id: 0,
        name: "",
        status: BASIC_ENUM.ACTIVE,
        majorgroupid: 0,
    };

    const { mutate: mutateCreate } = useCreateSpecialRequest("SpReQuery");
    const { mutate: mutateUpdate } = useUpdateSpecialRequest("SpReQuery");
    const { mutate: mutateDelete } = useDeleteSpecialRequest("SpReQuery");
    const showSnackbar = useSnackbar();
    const [data, setData] = useState<SpecialRequestMutationType>(initData);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const addRowData = () => {
        setIsOpenForm(true);
        setData(initData);
    };
    const updateRowData = (rowData: SpecialRequestMutationType) => {
        const data: SpecialRequestMutationType = {
            name: rowData.name,
            id: rowData.id,
            status: rowData.status,
            majorgroupid: rowData.majorgroupid,
        };
        setIsOpenForm(true);
        setData(data);
    };
    const deleteRowData = (rowData: SpecialRequestMutationType) => {
        if (rowData.status === BASIC_ENUM.INACTIVE) {
            showSnackbar({
                children: "Y??u c???u ?????c bi???t n??y hi???n ???? ng???ng ho???t ?????ng!",
                severity: "error",
            });
        } else {
            mutateDelete(
                {
                    id: rowData.id,
                    status: BASIC_ENUM.INACTIVE,
                },
                {
                    onSuccess: () => {
                        showSnackbar({
                            children: "X??a th??nh c??ng",
                            severity: "success",
                        });
                    },
                    onError: () => {
                        showSnackbar({
                            children: "X??a th???t b???i",
                            severity: "error",
                        });
                    },
                }
            );
        }
    };

    const [isViewAction, setViewAction] = useState<boolean>(false);

    const columns: IColumn[] = [
        {
            field: "id",
            title: "STT",
            index: 1,
            type: "index",
            disableSort: true,
            disableFilter: true,
        },
        {
            field: "name",
            title: "T??n y??u c???u ?????c bi???t",
            index: 2,
            type: "string",
        },
        {
            field: "majorgroup",
            title: "Nh??m m??n ??n",
            index: 4,
            type: "object",
            subField: "name",
            subFieldType: "string",
        },
        {
            field: "majorgroupid",
            title: "",
            index: 5,
            type: "number",
            disable: true,
        },
        {
            field: "status",
            title: "Tr???ng th??i",
            index: 6,
            type: "enum",
            enumValue: [
                {
                    key: BASIC_ENUM.ACTIVE,
                    value: "??ang ho???t ?????ng",
                },
                {
                    key: BASIC_ENUM.INACTIVE,
                    value: "Kh??ng ho???t ?????ng",
                },
            ],
            render: (status: string) => {
                if (status === BASIC_ENUM.ACTIVE) {
                    return (
                        <ChipBase
                            color={"success"}
                            label={"??ang ho???t ?????ng"}
                            size="small"
                            sx={{
                                fontSize: 14,
                                minWidth: "150px",
                            }}
                        />
                    );
                }
                return (
                    <ChipBase
                        color={"error"}
                        label={"Kh??ng ho???t ?????ng"}
                        size="small"
                        sx={{
                            fontSize: 14,
                            minWidth: "150px",
                        }}
                    />
                );
            },
        },
    ];

    const handleClose = useCallback(
        (type: "SAVE" | "CANCEL", data?: SpecialRequestMutationType, clearErrors?: Function) => {
            if (type === "SAVE") {
                if (data) {
                    if (!data.id) {
                        data.id = undefined;
                        mutateCreate(
                            {
                                object: {
                                    majorgroupid: data.majorgroupid,
                                    name: data.name,
                                    status: BASIC_ENUM.ACTIVE,
                                },
                            },
                            {
                                onSuccess: () => {
                                    showSnackbar({
                                        children: "Th??m m???i th??nh c??ng",
                                        severity: "success",
                                    });
                                },
                                onError: () => {
                                    showSnackbar({
                                        children: "Th??m m???i th???t b???i",
                                        severity: "error",
                                    });
                                },
                            }
                        );
                    } else {
                        mutateUpdate(
                            {
                                id: data.id,
                                _set: {
                                    majorgroupid: data.majorgroupid,
                                    name: data.name,
                                    status: data.status,
                                },
                            },
                            {
                                onSuccess: () => {
                                    showSnackbar({
                                        children: "Ch???nh s???a th??nh c??ng",
                                        severity: "success",
                                    });
                                },
                                onError: () => {
                                    showSnackbar({
                                        children: "Ch???nh s???a th???t b???i",
                                        severity: "error",
                                    });
                                },
                            }
                        );
                    }
                }
            }
            if (clearErrors) {
                clearErrors();
            }
            resetData();
            setViewAction(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const viewRowData = (rowData: SpecialRequestMutationType) => {
        const data: SpecialRequestMutationType = {
            name: rowData.name,
            status: rowData.status,
            id: rowData.id,
            majorgroupid: rowData.majorgroupid,
        };
        setIsOpenForm(true);
        setData(data);
        setViewAction(true);
    };

    const resetData = () => {
        setData(initData);
        setIsOpenForm(false);
    };

    return (
        <>
            <SpecialRequestForm
                opened={isOpenForm}
                isView={isViewAction}
                data={data}
                handleClose={handleClose}
            />
            <CRUDTable
                queryKey="SpReQuery"
                columns={columns}
                title={"Qu???n l?? y??u c???u ?????c bi???t"}
                entity="specialrequest"
                firstOrderField="id"
                sort
                enableFilter
                maxWidth="100%"
                action={{
                    onView: (rowData: SpecialRequestMutationType) => viewRowData(rowData),
                    onAdd: () => addRowData(),
                    onEdit: (rowData: SpecialRequestMutationType) => updateRowData(rowData),
                    onDeleteRecord: (rowData: SpecialRequestMutationType) => deleteRowData(rowData),
                }}
            />
        </>
    );
};

export default SpecialRequest;

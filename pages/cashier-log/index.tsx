import CRUDTable from "components/Table";
import { IColumn } from "components/Table/models";
import { NextPage } from "next";
import React, { useEffect } from "react";
import ChipBase from "components/Chip";
import router from "next/router";
import CellTableTypography from "components/CellTableTypography";

const CashierLog: NextPage = () => {
    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (!userJson) {
            router.push("/login");
        }
    }, []);

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
            field: "creationtime",
            title: "Thời gian tạo",
            index: 2,
            type: "timestamp",
        },
        {
            field: "account",
            title: "Tài khoản",
            index: 3,
            type: "object",
            subField: "fullname",
            subFieldType: "string",
        },
        {
            field: "shift",
            title: "Ca làm việc",
            index: 4,
            type: "object",
            subField: "name",
            subFieldType: "string",
        },
        {
            field: "amount",
            title: "Tổng",
            index: 5,
            type: "number",
            render: (data: number) => {
                return (
                    <CellTableTypography>
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(data)}
                    </CellTableTypography>
                );
            },
        },
        {
            field: "type",
            title: "Loại",
            index: 6,
            type: "enum",
            enumValue: [
                {
                    key: "OPEN",
                    value: "Mở",
                },
                {
                    key: "CLOSED",
                    value: "Đóng",
                },
            ],
            render: (status: string) => {
                if (status === "OPEN") {
                    return (
                        <ChipBase
                            color={"success"}
                            label={"Mở"}
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
                        label={"Đóng"}
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

    return (
        <>
            <CRUDTable
                queryKey="CashierQuery"
                columns={columns}
                title={"Nhật ký thu ngân"}
                entity="cashierlog"
                firstOrderField="id"
                sort
                enableFilter
                maxWidth="100%"
            />
        </>
    );
};

export default CashierLog;

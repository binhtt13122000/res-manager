import { Box, Card, Container, Grid, Typography } from "@mui/material";
import TextfieldBase from "components/BaseTextField";
import CellTableTypography from "components/CellTableTypography";
import ChipBase from "components/Chip";
import CRUDTable from "components/Table";
import { IColumn } from "components/Table/models";
import { format } from "date-fns";
import { Checkdetail, GetCheckDetailQuery } from "generated/graphql";
import useGetCheck from "hooks/check/useGetCheck";
import useGetCheckDetail from "hooks/check/useGetCheckDetail";
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { CHECK_DETAIL_ENUM } from "utils/enums";
import CheckDetailForm from "containers/check-detail/CheckDetailForm";

const CheckDetail: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading } = useGetCheck(Number(id || 0));
    const { mutate } = useGetCheckDetail();
    const [databyId, setData] = useState<GetCheckDetailQuery["checkdetail_by_pk"]>(null);
    const [open, setOpen] = useState(false);
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
            field: "item",
            title: "Tên món ăn",
            index: 2,
            type: "object",
            subField: "name",
            subFieldType: "string",
        },
        {
            field: "itemprice",
            title: "Giá món ăn",
            index: 3,
            type: "number",
            disable: true,
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
            field: "quantity",
            title: "Số lượng",
            index: 4,
            type: "number",
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
            field: "status",
            title: "Trạng thái",
            index: 6,
            type: "enum",
            enumValue: [
                {
                    key: CHECK_DETAIL_ENUM.READY,
                    value: "Sẵn sàng",
                },
                {
                    key: CHECK_DETAIL_ENUM.RECALL,
                    value: "Gọi lại",
                },
                {
                    key: CHECK_DETAIL_ENUM.SERVED,
                    value: "Đã phục vụ",
                },
                {
                    key: CHECK_DETAIL_ENUM.VOID,
                    value: "void",
                },
                {
                    key: CHECK_DETAIL_ENUM.WAITING,
                    value: "Đang chờ",
                },
            ],
            render: (status: string) => {
                if (status === CHECK_DETAIL_ENUM.READY) {
                    return (
                        <ChipBase
                            color={"success"}
                            label={"Sẵn sàng"}
                            size="small"
                            sx={{
                                fontSize: 14,
                                minWidth: "150px",
                            }}
                        />
                    );
                }
                if (status === CHECK_DETAIL_ENUM.RECALL) {
                    return (
                        <ChipBase
                            color={"secondary"}
                            label={"Gọi lại"}
                            size="small"
                            sx={{
                                fontSize: 14,
                                minWidth: "150px",
                            }}
                        />
                    );
                }
                if (status === CHECK_DETAIL_ENUM.SERVED) {
                    return (
                        <ChipBase
                            color={"info"}
                            label={"Đã phục vụ"}
                            size="small"
                            sx={{
                                fontSize: 14,
                                minWidth: "150px",
                            }}
                        />
                    );
                }
                if (status === CHECK_DETAIL_ENUM.WAITING) {
                    return (
                        <ChipBase
                            color={"warning"}
                            label={"Đang chờ"}
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
                        label={"void"}
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

    if (isLoading) {
        return <div>loading</div>;
    }
    if (!data?.check_by_pk) {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h3">Đơn hàng này không tồn tại!</Typography>
            </Box>
        );
    }
    return (
        <Container maxWidth="lg">
            <CheckDetailForm data={databyId} opened={open} handleClose={() => setOpen(false)} />
            <Card
                style={{
                    marginBottom: "30px",
                }}
            >
                <Grid
                    container
                    spacing={2}
                    padding={2}
                    sx={{
                        "& > :not(style)": {
                            m: 1,
                            display: "flex",
                        },
                        width: "100%",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        display="flex"
                        position="relative"
                        sx={{
                            justifyContent: { xs: "space-between", lg: "center" },
                        }}
                    >
                        <Typography
                            display="block"
                            color="textPrimary"
                            gutterBottom
                            textAlign="center"
                            variant="h5"
                            sx={{ fontWeight: "bold" }}
                        >
                            {"Đơn hàng mã " + data?.check_by_pk?.checkno}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="600" component="h6">
                                Thông tin chi tiết
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        gap={3}
                        display="flex"
                        sx={{
                            flexWrap: { xs: "wrap", lg: "nowrap" },
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
                                id="shift"
                                label={"Ca làm việc"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.shift?.name}
                            />
                            <TextfieldBase
                                id="account"
                                label={"Tài khoản"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.account?.fullname}
                            />
                            <TextfieldBase
                                id="table"
                                label={"Bàn ăn"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.table?.name}
                            />
                            <TextfieldBase
                                id="loation"
                                label={"Khu vực"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.table?.location?.name}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        gap={3}
                        display="flex"
                        sx={{
                            flexWrap: { xs: "wrap", lg: "nowrap" },
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
                                id="checkno"
                                label={"Mã đơn hàng"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.checkno}
                            />
                            <TextfieldBase
                                id="guestNo"
                                label={"Tên khách hàng"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.guestname}
                            />
                            <TextfieldBase
                                id="cover"
                                label={"Cover"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.cover}
                            />
                            <TextfieldBase
                                id="subtotal"
                                label={"Sub Total"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(data?.check_by_pk?.subtotal)}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        gap={3}
                        display="flex"
                        sx={{
                            flexWrap: { xs: "wrap", lg: "nowrap" },
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
                                id="totaltax"
                                label={"Thuế"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={`${data?.check_by_pk?.totaltax / 100}%`}
                            />
                            <TextfieldBase
                                id="totalamount"
                                label={"Tổng hóa đơn"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(data?.check_by_pk?.totalamount)}
                            />
                            <TextfieldBase
                                id="status"
                                label={"Trạng thái"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.status}
                            />
                            <TextfieldBase
                                id="creationtime"
                                label={"Thời gian tạo"}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={format(
                                    new Date(data?.check_by_pk?.creationtime) || new Date(),
                                    "dd/MM/yyyy HH:mm:ss"
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        gap={3}
                        display="flex"
                        sx={{
                            flexWrap: { xs: "wrap", lg: "nowrap" },
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
                                id="note"
                                label={"Ghi chú"}
                                variant="outlined"
                                multiline
                                minRows={3}
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                value={data?.check_by_pk?.totaltax}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <CRUDTable
                                queryKey="CheckDetailQuery"
                                columns={columns}
                                title={"Món ăn trong đơn hàng"}
                                entity="checkdetail"
                                firstOrderField="id"
                                sort
                                enableFilter
                                maxWidth="100%"
                                action={{
                                    onView: (rowData: Checkdetail) => {
                                        mutate(
                                            {
                                                id: rowData.id || 0,
                                            },
                                            {
                                                onSuccess(data) {
                                                    setData(data.checkdetail_by_pk);
                                                    setOpen(true);
                                                },
                                            }
                                        );
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default CheckDetail;

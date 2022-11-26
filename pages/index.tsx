import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { CalendarToday as CalendarTodayIcon } from "@mui/icons-material";
import useGetBillByTime from "hooks/dashboard/useGetBillByTime";
import useGetBillByTimeWithRefund from "hooks/dashboard/useGetBillByTimeWithRefund";
import useGetBillByTimeWithClose from "hooks/dashboard/useGetBillByTimeWithClose";
import { LineChartYear } from "containers/chart/LineChartYear";
import DonutChart from "containers/chart/DonutChart";
import useGetBillMoneyByTimeWithRefund from "hooks/dashboard/useGetBillMoneyByTimeWithRefund";
import useGetCoverByTime from "hooks/dashboard/useGetCoverByTime";
import { LineChartMonth } from "containers/chart/LineChartMonth";
import { LineChartDay } from "containers/chart/LineChartDay";
import BarChartWithProduct from "containers/chart/BarChartWithProduct";
import BarChartWithAmount from "containers/chart/BarChartWithAmount";

const Home: NextPage = () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const day = new Date().getDate();
    const { data: totalBill } = useGetBillByTime(`${year}/${month}/01`, `${year}/${month}/${day}`);
    const { data: totalBillWithClose } = useGetBillByTimeWithClose(
        `${year}/${month}/01`,
        `${year}/${month}/${day}`
    );
    const { data: totalBillWithRefund } = useGetBillByTimeWithRefund(
        `${year}/${month}/01`,
        `${year}/${month}/${day}`
    );
    const { data: totalBillMoneyWithRefund } = useGetBillMoneyByTimeWithRefund(
        `${year}/${month}/01`,
        `${year}/${month}/${day}`
    );
    const { data: dataCover } = useGetCoverByTime(`${year}/${month}/01`, `${year}/${month}/${day}`);
    const [type, setType] = useState<"MONTH" | "DAY" | "YEAR">("DAY");
    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (!userJson) {
            router.push("/login");
        }
    }, []);
    return (
        <Box p={1}>
            <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="stretch"
                marginY={2}
                marginX={4}
            >
                <Box
                    sx={{
                        flexShrink: 0,
                        flexGrow: 1,
                        flexBasis: { lg: "25%", md: "50%", xs: "100%" },
                        paddingRight: { md: 5, xs: 0 },
                        cursor: "pointer",
                    }}
                    onClick={() => {}}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderLeft: ".25rem solid #4e73df",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            boxShadow: 6,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                rowGap: 1,
                            }}
                        >
                            <Typography
                                component="h2"
                                fontSize="18px"
                                fontWeight="700"
                                lineHeight="14px"
                                textTransform="uppercase"
                                color="#4e73df"
                                noWrap
                                pb={2}
                            >
                                {"Doanh thu"}
                            </Typography>
                            <Typography
                                component="h5"
                                fontSize="28px"
                                fontWeight="600"
                                lineHeight="24px"
                                color="#5a5c69"
                            >
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(
                                    totalBill?.bill_aggregate?.aggregate?.sum?.totalamount || 0
                                )}
                            </Typography>
                        </Box>
                        <CalendarTodayIcon
                            fontSize="large"
                            style={{
                                fontWeight: "900",
                                lineHeight: "32px",
                                color: "#dddfeb",
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexShrink: 0,
                        flexGrow: 1,
                        flexBasis: { lg: "25%", md: "50%", xs: "100%" },
                        paddingRight: { md: 5, xs: 0 },
                        cursor: "pointer",
                    }}
                    onClick={() => {}}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderLeft: ".25rem solid #4e73df",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            boxShadow: 6,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                rowGap: 1,
                            }}
                        >
                            <Typography
                                component="h2"
                                fontSize="18px"
                                fontWeight="700"
                                lineHeight="14px"
                                textTransform="uppercase"
                                color="#4e73df"
                                noWrap
                                pb={2}
                            >
                                {"Tổng tiền hoàn trả"}
                            </Typography>
                            <Typography
                                component="h5"
                                fontSize="28px"
                                fontWeight="600"
                                lineHeight="24px"
                                color="#5a5c69"
                            >
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(
                                    Math.abs(
                                        totalBillMoneyWithRefund?.bill_aggregate?.aggregate?.sum
                                            ?.totalamount || 0
                                    )
                                )}
                            </Typography>
                        </Box>
                        <CalendarTodayIcon
                            fontSize="large"
                            style={{
                                fontWeight: "900",
                                lineHeight: "32px",
                                color: "#dddfeb",
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexShrink: 0,
                        flexGrow: 1,
                        flexBasis: { lg: "25%", md: "50%", xs: "100%" },
                        paddingRight: { md: 5, xs: 0 },
                        cursor: "pointer",
                    }}
                    onClick={() => {}}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderLeft: ".25rem solid #4e73df",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            boxShadow: 6,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                rowGap: 1,
                            }}
                        >
                            <Typography
                                component="h2"
                                fontSize="18px"
                                fontWeight="700"
                                lineHeight="14px"
                                textTransform="uppercase"
                                color="#4e73df"
                                noWrap
                                pb={2}
                            >
                                {"Tổng hóa đơn đóng"}
                            </Typography>
                            <Typography
                                component="h5"
                                fontSize="28px"
                                fontWeight="600"
                                lineHeight="24px"
                                color="#5a5c69"
                            >
                                {totalBillWithClose?.bill_aggregate?.aggregate?.count || 0}
                            </Typography>
                        </Box>
                        <CalendarTodayIcon
                            fontSize="large"
                            style={{
                                fontWeight: "900",
                                lineHeight: "32px",
                                color: "#dddfeb",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="stretch"
                marginY={2}
                marginX={4}
            >
                <Box
                    sx={{
                        flexShrink: 0,
                        flexGrow: 1,
                        flexBasis: { lg: "25%", md: "50%", xs: "100%" },
                        paddingRight: { md: 5, xs: 0 },
                        cursor: "pointer",
                    }}
                    onClick={() => {}}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderLeft: ".25rem solid #4e73df",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            boxShadow: 6,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                rowGap: 1,
                            }}
                        >
                            <Typography
                                component="h2"
                                fontSize="18px"
                                fontWeight="700"
                                lineHeight="14px"
                                textTransform="uppercase"
                                color="#4e73df"
                                noWrap
                                pb={2}
                            >
                                {"Tổng hóa đơn trả"}
                            </Typography>
                            <Typography
                                component="h5"
                                fontSize="28px"
                                fontWeight="600"
                                lineHeight="24px"
                                color="#5a5c69"
                            >
                                {totalBillWithRefund?.bill_aggregate?.aggregate?.count || 0}
                            </Typography>
                        </Box>
                        <CalendarTodayIcon
                            fontSize="large"
                            style={{
                                fontWeight: "900",
                                lineHeight: "32px",
                                color: "#dddfeb",
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexShrink: 0,
                        flexGrow: 1,
                        flexBasis: { lg: "25%", md: "50%", xs: "100%" },
                        paddingRight: { md: 5, xs: 0 },
                        cursor: "pointer",
                    }}
                    onClick={() => {}}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderLeft: ".25rem solid #4e73df",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            boxShadow: 6,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                rowGap: 1,
                            }}
                        >
                            <Typography
                                component="h2"
                                fontSize="18px"
                                fontWeight="700"
                                lineHeight="14px"
                                textTransform="uppercase"
                                color="#4e73df"
                                noWrap
                                pb={2}
                            >
                                {"Tổng số khách mới"}
                            </Typography>
                            <Typography
                                component="h5"
                                fontSize="28px"
                                fontWeight="600"
                                lineHeight="24px"
                                color="#5a5c69"
                            >
                                {dataCover?.check_aggregate?.aggregate?.sum?.cover || 0}
                            </Typography>
                        </Box>
                        <CalendarTodayIcon
                            fontSize="large"
                            style={{
                                fontWeight: "900",
                                lineHeight: "32px",
                                color: "#dddfeb",
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        flexShrink: 0,
                        flexGrow: 1,
                        flexBasis: { lg: "25%", md: "50%", xs: "100%" },
                        paddingRight: { md: 5, xs: 0 },
                        cursor: "pointer",
                    }}
                    onClick={() => {}}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderLeft: ".25rem solid #4e73df",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            boxShadow: 6,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                rowGap: 1,
                            }}
                        >
                            <Typography
                                component="h2"
                                fontSize="18px"
                                fontWeight="700"
                                lineHeight="14px"
                                textTransform="uppercase"
                                color="#4e73df"
                                noWrap
                                pb={2}
                            >
                                {"Thời gian trung bình"}
                            </Typography>
                            <Typography
                                component="h5"
                                fontSize="28px"
                                fontWeight="600"
                                lineHeight="24px"
                                color="#5a5c69"
                            >
                                {"12 phút"}
                            </Typography>
                        </Box>
                        <CalendarTodayIcon
                            fontSize="large"
                            style={{
                                fontWeight: "900",
                                lineHeight: "32px",
                                color: "#dddfeb",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // flexWrap: "true",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ width: "90%" }}>
                    <ButtonGroup
                        sx={{ float: "right" }}
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={() => setType("DAY")}>Ngày</Button>
                        <Button onClick={() => setType("MONTH")}>Tháng</Button>
                        <Button onClick={() => setType("YEAR")}>Năm</Button>
                    </ButtonGroup>
                    {type === "YEAR" ? (
                        <LineChartYear />
                    ) : type === "MONTH" ? (
                        <LineChartMonth />
                    ) : type === "DAY" ? (
                        <LineChartDay />
                    ) : null}
                </Box>
                <Box sx={{ height: 5 }}></Box>
                <Box sx={{ width: "90%", minHeight: 500 }}>
                    <DonutChart />
                </Box>
                <Box sx={{ height: 5 }}></Box>
                <Box sx={{ width: "90%", minHeight: 500 }}>
                    <BarChartWithProduct />
                </Box>
                <Box sx={{ height: 5 }}></Box>
                <Box sx={{ width: "90%", minHeight: 500 }}>
                    <BarChartWithAmount />
                </Box>
                {/* <Grid item md={5} xs={12}>
                </Grid>
                <Grid item md={5} xs={12}>
                    <BarChart />
                </Grid>
                <Grid item md={5} xs={12}>
                    <BarChart />
                </Grid> */}
            </Box>
        </Box>
    );
};

export default Home;

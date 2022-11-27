import { ROUTES } from "utils/routes";

export const routes = [
    {
        id: 1,
        name: "Bảng thống kê",
        path: ROUTES.DEFAULT,
        icon: "/images/dashboard.png",
    },
    {
        id: 2,
        name: "Quản lý menu",
        icon: "/images/management.png",
        children: [
            {
                id: 2.1,
                name: "Quản lý thực đơn",
                path: ROUTES.MENU,
                icon: "/images/select.png",
            },
            {
                id: 2.2,
                name: "Quản lý mục thực đơn",
                path: ROUTES.MENU_ITEM,
                icon: "/images/select.png",
            },
            {
                id: 2.3,
                name: "Quản lý món ăn",
                path: ROUTES.ITEM,
                icon: "/images/select.png",
            },
            {
                id: 2.4,
                name: "Quản lý nhóm món ăn",
                path: ROUTES.MAJOR_GROUP,
                icon: "/images/select.png",
            },
            {
                id: 2.5,
                name: "Quản lý yêu cầu đặc biệt",
                path: ROUTES.SPECIAL_REQUEST,
                icon: "/images/select.png",
            },
        ],
    },
    {
        id: 3,
        name: "Quản lý đơn hàng",
        path: ROUTES.CHECK,
        icon: "/images/price-list.png",
    },
    {
        id: 4,
        name: "Quản lý hóa đơn",
        path: ROUTES.BILL,
        icon: "/images/price-list.png",
    },
    {
        id: 5,
        name: "Quản lý bữa ăn",
        icon: "/images/sun.png",
        path: ROUTES.MEAL_TYPE,
    },
    {
        id: 6,
        name: "Nhật ký thu ngân",
        icon: "/images/blog.png",
        path: ROUTES.CASHIER_LOG,
    },
];

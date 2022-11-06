import { ROUTES } from "utils/routes";

export const routes = [
    {
        id: 1,
        name: "Quản lý check",
        path: ROUTES.DEFAULT,
        icon: "/images/account.png",
    },
    {
        id: 2,
        name: "Quản lý menu",
        icon: "/images/management.png",
        children: [
            {
                id: 2.1,
                name: "Quản lý menu",
                path: ROUTES.DEFAULT,
                icon: "/images/combo.png",
            },
            {
                id: 2.2,
                name: "Quản lý menu item",
                path: ROUTES.DEFAULT,
                icon: "/images/combo.png",
            },
            {
                id: 2.3,
                name: "Quản lý item",
                path: ROUTES.DEFAULT,
                icon: "/images/combo.png",
            },
            {
                id: 2.4,
                name: "Quản lý major group",
                path: ROUTES.DEFAULT,
                icon: "/images/combo.png",
            },
            {
                id: 2.5,
                name: "Quản lý yêu cầu đặc biệt",
                path: ROUTES.DEFAULT,
                icon: "/images/combo.png",
            },
        ],
    },
    {
        id: 3,
        name: "Quản lý hóa đơn",
        path: ROUTES.DEFAULT,
        icon: "/images/price-list.png",
    },
    {
        id: 4,
        name: "Cấu hình meal type",
        icon: "/images/employees.png",
        path: ROUTES.DEFAULT,
    },
];

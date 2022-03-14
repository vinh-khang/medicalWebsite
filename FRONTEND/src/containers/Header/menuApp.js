export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.admin.crud-user', link: '/system/crud-user',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/manage-admin'
            },
        ]
    },

    { //Phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },

    { //Chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },

        ]
    },

    { //hệ thống
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },

        ]
    },
];
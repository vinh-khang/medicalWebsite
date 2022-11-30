export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.booking',
        menus: [
            {
                name: 'menu.admin.booking-management', link: '/system/booking-info'
            },

        ]
    },
    { //hệ thống
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.admin.user-management', link: '/system/user-management',
            },
        ]
    },
    { //hệ thống
        name: 'menu.admin.doctor',
        menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/doctor-management',
            },
            {
                name: 'doctor-manage.manage-schedule', link: '/system/doctor-schedule-management',
            },


        ]
    },


    { //Phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.clinic-post-management', link: '/system/clinic-post-management'
            },
        ]
    },

    { //Chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
            {
                name: 'menu.admin.show-specialty', link: '/system/show-specialty'
            },

        ]
    }

];

export const doctorMenu = [
    { //hệ thống
        name: 'menu.admin.booking',
        menus: [
            {
                name: 'menu.admin.booking-management', link: '/system/booking-info'
            },

        ]
    },
    { //TKB
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/system/doctor-schedule-management',
            },
        ]
    },
];
import React from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import DnsIcon from '@mui/icons-material/Dns';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
export const Sidebardata = [
    {
        title: "Order",
        icon: <ArticleIcon />,
        link: "/order"
    },
    {
        title: "Profile",
        icon: <PersonIcon />,
        link: "/getprofile"
    },
    {
        title: "Address",
        icon: <DnsIcon />,
        link: "/addaddress"
    },
    {
        title: "Change Password",
        icon: <KeyboardTabIcon />,
        link: "/changepassword"
    }
]



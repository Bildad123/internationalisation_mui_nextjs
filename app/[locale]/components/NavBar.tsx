"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getInitials } from "./utils";
import LocaleSwitcher from "./LocaleSwitcher";
import { Box, Breadcrumbs, Button, Skeleton } from "@mui/material";

import {
  AppBar,
  Toolbar,
  IconButton,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import HomeIcon from "@mui/icons-material/Home";
import { Link as MuiLink } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PersonIcon from "@mui/icons-material/Person";

import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

import { useColorMode } from "./ColorModeProvider";
import { useRouter } from "next/navigation";

interface Link {
  label: string;
  href: string;
  startLink: string;
}
interface Translations {
  links: Link[];
  action: string;
  logout: string;
}

const NavBar = ({ translations }: { translations: Translations }) => {
  const { links, action, logout } = translations;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentPath = usePathname();
  const theme = useTheme();
  const colorMode = useColorMode();
  const router = useRouter();
  const { status, data: session } = useSession();

  if (status === "unauthenticated") {
    return (
      <Box
        width={"100vw"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={3}
      >
        <Link href="/api/auth/signin">
          <Button variant="contained"> {action}</Button>
        </Link>
      </Box>
    );
  }

  return (
    <nav className="w-full bg-gray-100 shadow sticky top-0 z-50">
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar
            variant="dense"
            sx={{
              bgcolor: "background.paper",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Breadcrumbs aria-label="breadcrumb">
                {links.map((link) => (
                  <MuiLink
                    underline={
                      link.href === currentPath ||
                      currentPath.includes(link.startLink)
                        ? "always"
                        : "none"
                    }
                    key={link.href}
                    href={link.href}
                    component={Link}
                    color="inherit"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {link.label.toLocaleLowerCase() === "thesis" ||
                    link.label.toLocaleLowerCase() === "thesen" ? (
                      <NoteAltIcon sx={{ mr: 0.5 }} />
                    ) : link.label.toLocaleLowerCase() === "students" ||
                      link.label.toLocaleLowerCase() === "studierende" ? (
                      <PersonIcon sx={{ mr: 0.5 }} />
                    ) : (
                      <HomeIcon sx={{ mr: 0.5 }} />
                    )}

                    {link.label}
                  </MuiLink>
                ))}
              </Breadcrumbs>
            </Box>

            <Box>
              <LocaleSwitcher />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {" "}
                    {getInitials(session?.user?.name)}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* Profile Menu Item */}
              <MenuItem onClick={handleClose}>
                <Avatar />
                {session?.user?.name}
              </MenuItem>

              <Divider />

              <MenuItem onClick={colorMode?.toggleColorMode}>
                <ListItemIcon>
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon fontSize="small" />
                  ) : (
                    <Brightness4Icon fontSize="small" />
                  )}
                </ListItemIcon>
                Color Mode
              </MenuItem>

              {/* Logout Menu Item */}
              <MuiLink
                href="/api/auth/signout"
                component={Link}
                underline="none"
                color="inherit"
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </MuiLink>
            </Menu>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </ThemeProvider>

      <Box>{status === "loading" ? <Skeleton width="9rem" /> : <></>}</Box>
    </nav>
  );
};

export default NavBar;

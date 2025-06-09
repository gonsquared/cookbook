import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import SearchInput from "./SearchInput";

type LayoutProps = {
    children: React.ReactNode
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            alignSelf: "flex-end"
          }}
        >
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          my: 0,
          mx: "auto"
        }}
      >
        {children}
      </Container>
    </>
  )
}

export default Layout;

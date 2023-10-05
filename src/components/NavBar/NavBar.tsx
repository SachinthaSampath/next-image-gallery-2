"use client";
import React from "react";
import { Container } from "@/components/bootstrap";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  //get current pathname
  const pathname = usePathname();
  //get search params
  const searchParams = useSearchParams();

  console.log("pathname - ", pathname);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          NextJS 13 Image Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/hello" active={pathname === "/hello"}>
              Hello
            </Nav.Link>
            <Nav.Link as={Link} href="/static" active={pathname === "/static"}>
              Static
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/dynamic"
              active={pathname === "/dynamic"}
            >
              Dynamic
            </Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathname === "/isr"}>
              ISR
            </Nav.Link>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item as={Link} href="/topics/health">Health</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/coding">Coding</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/fitness">Fitness</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/search" active={pathname === "/search"}>
              Search
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

//stop at - 2.00 h
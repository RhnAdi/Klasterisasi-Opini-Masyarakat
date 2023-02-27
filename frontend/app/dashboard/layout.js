"use client";

import Container from "../../components/container";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import "../../styles/globals.css";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Container>
        {children}
        <Footer />
      </Container>
    </>
  );
}

import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Counseling from "./components/Counseling";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Introduction />
      <Gallery />
      <Events />

      <Counseling />
      <ContactForm />
      <Contact />
    </>
  );
}

export default App;

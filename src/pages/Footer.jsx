import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Link to={"/donate"}>Donate</Link>
      <Link to={"/aboutUs"}>About Us</Link>
    </>
  );
}

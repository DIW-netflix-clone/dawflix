import { GoDash } from "react-icons/go";
import { Link } from "react-router";

const GenerosCard = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        fontSize: "2.2rem",
        paddingTop: "4rem",
      }}
    >
      <Link to="/generos/" style={{ fontWeight: "bold" }}>
        ACTION
      </Link>
      <div>
        <GoDash />
        <GoDash />
        <GoDash />
      </div>
      <Link to="/generos/" style={{ fontWeight: "bold" }}>
        TERROR
      </Link>
      <div>
        <GoDash />
        <GoDash />
        <GoDash />
      </div>
      <Link to="/generos/" style={{ fontWeight: "bold" }}>
        HSTORY
      </Link>
    </div>
  );
};

export default GenerosCard;

import { UserButton } from "@clerk/clerk-react";

export default function Topbar() {

  return (
    <div
      style={{
        height: "60px",
        borderBottom: "1px solid #1e293b",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 20px",
        background: "#020617"
      }}
    >

      <UserButton afterSignOutUrl="/" />

    </div>
  );
}
"use server";

import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { meQuery } from "@/apis/auth";

const Admin = async () => {
  const session = await getServerSession(authConfig);
  console.log("☠️ ~ Admin ~ session:", session);

  return (
    <div>
      <div>
        <h1>Admin Page</h1>
        <p>Welcome {session?.user?.email}</p>
        <p>{JSON.stringify(session, null, 2)}</p>
      </div>
    </div>
  );
};

export default Admin;

"use server";

import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "../api/auth/[...nextauth]/authConfig";

const Admin = async () => {
  const session = await getServerSession(authConfig);

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

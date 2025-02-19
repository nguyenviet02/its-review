'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

const Staff = () => {
  const session = useSession();
  console.log('☠️ ~ Staff ~ session:', session);
  return <div>Staff</div>;
};

export default Staff;

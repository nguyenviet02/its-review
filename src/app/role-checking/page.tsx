'use client';

import { ROLES } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const CheckRole = () => {
  const router = useRouter();
  const role = ROLES.SUPER_ADMIN;

  useEffect(() => {
    if (role === ROLES.SUPER_ADMIN) {
      router.push('/super-admin');
      return;
    }
    if (role === ROLES.ADMIN) {
      router.push('/admin');
      return;
    }
    if (role === ROLES.STAFF) {
      router.push('/staff');
      return;
    }
  }, [role, router]);
  return <div>Checking Role</div>;
};

export default CheckRole;

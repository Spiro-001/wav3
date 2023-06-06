"use client";

import SignUpForm from "@components/Forms/SignUpForm";
import getOAuthVerify from "@utils/fetch/get/verify/getOAuthVerify";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const verify = () => {
  const [loadProfile, setLoadProfile] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) getOAuthVerify(router, session);
  }, [session]);

  return (
    <div className="main border-2 border-black w-full h-full flex flex-row flex-wrap items-center justify-center gap-x-12">
      {loadProfile && <SignUpForm link={true} email={loadProfile.email} />}
    </div>
  );
};

export default verify;

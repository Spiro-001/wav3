"use client";

import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [providers, setProviders] = useState();

  console.log(session);

  useEffect(() => {
    if (session === null) setMounted(true);
    else if (session?.user) router.push("/feed");
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, [session]);

  const handleLoginAccountButton = () => {
    router.push("/signin");
  };

  const handleCreateAccountButton = () => {
    router.push("/signup");
  };

  return (
    <>
      {mounted ? (
        <div className="main border-2 border-black w-full h-full flex flex-row flex-wrap items-center justify-center gap-x-12 font-notosans">
          <div className="bg-black h-2/6 border-2 border-white flex items-center px-8">
            <span className="text-9xl">
              wav3
              <button
                className="button text-lg font-bold"
                onClick={handleLoginAccountButton}
              >
                Login
              </button>
            </span>
          </div>
          <div className="bg-black flex flex-col border-2 border-white h-2/6 w-fit py-6 px-6">
            <span className="text-4xl">New to wav3?</span>
            <span className="text-lg text-gray-50">
              Sign up now to connect with other musicians!
            </span>
            <div className="flex flex-col gap-y-4 p-12">
              {providers &&
                Object.keys(providers).map((provider) => {
                  if (provider === "credentials") return null;
                  return (
                    <button
                      key={provider}
                      onClick={(event) => {
                        event.preventDefault();
                        signIn(provider, {
                          callbackUrl: `/verify?account_connected=${provider}`,
                        });
                      }}
                      className="button text-lg font-bold"
                    >
                      <Image
                        src={`/ProviderLogo/${provider}.svg`}
                        width={16}
                        height={16}
                        alt={provider}
                      />
                      <span className="whitespace-nowrap">
                        Sign up with {provider}
                      </span>
                    </button>
                  );
                })}
              <button
                className="button text-lg font-bold"
                onClick={handleCreateAccountButton}
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="main border-2 border-black w-full h-full flex flex-row flex-wrap items-center justify-center gap-x-12 font-notosans"></div>
      )}
    </>
  );
}

"use client";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
export default function UserMap() {
  const redirectUrl = process.env.NEXTAUTH_URL;
  const { data, status } = useSession();
  const logIn = (provider: string, email = undefined) => {
    email ? signIn(provider, {}, email) : signIn(provider, {});
  };

  return (
    <div>
      {JSON.stringify(data)}
      <Button
        onClick={() => {
          logIn("google");
        }}
      >
        test
      </Button>
      <Button
        onClick={async () => {
          await fetch("/api/issue/admin/get?type=all", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: data?.user.id }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        TestAdmin
      </Button>
    </div>
  );
}

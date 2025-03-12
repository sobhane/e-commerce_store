"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.jpg"
        alt={`${APP_NAME} logo`}
        height={150}
        width={150}
        priority
      />
      <div className="p-5 pb-2 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">not found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Button
          variant={"outline"}
          className="mt-4"
          onClick={() => (window.location.href = "/")}
        >
          Go back home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;

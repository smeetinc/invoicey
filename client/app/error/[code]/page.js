import React from "react";

import Image from "next/image";

function error({ params: { code } }) {
  let error = code;
  if (error === "404") {
    return (
      <div className="w-full h-screen">
        <div className="bg-white h-16 py-2">
          <h1 className="text-dark text-4xl font-bold font-clashDisplay ml-8">
            INVOICEY
          </h1>
        </div>
        <div className="bg-primary h-full py-auto flex items-center">
          <div className="bg-accent my-auto mx-auto w-1/2 text-center rounded-2xl">
            <Image
              src="/assets/error404.png"
              width={242.33}
              height={180.57}
              className="mx-auto mt-2 mb-4"
              alt="A lady reading some documents"
            />
            <div>
              <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
                404 - Page Not Found
              </h2>
              <p className="font-medium text-dark my-4">
                We're sorry, but the page you are looking for might have been
                moved, deleted, or does not exist. You can head back to
                dashboard.
              </p>
              <a href="/overview">
                <button className="bg-primary rounded-md px-auto py-3 w-4/5 text-white mb-8">
                  Back to dashboard
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (error === "403") {
    return (
      <div className="w-full h-screen">
        <div className="bg-white h-16 py-2">
          <h1 className="text-dark text-4xl font-bold font-clashDisplay ml-8">
            INVOICEY
          </h1>
        </div>
        <div className="bg-primary h-full py-auto flex items-center">
          <div className="bg-accent my-auto mx-auto w-1/2 text-center rounded-2xl">
            <Image
              src="/assets/error403.png"
              width={242.33}
              height={180.57}
              className="mx-auto mt-2 mb-4"
              alt="A lady reading some documents"
            />
            <div>
              <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
                403 - Forbidden Access
              </h2>
              <p className="font-medium text-dark my-4">
                Oops! You don't have permission to access this. Check Your
                credentials or contact support for assistance.
              </p>
              <a href="/overview">
                <button className="bg-primary rounded-md px-auto py-3 w-4/5 text-white mb-8">
                  Back to homepage
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (error === "500") {
    return (
      <div className="w-full h-screen">
        <div className="bg-white h-16 py-2">
          <h1 className="text-dark text-4xl font-bold font-clashDisplay ml-8">
            INVOICEY
          </h1>
        </div>
        <div className="bg-primary h-full py-auto flex items-center">
          <div className="bg-accent my-auto mx-auto w-1/2 text-center rounded-2xl">
            <Image
              src="/assets/error500.png"
              width={242.33}
              height={180.57}
              className="mx-auto mt-2 mb-4"
              alt="A lady reading some documents"
            />
            <div>
              <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
                500 - Internal Server Error
              </h2>
              <p className="font-medium text-dark my-4">
                Something went wrong on our end. Our team is on it. Please try
                again later.
              </p>
              <a href="/overview">
                <button className="bg-primary rounded-md px-auto py-3 w-4/5 text-white mb-8">
                  Go back
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (error === "504") {
    return (
      <div className="w-full h-screen">
        <div className="bg-white h-16 py-2">
          <h1 className="text-dark text-4xl font-bold font-clashDisplay ml-8">
            INVOICEY
          </h1>
        </div>
        <div className="bg-primary h-full py-auto flex items-center">
          <div className="bg-accent my-auto mx-auto w-1/2 text-center rounded-2xl">
            <Image
              src="/assets/error504.png"
              width={242.33}
              height={180.57}
              className="mx-auto mt-2 mb-4"
              alt="A lady reading some documents"
            />
            <div>
              <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
                504 - Gateway Timeout
              </h2>
              <p className="font-medium text-dark my-4">
                Uh-oh! The server is taking longer than expected to respond.
                This could be a temporary hiccup. Please try refreshing the page
                or come back in a few moments. If the issue persistes, our team
                is aware and working on a fix.
              </p>
              <a href="/overview">
                <button className="bg-primary rounded-md px-auto py-3 w-4/5 text-white mb-8">
                  Go back
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen">
        <div className="bg-white h-16 py-2">
          <h1 className="text-dark text-4xl font-bold font-clashDisplay ml-8">
            INVOICEY
          </h1>
        </div>
        <div className="bg-primary h-full py-auto flex items-center">
          <div className="bg-accent my-auto mx-auto w-1/2 text-center rounded-2xl">
            <Image
              src="/assets/error.png"
              width={242.33}
              height={180.57}
              className="mx-auto mt-2 mb-4"
              alt="Random Error Image"
            />
            <div>
              <h2 className="font-bold leading-10 font-clashDisplay text-4xl text-primary my-4">
                Unexpected Error
              </h2>
              <p className="font-medium text-dark my-4">
                An unexpected error occurred. Please try again later.
              </p>
              <a href="/overview">
                <button className="bg-primary rounded-md px-auto py-3 w-4/5 text-white mb-8">
                  Go back
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default error;

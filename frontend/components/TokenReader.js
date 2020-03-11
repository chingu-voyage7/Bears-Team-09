import { useEffect } from "react";
import { useRouter } from "next/router";

export default ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    if (router) {
      console.log(router);
      if (router.query.token) {
        localStorage.setItem("token", router.query.token);
        router.replace({ pathname: router.pathname, query: {} });
      }
    }
  });

  return children;
};

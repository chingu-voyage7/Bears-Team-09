import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import omit from "lodash/omit";

export default ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    if (router && router.query.jwt) {
      Cookies.set("jwt", router.query.jwt);
      router.replace({ pathname: router.pathname, query: omit(router.query, "jwt") });
    }
  });

  return children;
};

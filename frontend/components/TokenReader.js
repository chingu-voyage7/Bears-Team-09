import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import omit from "lodash/omit";

export default ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    if (router && router.query.token) {
      Cookies.set("token", router.query.token);
      router.replace({ pathname: router.pathname, query: omit(router.query, "token") });
    }
  });

  return children;
};

import cookie from "js-cookie";
import jwt from "jsonwebtoken";
import nextCookie from "next-cookies";
import Router from "next/router";
import { useEffect } from "react";
import { PRIVATEKEY } from "../config";

export const login = ({ token }) => {
  cookie.set("token", token, { expires: 1 });
  Router.push("/dashboard");
};

export const auth = ctx => {
  const { token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
  if (!token) {
    Router.push("/login");
  }

  return token;
};

export const logout = () => {
  cookie.remove("token");

  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, [null]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);
    const user = jwt.verify(token, PRIVATEKEY);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token, user };
  };

  return Wrapper;
};

export const withAuth = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, [null]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    let user;
    const { token } = nextCookie(ctx);

    if (token) {
      user = jwt.verify(token, PRIVATEKEY);
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token, user };
  };

  return Wrapper;
};

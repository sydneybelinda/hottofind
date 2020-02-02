import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";
import { API, COUNTRYCODE } from "../config";
import cookies from 'next-cookies'

export const deletePost = async id => {
  const url = `/api/post/delete`;

  try {
    const response = await fetch(url, {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id })
    });
    if (response.status === 200) {
      // Router.push('/dashboard')
      window.location.reload();
    } else {
      console.log("Delete failed.");
      // https://github.com/developit/unfetch#caveats
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    console.error(
      "You have an error in your code or there are Network issues.",
      error
    );
  }
};

export const deleteFile = async name => {
  const url = `/api/dashboard/file/delete`;

  try {
    const response = await fetch(url, {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name })
    });
    if (response.status === 200) {
      // Router.push('/dashboard')
      return { status: "Sucess" };
    } else {
      console.log("Delete failed.");
      // https://github.com/developit/unfetch#caveats
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    console.error(
      "You have an error in your code or there are Network issues.",
      error
    );
  }
};

export const getUserPosts = async username => {
  const res = await fetch(`${API}/posts/byuser/${username}`);
  let posts = await res.json();

  return posts;
};

export const checkUserLogin = async ctx => {
  const { token } = nextCookie(ctx);

  const apiUrl = `${API}/profile`;

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        // Authorization: JSON.stringify({ token })
        Authorization: token
      }
    });

    if (response.ok) {
      const js = await response.json();

      const user = js.data;

      return user;
    } else {
      return await redirectOnError();
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError();
  }
};

export const getPost = async id => {
  const url = `${API}/post/id/${id}`;
  const data = await fetch(url);
  const post = await data.json();
  return post;
};

export const getCities = async countrycode => {
  const url = `${API}/city/get/${countrycode}`;
  const data = await fetch(url);
  let cities = await data.json();
  return cities;
};

export const getAllCities = async () => {
  const url = `${API}/city/get`;
  const data = await fetch(url);
  let cities = await data.json();
  return cities;
};

export const getCategories = async () => {
  const url = `${API}/category/get`;
  const data = await fetch(url);
  let categories = await data.json();
  return categories;
};

export const getlatest = async c => {
  const url = `${API}/posts/latest?countrycode=${c}`;
  const data = await fetch(url);
  let posts = await data.json();

  return posts;
};

export const getPage = async (ctx) => {

  console.log(cookies(ctx).defaultSort)

  const sort = cookies(ctx).defaultSort;

  const {query} = ctx

  const { slug, city, page = 1 } = query 

  
  let url = `${API}/posts/get?countrycode=${COUNTRYCODE}&sort=${sort}`;

  if (slug[0]) {
    url += `&catindex=${slug[0]}`;
  }
  if (slug[1]) {
    url += `&keyindex=${slug[1]}`;
  }

  if (city) {
    url += `&city=${city}`;
  }

  if (page) {
    url += `&page=${page}`;
  }


  const res = await fetch(url);
  let data = await res.json();

  console.log(url)

  const urlb = `${API}/city/get/${COUNTRYCODE}`;
  const resb = await fetch(urlb);
  let cities = await resb.json();

  return {
    posts: data,
    cities: cities,
    page: page,
    city: city,
    query: query
  };
}

export const submitProfile = async e => {
  const url = `${API}/dashboard/profile/edit`;

  const data = await fetch(url, {
    method: "POST",

    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  });

  let submit = await data.json();
  return submit;
};

export const uploadProfilePhoto = async e => {
  const url = `${API}/dashboard/profile/changeavatar`;

  try {
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e)
    });

    let resp = await data;

    return resp;
  } catch (error) {
    console.error(
      "You have an error in your code or there are Network issues.",
      error
    );

    const { resp } = error.json();

    return resp;
  }
};

export const deleteAvatar = async e => {
  const url = `${API}/dashboard/profile/deleteavatar`;

  try {
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e)
    });

    let resp = await data;

    return resp;
  } catch (error) {
    console.error(
      "You have an error in your code or there are Network issues.",
      error
    );

    const { resp } = error.json();

    return resp;
  }
};

export const incrementViewCount = async c => {
  const url = `${API}/post/increment/${c}`;
  const data = await fetch(url);
  let post = await data.json();

  return post;
};

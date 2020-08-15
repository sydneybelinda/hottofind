import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";
import { URL, API, COUNTRYCODE } from "../../config";
import Router from "next/router";
import cookies from 'next-cookies'
import Error from 'next/error'

export const makeSerial = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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

export const disablePost = async (id,username) => {
  const url = `/api/post/disable`;

  try {
    const response = await fetch(url, {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, username: username })
    });
    if (response.status === 200) {
      return { status: "Success" };
    } else {
      return { status: "Failed" };
    }
  } catch (error) {
    console.error(
      "You have an error in your code or there are Network issues.",
      error
    );
  }
};

export const sendMessage = async (data) => {
  const url = `/api/messages/postmessage`;

  try {
    const response = await fetch(url, {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      return { status: "Success" };
    } else {
      return { status: "Failed" };
    }
  } catch (error) {
    console.error(
      "You have an error in your code or there are Network issues.",
      error
    );
  }
};

export const enablePost = async (id,username) => {
  const url = `/api/post/enable`;

  try {
    const response = await fetch(url, {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, username: username })
    });
    if (response.status === 200) {
      return { status: "Success" };
    } else {
      return { status: "Failed" };
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

export const getUserPosts = async (username,ctx) => {

  const sort = cookies(ctx).defaultDashSort;
  const res = await fetch(`${API}/posts/byuser/${username}?sort=${sort}`);
  let posts = await res.json();

  return posts;
};

export const getUserMessages = async (username,ctx) => {

  const sort = cookies(ctx).defaultMessageSort;
  const res = await fetch(`${API}/messages/byuser/${username}?sort=${sort}`);
  let messages = await res.json();

  return messages;
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
 // console.log('data: ', data.Response)
 
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


  const sort = cookies(ctx).defaultSort;
  const view = cookies(ctx).defaultView;

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

export const getAllPosts = async c => {
  const url = `${API}/posts/getall`;
  const data = await fetch(url);
  let posts = await data.json();

  return posts;
};

export const throw404 = () => {
  if (process.browser) {
    return <Error statusCode={404} />
  }
  const e = new Error()
  e.code = 'ENOENT'
  throw e
}

export const checkUrl = async url => {
  const data = await fetch(url,{
    headers:{
      'Access-Control-Allow-Origin':'*'
  },
  mode: 'no-cors'
});

  return data;
};

export const checkUsername = async u => {
  const url = `${API}/user/username/${u}`;
  const data = await fetch(url);
  let users = await data.json();
  return users;
};

export const checkEmail = async u => {
  const url = `${API}/user/email/${u}`;
  const data = await fetch(url);
  let users = await data.json();
  return users;
};

export const checkTitle = async u => {
  const url = `${API}/dashboard/post/checktitle/${u}`;
  const data = await fetch(url);
  let posts = await data.json();
  return posts;
};

export const sendPasswordReset = async d => {
    

  const serial = await makeSerial(30)

  var user = {
    email: d.email,
    passwordreset: serial
  } 

  const url = `${API}/user/resetpassword`;
  const data = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  let status = await data;
  const sta = await status.json()

  if (sta.status == "successful"){

    const html = `<b>HotToFind Password Reset</b>
    <br />
    <p>A password reset request has been generated for ${user.email}.<br />  If you were the one who requested it - click the link below to reset your password.  If not simply ignore this message.</p>
    <br />
    Reset Link: <a href="${URL}/reset?serial=${serial}">${URL}/reset?serial=${serial}</a>
    `

    const body = {
      to: user.email,
      subject: "Reset your HotToFind password",
      html: html
    }

    const url = `${API}/sendemail`;
    const edata = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    let estatus = await edata;
    status = await estatus.json();

    

    return status
  }

  

  else {
    status = sta;
    return ({error: status.error})
  }





  

}

export const checkSerial = async u => {
  let data = [];
  let user = [];
  const url = `${API}/user/serial/${u}`;
  data = await fetch(url);
  if (data.status == 200){
    user = await data.json();
  }
  return user;
};

export const changePassword = async e => {
  const url = `${API}/user/changepassword`;

  const data = await fetch(url, {
    method: "POST",

    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  });

  let submit = await data.json();
  return submit;
};
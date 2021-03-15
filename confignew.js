import absoluteUrl from "next-absolute-url";



function makeConfig(data,h) {
  const main = {
    PRIVATEKEY: "wowwow",
    URL: h,
    API: `${h}/api`,
    COUNTRYCODE: data.COUNTRYCODE,
    COUNTRY: data.COUNTRY,
    GA: "UA-111767338-2",
    MAILUSER: "hottofind", // generated ethereal user
    MAILPASSWORD: "HTGRFrfrTGFrfTYHRfedewssdw6", // generated ethereal password
  };
  return main;
}

const au = {
    COUNTRYCODE: "au",
    COUNTRY: "Australia",
}
const us = {
    COUNTRYCODE: "us",
    COUNTRY: "United States",
}

const ca = {
    COUNTRYCODE: "ca",
    COUNTRY: "Canada",
}
const eu = {
    COUNTRYCODE: "eu",
    COUNTRY: "Europe",
}

const ind = {
    COUNTRYCODE: "in",
    COUNTRY: "India",
}

const sa = {
    COUNTRYCODE: "sa",
    COUNTRY: "South America",
}
const sg = {
    COUNTRYCODE: "sg",
    COUNTRY: "Sngapore",
}

const uk = {
    COUNTRYCODE: "uk",
    COUNTRY: "United Kingdom",
}
const za = {
    COUNTRYCODE: "za",
    COUNTRY: "South Africa",
}

function getConfig(req) {

    const { host, origin } = absoluteUrl(req);

    console.log(origin)

    var config = makeConfig(us,origin);

    // var h = "au.hottofind.com";
    // if(h.split(".")[0] == "au"){
    //     console.log('Yes')
    // }
    

  //console.log(host.match("localhost"))

  if(host.match("localhost")){
      
      var config = makeConfig(au,origin);
  } else {

    if(host.split(".")[0] == "au"){
        var config = makeConfig(au,origin);
    }
    if(host.split(".")[0] == "ca"){
        var config = makeConfig(ca,origin);
    }
    if(host.split(".")[0] == "eu"){
        var config = makeConfig(eu,origin);
    }
    if(host.split(".")[0] == "in"){
        var config = makeConfig(ind,origin);
    }
    if(host.split(".")[0] == "sa"){
        var config = makeConfig(sa,origin);
    }
    if(host.split(".")[0] == "sg"){
        var config = makeConfig(sg,origin);
    }
    if(host.split(".")[0] == "uk"){
        var config = makeConfig(uk,origin);
    }
    if(host.split(".")[0] == "za"){
        var config = makeConfig(au,origin);
    }
    if(host == "hottofind.com"){
        var config = makeConfig(us,origin);
    }
    
  }

  return {
    config:config,
  };
}

export default getConfig;

// For the search only version
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('XASMT3PQUY', '4975554cdc1513b3717e777173837417');
const index = client.initIndex('dev_HOTTOFIND');
import Axios from "axios";
import React, {useEffect} from "react";
import {API, COUNTRYCODE} from "../../config" 
//const index = client.initIndex('posts');
const contactsJSON = require('../../public/posts.json');




index.saveObjects(contactsJSON, {
  autoGenerateObjectIDIfNotExist: true
}).then(({ objectIDs }) => {
  console.log(objectIDs);
});


 function IndexSearch() {

  // async function getPosts() {

  //   const url = `${API}/posts/getall?countrycode=${COUNTRYCODE}`;
  //   const data = await Axios.get(url);
  //  // console.log('data: ', data.Response)
   
  //     if(data){
  //       console.log(data);
  //     }

    // const responseData = await ProductRepository.getProducts(params);
  
  
    // if (responseData) {
    //     setProductItems(responseData.items.rows);
    //     setTotal(responseData.items.count);
    //     setTimeout(
    //         function () {
    //             setLoading(false);
    //         }.bind(this),
    //         250
    //     );
        
    // }



// useEffect(() => {
//   getPosts();
// });

  return (
    <>
<div>Adding Posts to Index</div>

    </>
    // <Layout>
    //   <Box my={4}>
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Add Posts to Index
    //     </Typography>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       component={Link}
    //       naked
    //       href="/"
    //     >
    //       Go to the main page
    //     </Button>
    //     <ProTip />
    //     <Footer />
    //   </Box>
    // </Layout>
  );
}

// IndexSearch.getInitialProps = async (req, ctx) => {
//   // const { API, COUNTRYCODE } = config;

//   // //const host  = req.headers.host || window.location.hostname

//   // const posts = await Queries.getlatest(COUNTRYCODE);

//   // return { posts: posts };
//   return (req: req)
// };

export default IndexSearch

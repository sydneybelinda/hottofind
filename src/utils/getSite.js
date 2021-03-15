import { useRouter } from 'next/router'
import { ContactSupportOutlined } from '../../node_modules/@material-ui/icons/index';

export const getSite = () =>{

    const router = useRouter()

console.log(router)

return router    


}


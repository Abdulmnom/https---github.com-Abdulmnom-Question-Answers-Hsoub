import {Pagination } from '@material-ui/lab'

import {Box} from '@material-ui/core'
import { useRouter } from 'next/router'

export default function Pages({count ,page = 1}){
    const router = useRouter()
    const onChange = (e , page) => {
        
        router.push({
            pathname: '/',
            query: {...router.query ,page}
        })
    }
    // count: the number of page
    // page: current page 

    return (
        <Box display="flex" justifyContent="center" p={3} mt={2}>
            <Pagination  
            count={count}
             page={page}
            onChange={onChange}
            color="primary"/>
        </Box>
    )
}
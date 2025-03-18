import Link from 'next/link'
import MainLayout from 'layouts/Main'
import { usePosts } from 'hooks/usePost'
//import { FormattedMessage } from 'react-intl'
import QList from 'components/QList'
import Pages from 'components/Pages'
import { useRouter } from 'next/router'
import { Box, Button ,ButtonGroup } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'


export default function Home() {
    const router = useRouter()
    const page = router.query.page || 1 //  default page is 1
    const sort = router.query.sort || -1 //  default page is -1 oldest

    const {data} = usePosts({ page , sort})
    return (
        <MainLayout>
          <Box display="flex" p={2} bgcolor={'#f4f7f9'}>
            <Box flexGrow={1}>
              <Filters />
            </Box>
            </Box>
          <QList items={data?.items || []} />
          <Pages count={data?.page} page={Number(page)} />
          
          
        </MainLayout>
    )
}
function Filters(){
  const router =useRouter()
  const navigate = (sort) =>{
    router.push({
      pathname: '/',
      query: { ...router.query, sort }
    })
  }
  return (
    <ButtonGroup size='big'>
        <Button onClick={() => navigate(-1)}>
            <FormattedMessage id={'btn.newest'}/>
        </Button>
        <Button onClick={() => navigate(1)}>
            <FormattedMessage id={'btn.oldest'}/>
        </Button>
    </ButtonGroup>
)

}

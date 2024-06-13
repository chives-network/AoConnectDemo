
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import CircularProgress from '@mui/material/CircularProgress'

const TokenList = (prop: any) => {
  
  const { tokenGetInfor, setTokenGetInfor } = prop

  const { t } = useTranslation()

  return (
    <Box
        sx={{
            py: 3,
            px: 5,
            display: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
        >
        <TableContainer>
            <Table>
            <TableBody>
            {tokenGetInfor && tokenGetInfor.TokenBalances && Object.keys(tokenGetInfor.TokenBalances).map((Item: string, Index: number)=>{

                return (
                <TableRow key={Index} sx={{my: 0, py: 0}}>
                    <TableCell sx={{my: 0, py: 0}}>
                        <Typography noWrap variant='body2' sx={{ color: 'primary.main', pr: 3, display: 'inline', my: 0, py: 0 }}>{Index + 1}</Typography>
                    </TableCell>
                    <TableCell sx={{my: 0, py: 0}}>
                        <Typography noWrap variant='body2' sx={{ color: 'info.main', pr: 1, display: 'inline', my: 0, py: 0 }}>{Item}</Typography>
                        {Item && (
                            <IconButton aria-label='capture screenshot' color='secondary' size='small' onClick={()=>{
                                navigator.clipboard.writeText(Item);
                            }}>
                                <Icon icon='material-symbols:file-copy-outline-rounded' fontSize='inherit' />
                            </IconButton>
                        )}
                    </TableCell>
                    <TableCell sx={{my: 0, py: 0}}>
                        <Typography noWrap variant='body2' sx={{ color: 'primary.main', pr: 3, display: 'inline', my: 0, py: 0 }}>{tokenGetInfor.TokenBalances[Item]}</Typography>
                    </TableCell>
                    <TableCell sx={{my: 0, py: 0}}>
                        <Button sx={{textTransform: 'none', my: 0}} size="small" disabled={tokenGetInfor.disabledSendOutButton || tokenGetInfor.TokenProcessTxId == Item} variant='outlined' onClick={
                            () => { setTokenGetInfor((prevState: any)=>({
                                ...prevState,
                                openSendOutToken: true,
                                SendOutToken: Item,
                            })) }
                        }>
                        {t("Send")}
                        </Button>
                    </TableCell>
                </TableRow>
                )
                
            })}

            {tokenGetInfor && tokenGetInfor.TokenBalances == null && (
                <TableRow sx={{my: 0, py: 0}}>
                    <TableCell sx={{my: 0, py: 0}}>
                        <CircularProgress />
                        <Typography noWrap variant='body2' sx={{ color: 'primary.main', pr: 3, display: 'inline', ml: 5, pt: 0 }}>{t('Loading token txs...')}</Typography>
                    </TableCell>
                </TableRow>
            )}
        
            </TableBody>
            </Table>
        </TableContainer>

    </Box>
  );
  
}


export default TokenList

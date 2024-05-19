// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'

import axios from 'axios'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

import { useRouter } from 'next/router'

import { AoSendMsg, AoGetMessage } from 'src/functions/AoConnectLib'

import MessageRender from './MessageRender'

function generateRandomNumber() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AoSendMsgModel = () => {
  // ** Hook
  const { t } = useTranslation()

  const router = useRouter()
    
  // ** State
  const [uploadingButton, setUploadingButton] = useState<string>(`${t('Submit')}`)
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
  const [isDisabledButton2, setIsDisabledButton2] = useState<boolean>(false)
  
  const [resultText, setResultText] = useState<string>("t5b-PAESehavwV1IZ78qS04X2VDwAIkasgsn27vX0OA")
  const [resultText2, setResultText2] = useState<any>()

  const auth = useAuth()
  const currentWallet = auth.currentWallet
  const currentAddress = auth.currentAddress

  const [processTxId, setprocessTxId] = useState<string>("K4kzmPPoxWp0YQqG0UNDeXIhWuhWkMcG0Hx8HYCjmLw")
  const [processTxIdError, setprocessTxIdError] = useState<string | null>(null)
  const handleprocessTxIdChange = (event: any) => {
    setprocessTxId(event.target.value);
    if(event.target.value.length != 43) {
        setprocessTxIdError(`${t('processTxId length must be 43')}`)
    }
    else {
        setprocessTxIdError("")
    }
    
    console.log("processTxId", processTxId)
  };
  
  const [message, setMessage] = useState<string>("Hello World : " + String(generateRandomNumber()).substring(0, 4) + ".")
  const [messageError, setMessageError] = useState<string | null>(null)
  const [messageHelp, setMessageHelp] = useState<string | null>(null)
  const handlemessageChange = (event: any) => {
    setMessage(event.target.value);
    setMessageError("")
    const Msg: string = event.target.value
    if(Msg.startsWith("Inbox")) {
        setMessageHelp('Command')
        setTags('[ { "name": "Action", "value": "Eval" } ]')
    }
    else {
        setMessageHelp('Data')
    }
  };

  const [tags, setTags] = useState<string>('[ \n{ "name": "Your-Tag-Name-Here", "value": "your-tag-value" }, \n{ "name": "Another-Tag", "value": "another-value" } \n]')
  const [tagsError, setTagsError] = useState<string | null>(null)
  const handleTagsChange = (event: any) => {
    setTags(event.target.value);
    setTagsError("")
  };

  const handleSubmit = async () => {
    if(currentAddress == undefined || currentAddress.length != 43) {
        toast.success(t(`Please create a wallet first`), {
          duration: 4000
        })
        router.push("/mywallets");
        
        return
    }

    setResultText('')
    setResultText2('')
    setIsDisabledButton(true)
    setUploadingButton(`${t('Submitting...')}`)

    const Result: any = await AoSendMsg(currentWallet.jwk, processTxId, String(message), JSON.parse(tags));

    if(Result && Result.length == 43) {
      toast.success(Result, { duration: 4000 })
      setResultText(Result)
      //setprocessTxId("")
      //setMessage("Hello World : " + String(generateRandomNumber()).substring(0, 4) + ".")
      //setTags("")
    }
    setIsDisabledButton(false)
    setUploadingButton(`${t('Submit')}`)

  }

  useEffect(()=>{
    
    handleSendMsgTest()

  }, [currentWallet])

  const handleSendMsgTest = async () =>{
    if(currentWallet && currentWallet.jwk)  {
        const Result: any = await AoSendMsg(
                currentWallet.jwk, 
                'K4kzmPPoxWp0YQqG0UNDeXIhWuhWkMcG0Hx8HYCjmLw', 
                '',  
                [ { name: 'Action', value: 'Eval' } ]
        );
        console.log("handleSendMsgTest", Result)
    }
  }

  const handleGetMsgContent = async () => {
    if(processTxId && resultText && resultText.length == 43)  {
        setIsDisabledButton2(true)
        const Result: any = await AoGetMessage(processTxId, resultText);
        console.log("AoGetMessage Result", Result)
        if(Result) {
            setResultText2(Result)
            console.log("AoGetMessageModel","handleSubmit","processTxId:", processTxId, "message:", resultText, "Result:", Result)
            toast.success("AoGetMessage Success", { duration: 4000 })
        }
        setIsDisabledButton2(false)
    }
  }

  const handleLuaFromGithub = async (module: string) => {
    const Data = await axios.get('https://raw.githubusercontent.com/permaweb/aos/main/blueprints/' + module + '.lua', { headers: { }, params: { } }).then(res => res.data)
    setMessage(Data)
    setTags('[ { "name": "Action", "value": "Eval" } ]')
    setResultText('')
    setResultText2('')
  }

  return (
    <Fragment>

    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Card>
            <CardHeader title={`${t('Send Message')}`} />
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={`${t('processTxId')}`}
                            placeholder={`${t('processTxId')}`}
                            value={processTxId}
                            onChange={handleprocessTxIdChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <Icon icon='mdi:account-outline' />
                                    </InputAdornment>
                                )
                            }}
                            error={!!processTxIdError}
                            helperText={
                                <Fragment>
                                    <Link href={`https://cookbook_ao.g8way.io/concepts/processes.html`} target='_blank'>
                                        {'Process Concept'}
                                    </Link>
                                    <Link href={`https://www.ao.link/processes`} target='_blank' sx={{ml: 4}}>
                                        {'All Processes'}
                                    </Link>
                                    <Link href={`https://www.ao.link/entity/${processTxId}`} target='_blank' sx={{ml: 4}}>
                                        {'Detail on AOLink'}
                                    </Link>
                                </Fragment>
                                }
                        />
                        
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label={`${t('Message')}`}
                            placeholder={`${t('Message')}`}
                            value={message}
                            onChange={handlemessageChange}
                            error={!!messageError}
                            helperText={messageHelp}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label={`${t('Tags')}`}
                            placeholder={`${t('Tags')}`}
                            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}                 
                            value={tags}
                            onChange={handleTagsChange}
                            error={!!tagsError}
                            helperText={tagsError}
                        />
                    </Grid>

                    <Grid item xs={12} container justifyContent="flex-end">
                        {resultText && (
                        <Button variant='outlined' size='small' sx={{ mr:3 }} onClick={()=>{
                            setResultText('')
                            setResultText2('')
                        }} disabled={isDisabledButton} >
                            {t('Cannel')}
                        </Button>
                        )}
                        {isDisabledButton && (
                            <Box sx={{ m: 0, pt:1 }}>
                                <CircularProgress sx={{ mr: 5, mt: 0 }} />
                            </Box>
                        )}
                        <Button type='submit' variant='contained' size='large' onClick={handleSubmit} disabled={isDisabledButton} >
                            {uploadingButton}
                        </Button>
                    </Grid>

                    <Grid container justifyContent="flex-start" alignItems="center">
                        <Link href={`https://www.ao.link/message/${resultText}`} target='_blank'>
                            <Typography variant='body2' sx={{ml: 3, mt:2}}>
                                {resultText}
                            </Typography>
                        </Link>
                        {resultText && (
                        <Button size="small" sx={{mt: 3, ml: 3}} variant='outlined' disabled={isDisabledButton2} onClick={handleGetMsgContent}>{t('Content')}</Button>
                        )}
                    </Grid>

                    <MessageRender resultText={resultText2} />


                </Grid>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
            <CardHeader title={`${t('Example')}`} />
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Button variant='outlined' size='small' sx={{ mr:3, mb: 2 }} onClick={()=>{
                            setMessage('Inbox[#Inbox]')
                            setTags('[ { "name": "Action", "value": "Eval" } ]')
                        }}>
                            Inbox[#Inbox]
                        </Button>
                        <Button variant='outlined' size='small' sx={{ mr:3, mb: 2 }} onClick={()=>{
                            setMessage('Inbox[#Inbox].Data')
                            setTags('[ { "name": "Action", "value": "Eval" } ]')
                        }}>
                            Inbox[#Inbox].Data
                        </Button>
                        <Button variant='outlined' size='small' sx={{ mr:3, mb: 2 }} onClick={()=>handleLuaFromGithub('chat')}>
                            .load-blueprint chat
                        </Button>
                        <Button variant='outlined' size='small' sx={{ mr:3, mb: 2 }} onClick={()=>{
                            setMessage('List()')
                            setTags('[ { "name": "Action", "value": "Eval" } ]')
                        }}>
                            List()
                        </Button>
                        <Button variant='outlined' size='small' sx={{ mr:3, mb: 2 }} onClick={()=>{
                            setMessage('Join("Quests", "Wang001")')
                            setTags('[ { "name": "Action", "value": "Eval" } ]')
                        }}>
                            Join("Quests", "Wang001")
                        </Button>
                        <Button variant='outlined' size='small' sx={{ mr:3, mb: 2 }} onClick={()=>{
                            setMessage('Say("Hello everyone!", "Quests")')
                            setTags('[ { "name": "Action", "value": "Eval" } ]')
                        }}>
                            Say("Hello everyone!", "Quests")
                        </Button>
                        <Button variant='outlined' size='small' sx={{ mr:3, mb: 2 }} onClick={()=>{
                            setMessage('Leave("Quests")')
                            setTags('[ { "name": "Action", "value": "Eval" } ]')
                        }}>
                            Leave("Quests")
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>    
      </Grid>
    </Grid>

    
        
    </Fragment>
  )
}

export default AoSendMsgModel

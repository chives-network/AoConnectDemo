// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import toast from 'react-hot-toast'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Third Party Import
import Box from '@mui/material/Box'

// ** Axios Imports
import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'

import { GetMyLastMsg } from 'src/functions/AoConnect/AoConnect'
import { MyProcessTxIdsGetTokens, MyProcessTxIdsAddToken } from 'src/functions/AoConnect/MyProcessTxIds'
import { AoTokenInfoDryRun } from 'src/functions/AoConnect/Token'

import TokenLeft from 'src/views/Token/TokenLeft'
import TokenIndex from 'src/views/Token/TokenIndex'

import { GetAoConnectReminderChatroomTxId } from 'src/functions/AoConnect/MsgReminder'

const ansiRegex = /[\u001b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

const AppChat = () => {
  // ** Hook

  // ** States

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Vars
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'))
  const tokenLeftWidth = smAbove ? 270 : 200

  const { skin } = settings
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'))

  const auth = useAuth()
  const currentWallet = auth.currentWallet
  const currentAddress = auth.currentAddress

  const [myProcessTxId, setMyProcessTxId] = useState<string>('')
  const [tokenLeft, setTokenLeft] = useState<any[]>([])
  const [counter, setCounter] = useState<number>(0)
  const [searchToken, setSearchToken] = useState<string>('')
  const [loadingGetTokens, setLoadingGetTokens] = useState<boolean>(true)
  const [addTokenButtonText, setAddTokenButtonText] = useState<string>('Add Favorite')
  const [addTokenButtonDisabled, setAddTokenButtonDisabled] = useState<boolean>(false)
  const [addTokenFavorite, setAddTokenFavorite] = useState<boolean>(false)
  const [tokenCreate, setTokenCreate] = useState<any>({ openCreateToken: false, FormSubmit: 'Submit', isDisabledButton: false })
  const [tokenGetInfor, setTokenGetInfor] = useState<any>({ openSendOutToken: false, disabledSendOutButton:false, FormSubmit: 'Submit', isDisabledButton: false })

  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  
  useEffect(() => {
    if(currentAddress && currentAddress.length == 43) {

      const MyProcessTxIdData: string = GetAoConnectReminderChatroomTxId(currentAddress)
      if(MyProcessTxIdData) {
        setMyProcessTxId(MyProcessTxIdData)
      }
    }
  }, [currentAddress])

  useEffect(() => {
    if(myProcessTxId && myProcessTxId.length == 43) {      
      handleGetTokenInfo()
    }
  }, [myProcessTxId, counter])


  const handleGetTokenInfo = async () => {
    setLoadingGetTokens(true)
    const MyProcessTxIdsGetTokensData = await MyProcessTxIdsGetTokens(authConfig.AoConnectMyProcessTxIds, myProcessTxId);
    if (MyProcessTxIdsGetTokensData) {
        console.log("MyProcessTxIdsGetTokensData", MyProcessTxIdsGetTokensData);
        if (MyProcessTxIdsGetTokensData?.msg?.Output?.data?.output) {
            const formatText = MyProcessTxIdsGetTokensData?.msg?.Output?.data?.output.replace(ansiRegex, '');
            toast.success(formatText, {
                duration: 2000
            });
        }
        const TokenList = Object.values(MyProcessTxIdsGetTokensData);
        if (TokenList) {
            const AllTokens = await Promise.all(TokenList.map(async (item: any) => {
                const TokenGetMap: any = await AoTokenInfoDryRun(item.TokenId);
                console.log("tokenLeft TokenGetMap", TokenGetMap);
                if (TokenGetMap && TokenGetMap.Ticker && TokenGetMap.Name) {

                    return {...TokenGetMap, Id: item.TokenId};
                }
            }));
            const filteredTokens = AllTokens.filter(token => token);
            if (filteredTokens.length > 0) {
                setTokenLeft(filteredTokens);
                console.log("tokenLeft AllTokens", AllTokens);
            }
        }
    }
    setLoadingGetTokens(false)
  }


  const handleAddToken = async (WantToSaveTokenProcessTxId: string) => {
    setAddTokenButtonDisabled(true)
    setAddTokenButtonText('waiting')
    const WantToSaveTokenProcessTxIdData = await MyProcessTxIdsAddToken(currentWallet.jwk, authConfig.AoConnectMyProcessTxIds, myProcessTxId, WantToSaveTokenProcessTxId, '666')
    if(WantToSaveTokenProcessTxIdData) {
      console.log("WantToSaveTokenProcessTxIdData", WantToSaveTokenProcessTxIdData)
      if(WantToSaveTokenProcessTxIdData?.msg?.Output?.data?.output)  {
        setCounter(counter + 1)
        const formatText = WantToSaveTokenProcessTxIdData?.msg?.Output?.data?.output.replace(ansiRegex, '');
        if(formatText) {

          //Read message from inbox
          const MyProcessTxIdsAddTokenData1 = await GetMyLastMsg(currentWallet.jwk, WantToSaveTokenProcessTxId)
          if(MyProcessTxIdsAddTokenData1?.msg?.Output?.data?.output)  {
            const formatText2 = MyProcessTxIdsAddTokenData1?.msg?.Output?.data?.output.replace(ansiRegex, '');
            if(formatText2) {
              toast.success(formatText2, {
                duration: 2000
              })
              setAddTokenButtonText('have add')
            }
          }

        }

      }
    }
  }
  
  return (
    <Fragment>
      <Box
        className='app-chat'
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'background.paper',
          boxShadow: skin === 'bordered' ? 0 : 6,
          ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
        }}
      >

        <Fragment>
          <TokenLeft
            hidden={hidden}
            mdAbove={mdAbove}
            tokenLeftWidth={tokenLeftWidth}
            tokenLeft={tokenLeft}
            searchToken={searchToken}
            setSearchToken={setSearchToken}
            loadingGetTokens={loadingGetTokens}
            setAddTokenButtonText={setAddTokenButtonText}
            setAddTokenButtonDisabled={setAddTokenButtonDisabled}
            addTokenFavorite={addTokenFavorite}
            setAddTokenFavorite={setAddTokenFavorite}
            tokenCreate={tokenCreate}
            setTokenCreate={setTokenCreate}
            leftSidebarOpen={leftSidebarOpen}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            setTokenGetInfor={setTokenGetInfor}
          />
          <TokenIndex 
            tokenLeft={tokenLeft}
            handleAddToken={handleAddToken}
            searchToken={searchToken}
            setSearchToken={setSearchToken}
            addTokenButtonText={addTokenButtonText}
            addTokenButtonDisabled={addTokenButtonDisabled}
            addTokenFavorite={addTokenFavorite}
            setAddTokenFavorite={setAddTokenFavorite}
            tokenCreate={tokenCreate}
            setTokenCreate={setTokenCreate}
            counter={counter}
            setCounter={setCounter}
            tokenGetInfor={tokenGetInfor}
            setTokenGetInfor={setTokenGetInfor}
            setAddTokenButtonText={setAddTokenButtonText}
            setAddTokenButtonDisabled={setAddTokenButtonDisabled}
          />
        </Fragment>

      </Box>
    </Fragment>
  )
}

export default AppChat

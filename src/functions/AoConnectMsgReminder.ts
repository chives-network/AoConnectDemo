import { AoGetPageRecords } from './AoConnectLib'
import { getMessageData, getMessagesData, getOutputData, getNoticeAction, parseNoticeData, getNoticeData, parseAmount } from './AoConnectUtils'

const AoConnectIndexedDb: string = 'AoConnectDb'
const AoConnectLastCursor: string = 'AoConnectLastCursor'
const AoConnectAllMessages: string = 'AoConnectAllMessages'
const AoConnectEveryTimeGetMsgCount: number = 10

const ansiRegex = /[\u001b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

export const ReminderMsgAndStoreToLocal = async (processTxId: string) => {
    const AoConnectLastCursorData = window.localStorage.getItem(AoConnectLastCursor) || undefined
    const AoGetPageRecordsList = await AoGetPageRecords(processTxId, 'DESC', AoConnectEveryTimeGetMsgCount, AoConnectLastCursorData);
    const NeedReminderMsg: any[] = []
    AoGetPageRecordsList && AoGetPageRecordsList.edges && AoGetPageRecordsList.edges.map((item: any, index: number)=>{

        if(index == 0 && item.cursor) {
            window.localStorage.setItem(AoConnectLastCursor, item.cursor)
        }

        //Output
        if(item.node && item.node.Output && item.node.Output.data && typeof item.node.Output.data === 'string' )  {
            const Data = item.node.Output.data.replace(ansiRegex, '');
            NeedReminderMsg.push({Target: null, Action: 'Output', Type:'Reminder', FromProcess: null, Data, Ref_: null, Logo: null})
        }

        //Output
        if(item.node && item.node.Output && item.node.Output.data && item.node.Output.data.output && typeof item.node.Output.data.output === 'string' )  {
            const Msg = item.node.Output.data.output.replace(ansiRegex, '');
            //NeedReminderMsg.push([Msg, ''])
        }

        //Messages
        if(item.node && item.node.Messages && typeof item.node.Messages === 'object' && item.node.Messages.length > 0)  {
            const MessagesList = item.node.Messages;
            MessagesList && MessagesList.map((ItemMsg: any, Index: number)=>{
                const Data = ItemMsg?.Data?.replace(ansiRegex, '')
                const Tags = ItemMsg.Tags
                const Target = ItemMsg.Target

                if( Data || Target )   {

                    const TagsMap: any = {}
                    Tags.map((ItemTag: any)=>{
                        TagsMap[ItemTag.name] = ItemTag.value
                    })

                    const FromProcess = TagsMap['From-Process']
                    const Type = TagsMap['Type']
                    const Action = TagsMap['Action']
                    const Ref_ = TagsMap['Ref_']
                    let Logo = null
                    if(Action)  {
                        Logo = "/images/apple-touch-icon.png"
                    }
                    else if(Data == 'Broadcasted.') {
                        Logo = "/images/apple-touch-icon.png"
                    }


                    //Messages
                    NeedReminderMsg.push({Target, Action, Type, FromProcess, Data, Ref_, Logo})

                    const TickerList = Tags.filter((item: any)=> item.name == 'Ticker')
                    if( TickerList && TickerList.length == 1 )  {
                        const Value = TickerList[0]['value']
                        const LogoList = Tags.filter((item: any)=> item.name == 'Logo')
                        const Logo = LogoList && LogoList[0] && LogoList[0]['value'] ? LogoList[0]['value'] : null
                        const FromProcessList = Tags.filter((item: any)=> item.name == 'From-Process')
                        const FromProcess = FromProcessList[0]['value']
                        if(Data) {
                            NeedReminderMsg.push([Data.replace(ansiRegex, ''), Value.replace(ansiRegex, '') + " from " + Target, Logo])
                        }
                        else {
                            NeedReminderMsg.push([Value.replace(ansiRegex, '') + " from " + Target, FromProcess])
                        }
                    }

                }

                
                
            })
        }
        console.log("typeof item.node.Messages", typeof item.node.Messages, item.node.Messages)

    })

    //Write Local Storage
    console.log("NeedReminderMsg", NeedReminderMsg)
    let db = null;
    const request: any = indexedDB.open(AoConnectIndexedDb, 1);

    request.onerror = function(event: any) {
        console.log('Database error: ' + event.target.errorCode);
    };
    request.onsuccess = function(event: any) {
        db = event.target.result;
        console.log('Database opened successfully');
        if (db) {
            const transaction = db.transaction(['ReminderMsg'], 'readwrite');
            const objectStore = transaction.objectStore('ReminderMsg');

            NeedReminderMsg && NeedReminderMsg.map((ItemMsg: any, index: number)=>{

                const {Target, Action, Type, FromProcess, Data, Ref_, Logo} = ItemMsg

                objectStore.add({
                    Target: Target,
                    Action: Action,
                    Type: Type,
                    FromProcess: FromProcess,
                    Data: Data,
                    Ref_: Ref_,
                    Logo: Logo
                });

            })

            transaction.oncomplete = function() {
                console.log('Data added successfully');
            };
        }
    };
    request.onupgradeneeded = function(event: any) {
        db = event.target.result;
        const objectStore = db.createObjectStore('ReminderMsg', { keyPath: 'id', autoIncrement: true });

        objectStore.createIndex('Target', 'Target', { unique: false });
        objectStore.createIndex('Action', 'Action', { unique: false });
        objectStore.createIndex('Type', 'Type', { unique: false });
        objectStore.createIndex('FromProcess', 'FromProcess', { unique: false });
        objectStore.createIndex('Data', 'Data', { unique: false });
        objectStore.createIndex('Ref_', 'Ref_', { unique: false });
        objectStore.createIndex('Logo', 'Logo', { unique: false });

    };

    console.log("NeedReminderMsg", NeedReminderMsg, db);



    return NeedReminderMsg
}


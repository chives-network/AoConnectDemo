import { AoGetPageRecords } from './AoConnectLib'

const AoConnectLastCursor: string = 'AoConnectLastCursor'
const AoConnectAllMessages: string = 'AoConnectAllMessages'
const AoConnectEveryTimeGetMsgCount: number = 10

export const ReminderMsgAndStoreToLocal = async (processTxId: string) => {
    const AoConnectLastCursorData = window.localStorage.getItem(AoConnectLastCursor) || undefined
    const AoGetPageRecordsList = await AoGetPageRecords(processTxId, 'DESC', AoConnectEveryTimeGetMsgCount, AoConnectLastCursorData);
    const NeedReminderMsg: any[] = []
    AoGetPageRecordsList && AoGetPageRecordsList.edges && AoGetPageRecordsList.edges.map((item: any, index: number)=>{

        if(index == 0 && item.cursor) {
            window.localStorage.setItem(AoConnectLastCursor, item.cursor)
        }
        if(item.node && item.node.Output && item.node.Output.data && typeof item.node.Output.data === 'string' )  {
            const ansiRegex = /[\u001b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
            const Msg = item.node.Output.data.replace(ansiRegex, '');
            NeedReminderMsg.push([Msg, ''])
        }
        if(item.node && item.node.Output && item.node.Output.data && item.node.Output.data.output && typeof item.node.Output.data.output === 'string' )  {
            const ansiRegex = /[\u001b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
            const Msg = item.node.Output.data.output.replace(ansiRegex, '');
            NeedReminderMsg.push([Msg, ''])
        }
        if(item.node && item.node.Messages && typeof item.node.Messages === 'object' && item.node.Messages.length > 0)  {
            const MessagesList = item.node.Messages;
            MessagesList && MessagesList.map((ItemMsg: any, Index: number)=>{
                const Tags = ItemMsg.Tags
                const ActionList = Tags.filter((item: any)=> item.name == 'Action')
                const Value = ActionList[0]['value']
                
                const FromProcessList = Tags.filter((item: any)=> item.name == 'From-Process')
                const FromProcess = FromProcessList[0]['value']

                NeedReminderMsg.push([Value + " from " + ItemMsg.Target, FromProcess])
            })
        }
        console.log("typeof item.node.Messages", typeof item.node.Messages, item.node.Messages)

    })

    return NeedReminderMsg
}


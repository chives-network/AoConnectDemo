
//Due need to use the node esm mode, so have change the package.json and move the repo to this location. Version: 0.0.53
import { connect, createDataItemSigner }  from "scripts/@permaweb/aoconnect"

import { MU_URL, CU_URL, GATEWAY_URL, AoGetRecord, AoLoadBlueprintModule } from 'src/functions/AoConnect/AoConnect'


export const AoLoadBlueprintChivesChat = async (currentWalletJwk: any, processTxId: string) => {
    return await AoLoadBlueprintModule (currentWalletJwk, processTxId, 'chiveschat')
}


export const GetChivesChatMembers = async (currentWalletJwk: any, processTxId: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );

        const GetChivesChatMembersResult = await message({
            process: processTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Members',
        });
        console.log("GetChivesChatMembers GetChivesChatMembers", GetChivesChatMembersResult)
        
        if(GetChivesChatMembersResult && GetChivesChatMembersResult.length == 43) {
            const MsgContent = await AoGetRecord(processTxId, GetChivesChatMembersResult)

            return { id: GetChivesChatMembersResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatMembersResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const GetChivesChatAdmins = async (currentWalletJwk: any, processTxId: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );

        const GetChivesChatAdminsResult = await message({
            process: processTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Admins',
        });
        console.log("GetChivesChatAdmins GetChivesChatAdmins", GetChivesChatAdminsResult)
        
        if(GetChivesChatAdminsResult && GetChivesChatAdminsResult.length == 43) {
            const MsgContent = await AoGetRecord(processTxId, GetChivesChatAdminsResult)

            return { id: GetChivesChatAdminsResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatAdminsResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatAdmins Error:", Error)
    }
  
}

export const ChivesChatAddAdmin = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, AdminId: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );

        const GetChivesChatAddAdminResult = await message({
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "AddAdmin", AdminId = "' + AdminId + '" })',
        });
        console.log("ChivesChatAddAdmin GetChivesChatAddAdminResult", GetChivesChatAddAdminResult)
        
        if(GetChivesChatAddAdminResult && GetChivesChatAddAdminResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatAddAdminResult)

            return { id: GetChivesChatAddAdminResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatAddAdminResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatDelAdmin = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, AdminId: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );

        const GetChivesChatDelAdminResult = await message({
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "DelAdmin", AdminId = "' + AdminId + '" })',
        });
        console.log("ChivesChatDelAdmin GetChivesChatDelAdminResult", GetChivesChatDelAdminResult)
        
        if(GetChivesChatDelAdminResult && GetChivesChatDelAdminResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatDelAdminResult)

            return { id: GetChivesChatDelAdminResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatDelAdminResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatApplyJoin = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, MemberName: string, MemberReason: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );
        const Data = {
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "ApplyJoin", MemberName = "' + MemberName + '", MemberReason = "' + MemberReason + '" })',
        }
        console.log("ChivesChatApplyJoin Data", Data)
        const GetChivesChatApplyJoinResult = await message(Data);
        console.log("ChivesChatApplyJoin GetChivesChatApplyJoinResult", GetChivesChatApplyJoinResult)
        
        if(GetChivesChatApplyJoinResult && GetChivesChatApplyJoinResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatApplyJoinResult)

            return { id: GetChivesChatApplyJoinResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatApplyJoinResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatApprovalApply = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, MemberId: string, MemberName: string, MemberReason: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );
        const Data = {
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "ApprovalApply", MemberId = "' + MemberId + '", MemberName = "' + MemberName + '", MemberReason = "' + MemberReason + '" })',
        }
        console.log("ChivesChatApprovalApply Data", Data)
        const GetChivesChatApprovalApplyResult = await message(Data);
        console.log("ChivesChatApprovalApply GetChivesChatApprovalApplyResult", GetChivesChatApprovalApplyResult)
        
        if(GetChivesChatApprovalApplyResult && GetChivesChatApprovalApplyResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatApprovalApplyResult)

            return { id: GetChivesChatApprovalApplyResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatApprovalApplyResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatRefuseApply = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, MemberId: string, MemberName: string, MemberReason: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );
        const Data = {
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "RefuseApply", MemberId = "' + MemberId + '", MemberName = "' + MemberName + '", MemberReason = "' + MemberReason + '" })',
        }
        console.log("ChivesChatRefuseApply Data", Data)
        const GetChivesChatRefuseApplyResult = await message(Data);
        console.log("ChivesChatRefuseApply GetChivesChatRefuseApplyResult", GetChivesChatRefuseApplyResult)
        
        if(GetChivesChatRefuseApplyResult && GetChivesChatRefuseApplyResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatRefuseApplyResult)

            return { id: GetChivesChatRefuseApplyResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatRefuseApplyResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatAddInvite = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, MemberId: string, MemberName: string, MemberReason: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );
        const Data = {
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "AddInvite", MemberId = "' + MemberId + '", MemberName = "' + MemberName + '", MemberReason = "' + MemberReason + '" })',
        }
        console.log("ChivesChatAddInvite Data", Data)
        const GetChivesChatAddInviteResult = await message(Data);
        console.log("ChivesChatAddInvite GetChivesChatAddInviteResult", GetChivesChatAddInviteResult)
        
        if(GetChivesChatAddInviteResult && GetChivesChatAddInviteResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatAddInviteResult)

            return { id: GetChivesChatAddInviteResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatAddInviteResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatAgreeInvite = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );
        const Data = {
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "AgreeInvite" })',
        }
        console.log("ChivesChatAgreeInvite Data", Data)
        const GetChivesChatAgreeInviteResult = await message(Data);
        console.log("ChivesChatAgreeInvite GetChivesChatAgreeInviteResult", GetChivesChatAgreeInviteResult)
        
        if(GetChivesChatAgreeInviteResult && GetChivesChatAgreeInviteResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatAgreeInviteResult)

            return { id: GetChivesChatAgreeInviteResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatAgreeInviteResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatRefuseInvite = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );
        const Data = {
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "RefuseInvite" })',
        }
        console.log("ChivesChatRefuseInvite Data", Data)
        const GetChivesChatRefuseInviteResult = await message(Data);
        console.log("ChivesChatRefuseInvite GetChivesChatRefuseInviteResult", GetChivesChatRefuseInviteResult)
        
        if(GetChivesChatRefuseInviteResult && GetChivesChatRefuseInviteResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatRefuseInviteResult)

            return { id: GetChivesChatRefuseInviteResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatRefuseInviteResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatDelMember = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, MemberId: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );

        const GetChivesChatDelMemberResult = await message({
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "DelMember", MemberId = "' + MemberId + '" })',
        });
        console.log("ChivesChatDelMember GetChivesChatDelMemberResult", GetChivesChatDelMemberResult)
        
        if(GetChivesChatDelMemberResult && GetChivesChatDelMemberResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatDelMemberResult)

            return { id: GetChivesChatDelMemberResult, msg: MsgContent };
        }
        else {

            return { id: GetChivesChatDelMemberResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatAddChannel = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, ChannelId: string, ChannelName: string, ChannelGroup: string, ChannelSort: string, ChannelWritePermission: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );

        const GetChivesChatAddChannelResult = await message({
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "AddChannel", ChannelId = "' + ChannelId + '", ChannelName = "' + ChannelName + '", ChannelGroup = "' + ChannelGroup + '", ChannelSort = "' + ChannelSort + '", ChannelWritePermission = "' + ChannelWritePermission + '"})',
        });
        console.log("ChivesChatAddChannel GetChivesChatAddChannelResult", GetChivesChatAddChannelResult)
        
        if(GetChivesChatAddChannelResult && GetChivesChatAddChannelResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, GetChivesChatAddChannelResult)

            return { id: GetChivesChatAddChannelResult, msg: MsgContent };
        }
        else {
            
            return { id: GetChivesChatAddChannelResult };
        }
    }
    catch(Error: any) {
        console.error("GetChivesChatMembers Error:", Error)
    }
  
}

export const ChivesChatGetInfo = async (TargetTxId: string, processTxId: string) => {
    try {
        const { dryrun } = connect( { MU_URL, CU_URL, GATEWAY_URL } );

        const result = await dryrun({
            Owner: processTxId,
            process: TargetTxId,
            data: null,
            tags: [
                { name: 'Action', value: 'GetInfo' },
                { name: 'Target', value: processTxId },
                { name: 'Data-Protocol', value: 'ao' },
                { name: 'Type', value: 'Message' },
                { name: 'Variant', value: 'ao.TN.1' }
            ]
        });

        if(result && result.Messages && result.Messages[0] && result.Messages[0].Data) {

            return result.Messages[0].Data
        }
        else {

            return 
        }
    }
    catch(Error: any) {
        console.error("AoTokenBalanceDryRun Error:", Error)

        return 
    }
}

export const SendMessageToChivesChat = async (currentWalletJwk: any, chatroomTxId: string, myProcessTxId: string, Message: string) => {
    try {
        const { message } = connect( { MU_URL, CU_URL, GATEWAY_URL } );

        const SendMessageResult = await message({
            process: myProcessTxId,
            tags: [ { name: 'Action', value: 'Eval' } ],
            signer: createDataItemSigner(currentWalletJwk),
            data: 'Send({Target = "' + chatroomTxId + '", Action = "Broadcast", Data = "' + Message + '" })',
        });
        console.log("SendMessageToChivesChat SendMessage", SendMessageResult)
        
        if(SendMessageResult && SendMessageResult.length == 43) {
            const MsgContent = await AoGetRecord(myProcessTxId, SendMessageResult)

            return { id: SendMessageResult, msg: MsgContent };
        }
        else {
            
            return { id: SendMessageResult };
        }
    }
    catch(Error: any) {
        console.error("SendMessageToChivesChat Error:", Error)
    }
  
}






import React, { useState, useContext } from "react";
import { DataContent, User, defaultUser, UserOwn, OwnApplication, OwnSubtitle, OwnAudit, defaultUserOwn } from "../types/baseTypes";
import { Application, Subtitle, Dashboard, defaultDashboard } from "../types/baseTypes";
import { SUBTITLE_SYSTEM } from "../utils/contracts"
import { QueryHome, QueryApplication, QuerySubtitle, QueryUser, QueryUserOwn } from "../utils/graphql/graphqls"
import { GRAPHQL_API } from "../utils/constants"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { WalletContext } from "../context/WalletContext"

export const DataContext = React.createContext<DataContent>({
    applications: [],
    subtitles: [],
    queryApplicationData: () => { },
    dashboard: defaultDashboard,
    queryHomeData: () => { },
    querySubtitleData: () => { },
    defaultAuditSubtitleMaker: defaultUser,
    queryUserData: () => { },
    userOwnData: defaultUserOwn,
    queryUserOwnData: () => { },
});

export const DataProvider = ({ children }: any) => {
    const { accountState } = useContext(WalletContext)
    const [dashboard, setDashboard] = useState<Dashboard>(defaultDashboard)
    const [applications, setApplications] = useState<Application[]>([]);
    const [subtitles, setSubtitles] = useState<Subtitle[]>([])
    const [defaultAuditSubtitleMaker, setDefaultAuditSubtitleMaker] = useState<User>(defaultUser)
    const [userOwnData, setUserOwnData] = useState<UserOwn>(defaultUserOwn)
    const client = new ApolloClient({
        uri: GRAPHQL_API,
        cache: new InMemoryCache(),
    })
    const queryHomeData = () => {
        const day = (parseInt((new Date().valueOf() / 86400000).toString())).toString()
        client
            .query({
                query: gql(QueryHome),
                variables: {
                    id: SUBTITLE_SYSTEM['0x539'],
                    first: 8,
                    date: day
                }
            })
            .then((data) => {
                let dashboard = data.data.dashboard
                let dayData = data.data.dayData
                let getApplications = data.data.applications
                let getSubtitles = data.data.subtitles
                let applicationArray = new Array<Application>()
                let subtitleArray = new Array<Subtitle>()
                getApplications.map((item: any) => {
                    applicationArray.push(
                        {
                            applicant: item.applicant.id,
                            vidoId: item.video.orderId ? item.video.orderId : item.video.realId,
                            platformName: item.video.platform.name,
                            applyId: item.id,
                            language: item.language.notes,
                            amount: item.amount,
                            payType: item.strategy.notes,
                            uploads: item.subtitleCount,
                            start: item.start,
                            deadline: Number(item.deadline),
                            source: item.source
                        }
                    )
                })
                getSubtitles.map((item: any) => {
                    subtitleArray.push({
                        applyId: item.application.id,
                        payType: item.application.strategy.notes,
                        platformName: item.application.video.platform.name,
                        subtitleId: item.id,
                        language: item.language.notes,
                        support: item.supporterCount,
                        oppose: item.dissenterCount,
                        maker: item.maker.id,
                        uploads: item.application.subtitleCount,
                        start: item.application.start,
                        deadline: Number(item.application.deadline),
                        fingerprint: item.fingerprint,
                        cid: item.cid
                    })
                })
                setSubtitles(subtitleArray)
                setApplications(applicationArray)
                setDashboard({ applicationCount: dashboard.applicationCount, userCount: dashboard.userCount.toString(), subtitleCount: dashboard.subtitleCount, platformCount: dashboard.platformCount, applicationInc: dayData.applicationCount, userInc: dayData.userCount, platformInc: dayData.platformCount, subtitleInc: dayData.subtitleCount })
            })
            .catch((err) => {
                console.log('Error fetching data: ', err)
            })
    }

    const queryApplicationData = () => {
        client
            .query({
                query: gql(QueryApplication),
                variables: {
                    id: SUBTITLE_SYSTEM['0x539'],
                    first: 8,
                    skip: 0
                }
            })
            .then((data) => {
                let getApplications = data.data.applications
                let applicationArray = new Array<Application>()
                getApplications.map((item: any) => {
                    applicationArray.push(
                        {
                            applicant: item.applicant.id,
                            vidoId: item.video.orderId ? item.video.orderId : item.video.realId,
                            platformName: item.video.platform.name,
                            applyId: item.id,
                            language: item.language.notes,
                            amount: item.amount,
                            payType: item.strategy.notes,
                            uploads: item.subtitleCount,
                            start: item.start,
                            deadline: Number(item.deadline),
                            source: item.source
                        }
                    )
                })
                setApplications(applicationArray)
            })
            .catch((err) => {
                console.log('Error fetching data: ', err)
            })
    }

    const querySubtitleData = () => {
        client
            .query({
                query: gql(QuerySubtitle),
                variables: {
                    id: SUBTITLE_SYSTEM['0x539'],
                    first: 8,
                    skip: 0
                }
            })
            .then((data) => {
                let getSubtitles = data.data.subtitles
                let subtitleArray = new Array<Subtitle>()
                getSubtitles.map((item: any) => {
                    subtitleArray.push({
                        applyId: item.application.id,
                        payType: item.application.strategy.notes,
                        platformName: item.application.video.platform.name,
                        subtitleId: item.id,
                        language: item.language.notes,
                        support: item.supporterCount,
                        oppose: item.dissenterCount,
                        maker: item.maker.id,
                        uploads: item.application.subtitleCount,
                        start: item.application.start,
                        deadline: Number(item.application.deadline),
                        fingerprint: item.fingerprint,
                        cid: item.cid
                    })
                })
                setSubtitles(subtitleArray)
            })
            .catch((err) => {
                console.log('Error fetching data: ', err)
            })
    }

    const queryUserData = (userId: string) => {
        client
            .query({
                query: gql(QueryUser),
                variables: {
                    id: userId
                }
            })
            .then((data) => {
                let user = data.data.user
                setDefaultAuditSubtitleMaker({
                    id: user.id,
                    reputation: user.reputation,
                    deposit: user.deposit,
                    adopted: user.adoptedCount,
                    join: user.time
                })
            })
            .catch((err) => {
                console.log('Error fetching data: ', err)
            })
    }

    const queryUserOwnData = () => {
        accountState.address &&
            client
                .query({
                    query: gql(QueryUserOwn),
                    variables: {
                        id: accountState.address
                    }
                })
                .then((data) => {
                    let getApplications = data.data.applications
                    let getSubtitles = data.data.subtitlesOwner
                    let getAudits = data.data.audits
                    let applicationArray = new Array<OwnApplication>()
                    let subtitleArray = new Array<OwnSubtitle>()
                    let auditArray = new Array<OwnAudit>()
                    getApplications.map((item: any) => {
                        applicationArray.push({
                            name: item.video.platform.name,
                            type: item.strategy.notes,
                            price: item.amount,
                            state: item.adopted.id ? item.adopted.id : "0",
                            source: item.source,
                            videoId: item.video.id,
                            applyId: item.id,
                            language: item.language.notes
                        })
                    })
                    getSubtitles.map((item: any) => {
                        subtitleArray.push({
                            subtitleId: item.id,
                            cid: item.cid,
                            support: item.supporterCount,
                            oppose: item.dissenterCount,
                            state: item.state,
                            applyId: item.application.id,
                            language: item.language.notes
                        })
                    })
                    getAudits.map((item: any) => {
                        auditArray.push({
                            cid: item.subtitle.cid,
                            state: item.subtitle.state,
                            applyId: item.subtitle.application.id,
                            language: item.subtitle.language.notes,
                            attitude: item.attitude,
                            subtitleId: item.subtitle.id
                        })
                    })
                    setUserOwnData({ applications: applicationArray, subtitles: subtitleArray, audits: auditArray })
                })
                .catch((err) => {
                    console.log('Error fetching data: ', err)
                })
    }

    return (
        <DataContext.Provider value={{ dashboard, queryHomeData, applications, queryApplicationData, subtitles, querySubtitleData, defaultAuditSubtitleMaker, queryUserData, userOwnData, queryUserOwnData }}>
            {children}
        </DataContext.Provider>
    );
};
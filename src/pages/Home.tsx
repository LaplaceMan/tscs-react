import { ApplyCard, DashboardMini, SubtitleCard } from "../components";
import { DashboardMiniItem, Application, defaultApplication, Subtitle, defaultSubtitle } from "../types/baseTypes";
import {
  MdPeopleAlt,
  MdAllInbox,
  MdOutlineSubtitles,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { ApplicationItems, SubtitleItems } from "../utils/testData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { GRAPHQL_API } from "../utils/constants"
import { QueryHome } from "../utils/graphql/graphqls"
import { SUBTITLE_SYSTEM } from "../utils/contracts"

const Home = (): React.ReactElement => {
  const [dashboard, setDashboard] = useState({ applicationCount: "0", languageCount: "0", subtitleCount: "0", platformCount: "0" })
  const [applications, setApplications] = useState<Application[]>([defaultApplication]);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([defaultSubtitle])
  const DashboardMiniItems: DashboardMiniItem[] = [
    {
      label: "All Applications",
      number: dashboard.applicationCount,
      change: 50,
      bg: "#ecf8ef",
      iconBg: "#00CD00",
      icon: <MdAllInbox color="#fff" fontSize={25} />,
    },
    {
      label: "All Languages",
      number: dashboard.languageCount,
      change: 2,
      bg: "#FDF5E6",
      iconBg: "#FF8C00",
      icon: <MdPeopleAlt color="#fff" fontSize={25} />,
    },
    {
      label: "All Subtitles",
      number: dashboard.subtitleCount,
      change: 666,
      bg: "#B0EFFF",
      iconBg: "#1E90FF",
      icon: <MdOutlineSubtitles color="#fff" fontSize={25} />,
    },
    {
      label: "All Platforms",
      number: dashboard.platformCount,
      change: 111,
      bg: "#E6E6FA",
      iconBg: "#9932CC",
      icon: <MdOutlineVideoLibrary color="#fff" fontSize={25} />,
    },
  ];

  const client = new ApolloClient({
    uri: GRAPHQL_API,
    cache: new InMemoryCache(),
  })

  const queryHomeData = () => {
    client
      .query({
        query: gql(QueryHome),
        variables: {
          id: SUBTITLE_SYSTEM['0x539'],
          first: 8
        }
      })
      .then((data) => {
        console.log(data)
        let dashboard = data.data.dashboard
        let applications = data.data.applications
        let subtitles = data.data.subtitles
        let applicationArray = new Array<Application>()
        let subtitleArray = new Array<Subtitle>()
        applications.map((item: any) => {
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
        subtitles.map((item: any) => {
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
        setDashboard({ applicationCount: dashboard.applicationCount, languageCount: dashboard.languageCount.toString(), subtitleCount: dashboard.subtitleCount, platformCount: dashboard.platformCount })
      })
      .catch((err) => {
        console.log('Error fetching data: ', err)
      })
  }

  useEffect(() => {
    queryHomeData()
    setInterval(queryHomeData, 300000)
  }, [])

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-5xl font-bold text-center">
          Culture Without Boundaries
        </div>
        <div className="flex md:text-lg text-base w-2/3 text-center mt-5 font-medium">
          Connect video creators, subtitle makers, viewers and artists in an
          interesting ecosystem.
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center md:justify-between sm:justify-center mt-10">
        {DashboardMiniItems.map((item, index) => DashboardMini(item, index))}
      </div>
      <div className="flex flex-col mt-10">
        <Link to="./Application">
          <div className="flex items-center justify-center mt-3 mb-2 text-lg font-semibold text-[#696969] hover:text-black cursor-pointer">
            <MdAllInbox className="mt-0.5 mr-3" />
            Applications
          </div>
        </Link>
        <div className="flex flex-wrap w-full items-center justify-around md:justify-between">
          {applications.map((item, index) => ApplyCard(item, index))}
          {ApplicationItems.map((item, index) => ApplyCard(item, index))}
        </div>
        <Link to="./Government">
          <div className="flex items-center justify-center mt-6 mb-2 text-lg font-semibold text-[#696969] hover:text-black cursor-pointer">
            <MdOutlineSubtitles className="mt-0.5 mr-3" /> Subtitles
          </div>
        </Link>
        <div className="flex flex-wrap w-full items-center justify-around md:justify-between">
          {subtitles.map((item, index) => SubtitleCard(item, index))}
          {SubtitleItems.map((item, index) => SubtitleCard(item, index))}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useContext, useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { application_Illustration } from "../assets/index";
import { FiArrowUpRight } from "react-icons/fi";
import { ApplicationItems } from "../utils/testData";
import { ApplyCard } from "../components";
import { ApplicationContext } from "../context/ApplicationContext";
import { GRAPHQL_API } from "../utils/constants"
import { QueryApplication } from "../utils/graphql/graphqls"
import { Application, defaultApplication } from "../types/baseTypes";
import { SUBTITLE_SYSTEM } from "../utils/contracts"

const ApplicationPage = (): React.ReactElement => {
  const { showApplicationModal } = useContext(ApplicationContext);
  const [applications, setApplications] = useState<Application[]>([defaultApplication]);
  const client = new ApolloClient({
    uri: GRAPHQL_API,
    cache: new InMemoryCache(),
  })

  const queryHomeData = () => {
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
        let applications = data.data.applications
        let applicationArray = new Array<Application>()
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
        setApplications(applicationArray)
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
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full items-center md:justify-between sm:-mr-10 sm:justify-center">
        <div className="flex flex-col items-start md:w-[40rem] sm:w-[20rem] md:mr-14 min-w-[320px] sm:mr-[-14px]">
          <div className="flex md:text-5xl font-bold sm:text-2xl">
            Simple and fast application for subtitle service
          </div>
          <div className="flex md:text-base my-5 w-5/6 font-medium sm:text-xs">
            Reduce your risk and burden with multi-payment strategies and
            decentralized audit.
          </div>
          <div
            className="flex md:px-12 py-2 text-white font-semibold md:text-lg  text-center rounded-full items-center justify-center bg-gradient-to-r from-purple-400 to-blue-400 mt-2 sm:text-base sm:px-10 cursor-pointer hover:brightness-110"
            onClick={showApplicationModal}
          >
            Submit <FiArrowUpRight className="ml-3" />
          </div>
        </div>
        <div className="flex items-center justify-center w-1/3 min-w-[320px]">
          <img src={application_Illustration} />
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-around md:justify-between">
        {applications.map((item, index) => ApplyCard(item, index))}
        {ApplicationItems.map((item, index) => ApplyCard(item, index))}
      </div>
    </div>
  );
};

export default ApplicationPage;

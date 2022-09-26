import { ApplyCard } from "../components";
import { Application } from "../Types/baseTypes";

const ApplicationItems: Application[] = [
  {
    vidoId: 50,
    videoName: "Lulu",
    applyId: 5,
    platformName: "Youtube",
    language: "cn",
    payNumber: "20K",
    payType: "OT0",
    applicant: "0x666...666",
    uploads: 5,
    duration: 604800,
    deadline: 1664058800,
  },
  {
    vidoId: 50,
    videoName: "Lulu",
    applyId: 5,
    platformName: "Youtube",
    language: "kr",
    payNumber: "20K",
    payType: "OT0",
    applicant: "0x666...666",
    uploads: 5,
    duration: 604800,
    deadline: 1664458800,
  },
  {
    vidoId: 50,
    videoName: "Lulu",
    applyId: 5,
    platformName: "Youtube",
    language: "cn",
    payNumber: "20K",
    payType: "OT0",
    applicant: "0x666...666",
    uploads: 5,
    duration: 604800,
    deadline: 1664558800,
  },
  {
    vidoId: 50,
    videoName: "Lulu",
    applyId: 5,
    platformName: "Youtube",
    language: "cn",
    payNumber: "20K",
    payType: "OT0",
    applicant: "0x666...666",
    uploads: 5,
    duration: 604800,
    deadline: 1664658800,
  },
  {
    vidoId: 50,
    videoName: "Lulu",
    applyId: 5,
    platformName: "Bilibili",
    language: "us",
    payNumber: "20K",
    payType: "OT0",
    applicant: "0x666...666",
    uploads: 5,
    duration: 604800,
    deadline: 1664258800,
  },
  {
    vidoId: 50,
    videoName: "Lulu",
    applyId: 5,
    platformName: "Bilibili",
    language: "jp",
    payNumber: "20",
    payType: "DR1",
    applicant: "0x666...666",
    uploads: 5,
    duration: 604800,
    deadline: 1665058800,
  },
];

const Applications = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-5xl font-bold text-center">
          Culture Without Boundaries
        </div>
        <div className="flex md:text-base text-sm md:w-2/3 text-center mt-5 font-medium">
          Connect video creators, subtitle producers, viewers and artists in an
          interesting ecosystem.
        </div>
      </div>

      <div className="flex flex-wrap w-full items-center mt-10 justify-around">
        {ApplicationItems.map((item, index) => ApplyCard(item, index))}
      </div>
    </div>
  );
};

export default Applications;

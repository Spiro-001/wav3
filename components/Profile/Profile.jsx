import React, { useEffect, useState } from "react";
import Albums from "./Albums";
import Bio from "./Bio";
import FtTrack from "./FtTrack";
import Highlight from "./Highlight";
import MiniNav from "./MiniNav";
import Playlist from "./Playlist";
import Media from "./Media";
import Tracks from "./Tracks";
import { useSearchParams } from "next/navigation";

const Profile = (props) => {
  const [user, setUser] = useState();
  const [selector, setSelector] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParams.get("tab") && setSelector(parseInt(searchParams.get("tab")));
    if (props.session) setUser(props.session.user);
  }, [user]);

  const returnSelector = (user) => {
    switch (selector) {
      case 0:
        return <Bio user={user} />; // REDUX STORE IN THE FUTURE TO REMOVE THE USE OF PROPS
      case 1:
        return <FtTrack user={user} />;
      case 2:
        return <Tracks user={user} />;
      case 3:
        return <Albums user={user} />;
      case 4:
        return <Playlist user={user} />;
      case 5:
        return <Highlight user={user} />;
      case 6:
        return <Media user={user} />;
      default:
        break;
    }
  };

  return (
    <div className="w-full lg:w-4/5 xl:w-2/3 h-full flex flex-col flex-1 max-sm:min-w-fit">
      <div className="banner-image h-64 relative">
        <img
          src="https://picsum.photos/1920/1080"
          alt="banner"
          className="object-cover h-full w-full select-none"
        />
        <div className="profile-container absolute bottom-12 left-14 flex gap-x-10 items-end h-40 w-40">
          <img
            src="https://picsum.photos/300/300"
            alt="profile"
            className="object-cover h-full w-full rounded-full select-none"
          />
          <div className="profile-info text-black">
            <div className="profile-text text-2xl py-1 px-3">
              {user?.username}
            </div>
          </div>
        </div>
      </div>
      <div className="content-container px-12 h-full flex flex-col flex-1 lg:w-full w-fit dark:bg-zinc-950 bg-stone-200 self-center">
        <MiniNav selector={selector} setSelector={setSelector} />
        {user && (
          <div className="h-full flex-1 flex flex-col">
            {returnSelector(user)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

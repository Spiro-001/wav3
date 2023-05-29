import React, { useEffect, useState } from "react";

const Profile = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (props.session) setUser(props.session.user);
  });

  return (
    <div className="border-2 border-white w-full lg:w-4/5 xl:w-2/3 h-full">
      <div className="banner-image h-1/3 relative">
        <img
          src="https://picsum.photos/1920/1080"
          alt="banner"
          className="object-cover h-full w-full select-none"
        />
        <div className="profile-container absolute bottom-16 left-16 flex gap-x-12 items-end">
          <img
            src="https://picsum.photos/300/300"
            alt="profile"
            className="h-52 w-52 object-cover rounded-full select-none"
          />
          <div className="profile-info text-black">
            <div className="profile-text text-2xl py-1 px-3">
              {user?.username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

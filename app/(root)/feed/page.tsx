import WhoToFollow from "@/components/WhoRoFollow";
import React from "react";

const Feed = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div>creater</div>

      <div className=" lg:col-span-4 sticky top-20">
        <div>
          <WhoToFollow />
        </div>
      </div>
    </div>
  );
};

export default Feed;

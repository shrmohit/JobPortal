import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const randomJobs = [1, 2, 45];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-10">
        <h1 className="font-bold text-xl my-10">Search Results</h1>
        <div className="grid grid-cols-3 gap-4">
          {randomJobs.map((job) => {
            return (
              <Job
                key={job._id}
                job={job}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;

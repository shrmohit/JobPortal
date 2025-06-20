import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from '../utils/constant';
import { toast } from 'sonner';

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log('API RESPONSE:', res.data);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  // update whwn user applied and some return match condition
  useEffect(() => {
    if (singleJob && user?._id) {
      const applied = singleJob?.applications?.some(
        (application) => application.applicant === user?._id
      );
      setIsApplied(applied);
    }
  }, [singleJob, user]);

  return (
    <div className='max-w-7xl mx-auto my-10 p-12'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge
              className={'text-blue-700 font-bold'}
              variant='ghost'
            >
              {singleJob?.position}{' '}
              {singleJob?.position > 1 ? 'Positions' : 'Position'}
            </Badge>
            <Badge
              className={'text-[#F83002] font-bold'}
              variant='ghost'
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className={'text-[#7209b7] font-bold'}
              variant='ghost'
            >
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg cursor-pointer ${
            isApplied
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          }`}
        >
          {(() => {
            console.log('Applied Status :', isApplied);
            return isApplied ? 'Already Applied' : 'Apply Now';
          })()}
        </Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>
        Job Description
      </h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>
          Role:{' '}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.title}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Location:{' '}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.location}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Description:{' '}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.description}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Experience:{' '}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.experience} yrs
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Salary:{' '}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Total Applicants:{' '}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className='font-bold my-1'>
          Posted Date:{' '}
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.createdAt.split('T')[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;

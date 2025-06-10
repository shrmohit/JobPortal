import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import axios from 'axios';
import { setAllApplicants } from '../../redux/applicantionSlice';
import { useParams } from 'react-router-dom';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const params = useParams();
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();

  const statusHandler = async (status, id) => {
    try {
      // 1. Update status
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      // 2. Refetch all applicants after update
      const allRes = await axios.get(
        `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
        {
          withCredentials: true,
        }
      );

      dispatch(setAllApplicants(allRes.data.applicants));

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log('error in status change', error);
      toast.error(error.response?.data?.message || 'Status update failed');
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className='text-blue-600 cursor-pointer'
                      href={item?.applicant?.profile?.resume}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split('T')[0]}</TableCell>
                <TableCell className='float-right cursor-pointer'>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className='w-32 cursor-pointer'>
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className='flex w-fit items-center my-2 cursor-pointer'
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

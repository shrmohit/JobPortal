import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/JobSlice";

const useGetSingleJob = ({ jobId }) => {
  const dispatch = useDispatch();
};

export default useGetSingleJob;

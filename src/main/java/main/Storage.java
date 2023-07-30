package main;

import main.model.Job;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Storage
{
    private static HashMap<Integer, Job> jobs = new HashMap<>();
    public static List<Job> getAllJobs(){
        ArrayList<Job> jobList = new ArrayList<>();
        jobList.addAll(jobs.values());
        return jobList;
    }
    public static int addJob(Job job)
    {
        int id = job.getNumber();
        jobs.put(id, job);
        return id;
    }
    public static Job getJob(int jobId)
    {
        if(jobs.containsKey(jobId)){
            return jobs.get(jobId);
        }
        return null;
    }
    public static boolean removeJob(int jobId)
    {
        if(jobs.containsKey(jobId)){
            Job job = jobs.remove(jobId);
            if ( job != null) return true;
        }
        return false;

    }

}

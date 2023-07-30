package main;

import main.model.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import main.model.Job;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class JobController {
    @Autowired
    private JobRepository jobRepository;
    @GetMapping("/jobs/")
    public List<Job> list()
    {
        Iterable<Job> jobIterable = jobRepository.findAll();
        ArrayList<Job> jobs = new ArrayList<>();
        for(Job job : jobIterable){
            jobs.add(job);
        }
        return jobs;
    }
    @PostMapping("/jobs/")
    public int add(Job job)
    {
        Job newJob = jobRepository.save(job);
        return newJob.getNumber();
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity get(@PathVariable int id)
    {
        Optional<Job> optionalJob = jobRepository.findById(id);
        if(!optionalJob.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity(optionalJob.get(), HttpStatus.OK);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity delete(@PathVariable int id)
    {
        Optional<Job> optionalJob = jobRepository.findById(id);
        if(optionalJob.isPresent()){
            jobRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        }
        else return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity put(Job job)
    {
        int id = job.getNumber();
        Optional<Job> optionalJob = jobRepository.findById(id);
        if(optionalJob.isPresent()){
            jobRepository.save(job);
            return new ResponseEntity(HttpStatus.OK);
        }
        else return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

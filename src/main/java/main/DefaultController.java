package main;

import main.model.Job;
import main.model.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Conditional;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
public class DefaultController {
    @Autowired
    JobRepository jobRepository;

    @Value("${someParameter}")
    private Integer someParameter;

    @RequestMapping("/")
    public String index(Model model)
    {
        Iterable<Job> jobIterable = jobRepository.findAll();
        ArrayList<Job> jobs = new ArrayList<>();
        for(Job job : jobIterable){
            jobs.add(job);
        }
        model.addAttribute("jobs", jobs);
        model.addAttribute("jobsCount", jobs.size());
        model.addAttribute("someParameter", someParameter);
        return "index";

    }
}

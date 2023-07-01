package project.server;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String post(){
        return "{\"response\" : \"ok\"";
    }
}

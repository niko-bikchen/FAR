package model;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConverterRepository extends MongoRepository<Converter, String>{
    public ArrayList<Converter> findAllByEmail(String email);

}

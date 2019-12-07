package model;
//Class was developed by Vladislav Haponenko

import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User, String>{
    public User findByEmail(String email);
}
